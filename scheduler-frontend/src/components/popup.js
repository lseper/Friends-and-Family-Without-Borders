import React from 'react';  


class Popup extends React.Component {  
  render() {  
        return (  
            <div className='popup text-xl block font-bold rounded bg-coolBlue ml-1 text-white'>  
            <div className='popup_open'>  
            <h1>{this.props.text}</h1>  
            <button onClick={this.props.closePopup}></button>  
            </div>  
            </div>  
        );  
    }     
}  
export default Popup;