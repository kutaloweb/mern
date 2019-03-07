import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import Style
import styles from './PostCreateWidget.css';

export class PostCreateWidget extends Component {
  addPost = () => {
    const nameRef = this.refs.name;
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    if (nameRef.value && titleRef.value && contentRef.value) {
      this.props.addPost(nameRef.value, titleRef.value, contentRef.value);
      nameRef.value = titleRef.value = contentRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddPost ? styles.appear : '')}`;
    return (
      <div className={`${cls} jumbotron my-3`}>
        <h2>Create new post</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Author's name</label>
            <input type="text" className="form-control" id="name" placeholder="Author's name" ref="name" />
          </div>
          <div className="form-group">
            <label htmlFor="title">Post title</label>
            <input type="text" className="form-control" id="title" placeholder="Post title" ref="title" />
          </div>
          <div className="form-group">
            <label htmlFor="content">Post content</label>
            <textarea className="form-control" id="content" rows="3" placeholder="Post content" ref="content"></textarea>
          </div>
          <a className="btn btn-primary" href="#" onClick={this.addPost}>Submit</a>
        </form>
      </div>
    );
  }
}

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
  showAddPost: PropTypes.bool.isRequired,
};

export default PostCreateWidget;
