var SAT = (function() {
  var url = 'https://sat-api.firebaseio.com/';
  var maxId = 100;
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
    var randomId = Math.floor(Math.random() * maxId) + 1;
    $.getJSON(url + 'questions/' + randomId + '.json', {'subject': subject}, function(response) {
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
    $.post(url + 'answers.json', JSON.stringify({
      'qid': data.id,
      'uid': uid(),
      'answer': ans,
      'correct': data.ans == ans,
      'timestamp': Math.floor(new Date().getTime() / 1000)
    }), 'json');
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

