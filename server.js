require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const sendStrom = require('./utils/send_strom')

// middlewares
app.use(express.json())
app.use(cors())

// main route
app.post('/', (req, res) => {
    const {userId, password} = req.body
    
    if(password !== process.env.AUTH_PASSWORD){
        return res.status(400).json({message: 'Invalid Password'})
    }
    const string = 'abcdefghijklmnopqrestuvwxyz';
    const arr = string.split('')
    const arr2 = userId.split('')
    for(i of arr){
        for(i2 of arr2){
            if(i === i2) {
                return res.status(400).json({message: 'Invalid UserId'})
            }
        }
    }
    if(userId.length > 9 || userId.length < 5) {
        return res.status(400).json({message: 'Invalid UserId'})
    }
    console.log(userId.length)

    // calling the sendstrom func only if pass matches
    try {
        sendStrom(userId).catch(err => console.log(err))
        res.send({message: 'Successfully sent... Check Your Notification panel'})
    } catch (err) {
        return res.status(501).json({message:'An Error occured while Sending the like strom'})
    }
})

// listening to port
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`))