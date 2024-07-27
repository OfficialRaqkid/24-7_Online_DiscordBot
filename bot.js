// bot.js
require('dotenv').config(); // Load environment variables from .env file

const { Client, GatewayIntentBits, Events, ActivityType } = require('discord.js');
const express = require('express');
const app = express();
const port = 3000;

// Initialize the Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const token = process.env.TOKEN; // Retrieve token from environment variables

client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    // Change status every 10 seconds as an example
    setInterval(() => {
        const statuses = [
            { activity: 'MADE BY RAQKIDSS', type: ActivityType.Watching, status: 'online' },
            { activity: 'MADE BY RAQKIDSS', type: ActivityType.Listening, status: 'dnd' },
            { activity: 'MADE BY RAQKIDSS', type: ActivityType.Playing, status: 'idle' }
        ];
        
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        client.user.setPresence({
            activities: [{ name: randomStatus.activity, type: randomStatus.type }],
            status: randomStatus.status
        });
        
        console.log(`Status changed to ${randomStatus.status}`);
    }, 10000); // Change status every 10 seconds
});

client.login(token).catch(console.error);

// Set up the Express server
app.get('/', (req, res) => {
    res.send('Hello from Express and Discord Bot!');
});

// Start the Express server
app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`);
});