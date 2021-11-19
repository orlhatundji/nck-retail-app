import bcrypt from 'bcryptjs'
import {
  generateToken,
  handleResponse
} from '../helpers/util'
import UserModel from './model'

class UserServices {
    static async signup(req, res) {
        const { firstName, lastName, email, role, password, confirmPassword } = req.body
        if (password !== confirmPassword) {
            return handleResponse(res, 400, 'Password does not match')
        }
        const user = {
            firstName, 
            lastName,
            email,
            role,
            password: await bcrypt.hash(password, 10)
        }
        await UserModel.create(user, async(err, data) => {
            if (err) {
                console.error('Error', err.message)
                return handleResponse(res, 400, 'Signing up was not successful')
            }
            const userDetail = data.toObject()
            delete userDetail.password
            delete userDetail._id
            delete userDetail.__v

            return handleResponse(res, 201, 'Signing up successful', userDetail)
        })
    }

    static async login(req, res) {
        const user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            const password = await bcrypt.compare(req.body.password, user.password)
            if (!password) {
                return handleResponse(res, 401, 'Incorrect email or password')
            }
        }
        
        const token = generateToken({
            email: user.email,
            role: user.role
        }) 
        
        const userDetails = { 
            firstName: user.firstName,
            lastName: user.lastName,
            token
        }

        return handleResponse(res, 200, 'User logged in successfully', userDetails)

    }
}

export default UserServices