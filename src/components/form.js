import React from 'react'; 

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalURL: '',

        };
      }
    
      handleChange = (event) => {
        this.setState({originalURL: event.target.value});
      }
    


      is_url(str) {
        const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str)){
          return true;
        }else{
          return false;
        }
      }  

      handleSubmit = (event) => {

        const isValid = this.is_url(this.state.originalURL);
        console.log(isValid);
        console.log(this.state.originalURL)

        const url = 'http://localhost:3000/urls/shorten';
        const data = { originalURL: this.state.originalURL };

        fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.log(error))
        event.preventDefault();
      }
    
      render() {
        return (
          <div className="main-container"> 
            <div className="form-container">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>URL</label>
                  <input type="text" className="form-control" placeholder="Enter URL" onChange={this.handleChange}/>
                </div>
                <div className="form-button">
                  <button type="submit" value="Submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        );
      }
}

export default Form;