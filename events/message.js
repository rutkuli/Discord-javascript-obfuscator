const Config = require('../config.json');

module.exports = (client, message) => {
  
  let prefix = Config.prefix;
  let msg = message.content.split(/\s+/g);
  let args = msg.slice(1);
  let command = msg[0];
  let cmd = client.commands.get(command.slice(prefix.length)) || client.commands.get(client.aliases.get(command.slice(prefix.length)));
  if (message.author.bot) return;
  if (!command.startsWith(prefix)) return;
  if (message.channel.type == "dm") return;
  if (cmd) {
    cmd.run(client, message, args);
    }
}
