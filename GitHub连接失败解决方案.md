# 🔧 GitHub 连接失败解决方案

## 问题原因

```
fatal: unable to access 'https://github.com/GHVBUGB/EA.git/': 
Failed to connect to github.com port 443 after 21064 ms
```

这是网络连接问题，可能原因：
1. 网络代理设置问题
2. 防火墙阻止
3. DNS 解析问题
4. 网络不稳定

## 解决方案

### 方案1：检查并配置代理（如果使用VPN或代理）

在 CMD 中执行：

```cmd
# 检查当前代理设置
git config --global http.proxy
git config --global https.proxy

# 如果使用代理，设置代理（替换为你的代理地址和端口）
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# 如果不使用代理，取消代理设置
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 方案2：使用 SSH 方式推送（推荐）

1. **生成 SSH 密钥**（如果还没有）：
```cmd
ssh-keygen -t rsa -b 4096 -C "你的邮箱@example.com"
```
一路回车即可。

2. **复制公钥**：
```cmd
type %USERPROFILE%\.ssh\id_rsa.pub
```
复制显示的内容。

3. **添加到 GitHub**：
   - 访问：https://github.com/settings/keys
   - 点击 "New SSH key"
   - 粘贴公钥，保存

4. **修改远程仓库地址为 SSH**：
```cmd
cd /d "C:\Users\guhongji\Desktop\还原设计稿"
git remote set-url origin git@github.com:GHVBUGB/EA.git
git push -u origin main
```

### 方案3：修改 DNS（解决 GitHub 访问问题）

1. **修改 hosts 文件**：
   - 以管理员身份打开记事本
   - 打开文件：`C:\Windows\System32\drivers\etc\hosts`
   - 添加以下内容：
   ```
   140.82.113.4 github.com
   199.232.69.194 github.global.ssl.fastly.net
   ```
   - 保存

2. **刷新 DNS**：
```cmd
ipconfig /flushdns
```

3. **重试推送**：
```cmd
cd /d "C:\Users\guhongji\Desktop\还原设计稿"
git push -u origin main
```

### 方案4：增加超时时间并重试

```cmd
cd /d "C:\Users\guhongji\Desktop\还原设计稿"
git config --global http.postBuffer 524288000
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999
git push -u origin main
```

### 方案5：使用 GitHub Desktop（最简单）

1. 下载 GitHub Desktop：https://desktop.github.com/
2. 登录 GitHub 账号
3. 添加本地仓库：`C:\Users\guhongji\Desktop\还原设计稿`
4. 点击 "Push origin" 按钮

## 快速诊断

在 CMD 中执行以下命令，检查网络：

```cmd
# 测试 GitHub 连接
ping github.com

# 测试 HTTPS 连接
curl -I https://github.com

# 检查 Git 配置
git config --list | findstr proxy
```

## 推荐流程

1. **先尝试方案1**：取消代理设置（如果不用代理）
2. **如果还不行，尝试方案2**：使用 SSH（最稳定）
3. **如果网络问题严重，使用方案5**：GitHub Desktop

请告诉我你是否使用代理或 VPN，我可以提供更具体的解决方案。

