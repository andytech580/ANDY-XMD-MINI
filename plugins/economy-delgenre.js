export default {
  command: ['delgender'],
  category: 'rpg',
  run: async (client, m) => {
    const user = global.db.data.users[m.sender]
    if (!user.genre) return m.reply(`You don't have a gender assigned.`)

    user.genre = ''
    return m.reply(`✎ Your gender has been removed.`)
  },
};