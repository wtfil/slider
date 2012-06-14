jQuery(function () {
  var Slider = function (selector) {
    this._slider = jQuery(selector);
    this._container = this._slider.find('.holder');
    this._slides = this._container.find('.slide');
    this._prev = this._slider.find('.prev');
    this._next = this._slider.find('.next');
    this._initEvents();
    this.showSlideFromHash();
  }
  Slider.prototype = {
    _initEvents: function () {
      jQuery(window)
        .bind('hashchange', this.showSlideFromHash.bind(this))
        .bind('keyup', this.logKey.bind(this));
      this._prev.bind('click', this.changeHash.bind(this, -1));
      this._next.bind('click', this.changeHash.bind(this, +1));
    },
    _getSlideNumberFromHash: function () {
      var match = window.location.hash.match(/slide=(\d+)/);
      return match ? Number(match[1]) : 0;
    },
    logKey: function (e) {
      if (!this._keyNum) {
        this._keyNum = false;
      }
      /*
       * 13 enter
       * 33 page up
       * 34 page down
       * 48-58 numbers
       */
      if (e.keyCode >= 48 && e.keyCode <= 58) {
        this._keyNum = this._keyNum * 10 + (e.keyCode - 48);
      } else if (e.keyCode === 13) {
        this.changeHash();
      } else if (e.keyCode === 34){
        this.changeHash(+1);
      } else if (e.keyCode === 33) {
        this.changeHash(-1);
      }
    },
    changeHash: function (diff) {
      var slideNumber = this._getSlideNumberFromHash() || 0;
      if (diff) {
        slideNumber += diff;
      } else if (this._keyNum === false) {
        slideNumber++;
      } else {
        slideNumber = this._keyNum;
        this._keyNum = false;
      }
      slideNumber = Math.min(this._slides.length, slideNumber);
      slideNumber = Math.max(1, slideNumber);
      window.location.hash = 'slide=' + slideNumber;
      return false;
    },
    showSlideFromHash: function () {
      var slideNumber = this._getSlideNumberFromHash();
      this.showSlide(slideNumber);
    },
    showSlide: function (slideNumber) {
      if (slideNumber > this._slides.length) {
        return;
      }
      this._slides.hide();
      jQuery(this._slides[slideNumber - 1]).show();
    }
  }
  new Slider('.slider');
});
