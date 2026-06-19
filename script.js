// ==========================================
// AI ENGINEERING TUTOR - FRONTEND
// ==========================================

class AIEngineeringTutor {
    constructor() {
        this.messages = [
            {
                role: "system",
                content: "You are an AI Engineering tutor helping beginner-level students learn AI and Python from scratch. Explain concepts simply and clearly. Use step-by-step explanations when possible. If the student asks something too advanced, guide them to learn prerequisites first. Keep responses focused and practical."
            }
        ];
        this.model = localStorage.getItem('ai_tutor_model') || 'llama-3.3-70b-versatile';
        this.autoScroll = localStorage.getItem('auto_scroll') !== 'false';
        this.showTokens = localStorage.getItem('show_tokens') !== 'false';
        this.serverConfigured = false;
        
        this.initializeElements();
        this.setupEventListeners();
        this.loadSettings();
        this.autoResizeTextarea();
        this.checkServerHealth();
    }

    initializeElements() {
        // Main elements
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.tokenCount = document.getElementById('tokenCount');
        this.apiStatus = document.getElementById('apiStatus');
        
        // Modal elements
        this.settingsModal = document.getElementById('settingsModal');
        this.modelSelect = document.getElementById('modelSelect');
        this.autoScrollCheck = document.getElementById('autoScroll');
        this.showTokensCheck = document.getElementById('showTokens');
        
        // Button elements
        this.settingsBtn = document.getElementById('settingsBtn');
        this.closeSettingsBtn = document.getElementById('closeSettings');
        this.saveSettingsBtn = document.getElementById('saveSettings');
        this.clearChatBtn = document.getElementById('clearChat');
        this.exportChatBtn = document.getElementById('exportChat');
        
        // Loading
        this.loadingOverlay = document.getElementById('loadingOverlay');
    }

