import { useState } from "react";
import Form from "../Form/Form";
import Table from "../Table/Table";
import { v4 } from "uuid";

const formatDate = (date) => {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
};

const formatDateToTimestamp = (date) => {
  const [day, month, year] = date.split(".");
  return new Date(`${year}-${month}-${day}`).getTime();
};

export default function Tracker() {
  const [trainings, setTrainings] = useState([]);
  const [editingTraining, setEditingTraining] = useState(null);

  const handleAddTraining = (training) => {
    const formattedDate = formatDate(training.date);
    const numDistance = parseFloat(training.distance);

    setTrainings((prevTrainings) => {
      let updatedList = [...prevTrainings];

      if (editingTraining) {
        updatedList = updatedList.filter((t) => t.id !== editingTraining.id);
      }

      const existingIndex = updatedList.findIndex(
        (t) => t.date === formattedDate,
      );

      if (existingIndex !== -1) {
        const oldDistance = parseFloat(updatedList[existingIndex].distance);

        const totalDistance = oldDistance + numDistance;

        updatedList[existingIndex] = {
          ...updatedList[existingIndex],
          distance: totalDistance.toFixed(1),
        };
      } else {
        updatedList.push({
          id: editingTraining ? editingTraining.id : v4(),
          date: formattedDate,
          distance: numDistance.toFixed(1),
        });
      }
      return updatedList.sort(
        (a, b) => formatDateToTimestamp(b.date) - formatDateToTimestamp(a.date),
      );
    });

    setEditingTraining(null);
  };

  const handleEditTraining = (item) => {
    const [day, month, year] = item.date.split(".");
    setEditingTraining({
      ...item,
      date: `${year}-${month}-${day}`,
    });
  };

  const handleDeleteTraining = (training) => {
    setTrainings((prev) => prev.filter((p) => p.id !== training.id));
  };

  return (
    <div className="container">
      <Form
        key={editingTraining?.id || "new"}
        onAdd={handleAddTraining}
        editingItem={editingTraining}
      />
      <Table
        items={trainings}
        onDelete={handleDeleteTraining}
        onEdit={handleEditTraining}
      />
    </div>
  );
}
