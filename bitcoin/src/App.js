import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";
import Header from './components/Header';
import DataT1 from './components/DataT1';
import About from './components/About';
import Price from './components/Price';
import Show from './components/Show';

let baseUrl = '';
let baseUrl3 = '';

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'https://newsapi.org/v2/everything?q=bitcoin&apiKey=fed0a49b182549368f00fc7862d755e7'
} 
if (process.env.NODE_ENV === 'development') {
  baseUrl3 = 'https://api.coindesk.com/v1/bpi/currentprice.json'
} 

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      news: [],
      price: [],
      isLoaded: false
    }
  }
  fetchPosts = () => {
    Promise.all([fetch(`${baseUrl}`),fetch(`${baseUrl3}`)])
    .then(([data, data3])=>Promise.all([data.json(), data3.json()]))
    .then(([jData, jData3])=> {
      this.setState({
        news:jData,
        price: jData3,
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
      <ul>
          <li><Link to="/About">About | </Link></li>
          <li><Link to="/Price"> Crypto Prices |</Link></li>
      </ul>
      <Header price={this.state.price}/>
      <DataT1 news={this.state.news.articles}/>
      </Route>
      <Switch>
      <Route path="/about" component={About} />
      <Route path="/price" component={Price}/>
      <Route path="/show" component={Show}/>
      </Switch>
      </Router>
      </>
    )
  }
  }

}

export default App;
