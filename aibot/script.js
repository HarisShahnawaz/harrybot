/* HarryAssistant Chatbot — Pro Version with Smart Responses + Chat History */

const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

/* ---------------------------
   KNOWLEDGE BASE
--------------------------- */

const responses = {
  // --- Greetings ---
  "hi": "Hey there! 👋 I'm HarryAssistant — your personal chatbot.",
  "hello": "Hello! 😊 How can I assist you today?",
  "hey": "Hey! Nice to see you here.",
  "good morning": "Good morning ☀️! Hope you have a productive day.",
  "good night": "Good night 🌙! Sweet dreams.",
  "how are you": "I'm doing great! Always ready to help 💪",

  // --- About the Bot ---
  "harryassistant": "I'm HarryAssistant 🤖, your smart chatbot built using HTML, CSS, and JavaScript.",
  "who are you": "I'm HarryAssistant, your digital assistant built with pure front-end magic!",
  "what is your name": "My name is HarryAssistant 🤖",
  "creator": "I was created by a passionate web developer using JavaScript, HTML, and CSS.",
  "where are you from": "I'm from the world of code — always online 🌍",
  "what can you do": "I can chat, answer tech questions, explain coding concepts, and motivate you! 💬",

  // --- Web Development ---
  "html": "HTML (HyperText Markup Language) defines the structure of a webpage.",
  "css": "CSS (Cascading Style Sheets) styles web pages — colors, fonts, layout, and animations.",
  "javascript": "JavaScript adds interactivity and logic to websites — it makes web pages dynamic.",
  "react": "React is a JS library for building fast, component-based UIs.",
  "node": "Node.js lets you run JavaScript on the server side.",
  "express": "Express is a minimal backend framework for Node.js used to create web servers.",
  "api": "API (Application Programming Interface) connects software systems or services.",
  "frontend": "Frontend is the visible part of a website — HTML, CSS, and JavaScript.",
  "backend": "Backend is the behind-the-scenes logic — databases, APIs, and server code.",
  "database": "A database stores and organizes data, like MySQL, MongoDB, or Firebase.",
  "mysql": "MySQL is a relational database that uses SQL to manage data tables.",
  "mongodb": "MongoDB is a NoSQL database that stores data as documents (JSON-like).",
  "sql": "SQL (Structured Query Language) manages and queries data in relational databases.",
  "bootstrap": "Bootstrap is a CSS framework that helps build responsive designs easily.",
  "tailwind": "Tailwind CSS is a utility-first CSS framework for rapid, modern web design.",
  "vue": "Vue.js is a lightweight JS framework for building interactive UIs.",
  "angular": "Angular is a powerful frontend framework maintained by Google.",
  "git": "Git is a version control system that tracks code changes.",
  "github": "GitHub hosts Git repositories online for collaboration and version control.",
  "deployment": "Deployment means publishing your project online using services like Netlify or Vercel.",

  // --- Programming Concepts ---
  "variable": "A variable stores data like text or numbers — it’s like a labeled box.",
  "array": "An array holds multiple values in a single variable, e.g. [1, 2, 3].",
  "object": "An object stores data in key-value pairs — {name: 'Ali', age: 22}.",
  "function": "A function is a reusable block of code that performs an action.",
  "loop": "A loop runs code multiple times until a condition is false.",
  "if": "An if statement checks conditions and runs code if true.",
  "class": "A class defines a blueprint for creating objects in OOP.",
  "constructor": "A constructor initializes object properties when created.",
  "array methods": "Popular JS array methods: map(), filter(), reduce(), forEach().",

  // --- General Tech ---
  "ai": "AI (Artificial Intelligence) enables computers to perform human-like tasks.",
  "machine learning": "Machine learning is AI that learns from data patterns automatically.",
  "deep learning": "Deep learning uses neural networks to process complex data (like images or voice).",
  "cybersecurity": "Cybersecurity protects systems and networks from attacks.",
  "data science": "Data science analyzes data to gain insights using math and programming.",
  "blockchain": "Blockchain is a secure, distributed ledger technology (used in crypto).",
  "crypto": "Cryptocurrency is digital money based on blockchain (like Bitcoin, Ethereum).",
  "cloud": "Cloud computing means storing and accessing data online instead of locally.",
  "virtualization": "Virtualization creates virtual versions of hardware, servers, or networks.",

  // --- Education / Career ---
  "career advice": "Learn HTML, CSS, JS, React, and Node.js to become a strong front-end developer.",
  "portfolio tips": "Show 3–5 solid projects, add screenshots, and link live demos.",
  "resume tips": "Keep resumes one page, clean, and focused on achievements.",
  "interview tips": "Be confident, revise basics, and practice coding daily.",

  // --- Fun / General ---
  "joke": "Why did the developer go broke? Because he used up all his cache 😅",
  "fun fact": "Fun fact: The first computer bug was an actual moth found in a computer!",
  "motivational quote": "“Code is like humor. When you have to explain it, it’s bad.” – Cory House",
  "inspire me": "Every expert was once a beginner. Keep learning and growing 🚀",
  "thank you": "You're welcome 😊 Happy to help!",
  "bye": "Goodbye 👋! Keep coding!",
  "goodbye": "Take care! 👋 See you soon!",
  "ok": "Okay 👍",
  "yes": "Awesome! 💪",
  "no": "No problem 😄",

  // --- System / Help ---
  "help": "You can ask me about web dev, programming, AI, or tech in general. Try 'What is React?' or 'Tell me about APIs'.",
  "commands": "Try: help, joke, career advice, html, css, javascript, react, ai, etc."
};

/* ---------------------------
   SMART RESPONSE HANDLER
--------------------------- */

function getResponse(input) {
  const lower = input.toLowerCase().trim();

  // direct match
  if (responses[lower]) return responses[lower];

  // pattern: what is / who is / tell me about / explain
  const triggers = ["what is", "who is", "tell me about", "explain", "define"];
  for (const trigger of triggers) {
    if (lower.startsWith(trigger)) {
      const keyword = lower.replace(trigger, "").trim();
      if (responses[keyword]) return responses[keyword];
    }
  }

  // partial match
  for (const key in responses) {
    if (lower.includes(key)) return responses[key];
  }

  // fallback
  return "Hmm 🤔 I'm not sure about that yet. type 'help'.";
}

/* ---------------------------
   CHAT HISTORY HANDLER
--------------------------- */

function saveChatHistory() {
  const messages = [...chatBox.children].map(msg => ({
    sender: msg.classList.contains('user') ? 'user' : 'bot',
    text: msg.textContent
  }));
  localStorage.setItem('harryassistant_chat', JSON.stringify(messages));
}

function loadChatHistory() {
  const data = localStorage.getItem('harryassistant_chat');
  if (!data) return;
  const messages = JSON.parse(data);
  chatBox.innerHTML = '';
  messages.forEach(msg => addMessage(msg.sender, msg.text, false));
}

/* ---------------------------
   CHAT UI FUNCTIONS
--------------------------- */

function addMessage(sender, text, save = true) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  if (save) saveChatHistory();
}

/* ---------------------------
   EVENT LISTENER
--------------------------- */

chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;

  addMessage('user', text);
  userInput.value = '';

  setTimeout(() => {
    const response = getResponse(text);
    addMessage('bot', response);
  }, 400);
});

/* ---------------------------
   INITIAL LOAD
--------------------------- */

window.addEventListener('load', () => {
  loadChatHistory();
  if (!localStorage.getItem('harryassistant_chat')) {
    addMessage('bot', "Hello 👋 I'm HarryAssistant. How can I help you today?");
  }
});
