import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiLogOut, FiMenu } from "react-icons/fi";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  const sidebarVariants = {
    expanded: { width: "16rem" },  
    collapsed: { width: "4rem" },  
  };

  const navItems = [
    { path: "/", icon: <FiHome size={20} />, label: "Inicio" },
  ];

  return (
    <motion.div
      variants={sidebarVariants}
      animate={isExpanded ? "expanded" : "collapsed"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen flex flex-col justify-between "
    >
      <div>
        <div className="flex items-center p-4 justify-between">
          {isExpanded && (
            <div className="flex gap-2 items-center">
              <div className="avatar">
                <div className="mask mask-hexagon">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="Avatar"
                  />
                </div>
              </div>
              <div >
                <p className="font-bold">Juan Pérez</p>
                <p className="text-sm">juan@example.com</p>
              </div>
            </div>
          )}
          <button
            className={`p-2 focus:outline-none hover:text-primary transition-all ${!isExpanded ? "mx-auto " : "ml-2"}`}
            onClick={toggleSidebar}
          >
            <FiMenu size={20} />
          </button>
        </div>
        <div className="divider rounded-full mx-auto w-3/5"></div>
        <nav className="mt-4 ">
          {navItems.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="flex items-center p-5 hover:bg-gray-200 transition-all duration-200"
            >
              <span>{item.icon}</span>
              {isExpanded && <span className="ml-4">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4">
        <button className="flex items-center w-full p-2 hover:text-red-600 transition-all duration-200 focus:outline-none">
          <FiLogOut size={20} />
          {isExpanded && <span className="ml-4">Salir</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
