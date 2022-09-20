import React, { Fragment, useState } from 'react';
import "./Header.css";
import { Backdrop, SpeedDial, SpeedDialAction } from "@mui/material";
import { Dashboard, ExitToApp, ListAlt, Person, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';

const UserOptions = ({ user }) => {

   const { cartItems } = useSelector((state) => state.cart);
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const options = [
      { icon: <ListAlt />, name: "Orders", func: orders },
      { icon: <Person />, name: "Profile", func: account },
      { icon: <ShoppingCart style={{color: cartItems.length ? "tomato" : "unset"}} />, name: `Cart(${cartItems.length})`, func: cart },
      { icon: <ExitToApp />, name: "Logout", func: logoutUser },
    ];

    if(user?.role === "admin"){
        options.unshift({ icon: <Dashboard />, name: "Dashboard", func: dashboard });
    }

    function dashboard() { navigate("/admin/dashboard") };

    function orders() { navigate("/orders") };

    function account() { navigate("/account") };
    
    function cart() { navigate("/cart") };

    function logoutUser() {
        dispatch(logout());
        alert.success("Logout successfully");
    }

  return (
    <Fragment>
      <Backdrop open={open} style={{zIndex: "10"}} />
      <SpeedDial
        className='speedDial'
        style={{zIndex: "11"}}
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={
          <img className="speedDialIcon" src={user?.avatar.url} alt="Profile" />
        }
      >
        {options.map((item, id) => (
          <SpeedDialAction tooltipOpen={window.innerWidth<=600? true : false} key={id} icon={item.icon} tooltipTitle={item.name} onClick={item.func} />
        ))}
              
      </SpeedDial>
    </Fragment>
  );
}

export default UserOptions;