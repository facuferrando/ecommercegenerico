import { useContext, useState } from "react"
import { Container,Table } from "react-bootstrap"
import { CartContext } from "../contexts/CartContext"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { Link } from 'react-router-dom';
import { collection, getFirestore,addDoc} from "firebase/firestore";


export const Cart =({handleClose}) => {
    const {items, removeItem,clear} = useContext(CartContext)
    const [formValues,setFormValues]=useState({
        name:"",
        phone:"",
        email:"",
        emailC:"",
    })
    const total=() => 
        items.reduce(
            (acumulador, valorActual) =>
                acumulador + valorActual.quantity * valorActual.price,
                0
        )
           const handleChange =ev =>{
            setFormValues(prev=>({
                ...prev,
                [ev.target.name]:ev.target.value,
            }))

           }
           
            const sendOrder =()=>{

                if(formValues.email===formValues.emailC){
                const order ={
                    buyer: formValues,
                    items,
                    total:total(),
                }

                const db= getFirestore()
                const orderCollection =collection(db,"orders")
                addDoc(orderCollection, order).then(({id})=>{
                    if(id){
                        setFormValues({
                            name:"",
                            phone:"",
                            email:"",
                            emailC:"",
                        })
                        clear()
                        alert("Su orden "+id+" ha sido completada con éxito!")
                    }
                })
            }
            else alert("Los emails ingresados no coinciden")
            }



        console.log(items)
    if (items.length===0) {
        
        return (
        <Container>
            <h4 class="h4estilo"> De momento no existe nada en su carrito</h4>
            <Button onClick={handleClose}>
            <h4 class="h4estilo"> Volver al Inicio </h4>
            </Button>
        </Container>)
    }
    else{
    return (
        <Container>
           <Table striped bordered hover variant ="dark">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Borrar elemento/s</th>
                </tr>
            </thead>
            <tbody>                
               {items.map(item=>(
                <tr key={items.id}>
                    <td> {item.name}</td>
                    <td>$ {item.price}</td>
                    <td> {item.quantity}</td>
                    <td>
                        <Button
                            onClick={()=>
                            removeItem(item.id)
                            }>
                                Borrar Elemento
                        </Button>
                    </td>
                    </tr>
                
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>Total</td>
                    <td>$ {total()}</td>
                    <td></td>
                    <td></td>
                </tr>
              
            </tfoot>
           </Table>
                           
           <Button
                            onClick={()=>
                            clear()
                            }>
                                Limpiar carrito
                        </Button>   
                        <h4>Ingrese datos de usuario</h4>
            <Form>
                    <Form.Group classname="mb-3" controlId="formBasicName">
                        <Form.Label> Nombre </Form.Label>
                        <Form.Control
                        placeholder="Tu nombre"
                        onChange={handleChange}
                        value={formValues.name}
                        type="text"
                        name="name"
                        
                        />
                    </Form.Group>
                    <Form.Group classname="mb-3" controlId="formBasicEmail">
                        <Form.Label> Email </Form.Label>
                        <Form.Control
                        placeholder="ejemplo@email.com"
                        onChange={handleChange}
                        value={formValues.email}
                        type="email"
                        name="email"
                        
                        />
                    </Form.Group>
                    <Form.Group classname="mb-3" controlId="formConfirmEmailId">
                        <Form.Label> Confirmar email </Form.Label>
                        <Form.Control
                        placeholder="ejemplo@email.com"
                        onChange={handleChange}
                        value={formValues.emailC}
                        type="emailC"
                        name="emailC"
                        />
                    </Form.Group>
                    <Form.Group classname="mb-3" controlId="formPhone">
                        <Form.Label> Phone </Form.Label>
                        <Form.Control
                        placeholder="+549123456789"
                        onChange={handleChange}
                        value={formValues.phone}
                        type="text"
                        name="phone"
                        />
                    </Form.Group>
                   
            </Form>
            <br />
            <Button onClick={sendOrder}>
                        Enviar compra
            </Button>
        </Container>
    )
}}