import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
<<<<<<< HEAD
import CategoryList from "./CategoryList";
import CategoryForm from "./CategoryForm";
=======
import PostList from "./PostList"
import { PostDetails } from "./PostDetails";
>>>>>>> main

export default function ApplicationViews({ isLoggedIn }) {

  return (
    <main>
      <Switch>

      <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

<<<<<<< HEAD
        <Route path="/categories" exact>
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/categories/add" exact>
          {isLoggedIn ? <CategoryForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/categories/edit/:categoryId(\d+)" exact>
          {isLoggedIn ? <CategoryForm /> : <Redirect to="/login" />}
=======
        <Route path="/post" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/:id" exact>
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
>>>>>>> main
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
