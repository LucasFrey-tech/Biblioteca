/**
 * NO TIENE USO
 */

// 'use client';

// import { useUser } from '@/app/context/UserContext';
// import { UserSubscriptionAPI } from '@/API/class/userSubscription';
// import Swal from 'sweetalert2';
// import { Subscription } from '@/API/class/subscription';
// import { UserSubscriptionDTO } from '@/API/types/userSubscription';

// interface Props {
//   onSubscriptionConfirmed: (startDate: string, endDate: string) => void;
// }

// export default function SubscriptionHandler({ onSubscriptionConfirmed }: Props) {
//   const { user, refreshUser } = useUser();

//   const handleSubscription = async () => {
//     try {
//       if (!user) return;

//       const api = new UserSubscriptionAPI(localStorage.getItem('token') || '');
//       const subApi = new Subscription(localStorage.getItem('token') || '');
//       const userId = user.sub;

//       const resSub = await subApi.getOne();
//       const price = resSub.price;

//       let subscription: UserSubscriptionDTO | null = null;

//       try {
//         subscription = await api.getOneByUser(userId);
//       } catch {
//         subscription = null; // No existe aún
//       }

//       const isActive =
//         subscription &&
//         subscription.ongoing &&
//         new Date(subscription.endDate) > new Date();

//       if (isActive && subscription) {
//         const startDate = new Date(subscription.startDate).toLocaleDateString('es-AR');
//         const endDate = new Date(subscription.endDate).toLocaleDateString('es-AR');
//         onSubscriptionConfirmed(startDate, endDate);
//         return;
//       }

//       // ✅ Si no está activa o no existe
//       const result = await Swal.fire({
//         title: 'No tienes suscripción 🥲',
//         icon: 'question',
//         html: `<h1>¡Hola ${user.username}, deseas comprar una por 1 mes al valor de $ ${price}</h1>`,
//         showCloseButton: true,
//         showCancelButton: true,
//         confirmButtonText: 'Comprar',
//         cancelButtonText: 'Cancelar',
//       });

//       if (!result.isConfirmed) return;

//       const now = new Date();
//       const oneMonthLater = new Date();
//       oneMonthLater.setMonth(now.getMonth() + 1);

//       const startDateISO = now.toISOString();
//       const endDateISO = oneMonthLater.toISOString();

//       if (subscription?.id) {
//         await api.update(subscription.id, {
//           ongoing: true,
//           startDate: startDateISO,
//           endDate: endDateISO,
//         });
//       } else {
//         await api.create({
//         userId: userId, 
//         startDate: startDateISO,
//         endDate: endDateISO,
//         });
//       }

//       await Swal.fire({
//         title: '¡Suscripción creada!',
//         icon: 'success',
//         timer: 1000,
//         showConfirmButton: false,
//       });

//       refreshUser();

//       const startDate = now.toLocaleDateString('es-AR');
//       const endDate = oneMonthLater.toLocaleDateString('es-AR');
//       onSubscriptionConfirmed(startDate, endDate);
//     } catch (error) {
//       console.error('Error al manejar suscripción:', error);
//       Swal.fire('Error', 'Ocurrió un error al verificar tu suscripción.', 'error');
//     }
//   };

//   return <button onClick={handleSubscription}>Administrar suscripción</button>;
// }
