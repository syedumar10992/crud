import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { QuerySnapshot, Timestamp, query, addDoc, collection, onSnapshot, orderBy, setDoc, deleteDoc, doc } from 'firebase/firestore';
import { fireDb } from '../../../firebase/Firebase';


function MyState(props) {
    const [products, setProducts] = useState({
        title : "",
        price : "",
        imageUrl : "",
        category : "",
        time : Timestamp.now(),
        date : new Date().toLocaleString(
            "en-US",
            {
                month:"short",
                day: "2-digit",
                year : "numeric",
            }
        )
        
    });

// Add Product Function
const addProduct = async () => {
    if (products.title == "" || products.price == "" || products.imageUrl == "" || products.category == ""){
        return alert('all fields are required');
    }

    // product Reference
    const productRef = collection(fireDb, "products")

    try{
        await addDoc(productRef, products,)
        getProducts();
        alert ("Product added successfully")
        setTimeout (() => {
            window.location.href = '/';
        }, 1000);
        setProducts("")
    } catch (error) {
      console.log(error)
    }
}

const [allProducts, setAllProducts] = useState([]);

// Get Products Function
const getProducts = async () => {
    try {
        const q = query(
            collection(fireDb, 'products'),
            orderBy('time'),
        );

        const data = onSnapshot(q, (QuerySnapshot) => {
            let productsArray = [];

            QuerySnapshot.forEach((doc) => {
                productsArray.push({ ...doc.data(), id: doc.id});
            });
            setAllProducts(productsArray)
        });

        return () => data;

    } catch (error) {
      console.log(error)
    }
}

// Edit Product Function

const editProductHandle = ( item ) => {
    setProducts(item)
}

// Edit Handle Function

const editProduct = async () =>{
    try {
        await setDoc(doc(fireDb, 'products', products.id), products);
        getProducts();
        alert("Product updated Successgfully");
        setTimeout(() => {
            window.location.href = '/';
        }, 800);
        setProducts("");
    } catch (error) {
      console.log(error)  
    }
}

// Delete product function
const deleteProduct = async (item) => {
    try {
        await deleteDoc(doc(fireDb, 'products', item.id));
        getProducts();
        alert('produc deleted successfully');
    } catch (error) {
        console.log(error)        
    }
}


// Search
const [search, setSearch] = useState("");


useEffect(() => {
    getProducts();
}, []);

    return (
        <MyContext.Provider value = {{products, setProducts, addProduct, allProducts, 
        editProductHandle, editProduct, deleteProduct, search, setSearch}} >
        {props.children}
        </MyContext.Provider>
    )
    }


export default MyState