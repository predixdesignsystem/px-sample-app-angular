import { UingPage } from './app.po';

describe('uing App', function() {
  let page: UingPage;

  beforeEach(() => {
    page = new UingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
