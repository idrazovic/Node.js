const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const defaultUserId = '665998c95861317ef49c7a9e';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

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

app.use(errorController.get404);

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@nodejs-shop.os5pfbg.mongodb.net/shop?retryWrites=true&w=majority&appName=nodejs-shop`
    )
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
