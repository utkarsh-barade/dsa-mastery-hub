import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle, Code, Flame, PlaySquare } from 'lucide-react';
import { getProblems, getProblemProgress } from '../services/api';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon, colorClass, shadowClass }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
    className={`glass p-6 rounded-2xl border border-white/5 hover:bg-white/[0.04] transition-all relative overflow-hidden group shadow-lg`}
  >
    <div className={`absolute top-0 right-0 w-32 h-32 ${colorClass} opacity-10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:opacity-20 transition-opacity`}></div>
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <h3 className={`text-3xl font-display font-bold text-white ${shadowClass}`}>{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${colorClass} bg-opacity-20 text-white shadow-lg`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ solved: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [probsRes, progRes] = await Promise.all([
          getProblems(),
          getProblemProgress()
        ]);
        
        const solvedCount = progRes.data.filter(p => p.status === 'Solved').length;
        setStats({
          solved: solvedCount,
          total: probsRes.data.length || 100
        });
      } catch (e) {
        console.error("Failed to load dashboard stats", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-display font-bold text-white mb-2 neon-text-red">Welcome back, Web-Slinger! 🕸️</h1>
        <p className="text-gray-400 text-lg">Your great power requires great coding responsibility.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Problems Solved" value={isLoading ? "..." : stats.solved} icon={<CheckCircle />} colorClass="bg-spideyBlue" shadowClass="neon-text-blue" />
        <StatCard title="Current Streak" value="7 Days" icon={<Flame />} colorClass="bg-spideyRed" shadowClass="neon-text-red" />
        <StatCard title="Target for Today" value="3" icon={<Target />} colorClass="bg-purple-500" shadowClass="" />
        <StatCard title="Total Progress" value={isLoading ? "..." : Math.round((stats.solved / stats.total) * 100) + "%"} icon={<Code />} colorClass="bg-green-500" shadowClass="" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 glass rounded-3xl p-8 border border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-spideyBlue/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h2 className="text-2xl font-bold">Topic Mastery</h2>
            <Link to="/sheet" className="text-spideyBlue text-sm font-bold hover:underline">View All</Link>
          </div>

          <div className="space-y-6 relative z-10">
            {[
              { topic: 'Arrays & Hashing', progress: Math.min(100, stats.solved * 20), color: 'bg-spideyBlue', shadow: 'shadow-[0_0_15px_rgba(15,43,132,0.8)]' },
              { topic: 'Two Pointers', progress: Math.min(100, stats.solved * 10), color: 'bg-spideyRed', shadow: 'shadow-[0_0_15px_rgba(229,0,0,0.8)]' },
              { topic: 'Dynamic Programming', progress: 0, color: 'bg-purple-500', shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.8)]' },
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-200 font-medium group-hover:text-white transition-colors">{item.topic}</span>
                  <span className="text-gray-400">{item.progress}%</span>
                </div>
                <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                    className={`h-full ${item.color} ${item.shadow}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-8 border border-white/5 flex flex-col relative overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-spideyRed/10 rounded-full blur-3xl pointer-events-none"></div>
          <h2 className="text-2xl font-bold mb-6 relative z-10">Continue Learning</h2>
          
          <div className="flex-1 flex flex-col justify-center items-center text-center p-8 bg-black/40 rounded-2xl border border-white/5 mb-6 relative overflow-hidden group cursor-pointer hover:border-spideyRed/30 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-spideyRed/10 to-spideyBlue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="z-10">
              <PlaySquare size={56} className="text-spideyRed mb-4 drop-shadow-[0_0_15px_rgba(229,0,0,0.5)]" />
            </motion.div>
            <h3 className="text-xl font-bold z-10 group-hover:text-white text-gray-200 transition-colors">Graph Traversal</h3>
            <p className="text-sm text-gray-400 mt-2 z-10">Up Next • Graphs</p>
          </div>
          
          <Link to="/course" className="w-full block">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-spideyRed to-spideyBlue text-white rounded-xl font-bold shadow-[0_0_20px_rgba(229,0,0,0.3)] hover:shadow-[0_0_30px_rgba(229,0,0,0.5)] transition-all"
            >
              Resume Video
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
