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
| `index.html` | A página: abertura com o iglu, o Raio-X, serviços (9, em quatro áreas, com preço), pacotes prontos, como funciona, dúvidas e orçamento. |
| `404.html` | Página de erro (o Caddy mostra em qualquer endereço que não existe). |
| `css/estilo.css` | Visual, com as três versões (celular até 699 px, tablet até 1099 px, computador) e o modo claro e escuro. |
| `js/tema-inicio.js` | Aplica o tema escolhido antes de pintar. |
| `js/seguro.js` | Tema e a luz do iglu, menu, filtro por área, o pacote com a estimativa, o formulário, voltar ao topo, entradas ao rolar e o Raio-X. |
| `img/` | O iglu (`iglu.png`) e a luz da porta (`iglu-luz.png`), o Linu com a chave (`linu-chave.png`) e de frente (`linu-frente.png`), os ícones do site e a imagem de compartilhar (`compartilhar.png`, 1200 × 630). |
| `arte/` | A origem do Linu com a chave (o prompt, as versões e a aprovada). |
| `fontes/` | Nunito (licença OFL, `OFL.txt`), servida pelo próprio site. |
| `robots.txt`, `sitemap.xml` | Para os buscadores. |
| `deploy/` | A publicação na VM: o `receber.sh`, a preparação, o `ligar-publicacao.sh` e a conferência das páginas. |
| `.github/workflows/oracle.yml` | Confere e publica a cada push na `main`. |
| `IDENTIDADE.md` | As decisões de identidade (o iglu, as cores, as fontes, a voz, o que evitar). Ler antes de mexer em tela. |
| `DIRETRIZES-UX.md` | As diretrizes de interface e desempenho de todos os projetos. |

## O que a página faz

- **Raio-X de segurança: o iglu se monta.** Oito perguntas de sim ou não (WhatsApp, contas, senhas, cópias, golpes,
  e-mail, site, privacidade). Cada “sim” põe um bloco no iglu, que aparece de baixo para cima sobre a silhueta apagada
  (“5 de 8 blocos”); no celular e no tablet, um iglu pequeno fica preso no alto enquanto se responde. Cada “não”
  recomenda um serviço, com o motivo; as duas perguntas de contas levam ao mesmo serviço, uma vez só. Na pergunta do
  site, “Não tenho site” conta como bloco no lugar e mostra o link do Linu Sites. Com tudo em dia, a recomendação é o
  Vigia. A estimativa do recomendado aparece embaixo, e “Levar para o meu pacote” junta tudo. Respostas no navegador
  (`localStorage`, `seguro-raiox`); a tabela das recomendações é o `RAIOX` do `js/seguro.js` (bloco 8).
- **Monte o seu pacote:** cada serviço tem “Adicionar”; o pacote fica guardado no navegador (`localStorage`,
  `seguro-pacote`) e aparece ao lado (computador) ou numa barra presa embaixo (celular e tablet).
- **Filtro por área:** Golpes, Senhas e dados, Site, e-mail e LGPD, Acompanhamento.
- **Pacotes prontos:** Básico, Negócio protegido (o destaque) e Com site marcam os serviços de uma vez, com o total; o
  quarto cartão leva aos pacotes da Família Linu.
- **Orçamento:** nome e negócio validados na hora; a mensagem sai escrita no WhatsApp ou no e-mail, com o pacote e a
  estimativa. O que foi digitado fica guardado no navegador (`seguro-nome`, `seguro-negocio`, `seguro-mensagem`).
- **A luz do iglu ao trocar o tema:** o botão do sol e da lua acende (escuro) ou apaga (claro) a luz da porta, e o Linu
  dá um pulinho; a legenda conta o que houve. Com o iglu fora da tela, a cena aparece num cartão no canto e some
  sozinha. Só ao toque, nunca em loop; com “reduzir movimento”, a luz muda sem animar.
- **A faixa da família:** no alto, “Da família Linu, com o Linu Sites e o Digital Linu. Conheça a Família Linu”.
- **Dúvidas com honestidade:** ninguém garante que o negócio nunca vai cair em golpe; as senhas ficam com o cliente; o
  aviso de privacidade é um modelo e não substitui advogado em dados sensíveis. Pagamento, revisões e fidelidade com as
  mesmas regras do Linu Sites e do Digital Linu.
- **Compartilhar e Google:** `img/compartilhar.png` (1200 × 630, o Linu com a chave na frente do iglu) nas etiquetas
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

Serviço novo: um `<article class="servico">` com `data-cat`, `data-id`, `data-preco` e `data-tipo`, a contagem da área
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

## Números (06/11/2026)

Nenhuma rolagem lateral em 390, 820 e 1280 px, no claro e no escuro, e nenhum erro no console. Altura da página: 9.015
px no celular (390 px), 7.057 px no tablet (820 px) e 5.250 px no computador (1280 px).
