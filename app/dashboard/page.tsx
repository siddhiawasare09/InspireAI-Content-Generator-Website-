"use client";
import React, { useState } from "react";
import Searchsection from "./_components/searchSection";
import TemplateListSection from "./_components/TemplateListSection";

function Dashboard() {
  const [userSearchInput, setUserSearchInput] = useState<string>("");

  return (
    <div>
      {/* Search Section */}
      <Searchsection onSearchInput={(value: string) => setUserSearchInput(value)} />
      {/* Template List Section */}
      <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  );
}

export default Dashboard;
