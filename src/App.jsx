import logo from './342_logo.png';
import news from './Newspaper_Cover.svg.png';
import './App.css';
import React from 'react';
import AddButton from './components/AddButton';
import { EditFilled, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ArticleModal from './components/ArticleModal';
import Fire from './Fire';
import { Card, Col, Row, Popconfirm, message, Spin } from 'antd';

const { Meta } = Card;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      error: null,
      isModalVisible: false,
      selectedArticle: null,
      loading: true,
      video: false
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

  cancel(e) {
    console.log(e);
    message.error("L'élément n'a pas été supprimé");
  }

  handleDelete = (article) => {
    const firebase = new Fire(err => {
      if (err) {
        this.setState({ error: err })
      } else {
        firebase.deleteArticle(article);
        message.success("L'élément a été supprimé");
      }
    })
  }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <div>
            <br />
            <a href = "https://www.youtube.com/watch?v=EHnu9mBuj6c"><img src={logo} className="App-logo" alt="Hexagone_logo" /></a>
          </div>
          <p>News</p>
          <AddButton
            content="Rédiger un article"
            onClick={() => this.setState({ isModalVisible: true })}
            size="large"
            shape="circle"
            icon={<EditFilled />}
            Tooltip="Cliquez pour commencer"
          />
          <br />

          <div className="article-container">
            {this.state.loading && <Spin size="large" />}
            {this.state.articles.map(article => (
              <Card
                title={article.title}
                hoverable
                style={{ width: 240 }}
                cover={<img src={article.image} alt="News_logo" />}
              >
                <Meta title={article.content} description={article.createdAt.toDate().toLocaleDateString('fr-FR')} />
                <hr />
                {console.log(article.createdAt)}
                <div>
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer cet élément ?"
                    onConfirm={() => this.handleDelete(article)}
                    onCancel={this.cancel}
                    okText="Oui"
                    cancelText="Non"
                  >
                    <AddButton icon={<DeleteOutlined />}>Supprimer</AddButton>
                  </Popconfirm>

                  <AddButton icon={<EditOutlined />} onClick={() => this.setState({ selectedArticle: article, isModalVisible: true })}>Modifier</AddButton>
                </div>
              </Card>

            ))}
          </div>

          {this.state.isModalVisible && (<ArticleModal
            onCancel={() => this.setState({ isModalVisible: false, selectedArticle: null })}
            isVisible={this.state.isModalVisible}
            article={this.state.selectedArticle}
          />)
          }
        </header>
      </div>
    );
  }
}


export default App;
