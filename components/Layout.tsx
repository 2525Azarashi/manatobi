
import React from 'react';
import { AppTab } from '../types.ts';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-blue-200 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h1 className="text-xl font-black text-gray-900 tracking-tighter">マナトビ</h1>
          </div>
          
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => onTabChange(AppTab.UPLOAD)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === AppTab.UPLOAD
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-100 scale-105'
                  : 'text-gray-400 hover:bg-gray-50 active:scale-95'
              }`}
            >
              スキャン
            </button>
            <button
              onClick={() => onTabChange(AppTab.GALLERY)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === AppTab.GALLERY
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-100 scale-105'
                  : 'text-gray-400 hover:bg-gray-50 active:scale-95'
              }`}
            >
              リスト
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-10">
        {children}
      </main>

      <footer className="py-12 text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
        </div>
        <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
          &copy; 2024 マナトビ. Built for your growth.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
