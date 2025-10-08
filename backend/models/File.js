const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  originalName: { type: String, required: true }, // original filename
  filename: { type: String, required: true },     // saved filename on server
  path: { type: String, required: true },         // path on server
  size: { type: Number, required: true },         // size in bytes
  type: { type: String, required: true },         // MIME type
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("File", fileSchema);
