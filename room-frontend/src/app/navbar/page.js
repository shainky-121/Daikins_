"use client";
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Building from '../building/page';


function Navbar({ sharedState, setSharedState }) {

  const [reqtem, setreqtem] = useState([]);
  const fetchReqTemp = ()=>{
    fetch("http://localhost:5000/api/reqtemp",{cache:"no-cache"}).then(
        response =>response.json()
      ).then(
        data => { 
            setreqtem(data);
          const firstEntry = data[0];
          setSharedState(firstEntry.reqtemperature);
        }
      )
  }

  const updatedBuild = async (buildid,upvalue) =>{
    const payload= {"reqtemperature":upvalue};  
    const response = await fetch(`http://localhost:5000/api/reqtemp/${buildid}`,{
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'content-type': 'application/json'
      }
    })
    const data = await response.json();
  if(data.status){
    fetchReqTemp();
    setSharedState(data.updatebuild.reqtemperature);
  alert('Building Request Temperature has been Updated'); 
  }
  }

  useEffect(() => {
    fetchReqTemp();
  },[])
  return (
    <>
<header className="text-gray-600 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <img src="https://www.shutterstock.com/image-photo/shanghaichinajan20th-2024-daikin-store-sign-260nw-2416429347.jpg" className="h-8" alt="Flowbite Logo" />
      <span className="ml-3 text-xl">Daikins</span>
    </a>
    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
    <Link href="/" className="mr-5 hover:text-gray-900">Show Rooms</Link>
    <Link href="/createroom" className="mr-5 hover:text-gray-900">Create Room</Link>
    </nav>
    {reqtem.map((element)=>{
    return ( 
       <Building key={element._id} id={element._id} reqtemp={element.reqtemperature} onBUpdate={updatedBuild}/>);
})}
  </div>
</header>
    </>
  )
}

export default Navbar
