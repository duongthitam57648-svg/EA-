// 数据类型定义
export interface StudentData {
  // 第一页 - 学生基本信息
  student_name: string;
  current_level: number;
  
  // 第二页 - 学习统计
  days_since_first_large_order: number;
  current_class_hours: number;
  current_learning_phase_completion_rate: number;
  
  // 第三页 - 数据分析
  preview_rate: number;
  review_rate: number;
  opening_rate: number;
  highest_score_in_recent_unit_tests: number;
  
  // 第四页 - 信封内容
  contents_of_the_letter_to_parents: string;
  contents_of_the_letter_to_childs: string;
  
  // 第五页 - 科学成长
  current_english_growth: number; // 1-5 从下到上
  
  // 第七页 - 学习进度
  next_stage_of_language_skills: string;
  advice_after_class: string;
  current_ability_acquired: string;
  school_ability: string;
  current_classes_num: number;
  current_learning_progress_one: string;
  current_learning_progress_two: string;
  current_learning_progress_three: string;
  
  // 第八页 - 学习阶段对比
  current_level_corresponds_to_grade: string;
  current_learning_topics: string;
  target_level: number;
  target_level_corresponding_to_grade: string;
  target_learning_progress_one: string;
  target_learning_topics: string;
  target_ability_acquired: string;
  
  // 第九页 - 视频链接
  preschool_video_link: string;
  post_learning_video_link: string;
  
  // 第十页 - 学习规划
  study_planning: string;
}

// 默认数据
export const defaultStudentData: StudentData = {
  student_name: "学生姓名",
  current_level: 1,
  days_since_first_large_order: 0,
  current_class_hours: 0,
  current_learning_phase_completion_rate: 0,
  preview_rate: 0,
  review_rate: 0,
  opening_rate: 0,
  highest_score_in_recent_unit_tests: 0,
  contents_of_the_letter_to_parents: "给家长的信内容",
  contents_of_the_letter_to_childs: "给孩子的信内容",
  current_english_growth: 1,
  next_stage_of_language_skills: "下一阶段语言技能",
  advice_after_class: "课后建议",
  current_ability_acquired: "当前已获得能力",
  school_ability: "对应学校能力",
  current_classes_num: 0,
  current_learning_progress_one: "学习进度1",
  current_learning_progress_two: "学习进度2",
  current_learning_progress_three: "学习进度3",
  current_level_corresponds_to_grade: "当前年级",
  current_learning_topics: "当前学习主题",
  target_level: 2,
  target_level_corresponding_to_grade: "目标年级",
  target_learning_progress_one: "目标学习进度",
  target_learning_topics: "目标学习主题",
  target_ability_acquired: "目标已获得能力",
  preschool_video_link: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  post_learning_video_link: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  study_planning: "学习规划内容",
};