@echo off
chcp 65001 >nul
title 推送到GHVBUGB/EA仓库
color 0B
cls

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║        推送到 GHVBUGB/EA 仓库                            ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

echo [1/7] 配置Git用户信息...
git config --global user.name "GHVBUGB"
echo ✅ Git用户名已设置为: GHVBUGB
echo.
echo 请输入你的GitHub邮箱:
set /p GIT_EMAIL="邮箱: "
if "%GIT_EMAIL%"=="" (
    set GIT_EMAIL=GHVBUGB@users.noreply.github.com
)
git config --global user.email "%GIT_EMAIL%"
echo ✅ Git邮箱已设置
echo.

echo [2/7] 初始化Git仓库...
if not exist .git (
    git init >nul 2>&1
    echo ✅ Git仓库已初始化
) else (
    echo ✅ Git仓库已存在
)
echo.

echo [3/7] 添加所有文件...
git add . >nul 2>&1
if %errorlevel% neq 0 (
    echo [❌] 添加文件失败
    pause
    exit /b 1
)
echo ✅ 所有文件已添加
echo.

echo [4/7] 提交代码...
git commit -m "Initial commit: 学生报告展示应用 - 完整项目" 2>nul
if %errorlevel% neq 0 (
    echo 检查是否有更改...
    git status --porcelain >nul 2>&1
    if %errorlevel% equ 0 (
        git commit -m "Update: 更新项目文件" >nul 2>&1
        echo ✅ 代码已提交
    ) else (
        echo ℹ️  所有文件已提交，跳过
    )
) else (
    echo ✅ 代码已提交
)
echo.

echo [5/7] 配置远程仓库...
set REPO_URL=https://github.com/GHVBUGB/EA.git
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
if %errorlevel% neq 0 (
    echo [❌] 配置远程仓库失败
    pause
    exit /b 1
)
echo ✅ 远程仓库已配置: %REPO_URL%
echo.

echo [6/7] 设置主分支...
git branch -M main >nul 2>&1
echo ✅ 主分支已设置为 main
echo.

echo [7/7] 推送到GitHub...
echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║                   推送提示                               ║
echo ╚══════════════════════════════════════════════════════════╝
echo.
echo 如果提示输入用户名和密码：
echo   用户名: GHVBUGB
echo   密码: Personal Access Token（不是GitHub密码！）
echo.
echo 🔐 如何获取Token:
echo   1. 访问: https://github.com/settings/tokens
echo   2. Generate new token (classic)
echo   3. Note: "Git Push"
echo   4. 勾选 "repo" 权限（必须！）
echo   5. 生成并复制Token
echo.
echo ════════════════════════════════════════════════════════════
echo.
pause
echo.

echo 正在推送...
git push -u origin main 2>&1
set PUSH_RESULT=%errorlevel%

if %PUSH_RESULT% equ 0 (
    echo.
    echo ╔══════════════════════════════════════════════════════════╗
    echo ║              ✅ 推送成功！                              ║
    echo ╚══════════════════════════════════════════════════════════╝
    echo.
    echo 📦 仓库地址: %REPO_URL%
    echo 🌐 GitHub Pages地址: https://ghvbugb.github.io/EA/
    echo.
    echo 📋 下一步：
    echo   1. 访问: https://github.com/GHVBUGB/EA
    echo   2. 点击 Settings → Pages
    echo   3. Source 选择: GitHub Actions ✅
    echo   4. 等待2-3分钟自动部署完成
    echo   5. 访问: https://ghvbugb.github.io/EA/
    echo.
    echo 📱 使用部署链接：
    echo   在应用中输入域名: ghvbugb.github.io/EA
    echo.
) else (
    echo.
    echo ╔══════════════════════════════════════════════════════════╗
    echo ║              ⚠️  推送可能需要认证                      ║
    echo ╚══════════════════════════════════════════════════════════╝
    echo.
    echo 如果推送失败，请：
    echo   1. 获取Personal Access Token（见上方说明）
    echo   2. 推送时使用Token作为密码
    echo   3. 或者尝试强制推送: git push -u origin main --force
    echo.
)

pause

