import EventEmitter from 'events';
import {
  MensaEventType,
  MensaMenuSavedEvent,
  DishesSaveFailedEvent,
  MensaEventHandler,
} from './types';

class MensaEventService {
  private static instance: MensaEventService;
  private eventEmitter: EventEmitter;

  private constructor() {
    this.eventEmitter = new EventEmitter();
    // Set max listeners to prevent memory leak warnings
    this.eventEmitter.setMaxListeners(20);
  }

  static getInstance(): MensaEventService {
    if (!MensaEventService.instance) {
      MensaEventService.instance = new MensaEventService();
    }
    return MensaEventService.instance;
  }

  onMenuSaved(handler: MensaEventHandler<MensaMenuSavedEvent>): void {
    this.eventEmitter.on(MensaEventType.MENU_SAVED, handler);
  }

  onDishesSaveFailed(handler: MensaEventHandler<DishesSaveFailedEvent>): void {
    this.eventEmitter.on(MensaEventType.DISHES_SAVE_FAILED, handler);
  }

  emitMenuSaved(data: MensaMenuSavedEvent): void {
    this.eventEmitter.emit(MensaEventType.MENU_SAVED, data);
  }

  emitDishesSaveFailed(data: DishesSaveFailedEvent): void {
    this.eventEmitter.emit(MensaEventType.DISHES_SAVE_FAILED, data);
  }

  removeAllListeners(): void {
    this.eventEmitter.removeAllListeners();
  }

  removeListener(
    event: MensaEventType,
    handler: MensaEventHandler<unknown>
  ): void {
    this.eventEmitter.removeListener(event, handler);
  }
}

export default MensaEventService;
