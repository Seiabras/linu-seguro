# Identidade do Linu Seguro

Lido antes de mexer em qualquer tela, junto com o `DIRETRIZES-UX.md`. O que é comum à família (o Linu, as cores, o que
nunca entra) está no `IDENTIDADE-LINU.md` do linuarquivos; aqui fica só o que é deste site. Primeira versão de
06/11/2026; identidade refeita em 07/11/2026 (“Iglu de blocos”, ver o fim do arquivo).

## O que o site é, numa frase
Segurança digital para pequenos negócios (golpes no WhatsApp e no Pix, contas e senhas, cópias de segurança, e-mail e
site configurados, aviso de privacidade da LGPD), da família Linu, com o Raio-X e o pacote montados na própria página e
o orçamento pelo WhatsApp.

## O objeto: o iglu de blocos
Cada produto da família tem um objeto: a LinuPedia é o caderno de expedição; o Linu Sites, a estação com o lampião; o
Digital Linu, a ilha de edição. O Linu Seguro é **o iglu**, a casa do Linu, a que protege, e o iglu é feito de
**blocos de gelo**. O bloco não é enfeite: é a forma de tudo o que a página mostra.
- **A página é uma parede.** Fundo de neve; cada parte começa numa **fiada** (uma fileira de blocos chanfrados, com a
  junta entre eles), e as fiadas de seções vizinhas ficam desencontradas meio bloco, como alvenaria.
- **Os serviços são blocos assentados** em fileiras desencontradas: no computador, 3 por fileira, e a fileira do meio
  começa meio bloco para dentro, com meios-blocos nas pontas; no tablet, 2 por fileira, do mesmo jeito; no celular, uma
  coluna de blocos, um pouco para a esquerda e um pouco para a direita. O bloco escolhido fica azul-gelo (“assentado”).
- **O Raio-X assenta os blocos da cúpula.** Uma cúpula desenhada em SVG com 8 blocos, um por pergunta (WhatsApp e
  Contas na base, ao lado da porta; Senhas, Cópias e Golpes no meio; E-mail e Site em cima; Privacidade no topo). Cada
  “sim” assenta o bloco (ele desce e encaixa); cada “não” deixa o lugar tracejado na cor do Iglu; sem resposta, o lugar
  fica tracejado e apagado. Com os 8 blocos, a porta acende. A pergunta com o dedo ou o foco em cima acende o seu lugar
  na cúpula. No celular e no tablet, a cúpula pequena fica presa no alto enquanto se responde.
- **A parede do pacote:** cada serviço escolhido vira um bloco em cima do anterior (computador). Nos pacotes prontos,
  cada pacote é uma parede com um bloco por serviço, todas no mesmo chão: a altura mostra o tamanho do pacote.
- **O “Como funciona” é uma escada:** cada etapa um bloco, um degrau acima da anterior, com as fiadas embaixo
  (computador); no tablet, duas colunas desencontradas; no celular, uma coluna de blocos alternados.
- **A marca:** a cúpula de blocos, pequena, ao lado do nome (`#i-domo`, no sprite do começo do `<body>`).
- **A abertura:** o céu polar (de dia, claro com flocos; à noite, escuro com estrelas paradas), o chão de neve, o iglu
  em pixel art (`img/iglu.png`, 204 × 171) e o Linu com a chave (`img/linu-chave.png`, 176 × 190).
- **A luz da porta:** `img/iglu-luz.png`, do mesmo tamanho do iglu, acesa no modo escuro. Ao trocar o tema, a luz acende
  tremendo um pouco (ou apaga) e o Linu dá um pulinho (só sobe e desce). Só ao toque, nunca em loop; com “reduzir
  movimento”, a luz muda sem animar. Com o iglu fora da tela, ele aparece num bloco no canto, em 1 vez o tamanho.

## O Linu e a pixel art
- **Sempre em escala inteira:** 1 vez (o tamanho do arquivo) ou 2 vezes exatas, com `image-rendering: pixelated`, o
  tamanho em px no CSS e `max-width: none` (nunca encolhido pela largura, nunca em porcentagem, nunca `object-fit`).
  Nem a animação escala: o pulinho é só translação.
- **Onde:** o iglu em 2 vezes (408 × 342) e o Linu em 1 vez em todos os aparelhos; no celular, o palco corta a beira
  esquerda do iglu em vez de encolher o desenho. O Linu de frente (`img/linu-frente.png`, 172 × 190) em 1 vez ao lado
  do aviso do contato (tablet e computador) e na página de erro.
- **O Linu é detalhe**, não o centro: aparece na abertura, no contato e no erro, nunca gigante.
- O Linu é o da LinuPedia, nunca redesenhado liso. O Linu com a chave saiu do kit de arte a partir do
  `linu-frente.png` (`arte/linu-chave/`).

## Formas
- **O bloco de gelo:** retângulo de canto chanfrado (corte reto de 5 a 12 px, conforme o tamanho; nunca arredondado),
  luz de 3 px em cima e 2 px à esquerda, face de 3 px à direita e sombra azulada de 4 a 6 px embaixo, aresta fina. O
  corpo do bloco é o `::before` com `clip-path`, para o contorno de foco do elemento não ser cortado; cada variante só
  troca as variáveis `--b-*` (`css/estilo.css`, “O bloco de gelo”).
- **A junta:** 10 px entre blocos (`--jw`), com o fundo aparecendo.
- **Botões:** blocos cheios, retos e chanfrados, que afundam 2 px ao toque. O principal é o Iglu cheio; o secundário é
  o bloco de gelo (`.botao-gelo`). Nada de pílula.
