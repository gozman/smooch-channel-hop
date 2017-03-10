'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! I\'m Smooch\'s Channel Bot 😎')
                .then(() => bot.say('I\'ll show you how Smooch makes it possible to move conversations across messaging channels so that you can save 💸 on your SMS bill while delivering better, more engaging experiences to your users using the latest messaging apps 🔥'))
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Great! I'll call you ${name} - In order to prove that I remember who you are once I invite you to join me on another channel, tell me a secret... I promise I won't tell anyone else!`))
                .then(() => 'promptMerge');
        }
    },

    promptMerge: {
      receive: (bot, message) => {
        const secret = message.text;
        return bot.setProp('secret', secret)
            .then(() => bot.linkToMessenger("Your secret is safe with me (for now...) 👀 Let's continue this conversation on Messenger:", process.env.FB_PAGE_ID))
            .then(() => 'waitMerge');
        }
    },

    mergeSuccess: {
      prompt: (bot) => bot.say('Woohoo it worked! Are you still there? %[Yes](reply:Yes)'),
      receive: (bot, message) => {
        return bot.getProp('name')
            .then((name) => bot.say(`Well ${name}, as you can see I haven't forgotten about you and your secret... 😈`))
            .then(() => 'tellSecret')
            .then(() => bot.getProp('secret'))
            .then((secret) => bot.say(`You told me that your secret is: "${secret}"`))
            .then(() => bot.say('![](http://i.giphy.com/l0HlujEDdIqEoicGQ.gif)'))
            .then(() => bot.say("I don't have anything more to say right now, but I hope you liked playing with me!"))
            .then(() => "finish");
        }
    },

    waitMerge: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.linkToMessenger(`Sorry ${name}, I don't want to talk to you here anymore. Join me on messenger.`, process.env.FB_PAGE_ID))
                .then(() => 'waitMerge');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, nothing more to see here`))
                .then(() => 'finish');
        }
    }
});
