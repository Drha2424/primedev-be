import express from "express";
import booksRoute from "./books.route.js";
import usersRoute from "./users.route.js";
import profileRoute from "./profiles.route.js";
import categorieRoute from "./categories.route.js";
import borrowingRoute from "./borrowings.route.js";
import authRoute from "./auth.route.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeAdmin } from "../middlewares/admin.middleware.js";
import logger from "../configs/logger.config.js";

const router = express.Router();

router.get("/", (req, res) => {
  logger.debug("GET / - Welcome route");
  res.send("Welcome to the API Library by Drha (ig: @richiananta12)");
});

router.use((req, res, next) => {
  logger.debug(
    { method: req.method, path: req.path, ip: req.ip },
    "Incoming request"
  );
  next();
});

router.use("/auth", authRoute);
router.use("/books", authenticateToken, booksRoute);
router.use("/categories", authenticateToken, categorieRoute);
router.use("/users", authenticateToken, authorizeAdmin, usersRoute);
router.use("/profiles", authenticateToken, authorizeAdmin, profileRoute);
router.use("/borrowings", authenticateToken, authorizeAdmin, borrowingRoute);
export default router;
