!function() {
    "use strict";
    var e, n = (function(e) {
        function t() {
            return e.exports = t = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var a in n)
                        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
                }
                return e
            }
            ,
            t.apply(this, arguments)
        }
        e.exports = t
    }(e = {
        exports: {}
    }, e.exports),
    e.exports);
    var o = function(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    };
    function a(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1,
            a.configurable = !0,
            "value"in a && (a.writable = !0),
            Object.defineProperty(e, a.key, a)
        }
    }
    function h(r, n, a, e, t) {
        var i = 3 < arguments.length && void 0 !== e ? e : "ws://sys.aiotos.net:8090"
          , o = 4 < arguments.length && void 0 !== t ? t : []
          , s = null
          , u = null
          , c = {
            timeout: 5e3,
            timeoutObj: null,
            serverTimeoutObj: null,
            closeSocket: !1,
            stop: function() {
                clearTimeout(this.timeoutObj),
                clearTimeout(this.serverTimeoutObj)
            },
            reset: function() {
                return this.stop(),
                this
            },
            start: function() {
                var e = this;
                this.timeoutObj = setTimeout(function() {
                    s.send("ping"),
                    e.serverTimeoutObj = setTimeout(function() {
                        r(D, "heartbeat error,local network lost?"),
                        s.close()
                    }, e.timeout)
                }, this.timeout)
            }
        };
        function l() {
            u && (clearTimeout(u),
            u = null)
        }
        function d(e, t) {
            l(),
            r(D, "WEBSOCKET" + t + "，" + e.toString() + "s后将重试..."),
            u = setTimeout(function() {
                h(r, n, a, i, o)
            }, 1e3 * e)
        }
        if (window.WebSocket) {
            if (null != s) {
                try {
                    s.close()
                } catch (e) {
                    r(v, "WEBSOCKET" + msg + "，" + sec.toString() + "s后将重试...")
                }
                s = null
            }
            if (null == s) {
                r(b, "连接中，请稍候...");
                var f = i + "/data/push?device_ids=" + n.join(",") + "&data_ids=" + a.join(",");
                return r(w, f),
                (s = new WebSocket(f)).onmessage = function(t) {
                    c.reset().start();
                    var e = JSON.parse(t.data)
                      , n = ""
                      , a = !1;
                    try {
                        "dev_info"in e ? n = e.dev_info.split("——")[1] : a = !0
                    } catch (e) {
                        return void r(v, e + ":" + t.data)
                    }
                    0 != o.length && -1 == o.indexOf(n) ? r(y, "忽略此设备数据：" + e.dev_info) : 1 == a ? (r(y, e),
                    "offline" == e.event ? r(E, e) : "online" == e.event ? r(E, e) : r(y, e)) : r(g, e)
                }
                ,
                s.onerror = function(e) {
                    r(v, "通道错误！" + e.data),
                    d(10, "通道错误" + e.data)
                }
                ,
                s.onopen = function() {
                    r(p, "数据管道已连接！"),
                    l(),
                    c.reset().start()
                }
                ,
                s.onclose = function() {
                    var e = "数据管道已断开！";
                    r(m, e),
                    1 == c.closeSocket ? l() : d(3, e),
                    s = null
                }
                ,
                {
                    ws: s,
                    heartCheck: c
                }
            }
        } else
            alert("Sorry, your browser does not support WebSocket!")
    }
    function r(e, t) {
        var n = e.getDataBindings();
        if (n) {
            for (var a in n.a) {
                var r = n.a[a]
                  , i = t[r.id];
                void 0 !== i && (r.func && (i = r.func(i)),
                e.a(a, i))
            }
            for (var o in n.s) {
                var s = n.s[o]
                  , u = t[s.id];
                void 0 !== u && (s.func && (u = s.func(u)),
                e.s(o, u))
            }
            for (var c in n.p) {
                var l = n.p[c]
                  , d = t[l.id];
                void 0 !== d && (l.func && (d = l.func(d)),
                e[ht.Default.setter(c)](d))
            }
        }
    }
    function f(e) {
        var n = e.table
          , a = e.maxLength
          , t = e.addDatas;
        if (null != n) {
            var r = n.a("scrollTableAnimate")
              , i = n.a("scrollTableQueue");
            if (i || (n.a("scrollTableQueue", []),
            i = n.a("scrollTableQueue")),
            r && r.isRunning())
                0 === i.length && i.push({
                    table: n,
                    maxLength: a,
                    addDatas: t
                });
            else if (n && ht.Default.isArray(t) && 0 !== t.length) {
                var o = n.a("ht.dataSource") || []
                  , s = n.a("ht.rowHeight") || 36
                  , u = t.concat(o)
                  , c = t.length * s;
                n.a("ht.dataSource", u),
                n.a("ht.translateY", -c),
                n.a("scrollTableAnimate", ht.Default.startAnim({
                    frames: 15,
                    interval: 0,
                    finishFunc: function() {
                        if (a) {
                            var e = u.length;
                            if (a < e) {
                                var t = e - a;
                                u.splice(a, t),
                                n.a("ht.dataSource", u)
                            }
                        }
                        i && 0 !== i.length && f(i.shift())
                    },
                    action: function(e) {
                        n.a("ht.translateY", c * e - c)
                    }
                }))
            }
        }
    }
    function s(r) {
        function e() {
            var e = new Date
              , t = r.getDataByTag("date")
              , n = r.getDataByTag("time")
              , a = r.getDataByTag("week");
            t && t.s("text", T.formatDate(e, "YYYY-MM-DD")),
            n && n.s("text", T.formatDate(e, "HH:mm:SS")),
            a && a.s("text", "星期" + T.formatDate(e, "W"))
        }
        setInterval(e, 1e3),
        e()
    }
    function i(n, a) {
        return function() {
            for (var e = new Array(arguments.length), t = 0; t < e.length; t++)
                e[t] = arguments[t];
            return n.apply(a, e)
        }
    }
    var u = function(e, t, n) {
        return t && a(e.prototype, t),
        n && a(e, n),
        e
    }
      , c = function() {
        function e() {
            o(this, e),
            this.jsonCache = {}
        }
        return u(e, [{
            key: "init2dScreen",
            value: function(e, t) {
                var n = this.g3d
                  , a = this.dm2d = new ht.DataModel
                  , r = this.g2d = new ht.graph.GraphView(a)
                  , i = r.getView();
                if (i.style.left = "0",
                i.style.right = "0",
                i.style.top = "0",
                i.style.bottom = "0",
                r.getSelectWidth = function() {
                    return 0
                }
                ,
                r.handleScroll = function() {}
                ,
                r.handlePinch = function() {}
                ,
                r.setPannable(!1),
                r.setRectSelectable(!1),
                r.setScrollBarVisible(!1),
                r.setMovableFunc(function() {
                    return !1
                }),
                n ? n.getView().appendChild(r.getView()) : document.body.appendChild(r.getView()),
                e) {
                    var o = e.downListener
                      , s = e.moveListener
                      , u = e.upListener
                      , c = e.wheelListener
                      , l = e.commonListener;
                    l && (this.commonListener = l,
                    i.addEventListener("mousedown", this.commonListener.bind(this, r)),
                    i.addEventListener("mousemove", this.commonListener.bind(this, r)),
                    i.addEventListener("mouseup", this.commonListener.bind(this, r)),
                    i.addEventListener("touchstart", this.commonListener.bind(this, r)),
                    i.addEventListener("touchmove", this.commonListener.bind(this, r)),
                    i.addEventListener("touchend", this.commonListener.bind(this, r))),
                    o && (this.downListener = o,
                    i.addEventListener("mousedown", this.downListener.bind(this, r)),
                    i.addEventListener("touchstart", this.downListener.bind(this, r))),
                    s && (this.moveListener = s,
                    i.addEventListener("mousemove", this.moveListener.bind(this, r)),
                    i.addEventListener("touchmove", this.moveListener.bind(this, r))),
                    u && (this.upListener = u,
                    i.addEventListener("mouseup", this.upListener.bind(this, r)),
                    i.addEventListener("touchend", this.upListener.bind(this, r))),
                    c && (this.wheelListener = c,
                    i.addEventListener("wheel", this.wheelListener.bind(this, r)))
                }
                this.g2dResizeListener = function(e) {
                    r.fitContent(!1, 0),
                    r.iv()
                }
                ,
                window.addEventListener("resize", this.g2dResizeListener),
                "function" == typeof t && t(r, a)
            }
        }, {
            key: "init3dScreen",
            value: function(e, t) {
                var n = 0 < arguments.length && void 0 !== e ? e : document.body
                  , a = 1 < arguments.length ? t : void 0
                  , r = this.dm3d = new ht.DataModel
                  , i = this.g3d = new ht.graph3d.Graph3dView(r)
                  , o = i.getView()
                  , s = o.style;
                s.left = "0",
                s.right = "0",
                s.top = "0",
                s.bottom = "0",
                n.appendChild(o),
                this.g3dResizeListener = function(e) {
                    i.iv()
                }
                ,
                window.addEventListener("resize", this.g3dResizeListener),
                "function" == typeof a && a(i, r)
            }
        }, {
            key: "load2dScreen",
            value: function(u, e, c) {
                var t = this;
                "function" == typeof e && e(l, d);
                var l = this.g2d
                  , d = this.dm2d;
                if (d.clear(),
                "string" == typeof u) {
                    var n = function(e) {
                        if (e) {
                            var s = t;
                            l.deserialize(u, function(e, t, n, a) {
                                if (e.title && (document.title = e.title),
                                e.a["json.background"]) {
                                    var r = e.a["json.background"];
                                    if (0 === r.indexOf("displays")) {
                                        var i = new ht.graph.GraphView;
                                        i.deserialize(r),
                                        i.addToDOM(),
                                        graphView.addToDOM(i.getView())
                                    } else if (0 === r.indexOf("scenes")) {
                                        var o = new ht.graph3d.Graph3dView;
                                        o.deserialize(r),
                                        o.addToDOM(),
                                        graphView.addToDOM(o.getView())
                                    }
                                }
                                "function" == typeof c && c(l, d),
                                s.jsonCache[u] = e
                            })
                        } else
                            console.log("资源加载失败")
                    };
                    this.jsonCache[u] ? n(this.jsonCache[u]) : ht.Default.xhrLoad(u, n),
                    this.currentG2dUrl = u
                }
            }
        }, {
            key: "load3dScreen",
            value: function(f, e, h) {
                var t = this;
                "function" == typeof e && e(p, m);
                var p = this.g3d
                  , m = this.dm3d;
                if ("string" == typeof f) {
                    var n = function(e) {
                        if (e) {
                            m.a("isClearDm") && m.clear();
                            var d = t;
                            p.deserialize(f, function(e, t, n, a) {
                                var r = ht.Default.parse(e)
                                  , i = ht.Default.clone(r.a)
                                  , o = this.defaultScene = r.scene;
                                if (p.isOrtho()) {
                                    var s = window.htBuildConfig
                                      , u = s.eye
                                      , c = s.center
                                      , l = s.orthoWidth;
                                    p.setOrthoWidth(ht.Default.isTouchable ? l.mb : l.pc),
                                    p.setEye(ht.Default.isTouchable ? u.mb : u.pc),
                                    p.setCenter(ht.Default.isTouchable ? c.mb : c.pc)
                                } else
                                    p.setEye(o.eye),
                                    p.setCenter(o.center);
                                p.setFar(o.far),
                                p.setNear(o.near),
                                r.p && m.setBackground(r.p.background),
                                "function" == typeof h && h(p, m, i),
                                d.jsonCache[f] = e
                            })
                        } else
                            console.log("资源加载失败")
                    };
                    this.jsonCache[f] ? n(this.jsonCache[f]) : ht.Default.xhrLoad(f, n),
                    this.currentG3dUrl = f
                }
            }
        }, {
            key: "reset2dEvent",
            value: function(e) {
                var t = e.miListener
                  , n = e.umiListener
                  , a = e.mpListener
                  , r = e.umpListener
                  , i = e.scope;
                t && this.add2dMiEvent(t, i),
                n && this.remove2dMiEvent(n, i),
                a && this.add2dMpEvent(a, i),
                r && this.remove2dMpEvent(r, i)
            }
        }, {
            key: "reset3dEvent",
            value: function(e) {
                var t = e.miListener
                  , n = e.umiListener
                  , a = e.mpListener
                  , r = e.umpListener
                  , i = e.scope;
                t && this.add3dMiEvent(t, i),
                n && this.remove3dMiEvent(n, i),
                a && this.add3dMpEvent(a, i),
                r && this.remove3dMpEvent(r, i)
            }
        }, {
            key: "add2dMiEvent",
            value: function(e, t) {
                var n = this.g2d
                  , a = this.mi2dEventInfo;
                if (a) {
                    var r = a.listener
                      , i = a.listenerScope;
                    this.remove2dMiEvent(r, i)
                }
                this.mi2dEventInfo = {
                    listener: e,
                    listenerScope: t
                },
                e && n.mi(e, t)
            }
        }, {
            key: "remove2dMiEvent",
            value: function(e, t) {
                var n = this.g2d;
                e && n.umi(e, t)
            }
        }, {
            key: "add3dMiEvent",
            value: function(e, t) {
                var n = this.g3d
                  , a = this.mi3dEventInfo;
                if (a) {
                    var r = a.listener
                      , i = a.listenerScope;
                    this.remove3dMiEvent(r, i)
                }
                this.mi3dEventInfo = {
                    listener: e,
                    listenerScope: t
                },
                e && n.mi(e, t)
            }
        }, {
            key: "remove3dMiEvent",
            value: function(e, t) {
                var n = this.g3d;
                e && n.umi(e, t)
            }
        }, {
            key: "add2dMpEvent",
            value: function(e, t) {
                var n = this.g2d
                  , a = this.mp2dEventInfo;
                if (a) {
                    var r = a.listener
                      , i = a.listenerScope;
                    this.remove2dMpEvent(r, i)
                }
                this.mp2dEventInfo = {
                    listener: e,
                    listenerScope: t
                },
                e && n.mp(e, t)
            }
        }, {
            key: "remove2dMpEvent",
            value: function(e, t) {
                var n = this.g2d;
                e && n.ump(e, t)
            }
        }, {
            key: "add3dMpEvent",
            value: function(e, t) {
                var n = this.g3d
                  , a = this.mp3dEventInfo;
                if (a) {
                    var r = a.listener
                      , i = a.listenerScope;
                    this.remove3dMpEvent(r, i)
                }
                this.mp3dEventInfo = {
                    listener: e,
                    listenerScope: t
                },
                e && n.mp(e, t)
            }
        }, {
            key: "remove3dMpEvent",
            value: function(e, t) {
                var n = this.g3d;
                e && n.ump(e, t)
            }
        }, {
            key: "remove2d",
            value: function() {
                var e = this.g2d
                  , t = this.dm2d
                  , n = this.g3d
                  , a = e.getView();
                e && (t.clear(),
                this.g2dResizeListener && window.removeEventListener("resize", this.g2dResizeListener),
                this.commonListener && (a.removeEventListener("mousedown", this.commonListener),
                a.removeEventListener("mousemove", this.commonListener),
                a.removeEventListener("mouseup", this.commonListener),
                a.removeEventListener("touchstart", this.commonListener),
                a.removeEventListener("touchmove", this.commonListener),
                a.removeEventListener("touchend", this.commonListener)),
                this.downListener && (a.removeEventListener("mousedown", this.downListener),
                a.removeEventListener("touchstart", this.downListener)),
                this.moveListener && (a.removeEventListener("mousemove", this.moveListener),
                a.removeEventListener("touchmove", this.moveListener)),
                this.upListener && (a.removeEventListener("mouseup", this.upListener),
                a.removeEventListener("touchend", this.upListener)),
                this.wheelListener && a.removeEventListener("mousewheel", this.wheelListener),
                this.mi2dEventInfo && (this.mi2dEventInfo = null),
                this.mp2dEventInfo && (this.mp2dEventInfo = null),
                n ? n.getView().removeChild(e.getView()) : document.body.removeChild(e.getView()))
            }
        }, {
            key: "remove3d",
            value: function(e) {
                this.remove2d(),
                this.mi3dEventInfo && (this.mi3dEventInfo = null),
                this.mp3dEventInfo && (this.mp3dEventInfo = null),
                this.g3dResizeListener && window.removeEventListener("resize", this.g3dResizeListener);
                var t = this.g3d;
                this.dm3d.clear(),
                e.removeChild(t.getView())
            }
        }, {
            key: "destory",
            value: function(e) {
                var t = 0 < arguments.length && void 0 !== e ? e : document.body;
                this.remove3d(t),
                this.jsonCache = null
            }
        }]),
        e
    }()
      , p = "✅ Socket connected!"
      , m = "❌ Socket disconnected!"
      , v = "❌ Socket Error!!!"
      , g = "Websocket message received"
      , y = "Websocket warning received"
      , b = "Websocket connecting..."
      , w = "Websocket debug info"
      , D = "Websocket reconnected"
      , E = "device link status changed!"
      , l = function(e) {
        var t = [];
        for (var n in e)
            t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
        return t.push(("v=" + Math.random()).replace(".", "")),
        t.join("&")
    }
      , d = {}
      , S = ["shape3d", "all", "left", "right", "top", "bottom", "front", "close", "from", "to"]
      , T = {
        setDataBindingDatas: function(e, t) {
            var n = this;
            r(e, t),
            e.hasChildren() && e.getChildren().each(function(e) {
                n.setDataBindingDatas(e, t)
            })
        },
        setBindingDatas: function(e, t) {
            e.each(function(e) {
                r(e, t)
            })
        },
        to3dPoint: function(e, t, n) {
            var a = 2 < arguments.length && void 0 !== n ? n : 400
              , r = a * Math.sin(Math.PI / 180 * t)
              , i = a * Math.cos(Math.PI / 180 * t);
            return [i * Math.sin(Math.PI / 180 * e), r, i * Math.cos(Math.PI / 180 * e)]
        },
        saveNodeOpacity: function(e, n) {
            e.each(function(t) {
                var e = t.getId();
                if (d[e] ? t === n && t.setStyleMap(ht.Default.clone(d[e])) : d[e] = ht.Default.clone(t.getStyleMap()),
                ht.Default.isArray(n)) {
                    if (0 <= n.indexOf(t))
                        return
                } else if (t === n)
                    return;
                S.forEach(function(e) {
                    t.s(e + ".opacity", .04),
                    t.s(e + ".transparent", !0)
                }),
                t.s({
                    "3d.selectable": !1,
                    batch: void 0
                })
            })
        },
        restoreNodeOpacity: function(e) {
            e.each(function(e) {
                e.setStyleMap(ht.Default.clone(d[e.getId()]))
            })
        },
        formatDate: function(e, t) {
            var n = t;
            n = (n = n.replace(/yyyy|YYYY/, e.getFullYear())).replace(/yy|YY/, 9 < e.getYear() % 100 ? (e.getYear() % 100).toString() : "0" + e.getYear() % 100);
            var a = e.getMonth() + 1;
            n = (n = (n = (n = (n = n.replace(/MM/, 9 < a ? a.toString() : "0" + a)).replace(/M/g, a)).replace(/w|W/g, ["日", "一", "二", "三", "四", "五", "六"][e.getDay()])).replace(/dd|DD/, 9 < e.getDate() ? e.getDate().toString() : "0" + e.getDate())).replace(/d|D/g, e.getDate());
            var r = e.getHours();
            return n = (n = (n = (n = n.replace(/HH/, 9 < r ? r.toString() : "0" + r)).replace(/H/g, r)).replace(/A/g, 12 <= r ? "PM" : "AM")).replace(/Aa/g, 12 <= r ? "pm" : "am"),
            r = 12 < r ? r % 12 : r,
            n = (n = (n = (n = (n = (n = n.replace(/hh/, 9 < r ? r.toString() : "0" + r)).replace(/h/g, r)).replace(/mm/, 9 < e.getMinutes() ? e.getMinutes().toString() : "0" + e.getMinutes())).replace(/m/g, e.getMinutes())).replace(/ss|SS/, 9 < e.getSeconds() ? e.getSeconds().toString() : "0" + e.getSeconds())).replace(/s|S/g, e.getSeconds())
        },
        nodeCloned: function(i) {
            var e, t = new ht.graph.GraphView, n = new ht.JSONSerializer(i.dm());
            return n.isSerializable = function(e) {
                if (e.getTag() === i.getTag())
                    return i.dm().sm().co(e)
            }
            ,
            t.deserialize(n.serialize(), function(e, t, n, a) {
                var r = t.getDataByTag(i.getTag());
                r.setWidth(1024),
                r.setHeight(600),
                t.md(function(e) {})
            }),
            (e = t).handleScroll = function() {}
            ,
            e.handlePinch = function() {}
            ,
            e.setPannable(!1),
            e.setRectSelectable(!1),
            e.setScrollBarVisible(!1),
            e.setMovableFunc(function() {
                return !1
            }),
            e.getSelectWidth = function() {
                return 0
            }
            ,
            animShow({
                node: i,
                show: !1
            }),
            t
        },
        popupDialog: function(t, e, n, a) {
            var r = 1 < arguments.length && void 0 !== e ? e : "提示"
              , i = 2 < arguments.length && void 0 !== n ? n : "1024"
              , o = 3 < arguments.length && void 0 !== a ? a : "600"
              , s = this.nodeCloned(t)
              , u = window.dialog = new ht.widget.Dialog;
            u.setConfig({
                title: r,
                titleAlign: "left",
                closable: !0,
                width: i,
                height: o,
                draggable: !1,
                maximizable: !0,
                resizeMode: "wh",
                contentPadding: 0,
                borderWidth: 10,
                content: s,
                buttonsAlign: "right",
                action: function() {
                    u.hide()
                }
            });
            var c = "restore";
            u.addEventListener(function(e) {
                "hide" == e.kind && animShow({
                    node: t,
                    show: !0
                }),
                "maximize" != e.kind && "betweenResize" != e.kind && "restore" != e.kind || ("maximize" != e.kind && "restore" != e.kind || (c = e.kind),
                s.fitContent())
            }),
            u.getView().firstChild.addEventListener("click", function(e) {
                u.hide()
            }),
            u.getView().lastChild.addEventListener("dblclick", function(e) {
                "restore" == c && u.maximize(),
                "maximize" == c && u.restore()
            }),
            u.show()
        },
        initLineChartData: function(t, r, e) {
            var i = 2 < arguments.length && void 0 !== e && e
              , o = this
              , n = t.a("ht.xAxis")[0];
            if (n) {
                var s = n.data
                  , a = t.a("ht.series")
                  , u = []
                  , c = {};
                a.forEach(function(e) {
                    u.push({
                        bind: e.bind,
                        data: e.data
                    });
                    var t = e.bind.split(".")
                      , n = t[0];
                    hasKey(c, n) ? c[n].push(t[1]) : c[n] = [t[1]]
                }),
                25 === s.length && (u.forEach(function(e) {
                    e.data.shift()
                }),
                s.shift());
                var l = r[0]
                  , d = function(n) {
                    $.get(iotos_host + "/api/device/" + n + "/platformpoint", {
                        data_ids: c[n].join(","),
                        time: l.section[0],
                        end: l.section[1]
                    }, function(e) {
                        var a = JSON.parse(e);
                        0 == a.code ? (r.shift(),
                        u.forEach(function(e) {
                            var t = e.bind.split(".");
                            t[0] === n && e.data.push(function(e) {
                                var t = a.data[e].length;
                                if (0 === t)
                                    return 0;
                                var n = 0;
                                return a.data[e].forEach(function(e) {
                                    n += Number(e.val)
                                }),
                                (n / t * 1).toFixed(1)
                            }(t[1]))
                        }),
                        s.push(l.hour),
                        t.iv(),
                        0 < r.length ? setTimeout(function() {
                            o.initLineChartData(t, r)
                        }, 200) : 0 == i && setInterval(function() {
                            var e = new Date;
                            0 == e.getMinutes() && 1 == e.getSeconds() && (console.warn("曲线整点刷新"),
                            o.initLineChartData(t, hours24(!0), !0))
                        }, 1e3)) : setTimeout(function() {
                            o.initLineChartData(t, r)
                        }, 1e3)
                    })
                };
                for (var f in c)
                    d(f)
            }
        },
        pget: function(e, t) {
            return e[ht.Default.getter(t)]()
        },
        pset: function(e, t, n) {
            return e[ht.Default.setter(t)](n)
        }
    }
      , L = ht.Math.Vector3
      , t = window.app_config
      , k = t.getHeatData
      , j = t.heatMapMinValue
      , C = t.heatMapMaxValue
      , O = {
        x: 0,
        y: 0,
        z: 0
    }
      , x = function(e, t) {
        var n = new ht.Node;
        n.setAnchor3d({
            x: .5,
            y: .5,
            z: .5
        }),
        n.setTag("floor" + t),
        n.s3([2e3, 2, 1e3]),
        n.a({
            index: t
        }),
        n.s({
            shape3d: "plane",
            "shape3d.image": "symbols/zkys/htdesign/decorate/ground.json",
            "shape3d.image.cache": !1,
            "shape3d.vector.dynamic": !0,
            "shape3d.reverse.flip": !0,
            "3d.movable": !1,
            "select.brightness": 1,
            "shape3d.reverse.cull": !0
        });
        var a = new ht.Node;
        return a.setAnchor3d({
            x: .5,
            y: .5,
            z: .5
        }),
        a.s3([1800, 0, 800]),
        a.p3([0, 4, 0]),
        a.a({
            index: t
        }),
        a.s({
            "3d.movable": !1,
            "all.visible": !1,
            "top.visible": !0,
            "top.reverse.flip": !0,
            "bottom.visible": !0,
            "bottom.transparent": !0,
            "bottom.opacity": .1,
            "bottom.reverse.flip": !0,
            "select.brightness": 1
        }),
        B(a, t),
        a.setHost(n),
        a.setParent(n),
        e.add(a),
        e.add(n),
        n
    }
      , M = function(e, t, n) {
        var a = new L(t.p3());
        ht.Default.startAnim({
            frames: 20,
            interval: 0,
            finishFunc: function() {
                e.a("animateNumber", e.a("animateNumber") - 1)
            },
            action: function(e) {
                t.p3((new L).lerpVectors(a, n, e).toArray())
            }
        })
    }
      , B = function(e, t) {
        var n = h337.create({
            width: 1200,
            height: 500
        });
        n._renderer.canvas.dynamic = !0,
        n.setData({
            data: k(1200, 500),
            min: j,
            max: C
        }),
        ht.Default.setImage("hm-floor" + t, n._renderer.canvas),
        e.s("top.image") || e.s({
            "top.image": "hm-floor" + t
        })
    }
      , N = Object.prototype.toString;
    function R(e) {
        return "[object Array]" === N.call(e)
    }
    function A(e) {
        return null !== e && "object" == typeof e
    }
    function P(e) {
        return "[object Function]" === N.call(e)
    }
    function F(e, t) {
        if (null != e)
            if ("object" != typeof e && (e = [e]),
            R(e))
                for (var n = 0, a = e.length; n < a; n++)
                    t.call(null, e[n], n, e);
            else
                for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && t.call(null, e[r], r, e)
    }
    var z = {
        isArray: R,
        isArrayBuffer: function(e) {
            return "[object ArrayBuffer]" === N.call(e)
        },
        isBuffer: function(e) {
            return null != e && null != e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
        },
        isFormData: function(e) {
            return "undefined" != typeof FormData && e instanceof FormData
        },
        isArrayBufferView: function(e) {
            return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer
        },
        isString: function(e) {
            return "string" == typeof e
        },
        isNumber: function(e) {
            return "number" == typeof e
        },
        isObject: A,
        isUndefined: function(e) {
            return void 0 === e
        },
        isDate: function(e) {
            return "[object Date]" === N.call(e)
        },
        isFile: function(e) {
            return "[object File]" === N.call(e)
        },
        isBlob: function(e) {
            return "[object Blob]" === N.call(e)
        },
        isFunction: P,
        isStream: function(e) {
            return A(e) && P(e.pipe)
        },
        isURLSearchParams: function(e) {
            return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
        },
        isStandardBrowserEnv: function() {
            return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document)
        },
        forEach: F,
        merge: function n() {
            var a = {};
            function e(e, t) {
                "object" == typeof a[t] && "object" == typeof e ? a[t] = n(a[t], e) : a[t] = e
            }
            for (var t = 0, r = arguments.length; t < r; t++)
                F(arguments[t], e);
            return a
        },
        deepMerge: function n() {
            var a = {};
            function e(e, t) {
                "object" == typeof a[t] && "object" == typeof e ? a[t] = n(a[t], e) : a[t] = "object" == typeof e ? n({}, e) : e
            }
            for (var t = 0, r = arguments.length; t < r; t++)
                F(arguments[t], e);
            return a
        },
        extend: function(n, e, a) {
            return F(e, function(e, t) {
                n[t] = a && "function" == typeof e ? i(e, a) : e
            }),
            n
        },
        trim: function(e) {
            return e.replace(/^\s*/, "").replace(/\s*$/, "")
        }
    };
    function I(e) {
        return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
    }
    function V(e, t, n) {
        if (!t)
            return e;
        var a;
        if (n)
            a = n(t);
        else if (z.isURLSearchParams(t))
            a = t.toString();
        else {
            var r = [];
            z.forEach(t, function(e, t) {
                null != e && (z.isArray(e) ? t += "[]" : e = [e],
                z.forEach(e, function(e) {
                    z.isDate(e) ? e = e.toISOString() : z.isObject(e) && (e = JSON.stringify(e)),
                    r.push(I(t) + "=" + I(e))
                }))
            }),
            a = r.join("&")
        }
        if (a) {
            var i = e.indexOf("#");
            -1 !== i && (e = e.slice(0, i)),
            e += (-1 === e.indexOf("?") ? "?" : "&") + a
        }
        return e
    }
    function H() {
        this.handlers = []
    }
    H.prototype.use = function(e, t) {
        return this.handlers.push({
            fulfilled: e,
            rejected: t
        }),
        this.handlers.length - 1
    }
    ,
    H.prototype.eject = function(e) {
        this.handlers[e] && (this.handlers[e] = null)
    }
    ,
    H.prototype.forEach = function(t) {
        z.forEach(this.handlers, function(e) {
            null !== e && t(e)
        })
    }
    ;
    function U(t, n, e) {
        return z.forEach(e, function(e) {
            t = e(t, n)
        }),
        t
    }
    function _(e) {
        return !(!e || !e.__CANCEL__)
    }
    function q(n, a) {
        z.forEach(n, function(e, t) {
            t !== a && t.toUpperCase() === a.toUpperCase() && (n[a] = e,
            delete n[t])
        })
    }
    function Y(e, t, n, a, r) {
        var i, o, s, u, c, l = new Error(e);
        return o = t,
        s = n,
        u = a,
        c = r,
        (i = l).config = o,
        s && (i.code = s),
        i.request = u,
        i.response = c,
        i.isAxiosError = !0,
        i.toJSON = function() {
            return {
                message: this.message,
                name: this.name,
                description: this.description,
                number: this.number,
                fileName: this.fileName,
                lineNumber: this.lineNumber,
                columnNumber: this.columnNumber,
                stack: this.stack,
                config: this.config,
                code: this.code
            }
        }
        ,
        i
    }
    var W, G, J, Q = H, X = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"], K = z.isStandardBrowserEnv() ? (G = /(msie|trident)/i.test(navigator.userAgent),
    J = document.createElement("a"),
    W = Z(window.location.href),
    function(e) {
        var t = z.isString(e) ? Z(e) : e;
        return t.protocol === W.protocol && t.host === W.host
    }
    ) : function() {
        return !0
    }
    ;
    function Z(e) {
        var t = e;
        return G && (J.setAttribute("href", t),
        t = J.href),
        J.setAttribute("href", t),
        {
            href: J.href,
            protocol: J.protocol ? J.protocol.replace(/:$/, "") : "",
            host: J.host,
            search: J.search ? J.search.replace(/^\?/, "") : "",
            hash: J.hash ? J.hash.replace(/^#/, "") : "",
            hostname: J.hostname,
            port: J.port,
            pathname: "/" === J.pathname.charAt(0) ? J.pathname : "/" + J.pathname
        }
    }
    function ee(p) {
        return new Promise(function(d, f) {
            var n = p.data
              , a = p.headers;
            z.isFormData(n) && delete a["Content-Type"];
            var h = new XMLHttpRequest;
            if (p.auth) {
                var e = p.auth.username || ""
                  , t = p.auth.password || "";
                a.Authorization = "Basic " + btoa(e + ":" + t)
            }
            if (h.open(p.method.toUpperCase(), V(p.url, p.params, p.paramsSerializer), !0),
            h.timeout = p.timeout,
            h.onreadystatechange = function() {
                if (h && 4 === h.readyState && (0 !== h.status || h.responseURL && 0 === h.responseURL.indexOf("file:"))) {
                    var e, t, n, a, r, i, o, s, u, c = "getAllResponseHeaders"in h ? (e = h.getAllResponseHeaders(),
                    r = {},
                    e && z.forEach(e.split("\n"), function(e) {
                        if (a = e.indexOf(":"),
                        t = z.trim(e.substr(0, a)).toLowerCase(),
                        n = z.trim(e.substr(a + 1)),
                        t) {
                            if (r[t] && 0 <= X.indexOf(t))
                                return;
                            r[t] = "set-cookie" === t ? (r[t] ? r[t] : []).concat([n]) : r[t] ? r[t] + ", " + n : n
                        }
                    }),
                    r) : null, l = {
                        data: p.responseType && "text" !== p.responseType ? h.response : h.responseText,
                        status: h.status,
                        statusText: h.statusText,
                        headers: c,
                        config: p,
                        request: h
                    };
                    i = d,
                    o = f,
                    !(u = (s = l).config.validateStatus) || u(s.status) ? i(s) : o(Y("Request failed with status code " + s.status, s.config, null, s.request, s)),
                    h = null
                }
            }
            ,
            h.onabort = function() {
                h && (f(Y("Request aborted", p, "ECONNABORTED", h)),
                h = null)
            }
            ,
            h.onerror = function() {
                f(Y("Network Error", p, null, h)),
                h = null
            }
            ,
            h.ontimeout = function() {
                f(Y("timeout of " + p.timeout + "ms exceeded", p, "ECONNABORTED", h)),
                h = null
            }
            ,
            z.isStandardBrowserEnv()) {
                var r = te
                  , i = (p.withCredentials || K(p.url)) && p.xsrfCookieName ? r.read(p.xsrfCookieName) : void 0;
                i && (a[p.xsrfHeaderName] = i)
            }
            if ("setRequestHeader"in h && z.forEach(a, function(e, t) {
                void 0 === n && "content-type" === t.toLowerCase() ? delete a[t] : h.setRequestHeader(t, e)
            }),
            p.withCredentials && (h.withCredentials = !0),
            p.responseType)
                try {
                    h.responseType = p.responseType
                } catch (e) {
                    if ("json" !== p.responseType)
                        throw e
                }
            "function" == typeof p.onDownloadProgress && h.addEventListener("progress", p.onDownloadProgress),
            "function" == typeof p.onUploadProgress && h.upload && h.upload.addEventListener("progress", p.onUploadProgress),
            p.cancelToken && p.cancelToken.promise.then(function(e) {
                h && (h.abort(),
                f(e),
                h = null)
            }),
            void 0 === n && (n = null),
            h.send(n)
        }
        )
    }
    var te = z.isStandardBrowserEnv() ? {
        write: function(e, t, n, a, r, i) {
            var o = [];
            o.push(e + "=" + encodeURIComponent(t)),
            z.isNumber(n) && o.push("expires=" + new Date(n).toGMTString()),
            z.isString(a) && o.push("path=" + a),
            z.isString(r) && o.push("domain=" + r),
            !0 === i && o.push("secure"),
            document.cookie = o.join("; ")
        },
        read: function(e) {
            var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
            return t ? decodeURIComponent(t[3]) : null
        },
        remove: function(e) {
            this.write(e, "", Date.now() - 864e5)
        }
    } : {
        write: function() {},
        read: function() {
            return null
        },
        remove: function() {}
    }
      , ne = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
    function ae(e, t) {
        !z.isUndefined(e) && z.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
    }
    var re, ie = {
        adapter: ("undefined" != typeof process && "[object process]" === Object.prototype.toString.call(process) ? re = ee : "undefined" != typeof XMLHttpRequest && (re = ee),
        re),
        transformRequest: [function(e, t) {
            return q(t, "Accept"),
            q(t, "Content-Type"),
            z.isFormData(e) || z.isArrayBuffer(e) || z.isBuffer(e) || z.isStream(e) || z.isFile(e) || z.isBlob(e) ? e : z.isArrayBufferView(e) ? e.buffer : z.isURLSearchParams(e) ? (ae(t, "application/x-www-form-urlencoded;charset=utf-8"),
            e.toString()) : z.isObject(e) ? (ae(t, "application/json;charset=utf-8"),
            JSON.stringify(e)) : e
        }
        ],
        transformResponse: [function(e) {
            if ("string" == typeof e)
                try {
                    e = JSON.parse(e)
                } catch (e) {}
            return e
        }
        ],
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        validateStatus: function(e) {
            return 200 <= e && e < 300
        }
    };
    ie.headers = {
        common: {
            Accept: "application/json, text/plain, */*"
        }
    },
    z.forEach(["delete", "get", "head"], function(e) {
        ie.headers[e] = {}
    }),
    z.forEach(["post", "put", "patch"], function(e) {
        ie.headers[e] = z.merge(ne)
    });
    var oe = ie;
    function se(e) {
        e.cancelToken && e.cancelToken.throwIfRequested()
    }
    function ue(t) {
        var e, n, a;
        return se(t),
        t.baseURL && (a = t.url,
        !/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(a)) && (t.url = (e = t.baseURL,
        (n = t.url) ? e.replace(/\/+$/, "") + "/" + n.replace(/^\/+/, "") : e)),
        t.headers = t.headers || {},
        t.data = U(t.data, t.headers, t.transformRequest),
        t.headers = z.merge(t.headers.common || {}, t.headers[t.method] || {}, t.headers || {}),
        z.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function(e) {
            delete t.headers[e]
        }),
        (t.adapter || oe.adapter)(t).then(function(e) {
            return se(t),
            e.data = U(e.data, e.headers, t.transformResponse),
            e
        }, function(e) {
            return _(e) || (se(t),
            e && e.response && (e.response.data = U(e.response.data, e.response.headers, t.transformResponse))),
            Promise.reject(e)
        })
    }
    function ce(t, n) {
        n = n || {};
        var a = {};
        return z.forEach(["url", "method", "params", "data"], function(e) {
            void 0 !== n[e] && (a[e] = n[e])
        }),
        z.forEach(["headers", "auth", "proxy"], function(e) {
            z.isObject(n[e]) ? a[e] = z.deepMerge(t[e], n[e]) : void 0 !== n[e] ? a[e] = n[e] : z.isObject(t[e]) ? a[e] = z.deepMerge(t[e]) : void 0 !== t[e] && (a[e] = t[e])
        }),
        z.forEach(["baseURL", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "maxContentLength", "validateStatus", "maxRedirects", "httpAgent", "httpsAgent", "cancelToken", "socketPath"], function(e) {
            void 0 !== n[e] ? a[e] = n[e] : void 0 !== t[e] && (a[e] = t[e])
        }),
        a
    }
    function le(e) {
        this.defaults = e,
        this.interceptors = {
            request: new Q,
            response: new Q
        }
    }
    le.prototype.request = function(e, t) {
        "string" == typeof e ? (e = t || {}).url = arguments[0] : e = e || {},
        (e = ce(this.defaults, e)).method = e.method ? e.method.toLowerCase() : "get";
        var n = [ue, void 0]
          , a = Promise.resolve(e);
        for (this.interceptors.request.forEach(function(e) {
            n.unshift(e.fulfilled, e.rejected)
        }),
        this.interceptors.response.forEach(function(e) {
            n.push(e.fulfilled, e.rejected)
        }); n.length; )
            a = a.then(n.shift(), n.shift());
        return a
    }
    ,
    le.prototype.getUri = function(e) {
        return e = ce(this.defaults, e),
        V(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
    }
    ,
    z.forEach(["delete", "get", "head", "options"], function(n) {
        le.prototype[n] = function(e, t) {
            return this.request(z.merge(t || {}, {
                method: n,
                url: e
            }))
        }
    }),
    z.forEach(["post", "put", "patch"], function(a) {
        le.prototype[a] = function(e, t, n) {
            return this.request(z.merge(n || {}, {
                method: a,
                url: e,
                data: t
            }))
        }
    });
    var de = le;
    function fe(e) {
        this.message = e
    }
    fe.prototype.toString = function() {
        return "Cancel" + (this.message ? ": " + this.message : "")
    }
    ,
    fe.prototype.__CANCEL__ = !0;
    var he = fe;
    function pe(e) {
        if ("function" != typeof e)
            throw new TypeError("executor must be a function.");
        var t;
        this.promise = new Promise(function(e) {
            t = e
        }
        );
        var n = this;
        e(function(e) {
            n.reason || (n.reason = new he(e),
            t(n.reason))
        })
    }
    pe.prototype.throwIfRequested = function() {
        if (this.reason)
            throw this.reason
    }
    ,
    pe.source = function() {
        var t;
        return {
            token: new pe(function(e) {
                t = e
            }
            ),
            cancel: t
        }
    }
    ;
    var me = pe;
    function ve(e) {
        var t = new de(e)
          , n = i(de.prototype.request, t);
        return z.extend(n, de.prototype, t),
        z.extend(n, t),
        n
    }
    var ge = ve(oe);
    ge.Axios = de,
    ge.create = function(e) {
        return ve(ce(ge.defaults, e))
    }
    ,
    ge.Cancel = he,
    ge.CancelToken = me,
    ge.isCancel = _,
    ge.all = function(e) {
        return Promise.all(e)
    }
    ,
    ge.spread = function(t) {
        return function(e) {
            return t.apply(null, e)
        }
    }
    ;
    var ye = ge
      , be = ge;
    ye.default = be;
    function we(e, t) {
        for (var n = t && t.plainObjects ? Object.create(null) : {}, a = 0; a < e.length; ++a)
            void 0 !== e[a] && (n[a] = e[a]);
        return n
    }
    function De(e, t) {
        Ae.apply(e, Re(t) ? t : [t])
    }
    function Ee(e, t, n, a, r, i, o, s, u, c, l, d, f) {
        var h, p = e;
        if ("function" == typeof o ? p = o(t, p) : p instanceof Date ? p = c(p) : "comma" === n && Re(p) && (p = p.join(",")),
        null === p) {
            if (a)
                return i && !d ? i(t, ze.encoder, f) : t;
            p = ""
        }
        if ("string" == typeof (h = p) || "number" == typeof h || "boolean" == typeof h || "symbol" == typeof h || "bigint" == typeof h || je.isBuffer(p))
            return i ? [l(d ? t : i(t, ze.encoder, f)) + "=" + l(i(p, ze.encoder, f))] : [l(t) + "=" + l(String(p))];
        var m, v = [];
        if (void 0 === p)
            return v;
        if (Re(o))
            m = o;
        else {
            var g = Object.keys(p);
            m = s ? g.sort(s) : g
        }
        for (var y = 0; y < m.length; ++y) {
            var b = m[y];
            r && null === p[b] || (Re(p) ? De(v, Ee(p[b], "function" == typeof n ? n(t, b) : t, n, a, r, i, o, s, u, c, l, d, f)) : De(v, Ee(p[b], t + (u ? "." + b : "[" + b + "]"), n, a, r, i, o, s, u, c, l, d, f)))
        }
        return v
    }
    var Se = ye
      , Te = Object.prototype.hasOwnProperty
      , Le = Array.isArray
      , ke = function() {
        for (var e = [], t = 0; t < 256; ++t)
            e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
        return e
    }()
      , je = {
        arrayToObject: we,
        assign: function(e, n) {
            return Object.keys(n).reduce(function(e, t) {
                return e[t] = n[t],
                e
            }, e)
        },
        combine: function(e, t) {
            return [].concat(e, t)
        },
        compact: function(e) {
            for (var t = [{
                obj: {
                    o: e
                },
                prop: "o"
            }], n = [], a = 0; a < t.length; ++a)
                for (var r = t[a], i = r.obj[r.prop], o = Object.keys(i), s = 0; s < o.length; ++s) {
                    var u = o[s]
                      , c = i[u];
                    "object" == typeof c && null !== c && -1 === n.indexOf(c) && (t.push({
                        obj: i,
                        prop: u
                    }),
                    n.push(c))
                }
            return function(e) {
                for (; 1 < e.length; ) {
                    var t = e.pop()
                      , n = t.obj[t.prop];
                    if (Le(n)) {
                        for (var a = [], r = 0; r < n.length; ++r)
                            void 0 !== n[r] && a.push(n[r]);
                        t.obj[t.prop] = a
                    }
                }
            }(t),
            e
        },
        decode: function(e, t, n) {
            var a = e.replace(/\+/g, " ");
            if ("iso-8859-1" === n)
                return a.replace(/%[0-9a-f]{2}/gi, unescape);
            try {
                return decodeURIComponent(a)
            } catch (e) {
                return a
            }
        },
        encode: function(e, t, n) {
            if (0 === e.length)
                return e;
            var a = e;
            if ("symbol" == typeof e ? a = Symbol.prototype.toString.call(e) : "string" != typeof e && (a = String(e)),
            "iso-8859-1" === n)
                return escape(a).replace(/%u[0-9a-f]{4}/gi, function(e) {
                    return "%26%23" + parseInt(e.slice(2), 16) + "%3B"
                });
            for (var r = "", i = 0; i < a.length; ++i) {
                var o = a.charCodeAt(i);
                45 === o || 46 === o || 95 === o || 126 === o || 48 <= o && o <= 57 || 65 <= o && o <= 90 || 97 <= o && o <= 122 ? r += a.charAt(i) : o < 128 ? r += ke[o] : o < 2048 ? r += ke[192 | o >> 6] + ke[128 | 63 & o] : o < 55296 || 57344 <= o ? r += ke[224 | o >> 12] + ke[128 | o >> 6 & 63] + ke[128 | 63 & o] : (i += 1,
                o = 65536 + ((1023 & o) << 10 | 1023 & a.charCodeAt(i)),
                r += ke[240 | o >> 18] + ke[128 | o >> 12 & 63] + ke[128 | o >> 6 & 63] + ke[128 | 63 & o])
            }
            return r
        },
        isBuffer: function(e) {
            return !(!e || "object" != typeof e) && !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e))
        },
        isRegExp: function(e) {
            return "[object RegExp]" === Object.prototype.toString.call(e)
        },
        merge: function a(r, i, o) {
            if (!i)
                return r;
            if ("object" != typeof i) {
                if (Le(r))
                    r.push(i);
                else {
                    if (!r || "object" != typeof r)
                        return [r, i];
                    (o && (o.plainObjects || o.allowPrototypes) || !Te.call(Object.prototype, i)) && (r[i] = !0)
                }
                return r
            }
            if (!r || "object" != typeof r)
                return [r].concat(i);
            var e = r;
            return Le(r) && !Le(i) && (e = we(r, o)),
            Le(r) && Le(i) ? (i.forEach(function(e, t) {
                if (Te.call(r, t)) {
                    var n = r[t];
                    n && "object" == typeof n && e && "object" == typeof e ? r[t] = a(n, e, o) : r.push(e)
                } else
                    r[t] = e
            }),
            r) : Object.keys(i).reduce(function(e, t) {
                var n = i[t];
                return Te.call(e, t) ? e[t] = a(e[t], n, o) : e[t] = n,
                e
            }, e)
        }
    }
      , Ce = String.prototype.replace
      , Oe = /%20/g
      , xe = {
        RFC1738: "RFC1738",
        RFC3986: "RFC3986"
    }
      , Me = je.assign({
        default: xe.RFC3986,
        formatters: {
            RFC1738: function(e) {
                return Ce.call(e, Oe, "+")
            },
            RFC3986: function(e) {
                return String(e)
            }
        }
    }, xe)
      , Be = Object.prototype.hasOwnProperty
      , Ne = {
        brackets: function(e) {
            return e + "[]"
        },
        comma: "comma",
        indices: function(e, t) {
            return e + "[" + t + "]"
        },
        repeat: function(e) {
            return e
        }
    }
      , Re = Array.isArray
      , Ae = Array.prototype.push
      , Pe = Date.prototype.toISOString
      , Fe = Me.default
      , ze = {
        addQueryPrefix: !1,
        allowDots: !1,
        charset: "utf-8",
        charsetSentinel: !1,
        delimiter: "&",
        encode: !0,
        encoder: je.encode,
        encodeValuesOnly: !1,
        format: Fe,
        formatter: Me.formatters[Fe],
        indices: !1,
        serializeDate: function(e) {
            return Pe.call(e)
        },
        skipNulls: !1,
        strictNullHandling: !1
    }
      , Ie = (Object.prototype.hasOwnProperty,
    function(e, t) {
        var n, a = e, r = function(e) {
            if (!e)
                return ze;
            if (null !== e.encoder && void 0 !== e.encoder && "function" != typeof e.encoder)
                throw new TypeError("Encoder has to be a function.");
            var t = e.charset || ze.charset;
            if (void 0 !== e.charset && "utf-8" !== e.charset && "iso-8859-1" !== e.charset)
                throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
            var n = Me.default;
            if (void 0 !== e.format) {
                if (!Be.call(Me.formatters, e.format))
                    throw new TypeError("Unknown format option provided.");
                n = e.format
            }
            var a = Me.formatters[n]
              , r = ze.filter;
            return "function" != typeof e.filter && !Re(e.filter) || (r = e.filter),
            {
                addQueryPrefix: "boolean" == typeof e.addQueryPrefix ? e.addQueryPrefix : ze.addQueryPrefix,
                allowDots: void 0 === e.allowDots ? ze.allowDots : !!e.allowDots,
                charset: t,
                charsetSentinel: "boolean" == typeof e.charsetSentinel ? e.charsetSentinel : ze.charsetSentinel,
                delimiter: void 0 === e.delimiter ? ze.delimiter : e.delimiter,
                encode: "boolean" == typeof e.encode ? e.encode : ze.encode,
                encoder: "function" == typeof e.encoder ? e.encoder : ze.encoder,
                encodeValuesOnly: "boolean" == typeof e.encodeValuesOnly ? e.encodeValuesOnly : ze.encodeValuesOnly,
                filter: r,
                formatter: a,
                serializeDate: "function" == typeof e.serializeDate ? e.serializeDate : ze.serializeDate,
                skipNulls: "boolean" == typeof e.skipNulls ? e.skipNulls : ze.skipNulls,
                sort: "function" == typeof e.sort ? e.sort : null,
                strictNullHandling: "boolean" == typeof e.strictNullHandling ? e.strictNullHandling : ze.strictNullHandling
            }
        }(t);
        "function" == typeof r.filter ? a = (0,
        r.filter)("", a) : Re(r.filter) && (n = r.filter);
        var i, o = [];
        if ("object" != typeof a || null === a)
            return "";
        i = t && t.arrayFormat in Ne ? t.arrayFormat : t && "indices"in t ? t.indices ? "indices" : "repeat" : "indices";
        var s = Ne[i];
        n = n || Object.keys(a),
        r.sort && n.sort(r.sort);
        for (var u = 0; u < n.length; ++u) {
            var c = n[u];
            r.skipNulls && null === a[c] || De(o, Ee(a[c], c, s, r.strictNullHandling, r.skipNulls, r.encode ? r.encoder : null, r.filter, r.sort, r.allowDots, r.serializeDate, r.formatter, r.encodeValuesOnly, r.charset))
        }
        var l = o.join(r.delimiter)
          , d = !0 === r.addQueryPrefix ? "?" : "";
        return r.charsetSentinel && ("iso-8859-1" === r.charset ? d += "utf8=%26%2310003%3B&" : d += "utf8=%E2%9C%93&"),
        0 < l.length ? d + l : ""
    }
    );
    Se.create({
        baseURL: iotos_host + "/",
        timeout: 2e4,
        paramsSerializer: function(e) {
            return Ie(e, {
                indices: !1
            })
        }
    }).interceptors.response.use(function(e) {
        e.config;
        return e.data
    }, function(e) {
        return console.warn("http response error:", e),
        e.response ? 401 === e.response.status || (403 === e.response.status ? ht.Default.errorMessage("您没有权限执行该操作", "错误", "top", 320, 4e3) : ht.Default.errorMessage("Error: http" + e.response.status, i18n.t("错误"), "topRight", 320, 4e3)) : e.request || Se.isCancel(e),
        Promise.reject(e)
    });
    function Ve() {
        window.appNotifier = new ht.Notifier,
        window.app = new Ge
    }
    var He = function() {
        function e() {
            o(this, e)
        }
        return u(e, [{
            key: "init",
            value: function(e) {
                var t = 0 < arguments.length && void 0 !== e ? e : null
                  , n = this;
                if (this.cb = null == t ? this.callback : t,
                window.sessionStorage.obj) {
                    console.warn("浏览器存储数据");
                    var a = JSON.parse(window.sessionStorage.obj);
                    console.log("本地初始化完毕，启动连接..."),
                    saveBindingsInfo(a),
                    setTimeout(this.connectIotos(a), 100)
                } else {
                    console.warn("未缓存数据点表 " + window.sessionStorage.obj);
                    var r = this.getParam("random_str");
                    console.warn("ajax请求数据" + r),
                    "" == r || null == r ? console.error("缺少用户信息！") : function(t) {
                        (t = t || {}).type = (t.type || "GET").toUpperCase(),
                        t.dataType = t.dataType || "json";
                        var e = l(t.data);
                        if (window.XMLHttpRequest)
                            var n = new XMLHttpRequest;
                        else
                            n = new ActiveXObject("Microsoft.XMLHTTP");
                        "GET" == t.type ? (n.open("GET", t.url + "?" + e, !0),
                        n.send(null)) : "POST" == t.type && (n.open("POST", t.url, !0),
                        n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                        n.send(e)),
                        n.onreadystatechange = function() {
                            if (4 == n.readyState) {
                                var e = n.status;
                                200 <= e && e < 300 ? t.success && t.success(n.responseText) : t.fail && t.fail(e)
                            }
                        }
                    }({
                        url: iotos_host + "/backstage/query_scada_auth/?random_str=" + r,
                        type: "GET",
                        data: {},
                        dataType: "json",
                        success: function(e) {
                            if ((e = JSON.parse(e)).success) {
                                var t = e.data;
                                saveBindingsInfo(t),
                                console.log("云端初始化完毕，启动连接..."),
                                setTimeout(n.connectIotos(t), 100)
                            } else
                                alert(e.msg)
                        },
                        fail: function(e) {
                            alert("登录错误：" + e)
                        }
                    })
                }
            }
        }, {
            key: "callback",
            value: function(e, t) {
                window.appNotifier.fire({
                    kind: "callback",
                    para: {
                        type: e,
                        data: t
                    }
                })
            }
        }, {
            key: "connectIotos",
            value: function(e) {
                var t = []
                  , n = [];
                for (var a in e) {
                    var r = e[a];
                    for (var i in r.properties) {
                        n.push(i.toString());
                        var o = r.properties[i].data;
                        for (var s in o)
                            t.push(s.toString());
                        h(this.cb, n, t),
                        t = [],
                        n = []
                    }
                }
                console.log("通信节点请求完毕！")
            }
        }, {
            key: "getParam",
            value: function(e) {
                var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)")
                  , n = window.location.search.substr(1).match(t);
                return null != n ? decodeURIComponent(n[2]) : null
            }
        }]),
        e
    }()
      , Ue = window.app_config
      , _e = (Ue.getAlarmTableData,
    Ue.getCheckPointTableData,
    Ue.getRandomTemp)
      , qe = Ue.boardInfo
      , Ye = Ue.refreshedRanklist
      , We = ht.Math.Vector3
      , Ge = function() {
        function t() {
            var g = this;
            o(this, t);
            var a = this;
            this.eyeDirection = 0,
            this.animPause = !1,
            this.animFlatObj = null,
            this.animStatusObj = null,
            this.animFlatPauseTimeout = null,
            this.pointsHeatMapData = [],
            this.heatmap = null,
            this.startPos = null,
            this.endPos = null,
            this.initCenterYCoord = 0,
            this.g2d = null,
            this.g3d = null,
            this.updateTransFlatAnimPos = function() {
                var e = g.dm3d.getDataByTag("transFlat");
                if (e) {
                    var t = new We(e.p3());
                    0 == g.initCenterYCoord && (g.initCenterYCoord = t.y);
                    var n = new We([t.x, g.initCenterYCoord + 100, t.z])
                      , a = new We([t.x, g.initCenterYCoord - 100, t.z]);
                    g.startPos = n.clone(),
                    g.endPos = a.clone()
                }
            }
            ;
            var r = new He
              , i = this.screen = new c;
            i.init3dScreen(),
            i.init2dScreen({
                downListener: function(e, t) {
                    e.getDataAt(t) && t.stopPropagation()
                }
            }, function(e, t) {
                g.g2d = e
            });
            var e = r.getParam("tag") || "previews/display.json";
            i.load2dScreen(e, null, function(e, t) {
                s(t),
                g.update2dChart(),
                i.add2dMiEvent(g.mi2dEvent, g),
                r.init(),
                updateDateTimeNode(t),
                fanFlowAnim(t);
                var n = a.has3dScene = t.getDataByTag("temp_url3d");
                n && i.load3dScreen(n.s("text"), null, function(e, t) {
                    g.g3d = e,
                    i.add3dMiEvent(g.mi3dEvent, g),
                    window.appNotifier.fire({
                        kind: "loadHeatFloor",
                        para: {
                            heatNodeNumber: 2
                        }
                    }),
                    g.initContexMenu(),
                    updateDateTimeNode(t),
                    fanFlowAnim(t)
                })
            }),
            n(this, {
                g2d: i.g2d,
                g3d: i.g3d,
                dm2d: i.dm2d,
                dm3d: i.dm3d
            }),
            window.appNotifier.add(function(e) {
                var t = e.kind
                  , n = e.para
                  , a = g.g3d
                  , s = g.dm2d
                  , r = g.dm3d;
                if ("loadHeatFloor" === t) {
                    var u = !1
                      , i = {};
                    i = {
                        frames: 300,
                        interval: 5,
                        easing: Easing.easeNone,
                        finishFunc: function() {
                            if (u = !u,
                            g.startPos) {
                                var e = g.startPos.clone();
                                g.startPos = g.endPos.clone(),
                                g.endPos = e.clone(),
                                i.frames = u ? 50 : 300,
                                g.animFlatObj = ht.Default.startAnim(i)
                            }
                        },
                        action: function(e) {
                            var t = g.dm3d.getDataByTag("transFlat");
                            t && t.p3((new We).lerpVectors(g.startPos, g.endPos, e).toArray());
                            var n = s.getDataByTag("floorRuler")
                              , a = s.getDataByTag("animButton");
                            if (n) {
                                var r = n.a("ht.max")
                                  , i = n.a("ht.cursors")[0];
                                if (i.value = u ? r * (1 - e) : r * e,
                                n.iv(),
                                u)
                                    return;
                                if (a.a("start", !0),
                                i.value % .5 <= .01) {
                                    var o = !1;
                                    if (g.pointsHeatMapData.forEach(function(e) {
                                        var t = Math.abs(i.value - e.deep) <= .25;
                                        t && (o = !0),
                                        e.obj.s("2d.visible", t),
                                        e.obj.s("3d.visible", t),
                                        e.visible = t,
                                        e.obj.iv()
                                    }),
                                    o) {
                                        g.refreshHeatMap(),
                                        g.animFlatObj.pause(),
                                        a.a("start", !1);
                                        g.animStatusObj = ht.Default.startAnim({
                                            duration: 1e3,
                                            easing: Easing.easeNone,
                                            finishFunc: function() {
                                                a.a("per", 0)
                                            },
                                            action: function(e) {
                                                a.a("per", 100 * e)
                                            }
                                        }),
                                        g.animFlatPauseTimeout = setTimeout(function() {
                                            g.animFlatObj.resume(),
                                            g.animStatusObj.stop(!0)
                                        }, 1e3)
                                    }
                                }
                            }
                        }
                    },
                    g.updateTransFlatAnimPos(),
                    g.animFlatObj = ht.Default.startAnim(i);
                    for (var o = n.heatNodeNumber, c = r.getDatas().toArray(), l = c.length - 1; 0 <= l; l--) {
                        var d = c[l];
                        void 0 !== d.a("index") && r.remove(d)
                    }
                    r.a("animateNumber", 0),
                    g.heatNodeNumber = o;
                    !function(e) {
                        var a = e.getDataByTag("heatFlat");
                        if (a) {
                            var t = a.s3()[0]
                              , n = a.s3()[2]
                              , r = [a.p3()[0] - t / 2, a.p3()[1], a.p3()[2] - n / 2];
                            e.each(function(e) {
                                var t = e[ht.Default.getter("toolTip")]();
                                if (null != t) {
                                    var n = e[ht.Default.getter("tag")]();
                                    g.pointsHeatMapData.push({
                                        x: e.p3()[0] - r[0],
                                        y: e.p3()[2] - r[2],
                                        value: 0,
                                        p1: [e.p3()[0], e.p3()[2]],
                                        p0: [a.p3()[0], a.p3()[2]],
                                        id: n,
                                        obj: e,
                                        deep: t,
                                        visible: !1
                                    })
                                }
                            })
                        }
                    }(r)
                }
                if ("showCurrentFloor" === t) {
                    var f = n.floorNum
                      , h = r.getDataByTag("currentMax");
                    h && (h.a("maxTemp", _e()),
                    a.invalidateCachedTexture(h)),
                    function(e, t, n) {
                        if (0 === e.a("animateNumber") || void 0 === e.a("animateNumber")) {
                            e.a("animateNumber", t),
                            void 0 === n && (n = t % 2 == 0 ? t / 2 : Math.ceil(t / 2));
                            for (var a = n, r = t - a, i = new L(O), o = new L([O.x, O.y - 300 * (a - 1), O.z]), s = new L([O.x, O.y + 200, O.z - 800]), u = new L([s.x, s.y + 100 * r, s.z - 100 * (r - 1)]), c = 1; c <= a; c++) {
                                var l = e.getDataByTag("floor" + c);
                                l = l || x(e, c);
                                var d = void 0;
                                d = 1 === a ? new L(O) : (new L).lerpVectors(i, o, (a - c) / (a - 1)),
                                M(e, l, d)
                            }
                            for (var f = a + 1; f < a + 1 + r; f++) {
                                var h = e.getDataByTag("floor" + f);
                                h = h || x(e, f);
                                var p = void 0;
                                if (1 == r)
                                    p = s.clone();
                                else if (0 == r)
                                    p = i.clone();
                                else {
                                    var m = f - a - 1;
                                    p = (new L).lerpVectors(s, u, m / (r - 1))
                                }
                                M(e, h, p)
                            }
                            e.a("middleNumber", n)
                        }
                    }(r, g.heatNodeNumber, f);
                    var p = s.getDataByTag("floorRuler");
                    if (p)
                        p.a("ht.cursors")[0].value = g.heatNodeNumber - f,
                        p.iv()
                }
                if ("callback" === t) {
                    var m = n.type
                      , v = n.data;
                    g.callback(m, v)
                }
            })
        }
        return u(t, [{
            key: "initContexMenu",
            value: function() {
                var e = this.g2d
                  , a = this.g3d
                  , t = e.getView()
                  , n = t.style;
                n.top = "0",
                n.right = "0",
                n.bottom = "0",
                n.left = "0";
                var r = [{
                    label: "隐藏文字",
                    action: function(e) {
                        var t = "隐藏文字" == e.label;
                        r[0].label = t ? "显示文字" : "隐藏文字",
                        a.dm().getDataByTag("heatFlat").getChildren().forEach(function(e) {
                            e.s("2d.visible", !t),
                            e.s("3d.visible", !t)
                        });
                        var n = a.dm().getDataByTag("board");
                        n.s("2d.visible", !t),
                        n.s("3d.visible", !t)
                    },
                    type: "check"
                }, "separator", {
                    label: "平铺展示",
                    action: function() {
                        layer.alert("暂无权限")
                    }
                }]
                  , i = new ht.widget.ContextMenu;
                i.enableGlobalKey(),
                i.beforeShow = function(e) {
                    a.getDataAt(e) === a.dm().getDataByTag("hill") ? this.setItems(r) : this.setItems(null)
                }
                ,
                i.addTo(t)
            }
        }, {
            key: "mi2dEvent",
            value: function(e) {
                e.kind,
                e.data,
                this.dm2d,
                this.dm3d,
                this.g2d
            }
        }, {
            key: "refreshHeatMap",
            value: function() {
                var e = this.dm3d.getDataByTag("heatFlat")
                  , t = [];
                this.pointsHeatMapData.forEach(function(e) {
                    e.visible && t.push(e)
                });
                var n = e.s3()[0]
                  , a = e.s3()[2];
                this.heatmap = h337.create({
                    width: n,
                    height: a
                }),
                this.heatmap._renderer.canvas.dynamic = !0,
                this.heatmap.setData({
                    data: t,
                    min: window.app_config.heatMapMinValue,
                    max: window.app_config.heatMapMaxValue
                }),
                ht.Default.setImage("heatmaptemp", this.heatmap._renderer.canvas),
                e.s("shape3d.image") || (e.s({
                    "shape3d.image": "heatmaptemp"
                }),
                e.iv())
            }
        }, {
            key: "mi3dEvent",
            value: function(e) {
                var t = e.kind
                  , n = e.event
                  , a = (e.data,
                this.g3d)
                  , r = this.dm2d
                  , i = this.dm3d;
                if ("clickData" !== t)
                    if ("doubleClickBackground" === t) {
                        console.warn(a.getEye()),
                        this.eyeDirection += 1,
                        4 <= this.eyeDirection && (this.eyeDirection = 0);
                        var o = [1496.425336560711, 357.2179784203567, -16.15216181409273];
                        o = [17060.39528656993, 7669.960444061761, -1904.4668097423883],
                        0 == this.eyeDirection || (1 == this.eyeDirection ? (o = [-1686539742889976e-21, -1765.8478728375815, .0017658470679043094],
                        o = [16286.593734228114, 895.6995618193467, 4331.472679581656]) : 2 == this.eyeDirection ? (o = [-99.92237590285909, -1.3958425464849513, 1647.0164548437617],
                        o = [8276.419171828238, 13353.945231331572, 9778.763369742872]) : 3 == this.eyeDirection && (o = [4177369830152951e-21, 1803.9746947302654, .0018039698580659895],
                        o = [-2725.1575087432707, 1024.70384500313, -3565.20612962654]));
                        var s = i.getDataByTag("group");
                        ht.Default.startAnim({
                            duration: 2e3,
                            easing: Easing.swing,
                            finishFunc: function() {},
                            action: function(e) {
                                a.setEye((new We).lerpVectors(new We(a.getEye()), new We(o), e).toArray()),
                                s && s.p3([0, i.getDataByTag("group").p3()[1], 0])
                            }
                        })
                    } else if ("clickBackground" === t) {
                        this.hideHistoryForm();
                        var u = i.getDataByTag("group");
                        if (u && (0 == n.button ? (this.animPause = !0,
                        u.s("3d.selectable", !0),
                        u.s("2d.selectable", !0)) : (this.animPause = !1,
                        u.s("3d.selectable", !1),
                        u.s("2d.selectable", !1)),
                        null != this.animFlatObj)) {
                            var c = r.getDataByTag("animButton");
                            c && c.a("start", !this.animPause),
                            this.animPause ? (clearTimeout(this.animFlatPauseTimeout),
                            this.animFlatObj.pause(),
                            this.animStatusObj.pause()) : (this.updateTransFlatAnimPos(),
                            this.animFlatObj.resume(),
                            this.animStatusObj.resume())
                        }
                    }
            }
        }, {
            key: "hideHistoryForm",
            value: function() {}
        }, {
            key: "wheelListener",
            value: function() {
                this.g2d,
                this.g3d,
                this.dm3d
            }
        }, {
            key: "update2dChart",
            value: function() {
                var e = this.dm2d
                  , t = e.getDataByTag("airChangeLine")
                  , n = e.getDataByTag("tempChangeLine");
                e.getDataByTag("checkPointTable");
                t && T.initLineChartData(t, hours24()),
                n && T.initLineChartData(n, hours24());
                var a = e.getDataByTag("alarmTable")
                  , r = e.getDataByTag("tempRankTable");
                a && a.a("ht.dataSource", []),
                r && r.a("ht.dataSource", [])
            }
        }, {
            key: "rankAdd",
            value: function(e) {
                var t = e.name
                  , n = e.value
                  , a = e.node;
                if (null != a) {
                    this.dm2d;
                    var r = this.dm3d;
                    if (null != r.getDataByTag(t)) {
                        window.app_config.heatRankObject[t] = {
                            temperature: n + " ℃",
                            depth: r.getDataByTag(t)[ht.Default.getter("toolTip")](),
                            number: t,
                            northLatitude: "---",
                            eastLongitude: "---"
                        };
                        var i = Ye();
                        i.length && (a.a("ht.dataSource", []),
                        r.getDataByTag("board").a("highest", i[0].temperature.split(" ℃")[0]),
                        f({
                            table: a,
                            addDatas: i
                        }))
                    } else
                        console.warn(t + " 非温度数据")
                }
            }
        }, {
            key: "infoAdd",
            value: function(e) {
                var t = e.node
                  , n = e.type
                  , a = e.data
                  , r = e.info
                  , i = void 0 === r ? "" : r
                  , o = (this.dm2d,
                this.dm3d);
                if ("" == i)
                    if (n != g)
                        i = a;
                    else {
                        var s = a.name
                          , u = a.val
                          , c = "";
                        null != o.getDataByTag(a.name) && (c = o.getDataByTag(a.name).a("unit")),
                        i = s + " 当前值上报，" + u + " " + c
                    }
                var l = new Date
                  , d = [];
                d.push({
                    info: i,
                    time: l.format("hh:mm:ss")
                }),
                f({
                    table: t,
                    addDatas: d
                })
            }
        }, {
            key: "updateValue",
            value: function(e) {
                function t(t) {
                    function e(e) {
                        "a" == c || "s" == c ? u[c](t, e) : "p" == c ? T.pset(u, t, e) : console.assert(0)
                    }
                    var n = l[t];
                    if (o != g)
                        return "iotos.status" == n.id && e(s),
                        console.log(s),
                        "continue";
                    var a = s;
                    n.func && (a = n.func(a));
                    var r = s.dev_info.split("——")[0] + "." + s.name
                      , i = s.dev_info.split("——")[1] + "." + s.data_id;
                    r == n.id || i == n.id ? e(a) : "iotos.log" == n.id && e(JSON.stringify(s, void 0, 2))
                }
                var o = e.type
                  , s = e.data
                  , u = e.dataItem
                  , n = e.dataBindings
                  , c = e.bindType
                  , l = n[c];
                for (var a in l)
                    t(a)
            }
        }, {
            key: "callback",
            value: function(a, r) {
                var n = this
                  , e = this.dm2d
                  , i = this.dm3d
                  , o = this;
                if (e.each(function(t) {
                    var n = t.getDataBindings();
                    if (n) {
                        var e = function(e) {
                            o.updateValue({
                                type: a,
                                data: r,
                                dataItem: t,
                                dataBindings: n,
                                bindType: e
                            })
                        };
                        e("a"),
                        e("s"),
                        e("p")
                    }
                }),
                this.infoAdd({
                    node: e.getDataByTag("alarmTable"),
                    type: a,
                    data: r
                }),
                a == g) {
                    var s = 0;
                    this.pointsHeatMapData.forEach(function(e) {
                        if (e.id == r.name) {
                            var t = Number(r.val);
                            return -50 != t ? (n.pointsHeatMapData[s].value = t,
                            i.getDataByTag(r.name).a("unit", r.unit)) : (t = "  掉线！",
                            i.getDataByTag(r.name).a("textcolor", "yellow"),
                            i.getDataByTag(r.name).a("unit", "")),
                            void i.getDataByTag(r.name).a("num", String(t))
                        }
                        s += 1
                    }),
                    o.has3dScene && qe({
                        name: r.name,
                        value: r.val,
                        dm2d: e,
                        dm3d: i
                    }),
                    this.rankAdd({
                        name: r.name,
                        value: r.val,
                        node: e.getDataByTag("tempRankTable")
                    })
                }
            }
        }]),
        t
    }();
    "complete" === document.readyState || "loading" !== document.readyState ? Ve() : document.addEventListener("DOMContentLoaded", Ve)
}();