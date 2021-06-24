import WebSocket from 'ws';

const ROS_BRIDGE_PORT = '49152';
const API_PATH = '/api/v1';

type SubscriptionCallback = (msg: Record<string, unknown>) => unknown;

export default class Connection {
  readonly #connection: WebSocket;
  readonly #subscriptionCallbacks: Record<string, Array<SubscriptionCallback>>;

  constructor(dopIp: string) {
    const url = `ws://${dopIp}:${ROS_BRIDGE_PORT}`;
    this.#connection = new WebSocket(url);

    this.#connection.on('message', this._onMessage);
    this.#connection.on('error', this._onError);

    this.#subscriptionCallbacks = {};
  }

  _sendMessage(msg: unknown): void {
    this.#connection.send(JSON.stringify(msg));
  }

  _onMessage = (data: string): void => {
    try {
      const msg = JSON.parse(data);
      if (msg.topic) {
        const match = msg.topic.match(new RegExp(`${API_PATH}/(.*)`));
        if (!match) {
          return;
        }

        const topic = match[1];
        this.#subscriptionCallbacks[topic]?.forEach((callback) => callback(msg.msg));
      }
    } catch (error) {
      console.error('Failed to parse incoming msg');
    }
  };

  _onError = (error: unknown): void => {
    console.error('Connection error:');
    console.error(error);
  };

  callService(service: string, args: Record<string, unknown> = {}): void {
    this._sendMessage({
      op: 'call_service',
      service: `${API_PATH}/${service}`,
      args,
    });
  }

  subscribe<T extends Record<string, unknown>>(topic: string, callback: (msg: T) => unknown): void {
    if (!this.#subscriptionCallbacks[topic]) {
      this._sendMessage({
        op: 'subscribe',
        topic: `${API_PATH}/${topic}`,
      });
      this.#subscriptionCallbacks[topic] = [];
    }

    this.#subscriptionCallbacks[topic].push(callback as SubscriptionCallback);
  }

  waitForConnection(): Promise<void> {
    return new Promise((resolve) => {
      this.#connection.on('open', resolve);
    });
  }

  closeConnection(): void {
    this.#connection.close();
  }
}
