import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div class="masonry">
          <div class="item">
            <div class="item_content content-lar"> 1
                </div>
          </div>
          <div class="item">
            <div class="item_content content-sma"> 2
                </div>
          </div>
          <div class="item">
            <div class="item_content content-mid"> 3
                </div>
          </div>
          <div class="item">
            <div class="item_content content-sma"> 4
                </div>
          </div>
          <div class="item">
            <div class="item_content content-mid"> 5
                </div>
          </div>
          <div class="item">
            <div class="item_content content-lar"> 6
                </div>
          </div>
          <div class="item">
            <div class="item_content content-sma"> 7
                </div>
          </div>
          <div class="item">
            <div class="item_content content-lar"> 8
                </div>
          </div>
          <div class="item">
            <div class="item_content content-lar"> 9
                </div>
          </div>
          <div class="item">
            <div class="item_content content-sma"> 10
                </div>
          </div>
          <div class="item">
            <div class="item_content content-mid"> 11
                </div>
          </div>
          <div class="item">
            <div class="item_content content-mid"> 12
                </div>
          </div>
        </div>
      </div>
    )
  }
}
