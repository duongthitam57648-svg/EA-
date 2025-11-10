@echo off
chcp 65001 >nul
title 配置SSH并推送
color 0B
cls

echo.
echo ════════════════════════════════════════
echo   配置 SSH 方式推送（推荐）
echo ════════════════════════════════════════
echo.

echo SSH方式不需要密码，更稳定快速！
echo.

echo [步骤1] 检查SSH密钥...
if exist "%USERPROFILE%\.ssh\id_rsa.pub" (
    echo ✅ SSH密钥已存在
    goto :show_key
) else (
    echo ⚠️  未找到SSH密钥，需要生成
    echo.
    echo 请输入你的邮箱（用于生成SSH密钥）：
    set /p EMAIL="邮箱: "
    echo.
    echo 正在生成SSH密钥...
    ssh-keygen -t rsa -b 4096 -C "%EMAIL%" -f "%USERPROFILE%\.ssh\id_rsa" -N ""
    echo ✅ 密钥已生成
)

:show_key
echo.
echo [步骤2] 显示公钥（需要添加到GitHub）...
echo.
echo ════════════════════════════════════════
type "%USERPROFILE%\.ssh\id_rsa.pub"
echo ════════════════════════════════════════
echo.
echo 📋 请复制上面的公钥内容
echo.

echo [步骤3] 添加到GitHub...
echo.
echo 1. 访问: https://github.com/settings/keys
echo 2. 点击 "New SSH key"
echo 3. Title: 填写 "My Computer"
echo 4. Key: 粘贴上面的公钥
echo 5. 点击 "Add SSH key"
echo.
echo 完成后，按任意键继续...
pause >nul
echo.

echo [步骤4] 修改远程仓库地址为SSH...
git remote set-url origin git@github.com:GHVBUGB/EA.git
echo ✅ 已切换到SSH方式
echo.

echo [步骤5] 测试SSH连接...
ssh -T git@github.com 2>&1 | findstr "successfully"
if errorlevel 1 (
    echo ⚠️  SSH连接测试未通过，但可以尝试推送
) else (
    echo ✅ SSH连接成功
)
echo.

echo [步骤6] 配置用户信息...
git config --global user.name "GHVBUGB"
echo ✅ 完成
echo.

echo [步骤7] 准备推送...
git add .
git commit -m "Deploy: 学生报告展示应用" 2>nul
git branch -M main 2>nul
echo ✅ 完成
echo.

echo [步骤8] 使用SSH推送到GitHub...
echo.
git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ SSH推送失败
    echo.
    echo 可能原因：
    echo   1. 公钥未正确添加到GitHub
    echo   2. SSH服务被防火墙阻止
    echo.
    echo 💡 备用方案：使用 GitHub Desktop
    echo    下载地址: https://desktop.github.com/
    echo.
) else (
    echo.
    echo ✅ 推送成功！
    echo.
    echo 📦 仓库: https://github.com/GHVBUGB/EA
    echo 🌐 部署地址: https://ghvbugb.github.io/EA/
    echo.
    echo 📋 下一步：
    echo   1. 访问: https://github.com/GHVBUGB/EA
    echo   2. Settings → Pages → Source: GitHub Actions
    echo   3. 等待自动部署
    echo.
)

pause

