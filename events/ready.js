/**
   * Evento ready é disparado assim que o bot é conectado ao Discord
   */

module.exports = async (client) => {
  console.log(`${client.user.username} is now ONLINE. Im have ${client.users.size} member(s) in ${client.guilds.size} server(es)!`)

  client.user.setPresence({
    status: 'online',
    game: {
      name: process.env.GAME
    }
  })
}
