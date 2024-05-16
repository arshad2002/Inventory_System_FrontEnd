import React from "react";

export default function OrderCard({
  data,
  handleDeleteOrder,
}: {
  data: any;
  handleDeleteOrder: any;
}) {
  return (
    <div className="card w-50 bg-base-100 border border-black shadow-xl">
      <div className="card-body">
        <h2 className="card-title">ID: {data.id}</h2>
        <div>
          Customer ID: {data.customerId}
          <br/>
          Customer Name: {data.customerName}
          <h3>Ordered Products:</h3>
          {data.productList && data.productList.length > 0 && (
            <table style={{ border: "1px solid black" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid black" }}>Products</th>
                  <th style={{ border: "1px solid black" }}>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {data.productList.map((product: any, index: number) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid black" }}>
                      {product.productName}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {product.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <hr />
          Total Amount: {data.totalAmount}
        </div>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleDeleteOrder(data.id)}
            className="btn btn-error btn-sm rounded-full"
          >
            Delete
          </button>
          <br />
        </div>
      </div>
    </div>
  );
}
