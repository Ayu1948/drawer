function _GET(name, forward) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return r[2];
  return forward;
}

// function size() {
//   var width = $(window).width();
//   if (width > 750) {
//     $('html').css('font-size', function () {
//       return 100;
//     });
//     return;
//   } else {
//     $('html').css('font-size', function () {
//       return (100 * width) / 750;
//     });
//   }
// }
// size();
// $(window).resize(function () {
//   size();
// });

(function (win, pl) {
  var meta = {},
    cbs = [],
    element,
    timer,
    cstyle;

  // 订阅与发布
  var event = (function () {
    var fnlist = {},
      listen,
      trigger,
      remove;
    listen = function (e, fn) {
      if (!fnlist[e]) {
        fnlist[e] = [];
      }
      fnlist[e].push(fn);
    };
    trigger = function (e) {
      var key = [].shift.call(arguments),
        fns = fnlist[key];
      if (!fns || fns.length === 0) {
        return false;
      }
      for (var i = 0, fn; (fn = fns[i++]); ) {
        fn.apply(this, arguments);
      }
    };
    remove = function (e, fn) {
      var fns = fnlist[e];
      if (!fns) {
        return false;
      }
      if (!fn) {
        fns && (fns.length = 0);
      } else {
        for (var j = 0, l = fns.length; j < l; j--) {
          if (fn === fns[j]) {
            fns.splice(j, 1);
          }
        }
      }
    };

    return {
      listen: listen,
      trigger: trigger,
      remove: remove,
    };
  })();
  // callback
  var resizeCB = (function () {
    if (win.innerWidth > win.innerHeight) {
      //初始化判断
      meta.init = 'landscape';
      meta.current = 'landscape';
    } else {
      meta.init = 'portrait';
      meta.current = 'portrait';
    }
    return function () {
      if (win.innerWidth > win.innerHeight) {
        if (meta.current !== 'landscape') {
          meta.current = 'landscape';
          event.trigger('__orientationChange__', meta);
        }
      } else {
        if (meta.current !== 'portrait') {
          meta.current = 'portrait';
          event.trigger('__orientationChange__', meta);
        }
      }
    };
  })();
  // 监听
  win.addEventListener(
    'resize',
    function () {
      timer && win.clearTimeout(timer);
      timer = win.setTimeout(resizeCB, 300);
    },
    false
  );

  event.listen('__orientationChange__', function (event) {
    if (cbs.length === 0) {
      return false;
    }
    for (var i = 0, cb; (cb = cbs[i++]); ) {
      if (typeof cb === 'function') {
        cb.call(pl, event);
      } else {
        throw new Error('The accepted argument must be a function.');
      }
    }
  });
  // 接口
  pl.orientation = meta;
  pl.event = event;
  pl.on = function (cb) {
    cbs.push(cb);
  };
})(window, window['pl'] || (window['pl'] = {}));

var datas = {
  pid: _GET('pid'),
  gid: _GET('gid'),
  refer: _GET('refer'),
  duid: _GET('duid'),
  version: _GET('version'),
  sdkver: _GET('sdkver'),
  uid: _GET('uid'),
  uname: _GET('uname'),
  token: _GET('token'),
  money: _GET('money'),
  omoney: _GET('money') || '6.00',
  pway: null,
  dsid: _GET('dsid'),
  time: _GET('time'),
  sign: _GET('sign'),
  drname: _GET('drname'),
  doid: _GET('doid'),
  drlevel: _GET('drlevel'),
  dradio: _GET('dradio'),
  dext: _GET('dext'),
  drid: _GET('drid'),
  moid: _GET('moid'),
  callback: _GET('callback'),
  productid: _GET('purchaseid'),
  mac: _GET('mac'),
  imei: _GET('imei'),
  idfa: _GET('idfa'),
  idfv: _GET('idfv'),
  os: _GET("os") || 0
};