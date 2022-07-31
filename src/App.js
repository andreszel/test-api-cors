import React, { PureComponent } from "react";

const API_PREFIX = "https://odbioromatdevapi.bookinglock.com/v1";

const URLS_API = {
  boxes: API_PREFIX + "/odbioromat/boxes",
  box_free: API_PREFIX + "/odbioromat/box-free",
  code: API_PREFIX + "/odbioromat/code",
  code_quick_add: API_PREFIX + "/odbioromat/code-quick-add",
  login: API_PREFIX + "/login"
};

class App extends PureComponent {

  state = {
    dataAccess:{
      loginSys: "",
      passSys: "",
      jwt: "",
      odbioromat_id: "",
    },
    isLogin: false,
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    setTimeout(this.loginToSystem, 1000);
  }

  /**
   * ********************* loginToSystem ****************************************
   */

   loginToSystem = () => {
    const dataAccess = {
      loginSys: "358d09070047c700a0c9f1d2791d71134",
      passSys: "n6aHKZhejysg",
      jwt: "",
      odbioromat_id: "",
    };
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login: dataAccess.loginSys, password: dataAccess.passSys }),
    };

    fetch(URLS_API.login, requestOptions)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject("some reason reject in login to API!");
        }
        return response.json();
      })
      .then((res) => {
        const dataAccessLocal = Object.assign({}, dataAccess, {
          jwt: res.jwt,
          odbioromat_id: res.odbioromat_id,
        });
        
        //const timeTokenExp = (res.data.exp*1000);
        //const currentTime = new Date().getTime();
        //const diffTime = timeTokenExp-currentTime;

        this.setState({
          isLogin: true,
          dataAccess: dataAccessLocal
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  render() {
    return (
      <div className="App">
      <header className="App-header">
        test fetch in create react app
      </header>
    </div>
    );
  };
}

export default App;
