import axios from 'axios';

export default {
  command: 'news',
  category: 'search',
  run: async (client, m, args, command) => {

    try {
      const apiKey = 'dcd720a6f1914e2d9dba9790c188c08c';
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
      if (!response.data || !response.data.articles) {
      console.error('Invalid API response');
      }
      const articles = response.data.articles.slice(0, 5);
      if (articles.length === 0) {
        await client.sendMessage(m.chat, {
          text: '❌ No news found at the moment. Please try again later.',
          quoted: m
        });
        return;
      }
      let newsMessage = '📰 *Latest News*:\n\n';
      articles.forEach((article, index) => {
        newsMessage += `${index + 1}. *${article.title}*\n${article.description || 'No description'}\n\n`;
      });
      await client.sendMessage(m.chat, {
        text: newsMessage.trim(),
        quoted: m
      });
    } catch (error) {
      console.error('News Command Error:', error);
      await client.sendMessage(m.chat, {
        text: '❌ Sorry, I could not fetch news right now. Please try again later.',
        quoted: m
      });
    }
  }
};
