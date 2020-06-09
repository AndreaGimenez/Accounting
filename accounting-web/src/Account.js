import React, { Component } from 'react';
import Balance from './Balance';
import {Transactions, NewTransaction} from './Transactions';
import Button from '@material-ui/core/Button';
import {isMobile} from './utils.js';
import axios from 'axios';

const style_account = {
  width: `${isMobile() ? "100%" : "80%"}`,
  marginLeft: `${isMobile() ? "" : "10%"}`,
  marginBottom: "3%",
  backgroundColor:"#e6e6e6",
  textAlign:"center",
  marginTop: "1%"
}

const style_buttons = {display: "flex", marginLeft:"30%",   padding: "1%"}

export default class Account extends Component{
  state = {
    loading: true,
  }

  componentDidMount(){
      axios.get('http://localhost:8000/transactions')
      .then(res => {
        this.setState({data: res.data, loading: false})
      })
  }

  refresh(){
    this.setState({ data: [], loading: true});
    this.componentDidMount();
  }

  render(){
    const { data } = this.state;

    return (
      <div style = {style_account}>
        {
          this.state.loading ? "loading..."
          :
          <div>
            <div style={style_buttons}>
              <Button variant="contained"
                color="primary"
                style={{marginRight:"20%", width: "20%"}}
               onClick={()=> this.refresh()}>Refresh</Button>
              <NewTransaction />
            </div>
            <Balance transactions={data.transactions}/>
            <Transactions transactions={data.transactions}/>
          </div>
        }
      </div>)
  }
}
