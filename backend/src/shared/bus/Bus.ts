export type HandlerFn<T = any, R = any> = (message: T) => Promise<R> | R;

class SyncBus {
  private handlers: Map<string, HandlerFn> = new Map();

  register<T = any, R = any>(name: string, handler: HandlerFn<T, R>) {
    this.handlers.set(name, handler as HandlerFn);
  }

  async dispatch<T = any, R = any>(message: { type: string } & T): Promise<R> {
    const handler = this.handlers.get(message.type);
    if (!handler) throw new Error(`No handler registered for message type: ${message.type}`);
    return handler(message) as Promise<R>;
  }
}

const bus = new SyncBus();
export default bus;
