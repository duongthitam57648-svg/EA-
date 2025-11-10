@echo off
chcp 65001 >nul
title 快速推送到GHVBUGB/EA
color 0A
cls

echo.
echo ========================================
echo   推送到 GHVBUGB/EA 仓库
echo ========================================
echo.

echo [1] 配置Git用户...
git config --global user.name "GHVBUGB"
echo ✅ 完成
echo.

echo [2] 添加所有文件...
git add .
echo ✅ 完成
echo.

echo [3] 提交代码...
git commit -m "Deploy: 学生报告展示应用" 2>nul || git commit -m "Update: 更新项目文件"
echo ✅ 完成
echo.

echo [4] 设置主分支...
git branch -M main 2>nul
echo ✅ 完成
echo.

echo [5] 推送到GitHub...
echo.
echo ⚠️  如果提示输入用户名和密码：
echo    用户名: GHVBUGB
echo    密码: Personal Access Token
echo.
pause
echo.

git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ 推送成功！
    echo.
    echo 📦 仓库: https://github.com/GHVBUGB/EA
    echo 🌐 部署地址: https://ghvbugb.github.io/EA/
    echo.
    echo 📋 下一步：
    echo   1. 访问仓库设置
    echo   2. Settings → Pages → Source: GitHub Actions
    echo   3. 等待自动部署
    echo.
) else (
    echo.
    echo ⚠️  推送可能需要认证
    echo 请使用Personal Access Token作为密码
    echo.
)

pause

