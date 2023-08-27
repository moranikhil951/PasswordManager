import {Component} from 'react'
import './App.css'

import {v4 as uuidv4} from 'uuid'

const colors = ['red', 'green', 'blue', 'pink', 'brown']

class App extends Component {
  state = {
    isTrue: false,
    passwordList: [],
    website: '',
    username: '',
    password: '',

    isShow: false,
  }

  inputSearchWebsite = event => {
    this.setState({website: event.target.value})
  }

  inputSearchUsername = event => {
    this.setState({username: event.target.value})
  }

  passwordinput = event => {
    this.setState({password: event.target.value})
  }

  AddButton = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const coloralternate = colors[Math.floor(Math.random() * 5)]

    const initial = website.slice(0, 1).toUpperCase()
    const newpasswordList = {
      id: uuidv4(),
      initialValue: initial,
      searchWebsite: website,
      searchUsername: username,
      searchPassword: password,
      classAdd: coloralternate,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newpasswordList],
      searchWebsite: '',
      searchUsername: '',
      searchPassword: '',
      searchInput: '',
      isTrue: true,
    }))
  }

  clickButton = id => {
    const {passwordList} = this.state
    const deleteButtonPasword = passwordList.filter(value => id !== value.id)
    const caseOf = deleteButtonPasword.length !== 0
    this.setState({passwordList: deleteButtonPasword, isTrue: caseOf})
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {
      searchWebsite,
      searchUsername,
      searchPassword,
      passwordList,
      searchInput,
      isShow,
    } = this.state
    let {isTrue} = this.state

    const FilteredList = passwordList.filter(eachOne =>
      eachOne.searchUsername.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (passwordList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="container">
        <img
          alt="app logo"
          className="appLogo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        />
        <div className="pass-gen-container">
          <img
            alt="password manager"
            className="medium-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
          />
          <form className="password-manager" onSubmit={this.AddButton}>
            <h1 className="top-heading">Add New Password</h1>
            <div className="icon-input-con">
              <img
                alt="website"
                className="logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              />
              <input
                className="input"
                placeholder="Enter Website"
                onChange={this.inputSearchWebsite}
                value={searchWebsite}
                type="text"
              />
            </div>
            <br />
            <div className="icon-input-con">
              <img
                className="logo"
                alt="username"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              />
              <input
                className="input"
                placeholder="Enter Username"
                onChange={this.inputSearchUsername}
                value={searchUsername}
                type="text"
              />
            </div>
            <br />
            <div className="icon-input-con">
              <img
                className="logo"
                alt="password"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
              />
              <input
                className="input"
                placeholder="Enter Password"
                onChange={this.passwordinput}
                value={searchPassword}
                type="password"
              />
            </div>
            <br />
            <button className="AddButton" data-testid="delete" type="submit">
              Add
            </button>
          </form>
          <img
            className="password-set-image"
            alt="password manager"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          />
        </div>
        <div className="bottom-container">
          <div className="flexing-top-head-search-con">
            <div className="bottom-top-con">
              <h1 className="heading-password">Your Passwords</h1>

              <div className="count-color">{passwordList.length}</div>
            </div>
            <div className="search-icon-search">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                placeholder="Search"
                onChange={this.searchList}
                value={searchInput}
                className="searchinput"
              />
            </div>
          </div>
          <hr />
          <div className="checkedPassword">
            <input id="checkBox" type="checkbox" onChange={this.showPassword} />
            <label htmlFor="checkBox" className="label">
              Show passwords
            </label>
          </div>
          {!isTrue && (
            <div className="emptystate">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="empty-image"
                alt="no passwords"
              />
              <p className=" noPasswords">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="ordered-lists">
              {FilteredList.map(eachPassword => (
                <li
                  key={eachPassword.id}
                  id={eachPassword.id}
                  className="listed-items"
                >
                  <div className="Intial-flexing">
                    <div>
                      <p className={`initialValue ${eachPassword.classAdd}`}>
                        {eachPassword.initialValue}
                      </p>
                    </div>
                    <div className="bottom-password-box">
                      <p className="searchWeb">{eachPassword.searchWebsite}</p>
                      <p className="searchUsenamer">
                        {eachPassword.searchUsername}
                      </p>
                      {!isShow && (
                        <img
                          className="starsAppear"
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                        />
                      )}
                      {isShow && (
                        <p className="showpassword">
                          {eachPassword.searchPassword}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="imagesDeleteButton"
                    onClick={() => this.clickButton(eachPassword.id)}
                  >
                    <img
                      alt="delete"
                      className="deleteImage"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
