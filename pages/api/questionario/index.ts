import { embaralhar } from '../../../functions/arrays'
import questoes from '../bancoDeQuestoes'

export default function handler(req, res) {
    /* Retorna todos os ids das perguntas do bancod e perguntas */
    const ids = questoes.map(questao => questao.id)
    res.status(200).json(embaralhar(ids))
}
