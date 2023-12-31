import styles from './InputInformation.module.scss'

export default function InputInformation({ info, base, label1, label2, label3, label4, title, classTitle, classFullName, classPhone, classEmail, classAddress, readOnly }) {
    console.log(info?.name)
    return (
        <>
            <h1 className={`${classTitle} ${styles.title}`}>{title}</h1>
            <span>{label1}</span>
            <input style={readOnly ? { backgroundColor: '#e5e5e5', color: '#000' } : {}} className={`${classFullName} ${base} ${styles.baseInput}`} value={info?.name} type="text" placeholder='FullName...' readOnly={readOnly} />
            <span>{label2}</span>
            <input style={readOnly ? { backgroundColor: '#e5e5e5', color: '#000' } : {}} className={`${classPhone} ${base} ${styles.baseInput}`} value={info?.phone} type="tel" placeholder='Phone number...' readOnly={readOnly} />
            <span>{label3}</span>
            <input style={readOnly ? { backgroundColor: '#e5e5e5', color: '#000' } : {}} className={`${classEmail} ${base} ${styles.baseInput}`} value={info?.email} type="email" placeholder='Email...' readOnly={readOnly} />
            <span>{label4}</span>
            <input style={readOnly ? { backgroundColor: '#e5e5e5', color: '#000' } : {}} className={`${classAddress} ${base} ${styles.baseInput}`} value={info?.address} type="text" placeholder='Address...' readOnly={readOnly} />
        </>
    )
}
