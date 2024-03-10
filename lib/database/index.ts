import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
//In serverless environments this is the most common technique and must be followed
//It is used to cache the db connection in this case mongodb connection via mongoose across multiple invocations of serverless API routes in nextJS.

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDb = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "evently",
      bufferCommands: false,
    });
  //Mongoose lets you start using your models immediately, without waiting for mongoose to establish a connection to MongoDB.
  //SO with bufferCommand: false we are disbaling it

  cached.conn = await cached.promise;
};
