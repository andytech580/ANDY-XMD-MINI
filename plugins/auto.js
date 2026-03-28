let settings = {
  wapresence: true,
  statusview: true,
  statusreact: true
};

export default {
  command: 'auto',
  category: "owner"
 run: async (client, m, args) => {
    const idBot = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const isOwner2 = [idBot, ...global.owner.map(v => v + '@s.whatsapp.net')].includes(m.sender)

    if (!isOwner2) return m.reply("Owner only command")

    const feature = args[0]?.toLowerCase();
    const state = args[1]?.toLowerCase();

    if (!feature || !state) {
      return m.reply(`Usage:
.auto wapresence on/off
.auto statusview on/off
.auto statusreact on/off`)
    }

    if (!(feature in settings)) {
      return m.reply("Invalid feature!")
    }

    if (!["on", "off"].includes(state)) {
      return m.reply("Use on/off")
    }

    settings[feature] = state === "on";

    return m.reply(`${feature} has been turned ${state}`)
  },

  on: {
    messages: async (client, { messages }) => {   // ✅ FIXED HERE
      try {
        const m = messages[0];
        if (!m.message) return;

        const jid = m.key.remoteJid;

      
        if (jid === "status@broadcast") {

          // ✅ Auto View Status
          if (settings.statusview) {
            await client.readMessages([m.key]);
          }

          // ✅ Auto React to Status
          if (settings.statusreact) {
            const emojis = ["💙", "❤️"];
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];

            await client.sendMessage(jid, {
              react: {
                text: emoji,
                key: m.key
              }
            });
          }

          return;
        }

    
        if (!m.key.fromMe && settings.wapresence) {

          const actions = ["composing", "recording"];
          const pick = actions[Math.floor(Math.random() * actions.length)];

          await client.sendPresenceUpdate(pick, jid);

          // stop after 10 seconds
          setTimeout(() => {
            client.sendPresenceUpdate("paused", jid).catch(() => {});
          }, 10000);
        }

      } catch (e) {
        console.log("Auto System Error:", e);
      }
    }
  }
};