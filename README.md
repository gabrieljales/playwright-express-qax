# Playwright Express QAx

Este é um repositório de estudos do framework Playwright, baseado no curso ["Playwright Express"](https://www.udemy.com/course/playwright-express/).

## Configuração do Projeto

Para rodar o projeto localmente na sua máquina, siga as etapas abaixo:

### 1. Instalar Dependências dos testes

Execute o seguinte comando na raiz do projeto:

```bash
npm install
```

### 2. Extraindo as Aplicações

As aplicações que serão testadas estão disponíveis no arquivo compactado `apps.zip`. Extraia no diretório raiz do projeto e siga os próximos passos!

### 3. Configurar a API
Navegue até o diretório da API:
```bash
cd apps/api
```

Instale as dependências:
```bash
npm install
```

Inicialize o banco de dados:
```bash
npm run db:init
```

Rode a API:
```bash
npm run dev
```

### 4. Configurar o Web App
Navegue até o diretório do Web App:
```bash
cd apps/web
```

Instale as dependências:
```bash
npm install
```

Rode o Web App:
```bash
npm run dev
```

## Executando os Testes com Playwright
Após configurar os projetos, você pode executar os testes do Playwright usando os comandos a seguir.

Para executar os testes:
```bash
npx playwright test
```

Para mostrar o relatório dos testes:
```bash
npx playwright show-report
```