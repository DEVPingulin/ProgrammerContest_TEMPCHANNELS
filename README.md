# TEMPCHANNEL BOT

This one was programmed for a Programer contest and probably continued again. I put a lot of effort into this bot and had to find out something I don't know yet.

# Here are some more infos!

Help command: -help
How long does it take to delete a temp channel?: 6 hours

You can change the prefix in config.json under "prefix".

# How do I start the bot?

First you need to install a Node.JS version on https://nodejs.org/en/

Now you have to create an application at https://discordapp.com/developers and then create a bot in the application. Now copy the bot tokens and paste them into the config.json under "token".

Now copy your User-ID and paste it into the config.json under "ownerID".

EXAMPLE:

"token": "YOUR_TOKEN"

"ownerID": "YOUR_ID"

Now you add your bot to your server, that you can do under your application at 0Auth2 and select Bot there and copy the link. Please replace the 0 in your link, next to "permissions=" to an 8!

EXAMPLE:

https://discordapp.com/api/oauth2/authorize?client_id=BOT_ID&permissions=0&scope=bot --> https://discordapp.com/api/oauth2/authorize?client_id=BOT_ID&permissions=8&scope=bot

---

Now everything should work and you can start the bot by executing "start.bat".
I hope you have Windows, because I don't know what such a file is called in Linux, but if you have Linux, you have to execute the command: node main.js in the folder!

---
The translations were written by a translator, so the translations are not 100% correct!
