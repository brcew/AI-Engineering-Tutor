@echo off
echo Activating Python virtual environment...
call venv\Scripts\activate.bat
echo.
echo Virtual environment activated!
echo Python version:
python --version
echo.
echo To run the CLI version: python ai_engineering_tutor.py
echo To run the web version: npm start
echo To deactivate: deactivate
echo.
cmd /k