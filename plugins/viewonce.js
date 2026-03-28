import { downloadContentFromMessage } from '@whiskeysockets/baileys';

export default {
  command: ['vv', 'viewonce'],
  category: 'downloads',

  run: async (client, m, args, command) => {
    try {
      let quoted = m.quoted ? m.quoted : m;

      // 🔥 STEP 1: unwrap view-once container
      let msg = quoted.message || quoted;

      if (msg?.viewOnceMessageV2) {
        msg = msg.viewOnceMessageV2.message;
      } else if (msg?.viewOnceMessage) {
        msg = msg.viewOnceMessage.message;
      }

      const image = msg?.imageMessage;
      const video = msg?.videoMessage;

      if (!image && !video) {
        return await client.sendMessage(m.chat, {
          text: '*Reply to a view-once image or video.*'
        }, { quoted: m });
      }

      // 🔥 STEP 2: download media
      const type = image ? 'image' : 'video';
      const mediaMsg = image || video;

      const stream = await downloadContentFromMessage(mediaMsg, type);

      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }

      // 🔥 STEP 3: resend media
      if (image) {
        await client.sendMessage(m.chat, {
          image: buffer,
          caption: mediaMsg.caption || ''
        }, { quoted: m });
      } else if (video) {
        await client.sendMessage(m.chat, {
          video: buffer,
          mimetype: 'video/mp4',
          caption: mediaMsg.caption || ''
        }, { quoted: m });
      }

    } catch (error) {
      console.error('Error in viewonceCommand:', error);

      await client.sendMessage(m.chat, {
        text: '❌ Failed to retrieve the view-once media.'
      }, { quoted: m });
    }
  }
};