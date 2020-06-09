import React from 'react';
import axios from 'axios';
import { Card } from '@material-ui/core';
import { isMobile, isDebit, formatDate } from './utils.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';

const style_transactions = {
  width: `${isMobile() ? "98%" : "50%"}`,
  marginLeft: `${isMobile() ? "1%" : "25%"}`,
  marginBottom: "1%",
  height: `${isMobile() ? "60px" : "70px"}`,
  backgroundColor:"#e6e6e6",
  fontSize:`${isMobile() ? "20px" : "30px"}`,
}

const style_send = {
  backgroundColor: "#4255bd",
  marginLeft: "20px",
  width: "130px",
  marginTop: "17px",
  color: "#fff"
}

const style_dialog = {
  width: `${isMobile() ? "200px" : "500px"}`,
  height: `${isMobile() ? "60px" : "200px"}`
}

export function Transactions({transactions}) {
  return(
    transactions.map((t, index) => (
      <Card variant="outlined" style={style_transactions} key={index}>
        <div style={{textAlign:"left", marginTop:"3%", color:`${isDebit(t.amount) ? "green" : "red"}`}}>
           <span style={{marginLeft: "5%"}}>{formatDate(t.date.toString())}</span>
           <span style={{marginLeft: `${isMobile() ? "40%" : "50%"}`}}> ${t.amount}</span>
        </div>
      </Card>
    ))
  )

}

export class NewTransaction extends React.Component {
  constructor(props){
    super(props)
    this.state={
      open: false,
      error: false,
      success: false,
      new_amount: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  add = () => {this.setState({ open: true })}

  onClose = () => {
    this.setState({ open: false, error: false, new_amount:"", success: "" })
  }

  handleChange = (e) => {
    this.setState({new_amount: e.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('http://localhost:8000/transactions', {amount: parseFloat(this.state.new_amount)})
    .then((response) => this.setState({ success: true }))
      .catch((err) => { this.setState({ error: true }) }
    )
  }

  render(){
    const { error, success, type, open, new_amount } = this.state
    return(
      <div style={{width: "20%"}}>
          <div style={{display:"flex"}}>
            <Button variant="contained"
              color="primary"
              style={{width: "100%"}}
              onClick={()=> this.add()}>New</Button>
            <Dialog
              open={open}
              modal={false}>
              <DialogContent style={style_dialog}>
                <DialogContentText>New amount</DialogContentText>
                  <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      type="text"
                      label="amount"
                      name='Enter amount'
                      placeholder="$25"
                      value={new_amount}
                      onChange={this.handleChange}
                    />
                    <Button style={style_send} onClick={this.handleSubmit}>ACCEPT</Button>
                  </form>
              </DialogContent>
              {error ? <div style={{color:"red"}}>Transaction Failed</div> : ""}
              {success ? <div style={{color:"green"}}>Transaction Successful</div> : ""}
              <DialogActions>
                <Button onClick={this.onClose} color="primary"> Back </Button>
              </DialogActions>
            </Dialog>
          </div>
      </div>
    )
  }
}
