const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/index.html'))
})
// tạo đường dẫn tĩnh 
app.use('/public',express.static(path.join(__dirname, './public')));
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})