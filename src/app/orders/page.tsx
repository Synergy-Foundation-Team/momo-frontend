// 'use client';

// import { useOrders } from '@/hooks/useOrders';
// import { useState } from 'react';
// import { CreateOrderDto, OrderStatus } from '@/types/order';

// export default function OrdersPage() {
//   const { orders, loading, error, createOrder, updateOrder, makeDeliver, deleteOrder } = useOrders();
//   const [newOrderItems, setNewOrderItems] = useState([{ productId: '', quantity: 1, price: 0 }]);

//   const handleCreateOrder = async () => {
//     const orderData: CreateOrderDto = {
//       userId: 'user123', // Replace with actual user ID
//       items: newOrderItems,
//     };

//     const response = await createOrder(orderData);
//     if (response.success) {
//       setNewOrderItems([{ productId: '', quantity: 1, price: 0 }]);
//     }
//   };

//   // const handleUpdateStatus = async (orderId: string, status: OrderStatus) => {
//   //   await updateOrder({ id: orderId, status });
//   // };

//   const handleMakeDeliver = async (orderId: string) => {
//     await makeDeliver(orderId);
//   };

//   const handleDeleteOrder = async (orderId: string) => {
//     await deleteOrder(orderId);
//   };

//   if (error) {
//     return <div className="text-red-500">Error: {error}</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Orders Management</h1>

//       {/* Create Order Form */}
//       <div className="mb-8 p-4 border rounded">
//         <h2 className="text-xl font-semibold mb-4">Create New Order</h2>
//         {newOrderItems.map((item, index) => (
//           <div key={index} className="flex gap-4 mb-2">
//             <input
//               type="text"
//               placeholder="Product ID"
//               value={item.productId}
//               onChange={(e) => {
//                 const updatedItems = [...newOrderItems];
//                 updatedItems[index].productId = e.target.value;
//                 setNewOrderItems(updatedItems);
//               }}
//               className="border p-2 rounded"
//             />
//             <input
//               type="number"
//               placeholder="Quantity"
//               value={item.quantity}
//               onChange={(e) => {
//                 const updatedItems = [...newOrderItems];
//                 updatedItems[index].quantity = parseInt(e.target.value);
//                 setNewOrderItems(updatedItems);
//               }}
//               className="border p-2 rounded"
//             />
//             <input
//               type="number"
//               placeholder="Price"
//               value={item.price}
//               onChange={(e) => {
//                 const updatedItems = [...newOrderItems];
//                 updatedItems[index].price = parseFloat(e.target.value);
//                 setNewOrderItems(updatedItems);
//               }}
//               className="border p-2 rounded"
//             />
//           </div>
//         ))}
//         <button
//           onClick={() => setNewOrderItems([...newOrderItems, { productId: '', quantity: 1, price: 0 }])}
//           className="bg-gray-200 px-4 py-2 rounded mr-2"
//         >
//           Add Item
//         </button>
//         <button
//           onClick={handleCreateOrder}
//           disabled={loading}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Create Order
//         </button>
//       </div>

//       {/* Orders List */}
//       <div className="grid gap-4">
//         {orders.map((order) => (
//           <div key={order.id} className="border p-4 rounded">
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h3 className="font-semibold">Order ID: {order.id}</h3>
//                 <p>Status: {order.status}</p>
//                 <p>Total: ${order.total}</p>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleMakeDeliver(order.id)}
//                   disabled={order.status !== OrderStatus.CONFIRMED}
//                   className="bg-green-500 text-white px-3 py-1 rounded"
//                 >
//                   Make Deliver
//                 </button>
//                 <button
//                   onClick={() => handleDeleteOrder(order.id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//             <div className="grid gap-2">
//               {order.items.map((item) => (
//                 <div key={item.id} className="bg-gray-50 p-2 rounded">
//                   <p>Product: {item.productId}</p>
//                   <p>Quantity: {item.quantity}</p>
//                   <p>Price: ${item.price}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
