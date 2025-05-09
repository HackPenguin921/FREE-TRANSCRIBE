let sr = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
let currentLang = 'ja-JP';

const startBtn = document.getElementById('startButton');
const stopBtn = document.getElementById('stopButton');
const saveBtn = document.getElementById('saveButton');
const changeLangBtn = document.getElementById('changeLangButton');
const clearBtn = document.getElementById('clearButton'); // 追加
const textLog = document.getElementById('textLog');

let transcript = "";
let isRecording = false;

sr.continuous = true;
sr.interimResults = true;
sr.lang = currentLang;

sr.addEventListener("result", function(e) {
    const resultText = e.results[e.resultIndex][0].transcript;
    if (e.results[e.resultIndex].isFinal) {
        transcript += resultText + '\n';
        displayTranscript(transcript);
    }
});

startBtn.addEventListener('click', function() {
    if (!isRecording) {
        sr.start();
        isRecording = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        saveBtn.disabled = false;
        changeLangBtn.disabled = false;
        clearBtn.disabled = false;
    }
});

stopBtn.addEventListener('click', function() {
    sr.stop();
    isRecording = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

saveBtn.addEventListener('click', function() {
    const filename = prompt("保存するファイル名を入力してください（拡張子なし）:");
    if (filename) {
        saveTranscript(filename.trim());
    }
});

changeLangBtn.addEventListener('click', function() {
    if (currentLang === 'ja-JP') {
        currentLang = 'en-US';
    } else {
        currentLang = 'ja-JP';
    }
    sr.lang = currentLang;
    alert(`言語が${currentLang === 'ja-JP' ? '日本語' : '英語'}に変更されました`);
});

clearBtn.addEventListener('click', function() {
    transcript = "";
    displayTranscript(transcript);
});

function displayTranscript(text) {
    textLog.innerHTML = text;
    textLog.scrollTop = textLog.scrollHeight;
}

function saveTranscript(filename) {
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename + '.txt';
    link.click();
}
