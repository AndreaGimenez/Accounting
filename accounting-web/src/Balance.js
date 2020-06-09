import React from 'react';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {isMobile} from './utils.js';

export default function Balance({transactions}) {
  let amounts = transactions.map(({ amount }) => amount)
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = amounts.reduce(reducer);
  return(
      <Card  variant="outlined" >
        <CardContent style={{fontSize:"35px"}}>
              <div style={{position:"relative", "top":"55%"}}><span>Balance:</span><span> ${total}</span></div>
        </CardContent>
      </Card>
  );
}
