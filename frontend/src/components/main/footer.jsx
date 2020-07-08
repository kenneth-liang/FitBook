import React from "react"
import { Link } from 'react-router-dom'

class Footer extends React.Component {
    render () {
        return (
            <div id="footer-container">
                <div className="footer"> 
                    <h1>FitBook</h1>
                    <section id="nav_menu" className="col">
                        <div className="scn">
                            <p className="menu">Menu</p>
                            <ul>
                                <li>
                                <Link >Who are we</Link> 
                                </li>
                                <li>
                                    <Link>Learn more</Link>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <footer>Copyright &copy; 2020 Fitbook</footer>

                </div>

            </div>
        )
    };
};

export default Footer;