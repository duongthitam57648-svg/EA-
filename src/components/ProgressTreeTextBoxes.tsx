import { useEffect } from 'react';
import { WhiteTextInput } from './WhiteTextInput';
import { getAppData, updateAppData } from '../data/app-config';
import { TextBox } from '../types/app-data';
import { useAppData } from '../hooks/useAppData';

export function ProgressTreeTextBoxes({ showPosition = false, disabled = false }: { showPosition?: boolean; disabled?: boolean }) {
  const appData = useAppData();
  const textBoxes = appData.progressTreeTextBoxes;
  const { learningProgressPageData } = appData;

  // 同步 learningProgressPageData 数据到文本框
  useEffect(() => {
    const currentData = getAppData();
    const updatedTextBoxes = currentData.progressTreeTextBoxes.map(box => {
      let newContent = box.content;
      
      switch (box.id) {
        case 'progress-text1':
          newContent = learningProgressPageData.nextStageOfLanguageSkills;
          break;
        case 'progress-text2':
          newContent = learningProgressPageData.adviceAfterClass;
          break;
        case 'progress-text3':
          newContent = learningProgressPageData.currentAbilityAcquired;
          break;
        case 'progress-text4':
          newContent = learningProgressPageData.schoolAbility;
          break;
        case 'progress-text5':
          newContent = String(learningProgressPageData.currentClassesNum);
          break;
        case 'progress-text6':
          newContent = learningProgressPageData.currentLearningProgressOne;
          break;
        case 'progress-text7':
          newContent = learningProgressPageData.currentLearningProgressTwo;
          break;
        case 'progress-text8':
          newContent = learningProgressPageData.currentLearningProgressThree;
          break;
        case 'progress-text9':
          newContent = String(learningProgressPageData.currentLearningPhaseCompletionRate);
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
      box.content !== currentData.progressTreeTextBoxes[index].content
    );
    
    if (hasChanges) {
      updateAppData({ progressTreeTextBoxes: updatedTextBoxes });
    }
  }, [
    learningProgressPageData.nextStageOfLanguageSkills,
    learningProgressPageData.adviceAfterClass,
    learningProgressPageData.currentAbilityAcquired,
    learningProgressPageData.schoolAbility,
    learningProgressPageData.currentClassesNum,
    learningProgressPageData.currentLearningProgressOne,
    learningProgressPageData.currentLearningProgressTwo,
    learningProgressPageData.currentLearningProgressThree,
    learningProgressPageData.currentLearningPhaseCompletionRate
  ]);

  // 更新文本内容
  const handleContentChange = (id: string, content: string) => {
    const currentData = getAppData();
    const updatedTextBoxes = currentData.progressTreeTextBoxes.map(box =>
      box.id === id ? { ...box, content } : box
    );
    updateAppData({ progressTreeTextBoxes: updatedTextBoxes });
  };

  // 更新位置
  const handlePositionChange = (id: string, top: number, left: number) => {
    const currentData = getAppData();
    const updatedTextBoxes = currentData.progressTreeTextBoxes.map(box =>
      box.id === id ? { ...box, position: { ...box.position, top, left } } : box
    );
    updateAppData({ progressTreeTextBoxes: updatedTextBoxes });
  };

  // 更新缩放
  const handleScaleChange = (id: string, scale: number) => {
    const currentData = getAppData();
    const updatedTextBoxes = currentData.progressTreeTextBoxes.map(box =>
      box.id === id ? { ...box, position: { ...box.position, scale } } : box
    );
    updateAppData({ progressTreeTextBoxes: updatedTextBoxes });
  };

  return (
    <>
      {textBoxes.map((textBox: TextBox) => {
        // 根据不同的文本框ID设置不同的换行规则
        let maxCharsPerLine: number | undefined = undefined;
        
        // progress-text1: 下一阶段 - 每6个字换行
        // progress-text2: 课后建议 - 每6个字换行
        // progress-text3: 当前已获得能力 - 每6个字换行
        // progress-text4: 对应学校能力 - 每6个字换行
        if (['progress-text1', 'progress-text2', 'progress-text3', 'progress-text4'].includes(textBox.id)) {
          maxCharsPerLine = 6;
        }
        
        // progress-text6, progress-text7, progress-text8: 学习进度三小块 - 每4个字换行
        if (['progress-text6', 'progress-text7', 'progress-text8'].includes(textBox.id)) {
          maxCharsPerLine = 4;
        }
        
        return (
          <WhiteTextInput
            key={textBox.id}
            id={textBox.id}
            content={textBox.content}
            initialTop={textBox.position.top}
            initialLeft={textBox.position.left}
            initialScale={textBox.position.scale}
            showPosition={showPosition}
            maxCharsPerLine={maxCharsPerLine}
            disabled={disabled}
            onContentChange={handleContentChange}
            onPositionChange={handlePositionChange}
            onScaleChange={handleScaleChange}
          />
        );
      })}
    </>
  );
}