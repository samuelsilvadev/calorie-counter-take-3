"use strict";
const FoodController = require("./food.controller");
const express = require("express");
const router = express.Router();

router.get("/", FoodController.getAll);
router.get("/:id", FoodController.get);
router.post("/", FoodController.insert);
router.put("/:id", FoodController.update);
router.delete("/:id", FoodController.delete);

module.exports = router;
