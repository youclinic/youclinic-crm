// Updated React CRM App with patient detail toggle, file upload, tab switch behavior fix, and refined styling
import React, { useState } from "react";
import "./App.css";

function App() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [section, setSection] = useState("patients");
  const [searchTerm, setSearchTerm] = useState("");

  const addPatient = () => {
    const name = prompt("Enter patient name:");
    const age = prompt("Enter child age:");
    const phone = prompt("Enter phone number:");
    const responsible = prompt("Enter responsible name:");
    const newPatient = {
      name,
      age,
      phone,
      responsible,
      created: new Date().toLocaleString(),
      acceptedAt: new Date().toLocaleString(),
      stage: "new",
      file: null,
      notes: "",
    };
    setPatients([...patients, newPatient]);
    setSelectedPatient(null);
  };

  const selectPatient = (patient) => {
    if (selectedPatient === patient) {
      setSelectedPatient(null);
    } else {
      setSelectedPatient(patient);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const updatedPatients = patients.map((p) =>
      p === selectedPatient ? { ...p, file } : p
    );
    setPatients(updatedPatients);
  };

  const handleNoteChange = (e) => {
    const updatedPatients = patients.map((p) =>
      p === selectedPatient ? { ...p, notes: e.target.value } : p
    );
    setPatients(updatedPatients);
  };

  const markAsSold = () => {
    const updatedPatients = patients.map((p) =>
      p === selectedPatient ? { ...p, stage: "sold" } : p
    );
    setPatients(updatedPatients);
    setSelectedPatient(null);
  };

  const markAsTreated = () => {
    const updatedPatients = patients.map((p) =>
      p === selectedPatient ? { ...p, stage: "aftercare" } : p
    );
    setPatients(updatedPatients);
    setSelectedPatient(null);
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedPatients = filteredPatients.filter(
    (p) =>
      (section === "patients" && p.stage === "new") ||
      (section === "solds" && p.stage === "sold") ||
      (section === "aftercare" && p.stage === "aftercare")
  );

  return (
    <div className="App">
      <div className="sidebar">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h2>YOU CLINIC CRM</h2>
        <div className="tabs">
          <button onClick={() => setSection("patients")}>Patients</button>
          <button onClick={() => setSection("solds")}>Solds</button>
          <button onClick={() => setSection("aftercare")}>Aftercare</button>
        </div>
      </div>

      <div className="main">
        <div className="toolbar">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={addPatient}>Add Patient</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Responsible</th>
            </tr>
          </thead>
          <tbody>
            {displayedPatients.map((p, i) => (
              <tr key={i} onClick={() => selectPatient(p)}>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.phone}</td>
                <td>{p.responsible}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedPatient && (
          <div className="patient-profile">
            <h3>Patient Profile</h3>
            <p><strong>Name:</strong> {selectedPatient.name}</p>
            <p><strong>Child Age:</strong> {selectedPatient.age}</p>
            <p><strong>Phone:</strong> {selectedPatient.phone}</p>
            <p><strong>Responsible:</strong> {selectedPatient.responsible}</p>
            <p><strong>Created:</strong> {selectedPatient.created}</p>
            <p><strong>Accepted:</strong> {selectedPatient.acceptedAt}</p>

            <input type="file" onChange={handleFileChange} />
            {selectedPatient.file && <p>File: {selectedPatient.file.name}</p>}

            <textarea
              placeholder="Add notes..."
              value={selectedPatient.notes}
              onChange={handleNoteChange}
            />

            <button onClick={markAsSold}>Mark as Sold</button>
            <button onClick={markAsTreated}>Treatment Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;