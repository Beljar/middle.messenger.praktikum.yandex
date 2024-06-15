import Handlebars from 'handlebars/runtime';

import avatar from './avatar/avatar.hbs';
import button from './button/button.hbs';
import formItem from './form-item/formItem.hbs';
import input from './input/input.hbs';
import link from './link/link.hbs';
import loader from './loader/loader.hbs';
import textArea from './text-area/textArea.hbs';
import h1 from './typography/h1/h1.hbs';
import text from './typography/text/text.hbs';

export const registerPartials = () => {
  Handlebars.registerPartial('avatar', avatar);
  Handlebars.registerPartial('button', button);
  Handlebars.registerPartial('input', input);
  Handlebars.registerPartial('textarea', textArea);
  Handlebars.registerPartial('h1', h1);
  Handlebars.registerPartial('text', text);
  Handlebars.registerPartial('link', link);
  Handlebars.registerPartial('formItem', formItem);
  Handlebars.registerPartial('loader', loader);
};
