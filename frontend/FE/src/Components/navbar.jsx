import { Link } from 'react-router-dom';
import './navbar.css';

function navbar(){
     return(
       <div className="container">
           <div className='cont'>
             <Link to='/about'><div className="tag">About Us</div></Link>
             <Link to='/contact'><div className="tag">Contact Us</div></Link>
             <Link to='/help'><div className="tag"> Help</div></Link>
           </div>
           <br></br>
           
       </div>
     );
}

export default navbar;