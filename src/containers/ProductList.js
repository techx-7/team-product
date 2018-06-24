import React from 'react';

import { ProductListComponent } from '../components/ProductList';
import { Container, Row, Col } from 'mdbreact';
import Dropdown from '../components/Dropdown';
import FilterProduct from '../components/FilterProduct';


import axios from 'axios';

const apiUrl = 'https://fifi-pet-shop-api.herokuapp.com/api/products'

class ProductListContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {
                searchTerm: '',
                start: 0,
                end: 10
            },
            totalItems: 0,
            results: []
        }

        this.resetFilter = this.resetFilter.bind(this);
    }

    componentWillMount() {
        this.fetchProducts({
            start: 0,
            end: 10
        });
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
        window.removeEventListener('message', this.receiveSearchTermFromParent);
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
        if (!!searchData && searchData['type'] == 'PRODUCT_SEARCH') {
            const params = {
                start: 0,
                end: 10,
                q: searchData['data'].searchTerm
            }
            this.setState({
                params: params
            });

            this.fetchProducts(params)
        }
    }

    resetFilter(pageSize) {
        const params = {
            start: 0,
            end: pageSize,
            q: ''
        };

        this.setState({
            params: params
        });

        this.fetchProducts(params);
    }

    render() {
        const params = {
            start: 0,
            end: 10,
            q: this.state.searchTerm
        };
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

        const catCount = (this.state.results.filter(item => item.category.name.toLowerCase().indexOf('cat') > -1) || []).length;
        const dogCount = (this.state.results.filter(item => item.category.name.toLowerCase().indexOf('dog') > -1) || []).length;
        const otherCount = (this.state.results.filter(item => ['cat', 'dog'].indexOf(item.category.name.toLowerCase()) == -1) || []).length;

        return (
            <Container>
                <Row>
                    <Col md="3" sm="12">
                        <Row>
                            <Col sm="12">&nbsp;</Col>
                        </Row>
                        <Row>
                            <Col sm="12">
                                <FilterProduct catCount={catCount} dogCount={dogCount} otherCount={otherCount} />
                            </Col>
                        </Row>
                    </Col>
                    <Col md="9" sm="12" >
                        <Row>
                            <Col sm="12">
                                <Dropdown style={{ float: 'right' }} color="default" items={sortByList} name="Page Size" onItemClick={(e) => {
                                    this.resetFilter(e);
                                }} />
                            </Col>
                        </Row>
                        <div className="clearfix">&nbsp;</div>
                        <h3>Search For {this.state.params.searchTerm}</h3>
                        <ProductListComponent estimate={this.state.totalItems} items={this.state.results} />
                    </Col>
                </Row>
            </Container>
        )
    }

    fetchProducts(params) {
        axios.get(apiUrl, { params })
            .then(response => response.data)
            .then(response => {
                const { data } = response;
                this.setState({
                    results: data.products,
                    estimate: data.totalItems
                })
            })
    }
}

export default ProductListContainer;