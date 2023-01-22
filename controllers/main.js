const CustomApiError = require("../errors/custom-error")
const jwt = require('jsonwebtoken');
const { BadRequest } = require("../errors");

const login = async (req, res) => {
    console.log(req.headers);
    const { username, password } = req.body
    if (!username || !password) {
        throw new BadRequest("please provide valid credentials")
    }

    //just for example
    const id = new Date().getDate()

    //try to keep the payload small for better user experience cos it takes computation time to decode
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: "30d" });
    
    res.status(200).json({msg: "user created", token})
}

//resource from a protected route
const dashboard = async (req, res) => {
    console.log(req.user)

    try {
        const luckyNumber = Math.floor(Math.random() * 200);
        res.status(200).json({ msg: `here is your authorized ${luckyNumber} ${req.user.username}` });
    } catch (error) {
        throw new CustomApiError("not authorized to access this route", 401)
    }
   
    
}

module.exports = {
  login,
  dashboard,
};