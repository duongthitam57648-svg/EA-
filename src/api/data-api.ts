/**
 * API工具函数 - 用于处理数据接收和链接生成
 */

import { StudentData } from '../types/data-types';
import { AppData } from '../types/app-data';
import { defaultAppData } from '../data/app-config';

/**
 * 将StudentData映射到AppData
 */
export function mapStudentDataToAppData(studentData: StudentData, currentAppData?: AppData): AppData {
  const baseData = currentAppData || defaultAppData;
  
  return {
    ...baseData,
    userInfo: {
      ...baseData.userInfo,
      name: studentData.student_name,
      grade: studentData.current_level ? `L${studentData.current_level}` : baseData.userInfo.grade,
    },
    studyStats: {
      daysSinceFirstLargeOrder: studentData.days_since_first_large_order ?? baseData.studyStats.daysSinceFirstLargeOrder,
      currentClassHours: studentData.current_class_hours ?? baseData.studyStats.currentClassHours,
      currentLearningPhaseCompletionRate: studentData.current_learning_phase_completion_rate ?? baseData.studyStats.currentLearningPhaseCompletionRate,
      currentEnglishGrowth: studentData.current_english_growth ?? baseData.studyStats.currentEnglishGrowth,
    },
    analyticsData: {
      previewRate: studentData.preview_rate ?? baseData.analyticsData.previewRate,
      reviewRate: studentData.review_rate ?? baseData.analyticsData.reviewRate,
      openingRate: studentData.opening_rate ?? baseData.analyticsData.openingRate,
      highestScoreInRecentUnitTests: studentData.highest_score_in_recent_unit_tests ?? baseData.analyticsData.highestScoreInRecentUnitTests,
    },
    learningProgressPageData: {
      nextStageOfLanguageSkills: studentData.next_stage_of_language_skills || baseData.learningProgressPageData.nextStageOfLanguageSkills,
      adviceAfterClass: studentData.advice_after_class || baseData.learningProgressPageData.adviceAfterClass,
      currentAbilityAcquired: studentData.current_ability_acquired || baseData.learningProgressPageData.currentAbilityAcquired,
      schoolAbility: studentData.school_ability || baseData.learningProgressPageData.schoolAbility,
      currentClassesNum: studentData.current_classes_num ?? baseData.learningProgressPageData.currentClassesNum,
      currentLearningProgressOne: studentData.current_learning_progress_one || baseData.learningProgressPageData.currentLearningProgressOne,
      currentLearningProgressTwo: studentData.current_learning_progress_two || baseData.learningProgressPageData.currentLearningProgressTwo,
      currentLearningProgressThree: studentData.current_learning_progress_three || baseData.learningProgressPageData.currentLearningProgressThree,
      currentLearningPhaseCompletionRate: studentData.current_learning_phase_completion_rate ?? baseData.learningProgressPageData.currentLearningPhaseCompletionRate,
    },
    comparisonPageData: {
      currentLevelCorrespondsToGrade: studentData.current_level_corresponds_to_grade || baseData.comparisonPageData.currentLevelCorrespondsToGrade,
      currentLearningTopics: studentData.current_learning_topics || baseData.comparisonPageData.currentLearningTopics,
      targetLevel: studentData.target_level ? `CEJ Level ${studentData.target_level}` : baseData.comparisonPageData.targetLevel,
      targetLevelCorrespondingToGrade: studentData.target_level_corresponding_to_grade || baseData.comparisonPageData.targetLevelCorrespondingToGrade,
      targetLearningProgressOne: studentData.target_learning_progress_one || baseData.comparisonPageData.targetLearningProgressOne,
      targetLearningTopics: studentData.target_learning_topics || baseData.comparisonPageData.targetLearningTopics,
      targetAbilityAcquired: studentData.target_ability_acquired || baseData.comparisonPageData.targetAbilityAcquired,
    },
    envelopePageData: {
      leftEnvelope: {
        title: baseData.envelopePageData.leftEnvelope.title,
        content: studentData.contents_of_the_letter_to_parents || baseData.envelopePageData.leftEnvelope.content,
      },
      rightEnvelope: {
        title: baseData.envelopePageData.rightEnvelope.title,
        content: studentData.contents_of_the_letter_to_childs || baseData.envelopePageData.rightEnvelope.content,
      },
    },
    // 更新文本框内容
    statsPageTextBoxes: baseData.statsPageTextBoxes.map(box => {
      if (box.id === 'stats-days') {
        return { ...box, content: String(studentData.days_since_first_large_order ?? box.content) };
      }
      if (box.id === 'stats-completion') {
        return { ...box, content: String(studentData.current_learning_phase_completion_rate ?? box.content) };
      }
      if (box.id === 'stats-hours') {
        return { ...box, content: String(studentData.current_class_hours ?? box.content) };
      }
      if (box.id === 'stats-growth') {
        return { ...box, content: String(studentData.current_english_growth ?? box.content) };
      }
      return box;
    }),
    chartPageTextBoxes: baseData.chartPageTextBoxes.map((box, index) => {
      const values = [
        studentData.preview_rate,
        studentData.review_rate,
        studentData.opening_rate,
        studentData.highest_score_in_recent_unit_tests,
      ];
      return { ...box, content: String(values[index] ?? box.content) };
    }),
    progressTreeTextBoxes: baseData.progressTreeTextBoxes.map((box, index) => {
      const values = [
        studentData.next_stage_of_language_skills,
        studentData.advice_after_class,
        studentData.current_ability_acquired,
        studentData.school_ability,
        studentData.current_classes_num,
        studentData.current_learning_progress_one,
        studentData.current_learning_progress_two,
        studentData.current_learning_progress_three,
        studentData.current_learning_phase_completion_rate,
      ];
      if (values[index] !== undefined) {
        return { ...box, content: String(values[index]) };
      }
      return box;
    }),
    comparisonPageTextBoxes: baseData.comparisonPageTextBoxes.map((box, index) => {
      const values = [
        studentData.current_level_corresponds_to_grade,
        null, // comparison-text2
        studentData.target_level ? `CEJ Level ${studentData.target_level}` : null,
        studentData.current_learning_topics,
        null, // comparison-text5
        studentData.target_learning_topics,
        studentData.target_ability_acquired,
        studentData.target_learning_progress_one,
      ];
      if (values[index] !== undefined && values[index] !== null) {
        return { ...box, content: String(values[index]) };
      }
      return box;
    }),
  };
}

