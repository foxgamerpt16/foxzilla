require('dotenv').config()

const Discord = require('discord.js')
const { readdirSync } = require('fs')
const Enmap = require('enmap')
const client = new Discord.Client()

client.commands = new Enmap()
client.startTime = Date.now()

const cmdFiles = readdirSync('./commands/')
console.log('log', `Loading the total of ${cmdFiles.length} commands...`)

cmdFiles.forEach(f => {
    try {
      const props = require(`./commands/${f}`)
      if (f.split('.').slice(-1)[0] !== 'js') return
  
      console.log('log', `Loading command: ${props.help.name}`)
  
      if (props.init) props.init(client)
  
      client.commands.set(props.help.name, props)
      if (props.help.aliases) {
        props.alias = true
        props.help.aliases.forEach(alias => client.commands.set(alias, props))
      }
    } catch (e) {
      console.log(`Unable to execute command ${f}: ${e}`)
    }
  })
  
  const evtFiles = readdirSync('./events/')
  console.log('log', `Loading total ${evtFiles.length} events`)
  evtFiles.forEach(f => {
    const eventName = f.split('.')[0]
    const event = require(`./events/${f}`)
  
    client.on(eventName, event.bind(null, client))
  })
  
  client.login(process.env.AUTH_TOKEN)