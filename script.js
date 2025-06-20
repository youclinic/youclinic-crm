let patients = [];
let selectedPatient = null;
let currentSection = "patients";

function showSection(section) {
  currentSection = section;
  selectedPatient = null;
  document.getElementById("patientDetails").classList.add("hidden");

  document.querySelectorAll(".section-buttons button").forEach(btn => {
    if (btn.getAttribute("data-section") === section) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  renderPatients();
}

function addPatient() {
  const name = prompt("Enter patient name:");
  const age = prompt("Enter child age:");
  const phone = prompt("Enter phone number:");
  const responsible = prompt("Enter seller/responsible name:");

  const newPatient = {
    name,
    age,
    phone,
    responsible,
    stage: "new",
    notes: "",
    file: null,
    createdAt: new Date().toLocaleString(),
    acceptedAt: new Date().toLocaleString()
  };

  patients.push(newPatient);
  renderPatients();
}

function renderPatients() {
  const tableBody = document.getElementById("patientTableBody");
  tableBody.innerHTML = "";

  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  patients
    .filter(p => p.name.toLowerCase().includes(searchTerm))
    .filter(p => {
      if (currentSection === "patients") return p.stage === "new";
      if (currentSection === "solds") return p.stage === "sold";
      if (currentSection === "aftercare") return p.stage === "aftercare";
      return false;
    })
    .forEach((p, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${p.name}</td>
        <td>${p.age}</td>
        <td>${p.phone}</td>
        <td>${p.responsible}</td>
      `;
      row.onclick = () => togglePatientDetails(index);
      tableBody.appendChild(row);
    });
}

function togglePatientDetails(index) {
  const detailCard = document.getElementById("patientDetails");

  if (selectedPatient === patients[index]) {
    selectedPatient = null;
    detailCard.classList.add("hidden");
    return;
  }

  selectedPatient = patients[index];

  detailCard.classList.remove("hidden");
  detailCard.innerHTML = `
  <h3>Patient Profile</h3>
  <p><strong>Name:</strong> ${selectedPatient.name}</p>
  <p><strong>Age:</strong> ${selectedPatient.age}</p>
  <p><strong>Phone:</strong> ${selectedPatient.phone}</p>
  <p><strong>Seller:</strong> ${selectedPatient.responsible}</p>
  <p><strong>Created:</strong> ${selectedPatient.createdAt}</p>
  <p><strong>Accepted:</strong> ${selectedPatient.acceptedAt}</p>

  <label>Upload File: 
    <input type="file" onchange="uploadFile(event)" />
  </label>
  ${selectedPatient.file ? `<p>File: <a href="${URL.createObjectURL(selectedPatient.file)}" target="_blank">${selectedPatient.file.name}</a></p>` : ""}
  
  <textarea placeholder="Notes..." onchange="saveNote(event)">${selectedPatient.notes}</textarea>

  ${selectedPatient.stage === "new" 
    ? `<button onclick="markAsSold()">Mark as Sold</button>` 
    : selectedPatient.stage === "sold" 
      ? `<button onclick="markAsTreated()">Treatment Done</button>` 
      : ""}
`;
}

function uploadFile(event) {
  if (selectedPatient) {
    selectedPatient.file = event.target.files[0];
    renderPatients();
    togglePatientDetails(patients.indexOf(selectedPatient)); // Güncelle
  }
}

function saveNote(event) {
  if (selectedPatient) {
    selectedPatient.notes = event.target.value;
  }
}

function markAsSold() {
  if (selectedPatient) {
    selectedPatient.stage = "sold";
    selectedPatient = null;
    document.getElementById("patientDetails").classList.add("hidden");
    renderPatients();
  }
}

function markAsTreated() {
  if (selectedPatient) {
    selectedPatient.stage = "aftercare";
    selectedPatient = null;
    document.getElementById("patientDetails").classList.add("hidden");
    renderPatients();
  }
}

renderPatients();