/**
 * 将JSON数据编码为URL安全的base64字符串
 */
export function encodeDataToUrl(data: StudentData): string {
  const jsonString = JSON.stringify(data);
  // 使用btoa编码，然后替换URL不安全的字符
  const base64 = btoa(unescape(encodeURIComponent(jsonString)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * 从URL参数解码数据
 */
export function decodeDataFromUrl(encoded: string): StudentData | null {
  try {
    // 恢复URL安全的base64字符
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    // 补齐padding
    while (base64.length % 4) {
      base64 += '=';
    }
    const jsonString = decodeURIComponent(escape(atob(base64)));
    return JSON.parse(jsonString) as StudentData;
  } catch (error) {
    console.error('Failed to decode data from URL:', error);
    return null;
  }
}

/**
 * 生成分享链接
 * @param data 学生数据
 * @param baseUrl 基础URL（可选，默认使用当前域名）
 * @returns 完整的分享链接
 */
export function generateShareLink(data: StudentData, baseUrl?: string): string {
  const encoded = encodeDataToUrl(data);
  const currentUrl = baseUrl || window.location.origin + window.location.pathname;
  return `${currentUrl}?data=${encoded}`;
}

/**
 * 从当前URL获取数据
 */
export function getDataFromUrl(): StudentData | null {
  const params = new URLSearchParams(window.location.search);
  const encodedData = params.get('data');
  if (!encodedData) {
    return null;
  }
  return decodeDataFromUrl(encodedData);
}

/**
 * API接口：接收后端JSON数据并返回分享链接
 * 这个函数可以被后端调用，或者在前端直接使用
 * @param data 学生数据
 * @param baseUrl 可选的基础URL，用于生成分享链接
 */
export function receiveStudentData(data: StudentData, baseUrl?: string): {
  success: boolean;
  shareLink: string;
  error?: string;
} {
  try {
    // 验证必需字段
    if (!data.student_name) {
      return {
        success: false,
        shareLink: '',
        error: '缺少必需字段: student_name',
      };
    }

    // 生成分享链接
    const shareLink = generateShareLink(data, baseUrl);

    return {
      success: true,
      shareLink,
    };
  } catch (error) {
    return {
      success: false,
      shareLink: '',
      error: error instanceof Error ? error.message : '未知错误',
    };
  }
}

