import React from 'react';
import Header from './Header';
import DataT1 from './DataT1';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";

let baseUrl2 = '';
if (process.env.NODE_ENV === 'development') {
  baseUrl2 = 'http://obscure-ridge-04954.herokuapp.com/posts'
} 
class Show extends React.Component {
	constructor (props) {
		super()
		this.state = {
			posts: []
		}
	}
	fetchPosts = () => {
    fetch(`${baseUrl2}`)
    .then(data=>data.json())
    .then(jData=> {
      this.setState({posts:jData})
    }).catch(err=>console.log(err))
  }

  handleCreate = (createdPost) => {
    fetch(
    `${baseUrl2}`, // Use this URL to call your API
    {
      body: JSON.stringify(createdPost), // set the body = the new post set as a string
      method: 'POST', // use POST method to create the new post
      headers: { // set up headers... ?
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }
  )
  .then( createdPost => {
      return createdPost.json() // take the createdPost from above and turn it into json
    }
  )
  .then( jsonedPost => { // take the original array + the new post (jsonedPost)
      this.setState({
        posts:jsonedPost // and change state.posts to it
      })
    }).catch( error => console.log(error))
  }

  removePost = (post) => {
        this.setState (
         this.state.posts.splice(post, 1)
        )
    }

 handleDelete = (id) => {
  fetch(`${baseUrl2}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
    .then(json => {
      this.setState(prevState => {
        const posts = prevState.posts.splice(posts => posts.id !== id)
        return { posts }
      })
    })
    .catch(err => console.log(err))
}
handleChange = (event) => {
      this.setState({
        [event.target.id] : event.target.value
      })
    }

    handleSubmit = (event) => {
      event.preventDefault()
      this.handleCreate(this.state)
      this.setState({
        name:'',
        email:'',
        body: ''
      })
    }
componentDidMount () {
    this.fetchPosts()
 }
	render () {
		console.log(this.props.location.state);
		console.log(this.state.posts)
		return (
			<div>
				<ul>	
					<li><Link to="/">Home |</Link></li>
					<li><Link to="/About"> About |</Link></li>
					<li><Link to="/Price"> Crypto Price |</Link></li>
				</ul>
				<Header />
				<br />
				<div className="div3">
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
				<div>
				{this.state.posts.map((post, index) => 
					<dl key ={index}className="dlOne">
					<dt>Name: {post.name}</dt>
					<dd id="Name"></dd>
					<dt>Email: {post.email}</dt>
	    			<dd id="Email"></dd>
	    			<dt>Post: {post.body}</dt>
	    			<dd id="Post"></dd>
				
					<button onClick={()=>{this.removePost(index)}}>DELETE</button></dl>
				)}
				</div>
		<form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Your name" id="name" value={this.state.name} onChange={this.handleChange}/>
          <input type="text" placeholder="Your email" id="email" value={this.state.email} onChange={this.handleChange}/><br />
          <textarea placeholder="Comments here" id="body" value={this.state.body} onChange={this.handleChange} ></textarea><br />
          <input className="submit" type="submit" value="Submit"/>
      </form>
      </div>
			</div>
		)
	}
}


export default Show;