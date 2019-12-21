import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";
import Header from './components/Header';
import DataT1 from './components/DataT1';
import About from './components/About'

let baseUrl = '';
let baseUrl2 = '';

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'https://newsapi.org/v2/everything?q=bitcoin&apiKey=fed0a49b182549368f00fc7862d755e7'
} 
if (process.env.NODE_ENV === 'development') {
  baseUrl2 = 'http://obscure-ridge-04954.herokuapp.com/posts'
} 

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: [],
      news: [],
      isLoaded: false
    }
  }
  fetchPosts = () => {
    Promise.all([fetch(`${baseUrl}`), fetch(`${baseUrl2}`)])
    .then(([data, data2])=>Promise.all([data.json(), data2.json()]))
    .then(([jData, jData2])=> {
      this.setState({
        news:jData,
        posts: jData2,
        isLoaded: true
      })
    }).catch(err=>console.log(err))
  }


  componentDidMount () {
    this.fetchPosts()
  }


  render () {
  const {isLoaded, news} = this.state;
  if(!isLoaded) {
    return <div>No Data!</div>
  }else {
    return (
      <>
      <Router>
      <Route exact path="/">
      <Header />
      <DataT1 news={this.state.news.articles}/>
      </Route>
      <Switch>
      <Route path="/about" component={About} />
      </Switch>
      </Router>
      </>
    )
  }
  }

}

export default App;
