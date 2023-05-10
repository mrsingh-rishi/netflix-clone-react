import React, { useEffect, useState } from 'react'
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import {UserAuth} from '../context/AuthContext';
import { db } from '../firebase';
import {
  arrayUnion,
  doc,
  updateDoc
} from 'firebase/firestore'
const Movie = ({item}) => {
    const [like, setLike] = useState(false);

    const {user} = UserAuth();
    const [saved, setSaved] = useState(false);
    const movieID = doc(db, 'user', `${user?.email}`)
    
    const saveShow = async () => {
      if(user?.email){
        setLike(!like)
        setSaved(true)
        await updateDoc(movieID, {
          saveShows: arrayUnion({
            id : item.id,
            title : item.title,
            img: item.backdrop_path
          })
        })
      }
      else{
        alert('Please log in to save a movie');
      }
    }

    const baseURL = 'https://image.tmdb.org/t/p/w500';
    if(item.backdrop_path === null){
      return (<></>);
    }
  return (
    <div className='w-[250px] sm:w-[300px] sm_h-[450px] md:w-[400px] lg:w-[480px] inline-block cursor-pointer relative p-2 mx-5 xs:mx-0'>
        <img className='w-full h-auto block sm:w-[450px] border-gray-200' src={baseURL + item?.backdrop_path} alt={item?.title} />
        <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
            <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full w-auto text-center'>{item.title}</p>
            <p onClick={saveShow}>
                {like ? <FaHeart className='absolute top-4 left-4 text-gray-300 ' /> : <FaRegHeart className='absolute top-4 left-4 text-gray-300 ' />}
            </p>
        </div>
    </div>
  )
}

export default Movie