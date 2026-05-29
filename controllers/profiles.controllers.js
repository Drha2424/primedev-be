import prisma from "../configs/database.config.js";
import logger from '../configs/logger.config.js'
import { validationResult } from "express-validator";
import { getFileUrl, uploadFile, deleteFile } from "./cloudinary.controller.js";

export const getAllProfiles = async (req, res) => {
  try {
    logger.debug('getAllProfiles: Started')
    const profiles = await prisma.profiles.findMany()

    logger.info({ count: profiles.length }, 'Retrieved profiles from database')

    res.status(200).json({
      success: true,
      message: 'Profiles retrieved successfully',
      data: profiles,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to retrieve profiles')
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving profiles',
      error: error.message,
    })
  }
}

export const getProfileById = async (req, res) => {
  try {
    // Mendapatkan ID profil yang akan diupdate dari parameter URL
    // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
    const id = parseInt(req.params.id)
    logger.debug({ profileId: id }, 'getProfileById: Started')

    // Mengambil profil dengan ID yang sesuai dari database menggunakan Prisma Client
    logger.debug({ profileId: id }, 'Finding profile in database')
    const profile = await prisma.profiles.findUnique({
      where: {
        id: id,
      },
    })

    // Jika profil tidak ditemukan, kirimkan pesan error
    if (!profile) {
      logger.warn({ profileId: id }, 'Profile not found')
      return res.status(404).json({
        success: false,
        message: `Profile with ID: ${id} not found`,
      })
    }

    if (profile.cloudinaryId) {
      profile.avatarUrl = getFileUrl(profile.cloudinaryId)
    } else {
      profile.avatarUrl = null
    }

    logger.info({ profileId: id }, 'Profile retrieved successfully')
    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: profile,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to retrieve profile')
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving profile',
      error: error.message,
    })
  }
}

export const createProfile = async (req, res) => {
  try {
    logger.debug({ body: req.body }, 'createProfile: Started')

    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
      logger.warn({ errors: validationErrors.array() }, 'Validation failed')
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationErrors.array(),
      })
    }

    // Mendapatkan data profil baru dari request body
    const { userId, address, phone } = req.body

    // Menambahkan profil baru ke database menggunakan Prisma Client
    logger.debug({ userId, address, phone }, 'Creating profile in database')
    const profile = await prisma.profiles.create({
      data: {
        userId,
        address,
        phone,
      },
    })

    logger.info(
      { profileId: profile.id, userId },
      'Profile created successfully',
    )
    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: profile,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to create profile')
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating profile',
      error: error.message,
    })
  }
}

export const updateProfile = async (req, res) => {
  try {
    // Mendapatkan ID buku yang akan diupdate dari parameter URL
    // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
    const id = parseInt(req.params.id)
    logger.debug({ profileId: id, body: req.body }, 'updateProfile: Started')

    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
      logger.warn({ profileId: id, errors: validationErrors.array() }, 'Validation failed')
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationErrors.array(),
      })
    }

    // Mendapatkan data profil yang akan diupdate dari request body
    const { address, phone } = req.body

    // Mencari profil dengan ID yang sesuai di database menggunakan Prisma Client
    logger.debug({ profileId: id }, 'Finding profile in database')
    const profile = await prisma.profiles.findUnique({
      where: {
        id: id,
      },
    })

    // Jika profil tidak ditemukan, kirimkan pesan error
    if (!profile) {
      logger.warn({ profileId: id }, 'Profile not found')
      return res.status(404).json({
        success: false,
        message: `Profile with ID: ${id} not found`,
      })
    }

    // Mengupdate profil dengan ID yang sesuai di database menggunakan Prisma Client
    logger.debug({ profileId: id, address, phone }, 'Updating profile')
    await prisma.profiles.update({
      where: {
        id: id,
      },
      data: {
        address,
        phone,
      },
    })

    logger.info({ profileId: id, address, phone }, 'Profile updated successfully')
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: profile,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to update profile')
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating profile',
      error: error.message,
    })
  }
}

