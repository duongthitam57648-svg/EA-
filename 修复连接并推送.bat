@echo off
chcp 65001 >nul
title 修复GitHub连接并推送
color 0E
cls

echo.
echo ════════════════════════════════════════
echo   修复 GitHub 连接问题
echo ════════════════════════════════════════
echo.

echo [步骤1] 取消代理设置...
git config --global --unset http.proxy 2>nul
git config --global --unset https.proxy 2>nul
echo ✅ 完成
echo.

echo [步骤2] 优化网络配置...
git config --global http.postBuffer 524288000
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999
echo ✅ 完成
echo.

echo [步骤3] 刷新DNS缓存...
ipconfig /flushdns >nul 2>&1
echo ✅ 完成
echo.

echo [步骤4] 测试GitHub连接...
ping -n 2 github.com
echo.

echo [步骤5] 配置用户信息...
git config --global user.name "GHVBUGB"
echo ✅ 完成
echo.

echo [步骤6] 准备推送...
git add .
git commit -m "Deploy: 学生报告展示应用" 2>nul
git branch -M main 2>nul
echo ✅ 完成
echo.

echo [步骤7] 推送到GitHub...
echo ⚠️  如果失败，请按Ctrl+C结束，然后使用SSH方式
echo.
pause
echo.

git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ HTTPS推送失败
    echo.
    echo 📋 解决方案：
    echo   1. 使用 SSH 方式（推荐）- 运行 "配置SSH推送.bat"
    echo   2. 使用 GitHub Desktop
    echo   3. 检查网络代理设置
    echo.
) else (
    echo.
    echo ✅ 推送成功！
    echo.
    echo 📦 仓库: https://github.com/GHVBUGB/EA
    echo 🌐 部署地址: https://ghvbugb.github.io/EA/
    echo.
)

pause

