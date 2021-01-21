import React, { useEffect, useCallback } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Sample from "../components/Sample";
import { getPost, getUsers } from "../modules/sample";

const SampleContainer = ({
  getPost,
  getUsers,
  post,
  users,
  loadingPost,
  loadingUsers,
}) => {
  // const { post, users, loadingPost, loadingUsers } = useSelector(
  //   ({ sample, loading }) => ({
  //     post: sample.post,
  //     users: sample.users,
  //     loadingPost: loading["sample/GET_POST"],
  //     loadingUsers: loading["sample/GET_USERS"],
  //   })
  // );

  // const dispatch = useDispatch();
  // const getPost = useCallback((id) => dispatch(getPost(id)), [dispatch]);
  // const getUsers = useCallback((id) => dispatch(getUsers(id)), [dispatch]);

  useEffect(() => {
    const fn = async () => {
      try {
        await getPost(1);
        await getUsers();
      } catch (e) {
        console.log(e);
      }
    };
    fn();
    console.log(getPost(1));
  }, [getPost, getUsers]);

  return (
    <Sample
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
    />
  );
};

export default connect(
  ({ sample, loading }) => ({
    post: sample.post,
    users: sample.users,
    loadingPost: loading["sample/GET_POST"],
    loadingUsers: loading["sample/GET_USERS"],
  }),
  {
    getPost,
    getUsers,
  }
)(SampleContainer);
// export default SampleContainer;
