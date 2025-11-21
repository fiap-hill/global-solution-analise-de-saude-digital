// ============================================
// Smart Work - JavaScript
// ============================================

// ============================================
// Função: Gerar Dados Simulados
// ============================================

function gerarDadosSimulados() {
    const emocoes = [
        'Calmo',
        'Ansioso',
        'Focado',
        'Estressado',
        'Relaxado',
        'Cansado',
        'Energizado',
        'Irritado'
    ];

    const dados = {
        emocao: emocoes[Math.floor(Math.random() * emocoes.length)],
        bpm: Math.floor(Math.random() * (130 - 60) + 60),
        spo2: (Math.random() * (100 - 92) + 92).toFixed(1),
        sono: (Math.random() * 10).toFixed(1),
        estresse: Math.floor(Math.random() * 100),
        timestamp: new Date().toLocaleString('pt-BR')
    };

    return dados;
}

// ============================================
// Função: Gerar Insights/Recomendações
// ============================================

function gerarInsights(dados) {
    const insights = [];

    // Análise de Estresse
    if (dados.estresse > 70) {
        insights.push({
            categoria: 'Bem-estar Emocional',
            recomendacao: 'Seu nível de estresse está alto. Recomendamos uma sessão de mindfulness de 10 minutos ou uma pausa para respiração profunda.',
            prioridade: 'high',
            acao: 'Praticar técnicas de respiração ou meditação guiada'
        });
    } else if (dados.estresse > 50) {
        insights.push({
            categoria: 'Bem-estar Emocional',
            recomendacao: 'Nível de estresse moderado. Considere fazer uma pausa breve e alongar-se.',
            prioridade: 'medium',
            acao: 'Fazer uma pausa de 5 minutos'
        });
    }

    // Análise de BPM
    if (dados.bpm > 100) {
        insights.push({
            categoria: 'Saúde Física',
            recomendacao: 'Batimentos cardíacos elevados. Reduza o ritmo de trabalho e considere uma pausa para relaxar.',
            prioridade: 'high',
            acao: 'Reduzir intensidade de atividades e fazer pausa'
        });
    } else if (dados.bpm < 65) {
        insights.push({
            categoria: 'Saúde Física',
            recomendacao: 'Batimentos cardíacos em repouso. Bom momento para atividades que requerem foco.',
            prioridade: 'low',
            acao: 'Aproveitar para tarefas que exigem concentração'
        });
    }

    // Análise de SPO2
    if (dados.spo2 < 95) {
        insights.push({
            categoria: 'Saúde Física',
            recomendacao: 'Oxigenação do sangue abaixo do ideal. Faça uma pausa, respire profundamente e considere verificar sua postura.',
            prioridade: 'high',
            acao: 'Praticar respiração profunda e verificar postura'
        });
    }

    // Análise de Sono
    if (dados.sono < 5) {
        insights.push({
            categoria: 'Descanso',
            recomendacao: 'Horas de sono insuficientes detectadas. Priorize pausas regulares hoje e planeje uma noite de descanso adequado.',
            prioridade: 'high',
            acao: 'Fazer pausas frequentes e planejar descanso noturno'
        });
    } else if (dados.sono < 7) {
        insights.push({
            categoria: 'Descanso',
            recomendacao: 'Sono abaixo do ideal. Considere pausas estratégicas durante o dia para manter energia.',
            prioridade: 'medium',
            acao: 'Fazer pausas estratégicas ao longo do dia'
        });
    }

    // Análise de Emoção
    const emocoesNegativas = ['Ansioso', 'Estressado', 'Cansado', 'Irritado'];
    if (emocoesNegativas.includes(dados.emocao)) {
        insights.push({
            categoria: 'Bem-estar Emocional',
            recomendacao: `Estado emocional: ${dados.emocao}. Recomendamos uma pausa para atividades relaxantes ou conversa com alguém de confiança.`,
            prioridade: 'high',
            acao: 'Fazer pausa para relaxamento ou suporte emocional'
        });
    }

    // Recomendações Gerais de Produtividade
    if (dados.estresse < 50 && dados.bpm < 90) {
        insights.push({
            categoria: 'Produtividade',
            recomendacao: 'Condições ideais para trabalho focado. Aproveite para tarefas que exigem alta concentração.',
            prioridade: 'low',
            acao: 'Focar em tarefas importantes e complexas'
        });
    }

    // Recomendações de Pausas
    insights.push({
        categoria: 'Pausas Inteligentes',
        recomendacao: 'Sugerimos uma pausa de 5-10 minutos a cada 90 minutos de trabalho. Use este tempo para alongar, hidratar-se ou fazer uma caminhada curta.',
        prioridade: 'medium',
        acao: 'Programar pausas regulares'
    });

    // Recomendações para Trabalho Híbrido
    insights.push({
        categoria: 'Trabalho Híbrido',
        recomendacao: 'Para ambientes híbridos, mantenha uma rotina consistente, defina limites claros entre trabalho e descanso, e crie um espaço dedicado para trabalho.',
        prioridade: 'low',
        acao: 'Organizar ambiente e rotina de trabalho'
    });

    // Ordenar por prioridade
    const ordemPrioridade = { high: 3, medium: 2, low: 1 };
    insights.sort((a, b) => ordemPrioridade[b.prioridade] - ordemPrioridade[a.prioridade]);

    return insights;
}

