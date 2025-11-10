import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import envelopeDetailImageLeft from 'figma:asset/011be887e8272aa8f291c1fb93afa4c7a68cea62.png';
import envelopeDetailImageRight from 'figma:asset/0c2fe609f9f3f3532d2f9a24419dfc818651438f.png';

interface EnvelopeDetailProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  side: 'left' | 'right';
}

export function EnvelopeDetail({ isOpen, onClose, title, content, side }: EnvelopeDetailProps) {
  const envelopeImage = side === 'left' ? envelopeDetailImageLeft : envelopeDetailImageRight;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 z-30"
          />
          
          {/* Envelope detail with image background */}
          <motion.div
            initial={{ 
              scale: 0.5,
              opacity: 0,
              rotateY: -90,
              transformPerspective: 1200
            }}
            animate={{ 
              scale: 1,
              opacity: 1,
              rotateY: 0,
              transformPerspective: 1200
            }}
            exit={{ 
              scale: 0.8,
              opacity: 0,
              rotateY: 90,
              transformPerspective: 1200
            }}
            transition={{ 
              type: 'spring',
              damping: 20,
              stiffness: 200,
              duration: 0.6
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[85%] max-w-md z-40"
            style={{ transformStyle: 'preserve-3d' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background image */}
            <div className="relative w-full h-full">
              <ImageWithFallback
                src={envelopeImage}
                alt="信封详情"
                className="w-full h-full object-cover rounded-2xl"
              />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 left-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors z-10"
                aria-label="关闭"
              >
                <X size={20} className="text-white" />
              </button>
              
              {/* 文字内容显示区域 */}
              {content && (
                <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[70%] max-h-[42%] overflow-y-auto">
                  <p className="text-purple-700 text-center whitespace-pre-line leading-relaxed">
                    {content}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}