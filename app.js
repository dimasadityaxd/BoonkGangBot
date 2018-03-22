const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');

client.on('ready', () => {
  console.log('Bot Launched...');

});

var prefix = ">";

client.on("message", message => {

if (!message.content.startsWith(prefix) || !message.guild || message.author.bot) return;
let args = message.content.split(" ").slice(1);
var argresult = args.join(" ");

	if (message.content.startsWith(prefix + "ping")) {
   	 message.reply(`pong! \`${Date.now() - message.createdTimestamp} ms\``);
  } else

  	if (message.content.startsWith(prefix + "invite")) {
   	 message.channel.send("https://discordapp.com/oauth2/authorize?client_id=425875326250254336&scope=bot&permissions=2146958591");
  } else

  if (message.content.startsWith(prefix + "setgame")) {
	  client.user.setGame(argresult);
  } else

  if (message.content.startsWith(prefix + "setstatus")) {
	  client.user.setStatus(argresult);
  } else

  	if (message.content.startsWith(prefix + "help")) {
   	 message.channel.send("Commands : `>ping`, `>join`, `>leave`, `>invite`");
  } else

  	if (message.content.startsWith(prefix + "join")) {
		let voiceChan = message.member.voiceChannel;
		if (!voiceChan || voiceChan.type !== "voice") {
			message.channel.sendMessage("No").catch(error => message.channel.sendMessage(error));
		} else if (message.guild.voiceConnection) {
			message.channel.message("I'm already in a voice channel");
		} else {
			message.channel.sendMessage("Joining...").then(() => {
				voiceChan.join().then(() => {
					message.channel.sendMessage("Joined successfully.").catch(error => message.channel.sendMessage(error));
				}).catch(error => message.channel.sendMessage(error));
			}).catch(error => message.channel.sendMessage(error));
		}
	} else  

	if (message.content.startsWith(prefix + "leave")) {
		let voiceChan = message.member.voiceChannel;
		if (!voiceChan) {
			message.channel.sendMessage("I am not in a voice channel");
		} else {
			message.channel.sendMessage("Leaving...").then(() => {
				voiceChan.leave();
			}).catch(error => message.channel.sendMessage(error));
		}
	}

	if(message.content.startsWith(prefix + "eval")) {
      if(message.author.bot) return;
  if (message.author.id !== "195072060249210881") {
  console.log('Owner only command attemped by: ' + message.author.username + '(' + message.author.id + ')' + ' on ' + message.guild.name + '(' + message.guild.id + ')');
  return message.reply("This can only be used by the bot owner.")
  }

  if (!message.guild || !message.member) return;
  var evalcode = message.content.split(" ").splice(1).join(" ");
  		try {
  			var evaled = eval(evalcode);
  			if (typeof evaled !== "string")
  				evaled = require("util").inspect(evaled);
  			message.channel.send("Output:\n```x1\n" + clean(evaled) + "```");
  		}
  		catch (err) {
  			message.channel.send("Error: " + clean(err));
  		}

  		function clean(text) {
  			if (typeof(text) === "string") {
  				return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  			}
  			else {
  				return text;
  			}
  		}
      }

      if(message.content.startsWith(prefix + "debug")) {
      if(message.author.bot) return;
  if (message.author.id !== "195072060249210881") {
  console.log('Owner only command attemped by: ' + message.author.username + '(' + message.author.id + ')' + ' on ' + message.guild.name + '(' + message.guild.id + ')');
  return message.reply("This can only be used by the bot owner.")
  }
  if (!message.guild || !message.member) return;
  var evalcode = message.content.split(" ").splice(1).join(" ");
  		try {
  			var evaled = eval(evalcode);
  			if (typeof evaled !== "string")
  				evaled = require("util").inspect(evaled);
  			message.channel.send("Output:\n```x1\n" + clean(evaled) + "```");
  		}
  		catch (err) {
  			message.channel.send("Error: " + clean(err));
  		}

  		function clean(text) {
  			if (typeof(text) === "string") {
  				return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  			}
  			else {
  				return text;
  			}
  		}
      }
      
});

client.login(settings.token);
