import img from './aub.png';
import './App.css';
import React from 'react';
import AddButton from './components/AddButton';
import { EditOutlined } from '@ant-design/icons';
import ArticleModal from './components/ArticleModal';
import Fire from './Fire';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      error: null,
      isModalVisible: false
    };
  };

  componentDidMount() {
    const firebase = new Fire(err => {
      if (err) {
        this.setState({ error: err });
      } else {
        firebase.getArticles(articles => {
          this.setState({
            articles: articles,
            loading: false
          });
        });
      }
    });
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={img} className="App-logo" alt="aub" />
          <p>News</p>
          <AddButton
            content="Rédiger un article"
            onClick={() => this.setState({ isModalVisible: true })}
            size="large"
            shape="circle"
            icon={<EditOutlined />}
            Tooltip="hehe"
          />
          {this.state.articles.map(article => (
            <p>{article.title} <br />{article.content}</p>
          ))}
          <ArticleModal
            onCancel={() => this.setState({ isModalVisible: false })}
            isVisible={this.state.isModalVisible}
          />
        </header>
      </div>
    );
  }

}

export default App;
