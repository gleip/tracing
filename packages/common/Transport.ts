import * as Nats from 'nats';
import * as uuid from 'uuid';

export class Transport {
  private _client: Nats.Client;
  public async connect() {
    return new Promise(resolve => {
      this._client = Nats.connect({
        url: process.env.NATS_URL || 'nats://localhost:4222',
        json: true,
      });

      this._client.on('error', error => {
        console.error(error);
        process.exit(1);
      });

      this._client.on('connect', () => {
        console.info('Connected to NATS');
        resolve();
      });
    });
  }
  public async disconnect() {
    this._client.close();
  }
  public async publish<Request = any, Response = any>(subject: string, data: Request): Promise<Response> {
    const replyId = uuid.v4();
    return new Promise(resolve => {
      this._client.publish(subject, data, replyId);
      const sid = this._client.subscribe(replyId, (response: Response) => {
        resolve(response);
        this._client.unsubscribe(sid);
      });
    });
  }
  public async subscribe<Request = any, Response = any>(subject: string, handler: (msg: Request) => Promise<Response>) {
    this._client.subscribe(subject, async (msg: Request, replyId: string) => {
      const result = await handler(msg);
      this._client.publish(replyId, result);
    });
  }
}
