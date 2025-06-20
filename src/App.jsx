import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [patients, setPatients] = useState([]);
  const [sel, setSel] = useState(null);
  const [section, setSec] = useState("patients");
  const [search, setSearch] = useState("");

  // Sayfa açıldığında localStorage'dan hastaları yükle
  useEffect(() => {
    const saved = localStorage.getItem("patients");
    if (saved) {
      setPatients(JSON.parse(saved));
    }
  }, []);

  // Her hastalar listesi değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

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
    setPatients([...patients, newOne]);
  };

  const toggleSel = (p) => setSel(sel === p ? null : p);

  const update = (key, value) => {
    setPatients(
      patients.map((p) => (p === sel ? { ...p, [key]: value } : p))
    );
  };

  const move = (toStage) => {
    update("stage", toStage);
    setSel(null);
  };

  const list = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      p.stage === section
  );

  return (
    <div className="App">
      <div className="sidebar">
        <img src="/logo.png" alt="Logo" style={{ height: "40px", marginBottom: "20px" }} />
        <h2>You Clinic CRM</h2>
        <button className={section === "patients" ? "active" : ""} onClick={() => setSec("patients")}>Patients</button>
        <button className={section === "solds" ? "active" : ""} onClick={() => setSec("solds")}>Solds</button>
        <button className={section === "aftercare" ? "active" : ""} onClick={() => setSec("aftercare")}>Aftercare</button>
      </div>

      <div className="main">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
        <button onClick={add}>Add Patient</button>
        <table>
          <thead>
            <tr>
              <th>Ad</th>
              <th>Yaş</th>
              <th>Tel</th>
              <th>Anne/Baba</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p, i) => (
              <tr key={i} onClick={() => toggleSel(p)}>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.phone}</td>
                <td>{p.responsible}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
console.log("Hasta listesi:", patients);
