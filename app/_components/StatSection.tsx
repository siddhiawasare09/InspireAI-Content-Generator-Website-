import React from 'react';

function StatSection() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Empowering Creators with AI-Generated Content
        </h2>
        <p className="mt-4 text-gray-500 sm:text-xl">
          Transform your content creation process with cutting-edge AI tools. From blogs to social media, we help businesses scale effortlessly.
        </p>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col rounded-lg bg-violet-50 px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-500">Content Generated</dt>
          <dd className="text-4xl font-extrabold text-violet-600 md:text-5xl">1.2M+</dd>
        </div>

        <div className="flex flex-col rounded-lg bg-violet-50 px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-500">Satisfied Users</dt>
          <dd className="text-4xl font-extrabold text-violet-600 md:text-5xl">50k+</dd>
        </div>

        <div className="flex flex-col rounded-lg bg-violet-50 px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-500">AI Models Used</dt>
          <dd className="text-4xl font-extrabold text-violet-600 md:text-5xl">12+</dd>
        </div>

        <div className="flex flex-col rounded-lg bg-violet-50 px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-500">Content Requests</dt>
          <dd className="text-4xl font-extrabold text-violet-600 md:text-5xl">3M+</dd>
        </div>
      </dl>
    </div>
  );
}

export default StatSection;
