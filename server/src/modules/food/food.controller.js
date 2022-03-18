"use strict";
const { CalmController } = require("../../../system/core/CalmController");
const { FoodService } = require("./food.service");
const { Food } = require("./food.model");
const foodDTO = require("./food.dto");
const autoBind = require("auto-bind"),
  foodService = new FoodService(new Food().getInstance());

class FoodController extends CalmController {
  constructor(service) {
    super(service);
    this.dto = { ...this.dto, ...foodDTO };
    autoBind(this);
  }
}

module.exports = new FoodController(foodService);
