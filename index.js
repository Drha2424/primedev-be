import express from "express";
import prisma from "./database.js";

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API Library");
});

//get
app.get("/books", async (req, res) => {
  const books = await prisma.books.findMany();
  res.json({
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});

app.get("/books/:id", async (req, res) => {
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
    return res.json({
      success: false,
      message: `Book with ID: ${id} not found`,
    });
  }
  res.json({
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
});

// POST
app.post("/books", async (req, res) => {
  const { title, author, year } = req.body;

  const book = await prisma.books.create({
    data: {
      title,
      author,
      year,
    },
  });

  res.json({
    success: true,
    message: "Book created successfully",
    data: book,
  });
});

// PUT
app.put("/books/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const { title, author, year } = req.body;
  // Mencari buku dengan ID yang sesuai
  const book = await prisma.books.findUnique({
    where: {
      id: id,
    },
  });
  // Jika buku tidak ditemukan, kirimkan pesan error
  if (!book) {
    return res.json({
      success: false,
      message: `Book with ID: ${id} not found`,
    });
  }

  // Mengupdate buku dengan ID yang sesuai
  await prisma.books.update({
    where: {
      id: id,
    },
    data: {
      title,
      author,
      year,
    },
  });

  res.json({
    success: true,
    message: "Book updated successfully",
    data: book,
  });
});

// DELETE
app.delete("/books/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const book = await prisma.books.findUnique({
    where: {
      id: id,
    },
  });

  if (!book) {
    return res.json({
      success: false,
      message: `Book with ID: ${id} not found`,
    });
  }

  await prisma.books.delete({
    where: {
      id: id,
    },
  });

  res.json({
    success: true,
    message: "Book deleted successfully",
  });
});

//get user
app.get("/users", async (req, res) => {
  const users = await prisma.users.findMany();
  res.json({
    success: true,
    message: "Users retrieved successfully",
    data: users,
  });
});

app.get("/users/:id", async (req, res) => {
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
});

// POST User
app.post("/users", async (req, res) => {
  const { name, email, role } = req.body;

  const user = await prisma.users.create({
    data: {
      name,
      email,
      role,
    },
  });

  res.json({
    success: true,
    message: "Users created successfully",
    data: user,
  });
});

// PUT User
app.put("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const { name, email, role } = req.body;

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
    },
  });

  res.json({
    success: true,
    message: "Users updated successfully",
    data: user,
  });
});

// DELETE User
app.delete("/users/:id", async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
