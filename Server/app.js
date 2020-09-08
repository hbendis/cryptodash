const express = require('express');
const app = express();
const mongoose = require('mongoose')
const PORT = 5000;
const {MongoURI} = require('./keys')

require('./models/user')
app.use(express.json())
app.use(require('./routes/auth'))

mongoose.connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connection works"))
  .catch((err) => console.log("DB Connection failed", err))

mongoose.connection.on('error', (err) => {
    console.log("err connecting", err)
})

app.listen(PORT, () =>{
    console.log("server is running on", PORT)
})
