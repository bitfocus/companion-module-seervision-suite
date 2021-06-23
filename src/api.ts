import WebSocket from 'ws';

import * as types from './types';

const ROS_BRIDGE_PORT = '49152';

export default class Api {
  readonly #connection: WebSocket;

  #onContainersUpdated: null | (() => void);

  containers: Array<types.Container>;

  constructor(dopIp: string) {
    const url = `ws://${dopIp}:${ROS_BRIDGE_PORT}`;
    this.#connection = new WebSocket(url);

    this.#connection.on('message', this._onMessage);
    this.#connection.on('error', this._onError);

    this.containers = [];

    this.#onContainersUpdated = null;
  }

  _sendMessage(msg: unknown): void {
    this.#connection.send(JSON.stringify(msg));
  }

  _onMessage = (data: string): void => {
    try {
      const msg = JSON.parse(data);
      if (msg.topic === '/api/v1/containers/updates') {
        this.containers = msg.msg.containers;
        this.#onContainersUpdated?.();
      }
    } catch (error) {
      console.error('Failed to parse incoming msg');
    }
  };

  _onError = (error: unknown): void => {
    console.error('Connection error:');
    console.error(error);
  };

  subscribeToContainers(): void {
    this._sendMessage({
      op: 'subscribe',
      topic: '/api/v1/containers/updates',
    });
  }

  recallContainer(containerId: string): void {
    this._sendMessage({
      op: 'call_service',
      service: '/api/v1/containers/recall',
      args: {
        container_id: containerId,
      },
    });
  }

  waitForConnection(): Promise<void> {
    return new Promise((resolve) => {
      this.#connection.on('open', resolve);
    });
  }

  closeConnection(): void {
    this.#connection.close();
  }

  onContainersUpdated(callback: () => void): void {
    this.#onContainersUpdated = callback;
  }
}
