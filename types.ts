
export interface TestReviewItem {
  id: string;
  timestamp: number;
  imageUrl: string;
  fileName: string;
  transcription: string;
  analysis: {
    subject: string;
    notes: string; // AI分析の代わりにユーザーの自由記述メモ
  };
  status: 'processing' | 'completed' | 'error';
  progress?: number;
  errorMessage?: string;
}

export enum AppTab {
  GALLERY = 'GALLERY',
  UPLOAD = 'UPLOAD',
}
