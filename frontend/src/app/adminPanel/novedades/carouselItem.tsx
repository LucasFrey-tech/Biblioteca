import { Label } from "@radix-ui/react-label";
import BookSelector from "./bookSelector";


export default function CarouselItem(): React.JSX.Element {

    return(
        <>
            <Label>Libro</Label>
            <BookSelector/>
            <Label>Imagen</Label>
        </>
    )
}