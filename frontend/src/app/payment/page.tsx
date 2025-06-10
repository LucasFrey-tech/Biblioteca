'use client'

import styles from '../../styles/payment.module.css';

export default function PaymentPage() {
  const handlePayment = () => {
    // Lógica para procesar el pago (puedes integrar con el backend aquí)
    console.log('Payment processed');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="/estore-logo.png" alt="eStore Logo" className={styles.logo} />
        <span className={styles.testMode}>TEST MODE</span>
      </div>
      <div className={styles.paymentBox}>
        <div className={styles.paymentSummary}>
          <h2>Pay</h2>
          <p className={styles.amount}>$70.00</p>
          <div className={styles.item}>
            <span>Smart Watch Ultra Amoled Display</span>
            <span>$70.00</span>
          </div>
          <div className={styles.item}>
            <span>Subtotal</span>
            <span>$70.00</span>
          </div>
          <div className={styles.item}>
            <span>Tax</span>
            <span>$0.00</span>
          </div>
          <div className={styles.item}>
            <span>Total due</span>
            <span>$70.00</span>
          </div>
        </div>
        <div className={styles.paymentForm}>
          <input type="email" placeholder="Email" className={styles.input} />
          <input
            type="text"
            placeholder="Delivery Location"
            className={styles.input}
          />
          <div className={styles.cardInfo}>
            <input
              type="text"
              placeholder="1234 1234 1234 1234"
              className={styles.input}
            />
            <select className={styles.select}>
              <option value="MM/YY">MM/YY</option>
            </select>
            <input type="text" placeholder="CVC" className={styles.input} />
          </div>
          <input
            type="text"
            placeholder="Full name on card"
            className={styles.input}
          />
          <select className={styles.select}>
            <option value="Nepal">Nepal</option>
          </select>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.checkbox} />
            Securely save my information for 1-click checkout
          </label>
          <p className={styles.saveInfo}>Pay faster on this site and everywhere Link is accepted.</p>
          <button onClick={handlePayment} className={styles.payButton}>
            Pay
          </button>
          <button className={styles.cancelButton}>Cancel Payment</button>
        </div>
      </div>
    </div>
  );
}