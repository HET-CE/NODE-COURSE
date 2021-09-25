const express = require('express');

const userRouter = require('./Routes/userRouters');
const tourRouter = require('./Routes/tourRouters');

const app = express();

app.use(express.json()); // simple middleware

app.use((req, res, next) => {
  console.log('Hello from middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// /:id = parameter required , /:x? = parameter optional

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', addTour);

// app.get('/', (req, res) => {
//   // res.status(200).send("Hello from server");
//   res.status(200).json({ messages: 'Hello from server', app: 'natours' });
// });

// app.post('/', (req, res) => {
//   res.send('you can post to this route');
// });
