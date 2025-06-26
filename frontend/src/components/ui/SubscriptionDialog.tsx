'use client';

interface SubscriptionDialogProps {
  onClose: () => void;
  buyDate: string;
  expiryDate: string;
}

export default function SubscriptionDialog({ onClose, buyDate, expiryDate }: SubscriptionDialogProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Detalles de tu Suscripción</h2>
        <div className="space-y-4">
          <p><span className="font-semibold">Fecha de compra:</span> {buyDate}</p>
          <p><span className="font-semibold">Fecha de expiración:</span> {expiryDate}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}