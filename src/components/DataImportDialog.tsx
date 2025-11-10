import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Upload, FileJson, AlertCircle, CheckCircle2, Download } from 'lucide-react';
import { StudentData } from '../types/data-types';

interface DataImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (data: StudentData) => void;
}

export function DataImportDialog({ open, onOpenChange, onImport }: DataImportDialogProps) {
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleImport = () => {
    try {
      setError('');
      setSuccess(false);
      
      const data = JSON.parse(jsonText);
      
      // 验证必需字段
      if (!data.student_name) {
        throw new Error('缺少必需字段: student_name');
      }
      
      onImport(data as StudentData);
      setSuccess(true);
      
      // 2秒后关闭对话框
      setTimeout(() => {
        onOpenChange(false);
        setJsonText('');
        setSuccess(false);
      }, 2000);
      
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

  const handleClear = () => {
    setJsonText('');
    setError('');
    setSuccess(false);
  };

  const handleLoadTemplate = () => {
    const template = {
      "student_name": "张小明",
      "current_level": 3,
      "days_since_first_large_order": 365,
      "current_class_hours": 120,
      "current_learning_phase_completion_rate": 75,
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>导入学生数据</DialogTitle>
          <DialogDescription>
            粘贴JSON数据或上传JSON文件以导入学生信息
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* 文件上传按钮 */}
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
            <Button variant="outline" onClick={handleClear}>
              清空
            </Button>
            <Button variant="outline" onClick={handleLoadTemplate}>
              <Download className="w-4 h-4 mr-2" />
              加载模板
            </Button>
          </div>

          {/* JSON文本输入框 */}
          <div>
            <label className="block mb-2">JSON数据：</label>
            <Textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder='粘贴JSON数据，例如：&#10;{&#10;  "student_name": "小明",&#10;  "current_level": 3,&#10;  "current_class_hours": 120,&#10;  ...&#10;}'
              className="min-h-[300px] font-mono"
            />
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-red-700">{error}</div>
            </div>
          )}

          {/* 成功提示 */}
          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <div className="text-green-700">数据导入成功！</div>
            </div>
          )}

          {/* 数据字段说明 */}
          <details className="border rounded-lg p-4">
            <summary className="cursor-pointer flex items-center gap-2">
              <FileJson className="w-4 h-4" />
              查看数据字段说明
            </summary>
            <div className="mt-4 space-y-2 text-sm max-h-[200px] overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                <div className="opacity-70">student_name</div>
                <div>学生姓名</div>
                
                <div className="opacity-70">current_level</div>
                <div>当前级别</div>
                
                <div className="opacity-70">days_since_first_large_order</div>
                <div>首大单距今天数</div>
                
                <div className="opacity-70">current_class_hours</div>
                <div>当前已上课时数</div>
                
                <div className="opacity-70">preview_rate</div>
                <div>预习率</div>
                
                <div className="opacity-70">review_rate</div>
                <div>复习率</div>
                
                <div className="opacity-70">opening_rate</div>
                <div>开口率</div>
                
                <div className="opacity-70 col-span-2 mt-2">...更多字段请查看类型定义</div>
              </div>
            </div>
          </details>

          {/* 操作按钮 */}
          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button onClick={handleImport} disabled={!jsonText.trim()}>
              导入数据
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}