import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget/PostCreateWidget';
import { Button, Modal } from 'react-bootstrap';

// Import Actions
import { addPostRequest, fetchPosts, deletePostRequest } from '../../PostActions';

// Import Selectors
import { getShowAddPost } from '../../../App/AppReducer';
import { getPosts } from '../../PostReducer';

class PostListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false,
      selectedPost: null,
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  handleSelectedPost = (post) => {
    this.setState({ selectedPost: post });
    this.handleShowDeleteModal();
  };

  handleCloseDeleteModal = () => {
    this.setState({ showDeleteModal: false, selectedPost: null });
  };

  handleShowDeleteModal = () => {
    this.setState({ showDeleteModal: true });
  };

  handleDeletePost = () => {
    this.props.dispatch(deletePostRequest(this.state.selectedPost));
    this.handleCloseDeleteModal();
  };

  handleAddPost = (title, content) => {
    this.props.dispatch(addPostRequest({ title, content }));
  };

  render() {
    const { showDeleteModal } = this.state;
    return (
      <div>
        <PostCreateWidget addPost={this.handleAddPost} showAddPost={this.props.showAddPost} />

        <PostList handleDeletePost={this.handleSelectedPost} posts={this.props.posts} currentUser={this.props.currentUser} />

        <Modal show={showDeleteModal} onHide={this.handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseDeleteModal}>
              Close
            </Button>
            <Button variant="danger" onClick={this.handleDeletePost}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
PostListPage.need = [() => { return fetchPosts(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddPost: getShowAddPost(state),
    posts: getPosts(state),
    currentUser: state.auth.user,
  };
}

PostListPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  showAddPost: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

PostListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(PostListPage);
