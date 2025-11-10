@echo off
chcp 65001 >nul
echo ========================================
echo GitHub 代码推送脚本
echo ========================================
echo.

set REPO_URL=https://github.com/duongthitam57648-svg/EA-.git

echo [1/5] 检查Git状态...
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo 初始化Git仓库...
    git init
    if %errorlevel% neq 0 (
        echo 错误：Git未安装或未配置
        pause
        exit /b 1
    )
)

echo.
echo [2/5] 添加所有文件...
git add .
if %errorlevel% neq 0 (
    echo 错误：添加文件失败
    pause
    exit /b 1
)

echo.
echo [3/5] 提交代码...
git commit -m "Initial commit: 学生报告展示应用"
if %errorlevel% neq 0 (
    echo 注意：可能没有新文件需要提交，或已提交过
)

echo.
echo [4/5] 配置远程仓库...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
if %errorlevel% neq 0 (
    echo 错误：添加远程仓库失败
    pause
    exit /b 1
)
echo 远程仓库已配置: %REPO_URL%

echo.
echo [5/5] 推送到GitHub...
git branch -M main
git push -u origin main
if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo 推送失败，可能的原因：
    echo 1. 未配置GitHub认证（需要使用Personal Access Token）
    echo 2. 网络连接问题
    echo ========================================
    echo.
    echo 请手动执行以下命令：
    echo git push -u origin main
    echo.
    echo 如果提示需要认证：
    echo - 用户名：输入你的GitHub用户名
    echo - 密码：使用Personal Access Token（不是密码）
    echo.
    echo 获取Token：
    echo GitHub -^> Settings -^> Developer settings -^> Personal access tokens
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ 代码已成功推送到GitHub！
echo ========================================
echo.
echo 仓库地址: %REPO_URL%
echo.
echo 下一步：
echo 1. 访问 https://github.com/duongthitam57648-svg/EA-
echo 2. 点击 Settings -^> Pages
echo 3. Source 选择 GitHub Actions
echo 4. 等待2-3分钟自动部署完成
echo 5. 部署后访问: https://duongthitam57648-svg.github.io/EA-/
echo.
pause

