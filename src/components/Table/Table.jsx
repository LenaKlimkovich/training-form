import TrainingItem from "../TrainingItem/TrainingItem";

export default function Table({ items, onDelete, onEdit }) {
  const sorted = [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <div className="data-table">
      <div className="table-header">
        <div className="col-date">Дата (ДД.ММ.ГГ)</div>
        <div className="col-distance">Пройдено км</div>
        <div className="col-actions">Действия</div>
      </div>
      {sorted.length === 0 ? (
        <div className="empty-state">Нет данных о тренировках</div>
      ) : (
        sorted.map((item) => (
          <TrainingItem
            key={item.id}
            item={item}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}
