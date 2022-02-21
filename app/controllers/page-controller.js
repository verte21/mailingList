class PageController {
  home(req, res) {
    res.render('home.ejs');
  }

  pageNotFound(req, res) {
    res.render('message.ejs', {
      message: 'Page not found',
    });
  }
}

export default new PageController();
