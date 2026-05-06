import { useState, useEffect } from 'react';
import { Play, CheckCircle, BookOpen, Clock, Folder, ChevronDown, ChevronRight, Sparkles, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getVideos, getVideoProgress, updateVideoProgress, updateVideoNotes } from '../services/api';

const Course = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [playlist, setPlaylist] = useState([]);
  const [expandedTopic, setExpandedTopic] = useState("");
  const [currentNotes, setCurrentNotes] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [vidsRes, progRes] = await Promise.all([
        getVideos(),
        getVideoProgress()
      ]);
      const progressMap = progRes.data.reduce((acc, curr) => {
        acc[curr.video.id] = { completed: curr.completed, notes: curr.notes };
        return acc;
      }, {});

      const mappedVideos = vidsRes.data.map(v => ({
        ...v,
        completed: progressMap[v.id]?.completed || false,
        notes: progressMap[v.id]?.notes || ""
      }));
      setPlaylist(mappedVideos);
      if (mappedVideos.length > 0) {
        setExpandedTopic(mappedVideos[0].topic);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (playlist.length > 0 && playlist[activeVideo]) {
      setCurrentNotes(playlist[activeVideo].notes || "");
    }
  }, [activeVideo, playlist]);

  const handleMarkCompleted = async () => {
    if (!playlist[activeVideo]) return;
    const vid = playlist[activeVideo];
    await updateVideoProgress(vid.id, !vid.completed);
    setPlaylist(playlist.map((v, i) => i === activeVideo ? { ...v, completed: !v.completed } : v));
  };

  const handleSaveNotes = async () => {
    if (!playlist[activeVideo]) return;
    const vid = playlist[activeVideo];
    await updateVideoNotes(vid.id, currentNotes);
    setPlaylist(playlist.map((v, i) => i === activeVideo ? { ...v, notes: currentNotes } : v));
  };

  const handleGenerateNotes = async () => {
    if (!playlist[activeVideo]) return;
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(async () => {
      const generated = `AI Generated Notes for ${playlist[activeVideo].title}:\n\n- Topic Focus: ${playlist[activeVideo].topic}\n- Approach: Break down the core logic of the problem and trace the steps conceptually.\n- Next Steps: Try implementing the solution on your own and observe the edge cases.`;
      setCurrentNotes(generated);
      await updateVideoNotes(playlist[activeVideo].id, generated);
      setPlaylist(playlist.map((v, i) => i === activeVideo ? { ...v, notes: generated } : v));
      setIsGenerating(false);
    }, 1500);
  };

  const groupedPlaylist = playlist.reduce((acc, video, index) => {
    if (!acc[video.topic]) acc[video.topic] = [];
    acc[video.topic].push({ ...video, originalIndex: index });
    return acc;
  }, {});

  const topics = Object.keys(groupedPlaylist).sort();

  const totalCompleted = playlist.filter(v => v.completed).length;

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Video Player Area */}
      <div className="flex-1 flex flex-col glass rounded-2xl border border-white/5 overflow-hidden">
        <div className="w-full aspect-video bg-black relative">
          {playlist[activeVideo]?.videoUrl ? (
            playlist[activeVideo].videoUrl.includes('youtube.com') || playlist[activeVideo].videoUrl.includes('youtu.be') ? (
              <iframe
                src={playlist[activeVideo].videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                className="absolute inset-0 w-full h-full z-10 border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video 
                src={playlist[activeVideo].videoUrl} 
                className="absolute inset-0 w-full h-full z-10"
                controls
                autoPlay
              >
                Your browser does not support the video tag.
              </video>
            )
          ) : (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-20 h-20 bg-spideyRed/80 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(229,0,0,0.6)]"
                >
                  <Play fill="white" size={32} className="ml-2" />
                </motion.button>
              </div>
              <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200" alt="Code Background" className="w-full h-full object-cover opacity-30" />
            </>
          )}
        </div>

        <div className="p-6 flex-1 flex flex-col overflow-y-auto hide-scrollbar">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{playlist[activeVideo]?.title || "Loading..."}</h2>
              <div className="flex gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1"><Clock size={16} /> {playlist[activeVideo]?.duration || "0:00"}</span>
                <span className="flex items-center gap-1"><BookOpen size={16} /> {playlist[activeVideo]?.topic || "General"}</span>
              </div>
            </div>
            <button
              onClick={handleMarkCompleted}
              className={`px-6 py-2 border rounded-xl transition-colors flex items-center gap-2 ${playlist[activeVideo]?.completed
                  ? 'bg-spideyBlue text-white border-spideyBlue'
                  : 'bg-spideyBlue/20 text-spideyBlue border-spideyBlue/50 hover:bg-spideyBlue hover:text-white'
                }`}
            >
              <CheckCircle size={18} /> {playlist[activeVideo]?.completed ? 'Completed' : 'Mark Completed'}
            </button>
          </div>

          <div className="mt-6 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Notes</h3>
              <div className="flex gap-2">
                <button 
                  onClick={handleGenerateNotes}
                  disabled={isGenerating}
                  className="flex items-center gap-1 text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/50 px-3 py-1.5 rounded-lg hover:bg-purple-500 hover:text-white transition-colors"
                >
                  <Sparkles size={14} /> {isGenerating ? "Generating..." : "AI Generate Notes"}
                </button>
                <button 
                  onClick={handleSaveNotes}
                  className="flex items-center gap-1 text-xs font-medium bg-white/5 text-gray-300 border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Save size={14} /> Save Notes
                </button>
              </div>
            </div>
            <textarea
              value={currentNotes}
              onChange={(e) => setCurrentNotes(e.target.value)}
              className="w-full flex-1 min-h-[120px] bg-black/40 border border-white/10 rounded-xl p-4 text-gray-300 focus:border-spideyRed focus:outline-none resize-none"
              placeholder="Take your notes here or generate them with AI..."
            ></textarea>
          </div>
        </div>
      </div>

      {/* Playlist Sidebar */}
      <div className="w-80 glass rounded-2xl border border-white/5 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/10 bg-black/20">
          <h3 className="font-bold text-lg">Course Mastery</h3>
          <p className="text-sm text-gray-400 mt-1">{totalCompleted}/{playlist.length} Completed</p>
          <div className="w-full h-1 bg-black rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-spideyBlue transition-all duration-500" style={{ width: `${playlist.length ? (totalCompleted/playlist.length)*100 : 0}%` }}></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 hide-scrollbar">
          {topics.map((topic) => (
            <div key={topic} className="mb-2">
              <button 
                onClick={() => setExpandedTopic(expandedTopic === topic ? "" : topic)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
              >
                <div className="flex items-center gap-2">
                  <Folder size={18} className="text-spideyBlue" />
                  <span className="font-semibold text-sm text-left">{topic}</span>
                </div>
                {expandedTopic === topic ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
              
              <AnimatePresence>
                {expandedTopic === topic && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-4 pr-1 pt-2 space-y-1"
                  >
                    {groupedPlaylist[topic].map((video) => {
                      const isActive = activeVideo === video.originalIndex;
                      return (
                        <div
                          key={video.id}
                          onClick={() => setActiveVideo(video.originalIndex)}
                          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${isActive
                              ? 'bg-white/10 border border-white/20 shadow-lg'
                              : 'hover:bg-white/5 border border-transparent'
                            }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${video.completed ? 'bg-green-500/20 text-green-500' : 'bg-black/50 text-gray-400'
                            }`}>
                            {video.completed ? <CheckCircle size={16} /> : <Play size={14} className="ml-0.5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-sm truncate ${isActive ? 'font-bold text-white' : 'text-gray-300'}`} title={video.title}>
                              {video.title}
                            </h4>
                            <p className="text-xs text-gray-500">{video.duration}</p>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Course;
