import Templates from '@/app/(data)/Templates';
import React, { useEffect, useState } from 'react';
import TemplateCard from './TemplateCard';

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  form?: FORM[];
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

function TemplateListSection({ userSearchInput }: { userSearchInput: string }) {
  const [templateList, setTemplateList] = useState<TEMPLATE[]>(Templates);
  const [noResults, setNoResults] = useState<boolean>(false);

  useEffect(() => {
    console.log(userSearchInput);

    // Filter templates based on user search input
    if (userSearchInput) {
      const filteredTemplates = Templates.filter((template) =>
        template.name.toLowerCase().includes(userSearchInput.toLowerCase())
      );
      
      // Set filtered templates
      setTemplateList(filteredTemplates);
      
      // Check if no templates match the search input
      if (filteredTemplates.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } else {
      setTemplateList(Templates); // Reset to the full list when the search input is cleared
      setNoResults(false); // Reset noResults when search input is cleared
    }
  }, [userSearchInput]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10">
      {noResults ? (
        <p className="text-center text-gray-500 col-span-full">No results found</p>
      ) : (
        templateList.map((item) => (
          <TemplateCard key={item.slug} {...item} />
        ))
      )}
    </div>
  );
}

export default TemplateListSection;
