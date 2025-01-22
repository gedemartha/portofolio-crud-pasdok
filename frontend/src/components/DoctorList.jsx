import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";

const DoctorList = () => {
  const { mutate } = useSWRConfig();
  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/doctors");

    return response.data;
  };

  const { data } = useSWR("doctors", fetcher);
  if (!data) return <h2>Loading...</h2>;

  const deletePatient = async (patientId) => {
    await axios.delete(`http://localhost:5000/doctors/${patientId}`);
    mutate("doctors");
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
          <h1 className="text-3xl font-bold">Doctors 🧑‍⚕️</h1>
          <Link
            to="/doctors/add"
            className="bg-blue-500 hover:bg-blue-700 border border-slate-200 text-white font-bold py-2 px-4 mr-10 rounded-lg"
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
                <th className="py-2 px-2 max-md:px-4 ">Specialty</th>
                <th className="py-2 px-2 max-md:px-4 text-center">Status</th>
                <th className="py-2 px-2 max-md:px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((doctor, index) => (
                <tr className="bg-white border-b " key={doctor.id}>
                  <td className="py-2 px-2 max-md:px-4 text-center text-gray-900">
                    {index + 1}
                  </td>
                  <td className="py-2 px-2 max-md:px-4 ">{doctor.id}</td>
                  <td className="py-2 px-2 max-md:px-4 w-fit font-medium ">
                    {doctor.name}
                  </td>
                  <td className="py-2 px-2 max-md:px-4 ">{doctor.age}</td>
                  <td className="py-2 px-2 max-md:px-4 ">{doctor.gender}</td>
                  <td className="py-2 px-2 max-md:px-4 ">{doctor.address}</td>
                  <td className="py-2 px-2 max-md:px-4 ">{doctor.specialty}</td>

                  <td
                    className={`py-2 px-2 max-md:px-4 text-center font-semibold ${
                      doctor.isActive === true
                        ? "text-green-500"
                        : "text-red-700"
                    }`}
                  >
                    {doctor.isActive ? "Active" : "Inactive"}
                  </td>
                  <td className="py-5 px-1 flex flex-row justify-around max-md:flex-col ">
                    <Link
                      to={`/doctors/edit/${doctor.id}`}
                      className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePatient(doctor.id)}
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

export default DoctorList;
