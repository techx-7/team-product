import React from 'react';

import { ProductListComponent } from '../components/ProductList';
import { Container, Row, Col } from 'mdbreact';
import Dropdown from '../components/Dropdown';
import FilterProduct from '../components/FilterProduct';

import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios';

const apiUrl = 'https://fifi-pet-shop-api.herokuapp.com/api/products'

class ProductListContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: ''
        }
    }

    componentWillMount() {
        window.addEventListener('message', this.receiveSearchTermFromParent.bind(this), false);
    }

    componentDidMount() {
        const data = {
            type: 'INTIAL_HANDSHAKE',
            msg: 'Product Listing Component has been initialized and rendered'
        }
        window.parent.postMessage(JSON.stringify(data), '*')
    }

    componentWillUnmount() {
        window.removeEventListener('message');
    }

    parseJson(str) {
        try {
            return JSON.parse(str);
        }
        catch (e) {
            return str;
        }
    }

    receiveSearchTermFromParent({ data }) {
        const searchData = this.parseJson(data);
        if (!!searchData)
            this.setState(searchData['data'])
    }

    render() {
        const params = {};
        const sortByList = [{
            text: '10',
            value: '10'
        }, {
            text: '25',
            value: '25'
        }, {
            text: '50',
            value: '50'
        }];

        return (
            <Container>
                <Row>
                    <Col md="3" sm="12">
                        <Row>
                            <Col sm="12">&nbsp;</Col>
                        </Row>
                        <Row>
                            <Col sm="12">
                                <FilterProduct />
                            </Col>
                        </Row>
                    </Col>
                    <Col md="9" sm="12" >
                        <Row>
                            <Col sm="12">
                                <Dropdown style={{ float: 'right' }} color="default" items={sortByList} name="Page Size" onItemClick={(e) => {
                                    console.log(e)
                                }} />
                            </Col>
                        </Row>
                        <div className="clearfix">&nbsp;</div>
                        <h3>Search For {this.state.searchTerm}</h3>
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