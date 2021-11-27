const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

// my files
const category = require('./routes/category');
const subcategory = require('./routes/subcategory');
const user = require('./routes/user');
const auth = require('./routes/auth');
const verify = require('./middleware');
const product = require('./routes/product');
const tag = require('./routes/tag');
const image = require('./routes/image');





const PORT = 8000;
const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());
const authenticate = async (req, res, next) => {
    await verify(req, res, next)
  }
app.use('/admin', category);
app.use('/admin', subcategory);
app.use('/admin', product);
app.use('/admin', image);

app.use('/auth', auth);

app.use(authenticate)


app.use('/admin', user);
app.use('/admin', tag);







app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
