import QuestaoModel from "../model/questao";
import styles from '../styles/Questao.module.css'
import Enunciado from "./Enunciado";
import Resposta from "./Resposta";
import Temporizador from "./Temporizador";

interface QuestaoProps {
    valor: QuestaoModel,
    tempoParaResposta?: number,
    respostaFornecida: (indice: number) => void,
    tempoEsgotado: () => void
}

const letras = [
    { valor: 'A', cor: '#F2C866' },
    { valor: 'B', cor: '#F266BA' },
    { valor: 'C', cor: '#85D4F2' },
    { valor: 'D', cor: '#BCE596' },
]

export default function Questao(props: QuestaoProps) {
    const questao = props.valor

    /* O atributo Key é muito importante para diferenciar as diferentes instancias */
    function renderRespostas() {
        return questao.respostas.map((resposta, i) => {
            return (
                <Resposta key={`${questao.id}-${i}`}
                    valor={resposta}
                    indice={i}
                    letra={letras[i].valor}
                    corFundoLetra={letras[i].cor}
                    respostaFornecida={props.respostaFornecida}
                />
            )
        })
    }

    return (
        <div className={styles.questao}>
            <Enunciado texto={questao.enunciado} />
            {/* O atributo Key é muito importante para diferenciar as diferentes instancias */}
            <Temporizador key={questao.id} duracao={props.tempoParaResposta ?? 10} tempoEsgotado={props.tempoEsgotado} />
            {renderRespostas()}
        </div>
    );
}