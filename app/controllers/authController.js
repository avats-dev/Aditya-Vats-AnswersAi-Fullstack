import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import db from '../../models'
import { Responder } from '../lib'
const Users = db.Users;

const loginUser = async (req, res) => {
    try {
        const userEmail = req.body.email;
        const userPwd = req.body.password;
        const user = await Users.findOne({
            where: { email: userEmail },
        })

        if (!user) throw new Error('Either Username or password is invalid')
        const { encryptedPassword, name, id } = user
    
        // const passwordIsValid = (req.body.password==encrypted_password)? true:flase
        const passwordIsValid = bcrypt.compareSync(
            userPwd,
            encryptedPassword
        )

        if (!passwordIsValid)
            throw new Error('Either Username or password is invalid')

        const token = jwt.sign(
            { id: id, name: user.name, email: user.email},
            process.env.JWT_SECRET,
            {
                expiresIn: 1800, // expires in 3 hours
            }
        )

        return Responder.success(res, {
            token: token,
            name,
            id
        });

    } catch (error) {
        return Responder.operationFailed(res, {
            error,
            status: 400,
            token: null,
        })
    }
}

const logoutUser = (req, res) => Responder.success(res, { token: null });

const refreshToken = async (req, res) => {
    
};

module.exports = {
    loginUser,
    logoutUser,
    refreshToken
};
