'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/profile.module.css'

interface Usuario {
  id: number;
  email: string;
  nombre: string;
  telefono?: string;
}

export default function profilePage() {
    const bannerRef = useRef<HTMLDivElement>(null);

    const [username, setUsername] = useState<string>();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        console.log("TOKEN:", );
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <div className={styles.container}>
            <section className={styles.banner} ref={bannerRef}></section>
            <div className={styles.background}>
                <main className={styles.info}>
                    <div className={styles.name}>{username}</div>
                    <div className={styles.userInfo}>
                        <form>
                            <label htmlFor='fname' className={styles.campoNombre}>Nombre</label><br />
                            <input type='text' id='fname' name='fname' className={styles.inputNombre}/><br />
                            <label htmlFor='lname' className={styles.campoApellido}>Apellido</label><br />
                            <input type='text' id='lname' name='lname' className={styles.inputApellido}/><br />
                            <label htmlFor='uname' className={styles.campoUsuario}>Nombre de Usuario</label><br />
                            <input type='text' id='uname' name='uname' className={styles.inputUName}/><br />
                            <label htmlFor='email' className={styles.campoEmail}>Correo Electronico</label><br />
                            <input type='text' id='e-mail' name='e-mail' className={styles.inputEmail}/><br />
                            <label htmlFor='pass' className={styles.campoContraseña}>Contraseña</label><br />
                            <input type='text' name='pass' id='pass' className={styles.inputContraseña}/><br />
                            <label htmlFor='text' className={styles.campoTel}>Numero de telefono</label><br />
                            <input type='"text"' id='tel' name='tel' className={styles.inputTel}/>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}