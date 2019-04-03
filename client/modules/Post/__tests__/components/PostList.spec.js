import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import PostList from '../../components/PostList';

const posts = [
  { name: 'Prashant', title: 'Hello Mern', slug: 'hello-mern', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'", user: '123', likes: [], unlikes: [] },
  { name: 'Mayank', title: 'Hi Mern', slug: 'hi-mern', cuid: 'f34gb2bh24b24b3', content: "All dogs bark 'mern!'", user: '123', likes: [], unlikes: [] },
];

test('renders the list', t => {
  const wrapper = shallow(
    <PostList posts={posts} handleShowPost={() => {}} handleDeletePost={() => {}} currentUser={{}} />
  );

  t.is(wrapper.find('PostListItem').length, 2);
});
