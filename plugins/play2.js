import yts from 'yt-search';
import axios from 'axios';

export default {
  command: 'play2',
  category: 'downloader',
  run: async (client, m, args) => {
    try {
      if (!args[0]) {
        return m.reply('🌸 *𝑨𝑵𝑫𝒀-𝑿𝑴𝑫 𝑴𝑰𝑵𝑰:* \n> Please give me the title or link of the song you want to listen to.')
      }

      const text = args.join(' ')
            // Start processing reaction
            

            const { videos } = await yts(text);
            if (!videos || videos.length === 0) {
                
                return m.reply("🔍 *Search Results*\n\n⚠️ No songs found for your search query!\n💡 Try different keywords");
            }

            const video = videos[0];
            
            

            // Send detailed info
            await client.sendMessage(m.chat, {
                image: { url: video.thumbnail },
                caption: `🎵 *Track Details*\n\n📀 Title: ${video.title}\n⏱️ Duration: ${video.timestamp}\n👁️ Views: ${video.views}\n📅 Uploaded: ${video.ago}\n\n⬇️ Starting download...\n\n🎶`
            }, { quoted: m });
            
            const apiUrl = `https://yt-dl.officialhectormanuel.workers.dev/?url=${encodeURIComponent(video.url)}`;
            const response = await axios.get(apiUrl);
            const data = response.data;

            if (!data?.status || !data.audio) {
                
                return m.reply("🚫 *Download Failed*\n\n❌ Could not fetch audio file\n🔧 Please try again in a few minutes");
            }



            // Send audio with metadata
            await client.sendMessage(m.chat, {
                audio: { url: data.audio },
                mimetype: "audio/mpeg",
                fileName: `${data.title || video.title}.mp3`.replace(/[<>:"/\\|?*]/g, ''),
                contextInfo: {
                    externalAdReply: {
                        title: "🎵 Download Complete!",
                        body: `Click to play ${data.title || video.title}`,
                        mediaType: 2,
                        thumbnailUrl: video.thumbnail,
                        sourceUrl: video.url
                    }
                }
            }, { quoted: m });

            
        } catch (error) {
            console.error('Error in play command:', error);
            
            await reply("💥 *Error Occurred*\n\n❌ Something went wrong during download\n🔧 Please try again later");
        }
    }
}
