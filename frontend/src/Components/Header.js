import React from 'react';
//import pic1 from "../picture/icon.png"
const Header = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light rounded sticky-top mb-3" style={{backgroundColor:"#4c4c9c"}}>
                <div className="container-fluid" >
                    <a className="navbar-brand" href="/" style={{color:"white",fontSize:"XX-Large"}}> Display Table</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <a className="nav-link custom-nav" href="/register">Register</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link custom-nav2" href="/find">Find Donor</a>
                        </li>
                    </ul>
                </div> */}
            </nav>
    </div>
    );
};

export default Header;
