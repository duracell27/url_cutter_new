const express = require('express');
const config = require('config')
const app = express();
const mongoose = require('mongoose')
const PORT = config.get('port') || 5000


app.use('/api/auth', require('./routes/auth.routes'))

async function start() {
    try{
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`working...${PORT}`));
    }
    catch(e){
        console.log('server error', e.message)
        process.exit(1)
    }
}

start()

