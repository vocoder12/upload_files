const mongodbRoute = ''
const port = 3001
const mongoose =  require ('mongoose')
const path = require('path')
const hbs = require ('hbs')
const express = require ('express')
const router = require ('./router/router')
const app = express()

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.use (router)
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

/*MONGODB*/
mongoose.Promise = global.Promise
mongoose.connect(mongodbRoute, (err, resp) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log(`Conexión con Mongo correcta.`)
})
app.listen (port, () => {console.log(`Server up ${port}`)})