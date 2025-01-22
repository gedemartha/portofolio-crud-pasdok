import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPatients = async (req, res) => {
  try {
    const response = await prisma.patient.findMany({
      include: {
        doctor: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const response = await prisma.patient.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const createPatient = async (req, res) => {
  const { name, age, gender, address, diagnosis, doctorId } = req.body;
  try {
    const patient = await prisma.patient.create({
      data: {
        name,
        age: Number(age),
        gender,
        address,
        diagnosis,
        doctorId,
      },
    });
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updatePatient = async (req, res) => {
  const { name, age, gender, address, diagnosis, doctorId, isActive } =
    req.body;
  try {
    const response = await prisma.patient.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name,
        age: Number(age),
        gender,
        address,
        diagnosis,
        doctorId,
        isActive,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const response = await prisma.patient.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
