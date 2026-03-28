import axios from 'axios';

export default {
  command: 'ttstalk',
  category: 'stalk',
  run: async (client, m, args, command) => {
  const text = args.join(' ')
    if (!text) {
      return await client.sendMessage(m.chat, {
        text: '*Please provide a TikTok username.*\nExample: .ttstalk truepakistanofficial'
      }, { quoted: m });
    }

    const username = text;

    try {
      const { data } = await axios.get('https://discardapi.dpdns.org/api/stalk/tiktok', {
        params: { apikey: 'guru', username: username }
      });

      if (!data?.result?.user) {
        return await client.sendMessage(m.chat, { text: '❌ TikTok user not found.' }, { quoted: m });
      }

      const user = data.result.user;
      const stats = data.result.statsV2 || data.result.stats;
      const profileImage = user.avatarLarger || user.avatarMedium || user.avatarThumb;
      const verifiedMark = user.verified ? '✅ Verified' : '';

      const caption = `🎵 *TikTok Profile Info*\n\n` +
                      `👤 Nickname: ${user.nickname || 'N/A'} ${verifiedMark}\n` +
                      `🆔 Username: @${user.uniqueId || 'N/A'}\n` +
                      `📝 Bio: ${user.signature || 'N/A'}\n` +
                      `🔒 Private Account: ${user.privateAccount ? 'Yes' : 'No'}\n\n` +
                      `👥 Followers: ${stats?.followerCount || 0}\n` +
                      `➡ Following: ${stats?.followingCount || 0}\n` +
                      `❤️ Likes: ${stats?.heartCount || 0}\n` +
                      `🎥 Videos: ${stats?.videoCount || 0}\n\n` +
                      `🔗 Profile URL: https://www.tiktok.com/@${user.uniqueId}`;

      if (profileImage) {
        await client.sendMessage(m.chat, { image: { url: profileImage }, caption: caption }, { quoted: m });
      } else {
        await client.sendMessage(m.chat, { text: caption }, { quoted: m });
      }

    } catch (err) {
      console.error('TikTok plugin error:', err);
      await client.sendMessage(m.chat, { text: '❌ Failed to fetch TikTok profile.' }, { quoted: m });
    }
  }
};
