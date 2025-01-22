import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";

const PatientList = () => {
  const { mutate } = useSWRConfig();
  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/patients");

    return response.data;
  };

  const { data } = useSWR("patients", fetcher);
  if (!data) return <h2>Loading...</h2>;

  const deletePatient = async (patientId) => {
    await axios.delete(`http://localhost:5000/patients/${patientId}`);
    mutate("patients");
  };

  return (
    <div className="flex flex-col mt-5 max-md:overflow-x-auto">
      <div className="w-full">
        <div className="flex justify-between">
          <Link
            to="/"
            className="bg-slate-900 hover:bg-slate-700 border border-slate-200 text-white font-bold py-2 px-4 ml-4 rounded-lg"
          >
            Home
          </Link>
          <h1 className="text-3xl font-bold">Patients 🤕</h1>
          <Link
            to="/patients/add"
            className="bg-green-500 hover:bg-green-700 border border-slate-200 text-white font-bold py-2 px-4 mr-10 rounded-lg"
          >
            Add New
          </Link>
        </div>
        <div className="relative shadow rounded-lg mt-3 max-md:overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-900 max-md:overflow-x-auto">
            <thead className="text-xs max-md:text-sm text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-2 px-2 max-md:px-4 text-center">No.</th>
                <th className="py-2 px-2 max-md:px-4 ">ID.</th>
                <th className="py-2 px-2 max-md:px-4 ">Name</th>
                <th className="py-2 px-2 max-md:px-4 ">Age</th>
                <th className="py-2 px-2 max-md:px-4 ">Gender</th>
                <th className="py-2 px-2 max-md:px-4 ">Address</th>
                <th className="py-2 px-2 max-md:px-4 ">Diagnosis</th>
                <th className="py-2 px-2 max-md:px-4 ">Doctor ID.</th>
                <th className="py-2 px-2 max-md:px-4 ">Doctor Name</th>
                <th className="py-2 px-2 max-md:px-4 text-center">Status</th>
                <th className="py-2 px-2 max-md:px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((patient, index) => (
                <tr className="bg-white border-b " key={patient.id}>
                  <td className="py-2 px-2 max-md:px-4 text-center text-gray-900">
                    {index + 1}
                  </td>
                  <td className="py-2 px-2 max-md:px-4 ">{patient.id}</td>
                  <td className="py-2 px-2 max-md:px-4 w-fit font-medium ">
                    {patient.name}
                  </td>
                  <td className="py-2 px-2 max-md:px-4 ">{patient.age}</td>
                  <td className="py-2 px-2 max-md:px-4 ">{patient.gender}</td>
                  <td className="py-2 px-2 max-md:px-4 ">{patient.address}</td>
                  <td className="py-2 px-2 max-md:px-4 ">
                    {patient.diagnosis}
                  </td>
                  <td
                    className={`py-2 px-2 max-md:px-4 ${
                      patient.doctorId === null
                        ? "text-red-700"
                        : "text-green-500"
                    }`}
                  >
                    {patient.doctorId || "unassigned"}
                  </td>
                  <td
                    className={`py-2 px-2 max-md:px-4 ${
                      !patient.doctor?.name ? "text-red-700" : "text-green-500"
                    }`}
                  >
                    {patient.doctor?.name || "N/A"}
                  </td>
                  <td
                    className={`py-2 px-2 max-md:px-4 text-center  font-semibold ${
                      patient.isActive === true
                        ? "text-green-500"
                        : "text-red-700"
                    }`}
                  >
                    {patient.isActive ? "Active" : "Inactive"}
                  </td>
                  <td className="py-5 px-1 flex flex-row justify-around max-md:flex-col">
                    <Link
                      to={`/patients/edit/${patient.id}`}
                      className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePatient(patient.id)}
                      className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
