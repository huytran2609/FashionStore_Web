import styles from './Input.module.scss'

export default function Input({ handleChange, value, title, name, color }) {
    return (
        <label className={styles.sidebarLabelContainer}>
            <input onChange={handleChange} type="radio" value={value} name={name} />
            <span className={styles.checkmark} style={{ backgroundColor: color }}></span>
            {title}
        </label>
    );
}

