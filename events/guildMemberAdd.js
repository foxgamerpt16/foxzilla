const moment = require('moment')
const Discord = require('discord.js')

/**
 * O evento guildMemberAdd é emitido após um membro entrar (ser adicionado em uma guild).
 */

module.exports = async (client, member) => {
  // Verificações anti-selfbot de divulgação já que estamos tendo problemas com isso.
  const daysSinceCreation = moment().diff(moment(member.user.createdAt), 'days')
  const isDefaultAvatar = member.user.displayAvatarURL.startsWith('https://discordapp.com/')
  const domaincount = member.user.username.match(/\b((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}\b/)
  if (domaincount > 0 && (isDefaultAvatar || daysSinceCreation < 3)) return (() => { member.send('Olá! você foi kickado automaticamente por suspeita de divulgação em nosso servidor. Contas com menos de 3 dias no discord não podem ter domínios (exemplo twitter.com)').catch(); member.kick('Autokick: Selfbots não são bem vindos').catch() })()

  const message = new Discord.RichEmbed()
    .setThumbnail(member.user.displayAvatarURL)
    .setColor('RANDOM')
    .setAuthor('👋 Welcome to a FOXZILLA')
    .setTitle('HI!!!')
    .setDescription(`${member}, vá em <#701166972003549244> e leia os tópicos.`)
    .setFooter('FOXZILLA BOT')
    .setTimestamp()

  const join = new Discord.RichEmbed()
    .setThumbnail(member.user.displayAvatarURL)
    .setColor('RANDOM')
    .setAuthor('✨ A new member joined the server!')
    .setDescription(`${member} just joined the guild`)
    .setFooter('FOXZILLA BOT')
    .setTimestamp()

  member.guild.channels.get(process.env.JOINCHANNEL).send(join).catch()
  member.guild.channels.get(process.env.GREETCHANNEL).send(message).catch()
}
