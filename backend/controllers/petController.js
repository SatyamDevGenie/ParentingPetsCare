import asyncHandler from "express-async-handler";
import Pet from "../models/petModel.js";

// Get all Pets
const getPets = asyncHandler(async (req, res, next) => {
  try {
    const pets = await Pet.find({});
    res.json(pets);
  } catch (error) {
    next(error);
  }
});

// Get Single Pet by ID
const getSinglePet = asyncHandler(async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: "Pet not found" });
    }
  } catch (error) {
    next(error);  // Pass the error to the error handler middleware
  }
});

export { getPets, getSinglePet };