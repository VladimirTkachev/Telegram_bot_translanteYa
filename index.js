import TelegramBot from 'node-telegram-bot-api';
import config from 'config';


const request = require('request');
const token = 'Токен (api) Телеграм-бота';
const bot = new TelegramBot(token, {polling: true});


bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const _messageText = msg.text;
    const key = 'api-ключ Яндекс переводчика';
    const api = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
    let url = api + '?';
        url+= 'key=' + key;
        url+= '&text=' + _messageText;
        url+= '&lang=en-ru';
    request( url, function (error, response, body) {
        if ( !error && response.statusCode === 200) {
            const data = JSON.parse(body);
            bot.sendMessage(chatId, (` ${data.text} `));  

        }
    })
    
  });

