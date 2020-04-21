// core modules
const express = require('express'),
    graphqlHTTP = require('express-graphql'),
    schema = require('./schema/schema'),
    mongoose = require('mongoose'),
    cors = require('cors');

// constants
const { mongoUrl } = require('./utils/constants')

const app = express();

mongoose.connect(mongoUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

mongoose.connection.once('open', () => {
    console.log('Connected to DB');
})

// allow cors
app.use(cors());

app.use('/graphql', graphqlHTTP(
    {
        schema,
        graphiql: true
    }
))

app.listen(4000, () => {
    console.log('Listening on port 4000');
})