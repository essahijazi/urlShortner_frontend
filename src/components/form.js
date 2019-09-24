import React from 'react'; 

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalURL: '',

        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({originalURL: event.target.value});
      }
    
      handleSubmit(event) {


        const url = 'http://localhost:3000/urls/shorten';
        const data = { originalURL: event.target.value };
        
        try {
          const response = fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(response => response.json())
          const json = response.json();
          console.log('Success:', JSON.stringify(json));
        } catch (error) {
          console.error('Error:', error);
        }


        // const data = this.state.originalURL;
        // console.log(data);


        // try {
        //     const response = fetch(`http://localhost:3000/urls/shorten`, {
        //         method: 'POST',
        //         body: JSON.stringify(data),
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //     const json = response.json();
        //     console.log('Success:', JSON.stringify(json));
        //   } catch (error) {
        //     console.error('Error:', error);
        //   }
        // // fetch(`http://localhost:3000/urls/shorten`,
        // { 
        //   method: 'POST',
        //   body: JSON.stringify(data),
        //   headers:{'Content-Type': 'application/json'}
        // })
        // .then(response => response.json())
        // .then(jsonData => this.setState({originalURL: jsonData}))
  
        // alert('A name was submitted: ' + this.state.originalURL);
        event.preventDefault();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              URL:
              <input type="text" value={this.state.originalURL} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
}

export default Form;