    setupEventListeners() {
        // Message input events
        this.messageInput.addEventListener('input', () => {
            this.updateSendButtonState();
            this.autoResizeTextarea();
        });
        
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Send button
        this.sendBtn.addEventListener('click', () => this.sendMessage());

        // Quick action buttons
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.getAttribute('data-message');
                this.messageInput.value = message;
                this.updateSendButtonState();
                this.autoResizeTextarea();
                this.sendMessage();
            });
        });

        // Header controls
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.clearChatBtn.addEventListener('click', () => this.clearChat());
        this.exportChatBtn.addEventListener('click', () => this.exportChat());

        // Settings modal
        this.closeSettingsBtn.addEventListener('click', () => this.closeSettings());
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());

        // Close modal on background click
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) {
                this.closeSettings();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.settingsModal.style.display !== 'none') {
                this.closeSettings();
            }
        });
    }

    loadSettings() {
        this.modelSelect.value = this.model;
        this.autoScrollCheck.checked = this.autoScroll;
        this.showTokensCheck.checked = this.showTokens;
        
        this.updateTokenDisplay();
        this.updateApiStatus();
    }

    openSettings() {
        this.settingsModal.style.display = 'flex';
        this.modelSelect.focus();
    }

    closeSettings() {
        this.settingsModal.style.display = 'none';
    }

    async checkServerHealth() {
        try {
            const response = await fetch('/api/health');
            const data = await response.json();
            this.serverConfigured = data.apiConfigured;
            this.updateApiStatus();
        } catch (error) {
            console.error('Server health check failed:', error);
            this.serverConfigured = false;
            this.updateApiStatus();
        }
    }

    saveSettings() {
        const newModel = this.modelSelect.value;
        const newAutoScroll = this.autoScrollCheck.checked;
        const newShowTokens = this.showTokensCheck.checked;

        // Save to localStorage
        localStorage.setItem('ai_tutor_model', newModel);
        localStorage.setItem('auto_scroll', newAutoScroll);
        localStorage.setItem('show_tokens', newShowTokens);

        // Update instance variables
        this.model = newModel;
        this.autoScroll = newAutoScroll;
        this.showTokens = newShowTokens;

        this.updateTokenDisplay();
        this.updateApiStatus();
        this.closeSettings();

        this.showNotification('Settings saved successfully!', 'success');
    }

    updateApiStatus() {
        if (!this.serverConfigured) {
            this.apiStatus.textContent = 'Server Configuration Required';
            this.apiStatus.className = 'api-status error';
        } else {
            this.apiStatus.textContent = 'Ready';
            this.apiStatus.className = 'api-status';
        }
    }

    updateTokenDisplay() {
        if (this.showTokens) {
            this.tokenCount.parentElement.style.display = 'flex';
            this.updateTokenCount();
        } else {
            this.tokenCount.parentElement.style.display = 'none';
        }
    }

    updateTokenCount() {
        if (!this.showTokens) return;
        
        const tokens = this.estimateTokens();
        this.tokenCount.textContent = `${tokens} tokens`;
    }

    estimateTokens() {
        // Simple token estimation (roughly 1 token per 4 characters)
        let totalChars = 0;
        this.messages.forEach(msg => {
            totalChars += msg.content.length;
        });
        return Math.ceil(totalChars / 4);
    }

    updateSendButtonState() {
        const hasText = this.messageInput.value.trim().length > 0;
        this.sendBtn.disabled = !hasText || !this.serverConfigured;
    }

    autoResizeTextarea() {
        this.messageInput.style.height = 'auto';
        this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message || !this.serverConfigured) return;

        // Clear input
        this.messageInput.value = '';
        this.updateSendButtonState();
        this.autoResizeTextarea();

        // Add user message to UI
        this.addMessage('user', message);
        
        // Add user message to conversation history
        this.messages.push({
            role: 'user',
            content: message
        });

        this.updateTokenCount();
        
        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Set API status to loading
            this.apiStatus.textContent = 'Thinking...';
            this.apiStatus.className = 'api-status loading';

            const response = await this.callChatAPI();
            
            // Hide typing indicator
            this.hideTypingIndicator();

            if (response && response.choices && response.choices[0]) {
                const assistantReply = response.choices[0].message.content;
                
                // Add assistant message to UI and conversation history
                this.addMessage('assistant', assistantReply);
                this.messages.push({
                    role: 'assistant',
                    content: assistantReply
                });

                this.updateTokenCount();
            } else {
                throw new Error('Invalid response format from API');
            }

            // Reset API status
            this.apiStatus.textContent = 'Ready';
            this.apiStatus.className = 'api-status';

        } catch (error) {
            console.error('Error calling Chat API:', error);
            this.hideTypingIndicator();
            
            // Show error message
            this.addMessage('system', `Error: ${error.message}. Please check the server configuration and try again.`);
            
            // Set error status
            this.apiStatus.textContent = 'Error';
            this.apiStatus.className = 'api-status error';
        }
    }

    async callChatAPI() {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: this.messages,
                model: this.model
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    }

    addMessage(role, content) {
        const messageGroup = document.createElement('div');
        messageGroup.className = `message-group ${role}-message`;

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        const avatar = document.createElement('div');
        avatar.className = `avatar ${role}-avatar`;
        
        const avatarIcon = document.createElement('i');
        if (role === 'user') {
            avatarIcon.className = 'fas fa-user';
        } else if (role === 'assistant') {
            avatarIcon.className = 'fas fa-robot';
        } else {
            avatarIcon.className = 'fas fa-exclamation-triangle';
        }
        avatar.appendChild(avatarIcon);

        const bubble = document.createElement('div');
        bubble.className = `message-bubble ${role}-bubble`;
        
        // Format content with basic markdown support
        bubble.innerHTML = this.formatMessage(content);

        messageContent.appendChild(avatar);
        messageContent.appendChild(bubble);
        messageGroup.appendChild(messageContent);

        this.chatMessages.appendChild(messageGroup);

        if (this.autoScroll) {
            this.scrollToBottom();
        }
    }

    formatMessage(content) {
        // Basic markdown formatting
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
            .replace(/\n/g, '<br>');
    }

    showTypingIndicator() {
        this.typingIndicator.style.display = 'block';
        if (this.autoScroll) {
            this.scrollToBottom();
        }
    }

    hideTypingIndicator() {
        this.typingIndicator.style.display = 'none';
    }

    scrollToBottom() {
        requestAnimationFrame(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        });
    }

    clearChat() {
        if (confirm('Are you sure you want to clear the chat history?')) {
            // Reset messages to just the system prompt
            this.messages = [this.messages[0]];
            
            // Clear chat UI except welcome message
            const systemMessages = this.chatMessages.querySelectorAll('.system-message');
            this.chatMessages.innerHTML = '';
            
            // Re-add the welcome message
            if (systemMessages.length > 0) {
                this.chatMessages.appendChild(systemMessages[0]);
            }
            
            this.updateTokenCount();
            this.showNotification('Chat cleared!', 'success');
        }
    }

    exportChat() {
        const exportData = {
            timestamp: new Date().toISOString(),
            model: this.model,
            messages: this.messages.slice(1), // Exclude system message
            tokenCount: this.estimateTokens()
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `ai-tutor-conversation-${new Date().toISOString().split('T')[0]}.json`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showNotification('Conversation exported!', 'success');
    }

    showNotification(message, type = 'info') {
        // Simple notification system
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-weight: 500;
            animation: slideInRight 0.3s ease-out;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIEngineeringTutor();
});

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}