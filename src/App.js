import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import IPFS from 'ipfs';

import InputSubmit from
	'react-input-submit';

const repo = "1217-btc";

const node = new IPFS( { repo } )

class App extends Component {

	state = {
		ipfsOnline: false
	}

	uploadIPFS = async (value)=> {
		if (!node.isOnline()) return;

		const buffer = Buffer.from(value);

		const response = await node.files.add([buffer]);

		this.setState({
		  output: JSON.stringify(response),
		});
	}

	getIPFS = async (hash) => {
		if (!node.isOnline()) return;

		const response = await node.files.cat(hash);

		this.setState({
		  readData: JSON.stringify(response),
		});

		let data = "";

		response.on("data", dPiece => data += dPiece)

		response.on("end", ()=> {
			this.setState({
			  readData: data
			});
		})
	}

	checkIPFS =()=> {
		this.setState({
			ipfsOnline : node.isOnline()
		})
	}

  render() {
    return (
      <div className="App">
				<h1>IPFS-LAB</h1>

				<button onClick={this.checkIPFS}>
					IPFS-CHECK ONLINE
				</button>

				<hr/>

				IPFS ONLINE: {this.state.ipfsOnline + ''}

				<hr/>

				<InputSubmit placeholder="UPLOAD TO IPFS" onSubmit={ this.uploadIPFS }/>

				{this.state.output}

				<hr/>
				<InputSubmit placeholder="IPFS HASH" onSubmit={ this.getIPFS }/>

				{this.state.readData}
      </div>
    );
  }
}

export default App;
