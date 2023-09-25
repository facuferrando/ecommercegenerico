import { useContext } from "react";
import { ItemCount } from "./ItemCount";
import { CartContext } from "../contexts/CartContext";




export const ItemDetail=({product})=>{

    const {addItem,removeItem, clear} = useContext(CartContext)
    const onAdd = count => addItem (product, count)   
    return (
        <div>
        <h2>{product.name}
        </h2>
        <h4>{product.category}</h4>
        <img src={product.avatar} alt=""/>
        <h4> Price per unit: ${product.price}</h4>
        <h4> Stock: {product.stock} </h4>
        <ItemCount stock ={product.stock} onAdd={onAdd} />
        <button onClick={()=> removeItem(product.id)} > Borrar este elemento </button>
        <button onClick ={()=> clear()}> Limpiar carrito </button>
        </div>
    )
}