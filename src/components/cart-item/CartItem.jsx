import "./cartitem.css";

const CartItem = ({ cartItem }) => {
  const { img, ar, termeknev, db } = cartItem;

  return (
    <div className="cart-item-container">
      <img src={img} alt={`${termeknev}`} />
      <div className="item-details">
        <span className="name">{termeknev}</span>
        <span className="price">
          {db} x {ar} Ft
        </span>
      </div>
    </div>
  );
};

export default CartItem;
