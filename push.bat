@echo off
git config --global user.name GHVBUGB
git add .
git commit -m "Deploy to GHVBUGB/EA" 2>nul
git branch -M main 2>nul
git push -u origin main
pause
