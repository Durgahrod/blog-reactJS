import React from 'react';
import { Button, Modal } from 'antd';
import ArticleForm from './ArticleForm';
import Fire from '../Fire'


export default class ArticleModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.article ? props.article.title : "",
            content: props.article ? props.article.content : "",
            image: props.article ? props.article.image : "",
            author: props.article ? props.article.author : "",
            comment: props.article ? props.article.comment : "",
            error: null
        }
    }

    handleSubmit = () => {
        const firebase = new Fire(err => {
            if (err) {
                this.setState({ error: err })
            } else if (this.props.article) {
                let currentArticle = this.props.article
                currentArticle.title = this.state.title
                currentArticle.content = this.state.content
                currentArticle.image = this.state.image
                if (currentArticle.title === "" || currentArticle.content === "" || currentArticle.image === "") {
                    this.setState({ error: err })
                } else {
                    firebase.updateArticle(currentArticle);
                }
                this.props.onCancel();
            } else {
                let newArticle = {
                    title: this.state.title,
                    content: this.state.content,
                    image: this.state.image,
                    createdAt: new Date(),
                    comments: []
                }
                if (newArticle.title === "" || newArticle.content === "" || newArticle.image === "") {
                    this.setState({ error: err })
                } else {
                    firebase.AddArticle(newArticle);
                }
                this.props.onCancel();
            }
        })
    }

    handleChange = (e) => {
        if (e.target.name === "title") {
            this.setState({ title: e.target.value })
        } else if (e.target.name === "content") {
            this.setState({ content: e.target.value })
        } else if (e.target.name === "image") {
            this.setState({ image: e.target.value })
        }
    }

    render() {
        return (
            <div>
                <Modal title="Article" visible={this.props.isVisible} onCancel={this.props.onCancel} footer={<Button onClick={this.handleSubmit}>Valider</Button>} >
                    <ArticleForm
                        title={this.state.title}
                        content={this.state.content}
                        image={this.state.image}
                        author={this.state.author}
                        comment={this.state.comment}
                        handleChange={this.handleChange}
                    >
                    </ArticleForm>
                </Modal>
            </div>
        )
    }
}