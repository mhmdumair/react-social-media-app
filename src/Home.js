import React, { useContext } from 'react';
import Feed from './Feed';
import DataContext from './contaxt/DataContaxt';

const Home = () => {
  const { searchResults,isLoading,fetchError} =useContext(DataContext)
  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg'>Loading Posts...</p>}
      {!isLoading && fetchError && 
        <p className='statusMsg' style={{color:"red"}}>{fetchError}</p>}
      {!isLoading && !fetchError &&  
        (searchResults.length ? <Feed posts={searchResults}/> : 
          <p className='statusMsg'> No posts to Display</p>)}
    </main>
  );
};

export default Home;
