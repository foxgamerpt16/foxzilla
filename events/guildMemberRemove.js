const Discord = require('discord.js')

/**
 * O evento guildMemberAdd é emitido após um membro entrar (ser adicionado em uma guild).
 */

module.exports = async (client, member) => {
  const message = new Discord.RichEmbed()
    .setThumbnail(member.user.displayAvatarURL)
    .setColor('RANDOM')
    .setAuthor('👤 A member left the server!')
    .setDescription(`${member} left server, goodbye👋`)
    .setFooter('FOXZILLA BOT')
    .setTimestamp()

  member.guild.channels.get(process.env.LEAVECHANNEL).send(message).catch()
}
