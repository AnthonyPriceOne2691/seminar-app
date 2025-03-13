import React, { useEffect, useState } from "react";
import axios from "axios";
import SeminarList from "./components/SeminarList";
import EditModal from "./components/EditModal";

const App = () => {
  const [seminars, setSeminars] = useState([]);
  const [selectedSeminar, setSelectedSeminar] = useState(null);

  useEffect(() => {
    fetchSeminars();
  }, []);

  const fetchSeminars = async () => {
    try {
      const response = await axios.get("http://localhost:5000/seminars");
      setSeminars(response.data);
    } catch (error) {
      console.error("Ошибка загрузки семинаров", error);
    }
  };

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

  const openEditModal = (seminar) => {
    setSelectedSeminar(seminar);
  };

  const closeEditModal = () => {
    setSelectedSeminar(null);
  };

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
