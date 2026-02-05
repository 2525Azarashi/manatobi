
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Uploader from './components/Uploader';
import GalleryItem from './components/GalleryItem';
import { TestReviewItem, AppTab } from './types';
import { transcribeImage } from './services/ocrService';

const App: React.FC = () => {
  const [items, setItems] = useState<TestReviewItem[]>([]);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.UPLOAD);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('manatobi_local_archives');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load archives", e);
      }
    }
    setIsLoadingInitial(false);
  }, []);

  useEffect(() => {
    if (!isLoadingInitial) {
      localStorage.setItem('manatobi_local_archives', JSON.stringify(items));
    }
  }, [items, isLoadingInitial]);

  const processFile = async (file: File) => {
    const id = Math.random().toString(36).substring(2, 9);
    const imageUrl = URL.createObjectURL(file);
    
    const newItem: TestReviewItem = {
      id,
      timestamp: Date.now(),
      imageUrl,
      fileName: file.name,
      transcription: '',
      analysis: {
        subject: '',
        notes: ''
      },
      status: 'processing',
      progress: 0
    };

    setItems(prev => [newItem, ...prev]);
    setActiveTab(AppTab.GALLERY);

    try {
      const text = await transcribeImage(imageUrl, (progress) => {
        setItems(prev => prev.map(item => 
          item.id === id ? { ...item, progress } : item
        ));
      });
      
      setItems(prev => prev.map(item => 
        item.id === id 
          ? { 
              ...item, 
              transcription: text,
              status: 'completed' 
            } 
          : item
      ));
    } catch (error: any) {
      setItems(prev => prev.map(item => 
        item.id === id 
          ? { ...item, status: 'error', errorMessage: error.message || "読み取り失敗" } 
          : item
      ));
    }
  };

  const handleFilesSelected = (files: File[]) => {
    files.forEach(processFile);
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => {
      const item = prev.find(i => i.id === id);
      if (item) URL.revokeObjectURL(item.imageUrl);
      return prev.filter(i => i.id !== id);
    });
  };

  const handleUpdateNotes = (id: string, notes: string, subject: string) => {
    setItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, analysis: { notes, subject } } 
        : item
    ));
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === AppTab.UPLOAD ? (
        <div className="max-w-3xl mx-auto py-12 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
            テストを見直して、<br/>
            <span className="text-blue-600">苦手を克服。</span>
          </h2>
          <p className="text-gray-500 mb-10 text-lg leading-relaxed">
            間違えた問題を写真に撮るだけ。マナトビが文字起こしをサポートし、<br/>
            あなただけの復習プランとミスの傾向分析を蓄積します。
          </p>
          <Uploader onFilesSelected={handleFilesSelected} />
          
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 transition-transform hover:-translate-y-1">
              <div className="text-blue-600 mb-4 flex justify-center">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <h3 className="font-bold text-gray-900">1. 撮影</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">間違えた問題やノートを撮影してアップ。プライバシーは端末内で守られます。</p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 transition-transform hover:-translate-y-1">
              <div className="text-indigo-500 mb-4 flex justify-center">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </div>
              <h3 className="font-bold text-gray-900">2. 分析</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">自動抽出されたテキストを参考に、ミスの原因を鋭く特定しましょう。</p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 transition-transform hover:-translate-y-1">
              <div className="text-green-600 mb-4 flex justify-center">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
              </div>
              <h3 className="font-bold text-gray-900">3. 対策</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">次回への対策案をメモして、自分の学習スタイルをアップデート。</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">復習アーカイブ</h2>
              <p className="text-sm text-gray-500 mt-1">蓄積された {items.length} 件の学習データ</p>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-gray-200">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.246.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-gray-400 mb-8 font-medium">まだデータがありません。テストの写真を撮って復習を始めましょう。</p>
              <button 
                onClick={() => setActiveTab(AppTab.UPLOAD)} 
                className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
              >
                写真を読み込む
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {items.map(item => (
                <GalleryItem 
                  key={item.id} 
                  item={item} 
                  onDelete={handleDeleteItem}
                  onUpdateNotes={handleUpdateNotes}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default App;
