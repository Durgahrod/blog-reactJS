import logo from './342_logo.png';
import './App.css';
import React from 'react';
import AddButton from './components/AddButton';
import { EditFilled, EditOutlined, DeleteOutlined, ReadOutlined } from '@ant-design/icons';
import ArticleModal from './components/ArticleModal';
import CommentModal from './components/CommentModal';
import Fire from './Fire';
import { Card, Col, Row, Popconfirm, message, Spin, Input, Space } from 'antd';

const { Meta } = Card;
const { Search } = Input;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      error: null,
      isModalVisible: false,
      isReadModalVisible: false,
      selectedArticle: null,
      loading: true,
      video: false,
      filteredArticles: []
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
            loading: false,
            filteredArticles: articles
          });
        });
      }
    });
  }

  cancel(e) {
    message.error("L'élément n'a pas été supprimé");
  }

  handleFilter = (e) => {
    const articlesFilter = this.state.articles.filter(article => {
      return article.title.includes(e.target.value) ||
        article.content.includes(e.target.value);
    })

    this.setState({ filteredArticles: articlesFilter });


  };


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
            <div className="secret">
              <p>Testez votre vue ! Cliquez au centre du logo Hexagone !</p>
            </div>
            <a target="_blank" href="https://youtu.be/cBkWhkAZ9ds"><img src={logo} className="App-logo" alt="Hexagone_logo" /></a>
          </div>
          <p>Actualité</p>
          <AddButton
            content="Rédiger un article"
            onClick={() => this.setState({ isModalVisible: true })}
            size="large"
            shape="round"
            icon={<EditFilled />}
            Tooltip="Cliquez pour commencer"
          />

          <br />

          <div col-2 className="searchbar">
            <Input placeholder="Rechercher un article" onChange={this.handleFilter} />
          </div>

          <br />

          <div className="article-container">
            {this.state.loading && <Spin size="large" />}
            {this.state.filteredArticles.map(article => (
              <Card
                title={article.title}
                hoverable
                style={{ width: 240 }}
                cover={<img src={article.image} alt="News_logo" />}
              >
                <Meta title={article.content} description={article.createdAt.toDate().toLocaleDateString('fr-FR')} />
                <hr />
                <div className="icons">
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
                  <AddButton icon={<ReadOutlined />} onClick={() => this.setState({ selectedArticle: article, isReadModalVisible: true })}>Lire l'article</AddButton>
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

          {this.state.isReadModalVisible && (<CommentModal
            onCancel={() => this.setState({ isReadModalVisible: false, selectedArticle: null })}
            isReadVisible={this.state.isReadModalVisible}
            article={this.state.selectedArticle}
          />)
          }
        </header>
      </div>
    );
  }
}


export default App;
