
import React, { useState } from 'react';
import { TestReviewItem } from '../types.ts';

interface GalleryItemProps {
  item: TestReviewItem;
  onDelete: (id: string) => void;
  onUpdateNotes: (id: string, notes: string, subject: string) => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item, onDelete, onUpdateNotes }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(item.analysis.notes);
  const [subject, setSubject] = useState(item.analysis.subject);
  const isProcessing = item.status === 'processing';

  const handleSave = () => {
    onUpdateNotes(item.id, notes, subject);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-blue-100 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden shrink-0">
        <img
          src={item.imageUrl}
          alt={item.fileName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex space-x-2">
          <span className="px-3 py-1 bg-white/90 text-blue-700 text-[10px] font-bold rounded-full shadow-sm border border-blue-100">
            {item.analysis.subject || '未設定'}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 bg-white/90 hover:bg-red-500 hover:text-white text-gray-400 rounded-full transition-all shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
        {isProcessing && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center p-6 text-center">
              <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-blue-600 text-sm font-bold">文字を解析中... {item.progress}%</p>
              <p className="text-[10px] text-gray-400 mt-1">端末内で安全に処理しています</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        {item.status === 'error' ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs">読み取りに失敗しました。</div>
        ) : !isProcessing && (
          <div className="space-y-4 flex-1 flex flex-col">
            <div className="flex justify-between items-start">
              <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest">復習メモ</h4>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="text-[10px] text-gray-400 hover:text-blue-600 font-bold">編集</button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-3">
                <input 
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="教科を入力 (例: 数学)"
                  className="w-full text-xs p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                />
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="間違えた原因や対策をメモ..."
                  className="w-full text-sm p-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 outline-none min-h-[100px] resize-none"
                />
                <div className="flex space-x-2">
                  <button onClick={handleSave} className="flex-1 bg-blue-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors">保存</button>
                  <button onClick={() => setIsEditing(false)} className="px-4 bg-gray-100 text-gray-500 text-xs font-bold py-2 rounded-lg">キャンセル</button>
                </div>
              </div>
            ) : (
              <div className="flex-1">
                {item.analysis.notes ? (
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{item.analysis.notes}</p>
                ) : (
                  <p className="text-sm text-gray-300 italic">メモはまだありません。編集から復習内容を記録しましょう。</p>
                )}
              </div>
            )}

            <div className="pt-4 border-t border-gray-50">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">抽出された問題文</h4>
              <div className="p-3 bg-gray-50 rounded-xl text-[11px] text-gray-500 whitespace-pre-wrap leading-relaxed max-h-24 overflow-y-auto custom-scrollbar font-mono border border-gray-100">
                {item.transcription || "テキストは検出されませんでした"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryItem;