- **Campos:** retos, com a borda da junta e uma sombra interna em cima, como gelo cavado.
- O bloco tracejado é o que leva para fora (a Família Linu) ou o lugar vazio (o pacote sem nada, a cúpula sem resposta).

## Fontes
- **Chakra Petch** 700 nos títulos, nos números e nos preços: tem os cantos cortados em diagonal, como o chanfro dos
  blocos, e é firme sem ser fria.
- **Red Hat Text** 400 a 700 (arquivo variável) no texto: aberta, de leitura fácil em tamanho pequeno.
- Servidas pelo próprio site em `fontes/` (subconjunto latin, que cobre o português), licença OFL ao lado
  (`OFL-chakra-petch.txt`, `OFL-red-hat-text.txt`). Fora da “lista de IA” do `IDENTIDADE-LINU.md`.

## Cores
- **Dominante: o Iglu**, `#0E7490`, nos botões cheios (texto branco, 5,4:1), nos números grandes e nos desenhos. Texto
  pequeno na cor usa o forte `#155E75` (6,0:1 sobre o gelo; 5,3:1 sobre o céu). Face de baixo do bloco cheio `#0B4A5C`.
- **Dia (neve e gelo):** fundo `#EDF5F9`, seções alternadas `#DCECF3`, bloco `#FFFFFF` a `#F2F9FC`, sombra `#9AC4D5`,
  aresta `#B5D5E2`, junta `#BFDAE6`, assentado `#DDF4FA` a `#C9ECF5`, céu `#BFE2EF` a `#EAF6FA`; texto `#0B2230` e
  `#3B5767` (6,1:1 ou mais em todos os fundos).
- **Noite polar (modo escuro):** céu `#02060E` a `#0B1D30` com estrelas, fundo `#07111C`, seções `#0B1A29`, bloco
  `#152C40` a `#0F2233` com a luz fria em cima (`rgba(165, 243, 252, .34)`) e a sombra `#030A12`; o Iglu vira `#22D3EE`
  (texto `#042F2E` nos botões, 8,0:1) e o forte `#67E8F9`; texto `#E4F2F8` e `#A6BFCC` (6,0:1 ou mais).
- **O rodapé e a barra do pacote:** o gelo da noite `#0B2230`, nos dois modos.
- **A luz da porta:** os laranjas do fogo da família (`#F59E0B` e o desenho), só na porta.
- O único degradê é o do céu e do gelo (azul sobre azul); nada de roxo.

## Ícones e imagens
- **Ícones próprios em SVG** (traço 2, pontas redondas), um por serviço, no `<symbol>` do começo do `<body>`: o cadeado
  (check-up), o escudo com o celular (WhatsApp e contas), as pessoas (treino), a chave (senhas), a nuvem com a seta
  (cópias), o envelope (e-mail), o globo (site), o documento (aviso de privacidade) e o olho (Vigia). As áreas do filtro
  usam o escudo, a chave, o globo e o olho. A cúpula de blocos (`#i-domo`) é a marca.
- Nada de foto de banco, cadeado brilhante, hacker de capuz ou tela de código verde.

## Voz
Português do Brasil falado, direto e honesto sobre o limite do serviço: “Ninguém pode garantir isso”, “As senhas ficam
com você”, “vale a revisão de um advogado”. Usa: “a gente”, “o seu negócio”, “pacote”, “bloco”, “parede”, “assentar”.
Nunca: “transforme”, “blindagem total”, “100% seguro”, “simples, rápido e seguro”, “soluções inovadoras”.

## O que evitar neste site
- Prometer que o negócio nunca vai cair em golpe ou ser invadido.
- Medo como argumento (contagem de ataques, alarme vermelho, “seu negócio corre perigo”). O “não” do Raio-X é um lugar
  vazio na cúpula, não um alerta.
- Pedir senha por mensagem, em qualquer texto ou formulário.
- Emoji como ícone, rótulos em maiúsculas espaçadas, animação em loop.
- Voltar ao esqueleto dos irmãos: topo e abertura grafite, botão pílula, cartão branco de canto redondo.

## Uma marca de mão
O Linu na frente do iglu mostrando a chave: a casa está fechada, e a chave está com ele.

## O que mudou em 07/11/2026 e por quê
A primeira versão foi montada sobre o esqueleto do Digital Linu (topo e abertura grafite com o fio colorido, botões em
pílula, cartões brancos de borda de 2 px e canto de 18 px, Nunito, as mesmas seções na mesma ordem) e só a cor mudava:
o site parecia uma cópia do irmão. O Linu, em 1,5 vez no celular, ficava borrado de perto.
- **Fundo:** do grafite para a neve e o céu polar; o escuro virou a noite polar, não a inversão do claro.
- **Formas:** do cartão redondo para o bloco de gelo chanfrado, com luz, sombra e junta; dos botões em pílula para os
  botões-bloco que afundam; as fiadas separando as seções.
- **O objeto dá forma:** a parede de serviços desencontrada, a cúpula do Raio-X que assenta um bloco por pergunta (antes,
  a imagem do iglu aparecendo por recorte), a parede do pacote, as paredes dos pacotes prontos e a escada do “Como
  funciona”.
- **Letras:** da Nunito (a mesma dos irmãos) para a Chakra Petch e a Red Hat Text.
- **Pixel art:** só em 1 vez ou 2 vezes exatas, também no celular e na animação.
- **A imagem de compartilhar** (`img/compartilhar.png`, 1200 × 630) refeita na identidade nova.
