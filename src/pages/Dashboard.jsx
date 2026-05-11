import React, { useState } from 'react';
import { 
  UserGroupIcon, 
  BookOpenIcon, 
  UsersIcon, 
  GiftIcon, 
  AcademicCapIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const stats = [
    { name: 'Sinflar', value: 0, icon: UserGroupIcon },
    { name: 'Fanlar', value: 0, icon: BookOpenIcon },
    { name: 'Talabalar', value: 1, icon: UsersIcon },
    { name: "Sovg'alar", value: 3, icon: GiftIcon },
    { name: "O'qituvchilar", value: 0, icon: AcademicCapIcon },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Salom, creator!</h1>
        <p className="text-gray-500 text-sm mt-1">EduCoin platformasiga xush kelibsiz!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <div 
            key={stat.name}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
          >
            <div className="p-3 bg-purple-50 rounded-xl mb-3 group-hover:bg-purple-600 transition-colors duration-300">
              <stat.icon className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <span className="text-gray-500 text-sm font-medium">{stat.name}</span>
            <span className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <button 
          onClick={() => setIsScheduleOpen(!isScheduleOpen)}
          className="w-full cursor-pointer flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
        >
          <span className="text-gray-700 font-semibold">Dars Jadvali</span>
          <ChevronDownIcon 
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isScheduleOpen ? 'rotate-180' : ''}`} 
          />
        </button>
        
        <div className={`transition-all duration-300 ease-in-out ${isScheduleOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="p-6 border-t border-gray-50 text-gray-500 italic">
            Dars jadvali hali to'ldirilmagan.
          </div>
        </div>
      </div>
    </div>
  );
}