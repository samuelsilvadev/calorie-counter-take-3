"use strict";
const FavoriteFoodController = require("./favorite-food.controller");
const express = require("express");
const router = express.Router();

router.get("/", FavoriteFoodController.getAll);
router.get("/:id", FavoriteFoodController.get);
router.post("/", FavoriteFoodController.insert);
router.put("/:id", FavoriteFoodController.update);
router.delete("/:id", FavoriteFoodController.delete);

module.exports = router;
