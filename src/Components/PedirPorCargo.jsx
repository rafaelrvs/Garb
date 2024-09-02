import React, { useState } from 'react';
import styles from "./PedirPorCargo.module.css";
import FiltroSVG from "../assets/filtro.svg?react";
import TrianguloSVG from "../assets/triangulo.svg?react";

const empresas = [
    {
        "id": 1,
        "nome": "Garb - Solution LTDA",
        "cargos": [
            {
                "id": 1,
                "nome": "Gerente Masculino",
              

            },
            {
                  "id": 2,
                "nome": "Gerente Feminino"
            },
            {
                     "id": 3,
                "nome": "Relacionamento e vendas Masculino"

            },
            {
                 "id": 4,
                "nome": "Relacionamento e vendas Feminino"
            },
            {
                      "id": 5,
                "nome": "Tecnologia guru Masculino"

            }
        ]
    },
    {
        "id": 2,
        "nome": "Garb ",
        "cargos": [
            {
                "id": 2,
                "nome": "Gerente Feminino"
            }
        ]
    },
    {
        "id": 3,
        "nome": "Solution LTDA",
        "cargos": [
            {
                "id": 3,
                "nome": "Relacionamento e vendas Masculino"
            }
        ]
    },
    {
        "id": 4,
        "nome": "Garb LTDA",
        "cargos": [
            {
                "id": 4,
                "nome": "Relacionamento e vendas Feminino"
            }
        ]
    },
    {
        "id": 5,
        "nome": "Solution LTDA",
        "cargos": [
            {
                "id": 5,
                "nome": "Tecnologia guru Masculino"
            }
        ]
    },
];

const PedirPorCargo = () => {
    const [escolhaPedirPorCargo, setCargoSelecionado] = useState("");
    const [animacaoTriangulo, setAnimacaoTriangulo] = useState("");

    return (
        <div className={styles.PedirPorCargo}>
            <h1>Pedir por cargo</h1>
            <div className={styles.boxFiltro}>
                <FiltroSVG className={styles.filtro} />
                <div className={styles.boxBTN}>
                    <button type="button">Acompanhar pedidos</button>
                    <button type="button" className={styles.meuCarrinho}>
                        Meu carrinho <p className={styles.statusCarrinho}>0</p>
                    </button>
                </div>
            </div>
            <hr />

            {escolhaPedirPorCargo === "" ? (
                <div className={styles.containerBTNEmpresa}>
                    {empresas.map((item) => (
                        <div
                            onClick={() => setCargoSelecionado(item.nome)}
                            className={styles.empresasBtn}
                            key={item.id}
                        >
                            <p>{item.id}</p>{item.nome}
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <h2>Empresa Selecionada: {escolhaPedirPorCargo}</h2>
                    <div className={styles.containerBTNCargos} onClick={()=>setAnimacaoTriangulo(true)}> 
                        {empresas
                            .find(emp => emp.nome === escolhaPedirPorCargo)
                            .cargos.map((cargo) => (
                                <div key={cargo.id} className={styles.cargoBtn}>
                                    <div className={styles.cargo}> <TrianguloSVG className={ styles.animacaoTriangulo  }/>{cargo.nome}</div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PedirPorCargo;
