import React from 'react';
import _ from 'lodash';

const cc = require('cryptocompare');
cc.setApiKey('<7fa39e3d1e8a1db6f74ac6d23810c4e580208504d40641c7a935bec74e3229f5>')



export const AppContext = React.createContext('');

const MAX_FAVORITES = 10;
export class AppProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: 'dashboard',
            favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
            ...this.savedSettings(),
            setPage: page => this.setState({page}),
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
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

addCoin = key => {
    let favorites = [...this.state.favorites];
    if(favorites.length < MAX_FAVORITES){
        favorites.push(key);
        this.setState({favorites});
    }
}

removeCoin = key => {
    let favorites = [...this.state.favorites];
    this.setState({favorites: _.pull(favorites, key)})
  }

  isInFavorites = key => _.includes(this.state.favorites, key)

    confirmFavorites = () => {
this.setState({
    firstVisit:false,
    page: 'dashboard'
});
localStorage.setItem('cryptoDash', JSON.stringify({
favorites: this.state.favorites
}));   
}

    savedSettings() {
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
    if (!cryptoDashData){
        return {page: 'settings', firstVisit: true}
    }
    let {favorites} = cryptoDashData;
    return{favorites};
    }

    render(){
        return(
            <AppContext.Provider value= {this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }

}