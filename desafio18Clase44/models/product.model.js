import mongoose from 'mongoose'

export default new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
})