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
            error: null
        }
    }

    handleSubmit = () => {
        const firebase = new Fire(err => {
            if (err) {
                this.setState({ error: err })
            } else if (this.state.article) {
                let newArticle = {
                    title: this.state.title,
                    content: this.state.content,
                    image: this.state.image,
                    createdAt: new Date(),
                    comments: []
                }
                firebase.addArticle(newArticle);
            } else{
                let currentArticle = this.props.article
                currentArticle.title = this.state.title
                currentArticle.content = this.state.content
                currentArticle.image = this.state.image
                                
                firebase.updateArticle(currentArticle)
            }
            this.props.onCancel();
        })
    }


    handleChange = (e) => {
        if (e.target.name === "title") {
            this.setState({ title: e.target.value })
        } else if (e.target.name === "content") {
            this.setState({ content: e.target.value })
        } else {
            this.setState({ image: e.target.value})
        }
    }

    render() {

        return (
            <div>
                <Modal title="Article Modal" visible={this.props.isVisible} onCancel={this.props.onCancel} footer={<Button onClick={this.handleSubmit}>Valider</Button>} >
                    <ArticleForm
                        title={this.state.title}
                        content={this.state.content}
                        image={this.state.image}
                        handleChange={this.handleChange}
                    >
                    </ArticleForm>
                </Modal>
            </div>
        )
    }
}