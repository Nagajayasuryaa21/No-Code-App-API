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
      console.log({req:req});
      if(!req.body.clientName){
        res.status(400).send({status:"failed",message:"Invalid Input"});
      }
      const user = await Config.findOne({ clientName: req.body.clientName });
      console.log({body:req.body});
      console.log({req:req});
      if (!user) {
        // If the user does not exist, you can create a new user with the provided data
        const newUser = new Config(req.body);
        await newUser.save()
          .then((savedData) => {
            res.status(200).send({status:"success", data: savedData, message: "User saved successfully" });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send({status:"failed",message:"Internal server error"});
          });
      } else {
        // If the user exists, update their data
        await user.updateOne({ ...req.body })
          .then((savedData) => {
            res.status(200).send({status:"success", data: savedData, message: "User updated successfully" });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send({status:"failed",message:"Internal server error"});
          });
      }
    } catch (error) {
      res.status(500).send({status:"failed", message: "Internal Server Error" + error.message });
    }
  });

  router.get("/get", async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
  
    try {
      // Get the 'name' parameter from the query string
      const clientName = req.query.clientName;
      console.log(clientName)
      if (!clientName) {
        return res.status(400).send({ status: "failed", message: "Invalid Partner Key" });
      } else {
        // You can use the 'name' parameter as needed
        // Example: Look up a user in the database using the 'name'
        const user = await Config.findOne({ clientName: clientName });
        console.log(user)
        if (!user) {
          return res.status(404).send({ status: "failed", message: "Client not found" });
        }

        res.status(200).send({ status: "success", data: user, message: "Data successfully" });
      }
    } catch (error) {
      res.status(500).send({ status: "failed", message: "Internal Server Error: " + error.message });
    }
});
module.exports = router;
