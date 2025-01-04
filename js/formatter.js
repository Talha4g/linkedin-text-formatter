// Font configurations
const fonts = [
    { name: 'Modern Sans', class: 'font-style-1' },
    { name: 'Elegant Serif', class: 'font-style-2' },
    { name: 'Clean Mono', class: 'font-style-3' },
    { name: 'Display', class: 'font-style-4' },
    { name: 'Condensed', class: 'font-style-5' },
    { name: 'Bold Sans', class: 'font-style-6' },
    { name: 'Bold Serif', class: 'font-style-7' },
    { name: 'Light', class: 'font-style-8' },
];

let selectedFont = 'font-style-1';

// Initialize DOM elements
document.addEventListener('DOMContentLoaded', function() {
    const fontButtonsContainer = document.getElementById('fontButtons');
    const inputText = document.getElementById('inputText');
    const preview = document.getElementById('preview');
    const previewSection = document.getElementById('previewSection');
    const charCount = document.getElementById('charCount');
    const wordCount = document.getElementById('wordCount');
    const lineCount = document.getElementById('lineCount');
    const howToUseBtn = document.getElementById('howToUseBtn');
    const howToUseModal = document.getElementById('howToUseModal');
    const closeModal = document.getElementById('closeModal');
    const copyButton = document.getElementById('copyButton');

    // Initialize font buttons
    fonts.forEach(font => {
        const button = document.createElement('button');
        button.className = `px-4 py-3 rounded-lg transition-all ${
            selectedFont === font.class
                ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
        }`;
        button.innerHTML = `<span class="${font.class}">${font.name}</span>`;
        button.onclick = () => setFont(font.class);
        fontButtonsContainer.appendChild(button);
    });

    // Event listeners
    inputText.addEventListener('input', updatePreview);
    howToUseBtn.addEventListener('click', () => howToUseModal.classList.remove('hidden'));
    closeModal.addEventListener('click', () => howToUseModal.classList.add('hidden'));
    copyButton.addEventListener('click', handleCopy);

    // Handle text preview updates
    function updatePreview() {
        const text = inputText.value;
        if (text) {
            previewSection.classList.remove('hidden');
            preview.innerHTML = text.split('\n')
                .map(paragraph => `<p class="${selectedFont} mb-4">${paragraph}</p>`)
                .join('');
            
            updateCounts(text);
        } else {
            previewSection.classList.add('hidden');
            resetCounts();
        }
    }

    // Update text statistics
    function updateCounts(text) {
        charCount.textContent = text.length;
        wordCount.textContent = text.trim() ? text.trim().split(/\s+/).length : 0;
        lineCount.textContent = text.split('\n').length;
    }

    // Reset counters
    function resetCounts() {
        charCount.textContent = '0';
        wordCount.textContent = '0';
        lineCount.textContent = '0';
    }

    // Handle font selection
    function setFont(fontClass) {
        selectedFont = fontClass;
        document.querySelectorAll('#fontButtons button').forEach(button => {
            button.className = `px-4 py-3 rounded-lg transition-all ${
                selectedFont === fontClass
                    ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`;
        });
        updatePreview();
    }

    // Copy functionality
    function handleCopy() {
        // Get the formatted text from preview
        const formattedText = inputText.value;
        
        // Create a temporary textarea
        const textarea = document.createElement('textarea');
        textarea.value = formattedText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        
        // Select and copy
        textarea.select();
        let success = false;
        try {
            success = document.execCommand('copy');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        
        // Remove temporary textarea
        document.body.removeChild(textarea);
        
        if (success) {
            // Show notification
            const copyNotification = document.getElementById('copyNotification');
            copyNotification.style.display = 'block';
            
            // Change button text
            const copyButton = document.getElementById('copyButton');
            const originalButtonContent = copyButton.innerHTML;
            copyButton.innerHTML = `
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Copied!
            `;
            
            // Reset after 2 seconds
            setTimeout(() => {
                copyNotification.style.display = 'none';
                copyButton.innerHTML = originalButtonContent;
            }, 2000);
        } else {
            alert('Failed to copy text. Please try selecting and copying manually (Ctrl/Cmd + C)');
        }
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target === howToUseModal) {
            howToUseModal.classList.add('hidden');
        }
    };
});