// ============================================
// Função: Renderizar Dados no Dashboard
// ============================================

function renderizarDados(dados) {
    // Atualizar métricas
    document.getElementById('emocao-valor').textContent = dados.emocao;
    document.getElementById('bpm-valor').textContent = dados.bpm;
    document.getElementById('spo2-valor').textContent = dados.spo2 + '%';
    document.getElementById('sono-valor').textContent = dados.sono + 'h';
    document.getElementById('estresse-valor').textContent = dados.estresse + '%';

    // Atualizar status
    atualizarStatus('emocao-status', dados.emocao, ['Calmo', 'Focado', 'Relaxado', 'Energizado']);
    atualizarStatus('bpm-status', dados.bpm, null, 60, 100);
    atualizarStatus('spo2-status', dados.spo2, null, 95, 100);
    atualizarStatus('sono-status', dados.sono, null, 7, 10);
    atualizarStatus('estresse-status', dados.estresse, null, 0, 50);

    // Mostrar alertas se necessário
    mostrarAlertas(dados);

    // Salvar dados no localStorage para usar na página de insights
    localStorage.setItem('dadosAnalise', JSON.stringify(dados));
}

// ============================================
// Função: Atualizar Status das Métricas
// ============================================

function atualizarStatus(elementId, valor, valoresBons = null, min = null, max = null) {
    const elemento = document.getElementById(elementId);
    if (!elemento) return;

    let status = 'good';
    let texto = 'Normal';

    if (valoresBons) {
        // Para emoções
        if (!valoresBons.includes(valor)) {
            status = 'warning';
            texto = 'Atenção';
        }
    } else {
        // Para valores numéricos
        if (typeof valor === 'string') {
            valor = parseFloat(valor);
        }

        if (min !== null && max !== null) {
            if (valor < min || valor > max) {
                status = 'danger';
                texto = 'Crítico';
            } else if (valor < min * 1.1 || valor > max * 0.9) {
                status = 'warning';
                texto = 'Atenção';
            }
        }
    }

    elemento.className = `status ${status}`;
    elemento.textContent = texto;
}

// ============================================
// Função: Mostrar Alertas
// ============================================

