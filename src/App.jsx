import React, {useEffect, useState} from "react";
import { usePosts } from "./components/hooks/usePosts";
import { useFetching } from "./components/hooks/useFetching";
import PostService from './API/PostService';
import { getPageCount } from "./utils/pages";
import { getPagesArray } from "./utils/pages";

import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/modal/MyModal";

import './styles/App.css'
import MyLoader from "./components/UI/Loader/MyLoader";

function App() {
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({sort: '', query: ''})
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

	let pagesArray = getPagesArray(totalPages);

	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		const response = await PostService.getAll(limit, page);
		setPosts(response.data)
		const totalCount = response.headers['x-total-count']
		setTotalPages(getPageCount(totalCount, limit));
	})

	useEffect(() => {
		fetchPosts();
	}, [page])

	const createPost = (newPost) => {
		setPosts([...posts, newPost])
		setModal(false)
	}

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	const changePage = (page) => {
		setPage(page)
	}

	return (
		<div className="App">
			<MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
				Добавить пользователя
			</MyButton>

			<MyButton onClick={fetchPosts}>Get Posts</MyButton>

			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost}/>
			</MyModal>

			<hr style={{margin: '15px 0'}}/>
			
			<PostFilter 
				filter={filter} 
				setFilter={setFilter}/>

			{postError &&
				<h1>Произошла ошибка</h1>
			}

			{isPostsLoading
				?	<div style={{display: 'flex', justifyContent: "center", marginTop: '50px'}}><MyLoader/></div>
				: <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов'}/>	
			}	

			<div className="page__wrapper">
				{pagesArray.map(p => 
					<span
						onClick={() => changePage(p)} 
						key={p} 
						className={page === p ? 'page page__current' : 'page'}
					>
						{p}
					</span>	
				)}	
			</div>
		</div>
	);
}

export default App;