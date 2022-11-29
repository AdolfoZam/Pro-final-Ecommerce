import React, { useEffect } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductId = () => {

    const { id } = useParams()//se utiliza para bsucar un id del producto

    const dispatch = useDispatch()//se debe importar desde home para que funcione el useefect



    useEffect(() => {//tambien se debe importar el useeffect
        dispatch(getProductsThunk())//el Useefect lo utilizamos para cargar los productos, pues cuando actualizo se borra los datos
    }, [])

    const productLists = useSelector(state => state.product)

    const product = productLists.find(productItem => productItem.id === Number(id));
    // console.log(product)
    const relateProducts = productLists.filter(productItem =>
        productItem.category?.id === product.category?.id &&
        productItem.id !== product.id
    )// instruccion para realizar un filtro para traer los productos que son similares o de la misma categoria

    // console.log(relateProducts)
    return (
        <div>
            <h1>{product?.title}</h1>
            <p><b>Category: </b>{product.category?.name}</p>
            <Row>
                {/* Description del producto */}
                <Col lg={9}>
                    <img src={product?.productImgs[0]} alt="" className='img-fluid' /> <br />
                    <p><br /><b>Description: </b><br />{product?.description}</p>
                    <p><br /><b>Price: $ <br /></b>{product?.price}</p>
                    <p><br /><b>Status:  <br /></b>{product?.status}</p>
                </Col>
                {/* articulos relacionados */}
                <Col lg={3}>
                    <h3>Products Related</h3>
                    <ListGroup variant="flush">
                        {relateProducts.map(productItem => (//sirve para mostrar los procutos relacionados
                        
                            <ListGroup.Item key={productItem.id}>
                                <Link to={`/product/${productItem.id}`}>
                                    <img src={productItem.productImgs[0]} alt="" className='img-fluid' />
                                    {productItem.title}
                                    <div>{productItem.title}</div>
                                </Link>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>


        </div>
    );
};

export default ProductId;