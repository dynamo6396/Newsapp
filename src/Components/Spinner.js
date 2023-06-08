import React, { Component } from 'react'
import loading from './loader.gif'
export default class spinner extends Component {

 
  render() {
    return (
      <div>
        <div className="text-center">
         <img src={loading} style={{width: 100, height: 100 }}alt="Loading" />
      </div>
      </div>
    )
  }
}
