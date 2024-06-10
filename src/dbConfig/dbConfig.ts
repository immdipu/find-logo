import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
      );
    }

    mongoose.connect(MONGODB_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to database");
    });

    connection.on("error", (error) => {
      console.error("Error connecting to database:", error);
      process.exit(1);
    });
  } catch (error) {
    console.log("Error connecting to database:");
    console.error(error);
  }
}
