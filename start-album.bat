@echo off
title Trung-Ha and Adelaide Friends - 3D Photo Album & Slideshow
echo ===================================================================
echo   TRUNG-HA ^& ADELAIDE FRIENDS - 3D PHOTO ALBUM ^& SLIDESHOW
echo ===================================================================
echo Starting local web server on http://localhost:3000 ...
echo.

where agy-node >nul 2>nul
if %errorlevel% equ 0 (
  agy-node server.js
  goto :end
)

if exist "%APPDATA%\Antigravity\bin\agy-node.cmd" (
  "%APPDATA%\Antigravity\bin\agy-node.cmd" server.js
  goto :end
)

where node >nul 2>nul
if %errorlevel% equ 0 (
  node server.js
  goto :end
)

echo Starting with default browser directly...
start "" "%~dp0index.html"

:end
pause
