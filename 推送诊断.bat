@echo off
chcp 65001 >nul
echo ========================================
echo GitHub 推送诊断和修复脚本
echo ========================================
echo.

echo [检查1] Git版本...
git --version
if %errorlevel% neq 0 (
    echo ❌ Git未安装，请先安装Git
    echo 下载地址: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo ✅ Git已安装
echo.

echo [检查2] Git用户配置...
git config --global user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️ 未配置Git用户信息
    echo 正在配置...
    git config --global user.name "duongthitam57648-svg"
    echo 请输入你的GitHub邮箱:
    set /p USER_EMAIL="邮箱: "
    git config --global user.email "%USER_EMAIL%"
) else (
    echo ✅ Git用户已配置
    git config --global user.name
    git config --global user.email
)
echo.

echo [检查3] 检查Git仓库状态...
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo 初始化Git仓库...
    git init
)
echo ✅ Git仓库已初始化
echo.

echo [步骤1] 添加所有文件...
git add .
if %errorlevel% neq 0 (
    echo ❌ 添加文件失败
    pause
    exit /b 1
)
echo ✅ 文件已添加
echo.

echo [步骤2] 提交代码...
git commit -m "Initial commit: 学生报告展示应用" 2>nul
if %errorlevel% neq 0 (
    echo ⚠️ 可能没有新文件需要提交，或已提交过
) else (
    echo ✅ 代码已提交
)
echo.

echo [步骤3] 配置远程仓库...
set REPO_URL=https://github.com/duongthitam57648-svg/EA-.git
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
if %errorlevel% neq 0 (
    echo ❌ 配置远程仓库失败
    pause
    exit /b 1
)
echo ✅ 远程仓库已配置: %REPO_URL%
echo.

echo [步骤4] 设置主分支...
git branch -M main
echo ✅ 主分支已设置
echo.

echo [步骤5] 推送到GitHub...
echo.
echo ⚠️ 重要提示：
echo 如果提示输入用户名和密码：
echo - 用户名：输入你的GitHub用户名
echo - 密码：使用Personal Access Token（不是密码！）
echo.
echo 获取Token：
echo 1. 访问 https://github.com/settings/tokens
echo 2. Generate new token (classic)
echo 3. 勾选 repo 权限
echo 4. 生成并复制Token
echo.
pause
echo.
git push -u origin main
if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo ❌ 推送失败
    echo ========================================
    echo.
    echo 可能的原因：
    echo 1. 认证失败 - 需要使用Personal Access Token
    echo 2. 仓库权限问题 - 确认有写入权限
    echo 3. 网络问题 - 检查网络连接
    echo.
    echo 如果仓库已有内容，尝试强制推送：
    echo git push -u origin main --force
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ 代码已成功推送到GitHub！
echo ========================================
echo.
echo 仓库地址: %REPO_URL%
echo.
echo 下一步：
echo 1. 访问 https://github.com/duongthitam57648-svg/EA-
echo 2. 点击 Settings -^> Pages
echo 3. Source 选择 GitHub Actions
echo 4. 等待2-3分钟自动部署完成
echo 5. 部署后访问: https://duongthitam57648-svg.github.io/EA-/
echo.
pause

