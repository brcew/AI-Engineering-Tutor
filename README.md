# AI Engineering Tutor 🤖🎓

A comprehensive AI-powered tutoring system that helps beginners learn AI and Python concepts through interactive conversations. Available as both a CLI tool and a modern web interface!

## ✨ Features

### 🖥️ **Two Interface Options:**
- **🌐 Modern Web UI**: Beautiful, responsive interface with real-time chat
- **⌨️ CLI Version**: Terminal-based for developers and scripting

### 🎯 **Core Capabilities:**
- **Beginner-Friendly**: Explains complex AI/Python concepts simply
- **Step-by-Step Learning**: Breaks down topics into digestible parts
- **Prerequisites Guidance**: Directs you to learn basics before advanced topics
- **Interactive Q&A**: Natural conversation flow with context awareness

### 🚀 **Web Interface Features:**
- Real-time chat with typing indicators
- Token usage monitoring
- Conversation export (JSON)
- Quick action buttons for common topics
- Mobile-responsive design
- Offline support with service worker

### 💾 **Data & Settings:**
- Conversation history persistence
- Configurable AI models (Llama 3.3, Llama 3.1, Mixtral)
- Secure API key management
- Auto-scroll and display preferences

## 🛠️ **Quick Start**

### **Option 1: Web Interface (Recommended)**
```bash
# 1. Clone repository
git clone https://github.com/brcew/AI-Engineering-Tutor.git
cd AI-Engineering-Tutor

# 2. Install dependencies
npm install

# 3. Configure API key
copy .env.example .env
# Edit .env and add: GROQ_API_KEY=your_api_key_here

# 4. Start web server
npm start

# 5. Open browser
# Go to: http://localhost:3000
```

### **Option 2: CLI Version**
```bash
# 1. Set up Python virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Configure API key (same .env file as above)
copy .env.example .env
# Edit .env and add: GROQ_API_KEY=your_api_key_here

# 4. Run CLI version
python ai_engineering_tutor.py
```

## 🔑 **Get Your API Key**

1. Visit [Groq Console](https://console.groq.com/)
2. Sign up or log in
3. Navigate to **API Keys** section
4. Create a new API key
5. Add it to your `.env` file

## 📚 **What You Can Learn**

### **Python Programming:**
- Basic syntax and data types
- Functions, classes, and modules
- Error handling and debugging
- Best practices and code organization

### **AI & Machine Learning:**
- Machine learning fundamentals
- Neural networks and deep learning
- Data preprocessing techniques
- AI ethics and applications

### **Example Questions:**
- *"How do I start learning Python?"*
- *"Explain what machine learning is"*
- *"What are neural networks?"*
- *"Show me a simple function example"*

## 🖼️ **Screenshots**

### Web Interface
- Modern chat interface with gradient design
- Real-time typing indicators
- Token usage monitoring
- Mobile-responsive layout

### CLI Interface
- Clean terminal-based interaction
- Conversation history
- Token counting
- JSON export functionality

## 🏗️ **Project Structure**

```
AI-Engineering-Tutor/
├── 🌐 Web Interface
│   ├── index.html          # Main web page
│   ├── styles.css          # Modern UI styling
│   ├── script.js           # Frontend functionality
│   ├── server.js           # Node.js backend
│   └── sw.js               # Service worker
├── 🐍 Python CLI
│   ├── ai_engineering_tutor.py  # Main CLI application
│   └── requirements.txt         # Python dependencies
├── ⚙️ Configuration
│   ├── .env.example        # Environment template
│   ├── package.json        # Node.js config
│   └── activate_venv.*     # Helper scripts
└── 📖 Documentation
    ├── SETUP_GUIDE.md      # Detailed setup instructions
    └── WEB_UI_README.md    # Web interface docs
```

## 🔧 **Technologies Used**

### **Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Font Awesome icons
- Google Fonts (Inter)
- Service Worker API

### **Backend:**
- Node.js with Express
- Python 3.8+
- Groq API integration

### **Dependencies:**
- **Python**: `groq`, `tiktoken`, `python-dotenv`
- **Node.js**: `express`, `cors`, `dotenv`

## 🚀 **Advanced Usage**

### **Development Mode:**
```bash
# Web development with auto-reload
npm run dev

# Python development
venv\Scripts\activate
python ai_engineering_tutor.py
```

### **Model Configuration:**
Edit `.env` to change the default model:
```env
DEFAULT_MODEL=llama-3.3-70b-versatile  # Default
DEFAULT_MODEL=llama-3.1-70b-versatile  # Alternative
DEFAULT_MODEL=mixtral-8x7b-32768       # Alternative
```

### **Port Configuration:**
```env
PORT=3000  # Default web server port
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test both CLI and web versions
5. Commit: `git commit -m "Add new feature"`
6. Push: `git push origin feature-name`
7. Open a Pull Request

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

## 🆘 **Support**

- 📖 **Documentation**: Check `SETUP_GUIDE.md` for detailed instructions
- 🐛 **Issues**: Open GitHub issues for bugs or feature requests
- 💡 **Questions**: Use the Discussion tab for general questions

## 🎯 **Roadmap**

- [ ] **Voice Interface**: Speech-to-text and text-to-speech
- [ ] **Code Execution**: In-browser Python code runner
- [ ] **Multi-language**: Support for multiple programming languages
- [ ] **Advanced AI Models**: Integration with more AI providers
- [ ] **Collaborative Learning**: Multi-user sessions
- [ ] **Learning Paths**: Structured curriculum tracks

---

**🎓 Start your AI and Python learning journey today!** Choose the interface that works best for you and begin exploring the fascinating world of artificial intelligence and programming.

**⭐ If this project helps you learn, please consider starring it on GitHub!**
