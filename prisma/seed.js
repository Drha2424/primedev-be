import prisma from "../configs/database.config.js";

async function main() {
  console.log("🌱 Seeding database...");

  // =========================
  // CLEAN ALL TABLES
  // =========================
  await prisma.borrowings.deleteMany();
  await prisma.profiles.deleteMany();
  await prisma.books.deleteMany();
  await prisma.categories.deleteMany();
  await prisma.users.deleteMany();

  console.log("🧹 All tables cleaned");

  // =========================
  // CREATE CATEGORIES (15)
  // =========================
  const categoriesData = Array.from({ length: 15 }).map((_, i) => ({
    name: `Category ${i + 1}`,
  }));

  const categories = await prisma.categories.createMany({
    data: categoriesData,
  });

  const allCategories = await prisma.categories.findMany();

  // =========================
  // CREATE USERS (20)
  // =========================
  const usersData = Array.from({ length: 20 }).map((_, i) => ({
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    password: "hashedpassword123",
    role: i === 0 ? "ADMIN" : "USER",
  }));

  await prisma.users.createMany({
    data: usersData,
  });

  const allUsers = await prisma.users.findMany();

  // =========================
  // CREATE PROFILES (1:1 USERS)
  // =========================
  const profilesData = allUsers.map((user) => ({
    userId: user.id,
    address: `Address ${user.id}`,
    phone: `08123${10000 + user.id}`,
  }));

  await prisma.profiles.createMany({
    data: profilesData,
  });

  // =========================
  // CREATE BOOKS (25)
  // =========================
  const booksData = Array.from({ length: 25 }).map((_, i) => ({
    title: `Book Title ${i + 1}`,
    author: `Author ${i + 1}`,
    year: 2000 + (i % 20),
    available: Math.random() > 0.3,
    categoryId:
      allCategories[Math.floor(Math.random() * allCategories.length)].id,
  }));

  await prisma.books.createMany({
    data: booksData,
  });

  const allBooks = await prisma.books.findMany();

  // =========================
  // CREATE BORROWINGS (30)
  // =========================
  const borrowingsData = Array.from({ length: 30 }).map(() => {
    const user = allUsers[Math.floor(Math.random() * allUsers.length)];
    const book = allBooks[Math.floor(Math.random() * allBooks.length)];

    const isReturned = Math.random() > 0.5;

    return {
      userId: user.id,
      bookId: book.id,
      borrow_date: new Date(),
      returned_at: isReturned ? new Date() : null,
    };
  });

  await prisma.borrowings.createMany({
    data: borrowingsData,
  });

  console.log("✅ Seeding selesai!");
}

// =========================
// RUN SEED
// =========================
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
