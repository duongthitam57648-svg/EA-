// 用户信息接口
export interface UserInfo {
  avatar: string;
  name: string;
  grade: string;
}

// 元素位置信息接口
export interface ElementPosition {
  top: number;    // 百分比位置
  left: number;   // 百分比位置
  scale: number;  // 缩放比例
  width?: number; // 固定宽度（像素）
  height?: number; // 固定高度（像素）
}

// 欢迎页元素位置配置
export interface WelcomePagePositions {
  avatar: ElementPosition;
  name: ElementPosition;
  grade: ElementPosition;
}

// 统计页位置配置接口
export interface StatsPagePositions {
  avatar: ElementPosition;
  name: ElementPosition;
}

// 文本框数据接口
export interface TextBox {
  id: string;
  content: string;
  position: ElementPosition;
}

// 学习统计数据接口
export interface StudyStats {
  daysSinceFirstLargeOrder: number;  // 首大单距今的天数
  currentClassHours: number;         // 当前已上课时数
  currentLearningPhaseCompletionRate: number;  // 当前学习阶段完成度 (0-100)
  currentEnglishGrowth: number;      // 当前所在英语阶段（1-5，按从下到上的数字）
}

// 数据分析数据接口
export interface AnalyticsData {
  previewRate: number;               // 预习率
  reviewRate: number;                // 复习率
  openingRate: number;               // 开口率
  highestScoreInRecentUnitTests: number; // 近期单元测试最高分
}

// 学习进度页数据接口
export interface LearningProgressPageData {
  nextStageOfLanguageSkills: string; // 下一阶段(语言技能和优势)
  adviceAfterClass: string;          // 课后建议
  currentAbilityAcquired: string;    // 当前：已获得能力（学习后你能做什么）
  schoolAbility: string;             // 对应的学校能力
  currentClassesNum: number;         // 当前课程数量
  currentLearningProgressOne: string; // 当前学习进度第一小块
  currentLearningProgressTwo: string; // 当前学习进度第二小块
  currentLearningProgressThree: string; // 当前学习进度第三小块
  currentLearningPhaseCompletionRate: number; // 当前学习阶段完成度
}

// 学习阶段对比页数据接口
export interface ComparisonPageData {
  currentLevelCorrespondsToGrade: string;     // 当前级别对应年级
  currentLearningTopics: string;              // 当前学习主题
  targetLevel: string;                        // 目标级别
  targetLevelCorrespondingToGrade: string;    // 目标级别对应年级
  targetLearningProgressOne: string;          // 目标学习进度第一小块
  targetLearningTopics: string;               // 目标学习主题
  targetAbilityAcquired: string;              // 目标：已获得能力
}

// 科目成绩数据接口
export interface SubjectScore {
  subject: string;    // 科目名称
  score: number;      // 分数
  trend: 'up' | 'down' | 'stable';  // 趋势
  change: number;     // 变化值
}

// 学习进度数据接口
export interface LearningProgress {
  date: string;       // 日期
  minutes: number;    // 学习分钟数
  completed: number;  // 完成任务数
}

// 欢迎页文案接口
export interface WelcomePageText {
  title: string;
  subtitle: string;
  buttonText: string;
  greeting: string;
}

// 统计页文案接口
export interface StatsPageText {
  title: string;
  todayLabel: string;
  weeklyGoalLabel: string;
  streakLabel: string;
  lessonsLabel: string;
  pointsLabel: string;
}

// 数据分析页文案接口
export interface AnalyticsPageText {
  title: string;
  subjectScoresTitle: string;
  weeklyProgressTitle: string;
  performanceTitle: string;
}

// 信封信息接口
export interface EnvelopeMessage {
  title: string;
  content: string;
}

// 信封页数据接口
export interface EnvelopePageData {
  leftEnvelope: EnvelopeMessage;   // 给家长的信
  rightEnvelope: EnvelopeMessage;  // 给孩子的信
}

// 完整的应用数据接口
export interface AppData {
  userInfo: UserInfo;
  studyStats: StudyStats;
  analyticsData: AnalyticsData;
  learningProgressPageData: LearningProgressPageData;
  comparisonPageData: ComparisonPageData;
  subjectScores: SubjectScore[];
  learningProgress: LearningProgress[];
  welcomePageText: WelcomePageText;
  statsPageText: StatsPageText;
  analyticsPageText: AnalyticsPageText;
  welcomePagePositions: WelcomePagePositions;
  statsPagePositions: StatsPagePositions;
  statsPageTextBoxes: TextBox[];
  chartPageTextBoxes: TextBox[];
  envelopePageData: EnvelopePageData;
  progressTreeTextBoxes: TextBox[];
  comparisonPageTextBoxes: TextBox[];
  musicPlayerTextBoxes: TextBox[];
  planningPageTextBoxes: TextBox[];
}