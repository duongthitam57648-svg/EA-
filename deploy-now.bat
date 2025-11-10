@echo off
echo ========================================
echo   Deploying to GHVBUGB/EA
echo ========================================
echo.

echo [1] Adding files...
git add .
echo Done
echo.

echo [2] Committing...
git commit -m "Deploy: Student Report Application"
echo Done
echo.

echo [3] Setting branch...
git branch -M main
echo Done
echo.

echo [4] Pushing to GitHub...
git push -u origin main
echo.

echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Repository: https://github.com/GHVBUGB/EA
echo.
pause

