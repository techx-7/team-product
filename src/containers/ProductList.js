import React from 'react';

import { ProductListComponent } from '../components/ProductList';
import { Container, Row, Col } from 'mdbreact';
import Dropdown from '../components/Dropdown';
import FilterProduct from '../components/FilterProduct';

import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios';

const apiUrl = 'https://fifi-pet-shop-api.herokuapp.com/api/products'

class ProductListContainer extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() { }

    render() {
        const params = {};
        const sortByList = [{
            text: 'View',
            value: 'view'
        }, {
            text: 'Grid',
            value: 'grid'
        }];

        return (
            <Container>
                <Row>
                    <Col sm="3" xs="12">
                        <Row>
                            <Col xs="12">&nbsp;</Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FilterProduct />
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="9" xs="12" >
                        <Row>
                            <Col xs="12">
                                <Dropdown items={sortByList} name="View By" onItemClick={(e) => {
                                    console.log(e)
                                }} />
                            </Col>
                        </Row>
                        <div className="clearfix">&nbsp;</div>
                        <Get url={apiUrl} data={params}>
                            {(error, response, isLoading, onReload) => {
                                if (error) {
                                    return (<div>Something bad happened: {error.message}</div>)
                                }
                                else if (isLoading) {
                                    return (<div>Loading...</div>)
                                }
                                else if (response !== null && response.status) {
                                    const { data: { data, status } } = response;
                                    return (
                                        <ProductListComponent estimate={data.totalItems} items={data.products} />
                                    )
                                }
                                return (<div>Default message before request is made.</div>)
                            }}
                        </Get>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ProductListContainer;