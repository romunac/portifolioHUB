// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initProjectFilters();
    initTerminal();
    initGuessGame();
    initCO2Sensor();
});

/* 1. Theme Switcher (Dark / Light Mode) */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'light') {
            themeIcon.className = 'fa-solid fa-moon';
        } else {
            themeIcon.className = 'fa-solid fa-sun';
        }
    }
}

/* 2. Project Tag Category Filtering */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* 3. Tab Switching for Demo Runner */
function switchDemoTab(tabName) {
    const tabs = document.querySelectorAll('.tab-btn');
    const demoBoxes = document.querySelectorAll('.demo-box');

    tabs.forEach(tab => tab.classList.remove('active'));
    demoBoxes.forEach(box => box.classList.remove('active'));

    const selectedTab = Array.from(tabs).find(t => t.getAttribute('onclick').includes(tabName));
    if (selectedTab) selectedTab.classList.add('active');

    const targetBox = document.getElementById(`demo-${tabName}`);
    if (targetBox) targetBox.classList.add('active');
}

function openDemo(demoName) {
    switchDemoTab(demoName);
    const interactiveSection = document.getElementById('interactive');
    if (interactiveSection) {
        interactiveSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/* 4. Interactive Terminal Emulator logic */
function initTerminal() {
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');

    if (!terminalInput || !terminalBody) return;

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            processCommand(command);
            terminalInput.value = '';
        }
    });

    function printLine(text, isCommand = false) {
        const line = document.createElement('p');
        line.className = 'terminal-line';
        if (isCommand) {
            line.innerHTML = `<span class="prompt">lucas@portfolio:~$</span> ${text}`;
        } else {
            line.innerHTML = text;
        }
        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function processCommand(cmd) {
        if (!cmd) return;
        printLine(cmd, true);

        switch (cmd) {
            case 'help':
                printLine(`Comandos disponíveis:<br>
                - <span class="cmd-highlight">about</span>: Informações sobre Lucas Vinhal Ferreira<br>
                - <span class="cmd-highlight">skills</span>: Lista de habilidades técnicas<br>
                - <span class="cmd-highlight">projects</span>: Projetos desenvolvidos<br>
                - <span class="cmd-highlight">calc</span>: Executar calculadora C no sandbox<br>
                - <span class="cmd-highlight">guess</span>: Iniciar jogo Adivinhe o Número<br>
                - <span class="cmd-highlight">co2</span>: Ver leitura do sensor de CO2<br>
                - <span class="cmd-highlight">contact</span>: Informações de contato<br>
                - <span class="cmd-highlight">clear</span>: Limpar o terminal`);
                break;

            case 'about':
                printLine(`<strong>Lucas Vinhal Ferreira</strong> — Estudante de Engenharia de Computação na UniCEUB.<br>
                Foco em Sistemas Embarcados, Linguagem C/C++, Linux Server e Segurança.`);
                break;

            case 'skills':
                printLine(`<strong>Habilidades Técnicas:</strong><br>
                • Linguagens: C, C++, Python, Java, Rust, HTML/CSS<br>
                • Hardware: ESP32, Arduino, Microcontroladores, Sensores<br>
                • Infra: Linux (Ubuntu Server), SSH, Redes, UFW Firewall, Git`);
                break;

            case 'projects':
                printLine(`<strong>Projetos:</strong><br>
                1. Monitoramento de CO2 com ESP32 (SCD30)<br>
                2. Calculadora Interativa em C (projetos/calculadora.c)<br>
                3. Jogo Adivinhe o Número Python (projetos/adivinhe o numero.py)<br>
                4. Ubuntu Server — Infraestrutura & Segurança`);
                break;

            case 'calc':
                openDemo('calc');
                printLine('Abertura do módulo Calculadora no sandbox...');
                break;

            case 'guess':
                openDemo('guess');
                printLine('Abertura do módulo Adivinhe o Número no sandbox...');
                break;

            case 'co2':
                openDemo('co2');
                printLine('Abertura da telemetria de CO2 no sandbox...');
                break;

            case 'contact':
                printLine(`<strong>Contato:</strong><br>
                • Email: lucasvinhal3001@gmail.com<br>
                • GitHub: github.com/romunac<br>
                • LinkedIn: linkedin.com/in/lucas-vinhal-24334a2b3`);
                break;

            case 'clear':
                terminalBody.innerHTML = '';
                break;

            default:
                printLine(`Comando não reconhecido: '${cmd}'. Digite <span class="cmd-highlight">'help'</span> para comandos.`);
                break;
        }
    }
}

