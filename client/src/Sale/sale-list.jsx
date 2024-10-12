// //author: Harini chamathka
// // Path: client/src/Sale/sale-list.jsx

// import React, { useEffect, useState } from "react";
// import "../Styles/sale.css";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import SideBarMenu from "../Components/SideBarMenu";
// import { createAPIEndpoint, ENDPOINTS } from "../Api/index";

// const Sale = () => {
//   const [sales, setSales] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await createAPIEndpoint(ENDPOINTS.PRODUCT).fetchAll();
//         setSales(response.data);
//       } catch (error) {
//         console.log("Error while fetching data", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const deleteSale = async Id => {
//     await axios
//       .delete(`api/Sale`)
//       .then(response => {
//         setSales(prevSale => prevSale.filter(sale => sale._id !== Id));
//         toast.success(response.data.message, { position: "top-right" });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   return (
//     <div>
//       <SideBarMenu />
//       <div className="saleTable">
//         <Link to="/add-sale" type="button" className="addBtn">
//           Add Sale <i class="bi bi-plus-circle-fill" />
//         </Link>

//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th scope="col">No.</th>
//               <th scope="col">Name</th>
//               <th scope="col">Description</th>
//               <th scope="col">Price</th>
//               <th scope="col">Rating</th>
//               <th scope="col">Category</th>
//               <th scope="col">Stock</th>
//               <th scope="col">Vendor</th>
//               <th scope="col">Status</th>
//               <th scope="col">Image</th>
//               <th scope="col">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sales.map((sale, index) => {
//               return (
//                 <tr>
//                   <td>
//                     {index + 1}
//                   </td>
//                   <td>
//                     {sale.saleName}
//                   </td>
//                   <td>
//                     {sale.saleDescription}
//                   </td>
//                   <td>
//                     {sale.salePrice}
//                   </td>
//                   <td>
//                     {sale.saleRating}
//                   </td>
//                   <td>
//                     {sale.categoryName}
//                   </td>
//                   <td>
//                     {sale.saleStock}
//                   </td>
//                   <td>
//                     {sale.vendorName}
//                   </td>
//                   <td>
//                     {sale.isActive ? "Active" : "Inactive"}
//                   </td>
//                   <td>
//                     {sale.saleImage}
//                   </td>
//                   <td className="actionButtons">
//                     <Link
//                       to={`/update-sale`}
//                       type="button"
//                       class="btn btn-info"
//                     >
//                       <i class="bi bi-pencil-square" />
//                     </Link>

//                     <button
//                       onClick={() => deleteSale(sale._id)}
//                       type="button"
//                       class="btn btn-danger"
//                     >
//                       <i class="bi bi-trash3-fill" />
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Sale;
