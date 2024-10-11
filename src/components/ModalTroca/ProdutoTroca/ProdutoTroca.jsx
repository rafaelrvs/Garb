import React, { useContext, useEffect, useState } from 'react'
import styles from './ProdutoTroca.module.css'
import { GlobalContext } from '../../../Context/GlobalContext';
import Grade from '../../Grade/Grade';
import {empresas} from '../../../DB/empresas.js'
const ProdutoTroca = ({tipo}) => {
const { produtoSelecionado, setProdutoSelecionado,setProdutosSelecionados, produtosSelecionados, tamanhoSelecionado, setTamanhoSelecionado } = useContext(GlobalContext);
const [gradeProd, setGradeProd]=useState([])
const [textArea,setTextArea]=useState('')
const [qtdProd, setQtdProd]=useState(produtoSelecionado.data.quantidade)
const [error, setError] = useState(false)

useEffect(()=>{
    let listaProd = []
    empresas.forEach((empresa) => {
        empresa.cargos.forEach((cargo) => {
            listaProd = [...listaProd, ...cargo.produtos];
        });
    });
    const produtoFiltrado = listaProd.filter((produto)=>{        
        return produtoSelecionado.data.cod === produto.codigo
    })
    setGradeProd(produtoFiltrado[0].grade)

},[produtoSelecionado])


function addProdTroca(){
    
    if(textArea.length > 5&&tamanhoSelecionado.length > 0){ 
        setProdutosSelecionados([
            ...produtosSelecionados,
            {
              descricao: produtoSelecionado.data.descricao,
              codigo: produtoSelecionado.data.cod,
              tamanhoAntigo: produtoSelecionado.data.tamanho,
              tamanhoNovo: tamanhoSelecionado,
              preco: produtoSelecionado.data.preco,
              img: produtoSelecionado.data.img,
              quantidade: qtdProd,
              motivo: textArea
            }
        ]);
        setProdutoSelecionado({
            status:false,
            data: null
        });
        setTamanhoSelecionado('')
    }else{
        setError(true)
    }
}

function addProdDevolu(){
    if(textArea.length > 5){
        setProdutosSelecionados([
            ...produtosSelecionados,
            {
              descricao: produtoSelecionado.data.descricao,
              codigo: produtoSelecionado.data.cod,
              tamanhoDevolvido: produtoSelecionado.data.tamanho,
              preco: produtoSelecionado.data.preco,
              img: produtoSelecionado.data.img,
              quantidade: qtdProd,
              motivo: textArea,
            }
        ]);
        setProdutoSelecionado({
            status:false,
            data: null
        });
    }else{
        setError(true)
    }
}

function voltar(){
    setProdutoSelecionado({status:false,data:null})
    setTamanhoSelecionado('')
}

if(produtoSelecionado.status)
  return (
    <div className={styles.containerProdutoTroca}>
        <div className={styles.voltarContainer} >
            <p className={styles.voltarBtn} onClick={voltar}>{'<'}</p>
            <p className={styles.VoltarTitle} onClick={voltar}>Voltar</p>    
        </div>
        {tipo === 'troca' ?
            <div className={styles.GridProduto}>
                <img
                    src={`/images/produtos/${produtoSelecionado.data.img}`} 
                    className={styles.imgProduto}
                />
                <div className={styles.sobreProd}>
                    <h1 className={styles.nomeProd}>{produtoSelecionado.data.descricao}</h1>
                    <p className={styles.textGrade}>selecione o tamanho que deseja reecber</p>
                    <Grade grade={gradeProd} />
                    <p className={styles.textGrade}>quantidade que deseja trocar</p>
                    <input type="number" className={styles.input} value={qtdProd <= 0 ? 1 : qtdProd && qtdProd >= produtoSelecionado.data.quantidade ? produtoSelecionado.data.quantidade : qtdProd} onChange={(e)=>setQtdProd(e.target.value)}/>
                    <p className={styles.textGrade}>informe o motivo da troca</p>
                    <textarea className={styles.textarea} value={textArea} onChange={(e)=>setTextArea(e.target.value)} placeholder='minimo 5 caracteres' ></textarea>
                    {error&& <p className={styles.error}>preencha todos os campos</p>}
                    <button className={styles.btnTroca} onClick={addProdTroca} >Adicionar produto</button>
                </div>

            </div>
        :
        <div className={styles.GridProduto}>
            <img
                src={`/images/produtos/${produtoSelecionado.data.img}`} 
                className={styles.imgProduto}
            />
            <div className={styles.sobreProd}>
                <h1 className={styles.nomeProd}>{produtoSelecionado.data.descricao}</h1>
                <p className={styles.textGrade}>quantidade que deseja devolver</p>
                <input type="number" className={styles.input} value={qtdProd <= 0 ? 1 : qtdProd && qtdProd >= produtoSelecionado.data.quantidade ? produtoSelecionado.data.quantidade : qtdProd} onChange={(e)=>setQtdProd(e.target.value)}/>
                <p className={styles.textGrade}>informe o motivo da devolução</p>
                <textarea className={styles.textarea} value={textArea} onChange={(e)=>setTextArea(e.target.value)} placeholder='minimo 5 caracteres' ></textarea>
                {error&& <p className={styles.error}>preencha todos os campos</p>}
                <button className={styles.btnTroca} onClick={addProdDevolu} >Adicionar produto</button>
            </div>

        </div>
        
        
        }
    </div>
  )
}

export default ProdutoTroca
