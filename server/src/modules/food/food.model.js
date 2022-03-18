"use strict";
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

class Food {
  initSchema() {
    const schema = new Schema(
      {
        name: {
          type: String,
          required: true,
        },
        portion: {
          type: Number,
          required: true,
        },
        portionAmount: {
          type: Number,
          required: true,
        },
        portionDisplayName: {
          type: String,
          required: true,
        },
        factor: {
          type: Number,
          required: true,
        },
        increment: {
          type: Number,
          required: true,
        },
        multiplier: {
          type: Number,
          required: true,
        },
        grains: {
          type: Number,
          required: true,
        },
        wholeGrains: {
          type: Number,
          required: true,
        },
        vegetables: {
          type: Number,
          required: true,
        },
        orangeVegetables: {
          type: Number,
          required: true,
        },
        darkGreenVegetables: {
          type: Number,
          required: true,
        },
        starchyVegetables: {
          type: Number,
          required: true,
        },
        otherVegetables: {
          type: Number,
          required: true,
        },
        fruits: {
          type: Number,
          required: true,
        },
        milk: {
          type: Number,
          required: true,
        },
        meats: {
          type: Number,
          required: true,
        },
        soy: {
          type: Number,
          required: true,
        },
        dryBeansPeas: {
          type: Number,
          required: true,
        },
        oils: {
          type: Number,
          required: true,
        },
        solidFats: {
          type: Number,
          required: true,
        },
        addedSugars: {
          type: Number,
          required: true,
        },
        alcohol: {
          type: Number,
          required: true,
        },
        calories: {
          type: Number,
          required: true,
        },
        saturatedFats: {
          type: Number,
          required: true,
        },
        createdBy: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
        updatedBy: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
      },
      { timestamps: true }
    );

    schema.plugin(uniqueValidator);
    try {
      mongoose.model("food", schema);
    } catch (e) {}
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("food");
  }
}

module.exports = { Food };
