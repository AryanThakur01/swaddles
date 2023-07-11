const Footer = () => {
  return (
    <div className="relative z-0 px-[5%] md:px-[15%] m-auto bg-primary_white py-10">
      <div className="tracking-widest text-2xl my-5">SWADDLES</div>
      <div className="flex md:flex-row flex-col justify-between">
        <div>
          <h2>Company</h2>
          <ul className="text-tertiary_dark">
            <li>
              <button type="button">Features</button>
            </li>
            <li>
              <button type="button">Affiliate Program</button>
            </li>
          </ul>
        </div>
        <div>
          <h2>Support</h2>
          <ul className="text-tertiary_dark">
            <li>
              <button type="button">Account</button>
            </li>
            <li>
              <button type="button">Contact Us</button>
            </li>
            <li>
              <button type="button">Customer Support</button>
            </li>
          </ul>
        </div>
        <div>
          <h2>Legals</h2>
          <ul className="text-tertiary_dark">
            <li>
              <button type="button">Terms & Conditions</button>
            </li>
            <li>
              <button type="button">Licensing</button>
            </li>
            <li>
              <button type="button">Privacy Policy</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
