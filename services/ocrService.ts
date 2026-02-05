
import Tesseract from 'tesseract.js';

/**
 * 画像からテキストを抽出します（ブラウザ内ローカル処理）
 */
export const transcribeImage = async (
  imageUrl: string, 
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    const result = await Tesseract.recognize(
      imageUrl,
      'jpn+eng',
      { 
        logger: m => {
          if (m.status === 'recognizing' && onProgress) {
            onProgress(Math.round(m.progress * 100));
          }
        }
      }
    );
    
    return result.data.text.trim() || "テキストが検出されませんでした。";
  } catch (error) {
    console.error("OCR Error:", error);
    throw new Error("文字の読み取り中にエラーが発生しました。");
  }
};
