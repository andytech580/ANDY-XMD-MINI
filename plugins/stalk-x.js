import axios from 'axios';

export default {
  command: 'xstalk',
  category: 'stalk',
  run: async (client, m, args, command) => {
const text = args.join(' ')
  
    if (!text) {
      return await client.sendMessage(m.chat, {
        text: '*Please provide a Twitter username.*\nExample: .xstalk HarmeetSinghPk'
      }, { quoted: m });
    }

    const username = text

    try {
      const { data } = await axios.get(`https://discardapi.dpdns.org/api/stalk/twitter`, {
        params: { apikey: 'guru', username: username }
      });

      if (!data?.result) {
        return await client.sendMessage(m.chat, { text: '❌ Twitter user not found.' }, { quoted: m });
      }

      const result = data.result;
      const profileImage = result.profile?.image || null;
      const bannerImage = result.profile?.banner || null;
      const verifiedMark = result.verified ? '✅ Verified' : '';

      const caption = `🐦 *Twitter Profile Info*\n\n` +
                      `👤 Name: ${result.name || 'N/A'} ${verifiedMark}\n` +
                      `🆔 Username: @${result.username || 'N/A'}\n` +
                      `📝 Bio: ${result.description || 'N/A'}\n` +
                      `📍 Location: ${result.location || 'N/A'}\n` +
                      `📅 Joined: ${new Date(result.created_at).toDateString()}\n\n` +
                      `👥 Followers: ${result.stats?.followers || 0}\n` +
                      `➡ Following: ${result.stats?.following || 0}\n` +
                      `❤️ Likes: ${result.stats?.likes || 0}\n` +
                      `🖼 Media: ${result.stats?.media || 0}\n` +
                      `🐦 Tweets: ${result.stats?.tweets || 0}\n` +
                      `🔗 Profile URL: https://twitter.com/${result.username}`;

      if (profileImage) {
        await client.sendMessage(m.chat, { image: { url: profileImage }, caption: caption }, { quoted: m });
      } else {
        await client.sendMessage(m.chat, { text: caption }, { quoted: m });
      }

      if (bannerImage) {
        await client.sendMessage(m.chat, { image: { url: bannerImage }, caption: `📌 Banner of @${username}` });
      }

    } catch (err) {
      console.error('Twitter plugin error:', err);
      await client.sendMessage(m.chat, { text: '❌ Failed to fetch Twitter profile.' }, { quoted: m });
    }
  }
};
