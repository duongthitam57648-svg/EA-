# 📡 数据接口使用文档

## 功能说明

本系统提供了完整的数据接收和分享功能，支持：
1. 接收后端传送的JSON数据
2. 自动生成可分享的链接
3. 用户点击链接即可在手机上查看数据

## 🚀 使用方法

### 方式一：通过前端界面接收数据

1. **打开数据接收界面**
   - 在应用界面点击左上角第二个按钮（分享图标 📤）
   - 会弹出"接收后端数据并生成分享链接"对话框

2. **粘贴JSON数据**
   - 将后端传送的JSON数据粘贴到输入框
   - 确保JSON格式正确（参考下方格式说明）

3. **生成分享链接**
   - 点击"接收数据并生成链接"按钮
   - 系统会自动验证数据并生成分享链接

4. **复制并分享**
   - 点击"复制"按钮复制链接
   - 将链接发送给用户（可通过微信、短信等）
   - 用户点击链接即可在手机上查看

### 方式二：通过API函数直接调用

```typescript
import { receiveStudentData, generateShareLink } from './api/data-api';
import { StudentData } from './types/data-types';

// 示例：接收数据并生成链接
const studentData: StudentData = {
  student_name: "小明",
  current_level: 3,
  days_since_first_large_order: 365,
  current_class_hours: 120,
  // ... 其他字段
};

const result = receiveStudentData(studentData);
if (result.success) {
  console.log('分享链接:', result.shareLink);
  // 将 result.shareLink 发送给用户
} else {
  console.error('错误:', result.error);
}
```

### 方式三：后端直接生成链接

后端可以直接调用 `generateShareLink` 函数生成链接：

```typescript
import { generateShareLink } from './api/data-api';

const shareLink = generateShareLink(studentData, 'https://your-domain.com');
// 返回: https://your-domain.com?data=eyJzdHVkZW50X25hbWUiOiL...
```

## 📋 JSON数据格式

### 必需字段
- `student_name` (string): 学生姓名

### 完整字段列表

```json
{
  "student_name": "小明",
  "current_level": 3,
  "days_since_first_large_order": 365,
  "current_class_hours": 120,
  "current_learning_phase_completion_rate": 75,
  "preview_rate": 90,
  "review_rate": 88,
  "opening_rate": 92,
  "highest_score_in_recent_unit_tests": 95,
  "contents_of_the_letter_to_parents": "给家长的信内容",
  "contents_of_the_letter_to_childs": "给孩子的信内容",
  "current_english_growth": 3,
  "next_stage_of_language_skills": "下一阶段语言技能",
  "advice_after_class": "课后建议",
  "current_ability_acquired": "当前已获得能力",
  "school_ability": "对应的学校能力",
  "current_classes_num": 48,
  "current_learning_progress_one": "学习进度第一小块",
  "current_learning_progress_two": "学习进度第二小块",
  "current_learning_progress_three": "学习进度第三小块",
  "current_level_corresponds_to_grade": "小学三年级",
  "current_learning_topics": "当前学习主题",
  "target_level": 5,
  "target_level_corresponding_to_grade": "小学五年级",
  "target_learning_progress_one": "目标学习进度",
  "target_learning_topics": "目标学习主题",
  "target_ability_acquired": "目标已获得能力",
  "preschool_video_link": "https://example.com/video1.mp4",
  "post_learning_video_link": "https://example.com/video2.mp4",
  "study_planning": "学习规划内容"
}
```

## 🔗 分享链接格式

生成的分享链接格式如下：
```
https://your-domain.com/?data=<base64编码的数据>
```

示例：
```
https://example.com/?data=eyJzdHVkZW50X25hbWUiOiLliJrkuI0iLCJjdXJyZW50X2xldmVsIjozfQ
```

## 📱 用户端使用

1. **接收链接**
   - 用户通过微信、短信等方式收到分享链接

2. **打开链接**
   - 点击链接，自动在浏览器中打开
   - 系统会自动检测URL中的`data`参数

3. **自动加载数据**
   - 系统自动解码URL中的数据
   - 将数据映射到应用的各个页面
   - 用户可以直接查看所有页面内容

## 🔧 API函数说明

### `receiveStudentData(data: StudentData)`

接收学生数据并生成分享链接。

**参数：**
- `data`: StudentData类型的学生数据

**返回：**
```typescript
{
  success: boolean;
  shareLink: string;
  error?: string;
}
```

### `generateShareLink(data: StudentData, baseUrl?: string)`

生成分享链接。

**参数：**
- `data`: StudentData类型的学生数据
- `baseUrl`: 可选，基础URL（默认使用当前域名）

**返回：**
- `string`: 完整的分享链接

### `getDataFromUrl()`

从当前URL获取数据。

**返回：**
- `StudentData | null`: 解码后的学生数据，如果URL中没有数据则返回null

### `mapStudentDataToAppData(studentData: StudentData, currentAppData?: AppData)`

将StudentData映射到AppData。

**参数：**
- `studentData`: 学生数据
- `currentAppData`: 可选，当前应用数据（用于合并）

**返回：**
- `AppData`: 映射后的应用数据

## ⚠️ 注意事项

1. **数据大小限制**
   - URL长度有限制，建议单个JSON数据不超过10KB
   - 如果数据较大，建议使用后端存储+ID的方式

2. **数据安全**
   - URL中的数据是base64编码，不是加密
   - 敏感数据建议使用HTTPS传输
   - 可以考虑添加数据签名验证

3. **浏览器兼容性**
   - 现代浏览器都支持
   - 移动端浏览器（微信内置浏览器、Safari、Chrome等）完全支持

4. **链接有效期**
   - 链接本身没有过期时间
   - 数据编码在URL中，只要链接完整即可访问

## 🐛 常见问题

### Q: 链接太长怎么办？
A: 如果数据很大，可以考虑：
- 只传递关键字段
- 使用后端存储+ID的方式
- 使用短链接服务

### Q: 如何在后端集成？
A: 后端可以：
1. 调用 `generateShareLink` 函数生成链接
2. 或者直接构造URL：`baseUrl + '?data=' + encodeDataToUrl(data)`

### Q: 数据格式错误怎么办？
A: 系统会显示详细的错误信息，请检查：
- JSON格式是否正确
- 必需字段是否存在
- 数据类型是否正确

## 📞 技术支持

如有问题，请检查：
1. JSON格式是否正确
2. 必需字段是否存在
3. 浏览器控制台是否有错误信息

