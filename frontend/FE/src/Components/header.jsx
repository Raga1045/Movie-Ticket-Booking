import './header.css';
import Logo from '../assets/cineverse.jpg';

function header(){
    return (
        <div className="head">
            <img src={Logo} className='cine-img'/> 
            <input className="location-input" placeholder='location' />
            <input className="search-input" placeholder='search your movie' />
        </div>
    )
}

export default header;