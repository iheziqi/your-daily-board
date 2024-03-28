import {Knex} from 'knex';

class DBTicketPriceRepository implements IDBTicketPriceRepository {
  private db: Knex;

  constructor(knexInstance: Knex) {
    this.db = knexInstance;
  }

  // Method Overloading
  private convertJSDateToMySQLDate(date: Date): string;
  private convertJSDateToMySQLDate(date: string): string;
  // Implementation
  private convertJSDateToMySQLDate(date: Date | string): string {
    if (typeof date === 'string') {
      return date.slice(0, 19).replace('T', ' ');
    } else {
      return this.convertJSDateToMySQLDateWithCurrentLocale(date);
    }
  }

  private convertJSDateToMySQLDateWithCurrentLocale(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 to month since January is 0
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    const mysqlDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return mysqlDateTime;
  }

  /**
   * Gets the latest train ticket price of given start station, destination station,
   * and departure time.
   * @param startStation
   * @param destStation
   * @param departureTime
   * @returns
   */
  public async getLatestPrice(
    startStation: string,
    destStation: string,
    departureTime: Date
  ): Promise<DDbTrainTicketPrice | undefined> {
    try {
      const queryResult = await this.db<DDbTrainTicketPrice>(
        'db_train_ticket_price'
      )
        .select()
        .where({
          start_station: startStation,
          dest_station: destStation,
          departure_time: this.convertJSDateToMySQLDate(departureTime),
        })
        .orderBy('timestamp', 'desc')
        .first();

      return queryResult;
    } catch (error) {
      console.error(
        `An error occurred when getting train ticket information from ${startStation} to ${destStation} at ${departureTime}:`,
        (error as Error).message
      );
      return undefined;
    }
  }

  /**
   * Gets all train ticket prices of given start station, destination station
   * and departure time.
   * @param startStation
   * @param destStation
   * @param departureTime
   */
  public async getAllPrices(
    startStation: string,
    destStation: string,
    departureTime: Date
  ): Promise<DDbTrainTicketPrice[]> {
    try {
      const queryResult = await this.db<DDbTrainTicketPrice>(
        'db_train_ticket_price'
      )
        .select()
        .where({
          start_station: startStation,
          dest_station: destStation,
          departure_time: this.convertJSDateToMySQLDate(departureTime),
        });

      return queryResult;
    } catch (error) {
      console.error(
        `An error occurred when getting train ticket information from ${startStation} to ${destStation} at ${departureTime}:`,
        (error as Error).message
      );
      return [];
    }
  }

  public async storePrice(
    ticketInfo: DBTicketInfo
  ): Promise<DBTicketInfo | undefined> {
    try {
      await this.db<DDbTrainTicketPrice>('db_train_ticket_price').insert({
        start_station: ticketInfo.startStation,
        dest_station: ticketInfo.destStation,
        price: ticketInfo.price,
        departure_time: this.convertJSDateToMySQLDate(ticketInfo.departureTime),
        arrive_time: this.convertJSDateToMySQLDate(ticketInfo.arriveTime),
        train_name: ticketInfo.trainName,
      });

      return ticketInfo;
    } catch (error) {
      console.error(
        'An error occurred when inserting train ticket information:',
        (error as Error).message
      );
      return undefined;
    }
  }
}

export default DBTicketPriceRepository;
