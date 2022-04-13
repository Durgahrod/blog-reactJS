import React from 'react';
import { Button, Modal } from 'antd';
import CommentForm from './CommentForm';
import Fire from '../Fire'


export default class CommentModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.article ? props.article.title : "",
            content: props.article ? props.article.content : "",
            author: props.article ? props.article.author : "",
            comment: props.article ? props.article.comment : "",
            error: null
        }
    }

    handleSubmit = () => {
        const firebase = new Fire(err => {
            if (err) {
                this.setState({ error: err })
            } else {
                let newComment = this.props.article;
                let singleComment = {
                    author: this.state.author,
                    content: this.state.content
                }
                if (singleComment.author == "" || singleComment.content == "") {
                    this.setState({ error: err })
                } else {
                    newComment.comments.push(singleComment);
                    firebase.updateArticle(newComment);
                }
            }
            this.props.onCancel();
        })
    }

    handleChange = (e) => {
        if (e.target.name === "author") {
            this.setState({ author: e.target.value })
        } else if (e.target.name === "content") {
            this.setState({ content: e.target.value })
        }
    }

    render() {
        return (
            <div>
                <Modal title={this.props.article.title} visible={this.props.isReadVisible} onCancel={this.props.onCancel} footer={<Button onClick={this.handleSubmit}>Valider</Button>} >
                    <img src={this.props.article.image} alt="News_logo" className="img"></img>
                    <h3>{this.props.article.content}</h3>
                    <hr />
                    <h3>Commentaires :</h3>
                    {this.props.article.comments.map(comment =>
                        <p>{comment.author} : {comment.content}
                        </p>)
                    }
                    <hr />
                    <CommentForm
                        author={this.state.author}
                        content={this.state.content}
                        handleChange={this.handleChange}
                    >
                    </CommentForm>
                </Modal>
            </div>
        )
    }
}