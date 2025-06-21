import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import styles from '../../styles/panelAdmin.module.css';
import Swal from "sweetalert2";
import { BaseApi } from "@/API/baseApi";

export default function SubscriptionPanel(): React.JSX.Element {
    const [subscriptionPrice, setSubscriptionPrice] = useState("1.1");

    const apiRef = useRef<BaseApi | null>(null);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        setSubscriptionPrice(target.value);
    };

const saveChanges = async () => {
  try {
    apiRef.current = new BaseApi();

    const token = localStorage.getItem('token');
    if (token) {
      apiRef.current = new BaseApi(token);
    }

    const priceNumber = parseFloat(subscriptionPrice);
    if (isNaN(priceNumber)) {
      Swal.fire("Error", "Por favor ingresa un número válido para el precio.", "error");
      return;
    }

    let res;
    let wasCreated = false;

    try {
      // Intentar actualizar
      res = await apiRef.current?.subscription.update(1, { price: priceNumber });
    } catch (err) {
      console.warn("Fallo update, intento crear...", err);
      // Si falla, intentar crearla
      res = await apiRef.current?.subscription.create({ price: priceNumber });
      wasCreated = true;
    }
      console.log("Res: ", res);
      
    if (res && Array.isArray(res) && res.length > 0 && res[0].price !== undefined) {
    setSubscriptionPrice(res[0].price.toString());

      Swal.fire(
        "Success",
        wasCreated
          ? `Suscripción creada con éxito al valor de $${priceNumber.toFixed(2)}`
          : "Suscripción actualizada con éxito.",
        "success"
      );
    } else {
      Swal.fire("Error", "No se pudo guardar la suscripción.", "error");
    }
  } catch (error) {
    Swal.fire("Error", "Error al guardar la suscripción.", "error");
    console.error("Error en saveChanges:", error);
  }
};

    useEffect(() => {
        const fetchData = async () => {
            apiRef.current = new BaseApi(); // sin token

            const token = localStorage.getItem('token');
            if (token) {
                apiRef.current = new BaseApi(token);
            }

            const res = await apiRef.current?.subscription.getOne();
            if (res) {
                setSubscriptionPrice(res.price.toString());
            } else {
                Swal.fire("Error", "No se pudo obtener el precio de la suscripción.", "error");
            }
        }
        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center gap-4 subscription-panel">
            <h1 className="text-4xl font-bold text-center">Precio suscripción</h1>
            <label className="text-lg">
                Precio:
                <Input
                    name="price"
                    value={subscriptionPrice}
                    onChange={handlePriceChange}
                    className="ml-2"
                    type="number"
                    step="0.01"
                    min="0"
                />
            </label>
            <Button className={styles.botonEditar} onClick={saveChanges}>
                Guardar
            </Button>
        </div>
    );
}
