import React, { useState, useEffect } from 'react'
import styles from "./Grade.module.css"
const Grade = ({ produtos }) => {
    const [grade, setGrade] = useState([]);
    const produto = produtos.produtos;
    useEffect(() => {
        if (produto && produto.length > 0) {

            const allGrades = Array.from(new Set(produto.flatMap(item => item.grade || [])));
            setGrade(allGrades);
        }
    }, [produto]);

    return (

        <section className={styles.gradeContainer} >
            <p>Grade</p>
            <select className={styles.grade}>

                {grade.map((item, index) => (
                    <option key={index}>{item}</option>
                ))}
            </select>
        </section>

    )
}

export default Grade;
