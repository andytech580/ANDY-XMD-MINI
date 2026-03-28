import yts from 'yt-search';
import { getBuffer } from '../lib/message.js';

export default {
  command: ['ytsearch', 'yts', 'search'],
  category: 'search',
  run: async (client, m, args) => {
    if (!args || !args[0]) {
      return m.reply('✨ *Usage:* Enter the video name you want to search for.')
    }

    try {
      const query = args.join(' ')
      await m.reply(`> 🔍 *Searching YouTube:* "${query}"...`)

      const search = await yts(query)
      const results = search.all.slice(0, 10) 
      if (!results.length) {
        return m.reply('❌ No results found.')
      }

      const mainThumb = await getBuffer(results[0].image || results[0].thumbnail)

      let message = `╔════════════════════╗\n`
      message += `║   🎬 *𝑨𝑵𝑫𝒀-𝑿𝑴𝑫 𝑴𝑰𝑵𝑰 𝒀𝑻𝑺* ║\n`
      message += `╚════════════════════╝\n\n`
      
      message += `╔▣ **SEARCH: ${query.toUpperCase()}**\n`
      message += `┃ ◈ *Results:* ${results.length}\n`
      message += `┃ ◈ *Source:* YouTube Database\n`
      message += `╚════════════════════\n\n`

      let teks2 = results.map((v, index) => {
        const isLast = index === results.length - 1
        
        if (v.type === 'video') {
          return `┏──『 *RESULT #${index + 1}* 』──┓\n` +
                 `┃ ◈ *Title:* ${v.title.substring(0, 55)}\n` +
                 `┃ ◈ *Channel:* ${v.author.name}\n` +
                 `┃ ◈ *Duration:* ${v.timestamp} ⏳\n` +
                 `┃ ◈ *Views:* ${v.views.toLocaleString()} 👁️\n` +
                 `┃ ◈ *Uploaded:* ${v.ago}\n` +
                 `┃ ◈ *Link:* ${v.url}\n` +
                 `┗━━━━━━━━━━━━━━━━━━━━┛`
        } else if (v.type === 'channel') {
          return `┏──『 *CHANNEL FOUND* 』──┓\n` +
                 `┃ ◈ *Name:* ${v.name}\n` +
                 `┃ ◈ *Subscribers:* ${v.subCountLabel}\n` +
                 `┃ ◈ *Videos:* ${v.videoCount}\n` +
                 `┃ ◈ *Link:* ${v.url}\n` +
                 `┗━━━━━━━━━━━━━━━━━━━━┛`
        }
      })
      .filter((v) => v)
      .join('\n\n')

      message += teks2
      message += `\n\n> 💡 *Tip:* Copy the link and use *play* for audio or *mp4* for video.`

      await client.sendMessage(m.chat, { image: mainThumb, caption: message.trim() }, { quoted: m })

    } catch (err) {
      console.error(err)
      m.reply('❌ An error occurred while performing the search.')
    }
  },
};