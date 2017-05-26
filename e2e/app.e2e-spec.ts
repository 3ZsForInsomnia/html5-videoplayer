import { Html5VideoplayerPage } from './app.po';

describe('html5-videoplayer App', () => {
  let page: Html5VideoplayerPage;

  beforeEach(() => {
    page = new Html5VideoplayerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
