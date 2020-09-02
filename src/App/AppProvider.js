import React from 'react';

const cc = require('cryptocompare');
cc.setApiKey('<7fa39e3d1e8a1db6f74ac6d23810c4e580208504d40641c7a935bec74e3229f5>')



export const AppContext = React.createContext('');

export class AppProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: 'dashboard',
            ...this.savedSettings(),
            setPage: page => this.setState({page}),
            confirmFavorites: this.confirmFavorites
        }
    }
    
componentDidMount = () => {
    this.fetchCoins();
}

fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({coinList});
}

    confirmFavorites = () => {
this.setState({
    firstVisit:false,
    page: 'dashboard'
});
localStorage.setItem('cryptoDash', JSON.stringify({
test: 'hello'
}));   
}

    savedSettings() {
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
    if (!cryptoDashData){
        return {page: 'settings', firstVisit: true}
    }
    return{};
    }

    render(){
        return(
            <AppContext.Provider value= {this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }

}