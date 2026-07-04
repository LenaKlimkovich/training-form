export default function TrainingItem({ item, onEdit, onDelete }) {
  return (
    <div className="table-row" key={item.id}>
      <div className="col-date">{item.date}</div>
      <div className="col-distance">{item.distance}</div>
      <div className="col-actions">
        <button
          className="action-btn edit-btn"
          onClick={() => onEdit(item)}
          title="Редактировать"
        >
          ✎
        </button>
        <button
          className="action-btn delete-btn"
          onClick={() => onDelete(item)}
          title="Удалить"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
