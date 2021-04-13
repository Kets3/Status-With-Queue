const Discord = require('discord.js')
const client = new Discord.Client()
const axios = require('axios')
const ketse = require('./config.json')

client.on("ready", () =>{
    console.log(`${client.user.tag} is online `)
})


client.on("message", async message =>{
    if(message.author.bot) return;
      if (message.content === '!status'){
        try {
            const serverIP = `${ketse.ketse.ip}:${ketse.ketse.port}`
            const { data } = await axios.get(`http://${serverIP}/dynamic.json`);
            const regex = /\[([0-9]+)\]/;
            const queue = data.hostname.match(regex);
            if (queue) {
              return message.channel.send(new Discord.MessageEmbed()
              .setColor(ketse.color)
              .addFields(
                  {name: "**Players**", value: `${data.clients}/${data.sv_maxclients}`, inline: true},
                  {name: "**Queue**", value: `${queue[1]}`, inline: true}
              )
              .setThumbnail(ketse.thumbnailphoto));
            } else {
              return message.channel.send(new Discord.MessageEmbed()
              .setColor(ketse.color)
              .addFields(
                  {name: "**Players**", value: `${data.clients}/${data.sv_maxclients}`, inline: true},
                  {name: "**Queue**", value: `0`, inline: true}
              )
              .setThumbnail(ketse.thumbnailphoto)
              );
            }
          } catch (e) {
            console.log(e.message);
            message.channel.send(new Discord.MessageEmbed()
            .setColor(ketse.color)
            .addFields(
                {name: "**Fetching info From Server**", value: `**Fetching info From Server**`, inline:true}
            )
            .setThumbnail(ketse.thumbnailphoto));
          }
        


}})

client.login(ketse.token).catch(ketse =>{
    console.log(`You have not put token in `)
})