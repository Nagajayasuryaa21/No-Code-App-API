const mongoose = require("mongoose");

// const configSchema = new mongoose.Schema({
// 	name: { type: String, required: true },
// 	configJson: { type: String, required: true }
//   });

  const configSchema = new mongoose.Schema({
    clientName: String,
    configJson: {
      loginScreen: {
        forgetPassword: Boolean,
        defaultLogin: Boolean,
        googleLogin: Boolean,
        microsoftLogin: Boolean,
      },
      homeScreen: {
        kaptureLogo: Boolean,
        dataBroImage: Boolean,
        appointmentSchedule: Boolean,
      }
    }
  });


const Config = mongoose.model("config", configSchema);

module.exports = {Config};
