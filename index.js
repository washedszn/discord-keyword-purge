require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
const del = require('./delete.json').messages;
// If using ./delete.json uncomment the below code
// let toDelete = {}
// del.flat().forEach(e => {
//     toDelete[`${e.channel_id}`] = [...(toDelete[e.channel_id] || []), e.id]
// })

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // If using ./delete.json uncomment the below code
    // Object.keys(toDelete).forEach(e => {
    //     let channel = client.channels.cache.find(channel => channel.id == e)
    //     channel.send('-autowash')
    // })
});

client.on('message', async (msg) => {
    if (msg.author.id != '800308877592887336' && msg.author.id != process.env.DISCORD_USER_ID) return;
    let cmd = msg.content.split(' ')[0]
    let content = msg.content.replace(/^-[a-z]+ /g, '');

    if (cmd == '-clean') {
        console.log('cleaning ' + msg.channel.name)
        if (!content) return msg.channel.send('Please provide keywords')
        let regex = new RegExp(content.split(' ').join('|'), 'gmi')
        let lastID;
        while (true) { // eslint-disable-line no-constant-condition
            const fetchedMessages = await msg.channel.messages.fetch({
                limit: 100,
                ...(lastID && { before: lastID }),
            });
            if (fetchedMessages.size === 0) {
                return console.log('cleaned ' + msg.channel.name)
            } else {
                console.log('Date : ' + new Date(fetchedMessages.first().createdTimestamp))
                fetchedMessages.forEach(e => {
                    if (e.content.match(regex)) {
                        console.log('deleted ' + e.content)
                        e.delete();
                    }
                })
            }
            lastID = fetchedMessages.lastKey();
        }
    }

    if (cmd == '-autowash') {
        msg.delete()
        for (let i = 0; i < toDelete[msg.channel.id].length; i++) {
            let e = toDelete[msg.channel.id][i]
            await msg.channel.messages.fetch(e).then(message => {
                message.delete()
                console.log('deleted message - ' + message.content)
            })
            await new Promise(r => setTimeout(r, 1000))
        }
        console.log('deleted all')
    }
})


client.login(process.env.DISCORD_BOT_TOKEN);