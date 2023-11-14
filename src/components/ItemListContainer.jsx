import { useState } from 'react';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import { ItemList } from './ItemList';
import {getFirestore,query, where, getDocs,collection, orderBy} from "firebase/firestore" ;

export function ItemListContainer () {
    const [loading, setLoading] = useState([])
    const [maxPrice, setMaxPrice] = useState(150)
    const [products, setProducts] = useState([])
    const {category} = useParams()
    const handleChangeMaxPrice = (e => setMaxPrice(e.target.value))

    useEffect(() =>{
        setLoading(true)
        const db = getFirestore()
        let queryCollection = collection(db, "products")
        //hayq ue ordenar por precio
        if(category){queryCollection = query(queryCollection,where("category","==",category), orderBy("price"))}
        getDocs(queryCollection)
        .then(response => 
            setProducts(response.docs.filter(item => item.data().price <= maxPrice)
                                     .map(item=>({id:item.id, ...item.data()}))
                        )
        )
        .finally(setLoading(false))
    }, [category, maxPrice])
    return (
        <>
        <Container>
        <label htmlFor="precio"> Price  </label>
            <input
                type="range"
                min={0}
                max={150}
                defaultValue={maxPrice}
                onChange={handleChangeMaxPrice}
            />
            <span className="filtroPrecio">{maxPrice}</span>
            {
                loading?
                <span>Loading...</span>
                :
                <div style={{display: "flex", flexWrap: "wrap"}}>
                <ItemList products={products}></ItemList>
                </div>
            }
            </Container>
        </>
    )
}
