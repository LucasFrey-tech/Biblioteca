import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type Props = {
  rating: number;
};

export default function StarRating({ rating }: Props) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} color="#FFD700" />); // estrella llena
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} color="#FFD700" />); // media estrella
    } else {
      stars.push(<FaRegStar key={i} color="#FFD700" />); // estrella vacía
    }
  }

  return <div style={{ display: "flex", gap: "4px" }}>{stars}</div>;
}