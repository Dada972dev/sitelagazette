const DISCORD_BOT_TOKEN = 'YOUR_DISCORD_BOT_TOKEN'; // Replace with your actual bot token
const CHANNEL_ID = 'YOUR_DISCORD_CHANNEL_ID'; // Replace with the actual channel ID

async function fetchDiscordMessages() {
    try {
        const response = await fetch(`https://discord.com/api/v9/channels/${CHANNEL_ID}/messages`, {
            headers: {
                'Authorization': `Bot ${DISCORD_BOT_TOKEN}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Discord messages:', error);
        return [];
    }
}

function displayDiscordMessages(messages) {
    const discordList = document.getElementById('discord-list');
    discordList.innerHTML = ''; // Clear any existing content
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('discord-message');
        messageElement.innerHTML = `
            <p><strong>${message.author.username}:</strong> ${message.content}</p>
        `;
        discordList.appendChild(messageElement);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const messages = await fetchDiscordMessages();
    displayDiscordMessages(messages);
});