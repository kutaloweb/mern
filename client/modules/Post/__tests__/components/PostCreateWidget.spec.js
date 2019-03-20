import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { PostCreateWidget } from '../../components/PostCreateWidget/PostCreateWidget';
import { shallow, mount } from 'enzyme';

const props = {
  addPost: () => {},
  showAddPost: true,
};

test('renders properly', t => {
  const wrapper = shallow(
    <PostCreateWidget {...props} />
  );

  t.truthy(wrapper.hasClass('form'));
  t.truthy(wrapper.hasClass('appear'));
  t.truthy(wrapper.find('h2').first().text('Create new post'));
  t.is(wrapper.find('input').length, 1);
  t.is(wrapper.find('textarea').length, 1);
});

test('hide when showAddPost is false', t => {
  const wrapper = mount(
    <PostCreateWidget {...props} />
  );

  wrapper.setProps({ showAddPost: false });
  t.falsy(wrapper.hasClass('appear'));
});

test('has correct props', t => {
  const wrapper = mount(
    <PostCreateWidget {...props} />
  );

  t.is(wrapper.prop('addPost'), props.addPost);
  t.is(wrapper.prop('showAddPost'), props.showAddPost);
});

test('calls addPost', t => {
  const addPost = sinon.spy();
  const wrapper = mount(
    <PostCreateWidget addPost={addPost} showAddPost />
  );

  wrapper.ref('title').value = 'Some Title';
  wrapper.ref('content').value = 'Bla Bla Bla';

  wrapper.find('a').first().simulate('click');
  t.truthy(addPost.calledOnce);
  t.truthy(addPost.calledWith('Some Title', 'Bla Bla Bla'));
});

test('empty form calls addPost in order to get validation errors', t => {
  const addPost = sinon.spy();
  const wrapper = mount(
    <PostCreateWidget addPost={addPost} showAddPost />
  );

  wrapper.find('a').first().simulate('click');
  t.truthy(addPost.called);
});
