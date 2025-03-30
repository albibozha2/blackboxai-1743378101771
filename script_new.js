// Main application class
class ChatApplication {
    constructor() {
        try {
            this.initElements();
            this.initResponses();
            this.setupEventListeners();
        } catch (error) {
            this.showError(error.message);
            throw error; // Re-throw to prevent further execution
        }
    }

    initElements() {
        this.chatBox = document.getElementById('chat-box');
        this.userInput = document.getElementById('user-input');
        this.sendBtn = document.getElementById('send-btn');
        
        if (!this.chatBox || !this.userInput || !this.sendBtn) {
            throw new Error('Required DOM elements not found');
        }
    }

    showError(message) {
        console.error(message);
        document.body.innerHTML = `
            <div class="p-4 text-red-500">
                <h2 class="text-xl font-bold">Gabim në aplikacion</h2>
                <p>${message}</p>
            </div>
        `;
    }

    initResponses() {
        this.initialResponses = {
            "pershendetje": "Përshëndetje! Si mund t'ju ndihmoj sot?",
            "si je": "Unë jam mirë, faleminderit për pyetjen! Si mund t'ju shërbej?",
            "faleminderit": "Gjithmonë me kënaqësi! A ka ndonjë gjë tjetër për të cilën mund të ndihmoj?",
            "mirupafshim": "Mirupafshim! Mos ngurroni të më kontaktoni përsëri nëse keni nevojë për ndihmë.",
            "default": "Më vjen keq, nuk e kuptova plotësisht. Mund të përsërisni ose të më pyesni diçka tjetër?"
        };
        this.learnedResponses = JSON.parse(localStorage.getItem('learnedResponses')) || {};
    }

    addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'user-message' : 'marina-message';
        
        const messageText = document.createElement('p');
        messageText.className = isUser ? 'text-green-200' : 'text-green-300';
        messageText.textContent = text;
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'text-xs text-green-600 block mt-1';
        timeSpan.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.appendChild(messageText);
        messageDiv.appendChild(timeSpan);
        this.chatBox.appendChild(messageDiv);
        this.chatBox.scrollTop = this.chatBox.scrollHeight;
    }

    setupEventListeners() {
        this.sendBtn.addEventListener('click', async () => {
            const message = this.userInput.value.trim();
            if (message) {
                this.addMessage(message, true);
                this.userInput.value = '';
                // Will implement API call and typing indicators next
            }
        });

        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendBtn.click();
            }
        });
    }
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        new ChatApplication();
    } catch (error) {
        console.error('Application failed to initialize:', error);
    }
});
