import { useEffect, useMemo, useState } from "react";
import {
  PlusIcon,
  ArrowUpTrayIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArchiveBoxIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const getInitials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const initialStudent = {
  name: "",
  phone: "",
  email: "",
  birthDate: "",
  address: "",
  password: "",
  group: "",
};

export default function Students() {
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newStudent, setNewStudent] = useState(initialStudent);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem("students")) || [];
    const savedGroups = JSON.parse(localStorage.getItem("guruhlar")) || [];

    setStudents(savedStudents);
    setGroups(savedGroups);
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("guruhlar", JSON.stringify(groups));
  }, [groups]);

  const selectedGroup = useMemo(
    () => groups.find((group) => group.name === newStudent.group) || null,
    [groups, newStudent.group],
  );

  const totalPages = Math.max(1, Math.ceil(students.length / itemsPerPage));
  const paginatedStudents = students.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const assignStudentToGroup = (groupName, studentName) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.name !== groupName) return group;
        const studentIds = Array.isArray(group.studentIds) ? group.studentIds : [];
        if (!studentIds.includes(studentName)) {
          return { ...group, studentIds: [...studentIds, studentName] };
        }
        return group;
      }),
    );
  };

  const removeStudentFromGroup = (groupName, studentName) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.name !== groupName) return group;
        const studentIds = Array.isArray(group.studentIds) ? group.studentIds.filter((id) => id !== studentName) : [];
        return { ...group, studentIds };
      }),
    );
  };

  const handleSaveStudent = () => {
    if (!newStudent.name || !newStudent.phone || !newStudent.email || !newStudent.birthDate) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    if (isEditing && editingIndex !== null) {
      const oldStudent = students[editingIndex];
      if (oldStudent.group && oldStudent.group !== newStudent.group) {
        removeStudentFromGroup(oldStudent.group, oldStudent.name);
      }
      if (newStudent.group && oldStudent.group !== newStudent.group) {
        assignStudentToGroup(newStudent.group, newStudent.name);
      }

      setStudents((prev) =>
        prev.map((student, idx) => (idx === editingIndex ? { ...newStudent } : student)),
      );
    } else {
      if (newStudent.group) {
        assignStudentToGroup(newStudent.group, newStudent.name);
      }
      setStudents((prev) => [...prev, { ...newStudent }]);
    }

    setNewStudent(initialStudent);
    setIsPanelOpen(false);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setNewStudent(initialStudent);
    setIsPanelOpen(false);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleEditStudent = (index) => {
    setNewStudent(students[index]);
    setIsEditing(true);
    setEditingIndex(index);
    setIsPanelOpen(true);
  };

  const handleDeleteStudent = (index) => {
    const student = students[index];
    if (student.group) {
      removeStudentFromGroup(student.group, student.name);
    }
    setStudents((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSelectGroup = (groupName) => {
    setNewStudent((prev) => ({ ...prev, group: groupName }));
    setIsGroupModalOpen(false);
  };

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Talabalar</h2>
          <p className="text-gray-500 text-sm mt-1">
            Ushbu sahifada siz talabalar ro'yxatini va ularning ma'lumotlarini ko'rishingiz mumkin.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition cursor-pointer">
            <ArrowUpTrayIcon className="w-5 h-5" />
            <span>Export</span>
          </button>
          <button
            onClick={() => {
              setNewStudent(initialStudent);
              setIsEditing(false);
              setEditingIndex(null);
              setIsPanelOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition cursor-pointer shadow-sm"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Talaba qo'shish</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-80">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition">
            <FunnelIcon className="w-4 h-4" /> Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition">
            <ArchiveBoxIcon className="w-4 h-4" /> Arxiv
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 overflow-x-auto">
        <table className="min-w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="px-6 py-4">Nomi</th>
              <th className="px-6 py-4">Guruh</th>
              <th className="px-6 py-4">Telefon raqamlari</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Tug'ilgan sanasi</th>
              <th className="px-6 py-4">Manzil</th>
              <th className="px-6 py-4">Yaratilgan sana</th>
              <th className="px-6 py-4 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-6 py-10 text-center text-gray-400">
                  Hozircha hech qanday talaba yo'q.
                </td>
              </tr>
            ) : (
              paginatedStudents.map((student, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded cursor-pointer" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-700 grid place-items-center font-semibold">
                        {getInitials(student.name)}
                      </div>
                      <span className="font-medium text-gray-800">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{student.group || "-"}</td>
                  <td className="px-6 py-4 text-gray-600">{student.phone}</td>
                  <td className="px-6 py-4 text-gray-600">{student.email}</td>
                  <td className="px-6 py-4 text-gray-600">{student.birthDate}</td>
                  <td className="px-6 py-4 text-gray-600">{student.address}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date().toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition">
                        <EyeIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleEditStudent(index)}
                        className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-gray-100 transition"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(index)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-100 transition"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="flex items-center gap-2 px-3 py-1 border border-gray-200 rounded-lg hover:bg-white cursor-pointer transition"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition ${page === currentPage ? "bg-purple-50 text-purple-600 border border-purple-100" : "hover:bg-gray-100"}`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="flex items-center gap-2 px-3 py-1 border border-gray-200 rounded-lg hover:bg-white cursor-pointer transition"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {isPanelOpen && (
        <div className="fixed right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl z-50 overflow-y-auto">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {isEditing ? "Talabani tahrirlash" : "Talaba qo'shish"}
                </h3>
                <p className="text-gray-500 mt-1">Bu yerda siz yangi Talaba qo'shishingiz mumkin.</p>
              </div>
              <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon raqam</label>
                <input
                  type="text"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="+998"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mail</label>
                <input
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Elektron pochtani kiriting"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Talaba FIO</label>
                <input
                  type="text"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Ma'lumotni kiriting"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tug'ilgan sanasi</label>
                <input
                  type="date"
                  value={newStudent.birthDate}
                  onChange={(e) => setNewStudent({ ...newStudent, birthDate: e.target.value })}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Manzil</label>
                <input
                  type="text"
                  value={newStudent.address}
                  onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Manzilni kiriting"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parol</label>
                <input
                  type="password"
                  value={newStudent.password}
                  onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Parolni kiriting"
                />
              </div>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Guruh</p>
                    <p className="text-xs text-gray-500">Bir guruh tanlang.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsGroupModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700 transition"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Guruh qo'shish
                  </button>
                </div>
                <div className="rounded-2xl bg-white border border-gray-200 p-4">
                  {selectedGroup ? (
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-500 text-white grid place-items-center font-semibold">
                        {getInitials(selectedGroup.name)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{selectedGroup.name}</p>
                        <p className="text-sm text-gray-500">{selectedGroup.courseId || "Kurs ma'lumotlari"}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Hozircha guruh tanlanmagan.</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Surati</label>
                <div className="flex min-h-30 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-gray-500">
                  <div className="text-center">
                    <p className="text-sm">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400">JPG or PNG (max. 2 MB)</p>
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
                onClick={handleSaveStudent}
                className="px-5 py-3 rounded-2xl bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {isGroupModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 grid place-items-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Guruhga biriktirish</h4>
                <p className="text-sm text-gray-500">Bir yoki bir nechta guruhni tanlang.</p>
              </div>
              <button onClick={() => setIsGroupModalOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="rounded-2xl border border-gray-200 p-4">
                <input
                  type="text"
                  placeholder="Guruh qidirish..."
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {groups.length === 0 ? (
                <p className="text-gray-500">Hech qanday guruh mavjud emas.</p>
              ) : (
                groups.map((group) => (
                  <button
                    key={group.name}
                    type="button"
                    onClick={() => handleSelectGroup(group.name)}
                    className="w-full rounded-2xl border border-gray-200 p-4 text-left hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-gray-900">{group.name}</p>
                        <p className="text-sm text-gray-500">{group.courseId || "Kurs bilgisi yo'q"}</p>
                      </div>
                      <input
                        type="radio"
                        checked={newStudent.group === group.name}
                        readOnly
                        className="h-4 w-4 text-purple-600"
                      />
                    </div>
                  </button>
                ))
              )}
            </div>
            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
              <button
                type="button"
                onClick={() => setIsGroupModalOpen(false)}
                className="px-4 py-2 rounded-2xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Bekor qilish
              </button>
              <button
                type="button"
                onClick={() => setIsGroupModalOpen(false)}
                className="px-4 py-2 rounded-2xl bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                Qo'shish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
