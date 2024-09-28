import mongoose from "mongoose";

const serviceProviderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  servicesOffered: {
    type: [String],
    default: ["Vaccination"],
  },
  appointments: [
    {
      pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
      date: Date,
      status: {
        type: String,
        enum: ["Scheduled", "Completed", "Cancelled"],
        default: "Empty",
      },
    },
  ],
});

const ServiceProvider = mongoose.model(
  "ServiceProvider",
  serviceProviderSchema
);
export default ServiceProvider;