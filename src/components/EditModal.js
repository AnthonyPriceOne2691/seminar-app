import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const EditModal = ({ isOpen, seminar, onClose, onSave }) => {
  const [formData, setFormData] = React.useState(seminar || {});

  React.useEffect(() => {
    setFormData(seminar || {});
  }, [seminar]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Редактировать семинар</h2>
      {seminar && (
        <div>
          <input
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
          />
          <input
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Сохранить</button>
          <button onClick={onClose}>Отмена</button>
        </div>
      )}
    </Modal>
  );
};

export default EditModal;
