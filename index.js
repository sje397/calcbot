const { Client } = require('discord.js');
const { token } = require('./settings');
const https = require('https');

// make eval more secure
const { create, all } = require('mathjs');
const math = create(all);

const limitedEvaluate = math.evaluate

math.import({
  import: function () { throw new Error('Function import is disabled') },
  createUnit: function () { throw new Error('Function createUnit is disabled') },
  evaluate: function () { throw new Error('Function evaluate is disabled') },
  parse: function () { throw new Error('Function parse is disabled') },
  simplify: function () { throw new Error('Function simplify is disabled') },
  derivative: function () { throw new Error('Function derivative is disabled') }
}, { override: true })

let scopes = {};

const client = new Client();

client.on('ready', () => console.log('Ready!'));

client.on('message', (msg) => {
  if (msg.author.bot) return;

  let forget = msg.content.toLowerCase() === "calcbot forget";

  if(!scopes[msg.author.id] || forget) {
    scopes[msg.author.id] = {};
  }

  if(forget) {
    msg.channel.send("Scope cleared");
    return;
  }

  try {
    let response = limitedEvaluate(msg.content, scopes[msg.author.id]);
    if(response.toString() !== msg.content
      && typeof response !== 'function' 
      && '"' + response + '"' !== msg.content
      && "'" + response + "'" !== msg.content)
    {
      msg.channel.send(response.toString());
    }
  }
  catch (err) {
    // ignore errors
    //msg.channel.send(err.toString());
  }
});

client.login(token);
