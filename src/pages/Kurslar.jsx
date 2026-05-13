import { useState, useEffect } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

export default function Kurslar() {
  const [courses, setCourses] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newCourse, setNewCourse] = useState({
    name: "",
    classDuration: "",
    monthDuration: "",
    price: "",
    description: "",
    color: "#7C3AED",
  });

  const colors = [
    "#1f293748",
    "#7c3aed44",
    "#dc262657",
    "#ea5a0c4a",
    "#0596683d",
    "#036aa143",
    "#2564eb40",
    "#9233ea39",
    "#db277833",
  ];

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(savedCourses);
  }, []);

  const handleAddCourse = () => {
    if (
      !newCourse.name ||
      !newCourse.classDuration ||
      !newCourse.monthDuration ||
      !newCourse.price ||
      !newCourse.description
    ) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    let updatedCourses;
    if (isEditing && editingIndex !== null) {
      updatedCourses = courses.map((course, idx) =>
        idx === editingIndex ? { ...newCourse } : course
      );
    } else {
      updatedCourses = [...courses, { ...newCourse }];
    }

    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
    setNewCourse({
      name: "",
      classDuration: "",
      monthDuration: "",
      price: "",
      description: "",
      color: "#7C3AED",
    });
    setIsPanelOpen(false);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setNewCourse({
      name: "",
      classDuration: "",
      monthDuration: "",
      price: "",
      description: "",
      color: "#7C3AED",
    });
    setIsPanelOpen(false);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleDeleteCourse = (index) => {
    const updatedCourses = courses.filter((_, idx) => idx !== index);
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };

  const handleEditCourse = (index) => {
    setNewCourse(courses[index]);
    setEditingIndex(index);
    setIsEditing(true);
    setIsPanelOpen(true);
  };

  return (
    <div className="p-6 bg-white shadow-sm rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Kurslar</h2>
        <button
          onClick={() => {
            setNewCourse({
              name: "",
              classDuration: "",
              monthDuration: "",
              price: "",
              description: "",
              color: "#7C3AED",
            });
            setIsEditing(false);
            setEditingIndex(null);
            setIsPanelOpen(true);
          }}
          className="bg-purple-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Kurs qo'shish
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {courses.map((course, index) => (
          <div
            key={index}
            className="p-4 rounded-lg shadow-sm flex justify-between"
            style={{ backgroundColor: course.color }}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {course.name}
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                {course.classDuration} min
              </p>
              <p className="text-gray-500 text-sm">{course.monthDuration} oylar</p>
              <p className="text-gray-700 font-semibold mt-2">
                {course.price} so'm
              </p>
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleEditCourse(index)}
                className="flex-1 flex items-center cursor-pointer justify-center p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDeleteCourse(index)}
                className="flex-1 flex items-center cursor-pointer justify-center p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isPanelOpen && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 flex flex-col transition-transform duration-300 overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">
                {isEditing ? "Kursni tahrirlash" : "Kurs qo'shish"}
              </h3>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomi
              </label>
              <input
                type="text"
                value={newCourse.name}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="HR Manager..."
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dars davomiyligi
              </label>
              <select
                value={newCourse.classDuration}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, classDuration: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="">Tanlang</option>
                <option value="60">60 min</option>
                <option value="90">90 min</option>
                <option value="120">120 min</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dars davomiyligi (oylarida)
              </label>
              <select
                value={newCourse.monthDuration}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, monthDuration: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="">Tanlang</option>
                <option value="1">1 oy</option>
                <option value="3">3 oy</option>
                <option value="6">6 oy</option>
                <option value="12">12 oy</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Narx
              </label>
              <input
                type="number"
                value={newCourse.price}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, price: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="1 000 000 so'm"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 min-h-24"
                placeholder="A little about the company and the team that you'll be working with."
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Rangi
              </label>
              <p className="text-gray-600 text-sm mb-3">
                Tanlagan rang foydalanuvchilarga va rol ro'yxatida ko'rsatiladi.
              </p>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewCourse({ ...newCourse, color })}
                    className={`w-8 h-8 rounded-full transition ${
                      newCourse.color === color ? "ring-2 ring-offset-2 ring-gray-400" : ""
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="border-t p-6 flex justify-end space-x-3 mt-auto">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Bekor qilish
            </button>
            <button
              onClick={handleAddCourse}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Saqlash
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
