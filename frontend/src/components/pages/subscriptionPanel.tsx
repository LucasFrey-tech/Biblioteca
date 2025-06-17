'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface SubscriptionDialogProps {
  onClose: () => void;
  buyDate: string;
  expiryDate: string;
}

export default function SubscriptionDialog({ onClose, buyDate, expiryDate }: SubscriptionDialogProps) {
  return (
    <AlertDialog open onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle style={{ textAlign: 'center' }}>
            Información de mi suscripción
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription asChild>
          <div className="space-y-2">
            <div><strong>Día de compra de suscripción: </strong><span className="text-blue-600 font-semibold">{buyDate}</span></div>
            <div><strong>Fecha en la que caduca: </strong><span className="text-red-600 font-semibold">{expiryDate}</span></div>
          </div>
        </AlertDialogDescription>

        <AlertDialogCancel  className="block w-[30%] mx-auto text-sm px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer">Cerrar</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}