export const deleteProfile = async (req, res) => {
  try {
    // Mendapatkan ID buku yang akan diupdate dari parameter URL
    // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
    const id = parseInt(req.params.id)
    logger.debug({ profileId: id }, 'deleteProfile: Started')

    // Mencari profil dengan ID yang sesuai di database menggunakan Prisma Client
    logger.debug({ profileId: id }, 'Finding profile in database')
    const profile = await prisma.profiles.findUnique({
      where: {
        id: id,
      },
    })

    // Jika profil tidak ditemukan, kirimkan pesan error
    if (!profile) {
      logger.warn({ profileId: id }, 'Profile not found')
      return res.status(404).json({
        success: false,
        message: `Profile with ID: ${id} not found`,
      })
    }

    // Menghapus profil dengan ID yang sesuai di database menggunakan Prisma Client
    logger.debug({ profileId: id }, 'Deleting profile from database')
    await prisma.profiles.delete({
      where: {
        id: id,
      },
    })

    logger.info({ profileId: id }, 'Profile deleted successfully')
    res.status(200).json({
      success: true,
      message: 'Profile deleted successfully',
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to delete profile')
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting profile',
      error: error.message,
    })
  }
}

export const uploadAvatar = async (req, res) => {
  try {
    // 1. Mendapatkan ID profil dari parameter URL
    const id = parseInt(req.params.id)
    logger.debug({ profileId: id }, 'uploadAvatar: Started')

    // 2. Mengecek apakah ada error validasi
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
      logger.warn({ profileId: id, errors: validationErrors.array() }, 'Validation failed')
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationErrors.array(),
      })
    }

    // 3. Mencari profil berdasarkan ID profil di database
    const profile = await prisma.profiles.findUnique({
      where: { id: id },
    })

    // 4. Jika profil tidak ditemukan, tolak request upload avatar
    if (!profile) {
      logger.warn({ profileId: id }, 'Profile not found')
      return res.status(404).json({
        success: false,
        message: 'Profile not found. Please create a profile first.',
      })
    }

    // 5. Mengambil file gambar hasil parsing dari Multer
    const avatar = req.file
    // Menyiapkan variabel untuk menampung ID gambar di Cloudinary
    let cloudinaryId = profile.cloudinaryId

    // 6. Jika user mengirimkan file gambar baru
    if (avatar) {
      // 6a. Cek apakah user sudah punya avatar sebelumnya. Jika ada, hapus gambar lama di Cloudinary agar tidak memenuhi storage
      if (profile.cloudinaryId) {
        logger.debug({ oldCloudinaryId: profile.cloudinaryId }, 'Deleting old avatar')
        await deleteFile(profile.cloudinaryId)
      }

      // 6b. Upload gambar baru ke Cloudinary pada folder spesifik (library-api/profiles/avatars)
      logger.debug('Uploading new avatar to Cloudinary')
      const result = await uploadFile(avatar, { folder: 'library-api/profiles/avatars' })
      // 6c. Simpan public_id dari Cloudinary ke variabel
      cloudinaryId = result.public_id
      logger.info({ cloudinaryId }, 'Avatar uploaded successfully')
    }

    // 7. Update data profil di database dengan cloudinaryId yang baru
    const updatedProfile = await prisma.profiles.update({
      where: { id: profile.id },
      data: { cloudinaryId },
    })

    // 8. Men-generate URL gambar yang bisa diakses publik menggunakan cloudinaryId
    const avatarUrl = cloudinaryId ? getFileUrl(cloudinaryId) : null

    // 9. Kirim response berhasil beserta data profil terbaru yang sudah disisipkan avatarUrl
    logger.info({ profileId: profile.id }, 'Profile avatar updated successfully')
    res.status(200).json({
      success: true,
      message: 'Avatar uploaded successfully',
      data: {
        ...updatedProfile,
        avatarUrl,
      },
    })
  } catch (error) {
    // 10. Penanganan error jika terjadi masalah di server (misal: koneksi Cloudinary atau DB gagal)
    logger.error({ error: error.message }, 'Failed to upload avatar')
    res.status(500).json({
      success: false,
      message: 'An error occurred while uploading avatar',
      error: error.message,
    })
  }
}