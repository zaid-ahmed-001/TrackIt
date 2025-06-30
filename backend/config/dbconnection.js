import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://smmanu2468:Rbpy0bcS78MJbiIz@mentorshipclus.6bxdr.mongodb.net/";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();