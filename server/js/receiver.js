// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:3000');

// Connection opened
socket.addEventListener('open', function (event) {
    //socket.send('Hello Server from receiver!');
    console.log('Hello from receiver !!!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    let responseMsg = '';
    if (event.data) {
        responseMsg = JSON.parse(event.data);
        if (responseMsg.price || responseMsg.market) {
            document.getElementById(responseMsg.uuid).style.background = '#0f6a9861';
        }
        document.getElementById('_alert').style.display = 'block';
        document.getElementById('price_'+responseMsg.uuid).innerHTML = responseMsg.price || '';
        document.getElementById('market_'+responseMsg.uuid).innerHTML = responseMsg.market || '';
        document.getElementById('_message').innerHTML = responseMsg.message || '';
    } else {
        document.getElementById('_message').innerHTML = 'No message to display :)';
    }
    console.log('Message received from requester!!');
});

const closeAhowAlert = ()=> {
    document.getElementById('_alert').style.display = 'none';
}

