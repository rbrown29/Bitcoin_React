import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";

let baseUrl4 = '';
if (process.env.NODE_ENV === 'development') {
  baseUrl4 = 'https://api.coinmarketcap.com/v1/ticker/?limit=10'
} 
class Price extends React.Component {
	constructor (props) {
		super(props)
		this.state= {
			priceHistory: []
		}
	}

fetchPosts = () => {
    fetch(`${baseUrl4}`)
    .then(data=>data.json())
    .then(jData=> {
      this.setState({priceHistory:jData})
    }).catch(err=>console.log(err))
  }
componentDidMount () {
    this.fetchPosts()
 }


	render () {
		console.log(this.state.priceHistory)
		return (
			<div>
			<ul>	
			<li><Link to="/">Home |</Link></li>
			<li><Link to="/About"> About |</Link></li>
			</ul>	
			<Header />
			<div className="price">
			Rank &nbsp;&nbsp;&nbsp; Name &nbsp;&nbsp;&nbsp; Price &nbsp;&nbsp;&nbsp; %up/down

			_______________________________________________________________
			{this.state.priceHistory.map((bpi, index) =>
				<p key={index}>{bpi.rank}.&nbsp;&nbsp;&nbsp;{bpi.name}&nbsp;&nbsp;&nbsp;{bpi.price_usd}&nbsp;&nbsp;&nbsp;{bpi.percent_change_1h}%</p>
			)}
			</div>
			<div className="divSites">
			<div>
			<br />
			<br />
			<br />
			<h1>LINKS</h1>
			<a href="https://www.coindesk.com/" target="_blank" rel="noopener noreferrer">www.coindesk.com</a>&nbsp;&nbsp;&nbsp;
			<a href="https://coinmarketcap.com/currencies/bitcoin/" target="_blank" rel="noopener noreferrer">www.coinmarketcap.com</a>&nbsp;&nbsp;&nbsp;
			<a href="https://www.coinbase.com/" target="_blank" rel="noopener noreferrer">www.coinbase.com</a>&nbsp;&nbsp;&nbsp;
			<a href="https://www.blockchain.com/prices" target="_blank" rel="noopener noreferrer">www.blockchain.com</a><br /><br />
			<a href="https://markets.businessinsider.com/currencies/btc-usd" target="_blank" rel="noopener noreferrer">www.markets.businessinsider.com</a>&nbsp;&nbsp;&nbsp;
			<a href="https://www.binance.us/en" target="_blank" rel="noopener noreferrer">www.binance.us/en</a>&nbsp;&nbsp;&nbsp;
			<a href="https://gemini.com/" target="_blank" rel="noopener noreferrer">www.gemini.com/</a>&nbsp;&nbsp;&nbsp;
			</div>
			</div>
			</div>
		)
	}
}

export default Price;