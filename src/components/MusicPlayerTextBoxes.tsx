import { useState, useEffect } from 'react';
import { WhiteTextInput } from './WhiteTextInput';
import { getAppData, updateAppData } from '../data/app-config';
import { TextBox } from '../types/app-data';

export function MusicPlayerTextBoxes() {
  const appData = getAppData();
  const textBoxes = appData.musicPlayerTextBoxes;

  // 更新文本内容
  const handleContentChange = (id: string, content: string) => {
    const currentData = getAppData();
    const updatedTextBoxes = currentData.musicPlayerTextBoxes.map(box =>
      box.id === id ? { ...box, content } : box
    );
    updateAppData({ musicPlayerTextBoxes: updatedTextBoxes });
  };

  // 更新位置
  const handlePositionChange = (id: string, top: number, left: number) => {
    const currentData = getAppData();
    const updatedTextBoxes = currentData.musicPlayerTextBoxes.map(box =>
      box.id === id ? { ...box, position: { ...box.position, top, left } } : box
    );
    updateAppData({ musicPlayerTextBoxes: updatedTextBoxes });
  };

  // 更新缩放
  const handleScaleChange = (id: string, scale: number) => {
    const currentData = getAppData();
    const updatedTextBoxes = currentData.musicPlayerTextBoxes.map(box =>
      box.id === id ? { ...box, position: { ...box.position, scale } } : box
    );
    updateAppData({ musicPlayerTextBoxes: updatedTextBoxes });
  };

  return (
    <>
      {textBoxes.map((textBox: TextBox) => (
        <WhiteTextInput
          key={textBox.id}
          id={textBox.id}
          content={textBox.content}
          initialTop={textBox.position.top}
          initialLeft={textBox.position.left}
          initialScale={textBox.position.scale}
          onContentChange={handleContentChange}
          onPositionChange={handlePositionChange}
          onScaleChange={handleScaleChange}
        />
      ))}
    </>
  );
}