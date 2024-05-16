import Link from 'next/link';
import productim from '../../../public/box.png';
import Image from "next/image";
export default function ProductCard({
  data,
  handleDeleteProduct,
}: {
  data: any;
  handleDeleteProduct: any;
}) {
  return (
    <>
      <div className="card w-50 border border-black bg-base-100 shadow-xl">
        <figure className="figure-container">
          <Image src={productim} alt="Profile" className="image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">ID: {data.id}</h2>
          Name: {data.name}
          <br />
          ID: {data.id}
          <br />
          Selling Price: {data.sellprice}
          <br />
          Purchase Price: {data.purprice}
          <br />
          Category: {data.ctg}
          <br />
          Quantity: {data.qty}
          <br />
          <div className="card-actions justify-end">
            <Link href={`/admin/product/${data.id}`}>
              <button className="btn btn-warning rounded-full">Update</button>
            </Link>{" "}
            <button
              onClick={() => handleDeleteProduct(data.id)}
              className="btn btn-error rounded-full"
            >
              Delete
            </button>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
