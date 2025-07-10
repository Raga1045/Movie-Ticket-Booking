import './Payment.css';

function Payment(){
    const movie = {
        title: 'Kubera',
        date: '15-06-2025',
        time: '7:30 PM',
        theatre: 'PVR Cinemas'
    };

    const seats = ['A1','A2','A3'];
    const ticketsPrice = 500;
    const convinienceFee = 66.08;
    const total = ticketsPrice + convinienceFee;

    return(

        <div className='payment-main'>

            <div className='payment'>
            <div className="confirm">Confirm booking</div>

            <div className="title">{movie.title}</div>

           <div className='movie-detail'>
             <span> {movie.date   } </span>
             <span> {movie.time   } </span>
             <span> {movie.theatre }</span>
           </div>

            <div className='details'>Details</div>

            <div className='p-container'>

               <div style={{display:'flex',justifyContent:'space-between', marginBottom:'14px'}}>
                <span>Seats : </span>
                <span>{seats.join(', ')}</span>
               </div>

                <div style={{display:'flex',justifyContent:'space-between', marginBottom:'14px'}}>
                    <span>Ticket/s price : </span>
                    <span>₹{ticketsPrice}</span>
                </div>

                <div style={{display:'flex',justifyContent:'space-between', marginBottom:'14px'}}>
                    <span>Convinience Fee :</span>
                    <span> ₹{convinienceFee}</span>
                </div>

            </div>

            <div className='footer'>

                <div className='total'>
                    <p style={{fontWeight:'bold', color:'#00adb5', marginBottom:'3px',fontSize:'18px'}}>Total</p>
                    <p style={{fontWeight:'bold',marginTop: '4px',fontSize: '18px'}}>₹{total}</p>
                </div>

                <div className='button'>
                    <button className='continue' type='submit'>continue</button>
                </div>
                
            </div>
        </div>

        </div>
        // <div>
            
        //    <h1> payment page</h1>
            
        // </div>

    );
};

export default Payment;