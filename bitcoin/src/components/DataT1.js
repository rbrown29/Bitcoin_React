import React from 'react';

class DataT1 extends React.Component {
	render () {
		return (
		<div className="div1">
			{this.props.news.map((article, index) => 
					<dl key={index} className="dlOne">
					<dt><h3>{article.title}</h3></dt>
	    			<dd id="title"></dd>
	    			<dt>-----------------------------------------------------------------------------</dt>
					<dt>Author: {article.author}</dt>
					<dd id="Author"></dd>
					<dt>Description: {article.description}</dt>
	    			<dd id="description"></dd>
	    			<dt>Webpage: <a href={article.url} target="_blank" rel="noopener noreferrer">{article.source.name}</a></dt>
	    			<dd id="webpage"></dd>
					</dl>
					
				)}
	    </div>


		);

	}

}

export default DataT1;