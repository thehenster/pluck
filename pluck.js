var controller = function() {
  var _randomMethodModel = function() {
    var klass = data.classes[parseInt(Math.random() * data.classes.length)];
    var methods = klass.methods;

    if(methods.length > 0) {
      var method = methods[parseInt(Math.random() * methods.length)];
      var methodModel = MethodModel(klass, method);

      if(methodModel.isInteresting()) {
        return methodModel;
      }
    }

    return _randomMethodModel();
  }

  var pluckAMethod = function() {
    methodView.renderMethod(_randomMethodModel());
  }

  return {
    pluckAMethod: pluckAMethod
  }
}();


// Methods

var methodView = function() {
  var _methodTemplate = function() {
    return $('#method_template').html();
  }

  return {
    renderMethod: function(methodModel) {
      $('.content').html(Mustache.render(_methodTemplate(), methodModel));
    }
  }
}();

var MethodModel = function(klass, method) {
  return {
    klass: klass,
    method: method,
    isInteresting: function() {
      return $.trim(method.comment).length > 0;
    }
  }
};


// Next Button

var nextButtonController = function() {
  return {
    bindNextButton: function() {
      nextButtonView.onClick(controller.pluckAMethod);      
    }
  }
}();

var nextButtonView = function() {
  return {
    onClick: function(callback) {
      $('#next_button').click(callback);
    }
  }
}();

$.getJSON('rails-rdoc.json', function(data) {
  window.data = data;

  nextButtonController.bindNextButton();
  controller.pluckAMethod();
});

