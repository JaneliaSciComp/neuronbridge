import React, { Component } from 'react';
import MyContext from './MyContext';

class MyProvider extends Component {
    state = {
        open: false,
        test: 'This is a test'
    };

    render() {
        return (
            <MyContext.Provider
                value={{
                    open: this.state.open,
                    test: this.state.test,
                    // incrementPrice: selectedID => {
                    //     const cars = Object.assign({}, this.state.cars);
                    //     cars[selectedID].price = cars[selectedID].price + 1;
                    //     this.setState({
                    //         cars
                    //     });
                    // },
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}

export default MyProvider;