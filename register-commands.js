require('dotenv').config();
const {REST, Routes, ApplicationCommandOptionType} =require('discord.js');


//LIST OF COMMANDS
const commands = [
    {
        name: 'ping',
        description: 'Checks Bot Ping',
    },
    {
        name: 'add',
        description: 'adds two numbers',
        options: [
            {
                name:'first-number',
                description: 'The first number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name:'second-number',
                description: 'The second number.',
                type: ApplicationCommandOptionType.Number, 
                required: true,
            }
        ],
    },
    {
        name: 'confess',
        description: 'Confess your feelings/thoughts ',
        options : [
            {
                name : 'confess-now',
                description: 'type-here',
                type : ApplicationCommandOptionType.String,
                required : true,
            },
        ],
        
    },
    {
        name: 'confess-with-picture',
        description: 'Confess your feelings/thoughts ',
        options : [
            {
                name : 'confess-now-text',
                description: 'type-here',
                type : ApplicationCommandOptionType.String,
                required : true,
            },
            {
                name : 'confess-now-with-picture',
                description: 'confess-with-picture',
                type : ApplicationCommandOptionType.Attachment,
                required : true,
            }

        ],
    },
];

//COMMAND REGISTRATIONS
const rest = new REST ({ version : '10'}).setToken(process.env.BOT_TOKEN);

(async () =>{
    try {
        console.log('Registering slash commands ...')

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands}
        );
        console.log('Slash commands were registered succesfully!')
    } catch(error) {
        console.log(`There was an error: ${error}`)
    }
})();