# AI Engineering Tutor - Setup Guide

This guide will help you set up both the original Python CLI version and the new web interface version of the AI Engineering Tutor.

## 📋 Prerequisites

### For Python CLI Version:
- Python 3.8 or higher
- pip (Python package manager)

### For Web Version:
- Node.js 14.0 or higher
- npm (comes with Node.js)
- Python 3.8+ (optional, for running both versions)

## 🔑 Get Your Groq API Key

1. Visit [Groq Console](https://console.groq.com/)
2. Sign up or log in to your account
3. Navigate to the **API Keys** section
4. Click **"Create API Key"**
5. Copy the generated API key (keep it secure!)

## 🐍 Python CLI Version Setup

### 1. Install Dependencies
```bash
# Install Python dependencies
pip install -r requirements.txt
```

### 2. Set Environment Variable
Create a `.env` file in the project root:
```bash
# Copy the example file
copy .env.example .env
```

Edit the `.env` file:
```env
GROQ_API_KEY=your_actual_groq_api_key_here
DEFAULT_MODEL=llama-3.3-70b-versatile
```

### 3. Run the CLI Version
```bash
python ai_engineering_tutor.py
```

## 🌐 Web Interface Setup

### 1. Install Node.js Dependencies
```bash
# Install all Node.js dependencies
npm install
```

### 2. Configure Environment
Make sure your `.env` file exists with your API key:
```env
GROQ_API_KEY=your_actual_groq_api_key_here
DEFAULT_MODEL=llama-3.3-70b-versatile
PORT=3000
NODE_ENV=development
```

### 3. Start the Web Server
```bash
# Production mode
npm start

# OR Development mode (with auto-reload)
npm run dev
```

### 4. Access the Web Interface
Open your browser and go to: `http://localhost:3000`

## 🚀 Quick Start (Web Version)

1. **Install dependencies**: `npm install`
2. **Set your API key** in `.env`: `GROQ_API_KEY=your_key_here`
3. **Start the server**: `npm start`
4. **Open browser**: Go to `http://localhost:3000`
5. **Start learning**: Click quick action buttons or type your questions!

## 📁 Project Structure

```
AI-Engineering-Tutor/
├── ai_engineering_tutor.py    # Original Python CLI version
├── requirements.txt           # Python dependencies
├── server.js                  # Node.js backend server
├── package.json              # Node.js dependencies
├── index.html                # Web interface HTML
├── styles.css                # Web interface styles
├── script.js                 # Web interface JavaScript
├── sw.js                     # Service worker for offline support
├── .env                      # Environment variables (create this)
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── README.md                 # Original project README
├── WEB_UI_README.md          # Web UI documentation
└── SETUP_GUIDE.md            # This setup guide
```

## ⚙️ Configuration Options

### Environment Variables (`.env` file)

| Variable | Description | Default |
|----------|-------------|---------|
| `GROQ_API_KEY` | Your Groq API key (required) | - |
| `DEFAULT_MODEL` | AI model to use | `llama-3.3-70b-versatile` |
| `PORT` | Server port for web version | `3000` |
| `NODE_ENV` | Environment mode | `development` |

### Available Models

- `llama-3.3-70b-versatile` (Recommended)
- `llama-3.1-70b-versatile`
- `mixtral-8x7b-32768`

## 🔧 Troubleshooting

### Common Issues

#### "API Key Required" Error
**Problem**: No API key configured
**Solution**: 
1. Check your `.env` file exists in the project root
2. Verify `GROQ_API_KEY=your_actual_key` is set correctly
3. Restart the server after changing the `.env` file

#### "Module not found" Errors
**Problem**: Missing dependencies
**Solution**:
```bash
# For Python version
pip install -r requirements.txt

# For Web version
npm install
```

#### Port Already in Use
**Problem**: Port 3000 is already occupied
**Solution**: Change the port in `.env`:
```env
PORT=3001
```

#### Can't Access Web Interface
**Problem**: Server not starting or browser can't connect
**Solution**:
1. Check server logs for errors
2. Ensure port is not blocked by firewall
3. Try accessing `http://127.0.0.1:3000` instead of `localhost`

### Python Version Issues
**Problem**: Python version compatibility
**Solution**: Ensure you have Python 3.8 or higher:
```bash
python --version
# Should show Python 3.8.x or higher
```

### Node.js Version Issues
**Problem**: Node.js version compatibility
**Solution**: Ensure you have Node.js 14.0 or higher:
```bash
node --version
# Should show v14.0.0 or higher
```

## 🔒 Security Notes

1. **Never commit your API key**: The `.env` file is in `.gitignore` to prevent accidental commits
2. **Keep your API key secure**: Don't share it publicly or include it in screenshots
3. **API key scope**: The server only uses the API key for Groq API calls
4. **Local storage**: The web version stores settings locally in your browser only

## 🚀 Deployment

### Local Network Access
To access from other devices on your local network:
```bash
# Find your local IP address
ipconfig  # Windows
ifconfig  # Mac/Linux

# Start server with host binding
# Edit server.js to add: app.listen(PORT, '0.0.0.0', ...)
```

### Cloud Deployment
For production deployment:
1. Use a production-ready Node.js server (PM2, Docker, etc.)
2. Set `NODE_ENV=production` in your environment
3. Use HTTPS for security
4. Configure proper CORS settings
5. Set up monitoring and logging

## 📞 Support

### If You're Still Having Issues:

1. **Check the logs**: 
   - Python: Look for error messages in terminal
   - Web: Check browser console (F12) and server logs

2. **Verify setup**:
   - API key is correct and active
   - All dependencies are installed
   - Port is available

3. **Test components individually**:
   - Try the Python version first: `python ai_engineering_tutor.py`
   - Test server health: `http://localhost:3000/api/health`

4. **Common solutions**:
   - Restart the server
   - Clear browser cache
   - Check firewall settings
   - Update dependencies

## 🎉 You're Ready!

Once everything is set up, you can:
- **Learn Python programming** from basics to advanced concepts
- **Understand AI and Machine Learning** with step-by-step explanations
- **Get practical examples** and coding solutions
- **Export your conversations** for future reference
- **Use either CLI or web interface** based on your preference

Happy learning with your AI Engineering Tutor! 🎓✨