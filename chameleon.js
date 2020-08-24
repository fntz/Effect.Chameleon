// Copyright (c) 2012-2013 fntz <mike.fch1@gmail.com>
// Effect.Chameleon extend Effect.Base (script.aculo.us)
// Effect.Chameleon is freely distributable under the terms of an MIT-style license.

/**
  *  new Effect.Chameleon(element [, options]);
  *  element (Element): element for effect,
  *  optiosn (Object) : optsion for effect
  *    - duration (Number)
  *      + default: 0
  *    - selector (Boolean[false] or ElementSelector)
  *      + default: false
  *    - change (String): 'color', 'all', 'background-color'
  *      + default: 'color'
  *    - color (Object) : Object with color range
  *      + default: { 
  *          red  : [0, 255],
  *          green: [0, 255],
  *          blue : [0, 255]
  *        }
  *    - bgColor (Object): Object with background-color range
  *       + default: {
  *           red  : [0, 255],
  *           green: [0, 255],
  *           blue : [0, 255] 
  *         },
  *       pause (Number): pause in second between durations
  *       + default: 3.0  
  *
  *   See demo for example.   
**/

Effect.Chameleon = Class.create(Effect.Base,{
 
  initialize : function(element) {
    this.element = $(element);
    var options = Object.extend({
      duration : 0,
      selector : false,
      change   : 'color', //or background-color or //all 
      color    : {
        red    : [0,255],
        green  : [0,255],
        blue   : [0,255]
      },
      bgColor :  {
        red    : [0,255],
        green  : [0,255],
        blue   : [0,255]
      },
      pause  : 3.0 //seconds
    }, arguments[1] || {});

    this.setting = options;
    this.start(this.setting);
  },
  setup: function() { 
    if(this.setting.selector)
      this.parts = this.element.select(this.setting.selector); 
    else {     
      Effect.tagifyText(this.element);
      this.parts = this.element.childElements();
    }
  },
  update: function() {
    var setting = this.setting;

    var getColor = function(obj) {
      var randomize = function(max, min) {
        return (Math.random()*(max-min)+min).round().toColorPart();
      };    
      var rmin = obj.red[0],
          rmax = obj.red[1]   || obj.red[0],
          gmin = obj.green[0],
          gmax = obj.green[1] || obj.green[0],
          bmin = obj.blue[0],
          bmax = obj.blue[1]  || obj.blue[0];      

      var color = '#'; 
      var red   = randomize(rmax, rmin), 
          green = randomize(gmax, gmin),
          blue  = randomize(bmax, bmin);
      return color + red + green + blue; 
    };

    if(this.setting.change == 'all')    
      this.parts.each(function(i,j){
        i.morph({backgroundColor : getColor(this.setting.bgColor), color: getColor(this.setting.color) });             
      }.bind(this));
    else if(this.setting.change == 'bgcolor')
      this.parts.each(function(i,j){
        i.morph({backgroundColor : getColor(this.setting.bgColor)});             
      }.bind(this));
    else 
      this.parts.each(function(i,j){
        i.morph({color : getColor(this.setting.color)});             
      }.bind(this)); 
  },
  finish: function() {
    this.start(Object.extend(this.setting,{delay: this.setting.pause}));
  }
});

