import { useState, useEffect } from 'react';
import { WhiteTextInput } from './WhiteTextInput';
import { TextBox } from '../types/app-data';
import { getAppData, saveAppData, updateAppData } from '../data/app-config';
import { useAppData } from '../hooks/useAppData';

export function ComparisonPageTextBoxes({ showPosition = false, disabled = false }: { showPosition?: boolean; disabled?: boolean }) {
  const appData = useAppData();
  const textBoxes = appData.comparisonPageTextBoxes;
  const { comparisonPageData } = appData;

  // 同步 comparisonPageData 数据到文本框
  useEffect(() => {
    const currentData = getAppData();
    const updatedTextBoxes = currentData.comparisonPageTextBoxes.map(box => {
      let newContent = box.content;
      
      switch (box.id) {
        case 'comparison-text1':
          // 当前级别对应年级 (左侧标签)
          newContent = comparisonPageData.currentLevelCorrespondsToGrade;
          break;
        case 'comparison-text2':
          // 这个可以保持原样或者根据需要调整
          break;
        case 'comparison-text3':
          // 目标级别 (右侧标签)
          newContent = comparisonPageData.targetLevel;
          break;
        case 'comparison-text4':
          // 当前学习主题
          newContent = comparisonPageData.currentLearningTopics;
          break;
        case 'comparison-text5':
          // 当前已获得能力 (这里暂时留空，因为comparisonPageData中没有对应字段)
          // 可以考虑从其他数据源获取
          break;
        case 'comparison-text6':
          // 目标学习主题
          newContent = comparisonPageData.targetLearningTopics;
          break;
        case 'comparison-text7':
          // 目标：已获得能力
          newContent = comparisonPageData.targetAbilityAcquired;
          break;
        case 'comparison-text8':
        case 'comparison-text9':
        case 'comparison-text10':
        case 'comparison-text11':
        case 'comparison-text12':
          // 额外内容保持不变，或者可以映射到其他字段
          // 例如 comparison-text8 可以映射到 targetLearningProgressOne
          if (box.id === 'comparison-text8') {
            newContent = comparisonPageData.targetLearningProgressOne;
          }
          // 其他的保持原样或设置为空
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
      box.content !== currentData.comparisonPageTextBoxes[index].content
    );
    
    if (hasChanges) {
      updateAppData({ comparisonPageTextBoxes: updatedTextBoxes });
    }
  }, [
    comparisonPageData.currentLevelCorrespondsToGrade,
    comparisonPageData.currentLearningTopics,
    comparisonPageData.targetLevel,
    comparisonPageData.targetLevelCorrespondingToGrade,
    comparisonPageData.targetLearningProgressOne,
    comparisonPageData.targetLearningTopics,
    comparisonPageData.targetAbilityAcquired
  ]);

  // 更新文本内容
  const handleContentChange = (id: string, content: string) => {
    const currentData = getAppData();
    const updatedTextBoxes = currentData.comparisonPageTextBoxes.map(box =>
      box.id === id ? { ...box, content } : box
    );
    updateAppData({ comparisonPageTextBoxes: updatedTextBoxes });
  };

  // 更新位置
  const handlePositionChange = (id: string, top: number, left: number) => {
    const currentData = getAppData();
    const updatedTextBoxes = currentData.comparisonPageTextBoxes.map(box =>
      box.id === id ? { ...box, position: { ...box.position, top, left } } : box
    );
    updateAppData({ comparisonPageTextBoxes: updatedTextBoxes });
  };

  // 更新缩放
  const handleScaleChange = (id: string, scale: number) => {
    const currentData = getAppData();
    const updatedTextBoxes = currentData.comparisonPageTextBoxes.map(box =>
      box.id === id ? { ...box, position: { ...box.position, scale } } : box
    );
    updateAppData({ comparisonPageTextBoxes: updatedTextBoxes });
  };

  return (
    <>
      {textBoxes.map((box: TextBox) => (
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