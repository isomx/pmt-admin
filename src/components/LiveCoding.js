import React, { Component } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Button from 'react-md/lib/Buttons';
import Card from 'react-md/lib/Cards';
import Paper from 'react-md/lib/Papers';
import Rx from 'rxjs';
import Dialog from 'react-md/lib/Dialogs';

export default class LiveCoding extends Component {
  count = 5;
  scope = {
    Button,
    Card,
    Paper,
    Rx,
    Dialog,
  };
  render() {
    this.count++;
    return (
      <section className="md-toolbar-relative md-grid md-grid--40-24">
        <LiveProvider scope={this.scope} code='
class Something extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      raised: true,
      flat: false,
      visible: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.setState({raised: !this.state.raised, flat: !this.state.flat, visible: !this.state.visible});
  }
  render() {
    return(
      <div>
        <Button primary {...this.state} onClick={this.handleClick} label="My Button" />
        <Dialog visible={this.state.visible} modal id="My Modal" >
          <Button primary {...this.state} onClick={this.handleClick} label="My Button" />
        </Dialog>
      </div>
    );
  }
}       '>
          <div style={{width: '100%', height: '20px', color: '#cc0000'}} >
            <LiveError />
          </div>
          <div style={{width: '800px', height: '800px', float: 'left'}} className="md-paper--5">
            <LiveEditor style={{height: '800px'}} />
          </div>
          <div style={{marginLeft: '100px', width: '800px', float: 'left'}}>
            <LivePreview />
          </div>
        </LiveProvider>
      </section>
    )
  }
}