import React from 'react'
import { useSelector } from 'react-redux' 
import { axiosInstance } from '../helpers/axiosInstance';
import { HideLoading,ShowLoading } from '../redux/alertsSlice';
import { useState,useEffect } from 'react';
import { message,Col,Row } from 'antd';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import SeatSelection from '../components/SeatSelection';
import StripeCheckout from 'react-stripe-checkout';

// Stripe:PaymentIntent.create(
//   customer => customer.id,
//   amount => params[amount],
//   description => 'Rails Stripe transaction',
//   currency => 'inr',
// )


function Booknow() {
   const [selectedSeats,setSelectedSeats]=useState([]);
    const params = useParams()
    const dispatch = useDispatch();
    const [bus, setBus] = useState([]);

    const getBus = async () => {
        try {
          dispatch(ShowLoading());
          const response = await axiosInstance.post("/api/buses/get-bus-by-id", {_id:params.id});
          dispatch(HideLoading());
          if (response.data.success) {console.log(response.data.data)
            setBus(response.data.data);
          } else {
            message.error(response.data.message);
          }
        } catch (error) {
          dispatch(HideLoading());
          message.error(error.message);
        }
      };

      const bookNow = async (transactionId) => {
        try {
          dispatch(ShowLoading());
          const response = await axiosInstance.post("/api/bookings/book-seat", {
            bus: bus._id,
            seats: selectedSeats,
            transactionId,
          });
          dispatch(HideLoading());
          if (response.data.success) {
            message.success(response.data.message);
            // navigate("/bookings");
          } else {
            message.error(response.data.message);
          }
        } catch (error) {
          dispatch(HideLoading());
          message.error(error.message);
        }
      };

      const onToken=async(token)=>{
        try{
          dispatch(ShowLoading());
          const response =await axiosInstance.post("/api/bookings/make-payment",{
            token,
            amount: selectedSeats.length * bus.fare * 100,
          });
          dispatch(HideLoading());
          if(response.data.success)
          {
            message.success(response.data.message);
            bookNow(response.data.data.transactionId);
          }
          else
          {
            message.error(response.data.message)
          }
        }catch (error){
          dispatch(HideLoading());
          message.error(error.message);
        }
      };

    useEffect
    (() => {
        getBus();
      }, []);

  return (
    <div>
    {bus && (<Row className='mt-3' gutter={20}>
        <Col lg={12} xs={24} sm={24}>
            <h1 className='text-xl text-secondary'>{bus.name}</h1>
            <h1 className='text-md'>{bus.from}-{bus.to}</h1>
            <hr/>
            <div className='flex flex-col gap-1'>
                <h1 className='text-lg'><b>Fare</b> : {bus.fare}/-</h1>
                <h1 className='text-lg'><b>Departure Time</b> : {bus.departure}</h1>
                <h1 className='text-lg'><b>Arrival Time</b> {bus.arrival }</h1>
                <h1 className='text-lg'><b>Capacity</b> : {bus.capacity }</h1>
                {/* <h1 className='text-lg'><b>Seats Left</b> : {bus.capacity-bus.seatsBooked.length}</h1> */}
               

            </div>
           <hr/>

           <div className='flex flex-col gap-1'>
            <h1 className='text-2xl'>
              <b>Selected Seats</b>: {selectedSeats.join(",")}
            </h1> 
            <h1 className='text-2xl mt-2'>Price: Rs<b>{bus.fare*selectedSeats.length}</b></h1>
           </div>


      <StripeCheckout
      billingAddress
        token={onToken}
        amount={bus.fare * selectedSeats.length * 100}
        currency="INR"
        stripeKey="pk_test_51MqRR1SDx1AnvBM8yVwRLh2OTXOyGDdoq0TwV9UndHqiWU8XIN88iRLPOf4MrD9TpBsOoNdtEbdzJ0P9zRFacTJR00H0jUbrut">
        <button className={`btn btn-primary ${
          selectedSeats.length===0 && "disabled-btn"
         }`} onClick={bookNow} disabled={selectedSeats.length===0}>Book Now</button>
      </StripeCheckout>
          
           
        </Col>
        <Col lg={12} xs={24} sm={24}>
          <SeatSelection selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} bus={bus} />

        </Col>
     </Row>)}
    </div>
  )
}

export default Booknow
