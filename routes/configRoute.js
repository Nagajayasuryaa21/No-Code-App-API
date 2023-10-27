const router = require("express").Router();
const {Config} = require("../models/config");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

router.get("/", (req, res) => {
  res.send("WELCOME TO NO-CODE APP API");
});
router.post("/add-update", async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
  
    try {
      // Find the user by their name
      const user = await Config.findOne({ name: req.body.name });
  
      if (!user) {
        // If the user does not exist, you can create a new user with the provided data
        const newUser = new Config(req.body);
        await newUser.save()
          .then((savedData) => {
            res.status(200).send({ data: savedData, message: "User saved successfully" });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Internal server error");
          });
      } else {
        // If the user exists, update their data
        await user.updateOne({ ...req.body })
          .then((savedData) => {
            res.status(200).send({ data: savedData, message: "User updated successfully" });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Internal server error");
          });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error.message });
    }
  });

  router.post("/get", async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
  
    try {
      // Find the user by their name
      const user = await Config.findOne({ name: req.body.name });
  
      if (!user) {
        // If the user does not exist, you can create a new user with the provided data
        const newUser = new Config(req.body);
        await newUser.save()
          .then((savedData) => {
            res.status(200).send({ data: savedData, message: "User saved successfully" });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Internal server error");
          });
      } else {
        // If the user exists, update their data
        res.status(200).send({ data: savedData, message: "Data  successfully" });
        
      }
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error.message });
    }
  });
module.exports = router;
