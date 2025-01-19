import { Search } from 'lucide-react';
import React from 'react';

function Searchsection({onSearchInput}:any) {
  return (
    <div className="p-10 bg-gradient-to-br from-violet-400 via-violet-700 to-blue-700 flex flex-col justify-center items-center text-white">
      <h2 className='text-3xl font-bold'>Browse All Template</h2>
      <p>What would you like to create today?</p>
      <div className='w-full flex justify-center '>
        <div className='flex gap-2 items-center p-2 border rounded-md bg-white my-4 w-[50%]'>
          <Search className='text-primary'/>
          <input type='text' placeholder='Search' onChange={(event)=>onSearchInput(event.target.value)} className='bg-transparent w-full outline-none text-black'/>
        </div>
      </div>
    </div>
  );
}

export default Searchsection;
