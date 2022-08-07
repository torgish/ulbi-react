import React, { useState } from "react";

import PostItem from "./components/PostItem";
import PostList from "./components/PostList";

import './styles/App.css'

function App() {
	const [posts, setPosts] = useState([
		{id: 1, title: 'JavaScript', body: 'Description'},
		{id: 2, title: 'PHP', body: 'Description'},
		{id: 3, title: 'C++', body: 'Description'}
	])

	return (
		<div className="App">
			<PostList posts={posts} title={'Список постов'}/>
		</div>
	);
}

export default App;