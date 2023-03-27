import React from 'react'
import { useSelector } from 'react-redux' 
import { axiosInstance } from '../helpers/axiosInstance';
import { HideLoading,ShowLoading } from '../redux/alertsSlice';
import { useState,useEffect } from 'react';
import { message,Col,Row } from 'antd';
import { useDispatch } from 'react-redux';
import Bus from '../components/Bus';

function Home() {
  const {user}=useSelector(state=>state.users)
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);
   
  
  const getBuses = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.get("/api/buses/get-all-buses", {});
      dispatch(HideLoading());
      if (response.data.success) {console.log(response.data.data)
        setBuses(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

    useEffect(() => {
      getBuses();
    }, []);
  return (
    <div>
      <div></div>
      <div>
        <Row>
           {buses.map((bus)=>{return(
            <Col lg={12} xs={24} sm={24}>
              <Bus bus={bus}/>
            </Col>
           )})}
          
        </Row>
      </div>
    </div>
  )
}

export default Home
