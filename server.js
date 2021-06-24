const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const shoppingCartRouter = require('./router/shoppingCartRouter')


// Send html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/index.html'))
});


// create static link
app.use('/public',express.static(path.join(__dirname, './public')));

// Use router: 
app.use('/api/user/', shoppingCartRouter);


// port to listen 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})