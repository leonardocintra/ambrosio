#!/bin/bash
# filepath: /home/leonardo/Github/ambrosio/scripts/seed-pessoas.sh

# Configurações
API_URL="http://localhost:3005"
EMAIL="admin@admin.com"
PASSWORD="admin"
QUANTIDADE_PESSOAS=10

echo "=========================================="
echo "Iniciando cadastro de pessoas de teste"
echo "=========================================="

# Gera um CPF aleatório e válido (11 dígitos, com dígitos verificadores)
gen_cpf() {
  while true; do
    # gera os 9 primeiros dígitos aleatórios
    digits=()
    for i in $(seq 1 9); do
      digits+=($((RANDOM % 10)))
    done

    # evita CPFs com todos os dígitos iguais (ex: 11111111111, 00000000000)
    allsame=1
    for d in "${digits[@]}"; do
      if [ "$d" -ne "${digits[0]}" ]; then
        allsame=0
        break
      fi
    done
    [ $allsame -eq 1 ] && continue

    # calcula 1º dígito verificador
    sum=0
    weight=10
    for d in "${digits[@]}"; do
      sum=$((sum + d * weight))
      weight=$((weight - 1))
    done
    r=$((sum % 11))
    if [ $r -lt 2 ]; then
      v1=0
    else
      v1=$((11 - r))
    fi
    digits+=($v1)

    # calcula 2º dígito verificador
    sum=0
    weight=11
    for d in "${digits[@]}"; do
      sum=$((sum + d * weight))
      weight=$((weight - 1))
    done
    r=$((sum % 11))
    if [ $r -lt 2 ]; then
      v2=0
    else
      v2=$((11 - r))
    fi
    digits+=($v2)

    # monta o CPF como string (11 dígitos)
    cpf=""
    for d in "${digits[@]}"; do
      cpf="${cpf}${d}"
    done

    # segurança: garantir 11 caracteres (normalmente já será)
    if [ ${#cpf} -eq 11 ]; then
      echo "$cpf"
      return 0
    fi
    # se algo deu errado, repete
  done
}

# 1. Fazer login e obter token
echo "1. Autenticando..."
LOGIN_RESPONSE=$(wget --no-check-certificate --quiet \
  --method POST \
  --timeout=0 \
  --header 'Content-Type: application/json' \
  --body-data "{
    \"email\": \"${EMAIL}\",
    \"password\": \"${PASSWORD}\"
  }" \
  --output-document=- \
  "${API_URL}/auth/login")

# Extrair token da resposta
TOKEN=$(echo $LOGIN_RESPONSE | grep -oP '(?<="access_token":")[^"]*')

if [ -z "$TOKEN" ]; then
  echo "❌ Erro ao obter token de autenticação"
  echo "Response: $LOGIN_RESPONSE"
  exit 1
fi

echo "✅ Token obtido com sucesso"
echo "=========================================="

# 2. Cadastrar pessoas
echo "2. Cadastrando ${QUANTIDADE_PESSOAS} pessoas..."

NOMES=("Ana" "Amanda" "Aline" "Bruno" "Carlos" "Daniela" "Eduardo" "Fernanda" "Gabriel" "Helena" "Igor" "Leonardo" "Fabiano" "Orley" "Vitoria" "Cloves" "Jéssica" "Tomas" "Guilherme" "Joana" "Lucas" "Mariana" "Nicolas" "Patrícia" "Rafael" "Sabrina" "Tiago" "Vanessa" "William" "Yasmin")
SOBRENOMES=("Lutfala" "Peres" "Lamborin" "Ramon" "Pedrito" "Augusto" "Liberato" "Fausto" "Almeida" "Barros" "Cardoso" "Duarte" "Esteves" "Ferreira" "Gomes" "Hernandes" "Ibrahim" "Jesus" "Klein" "Lima" "Martins" "Nogueira" "Oliveira" "Pereira" "Queiroz" "Ramos" "Silva" "Teixeira" "Uchoa" "Vieira" "Zanetti" "Cintra" "Faleiros")
APELIDOS=("Bia" "Léo" "Nina" "Dani" "Dudu" "Gabi" "Zé" "Mari" "Rafa" "Tico" "Nando" "Bel" "Tata" "Gui" "Isa" "Luca" "Duda" "Teca" "Nico" "Vivi")
ESTADOS_CIVIS=("SOLTEIRO" "CASADO" "DIVORCIADO" "VIUVO")
ESCOLARIDADES=("nao_informado" "analfabeto" "fundamental" "fundamental_incompleto" "medio" "medio_incompleto" "superior" "superior_incompleto" "pos_graduacao" "mestrado" "doutorado" "pos_doutorado")


for i in $(seq 1 $QUANTIDADE_PESSOAS); do

  NOME_BASE=${NOMES[$RANDOM % ${#NOMES[@]}]}
  SOBRENOME=${SOBRENOMES[$RANDOM % ${#SOBRENOMES[@]}]}

  # Gerar dados aleatórios
  SEXO=$([ $((RANDOM % 2)) -eq 0 ] && echo "MASCULINO" || echo "FEMININO")
  NOME="${NOME_BASE} ${SOBRENOME}"
  CONHECIDO_POR=${APELIDOS[$RANDOM % ${#APELIDOS[@]}]}

  CPF="$(gen_cpf)"
  
  # Gera uma data de nascimento no formato YYYY-MM-DD
  # ano entre 1950 e 2009 (1950 + 0..59)
  YEAR=$((1950 + RANDOM % 60))
  MONTH=$((1 + RANDOM % 12))
  DAY=$((1 + RANDOM % 28))
  DATA_NASC=$(printf "%04d-%02d-%02d" "$YEAR" "$MONTH" "$DAY")

  ESTADO_CIVIL=${ESTADOS_CIVIS[$RANDOM % ${#ESTADOS_CIVIS[@]}]}
  ESCOLARIDADE=${ESCOLARIDADES[$RANDOM % ${#ESCOLARIDADES[@]}]}
  SITUACAO_RELIGIOSA_ID=$((1 + RANDOM % 3))

  PAYLOAD=$(cat <<EOF
{
  "nome": "${NOME}",
  "conhecidoPor": "${CONHECIDO_POR}",
  "nacionalidade": "brasileira",
  "cpf": "${CPF}",
  "sexo": "${SEXO}",
  "dataNascimento": "${DATA_NASC}",
  "estadoCivil": "${ESTADO_CIVIL}",
  "situacaoReligiosa": {
    "id": ${SITUACAO_RELIGIOSA_ID},
    "descricao": "Situacao ${SITUACAO_RELIGIOSA_ID}"
  },
  "escolaridade": "${ESCOLARIDADE}"
}
EOF
)

  RESPONSE=$(wget --no-check-certificate --quiet \
    --method POST \
    --timeout=0 \
    --header "Authorization: Bearer ${TOKEN}" \
    --header 'Content-Type: application/json' \
    --body-data "${PAYLOAD}" \
    --output-document=- \
    "${API_URL}/pessoa")

  if echo "$RESPONSE" | grep -q '"id"'; then
    echo "✅ Pessoa ${i}/${QUANTIDADE_PESSOAS} cadastrada: ${NOME} (CPF: ${CPF})"
  else
    echo "❌ Erro ao cadastrar pessoa ${i}"
    echo "Response: $RESPONSE"
  fi
done

echo "=========================================="
echo "✅ Processo finalizado!"
echo "=========================================="
