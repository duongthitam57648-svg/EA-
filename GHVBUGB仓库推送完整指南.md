# 🚀 推送到 GHVBUGB/EA 仓库 - 完整指南

## 仓库信息
- **GitHub 仓库**: https://github.com/GHVBUGB/EA
- **部署地址**: https://ghvbugb.github.io/EA/
- **当前状态**: 仓库为空，等待首次推送

## 问题诊断

您遇到的错误：
```
fatal: unable to access 'https://github.com/GHVBUGB/EA.git/': 
Failed to connect to github.com port 443
```

这是 **网络连接问题**，不是代码问题。

## 解决方案（3选1）

### ⭐ 方案1：使用 GitHub Desktop（强烈推荐，最简单）

**优点**：
- ✅ 图形界面，易用
- ✅ 自动处理认证
- ✅ 稳定可靠，不受网络波动影响
- ✅ 不需要配置

**步骤**：
1. 下载并安装：https://desktop.github.com/
2. 登录 GitHub 账号（GHVBUGB）
3. File → Add Local Repository
4. 选择：`C:\Users\guhongji\Desktop\还原设计稿`
5. 点击 "Publish repository" 按钮
6. 确认仓库名为 `EA`，取消勾选 "Keep this code private"
7. 点击 "Publish repository"

**完成！** 代码会自动上传到 GitHub。

---

### 🔐 方案2：配置 SSH 推送（最稳定）

**优点**：
- ✅ 不需要每次输入密码
- ✅ 速度快，稳定
- ✅ 不受 HTTPS 代理影响

**步骤**：

1. **运行脚本**：双击 `配置SSH推送.bat`

2. **或手动配置**：

   在 CMD 中执行：
   ```cmd
   cd /d "C:\Users\guhongji\Desktop\还原设计稿"
   
   # 生成 SSH 密钥（如果还没有）
   ssh-keygen -t rsa -b 4096 -C "你的邮箱@example.com"
   # 一路回车即可
   
   # 显示公钥
   type %USERPROFILE%\.ssh\id_rsa.pub
   ```

3. **添加公钥到 GitHub**：
   - 复制显示的公钥内容
   - 访问：https://github.com/settings/keys
   - 点击 "New SSH key"
   - Title: `My Computer`
   - Key: 粘贴公钥
   - 点击 "Add SSH key"

4. **切换到 SSH 并推送**：
   ```cmd
   cd /d "C:\Users\guhongji\Desktop\还原设计稿"
   git remote set-url origin git@github.com:GHVBUGB/EA.git
   git push -u origin main
   ```

---

### 🌐 方案3：修复网络并重试 HTTPS

**步骤**：

1. **运行诊断脚本**：双击 `完整诊断推送.bat`

2. **或手动执行**：

   在 CMD 中：
   ```cmd
   cd /d "C:\Users\guhongji\Desktop\还原设计稿"
   
   # 清除代理设置
   git config --global --unset http.proxy
   git config --global --unset https.proxy
   
   # 优化网络配置
   git config --global http.postBuffer 524288000
   git config --global http.lowSpeedLimit 0
   git config --global http.lowSpeedTime 999999
   
   # 重试推送
   git push -u origin main
   ```

3. **如果提示输入用户名和密码**：
   - 用户名：`GHVBUGB`
   - 密码：Personal Access Token（获取方法见下方）

---

## 🔐 获取 Personal Access Token

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. Note: 填写 `Git Push`
4. **重要**：勾选 `repo` 权限（所有子选项）
5. 拉到底部，点击 "Generate token"
6. **立即复制 Token**（只显示一次！）
7. 推送时作为密码使用

---

## 推送成功后的步骤

### 1. 配置 GitHub Pages

1. 访问：https://github.com/GHVBUGB/EA/settings/pages
2. **Source** 选择：`GitHub Actions` ✅
3. 等待 2-3 分钟，GitHub Actions 会自动部署
4. 查看部署状态：https://github.com/GHVBUGB/EA/actions

### 2. 访问部署的网站

- **网站地址**：https://ghvbugb.github.io/EA/
- 等待几分钟后访问

### 3. 使用部署链接生成分享链接

1. 在应用中点击"接收数据"按钮
2. 在"方案2：使用部署域名"中输入：
   ```
   ghvbugb.github.io/EA
   ```
3. 粘贴 JSON 数据并生成链接
4. 分享链接格式：`https://ghvbugb.github.io/EA/?data=...`
5. **手机可以直接打开！** 📱

---

## 我的建议

**如果不熟悉命令行** → 使用方案1（GitHub Desktop）  
**如果追求稳定性** → 使用方案2（SSH）  
**如果网络正常** → 使用方案3（HTTPS + Token）

**最推荐：GitHub Desktop**，简单可靠，不会出错。

---

## 常见问题

### Q: 推送时显示 403 错误？
A: 使用 Personal Access Token 作为密码，不是 GitHub 账号密码。

### Q: 推送后网站打不开？
A: 
1. 检查 GitHub Actions 是否部署成功
2. 确认 Pages 设置为 GitHub Actions
3. 等待 2-3 分钟

### Q: 网络一直连接不上 GitHub？
A: 
1. 使用 GitHub Desktop（不受网络限制）
2. 或配置 SSH
3. 或检查代理/防火墙设置

---

## 需要帮助？

如果遇到问题，请告诉我：
1. 使用的是哪个方案
2. 具体的错误信息
3. 是否使用 VPN 或代理

祝您部署成功！🎉

