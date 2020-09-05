require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');
const NewsAPI = require('newsapi');

const app = express();

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true,
});

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const fetchNews = (searchTerm, pageNum) => 
    newsapi.v2.everything({
        q: searchTerm, 
        language: 'en',
        page: pageNum, 
        pageSize: 10,
    });

app.use(cors());

//update requests use Pusher to trigger the update-news event with incoming articles
function updateFeed(topic) {
    let counter = 2;
    //make a request for updated feed every minute 
    setInterval(() => {
        fetchNews(topic, counter)
        .then(res => {
            pusher.trigger('news-channel', 'update-news', {
                articles: res.articles
            });
            counter += 1;
        })
        .catch(err => console.log(err));
    }, 600000)
}

//when we reach the /live endpoint, the news articles about our topic are retrieved from newsapi.org
//then the articles are sent back to the client 
app.get('/live', (req, res) => {
    const topic = 'javascript'; 
    fetchNews(topic, 1)
    .then(response => {
        res.json(response.articles);
        updateFeed(topic);
    })
    .catch(err => console.log(err))
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
    console.log(`express runing --> PORT ${server.address().port}`);
});