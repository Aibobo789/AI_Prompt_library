'use client';

import {useState, useEffect} from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({data,handleTagClick}) => {
  return (
    <div className="mt16 prompt_layout">
      {data.map((post)=>(
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  //search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const [posts,setPosts] = useState([]);


  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText,"i"); // "i" flag for case-insensitive
    return posts.filter((item) =>
        regex.test(item.creator.username)
        || regex.test(item.tag)
        || regex.test(item.prompt)
    );
  }

  const handleSearchChange = (e) =>{
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    //debounce
    setSearchTimeout(
      setTimeout(()=>{
        const searchResults = filterPrompts(e.target.value);
        setSearchResults(searchResults);
      }, 500)
    );
  };

  const handleTagClick  = (tag) => {
    setSearchText(tag);
    const searchResults = filterPrompts(tag)
    setSearchResults(searchResults);
  }

  useEffect(()=>{
    const fetchPosts = async () =>{
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);;
    };

    fetchPosts();
  },[]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center"> 
        <input 
          type="search"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchResults}
          handleTagClick={handleTagClick}
        />
      ): 
        <PromptCardList
          data={posts}
          handleTagClick={handleTagClick}
        />
    }
    </section>
  )
}

export default Feed