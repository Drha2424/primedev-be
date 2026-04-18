import express from "express";
import prisma from "../config/database.config.js";


export const getUsers = async (req, res) => {
    const users = await prisma.users.findMany();
    res.json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
};

export const getUserById = async (req, res) => {
    //merubah tipe data menjadi integer menggunakan parseInt
    const id = parseInt(req.params.id);
    //mencari user dengan Id yang sesuai
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    //jika id user tidak ditemukan
    if (!user) {
      return res.json({
        success: false,
        message: `User with ID: ${id} not found`,
      });
    }

    res.json({
      success: true,
      message: "Users retrieved successfully",
      data: user,
    });
};

export const createUser = async (req, res) => {
    const { name, email, role, password } = req.body;

    const user = await prisma.users.create({
      data: {
        name,
        email,
        role,
        password
      },
    });

    res.json({
      success: true,
      message: "Users created successfully",
      data: user,
    });
};

export const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);

    const { name, email, role, password } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    // Jika user tidak ditemukan, kirimkan pesan error
    if (!user) {
      return res.json({
        success: false,
        message: `User with ID: ${id} not found`,
      });
    }

    // Mengupdate user dengan ID yang sesuai
    await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        name,
        email,
        role,
        password
      },
    });

    res.json({
      success: true,
      message: "Users updated successfully",
      data: user,
    });
};

export const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);

    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res.json({
        success: false,
        message: `User with ID: ${id} not found`,
      });
    }

    await prisma.users.delete({
      where: {
        id: id,
      },
    });

    res.json({
      success: true,
      message: "Users deleted successfully",
    });
};

export const getUserByIdWithProfile = async (req, res) => {
 // Mendapatkan ID pengguna yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mengambil pengguna dengan ID yang sesuai dari database menggunakan Prisma Client
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
    include: {
      profiles: true,
    },
  })

  // Jika pengguna tidak ditemukan, kirimkan pesan error
  if (!user) {
    res.json({
      success: false,
      message: `User with ID: ${id} not found`,
    })
    return
  }

  res.json({
    success: true,
    message: 'User retrieved successfully',
    data: user,
  })
};

export const isUserExist = async (id) => {
  // Mencari pengguna dengan ID yang sesuai di database menggunakan Prisma Client
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  })

  return !!user
}