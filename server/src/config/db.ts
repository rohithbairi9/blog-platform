import prisma from "./prisma";

const connectDB = async () => {
  try {
    await prisma.$connect();

    console.log("MongoDB Connected Through Prisma");
  } catch (error) {
    console.error("Database Connection Failed", error);

    process.exit(1);
  }
};

export default connectDB;