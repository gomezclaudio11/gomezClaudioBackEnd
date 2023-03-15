import mongoose from "mongoose";

export const userCollection = "usuario";

export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  surname:{
    type: String,
  }, 
  avatar: {
    type: String,
  }
  });