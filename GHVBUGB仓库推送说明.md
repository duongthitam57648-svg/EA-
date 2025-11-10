# 🚀 推送到 GHVBUGB/EA 仓库

## 仓库信息

- **仓库地址**: https://github.com/GHVBUGB/EA.git
- **GitHub Pages地址**: https://ghvbugb.github.io/EA/

## 快速推送

**双击运行** `推送到GHVBUGB仓库.bat`，脚本会自动完成所有步骤。

## 手动推送命令

在PowerShell中执行：

```bash
# 1. 配置Git用户
git config --global user.name "GHVBUGB"
git config --global user.email "你的邮箱@example.com"

# 2. 初始化仓库（如果还没有）
git init

# 3. 添加所有文件
git add .

# 4. 提交代码
git commit -m "Initial commit: 学生报告展示应用"

# 5. 配置远程仓库
git remote remove origin 2>nul
git remote add origin https://github.com/GHVBUGB/EA.git

# 6. 设置主分支
git branch -M main

# 7. 推送到GitHub
git push -u origin main
```

## 如果提示需要认证

推送时如果提示输入用户名和密码：
- **用户名**: `GHVBUGB`
- **密码**: 使用Personal Access Token（不是GitHub密码）

### 获取Token：

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. Note: 填写 `Git Push`
4. **重要**：勾选 `repo` 权限
5. 生成并复制Token
6. 推送时作为密码使用

## 推送成功后

1. 访问 https://github.com/GHVBUGB/EA
2. 点击 **Settings** → **Pages**
3. Source 选择：**GitHub Actions** ✅
4. 等待2-3分钟自动部署完成
5. 访问：https://ghvbugb.github.io/EA/

## 📱 使用部署链接

部署完成后，在应用中：
1. 点击"接收数据"按钮
2. 在"方案2：使用部署域名"中输入：
   ```
   ghvbugb.github.io/EA
   ```
3. 粘贴JSON数据并生成链接
4. 生成的链接格式：`https://ghvbugb.github.io/EA/?data=...`
5. **手机可以直接打开！** 📱

