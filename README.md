# discord-keyword-purge

Discord tool enabling mods to easily clean up their servers.

## Install dependancies:
You will also need to set environmental variables for `DISCORD_BOT_TOKEN` and `DISCORD_USER_ID`
```Javascript
npm install
```

## Commands:

### -clean *(Takes a long time for large chat logs)*
* Recommended to use on one channel at a time due to how much it uses discords api
* Requires keywords after command
* Keywords are used to create a RegExp which is used to check messages

*Example:*
`-clean shit fuck cunt`

### -autowash *(This is accessed through the bot and not designed for human use)*
* This requires you to manually fetch the JSON response from the below endpoint
`GET https://discord.com/api/v8/guilds/<GUILD ID>/messages/search?content=<ENTER KEYWORDS>`

As seen below, you'll need to search in the desired server, then find the request in the networks tab of chrome dev tools. Once you have found it, you can then copy the JSON response and paste it inside `./delete.json`. Lastly, you'll then need to remove the comments on the labeled code inside `./index.js`. Then you're good to start up the bot. 

![Manual JSON response fetch](https://cdn.discordapp.com/attachments/727190378742022276/824231774913429565/unknown.png)
