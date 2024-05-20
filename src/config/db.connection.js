import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI
        );
        console.log("MongoDB Conectado!");
    } catch (error) {
        console.log(error);
    }
}

export default connectDatabase;