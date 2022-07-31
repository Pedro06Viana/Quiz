import { useEffect, useState } from 'react'
import Questionario from '../components/Questionario'
import QuestaoModel from '../model/questao'
import { useRouter } from 'next/router'

const BASE_URL = 'http://localhost:3000/api'

export default function Home() {

  const [idsQuestoes, setIdsQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setrespostasCertas] = useState<number>(0)
  const router = useRouter()

  async function carregarIdsQuestoes() {
    const resposta = await fetch(`${BASE_URL}/questionario`)
    const ids = await resposta.json()
    setIdsQuestoes(ids)

  }

  async function carregarQuestao(idQuestao: number) {
    const resposta = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const objQuestaoJson = await resposta.json()
    const novaQuestao = QuestaoModel.fromObj(objQuestaoJson);
    setQuestao(novaQuestao)
  }

  useEffect(() => {
    carregarIdsQuestoes()
  }, [])

  useEffect(() => {
    idsQuestoes.length > 0 && carregarQuestao(idsQuestoes[0])
  }, [idsQuestoes])

  function questaoRespondida(questaoResp: QuestaoModel) {
    setQuestao(questaoResp)
    const respostaCerta = questaoResp.acertou
    setrespostasCertas(respostasCertas + (respostaCerta ? 1 : 0))
  }

  function idProximaPergunta() {
    const proximoIndice = idsQuestoes.indexOf(questao.id) + 1
    return idsQuestoes[proximoIndice]
  }

  function irParaProximoPasso() {
    const proximoId = idProximaPergunta()
    proximoId ? irParaProximaQuestao(proximoId) : finalizar()
  }

  function irParaProximaQuestao(proximoId: number) {
    carregarQuestao(proximoId)
  }

  function finalizar() {
    router.push({
      pathname: '/resultado',
      query: {
        total: idsQuestoes.length,
        certas: respostasCertas
      }
    })
  }

  return (
    questao ?(
      <Questionario
        questao={questao}
        ultima={idProximaPergunta() === undefined}
        questaoRespondida={questaoRespondida}
        irParaProximoPasso={irParaProximoPasso}
      />)
    : false

  )
}
