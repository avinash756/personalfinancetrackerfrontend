import "./index.css";

import { TbBrandLinkedin } from "react-icons/tb";
import { RiTwitterXFill } from "react-icons/ri";
import { PiGithubLogoLight } from "react-icons/pi";
function Footer() {
  return (
    <div className="footer-section">
      <p className="footer-para">happy diwali</p>

      <div className="footer-links">
        <a
          href="https://www.linkedin.com/in/g-daveed-365958190/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn &nbsp; <TbBrandLinkedin />
        </a>
        &nbsp;&nbsp;
        <a href="https://x.com/Daveed53460412" target="_blank" rel="noreferrer">
          Twitter &nbsp;
          <RiTwitterXFill />
        </a>
        &nbsp;&nbsp;
        <a
          href="https://github.com/DaveedGangi"
          target="_blank"
          rel="noreferrer"
        >
          GitHub &nbsp;
          <PiGithubLogoLight />
        </a>
      </div>
    </div>
  );
}

export default Footer;
