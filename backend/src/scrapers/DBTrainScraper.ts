import {DBTicketPriceRepository} from '../repositories';
import KnexService from '../database/KnexService';
import {getDateOfNext30DaysWithTime} from '../utils/helpers';

const stationId = {
  Nuremberg_Hbf:
    'A=1@O=Nürnberg Hbf@X=11082989@Y=49445615@U=80@L=8000284@i=U×008022193@',
  Munich_Hbf:
    'A=1@O=München Hbf@X=11558339@Y=48140229@U=80@L=8000261@i=U×008020347@',
};

async function getTrainPlanInfo(
  startStationId: string,
  endStationId: string,
  timeToLeave: Date
) {
  const fahrPlanUrl = 'https://www.bahn.de/web/api/angebote/fahrplan';
  const option: RequestInit = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      abfahrtsHalt: startStationId,
      anfrageZeitpunkt: timeToLeave.toISOString().slice(0, -5),
      ankunftsHalt: endStationId,
      ankunftSuche: 'ABFAHRT',
      klasse: 'KLASSE_2',
      produktgattungen: ['ICE', 'REGIONAL'],
      reisende: [
        {
          typ: 'JUGENDLICHER',
          ermaessigungen: [
            {
              art: 'BAHNCARD25',
              klasse: 'KLASSE_2',
            },
          ],
          alter: [],
          anzahl: 1,
        },
      ],
      rueckfahrtAnfrageFolgt: false,
      schnelleVerbindungen: true,
      sitzplatzOnly: false,
      bikeCarriage: false,
      reservierungsKontingenteVorhanden: false,
    }),
  };

  const response = await fetch(fahrPlanUrl, option);
  const trainPlan = await response.json();
  return trainPlan;
}

const dbTicketPriceRepo = new DBTicketPriceRepository(
  KnexService.getInstance()
);

export async function getNurembergToMunichTrainPlanIn30Days() {
  const next30days = getDateOfNext30DaysWithTime(6, 20);

  for (let i = 0; i < next30days.length; i++) {
    const trainPlan = await getTrainPlanInfo(
      stationId.Nuremberg_Hbf,
      stationId.Munich_Hbf,
      next30days[i]
    );
    const price = Number(trainPlan.verbindungen[0]['angebotsPreis']['betrag']);

    const startStation =
      trainPlan.verbindungen[0]['verbindungsAbschnitte'][0]['abfahrtsOrt'];

    const destStation =
      trainPlan.verbindungen[0]['verbindungsAbschnitte'][0]['ankunftsOrt'];

    const departureTime =
      trainPlan.verbindungen[0]['verbindungsAbschnitte'][0][
        'abfahrtsZeitpunkt'
      ];

    const arriveTime =
      trainPlan.verbindungen[0]['verbindungsAbschnitte'][0][
        'ankunftsZeitpunkt'
      ];

    const trainName =
      trainPlan.verbindungen[0]['verbindungsAbschnitte'][0]['verkehrsmittel'][
        'name'
      ];

    // only store the price when it is larger than the one in db
    const queryResultOfLatestPrice = await dbTicketPriceRepo.getLatestPrice(
      startStation,
      destStation,
      departureTime
    );

    // If there is no price in database,
    // or the price in this request is greater than in database,
    // store the price
    if (
      !queryResultOfLatestPrice ||
      (queryResultOfLatestPrice && price > queryResultOfLatestPrice.price)
    ) {
      await dbTicketPriceRepo.storePrice({
        startStation: startStation,
        destStation: destStation,
        price: price,
        departureTime: departureTime,
        arriveTime: arriveTime,
        trainName: trainName,
      });
    }

    // Introduce a delay of 2 second between each request
    if (i < next30days.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}
