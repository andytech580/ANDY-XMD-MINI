import axios from 'axios';

export default {
  command: 'tweetdl',
  category: 'downloader',
  run: async (client, m, args, command) => {

    const url = args?.[0];

    if (!url) {
      await client.sendMessage(m.chat, { text: 'Please provide a Twitter/X URL.\nExample: .twitter https://x.com/i/status/2002054360428167305' }, { quoted: m });
    }

    try {
      const apiUrl = `https://discardapi.dpdns.org/api/dl/twitter?apikey=guru&url=${encodeURIComponent(url)}`;
      const { data } = await axios.get(apiUrl, { timeout: 10000 });

      if (!data?.status || !data.result?.media?.length) {
        await client.sendMessage(m.chat, { text: '❌ No media found for this Tweet.' }, { quoted: m });
      }

      const tweet = data.result;
      const caption = `
📝 @${tweet.authorUsername} (${tweet.authorName})
📅 ${tweet.date}
❤️ Likes: ${tweet.likes} | 🔁 Retweets: ${tweet.retweets} | 💬 Replies: ${tweet.replies}

💬 ${tweet.text}
      `.trim();

      for (let mediaItem of tweet.media) {
        if (mediaItem.type === 'video') {
          await client.sendMessage(m.chat, { video: { url: mediaItem.url }, caption: caption }, { quoted: m });
        } else if (mediaItem.type === 'image') {
          await client.sendMessage(m.chat, { image: { url: mediaItem.url }, caption: caption }, { quoted: m });
        }
      }

    } catch (error) {
      console.error('Twitter plugin error:', error);

      if (error.code === 'ECONNABORTED') {
        await client.sendMessage(m.chat, { text: '❌ Request timed out. The API may be slow or unreachable.' }, { quoted: m });
      } else {
        await client.sendMessage(m.chat, { text: '❌ Failed to fetch Twitter/X media.' }, { quoted: m });
      }
    }
  }
};