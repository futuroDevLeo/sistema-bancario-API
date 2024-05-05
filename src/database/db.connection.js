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

// export default {
//     banco: {
//         nome: 'Cubos Bank',
//         numero: '123',
//         agencia: '0001',
//         senha: 'Cubos123Bank'
//     },
//     contas: [],
//     saques: [],
//     depositos: [],
//     transferencias: []
// }