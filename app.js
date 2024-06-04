const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGO_DB_URI = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@nodejs-shop.os5pfbg.mongodb.net/shop?retryWrites=true&w=majority&appName=nodejs-shop`;

const app = express();
const store = new MongoDBStore({
    uri: MONGO_DB_URI,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const defaultUserId = '665998c95861317ef49c7a9e';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    resave: true,
    saveUninitialized: true,
    store,
}))

app.use((req, res, next) => {
    User.findById(defaultUserId)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
    .connect(MONGO_DB_URI)
    .then(() => {
        User.findById(defaultUserId)
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: 'Igor',
                        email: 'igor@test.com',
                        cart: { items: [] }
                    })
                    user.save();
                }
            });

        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
