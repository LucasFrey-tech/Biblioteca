'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '../../../styles/profile.module.css'

interface User {
  id: number;
  email: string;
  nombre: string;
  telefono?: string;
}

export default function profilePage() {
    const { id } = useParams();
    const bannerRef = useRef<HTMLDivElement>(null);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const getProfile = async () => {
            if (!id){
                console.error('No se proporcionó un Id de usuario');
            }
            try{
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Faltan datos de autenticación');
                    return;
                }
                
                const response = await fetch(`http://localhost:3001/users/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener el perfil del usuario');
                }

                const data = await response.json();
                setUser(data);
            }catch (error){
                console.error('Hubo un error al cargar el perfil: ', error);
            }
        }
        getProfile();
    }, [id]); 


    if (!user) return;

    return (
        <div className={styles.container}>
            <section className={styles.banner} ref={bannerRef}></section>
            <div className={styles.background}>
                <main className={styles.info}>
                    <div className={styles.name}>{user.nombre}</div>
                    <div className={styles.userInfo}>
                        {/*<form>
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
                        </form>*/}
                        {user.email}
                    </div>
                </main>
            </div>
        </div>
    )
}