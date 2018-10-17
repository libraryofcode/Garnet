@echo off
title PM2 Dashboard
pm2 start index
pm2 monit 
pause
