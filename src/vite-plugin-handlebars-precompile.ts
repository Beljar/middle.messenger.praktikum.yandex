import Handlebars from 'handlebars';
import { PluginOption } from 'vite';

export default function handlebars(): PluginOption {
  const fileRegexp = /\.hbs$|\.handlebars/;

  return {
    name: 'vite-plugin-handlebars-precompile',
    transform(src, id) {
      if (!fileRegexp.test(id)) return;

      const code = `
        import Handelbars from 'handlebars/runtime';

        export default Handelbars.template(${Handlebars.precompile(src)})
        `;
      return { code };
    },
  };
}
