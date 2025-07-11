import './movielist.css';
import { useNavigate } from 'react-router-dom';

function movielist({id,poster , title , lang,genre,duration,releaseDate,description,cast,reviews}){
     const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/movie/${id}`, {
      state: {
        movie: {
          id,
          poster,
          title,
          lang,
          genre,
          duration,
          releaseDate,
          description,
          cast,
          reviews
        }
      }
    });
  };
    
    return(
        <div className='block'>
            <img src={poster} className='poster'/>
            <div className='info'>
                <p className='title'><b>{title}</b></p>
                <p className='details'>{lang} | {genre} | {duration}</p>
                <button className='bookbtn' onClick={handleBookNow}><b>BOOK NOW</b></button>
            </div>
        </div>
    );
}

export default movielist;