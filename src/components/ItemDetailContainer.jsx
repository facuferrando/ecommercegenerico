import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import { ItemDetail } from "./ItemDetail";
import {getFirestore,getDoc, doc} from "firebase/firestore" ;

export const ItemDetailContainer=(props)=>
{
    const [product, setProduct]=useState([]);
    const {id}=useParams();
    
    useEffect(()=>{
                    
        const db = getFirestore();

        const refDoc = doc(db, "products",id);
    
        getDoc(refDoc).then((snapshot) => {
          setProduct({ id: snapshot.id, ...snapshot.data() });
        });



      }, [id]); 
   
    return (

        <Container className="mt-4" >
        <h1>Detalle</h1>
        <ItemDetail product={product}></ItemDetail>
        </Container>

    )
}
export default ItemDetailContainer;