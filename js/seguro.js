/* Linu Seguro (06/11/2026; iglu de blocos em 07/11/2026): tema com a luz do iglu, menu do celular, filtro por área,
   a parede do pacote com a estimativa, o formulário que escreve a mensagem, as entradas ao rolar e o Raio-X que assenta
   os blocos da cúpula. Sem biblioteca; tudo funciona sem JavaScript, menos o filtro, o pacote e o Raio-X. */
(function () {
  "use strict";
  var raiz = document.documentElement;
  var menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
  function guardar(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function ler(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function rolarAte(id) {
    document.getElementById(id).scrollIntoView({ behavior: menosMovimento.matches ? "auto" : "smooth" });
  }

  /* 1. Tema: sem escolha, segue o sistema; o botão alterna e guarda */
  var botaoTema = document.querySelector("[data-tema]");
  var sistemaEscuro = window.matchMedia("(prefers-color-scheme: dark)");
  function escuroAgora() { return raiz.dataset.theme ? raiz.dataset.theme === "dark" : sistemaEscuro.matches; }
  function rotularTema() {
    var escuro = escuroAgora();
    botaoTema.setAttribute("aria-label", escuro ? "Mudar para o modo claro" : "Mudar para o modo escuro");
    botaoTema.title = escuro ? "Modo claro" : "Modo escuro";
  }
  botaoTema.addEventListener("click", function () {
    raiz.dataset.theme = escuroAgora() ? "light" : "dark";
    guardar("tema", raiz.dataset.theme);
    rotularTema();
    iluminar(raiz.dataset.theme === "dark");
  });
  sistemaEscuro.addEventListener("change", rotularTema);
  rotularTema();

  /* 1b. A luz do iglu ao trocar o tema: no escuro, a luz da porta acende (tremendo um pouco, como lampião); no claro,
        apaga. O Linu dá um pulinho. Se o iglu estiver fora da tela, a cena aparece num cartão no canto e some
        sozinha (lá, só o iglu, em 1 vez o tamanho do desenho). Só ao toque, nunca em loop; com "reduzir movimento", só a luz e a legenda mudam, sem animar. */
  var cena = document.querySelector("[data-cena]");
  var legenda = document.querySelector("[data-cena-legenda]");
  var cartao = null, sumirCartao;
  function cenaNaTela() {
    var r = cena.getBoundingClientRect();
    return r.bottom > 80 && r.top < window.innerHeight - 40;
  }
  function animar(quadro, escuro) {
    quadro.classList.remove("acendeu", "apagou");
    void quadro.offsetWidth; // recomeça a animação se tocarem de novo no meio
    quadro.classList.add(escuro ? "acendeu" : "apagou");
  }
  function iluminar(escuro) {
    legenda.textContent = escuro ? "Anoiteceu: o Linu acendeu a luz do iglu." : "Amanheceu: o Linu apagou a luz do iglu.";
    if (menosMovimento.matches) return;
    if (cenaNaTela()) { animar(cena, escuro); return; }
    if (!cartao) {
      cartao = document.createElement("div");
      cartao.className = "cena-cartao";
      cartao.setAttribute("aria-hidden", "true");
      var copia = cena.cloneNode(true);
      copia.removeAttribute("data-cena");
      copia.querySelectorAll("img").forEach(function (img) { img.alt = ""; });
      cartao.appendChild(copia);
      document.body.appendChild(cartao);
    }
    cartao.classList.add("aberto");
    animar(cartao.firstChild, escuro);
    clearTimeout(sumirCartao);
    sumirCartao = setTimeout(function () { cartao.classList.remove("aberto"); }, 1800);
  }

  /* 2. Menu do celular */
  var abrir = document.querySelector(".menu-abrir");
  var links = document.getElementById("menu-links");
  function fecharMenu() {
    abrir.setAttribute("aria-expanded", "false");
    abrir.setAttribute("aria-label", "Abrir o menu");
    links.classList.remove("aberto");
  }
  abrir.addEventListener("click", function () {
    var aberto = abrir.getAttribute("aria-expanded") === "true";
    abrir.setAttribute("aria-expanded", String(!aberto));
    abrir.setAttribute("aria-label", aberto ? "Abrir o menu" : "Fechar o menu");
    links.classList.toggle("aberto", !aberto);
  });
  links.addEventListener("click", function (e) { if (e.target.closest("a")) fecharMenu(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") fecharMenu(); });

  /* 3. Filtro por área */
  var areas = document.querySelector("[data-areas]");
  var servicos = Array.prototype.slice.call(document.querySelectorAll(".servico"));
  areas.hidden = false;
  function filtrar(area) {
    areas.querySelectorAll("[data-area]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.area === area));
    });
    servicos.forEach(function (s) {
      var mostra = area === "todas" || s.dataset.cat === area;
      if (mostra && s.hidden) {
        s.hidden = false;
        s.classList.add("chegando");
        requestAnimationFrame(function () { requestAnimationFrame(function () { s.classList.remove("chegando"); }); });
      } else if (!mostra) {
        s.hidden = true;
      }
    });
    var ativo = areas.querySelector('[aria-pressed="true"]');
    if (ativo && ativo.scrollIntoView && areas.scrollWidth > areas.clientWidth) {
      ativo.scrollIntoView({ block: "nearest", inline: "center", behavior: menosMovimento.matches ? "auto" : "smooth" });
    }
  }
  areas.addEventListener("click", function (e) {
    var b = e.target.closest("[data-area]");
    if (b) filtrar(b.dataset.area);
  });

  /* 4. O pacote: guardado no navegador, mostrado ao lado (computador), na barra de baixo (celular e tablet) e no
        formulário */
  var nomes = {};
  var precos = {};
  servicos.forEach(function (s) {
    nomes[s.dataset.id] = s.querySelector("h3").textContent;
    precos[s.dataset.id] = { valor: Number(s.dataset.preco) || 0, mensal: s.dataset.tipo === "mensal" };
  });
  // a estimativa "a partir de": o que é entrega única e o que é por mês, somados à parte
  function reais(v) { return "R$ " + v.toLocaleString("pt-BR"); }
  function estimativa(ids) {
    var unico = 0, mensal = 0;
    ids.forEach(function (id) { var p = precos[id]; if (!p) return; if (p.mensal) mensal += p.valor; else unico += p.valor; });
    var partes = [];
    if (unico) partes.push(reais(unico));
    if (mensal) partes.push(reais(mensal) + " por mês");
    return partes.length ? "a partir de " + partes.join(" + ") : "";
  }
  // os totais dos pacotes prontos saem dos cartões (o texto fixo do HTML vale só sem JavaScript)
  document.querySelectorAll("[data-pacote-preco]").forEach(function (p) {
    p.textContent = estimativa(p.dataset.pacotePreco.split(" "));
  });
  var escolhidos = [];
  try { escolhidos = (JSON.parse(ler("seguro-pacote")) || []).filter(function (id) { return nomes[id]; }); } catch (e) {}

  var lista = document.querySelector("[data-pacote-lista]");
  var vazio = document.querySelector("[data-pacote-vazio]");
  var limpar = document.querySelector("[data-pacote-limpar]");
  var barra = document.querySelector("[data-barra]");
  var barraTexto = document.querySelector("[data-barra-texto]");
  var noFormulario = document.querySelector("[data-formulario-pacote]");
  var total = document.querySelector("[data-pacote-total]");
  var totalFormulario = document.querySelector("[data-formulario-total]");

  function contagem(n) { return n === 1 ? "1 serviço" : n + " serviços"; }
  function mostrarPacote() {
    guardar("seguro-pacote", JSON.stringify(escolhidos));
    servicos.forEach(function (s) {
      var dentro = escolhidos.indexOf(s.dataset.id) >= 0;
      var b = s.querySelector("[data-adicionar]");
      b.setAttribute("aria-pressed", String(dentro));
      b.textContent = dentro ? "No pacote ✓" : "Adicionar";
      s.classList.toggle("escolhido", dentro);
    });
    lista.textContent = "";
    escolhidos.forEach(function (id) {
      var li = document.createElement("li");
      li.className = "bloco";
      var tirar = document.createElement("button");
      tirar.type = "button";
      tirar.className = "pacote-tirar";
      tirar.dataset.tirar = id;
      tirar.setAttribute("aria-label", "Tirar " + nomes[id] + " do pacote");
      tirar.textContent = "×";
      li.appendChild(document.createTextNode(nomes[id]));
      li.appendChild(tirar);
      lista.appendChild(li);
    });
    var n = escolhidos.length;
    vazio.hidden = n > 0;
    limpar.hidden = n === 0;
    barra.hidden = false;
    barra.classList.toggle("vazia", n === 0);   // vazia, só no celular (no tablet, o topo já tem o pedir)
    var est = estimativa(escolhidos);
    total.hidden = totalFormulario.hidden = !est;
    total.textContent = est ? "Estimativa: " + est : "";
    totalFormulario.textContent = est ? "Estimativa: " + est + ". O preço certo vem na proposta." : "";
    // na barra, o curto: "3 serviços: R$ 650 + R$ 150/mês"
    barraTexto.textContent = n ? contagem(n) + (est ? ": " + est.replace("a partir de ", "").replace(" por mês", "/mês") : " no pacote") : "Pacote vazio";
    noFormulario.textContent = n ? escolhidos.map(function (id) { return nomes[id]; }).join(", ")
      : "Nenhum serviço escolhido: tudo bem, conte na mensagem.";
    escreverMensagem();
  }
  function alternar(id) {
    var i = escolhidos.indexOf(id);
    if (i >= 0) escolhidos.splice(i, 1); else escolhidos.push(id);
    mostrarPacote();
  }
  document.querySelector("[data-servicos]").addEventListener("click", function (e) {
    var b = e.target.closest("[data-adicionar]");
    if (b) alternar(b.closest(".servico").dataset.id);
  });
  lista.addEventListener("click", function (e) {
    var b = e.target.closest("[data-tirar]");
    if (b) alternar(b.dataset.tirar);
  });
  limpar.addEventListener("click", function () { escolhidos = []; mostrarPacote(); });
  document.querySelectorAll("[data-escolher-pacote]").forEach(function (b) {
    b.addEventListener("click", function () {
      escolhidos = b.dataset.escolherPacote.split(" ");
      mostrarPacote();
      filtrar("todas");
      rolarAte("servicos");
    });
  });
  // a barra de baixo some na abertura (que já tem os botões) e quando o formulário já está à vista
  if ("IntersectionObserver" in window) {
    var aVista = new Map();
    var olhar = new IntersectionObserver(function (itens) {
      itens.forEach(function (i) { aVista.set(i.target, i.isIntersecting); });
      var algum = false;
      aVista.forEach(function (v) { algum = algum || v; });
      barra.classList.toggle("escondida", algum);
    }, { threshold: 0.15 });
    olhar.observe(document.getElementById("contato"));
    olhar.observe(document.querySelector(".abertura"));
  }

  /* 5. Formulário: validação na hora; “Enviar pelo formulário” manda daqui mesmo (chega no e-mail e no /admin da
        Família, desde 11/11/2026) e o WhatsApp abre com a mensagem pronta */
  var form = document.querySelector("[data-formulario]");
  function campo(k) { return document.getElementById(k); }
  var campos = { nome: campo("nome"), negocio: campo("negocio"), email: campo("email") };
  var avisos = { nome: "Escreva o seu nome.", negocio: "Conte o tipo de negócio e a cidade.", email: "Escreva um e-mail válido, como nome@exemplo.com." };
  var EMAIL = /^[^\s@<>"]+@[^\s@<>"]+\.[a-z]{2,}$/i;
  var whats = form.querySelector('[data-enviar="whatsapp"]');
  var enviar = form.querySelector('[data-enviar="formulario"]');
  var estado = form.querySelector("[data-formulario-status]");
  // o que foi digitado não se perde ao recarregar
  ["nome", "email", "telefone", "negocio", "mensagem"].forEach(function (k) {
    var v = ler("seguro-" + k);
    if (v) campo(k).value = v;
    campo(k).addEventListener("input", function () { guardar("seguro-" + k, campo(k).value); escreverMensagem(); });
  });
  function conferir(k, mostrar) {
    var v = campos[k].value.trim();
    var ok = k === "email" ? EMAIL.test(v) : v.length >= 2;
    if (mostrar || ok) {
      document.getElementById(k + "-erro").textContent = ok ? "" : avisos[k];
      campos[k].setAttribute("aria-invalid", String(!ok));
    }
    return ok;
  }
  Object.keys(campos).forEach(function (k) {
    campos[k].addEventListener("blur", function () { if (campos[k].value) conferir(k, true); });
    campos[k].addEventListener("input", function () { conferir(k, false); });
  });
  function texto() {
    var partes = ["Olá, Linu Seguro! Quero um orçamento."];
    if (campo("nome").value.trim()) partes.push("Nome: " + campo("nome").value.trim());
    if (campo("negocio").value.trim()) partes.push("Negócio: " + campo("negocio").value.trim());
    if (escolhidos.length) {
      partes.push("Pacote: " + escolhidos.map(function (id) { return nomes[id]; }).join(", "));
      partes.push("Estimativa pela página: " + estimativa(escolhidos));
    }
    if (campo("mensagem").value.trim()) partes.push(campo("mensagem").value.trim());
    return partes.join("\n");
  }
  function escreverMensagem() {
    whats.href = "https://wa.me/5524981013398?text=" + encodeURIComponent(texto());
  }
  // o pedido também fica registrado (linuarquivos/servidor/linu-pedidos): sendBeacon não atrasa a abertura do WhatsApp
  // nem do e-mail e segue mesmo se a página fechar; se falhar, a conversa continua igual
  function dadosDo(canal) {
    var robo = form.querySelector('[name="site_extra"]');
    return {
      nome: campo("nome").value.trim(), negocio: campo("negocio").value.trim(), email: campo("email").value.trim(), telefone: campo("telefone").value.trim(),
      pacote: escolhidos.map(function (id) { return nomes[id]; }).join(", "),
      estimativa: escolhidos.length ? estimativa(escolhidos) : "",
      mensagem: campo("mensagem").value.trim(), canal: canal, site_extra: robo ? robo.value : ""
    };
  }
  function registrar(canal) {
    try {
      var robo = form.querySelector('[name="site_extra"]');
      var dados = {
        nome: campo("nome").value.trim(), negocio: campo("negocio").value.trim(),
        pacote: escolhidos.map(function (id) { return nomes[id]; }).join(", "),
        estimativa: escolhidos.length ? estimativa(escolhidos) : "",
        mensagem: campo("mensagem").value.trim(), canal: canal, site_extra: robo ? robo.value : ""
      };
      if (navigator.sendBeacon) navigator.sendBeacon("/api/pedido", new Blob([JSON.stringify(dados)], { type: "application/json" }));
    } catch (e) {}
  }
  whats.addEventListener("click", function (e) {
    var ok = conferir("nome", true) & conferir("negocio", true);
    if (!ok) {
      e.preventDefault();
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }
    registrar("whatsapp");
    whats.classList.add("enviado");
    setTimeout(function () { whats.classList.remove("enviado"); }, 1600);
  });
  // o formulário: o e-mail passa a ser obrigatório; enquanto envia, o botão diz “Enviando…”; deu certo, a confirmação
  // fica escrita embaixo; falhou, o que foi digitado continua e o WhatsApp segue como saída
  enviar.addEventListener("click", function () {
    var ok = conferir("nome", true) & conferir("email", true) & conferir("negocio", true);
    if (!ok) { form.querySelector('[aria-invalid="true"]').focus(); return; }
    enviar.disabled = true;
    enviar.textContent = "Enviando…";
    estado.className = "formulario-status";
    estado.textContent = "";
    fetch("/api/pedido", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(dadosDo("formulario")) })
      .then(function (r) {
        if (!r.ok) throw new Error(String(r.status));
        enviar.textContent = "Enviado";
        estado.className = "formulario-status ok";
        estado.textContent = "Recebido! A resposta chega no seu e-mail (" + campo("email").value.trim() + ") em até 1 dia útil.";
        setTimeout(function () { enviar.disabled = false; enviar.textContent = "Enviar pelo formulário"; }, 4000);
      })
      .catch(function () {
        enviar.disabled = false;
        enviar.textContent = "Enviar pelo formulário";
        estado.className = "formulario-status erro";
        estado.textContent = "Não deu para enviar agora. Tente de novo em instantes ou mande pelo WhatsApp.";
      });
  });

  /* 6. Voltar ao topo, sem deixar o # no endereço */
  document.querySelector("[data-voltar]").addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: menosMovimento.matches ? "auto" : "smooth" });
  });

  /* 7. Entradas ao rolar: js/movimento.js (o kit do linuarquivos), pelos atributos data-mov do index.html */

  /* 8. Raio-X: cada pergunta tem o seu bloco na cúpula (data-rx-bloco). Cada "sim" assenta o bloco ("não tenho site"
        também: não há site para proteger); cada "não" deixa o lugar marcado e aponta um serviço, com o motivo. As duas perguntas de contas levam ao mesmo serviço, que aparece uma
        vez só, com os dois motivos. Com tudo em dia, o Vigia. O resultado vai para o pacote. */
  var RAIOX = {
    whats: ["contas", "Sem a confirmação em duas etapas, quem descobre o código do SMS clona o WhatsApp e pede Pix aos seus clientes."],
    contas: ["contas", "E-mail, Instagram e banco só com senha caem num vazamento; a segunda etapa e a recuperação seguram a conta."],
    senhas: ["senhas", "Senha repetida ou compartilhada: um vazamento abre todas as portas, e não dá para tirar o acesso de quem sai."],
    copias: ["copias", "Celular roubado ou computador queimado leva junto o que só existia nele. A cópia automática guarda em outro lugar."],
    golpe: ["treino", "A maioria dos golpes passa por uma pessoa da equipe. Uma hora de treino com casos reais muda o reflexo."],
    email: ["email", "Sem SPF, DKIM e DMARC, qualquer um manda e-mail com o nome do negócio, e os seus podem cair no spam."],
    site: ["site", "Site sem cadeado ou sem atualização é a porta mais procurada pelos robôs que invadem sites."],
    privacidade: ["privacidade", "A LGPD pede que quem coleta nome, telefone ou e-mail diga o que faz com eles. Um aviso claro resolve."]
  };
  var perguntas = document.querySelectorAll("[data-pergunta]");
  var rxLista = document.querySelector("[data-raiox-lista]");
  var rxVazio = document.querySelector("[data-raiox-vazio]");
  var rxBlocos = document.querySelector("[data-raiox-blocos]");
  var rxRespondidas = document.querySelector("[data-raiox-respondidas]");
  var rxDomos = document.querySelectorAll(".raiox-domo");
  var rxMini = document.querySelector("[data-raiox-mini]");
  var rxSite = document.querySelector("[data-raiox-site]");
  var rxUsar = document.querySelector("[data-raiox-usar]");
  var rxTotal = document.querySelector("[data-raiox-total]");
  var rxIds = [];
  var respostas = {};
  try { respostas = JSON.parse(ler("seguro-raiox")) || {}; } catch (e) {}
  function recomendar(id, motivos) {
    var li = document.createElement("li");
    var b = document.createElement("b");
    b.textContent = nomes[id];
    li.appendChild(b);
    li.appendChild(document.createTextNode(motivos.join(" ")));
    rxLista.appendChild(li);
  }
  // o bloco da pergunta nas duas cúpulas (a grande e a pequena presa no alto); "assentar" anima a descida do bloco
  function marcarBloco(k, estado, assentar) {
    document.querySelectorAll('[data-rx-bloco="' + k + '"]').forEach(function (g) {
      var antes = g.classList.contains("posto");
      g.classList.toggle("posto", estado === "posto");
      g.classList.toggle("falta", estado === "falta");
      if (assentar && estado === "posto" && !antes && !menosMovimento.matches) {
        g.classList.remove("assentou");
        void g.getBoundingClientRect();
        g.classList.add("assentou");
      }
    });
  }
  function lerRaiox(e) {
    var n = 0, blocos = 0;
    var motivos = {};
    rxIds = [];
    rxLista.textContent = "";
    perguntas.forEach(function (f) {
      var k = f.dataset.pergunta;
      var marcada = f.querySelector("input:checked");
      f.classList.toggle("posta", !!marcada && marcada.value !== "nao");
      if (!marcada) { marcarBloco(k, ""); return; }
      n++;
      respostas[k] = marcada.value;
      marcarBloco(k, marcada.value === "nao" ? "falta" : "posto", !!e && f.contains(e.target));
      if (marcada.value !== "nao") { blocos++; return; }
      var id = RAIOX[k][0];
      if (!motivos[id]) { motivos[id] = []; rxIds.push(id); }
      motivos[id].push(RAIOX[k][1]);
    });
    guardar("seguro-raiox", JSON.stringify(respostas));
    rxIds.forEach(function (id) { recomendar(id, motivos[id]); });
    if (n === perguntas.length && rxIds.length === 0) {
      rxIds = ["vigia"];
      recomendar("vigia", ["O iglu está de pé. Para continuar assim, alguém confere tudo todo mês e avisa se uma senha vazar."]);
    }
    rxDomos.forEach(function (d) { d.classList.toggle("completo", blocos === perguntas.length); });
    rxBlocos.textContent = rxMini.textContent = blocos === 1 ? "1 de 8 blocos" : blocos + " de 8 blocos";
    rxRespondidas.textContent = n === perguntas.length ? "(todas respondidas)" : "(" + n + " de " + perguntas.length + " respondidas)";
    rxVazio.hidden = rxIds.length > 0;
    rxTotal.hidden = rxIds.length === 0;
    rxTotal.textContent = rxIds.length ? "Estimativa do recomendado: " + estimativa(rxIds) : "";
    rxSite.hidden = respostas.site !== "sem";
    rxUsar.hidden = rxIds.length === 0;
  }
  perguntas.forEach(function (f) {
    var k = f.dataset.pergunta;
    if (respostas[k]) {
      var r = f.querySelector('input[value="' + respostas[k] + '"]');
      if (r) r.checked = true;
    }
    f.addEventListener("change", lerRaiox);
    // o dedo (ou o foco) numa pergunta acende o lugar dela na cúpula grande
    var lugar = document.querySelector('.raiox-ceu [data-rx-bloco="' + k + '"]');
    function acender() { lugar.classList.add("em-foco"); }
    function apagar() { lugar.classList.remove("em-foco"); }
    f.addEventListener("pointerenter", acender);
    f.addEventListener("pointerleave", apagar);
    f.addEventListener("focusin", acender);
    f.addEventListener("focusout", apagar);
  });
  rxUsar.addEventListener("click", function () {
    rxIds.forEach(function (id) { if (escolhidos.indexOf(id) < 0) escolhidos.push(id); });
    mostrarPacote();
    filtrar("todas");
    rxUsar.textContent = "No pacote ✓";
    setTimeout(function () { rxUsar.textContent = "Levar para o meu pacote"; }, 1600);
    rolarAte("servicos");
  });
  lerRaiox();

  // No celular (11/11/2026): os blocos em cartões de lado, um por vez. Responder leva ao próximo sem resposta; as setas
  // e o deslizar também andam. No tablet e no computador fica a grade de antes.
  var rxFaixa = document.querySelector(".perguntas-faixa");
  var rxNav = document.querySelector("[data-perguntas-nav]");
  var rxPos = document.querySelector("[data-perguntas-pos]");
  var rxSetas = document.querySelectorAll("[data-perguntas-ir]");
  var rxCelular = window.matchMedia("(max-width: 699px)");
  function rxInicio(i) { return perguntas[i].offsetLeft - perguntas[0].offsetLeft; }
  function rxAtual() {
    var melhor = 0;
    for (var i = 1; i < perguntas.length; i++) if (Math.abs(rxInicio(i) - rxFaixa.scrollLeft) < Math.abs(rxInicio(melhor) - rxFaixa.scrollLeft)) melhor = i;
    return melhor;
  }
  function rxIr(i) {
    i = Math.max(0, Math.min(perguntas.length - 1, i));
    rxFaixa.scrollTo({ left: rxInicio(i), behavior: menosMovimento.matches ? "auto" : "smooth" });
  }
  function rxMarcar() {
    var i = rxAtual();
    rxPos.textContent = "Pergunta " + (i + 1) + " de " + perguntas.length;
    rxSetas[0].disabled = i === 0;
    rxSetas[1].disabled = i === perguntas.length - 1;
  }
  function rxModo() {
    rxFaixa.classList.toggle("em-cartoes", rxCelular.matches);
    rxNav.hidden = !rxCelular.matches;
    if (rxCelular.matches) rxMarcar();
  }
  rxSetas.forEach(function (b) { b.addEventListener("click", function () { rxIr(rxAtual() + Number(b.dataset.perguntasIr)); }); });
  rxFaixa.addEventListener("scroll", function () { if (rxCelular.matches) rxMarcar(); }, { passive: true });
  perguntas.forEach(function (f, i) {
    f.addEventListener("change", function () {
      if (!rxCelular.matches) return;
      var ordem = Array.prototype.slice.call(perguntas, i + 1).concat(Array.prototype.slice.call(perguntas, 0, i));
      var prox = ordem.filter(function (p) { return !p.querySelector("input:checked"); })[0];
      // espera o bloco assentar no iglu antes de passar
      if (prox) setTimeout(function () { rxIr(Array.prototype.indexOf.call(perguntas, prox)); }, 450);
    });
  });
  if (rxCelular.addEventListener) rxCelular.addEventListener("change", rxModo);
  rxModo();

  mostrarPacote();
})();
