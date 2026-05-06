import { useState, useEffect } from 'react';
import { ExternalLink, Check, RefreshCw, X, Eye } from 'lucide-react';
import { getProblems, getProblemProgress, updateProblemProgress } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Sheet = () => {
  const [filter, setFilter] = useState('All');
  const [problems, setProblems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [probsRes, progRes] = await Promise.all([
        getProblems(),
        getProblemProgress()
      ]);
      const progressMap = progRes.data.reduce((acc, curr) => {
        acc[curr.problem.id] = curr.status;
        return acc;
      }, {});
      
      const mappedProblems = probsRes.data.map(p => ({
        ...p,
        status: progressMap[p.id] || 'Pending'
      }));
      setProblems(mappedProblems);
    };
    fetchData();
  }, []);

  const handleUpdateStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Pending' ? 'Solved' : currentStatus === 'Solved' ? 'Revision' : 'Pending';
    await updateProblemProgress(id, nextStatus);
    setProblems(problems.map(p => p.id === id ? { ...p, status: nextStatus } : p));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Solved': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Revision': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Pending': return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
      default: return '';
    }
  };

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-white';
    }
  };

  const getVisualForTopic = (topic, name) => {
    if (name.includes("Trapping Rain Water")) return '/visuals/trapping.png';
    if (topic === 'Binary Search') return '/visuals/binary.png';
    // Fallback based on topic
    if (topic === 'Arrays' || topic === 'Strings') return '/visuals/trapping.png';
    return '/visuals/binary.png';
  };

  return (
    <>
      <div className="glass rounded-2xl border border-white/5 p-6 min-h-[calc(100vh-8rem)]">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">DSA Tracking Sheet</h1>
            <p className="text-gray-400">Track your progress, mark for revision, and conquer algorithms.</p>
          </div>
          <div className="flex gap-2 bg-black/40 p-1 rounded-xl border border-white/10 overflow-x-auto max-w-full hide-scrollbar">
            {['All', ...new Set(problems.map(p => p.topic))].map(t => (
              <button 
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  filter === t ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm">
                <th className="pb-4 pl-4 font-medium">Status</th>
                <th className="pb-4 font-medium">Problem</th>
                <th className="pb-4 font-medium">Difficulty</th>
                <th className="pb-4 font-medium">Topic</th>
                <th className="pb-4 font-medium text-right pr-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {problems.filter(p => filter === 'All' || p.topic === filter).map(p => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="py-4 pl-4">
                    <button 
                      onClick={() => handleUpdateStatus(p.id, p.status)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 w-max transition-transform hover:scale-105 cursor-pointer ${getStatusColor(p.status)}`}
                    >
                      {p.status === 'Solved' && <Check size={12} />}
                      {p.status === 'Revision' && <RefreshCw size={12} />}
                      {p.status === 'Pending' && <X size={12} />}
                      {p.status}
                    </button>
                  </td>
                  <td className="py-4 font-medium">{p.name}</td>
                  <td className={`py-4 ${getDifficultyColor(p.difficulty)}`}>{p.difficulty}</td>
                  <td className="py-4 text-gray-300">
                    <span className="bg-white/5 px-3 py-1 rounded-lg text-sm">{p.topic}</span>
                  </td>
                  <td className="py-4 text-right pr-4">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setSelectedImage({ url: getVisualForTopic(p.topic, p.name), name: p.name })}
                        className="p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-400/10 rounded-lg transition-colors inline-flex tooltip"
                        title="View Visual Representation"
                      >
                        <Eye size={18} />
                      </button>
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-spideyBlue hover:bg-spideyBlue/10 rounded-lg transition-colors inline-flex">
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-900 border border-white/10 p-2 rounded-2xl max-w-4xl w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-red-500 text-white rounded-full p-2 transition-colors z-10"
              >
                <X size={20} />
              </button>
              <div className="absolute top-4 left-6 bg-black/50 text-white rounded-lg px-4 py-2 font-bold z-10 backdrop-blur-md border border-white/10">
                Visualizing: {selectedImage.name}
              </div>
              <img 
                src={selectedImage.url} 
                alt="Visual Representation" 
                className="w-full h-auto rounded-xl object-contain max-h-[80vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sheet;
