import { Typewriter } from 'react-simple-typewriter';
import YourDailyBoardIcon from '../components/YourDailyBoardIcon';

/**
 * Landing page
 */
function Landing() {
  // TODO: Fetch real daily board email from database
  const menu = `<div style="background-color:#ecf0f1;border-radius: 4px 4px 0px 0px; padding: 8px;" "="">
Speiseplan <br><h4>Donnerstag 21.09.2023</h4>Aktionsessen 1<br>Currywurst mit Soße <sup><b>[4,7,Gf]</b></sup><br>3,00&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,00&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     5,00&nbsp;€&nbsp; (Gäste)<br><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/Gf.png?v=1" class="infomax-food-icon Gf" width="30" height="30" alt="food-icon"><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/R.png?v=1" class="infomax-food-icon R" width="60" height="62" alt="food-icon"><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/S.png?v=1" class="infomax-food-icon S" width="60" height="60" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 2.408&nbsp;kJ&nbsp;/&nbsp;575&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 47,5&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 14,3&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 18,0&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 14,6&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 0,5&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 19,0&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 3,5&nbsp;g&nbsp;</details><br> <br>Essen 1<br>Canneloni Nonna <sup><b>[Wz,Mi]</b></sup> mit Tomatensoße <sup><b>[1,Wz,Sel]</b></sup><br>3,09&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,09&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     6,18&nbsp;€&nbsp; (Gäste)<br><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/V.png?v=1" class="infomax-food-icon V" width="68" height="60" alt="food-icon"><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/CO2.png?v=1" class="infomax-food-icon CO2" width="30" height="64" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 2.708&nbsp;kJ&nbsp;/&nbsp;647&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 26,0&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 13,1&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 71,1&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 24,4&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 7,7&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 28,0&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 7,2&nbsp;g&nbsp;</details><br> <br>Essen 2<br>Cevapcici <sup><b>[Wz,Ei,Sen]</b></sup> mit Tomatenreis und Paprika - Dip <sup><b>[5,Wz,Ei,Mi,Sen]</b></sup><br>2,67&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 3,80&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     5,34&nbsp;€&nbsp; (Gäste)<br><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/R.png?v=1" class="infomax-food-icon R" width="60" height="62" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 3.535&nbsp;kJ&nbsp;/&nbsp;844&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 40,7&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 11,7&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 82,6&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 6,9&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 0,3&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 35,9&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 4,5&nbsp;g&nbsp;</details><br> <br>
<form action="" method="post">
<input type="submit" name="mybutton" class="btn btn-default btn-sm btn-speise" value="rückwärts" style="text-decoration: none; colo" disabled="disabled">
<button class="btn btn-default btn-sm btn" disabled="disabled"> | 21.09.2023 |</button>
<input type="submit" name="mybutton" class="btn btn-default btn-sm btn-speise" value="vorwärts">
</form>


</div>`;

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold max-md:text-4xl">
              Your Daily{' '}
              <span className="text-secondary">
                <Typewriter
                  words={['Board', 'Mensa Menu', 'Exchange Rate', 'More!']}
                  loop={false}
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h1>
            {/* <h2 className="pt-3 text-xl max-md:text-base text-primary font-bold">
            Stay informed about Studierendenwerk Erlangen-Nürnberg&apos;s <br />
            Mensa menus with Your Daily Board&apos;s email newsletter
          </h2> */}

            <p className="py-3 text-lg font-bold max-md:text-base  text-neutral-500">
              Stay informed about Studierendenwerk Erlangen-Nürnberg&apos;s
              Mensa menus with the email newsletter.
            </p>
            {/** TODO: submit the form to url endpoint and use modal to notify */}
            <form action="" method="post">
              <input
                type="text"
                placeholder="Email Address"
                className="input input-bordered input-primary w-full max-w-xs mr-5 mb-2"
              />
              <button className="btn btn-primary" type="submit">
                Sign me up
              </button>
            </form>
            <p className="py-3 text-sm max-md:text-sm text-neutral-400">
              By choosing to sign up, a newsletter email will be sent to you on
              a daily basis.
              <br /> You can opt out at any time.
            </p>
          </div>

          <div className="mockup-phone max-lg:hidden overflow-y-scroll flex-shrink-0">
            <div className="camera" />
            <div className="artboard artboard-demo phone-1 display">
              {/**  Use Static HTML with React */}
              <div
                dangerouslySetInnerHTML={{ __html: menu }}
                className="artboard artboard-demo phone-1"
              />
            </div>
          </div>
        </div>
      </div>
      <footer className="footer footer-center p-10 bg-primary text-primary-content">
        <aside>
          <YourDailyBoardIcon />
          <p className="font-bold">Your Daily Board created by Ziqi</p>
          <p>
            <a
              href="http://github.com/iheziqi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="32px"
                height="32px"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path
                  fill="#f6f6f6"
                  fillRule="evenodd"
                  d="M8 1C4.133 1 1 4.13 1 7.993c0 3.09 2.006 5.71 4.787 6.635.35.064.478-.152.478-.337 0-.166-.006-.606-.01-1.19-1.947.423-2.357-.937-2.357-.937-.319-.808-.778-1.023-.778-1.023-.635-.434.048-.425.048-.425.703.05 1.073.72 1.073.72.624 1.07 1.638.76 2.037.582.063-.452.244-.76.444-.935-1.554-.176-3.188-.776-3.188-3.456 0-.763.273-1.388.72-1.876-.072-.177-.312-.888.07-1.85 0 0 .586-.189 1.924.716A6.711 6.711 0 018 4.381c.595.003 1.194.08 1.753.236 1.336-.905 1.923-.717 1.923-.717.382.963.142 1.674.07 1.85.448.49.72 1.114.72 1.877 0 2.686-1.638 3.278-3.197 3.45.251.216.475.643.475 1.296 0 .934-.009 1.688-.009 1.918 0 .187.127.404.482.336A6.996 6.996 0 0015 7.993 6.997 6.997 0 008 1z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </p>
        </aside>
      </footer>
    </>
  );
}

export default Landing;
