import questoes from '../bancoDeQuestoes'

export default function handler(req, res) {
    const idSelect = +req.query.id

    const questao = questoes.filter(quest => quest.id === idSelect)

    if (questao.length === 1) {
        const selecionada = questao[0].embaralharRespostas()
        res.status(200).json(
            selecionada.toObj()
        )
    } else {
        res.status(204).json(
            { error: "Id selecionado não existe..." }
        )
    }

}
