'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '../../../styles/profile.module.css'

import { User } from '@/API/types/user';
import { BaseApi } from '@/API/baseApi';

export default function profilePage() {
    const { id } = useParams();
    const bannerRef = useRef<HTMLDivElement>(null);
    const [user, setUser] = useState<User>();
    const [editMode, setEditMode] = useState<{ [key: number]: boolean }>([]);
    const [editedProduct, setEditedProduct] = useState<{ [key: number]: Partial<User> & {pass?: string}}>({});
    
    const apiRef = useRef<BaseApi | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            apiRef.current = new BaseApi(token);
        }else{
            console.error("Falla validacion token");
            return;
        }
    }, []);

    const editActivate = (u: User) => {
        setEditMode(prev => ({...prev, [u.id]: true }));
        setEditedProduct(prev => ({
            ...prev,
            [u.id]: {
                email: u.email,
                username: u.username,
                firstname: u.firstname,
                lastname: u.lastname,
                tel: u.tel,
            },
        }));
    };

    const saveChanges = async (id: number) => {
        if (!apiRef.current) {
            console.error("API no inicializada");
            return;
        }
        const datos = editedProduct[id];
        try {
            const response = await apiRef.current.users.update(id, datos);

            const result = response;

            if (!response) {
                alert(`Error al actualizar datos`);
                return;
            }

            setUser(result);
            setEditMode(prev => ({ ...prev, [id]: false }));
        }catch(error){
            console.error('Error al guardar producto: ', error);
            alert('Error de red al guardar el producto');
        }

    }

    useEffect(() => {
        const getProfile = async () => {
            if (!id){
                console.error('No se proporcionó un Id de usuario');
                return;
            }
            if(!apiRef.current) {
                console.error('API aún no inicializada');
                return;
            }
            try{
                const response = await apiRef.current.users.getOne(Number(id));

                if (!response) {
                    throw new Error('Error al obtener el perfil del usuario');
                }

                const data = response;
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
                    <div className={styles.name}>{user.username}</div>
                    <div className={styles.userInfo}>
                        {editMode[user.id] ? (
                            <form>
                                <label htmlFor='fname' className={styles.campoNombre}>Nombre</label><br/>
                                <input type='text' id='fname' name='fname' className={styles.inputNombre} value={editedProduct[user.id]?.firstname} onChange={(e) =>setEditedProduct((prev) => ({ ...prev, [user.id]: { ...prev[user.id], firstname: e.target.value}}))}/><br />
                                <label htmlFor='lname' className={styles.campoApellido}>Apellido</label><br/>
                                <input type='text' id='lname' name='lname' className={styles.inputApellido} value={editedProduct[user.id]?.lastname} onChange={(e) =>setEditedProduct((prev) => ({ ...prev, [user.id]: { ...prev[user.id], lastname: e.target.value}}))}/><br />
                                <label htmlFor='uname' className={styles.campoUsuario}>Nombre de Usuario</label><br/>
                                <input type='text' id='uname' name='uname' className={styles.inputUName} value={editedProduct[user.id]?.username} onChange={(e) =>setEditedProduct((prev) => ({ ...prev, [user.id]: { ...prev[user.id], username: e.target.value}}))}/><br />
                                <label htmlFor='email' className={styles.campoEmail}>Correo Electronico</label><br/>
                                <input type='email' id='e-mail' name='e-mail' className={styles.inputEmail} value={editedProduct[user.id]?.email} onChange={(e) =>setEditedProduct((prev) => ({ ...prev, [user.id]: { ...prev[user.id], email: e.target.value}}))}/><br />
                                <label htmlFor='pass' className={styles.campoContraseña}>Contraseña</label><br/>
                                <input type='password' name='pass' id='pass' className={styles.inputContraseña} value={editedProduct[user.id]?.pass ?? ''} onChange={(e) =>setEditedProduct((prev) => ({ ...prev, [user.id]: { ...prev[user.id], pass: e.target.value}}))}/><br/>
                                <label htmlFor='text' className={styles.campoTel}>Numero de telefono</label><br/>
                                <input type='tel' id='tel' name='tel' className={styles.inputTel} value={editedProduct[user.id]?.tel ?? ''} onChange={(e) =>setEditedProduct((prev) => ({ ...prev, [user.id]: { ...prev[user.id], tel: Number(e.target.value)}}))}/>
                                <button className={styles.saveChanges} type="button" onClick={() => saveChanges(user.id)}>Guardar</button>
                                <button className={styles.cancel} onClick={() => setEditMode(prev => ({ ...prev, [user.id]: false }))}>Cancelar</button>
                            </form>
                        ) : (
                            <div className={styles.user}>
                                <label className={styles.campoNombre}>Nombre</label>
                                <span className={styles.inputNombre} onCopy={(e) => e.preventDefault()} onSelect={(e) => e.preventDefault()} onMouseDown={(e) => e.preventDefault()}>{user.firstname}</span>
                                <label className={styles.campoApellido}>Apellido</label>
                                <span className={styles.inputApellido} onCopy={(e) => e.preventDefault()} onSelect={(e) => e.preventDefault()} onMouseDown={(e) => e.preventDefault()}>{user.lastname}</span>
                                <label className={styles.campoUsuario}>Nombre de Usuario</label>
                                <span className={styles.inputUName} onCopy={(e) => e.preventDefault()} onSelect={(e) => e.preventDefault()} onMouseDown={(e) => e.preventDefault()}>{user.username}</span>
                                <label className={styles.campoEmail}>Correo Electronico</label>
                                <span className={styles.inputEmail} onCopy={(e) => e.preventDefault()} onSelect={(e) => e.preventDefault()} onMouseDown={(e) => e.preventDefault()}>{user.email}</span>
                                <label className={styles.campoContraseña}>Contraseña</label>
                                <span className={styles.inputContraseña} onCopy={(e) => e.preventDefault()} onSelect={(e) => e.preventDefault()} onMouseDown={(e) => e.preventDefault()}>******</span>
                                <label>Numero de Telefono</label>
                                <span onCopy={(e) => e.preventDefault()} onSelect={(e) => e.preventDefault()} onMouseDown={(e) => e.preventDefault()}>{user.tel}</span>
                                <button className={styles.edit} type="button" onClick={() => editActivate(user)}>Editar</button>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}