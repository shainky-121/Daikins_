"use client"
import React, {useEffect, useState} from 'react'
import Navbar from '@/app/navbar/page';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

function UpdateRoom() {
  const [sharedState, setSharedState] = useState('');
  const handleStateChange = (newValue) => {
    setSharedState(newValue);
  };
  const locast = sharedState;
    const router = useRouter();
    const [update, Setupdate] = useState({
            "temperature": 0,
            "cooling": false,
            "Heating": false,
     });
     const [uroomModified, setRroomModified] = useState(false);

    const params = useParams();
     useEffect(() => {
        fetch("http://localhost:5000/api/rooms/"+params.roomid).then(
          response =>response.json()
        ).then(
          data => {
            if(data.status){
                Setupdate(data.data)
            }
          }
        )
      },[])

    const { temperature,Heating,cooling,name} = update;

      const handlecooling = (e) => {
        const cooling =    e.currentTarget.value === 'cool' ? true: false;
        Setupdate({
            "temperature": temperature,
            "cooling": cooling,
            "Heating": false,
            "name":name
        })
        setRroomModified(true);
      }
      const handleHeating = (e) => {
          const Heating =    e.currentTarget.value === 'heat' ? true: false;
          Setupdate({
            "temperature": temperature,
            "cooling": false,
            "Heating": Heating,
            "name":name
        })
        setRroomModified(true);
     }
     const handleTemperature = (temp) => {
      
      const heaty = Number(temp) >= Number(locast) ? true : false;
      const cooly = Number(temp) < Number(locast)  ? true : false;

        Setupdate({
          "temperature": temp,
          "cooling": cooly,
          "Heating": heaty,
          "name":name
      })
      setRroomModified(true);
   }
   const handlename = (value) =>{
    Setupdate({
      "temperature": temperature,
      "cooling": cooling,
      "Heating": Heating,
      "name":value
  })
  setRroomModified(true);
   }

   let Err ;
   const handleUpdate =  async () => {
    const datapayload = {temperature, cooling,Heating, name}
    if(uroomModified){
        Err = '';
             try {
               const res = await fetch(`http://localhost:5000/api/rooms/${params.roomid}`,{
                 method: 'PUT',
                 body: JSON.stringify(datapayload),
                 headers: {
                   'content-type': 'application/json'
                 }
               })
               if(res.status){
                 alert("Room Has been Updated!");
                 router.push('/');
               }else{
                 console.log("Oops! Something is wrong.")
               }
             } catch (error) {
                 console.log(error)
             }
           return false;
     }else{
     Err = `<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">Something went wrong. Please try again.</span>
    </div>`;

     }
    }
    
  return (
    <>
<Navbar  sharedState={sharedState} setSharedState={handleStateChange}/>

    <form action={handleUpdate} >
    <section className="text-white-600 body-font">
      <div className="container px-5 py-1o mx-auto">
        <div className="flex flex-wrap -m-4 justify-center items-center">
        <div className="xl:w-1/4 md:w-1/2 p-4">
        <p className='text-3xl font-medium p-4 italic'>Update Your Room</p>
        <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 ">
        <ul role="list" className="max-w-sm divide-y divide-gray-200 dark:divide-gray-700">
    <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="flex-shrink-0">
                <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/8101/8101790.png" alt="Neil image" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                    Cooling
                </p>            </div>
                <label className="inline-flex items-center me-5 cursor-pointer">
  <input type="radio" checked={cooling} disabled id="cooling" name="status" value="cool" className="hidden peer"  onChange={e => handlecooling(e)} />
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
                <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                    Heating
                </p>

            </div>
            <label className="inline-flex items-center me-5 cursor-pointer">
  <input type="radio" checked={Heating} id="Heating" disabled name="status" value="heat" className="hidden peer"   onChange={e => handleHeating(e)}  />
  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
</label>                            
        </div>
    </li>
</ul>
                <div className='p-[20px] w-[100%]'>
<center><label htmlFor="default-range" className="text-sm font-semibold text-gray-900 truncate dark:text-white">Adjust Temperature To {temperature}<sup>0</sup> C</label></center>
<input id="default-range" type="range" name="temperatiure" value={temperature} className="w-full h-2rounded-lg appearance-none cursor-pointer dark:bg-gray-700 bg-gray-200 "   onChange={e => handleTemperature(e.target.value)} />
</div>
    <div className="relative mb-4">
        <input type='text' value={name} placeholder='Please Enter Room Name' onChange={(e)=>handlename(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className='p-[20px] w-[100%] flex justify-center items-center'>
      <button type="submit" className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2">
<svg aria-hidden="true" className="w-10 h-3 me-2 -ms-1" viewBox="0 0 256 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.812 0L0 63.76H34.492L38.768 53.594H48.542L52.818 63.76H90.784V56.001L94.167 63.76H113.806L117.189 55.837V63.76H196.148L205.749 53.858L214.739 63.76L255.294 63.842L226.391 32.058L255.294 0H215.368L206.022 9.71899L197.315 0H111.418L104.042 16.457L96.493 0H62.073V7.495L58.244 0C58.244 0 28.812 0 28.812 0ZM35.486 9.05399H52.299L71.41 52.29V9.05399H89.828L104.589 40.054L118.193 9.05399H136.519V54.806H125.368L125.277 18.955L109.02 54.806H99.045L82.697 18.955V54.806H59.757L55.408 44.549H31.912L27.572 54.797H15.281C15.281 54.797 35.486 9.05399 35.486 9.05399ZM146.721 9.05399H192.063L205.931 24.034L220.246 9.05399H234.114L213.043 32.049L234.114 54.779H219.617L205.749 39.625L191.361 54.779H146.721V9.05399ZM43.665 16.795L35.924 35.067H51.397L43.665 16.795ZM157.918 18.527V26.879H182.654V36.188H157.918V45.306H185.663L198.555 31.876L186.21 18.519H157.918V18.527Z" fill="white"/></svg>
Create Room
</button>
      </div>
       </div>
      </div>

      </div>
      </div>
    </section>
    </form>

    </>
  )
}

export default UpdateRoom
