import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import PostListItem from '../../components/PostListItem/PostListItem';
import { shallow, mount } from 'enzyme';

const post = { name: 'Prashant', title: 'Hello Mern', slug: 'hello-mern', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'", user: '123', likes: [], unlikes: [] };
const currentUser = { id: '123', name: 'Prashant' };
const props = {
  post,
  currentUser,
  onDelete: () => {},
};

test('renders properly', t => {
  const wrapper = shallow(
    <PostListItem {...props} />
  );

  t.truthy(wrapper.hasClass('card'));
  t.is(wrapper.find('Link').first().prop('children'), post.title);
  t.regex(wrapper.find('.author-name').first().text(), new RegExp(post.name));
  t.is(wrapper.find('.post-desc').first().text(), post.content);
});

test('has correct props', t => {
  const wrapper = mount(
    <PostListItem {...props} />
  );

  t.deepEqual(wrapper.prop('post'), props.post);
  t.is(wrapper.prop('onClick'), props.onClick);
  t.is(wrapper.prop('onDelete'), props.onDelete);
});

test('calls onDelete', t => {
  const onDelete = sinon.spy();
  const wrapper = shallow(
    <PostListItem post={post} onDelete={onDelete} currentUser={currentUser} />
  );

  wrapper.find('.btn-danger').first().simulate('click');
  t.truthy(onDelete.calledOnce);
});
