import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Request'
const Home = () => {
  // const options = {
  //   method: 'POST',
  //   url: 'https://anilist-graphql.p.rapidapi.com/',
  //   headers: {
  //     'X-RapidAPI-Key': 'd9d8791106mshcfce42de60680dep11a92fjsn26c4feb2121a',
  //     'X-RapidAPI-Host': 'anilist-graphql.p.rapidapi.com'
  //   }
  // };
  return (
    <>
      <Main />
      <Row rowID = '1' title='UpComing' fetchURL = {requests.requestUpcoming}/>
      <Row rowID = '2' title='Popular' fetchURL = {requests.requestPopular}/>
      <Row rowID = '3' title='Anime' fetchURL = {requests.requestAnime}/>
      <Row rowID = '4' title='Top Rated' fetchURL = {requests.requestTopRated}/>
      <Row rowID = '5' title='Trending' fetchURL = {requests.requestTrending}/>
      <Row rowID = '6' title='Horror' fetchURL = {requests.requestHorror}/>
    </>
  )
}

export default Home