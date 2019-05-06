const qr_image = require('qr-image');
const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');
app.set('views');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('Home', { ready: false });
});

app.post('/convert', (req, res, next) => {
  let text = req.body.text;
  if (text === '') {
    res.render('Error');
  } else {
    let image = qr_image.imageSync(text, { type: 'png' });
    try {
      fs.writeFile('./public/image.png', image, err => {
        if (err) {
          res.render('Error');
        } else {
          console.log('ready...');
        }
      });
      res.render('Home', { ready: true });
    } catch (e) {
      console.log(e);
    }
  }
});

app.listen(8080);
