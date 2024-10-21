import React, { useContext, useRef,useState } from 'react'
import styles from './ModalChamado.module.css';
import { GlobalContext } from '../../Context/GlobalContext';

const ModalChamado = () => {

    const {modalChamado,setModalChamado,setPopUp, popupTimeoutRef } = useContext(GlobalContext);
    const [destinadoSelecionado, setDestinadoSelecionado] = useState('');
    const [assuntoSelecionado, setAssuntoSelecionado] = useState('');
    const [descricao, setDescricao] = useState('')
    const [error, setError]=useState(false)
    const destinado = ['Equipe Comercial','Equipe Técnica']
    const assunto = ['Login / Senha','Problema técnico','Divergência','Outros']
    const voltar = useRef()

    const generateOrderId = () => {
        return Math.floor(1000 + Math.random() * 9000);
    };

    function closeModal(event){
        if(event.currentTarget === voltar.current){
            setModalChamado({
                status:false,
                data:{}
            })
        }
    }

    function handleClick(){

        if(destinadoSelecionado&& assuntoSelecionado&& descricao.length > 5){
            const chamado ={
                id: generateOrderId(),
                dataCriacao: new Date().toLocaleDateString(),
                destinado: destinadoSelecionado,
                assunto: assuntoSelecionado,
                descricao: descricao,
                statusbar: 'Aguardando analise',
            }

            setError(false)
            setAssuntoSelecionado('')
            setDescricao('')
            setDestinadoSelecionado('')

            const chamadosExistentes = JSON.parse(localStorage.getItem('chamados')) || [];
    
            const chamadosAtualizados = [...chamadosExistentes, chamado];
            localStorage.setItem('chamados', JSON.stringify(chamadosAtualizados));
            setModalChamado({
                status:false,
                data:{}
            })

            setPopUp({
                status: true,
                color: "#46bba2",
                children: `Chamado n°${chamado.id} aberto! `,
              });
              
              if (popupTimeoutRef.current) {
                clearTimeout(popupTimeoutRef.current);
              }
              
              popupTimeoutRef.current = setTimeout(() => {
                setPopUp({
                  status: false,
                  color: "",
                  children: "",
                });
                popupTimeoutRef.current = null;
              }, 2500);

        }else{
            setError(true)
        }
        
    }

  return (
    <div className={styles.containerModal}>
        
        <div className={`${styles.modal}  ${styles.fade}`} >
                <div className={styles.voltarContainer} onClick={closeModal} ref={voltar}>
                    <p className={styles.voltarBtn}>{'<'}</p>
                    Voltar
                </div>
                <div className={styles.containerForm}>
                    <h1>Abrir chamado</h1>
                    <span className={styles.titleInput}>Destinado a:</span>
                    <select 
                        className={styles.inputForm}
                        value={destinadoSelecionado}
                        onChange={(e)=>setDestinadoSelecionado(e.target.value)}
                        >
                        <option value="" disabled className={styles.option}>Selecione uma opção</option> {/* Opção padrão */}

                        {destinado.map(item=>(
                            <option className={styles.option}>{item}</option>

                        ))}
                    </select>
                    <span className={styles.titleInput}>Assunto</span>
                    <select 
                        className={styles.inputForm}
                        value={assuntoSelecionado}
                        onChange={(e)=>setAssuntoSelecionado(e.target.value)}
                        >
                        <option value="" disabled className={styles.option}>Selecione uma opção</option> {/* Opção padrão */}
                        {assunto.map(item=>(
                            <option className={styles.option}>{item}</option>

                        ))}
                    </select>
                    <span className={styles.titleInput}>Descreva a situação:</span>
                    <textarea name="" id="" className={styles.textarea} value={descricao} onChange={(e)=>setDescricao(e.target.value)}></textarea>
                    {error&& <p className={` ${styles.error}`}>Preencha todos campos necessarios</p>}
                    <button className={styles.button} onClick={handleClick}>Abrir chamado</button>
                </div>
        </div>
    </div>
  )
}

export default ModalChamado
