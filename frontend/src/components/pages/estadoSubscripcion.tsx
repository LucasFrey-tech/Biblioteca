'use client';

import { useUser } from '@/app/context/UserContext';
import { UserSubscriptionAPI } from '@/API/class/userSubscription';
import Swal from 'sweetalert2';
import { Subscription } from '@/API/class/subscription';

interface Props {
    onSubscriptionConfirmed: (startDate: string, endDate: string) => void;
}

export default function SubscriptionHandler({ onSubscriptionConfirmed }: Props) {
    const { user, refreshUser } = useUser();

    const handleSubscription = async () => {
        try {
            if (!user) return;

            const api = new UserSubscriptionAPI(localStorage.getItem('token') || '');
            const subApi = new Subscription(localStorage.getItem('token') || '');
            const userId = user.sub;

            const resSub = await subApi.getOne();

            const res = await api.getOneByUser(userId);
            console.log(user)
            console.log("SUBBBBBBBBBBBBBBBBB:", res);
            console.log(resSub)
            const subscription = Array.isArray(res) ? res[0] : res;

            const price = resSub.price;

            if (subscription?.ongoing) {
                const startDate = new Date(subscription.startDate).toLocaleDateString('es-AR');
                const endDate = new Date(subscription.endDate).toLocaleDateString('es-AR');
                onSubscriptionConfirmed(startDate, endDate);
            } else {
                const result = await Swal.fire({
                    title: 'No tienes suscripción 🥲',
                    icon: 'question',
                    html: `<h1>¡Hola ${user.username}, deseas comprar una por 1 mes al valor de $ ${price}</h1>`,
                    showCloseButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Comprar',
                    cancelButtonText: 'Cancelar',
                });

                if (result.isConfirmed) {
                    const now = new Date();
                    const oneMonthLater = new Date(now);
                    oneMonthLater.setMonth(now.getMonth() + 1);

                    // Fechas para la API
                    const startDateISO = now.toISOString();
                    const endDateISO = oneMonthLater.toISOString();

                    if (subscription?.id) {
                        await api.update(subscription.id, {
                            ongoing: true,
                            startDate: startDateISO,
                            endDate: endDateISO,
                        });
                    } else {
                        await api.create({
                            user: userId,
                            subscription: subscription?.subscription,
                            ongoing: true,
                            startDate: startDateISO,
                            endDate: endDateISO,
                        });
                    }

                    await Swal.fire({
                        title: '¡Suscripción creada!',
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false,
                    });

                    refreshUser();

                    // Fechas para mostrar
                    const startDate = now.toLocaleDateString('es-AR');
                    const endDate = oneMonthLater.toLocaleDateString('es-AR');

                    onSubscriptionConfirmed(startDate, endDate);
                }
            }
        } catch (error) {
            console.error('Error al manejar suscripción:', error);
            Swal.fire('Error', 'Ocurrió un error al verificar tu suscripción.', 'error');
        }
    };

    return (
        <button onClick={handleSubscription}>Administrar suscripción</button>
    );
}
