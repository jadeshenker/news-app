import React, {Component} from 'react';
import Pusher from 'pusher-js';
import pushid from 'pushid';
import styled from 'styled-components';

import { GlobalStyles } from './global';
import NewsItem from './components/NewsItem';
import DataWrapper from './components/DataWrapper';

const Container = styled.div`
  margin: 7% 10%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h1 {
    margin: 0px;
  }

  @media (max-width: 1183px) {
    margin: 7% 5%;
  }
`;

const Footer = styled.footer`
  text-align: right;
  background: #F2F2F2;
  margin: 0px;
  width: 100vw;
  height: 5rem;
  padding-top: 1rem;

  div {
    margin-right: 10%;
  }
`;

class App extends Component {
  state = {
    newsItems: [],
    lastUpdate: ""
  }

  componentDidMount() { 
    fetch('http://localhost:5000/live')
    .then(res => res.json())
    .then(articles => {
      this.setState({
        newsItems: [...this.state.newsItems, ...articles]
      });

      //get date of update
      const date = new Date();
      let hours = date.getHours();
      let ampm = hours >= 12 ? 'PM' : 'AM'; 
      hours = hours % 12; 
      hours = hours ? hours : 12; 
      let minutes = date.getMinutes(); 

      minutes = minutes < 10 ? '0' + minutes : minutes;

      let displayDate = hours + ":" + minutes + " " + ampm;

      this.setState({lastUpdate: displayDate})
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

    const newsItems = this.state.newsItems.map(article => 
      <NewsItem article={article} key={pushid()} />
    );

    return(
      <div>
        <Container>
          <GlobalStyles />
          <h1>JavaScript NewsFeed</h1>
          <DataWrapper 
            content={`last update: ${this.state.lastUpdate}`}
            bg={'#EFD9F6'}
            color={'#6D5875'}
          />
          {newsItems}
        </Container>
        <Footer>
          <div>
            <p><small>Built by <a href="https://jadeshenker.netlify.app" target="_blank" rel="noopener noreferrer">Jade Shenker</a></small></p>
          </div>
        </Footer>
      </div>
    );
  }
}

export default App;
