import { UserButton } from '@clerk/nextjs';
import { Search } from 'lucide-react';
import React from 'react';
import Emoji from 'react-input-emoji';

function Header() {
  return (
    <div className="p-6 shadow-sm border-b-2 bg-white flex justify-between items-center">
      <div className="flex gap-2 items-center p-2 border rounded-md max-w-lg bg-white">
        <Search />
        <input type="text" placeholder="Search..." className="outline-none" />
      </div>
      <div className='flex gap-5 items-center'>
        <h2 className="bg-primary p-3 rounded-full text-xs text-white px-3 mt-4 flex items-center gap-2">
          {/* Fire Emoji */}
          
            🔥 Join membership just for $9.99/Month
        </h2>
        <UserButton/>
      </div>
    </div>
  );
}

export default Header;
