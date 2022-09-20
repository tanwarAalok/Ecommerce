import React, { Fragment, useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import './Home.css';
import Product from "./ProductCard";
import MetaData from '../layout/MetaData';
import { getProduct } from '../../actions/productActions';
import { useDispatch, useSelector } from "react-redux";
import Loader from '../layout/Loader/Loader';
import { useAlert } from "react-alert";

const Home = () => {

  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(state => state.products);
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Product</h2>

          <div className="container" id="container">
            {products &&
              products.map((product, i) => <Product key={i} product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;