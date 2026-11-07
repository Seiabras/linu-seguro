# Identidade do Linu Seguro

Lido antes de mexer em qualquer tela, junto com o `DIRETRIZES-UX.md`. O que é comum à família (o Linu, as cores, o que
nunca entra) está no `IDENTIDADE-LINU.md` do linuarquivos; aqui fica só o que é deste site. Decisão de 06/11/2026.

## O que o site é, numa frase
Segurança digital para pequenos negócios (golpes no WhatsApp e no Pix, contas e senhas, cópias de segurança, e-mail e
site configurados, aviso de privacidade da LGPD), da família Linu, com o Raio-X e o pacote montados na própria página e
o orçamento pelo WhatsApp.

## O objeto: o iglu do Linu
Cada produto da família tem um objeto: a LinuPedia é o caderno de expedição; o Linu Sites, a estação com o lampião; o
Digital Linu, a ilha de edição. O Linu Seguro é **o iglu**, a casa do Linu, a que protege:
- **Na abertura:** o iglu em pixel art (`img/iglu.png`, 204 × 171, da LinuPedia) com o Linu na frente, segurando a
  chave de casa (`img/linu-chave.png`). Em 2 vezes o tamanho no tablet e no computador e 1,5 vez no celular, sempre com
  `image-rendering: pixelated`.
- **A luz da porta:** um desenho do mesmo tamanho (`img/iglu-luz.png`, tirado dos pixels da porta) que fica aceso no
  modo escuro. Ao trocar o tema, a luz acende tremendo um pouco (ou apaga) e o Linu dá um pulinho. Só ao toque, nunca
  em loop; com “reduzir movimento”, a luz muda sem animar.
- **O Raio-X monta o iglu:** cada “sim” é um bloco no lugar, e o iglu aparece de baixo para cima (“5 de 8 blocos”),
  com a silhueta apagada atrás mostrando o que falta.
- **O “Como funciona” em blocos:** cada etapa é um bloco de gelo numerado, deitados numa fileira no computador.
- **O fio de gelo** (`#22D3EE`) embaixo da abertura.

## Fontes
- **Nunito**, a mesma do Linu Sites e do Digital Linu, servida pelo próprio site em `fontes/` (licença OFL), pesos de
  200 a 1000 num arquivo variável. Nenhuma outra.

## Cores
- **Dominante: o Iglu**, `#0E7490`, nos botões e textos sobre o branco (5,4:1; 5,0:1 sobre o gelo, AA). Forte
  `#155E75`, clara `#CFFAFE`. No modo escuro, `#22D3EE` com texto `#042F2E` nos botões (8,0:1).
- **Sobre o grafite** (topo, abertura, Raio-X, contato): o ciano `#22D3EE` nos botões e `#67E8F9` nos destaques de texto
  (9,8:1).
- **Base da família:** grafite `#1F2A44`, seções alternadas no gelo `#EFF8FF` (escuro, `#0B1E33`), fundo `#F8FAFC`,
  texto `#0F172A` e `#475569`.
- **A luz da porta:** os laranjas do fogo da família (`#EA580C`, `#F59E0B`, `#FCD34D`), só no desenho.
- Sem gradiente: a abertura é grafite liso com o fio de gelo. O único degradê é o brilho fraco da porta acesa.

## Formas
- Botões em pílula (`999px`), cartões com canto de 18 px e borda de 2 px, sem sombra (a sombra só aparece ao passar o
  mouse no computador). O cartão escolhido ganha a borda do Iglu.
- O bloco de gelo do “Como funciona”: canto de 6 px, borda do Iglu, um risco claro em cima e a sombra embaixo, como os
  blocos do desenho.
- O cartão tracejado é o que leva para fora (a Família Linu).

## Ícones e imagens
- **Ícones próprios em SVG** (traço 2, pontas redondas), um por serviço, no `<symbol>` do começo do `<body>`: o cadeado
  (check-up), o escudo com o celular (WhatsApp e contas), as pessoas (treino), a chave (senhas), a nuvem com a seta
  (cópias), o envelope (e-mail), o globo (site), o documento (aviso de privacidade) e o olho (Vigia). As áreas do filtro
  usam o escudo, a chave, o globo e o olho.
- **O Linu** é o da LinuPedia, em pixel art, nunca redesenhado liso. O Linu com a chave saiu do kit de arte a partir
  do `linu-frente.png` (`arte/linu-chave/`).
- Nada de foto de banco, cadeado brilhante, hacker de capuz ou tela de código verde.

## Voz
Português do Brasil falado, direto e honesto sobre o limite do serviço: “Ninguém pode garantir isso”, “As senhas ficam
com você”, “vale a revisão de um advogado”. Usa: “a gente”, “o seu negócio”, “pacote”, “bloco”. Nunca: “transforme”,
“blindagem total”, “100% seguro”, “simples, rápido e seguro”, “soluções inovadoras”.

## O que evitar neste site
- Prometer que o negócio nunca vai cair em golpe ou ser invadido.
- Medo como argumento (contagem de ataques, alarme vermelho, “seu negócio corre perigo”).
- Pedir senha por mensagem, em qualquer texto ou formulário.
- Emoji como ícone, rótulos em maiúsculas espaçadas, animação em loop.

## Uma marca de mão
O Linu na frente do iglu mostrando a chave: a casa está fechada, e a chave está com ele.
