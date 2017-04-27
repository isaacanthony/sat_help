var SAT = (function() {
  var url = 'https://script.google.com/macros/s/AKfycbymF54A6SEDrDiDgfYfj9OWe0d3qoGm7nyBOUpWq5c/exec';
  var subject = '';
  var data = {};

  var reload = function(data) {
    $('.js-btn').removeClass('btn-success btn-danger');
    ['q', 'a', 'b', 'c', 'd'].forEach(function(x) {
      $('.js-' + x).html(data[x]);
    });
    renderMathInElement(document.body);
  };

  var getQuestion = function() {
    $.getJSON(url + '?callback=?', {'subject': subject}, function(response) {
      data = response;
      reload(data);
    });
  };

  var generateSha = function() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  var uid = function() {
    return Cookies.get('uid') || (Cookies.set('uid', generateSha()) && Cookies.get('uid'));
  };

  var postAnswer = function(ans) {
    $('.js-btn-' + ans).addClass('btn-danger');
    $('.js-btn-' + data.ans).removeClass('btn-danger');
    $('.js-btn-' + data.ans).addClass('btn-success');
    $.getJSON(url + '?callback=?', {'qid': data.id, 'uid': uid(), 'answer': ans});
  };

  var setSubject = function(subj) {
    if (subject === subj) { return; };
    subject = subj;
    $('li.nav-item').removeClass('active');
    $('li.nav-item-' + subj).addClass('active');
    getQuestion();
  };

  return {
    'getQuestion': getQuestion,
    'postAnswer': postAnswer,
    'setSubject': setSubject
  };
})();

$(document).ready(function() {
  SAT.setSubject('math');
});

