import {createContext, useState } from "react";

export const CartContext = createContext([])
  

export const CartProvider =({children}) => {
    const [items, setItems]= useState([])

    const addItem =(product, quantity)=> {
       
        
        const isInCart = items.some(item => item.id === product.id )
                
        if (!isInCart){
            if(quantity>product.stock){
                alert("No hay stock disponible, pruebe con menor cantidad de " + product.name)}
            else  setItems(prev=>[...prev,{...product, quantity}] )
                        }
       
            else{
                const actualizarCantidades = items.map (item =>{
                    if(quantity+item.quantity>=item.stock){
                        return{
                            ...item,
                            quantity: item.stock,
                        }                        
                    }
                   
                    if (item.id===product.id)
                    return{
                        ...item,
                        quantity: item.quantity + quantity,
                    }
                    else return item;
                })
                setItems(actualizarCantidades)
            }

        }
    const totalWidget = items.reduce((acc, val) => acc+val.quantity, 0)
    const removeItem = id => {
        const  itemsFiltered = items.filter(item=> item.id !== id)
        setItems(itemsFiltered)}
    const clear = ()=>setItems([]) 
    return (
        <CartContext.Provider  value={{addItem,items, removeItem, clear, totalWidget}}>  {children}        </CartContext.Provider>
        )

}