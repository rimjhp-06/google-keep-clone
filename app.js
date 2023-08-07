// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Note = require('./models/Note');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/google_keep_clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  Note.find({}, (err, notes) => {
    if (err) {
      console.error(err);
    } else {
      res.render('index', { notes });
    }
  });
});

app.post('/add', (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({ title, content });
  newNote.save((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});

app.post('/delete', (req, res) => {
  const { id } = req.body;
  Note.findByIdAndRemove(id, (err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
