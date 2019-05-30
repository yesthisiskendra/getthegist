import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'


class App extends Component {
  constructor(){
    super();
    this.state = {
      gists: null
    }
  }

  componentDidMount(){
    console.log('we here!!')
    fetch('https://api.github.com/users/yesthisiskendra/repos')
      .then(res => res.json())
      .then(gists => {
        this.setState({ gists })
      })
      .then(console.log('STATE', this.state))

  }

  render(){
    const { gists } = this.state
    console.log(gists)
    return(
      <Router>
        <div>
          <h1> Henlo Der </h1>
          { gists ? (
            gists.map(gist => (
              <li key={gist.id}>
                <Link to={`/g/${gist.id}`}>
                  {gist.description || 'no description'}
                </Link>
              </li>
            ))) : (
              <div> Loading </div>
      
          )}
        </div>
        {gists && (
          <Route path="/g/:gistId" render={({ match }) => (
            <Gist gist={gists.find(g => g.id === parseInt(match.params.gistId))} />
            )}/>
        )}
        
      </Router>
    ) 
  }
}

const Gist = ({ gist }) => {
  return(
    <div>
      {gist.description}
    </div>
  )
}
export default App;
