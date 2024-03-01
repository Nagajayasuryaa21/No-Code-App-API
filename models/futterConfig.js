const mongoose = require("mongoose");
  const configSchema = new mongoose.Schema({
    id: Number,
    isMandatory: Boolean,
    close: {
      enable: Boolean,
      align: String,
      closeMessage: String
    },
    title: {
      enable: Boolean,
      name: String,
      size: Number,
      align: String
    },
    webViewMessage: {
      onPageStarted: {
        enable: Boolean,
        message: String
      },
      onPageFinished: {
        enable: Boolean,
        message: String
      },
      onWebResourceError: {
        enable: Boolean,
        message: String
      }
    }
  });


const FlutterConfig = mongoose.model("flutter-config", configSchema);

module.exports = {FlutterConfig};
