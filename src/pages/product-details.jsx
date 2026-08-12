import { useParams } from "react-router"
import { useGetProductByIdQuery } from "../products-api";

export function ProductDetails() {
    const params = useParams();
    const { data, isLoading, isError, error } = useGetProductByIdQuery(params.productId);

    if (isLoading) return <p>Загрузка...</p>;
    if (isError) return <p>Ошибка: {error.status}</p>;

    return (
        <div>
            {data.title}
            {data.description}
            {data.price}
        </div>
    )
}