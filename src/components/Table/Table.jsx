export default function Table({ items, onDelete }) {
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
        ) : 
(sorted.map(item => (
<div className="table-row" key={item.id}>
                <div className="col-date">{item.date}</div>
                <div className="col-distance">{item.distance}</div>
                <div className="col-actions">
                    <button className="action-btn edit-btn" title="Редактировать">✎</button>
                    <button className="action-btn delete-btn" onClick={() => onDelete(item.id)}  title="Удалить">✕</button>
                </div>
            </div>)
))}
           
        </div>
  );
}
