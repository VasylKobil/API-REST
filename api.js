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


app.get('/api/words', (req, res) => {
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

app.delete('/delete/:word', (req, res,next) => {
    const word = req.params.word;
    words.every(ele => {
        if(ele.word === word){
            const index = words.indexOf(ele);
            if(index > -1){
                words.splice(index, 1);
            }
            return false;
        }
        return true;
    })
    res.send('OK');
});

app.listen(port, () => console.log(`Please go to http://localhost:${port}`));