function mostrarAlertas(dados) {
    const alertBox = document.getElementById('alert-box');
    if (!alertBox) return;

    const alertas = [];

    if (dados.estresse > 70) {
        alertas.push('⚠️ Nível de estresse alto detectado. Recomendamos pausa imediata.');
    }
    if (dados.bpm > 100) {
        alertas.push('⚠️ Batimentos cardíacos elevados. Reduza o ritmo.');
    }
    if (dados.spo2 < 95) {
        alertas.push('⚠️ Oxigenação abaixo do ideal. Verifique sua respiração.');
    }
    if (dados.sono < 5) {
        alertas.push('⚠️ Horas de sono insuficientes. Priorize descanso.');
    }

    if (alertas.length > 0) {
        alertBox.innerHTML = '<h3>Alertas do Sistema</h3>' + 
            alertas.map(alerta => `<p>${alerta}</p>`).join('');
        alertBox.classList.add('show');
    } else {
        alertBox.classList.remove('show');
    }
}

// ============================================
// Função: Renderizar Insights
// ============================================

function renderizarInsights() {
    const dadosStr = localStorage.getItem('dadosAnalise');
    if (!dadosStr) {
        // Redirecionar para dashboard se não houver dados
        window.location.href = 'dashboard.html';
        return;
    }

    const dados = JSON.parse(dadosStr);
    const insights = gerarInsights(dados);

    const container = document.getElementById('insights-container');
    if (!container) return;

    container.innerHTML = '';

    if (insights.length === 0) {
        container.innerHTML = '<div class="card"><p>Nenhuma recomendação específica no momento. Continue mantendo seus hábitos saudáveis!</p></div>';
        return;
    }

    insights.forEach(insight => {
        const card = document.createElement('div');
        card.className = 'insight-card';
        card.innerHTML = `
            <div class="category">${insight.categoria}</div>
            <div class="recommendation">${insight.recomendacao}</div>
            <div class="action">💡 <strong>Ação:</strong> ${insight.acao}</div>
            <span class="priority ${insight.prioridade}">Prioridade ${insight.prioridade.toUpperCase()}</span>
        `;
        container.appendChild(card);
    });

    // Adicionar resumo dos dados
    const resumoCard = document.createElement('div');
    resumoCard.className = 'card';
    resumoCard.innerHTML = `
        <h3>Resumo da Análise</h3>
        <p><strong>Data/Hora:</strong> ${dados.timestamp}</p>
        <p><strong>Estado Emocional:</strong> ${dados.emocao}</p>
        <p><strong>BPM:</strong> ${dados.bpm} | <strong>SPO2:</strong> ${dados.spo2}% | <strong>Sono:</strong> ${dados.sono}h | <strong>Estresse:</strong> ${dados.estresse}%</p>
    `;
    container.insertBefore(resumoCard, container.firstChild);
}

// ============================================
// Event Listeners
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Dashboard: Botão Analisar Dados
    const btnAnalisar = document.getElementById('btn-analisar');
    if (btnAnalisar) {
        btnAnalisar.addEventListener('click', function() {
            // Animação de loading
            btnAnalisar.textContent = 'Analisando...';
            btnAnalisar.disabled = true;

            setTimeout(() => {
                const dados = gerarDadosSimulados();
                renderizarDados(dados);
                btnAnalisar.textContent = 'Analisar Dados';
                btnAnalisar.disabled = false;

                // Animação nos cards
                const cards = document.querySelectorAll('.metric-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = 'pulse 0.5s ease-out';
                        setTimeout(() => {
                            card.style.animation = '';
                        }, 500);
                    }, index * 100);
                });
            }, 1500);
        });
    }

    // Insights: Renderizar ao carregar
    if (document.getElementById('insights-container')) {
        renderizarInsights();
    }

    // Botão Novo Diagnóstico
    const btnNovoDiagnostico = document.getElementById('btn-novo-diagnostico');
    if (btnNovoDiagnostico) {
        btnNovoDiagnostico.addEventListener('click', function() {
            localStorage.removeItem('dadosAnalise');
            window.location.href = 'dashboard.html';
        });
    }
});



