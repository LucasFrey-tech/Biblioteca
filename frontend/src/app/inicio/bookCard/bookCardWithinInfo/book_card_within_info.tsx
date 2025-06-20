import Styles from './styles.module.css'
import { useRouter } from 'next/navigation';

export interface BookCardProps {
    bookId: number;
    title: string;
    writer: string;
    img: string;
}

export default function BookCardWithWithinInfo({ bookId, img }: BookCardProps): React.JSX.Element {
    const router = useRouter();

    return (
        <div className={Styles.bookCard} onClick={() => router.push(`/book/${bookId}`)}>
            <img src={img} alt="Libro 1" className={Styles.bookImage} />
        </div>
    )
}