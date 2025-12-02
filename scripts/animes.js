function animação() {
    const palco = document.getElementById('carousel-stage');
    // const ipersso = 1 // Variável não utilizada e removida

    const imagens = [
        'imagens/img/naruto titulo.png',
        'imagens/img/jujutsu kaisen titulo.png',
        'imagens/img/one piece titulo.png'
    ];
    const descricoes = [
        `<strong>Naruto</strong> é a saga épica de um ninja que transformou a rejeição em <strong>esperança</strong>.<br><br>
Acompanha <strong>Naruto Uzumaki</strong>, um órfão que carrega a temida <strong>Raposa de Nove Caudas</strong>, e sua busca incessante por <strong>reconhecimento</strong> na Vila da Folha.<br><br>
O anime mostra como ele e o <strong>Time 7</strong> superam perdas, ódio e desafios, sempre defendendo os <strong>laços de amizade</strong> (Kizuna) e a <strong>Vontade do Fogo</strong>.<br><br>
<strong>Naruto Shippuden</strong> culmina essa jornada, provando que a <strong>perseverança</strong> de quem nunca desiste pode mudar o <strong>destino</strong> de todo o mundo <strong>Ninja</strong>.`,

        `Em <strong>Jujutsu Kaisen</strong>, o mundo é assolado por <strong>Maldições</strong> — manifestações de emoções negativas humanas.<br><br>
A trama acompanha <strong>Yuji Itadori</strong>, que engole um objeto amaldiçoado e passa a ser o hospedeiro de <strong>Sukuna</strong>, o Rei das Maldições.<br><br>
Como feiticeiro de <strong>Jujutsu</strong>, ele se une a <strong>Nobara</strong> e <strong>Megumi</strong> sob a tutela do poderoso <strong>Gojo Satoru</strong>, para enfrentar essa ameaça sombria.<br><br>
A missão é combater o <strong>ódio</strong> e proteger os <strong>inocentes</strong>, provando que nem mesmo o <strong>destino</strong> mais cruel pode apagar a <strong>humanidade</strong>.`,

        `O mundo de <strong>One Piece</strong> acompanha a jornada de <strong>Monkey D. Luffy</strong>, um garoto com o sonho de ser o <strong>Rei dos Piratas</strong>.<br><br>
A bordo do Thousand Sunny, ele e o bando do <strong>Chapéu de Palha</strong> navegam pela Grand Line em busca do tesouro lendário: o <strong>One Piece</strong>.<br><br>
Guiados pela <strong>liberdade</strong> e pelo senso de <strong>justiça</strong>, eles enfrentam a Marinha, Shichibukai e Yonkou, sempre defendendo o valor da <strong>amizade</strong> e dos seus <strong>sonhos</strong>.<br><br>
Luffy é a prova de que com <strong>determinação</strong>, coragem e lealdade, é possível alcançar o <strong>topo do mundo</strong>.`
    ];
    const cores = ['naruto', 'roxo', 'azul'];

    const cartoes = [];
    let i = 0;
    while (i < imagens.length) {
        // ... (criação dos cartões do carrossel)
        const cartao = document.createElement('figure');
        cartao.className = 'carousel-card';

        const imagemEl = document.createElement('img');
        imagemEl.src = imagens[i];
        cartao.appendChild(imagemEl);

        switch (i) {
            case 0: corimgprevia = 'naruto'; break;
            case 1: corimgprevia = 'roxo'; break;
            case 2: corimgprevia = 'azul'; break;
        }

        cartao.dataset.glow = corimgprevia;

        let indiceClicado = i;
        cartao.addEventListener('click', function () {
            irPara(indiceClicado);
        });

        palco.appendChild(cartao);
        cartoes.push(cartao);

        i++;
    }


    let indice = 0;
    const maxVisiveis = 1;


    function deslocamentoRelativo(indiceAlvo) {
        const n = imagens.length;
        let d = (indiceAlvo - indice);
        if (d < -n / 2) d = d + n;
        if (d > n / 2) d = d - n;
        return d;
    }


    function renderizar() {
        for (let k = 0; k < cartoes.length; k++) {
            const desloc = deslocamentoRelativo(k);
            if (Math.abs(desloc) <= maxVisiveis) {
                cartoes[k].dataset.offset = String(desloc);
            } else {
                cartoes[k].dataset.offset = 'out';
            }
        }
    }

    /**
     * FUNÇÃO IR PARA (Controla o Carrossel Mestre - data-offset)
     */
    function irPara(novoIndice) {
        indice = novoIndice;
        
        let conteudo = document.querySelector('.conteudo');
        let cor = document.querySelector('.icons');
        let imag = document.querySelector('.comp');
        let im1 = document.querySelector('.bloco-banner-principal'); // Atualizado para a class correta
        let todosComOffset = document.querySelectorAll('[data-offset]'); // Seleciona todos que têm data-offset

        const descricao = document.querySelector('.descrição');
        const texto = descricao.querySelector('.texto');
        
        const corAtual = cores[indice];

        // 1. Atualiza o data-offset em todos os elementos principais (Carrossel Mestre)
        todosComOffset.forEach(el => el.dataset.offset = corAtual);
        
        // 2. Atualiza o SRC da imagem principal
        imag.src = `img/${corAtual}comp.png`;

        // 3. Atualiza a descrição com Fade
        texto.style.opacity = '0';
        setTimeout(() => {
            texto.innerHTML = descricoes[indice];
            texto.style.opacity = '1';
        }, 100);

        renderizar();

        // 4. CHAMA O CARROSSEL SECUNDÁRIO para RESETAR e ATIVAR o ciclo do novo personagem
        iniciarCarrosselPersonagens(); 
    }

    //--------------------------------------------------------------
    // LÓGICA DO CARROSSEL SECUNDÁRIO (data-persso)
    //--------------------------------------------------------------
    
    // Variáveis do Carrossel Secundário
    const temasMapeados = {
        'naruto': ['naruto', 'sasuke', 'sakura'],
        'roxo': ['gojo', 'sukuna', 'itadori'],
        'azul': ['luffy', 'zoro', 'nami']
    };
    const setaDireita = document.querySelector('.seta.direita');
    const setaEsquerda = document.querySelector('.seta.esquerda');
    const elementosTematicos = document.querySelectorAll('[data-persso]');

    let listaPersonagensAtual = [];
    let perssoAtualIndex = 0;


    /**
     * Inicializa/Reseta o Carrossel de Personagens
     * Lê o data-offset ATUALIZADO e define a lista correta
     */
    function iniciarCarrosselPersonagens() {
        if (elementosTematicos.length === 0) return;

        // LÊ O DATA-OFFSET ATUALIZADO após a função irPara ter mudado
        const offsetFixo = elementosTematicos[0].dataset.offset; 
        
        listaPersonagensAtual = temasMapeados[offsetFixo];

        if (!listaPersonagensAtual) {
            console.warn(`Lista de personagens não encontrada para o offset: ${offsetFixo}`);
            return;
        }

        // Reseta o índice para o primeiro personagem da nova lista
        perssoAtualIndex = 0; 
        
        // Aplica o primeiro personagem da lista
        aplicarNovoPersonagem(listaPersonagensAtual[perssoAtualIndex]);
    }

    /**
     * Aplica o novo personagem (data-persso) a todos os elementos.
     */
    function aplicarNovoPersonagem(novoPersso) {
        elementosTematicos.forEach(elemento => {
            elemento.dataset.persso = novoPersso;
        });
    }

    /**
     * Função que avança ou retrocede no array de personagens.
     */
    function mudarPersonagem(direcao) {
        // Garante que o estado seja lido antes de mudar (caso o 'irPara' ainda não tenha sido chamado)
        if (listaPersonagensAtual.length === 0) {
            iniciarCarrosselPersonagens();
        }

        let novoIndex = perssoAtualIndex + direcao;

        // Lógica de Loop
        if (novoIndex >= listaPersonagensAtual.length) {
            novoIndex = 0;
        } else if (novoIndex < 0) {
            novoIndex = listaPersonagensAtual.length - 1;
        }

        perssoAtualIndex = novoIndex;
        const novoPersso = listaPersonagensAtual[perssoAtualIndex];
        
        aplicarNovoPersonagem(novoPersso);
    }


    // --- Event Listeners para as setas ---
    
    if (setaDireita) {
        setaDireita.addEventListener('click', () => {
            mudarPersonagem(1); 
        });
    }

    if (setaEsquerda) {
        setaEsquerda.addEventListener('click', () => {
            mudarPersonagem(-1);
        });
    }
    
    // --- Inicialização ---
    // Inicia o carrossel mestre e o carrossel secundário no carregamento.
    renderizar();
    iniciarCarrosselPersonagens();
}


animação();
