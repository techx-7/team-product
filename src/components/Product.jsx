import React from 'react';
import { Card, CardImage, CardBody, CardTitle, CardText, CardFooter, Fa, Tooltip, Badge, Button } from 'mdbreact';

class ProductComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { item, onSelection } = this.props;
        return (
            <Card>
                <CardImage style={{ maxHeight: '130px', imageRendering: 'pixelated' }} top src={item.attrs.img} overlay="white-slight" hover waves alt="Card image cap" />
                <CardBody>
                    <a className="activator waves-effect waves-light mr-4"><Fa icon="share-alt"></Fa></a>
                    <CardTitle>{item.name}</CardTitle>
                    <hr />
                    <CardText>{item.desc || item.category.name}</CardText>
                    <a href="javascript:void(0);" onClick={(e) => {
                        e.stopPropagation(); 
                        onSelection(item);
                    }} className="black-text d-flex justify-content-end"><h5>Read more <Fa icon="angle-double-right"></Fa></h5></a>
                </CardBody>
            </Card>
        )
    }
}

export default ProductComponent;