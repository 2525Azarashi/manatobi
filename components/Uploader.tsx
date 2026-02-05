
import React, { useState, useRef } from 'react';

interface UploaderProps {
  onFilesSelected: (files: File[]) => void;
}

const Uploader: React.FC<UploaderProps> = ({ onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`relative cursor-pointer border-2 border-dashed rounded-3xl p-12 transition-all duration-300 flex flex-col items-center justify-center text-center space-y-4 ${
        isDragging
          ? 'border-indigo-500 bg-indigo-50'
          : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
      }`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        multiple
      />
      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800">写真をアップロード</h3>
        <p className="text-gray-500 mt-1">ドラッグ＆ドロップ、またはクリックしてファイルを選択</p>
      </div>
      <div className="pt-2">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full">
          JPG, PNG, WebP Support
        </span>
      </div>
    </div>
  );
};

export default Uploader;
