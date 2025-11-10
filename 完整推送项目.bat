@echo off
chcp 65001 >nul
title GitHub项目推送工具
color 0A

echo.
echo ========================================
echo    GitHub项目完整推送工具
echo ========================================
echo.
echo 仓库地址: https://github.com/duongthitam57648-svg/EA-.git
echo.

:: 检查Git是否安装
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] Git未安装！
    echo 请先安装Git: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/7] 检查Git配置...
git config --global user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo 配置Git用户信息...
    git config --global user.name "duongthitam57648-svg"
    echo 请输入你的GitHub邮箱:
    set /p GIT_EMAIL="邮箱: "
    if "%GIT_EMAIL%"=="" (
        echo 使用默认邮箱...
        git config --global user.email "duongthitam57648-svg@users.noreply.github.com"
    ) else (
        git config --global user.email "%GIT_EMAIL%"
    )
)
echo Git用户: %USERNAME%
git config --global user.name
git config --global user.email
echo.

echo [2/7] 初始化Git仓库...
if exist .git (
    echo Git仓库已存在，跳过初始化
) else (
    git init
    if %errorlevel% neq 0 (
        echo [错误] 初始化失败
        pause
        exit /b 1
    )
    echo Git仓库初始化成功
)
echo.

echo [3/7] 添加所有文件到暂存区...
git add .
if %errorlevel% neq 0 (
    echo [错误] 添加文件失败
    pause
    exit /b 1
)
echo 文件已添加到暂存区
echo.

echo [4/7] 提交代码...
git commit -m "Initial commit: 学生报告展示应用 - 完整项目" 2>nul
if %errorlevel% neq 0 (
    echo 检查是否有未提交的更改...
    git status --short >nul 2>&1
    if %errorlevel% equ 0 (
        echo 有未提交的更改，重新提交...
        git commit -m "Update: 更新项目文件"
    ) else (
        echo 所有文件已提交，跳过
    )
)
echo 代码已提交
echo.

echo [5/7] 配置远程仓库...
set REPO_URL=https://github.com/duongthitam57648-svg/EA-.git
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
if %errorlevel% neq 0 (
    echo [错误] 配置远程仓库失败
    pause
    exit /b 1
)
echo 远程仓库已配置: %REPO_URL%
echo.

echo [6/7] 设置主分支...
git branch -M main >nul 2>&1
echo 主分支已设置为 main
echo.

echo [7/7] 推送到GitHub...
echo.
echo ========================================
echo 重要提示：
echo ========================================
echo 如果提示输入用户名和密码：
echo.
echo 用户名: duongthitam57648-svg
echo 密码: 使用Personal Access Token（不是GitHub密码！）
echo.
echo 如何获取Token:
echo 1. 访问 https://github.com/settings/tokens
echo 2. Generate new token (classic)
echo 3. 勾选 repo 权限
echo 4. 生成并复制Token
echo.
echo ========================================
echo.
pause
echo.
echo 正在推送...
git push -u origin main
set PUSH_RESULT=%errorlevel%

if %PUSH_RESULT% equ 0 (
    echo.
    echo ========================================
    echo ✅ 推送成功！
    echo ========================================
    echo.
    echo 仓库地址: %REPO_URL%
    echo.
    echo 下一步操作：
    echo 1. 访问 https://github.com/duongthitam57648-svg/EA-
    echo 2. 点击 Settings -^> Pages
    echo 3. Source 选择 GitHub Actions
    echo 4. 等待2-3分钟自动部署
    echo 5. 访问: https://duongthitam57648-svg.github.io/EA-/
    echo.
) else (
    echo.
    echo ========================================
    echo ❌ 推送失败
    echo ========================================
    echo.
    echo 可能的原因：
    echo 1. 认证失败 - 需要使用Personal Access Token
    echo 2. 仓库权限问题
    echo 3. 网络连接问题
    echo.
    echo 尝试强制推送（会覆盖远程仓库）:
    echo git push -u origin main --force
    echo.
    echo 或者手动执行推送命令
    echo.
)
pause

