/*!
 * jQuery elementready
 *
 * Copyright 2012 Alfonso de la Osa
 * http://botverse.com/
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

(function ($) {
  var check_elements = []
    , check_elements_callbacks = {}
      ;

  $(document).bind('DOMNodeInserted', function (event) {
    var index = _.indexOf(check_elements, event.target);
    // we are waiting for the element to get ready
    if (index !== -1) {
      var el = check_elements.splice(index, 1);
      check_elements_callbacks[el].apply(el);
      delete check_elements_callbacks[el];
      // this element has not elementready callback
    }
  });

  $.fn.elementready = function (callback) {
    return this.each(function () {
      // the element is already added
      if (elementInDom(this)) {
        callback.apply(this);
        // the element is not added yet
      } else {
        check_elements.push(this);
        check_elements_callbacks[this] = callback;
      }
    });
  };

  function elementInDom(element) {
    while (element = element.parentNode) {
      if (element == document) {
        return true;
      }
    }
    return false;
  }
})(jQuery);