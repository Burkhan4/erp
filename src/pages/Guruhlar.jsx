import { useEffect, useMemo, useState } from "react";
import {
  PlusIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArchiveBoxIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

const days = [
  "Dushanba",
  "Seshanba",
  "Chorshanba",
  "Payshanba",
  "Juma",
  "Shanba",
  "Yakshanba",
];

const getInitials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export default function Guruhlar() {
  const [groups, setGroups] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: "",
    courseId: "",
    roomId: "",
    days: [],
    time: "",
    startDate: "",
    description: "",
    teacherId: "",
    studentIds: [],
    active: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem("guruhlar")) || [];
    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    const savedTeachers = JSON.parse(localStorage.getItem("teachers")) || [];
    const savedStudents = JSON.parse(localStorage.getItem("students")) || [];
    const savedRooms = JSON.parse(localStorage.getItem("rooms")) || [];

    setGroups(savedGroups);
    setCourses(savedCourses);
    setTeachers(savedTeachers);
    setStudents(savedStudents);
    setRooms(savedRooms);
  }, []);

  useEffect(() => {
    localStorage.setItem("guruhlar", JSON.stringify(groups));
  }, [groups]);

  const selectedCourse = useMemo(
    () => courses.find((course) => course.name === newGroup.courseId) || null,
    [courses, newGroup.courseId],
  );

  const selectedRoom = useMemo(
    () => rooms.find((room) => room.name === newGroup.roomId) || null,
    [rooms, newGroup.roomId],
  );

  const selectedTeacher = useMemo(
    () => teachers.find((teacher) => teacher.name === newGroup.teacherId) || null,
    [teachers, newGroup.teacherId],
  );

  const selectedStudents = useMemo(
    () =>
      students.filter((student) => newGroup.studentIds.includes(student.name)),
    [students, newGroup.studentIds],
  );

  const handleSaveGroup = () => {
    if (!newGroup.name || !newGroup.courseId || !newGroup.roomId || !newGroup.time || !newGroup.startDate) {
      alert("Iltimos, barcha zarur maydonlarni to'ldiring!");
      return;
    }

    const updatedGroups = isEditing && editingIndex !== null
      ? groups.map((group, idx) => idx === editingIndex ? { ...newGroup } : group)
      : [...groups, { ...newGroup }];

    setGroups(updatedGroups);
    setNewGroup({
      name: "",
      courseId: "",
      roomId: "",
      days: [],
      time: "",
      startDate: "",
      description: "",
      teacherId: "",
      studentIds: [],
      active: true,
    });
    setIsPanelOpen(false);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setNewGroup({
      name: "",
      courseId: "",
      roomId: "",
      days: [],
      time: "",
      startDate: "",
      description: "",
      teacherId: "",
      studentIds: [],
      active: true,
    });
    setIsPanelOpen(false);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleEditGroup = (index) => {
    setNewGroup(groups[index]);
    setEditingIndex(index);
    setIsEditing(true);
    setIsPanelOpen(true);
  };

  const handleToggleActive = (index) => {
    const updated = groups.map((group, idx) => idx === index ? { ...group, active: !group.active } : group);
    setGroups(updated);
  };

  const handleSelectTeacher = (name) => {
    setNewGroup({ ...newGroup, teacherId: name });
    setIsTeacherModalOpen(false);
  };

  const handleToggleStudent = (name) => {
    setNewGroup((prev) => {
      const selected = prev.studentIds.includes(name)
        ? prev.studentIds.filter((item) => item !== name)
        : [...prev.studentIds, name];
      return { ...prev, studentIds: selected };
    });
  };

  const teacherAvatars = teachers.slice(0, 4);
  const studentAvatars = students.slice(0, 4);

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Guruhlar</h2>
          <p className="text-gray-500 text-sm mt-1">
            Guruhlarni boshqarish va mavjud kurs, xona, o'qituvchi hamda talabalar bilan bog'lash.
          </p>
        </div>
        <button
          onClick={() => {
            setNewGroup({
              name: "",
              courseId: "",
              roomId: "",
              days: [],
              time: "",
              startDate: "",
              description: "",
              teacherId: "",
              studentIds: [],
              active: true,
            });
            setIsEditing(false);
            setEditingIndex(null);
            setIsPanelOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
        >
          <PlusIcon className="w-5 h-5" />
          Guruh qo'shish
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3 mb-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 text-gray-500 mb-4">
            <div className="h-10 w-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
              G
              </div>
            <span className="font-semibold">Jami guruhlar</span>
          </div>
          <p className="text-4xl font-bold text-gray-900">{groups.length}</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 text-gray-500 mb-4">
            <div className="h-10 w-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              O
n</div>
            <span className="font-semibold">O'qituvchilar</span>
          </div>
          <p className="text-4xl font-bold text-gray-900">{teachers.length}</p>
          <div className="mt-4 flex -space-x-2">
            {teacherAvatars.map((teacher) => (
              <div
                key={teacher.name}
                className="h-10 w-10 rounded-full border-2 border-white bg-purple-500 text-white flex items-center justify-center text-xs font-semibold"
              >
                {getInitials(teacher.name)}
              </div>
            ))}
            {teachers.length > 4 && (
              <div className="h-10 w-10 rounded-full border-2 border-white bg-gray-200 text-gray-600 grid place-items-center text-xs font-semibold">
                +{teachers.length - 4}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 text-gray-500 mb-4">
            <div className="h-10 w-10 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">
              U
            </div>
            <span className="font-semibold">O'quvchilar</span>
          </div>
          <p className="text-4xl font-bold text-gray-900">{students.length}</p>
          <div className="mt-4 flex -space-x-2">
            {studentAvatars.map((student) => (
              <div
                key={student.name}
                className="h-10 w-10 rounded-full border-2 border-white bg-green-500 text-white flex items-center justify-center text-xs font-semibold"
              >
                {getInitials(student.name)}
              </div>
            ))}
            {students.length > 4 && (
              <div className="h-10 w-10 rounded-full border-2 border-white bg-gray-200 text-gray-600 grid place-items-center text-xs font-semibold">
                +{students.length - 4}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="text-lg font-semibold text-gray-900">Guruhlar</div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 transition">
              <FunnelIcon className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 transition">
              <MagnifyingGlassIcon className="w-4 h-4" /> Search
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 transition">
              <ArchiveBoxIcon className="w-4 h-4" /> Arxiv
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Guruh nomi</th>
                <th className="px-6 py-4">Kurs</th>
                <th className="px-6 py-4">Davomiyligi</th>
                <th className="px-6 py-4">O'qituvchi</th>
                <th className="px-6 py-4">Talabalar</th>
                <th className="px-6 py-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {groups.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-gray-400">
                    Hozircha guruhlar yo'q. "Guruh qo'shish" tugmasini bosing.
                  </td>
                </tr>
              ) : (
                groups.map((group, index) => {
                  const course = courses.find((course) => course.name === group.courseId);
                  const teacher = teachers.find((teacher) => teacher.name === group.teacherId);

                  return (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleActive(index)}
                          className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold ${group.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                        >
                          {group.active ? "Faol" : "Faol emas"}
                        </button>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">{group.name}</td>
                      <td className="px-6 py-4">{course?.name || "-"}</td>
                      <td className="px-6 py-4">{course?.monthDuration ? `${course.monthDuration} oy` : "-"}</td>
                      <td className="px-6 py-4">{teacher ? teacher.name : "-"}</td>
                      <td className="px-6 py-4">{group.studentIds.length}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleEditGroup(index)}
                          className="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            const updated = groups.filter((_, idx) => idx !== index);
                            setGroups(updated);
                          }}
                          className="inline-flex items-center justify-center p-2 rounded-lg text-red-500 hover:bg-red-100 transition"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isPanelOpen && (
        <div className="fixed right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl z-50 overflow-y-auto">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {isEditing ? "Guruhni tahrirlash" : "Guruh qo'shish"}
                </h3>
                <p className="text-gray-500 mt-1">
                  Yangi guruh yaratish uchun quyidagi ma'lumotlarni kiriting.
                </p>
              </div>
              <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Guruh nomi *</label>
                <input
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Frontend 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kurs *</label>
                <select
                  value={newGroup.courseId}
                  onChange={(e) => setNewGroup({ ...newGroup, courseId: e.target.value })}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Tanlang</option>
                  {courses.map((course) => (
                    <option key={course.name} value={course.name}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Xona *</label>
                <select
                  value={newGroup.roomId}
                  onChange={(e) => setNewGroup({ ...newGroup, roomId: e.target.value })}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Tanlang</option>
                  {rooms.map((room) => (
                    <option key={room.name} value={room.name}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dars kunlari</label>
                  <div className="grid grid-cols-2 gap-2">
                    {days.map((day) => (
                      <label key={day} className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 px-3 py-2 text-sm text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newGroup.days.includes(day)}
                          onChange={() => {
                            const nextDays = newGroup.days.includes(day)
                              ? newGroup.days.filter((item) => item !== day)
                              : [...newGroup.days, day];
                            setNewGroup({ ...newGroup, days: nextDays });
                          }}
                          className="h-4 w-4 text-purple-600"
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dars vaqti *</label>
                  <input
                    type="time"
                    value={newGroup.time}
                    onChange={(e) => setNewGroup({ ...newGroup, time: e.target.value })}
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Boshlanish sanasi *</label>
                  <input
                    type="date"
                    value={newGroup.startDate}
                    onChange={(e) => setNewGroup({ ...newGroup, startDate: e.target.value })}
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Davomiyligi</label>
                  <input
                    readOnly
                    value={selectedCourse?.monthDuration ? `${selectedCourse.monthDuration} oy` : "Kursni tanlang"}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tavsif</label>
                <textarea
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
                  placeholder="Guruh haqida qo'shimcha ma'lumot (ixtiyoriy)"
                />
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">O'qituvchi</p>
                      <p className="text-xs text-gray-500">Mavjud o'qituvchilar orasidan tanlang.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsTeacherModalOpen(true)}
                      className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700 transition"
                    >
                      <PlusIcon className="w-4 h-4" />
                      Qo'shish
                    </button>
                  </div>
                  <div className="rounded-2xl bg-white border border-gray-200 p-4">
                    {selectedTeacher ? (
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-purple-500 text-white grid place-items-center text-sm font-semibold">
                          {getInitials(selectedTeacher.name)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{selectedTeacher.name}</p>
                          <p className="text-sm text-gray-500">{selectedTeacher.email}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Hozircha o'qituvchi tanlanmagan.</p>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Talabalar</p>
                      <p className="text-xs text-gray-500">Mavjud talabalar orasidan tanlang.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsStudentModalOpen(true)}
                      className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700 transition"
                    >
                      <PlusIcon className="w-4 h-4" />
                      Qo'shish
                    </button>
                  </div>
                  <div className="rounded-2xl bg-white border border-gray-200 p-4">
                    {selectedStudents.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedStudents.map((student) => (
                          <span key={student.name} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                            {student.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Hozircha talaba tanlanmagan.</p>
                    )}
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
                onClick={handleSaveGroup}
                className="px-5 py-3 rounded-2xl bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {isTeacherModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 grid place-items-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">O'qituvchi qo'shish</h4>
                <p className="text-sm text-gray-500">Iltimos, mavjud o'qituvchilardan birini tanlang.</p>
              </div>
              <button onClick={() => setIsTeacherModalOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-6 space-y-4">
              {teachers.length === 0 ? (
                <p className="text-gray-500">Hech qanday o'qituvchi mavjud emas.</p>
              ) : (
                teachers.map((teacher) => (
                  <button
                    key={teacher.name}
                    type="button"
                    onClick={() => handleSelectTeacher(teacher.name)}
                    className="w-full rounded-2xl border border-gray-200 p-4 text-left hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-purple-500 text-white grid place-items-center font-semibold">
                        {getInitials(teacher.name)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{teacher.name}</p>
                        <p className="text-sm text-gray-500">{teacher.email}</p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {isStudentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 grid place-items-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Talaba qo'shish</h4>
                <p className="text-sm text-gray-500">Iltimos, qidiruv orqali talabalarni tanlang.</p>
              </div>
              <button onClick={() => setIsStudentModalOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-6 space-y-4">
              {students.length === 0 ? (
                <p className="text-gray-500">Hech qanday talaba mavjud emas.</p>
              ) : (
                students.map((student) => (
                  <label
                    key={student.name}
                    className="flex items-center justify-between rounded-2xl border border-gray-200 p-4 hover:bg-gray-50 transition cursor-pointer"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.email || "Email mavjud emas"}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={newGroup.studentIds.includes(student.name)}
                      onChange={() => handleToggleStudent(student.name)}
                      className="h-5 w-5 text-purple-600"
                    />
                  </label>
                ))
              )}
            </div>
            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
              <button
                type="button"
                onClick={() => setIsStudentModalOpen(false)}
                className="px-4 py-2 rounded-2xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Bekor qilish
              </button>
              <button
                type="button"
                onClick={() => setIsStudentModalOpen(false)}
                className="px-4 py-2 rounded-2xl bg-purple-600 text-white hover:bg-purple-700 transition"
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
