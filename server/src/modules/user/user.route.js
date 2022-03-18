"use strict";
const UserController = require("./user.controller");
const express = require("express");
const router = express.Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.get);
router.post("/", UserController.insert);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router;
