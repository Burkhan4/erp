import { useState, useEffect } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

export default function Xonalar() {
  const [rooms, setRooms] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newRoom, setNewRoom] = useState({ name: "", capacity: "" });

  useEffect(() => {
    const savedRooms = JSON.parse(localStorage.getItem("rooms")) || [];
    setRooms(savedRooms);
  }, []);

  const handleAddRoom = () => {
    if (!newRoom.name || !newRoom.capacity) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    let updatedRooms;
    if (isEditing && editingIndex !== null) {
      updatedRooms = rooms.map((room, idx) =>
        idx === editingIndex ? { ...newRoom } : room
      );
    } else {
      updatedRooms = [...rooms, { ...newRoom }];
    }

    setRooms(updatedRooms);
    localStorage.setItem("rooms", JSON.stringify(updatedRooms));
    setNewRoom({ name: "", capacity: "" });
    setIsPanelOpen(false);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setNewRoom({ name: "", capacity: "" });
    setIsPanelOpen(false);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleDeleteRoom = (index) => {
    const updatedRooms = rooms.filter((_, idx) => idx !== index);
    setRooms(updatedRooms);
    localStorage.setItem("rooms", JSON.stringify(updatedRooms));
  };

  const handleEditRoom = (index) => {
    setNewRoom(rooms[index]);
    setEditingIndex(index);
    setIsEditing(true);
    setIsPanelOpen(true);
  };

  return (
    <div className="p-6 bg-white shadow-sm rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Xonalar</h2>
        <button
          onClick={() => {
            setNewRoom({ name: "", capacity: "" });
            setIsEditing(false);
            setEditingIndex(null);
            setIsPanelOpen(true);
          }}
          className="bg-purple-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Xonani qo'shish
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-gray-50 flex justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{room.name}</h3>
              <p className="text-gray-500">Sig'imi: {room.capacity}</p>
            </div>
            <div className="space-x-2 flex mt-4">
              <button
                onClick={() => handleEditRoom(index)}
                className="flex-1 cursor-pointer flex items-center justify-center p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDeleteRoom(index)}
                className="flex-1 cursor-pointer flex items-center justify-center p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isPanelOpen && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 flex flex-col transition-transform duration-300">
          <div className="p-6 flex-1 overflow-y-auto">
            <h3 className="text-lg font-bold mb-6">
              {isEditing ? "Xonani tahrirlash" : "Xonani qo'shish"}
            </h3>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nomi *</label>
              <input
                type="text"
                value={newRoom.name}
                onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Xona nomi"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sig'imi *</label>
              <input
                type="number"
                value={newRoom.capacity}
                onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Masalan: 20"
              />
            </div>
          </div>
          <div className="border-t p-6 flex justify-end space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Bekor qilish
            </button>
            <button
              onClick={handleAddRoom}
              className="px-4 py-2 cursor-pointer bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Saqlash
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
