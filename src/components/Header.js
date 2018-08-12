import React from "react";

const Header = ({title, handleClose}) =>
    <div className="header">
        <p className="title">{title}</p>
        <div className="close" onClick={handleClose}>&times;</div>
    </div>;

export default Header;
