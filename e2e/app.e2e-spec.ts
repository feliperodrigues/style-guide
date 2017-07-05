import { StyleGuidePage } from './app.po';

describe('style-guide App', () => {
  let page: StyleGuidePage;

  beforeEach(() => {
    page = new StyleGuidePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
