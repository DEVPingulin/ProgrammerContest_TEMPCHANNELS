const Discord = require('discord.js');
const { RichEmbed } = require('discord.js');
const config = require('./config.json');
const talkedRecently = new Set();

const client = new Discord.Client();

client.on('ready', () => {
    console.log('login..');
    client.user.setActivity(`the soucecode | ${config.prefix}help`, { type: "WATCHING" });
    client.user.setStatus('idle');
    console.log('ready!');
})

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "tempchannel" || command === "createchannel") {
        if(message.guild.channels.find("name", `(tb)temp-${message.author.id}`)) {
            const embed = new RichEmbed()
            .setTitle('ERROR <:error:572435859534512169>')
            .setDescription("Uhh.. a error..")
            .addField("REASON", "You have already a Temp-Channel!")
            .setColor('DARK_RED')
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
            return message.channel.send(embed);
        };
        if(message.guild.channels.find(c => c.name == "Temp-Channels" && c.type == "category")) {
            await message.guild.createChannel(`(tb)temp-${message.author.id}`, "voice");
            await message.guild.channels.find("name", `(tb)temp-${message.author.id}`).setParent(message.guild.channels.find(c => c.name == "Temp-Channels" && c.type == "category").id);
            await message.guild.channels.find("name", `(tb)temp-${message.author.id}`).overwritePermissions(message.guild.roles.find("name", "@everyone"), {
                VIEW_CHANNEL: false,
                CONNECT: false,
                SPEAK: false
            })
            await message.guild.channels.find("name", `(tb)temp-${message.author.id}`).overwritePermissions(message.author, {
                VIEW_CHANNEL: true,
                CONNECT: true,
                SPEAK: true,
                MUTE_MEMBERS: true,
                DEAFEN_MEMBERS: true,
                STREAM: true
            })
        } else {
            message.guild.createChannel("Temp-Channels", "category");
            await message.guild.createChannel(`(tb)temp-${message.author.id}`, "voice");
            await message.guild.channels.find("name", `(tb)temp-${message.author.id}`).setParent(message.guild.channels.find(c => c.name == "Temp-Channels" && c.type == "category").id);
            await message.guild.channels.find("name", `(tb)temp-${message.author.id}`).overwritePermissions(message.guild.roles.find("name", "@everyone"), {
                VIEW_CHANNEL: false,
                CONNECT: false,
                SPEAK: false
            })
            await message.guild.channels.find("name", `(tb)temp-${message.author.id}`).overwritePermissions(message.author, {
                VIEW_CHANNEL: true,
                CONNECT: true,
                SPEAK: true,
                MUTE_MEMBERS: true,
                DEAFEN_MEMBERS: true,
                STREAM: true
            })
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
            talkedRecently.delete(message.author.id);
            message.guild.channels.find("name", `(tb)temp-${message.author.id}`).delete();
        }, 21600000);
    }
    if(command === "help") {
        const embed = new RichEmbed()
        .setTitle('HELP-LIST <:clipboard:627942745327009793>')
        .setDescription(`This bot is in beta. please report bugs to <@388295828940259358>\n**Prefix**: \`${config.prefix}\``)
        .addField("COMMANDS", "```markdown\n1. " + config.prefix + "tempchannel/" + config.prefix + "createchannel | Create your own voicechannel!\n\n2. " + config.prefix + "channel {addperm/addpermission} {permission} {member} {true/false} | Give or deny a user permission.\n\n3. " + config.prefix + "channel delete | Delete your channel.```")
        .addField('INFO', "```markdown\n<!> Please do not write this down in the commands {}. It is in the HELP-LIST only for design.\n\n<!> A Tempchannel is deleted after 6 hours. In the future it will be done that you can set it yourself, how long a Tempchannel remains\n\n<!> The translation is not 100% correct!```")
        .setColor('BLUE')
        .setThumbnail(client.user.avatarURL)
        .setFooter(client.user.username, client.user.avatarURL)
        .setTimestamp();
        message.channel.send(embed);
    }
    if(command === "channel") {
        if(!message.guild.channels.find("name", `(tb)temp-${message.author.id}`)) {
            const dembed = new RichEmbed()
            .setTitle('ERROR <:error:572435859534512169>')
            .setDescription("Uhh.. a error..")
            .addField("REASON", "You don't have a Temp-Channel.")
            .setColor('DARK_RED')
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
            return message.channel.send(dembed);
        }
        if(args[0] === "addperm" || args[0] === "addpermission") {
            if(!args[3]) {
                const errembed = new RichEmbed()
                .setTitle('USAGE')
                .setDescription("Uhh.. a usage..")
                .addField("USAGE", `${config.prefix}channel addperm \`{connect/speak/mute_members/deafen_members/stream} {member} {true/false}\``)
                .addField("INFO", "```Markdown\n<!> Because the Discord.JS for the new permission STREAM has not yet been updated, the permission does not work for now.```")
                .setColor('GREEN')
                .setFooter(client.user.username, client.user.avatarURL)
                .setTimestamp();
                return message.channel.send(errembed);
            }
            if(args[1] === "connect" || args[1] === "CONNECT") {
                const user = message.mentions.users.first();
                const member = message.guild.member(user);
                if(user.bot) {
                    const bembed = new RichEmbed()
                    .setTitle('ERROR <:error:572435859534512169>')
                    .setDescription("Uhh.. a error..")
                    .addField("REASON", "The member is a bot.")
                    .setColor('DARK_RED')
                    .setFooter(client.user.username, client.user.avatarURL)
                    .setTimestamp();
                    return message.channel.send(bembed);
                };
                if(args[3] === "true") {
                    message.guild.channels.find("name", `(tb)temp-${message.author.id}`).overwritePermissions(member, {
                        VIEW_CHANNEL: true,
                        CONNECT: true
                      })
                      const fembed = new RichEmbed()
                      .setTitle('FINISH <:finish:572488672054607882>')
                      .setDescription(`You has gave \`${user.username}\` successful the permission \`CONNECT\``)
                      .setColor('GREEN')
                      .setFooter(client.user.username, client.user.avatarURL)
                      .setTimestamp();
                       message.channel.send(fembed)
                } else if(args[3] === "false") {
                    message.guild.channels.find("name", `(tb)temp-${message.author.id}`).overwritePermissions(member, {
                        VIEW_CHANNEL: false,
                        CONNECT: false
                      })
                      const delembed = new RichEmbed()
                      .setTitle('FINISH <:finish:572488672054607882>')
                      .setDescription(`You has deleted \`${user.username}\` successful the permission \`CONNECT\``)
                      .setColor('RED')
                      .setFooter(client.user.username, client.user.avatarURL)
                      .setTimestamp();
                       message.channel.send(delembed)
                }
            } else if(args[1] === "speak" || args[1] === "SPEAK") {
                const user = message.mentions.users.first();
                const member = message.guild.member(user);
                if(user.bot) {
                    const bembed = new RichEmbed()
                    .setTitle('ERROR <:error:572435859534512169>')
                    .setDescription("Uhh.. a error..")
                    .addField("REASON", "The member is a bot.")
                    .setColor('DARK_RED')
                    .setFooter(client.user.username, client.user.avatarURL)
                    .setTimestamp();
                    return message.channel.send(bembed);
                };
                if(args[3] === "true") {
                    message.guild.channels.find("name", `(tb)temp-${message.author.id}`).overwritePermissions(member, {
                        VIEW_CHANNEL: true,
                        SPEAK: true
                      })
                      const fembed = new RichEmbed()
                      .setTitle('FINISH <:finish:572488672054607882>')
                      .setDescription(`You has gave \`${user.username}\` successful the permission \`SPEAK\``)
                      .setColor('GREEN')
                      .setFooter(client.user.username, client.user.avatarURL)
                      .setTimestamp();
                       message.channel.send(fembed)
                } else if(args[3] === "false") {
                    message.guild.channels.find("name", `(tb)temp-${message.author.id}`).overwritePermissions(member, {
                        VIEW_CHANNEL: false,
                        SPEAK: false,
                      })
                      const delembed = new RichEmbed()
                      .setTitle('FINISH <:finish:572488672054607882>')
                      .setDescription(`You has deleted \`${user.username}\` successful the permission \`SPEAK\``)
                      .setColor('RED')
                      .setFooter(client.user.username, client.user.avatarURL)
                      .setTimestamp();
                       message.channel.send(delembed)
                }
            } else if(args[1] === "mute_members" || args[1] === "MUTE_MEMBERS") {
                const user = message.mentions.users.first();
                const member = message.guild.member(user);
                if(user.bot) {
                    const bembed = new RichEmbed()
                    .setTitle('ERROR <:error:572435859534512169>')
                    .setDescription("Uhh.. a error..")
                    .addField("REASON", "The member is a bot.")
                    .setColor('DARK_RED')
                    .setFooter(client.user.username, client.user.avatarURL)
                    .setTimestamp();
                    return message.channel.send(bembed);
                };
                if(args[3] === "true") {
                    message.guild.channels.find("name", `(tb)temp-${message.author.id}`).overwritePermissions(member, {
                        VIEW_CHANNEL: true,
                        MUTE_MEMBERS: true
                      })
                      const fembed = new RichEmbed()
                      .setTitle('FINISH <:finish:572488672054607882>')
                      .setDescription(`You has gave \`${user.username}\` successful the permission \`MUTE_MEMBERS\``)
                      .setColor('GREEN')
                      .setFooter(client.user.username, client.user.avatarURL)
                      .setTimestamp();
                       message.channel.send(fembed)
                } else if(args[3] === "false") {
                    message.guild.channels.find("name", `(tb)temp-${message.author.id}`).overwritePermissions(member, {
                        VIEW_CHANNEL: false,
                        MUTE_MEMBERS: false,
                      })
                      const delembed = new RichEmbed()
                      .setTitle('FINISH <:finish:572488672054607882>')
                      .setDescription(`You has deleted \`${user.username}\` successful the permission \`MUTE_MEMBERS\``)
                      .setColor('RED')
                      .setFooter(client.user.username, client.user.avatarURL)
                      .setTimestamp();
                       message.channel.send(delembed)
                }
            } else if(args[1] === "deafen_members" || args[1] === "DEAFEN_MEMBERS") {
                const user = message.mentions.users.first();
                const member = message.guild.member(user);
                if(user.bot) {
                    const bembed = new RichEmbed()
                    .setTitle('ERROR <:error:572435859534512169>')
                    .setDescription("Uhh.. a error..")
                    .addField("REASON", "The member is a bot.")
                    .setColor('DARK_RED')
                    .setFooter(client.user.username, client.user.avatarURL)
                    .setTimestamp();
                    return message.channel.send(bembed);
                };
                if(args[3] === "true") {
                    message.guild.channels.find("name", `(tb)temp-${message.author.id}`).overwritePermissions(member, {
                        VIEW_CHANNEL: true,
                        DEAFEN_MEMBERS: true
                      })
                      const fembed = new RichEmbed()
                      .setTitle('FINISH <:finish:572488672054607882>')
                      .setDescription(`You has gave \`${user.username}\` successful the permission \`DEAFEN_MEMBERS\``)
                      .setColor('GREEN')
                      .setFooter(client.user.username, client.user.avatarURL)
                      .setTimestamp();
                       message.channel.send(fembed)
                } else if(args[3] === "false") {
                    message.guild.channels.find("name", `(tb)temp-${message.author.id}`).overwritePermissions(member, {
                        VIEW_CHANNEL: false,
                        DEAFEN_MEMBERS: false,
                      })
                      const delembed = new RichEmbed()
                      .setTitle('FINISH <:finish:572488672054607882>')
                      .setDescription(`You has deleted \`${user.username}\` successful the permission \`DEAFEN_MEMBERS\``)
                      .setColor('RED')
                      .setFooter(client.user.username, client.user.avatarURL)
                      .setTimestamp();
                       message.channel.send(delembed)
                }
            } else if(args[1] === "stream" || args[1] === "STREAM") {
                const user = message.mentions.users.first();
                const member = message.guild.member(user);
                if(user.bot) {
                    const bembed = new RichEmbed()
                    .setTitle('ERROR <:error:572435859534512169>')
                    .setDescription("Uhh.. a error..")
                    .addField("REASON", "The member is a bot.")
                    .setColor('DARK_RED')
                    .setFooter(client.user.username, client.user.avatarURL)
                    .setTimestamp();
                    return message.channel.send(bembed);
                };
                if(args[3] === "true") {
                    message.guild.channels.find("name", `(tb)temp-${message.author.id}`).overwritePermissions(member, {
                        VIEW_CHANNEL: true,
                        STREAM: true
                      })
                      const fembed = new RichEmbed()
                      .setTitle('FINISH <:finish:572488672054607882>')
                      .setDescription(`You has gave \`${user.username}\` successful the permission \`STREAM\``)
                      .setColor('GREEN')
                      .setFooter(client.user.username, client.user.avatarURL)
                      .setTimestamp();
                       message.channel.send(fembed)
                } else if(args[3] === "false") {
                    message.guild.channels.find("name", `(tb)temp-${message.author.id}`).overwritePermissions(member, {
                        VIEW_CHANNEL: false,
                        STREAM: false,
                   })
                   const delembed = new RichEmbed()
                   .setTitle('FINISH <:finish:572488672054607882>')
                   .setDescription(`You has deleted \`${user.username}\` successful the permission \`STREAM\``)
                   .setColor('RED')
                   .setFooter(client.user.username, client.user.avatarURL)
                   .setTimestamp();
                    message.channel.send(delembed)
                }
            }
        } else if(args[0] === "delete") {
            if(args[1] === "confirm") {
                message.guild.channels.find("name", `(tb)temp-${message.author.id}`).delete();
                const cembed = new RichEmbed()
                .setTitle('FINISH <:finish:572488672054607882> ')
                .setDescription("Your channel has been deleted!")
                .setColor('GREEN')
                .setFooter(client.user.username, client.user.avatarURL)
                .setTimestamp();
                message.channel.send(cembed);
            } else {
                const sembed = new RichEmbed()
                .setTitle('Sure? <:warning:627450138796883978> ')
                .setDescription("Are you sure?")
                .addField("USAGE", `${config.prefix}channel \`delete confirm\``)
                .setColor('ORANGE')
                .setFooter(client.user.username, client.user.avatarURL)
                .setTimestamp();
                message.channel.send(sembed)
            }
        } else {
            const ceembed = new RichEmbed()
            .setTitle('HELP-LIST <:clipboard:627942745327009793>')
            .setDescription("Yeah, commands! c:")
            .addField("COMMANDS",  "```Markdown\n1. " + config.prefix + "channel {addperm/addpermission} {permission} {member} {true/false}\n\n2. " + config.prefix + "channel delete\n```")
            .setColor('#00BFFF')
            .setTimestamp();
            message.channel.send(ceembed);
        }
    }
})  

client.login(config.token)