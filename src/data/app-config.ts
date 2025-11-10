import { AppData } from '../types/app-data';

// 默认应用数据配置
export const defaultAppData: AppData = {
  // 用户信息
  userInfo: {
    avatar: 'https://images.unsplash.com/photo-1729824186570-4d4aede00043?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYXZhdGFyfGVufDF8fHx8MTc2MjQ0NjAyNnww&ixlib=rb-4.1.0&q=80&w=1080',
    name: '谷鸿基',
    grade: '六年级'
  },

  // 学习统计数据
  studyStats: {
    daysSinceFirstLargeOrder: 156,     // 首大单距今的天数
    currentClassHours: 234,             // 当前已上课时数
    currentLearningPhaseCompletionRate: 78,  // 当前学习阶段完成度
    currentEnglishGrowth: 3             // 当前所在英语阶段（1-5）
  },

  // 数据分析数据
  analyticsData: {
    previewRate: 90,               // 预习率
    reviewRate: 88,                // 复习率
    openingRate: 92,               // 开口率
    highestScoreInRecentUnitTests: 95 // 近期单元测试最高分
  },

  // 学习进度页数据
  learningProgressPageData: {
    nextStageOfLanguageSkills: '下一阶段语言技能和优势', // 下一阶段(语言技能和优势)
    adviceAfterClass: '课后建议内容',          // 课后建议
    currentAbilityAcquired: '当前已获得能力描述',    // 当前：已获得能力（学习后你能做什么）
    schoolAbility: '对应的学校能力描述',             // 对应的学校能力
    currentClassesNum: 24,         // 当前课程数量
    currentLearningProgressOne: '学习进度第一小块', // 当前学习进度第一小块
    currentLearningProgressTwo: '学习进度第二小块', // 当前学习进度第二小块
    currentLearningProgressThree: '学习进度第三小块', // 当前学习进度第三小块
    currentLearningPhaseCompletionRate: 78 // 当前学习阶段完成度
  },

  // 学习阶段对比页数据
  comparisonPageData: {
    currentLevelCorrespondsToGrade: '小学3-4年级',     // 当前级别对应年级
    currentLearningTopics: '日常对话和基础语法',        // 当前学习主题
    targetLevel: 'CEJ Level 3',                        // 目标级别
    targetLevelCorrespondingToGrade: '小学5-6年级',    // 目标级别对应年级
    targetLearningProgressOne: '目标学习进度内容',     // 目标学习进度第一小块
    targetLearningTopics: '复杂句型和写作能力',        // 目标学习主题
    targetAbilityAcquired: '能够进行流畅的英语交流'    // 目标：已获得能力
  },

  // 各科成绩
  subjectScores: [
    { subject: '语文', score: 92, trend: 'up', change: 5 },
    { subject: '数学', score: 88, trend: 'up', change: 3 },
    { subject: '英语', score: 95, trend: 'stable', change: 0 },
    { subject: '科学', score: 85, trend: 'down', change: -2 },
    { subject: '历史', score: 90, trend: 'up', change: 4 }
  ],

  // 每周学习进度（7天）
  learningProgress: [
    { date: '周一', minutes: 65, completed: 5 },
    { date: '周二', minutes: 80, completed: 7 },
    { date: '周三', minutes: 55, completed: 4 },
    { date: '周四', minutes: 90, completed: 8 },
    { date: '周五', minutes: 75, completed: 6 },
    { date: '周六', minutes: 100, completed: 9 },
    { date: '周日', minutes: 85, completed: 7 }
  ],

  // 欢迎页文案
  welcomePageText: {
    title: '开启你的学习旅程',
    subtitle: '每一步努力，都值得被记录',
    buttonText: '开启旅程',
    greeting: '你好'
  },

  // 统计页文案
  statsPageText: {
    title: '学习统计',
    todayLabel: '今日学习',
    weeklyGoalLabel: '本周目标',
    streakLabel: '连续学习',
    lessonsLabel: '完成课程',
    pointsLabel: '总积分'
  },

  // 数据分析页文案
  analyticsPageText: {
    title: '数据分析',
    subjectScoresTitle: '各科成绩',
    weeklyProgressTitle: '本周进度',
    performanceTitle: '学习表现'
  },

  // 欢迎页元素位置配置
  welcomePagePositions: {
    avatar: { top: 25, left: 50, scale: 1 },
    name: { top: 42, left: 50, scale: 1 },
    grade: { top: 50, left: 50, scale: 1 }
  },

  // 统计页元素位置配置
  statsPagePositions: {
    avatar: { top: 15, left: 15, scale: 1 },
    name: { top: 16.5, left: 33, scale: 1 }  // 固定名字框位置，根据截图调整
  },

  // 统计页文本框配置（5个数据框）
  statsPageTextBoxes: [
    { id: 'stats-days', content: '156', position: { top: 27, left: 14, scale: 1, width: 100, height: 40 } },        // 首大单距今天数（左上）
    { id: 'stats-completion', content: '78', position: { top: 27, left: 65, scale: 1, width: 100, height: 40 } },   // 当前学习阶段完成度（右上）
    { id: 'stats-hours', content: '234', position: { top: 43, left: 14, scale: 1, width: 100, height: 40 } },       // 当前已上课时数（左中）
    { id: 'stats-growth', content: '3', position: { top: 43, left: 65, scale: 1, width: 100, height: 40 } },        // 当前所在英语阶段（右中）
  ],

  // 图表页文本框配置
  chartPageTextBoxes: [
    { id: 'chart-text1', content: '90', position: { top: 25, left: 25, scale: 1 } },  // 预习率
    { id: 'chart-text2', content: '88', position: { top: 35, left: 25, scale: 1 } },  // 复习率
    { id: 'chart-text3', content: '92', position: { top: 55, left: 25, scale: 1 } },  // 开口率
    { id: 'chart-text4', content: '95', position: { top: 65, left: 25, scale: 1 } }   // 近期单元测试最高分
  ],

  // 信封页数据配置
  envelopePageData: {
    leftEnvelope: {
      title: '给家长的信',
      content: ''
    },
    rightEnvelope: {
      title: '给孩子的信',
      content: ''
    }
  },

  // 进度树页文本框配置
  progressTreeTextBoxes: [
    { id: 'progress-text1', content: '下一阶段语言技能和优势', position: { top: 15, left: 30, scale: 1 } },
    { id: 'progress-text2', content: '课后建议内容', position: { top: 25, left: 30, scale: 1 } },
    { id: 'progress-text3', content: '当前已获得能力描述', position: { top: 35, left: 30, scale: 1 } },
    { id: 'progress-text4', content: '对应的学校能力描述', position: { top: 45, left: 30, scale: 1 } },
    { id: 'progress-text5', content: '24', position: { top: 55, left: 30, scale: 1 } },
    { id: 'progress-text6', content: '学习进度第一小块', position: { top: 65, left: 30, scale: 1 } },
    { id: 'progress-text7', content: '学习进度第二小块', position: { top: 75, left: 30, scale: 1 } },
    { id: 'progress-text8', content: '学习进度第三小块', position: { top: 85, left: 30, scale: 1 } },
    { id: 'progress-text9', content: '78', position: { top: 15, left: 60, scale: 1 } }
  ],

  // 学习阶段对比页文本框配置
  comparisonPageTextBoxes: [
    { id: 'comparison-text1', content: '小学3-4年级', position: { top: 19.5, left: 20, scale: 1 } },  // 当前级别对应年级
    { id: 'comparison-text2', content: '0', position: { top: 27, left: 23, scale: 1 } },
    { id: 'comparison-text3', content: 'CEJ Level 3', position: { top: 20, left: 63, scale: 1 } },  // 目标级别
    { id: 'comparison-text4', content: '日常对话和基础语法', position: { top: 39, left: 27, scale: 1 } },  // 当前学习主题
    { id: 'comparison-text5', content: '已获得能力内容', position: { top: 48, left: 27, scale: 1 } },
    { id: 'comparison-text6', content: '复杂句型和写作能力', position: { top: 37.5, left: 68, scale: 1 } },  // 目标学习主题
    { id: 'comparison-text7', content: '能够进行流畅的英语交流', position: { top: 48.5, left: 68, scale: 1 } },  // 目标：已获得能力
    { id: 'comparison-text8', content: '目标学习进度内容', position: { top: 58, left: 50, scale: 1 } },  // 目标学习进度第一小块
    { id: 'comparison-text9', content: '额外内容 2', position: { top: 65, left: 50, scale: 1 } },
    { id: 'comparison-text10', content: '额外内容 3', position: { top: 72, left: 50, scale: 1 } },
    { id: 'comparison-text11', content: '额外内容 4', position: { top: 79, left: 50, scale: 1 } },
    { id: 'comparison-text12', content: '额外内容 5', position: { top: 86, left: 50, scale: 1 } }
  ],

  // 音乐播放页文本框配置
  musicPlayerTextBoxes: [
    { id: 'music-text1', content: '学前例句标题', position: { top: 24, left: 30, scale: 1 } },
    { id: 'music-text2', content: '05:30', position: { top: 24, left: 70, scale: 1 } },
    { id: 'music-text3', content: '学后例句标题', position: { top: 56, left: 30, scale: 1 } },
    { id: 'music-text4', content: '06:85', position: { top: 56, left: 70, scale: 1 } },
    { id: 'music-text5', content: '部文字内容', position: { top: 15, left: 50, scale: 1 } }
  ],

  // 学习规划页文本框配置
  planningPageTextBoxes: [
    { id: 'planning-text1', content: '在这里输入你的学习规划...', position: { top: 25, left: 50, scale: 1 } }
  ]
};

