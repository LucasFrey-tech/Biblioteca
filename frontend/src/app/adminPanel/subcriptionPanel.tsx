import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import styles from '../../styles/panelAdmin.module.css';
import Swal from "sweetalert2";
import { BaseApi } from "@/API/baseApi";

export default function SubscriptionPanel(): React.JSX.Element {
  const [subscriptionPrice, setSubscriptionPrice] = useState("1.1");
  const [discount, setDiscount] = useState("0");

  const apiRef = useRef<BaseApi | null>(null);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubscriptionPrice(e.target.value);
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscount(e.target.value);
  };

  const savePriceChanges = async () => {
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
        res = await apiRef.current?.subscription.update(1, { price: priceNumber });
      } catch (err: any) {
        console.warn("Fallo update, intento crear...", err);

        // Si el error fue porque no existe, intento crear
        if (err?.response?.status === 404 || err?.message?.includes("not found")) {
          res = await apiRef.current?.subscription.create({ price: priceNumber });
          wasCreated = true;
        } else {
          throw err;
        }
      }

      // Validar que la respuesta tenga la propiedad price
      if (res && typeof res.price === "number") {
        setSubscriptionPrice(res.price.toString());
        Swal.fire(
          "Éxito",
          wasCreated
            ? `Suscripción creada con éxito al valor de $${priceNumber.toFixed(2)}`
            : "Suscripción actualizada con éxito.",
          "success"
        );
      } else {
        console.warn("Respuesta inesperada del servidor:", res);
        Swal.fire("Error", "La respuesta del servidor fue inválida.", "error");
      }

    } catch (error) {
      console.error("Error en savePriceChanges:", error);
      Swal.fire("Error", "Error inesperado al guardar la suscripción.", "error");
    }
  };


  const saveDiscountChanges = async () => {
    try {
      apiRef.current = new BaseApi();
      const token = localStorage.getItem('token');
      if (token) {
        apiRef.current = new BaseApi(token);
      }

      const discountNumber = parseFloat(discount);
      if (isNaN(discountNumber)) {
        Swal.fire("Error", "Por favor ingresa un número válido para el descuento.", "error");
        return;
      }

      // Primero intentamos actualizar el registro con ID=1
      try {
        const updateRes = await apiRef.current?.userSubscriptionDiscount.update(1, {
          discount: discountNumber
        });

        if (updateRes && updateRes.discount !== undefined) {
          setDiscount(updateRes.discount.toString());
          Swal.fire("Éxito", "Descuento actualizado con éxito.", "success");
          return; // Salimos si la actualización fue exitosa
        }
      } catch (updateError) {
        console.log("No existe el registro, procediendo a crear uno nuevo...");
        // No mostramos error al usuario porque es el flujo esperado
      }

      // Si llegamos aquí es porque el update falló (registro no existe)
      // Entonces creamos el registro con ID=1
      const createRes = await apiRef.current?.userSubscriptionDiscount.create({
        id: 1, // Forzamos el ID=1
        discount: discountNumber
      });

      if (createRes && createRes.discount !== undefined) {
        setDiscount(createRes.discount.toString());
        Swal.fire("Éxito", "Descuento creado con éxito.", "success");
      } else {
        Swal.fire("Error", "No se pudo crear el descuento.", "error");
      }

    } catch (error) {
      console.error("Error en saveDiscountChanges:", error);
      Swal.fire("Error", "Error al guardar el descuento.", "error");
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      apiRef.current = new BaseApi();
      const token = localStorage.getItem('token');
      if (token) {
        apiRef.current = new BaseApi(token);
      }

      try {
        // Fetch subscription price
        const subRes = await apiRef.current?.subscription.getOne();
        if (subRes && subRes.price !== undefined) {
          setSubscriptionPrice(subRes.price.toString());
        } else {
          console.warn("No se pudo obtener el precio de la suscripción.");
        }

        // Fetch discount for the default subscription (id: 1)
        try {
          const discounts = await apiRef.current?.userSubscriptionDiscount.getAll();
          console.log('Fetched discounts:', discounts); // Debug: Verificar descuentos cargados
          const discountRecord = discounts?.find(d => d.id_subscription === 1);
          if (discountRecord) {
            setDiscount(discountRecord.discount.toString());
          }
        } catch (error) {
          console.error("Error al cargar descuentos:", error);
          Swal.fire("Advertencia", "No se pudieron cargar los descuentos. Verifica la conexión con el servidor.", "warning");
        }
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar los datos iniciales. Verifica la conexión con el servidor.", "error");
        console.error("Error en fetchData:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 subscription-panel">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-center">Precio suscripción</h1>
        <label className="text-lg">
          Precio:
          <Input
            name="price"
            value={subscriptionPrice}
            onChange={handlePriceChange}
            className="ml-2"
            type="number"
            step="1.00"
            min="0"
          />
        </label>
        <Button className={styles.botonEditar} onClick={savePriceChanges}>
          Guardar
        </Button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-center">Descuento suscripción</h1>
        <div className="flex flex-col gap-2">
          <label className="text-lg">
            Descuento (%):
            <Input
              name="discount"
              value={discount}
              onChange={handleDiscountChange}
              className="ml-2"
              type="number"
              step="1.00"
              min="0"
              max="100"
            />
          </label>
        </div>
        <Button className={styles.botonEditar} onClick={saveDiscountChanges}>
          Guardar
        </Button>
      </div>
    </div>
  );
}