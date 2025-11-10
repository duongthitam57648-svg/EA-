import { useState } from 'react';
import { X, Save, RotateCcw, Upload, Download, AlertCircle, CheckCircle2, ChevronDown, ChevronRight, LocateFixed } from 'lucide-react';
import { AppData } from '../types/app-data';
import { StudentData } from '../types/data-types';
import { defaultAppData } from '../data/app-config';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

interface DataEditorProps {
  appData: AppData;
  onSave: (data: AppData) => void;
  onClose: () => void;
}

export function DataEditor({ appData, onSave, onClose }: DataEditorProps) {
  const [editedData, setEditedData] = useState<AppData>(appData);
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    import: true,
    welcome: true,
    stats: true,  // 默认展开学习统计页
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSave = () => {
    onSave(editedData);
    onClose();
  };

  const handleReset = () => {
    if (confirm('确定要撤销所有未保存的修改吗？')) {
      setEditedData(appData); // 恢复到打开编辑器时的状态，而不是默认配置
    }
  };

  const handleImport = () => {
    try {
      setError('');
      setSuccess(false);
      
      // 清理可能的特殊字符和空白
      const cleanedText = jsonText.trim();
      
      if (!cleanedText) {
        throw new Error('JSON内容不能为空');
      }
      
      // 尝试解析JSON
      let data: StudentData;
      try {
        data = JSON.parse(cleanedText);
      } catch (parseError) {
        throw new Error('JSON格式错误：' + (parseError instanceof Error ? parseError.message : '无法解析'));
      }
      
      // 验证必需字段
      if (!data.student_name) {
        throw new Error('缺少必需字段: student_name');
      }
      
      // 映射导入的数据到应用数据
      const newAppData: AppData = {
        ...editedData,
        userInfo: {
          ...editedData.userInfo,
          name: data.student_name,
          grade: data.current_level ? `L${data.current_level}` : editedData.userInfo.grade,
        },
        studyStats: {
          daysSinceFirstLargeOrder: data.days_since_first_large_order || editedData.studyStats.daysSinceFirstLargeOrder,
          currentClassHours: data.current_class_hours || editedData.studyStats.currentClassHours,
          currentLearningPhaseCompletionRate: data.current_learning_phase_completion_rate || editedData.studyStats.currentLearningPhaseCompletionRate,
          currentEnglishGrowth: data.current_english_growth || editedData.studyStats.currentEnglishGrowth,
        },
        analyticsData: {
          previewRate: data.preview_rate || editedData.analyticsData.previewRate,
          reviewRate: data.review_rate || editedData.analyticsData.reviewRate,
          openingRate: data.opening_rate || editedData.analyticsData.openingRate,
          highestScoreInRecentUnitTests: data.highest_score_in_recent_unit_tests || editedData.analyticsData.highestScoreInRecentUnitTests,
        },
        learningProgressPageData: {
          nextStageOfLanguageSkills: data.next_stage_of_language_skills || editedData.learningProgressPageData.nextStageOfLanguageSkills,
          adviceAfterClass: data.advice_after_class || editedData.learningProgressPageData.adviceAfterClass,
          currentAbilityAcquired: data.current_ability_acquired || editedData.learningProgressPageData.currentAbilityAcquired,
          schoolAbility: data.school_ability || editedData.learningProgressPageData.schoolAbility,
          currentClassesNum: data.current_classes_num || editedData.learningProgressPageData.currentClassesNum,
          currentLearningProgressOne: data.current_learning_progress_one || editedData.learningProgressPageData.currentLearningProgressOne,
          currentLearningProgressTwo: data.current_learning_progress_two || editedData.learningProgressPageData.currentLearningProgressTwo,
          currentLearningProgressThree: data.current_learning_progress_three || editedData.learningProgressPageData.currentLearningProgressThree,
          currentLearningPhaseCompletionRate: data.current_learning_phase_completion_rate || editedData.learningProgressPageData.currentLearningPhaseCompletionRate,
        },
        comparisonPageData: {
          currentLevelCorrespondsToGrade: data.current_level_corresponds_to_grade || editedData.comparisonPageData.currentLevelCorrespondsToGrade,
          currentLearningTopics: data.current_learning_topics || editedData.comparisonPageData.currentLearningTopics,
          targetLevel: data.target_level ? `CEJ Level ${data.target_level}` : editedData.comparisonPageData.targetLevel,
          targetLevelCorrespondingToGrade: data.target_level_corresponding_to_grade || editedData.comparisonPageData.targetLevelCorrespondingToGrade,
          targetLearningProgressOne: data.target_learning_progress_one || editedData.comparisonPageData.targetLearningProgressOne,
          targetLearningTopics: data.target_learning_topics || editedData.comparisonPageData.targetLearningTopics,
          targetAbilityAcquired: data.target_ability_acquired || editedData.comparisonPageData.targetAbilityAcquired,
        },
        envelopePageData: {
          leftEnvelope: {
            title: editedData.envelopePageData.leftEnvelope.title,
            content: data.contents_of_the_letter_to_parents || editedData.envelopePageData.leftEnvelope.content,
          },
          rightEnvelope: {
            title: editedData.envelopePageData.rightEnvelope.title,
            content: data.contents_of_the_letter_to_childs || editedData.envelopePageData.rightEnvelope.content,
          },
        },
        // TODO: 将其他字段映射到对应位置
      };
      
      setEditedData(newAppData);
      setSuccess(true);
      
      // 3秒后清除成功提示
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'JSON格式错误，请检查');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setJsonText(text);
    };
    reader.readAsText(file);
  };

  const handleLoadTemplate = () => {
    const template = {
      "student_name": "张小明",
      "current_level": 3,
      "days_since_first_large_order": 365,
      "current_class_hours": 120,
      "current_learning_phase_completion_rate": 75,
      "exceed_student_percentage": 85,
      "preview_rate": 90,
      "review_rate": 88,
      "opening_rate": 92,
      "highest_score_in_recent_unit_tests": 95,
      "contents_of_the_letter_to_parents": "亲爱的家长，您的孩子在英语学习方面表现优异，继续保持！通过这段时间的学习，孩子已经掌握了基础的英语交流能力，能够进行简单的日常对话。建议您继续鼓励孩子多听多说，每天坚持练习15分钟，相信孩子的英语水平会进一步提升。",
      "contents_of_the_letter_to_childs": "亲爱的孩子，你的努力让老师感到骄傲，继续加油！这段时间你学习非常认真，进步很大。你已经能够用英语进行简单的自我介绍和日常交流了，这真的很棒！希望你能继续保持学习的热情，每天坚持练习，相信你一定能取得更好的成绩！",
      "current_english_growth": 3,
      "next_stage_of_language_skills": "能够进行日常对话，掌握基本语法，能够描述简单的日常活动和兴趣爱好",
      "advice_after_class": "建议每天练习口语15分钟，多听英文儿歌和故事，尝试用英语描述身边的事物，多与同学进行英语对话练习",
      "current_ability_acquired": "能够用英语进行简单的自我介绍和日常交流，能够听懂并回答简单的英语问题，能够阅读简单的英语短文",
      "school_ability": "相当于小学三年级英语水平，能够掌握基础词汇和简单句型，具备基本的英语听说读写能力",
      "current_classes_num": 48,
      "current_learning_progress_one": "已完成基础词汇学习，掌握约300个常用单词",
      "current_learning_progress_two": "掌握基本语法结构，能够正确使用一般现在时和现在进行时",
      "current_learning_progress_three": "能够进行简单对话，能够用英语介绍自己、家人和朋友",
      "current_level_corresponds_to_grade": "小学三年级",
      "current_learning_topics": "日常生活、学校、家庭、颜色、数字、动物、食物等基础主题",
      "target_level": 5,
      "target_level_corresponding_to_grade": "小学五年级",
      "target_learning_progress_one": "掌握进阶词汇和短语，词汇量达到500个以上",
      "target_learning_topics": "旅游、文化、科学、环境、健康、运动等进阶主题",
      "target_ability_acquired": "能够进行较复杂的英语对话和写作，能够阅读和理解中等难度的英语文章，能够用英语表达自己的观点和想法",
      "preschool_video_link": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "post_learning_video_link": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "study_planning": "建议每周学习3次，每次1小时，重点加强口语和听力训练。每天坚持听英语15分钟，每周完成一篇英语小作文，每月进行一次英语口语测试，持续提升英语综合能力"
    };
    setJsonText(JSON.stringify(template, null, 2));
  };

  const SectionHeader = ({ title, section, emoji }: { title: string; section: string; emoji: string }) => (
    <button
      onClick={() => toggleSection(section)}
      className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <div className="flex items-center gap-2">
        <span>{emoji}</span>
        <span className="font-medium">{title}</span>
      </div>
      {expandedSections[section] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl">📝 数据编辑器</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* JSON导入区域 */}
          <div className="space-y-3">
            <SectionHeader title="导入学生数据 (JSON)" section="import" emoji="📥" />
            
            {expandedSections.import && (
              <div className="space-y-4 p-4 border rounded-lg bg-white">
                {/* 操作按钮 */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    上传JSON文件
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <Button variant="outline" onClick={() => setJsonText('')}>
                    清空
                  </Button>
                  <Button variant="outline" onClick={handleLoadTemplate}>
                    <Download className="w-4 h-4 mr-2" />
                    加载模板
                  </Button>
                </div>

                {/* JSON输入框 */}
                <Textarea
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  placeholder='粘贴JSON数据，例如：&#10;{&#10;  "student_name": "小明",&#10;  "current_level": 3,&#10;  "current_class_hours": 120,&#10;  ...&#10;}'
                  className="min-h-[200px] font-mono text-sm"
                />

                {/* 错误提示 */}
                {error && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                )}

                {/* 成功提示 */}
                {success && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <div className="text-sm text-green-700">数据导入成功！</div>
                  </div>
                )}

                {/* 导入按钮 */}
                <Button onClick={handleImport} disabled={!jsonText.trim()} className="w-full">
                  导入数据
                </Button>
              </div>
            )}
          </div>

          {/* 欢迎页 */}
          <div className="space-y-3">
            <SectionHeader title="欢迎页" section="welcome" emoji="✨" />
            
            {expandedSections.welcome && (
              <div className="space-y-4 p-4 border rounded-lg bg-white">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">头像URL</label>
                  <input
                    type="text"
                    value={editedData.userInfo.avatar}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        userInfo: { ...editedData.userInfo, avatar: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-700">姓名</label>
                  <input
                    type="text"
                    value={editedData.userInfo.name}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        userInfo: { ...editedData.userInfo, name: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-700">年级/级别</label>
                  <input
                    type="text"
                    value={editedData.userInfo.grade}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        userInfo: { ...editedData.userInfo, grade: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 学习统计页 */}
          <div className="space-y-3">
            <SectionHeader title="学习统计页" section="stats" emoji="📊" />
            
            {expandedSections.stats && (
              <div className="space-y-4 p-4 border rounded-lg bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-gray-600">
                    以下4个字段对应页面上的4个数据框
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm('确定要重置所有文本框位置到初始状态吗？')) {
                        setEditedData({
                          ...editedData,
                          statsPageTextBoxes: defaultAppData.statsPageTextBoxes.map(defaultBox => {
                            const currentBox = editedData.statsPageTextBoxes.find(b => b.id === defaultBox.id);
                            return {
                              ...defaultBox,
                              content: currentBox ? currentBox.content : defaultBox.content,
                              position: defaultBox.position // 使用默认位置
                            };
                          })
                        });
                      }
                    }}
                  >
                    <LocateFixed className="w-4 h-4 mr-2" />
                    重置位置
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      首大单距今天数 <span className="text-xs text-gray-500">(左上)</span>
                    </label>
                    <input
                      type="number"
                      value={editedData.studyStats.daysSinceFirstLargeOrder}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          studyStats: { ...editedData.studyStats, daysSinceFirstLargeOrder: parseInt(e.target.value) || 0 }
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      当前学习阶段完成度 (%) <span className="text-xs text-gray-500">(右上)</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editedData.studyStats.currentLearningPhaseCompletionRate}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          studyStats: { ...editedData.studyStats, currentLearningPhaseCompletionRate: parseInt(e.target.value) || 0 }
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      当前已上课时数 <span className="text-xs text-gray-500">(左)</span>
                    </label>
                    <input
                      type="number"
                      value={editedData.studyStats.currentClassHours}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          studyStats: { ...editedData.studyStats, currentClassHours: parseInt(e.target.value) || 0 }
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      当前所在英语阶段 (1-5) <span className="text-xs text-gray-500">(右中)</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={editedData.studyStats.currentEnglishGrowth}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          studyStats: { ...editedData.studyStats, currentEnglishGrowth: parseInt(e.target.value) || 1 }
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600 mb-2">
                    📝 <strong>提示：</strong>这些数据会自动同步到页面上对应的4个文本框中。您也可以在预览页面直接拖动和编辑这些文本框。
                  </p>
                </div>
                
                {/* 文本框位置和尺寸设置 */}
                <div className="pt-3 border-t">
                  <h4 className="mb-3 text-gray-900">📍 文本框位置和尺寸设置</h4>
                  <div className="space-y-3">
                    {editedData.statsPageTextBoxes.map((box, index) => {
                      const labels = ['首大单距今天数 (左上)', '当前学习阶段完成度 (右上)', '当前已上课时数 (左中)', '当前所在英语阶段 (右中)'];
                      return (
                        <div key={box.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm mb-2">{labels[index]}</div>
                          <div className="grid grid-cols-4 gap-2">
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">上边距 (%)</label>
                              <input
                                type="number"
                                step="0.5"
                                value={box.position.top}
                                onChange={(e) => {
                                  const newBoxes = [...editedData.statsPageTextBoxes];
                                  newBoxes[index] = {
                                    ...box,
                                    position: { ...box.position, top: parseFloat(e.target.value) || 0 }
                                  };
                                  setEditedData({ ...editedData, statsPageTextBoxes: newBoxes });
                                }}
                                className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">左边距 (%)</label>
                              <input
                                type="number"
                                step="0.5"
                                value={box.position.left}
                                onChange={(e) => {
                                  const newBoxes = [...editedData.statsPageTextBoxes];
                                  newBoxes[index] = {
                                    ...box,
                                    position: { ...box.position, left: parseFloat(e.target.value) || 0 }
                                  };
                                  setEditedData({ ...editedData, statsPageTextBoxes: newBoxes });
                                }}
                                className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">宽度 (px)</label>
                              <input
                                type="number"
                                value={box.position.width || 100}
                                onChange={(e) => {
                                  const newBoxes = [...editedData.statsPageTextBoxes];
                                  newBoxes[index] = {
                                    ...box,
                                    position: { ...box.position, width: parseInt(e.target.value) || 100 }
                                  };
                                  setEditedData({ ...editedData, statsPageTextBoxes: newBoxes });
                                }}
                                className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">高度 (px)</label>
                              <input
                                type="number"
                                value={box.position.height || 40}
                                onChange={(e) => {
                                  const newBoxes = [...editedData.statsPageTextBoxes];
                                  newBoxes[index] = {
                                    ...box,
                                    position: { ...box.position, height: parseInt(e.target.value) || 40 }
                                  };
                                  setEditedData({ ...editedData, statsPageTextBoxes: newBoxes });
                                }}
                                className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 数据分析页 */}
          <div className="space-y-3">
            <SectionHeader title="数据分析页" section="chart" emoji="📈" />
            
            {expandedSections.chart && (
              <div className="space-y-4 p-4 border rounded-lg bg-white">
                <div className="text-sm text-gray-600 mb-3">
                  此页面显示学生的学习数据分析统计，修改后数据会自动同步到第3页的4个文本框中：
                  <ul className="mt-2 ml-4 list-disc text-xs">
                    <li>文本框1: 预习率</li>
                    <li>文本框2: 复习率</li>
                    <li>文本框3: 开口率</li>
                    <li>文本框4: 近期单元测试最高分</li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      预习率 (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editedData.analyticsData.previewRate}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          analyticsData: { ...editedData.analyticsData, previewRate: parseInt(e.target.value) || 0 }
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      复习率 (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editedData.analyticsData.reviewRate}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          analyticsData: { ...editedData.analyticsData, reviewRate: parseInt(e.target.value) || 0 }
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      开口率 (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editedData.analyticsData.openingRate}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          analyticsData: { ...editedData.analyticsData, openingRate: parseInt(e.target.value) || 0 }
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      近期单元测试最高分
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editedData.analyticsData.highestScoreInRecentUnitTests}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          analyticsData: { ...editedData.analyticsData, highestScoreInRecentUnitTests: parseInt(e.target.value) || 0 }
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600">
                    📝 <strong>提示：</strong>这些数据会自动同步到第3页的4个文本框中
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 学习进度页 */}
          <div className="space-y-3">
            <SectionHeader title="学习进度页" section="progress" emoji="📚" />
            
            {expandedSections.progress && (
              <div className="space-y-4 p-4 border rounded-lg bg-white">
                <div className="text-sm text-gray-600 mb-3">
                  此页面显示学生的学习进度信息，修改后数据会自动同步到第7页的文本框中：
                  <ul className="mt-2 ml-4 list-disc text-xs">
                    <li>文本框1: 下一阶段(语言技能和优势)</li>
                    <li>文本框2: 课后建议</li>
                    <li>文本框3: 当前已获得能力</li>
                    <li>文本框4: 对应的学校能力</li>
                    <li>文本框5: 当前课程数量</li>
                    <li>文本框6-8: 当前学习进度(三小块)</li>
                    <li>文本框9: 当前学习阶段完成度</li>
                  </ul>
                </div>
                
                {/* 数值型字段 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      当前课程数量
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editedData.learningProgressPageData.currentClassesNum}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          learningProgressPageData: { ...editedData.learningProgressPageData, currentClassesNum: parseInt(e.target.value) || 0 }
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      当前学习阶段完成度 (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editedData.learningProgressPageData.currentLearningPhaseCompletionRate}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          learningProgressPageData: { ...editedData.learningProgressPageData, currentLearningPhaseCompletionRate: parseInt(e.target.value) || 0 }
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                {/* 文本型字段 */}
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      下一阶段(语言技能和优势)
                    </label>
                    <textarea
                      value={editedData.learningProgressPageData.nextStageOfLanguageSkills}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          learningProgressPageData: { ...editedData.learningProgressPageData, nextStageOfLanguageSkills: e.target.value }
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      课后建议
                    </label>
                    <textarea
                      value={editedData.learningProgressPageData.adviceAfterClass}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          learningProgressPageData: { ...editedData.learningProgressPageData, adviceAfterClass: e.target.value }
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      当前：已获得能力（学习后你能做什么）
                    </label>
                    <textarea
                      value={editedData.learningProgressPageData.currentAbilityAcquired}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          learningProgressPageData: { ...editedData.learningProgressPageData, currentAbilityAcquired: e.target.value }
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      对应的学校能力
                    </label>
                    <textarea
                      value={editedData.learningProgressPageData.schoolAbility}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          learningProgressPageData: { ...editedData.learningProgressPageData, schoolAbility: e.target.value }
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      当前学习进度第一小块
                    </label>
                    <input
                      type="text"
                      value={editedData.learningProgressPageData.currentLearningProgressOne}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          learningProgressPageData: { ...editedData.learningProgressPageData, currentLearningProgressOne: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      当前学习进度第二小块
                    </label>
                    <input
                      type="text"
                      value={editedData.learningProgressPageData.currentLearningProgressTwo}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          learningProgressPageData: { ...editedData.learningProgressPageData, currentLearningProgressTwo: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      当前学习进度第三小块
                    </label>
                    <input
                      type="text"
                      value={editedData.learningProgressPageData.currentLearningProgressThree}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          learningProgressPageData: { ...editedData.learningProgressPageData, currentLearningProgressThree: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600">
                    📝 <strong>提示：</strong>这些数据会自动同步到第7页（学习进度页）的对应文本框中
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 信封页 */}
          <div className="space-y-3">
            <SectionHeader title="信封页" section="envelope" emoji="✉️" />
            
            {expandedSections.envelope && (
              <div className="space-y-6 p-4 border rounded-lg bg-white">
                <div>
                  <h3 className="mb-3 text-gray-900">给家长的信 (左边信封)</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm mb-2 text-gray-700">标题</label>
                      <input
                        type="text"
                        value={editedData.envelopePageData.leftEnvelope.title}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            envelopePageData: {
                              ...editedData.envelopePageData,
                              leftEnvelope: {
                                ...editedData.envelopePageData.leftEnvelope,
                                title: e.target.value
                              }
                            }
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2 text-gray-700">内容</label>
                      <textarea
                        value={editedData.envelopePageData.leftEnvelope.content}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            envelopePageData: {
                              ...editedData.envelopePageData,
                              leftEnvelope: {
                                ...editedData.envelopePageData.leftEnvelope,
                                content: e.target.value
                              }
                            }
                          })
                        }
                        rows={6}
                        placeholder="在这里输入信的内容，支持多行文本"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-gray-900">给孩子的信 (右边信封)</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm mb-2 text-gray-700">标题</label>
                      <input
                        type="text"
                        value={editedData.envelopePageData.rightEnvelope.title}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            envelopePageData: {
                              ...editedData.envelopePageData,
                              rightEnvelope: {
                                ...editedData.envelopePageData.rightEnvelope,
                                title: e.target.value
                              }
                            }
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2 text-gray-700">内容</label>
                      <textarea
                        value={editedData.envelopePageData.rightEnvelope.content}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            envelopePageData: {
                              ...editedData.envelopePageData,
                              rightEnvelope: {
                                ...editedData.envelopePageData.rightEnvelope,
                                content: e.target.value
                              }
                            }
                          })
                        }
                        rows={6}
                        placeholder="在这里输入信的容，支持多行文本"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 科学成长页 */}
          <div className="space-y-3">
            <SectionHeader title="科学成长页" section="science" emoji="🔬" />
            
            {expandedSections.science && (
              <div className="space-y-4 p-4 border rounded-lg bg-white">
                <p className="text-sm text-gray-600">此页面暂无可配置数据</p>
              </div>
            )}
          </div>

          {/* L1等级树页 */}
          <div className="space-y-3">
            <SectionHeader title="L1等级树页" section="leveltree" emoji="🌳" />
            
            {expandedSections.leveltree && (
              <div className="space-y-4 p-4 border rounded-lg bg-white">
                <p className="text-sm text-gray-600">此页面暂无可配置数据</p>
              </div>
            )}
          </div>

          {/* 学习阶段对比页 */}
          <div className="space-y-3">
            <SectionHeader title="学习阶段对比页" section="comparison" emoji="📊" />
            
            {expandedSections.comparison && (
              <div className="space-y-4 p-4 border rounded-lg bg-white">
                <div className="text-sm text-gray-600 mb-3">
                  此页面显示学生当前学习阶段与目标级别的对比信息：
                  <ul className="mt-2 ml-4 list-disc text-xs">
                    <li>当前级别对应年级</li>
                    <li>当前学习主题</li>
                    <li>目标级别</li>
                    <li>目标级别对应年级</li>
                    <li>目标学习进度</li>
                    <li>目标学习主题</li>
                    <li>目标：已获得能力</li>
                  </ul>
                </div>
                
                <h4 className="font-medium text-gray-900 pt-3 border-t">当前阶段信息</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      当前级别对应年级
                    </label>
                    <input
                      type="text"
                      value={editedData.comparisonPageData.currentLevelCorrespondsToGrade}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          comparisonPageData: { ...editedData.comparisonPageData, currentLevelCorrespondsToGrade: e.target.value }
                        })
                      }
                      placeholder="例如：小学3-4年级"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      当前学习主题
                    </label>
                    <textarea
                      value={editedData.comparisonPageData.currentLearningTopics}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          comparisonPageData: { ...editedData.comparisonPageData, currentLearningTopics: e.target.value }
                        })
                      }
                      rows={2}
                      placeholder="例如：日常对话和基础语法"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <h4 className="font-medium text-gray-900 pt-3 border-t">目标阶段信息</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      目标级别
                    </label>
                    <input
                      type="text"
                      value={editedData.comparisonPageData.targetLevel}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          comparisonPageData: { ...editedData.comparisonPageData, targetLevel: e.target.value }
                        })
                      }
                      placeholder="例如：CEJ Level 3"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      目标级别对应年级
                    </label>
                    <input
                      type="text"
                      value={editedData.comparisonPageData.targetLevelCorrespondingToGrade}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          comparisonPageData: { ...editedData.comparisonPageData, targetLevelCorrespondingToGrade: e.target.value }
                        })
                      }
                      placeholder="例如：小学5-6年级"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      目标学习进度
                    </label>
                    <input
                      type="text"
                      value={editedData.comparisonPageData.targetLearningProgressOne}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          comparisonPageData: { ...editedData.comparisonPageData, targetLearningProgressOne: e.target.value }
                        })
                      }
                      placeholder="例如：目标学习进度内容"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      目标学习主题
                    </label>
                    <textarea
                      value={editedData.comparisonPageData.targetLearningTopics}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          comparisonPageData: { ...editedData.comparisonPageData, targetLearningTopics: e.target.value }
                        })
                      }
                      rows={2}
                      placeholder="例如：复杂句型和写作能力"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      目标：已获得能力
                    </label>
                    <textarea
                      value={editedData.comparisonPageData.targetAbilityAcquired}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          comparisonPageData: { ...editedData.comparisonPageData, targetAbilityAcquired: e.target.value }
                        })
                      }
                      rows={3}
                      placeholder="例如：能够进行流畅的英语交流"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600">
                    📝 <strong>提示：</strong>这些数据会自动同步到第8页（学习阶段对比页）的对应文本框中
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 视频播放页 */}
          <div className="space-y-3">
            <SectionHeader title="视频播放页" section="video" emoji="🎵" />
            
            {expandedSections.video && (
              <div className="space-y-4 p-4 border rounded-lg bg-white">
                <p className="text-sm text-gray-600">此页面的数据通过音乐播放器组件配置</p>
              </div>
            )}
          </div>

          {/* 小刺猬学习规划页 */}
          <div className="space-y-3">
            <SectionHeader title="小刺猬学习规划页" section="hedgehog" emoji="🦔" />
            
            {expandedSections.hedgehog && (
              <div className="space-y-4 p-4 border rounded-lg bg-white">
                <p className="text-sm text-gray-600">此页面的数据通过规划页文本框组件配置</p>
              </div>
            )}
          </div>

          {/* 51Talk品牌宣传页 */}
          <div className="space-y-3">
            <SectionHeader title="51Talk品牌宣传页" section="brand" emoji="🎨" />
            
            {expandedSections.brand && (
              <div className="space-y-4 p-4 border rounded-lg bg-white">
                <p className="text-sm text-gray-600">此页面为纯图片展示，无可配置数据</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RotateCcw size={18} />
            撤销修改
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Save size={18} />
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}