import React, { Component } from 'react'
import { Input } from 'antd';
const { TextArea } = Input

export default class ArticleForm extends Component {
    render() {
        return (
            <form>
                <label htmlFor="title">Titre</label>
                <Input type="text" name="title" id="title" placeholder="Titre de l'article" onChange={this.props.handleChange} value={this.props.title} />

                <label htmlFor="content">Contenu</label>
                <TextArea name="content" id="content" placeholder="Contenu de l'article" onChange={this.props.handleChange} value={this.props.content}></TextArea>

                <label htmlFor="image">Image (URL)</label>
                <TextArea name="image" id="image" placeholder="Miniature de l'article" onChange={this.props.handleChange} value={this.props.image}></TextArea>
            </form>
        )
    }
}
