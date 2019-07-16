const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS" | "ADMINSTARTOR")) return message.reply("Sorry pal, you can't do that.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find that user, yo.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Couldn't find that role.");

  if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
  await(rMember.addRole(gRole.id));
  message.delete().catch(r=>{});

  try{
    await message.channel.send(`Congrats to ${rMember.user.username}, You have been given the role ${gRole.name}.`)
  }
  catch(e){
    console.log(e.stack);
  }
}

module.exports.help = {
  name:"addrole"
}