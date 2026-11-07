"""O iglu à noite (07/11/2026): faz img/iglu-noite.png e img/iglu-luz.png a partir do img/iglu.png.

    python3 ferramentas/iglu-noite.py

- iglu-noite.png: o mesmo desenho com a luz da noite (azul mais escuro), pixel por pixel, sem filtro no navegador.
- iglu-luz.png: o túnel da porta aceso por dentro. Cada pixel de dentro (a parede do fundo, a parede do lado, o chão e
  as juntas) troca o azul por um âmbar do mesmo claro-escuro, em 5 tons: a estrutura continua lá, como uma luz de
  lampião lá dentro, e não um fogo. Em volta da porta, a borda do arco pega um pouco de luz; na neve da frente, a luz
  sai pelo chão. Em cima do iglu-noite, no modo escuro (css/estilo.css)."""
from collections import deque
from pathlib import Path
from PIL import Image

RAIZ = Path(__file__).resolve().parents[1]
CAIXA = (150, 98, 196, 166)          # onde fica a porta, na grade de 204 × 171
SEMENTES = [(175, 118), (168, 150)]  # a parede do fundo e o chão do túnel
AMBAR = [(0x6B, 0x2C, 0x0E), (0xA8, 0x4B, 0x14), (0xDE, 0x7C, 0x1F), (0xF8, 0xB0, 0x48), (0xFF, 0xDB, 0x8A)]
MORNA = (0xFF, 0xB5, 0x47)


def lum(c):
    return (c[0] * 299 + c[1] * 587 + c[2] * 114) / 1000


def noite(c):
    # o claro-escuro de cada pixel num azul-ardósia de noite, com um pouco da cor original
    r, g, b = c[:3]; L = lum(c)
    base = (L * .17 + 8, L * .25 + 16, L * .36 + 32)
    return tuple(round(v * .8 + o * .2 * .35) for v, o in zip(base, (r, g, b))) + (c[3],)


def main():
    iglu = Image.open(RAIZ / 'img' / 'iglu.png').convert('RGBA')
    w, h = iglu.size
    px = iglu.load()
    # dentro do túnel: o que é mais escuro que o gelo do arco, ligado às sementes, dentro da caixa da porta
    dentro = set()
    fila = deque(SEMENTES)
    while fila:
        x, y = fila.popleft()
        if (x, y) in dentro or not (CAIXA[0] <= x < CAIXA[2] and CAIXA[1] <= y < CAIXA[3]):
            continue
        if px[x, y][3] == 0 or lum(px[x, y]) >= 150:
            continue
        dentro.add((x, y))
        fila.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])

    # as juntas do arco são linhas finas ligadas ao túnel: poda as pontas (pixel com só um vizinho) até não sobrar
    while True:
        pontas = {p for p in dentro if sum((p[0] + a, p[1] + b) in dentro for a, b in ((1, 0), (-1, 0), (0, 1), (0, -1))) <= 1}
        if not pontas:
            break
        dentro -= pontas

    escura = Image.new('RGBA', (w, h)); pe = escura.load()
    for y in range(h):
        for x in range(w):
            if px[x, y][3]:
                pe[x, y] = noite(px[x, y])
    escura.save(RAIZ / 'img' / 'iglu-noite.png', optimize=True)

    luz = Image.new('RGBA', (w, h), (0, 0, 0, 0)); pl = luz.load()
    ls = [lum(px[p]) for p in dentro]
    lo, hi = min(ls), max(ls)
    for (x, y) in dentro:
        t = (lum(px[x, y]) - lo) / max(1, hi - lo)
        # o fundo do túnel (mais alto e à direita) recebe mais luz que a boca
        if y < 138:   # as paredes: o fundo recebe mais luz que a boca
            t = min(1, t * .8 + .25)
        else:         # o chão: dois tons, mais claro perto do fundo
            t = .5 if y < 147 else .3
        pl[x, y] = AMBAR[min(4, int(t * 5))] + (255,)
    # a borda do arco: o gelo a até 2 pixels do túnel pega um pouco de luz
    for y in range(CAIXA[1] - 3, min(h, CAIXA[3] + 3)):
        for x in range(CAIXA[0] - 3, min(w, CAIXA[2] + 3)):
            if (x, y) in dentro or px[x, y][3] == 0 or lum(px[x, y]) < 150:   # junta escura não brilha
                continue
            d = min((abs(x - a) + abs(y - b) for a, b in dentro if abs(x - a) <= 2 and abs(y - b) <= 2), default=9)
            if d == 1:
                pl[x, y] = MORNA + (80,)
    # a luz no chão da frente: da boca do túnel para fora, cada vez mais fraca, em degraus
    boca = sorted(p for p in dentro if p[1] >= max(b for _, b in dentro) - 1)
    if boca:
        cx = sum(a for a, _ in boca) / len(boca); by = max(b for _, b in boca)
        meia = (max(a for a, _ in boca) - min(a for a, _ in boca)) / 2 + 2
        for k, alfa in enumerate((96, 72, 48, 28, 14)):
            y = by + 1 + k
            if y >= h:
                break
            for x in range(round(cx - meia - k * 2), round(cx + meia + k * 2) + 1):
                if 0 <= x < w and px[x, y][3] and (x, y) not in dentro:
                    pl[x, y] = MORNA + (alfa,)
    luz.save(RAIZ / 'img' / 'iglu-luz.png', optimize=True)
    print(f'túnel: {len(dentro)} pixels; img/iglu-noite.png e img/iglu-luz.png prontos')


if __name__ == '__main__':
    main()
