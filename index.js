const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Create a collection to store commands
client.commands = new Collection();

// Load commands dynamically from the `commands` folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Handle interaction events
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// Login and ready event
client.once(Events.ClientReady, () => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);
