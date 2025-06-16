import Styles from "./styles.module.css";

export default function ReturnButton(link:string, content:string):React.JSX.Element{
    return(
        <a className={Styles.returnButton} href={link}>{content}</a>
    )
}