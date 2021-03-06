import React, { Component } from 'react';
import axios from 'axios';
import firebase from '../config/firebase';

var db = firebase.firestore();
const etherscanKey = require('../config/api-keys')

class EtherBalance extends Component {
    constructor(props){
        super(props);
        this.state = {
            ethAddress: false
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                db.collection('users').doc(user.uid).get().then((res)=>{
                    if(res.exists){
                        console.log(res.data())
                        this.setState({
                            eth_address: res.data()
                        })
                        setInterval(this.updatePage(), 5000)
                        // this.updatePage()
                    }else{
                        return null;
                    }
                })
            }
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        let regExp = /^0x[a-fA-F0-9]{40}$/;
        let {address} = this.state;

        address.match(regExp) ? this.submitAddress(address) : null  
    }

    submitAddress=(address)=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                db.collection('users').doc(user.uid).update({
                    eth_address: address
                }).then((res)=>{
                    console.log(res)
                }).catch((err)=>{
                    console.log(err)
                })
            }
        })
    }

    handleChange=(e)=>{
        let {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    updatePage = () => {
        axios.get(`https://api.etherscan.io/api?module=account&action=balance&address${this.state.ethAddress}=&tag=latest&apikey=${etherscanKey}`).then((data)=>{
            console.log(data, data.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    render(){
        return(
            <section id="ether-balance">
                <div className="balance-form">
                    <form onSubmit={this.handleSubmit} >
                        <label htmlFor="address">ETH Address</label>
                        <input
                            placeholder="Enter Address to Track"
                            required
                            onChange={(e)=>this.handleChange(e)}
                            name="address"
                            type="text"
                        />
                        <button
                            label="Submit"
                            onClick={this.handleSubmit}
                            type="Submit"
                        />
                    </form>
                </div>
            </section>
        )
    }
}

export default EtherBalance;