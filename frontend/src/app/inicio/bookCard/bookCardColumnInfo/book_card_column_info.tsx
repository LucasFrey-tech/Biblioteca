import Styles from './styles.module.css'

export interface BookCardProps {
    title: string;
    writer: string;
    img: string;
}

export default function BookCardWithColumnInfo({title,writer,img}:BookCardProps): React.JSX.Element {
    return (
        <div className={Styles.bookCard}>
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