// 导出方便使用的getter函数
export const getAppData = (): AppData => {
  // 后续可以从localStorage或服务器加载数据
  const savedData = localStorage.getItem('appData');
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      // 确保返回的数据包含所有必需字段
      return {
        ...defaultAppData,
        ...parsedData,
        // 确保 welcomePagePositions 存在
        welcomePagePositions: parsedData.welcomePagePositions || defaultAppData.welcomePagePositions,
        // 确保 statsPagePositions 存在且包含所有字段
        statsPagePositions: {
          ...defaultAppData.statsPagePositions,
          ...(parsedData.statsPagePositions || {})
        },
        // 确保 analyticsData 存在
        analyticsData: parsedData.analyticsData || defaultAppData.analyticsData,
        // 确保 learningProgressPageData 存在
        learningProgressPageData: parsedData.learningProgressPageData || defaultAppData.learningProgressPageData,
        // 确保 comparisonPageData 存在
        comparisonPageData: parsedData.comparisonPageData || defaultAppData.comparisonPageData,
        // 确保 statsPageTextBoxes 存在，合并保存的位置和默认配置
        statsPageTextBoxes: parsedData.statsPageTextBoxes 
          ? parsedData.statsPageTextBoxes.map((savedBox: any) => {
              const defaultBox = defaultAppData.statsPageTextBoxes.find(box => box.id === savedBox.id);
              return defaultBox ? {
                ...defaultBox,
                ...savedBox,
                position: savedBox.position || defaultBox.position
              } : savedBox;
            })
          : defaultAppData.statsPageTextBoxes,
        // 确保 chartPageTextBoxes 存在
        chartPageTextBoxes: parsedData.chartPageTextBoxes || defaultAppData.chartPageTextBoxes,
        // 确保 envelopePageData 存在
        envelopePageData: parsedData.envelopePageData || defaultAppData.envelopePageData,
        // 确保 progressTreeTextBoxes 存在
        progressTreeTextBoxes: parsedData.progressTreeTextBoxes || defaultAppData.progressTreeTextBoxes,
        // 确保 comparisonPageTextBoxes 存在
        comparisonPageTextBoxes: parsedData.comparisonPageTextBoxes || defaultAppData.comparisonPageTextBoxes,
        // 确保 musicPlayerTextBoxes 存在
        musicPlayerTextBoxes: parsedData.musicPlayerTextBoxes || defaultAppData.musicPlayerTextBoxes,
        // 确保 planningPageTextBoxes 存在
        planningPageTextBoxes: parsedData.planningPageTextBoxes || defaultAppData.planningPageTextBoxes
      };
    } catch (e) {
      console.error('Failed to parse saved data, using default data:', e);
      // 如果解析失败，清除损坏的数据并返回默认值
      localStorage.removeItem('appData');
      return defaultAppData;
    }
  }
  return defaultAppData;
};

// 保存数据到localStorage
export const saveAppData = (data: AppData): void => {
  localStorage.setItem('appData', JSON.stringify(data));
  // 触发自定义事件通知其他组件数据已更新
  window.dispatchEvent(new Event('appDataUpdated'));
};

// 更新部分数据
export const updateAppData = (updates: Partial<AppData>): void => {
  const currentData = getAppData();
  const newData = { ...currentData, ...updates };
  saveAppData(newData);
};