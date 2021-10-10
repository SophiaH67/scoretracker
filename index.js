const Discord = require('discord.js')
const client = new Discord.Client()

const fs = require('fs')

const prefix = process.env.PREFIX || "~"

let scores = {};

try {
  scores = JSON.parse(fs.readFileSync('./score.json').toString())
} catch {
  console.log('File doesn\'t exist')
}
client.on("ready", () => {
  console.log("I am ready!")
  setInterval(() => 
  client.user.setActivity({
    name: `${prefix}help for ${client.guilds.cache.size} servers`,
    type: "PLAYING"
  }), 30 * 1000)
})

const saveScore = () => 
  fs.writeFileSync('./score.json', JSON.stringify(scores))


setInterval(() => saveScore(), 10 * 1000)

client.on("message", (message) => {
  if (!message.guild) return
  if (typeof scores[message.guild.id] !== "number") scores[message.guild.id] = 0
  if (message.content.startsWith(`${prefix}help`)) {
    message.channel.send(`__Help__
    
    ${prefix}score - gets the current score
    ${prefix}add - adds one to the current score
    ${prefix}minus - removes one to the current score
    `
    ).catch(console.log)
  }

  if (message.content.startsWith(`${prefix}score`)) {
    message.channel.send(`Score is now ${scores[message.guild.id]}`).catch(console.log)
  }

  if (message.content.startsWith(`${prefix}add`)) {
    scores[message.guild.id]=scores[message.guild.id]+1
    message.channel.send(`Score is now ${scores[message.guild.id]}`).catch(console.log)
  }

  if (message.content.startsWith(`${prefix}minus`)) {
    scores[message.guild.id]=scores[message.guild.id]-1
    message.channel.send(`Score is now ${scores[message.guild.id]}`).catch(console.log)
  }
})

process.on('unhandledRejection', console.log)
process.on('uncaughtException', console.log)

client.login(process.env.TOKEN)