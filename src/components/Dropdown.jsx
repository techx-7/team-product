import React from 'react';

import { Dropdown as DropdownComponent, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        const { items, name, onItemClick, color = 'primary' } = this.props;

        const templates = items.map((item, idx) => {
            return (
                <DropdownItem key={idx} href="#!" onClick={(e) => {
                    onItemClick(item.value)
                }}>{item.text}</DropdownItem>
            )
        })
        return (
            <DropdownComponent isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret color={color}>
                    {name}
                </DropdownToggle>
                <DropdownMenu>
                    {templates}
                </DropdownMenu>
            </DropdownComponent>
        );
    }
}
export default Dropdown;