import React from 'react';

import { Row, Col } from 'mdbreact';

import Product from './Product';

class ProductListComponent extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(item) {
        console.log("Selected Item", item)
    }

    render() {
        const { items } = this.props;

        const template = items.map((item, key) => {
            return (
                <Col key={key} md="4" xs="12" className="mb-lg-0 mb-4">
                    <Product item={item} onSelection={this.handleClick} />
                </Col>
            )
        });

        return (
            <Row>
                {template}
            </Row>
        )
    }
}

export { ProductListComponent }