import axios from 'axios';

export default {
  command: 'bible',
  category: "religion"
  run: async (client, m, args) => {
  try{
    const text = args.join(" ")    
            if (!text) {
            await m.reply("*provide reference*\n_example: bible john 3:16_")
            }
   const r = text.trim()
    if (!r) {
     await m.reply("*provide reference*\n_example: bible john 3:16_")
     }
    const res = await axios.get(`https://bible-api.com/${encodeURIComponent(r)}`)
    return  m.reply(`*THE BIBLE*\n\n_*Reference: ${res.reference}*_\n${res.text.trim()}`)
  } catch (e) {
    console.log("cmd error", e)
    }
      }