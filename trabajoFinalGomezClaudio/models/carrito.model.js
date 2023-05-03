import mongoose from "mongoose";

export default new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    productos: { type: [], required: true },
    //timeStamp: { date: String },
}
);

