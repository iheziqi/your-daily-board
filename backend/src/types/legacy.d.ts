/** This file contains type for database layer. */

/**
 * db_train_ticket_price table
 */
interface DDbTrainTicketPrice {
  id: number;
  start_station: string;
  dest_station: string;
  price: number;
  departure_time: string;
  arrive_time: string;
  timestamp: string;
  train_name: string;
}

/**
 * DB ticket price repository
 */
interface IDBTicketPriceRepository {
  storePrice(ticketInfo: DBTicketInfo): Promise<DBTicketInfo | undefined>;

  getLatestPrice(
    startStation: string,
    destStation: string,
    departureTime: Date
  ): Promise<DDbTrainTicketPrice | undefined>;

  getAllPrices(
    startStation: string,
    destStation: string,
    departureTime: Date
  ): Promise<DDbTrainTicketPrice[]>;
}
