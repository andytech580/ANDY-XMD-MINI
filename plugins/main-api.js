import fetch from 'node-fetch';

export default {
  command: ['apistatus', 'api', 'apistate'],
  category: 'info',

  run: async (client, m) => {
    try {
      const msg = await client.sendMessage(m.chat, {
        text: '🔮 *𝑨𝑵𝑫𝒀-𝑿𝑴𝑫 𝑴𝑰𝑵𝑰* \n> Checking API status...'
      }, { quoted: m });

      const response = await fetch(`${api.url}/api/status`);
      const data = await response.json();

      if (!data || !data.result) {
        return client.sendMessage(m.chat, {
          text: '🥀 *Oops,* \n> I couldn\'t get the API status.',
          edit: msg.key
        });
      }

      const result = data.result;

      const status = result.status || "Unknown";
      const totalrequest = result.totalrequest || "0";
      const totalfitur = result.totalfitur || "0";
      const runtime = result.runtime || "0s";
      const domain = result.domain || "Unknown";
      const creator = data.creator || "Unknown";

      const text = `✨ ── 𝑨𝑵𝑫𝒀-𝑿𝑴𝑫 𝑴𝑰𝑵𝑰── ✨

🌐 *API Status*

• 📡 *Status:* ${status}
• 📊 *Total Requests:* ${totalrequest}
• 🧩 *Total Features:* ${totalfitur}
• ⏱️ *Runtime:* ${runtime}
• 🏰 *Domain:* ${domain}

> 💎 *Information retrieved successfully.*`;

      await client.sendMessage(m.chat, {
        text,
        edit: msg.key
      });

    } catch (err) {
      console.error(err);

      await client.sendMessage(m.chat, {
        text: '🥀 *𝑨𝑵𝑫𝒀-𝑿𝑴𝑫 𝑴𝑰𝑵𝑰:* \n> An unexpected error occurred while checking the API.',
        quoted: m
      });
    }
  }
};