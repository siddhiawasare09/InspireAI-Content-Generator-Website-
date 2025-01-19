'use client'
import React, { useRef, useState, useEffect } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  aiOutput: string;
}

function OutputSection({ aiOutput }: Props) {
  const editorRef = useRef<Editor | null>(null);
  const [content, setContent] = useState<string>(() => {
    // Load plain text content from localStorage or use a default value
    try {
      return typeof window !== 'undefined' && localStorage.getItem("editorContent") || "Your result will appear here";
    } catch (e) {
      return "Your result will appear here"; // Fallback if localStorage is unavailable
    }
  });

  // Update the editor with new content when aiOutput changes
  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown(aiOutput);
    }
  }, [aiOutput]);

  // Copy content to clipboard
  const handleCopy = () => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      const text = editorInstance.getMarkdown(); // Get markdown content
      navigator.clipboard.writeText(text)
        .then(() => alert("Content copied to clipboard!"))
        .catch((err) => console.error("Failed to copy content:", err));
    }
  };

  // Save content to localStorage
  const handleSave = () => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      const newContent = editorInstance.getMarkdown(); // Save plain text (markdown format)
      setContent(newContent);
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem("editorContent", newContent); // Save to localStorage
        }
        alert("Content saved successfully!");
      } catch (e) {
        console.error("Failed to save content to localStorage:", e);
      }
    }
  };

  // Clear editor content
  const handleClear = () => {
    setContent("Your result will appear here");
    if (typeof window !== 'undefined') {
      localStorage.removeItem("editorContent");
    }
  };

  // Update the content when editor content changes
  const handleEditorChange = () => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      const newContent = editorInstance.getMarkdown(); // Get plain text content
      setContent(newContent); // Update the state with new content
    }
  };

  return (
    <div className="bg-white shadow-lg border max-w-screen-md mx-auto p-5 rounded-lg">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold text-lg">Your Result</h2>
        <div className="flex gap-2">
          <Button onClick={handleCopy}>
            <Copy /> Copy
          </Button>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClear} variant="destructive">Clear</Button>
        </div>
      </div>
      <div className="custom-editor-container">
        <Editor
          ref={editorRef}
          height="600px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          initialValue={content} // Initialize with content
          onChange={handleEditorChange} // Handle editor content changes
        />
      </div>
    </div>
  );
}

export default OutputSection;
