import React from 'react';

const testimonials = [
  {
    name: 'Paul Starr',
    image:
      'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    rating: 5,
    feedback:
      'I absolutely love this AI content generator! The platform is intuitive, and the quality of the generated content is top-notch. It has saved me countless hours of brainstorming and drafting.',
  },
  {
    name: 'Amelia Doe',
    image:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80',
    rating: 4,
    feedback:
      "The AI does a fantastic job generating ideas and content quickly. I especially appreciate the multilingual support—it’s a rare feature that's incredibly useful.",
  },
  {
    name: 'Emma Brown',
    image:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    rating: 4,
    feedback:
      'This tool has completely transformed my workflow. The AI is fast and produces consistent, high-quality results. It’s perfect for managing my content needs across different languages. Highly recommended!',
  },
];

{/* @ts-ignore */}
function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5 text-violet-500">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${index < rating ? 'fill-current' : 'fill-gray-300'}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

{/* @ts-ignore */}
function TestimonialCard({ name, image, rating, feedback }) {
  return (
    <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-4">
        <img alt={name} src={image} className="h-14 w-14 rounded-full object-cover" />
        <div>
          <StarRating rating={rating} />
          <p className="mt-0.5 text-lg font-medium text-gray-900">{name}</p>
        </div>
      </div>
      <p className="mt-4 text-gray-700">{feedback}</p>
    </blockquote>
  );
}

function Testimonials() {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Read trusted reviews from our customers
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
