"use client";

import React, { useContext, useEffect, useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import Templates from "@/app/(data)/Templates";
import { TEMPLATE } from "../../_components/TemplateListSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { chatSession } from "@/utils/AiModal";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { totalUsageContext } from "@/app/(context)/TotalUsageContext";
import { useRouter } from "next/navigation";

// Define PageParams correctly
interface PageParams {
  "template-slug": string;
}

// The props expected by the CreateNewContent component
interface PageProps {
  params: PageParams; // This is how the dynamic params should be passed in Next.js 13+
}

const CreateNewContent = ({ params }: PageProps) => {
  const [templateSlug, setTemplateSlug] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TEMPLATE | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>(" ");
  const { user } = useUser();
  const router = useRouter();
  const { totalUsage, setTotalUsage } = useContext(totalUsageContext);

  useEffect(() => {
    const fetchParams = () => {
      try {
        const slug = params["template-slug"];
        setTemplateSlug(slug);

        // Find the selected template
        const template = Templates.find((item) => item.slug === slug);
        setSelectedTemplate(template);
      } catch (error) {
        console.error("Error fetching params:", error);
      }
    };

    fetchParams();
  }, [params]);

  const GenerateAIContent = async (formData: any) => {
    if (totalUsage >= 10000) {
      console.log("Please Upgrade");
      router.push("/dashboard/billing");
      return;
    }

    try {
      setLoading(true);
      const selectedPrompt = selectedTemplate?.aiPrompt;
      const finalAiPrompt = `${JSON.stringify(formData)}, ${selectedPrompt}`;

      const result = await chatSession.sendMessage(finalAiPrompt);
      const aiResponse = await result.response.text();

      setAiOutput(aiResponse);
      await SaveInDb(formData, selectedTemplate?.slug, aiResponse);

      // Directly update credits without recalculating from the database
      UpdateUsage(aiResponse);
    } catch (error) {
      console.error("Error generating AI content:", error);
    } finally {
      setLoading(false);
    }
  };

  const SaveInDb = async (formData: any, slug: string | undefined, aiResp: string) => {
    try {
      const validatedSlug = slug || "unknown-template-slug";
      const validatedCreatedBy = user?.primaryEmailAddress?.emailAddress || "unknown-user";

      await db.insert(AIOutput).values({
        formData: JSON.stringify(formData),
        templateSlug: validatedSlug,
        aiResponse: aiResp || "",
        createdBy: validatedCreatedBy,
        createdAt: moment().format("DD/MM/yyyy"),
      });

      console.log("Data saved successfully to the database.");
    } catch (error) {
      console.error("Error saving to database:", error);
    }
  };

  const UpdateUsage = (aiResponse: string) => {
    const newUsage = Math.round(aiResponse.length / 10); // Adjust the factor if needed
    setTotalUsage((prevUsage: number) => prevUsage + newUsage); // Increment credits dynamically
  };

  if (!templateSlug) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      {/* Back Button */}
      <div className="mb-3">
        <Link href="/dashboard" passHref>
          <Button className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {/* Form Section */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
        />
        {/* Output Section */}
        <OutputSection aiOutput={aiOutput} />
      </div>
    </div>
  );
};

export default CreateNewContent;
