var express = require('express');
const csv = require('csv-parser');
var bodyParser = require('body-parser');
const btoa = require('btoa')
require('custom-env').env('production')
const request = require('request-promise')
var fs = require("fs");
const authMiddleware = require('./auth')
var app = express();

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(authMiddleware)
var words=[];
console.log(process.env.ISSUER)

// const { ISSUER, CLIENT_ID, CLIENT_SECRET, SCOPE } = process.env

// const [,, uri, method, body] = process.argv
// if (!uri) {
//   console.log('Usage: node client {url} [{method}] [{jsonData}]')
//   process.exit(1)
// }

// const sendAPIRequest = async () => {
//   const token = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)
//   console.log(token)
// //   try {
//     const auth = await request({
//       uri: `${process.env.ISSUER}/v1/token`,
//       json: true,
//       method: 'POST',
//       headers: {
//         authorization: `Basic ${token}`
//       },
//       form: {
//         grant_type: 'client_credentials',
//         scope: process.env.SCOPE
//       }
//     })
// console.log(auth)
//     const response = await request({
//       uri,
//       method,
//       body,
//       headers: {
//         authorization: `${auth.token_type} ${auth.access_token}`
//       }
//     })

//     console.log(response)
//   } catch (error) {
//     console.log(`Error: ${error.message}`)
//   }
// }

// sendAPIRequest()











app.get('/search/:string', function (req, res) {
    console.log("search API called")
    string=req.params.string
    var Regex= /^[a-zA-Z]+$/;
    if(Regex.test(string)){
        words=[]
        fs.createReadStream('assets/words.csv')
        .pipe(csv())
        .on('data', (row) => {
          var pattern= new RegExp(string,"i")
          if(pattern.test(row.Names)){
              words.push(row.Names)
          }
        })
        .on('end', () => {
            res.send(words)
        });
    }else{
        res.json({errCode:1,errorMessage:"Numbers cannot be searched in dictionary"})
    }

    
// Slots.listSlot(date,function(err, user){
//     if (err) {
//         console.log('Error occured: --------> '+ err);
//         res.json({status:404,data:"Error Occured"})
//     } else {
//         //console.log(user)
//         res.json({status:200,data:user});
        
//     }
// });
    })
var server = app.listen(8000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })