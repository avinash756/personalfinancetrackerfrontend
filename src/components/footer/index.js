import "./index.css";

import { TbBrandLinkedin } from "react-icons/tb";
import { RiTwitterXFill } from "react-icons/ri";
import { PiGithubLogoLight } from "react-icons/pi";
function Footer(){


    return(

        <div className="footer-section">

            <p className="footer-para">© 2025 Daveed Gangi. All Rights Reserved.</p>

            <div className="footer-links">
                <a href="https://www.linkedin.com/in/g-daveed-365958190/" target="_blank">LinkedIn &nbsp; <TbBrandLinkedin /></a>&nbsp;&nbsp;
                <a href="https://x.com/Daveed53460412" target="_blank">Twitter &nbsp;<RiTwitterXFill /></a>&nbsp;&nbsp;
                <a href="https://github.com/DaveedGangi" target="_blank">GitHub &nbsp;<PiGithubLogoLight /></a>
            </div>
            
        </div>
    )
}

export default Footer;