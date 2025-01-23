import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDoctors = async (req, res) => {
  try {
    const response = await prisma.doctor.findMany();
    
      res.status(200).json(response);
    
    
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const response = await prisma.doctor.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const createDoctor = async (req, res) => {
  const { name, age, gender, address, specialty } = req.body;
  try {
    const doctor = await prisma.doctor.create({
      data: {
        name,
        age: Number(age),
        gender,
        address,
        specialty,
      },
    });
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateDoctor = async (req, res) => {
  const { name, age, gender, address, specialty, isActive } = req.body;
  try {
    const response = await prisma.doctor.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name,
        age: Number(age),
        gender,
        address,
        specialty,
        isActive,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const response = await prisma.doctor.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(`deleting doctor with id:${id},${response}`);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
