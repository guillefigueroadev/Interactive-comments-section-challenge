export class Handlers {
  static replaceHandlebarsOnTemplate(htmlTemplateAsString, data) {
    for (const key in data) {
      const value = data[key];
      const regex = new RegExp(`{{${key}}}`, 'gi');
      htmlTemplateAsString = htmlTemplateAsString.replace(regex, value);
    }

    return htmlTemplateAsString;
  }
}