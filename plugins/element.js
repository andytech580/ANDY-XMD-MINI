import axios from 'axios';
export default {
  command: 'element',
  category: 'search',

  run: async (client, m, args, command) => {
        const query = args?.join(' ')?.trim();
        if (!query) {
             await client.sendMessage(m.chat, { text: '*Provide element name or symbol.*\nExample: .element H' }, { quoted: m });
        }
        try {
            const { data: json } = await axios.get(`https://api.popcat.xyz/periodic-table?element=${encodeURIComponent(query)}`);
            if (!json?.name) {
                await client.sendMessage(m.chat, { text: '❌ Element not found.' }, { quoted: m });
            }
            const text = `🧪 *Element Info*\n` +
                `• Name: ${json.name}\n` +
                `• Symbol: ${json.symbol}\n` +
                `• Atomic #: ${json.atomic_number}\n` +
                `• Atomic Mass: ${json.atomic_mass}\n` +
                `• Period: ${json.period}\n` +
                `• Phase: ${json.phase}\n` +
                `• Discovered By: ${json.discovered_by || 'Unknown'}\n\n` +
                `📘 Summary:\n${json.summary}`;
            await client.sendMessage(m.chat, { image: { url: json.image }, caption: text }, { quoted: m });
        }
        catch (error) {
            console.error('Element plugin error:', error);
            await client.sendMessage(m.chat, { text: '❌ Failed to fetch element info.' }, { quoted: m });
        }
    }
};
