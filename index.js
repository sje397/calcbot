const { Client } = require('discord.js');
const { token } = require('./settings');
const math = require('mathjs');
const https = require('https');

const client = new Client();

client.on('ready', () => console.log('Ready!'));

client.on('message', (msg) => {
  if (msg.author.bot) return;

  try {
    let response = math.evaluate(msg.content).toString();
    if(response && response.length > 0 && response != msg.content && response != '"' + msg.content + '"') {
      msg.channel.send(response);
    }
  }
  catch (err) {
    // ignore errors
    //msg.channel.send(err.toString());
  }
});

client.login(token);
