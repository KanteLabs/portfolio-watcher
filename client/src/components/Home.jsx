import React, { Component } from 'react';
import CurrentMarketValues from './CurrentMarketValues';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            topFiveCoins: false,
            topFiveCoinsLoaded: false
        }
    }

    componentDidMount() {
        !this.state.topFiveCoins ? this.grabTopFiveCoins() : null
    }

    grabTopFiveCoins(){
        let url = 'https://api.coinmarketcap.com/v1/ticker/?limit=5';

        if(!this.state.topFiveCoinsLoaded){
            fetch(url).then((res)=>{
                res.json().then((data)=>{
                    console.log(data)
                    this.setState({
                        topFiveCoins: data,
                        topFiveCoinsLoaded: true
                    })
                }).catch(err=>console.log(err))
            }).catch((err)=>{
                console.log(err)
            })
        }else{

        }
    }

    render(){
        const {topFiveCoinsLoaded} = this.state;
        return(
            <section className="home">
                {topFiveCoinsLoaded ? <CurrentMarketValues data={this.state.topFiveCoins}/> : null}
            </section>
        )
    }
}

export default Home;