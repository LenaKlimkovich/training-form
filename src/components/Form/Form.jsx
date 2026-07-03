import { useState } from "react";
import Tracker from "../Tracker/Tracker";

export default function Form ({onAdd}) {
   const [form, setForm] = useState({
    date: "",
    distance: ""
  });


 const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
     setForm({ date: "", distance: "" });
  };

  return (
    <div className="container">
      <div className="form-container"> 
        <form id="trainingForm" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
                    <input type="text" id="date" name="date" placeholder="20.07.2019" required
                      value={form.date}
          onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="distance">Пройдено км</label>
                    <input type="number" id="distance" name="distance" placeholder="5.7" step="0.1" min="0" required
                      value={form.distance}
          onChange={handleChange}/>
                </div>

                <button type="submit" className="submit-btn">OK</button>
            </div>
      </form>
      </div>
    </div>
  );
}
