import mongoose from "mongoose";

export const UserCollection = 'usuarios'

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  telefono: {
    type: String,
  },
  rol: {
    type: String,
  }
})