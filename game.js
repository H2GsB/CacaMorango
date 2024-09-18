let tempoRestante = 480;  // 8 minutos (480 segundos)
let morangosColetados = 0;
const morango = document.getElementById('morango');
const tempoDisplay = document.getElementById('tempo');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('startBtn');
let timerInterval;

// Função para iniciar o jogo
function iniciarJogo() {
    morangosColetados = 0;
    tempoRestante = 480;  // 8 minutos
    atualizarTempo();
    atualizarScore();
    startBtn.classList.add('hidden');
    posicionarMorangoAleatoriamente();
    iniciarContagemRegressiva();
}

// Função para contar o tempo
function iniciarContagemRegressiva() {
    timerInterval = setInterval(() => {
        if (tempoRestante > 0) {
            tempoRestante--;
            atualizarTempo();
        } else {
            clearInterval(timerInterval);
            terminarJogo();
        }
    }, 1000);
}

// Atualiza o tempo no display
function atualizarTempo() {
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;
    tempoDisplay.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

// Atualiza o score no display
function atualizarScore() {
    scoreDisplay.textContent = morangosColetados;
}

// Função para posicionar o morango aleatoriamente e escondê-lo
function posicionarMorangoAleatoriamente() {
    const x = Math.random() * 2 - 1;  // Gera posição aleatória no eixo X
    const z = Math.random() * 2 - 1;  // Gera posição aleatória no eixo Z
    const y = Math.random() * 0.5 + 0.3;  // Posição no eixo Y (acima do chão)

    // Atualiza a posição e torna o morango visível
    morango.setAttribute('position', `${x} ${y} ${z}`);
    morango.setAttribute('visible', 'true');
}

// Função que lida com a coleta de morangos
morango.addEventListener('click', () => {
    morangosColetados++;
    atualizarScore();

    // Esconde o morango novamente e reposiciona
    morango.setAttribute('visible', 'false');
    setTimeout(() => {
        posicionarMorangoAleatoriamente();
    }, 1000);  // Espera 1 segundo para reaparecer

    // Condição para ganhar o prêmio
    if (morangosColetados >= 10) {
        clearInterval(timerInterval);
        alert('Você ganhou o prêmio!');
        terminarJogo();
    }
});

// Função para encerrar o jogo
function terminarJogo() {
    alert(`Fim do jogo! Você coletou ${morangosColetados} morangos.`);
    morango.setAttribute('visible', 'false');
    startBtn.classList.remove('hidden');
}

// Evento para iniciar o jogo quando clicar no botão "Começar"
startBtn.addEventListener('click', iniciarJogo);
