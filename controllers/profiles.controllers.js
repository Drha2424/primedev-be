import prisma from "../config/database.config.js";

export const getAllProfiles = async (req, res) => {
    const profiles = await prisma.profiles.findMany();
    res.json({
      success: true,
      message: "Profiles retrieved successfully",
      data: profiles,
    });
};

export const getProfileById = async (req, res) => {
    //merubah tipe data menjadi integer menggunakan parseInt
    const id = parseInt(req.params.id);
    //mencari profile dengan Id yang sesuai
    const profile = await prisma.profiles.findUnique({
      where: {
        id: id,
      },
    });
    //jika id profile tidak ditemukan
    if (!profile) {
      return res.json({
        success: false,
        message: `Profile with ID: ${id} not found`,
      });
    }

    res.json({
      success: true,
      message: "profiles retrieved successfully",
      data: profile,
    });
};

export const createProfile = async (req, res) => {
    const { userId, address, phone  } = req.body;

    const profile = await prisma.profiles.create({
      data: {
        userId,
        address,
        phone,
      },
    });

    res.json({
      success: true,
      message: "profiles created successfully",
      data: profile,
    });
};

export const updateProfile = async (req, res) => {
    const id = parseInt(req.params.id);

    const { userId, address, phone } = req.body;

    const profile = await prisma.profiles.findUnique({
      where: {
        id: id,
      },
    });
    // Jika profile tidak ditemukan, kirimkan pesan error
    if (!profile) {
      return res.json({
        success: false,
        message: `profile with ID: ${id} not found`,
      });
    }

    // Mengupdate profile dengan ID yang sesuai
    await prisma.profiles.update({
      where: {
        id: id,
      },
      data: {
        userId,
        address,
        phone,
      },
    });

    res.json({
      success: true,
      message: "profiles updated successfully",
      data: profile,
    });
};

export const deleteProfile = async (req, res) => {
    const id = parseInt(req.params.id);

    const profile = await prisma.profiles.findUnique({
      where: {
        id: id,
      },
    });

    if (!profile) {
      return res.json({
        success: false,
        message: `Profile with ID: ${id} not found`,
      });
    }

    await prisma.profiles.delete({
      where: {
        id: id,
      },
    });

    res.json({
      success: true,
      message: "profiles deleted successfully",
    });
};


