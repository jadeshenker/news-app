import React, {Component} from 'react';
import Pusher from 'pusher-js';
import pushid from 'pushid';

import './App.css';

class App extends Component {
  state = {
    newsItems: []
  }

  componentDidMount() { 
    fetch('http://localhost:5000/live')
    .then(res => res.json())
    .then(articles => {
      this.setState({
        newsItems: [...this.state.newsItems, ...articles]
      });
    })
    .catch(err => console.log(err));

    const pusher = new Pusher(`${process.env.REACT_APP_PUSHER_APP_KEY}`, {
      cluster: 'us3',
      encrypted: true
    });

    //this is where our server will publish events to 
    const channel = pusher.subscribe('news-channel');
    //when our channel receives the update-news event, update all the news items
    channel.bind('update-news', data => {
      this.setState({
        newsItems: [...data.articles, this.state.newsItems]
      });
    })
  }

  render() {

    const NewsItem = (article, id) => (
      <li key={id}><a href={`${article.url}`}>{article.title}</a>
      <p>{article.description}</p></li>
    )

    const newsItems = this.state.newsItems.map(e => NewsItem(e, pushid()));
    return(
      <div>
        <h1>news feed</h1>
        <ul>{newsItems}</ul>
      </div>
    );
  }
}

export default App;
