const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid'); // for generating unique identifiers

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Store confession in memory (for demonstration purposes)
let confession = [];

// Serve static files from the public directory
app.use(express.static('public'));

// Endpoint for sending an anonymous message
app.post('/confession', (req, res) => {
  const { text } = req.body;
  const messageId = uuid.v4(); // Generate a unique identifier for the message
  const message = { id: messageId, text };
  confession.push(message);
  res.status(201).json({ message: 'Message sent successfully.', id: messageId });
});


app.get('/main', (req, res) => {
  res.sendFile(__dirname + '/public/main.html');
  });
  
  app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
    });

    
// Endpoint for retrieving confessions
app.get('/confession', (req, res) => {
  const confessionTexts = confession.map((message) => message.text);

  const confessionsHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Sleepy-Headzzz</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(245.59deg, #a22160 7%, #c91453 28.53%, #0a0002 75.52% );
          display: flex;
          
          color: white; 
          min-height: 100vh;
      
          margin: 0;
          padding: 20px;
        }

        .container {
          
          max-width: 600px;
          margin: 0 auto;
        }
        .confession {
          background-color: black;
          padding: 10px;
          box-size:10px;
          margin-bottom: 20px;
          border-radius: 15px;
        }
      </style>
    </head>
    <body>
   
      <div class="container">
        <h1>Trending Confession Messages</h1>
        ${confessionTexts.map((text) => `<div class="confession">${text}</div>`).join('')}
      </div>
    </body>
    </html>
  `;

  res.send(confessionsHTML);
});



// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
