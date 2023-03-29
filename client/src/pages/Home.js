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
  const [filters,setFilters] =useState({})
  
  const getBuses = async () => {
    const tempFilters={};
    Object.keys(filters).forEach((key)=>{
      if(filters[key])
      {
        tempFilters[key]=filters[key];
      }
    })
    // , tempFilters
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.get("/api/buses/get-all-buses");
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
      <div className='my-3 card p-2'>
        <Row gutter={10}>
          <Col lg={6} sm={24}>
              <input type="text" placeholder='From' value={filters.from} onChange={(e)=>setFilters({...filters, from:e.target.value})}/>
          </Col>
          <Col lg={6} sm={24}>
            <input type="text" placeholder='To' value={filters.to}
            onChange={(e)=>setFilters({...filters,to:e.target.value})}/>
          </Col>
          <Col lg={6} sm={24}>
            <input type="date" placeholder='Date' value={filters.journeyDate}
            onChange={(e)=>setFilters({...filters,journeyDate:e.target.value})}/>
          </Col>
          <Col lg={6} sm={24}>
            <button className='btn btn-primary' onClick={()=>getBuses()
            }>Search</button>
          </Col>
        </Row>
      </div>
      <div>
        <Row gutter={[15,15]}>
           {buses.filter((bus)=>bus.status==='Yet To Start').map((bus)=>(
            <Col lg={12} xs={24} sm={24}>
              <Bus bus={bus}/>
            </Col>
           ))}
          
        </Row>
      </div>
    </div>
  )
}

export default Home
