import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarLeft } from "@/components/Sidebar/Sidebar";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [availableTags] = useState<string[]>(["Health", "Lifestyle", "Food"]); // Predefined tags
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput) && tags.length < 5) {
      setTags([...tags, tagInput]);
      setTagInput("");
      setDropdownVisible(false); // Hide dropdown after adding a new tag
    }
  };

  const handleSelectTag = (tag: string) => {
    if (!tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
    }
    setTagInput(""); // Clear input field when a tag is selected
    setDropdownVisible(false); // Hide dropdown after selecting a tag
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
          </div>
        </header>
        <div className="flex justify-center w-full pt-8 lg:p-0 p-4">
          <div className="max-w-screen-lg w-full">
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              maxLength={80}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              placeholder="Title"
            />
            <TextEditor onChange={setDescription} />

            {/* Tag Dropdown */}
            <div className="mt-4 relative">
              <input
                id="tag-input"
                type="text"
                value={tagInput}
                onChange={(e) => {
                  setTagInput(e.target.value);
                  setDropdownVisible(true); // Show dropdown when typing
                }}
                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                placeholder="Tags"
              />

              {/* Dropdown for available tags */}
              {dropdownVisible && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-auto">
                  {availableTags
                    .filter(
                      (tag) =>
                        tag.toLowerCase().includes(tagInput.toLowerCase()) &&
                        !tags.includes(tag)
                    )
                    .map((tag, index) => (
                      <div
                        key={index}
                        className="cursor-pointer hover:bg-blue-100 p-2 text-black" // Change text color to black
                        onClick={() => handleSelectTag(tag)}
                      >
                        {tag}
                      </div>
                    ))}
                  {tagInput && !availableTags.includes(tagInput) && (
                    <div
                      className="cursor-pointer hover:bg-blue-100 p-2 text-black" // Change text color to black
                      onClick={handleAddTag}
                    >
                      Add "{tagInput}"
                    </div>
                  )}
                </div>
              )}

              {/* Display selected tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-teal-100 text-teal-700 text-sm font-medium py-1 px-2 rounded-full shadow-md transition duration-300 ease-in-out hover:shadow-lg transform hover:scale-105"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-teal-500 hover:text-teal-700 focus:outline-none"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                if (title && description) {
                  console.log({ title, description, tags });
                } else {
                  alert("Please add a title and content.");
                }
              }}
            >
              Publish
            </button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

function TextEditor({ onChange }: { onChange: (value: string) => void }) {
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    onChange(content);
  };

  return (
    <div className="mt-4">
      <ReactQuill
        value={editorContent}
        onChange={handleEditorChange}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["image"],
          ],
        }}
        formats={[
          "header",
          "font",
          "list",
          "bullet",
          "bold",
          "italic",
          "underline",
          "strike",
          "color",
          "background",
          "align",
          "image",
        ]}
        placeholder="Write an article"
        className="bg-white rounded-lg border p-2 text-black"
        style={{
          minHeight: "300px",
        }}
      />
    </div>
  );
}
