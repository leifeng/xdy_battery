import React from 'react';

class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      dataSource: []
    }
  }
  render(){
    return (
      <span>
        <input/>
      </span>
    )
  }
}
