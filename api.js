const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
const app = express();
app.set("view options", {layout: false});
app.use(express.static(__dirname));

let words = [];

app.use(cors());
app.use(express.static(__dirname + 'public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/words', (req, res) => {
    res.json(words);
})

app.get('/', function(req, res){
    res.render('index.html');
});

app.post('/', (req, res) => {
    const word = req.body;
    const result = {word: word.word}
    words.push(result);
});

app.delete('/book/:num', (req, res) => {
    const num = req.params.num;

    words = words.filter(i => {
        if (i.num !== num) {
            return true;
        }
        return false;
    });
});

app.listen(port, () => console.log(`Please go to http://localhost:${port}`));