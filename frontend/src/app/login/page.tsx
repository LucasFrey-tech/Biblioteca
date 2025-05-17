/*2:20*/
import styles from '../../styles/formAuth.module.css'

export default function LogIn() {
    
    return (
        <div className={styles.container}>
        <main className={styles.mainLog}>
        <div className={styles.containerLog}>
        <div className={styles.formulario}>

        <form action="" method="POST">
        <label className={styles.formLabel} htmlFor="email">Correo electrónico</label>
        <input className={styles.formInput} type="email" id="email" name="email"  placeholder="ejemplo@hotmail.com" required />

        <label className={styles.formLabel} htmlFor="password">Contraseña</label>
        <input className={styles.formInput} type="password" id="password" name="password" placeholder="********" required />

            <div className={styles.errorMessage} id="errorMsg"></div>

            <div className={styles.buttonGroup}>
            <a href="http://localhost:3000/registro" className={styles.boton}>registrarme</a>
            <button className={styles.boton} type="submit">iniciar sesión</button>
            </div>
            </form>
            </div>
        </div>
    </main>
        </div>

    );
  }
