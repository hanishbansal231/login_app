import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';

export async function verifyUser(req,res,next){
    try{
        const {username} = req.method == "GET" ? req.query : req.body;
        const exist = await User.findOne({username});
        if(!exist) return res.status(404).send({error: "Can't Find User!"});
        next();
    }catch(err){
        return res.status(500).send({error: "Authentication Error..."})
    }
}

export async function register(req, res) {
    try {
        const { username, password, email, profile } = req.body;

        const exitUserName = User.findOne({ username });
        const exitEmail = User.findOne({ email });

        const [existingUsername, existingEmail] = await Promise.all([exitUserName, exitEmail]);

        if (existingUsername) {
            return res.status(400).json({ error: "Please use a unique username..." });
        }

        if (existingEmail) {
            return res.status(400).json({ error: "Please use a unique email..." });
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                password: hashedPassword,
                email,
                profile: profile || '',
            });

            try {
                await newUser.save();
                return res.status(200).json({
                    success: 'Registered successfully...',
                    message: true,
                    data: newUser
                });
            } catch (err) {
                return res.status(500).json({
                    error: 'Registration failed',
                    message: err.message,
                });
            }
        } else {
            return res.status(400).json({ error: "Please provide a password..." });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

export async function login(req, res) {
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({
                error: "User not found",
                message: "User with the provided username does not exist."
            });
        }
        const checkPassword = await bcrypt.compare(password,user.password);
        if(!checkPassword){
            return res.status(400).json({
                error: "Invalid credentials",
                message: "Username and password combination is incorrect."
            });
        }
        const token = jwt.sign({
            user_id: user._id,
            username: user.username,
        },ENV.JWT_SECRET,{expiresIn: "24h"})
        return res.status(200).send({
            message: "Login Successfully...",
            username: user.username,
            token,
        });
    } catch (err) {
        return res.status(500).send(err);
    }
}
export async function getUser(req,res){
    try{
        const {username} = req.params;
        if(!username) {
            return res.status(501).send({error: "Invalid Username"});
        }
        const user = await User.findOne({username});
        user.password = null;
        if(!user) {
            return res.status(501).send({error: "Can't Fint the User..."});
        }
        return res.status(201).send({user});
    }catch(err){
        return res.status(500).send({
            error: "Can't Find User...",
            message: err.message,
        })
    }
}
// export async function updateUser(req,res){
//     res.json("updateUser Route");
// }
// export async function genrateOTP(req,res){
//     res.json("genrateOTP Route");
// }
// export async function verifyOTP(req,res){
//     res.json("verifyOTP Route");
// }
// export async function resetCreateSession(req,res){
//     res.json("resetCreateSession Route");
// }
// export async function resetPassword(req,res){
//     res.json("resetPassword Route");
// }