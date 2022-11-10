const express = require("express");
const cors = require("cors");
const {expressjwt} = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require("axios");


const app = express();

app.use(cors()); 

const verifyJwt = expressjwt({
        secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://bhushan-pawar.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'this is a unique identifier',
  issuer: 'https://bhushan-pawar.us.auth0.com/',
  algorithms: ['RS256'],
}).unless({path:['/']});


app.use(verifyJwt);

app.get('/',(req, res)=>{

    res.send('Hello from index route');

});

app.get('/protected', async(req, res)=>{
    try {
        
   
    const accessToken = req.headers.authorization.split(' ')[1]; //splits bearer from the token
    const apiResponse = await axios.get('https://bhushan-pawar.us.auth0.com/userinfo',
    {
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    }); //{issuer /tenet }

    const userinfo = apiResponse.data;
    console.log("User Info: ", userinfo);
    res.send(userinfo);

} catch (error) {
 
    res.send(error.message);
}
})



app.use((req,res,next)=>{

    const error = new Error('Not found');
    error.Status =404;
    next(error);

});

app.use((error,req,res,next)=>{
    const status = error.staus || 500;
    const message = error.message || 'Internal Server Error';
    res.status(status).send(message);
})

app.listen(4000, ()=> console.log("Server on Port 4000"));