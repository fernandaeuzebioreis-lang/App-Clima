async function buscarClima() {

  const nomeCidade = document.querySelector("#cidade").value
  const estado = document.querySelector("#estado").value

  if (nomeCidade === "") {
    alert("Por favor, digite uma cidade.")
    return
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${nomeCidade}&appid=351efba6d55dc25cf345e2a6e7e6f5d2&units=metric&lang=pt_br`

  try {
    const resposta = await fetch(url)
    const dados = await resposta.json()

    if (dados.cod === "404") {
      alert("Cidade não encontrada.")
      return
    }

    exibirResultado(dados)
    adicionarHistorico(nomeCidade, estado, dados.main.temp)

  } catch (erro) {
    console.error(erro)
  }

}

function exibirResultado(dados) {
  document.querySelector("#resultado-cidade").textContent = dados.name
  document.querySelector("#resultado-temperatura").textContent = dados.main.temp + "°C"
  document.querySelector("#resultado-descricao").textContent = dados.weather[0].description
  document.querySelector("#resultado-clima").classList.remove("d-none")
}

function adicionarHistorico(cidade, estado, temperatura) {
  const tabela = document.querySelector("#corpo-tabela")
  const linha = document.createElement("tr")

  linha.innerHTML = `
    <td>${cidade}</td>
    <td>${estado}</td>
    <td>${temperatura}°C</td>
  `

  tabela.appendChild(linha)

  document.querySelector("#sem-buscas").classList.add("d-none")
  document.querySelector("#tabela-historico").classList.remove("d-none")
}

document.querySelector("#btn-buscar").addEventListener("click", buscarClima)

