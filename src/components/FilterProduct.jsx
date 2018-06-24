import React from 'react';
import { ListGroup, ListGroupItem, Badge } from 'mdbreact'

class FilterProduct extends React.Component {

    render() {
        const { catCount, dogCount, otherCount } = this.props;
        return (
            <ListGroup>
                <ListGroupItem>Cats &nbsp;<Badge color="primary" pill>{catCount}</Badge></ListGroupItem>
                <ListGroupItem>Dogs &nbsp;<Badge color="primary" pill>{dogCount}</Badge></ListGroupItem>
                <ListGroupItem>Others &nbsp;<Badge color="primary" pill>{otherCount}</Badge></ListGroupItem>
            </ListGroup>
        );
    }
}

export default FilterProduct;