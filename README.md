# Linu Seguro

Segurança digital para pequenos negócios: **https://seguro.linupedia.com.br**. Golpes no WhatsApp e no Pix, contas e
senhas, cópias de segurança, e-mail e site configurados e o aviso de privacidade da LGPD. Da família Linu, com o
[Linu Sites](https://sites.linupedia.com.br), o [Digital Linu](https://digital.linupedia.com.br) e a
[LinuPedia](https://linupedia.com.br); a [Família Linu](https://familia.linupedia.com.br) junta os serviços.

Uma página só, sem dependências: HTML, CSS e um pouco de JavaScript. O site tem publicação própria: a cada push na
`main`, o GitHub Actions confere a página (`html-validate` e `deploy/conferir-pagina.py`) e entrega o site na VM da
Oracle, como o usuário `linuseguro` (sem sudo), em `/opt/linu-seguro/app`. Para ligar a publicação uma vez:
`bash deploy/ligar-publicacao.sh` (cria a chave, prepara a VM com o `deploy/instalar-uma-vez.sh` e grava os segredos).
O Caddy serve o subdomínio e manda `/identidade` para https://familia.linupedia.com.br/identidade (`deploy/Caddyfile-bloco`).

## Como está organizado

| Arquivo / pasta | O que tem |
|---|---|
| `index.html` | A página: abertura com o céu polar e o iglu, o Raio-X com a cúpula de blocos, serviços (9 blocos, em quatro áreas, com preço), pacotes prontos (uma parede cada), como funciona (a escada), dúvidas e orçamento. |
| `404.html` | Página de erro (o Caddy mostra em qualquer endereço que não existe). |
| `css/estilo.css` | Visual “iglu de blocos”: o bloco de gelo chanfrado, as fiadas, a parede de serviços, a cúpula; as três versões (celular até 699 px, tablet até 1099 px, computador) e o modo claro e a noite polar. |
| `js/tema-inicio.js` | Aplica o tema escolhido antes de pintar. |
| `js/seguro.js` | Tema e a luz do iglu, menu, filtro por área, a parede do pacote com a estimativa, o formulário, voltar ao topo, entradas ao rolar e o Raio-X que assenta os blocos da cúpula. |
| `img/` | O iglu (`iglu.png`, 204 × 171) e a luz da porta (`iglu-luz.png`), o Linu com a chave (`linu-chave.png`, 176 × 190) e de frente (`linu-frente.png`, 172 × 190), os ícones do site e a imagem de compartilhar (`compartilhar.png`, 1200 × 630). Pixel art só em 1 ou 2 vezes o tamanho. |
| `arte/` | A origem do Linu com a chave (o prompt, as versões e a aprovada). |
| `fontes/` | Chakra Petch 700 (títulos) e Red Hat Text 400 a 700 (texto), subconjunto latin, servidas pelo próprio site; licenças OFL em `OFL-chakra-petch.txt` e `OFL-red-hat-text.txt`. |
| `robots.txt`, `sitemap.xml` | Para os buscadores. |
| `ferramentas/conferir-visual.mjs` | A conferência visual que o Actions roda antes de publicar (cópia do `linuarquivos/modelos/ferramentas/`): 390, 820 e 1280 px, claro e escuro; reprova com rolagem lateral, erro no console, arquivo faltando ou falha séria de acessibilidade, e guarda as capturas como artefato. No computador: `node ferramentas/conferir-visual.mjs --raiz . --playwright <pasta do playwright> --axe <axe.min.js>`. |
| `precos.json` e `ferramentas/precos-servicos.py` | **Os preços numa fonte só** (07/11/2026): o `precos.json` é a fonte; o script escreve no `index.html` o `data-preco`/`data-tipo`, a linha “a partir de” de cada serviço, o `minPrice` do JSON-LD e o total dos pacotes prontos. Para mudar um preço: editar o `precos.json` e rodar `python3 ferramentas/precos-servicos.py`. O Actions confere (`--conferir`) e não publica se a página discordar. A Família Linu lê este arquivo para as rotas. |
| `deploy/` | A publicação na VM: o `receber.sh`, a preparação, o `ligar-publicacao.sh` e a conferência das páginas. |
| `.github/workflows/oracle.yml` | Confere e publica a cada push na `main`. |
| `IDENTIDADE.md` | As decisões de identidade (o iglu de blocos, as formas, as cores, as fontes, a voz, o que evitar e o que mudou em 07/11/2026). Ler antes de mexer em tela. |
| `DIRETRIZES-UX.md` | As diretrizes de interface e desempenho de todos os projetos. |

## O que a página faz

- **Raio-X de segurança: a cúpula se monta.** Oito perguntas de sim ou não (WhatsApp, contas, senhas, cópias, golpes,
  e-mail, site, privacidade), cada uma com o seu bloco numa cúpula desenhada em SVG (`data-rx-bloco`). Cada “sim”
  assenta o bloco, que desce e encaixa (“5 de 8 blocos”); cada “não” deixa o lugar tracejado na cor do Iglu; com os 8,
  a porta acende. A pergunta com o dedo ou o foco em cima acende o seu lugar. No celular e no tablet, a cúpula pequena
  fica presa no alto enquanto se responde. Cada “não” recomenda um serviço, com o motivo; as duas perguntas de contas levam ao mesmo serviço, uma vez só. Na pergunta do
  site, “Não tenho site” conta como bloco no lugar e mostra o link do Linu Sites. Com tudo em dia, a recomendação é o
  Vigia. A estimativa do recomendado aparece embaixo, e “Levar para o meu pacote” junta tudo. Respostas no navegador
  (`localStorage`, `seguro-raiox`); a tabela das recomendações é o `RAIOX` do `js/seguro.js` (bloco 8).
- **Monte o seu pacote:** cada serviço é um bloco com “Adicionar”; o pacote fica guardado no navegador
  (`localStorage`, `seguro-pacote`) e aparece ao lado como uma parede que sobe, um bloco por serviço (computador), ou
  numa barra presa embaixo (celular e tablet).
- **Filtro por área:** Golpes, Senhas e dados, Site, e-mail e LGPD, Acompanhamento.
- **Pacotes prontos:** Básico, Negócio protegido (o destaque) e Com site, cada um uma parede com um bloco por serviço,
  marcam os serviços de uma vez, com o total; o quarto, tracejado, leva aos pacotes da Família Linu.
- **Orçamento:** nome e negócio validados na hora; a mensagem sai escrita no WhatsApp ou no e-mail, com o pacote e a
  estimativa. O que foi digitado fica guardado no navegador (`seguro-nome`, `seguro-negocio`, `seguro-mensagem`).
- **A luz do iglu ao trocar o tema:** o botão do sol e da lua acende (escuro) ou apaga (claro) a luz da porta, e o Linu
  dá um pulinho; a legenda conta o que houve. Com o iglu fora da tela, a cena aparece num cartão no canto e some
  sozinha. Só ao toque, nunca em loop; com “reduzir movimento”, a luz muda sem animar.
- **Os blocos da parede:** os serviços ficam em fileiras desencontradas meio bloco (7 trilhas no computador, 5 no
  tablet, cada bloco ocupa 2), escolhidas no CSS por `:nth-child(… of .servico:not([hidden]))`, então o filtro refaz a
  parede sozinho. Os meios-blocos das pontas são o `::after` do bloco, só desenho.
- **A faixa da família:** no alto, “Da família Linu, com o Linu Sites e o Digital Linu. Conheça a Família Linu”.
- **Dúvidas com honestidade:** ninguém garante que o negócio nunca vai cair em golpe; as senhas ficam com o cliente; o
  aviso de privacidade é um modelo e não substitui advogado em dados sensíveis. Pagamento, revisões e fidelidade com as
  mesmas regras do Linu Sites e do Digital Linu.
- **Compartilhar e Google:** `img/compartilhar.png` (1200 × 630, o Linu com a chave na frente do iglu, na neve, com a
  marca de blocos e a frase) nas etiquetas
  `og:` e `twitter:card`, e os dados estruturados (`ProfessionalService`, com os 9 serviços) no `<head>`.

## Como mudar um preço

Cada cartão de serviço tem `data-preco` (o número, sem pontos) e `data-tipo` (`unico` ou `mensal`), e a linha do preço
que se lê (`a partir de <b>R$&nbsp;400</b>`). Para mudar um preço, mude os três lugares:

1. o `data-preco` do cartão em `index.html`;
2. a linha `servico-preco` do mesmo cartão;
3. o `minPrice` do serviço no JSON-LD do `<head>`.

O pacote, a barra de baixo, o formulário, a mensagem, o Raio-X e os pacotes prontos somam sozinhos a partir do
`data-preco`, com o que é entrega única e o que é por mês à parte. O total escrito nos pacotes prontos
(`data-pacote-preco`) é refeito pelo JavaScript; o texto fixo vale só sem JavaScript, então vale atualizá-lo também.

Serviço novo: um `<article class="servico bloco">` com `data-cat`, `data-id`, `data-preco` e `data-tipo`, a contagem da área
no filtro, o total “Todas” e a entrada no JSON-LD.

## Ver no computador

```bash
python3 -m http.server 8000
```

## Conferir antes de publicar

```bash
npx --yes html-validate@10.1.2 *.html
python3 deploy/conferir-pagina.py
node --check js/*.js
```

Pergunta nova no Raio-X: o `<fieldset class="pergunta bloco" data-pergunta="…">`, a entrada no `RAIOX` do
`js/seguro.js` e um bloco a mais nas duas cúpulas (o `data-rx-bloco` com o mesmo nome); a cúpula de 8 blocos é
desenhada com as contas de uma meia-elipse (centro 180 × 206, raios 168 e 190, fileiras em 206, 150, 98 e 52).

## Números (07/11/2026)

Nenhuma rolagem lateral em 390, 820 e 1280 px, no claro e no escuro, e nenhum erro no console. Altura da página: 9.764
px no celular (390 px), 7.484 px no tablet (820 px) e 5.866 px no computador (1280 px).
