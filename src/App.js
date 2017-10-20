import React, {Component} from 'react';
import './App.css';

function checkPalindrome(str) {
	// remove punctuation, to lower case.
	str = str.replace(/[.,?:;\/() _-]/g, '').toLowerCase();
	// Compare the string with it's reversed version.
	return str == str.split('').reverse().join('');
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			palindromes: [],
			paragraph: 'Nothing Yet!'
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleChange(input) {
		let no_punc = input.target.value.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
		let p_list = [];
		let p_paragraph = input.target.value;
		for(let word of no_punc.split(' ')) {
			let has_digits = word.match(/\d+/g);
			if(has_digits == null) {
				if(word.length > 1 && checkPalindrome(word)) {
					if(p_list.indexOf(word.toLowerCase()) === -1) {
						p_list.push(word.toLowerCase());
					}
				}
			}
		}
		this.setState({
			palindromes: p_list,
			defaultString: p_paragraph
		});
	}
	handleClick(){
		this.refs.user_entry.value = '';
	}
	
	render() {
		return (
			<div className="App">
				<div className="app_container">
					<h1>Palindrome Locator</h1>
					<div>Enter some text below, and we'll look to see if there are any palindromes in it!</div>
					<div className="disclaimer">We're looking for letters only. Numbers and punctuation will be
						ignored.
					</div>
					<textarea ref="user_entry" name="user_text" id="palindrome_textarea" onChange={this.handleChange} placeholder="Go ahead... Type something..."></textarea>
					<div><button className='p_btn' onClick={this.handleClick}>clear</button></div>
					<div className="pd_container">
						<span className="results_hdr">Palindromes Contained Within:</span>
						<div><span className="results_content">{this.state.palindromes.join(', ')}</span></div>
						
					</div>
					
				</div>
			</div>
		);
	}
}

export default App;
