# Vercel部署指南

## 🚀 快速部署到Vercel（推荐）

Vercel提供免费的静态网站托管，支持全球CDN加速，任何人都可以访问你的分享链接。

### 步骤1：安装Vercel CLI（可选）

```bash
npm install -g vercel
```

### 步骤2：构建项目

```bash
npm run build
```

### 步骤3：部署

**方式A：使用Vercel网站（最简单）**

1. 访问 https://vercel.com
2. 使用GitHub账号登录
3. 点击 "New Project"
4. 导入你的项目（需要先推送到GitHub）
5. 点击 "Deploy"

**方式B：使用Vercel CLI**

```bash
vercel
```

按照提示操作即可。

### 步骤4：获取部署链接

部署完成后，你会得到一个链接，例如：
```
https://your-project-name.vercel.app
```

### 步骤5：更新分享链接生成

部署后，在"接收数据"对话框中：
- 取消勾选"使用IP地址"
- 或者输入你的Vercel域名

生成的链接就会使用Vercel域名，例如：
```
https://your-project-name.vercel.app/?data=...
```

## 📱 优势

- ✅ 免费
- ✅ 全球CDN加速
- ✅ HTTPS自动配置
- ✅ 手机可以直接访问
- ✅ 无需配置服务器
- ✅ 自动部署（连接GitHub后）

## 🔄 更新部署

每次修改代码后：
1. 推送到GitHub
2. Vercel会自动重新部署
3. 或者运行 `vercel --prod`

