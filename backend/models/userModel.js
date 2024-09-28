import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  role: {
    type: String,
    enum: ["customer", "serviceProvider", "admin"],
    default: "customer",
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
});

const User = mongoose.model("User", userSchema);
export default User;