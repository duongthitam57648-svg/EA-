@echo off
chcp 65001 >nul
title 修复权限问题并推送
color 0C
cls

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║        修复Git权限问题并推送项目                        ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

echo [问题诊断]
echo 错误: Permission denied to GHVBUGB
echo 原因: Git用户身份与仓库所有者不匹配
echo.

echo [1/8] 清除Git凭据缓存...
git credential-manager-core erase <nul 2>&1
git credential reject https://github.com 2>nul
echo ✅ Git凭据已清除
echo.

echo [2/8] 配置正确的Git用户信息...
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

echo [3/8] 检查当前Git配置...
echo Git用户名: 
git config --global user.name
echo Git邮箱: 
git config --global user.email
echo.

echo [4/8] 删除旧的远程仓库配置...
git remote remove origin 2>nul
echo ✅ 旧的远程仓库已删除
echo.

echo [5/8] 重新添加远程仓库...
git remote add origin https://github.com/GHVBUGB/EA.git
if %errorlevel% neq 0 (
    echo [❌] 添加远程仓库失败
    pause
    exit /b 1
)
echo ✅ 远程仓库已配置
echo.

echo [6/8] 添加并提交所有文件...
git add . >nul 2>&1
git commit -m "Initial commit: 学生报告展示应用" 2>nul
if %errorlevel% neq 0 (
    echo ℹ️  文件已提交或没有新更改
) else (
    echo ✅ 文件已提交
)
echo.

echo [7/8] 设置主分支...
git branch -M main 2>nul
echo ✅ 主分支已设置
echo.

echo [8/8] 准备推送到GitHub...
echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║                   重要提示                               ║
echo ╚══════════════════════════════════════════════════════════╝
echo.
echo ⚠️  推送时需要重新认证！
echo.
echo 当提示输入用户名和密码时：
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
    echo 📦 仓库地址: https://github.com/GHVBUGB/EA
    echo.
    echo 📋 下一步：
    echo   1. 访问: https://github.com/GHVBUGB/EA
    echo   2. Settings → Pages → Source: GitHub Actions
    echo   3. 等待2-3分钟自动部署
    echo   4. 访问: https://ghvbugb.github.io/EA/
    echo.
) else (
    echo.
    echo ╔══════════════════════════════════════════════════════════╗
    echo ║              ❌ 推送失败                                  ║
    echo ╚══════════════════════════════════════════════════════════╝
    echo.
    echo 可能的原因：
    echo   1. 认证失败 - 需要使用Personal Access Token
    echo   2. Token权限不足 - 确保勾选了repo权限
    echo   3. 仓库权限问题 - 确认你是仓库所有者或有写入权限
    echo.
    echo 💡 解决方案：
    echo   1. 获取新的Personal Access Token
    echo   2. 确保Token有repo权限
    echo   3. 推送时使用Token作为密码
    echo   4. 如果还不行，检查仓库设置中的协作者权限
    echo.
)

pause

