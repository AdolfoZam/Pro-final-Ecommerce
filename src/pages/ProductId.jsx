import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductId = () => {

    const {id} = useParams()//se utiliza para bsucar un id del producto

    const dispatch = useDispatch()//se debe importar desde home para que funcione el useefect

       

    useEffect(() => {//tambien se debe importar el useeffect
        dispatch(getProductsThunk())//el Useefect lo utilizamos para cargar los productos, pues cuando actualizo se borra los datos
    },[])

    const productLists = useSelector(state => state.product)

    const product = productLists.find(productItem => productItem.id === Number(id));
    // console.log(product)
    const relateProducts = productLists.filter(productItem => 
        productItem.category?.id === product.category?.id
        )// instruccion para realizar un filtro para traer los productos que son similares o de la misma categoria

        // console.log(relateProducts)
    return (
        <div>
            <h1>{product?.title}</h1>
            <div>
            <img src={product?.productImgs[0]} style={{width:200}} alt=""/> <br /> <br />
            </div>
            <div> <b>Category: </b> <br />
            {product.category?.name} <br /> <br />
            </div>
            <div>
                <b>Description: </b> <br /> <br />
            {product?.description} <br /><br />
            </div>
            <div>
                <b>Price: </b> <br />
            {product?.price} <br /><br />
            </div>
            <b>Status: </b> <br />
            <div>{product?.status} <br /><br /></div>
            <h3>Products Related</h3>
            {relateProducts.map(productItem =>(//sirve para mostrar los procutos relacionados
                <li key={productItem.id}>
                    <Link to={`/product/${productItem.id}`}>
                        {productItem.title}
                        <img src={product?.productImgs[0]} style={{width:200}} alt=""/>
                    </Link>
                </li>
            ))}
        </div>
    );
};

export default ProductId;