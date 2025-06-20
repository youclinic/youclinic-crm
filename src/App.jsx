import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [patients, setPatients] = useState(() => {
  const saved = localStorage.getItem("patients");
  return saved ? JSON.parse(saved) : [];
});
  const [sel, setSel] = useState(null);
  const [section, setSec] = useState("patients");
  const [search, setSearch] = useState("");

  const add = () => {
    const name = prompt("Adı:");
    if (!name) return;
    const newOne = { name, age: prompt("Yaşı:"), phone: prompt("Telefon:"), responsible: prompt("Sorumlu:"), stage: "new", created: new Date().toLocaleString(), acceptedAt: new Date().toLocaleString(), notes: "", file: null };
    const add = () => {
  const name = prompt("Adı:");
  if (!name) return;
  const newOne = {
    name,
    age: prompt("Yaşı?"),
    phone: prompt("Telefon?"),
    responsible: prompt("Sorumlu:"),
    stage: "new",
    created: new Date().toLocaleString(),
    acceptedAt: new Date().toLocaleString(),
  };
  const newList = [...patients, newOne];
  localStorage.setItem("patients", JSON.stringify(newList));
  setPatients(newList);
};
  };

  const toggleSel = (p) => setSel(sel === p ? null : p);

  const update = (key, value) => {
    setPatients(patients.map(p => p === sel ? { ...p, [key]: value } : p));
  };

  const move = (toStage) => {
    update("stage", toStage);
    setSel(null);
  };

  const list = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) && p.stage === section);

  return (
    <div className="App">
      <div className="sidebar">
        <img src="/logo.png" alt="Logo" style={{ height: '40px', marginBottom: '20px' }} />
        <h2>You Clinic CRM</h2>
        <button className={section==="patients" ? "active" : ""} onClick={()=>setSec("patients")}>Patients</button>
        <button className={section==="solds" ? "active" : ""} onClick={()=>setSec("solds")}>Solds</button>
        <button className={section==="aftercare" ? "active" : ""} onClick={()=>setSec("aftercare")}>Aftercare</button>
      </div>
      <div className="main">
        <div className="toolbar">
          <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} />
          <button onClick={add}>Add Patient</button>
        </div>
        <table>
          <thead><tr><th>Ad</th><th>Yaş</th><th>Tel</th><th>Anne/Baba</th></tr></thead>
          <tbody>
            {list.map((p,i)=>(
              <tr key={i} className={p===sel ? "selected" : ""} onClick={()=>toggleSel(p)}>
                <td>{p.name}</td><td>{p.age}</td><td>{p.phone}</td><td>{p.responsible}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {sel && (
          <div className="detail">
            <h3>{sel.name}</h3>
            <p><b>Yaş:</b> {sel.age}</p>
            <p><b>Telefon:</b> {sel.phone}</p>
            <p><b>Sorumlu:</b> {sel.responsible}</p>
            <p><b>Not:</b></p>
            <textarea value={sel.notes} onChange={(e)=>update("notes",e.target.value)} />
            <div className="btns">
              {section==="patients" && <button onClick={()=>move("solds")}>Mark as Sold</button>}
              {section==="solds" && <button onClick={()=>move("aftercare")}>Treatment Done</button>}
            </div>
          </div>
        )}
      </div>
    </div>
);
}
