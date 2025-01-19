"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import React, { useContext, useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { totalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

interface HISTORY {
  aiResponse: string;
}

function UsageTrack() {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(totalUsageContext);
  const { updateCreditUsage } = useContext(UpdateCreditUsageContext);

  useEffect(() => {
    if (user) {
      // Fetch usage when the component mounts or when `updateCreditUsage` changes
      fetchHistoryAndCalculateUsage();
    }
  }, [user, updateCreditUsage]);

  /**
   * Fetch usage history for the logged-in user and calculate total usage.
   */
  const fetchHistoryAndCalculateUsage = async () => {
    try {
      // Fetch all AI outputs created by the logged-in user
      const result: HISTORY[] = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress));

      // Calculate and update the total usage in context
      calculateTotalUsage(result);
    } catch (error) {
      console.error("Error fetching history data:", error);
    }
  };

  /**
   * Calculate the total usage based on the fetched history.
   * @param history List of AI outputs from the database
   */
  const calculateTotalUsage = (history: HISTORY[]) => {
    let totalCharacters = 0;

    // Sum up the lengths of AI responses
    history.forEach((item) => {
      totalCharacters += item.aiResponse?.length || 0;
    });

    // Normalize usage (e.g., divide by 10 if 1 credit = 10 characters)
    const normalizedUsage = Math.round(totalCharacters / 10);
    setTotalUsage(normalizedUsage); // Update the context value
  };

  return (
    <div className="m-5">
      {/* Display Credit Usage */}
      <div className="bg-primary text-white p-3 rounded-lg">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{
              width: `${(totalUsage / 10000) * 100}%`, // Percentage of total limit
            }}
          ></div>
        </div>
        <h2 className="text-sm my-2">{totalUsage}/10,000 Credits Used</h2>
      </div>

      {/* Upgrade Button */}
      <Button variant="secondary" className="w-full my-3 text-primary">
        Upgrade
      </Button>
    </div>
  );
}

export default UsageTrack;
