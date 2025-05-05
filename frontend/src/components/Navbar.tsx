import Link from "next/link";
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <Link href="/" className={styles.logo}>
                Biblioteca
            </Link>
            <ul className={styles.navList}>
                <li>
                    <Link href="/books">Books</Link>
                </li>
                <li>
                    <Link href="/cart">Cart</Link>
                </li>
                <li>
                    <Link href="/login">Login</Link>
                </li>
                <li>
                    <Link href="/register">Register</Link>
                </li>
            </ul>
        </nav>
    );
}