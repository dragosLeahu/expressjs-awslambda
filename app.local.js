const morgan = require('morgan');
const app = require('./app');
const port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.listen(port, () => console.log(`Server is listening on port ${port}.`));