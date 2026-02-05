
import React from 'react';
import { AppTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-blue-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-blue-200 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.246.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">マナトビ</h1>
          </div>
          
          <nav className="flex space-x-2">
            <button
              onClick={() => onTabChange(AppTab.UPLOAD)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === AppTab.UPLOAD
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              分析・登録
            </button>
            <button
              onClick={() => onTabChange(AppTab.GALLERY)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === AppTab.GALLERY
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              復習リスト
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 py-8 text-center text-gray-400 text-xs">
        &copy; 2024 マナトビ - Learning Support Archive. 
      </footer>
    </div>
  );
};

export default Layout;
