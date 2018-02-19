const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data/game.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS gameinfo (name TEXT, scores INTEGER)");
});

var express = require('express');
const app = express();
const port = 8000;

var bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

app.get('/data', (req, res) => {
    db.get("SELECT scores FROM gameinfo WHERE name = ?", req.query.name,(err, row) => {
        if (!err && row) 
        {
            res.json({ scores: row.scores });
        }
        else
        {
            console.log(err);
            res.json({ scores: -1 });
        }
    });
});

app.get('/data/ranked', (req, res) => {
    db.all("SELECT name, scores FROM gameinfo ORDER BY scores DESC LIMIT 3", (err, rows) => {
        if (!err && rows) 
        {
            const data = [];
            rows.forEach(row => {
                data.push(JSON.stringify({ name: row.name, scores: row.scores}));
            })  
            res.json({ users: data });
        }
        else
        {
            console.log(err);
            res.json({ users: 'false' });
        }
    });
});

app.post('/data', (req, res) => {
    db.run("INSERT INTO gameinfo (name, scores) VALUES (?, ?)", req.body.name, 0, (err, row) => {
        if (err){
            console.log(err);
            res.json({ "success" : "false" });
        }
        else {
            res.json({ "success" : "true" });
        }
    });
});

app.put('/data', (req, res) => {
    db.run("UPDATE gameinfo SET scores = ? WHERE name = ?", req.body.scores, req.body.name, (err, row) => {
        if (err){
            console.log(err);
            res.json({ "success" : "false" });
        }
        else {
            res.json({ "success" : "true" });
        }
    });
});

app.use(express.static('public'));
app.listen(port, () => { console.log(`server listening on port ${port}`);});
