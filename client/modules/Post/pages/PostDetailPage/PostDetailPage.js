import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { addLike, fetchPost, removeLike } from '../../PostActions';

// Import Selectors
import { getPost } from '../../PostReducer';

class PostDetailPage extends Component {
  handleOnLikeClick = (id) => {
    this.props.addLike(id);
  };

  handleOnUnlikeClick = (id) => {
    this.props.removeLike(id);
  };

  findUserLike = (likes) => {
    const { auth } = this.props;
    return likes.filter(like => like.user === auth.user.id).length > 0;
  };

  findUserUnlike = (unlikes) => {
    const { auth } = this.props;
    return unlikes.filter(unlike => unlike.user === auth.user.id).length > 0;
  };

  render() {
    return (
      <div>
        <Helmet title={this.props.post.title} />
        <div className={`${styles['single-post']} ${styles['post-detail']}`}>
          <h3 className={styles['post-title']}>{this.props.post.title}</h3>
          <p className={styles['author-name']}>By {this.props.post.name}</p>
          <p className={styles['post-desc']}>{this.props.post.content}</p>
          <button onClick={this.handleOnLikeClick.bind(this, this.props.post.cuid)} className="btn btn-light mr-1 text-secondary">
            <FontAwesomeIcon icon={faThumbsUp} className={`mr-1 ${this.findUserLike(this.props.post.likes) ? 'text-success' : ''}`} />
            <span className="badge badge-light">{this.props.post.likes.length}</span>
          </button>
          <button onClick={this.handleOnUnlikeClick.bind(this, this.props.post.cuid)} className="btn btn-light mr-1 text-secondary">
            <FontAwesomeIcon icon={faThumbsDown} className={`mr-1 ${this.findUserUnlike(this.props.post.unlikes) ? 'text-danger' : ''}`} />
            <span className="badge badge-light">{this.props.post.unlikes.length}</span>
          </button>
        </div>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
PostDetailPage.need = [params => {
  return fetchPost(params.cuid);
}];

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    unlikes: PropTypes.array.isRequired,
  }).isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.params.cuid),
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { addLike, removeLike })(
  PostDetailPage
);
