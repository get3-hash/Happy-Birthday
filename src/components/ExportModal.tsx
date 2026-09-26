import React, { useState } from 'react';
import { ThemeConfig, AspectRatio, FontChoice } from '../types';
import { renderCelebrationToCanvas } from '../utils/canvasRenderer';
import { X, Download, Share2, Copy, Check, Sparkles, Image as ImageIcon } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeConfig;
  aspectRatio: AspectRatio;
  fontChoice: FontChoice;
  customName?: string;
  customWish?: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  theme,
  aspectRatio,
  fontChoice,
  customName,
  customWish,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exportQuality, setExportQuality] = useState<'high' | 'ultra'>('ultra');

  if (!isOpen) return null;

  const handleDownload = async (format: 'png' | 'jpeg') => {
    try {
      setIsExporting(true);
      const scale = exportQuality === 'ultra' ? 3 : 2;
      const canvas = await renderCelebrationToCanvas({
        theme,
        aspectRatio,
        fontChoice,
        customName,
        customWish,
        scale,
      });

      const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
      const extension = format === 'jpeg' ? 'jpg' : 'png';
      const dataUrl = canvas.toDataURL(mimeType, 0.95);

      const link = document.createElement('a');
      const sanitizedName = customName ? `_${customName.replace(/\s+/g, '_')}` : '';
      link.download = `HAPPY_BIRTHDAY${sanitizedName}_${theme.id}_${aspectRatio.replace(':', 'x')}.${extension}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      setIsExporting(true);
      const canvas = await renderCelebrationToCanvas({
        theme,
        aspectRatio,
        fontChoice,
        customName,
        customWish,
        scale: 2,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        } catch (copyErr) {
          console.error('Clipboard copy error:', copyErr);
        } finally {
          setIsExporting(false);
        }
      }, 'image/png');
    } catch (err) {
      console.error('Export clipboard failed:', err);
      setIsExporting(false);
    }
  };

  const handleWebShare = async () => {
    if (!navigator.share) {
      alert('Direct sharing is not supported by your browser. Please use Copy or Download.');
      return;
    }

    try {
      setIsExporting(true);
      const canvas = await renderCelebrationToCanvas({
        theme,
        aspectRatio,
        fontChoice,
        customName,
        customWish,
        scale: 2,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], 'happy_birthday.png', { type: 'image/png' });
        try {
          await navigator.share({
            title: 'HAPPY BIRTHDAY Celebration',
            text: 'Wishing you a joyful and wonderful Happy Birthday!',
            files: [file],
          });
        } catch (err) {
          // user cancelled share
        } finally {
          setIsExporting(false);
        }
      }, 'image/png');
    } catch (err) {
      console.error('Share error:', err);
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden p-6 text-neutral-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <h2 className="text-lg font-cinzel font-bold text-amber-300">
              Save & Share Celebration
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              High-resolution export optimized for WhatsApp, Instagram & screens
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Details */}
        <div className="py-4 space-y-4 text-sm">
          {/* Export Quality Selection */}
          <div className="flex items-center justify-between p-3 bg-neutral-950/60 rounded-xl border border-neutral-800/80">
            <div>
              <span className="text-xs font-medium text-neutral-300 block">
                Resolution Clarity
              </span>
              <span className="text-[11px] text-neutral-500">
                {exportQuality === 'ultra' ? 'Ultra HD 4K (3240px · Super Sharp)' : 'Crisp HD (2160px · Fast)'}
              </span>
            </div>
            <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-lg border border-neutral-800">
              <button
                onClick={() => setExportQuality('high')}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  exportQuality === 'high' ? 'bg-neutral-800 text-amber-300 font-semibold' : 'text-neutral-400'
                }`}
              >
                HD
              </button>
              <button
                onClick={() => setExportQuality('ultra')}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  exportQuality === 'ultra' ? 'bg-neutral-800 text-amber-300 font-semibold' : 'text-neutral-400'
                }`}
              >
                4K Ultra
              </button>
            </div>
          </div>

          {/* Social Platform Recommendations */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 bg-neutral-950/40 rounded-lg border border-neutral-800/60">
              <span className="font-semibold text-neutral-200 block">WhatsApp</span>
              <span className="text-[11px] text-neutral-400">9:16 or 1:1 format</span>
            </div>
            <div className="p-2.5 bg-neutral-950/40 rounded-lg border border-neutral-800/60">
              <span className="font-semibold text-neutral-200 block">Instagram</span>
              <span className="text-[11px] text-neutral-400">1:1 Post / 9:16 Story</span>
            </div>
            <div className="p-2.5 bg-neutral-950/40 rounded-lg border border-neutral-800/60">
              <span className="font-semibold text-neutral-200 block">Display / TV</span>
              <span className="text-[11px] text-neutral-400">16:9 Landscape</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => handleDownload('png')}
              disabled={isExporting}
              className="w-full py-3 px-4 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold text-neutral-950 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 hover:from-amber-200 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/10 cursor-pointer disabled:opacity-50"
            >
              {isExporting ? (
                <Sparkles className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>Download Ultra HD PNG (Lossless)</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopyToClipboard}
                disabled={isExporting}
                className="py-2.5 px-3 flex items-center justify-center gap-1.5 rounded-xl text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition-colors cursor-pointer disabled:opacity-50"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300 font-semibold">Copied Image!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Copy to Clipboard</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleDownload('jpeg')}
                disabled={isExporting}
                className="py-2.5 px-3 flex items-center justify-center gap-1.5 rounded-xl text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition-colors cursor-pointer disabled:opacity-50"
              >
                <ImageIcon className="w-3.5 h-3.5 text-neutral-400" />
                <span>Save High-Res JPG</span>
              </button>
            </div>

            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                onClick={handleWebShare}
                disabled={isExporting}
                className="w-full py-2.5 px-4 flex items-center justify-center gap-2 rounded-xl text-xs font-medium text-amber-200 bg-amber-950/40 hover:bg-amber-900/40 border border-amber-800/40 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Share via WhatsApp / Social Apps</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
