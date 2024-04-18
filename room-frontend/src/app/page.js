"use client";
import React, { useEffect, useState} from 'react';
import Navbar from './navbar/page';
import Room from './room/page';


function page() {
const [initialdata, setinitialdata] = useState([]);
const [sharedState, setSharedState] = useState('');
const handleStateChange = (newValue) => {
  setSharedState(newValue);
};

const fetchAllRoom = ()=>{
  fetch("http://localhost:5000/api/rooms",{cache:"no-cache"}).then(
      response =>response.json()
    ).then(
      data => { 
         setinitialdata(data);
      }
    )
}
  useEffect(() => {
    fetchAllRoom();
  },[])

  const deleteRoom = async (roomid) =>{
    const response = await fetch(`http://localhost:5000/api/rooms/${roomid}`,{
        method: 'DELETE',
    })
    const data = await response.json();
if(data.status){
  fetchAllRoom();
  alert('Room has been deleted'); 
}

}


  return (
    <>
<Navbar  sharedState={sharedState} setSharedState={handleStateChange}/>

<section className="text-white-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
  {initialdata.map((element,index)=>{
    return (
          <Room key={element._id} id={element._id}  Heating={element.Heating} cooling={element.cooling} temperature={element.temperature} name={element.name}  onDelete={deleteRoom}/>
  );})} 
        </div>
    </div>
    </section>
    </>
  )
}

export default page
