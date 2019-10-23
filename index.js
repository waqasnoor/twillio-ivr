const express = require('express');
const bodyParser = require('body-parser');
const env = require('./env');
const app = express();
var twilio = require('twilio');

var client = new twilio(env.sid, env.auth);

const VoiceResponse = twilio.twiml.VoiceResponse;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/welcome/voice', (req, res) => {
  console.log('welcome');
  console.log(req.body);

  const voiceResponse = new VoiceResponse();

  const gather = voiceResponse.gather({
    action: '/ivr/menu',
    numDigits: '1',
    method: 'POST',
  });

  gather.say(
    'Thanks for calling twillio test service. ' +
    'Please press 1 for directions. ' +
    'Press 2 for a list of planets to call.',
    { loop: 3 }
  );



  res.send(voiceResponse.toString());
});
app.post('/ivr/menu', (req, res) => {
  console.log('menu');
  console.log(req.body);

  const voiceResponse = new VoiceResponse();

 

  voiceResponse.say(
    'Your Testing Code is 1214. Thank you for calling this service. Bye '
  );
  twiml.hangup();


  res.send(voiceResponse.toString());
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))