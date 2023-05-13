const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
//express app
const app = express();

//conncet to mongodb
const dbURI = 'mongodb+srv://Tron:Tronn62158@cluster0.p45b29s.mongodb.net/database?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  // .then((result) => console.log('connected to db'))
  .then((result) => app.listen(process.env.PORT || 3000))
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});



app.get('/about', (req, res) =>{
    // res.send('<p>about page</p>');
    res.render('about', { title: 'about' });
})

app.use('/blogs', blogRoutes);


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});