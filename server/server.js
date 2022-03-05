const express = require('express');
const App = express();

const server = require('http').createServer(App);
const WebSocket = require("ws");
const webSocketServer = new WebSocket.Server({
    server:server
});
App.set('view engine', 'ejs');
let path = require('path');
const { createBrotliCompress } = require('zlib');
App.use(express.static(path.join(__dirname, '/')));

const fileReader = require('fs');
jsonReader = function(filepath,cb) {
    fileReader.readFile(filepath, 'utf-8', (error, data) => {
        if (error) {
            return cb && cb(error)
        }
        try {
            const object = JSON.parse(data);
            return cb && cb(null, object);
        } catch (error) {
            return cb && cb(error)
        }
    })
};

webSocketServer.on('connection', function connection(ws) {
    console.log('A new client Connected!');
    // ws.send('Welcome New Client!');
    ws.on('message', function incoming(message) {
    webSocketServer.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            let getData = JSON.stringify(JSON.parse(message));
            
            jsonReader('../data/data.json', (error, data) =>{
                if (error) {
                    console.log(err);
                    response.send('Some Error occured!');
                } else {
                    let record = data.data.coins;
                    let mapedData = {'coins': []};
                    let proceeed = false;
                    record.forEach((element, index) => { 
                        let rObj = JSON.parse(message);
                        let uuid = rObj.uuid;

                        let mapD = data.data.coins[index];
                        
                        if (mapD.uuid == uuid) {
                            mapD.uuid = uuid;
                            mapD.price = rObj.price;
                            mapD.marketCap = rObj.market;
                            proceeed = true;
                        }
                        mapedData['coins'].push(mapD);
                    })
                    // console.log('maped Array ',proceeed );
                    if (proceeed) {
                        fileReader.writeFile('../data/data.json',JSON.stringify(data, null, 2), error => {
                            if (error) {
                                console.log(error);
                            }
                        })
                    }
                    
                }
            });
            client.send(getData);
            //console.log('======> ', getData);
        }
    });
});
});

App.get('/', (request,response) => {
    jsonReader('../data/data.json', (error, data) =>{
        if (error) {
            console.log(error);
            response.send('Some Error occured!');
        } else {
            //console.log(data.data);
            let record = data.data;
            response.render('client',record);
        }
    }); 
    //response.render('client');
});
App.get('/client', (request,response) => {
    jsonReader('../data/data.json', (error, data) =>{
        if (error) {
            console.log(err);
            response.send('Some Error occured!');
        } else {
            //console.log(data.data);
            let record = data.data;
            response.render('requestMaker',record);
        }
    }); 
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listing fom port ${port}`))


