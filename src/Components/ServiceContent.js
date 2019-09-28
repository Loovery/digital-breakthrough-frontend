import React from 'react';

export default class Item extends React.Component {
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div>
                this is {this.props.index} letter
            </div>
        )
    }
}