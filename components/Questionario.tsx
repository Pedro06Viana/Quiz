import styles from "../styles/Questionario.module.css";
import QuestaoModel from "../model/questao";
import Questao from "./Questao";
import Botao from "./Botao";

interface QuestionarioProps {
    questao: QuestaoModel
    ultima: boolean
    questaoRespondida: (questao: QuestaoModel) => void
    irParaProximoPasso: () => void
}

export default function Questionario(props: QuestionarioProps) {

    /*  const questaoRef = useRef<QuestaoModel>()
 
   useEffect(() => {
     questaoRef.current = questao
   }, [questao])
  */
    /* function respostaFornecida(indice: number) {
        console.log(indice);
        setQuestao(questao.responderCom(indice))
    } */

    /*  function tempoEsgotado() {
           if (questaoRef.current.naoRespondida) {
            setQuestao(questaoRef.current.responderCom(-1))
          } 
         if (questao.naoRespondida) {
             setQuestao(questao.responderCom(-1))
         }
     } */

    function respostaFornecida(indice: number) {
        if (props.questao.naoRespondida) {
            props.questaoRespondida(props.questao.responderCom(indice))
        }
    }

    return (
        <div className={styles.questionario}>
            {
                props.questao ?
                    <Questao
                        valor={props.questao}
                        tempoParaResposta={6}
                        respostaFornecida={respostaFornecida}
                        tempoEsgotado={props.irParaProximoPasso}
                    />
                    : false
            }
            <Botao
                texto={props.ultima ? 'Finalizar' : 'Próxima'}
                onClick={props.irParaProximoPasso}
            />
        </div>
    );
}