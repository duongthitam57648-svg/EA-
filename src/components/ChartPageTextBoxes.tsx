import { useEffect } from 'react';
import { DraggableTextInputWhite } from './DraggableTextInputWhite';
import { updateAppData } from '../data/app-config';
import { TextBox } from '../types/app-data';
import { useAppData } from '../hooks/useAppData';

export function ChartPageTextBoxes({ showPosition = false, disabled = false }: { showPosition?: boolean; disabled?: boolean }) {
  const appData = useAppData();
  const textBoxes = appData.chartPageTextBoxes;
  const { analyticsData } = appData;

  // 同步 analyticsData 数据到文本框
  useEffect(() => {
    const updatedTextBoxes = appData.chartPageTextBoxes.map(box => {
      let newContent = box.content;
      
      switch (box.id) {
        case 'chart-text1':
          newContent = String(analyticsData.previewRate);
          break;
        case 'chart-text2':
          newContent = String(analyticsData.reviewRate);
          break;
        case 'chart-text3':
          newContent = String(analyticsData.openingRate);
          break;
        case 'chart-text4':
          newContent = String(analyticsData.highestScoreInRecentUnitTests);
          break;
      }
      
      // 只有当内容真的变化时才返回新对象
      if (newContent !== box.content) {
        return { ...box, content: newContent };
      }
      return box;
    });
    
    // 检查是否有真正的变化
    const hasChanges = updatedTextBoxes.some((box, index) => 
      box.content !== appData.chartPageTextBoxes[index].content
    );
    
    if (hasChanges) {
      updateAppData({ chartPageTextBoxes: updatedTextBoxes });
    }
  }, [analyticsData.previewRate, analyticsData.reviewRate, analyticsData.openingRate, analyticsData.highestScoreInRecentUnitTests]);

  // 更新文本内容
  const handleContentChange = (id: string, content: string) => {
    const updatedTextBoxes = appData.chartPageTextBoxes.map(box =>
      box.id === id ? { ...box, content } : box
    );
    updateAppData({ chartPageTextBoxes: updatedTextBoxes });
  };

  // 更新位置
  const handlePositionChange = (id: string, top: number, left: number) => {
    const updatedTextBoxes = appData.chartPageTextBoxes.map(box =>
      box.id === id ? { ...box, position: { ...box.position, top, left } } : box
    );
    updateAppData({ chartPageTextBoxes: updatedTextBoxes });
  };

  // 更新缩放
  const handleScaleChange = (id: string, scale: number) => {
    const updatedTextBoxes = appData.chartPageTextBoxes.map(box =>
      box.id === id ? { ...box, position: { ...box.position, scale } } : box
    );
    updateAppData({ chartPageTextBoxes: updatedTextBoxes });
  };

  return (
    <>
      {textBoxes.map((textBox: TextBox) => (
        <DraggableTextInputWhite
          key={textBox.id}
          id={textBox.id}
          content={textBox.content}
          initialTop={textBox.position.top}
          initialLeft={textBox.position.left}
          initialScale={textBox.position.scale}
          onContentChange={handleContentChange}
          onPositionChange={handlePositionChange}
          onScaleChange={handleScaleChange}
          showPosition={showPosition}
          disabled={disabled}
        />
      ))}
    </>
  );
}