import React from "react";

const SeminarItem = ({ seminar, onEdit, onDelete }) => {
  return (
    <li>
      <h3>{seminar.title}</h3>
      <p>{seminar.description}</p>
      <button onClick={() => onEdit(seminar)}>Редактировать</button>
      <button onClick={() => onDelete(seminar.id)}>Удалить</button>
    </li>
  );
};

export default SeminarItem;
