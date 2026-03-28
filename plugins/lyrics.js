import fetch from 'node-fetch';

export default {
  command: 'lyrics',
  category: 'search',

  run: async (client, m, args, command) => {
    const songTitle = args.join(' ').trim();

    if (!songTitle) {
      await client.sendMessage(m.chat, {
        text: '*Please enter the song name to get the lyrics!*\nUsage: `.lyrics <song name>`',
        quoted: m
      });
      return;
    }
    try {
      const apiUrl = `https://discardapi.dpdns.org/api/music/lyrics?apikey=qasim&song=${encodeURIComponent(songTitle)}`;
      const res = await fetch(apiUrl);
      if (!res.ok) throw `API request failed with status ${res.status}`;
      const data = await res.json();
      const messageData = data?.result?.message;
      if (!messageData?.lyrics) {
        await client.sendMessage(m.chat, {
          text: `❌ Sorry, I couldn't find any lyrics for "${songTitle}".`,
          quoted: m
        });
        return;
      }

      const { artist, lyrics, image, title, url } = messageData;
      const maxChars = 4096;
      const lyricsOutput = lyrics.length > maxChars ? lyrics.slice(0, maxChars - 3) + '...' : lyrics;

      const caption = `
🎵 *${title}*
👤 *Artist:* ${artist}
🔗 *URL:* ${url}

📝 *Lyrics:*
${lyricsOutput}
      `.trim();
      if (image) {
        await client.sendMessage(m.chat, {
          image: { url: image },
          caption: caption,
          quoted: m
        });
      } else {
        await client.sendMessage(m.chat, {
          text: caption,
          quoted: m
        });
      }
    } catch (error) {
      console.error('Lyrics Command Error:', error);
      await client.sendMessage(m.chat, {
        text: `❌ An error occurred while fetching the lyrics for "${songTitle}".`,
        quoted: m
      });
    }
  }
};

