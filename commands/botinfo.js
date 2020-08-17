/**
 * O Comando "botinfo"mostrará informações do bot
 */

const Discord = require('discord.js')
const moment = require('moment')

moment.locale('en-us')

module.exports = {

  run: function (client, message, args) {
    const inline = true
    const botAvatar = client.user.displayAvatarURL
    const date = client.user.createdAt
    const userName = client.user.username
    const servsize = client.guilds.size
    const usersize = client.users.size
    const status = {
      online: '`🟢` Online',
      offline: '`⚫` Offline'
    }

    const embed = new Discord.RichEmbed()
      .setColor(client.displayHexColor === '#000000' ? '#ffffff' : client.displayHexColor)
      .setThumbnail(botAvatar)
      .setAuthor('🤖 My Info :information_source:')
      .addField('**My Nick:**', userName)
      .addField('**My ID**', client.user.id)
      .addField('**Server(es)**', `🛡 ${servsize}`, true)
      .addField('**Member(es)**', `${usersize}`, inline)
      .addField('**Im online since**', moment().to(client.startTime, true))
      .addField('**Im create**', formatDate('DD/MM/YYYY, às HH:mm:ss', date))
      .setFooter(`${client.user.username}`)
      .setTimestamp()

    if (client.user.presence.status) {
      embed.addField(
        '**Status**',
        `${status[client.user.presence.status]}`,
        inline,
        true
      )
    }

    message.channel.send(embed)
  },

  conf: {},

  get help () {
    return {
      name: 'botinfo',
      category: 'Info',
      description: 'Mostra informações do bot.',
      usage: 'botinfo'
    }
  }
}
/**
 * Formata a data passada para o padrão do Brasil.
 * @param {string} template
 * @param {Date=} [date]
 * @return {string}
 */
function formatDate (template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}
