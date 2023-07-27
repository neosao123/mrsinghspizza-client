import React from 'react';
import { Link } from 'react-router-dom';


const MainNav = () => {
  return (
    <div className="main-nav new-block home2">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <Link href="#" className="nav-opener"><i className="fa fa-bars"></i></Link>
            <nav className="nav">
              <ul className="list-unstyled">
                <li className="drop active"><Link href="#">Home</Link>
                  <ul className="drop-down">
                    <li><Link href="home.html">Home1</Link></li>
                    <li><Link href="home2.html">Home2</Link></li>
                  </ul>
                </li>
                <li className="drop"><Link href="#">Menu</Link>
                  <ul className="drop-down">
                    <li><Link href="menu.html">Menu</Link></li>
                    <li><Link href="menu2.html">Menu2</Link></li>
                  </ul>
                </li>
                <li><Link href="about_us.html">About</Link></li>
                <li><Link href="#">Location</Link></li>
                <li><Link href="contact.html">Contact Us</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainNav;