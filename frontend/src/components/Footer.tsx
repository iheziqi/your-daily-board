import YourDailyBoardIcon from './icons/YourDailyBoardIcon';

/**
 * Page footer.
 * @returns JSX element of page footer
 */
function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-primary text-primary-content">
      <aside>
        <YourDailyBoardIcon />
        <p className="font-bold">Your Daily Board created by Ziqi</p>
      </aside>
    </footer>
  );
}

export default Footer;
