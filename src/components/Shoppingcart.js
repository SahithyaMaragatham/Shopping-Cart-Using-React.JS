import React, { useReducer } from "react";
import "./ShoppingCart.css"; 

import chocoCake from "../assets/chocolate-cake.png";
import StrawberryCake from "../assets/sponge-cake-with-strawberries.png";
import FruitCake from "../assets/dessert-fruitcake.png";
import ChocoTruffleCake from "../assets/front-view-delicious-chocolate-cake.png";
import BlackForest from "../assets/black-forest-cakes.png";
import DoubleChocoCake from "../assets/birthday-cake.png";

const initialState = {
  cart: []
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, cart: updatedCart };
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id)
      };

    default:
      return state;
  }
};

const ShoppingCart = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const products = [
    { id: 1, name: "Chocolate Cake", price: 100, image: chocoCake },
    { id: 2, name: "Strawberry cake", price: 180, image: StrawberryCake },
    { id: 3, name: "Fruit Cake", price: 150, image: FruitCake },
    { id: 4, name: "Choco Truffle Cake", price: 150, image: ChocoTruffleCake },
    { id: 5, name: "Black Forest", price: 120, image: BlackForest},
    { id: 6, name: "Double Chocolate Cake", price: 200, image: DoubleChocoCake },
  ];

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: 1 } });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const totalPrice = state.cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="body">
    <div className="shopping-cart-container" >
      <h1 style={{textAlign:"center",padding:"20px"}}>SHOPPING CART</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <button onClick={() => addItem(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <h3>Cart Items</h3>
      <ul className="cart-list">
        {state.cart.map((item) => (
          <li key={item.id}>
            <img src={item.image} alt={item.name} />
            {item.name} - Quantity: {item.quantity} - Price: ₹{item.price}
            <div>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                +
              </button>
              <button
                onClick={() =>
                  updateQuantity(item.id, item.quantity > 1 ? item.quantity - 1 : 1)
                }
              >
                -
              </button>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total Price: ₹{totalPrice}</h3>
    </div>
    </div>
  );
};

export default ShoppingCart;
