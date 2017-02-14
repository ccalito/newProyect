import { NewProyectPage } from './app.po';

describe('new-proyect App', function() {
  let page: NewProyectPage;

  beforeEach(() => {
    page = new NewProyectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
