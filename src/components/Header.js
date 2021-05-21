import '../style/header.css';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Header = ({ setQuery }) => {

  const [ searchText, setSearchText ] = useState('');
  const [ redirectUser, doRedirectUser ] = useState(false);

  const searchForContent = (e) => {
    e.preventDefault();
    if(searchText){
      setQuery(searchText);
      doRedirectUser(true);
    }
  }

  const setSearchTextSafe = text => {
    doRedirectUser(false);
    setSearchText(text);
  }

  return(
    <>
      <div id="header-component">
        <Navbar>
          <Nav className="mr-auto">
            <div className="sidebar-opener"></div>
            <Nav.Link href= "/">Home</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
            <div className="vert-line"></div>
          </Nav>
          <Nav className="title-namee">
            SCRUMPTIOUS
          </Nav>
          <Form inline onSubmit={searchForContent}>
            <input
              onChange={e => setSearchTextSafe(e.target.value)}
              type="text"
              placeholder="Search"
              className="search-input"
            />
            <span className="shopping-icon">0</span>
          </Form>
        </Navbar>
        <div className="inline-header"></div>
      </div>
      { redirectUser ? <Redirect push to={`/search?query=${searchText}`}/> : null }
    </>
  )
}

export default Header;
