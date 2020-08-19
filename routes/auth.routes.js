const {Router, json} = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = Router()

router.post('/registr', [
    check('email', 'It is not Email').isEmail(),
    check('password', 'Password must be more than 6 symbols').isLength({min: 6}),
], async (req , res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty){
            return res.status(400),json({
                errors: errors.array(),
                message: 'Data is false on signUp'
            })
        }
        const {email, password} = req.body

        const candidate = await User.findOne({email})
        
        if(candidate){
            res.status(400).json({message: "This email is already exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({email, password : hashedPassword})

        await user.save()

        res.status(201).json({message: "User was add successfuly"})

    } catch(e){
        res.status(500).json({message : "Помилка при реєстрації"})
    }
})

router.post('/login', 
[
    check('email', 'It is not correct Email').normalizeEmail().isEmail(),
    check('password', 'Password must be more than 6 symbols').exists().isLength({min: 6}),
], async (req , res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty){
            return res.status(400),json({
                errors: errors.array(),
                message: 'Data is false on signIn'
            })
        }
     
        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user) {
            res.status(400).json({message : "No user"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            res.status(400).json({message : "Password isnt correct"})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '2h'}
        )

        res.json({token, userId: user.id})


    } catch(e){
        res.status(500).json({message : "Помилка при логіні"})
    }
})


module.exports = router