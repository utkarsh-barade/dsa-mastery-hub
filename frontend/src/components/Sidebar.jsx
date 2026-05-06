import { Link, useLocation } from 'react-router-dom';
import { Home, PlaySquare, ListTodo, Code2, User, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Course', path: '/course', icon: <PlaySquare size={20} /> },
    { name: 'DSA Sheet', path: '/sheet', icon: <ListTodo size={20} /> },
    { name: 'Compiler', path: '/compiler', icon: <Code2 size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
  ];

  return (
    <div className="w-64 glass border-r border-white/10 h-full flex flex-col pt-6 z-20 relative">
      <div className="px-6 mb-10 flex items-center gap-3">
        <Activity className="text-spideyRed" size={28} />
        <h1 className="text-xl font-display font-bold neon-text-red">Mastery Hub</h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.name} to={item.path}>
              <motion.div 
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-spideyBlue/20 text-spideyBlue neon-border-blue border' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeTab" 
                    className="absolute left-0 w-1 h-8 bg-spideyBlue rounded-r-md" 
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-6">
        <div className="bg-gradient-to-r from-spideyRed/20 to-spideyBlue/20 p-4 rounded-xl border border-white/10 text-center">
          <h3 className="text-sm font-bold text-white mb-2">Daily Streak 🔥</h3>
          <p className="text-2xl font-display font-bold neon-text-red">7 Days</p>
          <p className="text-xs text-gray-400 mt-1">Keep it up, hero!</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
