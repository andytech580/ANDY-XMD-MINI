import axios from 'axios';
export default {
  command: ['quote', 'rizz'],
  category: 'fun',

  run: async (client, m, args, command) => {
      
        try {
            const res = await axios.get('https://discardapi.dpdns.org/api/quotes/random?apikey=guru');
            if (!res.data || res.data.status !== true) {
                return await client.sendMessage(m.chat, { text: '❌ Failed to fetch quote.' }, { quoted: m });
            }
            const quote = res.data.result?.quote || 'No quote found.';
            const _creator = res.data.creator || 'Unknown';
            const replyText = `💬 *Random Quote*\n\n${quote}`;
            await client.sendMessage(m.chat, { text: replyText }, { quoted: m });
        }
        catch (err) {
            console.error('Quote plugin error:', err);
            await client.sendMessage(m.chat, { text: '❌ Error while fetching quote.' }, { quoted: m });
        }
    }
};