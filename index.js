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
})

const saveScore = () => 
  fs.writeFileSync('./score.json', JSON.stringify(scores))


setInterval(() => saveScore(), 10 * 1000)

client.on("message", (message) => {
  if (typeof scores[message.guild.id] !== "number") scores[message.guild] = 0
  if (message.content.startsWith(`${prefix}help`)) {
    message.channel.send(`__Help__
    
    ${prefix}score - gets the current score
    ${prefix}add - adds one to the current score
    ${prefix}minus - removes one to the current score
    `
    )
  }

  if (message.content.startsWith(`${prefix}score`)) {
    message.channel.send(`Score is now ${score[message.guild.id]}`)
  }

  if (message.content.startsWith(`${prefix}add`)) {
    score[message.guild.id]=score[message.guild.id]+1
    message.channel.send(`Score is now ${score[message.guild.id]}`)
  }

  if (message.content.startsWith(`${prefix}minus`)) {
    score[message.guild.id]=score[message.guild.id]-1
    message.channel.send(`Score is now ${score[message.guild.id]}`)
  }
})

client.login(process.env.TOKEN)