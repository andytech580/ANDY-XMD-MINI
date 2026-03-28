let isNumber = (x) => typeof x === 'number' && !isNaN(x)

function initDB(m, client) {
  const jid = client.user.id.split(':')[0] + '@s.whatsapp.net'

  const settings = global.db.data.settings[jid] ||= {}
  settings.self ??= false
  settings.prefijo ??= ['/', '.', '#', '!']
  settings.id ??= '120363421568891511@newsletter'  // Newsletter ID
  
  settings.nameid ??= '𝑨𝑵𝑫𝒀-𝑿𝑴𝑫 𝑴𝑰𝑵𝑰'
  settings.link ??= 'https://github.com/andytech580/ANDY-XMD-MINI'
  settings.banner ??= 'https://files.catbox.moe/tekrp0.jpg'
  
  settings.icon ??= 'https://files.catbox.moe/tekrp0.jpg'
  settings.currency ??= 'Coins'
  settings.namebot ??= '𝑨𝑵𝑫𝒀-𝑿𝑴𝑫 𝑴𝑰𝑵𝑰'
  settings.namebot2 ??= '𝑨𝑵𝑫𝒀-𝑿𝑴𝑫 𝑴𝑰𝑵𝑰'
  settings.owner ??= 'ANDY-TECH - 256701583113'

  const user = global.db.data.users[m.sender] ||= {}
  user.name ??= ''
  user.exp = isNumber(user.exp) ? user.exp : 0
  user.level = isNumber(user.level) ? user.level : 0
  user.usedcommands = isNumber(user.usedcommands) ? user.usedcommands : 0
  user.pasatiempo ??= ''
  user.description ??= ''
  user.marry ??= ''
  user.genre ??= ''
  user.birth ??= ''
  user.metadatos ??= null
  user.metadatos2 ??= null

  const chat = global.db.data.chats[m.chat] ||= {}
  chat.users ||= {}
  chat.bannedGrupo ??= false
  chat.welcome ??= true
  chat.nsfw ??= false
  chat.alerts ??= true
  chat.gacha ??= true
  chat.rpg ??= true
  chat.adminonly ??= false
  chat.primaryBot ??= null
  chat.antilinks ??= true
  chat.personajesReservados ||= []

  chat.users[m.sender] ||= {}
  chat.users[m.sender].coins = isNumber(chat.users[m.sender].coins) ? chat.users[m.sender].coins : 0
  chat.users[m.sender].bank = isNumber(chat.users[m.sender].bank) ? chat.users[m.sender].bank : 0
  chat.users[m.sender].characters = Array.isArray(chat.users[m.sender].characters) ? chat.users[m.sender].characters : []
}

export default initDB;
