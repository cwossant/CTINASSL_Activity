@echo off
setlocal
cd /d "%~dp0"
title Ahon Outdoors - Development Launcher

echo ========================================================
echo        AHON OUTDOORS - DEVELOPMENT LAUNCHER
echo ========================================================
echo.
echo  [1] Start Frontend Client (Vite: http://localhost:5173)
echo  [2] Start Backend Server  (Express: port 5000)
echo  [3] Start BOTH in separate windows (Client + Server)
echo  [4] Seed Database         (Populate products to MongoDB)
echo  [5] Build Client          (Vite production build)
echo  [6] Exit
echo.
set /p CHOICE="Enter choice [1-6] (Default is 1): "

if "%CHOICE%"=="" set CHOICE=1
if "%CHOICE%"=="1" goto start_client
if "%CHOICE%"=="2" goto start_server
if "%CHOICE%"=="3" goto start_both
if "%CHOICE%"=="4" goto run_seed
if "%CHOICE%"=="5" goto run_build
if "%CHOICE%"=="6" goto end

:start_client
echo.
echo Starting Vite client...
cd client
call npm.cmd run dev
goto end

:start_server
echo.
echo Starting Express server with nodemon...
cd server
call npm.cmd run dev
goto end

:start_both
echo.
echo Launching Server in new window...
start "Ahon Backend Server" cmd /k "cd /d %~dp0server && npm.cmd run dev"
echo Launching Client in new window...
start "Ahon Frontend Client" cmd /k "cd /d %~dp0client && npm.cmd run dev"
echo Both services launched!
goto end

:run_seed
echo.
echo Seeding MongoDB products...
cd server
call npm.cmd run seed
pause
goto end

:run_build
echo.
echo Building client for production...
cd client
call npm.cmd run build
pause
goto end

:end

