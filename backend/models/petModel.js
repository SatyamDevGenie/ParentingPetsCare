import mongoose from "mongoose";

const petSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Dog", "Cat", "Other"],
    required: true,
  },
  breed: {
    type: String,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  vaccinations: [
    {
      vaccineName: String,
      date: Date,
      provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceProvider",
      },
      nextDueDate: Date,
    },
  ],
  image: {
    type: String,
  },
});

const Pet = mongoose.model("Pet", petSchema);
export default Pet;