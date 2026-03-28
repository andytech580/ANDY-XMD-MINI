export default {
  command: ['owner'],
  category: 'info',

  run: async (client, m) => {

    const ownerNumber = '256701583113'
    const botname = '𝑨𝑵𝑫𝒀-𝑿𝑴𝑫 𝑴𝑰𝑵𝑰'
    const thumbnail = 'https://files.catbox.moe/28bg4c.jpg'

    const text = `
╭━〔˚୨•(=^●ω●^=)• ⊹ 𝑪𝑹𝑬𝑨𝑻𝑶𝑹 ⊹〕━╮

» ˚୨•(=^●ω●^=)• ⊹ Information ⊹

➤ Creator: ANDY-TECH
➤ Bot: ${botname}
➤ Contact available below

──────────────

✧ Thank you for using the bot ✧

╰━━━━━━━━━━━━━━━━━━━━╯
`.trim()

    const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:Creator
TEL;type=CELL;type=VOICE;waid=${ownerNumber}:${ownerNumber}
END:VCARD
`.trim()

    await client.sendMessage(
      m.chat,
      {
        text,
        contextInfo: {
          externalAdReply: {
            title: 'Bot Creator',
            body: botname,
            thumbnailUrl: thumbnail,
            mediaType: 1,
            renderLargerThumbnail: true,
            showAdAttribution: false
          }
        }
      },
      { quoted: m }
    )

    await client.sendMessage(
      m.chat,
      {
        contacts: {
          displayName: 'ANDY-TECH',
          contacts: [{ vcard }]
        }
      },
      { quoted: m }
    )

  }
}