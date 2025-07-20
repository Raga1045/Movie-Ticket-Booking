import './Payment.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function Payment(){
    // const movie = {
    //     title: 'Kubera',
    //     date: '15-06-2025',
    //     time: '7:30 PM',
    //     theatre: 'PVR Cinemas'
    // };

    const { id } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                console.log('Stored token:', localStorage.getItem('token'));
                const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
                    headers: {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if(!res.ok) {
                    throw new Error('Failed to fetch booking');
                }
                const data = await res.json();
                setBooking(data);

            }
            catch(err){
                console.error('Error fetching booking: ', err);
            }
        };
        fetchBooking();
    }, [id]);

    if(!booking) {
        return <div>Loading...</div>;
    }

    // const seats = ['A1','A2','A3'];
     const ticketsPrice = 500;
     const convinienceFee = 66.08;
    // const total = ticketsPrice + convinienceFee;

    const startTime = new Date(booking.showTime.startTime);
    const dateStr = startTime.toLocaleDateString('en-IN');
    const timeStr = startTime.toLocaleTimeString('en-IN', {hour:'2-digit', minute: '2-digit'});

    // return(

    //     <div className='payment-main'>

    //         <div className='payment'>
    //         <div className="confirm">Confirm booking</div>

    //         <div className="title">{booking.showTime.movie.title}</div>

    //        <div className='movie-detail'>
    //          <span> {dateStr  } </span>
    //          <span> {timeStr  } </span>
    //          <span> {booking.showTime.theatre.name }</span>
    //        </div>

    //         <div className='detailsPay'>Details</div>

    //         <div className='p-container'>

    //            <div style={{display:'flex',justifyContent:'space-between', marginBottom:'14px'}}>
    //             <span>Seats : </span>
    //             <span>{booking.seats.join(', ')}</span>
    //            </div>

    //             <div style={{display:'flex',justifyContent:'space-between', marginBottom:'14px'}}>
    //                 <span>Ticket/s price : </span>
    //                 <span>₹{ticketsPrice}</span>
    //             </div>

    //             <div style={{display:'flex',justifyContent:'space-between', marginBottom:'14px'}}>
    //                 <span>Convinience Fee :</span>
    //                 <span> ₹{convinienceFee}</span>
    //             </div>

    //         </div>

    //         <div className='footer'>

    //             <div className='total'>
    //                 <p style={{fontWeight:'bold', color:'#00adb5', marginBottom:'3px',fontSize:'18px'}}>Total</p>
    //                 <p style={{fontWeight:'bold',marginTop: '4px',fontSize: '18px'}}>₹{booking.totalPrice}</p>
    //             </div>

    //             <div className='button'>
    //                 <button className='continue' type='submit'>continue</button>
    //             </div>
                
    //         </div>
    //     </div>

    //     </div>
      
    // );
};

export default Payment;