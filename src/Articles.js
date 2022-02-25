import React from 'react'
import "./Articles.css"

function Articles({ articles }) {
  return (
    <div className="article">
      <div className="article_container">
      {articles.map((article) => (
        <div className="articles_individual">
          <div className="container">
            <a className="title_container" href={article.link}><b>Title:&nbsp;</b><h1 className='title'>{article.title}</h1></a>
          </div>
          <div className="container">
            <a className="author"><b>Author:&nbsp;</b>{article.author}</a>
          </div>
          <div className="container">
            <a className ="date"><b>Date Published:&nbsp;</b>{article.datePub}</a>
          </div>
          <div className="container">
            <a className="source"><b>Source:&nbsp;</b>{article.source}</a>
          </div>
          <div className="container">
            <a className="country"><b>Country:&nbsp;</b>{article.country}</a>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Articles