# AI Engineering Tutor - Virtual Environment Activation Script
Write-Host "Activating Python virtual environment..." -ForegroundColor Green
& "venv\Scripts\Activate.ps1"
Write-Host ""
Write-Host "Virtual environment activated!" -ForegroundColor Green
Write-Host "Python version:" -ForegroundColor Cyan
python --version
Write-Host ""
Write-Host "Available commands:" -ForegroundColor Yellow
Write-Host "  python ai_engineering_tutor.py  # Run CLI version" -ForegroundColor White
Write-Host "  npm start                        # Run web version" -ForegroundColor White
Write-Host "  deactivate                       # Exit virtual environment" -ForegroundColor White
Write-Host ""