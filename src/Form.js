import React from 'react';

class Form extends React.Component {
    
  constructor(props) {
        super(props);
        this.state = {
            originalURL: '',
            shortURL: '',
            disabled: true

        };
      }
    

      
      handleChange = (event) => {
        //url is valid, therefore submit button is enabled
        if (this.isUrl(event.target.value)) {
          this.setState({originalURL: event.target.value, disabled: false});
        
        //url is NOT valid, therfore submit button is disabled
        }else {
          this.setState({disabled: true});
        }
      }
    


      isUrl(str) {
        //uses reg expression to check url validity
        const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        return regexp.test(str)
      }  



      copyURL() {
        //copies url to clip board by selecting the content of text field
        //then executing the 'copy' command
        document.getElementById("short-url").select()
        document.execCommand("Copy")        
      }

      handleSubmit = (event) => {

        //prevents browser from refreshing the page
        event.preventDefault();

        const url = 'http://localhost:3000/urls/shorten';
        const data = { original_url: this.state.originalURL };

        //post the long url /urls/shorten and receice a shortened url
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(response => this.setState({shortURL: response.short_url}))
        .catch(error => console.log(error))
      }
    
      render() {
        return (
          <div className="main-container"> 
            <div className="form-container">
              <form onSubmit={this.handleSubmit}>

                <div className="form-group">
                  <label>Original URL</label>
                  <input type="text" className="form-control" placeholder="Enter URL" onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                  <label>Shortened URL</label>
                  <div className="short-url-div">
                    <input id="short-url" type="text" className="form-control" defaultValue={this.state.shortURL} readOnly/>
                    <button type="button" className="btn btn-primary btn-sm red" onClick={this.copyURL}>Copy</button>
                  </div>
                </div>

                <div className="form-button">
                  <button type="submit" value="Submit" className="red btn btn-primary" disabled={this.state.disabled}>Submit</button>
                </div>
                
              </form>
            </div>
          </div>
        );
      }
}

export default Form;