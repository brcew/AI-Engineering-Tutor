# AI Engineering Tutor - Web UI

A beautiful, modern web interface for the AI Engineering Tutor chatbot. This web UI provides an enhanced experience for learning AI and Python concepts with a user-friendly interface.

## 🌟 Features

### 💬 Interactive Chat Interface
- Clean, modern chat interface with animated messages
- Real-time typing indicators
- Message formatting with basic Markdown support
- Quick action buttons for common questions

### 🎨 Beautiful Design
- Modern gradient design with smooth animations
- Responsive layout that works on desktop, tablet, and mobile
- Dark/light theme with professional color scheme
- Font Awesome icons and Google Fonts integration

### ⚙️ Advanced Settings
- Configurable Groq API key (stored locally)
- Multiple AI model selection (Llama 3.3, Llama 3.1, Mixtral)
- Token counting display (can be toggled)
- Auto-scroll to new messages (configurable)

### 💾 Data Management
- Conversation persistence in browser storage
- Export chat history as JSON
- Clear chat functionality
- Automatic conversation saving

### 📱 Responsive & Accessible
- Mobile-first responsive design
- Keyboard shortcuts (Enter to send, Escape to close modals)
- ARIA labels and semantic HTML
- Touch-friendly interface

### 🚀 Performance Features
- Service Worker for offline support
- Efficient token counting estimation
- Optimized API calls with error handling
- Smooth animations and transitions

## 🛠️ Setup Instructions

### 1. Get Your Groq API Key
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key for use in the web UI

### 2. Launch the Web UI
1. Open `index.html` in any modern web browser
2. Click the settings icon (⚙️) in the top right
3. Paste your Groq API key in the settings
4. Choose your preferred AI model
5. Click "Save Settings"
6. Start chatting with your AI tutor!

### 3. Using a Local Server (Recommended)
For the best experience, serve the files through a local web server:

```bash
# Using Python (Python 3)
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 💡 How to Use

### Basic Chat
1. Type your question in the message input at the bottom
2. Press Enter or click the send button (✈️)
3. Wait for the AI tutor to respond
4. Continue the conversation naturally

### Quick Actions
Use the quick action buttons below the input for common topics:
- 🧠 **Machine Learning**: "Explain what is machine learning?"
- 🐍 **Python Basics**: "How do I start learning Python?"
- 🕸️ **Neural Networks**: "What are neural networks?"

### Settings Configuration
Click the settings icon (⚙️) to access:
- **API Key**: Your Groq API key (required)
- **Model**: Choose between different AI models
- **Auto-scroll**: Automatically scroll to new messages
- **Show Tokens**: Display token count in the header

### Export & Management
- **Clear Chat**: Remove all messages (keeps welcome message)
- **Export Chat**: Download conversation as JSON file
- **Token Counter**: Monitor API usage in real-time

## 🎯 Supported Topics

The AI tutor specializes in beginner-friendly explanations of:

- **Python Programming**
  - Basic syntax and concepts
  - Data structures (lists, dictionaries, etc.)
  - Functions and classes
  - Error handling and debugging

- **Artificial Intelligence**
  - Machine learning fundamentals
  - Neural networks and deep learning
  - Data preprocessing and analysis
  - AI ethics and best practices

- **Programming Best Practices**
  - Code organization and structure
  - Testing and debugging strategies
  - Version control with Git
  - Project development workflow

## 🔧 Technical Details

### Technology Stack
- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome 6.0
- **Fonts**: Google Fonts (Inter)
- **API**: Groq API for AI responses
- **Storage**: LocalStorage for settings and preferences

### Browser Compatibility
- Chrome 80+ ✅
- Firefox 75+ ✅
- Safari 13+ ✅
- Edge 80+ ✅
- Mobile browsers ✅

### Performance Features
- Lazy loading of external resources
- Efficient DOM manipulation
- Debounced API calls
- Compressed assets
- Service Worker caching

## 🚨 Troubleshooting

### API Key Issues
- **Problem**: "API Key Required" error
- **Solution**: Add your Groq API key in Settings

### Connection Problems
- **Problem**: "Error calling API" messages
- **Solution**: Check internet connection and API key validity

### Display Issues
- **Problem**: UI elements not loading correctly
- **Solution**: Clear browser cache and reload page

### Mobile Issues
- **Problem**: Interface not responsive
- **Solution**: Ensure you're using a modern mobile browser

## 📄 File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
├── sw.js              # Service Worker for offline support
├── WEB_UI_README.md   # This documentation
└── README.md          # Original project documentation
```

## 🔒 Privacy & Security

- **API Key**: Stored locally in your browser only
- **Conversations**: Kept in browser storage, not sent to third parties
- **Data**: No personal data collected or transmitted
- **Offline**: Basic functionality works offline after first load

## 📈 Future Enhancements

Potential improvements for future versions:
- [ ] Dark mode toggle
- [ ] Voice input/output capabilities
- [ ] Code syntax highlighting in responses
- [ ] Conversation search functionality
- [ ] Multi-language support
- [ ] File upload for code review
- [ ] Integration with popular code editors

## 🤝 Contributing

This web UI is designed to work with the existing Python backend. To contribute:

1. Test thoroughly on different devices and browsers
2. Follow the existing code style and structure
3. Ensure responsive design principles
4. Add appropriate error handling
5. Update documentation as needed

## 📞 Support

For issues with the web UI:
1. Check this README first
2. Verify your API key is correct
3. Test in a different browser
4. Check browser console for error messages
5. Ensure you have a stable internet connection

Happy learning with your AI Engineering Tutor! 🎓✨