import React from 'react'
import styles from "./Grade.module.css"
const Grade = ({ grade }) => {
    
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
