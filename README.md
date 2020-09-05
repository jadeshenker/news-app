# Live Newsfeed
Live Nesfeed app built with React, Node, News API and Pusher. This app was built from this [tutorial](https://pusher.com/tutorials/live-news-feed-react). This newsfeed app uses the News API to show top stores about **JavaScript** and updates every 10 minutes. 

#### run this project on your device: 
clone or download this repo and run `npm run dev` to start up the client on port 3000 and the server on port specified in `variables.env.` to successfully run on your device, create your own `variables.env` file in the cloned directory and specify the Pusher app and News API keys as needed (see: *Get Pusher Credentials* section of the [tutorial](https://pusher.com/tutorials/live-news-feed-react)).

#### added features: 
* simultaneously start up server and client 
* conceal client API keys 

#### TODO: 
* frontend styling using styled-components 
* ability to save stories using local storage