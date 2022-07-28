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

	try{
		await message.startThread({
			name: message.content,
			type: 'GUILD_PUBLIC_THREAD',
			autoArchiveDuration: 60
		});
	}
	catch(error){
		console.error(error);
	}
	
});

client.login(token);
