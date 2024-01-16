import mongoose from "mongoose";

async function connect() {
  if (!process.env.DATABASE_URL) throw new Error("No env variable found");
  const connectionString = process.env.DATABASE_URL;
  try {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(connectionString);
    console.log("Connection successful");
  } catch (error) {
    console.log(error);
    throw new Error("Error connecting to Mongoose");
  }
}

export default connect;
