import { Link } from "react-router";
import { useGetProductsQuery } from "../products-api";

export function Products() {
    const { data, isLoading, isError, error } = useGetProductsQuery();

    if (isLoading) return <p>Загрузка...</p>;
    if (isError) return <p>Ошибка: {error.status}</p>;

    return (
        <div>
            {data.products.map((product) => (
                <div key={product.id}>
                    <Link to={`/products/${product.id}`}>{product.title}</Link>
                </div>
            ))}
        </div>
    )
}
