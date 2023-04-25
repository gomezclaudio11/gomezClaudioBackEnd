import mongoose from "mongoose";

export default new mongoose.Schema({
    items: { type: String },
    numbersOrden: { type: String },
    timeStamp: { date: String },
    estate: { type: String },
    email: { type: String },
}
);
