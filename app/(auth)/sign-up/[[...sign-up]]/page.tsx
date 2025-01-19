import Header from '@/app/_components/Header';
import { SignUp } from '@clerk/nextjs'

export default function Page() {
   return (
    <div>
<Header/>
<div className='flex items-center justify-center h-screen'>
       
       <SignUp />
     </div>
    </div>
     
    );
}