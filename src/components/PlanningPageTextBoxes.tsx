import { useState, useEffect } from 'react';
import { WhiteTextInput } from './WhiteTextInput';
import { TextBox } from '../types/app-data';
import { getAppData, saveAppData } from '../data/app-config';

export function PlanningPageTextBoxes({ showPosition = false, disabled = false }: { showPosition?: boolean; disabled?: boolean }) {
  const [textBoxes, setTextBoxes] = useState<TextBox[]>([]);

  useEffect(() => {
    const appData = getAppData();
    setTextBoxes(appData.planningPageTextBoxes);
  }, []);

  const handleContentChange = (id: string, content: string) => {
    const newTextBoxes = textBoxes.map(box =>
      box.id === id ? { ...box, content } : box
    );
    setTextBoxes(newTextBoxes);
    
    const appData = getAppData();
    saveAppData({
      ...appData,
      planningPageTextBoxes: newTextBoxes
    });
  };

  const handlePositionChange = (id: string, top: number, left: number) => {
    const newTextBoxes = textBoxes.map(box =>
      box.id === id ? { ...box, position: { ...box.position, top, left } } : box
    );
    setTextBoxes(newTextBoxes);
    
    const appData = getAppData();
    saveAppData({
      ...appData,
      planningPageTextBoxes: newTextBoxes
    });
  };

  const handleScaleChange = (id: string, scale: number) => {
    const newTextBoxes = textBoxes.map(box =>
      box.id === id ? { ...box, position: { ...box.position, scale } } : box
    );
    setTextBoxes(newTextBoxes);
    
    const appData = getAppData();
    saveAppData({
      ...appData,
      planningPageTextBoxes: newTextBoxes
    });
  };

  return (
    <>
      {textBoxes.map(box => (
        <WhiteTextInput
          key={box.id}
          id={box.id}
          content={box.content}
          initialTop={box.position.top}
          initialLeft={box.position.left}
          initialScale={box.position.scale}
          showPosition={showPosition}
          disabled={disabled}
          onContentChange={handleContentChange}
          onPositionChange={handlePositionChange}
          onScaleChange={handleScaleChange}
        />
      ))}
    </>
  );
}