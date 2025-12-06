export const OrderSummary = ({ cartItems, SubTotal }) => (
    <>
        <div className="pb-3">
            {cartItems?.items?.map((item, index) => (
                <div
                    key={`${item.product._id}-${index}`}
                    className="d-flex justify-content-between py-2 border-bottom"
                >
                    <p className="m-0 text-truncate" style={{ width: "100px" }}>
                        {item.product.name}
                    </p>
                    <p className="m-0">${item.product.price * item.quantity}</p>
                    <p className="m-0">{item.quantity}</p>
                </div>
            ))}
        </div>
        <div className="border-bottom pt-3 pb-2">
            <div className="d-flex justify-content-between">
                <h6>Subtotal</h6>
                <h6>${SubTotal}</h6>
            </div>
            <div className="d-flex justify-content-between">
                <h6>Shipping</h6>
                <h6>$10</h6>
            </div>
        </div>
        <div className="pt-2">
            <div className="d-flex justify-content-between">
                <h5>Total</h5>
                <h5>${SubTotal + 10}</h5>
            </div>
        </div>
    </>
);
