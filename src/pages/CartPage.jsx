import { selectItemFromCart } from '@/slices/cartSlice'
import React from 'react'
import { useSelector } from 'react-redux'

const CartPage = () => {
  //cart from slice
  const cartItems = useSelector(selectItemFromCart);
  // console.log("cartItems",cartItems);
  return (
    <div className='CartPage'>
      <h3>Cart Page</h3> 
      <div className="cart-items  flex flex-wrap justify-center gap-4 p-4">
        {cartItems.map((item) => (
          console.log(item),
          <div key={item.dish.id} className='cart-item card w-72 h-auto  p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer '>
            <img src={item.dish.image} alt={item.dish.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h4 className="text-lg font-semibold text-center text-gray-800">
                  {item.dish.name}
                </h4>
                <p className="text-center text-gray-600">{item.dish.price}</p>
            <p className = "text-center text-gray-600">Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CartPage
