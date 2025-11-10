@echo off
chcp 65001 >nul
title 诊断并推送到 GHVBUGB/EA
color 0A
cls

echo.
echo ════════════════════════════════════════════════════
echo   诊断网络并推送到 GitHub
echo   仓库: https://github.com/GHVBUGB/EA.git
echo ════════════════════════════════════════════════════
echo.

echo [诊断1] 测试网络连接...
ping -n 1 github.com >nul 2>&1
if errorlevel 1 (
    echo ❌ 无法连接到 github.com
    echo 💡 可能需要：
    echo    1. 检查网络连接
    echo    2. 关闭VPN再试
    echo    3. 或配置代理
    goto :check_proxy
) else (
    echo ✅ 网络连接正常
)
echo.

:check_proxy
echo [诊断2] 检查代理设置...
git config --global http.proxy >nul 2>&1
if errorlevel 1 (
    echo ℹ️  未设置代理
) else (
    echo ⚠️  检测到代理设置，尝试清除...
    git config --global --unset http.proxy 2>nul
    git config --global --unset https.proxy 2>nul
    echo ✅ 已清除代理设置
)
echo.

echo [诊断3] 优化Git网络配置...
git config --global http.postBuffer 524288000
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999
git config --global http.sslVerify false
echo ✅ 配置已优化
echo.

echo [步骤1] 配置用户信息...
git config --global user.name "GHVBUGB"
set /p EMAIL="请输入GitHub邮箱: "
git config --global user.email "%EMAIL%"
echo ✅ 完成
echo.

echo [步骤2] 添加文件...
git add .
if errorlevel 1 (
    echo ❌ 添加文件失败
    pause
    exit /b 1
)
echo ✅ 完成
echo.

echo [步骤3] 提交代码...
git commit -m "Initial commit: 学生报告展示应用 - 完整项目" 2>nul
if errorlevel 1 (
    echo ℹ️  没有新的更改或已提交
) else (
    echo ✅ 提交成功
)
echo.

echo [步骤4] 确认远程仓库...
git remote -v
git remote remove origin 2>nul
git remote add origin https://github.com/GHVBUGB/EA.git
echo ✅ 远程仓库: https://github.com/GHVBUGB/EA.git
echo.

echo [步骤5] 设置主分支...
git branch -M main
echo ✅ 完成
echo.

echo ════════════════════════════════════════════════════
echo   准备推送到 GitHub
echo ════════════════════════════════════════════════════
echo.
echo 📋 如果提示输入用户名和密码：
echo    用户名: GHVBUGB
echo    密码: Personal Access Token（不是GitHub密码！）
echo.
echo 🔐 获取Token:
echo    1. 访问: https://github.com/settings/tokens
echo    2. Generate new token (classic)
echo    3. 勾选 repo 权限
echo    4. 生成并复制
echo.
echo ════════════════════════════════════════════════════
echo.
echo 按任意键开始推送...
pause >nul
echo.

echo [步骤6] 推送到 GitHub...
echo.
git push -u origin main

if errorlevel 1 (
    echo.
    echo ════════════════════════════════════════════════════
    echo   ❌ HTTPS 推送失败
    echo ════════════════════════════════════════════════════
    echo.
    echo 可能原因：
    echo   1. 网络连接问题（443端口被阻止）
    echo   2. 认证失败
    echo   3. 代理/防火墙问题
    echo.
    echo 💡 解决方案（按推荐顺序）：
    echo.
    echo [方案1] 使用 GitHub Desktop（最简单）
    echo    下载: https://desktop.github.com/
    echo    优点: 图形界面，自动处理认证，稳定可靠
    echo.
    echo [方案2] 使用 SSH（最稳定）
    echo    运行 "配置SSH推送.bat" 脚本
    echo    优点: 不需要密码，速度快，稳定
    echo.
    echo [方案3] 配置代理（如果使用VPN）
    echo    git config --global http.proxy http://127.0.0.1:端口
    echo.
    echo [方案4] 重试推送
    echo    等待几分钟后重新运行此脚本
    echo.
    pause
    exit /b 1
) else (
    echo.
    echo ════════════════════════════════════════════════════
    echo   ✅ 推送成功！
    echo ════════════════════════════════════════════════════
    echo.
    echo 📦 仓库地址: https://github.com/GHVBUGB/EA
    echo.
    echo 📋 下一步 - 配置 GitHub Pages:
    echo   1. 访问: https://github.com/GHVBUGB/EA/settings/pages
    echo   2. Source 选择: "GitHub Actions"
    echo   3. 等待 2-3 分钟自动部署
    echo   4. 部署完成后访问: https://ghvbugb.github.io/EA/
    echo.
    echo 📱 使用部署链接:
    echo   在应用中的"接收数据"功能中输入域名:
    echo   ghvbugb.github.io/EA
    echo.
    echo 🎉 恭喜！项目已成功推送到GitHub！
    echo.
)

pause

