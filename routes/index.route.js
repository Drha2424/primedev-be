import express from "express";
import booksRoute from "./books.route.js";
import usersRoute from "./users.route.js";
import profileRoute from "./profiles.route.js";
import categorieRoute from "./categories.route.js";
import borrowingRoute from "./borrowings.route.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the API Library");
});

router.use("/books", booksRoute);
router.use("/users", usersRoute);
router.use("/profiles", profileRoute);
router.use("/categories", categorieRoute);
router.use("/borrowings", borrowingRoute);
export default router;
