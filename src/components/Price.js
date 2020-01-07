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
		<>
		<ul>	
			<li><Link to="/">Home |</Link></li>
			<li><Link to="/About"> About |</Link></li>
			</ul>	
			<Header />
			<table>
				<thead>
        			<tr><th>RANK</th>
        			<th>Name</th>
          			<th>Price</th>
          			<th>Percent up/down</th>
        			</tr>
      			</thead>
			{this.state.priceHistory.map((bpi, index) =>
      			<tbody  key={index}>
       				<tr>
          			<td>{bpi.rank}</td>
          			<td>{bpi.name}</td>
          			<td>{bpi.price_usd}</td>
         			<td>{bpi.percent_change_1h}</td>
        			</tr>
        		</tbody>
			)}
			</table>
		</>
		)
	}
}

export default Price;