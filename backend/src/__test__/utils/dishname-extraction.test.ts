import { extractDishes } from '../../repositories/extract-mensa-dishes';

describe('dish name extraction tests', () => {
  test('dish name extraction test1', () => {
    const html = `<div style="background-color:#ecf0f1;border-radius: 4px 4px 0px 0px; padding: 8px;" "="">

Speiseplan <br><h4>Montag 07.10.2024</h4>Aktionsessen 1<br>Currywurst mit Soße <sup><b>[4,7,Gf]</b></sup><br>3,00&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,00&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     5,00&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20241007092034im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/Gf.png?v=1" class="infomax-food-icon Gf" width="30" height="30" alt="food-icon"><img src="https://web.archive.org/web/20241007092034im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/R.png?v=1" class="infomax-food-icon R" width="60" height="62" alt="food-icon"><img src="https://web.archive.org/web/20241007092034im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/S.png?v=1" class="infomax-food-icon S" width="60" height="60" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 2.400&nbsp;kJ&nbsp;/&nbsp;573&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 47,5&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 14,3&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 17,7&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 14,5&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 0,5&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 18,9&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 2,9&nbsp;g&nbsp;</details><br> <br>Essen 1<br>Köttbullar mit Preiselbeeren <sup><b>[R,S]</b></sup> mit Rahmsoße <sup><b>[1,Wz,Mi,Ge]</b></sup> Kartoffelpüree <sup><b>[7,Mi,Su]</b></sup><br>3,08&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,28&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     6,16&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20241007092034im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/R.png?v=1" class="infomax-food-icon R" width="60" height="62" alt="food-icon"><img src="https://web.archive.org/web/20241007092034im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/S.png?v=1" class="infomax-food-icon S" width="60" height="60" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 2.754&nbsp;kJ&nbsp;/&nbsp;658&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 44,9&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 15,2&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 33,0&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 7,5&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 0,2&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 29,8&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 5,2&nbsp;g&nbsp;</details><br> <br>Essen 2<br>Nudeln mit Ratatouille und Hüttenkäse <sup><b>[Wz,Mi]</b></sup><br>2,52&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,13&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     5,04&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20241007092034im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/V.png?v=1" class="infomax-food-icon V" width="68" height="60" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 3.168&nbsp;kJ&nbsp;/&nbsp;757&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 20,4&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 3,8&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 103,6&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 20,6&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 4,9&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 33,1&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 1,3&nbsp;g&nbsp;</details><br> <br>Essen 3<br>Wrap gefüllt mit Kraut und Pfannengemüse <sup><b>[1,4,5,9,Wz,Su]</b></sup> dazu Gremolata<br>3,36&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,56&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     6,72&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20241007092034im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/veg.png?v=1" class="infomax-food-icon veg" width="14" height="14" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 4.873&nbsp;kJ&nbsp;/&nbsp;1.164&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 85,0&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 13,6&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 84,2&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 13,6&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 7,2&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 14,7&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 4,4&nbsp;g&nbsp;</details><br> <br>Tipp des Tages<br>Heute geöffnet bis 17.30 Uhr<br>-&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; -&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     -&nbsp;€&nbsp; (Gäste)<br><details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 0&nbsp;kJ&nbsp;/&nbsp;0&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 0,0&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 0,0&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 0,0&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 0,0&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 0,0&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 0,0&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 0,0&nbsp;g&nbsp;</details><br> <br>
<form action="" method="post">
<input type="submit" name="mybutton" class="btn btn-default btn-sm btn-speise" value="rückwärts" style="text-decoration: none; colo" disabled="disabled">
<button class="btn btn-default btn-sm btn" disabled="disabled"> | 07.10.2024 |</button>
<input type="submit" name="mybutton" class="btn btn-default btn-sm btn-speise" value="vorwärts">
</form>

</div>`;

    const dishData = extractDishes(html);

    expect(Array.isArray(dishData)).toBe(true);
    expect(dishData.length).toBe(4);

    expect(dishData[0].dish_category).toBe('Aktionsessen 1');
    expect(dishData[0].dish_name).toBe('Currywurst mit Soße [4,7,Gf]');

    expect(dishData[1].dish_category).toBe('Essen 1');
    expect(dishData[1].dish_name).toBe(
      'Köttbullar mit Preiselbeeren [R,S] mit Rahmsoße [1,Wz,Mi,Ge] Kartoffelpüree [7,Mi,Su]'
    );

    expect(dishData[2].dish_category).toBe('Essen 2');
    expect(dishData[2].dish_name).toBe(
      'Nudeln mit Ratatouille und Hüttenkäse [Wz,Mi]'
    );

    expect(dishData[3].dish_category).toBe('Essen 3');
    expect(dishData[3].dish_name).toBe(
      'Wrap gefüllt mit Kraut und Pfannengemüse [1,4,5,9,Wz,Su] dazu Gremolata'
    );
  });

  test('dish name extraction test2', () => {
    const html = `<div style="background-color:#ecf0f1;border-radius: 4px 4px 0px 0px; padding: 8px;" "="">
Speiseplan <br><h4>Montag 07.10.2024</h4>Essen 1<br>Köttbullar mit Preiselbeeren <sup><b>[R,S]</b></sup>, Rahmsoße <sup><b>[Wz,Mi,Ge]</b></sup> und Nudeln<sup><b>[Wz]</b></sup><br>3,08&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,28&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     6,16&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20241007113834im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/R.png?v=1" class="infomax-food-icon R" width="60" height="62" alt="food-icon"><img src="https://web.archive.org/web/20241007113834im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/S.png?v=1" class="infomax-food-icon S" width="60" height="60" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 2.754&nbsp;kJ&nbsp;/&nbsp;658&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 44,9&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 15,2&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 33,0&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 7,5&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 0,2&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 29,8&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 5,2&nbsp;g&nbsp;</details><i>Optional: Pommes-Frites</i><br><br> <br>Essen 2<br>Pasta mit Ratatouille und Hüttenkäse <sup><b>[Wz,Mi]</b></sup><br>2,52&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,13&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     5,04&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20241007113834im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/V.png?v=1" class="infomax-food-icon V" width="68" height="60" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 2.933&nbsp;kJ&nbsp;/&nbsp;701&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 20,5&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 3,4&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 93,3&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 21,9&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 6,7&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 31,4&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 1,2&nbsp;g&nbsp;</details><br> <br>Essen 3<br>Wrap gefüllt mit Kraut, Pfannengemüse <sup><b>[4,5,9,Wz,Su]</b></sup> und veganen Kräuter-Dip <sup><b>[So,Sen]</b></sup><br>3,36&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,56&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     6,72&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20241007113834im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/veg.png?v=1" class="infomax-food-icon veg" width="14" height="14" alt="food-icon"><img src="https://web.archive.org/web/20241007113834im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/CO2.png?v=1" class="infomax-food-icon CO2" width="30" height="64" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 4.579&nbsp;kJ&nbsp;/&nbsp;1.094&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 76,2&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 13,1&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 85,2&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 16,4&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 6,2&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 14,3&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 4,5&nbsp;g&nbsp;</details><i>Optional: Pommes-Frites</i><br><br> <br>
<form action="" method="post">
<input type="submit" name="mybutton" class="btn btn-default btn-sm btn-speise" value="rückwärts" style="text-decoration: none; colo" disabled="disabled">
<button class="btn btn-default btn-sm btn" disabled="disabled"> | 07.10.2024 |</button>
<input type="submit" name="mybutton" class="btn btn-default btn-sm btn-speise" value="vorwärts">
</form>
</div>`;

    const dishData = extractDishes(html);

    expect(Array.isArray(dishData)).toBe(true);
    expect(dishData.length).toBe(3);

    expect(dishData[0].dish_category).toBe('Essen 1');
    expect(dishData[0].dish_name).toBe(
      'Köttbullar mit Preiselbeeren [R,S], Rahmsoße [Wz,Mi,Ge] und Nudeln[Wz]'
    );

    expect(dishData[1].dish_category).toBe('Essen 2');
    expect(dishData[1].dish_name).toBe(
      'Pasta mit Ratatouille und Hüttenkäse [Wz,Mi]'
    );

    expect(dishData[2].dish_category).toBe('Essen 3');
    expect(dishData[2].dish_name).toBe(
      'Wrap gefüllt mit Kraut, Pfannengemüse [4,5,9,Wz,Su] und veganen Kräuter-Dip [So,Sen]'
    );
  });

  test('dish name extraction test3', () => {
    const html = `<div style="background-color:#ecf0f1;border-radius: 4px 4px 0px 0px; padding: 8px;" "="">
Speiseplan <br><h4>Mittwoch 25.10.2023</h4>Aktionsessen 6<br>große Salatbowl verschieden garniert <sup><b>[4,7,12,Wz,Ei,Fi,Mi]</b></sup><br>3,45&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,65&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     6,90&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20231025163350im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/F.png?v=1" class="infomax-food-icon F" width="60" height="60" alt="food-icon"><img src="https://web.archive.org/web/20231025163350im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/S.png?v=1" class="infomax-food-icon S" width="60" height="60" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 1.214&nbsp;kJ&nbsp;/&nbsp;290&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 15,5&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 9,8&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 22,4&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 8,1&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 3,8&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 15,6&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 0,8&nbsp;g&nbsp;</details><br> <br>Essen 1<br>Frühlingsknödel im Sesammöhrensud m.fr.Kräutern <sup><b>[7,Gf,Sel,Ses,Su]</b></sup><br>2,84&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,04&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     5,68&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20231025163350im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/Gf.png?v=1" class="infomax-food-icon Gf" width="30" height="30" alt="food-icon"><img src="https://web.archive.org/web/20231025163350im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/veg.png?v=1" class="infomax-food-icon veg" width="14" height="14" alt="food-icon"><img src="https://web.archive.org/web/20231025163350im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/CO2.png?v=1" class="infomax-food-icon CO2" width="30" height="64" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 1.764&nbsp;kJ&nbsp;/&nbsp;421&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 11,6&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 1,9&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 68,1&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 13,5&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 3,6&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 7,0&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 10,7&nbsp;g&nbsp;</details><br> <br>Essen 2<br>Mais Nuggets mit <sup><b>[Wz,So]</b></sup> Barbecue Dip (Vegan) <sup><b>[5,9,Sel,Su]</b></sup><br>3,51&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,71&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     7,02&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20231025163350im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/veg.png?v=1" class="infomax-food-icon veg" width="14" height="14" alt="food-icon"><img src="https://web.archive.org/web/20231025163350im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/CO2.png?v=1" class="infomax-food-icon CO2" width="30" height="64" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 3.162&nbsp;kJ&nbsp;/&nbsp;755&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 53,3&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 4,4&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 45,0&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 7,2&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 0,2&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 19,7&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 3,9&nbsp;g&nbsp;</details><br> <br>
<form action="" method="post">
<input type="submit" name="mybutton" class="btn btn-default btn-sm btn-speise" value="rückwärts" style="text-decoration: none; colo" disabled="disabled">
<button class="btn btn-default btn-sm btn" disabled="disabled"> | 25.10.2023 |</button>
<input type="submit" name="mybutton" class="btn btn-default btn-sm btn-speise" value="vorwärts">
</form>
</div>`;

    const dishData = extractDishes(html);

    expect(Array.isArray(dishData)).toBe(true);
    expect(dishData.length).toBe(3);

    expect(dishData[0].dish_category).toBe('Aktionsessen 6');
    expect(dishData[0].dish_name).toBe(
      'große Salatbowl verschieden garniert [4,7,12,Wz,Ei,Fi,Mi]'
    );

    expect(dishData[1].dish_category).toBe('Essen 1');
    expect(dishData[1].dish_name).toBe(
      'Frühlingsknödel im Sesammöhrensud m.fr.Kräutern [7,Gf,Sel,Ses,Su]'
    );

    expect(dishData[2].dish_category).toBe('Essen 2');
    expect(dishData[2].dish_name).toBe(
      'Mais Nuggets mit [Wz,So] Barbecue Dip (Vegan) [5,9,Sel,Su]'
    );
  });

  test('dish name extraction test4', () => {
    const html = `<div style="background-color:#ecf0f1;border-radius: 4px 4px 0px 0px; padding: 8px;" "="">
Speiseplan <br><h4>Dienstag 27.02.2024</h4>Essen 1<br>Paprikarahmgulasch vom Schwein <sup><b>[Wz,Mi]</b></sup> Kartoffelpüree <sup><b>[7,12,Mi]</b></sup><br>3,37&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,57&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     6,74&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20240227042318im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/S.png?v=1" class="infomax-food-icon S" width="60" height="60" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 2.167&nbsp;kJ&nbsp;/&nbsp;518&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 29,3&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 9,8&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 24,4&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 9,6&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 3,1&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 37,3&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 1,5&nbsp;g&nbsp;</details><br> <br>Essen 2<br>Indisches Kartoffelcurry mit Mangoreis <sup><b>[Wz,So,Sel]</b></sup><br>2,99&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,19&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     5,98&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20240227042318im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/veg.png?v=1" class="infomax-food-icon veg" width="14" height="14" alt="food-icon"><img src="https://web.archive.org/web/20240227042318im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/MV.png?v=1" class="infomax-food-icon MV" width="144" height="46" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 3.041&nbsp;kJ&nbsp;/&nbsp;726&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 25,8&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 12,7&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 102,5&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 25,0&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 4,8&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 15,7&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 2,0&nbsp;g&nbsp;</details><br> <br>
<form action="" method="post">
<input type="submit" name="mybutton" class="btn btn-default btn-sm btn-speise" value="rückwärts" style="text-decoration: none; colo" disabled="disabled">
<button class="btn btn-default btn-sm btn" disabled="disabled"> | 27.02.2024 |</button>
<input type="submit" name="mybutton" class="btn btn-default btn-sm btn-speise" value="vorwärts">
</form>
</div>`;

    const dishData = extractDishes(html);

    expect(Array.isArray(dishData)).toBe(true);
    expect(dishData.length).toBe(2);

    expect(dishData[0].dish_category).toBe('Essen 1');
    expect(dishData[0].dish_name).toBe(
      'Paprikarahmgulasch vom Schwein [Wz,Mi] Kartoffelpüree [7,12,Mi]'
    );

    expect(dishData[1].dish_category).toBe('Essen 2');
    expect(dishData[1].dish_name).toBe(
      'Indisches Kartoffelcurry mit Mangoreis [Wz,So,Sel]'
    );
  });

  test('dish name extraction test5', () => {
    const html = `<div style="background-color:#ecf0f1;border-radius: 4px 4px 0px 0px; padding: 8px;" "="">
Speiseplan <br><h4>Dienstag 24.10.2023</h4>Aktionsessen 1<br>Grill-Käsetaler gebraten mit <sup><b>[Mi]</b></sup> Kaisergemüse <sup><b>[Mi]</b></sup> Kartoffeln <sup><b>[Mi]</b></sup> Quark - Dip <sup><b>[5,Wz,Ei,Mi,Sen]</b></sup><br>5,01&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 6,21&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     10,02&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20231024091448im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/V.png?v=1" class="infomax-food-icon V" width="68" height="60" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 5.774&nbsp;kJ&nbsp;/&nbsp;1.379&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 122,1&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 56,2&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 46,4&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 11,7&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 0,2&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 26,4&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 3,4&nbsp;g&nbsp;</details><br> <br>Aktionsessen 2<br>Cheesecake Balls Marille mit <sup><b>[Wz,Mi]</b></sup> Pflaumenkompott <sup><b>[7]</b></sup><br>3,71&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,91&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     7,42&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20231024091448im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/CO2.png?v=1" class="infomax-food-icon CO2" width="30" height="64" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 2.462&nbsp;kJ&nbsp;/&nbsp;588&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 31,8&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 13,6&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 64,8&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 30,4&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 0,7&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 9,6&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 0,8&nbsp;g&nbsp;</details><br> <br>Aktionsessen 6<br>große Salatbowl verschieden garniert <sup><b>[4,7,12,Wz,Ei,Fi,Mi]</b></sup><br>3,45&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,65&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     6,90&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20231024091448im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/F.png?v=1" class="infomax-food-icon F" width="60" height="60" alt="food-icon"><img src="https://web.archive.org/web/20231024091448im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/S.png?v=1" class="infomax-food-icon S" width="60" height="60" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 1.214&nbsp;kJ&nbsp;/&nbsp;290&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 15,5&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 9,8&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 22,4&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 8,1&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 3,8&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 15,6&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 0,8&nbsp;g&nbsp;</details><br> <br>Essen 1<br>Gebratener Wildlachs auf Barbecuegemüse und Wildreis <sup><b>[1,4,7,Wz,Fi,Su]</b></sup><br>4,61&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 5,81&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     9,22&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20231024091448im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/F.png?v=1" class="infomax-food-icon F" width="60" height="60" alt="food-icon"><img src="https://web.archive.org/web/20231024091448im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/MSC.png?v=1" class="infomax-food-icon MSC" width="108" height="48" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 3.304&nbsp;kJ&nbsp;/&nbsp;789&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 22,8&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 3,1&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 97,4&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 11,9&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 1,0&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 41,9&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 2,2&nbsp;g&nbsp;</details><br> <br>Essen 2<br>Blumenkohl-Brokkoliauflauf mit Gorgonzolasoße <sup><b>[Wz,Mi]</b></sup><br>3,78&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,98&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     7,56&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20231024091448im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/V.png?v=1" class="infomax-food-icon V" width="68" height="60" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 0&nbsp;kJ&nbsp;/&nbsp;0&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 0,0&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 0,0&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 0,0&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 0,0&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 0,0&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 0,0&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 0,0&nbsp;g&nbsp;</details><br> <br>Essen 3<br>vegane Tortellini mit Gemüsefüllung dazu Tomaten-Chilipesto <sup><b>[Wz,So,Man,Sel]</b></sup><br>3,21&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,41&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     6,42&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20231024091448im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/veg.png?v=1" class="infomax-food-icon veg" width="14" height="14" alt="food-icon"><img src="https://web.archive.org/web/20231024091448im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/CO2.png?v=1" class="infomax-food-icon CO2" width="30" height="64" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 4.612&nbsp;kJ&nbsp;/&nbsp;1.102&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 41,4&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 5,9&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 148,4&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 9,3&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 1,8&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 27,3&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 4,3&nbsp;g&nbsp;</details><br> <br>
<form action="" method="post">
<input type="submit" name="mybutton" class="btn btn-default btn-sm btn-speise" value="rückwärts" style="text-decoration: none; colo" disabled="disabled">
<button class="btn btn-default btn-sm btn" disabled="disabled"> | 24.10.2023 |</button>
<input type="submit" name="mybutton" class="btn btn-default btn-sm btn-speise" value="vorwärts">
</form>
</div>`;

    const dishData = extractDishes(html);

    expect(Array.isArray(dishData)).toBe(true);
    expect(dishData.length).toBe(6);

    expect(dishData[0].dish_category).toBe('Aktionsessen 1');
    expect(dishData[0].dish_name).toBe(
      'Grill-Käsetaler gebraten mit [Mi] Kaisergemüse [Mi] Kartoffeln [Mi] Quark - Dip [5,Wz,Ei,Mi,Sen]'
    );

    expect(dishData[1].dish_category).toBe('Aktionsessen 2');
    expect(dishData[1].dish_name).toBe(
      'Cheesecake Balls Marille mit [Wz,Mi] Pflaumenkompott [7]'
    );

    expect(dishData[2].dish_category).toBe('Aktionsessen 6');
    expect(dishData[2].dish_name).toBe(
      'große Salatbowl verschieden garniert [4,7,12,Wz,Ei,Fi,Mi]'
    );

    expect(dishData[3].dish_category).toBe('Essen 1');
    expect(dishData[3].dish_name).toBe(
      'Gebratener Wildlachs auf Barbecuegemüse und Wildreis [1,4,7,Wz,Fi,Su]'
    );

    expect(dishData[4].dish_category).toBe('Essen 2');
    expect(dishData[4].dish_name).toBe(
      'Blumenkohl-Brokkoliauflauf mit Gorgonzolasoße [Wz,Mi]'
    );

    expect(dishData[5].dish_category).toBe('Essen 3');
    expect(dishData[5].dish_name).toBe(
      'vegane Tortellini mit Gemüsefüllung dazu Tomaten-Chilipesto [Wz,So,Man,Sel]'
    );
  });

  test('dish name extraction test5', () => {
    const html = `<div style="background-color:#ecf0f1;border-radius: 4px 4px 0px 0px; padding: 8px;" "="">




Speiseplan <br><h4>Montag 23.10.2023</h4>Aktionsessen 6<br>große Salatbowl verschieden garniert <sup><b>[4,7,12,Wz,Ei,Fi,Mi]</b></sup><br>3,45&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,65&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     6,90&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20231023100011im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/F.png?v=1" class="infomax-food-icon F" width="60" height="60" alt="food-icon"><img src="https://web.archive.org/web/20231023100011im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/S.png?v=1" class="infomax-food-icon S" width="60" height="60" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 1.214&nbsp;kJ&nbsp;/&nbsp;290&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 15,5&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 9,8&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 22,4&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 8,1&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 3,8&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 15,6&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 0,8&nbsp;g&nbsp;</details><br> <br>Essen 1<br>Bulgurpfanne mit Tomaten,Oliven und Sojastreifen <sup><b>[10,Wz,So,Sel]</b></sup><br>2,89&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,09&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     5,78&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20231023100011im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/veg.png?v=1" class="infomax-food-icon veg" width="14" height="14" alt="food-icon"><img src="https://web.archive.org/web/20231023100011im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/CO2.png?v=1" class="infomax-food-icon CO2" width="30" height="64" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 2.716&nbsp;kJ&nbsp;/&nbsp;649&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 12,9&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 2,2&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 83,3&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 18,9&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 2,5&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 42,2&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 4,2&nbsp;g&nbsp;</details><br> <br>Essen 2<br>Pasta mit Gemüse in Käse-Kräutersoße <sup><b>[1,4,Wz,Ei,Mi]</b></sup><br>2,18&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 3,80&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     4,36&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20231023100011im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/V.png?v=1" class="infomax-food-icon V" width="68" height="60" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 6.017&nbsp;kJ&nbsp;/&nbsp;1.437&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 101,3&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 49,8&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 98,6&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 12,9&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 0,1&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 31,7&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 2,7&nbsp;g&nbsp;</details><br> <br>Essen 3<br>Hähnchencurry mit Mango und Gemüse <sup><b>[5,Wz,So,Ses]</b></sup> Basmatireis<br>4,03&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 5,23&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     8,06&nbsp;€&nbsp; (Gäste)<br><img src="https://web.archive.org/web/20231023100011im_/https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/G.png?v=1" class="infomax-food-icon G" width="60" height="60" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 2.501&nbsp;kJ&nbsp;/&nbsp;597&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 16,7&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 5,8&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 72,7&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 7,6&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 0,7&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 36,8&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 3,8&nbsp;g&nbsp;</details><br> <br>
<form action="" method="post">
<input type="submit" name="mybutton" class="btn btn-default btn-sm btn-speise" value="rückwärts" style="text-decoration: none; colo" disabled="disabled">
<button class="btn btn-default btn-sm btn" disabled="disabled"> | 23.10.2023 |</button>
<input type="submit" name="mybutton" class="btn btn-default btn-sm btn-speise" value="vorwärts">
</form>


</div>`;

    const dishData = extractDishes(html);

    expect(Array.isArray(dishData)).toBe(true);
    expect(dishData.length).toBe(4);

    expect(dishData[0].dish_category).toBe('Aktionsessen 6');
    expect(dishData[0].dish_name).toBe(
      'große Salatbowl verschieden garniert [4,7,12,Wz,Ei,Fi,Mi]'
    );

    expect(dishData[1].dish_category).toBe('Essen 1');
    expect(dishData[1].dish_name).toBe(
      'Bulgurpfanne mit Tomaten,Oliven und Sojastreifen [10,Wz,So,Sel]'
    );

    expect(dishData[2].dish_category).toBe('Essen 2');
    expect(dishData[2].dish_name).toBe(
      'Pasta mit Gemüse in Käse-Kräutersoße [1,4,Wz,Ei,Mi]'
    );

    expect(dishData[3].dish_category).toBe('Essen 3');
    expect(dishData[3].dish_name).toBe(
      'Hähnchencurry mit Mango und Gemüse [5,Wz,So,Ses] Basmatireis'
    );
  });
});
