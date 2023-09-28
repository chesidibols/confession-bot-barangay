require('dotenv').config();
const { Client, IntentsBitField, Partials, EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const client = new Client({ intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessageTyping,
    IntentsBitField.Flags.MessageContent,
    ],
    partials:[Partials.Channel]
});

client.on('ready' , () => {
    console.log(`Logged in! as ${client.user.username}`);
    client.user.setActivity(`Slash Command /confess`);
});

client.on('interactionCreate', async (interaction) =>{
    
    //No response if no SLASH COMMAND
    if(!interaction.isChatInputCommand()) return;
    //Cant do command on DM
    if(!interaction.guild) return await interaction.reply ({content:"Commands are only use in Server!"});
    
    //Checks connection
    if(interaction.commandName === 'ping'){
        await interaction.deferReply();
        await interaction.deleteReply();
    const m = await interaction.channel.send('Ping?');
    m.edit(`Pong ${m.createdTimestamp - interaction.createdTimestamp}ms`);
    };

    //CONFESS COMMAND TEXT ONLY
    if(interaction.commandName ==='confess'){
        //CLEARING BOT REPLY
        await interaction.deferReply();
        await interaction.deleteReply();

        //SENDS TO CONFESSION CHANNEL
        const ConfessChannel = interaction.guild.channels.cache.get('YOUR CHANNEL ID');
        const conf = interaction.options.get('confess-now').value;
        let reportEmbed = new EmbedBuilder()
                        .setColor("Random")
                        .setDescription(`${conf}`)

        await ConfessChannel.send({embeds :[reportEmbed]});
 
    }

    //CONFESS COMMAND TEXT AND PICTURE
    if(interaction.commandName ==='confess-with-picture'){
        //CLEARING BOT REPLY
        await interaction.deferReply();
        await interaction.deleteReply();

        //SENDS TO CONFESSION CHANNEL
        const ConfessChannel2 = interaction.guild.channels.cache.get('YOUR CHANNEL ID');
        const conf2 = interaction.options.get('confess-now-text').value;
        const confPic2 = interaction.options.getAttachment('confess-now-with-picture').url;
        let reportEmbed2 = new EmbedBuilder()
                        .setColor("Random")
                        .setDescription(`${conf2}`)
                        .setImage(`${confPic2}`)


        await ConfessChannel2.send({embeds :[reportEmbed2]});
    }
    
});
//CATCHING ERROR
(async() =>{
    try {

    }catch (error){
        console.log(`error occured ${error}`);
    }
})

// BOT TOKEN HERE
client.login(process.env.BOT_TOKEN);