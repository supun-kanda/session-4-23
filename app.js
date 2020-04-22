// core modules
const express = require('express'),
    graphqlHTTP = require('express-graphql'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    voyagerMiddleware = require('graphql-voyager/middleware').express;


// modules
const schema = require('./schema/schema'),
    restRouter = require('./routers/restRouter');

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

// graphql router
app.use('/graphql', graphqlHTTP(
    {
        schema,
        graphiql: true //set the graphiql front end
    }
))

// enable voyager middleware
app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

// rest router
app.use('/rest', restRouter)

app.listen(4000, () => {
    console.log('Listening on port 4000');
})