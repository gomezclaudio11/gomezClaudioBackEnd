import mongoose from "mongoose";

export default new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    product: { type: [], required: true },
    timeStamp: { type: String, unique: true, required: true },
}
);

