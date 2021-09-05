import Header from "./component/header";
import Footer from "./component/footer";
import store from './store';
import { Provider } from "react-redux";
import Filter from "./component/Filter";
import cartComponent from "./component/cartComponent";
import { Home } from "./Admin/Home";
import { BrowserRouter, Route } from "react-router-dom";
import products from "./component/products";
import UserRegister from "./component/userRegister";
import userLogin from "./component/userLogin";
function App() {

  return (
    <Provider store={store}>
      <div style={{ height: '100%' }}>

        <BrowserRouter>
          <Header />
          <Route children={(props) => <Filter {...props} />} />
          {/* <Filter /> */}
          {/* <Route path="/" render={(props) => (props.location.pathname !== "/Register") &&
            <Header />}>
          </Route> */}

          {/* <Route path="/" render={(props) => (props.location.pathname !== "/Register" && props.location.pathname !== "/Admin") &&
            <Filter />}> 
          </Route>*/}
          <Route path="/" component={products} exact />
          <Route path="/Register" exact component={UserRegister} />
          <Route path="/Login" component={userLogin} />
          {/* <Route path="/" render={props => <Header><products {...props} /> </Header>} exact /> */}

          <Route path="/cartList" component={cartComponent} />

          <Route path="/Admin/Home" component={Home} />

        </BrowserRouter>
        <Footer />
      </div>
    </Provider >
  );
}

export default App;
