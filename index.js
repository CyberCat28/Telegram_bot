const TelegramApi = require('node-telegram-bot-api');
const token = '6783117239:AAFv_WHUyQvPpzXvjJclepSXElsNiXrSMxA';
const bot = new TelegramApi(token, { polling: true })

const gameButton = {
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text: 'Перебросить куб', callback_data: 'game'}],
            [{text: 'Выйти из игры', callback_data: 'return'}],
        ]
    })
}

bot.setMyCommands([
    {command: '/start', description:"Первая команда"},
    {command: '/game', description:"Подбросить кубик"},
])

bot.on('message', msg => {
    const chatId = msg.chat.id;
    const text = msg.text;
    if (text === '/start') {
       if (msg.chat.last_name == '') bot.sendMessage(chatId, `Привет, ${msg.chat.first_name}, я бот созданный богом`);
       else bot.sendMessage(chatId, `Привет, ${msg.chat.first_name} ${msg.chat.last_name}, я бот созданный богом`);
    }
    if (text === '/game'){
        let random = Math.floor( Math.random() * 10 );
        const isRandom = () => {
            if (random > 6 || random == 0){
                isRandom();
            }
        }
        isRandom()
        console.log(random)
        bot.sendMessage(chatId, `Результат подбрасывания: ${random}`);
    }
    console.log(msg);
})
