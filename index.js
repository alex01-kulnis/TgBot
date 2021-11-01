const TelegramApi = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('./options');
const token = '2083941207:AAH_Z3xGCLkRbWsRJYjysuIK6VLoPJGUS0M';

const bot = new TelegramApi(token, {polling: true});

const chats = {

};

const startGame = async (chatId) => {
  await bot.sendMessage(chatId,'Cейчас я загадаю цифру от 0 до 9');
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
};

const start = () => {
  bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/info', description: 'Получить информацию о пользователе'},
    {command: '/game', description: 'Игра угадай цифру'}
]);

  bot.on('message',async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === '/start') {
      await bot.sendSticker(chatId,'https://tlgrm.ru/_/stickers/14d/5af/14d5afd7-6c55-328b-b26b-a8d72beb5530/4.webp');
      return bot.sendMessage(chatId,'Добро пожаловать в чат гулей');
    }

    if (text === '/info') {
      return bot.sendMessage(chatId,`Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
    }

    if (text === '/game') {
      return startGame(chatId);
    }

    return bot.sendMessage(chatId,'Я тебя не понимаю чел'),bot.sendSticker(chatId,'https://cdn.tlgrm.app/stickers/e95/fe7/e95fe707-7d33-3cab-b30f-9d7ced1362eb/192/1.webp');
  });

  bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === '/again') {
      return startGame(chatId);
    }

    if (data === chats[chatId]) {
      return bot.sendMessage(chatId,`Класс, ты гений. Это цифра ${chats[chatId]}`, againOptions);
    } else {
      return bot.sendMessage(chatId,`Чел , ты не угадал. Это цифра ${chats[chatId]}`, againOptions);
    }
  })
};

start();
