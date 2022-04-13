import React, { Component } from 'react'
import { Input } from 'antd';
const { TextArea } = Input

export default class CommentForm extends Component {
    render() {
        return (
            <form>
                <label htmlFor="author">Auteur</label>
                <Input type="text" name="author" id="author" placeholder="Auteur du commentaire" onChange={this.props.handleChange} value={this.props.author}></Input>
                
                <label htmlFor="content">Contenu</label>
                <TextArea name="content" id="content" placeholder="Contenu du commentaire" onChange={this.props.handleChange} value={this.props.comment}></TextArea>
            </form>
        )
    }
}
