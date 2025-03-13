import React, { useEffect, useState } from "react";
import axios from "axios";
import SeminarList from "./components/SeminarList";
import EditModal from "./components/EditModal";

const App = () => {
  // Состояние списка семинаров
  const [seminars, setSeminars] = useState([]);
  // Состояние выбранного семинара
  const [selectedSeminar, setSelectedSeminar] = useState(null);

  // Хук useEffect для загрузки списка семинаров
  useEffect(() => {
    fetchSeminars();
  }, []);

  // Функция для загрузки списка семинаров
  const fetchSeminars = async () => {
    try {
      const response = await axios.get("http://localhost:5000/seminars");
      setSeminars(response.data);
    } catch (error) {
      console.error("Ошибка загрузки семинаров", error);
    }
  };

  // Функция для удаления семинара
  const deleteSeminar = async (id) => {
    if (window.confirm("Вы уверены, что хотите удалить семинар?")) {
      try {
        await axios.delete(`http://localhost:5000/seminars/${id}`);
        setSeminars(seminars.filter((seminar) => seminar.id !== id));
      } catch (error) {
        console.error("Ошибка удаления семинара", error);
      }
    }
  };

  // Функция для открытия модального окна редактирования
  const openEditModal = (seminar) => {
    setSelectedSeminar(seminar);
  };

  // Функция для закрытия модального окна редактирования
  const closeEditModal = () => {
    setSelectedSeminar(null);
  };

  // Функция для обновления семинара
  const updateSeminar = async (updatedSeminar) => {
    try {
      await axios.put(
        `http://localhost:5000/seminars/${updatedSeminar.id}`,
        updatedSeminar
      );
      setSeminars(
        seminars.map((s) => (s.id === updatedSeminar.id ? updatedSeminar : s))
      );
      closeEditModal();
    } catch (error) {
      console.error("Ошибка обновления семинара", error);
    }
  };

  return (
    <div>
      <h1>Список семинаров</h1>
      <SeminarList
        seminars={seminars}
        onEdit={openEditModal}
        onDelete={deleteSeminar}
      />
      {selectedSeminar && (
        <EditModal
          isOpen={!!selectedSeminar}
          seminar={selectedSeminar}
          onClose={closeEditModal}
          onSave={updateSeminar}
        />
      )}
    </div>
  );
};

export default App;
