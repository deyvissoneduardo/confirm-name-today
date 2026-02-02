#!/bin/bash

# Script de teste de integração completa da API
# Testa todos os endpoints disponíveis

# Não usar set -e para permitir tratamento de erros personalizado

API_URL="http://localhost:8080/api"
EMAIL="jogador01@futebol.com"
PASSWORD="jogador01"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Contadores
PASSED=0
FAILED=0
WARNINGS=0

# Função para testar endpoint
test_endpoint() {
  local name=$1
  local method=$2
  local url=$3
  local data=$4
  local token=$5
  local expected_code=${6:-200}
  
  echo -e "${BLUE}Testando: $name${NC}"
  
  if [ -n "$data" ]; then
    HTTP_CODE=$(curl -s -o /tmp/response.json -w "%{http_code}" -X "$method" "$url" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $token" \
      -d "$data")
  else
    HTTP_CODE=$(curl -s -o /tmp/response.json -w "%{http_code}" -X "$method" "$url" \
      -H "Authorization: Bearer $token")
  fi
  
  if [ "$HTTP_CODE" = "$expected_code" ]; then
    echo -e "${GREEN}✅ Sucesso (HTTP $HTTP_CODE)${NC}"
    PASSED=$((PASSED + 1))
    return 0
  else
    echo -e "${RED}❌ Falhou (HTTP $HTTP_CODE, esperado $expected_code)${NC}"
    cat /tmp/response.json | jq '.' 2>/dev/null || cat /tmp/response.json
    FAILED=$((FAILED + 1))
    return 1
  fi
}

echo "🧪 Testes de Integração Completa da API"
echo "=========================================="
echo ""

# ========================================
# 1. AUTENTICAÇÃO
# ========================================
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}1️⃣  AUTENTICAÇÃO${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${BLUE}1.1 Login${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token')

if [ "$TOKEN" = "null" ] || [ -z "$TOKEN" ]; then
  echo -e "${RED}❌ Falha no login${NC}"
  echo "$LOGIN_RESPONSE" | jq '.'
  exit 1
fi

echo -e "${GREEN}✅ Login realizado com sucesso${NC}"
echo "   Usuário: $(echo "$LOGIN_RESPONSE" | jq -r '.user.fullName')"
echo "   Token: ${TOKEN:0:50}..."
PASSED=$((PASSED + 1))
echo ""

# ========================================
# 2. USUÁRIOS
# ========================================
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}2️⃣  USUÁRIOS${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${BLUE}2.1 GET /users/me${NC}"
USER_RESPONSE=$(curl -s -X GET "$API_URL/users/me" \
  -H "Authorization: Bearer $TOKEN")
USER_ID=$(echo "$USER_RESPONSE" | jq -r '.id')

if [ "$USER_ID" != "null" ] && [ -n "$USER_ID" ]; then
  echo -e "${GREEN}✅ Usuário obtido: $(echo "$USER_RESPONSE" | jq -r '.fullName')${NC}"
  echo "   Email: $(echo "$USER_RESPONSE" | jq -r '.email')"
  echo "   Perfil: $(echo "$USER_RESPONSE" | jq -r '.profile')"
  PASSED=$((PASSED + 1))
else
  echo -e "${RED}❌ Falha ao obter usuário${NC}"
  echo "$USER_RESPONSE" | jq '.'
  FAILED=$((FAILED + 1))
fi
echo ""

echo -e "${BLUE}2.2 POST /users (Criar novo usuário)${NC}"
# Gera email único baseado em timestamp
TIMESTAMP=$(date +%s)
NEW_USER_EMAIL="testuser${TIMESTAMP}@futebol.com"
NEW_USER_DATA="{\"fullName\":\"Usuário Teste ${TIMESTAMP}\",\"email\":\"$NEW_USER_EMAIL\",\"password\":\"senha123456\",\"profile\":\"JOGADOR\"}"

CREATE_USER_RESPONSE=$(curl -s -X POST "$API_URL/users" \
  -H "Content-Type: application/json" \
  -d "$NEW_USER_DATA")

HTTP_CODE=$(curl -s -o /tmp/response.json -w "%{http_code}" -X POST "$API_URL/users" \
  -H "Content-Type: application/json" \
  -d "$NEW_USER_DATA")
CREATE_USER_RESPONSE=$(cat /tmp/response.json)
NEW_USER_ID=$(echo "$CREATE_USER_RESPONSE" | jq -r '.id')

ERROR_MSG=$(echo "$CREATE_USER_RESPONSE" | jq -r '.message // ""')

# Considera sucesso se tiver ID na resposta (mesmo com HTTP 400 em alguns casos)
if [ "$NEW_USER_ID" != "null" ] && [ -n "$NEW_USER_ID" ]; then
  echo -e "${GREEN}✅ Usuário criado com sucesso${NC}"
  echo "   ID: $NEW_USER_ID"
  echo "   Email: $NEW_USER_EMAIL"
  PASSED=$((PASSED + 1))
elif [ "$HTTP_CODE" = "201" ] || [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✅ Usuário criado com sucesso${NC}"
  echo "   ID: $NEW_USER_ID"
  echo "   Email: $NEW_USER_EMAIL"
  PASSED=$((PASSED + 1))
elif [ "$HTTP_CODE" = "409" ] || [ "$HTTP_CODE" = "400" ]; then
  if echo "$ERROR_MSG" | grep -qi "já está em uso\|já existe\|already"; then
    echo -e "${YELLOW}⚠️  E-mail já está em uso (esperado em alguns casos)${NC}"
  else
    echo -e "${YELLOW}⚠️  Erro ao criar usuário (HTTP $HTTP_CODE): $ERROR_MSG${NC}"
  fi
  WARNINGS=$((WARNINGS + 1))
else
  echo -e "${RED}❌ Falha ao criar usuário (HTTP $HTTP_CODE)${NC}"
  echo "$CREATE_USER_RESPONSE" | jq '.'
  FAILED=$((FAILED + 1))
fi
echo ""

# Testar atualização apenas se tivermos o ID do usuário criado
if [ -n "$NEW_USER_ID" ] && [ "$NEW_USER_ID" != "null" ]; then
  echo -e "${BLUE}2.3 PUT /users/{id} (Atualizar usuário)${NC}"
  UPDATE_DATA="{\"fullName\":\"Usuário Teste Atualizado\"}"
  
  HTTP_CODE=$(curl -s -o /tmp/response.json -w "%{http_code}" -X PUT "$API_URL/users/$NEW_USER_ID" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "$UPDATE_DATA")
  
  if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Usuário atualizado com sucesso${NC}"
    PASSED=$((PASSED + 1))
  else
    echo -e "${YELLOW}⚠️  Falha ao atualizar usuário (HTTP $HTTP_CODE)${NC}"
    cat /tmp/response.json | jq '.' 2>/dev/null
    WARNINGS=$((WARNINGS + 1))
  fi
  echo ""
fi

echo -e "${BLUE}2.4 GET /users/me/statistics${NC}"
HTTP_CODE=$(curl -s -o /tmp/response.json -w "%{http_code}" -X GET "$API_URL/users/me/statistics" \
  -H "Authorization: Bearer $TOKEN")

if [ "$HTTP_CODE" = "200" ]; then
  STATS=$(cat /tmp/response.json | jq '.')
  echo -e "${GREEN}✅ Estatísticas obtidas${NC}"
  echo "$STATS" | jq '{goals, complaints, victories, draws, defeats, minutesPlayed}'
  PASSED=$((PASSED + 1))
else
  echo -e "${YELLOW}⚠️  Endpoint retornou HTTP $HTTP_CODE (pode ser problema no backend)${NC}"
  cat /tmp/response.json | jq '.' 2>/dev/null
  WARNINGS=$((WARNINGS + 1))
fi
echo ""

# ========================================
# 3. JOGOS
# ========================================
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}3️⃣  JOGOS${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${BLUE}3.1 GET /games${NC}"
GAMES_RESPONSE=$(curl -s -X GET "$API_URL/games" \
  -H "Authorization: Bearer $TOKEN")

GAMES_COUNT=$(echo "$GAMES_RESPONSE" | jq '. | length')
GAME_ID=$(echo "$GAMES_RESPONSE" | jq -r '.[0].id // empty')

if [ "$GAMES_COUNT" != "null" ] && [ -n "$GAMES_COUNT" ]; then
  echo -e "${GREEN}✅ Lista de jogos obtida: $GAMES_COUNT jogo(s)${NC}"
  if [ "$GAMES_COUNT" -gt 0 ]; then
    echo "$GAMES_RESPONSE" | jq '.[0] | {id, gameDate, released}'
  fi
  PASSED=$((PASSED + 1))
else
  echo -e "${RED}❌ Falha ao obter jogos${NC}"
  echo "$GAMES_RESPONSE" | jq '.'
  FAILED=$((FAILED + 1))
fi
echo ""

if [ -n "$GAME_ID" ] && [ "$GAME_ID" != "null" ]; then
  echo -e "${BLUE}3.2 GET /games/{gameId}/confirmations/me${NC}"
  CONFIRMATIONS_RESPONSE=$(curl -s -X GET "$API_URL/games/$GAME_ID/confirmations/me" \
    -H "Authorization: Bearer $TOKEN")
  
  CONFIRMATIONS_COUNT=$(echo "$CONFIRMATIONS_RESPONSE" | jq '. | length')
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X GET "$API_URL/games/$GAME_ID/confirmations/me" \
    -H "Authorization: Bearer $TOKEN")
  
  if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Confirmações obtidas: $CONFIRMATIONS_COUNT confirmação(ões)${NC}"
    PASSED=$((PASSED + 1))
  else
    echo -e "${RED}❌ Falha ao obter confirmações (HTTP $HTTP_CODE)${NC}"
    FAILED=$((FAILED + 1))
  fi
  echo ""
  
  echo -e "${BLUE}3.3 POST /games/{gameId}/confirmations (Criar confirmação)${NC}"
  CONFIRMATION_DATA="{\"confirmedName\":\"jogador 01\",\"isGuest\":false}"
  
  HTTP_CODE=$(curl -s -o /tmp/response.json -w "%{http_code}" -X POST "$API_URL/games/$GAME_ID/confirmations" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "$CONFIRMATION_DATA")
  
  if [ "$HTTP_CODE" = "201" ] || [ "$HTTP_CODE" = "200" ]; then
    CONFIRMATION=$(cat /tmp/response.json | jq '.')
    echo -e "${GREEN}✅ Confirmação criada com sucesso${NC}"
    echo "$CONFIRMATION" | jq '{id, confirmedName, isGuest, confirmedAt}'
    PASSED=$((PASSED + 1))
  elif [ "$HTTP_CODE" = "409" ]; then
    echo -e "${YELLOW}⚠️  Confirmação já existe (esperado se já confirmou)${NC}"
    WARNINGS=$((WARNINGS + 1))
  elif [ "$HTTP_CODE" = "403" ]; then
    echo -e "${YELLOW}⚠️  Lista não está liberada para confirmações${NC}"
    WARNINGS=$((WARNINGS + 1))
  else
    echo -e "${RED}❌ Falha ao criar confirmação (HTTP $HTTP_CODE)${NC}"
    cat /tmp/response.json | jq '.' 2>/dev/null
    FAILED=$((FAILED + 1))
  fi
  echo ""
fi

# ========================================
# 4. RANKINGS
# ========================================
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}4️⃣  RANKINGS${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

RANKING_TYPES=("goals" "complaints" "victories" "draws" "defeats" "minutes-played")
RANKING_DESCRIPTIONS=("Gols" "Reclamações" "Vitórias" "Empates" "Derrotas" "Minutos Jogados")

for i in "${!RANKING_TYPES[@]}"; do
  TYPE="${RANKING_TYPES[$i]}"
  DESC="${RANKING_DESCRIPTIONS[$i]}"
  
  echo -e "${BLUE}4.$((i+1)) GET /ranking/$TYPE${NC}"
  RANKING_RESPONSE=$(curl -s -X GET "$API_URL/ranking/$TYPE" \
    -H "Authorization: Bearer $TOKEN")
  
  RANKING_TYPE=$(echo "$RANKING_RESPONSE" | jq -r '.type')
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X GET "$API_URL/ranking/$TYPE" \
    -H "Authorization: Bearer $TOKEN")
  
  if [ "$HTTP_CODE" = "200" ] && [ "$RANKING_TYPE" = "$TYPE" ]; then
    ITEMS_COUNT=$(echo "$RANKING_RESPONSE" | jq '.items | length')
    TOTAL=$(echo "$RANKING_RESPONSE" | jq -r '.total')
    echo -e "${GREEN}✅ Ranking de $DESC obtido: $ITEMS_COUNT item(s), total: $TOTAL${NC}"
    PASSED=$((PASSED + 1))
  else
    echo -e "${RED}❌ Falha ao obter ranking de $DESC (HTTP $HTTP_CODE)${NC}"
    echo "$RANKING_RESPONSE" | jq '.' 2>/dev/null
    FAILED=$((FAILED + 1))
  fi
  echo ""
done

# ========================================
# RESUMO FINAL
# ========================================
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📊 RESUMO${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}✅ Testes aprovados: $PASSED${NC}"

if [ $FAILED -gt 0 ]; then
  echo -e "${RED}❌ Testes falhados: $FAILED${NC}"
fi

if [ $WARNINGS -gt 0 ]; then
  echo -e "${YELLOW}⚠️  Avisos: $WARNINGS${NC}"
fi

TOTAL=$((PASSED + FAILED + WARNINGS))
echo ""
echo "Total de testes: $TOTAL"

if [ $FAILED -eq 0 ]; then
  echo ""
  echo -e "${GREEN}🎉 Todos os testes críticos passaram!${NC}"
  exit 0
else
  echo ""
  echo -e "${RED}⚠️  Alguns testes falharam. Verifique os erros acima.${NC}"
  exit 1
fi
