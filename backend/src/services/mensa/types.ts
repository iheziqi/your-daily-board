export enum MensaEventType {
  MENU_SAVED = 'mensa:menu:saved',
  DISHES_SAVED = 'mensa:dishes:saved',
  DISHES_SAVE_FAILED = 'mensa:dishes:save_failed',
}

export interface MensaMenuSavedEvent {
  mensaId: MensaID;
  menu: string | null;
  date: string;
}

export interface DishesSaveFailedEvent {
  mensaId: MensaID;
  error: Error;
  date: string;
}

export type MensaEventHandler<T> = (data: T) => Promise<void> | void;
