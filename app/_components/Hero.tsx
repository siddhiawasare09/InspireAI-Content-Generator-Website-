'use client'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React from 'react';

function Hero() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  const handleSignInClick = () => {
    router.push('/sign-in');
  };

  const handleLearnMoreClick = () => {
    router.push('/learn-more');
  };

  return (
    <section className="bg-gradient-to-r from-violet-100 via-violet-200 to-violet-400 text-gray-700">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className="bg-gradient-to-r from-purple-400 via-violet-500 to-violet-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
          >
            Create High-Quality 
            <span className="sm:block"> Content With <span className='text-violet-800'>InspireAI</span></span> 
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Your Ultimate AI Partner for Limitless Content Creation.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              className="block w-full rounded border border-violet-600 bg-violet-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              onClick={handleSignInClick}
            >
              Start 15 Days Trial
            </button>

            <button
              className="block w-full rounded border border-violet-600 px-12 py-3 text-sm font-medium text-black hover:bg-violet-600 hover:text-white focus:outline-none focus:ring active:bg-violet-500 sm:w-auto"
              onClick={handleLearnMoreClick}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
