import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch= useDispatch()

    const purchases = useSelector(state => state.purchases)

    useEffect(() =>{
        dispatch(getPurchasesThunk())
    },[])

    return (
        <div>
           <ul>
            {
                purchases.map(purchase =>(
                    <li key={purchase.id}>
                        {
                            purchase.cart.products.map(product => (
                                <li key={product.id}>
                                    <h3><b>Products: </b>{product.title}</h3>
                                    <h3><b>Price: </b>{product.price}</h3> 
                                    <h3><b>Purchases: </b>{product.createdAt}</h3>  
                                </li>
                            ))
                        }

                    </li>
                ))
            }
           </ul>
        </div>
    );
};

export default Purchases;