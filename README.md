# 🌤️ App Clima

Aplicação web para consulta de clima em tempo real, desenvolvida com HTML, CSS (Bootstrap) e JavaScript puro, consumindo a API do OpenWeatherMap.

---

## 📋 Funcionalidades

- 🔍 Busca o clima atual de qualquer cidade do mundo
- 🌡️ Exibe temperatura, nome da cidade e descrição do clima
- 📋 Histórico de buscas realizadas na sessão
- 📖 Tabela de dicas por faixa de temperatura
- ⚠️ Validação de campos e mensagem de erro para cidade não encontrada

---

## 🖥️ Tecnologias utilizadas

- HTML5
- CSS3
- Bootstrap 5.3
- JavaScript (ES6+)
- [OpenWeatherMap API](https://openweathermap.org/api)

---

## 📁 Estrutura do projeto

```
App-Clima/
├── botoes/
│   └── clima.js       ← lógica em JavaScript
└── Paginas/
    └── clima.html     ← estrutura e visual da página
```

---

## 🚀 Como executar

1. Clone o repositório:
```bash
git clone https://github.com/fernandaeuzebioreis-lang/app-clima.git
```

2. Abra a pasta no **VS Code**

3. Clique com botão direito em `clima.html` → **Open with Live Server**

4. Digite o nome de uma cidade e clique em **Buscar Clima**

> ⚠️ É necessário ter a extensão **Live Server** instalada no VS Code. Abrir o arquivo diretamente pelo navegador (`file:///`) pode bloquear as requisições à API.

---

## 🌐 Como usar

1. Digite o nome da cidade no campo **Cidade** (ex: `Campinas`)
2. Digite a sigla do estado no campo **Estado** (ex: `SP`)
3. Clique em **Buscar Clima**
4. O resultado aparece com temperatura e descrição do clima
5. Cada busca é registrada no **Histórico de Buscas**

---

## 🗺️ Exemplos de cidades testadas

| Cidade | Estado/País | Resultado |
|---|---|---|
| Campinas | SP | ✅ Funcionando |
| São Paulo | SP | ✅ Funcionando |
| Rio de Janeiro | RJ | ✅ Funcionando |
| London | Reino Unido | ✅ Funcionando |
| Tokyo | Japão | ✅ Funcionando |

> Cidades com acento podem não ser encontradas — tente sem acento (ex: `Sao Paulo`).

---

## 🔑 API Key

Este projeto utiliza a API gratuita do [OpenWeatherMap](https://openweathermap.org/api).

Para usar o projeto com sua própria chave:

1. Crie uma conta gratuita em openweathermap.org
2. Acesse **API keys** e copie sua chave
3. No arquivo `botoes/clima.js`, substitua o valor de `appid` pela sua chave na URL do fetch

---

## ⚠️ Segurança

A chave da API do OpenWeatherMap está exposta no código front-end. Isso é esperado em projetos de estudo, já que JavaScript no navegador não permite esconder variáveis do usuário final.

Em um ambiente de produção, a solução seria criar um servidor intermediário (ex: Node.js) que armazena a chave em variável de ambiente (`.env`) e faz a requisição para a API — o front-end chamaria o servidor, não a API diretamente.

---

## 👩‍💻 Desenvolvedora

**Fernanda Euzébio Reis**  
Estudante de Análise e Desenvolvimento de Sistemas  
[GitHub](https://github.com/fernandaeuzebioreis-lang)

---

## 📚 Aprendizados com este projeto

- Consumo de API externa com `fetch()` e `async/await`
- Manipulação do DOM com JavaScript puro
- Tratamento de erros em requisições HTTP
- Criação dinâmica de elementos HTML com `createElement`
- Uso do Bootstrap 5 para layout responsivo
- Boas práticas de segurança com API keys
