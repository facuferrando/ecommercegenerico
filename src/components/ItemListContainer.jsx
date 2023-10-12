import { useState } from 'react';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import { ItemList } from './ItemList';
import {getFirestore,query, where, getDocs,collection} from "firebase/firestore" ;

export const ItemListContainer = props => {
    const [minPrice,setMinPrice] = useState(0)
    const [products, setProducts] = useState ([]); 
    const{id}=useParams();
    const db = getFirestore()  
    const handleChangeMinPrice = (event) =>{
        setMinPrice(event.target.value)
    
}
    const [filtro,setFiltro] = useState([])
    useEffect (()=>{ 
        
        let refCollection={};
        if (!id){refCollection=collection(db, "products")}
        else{refCollection=query(collection(db, "products"), where("category","==",id))}
       
        getDocs(refCollection)
        .then (snapshot=>{
            if(snapshot.size===0) console.log("no results")
            else {
                setFiltro(
                    snapshot.docs.map(doc=>({
                        id:doc.id, ...doc.data(),
                    }))
                )
               
                // const filter = products.filter (product => product.price >= 10)
                // setProducts(filter)
            }
                })
                .finally(()=>{
                    setProducts(filtro.filter((item)=>item.price>=minPrice))
                })

 }, [id, products]);
                
   console.log(products)
   console.log(filtro)
    return (
    <Container> 
    <h3>Esto es un filtro</h3>
    <label htmlFor="precio">Price</label>
    <input
    type="range"
    min={0}
    max={150}
    id="precioRango"
    onChange={handleChangeMinPrice}
    />
    <span className="filtroPrecio">{minPrice}</span>
    <h1>{props.greeting} </h1>
    <div style={{display: "flex", flexWrap: "wrap"}}>
    <ItemList products={products}></ItemList>
    </div>
   
    </Container>)
};
