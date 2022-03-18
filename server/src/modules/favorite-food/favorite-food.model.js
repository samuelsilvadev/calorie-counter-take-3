"use strict";
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

class FavoriteFood {
  initSchema() {
    const schema = new Schema(
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "user",
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
        food: {
          type: Schema.Types.ObjectId,
          ref: "food",
          required: true,
        },
      },
      { timestamps: true }
    );

    schema.plugin(uniqueValidator);
    try {
      mongoose.model("favoriteFood", schema);
    } catch (e) {}
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("favoriteFood");
  }
}

module.exports = { FavoriteFood };
