// imports required packages
const express = require("express");
const cors = require("cors");

// creates an instance of the server
const app = express();

// allows external websites to call this server
app.use(cors());

// operates when someone uses the / route
app.get("/", (req, res) => {
  // contains the different type of tasks
  const types = ["add", "multiply", "greater", "less", "tilt", "bop"];

  // randomly selects a type of task
  const type = types[Math.floor(Math.random() * types.length)];

  let task, answerAdd, answerMultiply;

  // generates add answers, multiply answers, and a shift for wrong answers
  const one = Math.floor(Math.random() * 10) + 1;
  const two = Math.floor(Math.random() * 10) + 1;
  const shift = Math.floor(Math.random() * 4) + 1;
  answerAdd = Math.random() < 0.5 ? one + two : one + two + shift;
  answerMultiply = Math.random() < 0.5 ? one * two : one * two + shift;

  // generates a distance for the greater than or less than tasks
  const distance = Math.floor(Math.random() * (20 - 10 + 1)) + 10;

  // sets the appropriate task based on type selected
  if (type == "add") {
    task = `${one}+${two}=${answerAdd}?`;
  }

  if (type == "multiply") {
    task = `${one}*${two}=${answerMultiply}?`;
  }

  if (type == "greater") {
    task = `> ${distance} cm`;
  }

  if (type == "less") {
    task = `< ${distance} cm`;
  }

  if (type == "tilt") {
    task = `Tilt it`;
  }

  if (type == "bop") {
    task = `Bop it!`;
  }

  // sends the information to the Arduino for process
  res.send({
    type,
    task,
    answer:
      type == "add" ? one + two == answerAdd : one * two == answerMultiply,
    distance: type == "greater" || type == "less" ? distance : "",
    // the creator key here is non-essential and
    // is only used to help make the processing
    // of the incoming data easier on the arduino
    creator: "Jackie Ni",
  });
});

// sets the port for the server
app.listen(process.env.PORT || 5000, () => {
  console.log("Listening on 5000");
});
