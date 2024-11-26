import React, { useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";

interface PlaylistUrlInputProps {
  onChange: (urls: string[]) => void;
  initialUrls?: string[];
  className?: string;
}

const PlaylistUrlInput: React.FC<PlaylistUrlInputProps> = ({
  onChange,
  initialUrls = [""],
  className = "",
}) => {
  const [urls, setUrls] = useState<string[]>(initialUrls);

  // Send only valid URLs to parent component
  useEffect(() => {
    const validUrls = urls.filter((url) => url.trim() !== "");
    onChange(validUrls);
  }, [urls, onChange]);

  const addNewUrl = () => {
    setUrls([...urls, ""]);
  };

  const removeUrl = (index: number) => {
    if (urls.length === 1) return;
    const newUrls = urls.filter((_, idx) => idx !== index);
    setUrls(newUrls);
  };

  const handleUrlChange = (index: number, newUrl: string) => {
    const newUrls = [...urls];
    newUrls[index] = newUrl;
    setUrls(newUrls);
  };

  return (
    <div
      className={`w-full bg-gray-800 rounded-lg ${className} max-h-[300px] overflow-y-auto`}
    >
      <h4 className=" block text-sm font-medium leading-6 text-white uppercase pb-1">
        Playlist
      </h4>
      <div className="space-y-3">
        {urls.map((url, index) => (
          <div key={index} className="flex gap-2">
            <div className="flex-grow relative">
              <input
                type="url"
                value={url}
                onChange={(e) => handleUrlChange(index, e.target.value)}
                placeholder="Enter playlist URL"
                className="w-full bg-gray-900 text-gray-100 px-4 py-2 rounded-md 
                         border border-gray-700 focus:outline-none focus:border-purple-500 
                         pl-8 placeholder-gray-500"
              />
              <span className="absolute left-3 top-2 text-gray-400 text-sm">
                {index + 1}.
              </span>
            </div>

            <button
              type="button"
              onClick={() => removeUrl(index)}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              title="Remove URL"
            >
              <FiDelete size={20} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addNewUrl}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 
                   transition-colors focus:outline-none mt-2"
        >
          <BiPlus size={20} />
          Add More URLs
        </button>
      </div>
    </div>
  );
};

export default PlaylistUrlInput;
