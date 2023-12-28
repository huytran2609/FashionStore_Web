import styles from './InputInformation.module.scss'

export default function InputInformation({ title, classTitle, classFullName, classPhone, classEmail, classAddress }) {
    return (
        <>
            <h1 className={`${classTitle} ${styles.title}`}>{title}</h1>
            <input className={`${classFullName}`} type="text" placeholder='FullName...' />
            <input className={`${classPhone}`} type="tel" placeholder='Phone number...' />
            <input className={`${classEmail}`} type="email" placeholder='Email...' />
            <input className={`${classAddress}`} type="text" placeholder='Address...' />
        </>
    )
}
