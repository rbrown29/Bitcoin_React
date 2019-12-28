import React from 'react';
import Header from './Header';
import DataT1 from './DataT1';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";
class Show extends React.Component {
	render () {
		console.log(this.props.location.state);
		return (
			<div>
				<ul>	
					<li><Link to="/">Home |</Link></li>
					<li><Link to="/About"> About |</Link></li>
					<li><Link to="/Price"> Crypto Price |</Link></li>
				</ul>
				<Header />
				<br />
				<dl className="dlOne">
				<dt><h3>{this.props.location.state.news.title}</h3></dt>
	    			<dd id="title"></dd>
	    			<dt>-----------------------------------------------------------------------------</dt>
					<dt>Author: {this.props.location.state.news.author}</dt>
					<dd id="Author"></dd>
					<dt>Description: {this.props.location.state.news.description}</dt>
	    			<dd id="description"></dd>
	    			<dt>Webpage: <a href={this.props.location.state.news.url} target="_blank" rel="noopener noreferrer">{this.props.location.state.news.source.name}</a></dt>
	    			<dd id="webpage"></dd>
				</dl>
		<form >
          <input type="text" placeholder="Your name" id="name" />
          <input type="text" placeholder="Your email" id="email" /><br />
          <textarea placeholder="Comments here" id="body" v></textarea><br />
        &nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input className="submit" type="submit" value="Submit"/>
      </form>
			</div>
		)
	}
}


export default Show;