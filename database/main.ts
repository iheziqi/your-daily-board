import { mensaList } from './mensaList';
import { getMensaMenu } from './getMensaMenu';
import { getCurrentDate } from './utils/utils';
import { MenuDB, UserDB } from './database';

export type MensaMenu = {
	// The string id of mensa.
	category: string;
	// The current data in format of YYYY-MM-DD.
	date: string;
	// The string of menu.
	menuText: string;
};

const menu = `
<div style="background-color:#ecf0f1;border-radius: 4px 4px 0px 0px; padding: 8px;" "="">
Speiseplan <br><h4>Donnerstag 06.04.2023</h4>Essen 1<br>Schupfnudeln mit Tomaten und Hirtenkäse <sup><b>[Wz,So,Mi]</b></sup><br>2,88&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 3,88&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     5,76&nbsp;€&nbsp; (Gäste)<br><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/V.png?v=1" class="infomax-food-icon V" width="68" height="60" alt="food-icon"><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/CO2.png?v=1" class="infomax-food-icon CO2" width="30" height="64" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 2.764&nbsp;kJ&nbsp;/&nbsp;660&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 29,9&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 15,1&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 66,5&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 22,4&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 7,6&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 27,4&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 2,6&nbsp;g&nbsp;</details><br> <br>Essen 2<br>Vollkorn Pilz Bratling <sup><b>[Wz,Sel,Hf]</b></sup> mit Chili-Ingwer-Soße<br>2,54&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 3,54&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     5,08&nbsp;€&nbsp; (Gäste)<br><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/veg.png?v=1" class="infomax-food-icon veg" width="14" height="14" alt="food-icon"><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/CO2.png?v=1" class="infomax-food-icon CO2" width="30" height="64" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 2.176&nbsp;kJ&nbsp;/&nbsp;520&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 36,3&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 6,2&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 38,5&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 6,3&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 0,6&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 7,5&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 1,4&nbsp;g&nbsp;</details><br> <br>Essen 3<br>Eipatty <sup><b>[Ei,Mi,Sel]</b></sup> Spinat <sup><b>[Wz,Mi]</b></sup> Kartoffeln<br>2,77&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 3,80&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     5,54&nbsp;€&nbsp; (Gäste)<br><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/G.png?v=1" class="infomax-food-icon G" width="60" height="60" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 2.160&nbsp;kJ&nbsp;/&nbsp;516&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 29,2&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 12,8&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 35,4&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 3,4&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 1,0&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 26,2&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 1,7&nbsp;g&nbsp;</details><br> <br>
<form action="" method="post">
<input type="submit" name="mybutton" class="btn btn-default btn-sm btn-speise" value="rückwärts" style="text-decoration: none; colo" disabled="disabled">
<button class="btn btn-default btn-sm btn" disabled="disabled"> | 06.04.2023 |</button>
<input type="submit" name="mybutton" class="btn btn-default btn-sm btn-speise" value="vorwärts">
</form>
</div>
`;

const mealRegex = /<h4>(.*?)<\/h4>/;
const nameRegex = /Essen (\d)/;
const descRegex = /<br>(.*?)<sup>/;
const priceRegex = /([\d,]+)&nbsp;€&nbsp;\((.*?)\)/g;
const meal = mealRegex.exec(menu)![1];
const name = nameRegex.exec(menu)![1];
const desc = descRegex.exec(menu)![1];
console.log(meal);
console.log(name);
console.log(desc);


