const { Client, GatewayIntentBits } = require("discord.js");
const token = process.env.THREAD_CREATOR_DISCORD_TOKEN;

const monitoredChannels = [
	"videos",
	"ai-news"
];

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.once("ready", () => {
	console.log("Thread Creator is ready to rumble...");
	client.user.setActivity("with threads", { type: "PLAYING" });
});

client.on("messageCreate", async (message) => {
	if (message.author.bot) return;

	let channelName = client.channels.cache.get(message.channelId).name;
	if (!monitoredChannels.includes(channelName)) return;

	try {
		// check if message is not a link
		if (
			!message.content.match(
				/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
			)
		) {
			// delete the message
			await message.delete();
			// respond with a warning
			let msg = await message.channel.send(
				`${message.author} You can only send links here!`
			);
			// delete message after 5 seconds
			setTimeout(() => {
				msg.delete();
			}, 5000);
			return;
		}
		let thread_name = message.author.username + "'s video: discussion";
		await message.startThread({
			name: thread_name,
			type: "GUILD_PUBLIC_THREAD",
			autoArchiveDuration: 60,
		});
	} catch (error) {
		console.error(error);
	}
});

client.login(token);
