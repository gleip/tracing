import { JaegerTracer, initTracer } from 'jaeger-client';

export class Tracer {
  private _client: JaegerTracer;
  constructor(private serviceName: string) {
    this._client = initTracer(
      {
        serviceName,
        reporter: {
          agentHost: process.env.JAEGER_AGENT_HOST || 'localhost',
          agentPort: parseInt(process.env.JAEGER_AGENT_PORT || '6832'),
        },
        sampler: {
          type: 'const',
          param: 1,
        },
      },
      {},
    );
  }
  get client() {
    return this._client;
  }
}
