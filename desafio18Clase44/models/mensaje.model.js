import mongoose from 'mongoose'

export default new mongoose.Schema({
    author: {
      username: String,
      date: String
    },
    text: String
  });