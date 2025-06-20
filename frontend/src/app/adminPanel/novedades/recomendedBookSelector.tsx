import React, { useEffect, useRef, useState } from "react";
import { Label } from "@radix-ui/react-label";
import BookSelector from "./bookSelector";

export default function RecomendedBookSelector(props:{index:number}): React.JSX.Element {
    return (
        <>
            <Label>{"libro "+props.index}</Label>
            <BookSelector/>
            <hr/>
        </>
    )
}