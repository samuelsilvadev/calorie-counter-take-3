#!/usr/bin/env node

const { promisify } = require("util");
const { exec } = require("child_process");

const promisifiedExec = promisify(exec);

const CONTAINER_ALREADY_EXISTS_ERROR_REGEX =
  /The container name \"\/calorie-counter-take-2\"/;

promisifiedExec(`sh ${__dirname}/db.sh`)
  .then(() => {
    console.log("MongoDB is ready to use ✅");
  })
  .catch((error) => {
    if (CONTAINER_ALREADY_EXISTS_ERROR_REGEX.test(error)) {
      console.log("MongoDB is already running 🚀");
    } else {
      console.error("🔥 Something went wrong:", error);
    }
  });
