import User from "../models/User.js";

const createUser = (userObject) => User.create(userObject);

export default {
    createUser
}