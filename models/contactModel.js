const mongoose = require("mongoose")

const contactSchema = mongoose.Schema(
  {
    // user id for user creating the contact
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",//reference of the model
    },
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add the email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add the phone number"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Contact", contactSchema);