@echo off
chcp 65001 >nul
title GitHub项目自动部署工具
color 0B
cls

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║        GitHub项目自动部署工具 v2.0                      ║
echo ║        仓库: duongthitam57648-svg/EA-                   ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

:: 检查Git
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [❌] Git未安装！
    echo.
    echo 请先安装Git: https://git-scm.com/download/win
    echo 安装后重新运行此脚本
    pause
    exit /b 1
)
echo [✅] Git已安装
git --version
echo.

:: 配置Git用户
echo [1/8] 配置Git用户信息...
git config --global user.name "duongthitam57648-svg" >nul 2>&1
if not defined GIT_EMAIL (
    echo 请输入你的GitHub邮箱（用于Git提交）:
    set /p GIT_EMAIL="邮箱: "
    if "%GIT_EMAIL%"=="" (
        set GIT_EMAIL=duongthitam57648-svg@users.noreply.github.com
    )
)
git config --global user.email "%GIT_EMAIL%" >nul 2>&1
echo Git用户: 
git config --global user.name
git config --global user.email
echo.

:: 初始化仓库
echo [2/8] 初始化Git仓库...
if not exist .git (
    git init >nul 2>&1
    echo ✅ Git仓库已初始化
) else (
    echo ✅ Git仓库已存在
)
echo.

:: 添加文件
echo [3/8] 添加所有文件到暂存区...
git add . >nul 2>&1
if %errorlevel% neq 0 (
    echo [❌] 添加文件失败
    pause
    exit /b 1
)
echo ✅ 所有文件已添加到暂存区
echo.

:: 提交代码
echo [4/8] 提交代码...
git commit -m "Initial commit: 学生报告展示应用 - 完整项目" >nul 2>&1
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

:: 配置远程仓库
echo [5/8] 配置远程仓库...
set REPO_URL=https://github.com/duongthitam57648-svg/EA-.git
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL% >nul 2>&1
if %errorlevel% neq 0 (
    echo [❌] 配置远程仓库失败
    pause
    exit /b 1
)
echo ✅ 远程仓库已配置
echo    地址: %REPO_URL%
echo.

:: 设置主分支
echo [6/8] 设置主分支...
git branch -M main >nul 2>&1
echo ✅ 主分支已设置为 main
echo.

:: 显示推送提示
echo [7/8] 准备推送到GitHub...
echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║                   重要提示                               ║
echo ╚══════════════════════════════════════════════════════════╝
echo.
echo 推送时需要GitHub认证，请准备：
echo.
echo 📋 用户名: duongthitam57648-svg
echo 🔑 密码: Personal Access Token（不是GitHub密码！）
echo.
echo 🔐 如何获取Token（如果还没有）:
echo    1. 访问: https://github.com/settings/tokens
echo    2. 点击 "Generate new token (classic)"
echo    3. Note: 填写 "Git Push"
echo    4. 勾选 "repo" 权限（必须！）
echo    5. 点击 "Generate token"
echo    6. 立即复制Token（只显示一次！）
echo.
echo ════════════════════════════════════════════════════════════
echo.
pause
echo.

:: 尝试推送
echo [8/8] 正在推送到GitHub...
echo.
git push -u origin main 2>&1
set PUSH_RESULT=%errorlevel%

if %PUSH_RESULT% equ 0 (
    echo.
    echo ╔══════════════════════════════════════════════════════════╗
    echo ║              ✅ 推送成功！                              ║
    echo ╚══════════════════════════════════════════════════════════╝
    echo.
    echo 📦 仓库地址: %REPO_URL%
    echo.
    echo 📋 下一步操作：
    echo    1. 访问: https://github.com/duongthitam57648-svg/EA-
    echo    2. 点击 Settings → Pages
    echo    3. Source 选择: GitHub Actions ✅
    echo    4. 等待2-3分钟自动部署完成
    echo    5. 访问: https://duongthitam57648-svg.github.io/EA-/
    echo.
    echo 📱 使用部署链接：
    echo    在应用中输入域名: duongthitam57648-svg.github.io/EA-
    echo.
) else (
    echo.
    echo ╔══════════════════════════════════════════════════════════╗
    echo ║              ❌ 推送失败                                  ║
    echo ╚══════════════════════════════════════════════════════════╝
    echo.
    echo 可能的原因：
    echo    1. 认证失败 - 需要使用Personal Access Token
    echo    2. 仓库权限问题 - 确认有写入权限
    echo    3. 网络连接问题
    echo.
    echo 💡 解决方案：
    echo.
    echo 方案A：强制推送（会覆盖远程仓库内容）
    echo    git push -u origin main --force
    echo.
    echo 方案B：手动推送
    echo    1. 获取Personal Access Token（见上方说明）
    echo    2. 执行: git push -u origin main
    echo    3. 输入用户名和Token
    echo.
    echo 方案C：使用GitHub Desktop（最简单）
    echo    1. 下载: https://desktop.github.com/
    echo    2. 登录GitHub账号
    echo    3. 添加本地仓库并推送
    echo.
)

pause

