import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import styles from '../../styles/panelAdmin.module.css';
import Swal from "sweetalert2";
import { BaseApi } from "@/API/baseApi";



export default function SubscriptionPanel(): React.JSX.Element {
    const [subscriptionPrice, setSubscriptionPrice] = useState(1.1);

    const apiRef = useRef<BaseApi | null>(null);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement; // <-- casting para que TS sepa que tiene checked
        const { name, value, type, checked } = target;
        setSubscriptionPrice(parseFloat(value));
    };

    const saveChanges = async () => {
        apiRef.current = new BaseApi(); //ahora funciona sin token

        const token = localStorage.getItem('token');
        if (token) {
            apiRef.current = new BaseApi(token);
        }

        const res = await apiRef.current?.subscription.update(1,{price:subscriptionPrice});
        if (res) {
            setSubscriptionPrice(res.price);
        } else {
            Swal.fire("Error", "No se pudo actualizar el precio de la suscripción.", "error");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            apiRef.current = new BaseApi(); //ahora funciona sin token

            const token = localStorage.getItem('token');
            if (token) {
                apiRef.current = new BaseApi(token);
            }

            const res = await apiRef.current?.subscription.getOne();
            if (res) {
                setSubscriptionPrice(res.price);
            } else {
                Swal.fire("Error", "No se pudo obtener el precio de la suscripción.", "error");
            }
        }
        fetchData();
    }, []);


    return (
        <div className="subscription-panel">
            <label>
                Precio:
                <Input
                    name="price"
                    value={subscriptionPrice}
                    onChange={(e) => handlePriceChange(e)}
                />
            </label>
            <Button className={styles.botonEditar} onClick={() => saveChanges()}>Guardar</Button>
        </div>
    )
}