'use client';
import { eq } from 'drizzle-orm';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react';

export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string;
  createdAt: string | null; // We'll assume this is a string for now.
}

// Fetch history from the database
async function fetchHistory(userEmail: string): Promise<HISTORY[]> {
  try {
    const records: HISTORY[] = await db
      .select()
      .from(AIOutput)
      .where(eq(AIOutput.createdBy, userEmail))
      .orderBy(AIOutput.createdAt, 'desc');

    return records;
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
}

// Function to categorize data by Today, Yesterday, and Previous Days
const categorizeByDate = (records: HISTORY[]): { today: HISTORY[], yesterday: HISTORY[], previousDays: HISTORY[] } => {
  const today: HISTORY[] = [];
  const yesterday: HISTORY[] = [];
  const previousDays: HISTORY[] = [];

  const currentDate = new Date();
  
  records.forEach((item) => {
    const createdAt = new Date(item.createdAt || '');

    // Check if it's today
    if (currentDate.toDateString() === createdAt.toDateString()) {
      today.push(item);
    }
    // Check if it's yesterday
    else if (
      currentDate.getDate() - createdAt.getDate() === 1 &&
      currentDate.getMonth() === createdAt.getMonth() &&
      currentDate.getFullYear() === createdAt.getFullYear()
    ) {
      yesterday.push(item);
    } else {
      previousDays.push(item);
    }
  });

  return { today, yesterday, previousDays };
};

function History() {
  const { user } = useUser();
  const [data, setData] = useState<HISTORY[] | undefined>(undefined);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchHistory(user.primaryEmailAddress.emailAddress)
        .then((records) => setData(records))
        .catch((err) => {
          console.error('Failed to fetch history', err);
          setData([]);
        });
    }
  }, [user]);

  const handleEditClick = (index: number, initialValue: string) => {
    setEditIndex(index);
    setEditValue(initialValue);
  };

  const handleSaveClick = async (id: number) => {
    if (editIndex !== null) {
      const updatedData = [...(data || [])];
      updatedData[editIndex].aiResponse = editValue;
      setData(updatedData);
      setEditIndex(null);
      await updateHistory(id, editValue); // Save the updated value to the database
    }
  };

  if (!user) {
    return <p>Please log in to view your history.</p>;
  }

  if (data === undefined) {
    return <p>Loading history...</p>;
  }

  if (data.length === 0) {
    return <p>No history available.</p>;
  }

  const categorizedData = categorizeByDate(data);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 shadow-md rounded-md">
      <h2 className="text-3xl font-bold text-violet-800 mb-4">History</h2>
      <h6 className="text-md text-gray-600 mb-6">Search your previously generated AI content</h6>

      {categorizedData.today.length > 0 && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-violet-700 mb-3">Today</h3>
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-violet-600 text-white">
                  <th className="border border-gray-200 px-4 py-3 text-left">Template</th>
                  <th className="border border-gray-200 px-4 py-3 text-left">AI Response</th>
                  <th className="border border-gray-200 px-4 py-3 text-left">Words</th>
                  <th className="border border-gray-200 px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {categorizedData.today.map((item, index) => (
                  <tr key={item.id} className={`hover:bg-purple-50 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                    <td className="border border-gray-200 px-4 py-3">{item.templateSlug}</td>
                    <td className="border border-gray-200 px-4 py-3 truncate">
                      {editIndex === index ? (
                        <textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 resize-y min-h-[60px]"
                        />
                      ) : (
                        item.aiResponse ? item.aiResponse.substring(0, 50) + '...' : 'No Response'
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      {item.aiResponse ? item.aiResponse.split(' ').length : 0}
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      {editIndex === index ? (
                        <button
                          onClick={() => handleSaveClick(item.id)}
                          className="text-green-600 font-medium hover:underline hover:text-green-500"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(index, item.aiResponse || '')}
                          className="text-violet-700 font-medium hover:underline hover:text-violet-500"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {categorizedData.yesterday.length > 0 && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-violet-700 mb-3">Yesterday</h3>
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-violet-600 text-white">
                  <th className="border border-gray-200 px-4 py-3 text-left">Template</th>
                  <th className="border border-gray-200 px-4 py-3 text-left">AI Response</th>
                  <th className="border border-gray-200 px-4 py-3 text-left">Words</th>
                  <th className="border border-gray-200 px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {categorizedData.yesterday.map((item, index) => (
                  <tr key={item.id} className={`hover:bg-purple-50 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                    <td className="border border-gray-200 px-4 py-3">{item.templateSlug}</td>
                    <td className="border border-gray-200 px-4 py-3 truncate">
                      {editIndex === index ? (
                        <textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 resize-y min-h-[60px]"
                        />
                      ) : (
                        item.aiResponse ? item.aiResponse.substring(0, 50) + '...' : 'No Response'
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      {item.aiResponse ? item.aiResponse.split(' ').length : 0}
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      {editIndex === index ? (
                        <button
                          onClick={() => handleSaveClick(item.id)}
                          className="text-green-600 font-medium hover:underline hover:text-green-500"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(index, item.aiResponse || '')}
                          className="text-violet-700 font-medium hover:underline hover:text-violet-500"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {categorizedData.previousDays.length > 0 && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-violet-700 mb-3">Previous Days</h3>
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-violet-600 text-white">
                  <th className="border border-gray-200 px-4 py-3 text-left">Template</th>
                  <th className="border border-gray-200 px-4 py-3 text-left">AI Response</th>
                  <th className="border border-gray-200 px-4 py-3 text-left">Words</th>
                  <th className="border border-gray-200 px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {categorizedData.previousDays.map((item, index) => (
                  <tr key={item.id} className={`hover:bg-purple-50 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                    <td className="border border-gray-200 px-4 py-3">{item.templateSlug}</td>
                    <td className="border border-gray-200 px-4 py-3 truncate">
                      {editIndex === index ? (
                        <textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 resize-y min-h-[60px]"
                        />
                      ) : (
                        item.aiResponse ? item.aiResponse.substring(0, 50) + '...' : 'No Response'
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      {item.aiResponse ? item.aiResponse.split(' ').length : 0}
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      {editIndex === index ? (
                        <button
                          onClick={() => handleSaveClick(item.id)}
                          className="text-green-600 font-medium hover:underline hover:text-green-500"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(index, item.aiResponse || '')}
                          className="text-violet-700 font-medium hover:underline hover:text-violet-500"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;
