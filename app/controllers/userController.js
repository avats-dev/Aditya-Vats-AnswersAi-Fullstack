import bcrypt from 'bcryptjs'
import { Responder } from '../lib'
const db = require('../../models');
const Users = db.Users;

const isPasswordInvalid = password => {
    if (password.length < 8) {
        return true
    }
    const regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
    return !regularExpression.test(password)
};

const createUser = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const { name,
                email, 
                password,  
            } = req.body
        let user;

        if (isPasswordInvalid(password)) {
            console.log("checkingpasswordvalidity")
            return Responder.operationFailed(res, {
                success: false,
                error:
                    'password should be atleast of 8 characters long and contain atleast one digit and one alphabetic character',
                status: 400,
            })
        }

        const hashedPassword = bcrypt.hashSync(password, salt)
        console.log("hashed password",hashedPassword )
        await db.sequelize.transaction(async t => {
            console.log("inside sequelize transaction ")
            user = await Users.create({
                name,
                email,
                encryptedPassword: hashedPassword,
            })
        })
        return Responder.created(res, {
            name: user.name,
            email: user.email,
            message: `User ${user.name} created successfully.`,
        })
    } catch (error) {
        console.log("validation error", error)
        return Responder.operationFailed(res, { error, status: 400 })
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await Users.findOne({where: {id: userId}});

        if (!user) {
            return Responder.operationFailed(res, {
                success: false,
                error:
                    'User not found!',
                status: 400,
            })
        }

        return Responder.success(res, {
            name: user.name,
            email: user.email,
            message: `User ${user.name} fetched successfully.`,
        })
    } catch (error) {
        console.log("validation error", error)
        return Responder.operationFailed(res, { error, status: 400 })
    }
};

const getUserQuestions = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await Users.findOne({where: {id: userId}});

        if (!user) {
            return Responder.operationFailed(res, {
                success: false,
                error:
                    'User not found!',
                status: 400,
            })
        }
        const questions = await user.getQuestions();
        return Responder.success(res, {
            questions: questions,
            message: `Questions asked by ${user.name} fetched successfully.`,
        })
    } catch (error) {
        console.log("validation error", error)
        return Responder.operationFailed(res, { error, status: 400 })
    }
};

module.exports = { createUser, getUser, getUserQuestions };