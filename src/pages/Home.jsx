import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, InputGroup, Form, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterProductsthunk, getProductsThunk, filterNamethunk } from '../store/slices/products.slice';

const Home = () => {

    const [categoryList, setCategoryList] = useState([])//estado para setear las cateorias
    const [inputSearch, setInputSearch] = useState("")//estado para acceder por input a una busqueda
    const dispatch = useDispatch()//creamos el dispatch
    const products = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getProductsThunk())//despachamos la pantalla de carga, por medio del useEffect

        axios.get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
            .then(res => setCategoryList(res.data.data.categories))//instruccion para acceder a las categorias
    }, [])

    console.log(categoryList)
    return (
        <div>
            <Row>
                {/* categorias */}
                <Col lg={3}>
                    <ListGroup>
                        <h3>Category</h3>
                        {categoryList.map(category => (// con este map, voy a mostrar las categegorias,  //este buton me va a filtrar las categorias, aprovecho que ya tengo la funcion
                            <ListGroup.Item key={category.id}
                                onClick={() => dispatch(filterProductsthunk(category.id))}
                                style={{ cursor: "Pointer" }}
                            >
                                {category.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                {/* productos */}
                <Col lg={9}>
                    <h1>Technology</h1>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={inputSearch}
                            onChange={e => setInputSearch(e.target.value)}
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={() => dispatch(filterNamethunk(inputSearch))}
                        >
                            Search
                        </Button>
                    </InputGroup>
                    <Row xs={1} md={2}  lg={3} className="g-4">
                        {products.map(productItem => (
                            <Col key={productItem.id}>
                                <Card>
                                    <Link to={`/product/${productItem.id}`} style={{textDecoration:"none"}}>
                                        {/* con este map, accedemos a los titulos de los productos, y mediante la lista inferior se ponen como link que nos llevara al detalle de cada uno */}
                                        <Card.Img
                                            variant="top"
                                            src={productItem.productImgs[0]}
                                            style={{ height: 200, objectFit: "contain" }}
                                        />
                                        <Card.Body>
                                            <Card.Title>{productItem.title}</Card.Title>
                                            <Card.Text>
                                                <h2><b>Price: $</b>{productItem.price}</h2>
                                                <h2><b>Status: </b>{productItem.status}</h2>
                                                {/* <h5><b>Description: </b>{productItem.description}</h5> */}
                                            </Card.Text>
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                    </Row>
               </Col>
            </Row>
        </div>
    );
};

export default Home;