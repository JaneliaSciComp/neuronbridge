import React, { Component } from 'react';
import MyContext from './MyContext';

class MyProvider extends Component {
    state = {
        open: false,
        test: 'This is a test',
        result: null
    };

    render() {
        return (
            <MyContext.Provider
                value={{
                    open: this.state.open,
                    result: this.state.result,
                    handleClickOpen: event => {
                        const open = true;
                        this.setState({
                            open
                        })
                    },
                    handleClose: event => {
                        const open = false;
                        this.setState({
                            open
                        });
                    },
                    changeTab: key => {
                        this.setState({
                          result: null
                        });
                    },
                    getInformation: (name, path) => {
                        let that = this; // bind this to that
                        if (name) {
                          const the_path = path + name + '.json';
                          fetch(the_path)
                            .then(function(response) {
                              return response.json();
                            })
                            .then(function(json) {
                              const result = json['results'];
                              that.setState({
                                result: result
                              });
                            }).catch(function(error) {
                              console.log(error);
                            });
                        }
                    }
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}

export default MyProvider;