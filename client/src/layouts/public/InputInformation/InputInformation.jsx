import styles from './InputInformation.module.scss'

export default function InputInformation({ base, label1, label2, label3, label4, title, classTitle, classFullName, classPhone, classEmail, classAddress, readOnly }) {
    return (
        <>
            <h1 className={`${classTitle} ${styles.title}`}>{title}</h1>
            <span>{label1}</span>
            <input className={`${classFullName} ${base} ${styles.baseInput}`} type="text" placeholder='FullName...' readOnly={readOnly} />
            <span>{label2}</span>
            <input className={`${classPhone} ${base} ${styles.baseInput}`} type="tel" placeholder='Phone number...' readOnly={readOnly} />
            <span>{label3}</span>
            <input className={`${classEmail} ${base} ${styles.baseInput}`} type="email" placeholder='Email...' readOnly={readOnly} />
            <span>{label4}</span>
            <input className={`${classAddress} ${base} ${styles.baseInput}`} type="text" placeholder='Address...' readOnly={readOnly} />
        </>
    )
}
