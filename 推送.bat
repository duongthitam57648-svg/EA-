@echo off
chcp 65001 >nul
echo 正在推送到 GitHub...
echo.
git config --global user.name "GHVBUGB"
git add .
git commit -m "Deploy: 学生报告展示应用" 2>nul
if errorlevel 1 git commit -m "Update: 更新项目文件" 2>nul
git branch -M main 2>nul
echo.
echo 正在推送到 https://github.com/GHVBUGB/EA.git
echo 如果提示输入用户名和密码：
echo   用户名: GHVBUGB
echo   密码: Personal Access Token
echo.
git push -u origin main
echo.
if errorlevel 1 (
    echo 推送失败，可能需要认证
    echo 请使用Personal Access Token作为密码
) else (
    echo 推送成功！
    echo 仓库地址: https://github.com/GHVBUGB/EA
    echo 部署地址: https://ghvbugb.github.io/EA/
)
pause

