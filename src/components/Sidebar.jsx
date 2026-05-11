import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, UsersIcon, AcademicCapIcon, 
  UserGroupIcon, Cog6ToothIcon, ChevronLeftIcon, 
  ChevronRightIcon, SparklesIcon 
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: 'Asosiy', icon: HomeIcon, path: '/dashboard', isLink: true },
    { name: 'Sinflar', icon: AcademicCapIcon, path: '/dashboard/classes', isLink: true },
    { name: 'Talabalar', icon: UserGroupIcon, path: '/dashboard/students', isLink: true },
    { name: "O'qituvchilar", icon: UsersIcon, path: '#', isLink: false },
    { name: "Sovg'alar", icon: SparklesIcon, path: '#', isLink: false },
    { name: 'Boshqarish', icon: Cog6ToothIcon, path: '#', isLink: false },
  ];

  return (
    <aside className={`relative h-screen bg-white border-r border-gray-100 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-9 bg-purple-600 text-white rounded-md p-1 shadow-md z-50 hover:scale-110 transition-transform"
      >
        {isOpen ? <ChevronLeftIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
      </button>

      <div className="flex items-center gap-3 px-6 py-8">
        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold shrink-0">E</div>
        {isOpen && <span className="text-xl font-bold text-purple-900 italic">EduCoin</span>}
      </div>

      <nav className="px-3 space-y-1">
        {menuItems.map((item) => {
          const baseClasses = `flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all ${!isOpen && 'justify-center'}`;
          const activeClasses = "bg-purple-600 text-white shadow-md";
          const inactiveClasses = "text-gray-500 hover:bg-purple-50 hover:text-purple-600";

          if (item.isLink) {
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end
                className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
              >
                <item.icon className="w-6 h-6 shrink-0" />
                {isOpen && <span className="font-medium">{item.name}</span>}
              </NavLink>
            );
          }

          return (
            <div
              key={item.name}
              className={`${baseClasses} ${inactiveClasses}`}
            >
              <item.icon className="w-6 h-6 shrink-0" />
              {isOpen && <span className="font-medium">{item.name}</span>}
            </div>
          );
        })}
      </nav>

      {isOpen && (
        <div className="absolute bottom-6 left-4 right-4 p-4 bg-[#f372721a] rounded-2xl border border-[#f3727245]">
           <div className="flex items-start gap-3 mb-3 text-xs">
            <div className="p-2 bg-orange-100 rounded-lg text-lg">📄</div>
            <div>
              <p className="font-bold text-gray-800">Obuna</p>
              <p className="text-red-500">Obunangiz tugagan</p>
            </div>
          </div>
          <button className="w-full bg-red-500 text-white py-2 rounded-xl text-[11px] font-semibold hover:bg-red-600 transition flex items-center justify-center gap-1">
            <span>⚡</span> Obunani yangilash
          </button>
        </div>
      )}
    </aside>
  );
}