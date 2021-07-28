import Connection from './Connection';

export enum TallyState {
  NONE = 'none',
  PREVIEW = 'preview',
  PROGRAM = 'program',
}

export default class TallyManager {
  readonly #connection: Connection;
  readonly #notifyOwner: () => void;
  #tallyState: TallyState;

  constructor(connection: Connection, notifyOwner: () => void) {
    this.#connection = connection;
    this.#notifyOwner = notifyOwner;

    this.#tallyState = TallyState.NONE;
  }

  async init(): Promise<void> {
    await this.#connection.waitForConnection();
    this.#connection.subscribe('tally_status', this.#onUpdate);
  }

  #onUpdate = (msg: { status: string }): void => {
    this.#tallyState = msg.status as TallyState;
    this.#notifyOwner();
  };

  setTallyState(status: TallyState): void {
    this.#connection.callService('tally_status/set', { status });
  }

  tallyState(): TallyState {
    return this.#tallyState;
  }
}
