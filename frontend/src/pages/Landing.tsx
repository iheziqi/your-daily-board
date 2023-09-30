import { useRef } from 'react';
import {
  ActionFunction,
  Form,
  useActionData,
  useNavigation,
} from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

import Footer from '../components/Footer';
import InfoModal from '../components/InfoModal';
import { submitEmailAddress } from '../utils/ajax';

/**
 * Action function of react router in landing page.
 */
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { email } = data;
  const status = await submitEmailAddress(email as string);
  return status;
};

/**
 * Landing page.
 */
export default function Landing() {
  // TODO: Fetch real daily board email from database
  const menu = `<div style="background-color:#ecf0f1;border-radius: 4px 4px 0px 0px; padding: 8px;" "="">
Speiseplan <br><h4>Donnerstag 21.09.2023</h4>Aktionsessen 1<br>Currywurst mit Soße <sup><b>[4,7,Gf]</b></sup><br>3,00&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,00&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     5,00&nbsp;€&nbsp; (Gäste)<br><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/Gf.png?v=1" class="infomax-food-icon Gf" width="30" height="30" alt="food-icon"><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/R.png?v=1" class="infomax-food-icon R" width="60" height="62" alt="food-icon"><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/S.png?v=1" class="infomax-food-icon S" width="60" height="60" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 2.408&nbsp;kJ&nbsp;/&nbsp;575&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 47,5&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 14,3&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 18,0&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 14,6&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 0,5&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 19,0&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 3,5&nbsp;g&nbsp;</details><br> <br>Essen 1<br>Canneloni Nonna <sup><b>[Wz,Mi]</b></sup> mit Tomatensoße <sup><b>[1,Wz,Sel]</b></sup><br>3,09&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,09&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     6,18&nbsp;€&nbsp; (Gäste)<br><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/V.png?v=1" class="infomax-food-icon V" width="68" height="60" alt="food-icon"><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/CO2.png?v=1" class="infomax-food-icon CO2" width="30" height="64" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 2.708&nbsp;kJ&nbsp;/&nbsp;647&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 26,0&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 13,1&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 71,1&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 24,4&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 7,7&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 28,0&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 7,2&nbsp;g&nbsp;</details><br> <br>Essen 2<br>Cevapcici <sup><b>[Wz,Ei,Sen]</b></sup> mit Tomatenreis und Paprika - Dip <sup><b>[5,Wz,Ei,Mi,Sen]</b></sup><br>2,67&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 3,80&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     5,34&nbsp;€&nbsp; (Gäste)<br><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/R.png?v=1" class="infomax-food-icon R" width="60" height="62" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 3.535&nbsp;kJ&nbsp;/&nbsp;844&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 40,7&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 11,7&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 82,6&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 6,9&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 0,3&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 35,9&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 4,5&nbsp;g&nbsp;</details><br> <br>
<form action="" method="post">
<input type="submit" name="mybutton" class="btn btn-default btn-sm btn-speise" value="rückwärts" style="text-decoration: none; colo" disabled="disabled">
<button class="btn btn-default btn-sm btn" disabled="disabled"> | 21.09.2023 |</button>
<input type="submit" name="mybutton" class="btn btn-default btn-sm btn-speise" value="vorwärts">
</form>


</div>`;

  // reference to the modal element
  const infoModal = useRef<HTMLDialogElement>(null);

  // current navigation of react router
  const navigation = useNavigation();

  // returned response from action function
  const actionResponse = useActionData();

  if (navigation.state === 'idle' && actionResponse === 201) {
    // Opens information modal.
    // The modal is a dialog element, so it calls showModal()
    infoModal.current?.showModal();
  }

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
            <p className="py-3 text-lg font-bold max-md:text-base  text-neutral-500">
              Stay informed about Studierendenwerk Erlangen-Nürnberg&apos;s
              Mensa menus with the email newsletter.
            </p>
            <Form method="POST">
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full max-w-xs mr-5 mb-2"
                required
              />
              <button className="btn btn-primary" type="submit">
                {navigation.state === 'submitting'
                  ? 'submitting'
                  : 'sign me up'}
              </button>
            </Form>
            <InfoModal
              title="You are so close!"
              content="An email has been sent to you to verify your email address, please check your email inbox. The link in the email will expire in 15 minutes"
              buttonContent="close"
              ref={infoModal}
            />
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
      <Footer />
    </>
  );
}
