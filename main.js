const Discord = require ('discord.js');
const infofile = require("../Alice/info.json");
const config = require("./config/config.json");
const music = require('discord.js-music-v11')
const fs = require("fs");
const bot = new Discord.Client;
bot.command = new Discord.Collection;

fs.readdir("./Alice/command", (err, files) =>{
  if (err) console.log(err);
  let filejs = files.filter(f => f.split('.').pop() === "js");

  if (filejs.length<0) {
    console.log("Not Found Command!")
  }

    filejs.forEach((k,i)=>{
      let props = require (`./command/${k}`);
      console.log(`${k} is actived!`);
      bot.command.set(props.help.name,props);
    })
});

bot.on("ready", async =>{
  console.log(`${infofile.name} is online`);
  //default
  bot.user.setActivity(`Maid of Magic Star | a>help`, {type: "Playing"});
  bot.user.setStatus("dnd");
  //bot.channels.find(ch => ch.name === "announcement").send(`Hello, ${infofile.name} is online!`);
  console.log(`On ${bot.guilds.size} server!`);
  bot.guilds.forEach((guild)=>{
      console.log(`${guild.name} - #${guild.id}`)
  });
  /*bot.user.setPresence({
    status: "dnd",
    game:{
        name:("Maid Of Magic Star || a>help"),
        url:("https://www.twitch.tv/thedzero"),
        type:("Streaming")
    }
  })*/


});

bot.on("guildMemberAdd", member =>{
  // Welcome new member
  const channel = member.guild.channels.find(ch => ch.name === "announcement");
  if(!channel) return;
  channel.send(`Welcome to ${channel.guild.name} channel, ${member}!`);
});

bot.on("guildMemberRemove", member=>{
  const channel = member.guild.channels.find(ch => ch.name === "announcement");
  if(!channel) return;
  channel.send(`Bye bye ${member}`);
});

bot.on("message",async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.command.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
  if (!commandfile) return;

});


bot.login(infofile.connect.token);