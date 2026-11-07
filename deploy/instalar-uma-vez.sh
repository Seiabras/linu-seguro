#!/usr/bin/env bash
# Prepara a VM para receber o Linu Seguro pelo GitHub Actions. Rodar uma vez, como administrador:
#   sudo bash instalar-uma-vez.sh "<chave pública do GitHub Actions>"
# Cria o usuário linuseguro (sem sudo), dono de /opt/linu-seguro, e prende a chave ao receber.sh.
# Pode rodar de novo sem estragar nada.
set -euo pipefail
CHAVE="${1:?passe a chave pública}"
BASE=/opt/linu-seguro
AQUI="$(cd "$(dirname "$0")" && pwd)"

id linuseguro >/dev/null 2>&1 || useradd --system --create-home --shell /bin/bash linuseguro
mkdir -p "$BASE/app"
install -m 755 -o root -g root "$AQUI/receber.sh" "$BASE/receber.sh"
chown linuseguro: "$BASE" && chown -R linuseguro: "$BASE/app"
chmod 755 "$BASE"

install -d -m 700 -o linuseguro -g linuseguro /home/linuseguro/.ssh
echo "restrict,command=\"$BASE/receber.sh\" $CHAVE" > /home/linuseguro/.ssh/authorized_keys
chown linuseguro: /home/linuseguro/.ssh/authorized_keys && chmod 600 /home/linuseguro/.ssh/authorized_keys
echo "Pronto: linuseguro recebe versões novas em $BASE/app."
