// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     // Fetch the authenticated user on component mount
//     useEffect(() => {
//         const fetchUser = async () => {
//             const token = localStorage.getItem("token");
//             if (token) {
//                 try {
//                     const response = await axios.get('http://localhost:8889/api/auth/me', {
//                         headers: { Authorization: `Bearer ${token}` },
//                     });
//                     setUser(response.data); // Assuming response.data contains the user object
//                 } catch (error) {
//                     console.error("Failed to fetch user:", error);
//                 }
//             }
//         };
//         fetchUser();
//     }, []);

//     return (
//         <AuthContext.Provider value={{ user, setUser }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
