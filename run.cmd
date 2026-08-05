@echo off
setlocal
cd /d "%~dp0"

set "EDITOR_URL=http://127.0.0.1:8999/trying?url=displays%%2Fdemo%%2F1-%%E5%%AD%%A6%%E4%%B9%%A0%%2F%%E6%%AC%%A2%%E8%%BF%%8E.json&showLeft=true&showRight=true&showTop=true"

for /f "tokens=5" %%P in ('netstat -ano ^| findstr /r /c:":8999 .*LISTENING"') do set "UIOTOS_LISTENING=1"

if not defined UIOTOS_LISTENING (
    start "UIOTOS Server" /b node ".\uiotos\server\server.js"
    call :wait_for_server
    if errorlevel 1 (
        echo UIOTOS did not become available on port 8999.
        exit /b 1
    )
)

start "" "%EDITOR_URL%"
exit /b 0

:wait_for_server
for /l %%I in (1,1,30) do (
    curl.exe --noproxy "*" --fail --silent "http://127.0.0.1:8999/trying" >nul 2>nul && exit /b 0
    timeout /t 1 /nobreak >nul
)
exit /b 1
