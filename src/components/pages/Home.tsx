import React from 'react'
import scss from './Home.module.scss';
import { NewMoviList } from './newMoviList/NewMoviList';

const Home = () => {
  return (
    <div className={scss.home}>
      <NewMoviList/>
    </div>
  )
}

export default Home