const express = require('express');
const app = express();
const PORT = 5000;

const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://magatriod7:19930821@cluster0.ilzmt.mongodb.net/cluster0?retryWrites=true&w=majority',{
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req,res) => {
  res.send('Hello World!');
});
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}!`);
});