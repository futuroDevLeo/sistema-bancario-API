import User from "../models/User.ts";

const createUser = (userObject) => User.create(userObject);

export default {
    createUser
}