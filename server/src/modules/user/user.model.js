"use strict";
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

class User {
  initSchema() {
    const schema = new Schema(
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
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
      mongoose.model("user", schema);
    } catch (e) {}
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("user");
  }
}

module.exports = { User };
