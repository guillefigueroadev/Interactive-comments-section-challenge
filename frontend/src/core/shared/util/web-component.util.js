export class WebcomponentUtil {
  static inject(arrayItems, webcomponentName, target, sessionName) {
    arrayItems.forEach(item => {
      const container = document.createElement(webcomponentName);
      container.data = item;
      target.append(container);
      container.addEventListener('outPut', ({detail}) => {
        if (detail) {
          const {response} = detail;
          item = response;
          if (sessionName) {
            sessionStorage.setItem(sessionName, JSON.stringify(arrayItems));
          }
        }
      });
    });
  }
}
