// Require the necessary discord.js classes
const { REST, SlashCommandBuilder, Routes, Client, GatewayIntentBits, embedLength } = require('discord.js');
const { clientId, guildId, token1, token2 } = require('./config.json');
const Discord = require('discord.js')
const express = require('express');
const app = express();

const port = 8080;

function genPort() {
cosole.log('genPort() is not operational rn')
}

app.listen(port);
console.log('app launched at port 8080!');
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, 'GuildMessages', 'Guilds'] });
const prefix = '>'


const embed = new Discord.EmbedBuilder()
embed.setColor('#2ab8a0')
embed.setDescription('nyaa~') 
// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
  client.guilds.cache.forEach(g => {
    console.log(g.memberCount)
  })
});


const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
  new SlashCommandBuilder().setName('clear').setDescription('Clears chat history')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token1 + token2);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);


//complete the other comands from the command list later...!!!
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply(`Pong! This message had a latency of ${Date.now() - interaction.createdTimestamp}ms.`)
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	} else if(commandName === 'clear') {
		interaction.channel.messages.cache.clear()
		await interaction.reply('function clear() currently doesnt work maybe try smt else like ping?')
  }
  
});


client.on('messageCreate', function(message) {
   if(message.author.bot) return;
   if(message.content.length > 0) {
	console.log('message was empty...');
	console.log(message.content)
	console.log(message.attachments.size)


	if(message.attachments.size >= 0) {
        message.attachments.forEach(attachment => {
            const uwuchannel = client.channels.cache.find(channel => channel.name === 'album-2')
            embed.setImage(attachment.proxyURL)
            embed.setFooter({iconURL: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`, text: message.author.tag})
            // const ImageLink = attachment.proxyURL;
            uwuchannel.send({embeds: [embed]}) 
        });
    }


	return;
   };
   if(!message.content.startsWith(prefix)) return;

   const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
   const command = args.shift().toLowerCase();

   if(command == 'test') {
	message.reply('testing 1... 2... 3!')
   }
})


// Login to Discord with your client's token
client.login(token1 + token2);
