var express = require('express');
var router = express.Router();
const fs = require('fs');
const dataPath = './data/wallets.json';





 // refactored helper methods
 const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            throw err;
        }

        callback(returnJson ? JSON.parse(data) : data);
    });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            throw err;
        }

        callback();
    });
};



/* GET users listing. */
router.get('/', function(req, res, next) {
    
    readFile(data =>{
        res.send(JSON.parse(data))
    })
    
});

// CREATE
router.post('/create', (req, res) => {
    console.log("req.body.data)", req.body.data);
    readFile(data => {
        const newUserId = Object.keys(data).length + 1;

        // add the new user
        //data[newUserId] = JSON.parse(req.body.data);
        data[newUserId] = req.body.data;

        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send('new user added');
        });
    },
        true);
});

// UPDATE
router.put('/edit/:id', (req, res) => {

    readFile(data => {

        // add the new user
        const userId = req.params["id"];
        //data[userId] = JSON.parse(req.body.data);
        data[userId] = req.body.data;

        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`users id:${userId} updated`);
        });
    },
        true);
});

// DELETE
router.delete('/delete/:id', (req, res) => {

    readFile(data => {

        // add the new user
        const userId = req.params["id"];
        delete data[userId];

        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`users id:${userId} removed`);
        });
    },
        true);
});

module.exports = router;
