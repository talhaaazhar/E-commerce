// import React , {useState} from "react"; 
// import { MOCK_CART } from "../services/mockCart";

// export function useCart() {

//     const [cart, setCart] = useState(MOCK_CART);

//     const addToCart = (product, qnty=1) => {

//         setCart(prev=>{
//             const existing=prev.find (item=>item.productId===product.id);
//             if(existing){
//                 return prev.map(item=>
//                     item.productId===product.id 
//                     ? {...item, quantity: item.quantity + qnty} : item
//                 );
//             }
//             return [...prev, {...product, quantity: qnty}];
            
//         });

  
// }

//       const removeFromCart = (productId) => {
//         setCart(prev=>prev.filter(item=>item.productId!==productId));
//     };

//     const updateQuantity = (productId, qnty) => {
//         setCart(prev=>prev.map(item=>
//             item.productId===productId ? {...item, quantity:qnty} : item
//         ));
//     }

//     const getTotal = () => {
//         return cart.reduce((sum, item)=>{
//             const priceafterSale=item.sale? item.price*(1-item.sale/100): item.price;
//             return sum + priceafterSale * item.quantity;
//         })    
//     }
//   return { cart, addToCart, removeFromCart, updateQuantity, getTotal };
// }
