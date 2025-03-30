// Simple reliable avatar implementation
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('avatar-container');
    if (container) {
        container.innerHTML = `
            <div class="avatar" style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: relative;
            ">
                <div class="avatar-image" style="
                    font-size: 8rem;
                    color: #00ff00;
                ">👩</div>
                <div class="status-indicator" style="
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background-color: #003300;
                    position: absolute;
                    bottom: 20px;
                    transition: background-color 0.3s;
                "></div>
            </div>
        `;
    }
});

window.startSpeaking = function() {
    const indicator = document.querySelector('.status-indicator');
    if (indicator) indicator.style.backgroundColor = '#00ff00';
};

window.stopSpeaking = function() {
    const indicator = document.querySelector('.status-indicator');
    if (indicator) indicator.style.backgroundColor = '#003300';
};