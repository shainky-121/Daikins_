"use client";
import React, {useState} from 'react';
import Link from 'next/link';


function Room(data) {
    const {temperature,Heating,cooling,id,onDelete,name} = data;
    const [temperarture, Settemperarture] = useState(temperature);
    const [cool, setCool] = useState(cooling);
    const [heat, setHeat] = useState(Heating);
    const TempHeatColor = heat ? 'text-red-500' : '';
    const TempCoolColor = cool ? 'text-green-500' : '';
    const IsenableHeat =  heat ? true : false;
    const IsenableCool =  cool ? true : false;


    const handleDelete = (id) =>{
        const shouldRemove = confirm("are you sure you want to delete?")
        if (shouldRemove) {
            onDelete(id);
        }
    }

  return (
    <>
      <div className="xl:w-1/4 md:w-1/2 p-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 ">
          <h3 className={`tracking-widest ${TempHeatColor} ${TempCoolColor}  text-xs font-medium title-font`}>Room Id : {id}</h3>
          <h2 className={`text-lg  ${TempHeatColor} ${TempCoolColor}  font-semibold title-font mb-4`}>{name}</h2>
          <div className="flex place-content-center ">
    <div className="flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`w-24 h-24 p-4 dark:text-yellow-600 fill-current  ${TempHeatColor} ${TempCoolColor}`}>
            <path d="M256,104c-83.813,0-152,68.187-152,152s68.187,152,152,152,152-68.187,152-152S339.813,104,256,104Zm0,272A120,120,0,1,1,376,256,120.136,120.136,0,0,1,256,376Z"></path>
            <rect width="32" height="48" x="240" y="16"></rect>
            <rect width="32" height="48" x="240" y="448"></rect>
            <rect width="48" height="32" x="448" y="240"></rect>
            <rect width="48" height="32" x="16" y="240"></rect>
            <rect width="32" height="45.255" x="400" y="393.373" transform="rotate(-45 416 416)"></rect>
            <rect width="32.001" height="45.255" x="80" y="73.373" transform="rotate(-45 96 96)"></rect>
            <rect width="45.255" height="32" x="73.373" y="400" transform="rotate(-45.001 96.002 416.003)"></rect>
            <rect width="45.255" height="32.001" x="393.373" y="80" transform="rotate(-45 416 96)"></rect>
        </svg>
    </div>
    <span className={`font-bold text-6xl mt-[20px] ${TempHeatColor} ${TempCoolColor}`}>{temperarture}°</span>
</div>
<ul role="list" className="max-w-sm divide-y divide-gray-200 dark:divide-gray-700">
<li className="py-3 sm:py-4">
    <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className="flex-shrink-0">
            <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/8101/8101790.png" alt="Neil image" />
        </div>
        <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold text-gray-900 truncate dark:text-white ${TempCoolColor}`}>
                Cooling
            </p>            </div>
            <label className="inline-flex items-center me-5 cursor-pointer">
<input type="checkbox" value="" className="sr-only peer" checked={IsenableCool} disabled/>
<div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
</label>

    </div>
</li>
<li className="py-3 sm:py-4">
    <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className="flex-shrink-0">
            <img className="w-8 h-8 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnRE-zzTqcLtgMqh8LhDBFcCydL0x7uVyw0CnRCDxnsA&s" alt="Neil image" />
        </div>
        <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold text-gray-900 truncate dark:text-white  ${TempHeatColor}`}>
                Heating
            </p>
        </div>
        <label className="inline-flex items-center me-5 cursor-pointer">
<input type="checkbox" value="" className="sr-only peer" checked={IsenableHeat} disabled/>
<div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
        </label>                       
    </div>
</li>
</ul>
<div className='p-[20px] w-[100%]'>
<center><label htmlFor="default-range" className="text-sm font-semibold text-gray-900 truncate dark:text-white">Adjust Temperature To  <span className={`${TempHeatColor} ${TempCoolColor}`}>{temperarture}<sup>0</sup> </span>C</label></center>
<input id="default-range" type="range" value={temperarture} className="w-full h- rounded-lg appearance-none cursor-pointer bg-blue-100" onChange={e => Settemperarture(e.target.value)} disabled/>
</div>
<div className="flex w-full mt-4 md:mt-6">
        <Link href={`/updateroom/${[id]}`} id={id} className="inline-flex items-center px-8 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit Room</Link>&nbsp;
        <button type="button" id={id} onClick={()=> handleDelete(id)} className="inline-flex items-center px-8 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete Room</button>
    </div>


        </div>
      </div>
    </>
  )
}

export default Room
