import mongoose from 'mongoose';

const Connection = async (MONGO_URI) => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected Successfully ✅");
    } catch (error) {
        console.log("Error while connecting to MongoDB ❌", error);
    }
};

export default Connection;