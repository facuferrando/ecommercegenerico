import { useState } from 'react';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import { ItemList } from './ItemList';
import {getFirestore,query, where, getDocs,collection} from "firebase/firestore" ;
export const ItemListContainer = props => {

    const [products, setProducts] = useState ([]); 
    const{id}=useParams();
    const db = getFirestore()   
    useEffect (()=>{ 

        let refCollection={};
        if (!id){refCollection=collection(db, "products")}
        else{refCollection=query(collection(db, "products"), where("category","==",id))}

        getDocs(refCollection).then (snapshot=>{
            if(snapshot.size===0) console.log("no results")
            else {
                setProducts(
                    snapshot.docs.map(doc=>({
                        id:doc.id, ...doc.data(),
                    }))
                )
            }
        })        
 }, [id,db]);
                

    console.log(id)
    console.log(products)
    
 

    return (
    <Container> 
    <h1>{props.greeting} </h1>
    <div style={{display: "flex", flexWrap: "wrap"}}>
    <ItemList products={products}></ItemList>
    </div>
   
    </Container>)
};
