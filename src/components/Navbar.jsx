import React, { useState } from 'react';
import { BellIcon, SunIcon, MoonIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [lang, setLang] = useState('O\'zbekcha');
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  const [isDark, setIsDark] = useState(false);

  const languages = ['O\'zbekcha', 'English', 'Русский'];

  return (
    <nav className="w-full bg-gray-50 border-gray-200 px-6 py-3 flex items-center justify-end">

      <div className="flex items-center gap-4">
        
        <div className="relative">
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
          >
            {lang}
            <ChevronDownIcon className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 rounded-lg shadow-xl z-50">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l);
                    setIsLangOpen(false);
                  }}
                  className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 first:rounded-t-lg last:rounded-b-lg"
                >
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>

        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors duration-300 relative overflow-hidden"
        >
          <div className="relative w-6 h-6">
            <SunIcon 
              className={`w-6 h-6 text-yellow-500 absolute transition-all duration-500 transform ${
                isDark ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-10 opacity-0 rotate-90'
              }`} 
            />
            <MoonIcon 
              className={`w-6 h-6 text-gray-600 absolute transition-all duration-500 transform ${
                !isDark ? 'translate-y-0 opacity-100 rotate-0' : '-translate-y-10 opacity-0 -rotate-90'
              }`} 
            />
          </div>
        </button>

        <button className="p-2 cursor-pointer rounded-full hover:bg-gray-100 text-gray-600">
          <BellIcon className="w-6 h-6" />
        </button>

        <div className="flex items-center">
          <img 
            src="/img/images.jpg" 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover border border-gray-200 cursor-pointer hover:opacity-80 transition"
          />
        </div>

      </div>
    </nav>
  );
}