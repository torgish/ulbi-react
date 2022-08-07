import React, { useState } from "react";

import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

import './styles/App.css'

function App() {
	const [posts, setPosts] = useState([
		{id: 1, title: 'JavaScript', body: 'Description'},
		{id: 2, title: 'PHP', body: 'Description'},
		{id: 3, title: 'C++', body: 'Description'}
	])

	const createPost = (newPost) => {
		setPosts([...posts, newPost])
	}

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	return (
		<div className="App">
			<PostForm create={createPost}/>
			<PostList remove={removePost} posts={posts} title={'Список постов'}/>
		</div>
	);
}

export default App;