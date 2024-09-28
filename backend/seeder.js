import dotenv from "dotenv";
import connectDB from "./config/db.js";
import pets from "./data/pets.js";
import users from "./data/users.js";
import Pet from "./models/petModel.js";
import ServiceProvider from "./models/serviceProviderModel.js";
import User from "./models/userModel.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await ServiceProvider.deleteMany();
    await Pet.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const samplePets = pets.map((pet) => {
      return { ...pet, user: adminUser };
    });
    await Pet.insertMany(samplePets);

    console.log("Data imported");
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await ServiceProvider.deleteMany();
    await Pet.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed");
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}