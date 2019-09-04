import React, { Component } from 'react'
import { connect } from 'react-redux';
import { userActions } from '../actions';
import { bindActionCreators } from 'redux';
import {fileUrl} from '../config';

const getArticles = userActions.getArticles;

class Test extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.getArticles();
  }

  render() {
    console.log(this.props)
    return (
      <div>
        {
          this.props.articles.loadedArticle && this.props.articles.articles.map(article => 
            <div>
              {article.title} : <img src={`${fileUrl + article.mainImage}`}/>
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    articles: state.articles
  }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getArticles
  }, dispatch)
);



export default connect(mapStateToProps, mapDispatchToProps)(Test);
