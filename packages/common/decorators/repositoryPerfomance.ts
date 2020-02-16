import { Tracer } from '../Tracer';
import { Tags } from 'opentracing';
import { CONTEXT } from '../constants';

export function repositoryPerfomance({ client }: Tracer) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = async function() {
      if (this.parent[CONTEXT]) {
        const span = client.startSpan(propertyKey, {
          childOf: this.parent[CONTEXT],
        });
        span.setTag(Tags.DB_TYPE, this.db);
        try {
          const result = await original.apply(this, arguments);
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
        return original.apply(this, arguments);
      }
    };
  };
}
