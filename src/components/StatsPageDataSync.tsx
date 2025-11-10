import { useEffect } from 'react';
import { getAppData, updateAppData } from '../data/app-config';

/**
 * 这个组件负责将 studyStats 数据同步到 statsPageTextBoxes
 * 每当 studyStats 更新时，自动更新对应的文本框内容
 */
export function useStatsDataSync() {
  useEffect(() => {
    const appData = getAppData();
    const { studyStats, statsPageTextBoxes } = appData;
    
    // 更新文本框内容以匹配当前的统计数据
    const updatedTextBoxes = statsPageTextBoxes.map(box => {
      switch (box.id) {
        case 'stats-days':
          return { ...box, content: String(studyStats.daysSinceFirstLargeOrder) };
        case 'stats-completion':
          return { ...box, content: String(studyStats.currentLearningPhaseCompletionRate) };
        case 'stats-hours':
          return { ...box, content: String(studyStats.currentClassHours) };
        case 'stats-growth':
          return { ...box, content: String(studyStats.currentEnglishGrowth) };
        case 'stats-total':
          // 这个字段目前没有对应的 studyStats 数据，保持原值
          return box;
        default:
          return box;
      }
    });
    
    // 检查是否有变化，如果有则更新
    const hasChanges = updatedTextBoxes.some((box, index) => 
      box.content !== statsPageTextBoxes[index].content
    );
    
    if (hasChanges) {
      updateAppData({ statsPageTextBoxes: updatedTextBoxes });
    }
  }, []);
}

/**
 * 空组件，仅用于触发同步逻辑
 */
export function StatsPageDataSync() {
  useStatsDataSync();
  return null;
}
