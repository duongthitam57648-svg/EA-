@echo off
chcp 65001 >nul
title 修复并推送项目
color 0A
cls

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║        修复远程仓库配置并推送项目                       ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

echo [1/7] 删除旧的远程仓库配置...
git remote remove origin 2>nul
echo ✅ 旧的远程仓库已删除
echo.

echo [2/7] 添加新的远程仓库...
git remote add origin https://github.com/duongthitam57648-svg/EA-.git
if %errorlevel% neq 0 (
    echo [❌] 添加远程仓库失败
    pause
    exit /b 1
)
echo ✅ 远程仓库已配置: https://github.com/duongthitam57648-svg/EA-.git
echo.

echo [3/7] 检查Git状态...
git status --short >nul 2>&1
if %errorlevel% equ 0 (
    echo 发现未提交的文件，正在添加...
    git add .
    echo ✅ 文件已添加
) else (
    echo ✅ 所有文件已提交
)
echo.

echo [4/7] 提交代码（如果有更改）...
git commit -m "Update: 更新项目文件" 2>nul
if %errorlevel% equ 0 (
    echo ✅ 代码已提交
) else (
    echo ℹ️  没有新更改需要提交
)
echo.

echo [5/7] 设置主分支...
git branch -M main 2>nul
echo ✅ 主分支已设置
echo.

echo [6/7] 检查远程仓库状态...
git remote -v
echo.

echo [7/7] 准备推送到GitHub...
echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║                   推送提示                               ║
echo ╚══════════════════════════════════════════════════════════╝
echo.
echo 如果提示输入用户名和密码：
echo   用户名: duongthitam57648-svg
echo   密码: Personal Access Token（不是GitHub密码！）
echo.
echo 如果仓库已有内容，会提示冲突，执行：
echo   git push -u origin main --force
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
    echo 下一步：启用GitHub Pages
    echo 1. 访问: https://github.com/duongthitam57648-svg/EA-
    echo 2. Settings → Pages → Source: GitHub Actions
    echo 3. 等待部署完成
    echo 4. 访问: https://duongthitam57648-svg.github.io/EA-/
    echo.
) else (
    echo.
    echo ╔══════════════════════════════════════════════════════════╗
    echo ║              ⚠️  推送可能需要认证或强制推送            ║
    echo ╚══════════════════════════════════════════════════════════╝
    echo.
    echo 如果推送失败，尝试强制推送：
    echo   git push -u origin main --force
    echo.
    echo 或者手动执行推送命令
    echo.
)

pause

