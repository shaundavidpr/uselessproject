const emojis = ["😀", "😂", "🥰", "😎", "🤔", "😴", "🥳", "🌟", "🌈", "🌞", "🌙", "🌺", "🍕", "🍦", "🎉", "🎈", "🎁", "🐶", "🐱", "🦄", "🦋", "🏖️", "🏔️", "🚗", "✈️", "🚀", "📚", "🎵", "🎨", "⚽", "🏆", "💻", "📱", "🔑", "❤️", "🧡", "💛", "💚", "💙", "💜"];

const emojiPalette = document.getElementById('emojiPalette');
const emojiStory = document.getElementById('emojiStory');
const storyText = document.getElementById('storyText');
const storyPreview = document.getElementById('storyPreview');

// Populate emoji palette
emojis.forEach(emoji => {
    const span = document.createElement('span');
    span.className = 'emoji';
    span.textContent = emoji;
    span.draggable = true;
    span.addEventListener('dragstart', drag);
    emojiPalette.appendChild(span);
});

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.textContent);
}

function drop(ev) {
    ev.preventDefault();
    const emoji = ev.dataTransfer.getData("text");
    emojiStory.textContent += emoji;
    emojiStory.classList.add("highlight");
    setTimeout(() => emojiStory.classList.remove("highlight"), 300); // Removes highlight after animation
    updatePreview();              
}

function convertToEmoji() {
    const text = storyText.value;
    let emojiStoryText = '';
    for (let char of text) {
        if (char === ' ') {
            emojiStoryText += ' ';
        } else {
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            emojiStoryText += randomEmoji;
        }
    }
    emojiStory.textContent = emojiStoryText;
    updatePreview();
}

function clearStory() {
    emojiStory.textContent = '';
    storyText.value = '';
    storyPreview.textContent = '';
}

function updatePreview() {
    storyPreview.textContent = `${storyText.value}\n\n${emojiStory.textContent}`;
}

// Event listeners for real-time preview updates
storyText.addEventListener('input', updatePreview);
emojiStory.addEventListener('DOMSubtreeModified', updatePreview);