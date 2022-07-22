export class WebcomponentUtil {
  static inject(arrayItems, webcomponentName, target) {
    arrayItems.forEach(item => {
      const container = document.createElement(webcomponentName);
      container.data = item;
      target.append(container);
    });
  }
}
