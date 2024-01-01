import { useState } from 'react'
import styles from './InputInformation.module.scss'

 

export default function InputInformation({ info, base, title, classTitle, classFullName, classPhone, classEmail, classAddress, readOnly, onInputChange }) {
    const [nameValue, setNameValue] = useState(info?.name);
    const [emailValue, setEmailValue] = useState(info?.email);
    const [phoneValue, setPhoneValue] = useState(info?.phone);
    const [addressValue, setAddressValue] = useState(info?.address);

 

    // Hàm gọi callback khi giá trị thay đổi
    const handleChangeName = (e) => {
        setNameValue(e.target.value);
        onInputChange('name', e.target.value);
    }
    const handleChangeEmail = (e) => {
        setEmailValue(e.target.value);
        onInputChange('email', e.target.value);
    }
    const handleChangePhone = (e) => {
        setPhoneValue(e.target.value);
        onInputChange('phone', e.target.value);
    }
    const handleChangeAddress = (e) => {
        setAddressValue(e.target.value);
        onInputChange('address', e.target.value);
    }

 

    return (
        <>
            <h1 className={`${classTitle} ${styles.title}`}>{title}</h1>
            <input
                className={`${classFullName} ${base} ${styles.baseInput}`}
                onChange={handleChangeName}
                value={nameValue}
                type="text"
                placeholder='FullName...'
                readOnly={readOnly} />
            <input
                className={`${classPhone} ${base} ${styles.baseInput}`}
                onChange={handleChangePhone}
                value={phoneValue}
                type="tel"
                placeholder='Phone number...'
                readOnly={readOnly} />
            <input
                className={`${classEmail} ${base} ${styles.baseInput}`}
                onChange={handleChangeEmail}
                value={emailValue}
                type="email"
                placeholder='Email...'
                readOnly={readOnly} />
            <input
                className={`${classAddress} ${base} ${styles.baseInput}`}
                onChange={handleChangeAddress}
                value={addressValue}
                type="text"
                placeholder='Address...'
                readOnly={readOnly} />
        </>
    )
}