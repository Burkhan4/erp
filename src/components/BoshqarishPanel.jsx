import { NavLink } from 'react-router-dom';
import { BookOpenIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';

export default function BoshqarishPanel() {
  return (
    <aside className="hidden lg:flex flex-col w-72 min-w-[18rem] bg-white border-r border-gray-100 shadow-xl overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 bg-white">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">Menu</p>
      </div>
      <nav className="flex-1 p-4 space-y-2 bg-white">
        <NavLink
          to="/dashboard/boshqarish/kurslar"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-3xl px-4 py-3 transition ${
              isActive ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-purple-50'
            }`
          }
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
            <BookOpenIcon className="w-5 h-5" />
          </span>
          <span className="font-medium">Kurslar</span>
        </NavLink>

        <NavLink
          to="/dashboard/boshqarish/xonalar"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-3xl px-4 py-3 transition ${
              isActive ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-purple-50'
            }`
          }
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
            <BuildingLibraryIcon className="w-5 h-5" />
          </span>
          <span className="font-medium">Xonalar</span>
        </NavLink>
      </nav>
    </aside>
  );
}
