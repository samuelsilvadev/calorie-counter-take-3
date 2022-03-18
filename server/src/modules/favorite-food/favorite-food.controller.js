"use strict";

const { CalmController } = require("../../../system/core/CalmController");
const { FavoriteFoodService } = require("./favorite-food.service");
const { FavoriteFood } = require("./favorite-food.model");
const favoriteFoodDTO = require("./favorite-food.dto");
const autoBind = require("auto-bind"),
  favoriteFoodService = new FavoriteFoodService(
    new FavoriteFood().getInstance()
  );

class FavoriteFoodController extends CalmController {
  constructor(service) {
    super(service);
    this.dto = { ...this.dto, ...favoriteFoodDTO };
    autoBind(this);
  }
}

module.exports = new FavoriteFoodController(favoriteFoodService);
