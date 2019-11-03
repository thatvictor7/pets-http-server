var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var morgan = require('morgan');
app.disable('x-powered-by');
app.use(morgan('short'));

app.get('/pets', function(req,res) {
    fs.readFile(petsPath, 'utf8', function (err, petsPath) {
        if (err) {
           console.error(err.stack) 
        //    console.log("bingo");
           return res.sendStatus(500)
        }

        var pets = JSON.parse(petsPath)
        res.send(pets)
    })
})

app.get('/pets/:id', function(req,res) {
    fs.readFile(petsPath, 'utf8', function (err, petsPath) {
        if (err) {
            console.error(err.stack)
            //    console.log("bingo");
            return res.sendStatus(500)
        }
        var id = Number.parseInt(req.params.id)
        var pets = JSON.parse(petsPath)

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }

        res.set('Content-Type', 'text/plain')
        res.send(pets[id])
    })
})

app.post()

app.use(function (req, res) {
    // console.log("bingo");
    res.sendStatus(404);
});

app.listen(port, function () {
    console.log('Listening on port', port);
});