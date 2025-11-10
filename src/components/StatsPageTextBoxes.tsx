import { useEffect } from 'react';
import { DraggableTextInput } from './DraggableTextInput';
import { updateAppData } from '../data/app-config';
import { TextBox } from '../types/app-data';
import { useAppData } from '../hooks/useAppData';

export function StatsPageTextBoxes({ showPosition = false, disabled = false }: { showPosition?: boolean; disabled?: boolean }) {
  const appData = useAppData();
  const textBoxes = appData.statsPageTextBoxes;
  const { studyStats } = appData;

  // 同步 studyStats 数据到文本框
  useEffect(() => {
    const updatedTextBoxes = appData.statsPageTextBoxes.map(box => {
      let newContent = box.content;
      
      switch (box.id) {
        case 'stats-days':
          newContent = String(studyStats.daysSinceFirstLargeOrder);
          break;
        case 'stats-completion':
          newContent = String(studyStats.currentLearningPhaseCompletionRate);
          break;
        case 'stats-hours':
          newContent = String(studyStats.currentClassHours);
          break;
        case 'stats-growth':
          newContent = String(studyStats.currentEnglishGrowth);
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
      box.content !== appData.statsPageTextBoxes[index].content
    );
    
    if (hasChanges) {
      updateAppData({ statsPageTextBoxes: updatedTextBoxes });
    }
  }, [studyStats.daysSinceFirstLargeOrder, studyStats.currentClassHours, studyStats.currentLearningPhaseCompletionRate, studyStats.currentEnglishGrowth]);

  // 更新文本内容
  const handleContentChange = (id: string, content: string) => {
    const updatedTextBoxes = appData.statsPageTextBoxes.map(box =>
      box.id === id ? { ...box, content } : box
    );
    updateAppData({ statsPageTextBoxes: updatedTextBoxes });
  };

  // 更新位置
  const handlePositionChange = (id: string, top: number, left: number) => {
    const updatedTextBoxes = appData.statsPageTextBoxes.map(box =>
      box.id === id ? { ...box, position: { ...box.position, top, left } } : box
    );
    updateAppData({ statsPageTextBoxes: updatedTextBoxes });
  };

  // 更新缩放
  const handleScaleChange = (id: string, scale: number) => {
    const updatedTextBoxes = appData.statsPageTextBoxes.map(box =>
      box.id === id ? { ...box, position: { ...box.position, scale } } : box
    );
    updateAppData({ statsPageTextBoxes: updatedTextBoxes });
  };

  return (
    <>
      {textBoxes.map((textBox: TextBox) => (
        <DraggableTextInput
          key={textBox.id}
          id={textBox.id}
          content={textBox.content}
          initialTop={textBox.position.top}
          initialLeft={textBox.position.left}
          initialScale={textBox.position.scale}
          fixedWidth={textBox.position.width}
          fixedHeight={textBox.position.height}
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