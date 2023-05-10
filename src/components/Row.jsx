import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Movie from './Movie';
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'



const Row = ({title, fetchURL, rowID}) => {
    const [movies, setMovies] = useState([]);
    function getCurrentDimension(){
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    useEffect(() => {
        const updateDimension = () => {
          setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);
        
        return(() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])
    console.log(screenSize);
    useEffect(()=>{
        axios.get(fetchURL).then((response) =>{
            setMovies(response.data.results);
        })
    },[fetchURL])

    const slideLeft = () => {
        var slider = document.getElementById('slider' + rowID);
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = () => {
        var slider = document.getElementById('slider' + rowID);
        slider.scrollLeft = slider.scrollLeft + 500;
    };

  return (
    <>
        <h2 className='text-white font-bold md:text-xl lg:text-4xl p-4'>
            {title}
        </h2>  
        <div className='relative flex items-center mx-10 sm:mx-0 group xs:mx-2'>
            <MdChevronLeft onClick={slideLeft} size={screenSize.width <= 480 ? 25 : 40} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden sm:hover:opacity-0 group-hover:block' />
            <div id={'slider' + rowID} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                {movies.map((item, id) =>(
                    <Movie item = {item}/>
                ))};
            </div>
            <MdChevronRight onClick={slideRight} size={screenSize.width <= 480 ? 25 : 40} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' />
        </div>
    </>
  )
}

export default Row