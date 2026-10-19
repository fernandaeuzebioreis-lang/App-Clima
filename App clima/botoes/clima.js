// COLOQUE SUA CHAVE AQUI (entre as aspas)
const CHAVE = "1f844da2b6781153fd62d174eabe9c34"

const estadosBR = {
  AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas", BA: "Bahia",
  CE: "Ceará", DF: "Federal District", ES: "Espírito Santo", GO: "Goiás",
  MA: "Maranhão", MT: "Mato Grosso", MS: "Mato Grosso do Sul",
  MG: "Minas Gerais", PA: "Pará", PB: "Paraíba", PR: "Paraná",
  PE: "Pernambuco", PI: "Piauí", RJ: "Rio de Janeiro",
  RN: "Rio Grande do Norte", RS: "Rio Grande do Sul", RO: "Rondônia",
  RR: "Roraima", SC: "Santa Catarina", SP: "São Paulo", SE: "Sergipe",
  TO: "Tocantins"
}

// Tira acentos e deixa minúsculo
function normalizar(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
}

// Confere se a cidade existe no estado. Devolve o local ou null
async function validarLocal(cidade, estado) {
  const sigla = estado.trim().toUpperCase()
  const ehBrasil = estadosBR[sigla] !== undefined

  const q = ehBrasil ? `${cidade},BR` : `${cidade},${sigla},US`
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=5&appid=${CHAVE}`

  const resposta = await fetch(url)
  const lista = await resposta.json()
  console.log("Resposta da API:", lista)

  // Se não veio uma lista, o problema é a chave ou a API
  if (!Array.isArray(lista)) {
    throw new Error("Erro da API: " + (lista.message || "desconhecido"))
  }

  if (lista.length === 0) return null

  // Fora do Brasil, aceita o primeiro resultado
  if (!ehBrasil) return lista[0]

  // No Brasil, procura uma cidade cujo estado bate
  const nomeEstado = normalizar(estadosBR[sigla])
  return lista.find(l => normalizar(l.state || "").includes(nomeEstado)) || null
}

function pegarElementoErro() {
  let erro = document.querySelector("#mensagem-erro")

  // Se não existir no HTML, cria logo abaixo do botão
  if (!erro) {
    erro = document.createElement("p")
    erro.id = "mensagem-erro"
    erro.className = "text-danger fw-bold d-none mt-2"
    document.querySelector("#btn-buscar").insertAdjacentElement("afterend", erro)
  }

  return erro
}

function mostrarErro(mensagem) {
  document.querySelector("#resultado-clima").classList.add("d-none")
  const erro = pegarElementoErro()
  erro.textContent = mensagem
  erro.classList.remove("d-none")
}

function esconderErro() {
  pegarElementoErro().classList.add("d-none")
}
async function buscarClima() {
  const nomeCidade = document.querySelector("#cidade").value.trim()
  const estado = document.querySelector("#estado").value.trim()

  esconderErro()

  if (nomeCidade === "" || estado === "") {
    alert("Por favor, digite a cidade e o estado.")
    return
  }

  try {
    const local = await validarLocal(nomeCidade, estado)

    if (!local) {
      mostrarErro("Essa cidade não existe nesse estado.")
      return
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${local.lat}&lon=${local.lon}&appid=${CHAVE}&units=metric&lang=pt_br`
    const resposta = await fetch(url)
    const dados = await resposta.json()

    if (!dados.main) {
      throw new Error("Erro da API: " + (dados.message || "desconhecido"))
    }

    exibirResultado(dados, estado)
    adicionarHistorico(nomeCidade, estado, dados.main.temp)

  } catch (erro) {
    console.error(erro)
    mostrarErro(erro.message || "Erro ao buscar o clima. Tente de novo.")
  }
}

function exibirResultado(dados, estado) {
  esconderErro()
  document.querySelector("#resultado-cidade").textContent = dados.name
  document.querySelector("#resultado-estado").textContent = estado.toUpperCase()
  document.querySelector("#resultado-temperatura").textContent = dados.main.temp + "°C"
  document.querySelector("#resultado-descricao").textContent = dados.weather[0].description
  document.querySelector("#resultado-clima").classList.remove("d-none")
}

function adicionarHistorico(cidade, estado, temperatura) {
  const tabela = document.querySelector("#corpo-tabela")
  const linha = document.createElement("tr")

  linha.innerHTML = `
    <td>${cidade}</td>
    <td>${estado.toUpperCase()}</td>
    <td>${temperatura}°C</td>
  `

  tabela.appendChild(linha)

  document.querySelector("#sem-buscas").classList.add("d-none")
  document.querySelector("#tabela-historico").classList.remove("d-none")
}

document.querySelector("#btn-buscar").addEventListener("click", buscarClima)
