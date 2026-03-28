import axios from 'axios';
export default {
  command: 'define',
  category: 'ai',
  run: async (client, m, args, command) => {

        const query = args?.join(' ')?.trim();
        if (!query) {
            await client.sendMessage(m.chat, { text: '*Please provide a word to search for.*\nExample: .define hello' }, { quoted: m });
        }
        try {
            const url = `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(query)}`;
            const { data: json } = await axios.get(url);
            if (!json?.list || json.list.length === 0) {
                 await client.sendMessage(m.chat, { text: '❌ Word not found in the dictionary.' }, { quoted: m });
            }
            const firstEntry = json.list[0];
            const definition = firstEntry.definition || 'No definition available';
            const example = firstEntry.example ? `*Example:* ${firstEntry.example}` : '';
            const text = `🔍 *Dictionary*\n\n*Word:* ${query}\n*Definition:* ${definition}\n${example}`;
            await clutch.sendMessage(m.chat, { text }, { quoted: message });
        }
        catch (error) {
            console.error('Urban plugin error:', error);
            await client.sendMessage(m.chat, { text: '❌ Failed to fetch definition.', }, { quoted: m });
        }
    }
};
