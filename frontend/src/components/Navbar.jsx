import { Bell, Search, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ setIsAuthenticated }) => {
  const userName = localStorage.getItem('userName') || 'Utkarsh';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    if (setIsAuthenticated) setIsAuthenticated(false);
  };

  return (
    <div className="h-20 glass border-b border-white/10 flex items-center justify-between px-8 z-20 relative">
      <div className="flex items-center gap-4 w-1/3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search problems, videos..." 
            className="w-full bg-black/40 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-spideyBlue transition-colors text-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <motion.button whileHover={{ scale: 1.1 }} className="text-gray-400 hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-spideyRed rounded-full shadow-[0_0_5px_#e50000]"></span>
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} className="text-gray-400 hover:text-white transition-colors">
          <Settings size={20} />
        </motion.button>
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white">{userName}</p>
            <p className="text-xs text-spideyBlue">Pro Coder</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-spideyRed to-spideyBlue p-[2px]"
          >
            <div className="w-full h-full bg-black rounded-full overflow-hidden border-2 border-transparent">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </motion.div>
          <motion.button 
            onClick={handleLogout}
            whileHover={{ scale: 1.1 }} 
            className="ml-2 text-gray-400 hover:text-spideyRed transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
