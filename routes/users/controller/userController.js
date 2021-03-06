const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/User')
const errorHandler = require('../../util/errorHandler')

async function createUser(req, res){
    let body = req.body
    const {firstName, lastName, username, email, password} = body
    
    try {
        let salt = await bcrypt.genSalt(10)
        let hashed = await bcrypt.hash(password, salt)
        const createdUser = new User({
            firstName,
            lastName,
            username,
            email,
            password : hashed
        })

        let savedUser = await createdUser.save()

        res.json({
            message : 'success',
            payload: savedUser
        })
    }catch(e){
        res.status(500).json({
            message: "Failed",
            error : errorHandler(e)
        })
    }
}

async function login(req, res){
    const {email, password} = req.body

    try{

        let foundUser = await User.findOne({email: email})

        if(!foundUser){
            return res.status(500).json({
                message : 'error',
                error : "User does not exist. Please sign up"
            })
        }else{
            let comparedPassword = await bcrypt.compare(password, foundUser.password)

            if(!comparedPassword){
                return res.status(500).json({
                    message : 'error',
                    error: 'Incorrect password'
                })
            }else{
                let jwtToken = jwt.sign (
                    {
                        email : foundUser.email,
                        username : foundUser.username
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn : '24h'
                    }
                )

                res.json({
                    message: "success",
                    token: jwtToken
                })
            }
        }

    }catch(e){
        res.status(500).json({
            message: "error",
            error: errorHandler(e)
        })
    }
}


module.exports = {
    createUser,
    login
}