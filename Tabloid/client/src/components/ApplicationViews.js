import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import {CategoryList} from "./CategoryList";
import CategoryForm from "./CategoryForm";
import {PostList} from "./PostList"
import {TagList} from "./TagList"
import TagForm from "./TagForm"
import { PostDetails } from "./PostDetails";
import { CommentList } from "./CommentList";

export default function ApplicationViews({ isLoggedIn }) {

  return (
    <main>
      <Switch>

      <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category" exact>
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category/add" exact>
          {isLoggedIn ? <CategoryForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category/edit/:id" exact>
          {isLoggedIn ? <CategoryForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tag" exact>
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>
  
        <Route path="/tag/create" exact>
          {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tag/create/:id" exact>
          {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/:id" exact>
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/comment/GetCommentsByPost/:id" exact>
        {isLoggedIn ? <CommentList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};
