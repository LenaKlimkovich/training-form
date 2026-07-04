import { useState } from "react";
import Form from '../Form/Form'
import Table from '../Table/Table'
import { v4 } from "uuid";


export default function Tracker() {
   const [trainings, setTrainings] = useState([]);
   const [editingTraining, setEditingTraining] = useState(null);

   const handleAddTraining = (training) => {
    const { date, distance } = training;
    const numDistance = parseFloat(distance);

setTrainings((prevTrainings) => {
      // Если мы редактировали существующий элемент
      if (editingTraining) {
        // Убираем старую версию элемента по его ID
        const filtered = prevTrainings.filter((t) => t.id !== editingTraining.id);
        
        // Проверяем, нет ли уже ДРУГОЙ записи с такой (новой) датой
        const existingIndex = filtered.findIndex((t) => t.date === date);

        if (existingIndex !== -1) {
          // Если дата совпала с уже существующей, суммируем километраж
          filtered[existingIndex] = {
            ...filtered[existingIndex],
            distance: parseFloat((filtered[existingIndex].distance + numDistance).toFixed(1)),
          };
          return filtered;
        } else {
          // Если дата уникальная, просто сохраняем измененный элемент под его старым ID
          return [...filtered, { id: editingTraining.id, date, distance: numDistance }];
        }
      }

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

    // Обязательно сбрасываем состояние редактирования после сохранения
    setEditingTraining(null);
  }

   const handleEditTraining = (id) => {
       const target = trainings.find(t => t.id === id);
       if (target) {
           setEditingTraining(target); 
       }
  }

  const handleDeleteTraining = (id) => {
       setTrainings((prev) => prev.filter(p => p.id !==id));
}
 return (
    <div className="container">
      <Form onAdd={handleAddTraining} editingItem={editingTraining}/>
      <Table items={trainings} onDelete={handleDeleteTraining} onEdit={handleEditTraining} />
    </div>
  );
}
