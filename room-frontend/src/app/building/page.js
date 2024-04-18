import React, { useState } from 'react'

function Building(data) {
    const {reqtemp, id, onBUpdate} = data;
    const [iRtemp, SetiRtemp] = useState(reqtemp)    
    const SetReqtemperarture = (value) => {
        SetiRtemp(value)
        }

        const handleBupdate = (id,iRtemp) =>{
            onBUpdate(id,iRtemp);
        }

  return (
    <>
    <input type="number" className="w-12 px-0 py-1 border border-gray-800 border-r-1 mr-1" max="100" min="0"  value={iRtemp} onChange={e => SetReqtemperarture(e.target.value)}  />
    <button className="inline-flex items-center text-white bg-gray-600 border-0 py-1 px-3 focus:outline-none hover:bg-gray-500 rounded text-base mt-4 md:mt-0"  id={id} onClick={()=> handleBupdate(id,iRtemp)}>Change Building Temperature
      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>

    </>
  )
}

export default Building
