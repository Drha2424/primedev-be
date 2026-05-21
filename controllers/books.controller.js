// import express from "express";
import prisma from "../config/database.config.js";
import { validationResult } from 'express-validator';

export const getBooks = async (req, res) => {
    const books = await prisma.books.findMany();
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
};

export const getBookById = async (req, res) => {
  
    //merubah tipe data menjadi integer menggunakan parseInt
    const id = parseInt(req.params.id);
    //mencari buku dengan Id yang sesuai menggunakan prisma
    const book = await prisma.books.findUnique({
      where: {
        id: id,
      },
    });

    //jika id buku tidak ditemukan
    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book with ID: ${id} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });

};

export const createBook = async (req, res) => {
    const validationErrors = validationResult(req)

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: validationErrors.array(),
    })
  }
    const { categoryId, title, author, year } = req.body;

    // Mengecek apakah kategori dengan ID yang diberikan ada di database menggunakan fungsi isCategoryExist
  const categoryExists = await prisma.categories.findUnique({
    where: {
      id: categoryId,
    },
  })

  if (!categoryExists) {
    return res.status(404).json({
      success: false,
      message: `Category with ID: ${categoryId} not found`,
    })
  }

    const book = await prisma.books.create({
      data: {
        categoryId,
        title,
        author,
        year,
      },
    });

    res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });

};

export const updateBook = async (req, res) => {
  const validationErrors = validationResult(req)

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: validationErrors.array(),
    })
  }
  router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    const { categoryId, title, author, year } = req.body;
    // Mencari buku dengan ID yang sesuai
    const book = await prisma.books.findUnique({
      where: {
        id: id,
      },
    });
    // Jika buku tidak ditemukan, kirimkan pesan error
    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book with ID: ${id} not found`,
      });
    }

    // Mengecek apakah kategori dengan ID yang diberikan ada di database menggunakan fungsi isCategoryExist
  const categoryExists = await prisma.categories.findUnique({
    where: {
      id: categoryId,
    },
  })

  if (!categoryExists) {
    return res.status(404).json({
      success: false,
      message: `Category with ID: ${categoryId} not found`,
    })
  }

    // Mengupdate buku dengan ID yang sesuai
    await prisma.books.update({
      where: {
        id: id,
      },
      data: {
        categoryId, 
        title,
        author,
        year,
      },
    });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  });
};

export const deleteBook = async (req, res) => {
  
    const id = parseInt(req.params.id);

    const book = await prisma.books.findUnique({
      where: {
        id: id,
      },
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book with ID: ${id} not found`,
      });
    }

    await prisma.books.delete({
      where: {
        id: id,
      },
    });

    res.status(204).json({
      success: true,
      message: "Book deleted successfully",
    });

};

export const isBookExist = async (id) => {
  // Mencari buku dengan ID yang sesuai di database menggunakan Prisma Client
  const book = await prisma.books.findUnique({
    where: {
      id: id,
    },
  })

  return !!book
}
