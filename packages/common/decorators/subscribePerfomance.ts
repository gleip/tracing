import { Tracer } from '../Tracer';
import { Handler } from '../Transport';
import { Msg } from '../../interfaces';
import { FORMAT_TEXT_MAP, Tags } from 'opentracing';
import { CONTEXT, CARRIER } from '../constants';

export function subscribePerfomance(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const origin = descriptor.value;
  descriptor.value = async function() {
    if (this.tracer) {
      const { client } = this.tracer as Tracer;
      const subject: string = arguments[0];
      const handler: Handler = arguments[1];
      const wrapperHandler = async (msg: Msg) => {
        const childOf = client.extract(FORMAT_TEXT_MAP, msg[CARRIER]);
        if (childOf) {
          const span = client.startSpan(subject, { childOf });
          this[CONTEXT] = span;
          try {
            const result = await handler.apply(this, [msg]);
            span.finish();
            return result;
          } catch (error) {
            span.setTag(Tags.ERROR, true);
            span.log({
              'error.kind': error,
            });
            span.finish();
            throw error;
          }
        } else {
          return handler(msg);
        }
      };
      return origin.apply(this, [subject, wrapperHandler]);
    }
    return origin.apply(this, arguments);
  };
}
