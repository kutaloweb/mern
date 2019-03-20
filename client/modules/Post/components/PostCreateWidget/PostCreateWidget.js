import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Style
import styles from './PostCreateWidget.css';

export class PostCreateWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    } else {
      this.refs.title.value = this.refs.content.value = '';
    }
  }

  addPost = () => {
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    this.props.addPost(titleRef.value, contentRef.value);
  };

  render() {
    const { errors } = this.state;
    const cls = `${styles.form} ${(this.props.showAddPost ? styles.appear : '')}`;
    return (
      <div className={`${cls} jumbotron`}>
        <h2>Create new post</h2>
        <form>
          <div className="form-group">
            <label htmlFor="title">Post title</label>
            <input type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`} id="title" placeholder="Post title" ref="title" />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="content">Post content</label>
            <textarea className={`form-control ${errors.content ? 'is-invalid' : ''}`} id="content" rows="3" placeholder="Post content" ref="content" />
            {errors.content && <div className="invalid-feedback">{errors.content}</div>}
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

const mapStateToProps = state => ({
  errors: state.posts.errors,
});

export default connect(mapStateToProps)(PostCreateWidget);
