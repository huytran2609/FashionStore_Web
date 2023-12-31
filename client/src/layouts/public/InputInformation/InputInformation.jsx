import { useState } from 'react'
import styles from './InputInformation.module.scss'

export default function InputInformation({ info, base, label1, label2, label3, label4, title, classTitle, classFullName, classPhone, classEmail, classAddress, readOnly }) {
    const [nameValue, setNameValue] = useState(info?.name);
    const [emailValue, setEmailValue] = useState(info?.email);
    const [phoneValue, setPhoneValue] = useState(info?.phone);
    const [addressValue, setAddressValue] = useState(info?.address);
    const handleChangeName = (e) => {
        setNameValue(e.target.value)
    }
    const handleChangeEmail = (e) => {
        setEmailValue(e.target.value)
    }
    const handleChangePhone = (e) => {
        setPhoneValue(e.target.value)
    }
    const handleChangeAddress = (e) => {
        setAddressValue(e.target.value)
    }
    return (
        <>
            <h1 className={`${classTitle} ${styles.title}`}>{title}</h1>
            <span>{label1}</span>
            <input
                style={readOnly ? { backgroundColor: '#e5e5e5', color: '#000', userSelect: 'none' } : {}}
                className={`${classFullName} ${base} ${styles.baseInput}`}
                onChange={handleChangeName}
                value={nameValue}
                type="text"
                placeholder='FullName...'
                readOnly={readOnly} />
            <span>{label2}</span>
            <input
                style={readOnly ? { backgroundColor: '#e5e5e5', color: '#000', userSelect: 'none' } : {}}
                className={`${classPhone} ${base} ${styles.baseInput}`}
                onChange={handleChangePhone}
                value={phoneValue}
                type="tel"
                placeholder='Phone number...'
                readOnly={readOnly} />
            <span>{label3}</span>
            <input
                style={readOnly ? { backgroundColor: '#e5e5e5', color: '#000', userSelect: 'none' } : {}}
                className={`${classEmail} ${base} ${styles.baseInput}`}
                onChange={handleChangeEmail}
                value={emailValue}
                type="email"
                placeholder='Email...'
                readOnly={readOnly} />
            <span>{label4}</span>
            <input
                style={readOnly ? { backgroundColor: '#e5e5e5', color: '#000', userSelect: 'none' } : {}}
                className={`${classAddress} ${base} ${styles.baseInput}`}
                onChange={handleChangeAddress}
                value={addressValue}
                type="text"
                placeholder='Address...'
                readOnly={readOnly} />
        </>
    )
}
