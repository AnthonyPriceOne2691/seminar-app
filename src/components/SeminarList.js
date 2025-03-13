import React from "react";
import SeminarItem from "./SeminarItem";

const SeminarList = ({ seminars, onEdit, onDelete }) => {
  return (
    <ul>
      {seminars.map((seminar) => (
        <SeminarItem
          key={seminar.id}
          seminar={seminar}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default SeminarList;
