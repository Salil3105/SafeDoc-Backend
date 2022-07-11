require("dotenv").config();
const bcryptjs = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");

//  importing required files 
const User = require("../model/user");
require("../config/database").connect();
const TOKEN_KEY = process.env.TOKEN_KEY;
const router = express();

router.use(express.json());

// Logic goes here ...
// Register a new user
router.post('/register', async (req, res) => {

    // Our Registeration logic goes here
    try {
        const { first_name, last_name, email, password } = req.body;
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            // Check if user already exists
            return res.status(400).send("User already exists");
        }
        else {


            console.log('\nIn Register try part\n');

            // Get User Input 
            const data = req.body;
            console.log(data);

            // Validate the user 
            if (!(first_name && last_name && email && password)) {
                res.status(400).send("All input is required");
            }

            // Encrypt the password
            encryptedPassword = await bcryptjs.hash(password, 10);

            const user = await User.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: encryptedPassword,
            });

            // Generate a token
            console.log(TOKEN_KEY);
            const token = jwt.sign(
                { user_id: user._id, email },
                TOKEN_KEY,
                {
                    expiresIn: '1hr',
                }
            );

            // Save the user token
            user.token = token;
            // return new user
            res.status(201).json(user);
            // console.log(user);
        }

    } catch (error) {
        console.log('\nIn Register Catch Error part\n');
        console.log("Error : ", error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        
        // Validate user input 
        if (!(email && password)) {
            res.status(400).send("All inputs are required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            //  Create Token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h",
                }
            );

            // save user token 
            user.token = token;
            // user
            console.log("Login Successfully");
            res.status(200).send("Login Successfully");
        }
        else {
            res.status(400).send("Invalid Credentials, Login Failed")
        }

    } catch (error) {
        console.log("Error ", error);
    }
})

router.post('/otp', async(req,res) => {

});

module.exports = router;
