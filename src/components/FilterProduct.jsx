import React from 'react';
import { ListGroup, ListGroupItem, Badge } from 'mdbreact'

class FilterProduct extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { catCount, dogCount, otherCount } = this.props;
        return (
            <ListGroup>
                <ListGroupItem>Cats<Badge color="primary" pill>{catCount}</Badge></ListGroupItem>
                <ListGroupItem>Dogs<Badge color="primary" pill>{dogCount}</Badge></ListGroupItem>
                <ListGroupItem>Others<Badge color="primary" pill>{otherCount}</Badge></ListGroupItem>
            </ListGroup>
        );
    }
}

export default FilterProduct;