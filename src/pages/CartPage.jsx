import { selectItemFromCart } from '@/slices/cartSlice';
import React from 'react';
import { useSelector } from 'react-redux';

const CartPage = () => {
  // Retrieve cart items from Redux store
  const cartItems = useSelector(selectItemFromCart);

  return (
    <div className="CartPage">
      <h3 className="text-2xl font-bold text-center mb-6">Cart Page</h3>
      <div className="cart-items flex flex-wrap justify-center gap-4 p-4">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => 
            item.dish && (
              <div
                key={item.dish.id || `cart-item-${index}`} // Fallback to index if id is not available
                className="cart-item card w-72 h-auto p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                <img
                  src={item.dish.image}
                  alt={item.dish.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h4 className="text-lg font-semibold text-center text-gray-800">
                  {item.dish.name}
                </h4>
                <p className="text-center text-gray-600">{item.dish.price}</p>
                <p className="text-center text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>
            )
          )
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
