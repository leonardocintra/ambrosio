#!/bin/bash
# filepath: /home/leonardo/Github/ambrosio/scripts/start.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Lista de scripts de seed que serão executados em sequência.
SEED_SCRIPTS=(
  "seed-pessoas.sh"
)

for seed_script in "${SEED_SCRIPTS[@]}"; do
  echo "=========================================="
  echo "Executando ${seed_script}"
  echo "=========================================="
  bash "${SCRIPT_DIR}/${seed_script}"
  echo
done

echo "=========================================="
echo "Todos os seeds finalizados"
echo "=========================================="
echo "✅ Processo finalizado!"
echo "=========================================="
