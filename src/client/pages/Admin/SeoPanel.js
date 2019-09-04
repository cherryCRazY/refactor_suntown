import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { seoActions } from '../../actions/seoActions';
import { authServices } from '../../services/auth.services';
import { Redirect } from 'react-router-dom';

const checkToken = authServices.checkToken;
const getSeoPages = seoActions.getSeoPages;
const editSeoPage = seoActions.editSeoPage;

const initialState = {
  seoData: {
    title: '',
    description: '',
    pageType: 'website',
    keywords: '',
    titleRu: '',
    descriptionRu: '',
    keywordsRu: ''
  },
  selectedPageId: '',
  isAuthed: true
};

class SeoPanel extends Component {
  constructor(props){
    super(props);
    this.state = initialState;
  }

  checkAuthorization = () => {
    checkToken()
    .catch(err => {
      this.setState({ isAuthed: false })
      return
    })
  }
  
  componentDidMount() {
    this.checkAuthorization()
    this.props.getSeoPages();
  }

  componentWillReceiveProps(nextProps){
    this.checkAuthorization()
  }


  handlePageSelect = event => {
    let seoPages = this.props.getResult && this.props.getResult.result || null;
    let selectedItem = seoPages.find(page => page._id === event.target.value);
    if (selectedItem) {
      this.setState({
        selectedPageId: event.target.value,
        seoData: {
          title: selectedItem.title,
          description: selectedItem.description,
          pageType: selectedItem.pageType,
          keywords: selectedItem.keywords,
          titleRu: selectedItem.titleRu || '',
          descriptionRu: selectedItem.descriptionRu || '',
          keywordsRu: selectedItem.keywordsRu || ''
        }
      });
    }
  }

  handleClick = event => {
    event.target.options[0].style = "display: none";
    document.getElementById('status_message').style = "display: none";
  }

  handleChange = event => {
    this.setState({
      seoData: {
        ...this.state.seoData,
        [event.target.name]: event.target.value
      }
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    document.getElementById('status_message').style = "display: block";
    this.props.editSeoPage(this.state.selectedPageId, this.state.seoData)
      .then(() => this.props.getSeoPages());
  }

  render() {
    if(this.state.isAuthed){
    let seoPages = this.props.getResult && this.props.getResult.result || null;
    let pagesOptions;
    if (seoPages) {
      pagesOptions = seoPages.map(seoPage => (
        <option 
          key={seoPage._id} 
          value={seoPage._id}
        >
          /{seoPage.url} : {seoPage.title}
        </option>
      ));
    }

    return (
      <div className='admin_seo'>
        <h1>SEO-панель</h1>
        <label className='admin_seo_page_selector'>
          <h2>Выберите страницу для редактирования:</h2>
          <select 
            className='admin_select'
            value={this.state.selectedPageId} 
            onChange={this.handlePageSelect}
            onClick={this.handleClick}
          >
          <option value="" id="pages_placeholder" disabled>Выбрать страницу...</option>
          {pagesOptions}
        </select>
        </label>
        <form  onSubmit={this.handleSubmit}>
          <div className='admin_input_line'>
            <h2>Название (title): </h2>
            <input
              className='admin_gallary_input'
              type="text"
              name="title"
              value={this.state.seoData.title}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className='admin_input_line'>
            <h2>Описание (description): </h2>
            <textarea
              className='admin_seo_description'
              name="description"
              value={this.state.seoData.description}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className='admin_input_line'>
            <h2>Ключевые слова (keywords): </h2>
            <textarea
              className='admin_seo_description'
              name="keywords"
              value={this.state.seoData.keywords}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className='admin_input_line'>
            <h2>Название (RU) (titleRu): </h2>
            <input
              className='admin_gallary_input'
              type="text"
              name="titleRu"
              value={this.state.seoData.titleRu}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className='admin_input_line'>
            <h2>Описание (RU) (descriptionRu): </h2>
            <textarea
              className='admin_seo_description'
              name="descriptionRu"
              value={this.state.seoData.descriptionRu}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className='admin_input_line'>
            <h2>Ключевые слова (RU) (keywordsRu): </h2>
            <textarea
              className='admin_seo_description'
              name="keywordsRu"
              value={this.state.seoData.keywordsRu}
              onChange={this.handleChange}
              required
            />
          </div>
          
          <label className='admin_seo_page_selector'>
            <h2>Тип страницы (og:type): </h2>
            <select className='admin_select' name="pageType" value={this.state.seoData.pageType} onChange={this.handleChange}>
              <option value="website">website</option>
              <option value="article">article</option>
            </select>
          </label>
          <div className='admin_action_box'>
          <button className='action_button' type="submit">Редактировать</button>
          </div>
        </form>

        <p id="status_message">
          <b style={
            { 
              color: this.props.editResult && this.props.editResult.success ? "green" : "red"
            }
          }>
            {this.props.editResult && this.props.editResult.message}
          </b>
        </p>
      </div>
    )
  } else {
    return <Redirect to="/login"/>
  }
  }
}

const mapStateToProps = state => ({
  getResult: state.seo.getSeoResult,
  editResult: state.seo.editResult
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getSeoPages,
    editSeoPage
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SeoPanel);

