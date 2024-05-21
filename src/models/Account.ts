import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    user: {
        name: {
            type: String,
            required: true
        },
        cpf: {
            type: String,
            required: true,
            unique: true
        },
        birthdate: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        phonenumber: {
            type: String,
            required: true
        }
    }
})

const Account = mongoose.model("Account", AccountSchema);

export default Account;