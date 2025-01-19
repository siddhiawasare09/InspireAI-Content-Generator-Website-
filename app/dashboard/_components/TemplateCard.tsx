import React from 'react';
import { TEMPLATE } from './TemplateListSection';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function TemplateCard(item: TEMPLATE) {
  const router = useRouter();

  const handleCardClick = () => {
    // Navigate to the desired route with the item's slug
    router.push(`/dashboard/content/${item.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="p-5 shadow-md rounded-md border bg-white flex flex-col gap-3 cursor-pointer hover:scale-105 transition-all"
    >
      <Image src={item.icon} alt="icon" width={50} height={50} />
      <h2 className="font-medium text-lg">{item.name}</h2>
      <p className="text-gray-500 line-clamp-3">{item.desc}</p>
    </div>
  );
}

export default TemplateCard;
