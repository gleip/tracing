import { Tracer } from '../Tracer';
import { Msg } from '../../interfaces';
import { FORMAT_TEXT_MAP, Span, SpanContext, Tags } from 'opentracing';
import { CONTEXT, CARRIER } from '../constants';

export function publishPerfomance(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const origin = descriptor.value;
  let isNewSpan = false;
  descriptor.value = async function() {
    if (this.tracer) {
      const { client } = this.tracer as Tracer;
      const subject: string = arguments[0];
      let data: Msg = arguments[1];
      let context: Span | SpanContext | null = this[CONTEXT] || null;
      if (!context) {
        context = client.startSpan(subject);
        isNewSpan = true;
      }

      const carrier = {};
      client.inject(context, FORMAT_TEXT_MAP, carrier);
      data[CARRIER] = carrier;
      try {
        const result = await origin.apply(this, [subject, data]);
        if (isNewSpan) {
          (context as Span).finish();
        }
        return result;
      } catch (error) {
        if (isNewSpan) {
          const span = context as Span;
          span.setTag(Tags.ERROR, true);
          span.log({
            'error.kind': error,
          });
          span.finish();
        }
        throw error;
      }
    }
    return origin.apply(this, arguments);
  };
}
