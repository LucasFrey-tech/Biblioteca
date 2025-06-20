import { useRouter } from 'next/navigation';
import Styles from './styles.module.css'

export interface BookCardProps {
    id: number
    title: string;
    writer: string;
    img: string;
}

export default function BookCardWithColumnInfo({id, title,writer,img}:BookCardProps): React.JSX.Element {
    const router = useRouter();
    return (
        <div className={Styles.bookCard} onClick={() => router.push(`/book/${id}`)}>
            <img src={img} alt="Libro 1" className={Styles.bookImage} />
            <p className={Styles.bookTitle}>
                {title}
            </p>
            <p className={Styles.bookWriter}>
                {writer}
            </p>
        </div>
    )
}