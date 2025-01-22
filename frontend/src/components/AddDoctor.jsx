import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("MALE");
  const [address, setAddress] = useState("");
  const [specialty, setSpecialty] = useState("GENERAL_MEDICINE");
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();

  const genders = ["MALE", "FEMALE"];
  const specialties = [
    "CARDIOLOGY",
    "DERMATOLOGY",
    "PEDIATRICS",
    "ORTHOPEDICS",
    "NEUROLOGY",
    "GENERAL_MEDICINE",
    "PSYCHIATRY",
    "OTHER",
  ];

  const saveDoctors = async (e) => {
    e.preventDefault();
    console.log({ name, age, gender, address, specialty, isActive });
    try {
      await axios.post("http://localhost:5000/doctors", {
        name,
        age: parseInt(age),
        gender,
        address,
        specialty,
        isActive,
      });
      navigate("/doctors");
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative  mt-10 ml-4 flex  items-center justify-between">
        <div className="absolute left-0">
          <Link
            to="/doctors"
            className="bg-slate-900 hover:bg-slate-700 border border-slate-200 text-white font-bold py-2 px-4 rounded-lg"
          >
            Back
          </Link>
        </div>
        <h1 className="flex-grow text-center text-2xl font-bold">Add Doctor</h1>
      </div>
      <div className="max-w-lg mx-auto my-10 bg-blue-400 p-8 rounded-xl shadow shadow-slate-300">
        <form className="mb-10" onSubmit={saveDoctors}>
          <div className="flex flex-col">
            <div className="mb-5">
              <label className="font-bold text-slate-700">Doctor Name</label>
              <input
                type="text"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Doctor Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label className="font-bold text-slate-700">Age</label>
              <input
                type="text"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label className="font-bold text-slate-700">Gender</label>
              <select
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                {genders.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <label className="font-bold text-slate-700">Address</label>
              <input
                type="text"
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label className="font-bold text-slate-700">specialty</label>
              <select
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              >
                {specialties.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label className="font-bold text-slate-700">Status</label>
              <div className="flex mt-2">
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    value={true}
                    checked={isActive === true}
                    onChange={() => setIsActive(true)}
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Active</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value={false}
                    checked={isActive === false}
                    onChange={() => setIsActive(false)}
                    className="form-radio text-red-600"
                  />
                  <span className="ml-2">Inactive</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
