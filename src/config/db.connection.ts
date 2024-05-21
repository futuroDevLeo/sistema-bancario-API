import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI!
        );
        console.log("MongoDB connected!");
    } catch (e) {
        console.log(e);
    }
}

export default connectDatabase;