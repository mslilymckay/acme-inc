import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareHeart, Mail, Copy, Check, X, Sparkles, Send } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export const FeedbackModal: React.FC = () => {
  const { showFeedbackModal, closeFeedbackModal } = useGameStore();

  const [favoriteCase, setFavoriteCase] = useState<string>('2.1');
  const [feedbackNotes, setFeedbackNotes] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  if (!showFeedbackModal) return null;

  const casesList = [
    { id: '2.1', label: '2.1: 4-Corner Planner (Sam)' },
    { id: '2.2', label: '2.2: Red-Pen Pruner (Liam)' },
    { id: '2.3', label: '2.3: Example Injector (Chloe)' },
  ];

  const formattedFeedbackBody = `Hi Lily,

Here is my feedback on the Signal & Noise POC prototype:

- Favorite Case/Interaction: ${casesList.find(c => c.id === favoriteCase)?.label || favoriteCase}
- Feedback / Impressions:
${feedbackNotes.trim() ? feedbackNotes : '(No notes entered)'}

Tested on: ${navigator.userAgent}
`;

  const handleEmail = () => {
    const subject = encodeURIComponent('Signal & Noise Prototype Feedback');
    const body = encodeURIComponent(formattedFeedbackBody);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedFeedbackBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 bg-black/70 backdrop-blur-xs select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ type: 'spring', damping: 24, stiffness: 280 }}
          className="w-full max-w-[420px] bg-white border-3 border-black rounded-3xl p-4 shadow-comic relative overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={closeFeedbackModal}
            className="absolute top-3 right-3 w-7 h-7 rounded-full border-2 border-black flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer z-10"
          >
            <X className="w-4 h-4 text-slate-800" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-purple-100 border border-purple-400 text-purple-900 rounded-full flex items-center gap-1 font-mono">
              <MessageSquareHeart className="w-3 h-3 text-purple-700" />
              Creator Feedback
            </span>
          </div>

          <h3 className="text-base font-black text-slate-900 leading-tight">
            Share Your Thoughts
          </h3>
          <p className="text-xs text-slate-600 mt-0.5 leading-snug">
            Your feedback shapes the next iteration of the game mechanics!
          </p>

          <div className="my-3 space-y-3 flex-1 overflow-y-auto pr-0.5">
            {/* Question 1: Favorite interaction */}
            <div>
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1.5">
                Which interaction felt best?
              </label>
              <div className="space-y-1">
                {casesList.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setFavoriteCase(c.id)}
                    className={`w-full text-left p-2 rounded-xl border text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      favoriteCase === c.id
                        ? 'bg-acme-yellow/40 border-black ring-1 ring-black text-slate-900 shadow-comic-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{c.label}</span>
                    {favoriteCase === c.id && (
                      <Check className="w-3.5 h-3.5 text-black" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Open thoughts */}
            <div>
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                What worked well? Any confusing parts?
              </label>
              <textarea
                value={feedbackNotes}
                onChange={(e) => setFeedbackNotes(e.target.value)}
                placeholder="E.g., The red pen felt intuitive, but I'd like more clues on Chloe's folder..."
                rows={3}
                className="w-full p-2.5 bg-slate-50 border-2 border-slate-300 rounded-xl text-xs text-slate-800 font-sans focus:outline-none focus:border-black resize-none"
              />
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 border-t border-black/10 flex flex-col gap-2 shrink-0">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleEmail}
                className="py-2.5 px-3 bg-acme-yellow hover:bg-yellow-300 border-2 border-black rounded-xl font-black text-xs text-slate-900 shadow-comic flex items-center justify-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send via Email</span>
              </button>

              <button
                onClick={handleCopy}
                className="py-2.5 px-3 bg-white hover:bg-slate-100 border-2 border-black rounded-xl font-black text-xs text-slate-800 shadow-comic-sm flex items-center justify-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-700" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={closeFeedbackModal}
              className="py-1.5 text-[11px] font-bold text-slate-500 hover:text-slate-800 text-center cursor-pointer"
            >
              Back to Desk
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
