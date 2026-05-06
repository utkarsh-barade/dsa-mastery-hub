import { Trophy, Medal, Star, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="glass rounded-3xl border border-white/5 p-8 relative overflow-hidden flex items-center gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-spideyRed/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-spideyBlue/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>
        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-spideyRed to-spideyBlue p-1 z-10 relative shadow-[0_0_30px_rgba(229,0,0,0.3)]">
          <div className="w-full h-full bg-black rounded-full overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Utkarsh" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
        
        <div className="z-10 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-display font-bold text-white mb-1">Utkarsh</h1>
              <p className="text-gray-400 flex items-center gap-2">@utkarsh <span className="px-2 py-0.5 bg-spideyBlue/20 text-spideyBlue rounded text-xs font-bold border border-spideyBlue/30">Pro</span></p>
            </div>
            <button className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">
              Edit Profile
            </button>
          </div>
          
          <div className="flex gap-6 mt-6">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Rank</p>
              <p className="text-xl font-bold text-white flex items-center gap-2">Guardian <Medal size={20} className="text-yellow-500" /></p>
            </div>
            <div className="w-px bg-white/10"></div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Total Solved</p>
              <p className="text-xl font-bold text-white">124</p>
            </div>
            <div className="w-px bg-white/10"></div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Best Streak</p>
              <p className="text-xl font-bold text-white flex items-center gap-2">14 <Flame size={20} className="text-spideyRed" /></p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: '7-Day Streak', desc: 'Completed a 7-day coding streak', icon: <Flame className="text-orange-500" size={32} />, earned: true },
          { title: '50 Problems', desc: 'Solved 50 DSA problems', icon: <Trophy className="text-yellow-500" size={32} />, earned: true },
          { title: 'Graph Master', desc: 'Solved 20 Graph problems', icon: <Star className="text-gray-500" size={32} />, earned: false },
        ].map((badge, i) => (
          <motion.div 
            whileHover={{ y: -5 }}
            key={i} 
            className={`glass rounded-2xl border ${badge.earned ? 'border-white/10 bg-white/[0.02]' : 'border-white/5 opacity-50'} p-6 flex flex-col items-center text-center relative overflow-hidden`}
          >
            {badge.earned && <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${badge.earned ? 'bg-black shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'bg-black/50'}`}>
              {badge.icon}
            </div>
            <h3 className="font-bold text-white mb-2">{badge.title}</h3>
            <p className="text-sm text-gray-400">{badge.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
