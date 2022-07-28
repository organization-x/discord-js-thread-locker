const { Client, GatewayIntentBits } = require('discord.js');
const token = process.env.THREAD_CREATOR_DISCORD_TOKEN;

const monitoredChannels = [
	'videos'
];

const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	] 
});

client.once('ready', () => {
	console.log('Thread Creator is ready to rumble...');
});

client.on('messageCreate', async (message) => {
	let channelName = client.channels.cache.get(message.channelId).name;
	
	if(!monitoredChannels.includes(channelName))
		return;

	await message.startThread({
		name: message.content,
		type: 'GUILD_PUBLIC_THREAD',
		autoArchiveDuration: 120
	});
});

client.login(token);
