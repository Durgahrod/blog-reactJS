import React from 'react';
import { Button, Modal } from 'antd';
import ArticleForm from './ArticleForm';
import Fire from '../Fire'


export default class ArticleModal extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            content: "",
            error: null
        }

    }

    handleSubmit = () => {
        const firebase = new Fire(err => {
            if (err) {
                this.setState({ error: err })
            } else {
                let newArticle = {
                    title: this.state.title,
                    content: this.state.content,
                    createdAt: new Date(),
                    comments: []
                }
                firebase.addArticle(newArticle);
            }
        })
    }


    handleChange = (e) => {
        if (e.target.name === "title") {
            this.setState({ title: e.target.value })
        } else {
            this.setState({ content: e.target.value })
        }
    }

    render() {

        return (
            <div>
                <Modal title="Article Modal" visible={this.props.isVisible} onCancel={this.props.onCancel} footer={<Button onClick={this.handleSubmit}>Valider</Button>} >
                    <ArticleForm
                        title={this.state.title}
                        content={this.state.content}
                        handleChange={this.handleChange}
                    >
                    </ArticleForm>
                </Modal>
            </div>
        )
    }
}