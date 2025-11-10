import { useState } from 'react';
import { EnvelopeDetail } from './EnvelopeDetail';
import { EnvelopePageData } from '../types/app-data';

interface EnvelopeClickableProps {
  envelopeData: EnvelopePageData;
}

export function EnvelopeClickable({ envelopeData }: EnvelopeClickableProps) {
  const [openEnvelope, setOpenEnvelope] = useState<'left' | 'right' | null>(null);

  const handleLeftClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenEnvelope('left');
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenEnvelope('right');
  };

  return (
    <>
      {/* Left envelope clickable area */}
      <button
        onClick={handleLeftClick}
        className="absolute top-[35%] left-[10%] w-[35%] h-[30%] cursor-pointer z-20 hover:scale-105 transition-transform"
        aria-label="打开左边信封"
      />
      
      {/* Right envelope clickable area */}
      <button
        onClick={handleRightClick}
        className="absolute top-[35%] right-[10%] w-[35%] h-[30%] cursor-pointer z-20 hover:scale-105 transition-transform"
        aria-label="打开右边信封"
      />

      {/* Envelope details */}
      {openEnvelope === 'left' && (
        <EnvelopeDetail
          isOpen={true}
          onClose={() => setOpenEnvelope(null)}
          title={envelopeData.leftEnvelope.title}
          content={envelopeData.leftEnvelope.content}
          side="left"
        />
      )}
      
      {openEnvelope === 'right' && (
        <EnvelopeDetail
          isOpen={true}
          onClose={() => setOpenEnvelope(null)}
          title={envelopeData.rightEnvelope.title}
          content={envelopeData.rightEnvelope.content}
          side="right"
        />
      )}
    </>
  );
}