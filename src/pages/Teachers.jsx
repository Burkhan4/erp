import { useState, useEffect } from "react";
import { 
  PlusIcon, 
  FunnelIcon, 
  MagnifyingGlassIcon, 
  ArchiveBoxIcon, 
  ArrowUpTrayIcon, 
  ArrowDownTrayIcon,
  ArrowDownIcon, 
  EyeIcon, 
  PhotoIcon,
  PencilIcon, 
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

const initialTeacher = {
  name: "",
  phone: "",
  email: "",
  birthDate: "",
  groups: "",
  gender: "Erkak",
  coins: "0",
};

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newTeacher, setNewTeacher] = useState(initialTeacher);

  useEffect(() => {
    const savedTeachers = JSON.parse(localStorage.getItem("teachers")) || [];
    setTeachers(savedTeachers);
  }, []);

  const handleSaveTeacher = () => {
    if (
      !newTeacher.name ||
      !newTeacher.phone ||
      !newTeacher.email ||
      !newTeacher.birthDate
    ) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    const updatedTeachers =
      isEditing && editingIndex !== null
        ? teachers.map((teacher, index) =>
            index === editingIndex ? { ...newTeacher } : teacher,
          )
        : [...teachers, { ...newTeacher }];

    setTeachers(updatedTeachers);
    localStorage.setItem("teachers", JSON.stringify(updatedTeachers));
    setNewTeacher(initialTeacher);
    setIsPanelOpen(false);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setNewTeacher(initialTeacher);
    setIsPanelOpen(false);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleEditTeacher = (index) => {
    setNewTeacher(teachers[index]);
    setEditingIndex(index);
    setIsEditing(true);
    setIsPanelOpen(true);
  };

  const handleDeleteTeacher = (index) => {
    const updatedTeachers = teachers.filter((_, idx) => idx !== index);
    setTeachers(updatedTeachers);
    localStorage.setItem("teachers", JSON.stringify(updatedTeachers));
  };

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      {/* Header qismi */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">O'qituvchilar</h2>
          <p className="text-gray-500 text-sm mt-1">
            Ushbu sahifada siz o'qituvchilar ro'yxatini topasiz. Har bir
            o'qituvchining ismi, fanlari va aloqa ma'lumotlari keltirilgan.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition cursor-pointer">
            <ArrowUpTrayIcon className="w-5 h-5" />
            <span>Export</span>
          </button>
          <button
            onClick={() => {
              setNewTeacher(initialTeacher);
              setIsEditing(false);
              setEditingIndex(null);
              setIsPanelOpen(true);
            }}
            className="flex items-center gap-2 bg-[#6366F1] text-white px-4 py-2 rounded-lg hover:bg-[#5558e3] transition cursor-pointer shadow-sm"
          >
            <PlusIcon className="w-5 h-5" />
            <span>O'qituvchi qo'shish</span>
          </button>
        </div>
      </div>

      {/* Filter va Qidiruv */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <span>Filters</span>
          </button>
          <div className="flex items-center gap-2 ml-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
              <ArrowUpTrayIcon className="w-5 h-5" />
            </button>
            <button className="p-2 text-red-400 hover:text-red-600 cursor-pointer">
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition"
            />
          </div>
          <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 cursor-pointer">
            <span>Arxiv</span>
            <ArchiveBoxIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Jadval qismi */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase text-gray-400 font-medium">
              <th className="p-4 w-10">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="p-4 font-medium">
                Nomi <ArrowDownIcon className="inline w-3 h-3 ml-1" />
              </th>
              <th className="p-4 font-medium">Guruh</th>
              <th className="p-4 font-medium">Telefon raqamlari</th>
              <th className="p-4 font-medium">Tug'ilgan sanasi</th>
              <th className="p-4 font-medium">Yaratilgan sana</th>
              <th className="p-4 font-medium">Coin</th>
              <th className="p-4 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {teachers.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-10 text-center text-gray-400">
                  Hozircha hech qanday o'qituvchi yo'q.
                </td>
              </tr>
            ) : (
              teachers.map((teacher, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50/50 transition group"
                >
                  <td className="p-4">
                    <input type="checkbox" className="rounded cursor-pointer" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold text-sm overflow-hidden">
                        {/* Agar rasm bo'lsa <img />, yo'q bo'lsa initiallar */}
                        {teacher.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="font-medium text-gray-700">
                        {teacher.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1 flex-wrap">
                      {teacher.groups
                        .split(",")
                        .filter(Boolean)
                        .slice(0, 3)
                        .map((group, gIdx) => (
                          <span
                            key={gIdx}
                            className="px-2 py-1 bg-gray-50 border border-gray-100 text-[10px] text-gray-500 rounded-md"
                          >
                            Label
                          </span>
                        ))}
                      {teacher.groups.split(",").length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 text-[10px] text-gray-400 rounded-md">
                          +{teacher.groups.split(",").length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{teacher.phone}</td>
                  <td className="p-4 text-sm text-gray-500">
                    {teacher.birthDate}
                  </td>
                  <td className="p-4 text-sm text-gray-500">24 Jan 2022</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] text-white">
                        C
                      </div>
                      <span className="font-medium text-gray-700">
                        {teacher.coins}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1">
                      <div className="flex items-center bg-gray-50 rounded-lg mr-2">
                        <button className="p-1 px-2 text-red-500 hover:bg-red-50 rounded-l-lg transition cursor-pointer">
                          −
                        </button>
                        <button className="p-1 px-2 text-green-500 hover:bg-green-50 rounded-r-lg transition cursor-pointer">
                          +
                        </button>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-blue-500 cursor-pointer">
                        <EyeIcon className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
                        <ArrowDownTrayIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTeacher(index)}
                        className="p-2 text-gray-400 hover:text-red-500 cursor-pointer"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleEditTeacher(index)}
                        className="p-2 text-gray-400 hover:text-indigo-500 cursor-pointer"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination qismi */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
        <button className="flex items-center gap-2 px-3 py-1 border border-gray-200 rounded-lg hover:bg-white cursor-pointer transition">
          <ChevronLeftIcon className="w-4 h-4" /> Previous
        </button>
        <div className="flex gap-2">
          {[1, 2, 3, "...", 8, 9, 10].map((p, i) => (
            <button
              key={i}
              className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${p === 1 ? "bg-purple-50 text-purple-600 border border-purple-100" : "hover:bg-gray-100"}`}
            >
              {p}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-3 py-1 border border-gray-200 rounded-lg hover:bg-white cursor-pointer transition">
          Next <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>

      {isPanelOpen && (
        <div className="fixed right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl z-50 overflow-y-auto">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {isEditing
                    ? "O'qituvchini tahrirlash"
                    : "O'qituvchi qo'shish"}
                </h3>
                <p className="text-gray-500 mt-1">
                  Ma'lumotlarni to'ldirib, Saqlash tugmasini bosing.
                </p>
              </div>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon raqam
                </label>
                <input
                  type="text"
                  value={newTeacher.phone}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, phone: e.target.value })
                  }
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="+998..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mail
                </label>
                <input
                  type="email"
                  value={newTeacher.email}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, email: e.target.value })
                  }
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Elektron pochtani kiriting"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  O'qituvchi FIO
                </label>
                <input
                  type="text"
                  value={newTeacher.name}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, name: e.target.value })
                  }
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Ism, Familiya"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tug'ilgan sanasi
                </label>
                <input
                  type="date"
                  value={newTeacher.birthDate}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, birthDate: e.target.value })
                  }
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guruh
                </label>
                <input
                  type="text"
                  value={newTeacher.groups}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, groups: e.target.value })
                  }
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Guruhni vergul bilan ajrating"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jinsi
                </label>
                <div className="flex gap-4">
                  {["Erkak", "Ayol"].map((value) => (
                    <label
                      key={value}
                      className="inline-flex items-center gap-2 text-gray-700"
                    >
                      <input
                        type="radio"
                        name="teacherGender"
                        value={value}
                        checked={newTeacher.gender === value}
                        onChange={(e) =>
                          setNewTeacher({
                            ...newTeacher,
                            gender: e.target.value,
                          })
                        }
                        className="h-4 w-4 text-purple-600"
                      />
                      {value}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surati
                </label>
                <div className="flex min-h-30 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-gray-500">
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-10 w-10" />
                    <p className="mt-2 text-sm">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">
                      JPG yoki PNG (maks. 800x800px)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-5 py-3 rounded-2xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSaveTeacher}
                className="px-5 py-3 rounded-2xl bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
