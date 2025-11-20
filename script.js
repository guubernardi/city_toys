document.addEventListener('DOMContentLoaded', () => {
    
    /*  1. ANIMAÇÃO DE APARECER AO ROLAR (Scroll) */
    
    // Configurações do "olheiro" (Observador)
    const opcoesObservador = {
        root: null, // observa a tela inteira
        rootMargin: '0px',
        threshold: 0.1 // dispara quando 10% do elemento estiver visível
    };

    // Cria o observador que vai vigiar os elementos
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            // Se o elemento apareceu na tela
            if (entrada.isIntersecting) {
                // Adiciona a classe CSS que faz ele subir suavemente
                entrada.target.classList.add('visible');
                
                // Para de vigiar este elemento (para não animar de novo se subir a tela)
                observador.unobserve(entrada.target);
            }
        });
    }, opcoesObservador);

    // Seleciona todos os elementos que tem a classe .animate-on-scroll no HTML
    const elementosParaAnimar = document.querySelectorAll('.animate-on-scroll');
    
    // Manda o observador vigiar cada um deles
    elementosParaAnimar.forEach(elemento => observador.observe(elemento));


    /* 2. SISTEMA DE FILTROS (Pequenos, Médios, Grandes)*/
    
    const botoesFiltro = document.querySelectorAll('.btn-filtro');
    const cardsBrinquedo = document.querySelectorAll('.card-destaque');

    // Só executa se existirem botões de filtro na página
    if (botoesFiltro.length > 0) {
        botoesFiltro.forEach(botao => {
            botao.addEventListener('click', () => {
                
                // 1. Remove a cor de 'ativo' de todos os botões
                botoesFiltro.forEach(btn => btn.classList.remove('ativo'));
                
                // 2. Adiciona a cor de 'ativo' apenas no botão clicado
                botao.classList.add('ativo');

                // 3. Pega qual categoria o usuário clicou (ex: "pequeno")
                const categoriaSelecionada = botao.getAttribute('data-filter');

                // 4. Percorre todos os brinquedos para mostrar ou esconder
                cardsBrinquedo.forEach(card => {
                    // Pega a categoria do brinquedo atual
                    const categoriaBrinquedo = card.getAttribute('data-categoria');

                    // Lógica: Se o filtro for "todos" OU se for igual à categoria do brinquedo
                    if (categoriaSelecionada === 'todos' || categoriaSelecionada === categoriaBrinquedo) {
                        card.classList.remove('escondido'); // Mostra
                        card.classList.add('visible'); // Garante que esteja visível se tiver animação
                    } else {
                        card.classList.add('escondido'); // Esconde
                    }
                });
            });
        });
    }
    
    const menuNavegacao = document.querySelector('.navbar');
    
    // Escuta o evento de rolagem da janela
    window.addEventListener('scroll', () => {
        // Se rolou mais de 50 pixels para baixo
        if (window.scrollY > 50) {
            // Adiciona uma sombra mais forte
            menuNavegacao.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
        } else {
            // Volta para a sombra suave original
            menuNavegacao.style.boxShadow = "0 2px 15px rgba(0,0,0,0.05)";
        }
    });

});