import { useState } from "react";
import Form from '../Form/Form'
import Table from '../Table/Table'
import { v4 } from "uuid";


export default function Tracker() {
   const [trainings, setTrainings] = useState([]);

   const handleAddTraining = (training) => {
    const { date, distance } = training;
    const numDistance = parseFloat(distance);

setTrainings((prevTrainings) => {
      const existingIndex = prevTrainings.findIndex((t) => t.date === date);
    if (existingIndex !== -1) {
        const updated = [...prevTrainings];
        updated[existingIndex] = {
          ...updated[existingIndex],
          distance: parseFloat((updated[existingIndex].distance + numDistance).toFixed(1)),
        };
        return updated;
      } else {
        return [...prevTrainings, { id: v4(), date, distance: numDistance }];
      }
    });
  }

    const handleDeleteTraining = (id) => {
       setTrainings((prev) => prev.filter(p => p.id !==id))
}
 return (
    <div className="container">
      <Form onAdd={handleAddTraining} />
      <Table items={trainings} onDelete={handleDeleteTraining} />
    </div>
  );
}
