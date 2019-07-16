const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let admin = message.member.hasPermissions(["BAN_MEMBERS"|| "KICK_MEMBERS" || "ADMINISTRATOR" ]);
    if(!admin) message.channel.send("You Dont Have Permission!");
    let wuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let wreason = args.join(" ").slice(22);
    message.channel.send(`:warning: ${wuser.user.username} has been warned!`)
    message.delete().catch(r=>{});
    let warn = new Discord.RichEmbed()
    .addField(`:exclamation: ${wuser.user.username} - You have been warned from ${message.guild.name}`, `${wreason}`)
    .setTimestamp()
    .setFooter(`${message.author.username}`, message.author.displayAvatarURL);
  try {
    await wuser.send(warn);
  } catch (e) {
    console.log(e.stack);
  }
}

module.exports.help = {
    name:"warn"
}