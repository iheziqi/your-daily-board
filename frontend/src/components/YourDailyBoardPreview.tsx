// import { LoaderFunction, useLoaderData } from 'react-router-dom';
// import { getYourDailyBoardPreview } from '../utils/ajax';

// export const loader: LoaderFunction = async () => {
//   const yourDailyBoardPreview = getYourDailyBoardPreview();
//   return yourDailyBoardPreview;
// };

function YourDailyBoardPreview() {
  // const yourDailyBoardPreviewHtml = useLoaderData() as string;

  const menu = `<div style="background-color:#ecf0f1;border-radius: 4px 4px 0px 0px; padding: 8px;" "="">
Speiseplan <br><h4>Donnerstag 21.09.2023</h4>Aktionsessen 1<br>Currywurst mit Soße <sup><b>[4,7,Gf]</b></sup><br>3,00&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,00&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     5,00&nbsp;€&nbsp; (Gäste)<br><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/Gf.png?v=1" class="infomax-food-icon Gf" width="30" height="30" alt="food-icon"><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/R.png?v=1" class="infomax-food-icon R" width="60" height="62" alt="food-icon"><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/S.png?v=1" class="infomax-food-icon S" width="60" height="60" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 2.408&nbsp;kJ&nbsp;/&nbsp;575&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 47,5&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 14,3&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 18,0&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 14,6&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 0,5&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 19,0&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 3,5&nbsp;g&nbsp;</details><br> <br>Essen 1<br>Canneloni Nonna <sup><b>[Wz,Mi]</b></sup> mit Tomatensoße <sup><b>[1,Wz,Sel]</b></sup><br>3,09&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 4,09&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     6,18&nbsp;€&nbsp; (Gäste)<br><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/V.png?v=1" class="infomax-food-icon V" width="68" height="60" alt="food-icon"><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/CO2.png?v=1" class="infomax-food-icon CO2" width="30" height="64" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 2.708&nbsp;kJ&nbsp;/&nbsp;647&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 26,0&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 13,1&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 71,1&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 24,4&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 7,7&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 28,0&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 7,2&nbsp;g&nbsp;</details><br> <br>Essen 2<br>Cevapcici <sup><b>[Wz,Ei,Sen]</b></sup> mit Tomatenreis und Paprika - Dip <sup><b>[5,Wz,Ei,Mi,Sen]</b></sup><br>2,67&nbsp;€&nbsp;(Stud.)&nbsp;&nbsp; 3,80&nbsp;€&nbsp; (Bed.)&nbsp;&nbsp;     5,34&nbsp;€&nbsp; (Gäste)<br><img src="https://www.max-manager.de/daten-extern/sw-erlangen-nuernberg/icons/R.png?v=1" class="infomax-food-icon R" width="60" height="62" alt="food-icon">&nbsp;&nbsp;<details closed=""><summary><strong>Nährwertangaben pro Portion/Nutritional values per portion (click here):</strong></summary>Energie/Energy: 3.535&nbsp;kJ&nbsp;/&nbsp;844&nbsp;kcal&nbsp;&nbsp;|&nbsp;&nbsp;Fett/Fat: 40,7&nbsp;g&nbsp;–&nbsp;davon gesättigte Fettsäuren/saturated fatty acids: 11,7&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Kohlenhydrate/Carbohydrates: 82,6&nbsp;g&nbsp;–&nbsp;davon Zucker/sugar: 6,9&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Ballaststoffe/Dietary fibre: 0,3&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Eiweiss/Protein: 35,9&nbsp;g&nbsp;&nbsp;|&nbsp;&nbsp;Salz/Salt: 4,5&nbsp;g&nbsp;</details><br> <br>
<form action="" method="post">
<input type="submit" name="mybutton" class="btn btn-default btn-sm btn-speise" value="rückwärts" style="text-decoration: none; colo" disabled="disabled">
<button class="btn btn-default btn-sm btn" disabled="disabled"> | 21.09.2023 |</button>
<input type="submit" name="mybutton" class="btn btn-default btn-sm btn-speise" value="vorwärts">
</form>`;

  /**  Use Static HTML with React */

  return (
    <div className="max-lg:hidden relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
      <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg" />
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg" />
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg" />
      <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg" />
      <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: menu }}
        />
      </div>
    </div>
  );
}

export default YourDailyBoardPreview;
