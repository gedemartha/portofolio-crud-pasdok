import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientList from "./components/PatientList";
import EditPatient from "./components/EditPatient";
import Welcome from "./components/Welcome";
import AddPatient from "./components/AddPatient";
import DoctorList from "./components/DoctorList";
import AddDoctor from "./components/AddDoctor";
import EditDoctor from "./components/EditDoctor";
function App() {
  return (
    <div className="container h-screen overflow-x-auto ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/patients/add" element={<AddPatient />} />
          <Route path="/patients/edit/:id" element={<EditPatient />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/doctors/add" element={<AddDoctor />} />
          <Route path="/doctors/edit/:id" element={<EditDoctor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
