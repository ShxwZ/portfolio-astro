function initCodeBlockCopy() {
    // Find all code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach((codeBlock) => {
        const pre = codeBlock.parentElement;
        
        // Skip if copy button already exists
        if (pre.querySelector('.copy-button')) {
            return;
        }
        
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = `
            <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="m5 15-2-2v-6a2 2 0 0 1 2-2h6l2 2"></path>
            </svg>
            <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
                <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
        `;
        
        // Add click event
        copyButton.addEventListener('click', async () => {
            try {
                // Get the code text (remove any extra whitespace)
                const codeText = codeBlock.textContent || codeBlock.innerText;
                
                // Copy to clipboard
                await navigator.clipboard.writeText(codeText);
                
                // Show success state
                const copyIcon = copyButton.querySelector('.copy-icon');
                const checkIcon = copyButton.querySelector('.check-icon');
                
                copyIcon.style.display = 'none';
                checkIcon.style.display = 'block';
                copyButton.classList.add('copied');
                
                // Play success sound if available
                const clickSound = document.querySelector('#click-sound');
                if (clickSound) {
                    clickSound.volume = 0.3;
                    clickSound.currentTime = 0;
                    clickSound.play().catch(() => {
                        // Ignore audio errors
                    });
                }
                
                // Reset after 2 seconds
                setTimeout(() => {
                    copyIcon.style.display = 'block';
                    checkIcon.style.display = 'none';
                    copyButton.classList.remove('copied');
                }, 2000);
                
            } catch (err) {
                console.error('Failed to copy code:', err);
                
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = codeText;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                // Show copied state even for fallback
                const copyIcon = copyButton.querySelector('.copy-icon');
                const checkIcon = copyButton.querySelector('.check-icon');
                
                copyIcon.style.display = 'none';
                checkIcon.style.display = 'block';
                copyButton.classList.add('copied');
                
                setTimeout(() => {
                    copyIcon.style.display = 'block';
                    checkIcon.style.display = 'none';
                    copyButton.classList.remove('copied');
                }, 2000);
            }
        });
        
        // Add button to pre element
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeBlockCopy);
} else {
    initCodeBlockCopy();
}

// Re-initialize for Astro View Transitions
document.addEventListener('astro:page-load', initCodeBlockCopy);

// Export for manual initialization
window.CodeBlockCopy = {
    init: initCodeBlockCopy
};