/* 5. Interactive Demo 1: C Calculator Simulator */
function runCalculator() {
    const num1 = parseFloat(document.getElementById('calc-num1').value);
    const num2 = parseFloat(document.getElementById('calc-num2').value);
    const op = document.getElementById('calc-op').value;
    const output = document.getElementById('calc-result');

    if (isNaN(num1) || isNaN(num2)) {
        output.innerText = 'Erro: Digite números válidos para a expressão!';
        output.style.color = '#ff5f56';
        return;
    }

    let result = 0;
    let err = false;

    switch (op) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/':
            if (num2 !== 0) {
                result = num1 / num2;
            } else {
                err = true;
            }
            break;
    }

    if (err) {
        output.innerText = `[C Code Executed]\nDigite uma expressao: ${num1} / ${num2}\nErro: divisao por zero!`;
        output.style.color = '#ff5f56';
    } else {
        output.innerText = `[C Code Executed]\nDigite uma expressao: ${num1} ${op} ${num2}\nResultado: ${result.toFixed(2)}`;
        output.style.color = 'var(--primary-color)';
    }
}

/* 6. Interactive Demo 2: Python Number Guessing Game Simulator */
let secretNum = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function initGuessGame() {
    resetGuessGame();
}

function resetGuessGame() {
    secretNum = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    const output = document.getElementById('guess-result');
    if (output) {
        output.innerText = '=== Adivinhe o Número ===\nEstou pensando em um número de 1 a 100... Digite seu palpite!';
        output.style.color = 'var(--accent-color)';
    }
    const input = document.getElementById('guess-input');
    if (input) input.value = '';
}

function makeGuess() {
    const input = document.getElementById('guess-input');
    const output = document.getElementById('guess-result');
    const guess = parseInt(input.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        output.innerText = 'Por favor, insira um número inteiro válido entre 1 e 100.';
        output.style.color = '#ff5f56';
        return;
    }

    attempts++;

    if (guess < secretNum) {
        output.innerText = `Palpite: ${guess}\nMuito baixo! Tente um número maior. (Tentativa ${attempts})`;
        output.style.color = '#ffbd2e';
    } else if (guess > secretNum) {
        output.innerText = `Palpite: ${guess}\nMuito alto! Tente um número menor. (Tentativa ${attempts})`;
        output.style.color = '#ffbd2e';
    } else {
        output.innerText = `🎉 Parabéns! Você acertou o número ${secretNum}!\nVocê precisou de ${attempts} tentativa(s). Clique em Reiniciar para jogar de novo.`;
        output.style.color = '#3fb950';
    }
}

/* 7. Interactive Demo 3: CO2 Sensor Live Simulator */
let co2Interval = null;
let autoCO2Active = true;

function initCO2Sensor() {
    toggleAutoCO2(true);
}

function triggerCO2Simulation() {
    const valElem = document.getElementById('co2-val');
    const statusElem = document.getElementById('co2-status');
    if (!valElem || !statusElem) return;

    // Simulate CO2 PPM value range (400 - 1500 ppm)
    const ppm = Math.floor(Math.random() * (1200 - 400 + 1)) + 400;
    valElem.innerText = ppm;

    if (ppm < 600) {
        statusElem.innerText = 'Qualidade do Ar: excelente (Ar Puro)';
        valElem.style.color = '#3fb950';
    } else if (ppm < 1000) {
        statusElem.innerText = 'Qualidade do Ar: moderada (Ambiente Aceitável)';
        valElem.style.color = '#58a6ff';
    } else {
        statusElem.innerText = 'Qualidade do Ar: atencao (Recomenda-se Ventilação)';
        valElem.style.color = '#ff5f56';
    }
}

function toggleAutoCO2(forceState = null) {
    const btn = document.getElementById('auto-co2-btn');
    if (forceState !== null) {
        autoCO2Active = forceState;
    } else {
        autoCO2Active = !autoCO2Active;
    }

    if (autoCO2Active) {
        if (btn) btn.innerHTML = '<i class="fa-solid fa-pause"></i> Auto Leitura (Ativo)';
        if (!co2Interval) {
            co2Interval = setInterval(triggerCO2Simulation, 3000);
        }
    } else {
        if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i> Auto Leitura (Pausado)';
        if (co2Interval) {
            clearInterval(co2Interval);
            co2Interval = null;
        }
    }
}

/* 8. Contact Form Handler */
function handleContactSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const toast = document.getElementById('form-toast');

    toast.innerText = `Obrigado pelo contato, ${name}! Sua mensagem foi simulada com sucesso.`;
    toast.className = 'form-toast success';

    document.getElementById('contact-form').reset();

    setTimeout(() => {
        toast.className = 'form-toast';
    }, 5000);
}
