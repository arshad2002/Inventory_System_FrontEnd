
const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));



app.listen(2000, () => {
  console.log('Server is running on port 2000');
});
