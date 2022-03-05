// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:3000');

// Connection opened
socket.addEventListener('open', function (event) {
    //socket.send('Hello Server!');
    console.log('Hello from requester !!!');
});

//Listen to messages
socket.addEventListener('message', function(event) {
    console.log('Message from server ', event);
});

const sendDta = () => {
    let uuid = document.getElementById("uid").value;
    let price = document.getElementById("price").value;
    let market = document.getElementById("market").value;
    let message = document.getElementById("floatingTextarea").value;
    if (uuid) {
        socket.send(JSON.stringify({
            'price': price,
            'market': market,
            'uuid': uuid,
            'message': message
        }));
    document.getElementById("message").innerHTML = '<b style="color:green;">Successfuly send Data!!</b>';
    // uuid = '';
    // price = '';
    // market = '';
    // message = '';
    } else {
        document.getElementById("uid").value = "";
        document.getElementById("message").innerHTML = 'Please select UUID';
    }
    
}

const get = (e) => {
    document.getElementById("uid").value = e.innerHTML;
    document.getElementById("uidBtn").innerHTML = e.innerHTML;
}