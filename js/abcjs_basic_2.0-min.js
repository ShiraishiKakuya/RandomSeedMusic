(function(i) {
    var e = "0.4.2",
        j = "hasOwnProperty",
        b = /[\.\/]/,
        a = "*",
        g = function() {},
        f = function(m, l) {
            return m - l
        },
        d, h, k = {
            n: {}
        },
        c = function(m, C) {
            m = String(m);
            var v = k,
                s = h,
                w = Array.prototype.slice.call(arguments, 2),
                y = c.listeners(m),
                x = 0,
                u = false,
                p, o = [],
                t = {},
                q = [],
                n = d,
                A = [];
            d = m;
            h = 0;
            for (var r = 0, B = y.length; r < B; r++) {
                if ("zIndex" in y[r]) {
                    o.push(y[r].zIndex);
                    if (y[r].zIndex < 0) {
                        t[y[r].zIndex] = y[r]
                    }
                }
            }
            o.sort(f);
            while (o[x] < 0) {
                p = t[o[x++]];
                q.push(p.apply(C, w));
                if (h) {
                    h = s;
                    return q
                }
            }
            for (r = 0; r < B; r++) {
                p = y[r];
                if ("zIndex" in p) {
                    if (p.zIndex == o[x]) {
                        q.push(p.apply(C, w));
                        if (h) {
                            break
                        }
                        do {
                            x++;
                            p = t[o[x]];
                            p && q.push(p.apply(C, w));
                            if (h) {
                                break
                            }
                        } while (p)
                    } else {
                        t[p.zIndex] = p
                    }
                } else {
                    q.push(p.apply(C, w));
                    if (h) {
                        break
                    }
                }
            }
            h = s;
            d = n;
            return q.length ? q : null
        };
    c._events = k;
    c.listeners = function(l) {
        var t = l.split(b),
            r = k,
            x, s, m, p, w, o, q, u, v = [r],
            n = [];
        for (p = 0, w = t.length; p < w; p++) {
            u = [];
            for (o = 0, q = v.length; o < q; o++) {
                r = v[o].n;
                s = [r[t[p]], r[a]];
                m = 2;
                while (m--) {
                    x = s[m];
                    if (x) {
                        u.push(x);
                        n = n.concat(x.f || [])
                    }
                }
            }
            v = u
        }
        return n
    };
    c.on = function(l, o) {
        l = String(l);
        if (typeof o != "function") {
            return function() {}
        }
        var q = l.split(b),
            p = k;
        for (var m = 0, n = q.length; m < n; m++) {
            p = p.n;
            p = p.hasOwnProperty(q[m]) && p[q[m]] || (p[q[m]] = {
                n: {}
            })
        }
        p.f = p.f || [];
        for (m = 0, n = p.f.length; m < n; m++) {
            if (p.f[m] == o) {
                return g
            }
        }
        p.f.push(o);
        return function(r) {
            if (+r == +r) {
                o.zIndex = +r
            }
        }
    };
    c.f = function(m) {
        var l = [].slice.call(arguments, 1);
        return function() {
            c.apply(null, [m, null].concat(l).concat([].slice.call(arguments, 0)))
        }
    };
    c.stop = function() {
        h = 1
    };
    c.nt = function(l) {
        if (l) {
            return new RegExp("(?:\\.|\\/|^)" + l + "(?:\\.|\\/|$)").test(d)
        }
        return d
    };
    c.nts = function() {
        return d.split(b)
    };
    c.off = c.unbind = function(m, r) {
        if (!m) {
            c._events = k = {
                n: {}
            };
            return
        }
        var t = m.split(b),
            s, v, n, p, w, o, q, u = [k];
        for (p = 0, w = t.length; p < w; p++) {
            for (o = 0; o < u.length; o += n.length - 2) {
                n = [o, 1];
                s = u[o].n;
                if (t[p] != a) {
                    if (s[t[p]]) {
                        n.push(s[t[p]])
                    }
                } else {
                    for (v in s) {
                        if (s[j](v)) {
                            n.push(s[v])
                        }
                    }
                }
                u.splice.apply(u, n)
            }
        }
        for (p = 0, w = u.length; p < w; p++) {
            s = u[p];
            while (s.n) {
                if (r) {
                    if (s.f) {
                        for (o = 0, q = s.f.length; o < q; o++) {
                            if (s.f[o] == r) {
                                s.f.splice(o, 1);
                                break
                            }
                        }!s.f.length && delete s.f
                    }
                    for (v in s.n) {
                        if (s.n[j](v) && s.n[v].f) {
                            var l = s.n[v].f;
                            for (o = 0, q = l.length; o < q; o++) {
                                if (l[o] == r) {
                                    l.splice(o, 1);
                                    break
                                }
                            }!l.length && delete s.n[v].f
                        }
                    }
                } else {
                    delete s.f;
                    for (v in s.n) {
                        if (s.n[j](v) && s.n[v].f) {
                            delete s.n[v].f
                        }
                    }
                }
                s = s.n
            }
        }
    };
    c.once = function(l, m) {
        var n = function() {
            c.unbind(l, n);
            return m.apply(this, arguments)
        };
        return c.on(l, n)
    };
    c.version = e;
    c.toString = function() {
        return "You are running Eve " + e
    };
    (typeof module != "undefined" && module.exports) ? (module.exports = c) : (typeof define != "undefined" ? (define("eve", [], function() {
        return c
    })) : (i.eve = c))
})(this);
(function(b, a) {
    if (typeof define === "function" && define.amd) {
        define(["eve"], function(c) {
            return a(b, c)
        })
    } else {
        a(b, b.eve)
    }
}(this, function(aT, bc) {
    function bi(g) {
        if (bi.is(g, "function")) {
            return K ? g() : bc.on("raphael.DOMload", g)
        } else {
            if (bi.is(g, u)) {
                return bi._engine.create[bs](bi, g.splice(0, 3 + bi.is(g[0], bj))).add(g)
            } else {
                var b = Array.prototype.slice.call(arguments, 0);
                if (bi.is(b[b.length - 1], "function")) {
                    var d = b.pop();
                    return K ? d.call(bi._engine.create[bs](bi, b)) : bc.on("raphael.DOMload", function() {
                        d.call(bi._engine.create[bs](bi, b))
                    })
                } else {
                    return bi._engine.create[bs](bi, arguments)
                }
            }
        }
    }
    bi.version = "2.1.2";
    bi.eve = bc;
    var K, bv = /[, ]+/,
        au = {
            circle: 1,
            rect: 1,
            path: 1,
            ellipse: 1,
            text: 1,
            image: 1
        },
        W = /\{(\d+)\}/g,
        bz = "prototype",
        bw = "hasOwnProperty",
        a5 = {
            doc: document,
            win: aT
        },
        aE = {
            was: Object.prototype[bw].call(a5.win, "Raphael"),
            is: a5.win.Raphael
        },
        bJ = function() {
            this.ca = this.customAttributes = {}
        },
        ao, bA = "appendChild",
        bs = "apply",
        av = "concat",
        O = ("ontouchstart" in a5.win) || a5.win.DocumentTouch && a5.doc instanceof DocumentTouch,
        bn = "",
        bh = " ",
        k = String,
        l = "split",
        bB = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel" [l](bh),
        bp = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
        },
        aj = k.prototype.toLowerCase,
        aI = Math,
        bI = aI.max,
        ai = aI.min,
        ak = aI.abs,
        aS = aI.pow,
        ag = aI.PI,
        bj = "number",
        a = "string",
        u = "array",
        s = "toString",
        A = "fill",
        aM = Object.prototype.toString,
        bC = {},
        r = "push",
        aa = bi._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i,
        Z = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
        B = {
            "NaN": 1,
            "Infinity": 1,
            "-Infinity": 1
        },
        an = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
        C = aI.round,
        P = "setAttribute",
        bM = parseFloat,
        bK = parseInt,
        aU = k.prototype.toUpperCase,
        bq = bi._availableAttrs = {
            "arrow-end": "none",
            "arrow-start": "none",
            blur: 0,
            "clip-rect": "0 0 1e9 1e9",
            cursor: "default",
            cx: 0,
            cy: 0,
            fill: "#fff",
            "fill-opacity": 1,
            font: '10px "Arial"',
            "font-family": '"Arial"',
            "font-size": "10",
            "font-style": "normal",
            "font-weight": 400,
            gradient: 0,
            height: 0,
            href: "http://raphaeljs.com/",
            "letter-spacing": 0,
            opacity: 1,
            path: "M0,0",
            r: 0,
            rx: 0,
            ry: 0,
            src: "",
            stroke: "#000",
            "stroke-dasharray": "",
            "stroke-linecap": "butt",
            "stroke-linejoin": "butt",
            "stroke-miterlimit": 0,
            "stroke-opacity": 1,
            "stroke-width": 1,
            target: "_blank",
            "text-anchor": "middle",
            title: "Raphael",
            transform: "",
            width: 0,
            x: 0,
            y: 0
        },
        bo = bi._availableAnimAttrs = {
            blur: bj,
            "clip-rect": "csv",
            cx: bj,
            cy: bj,
            fill: "colour",
            "fill-opacity": bj,
            "font-size": bj,
            height: bj,
            opacity: bj,
            path: "path",
            r: bj,
            rx: bj,
            ry: bj,
            stroke: "colour",
            "stroke-opacity": bj,
            "stroke-width": bj,
            transform: "transform",
            width: bj,
            x: bj,
            y: bj
        },
        bt = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,
        bf = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
        ax = {
            hs: 1,
            rg: 1
        },
        aN = /,?([achlmqrstvxz]),?/gi,
        bg = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        ac = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        ap = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig,
        a2 = bi._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,
        M = {},
        x = function(g, d) {
            return g.key - d.key
        },
        bu = function(g, d) {
            return bM(g) - bM(d)
        },
        ad = function() {},
        aw = function(b) {
            return b
        },
        q = bi._rectPath = function(b, E, d, g, i) {
            if (i) {
                return [
                    ["M", b + i, E],
                    ["l", d - i * 2, 0],
                    ["a", i, i, 0, 0, 1, i, i],
                    ["l", 0, g - i * 2],
                    ["a", i, i, 0, 0, 1, -i, i],
                    ["l", i * 2 - d, 0],
                    ["a", i, i, 0, 0, 1, -i, -i],
                    ["l", 0, i * 2 - g],
                    ["a", i, i, 0, 0, 1, i, -i],
                    ["z"]
                ]
            }
            return [
                ["M", b, E],
                ["l", d, 0],
                ["l", 0, g],
                ["l", -d, 0],
                ["z"]
            ]
        },
        U = function(b, i, g, d) {
            if (d == null) {
                d = g
            }
            return [
                ["M", b, i],
                ["m", 0, -d],
                ["a", g, d, 0, 1, 1, 0, 2 * d],
                ["a", g, d, 0, 1, 1, 0, -2 * d],
                ["z"]
            ]
        },
        af = bi._getPath = {
            path: function(b) {
                return b.attr("path")
            },
            circle: function(d) {
                var b = d.attrs;
                return U(b.cx, b.cy, b.r)
            },
            ellipse: function(d) {
                var b = d.attrs;
                return U(b.cx, b.cy, b.rx, b.ry)
            },
            rect: function(d) {
                var b = d.attrs;
                return q(b.x, b.y, b.width, b.height, b.r)
            },
            image: function(d) {
                var b = d.attrs;
                return q(b.x, b.y, b.width, b.height)
            },
            text: function(b) {
                var d = b._getBBox();
                return q(d.x, d.y, d.width, d.height)
            },
            set: function(b) {
                var d = b._getBBox();
                return q(d.x, d.y, d.width, d.height)
            }
        },
        Q = bi.mapPath = function(bQ, S) {
            if (!S) {
                return bQ
            }
            var bO, R, g, b, bP, E, d;
            bQ = bk(bQ);
            for (g = 0, bP = bQ.length; g < bP; g++) {
                d = bQ[g];
                for (b = 1, E = d.length; b < E; b += 2) {
                    bO = S.x(d[b], d[b + 1]);
                    R = S.y(d[b], d[b + 1]);
                    d[b] = bO;
                    d[b + 1] = R
                }
            }
            return bQ
        };
    bi._g = a5;
    bi.type = (a5.win.SVGAngle || a5.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");
    if (bi.type == "VML") {
        var a7 = a5.doc.createElement("div"),
            a8;
        a7.innerHTML = '<v:shape adj="1"/>';
        a8 = a7.firstChild;
        a8.style.behavior = "url(#default#VML)";
        if (!(a8 && typeof a8.adj == "object")) {
            return (bi.type = bn)
        }
        a7 = null
    }
    bi.svg = !(bi.vml = bi.type == "VML");
    bi._Paper = bJ;
    bi.fn = ao = bJ.prototype = bi.prototype;
    bi._id = 0;
    bi._oid = 0;
    bi.is = function(d, b) {
        b = aj.call(b);
        if (b == "finite") {
            return !B[bw](+d)
        }
        if (b == "array") {
            return d instanceof Array
        }
        return (b == "null" && d === null) || (b == typeof d && d !== null) || (b == "object" && d === Object(d)) || (b == "array" && Array.isArray && Array.isArray(d)) || aM.call(d).slice(8, -1).toLowerCase() == b
    };

    function bl(g) {
        if (typeof g == "function" || Object(g) !== g) {
            return g
        }
        var d = new g.constructor;
        for (var b in g) {
            if (g[bw](b)) {
                d[b] = bl(g[b])
            }
        }
        return d
    }
    bi.angle = function(E, S, g, R, d, i) {
        if (d == null) {
            var b = E - g,
                bO = S - R;
            if (!b && !bO) {
                return 0
            }
            return (180 + aI.atan2(-bO, -b) * 180 / ag + 360) % 360
        } else {
            return bi.angle(E, S, d, i) - bi.angle(g, R, d, i)
        }
    };
    bi.rad = function(b) {
        return b % 360 * ag / 180
    };
    bi.deg = function(b) {
        return b * 180 / ag % 360
    };
    bi.snapTo = function(d, E, b) {
        b = bi.is(b, "finite") ? b : 10;
        if (bi.is(d, u)) {
            var g = d.length;
            while (g--) {
                if (ak(d[g] - E) <= b) {
                    return d[g]
                }
            }
        } else {
            d = +d;
            var R = E % d;
            if (R < b) {
                return E - R
            }
            if (R > d - b) {
                return E - R + d
            }
        }
        return E
    };
    var aQ = bi.createUUID = (function(b, d) {
        return function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(b, d).toUpperCase()
        }
    })(/[xy]/g, function(g) {
        var d = aI.random() * 16 | 0,
            b = g == "x" ? d : (d & 3 | 8);
        return b.toString(16)
    });
    bi.setWindow = function(b) {
        bc("raphael.setWindow", bi, a5.win, b);
        a5.win = b;
        a5.doc = a5.win.document;
        if (bi._engine.initWin) {
            bi._engine.initWin(a5.win)
        }
    };
    var J = function(g) {
            if (bi.vml) {
                var b = /^\s+|\s+$/g;
                var R;
                try {
                    var S = new ActiveXObject("htmlfile");
                    S.write("<body>");
                    S.close();
                    R = S.body
                } catch (bO) {
                    R = createPopup().document.body
                }
                var d = R.createTextRange();
                J = H(function(i) {
                    try {
                        R.style.color = k(i).replace(b, bn);
                        var bP = d.queryCommandValue("ForeColor");
                        bP = ((bP & 255) << 16) | (bP & 65280) | ((bP & 16711680) >>> 16);
                        return "#" + ("000000" + bP.toString(16)).slice(-6)
                    } catch (bQ) {
                        return "none"
                    }
                })
            } else {
                var E = a5.doc.createElement("i");
                E.title = "Rapha\xebl Colour Picker";
                E.style.display = "none";
                a5.doc.body.appendChild(E);
                J = H(function(i) {
                    E.style.color = i;
                    return a5.doc.defaultView.getComputedStyle(E, bn).getPropertyValue("color")
                })
            }
            return J(g)
        },
        az = function() {
            return "hsb(" + [this.h, this.s, this.b] + ")"
        },
        bm = function() {
            return "hsl(" + [this.h, this.s, this.l] + ")"
        },
        w = function() {
            return this.hex
        },
        G = function(R, E, d) {
            if (E == null && bi.is(R, "object") && "r" in R && "g" in R && "b" in R) {
                d = R.b;
                E = R.g;
                R = R.r
            }
            if (E == null && bi.is(R, a)) {
                var i = bi.getRGB(R);
                R = i.r;
                E = i.g;
                d = i.b
            }
            if (R > 1 || E > 1 || d > 1) {
                R /= 255;
                E /= 255;
                d /= 255
            }
            return [R, E, d]
        },
        N = function(R, E, d, S) {
            R *= 255;
            E *= 255;
            d *= 255;
            var i = {
                r: R,
                g: E,
                b: d,
                hex: bi.rgb(R, E, d),
                toString: w
            };
            bi.is(S, "finite") && (i.opacity = S);
            return i
        };
    bi.color = function(b) {
        var d;
        if (bi.is(b, "object") && "h" in b && "s" in b && "b" in b) {
            d = bi.hsb2rgb(b);
            b.r = d.r;
            b.g = d.g;
            b.b = d.b;
            b.hex = d.hex
        } else {
            if (bi.is(b, "object") && "h" in b && "s" in b && "l" in b) {
                d = bi.hsl2rgb(b);
                b.r = d.r;
                b.g = d.g;
                b.b = d.b;
                b.hex = d.hex
            } else {
                if (bi.is(b, "string")) {
                    b = bi.getRGB(b)
                }
                if (bi.is(b, "object") && "r" in b && "g" in b && "b" in b) {
                    d = bi.rgb2hsl(b);
                    b.h = d.h;
                    b.s = d.s;
                    b.l = d.l;
                    d = bi.rgb2hsb(b);
                    b.v = d.b
                } else {
                    b = {
                        hex: "none"
                    };
                    b.r = b.g = b.b = b.h = b.s = b.v = b.l = -1
                }
            }
        }
        b.toString = w;
        return b
    };
    bi.hsb2rgb = function(S, bQ, bO, i) {
        if (this.is(S, "object") && "h" in S && "s" in S && "b" in S) {
            bO = S.b;
            bQ = S.s;
            S = S.h;
            i = S.o
        }
        S *= 360;
        var E, bP, d, g, b;
        S = (S % 360) / 60;
        b = bO * bQ;
        g = b * (1 - ak(S % 2 - 1));
        E = bP = d = bO - b;
        S = ~~S;
        E += [b, g, 0, 0, g, b][S];
        bP += [g, b, b, g, 0, 0][S];
        d += [0, 0, g, b, b, g][S];
        return N(E, bP, d, i)
    };
    bi.hsl2rgb = function(bO, bQ, E, i) {
        if (this.is(bO, "object") && "h" in bO && "s" in bO && "l" in bO) {
            E = bO.l;
            bQ = bO.s;
            bO = bO.h
        }
        if (bO > 1 || bQ > 1 || E > 1) {
            bO /= 360;
            bQ /= 100;
            E /= 100
        }
        bO *= 360;
        var S, bP, d, g, b;
        bO = (bO % 360) / 60;
        b = 2 * bQ * (E < 0.5 ? E : 1 - E);
        g = b * (1 - ak(bO % 2 - 1));
        S = bP = d = E - b / 2;
        bO = ~~bO;
        S += [b, g, 0, 0, g, b][bO];
        bP += [g, b, b, g, 0, 0][bO];
        d += [0, 0, g, b, b, g][bO];
        return N(S, bP, d, i)
    };
    bi.rgb2hsb = function(bP, bO, d) {
        d = G(bP, bO, d);
        bP = d[0];
        bO = d[1];
        d = d[2];
        var R, E, i, bQ;
        i = bI(bP, bO, d);
        bQ = i - ai(bP, bO, d);
        R = (bQ == 0 ? null : i == bP ? (bO - d) / bQ : i == bO ? (d - bP) / bQ + 2 : (bP - bO) / bQ + 4);
        R = ((R + 360) % 6) * 60 / 360;
        E = bQ == 0 ? 0 : bQ / i;
        return {
            h: R,
            s: E,
            b: i,
            toString: az
        }
    };
    bi.rgb2hsl = function(d, bO, bR) {
        bR = G(d, bO, bR);
        d = bR[0];
        bO = bR[1];
        bR = bR[2];
        var bS, R, bQ, bP, E, i;
        bP = bI(d, bO, bR);
        E = ai(d, bO, bR);
        i = bP - E;
        bS = (i == 0 ? null : bP == d ? (bO - bR) / i : bP == bO ? (bR - d) / i + 2 : (d - bO) / i + 4);
        bS = ((bS + 360) % 6) * 60 / 360;
        bQ = (bP + E) / 2;
        R = (i == 0 ? 0 : bQ < 0.5 ? i / (2 * bQ) : i / (2 - 2 * bQ));
        return {
            h: bS,
            s: R,
            l: bQ,
            toString: bm
        }
    };
    bi._path2string = function() {
        return this.join(",").replace(aN, "$1")
    };

    function c(E, g) {
        for (var b = 0, d = E.length; b < d; b++) {
            if (E[b] === g) {
                return E.push(E.splice(b, 1)[0])
            }
        }
    }

    function H(i, d, b) {
        function g() {
            var E = Array.prototype.slice.call(arguments, 0),
                S = E.join("\u2400"),
                R = g.cache = g.cache || {},
                bO = g.count = g.count || [];
            if (R[bw](S)) {
                c(bO, S);
                return b ? b(R[S]) : R[S]
            }
            bO.length >= 1000 && delete R[bO.shift()];
            bO.push(S);
            R[S] = i[bs](d, E);
            return b ? b(R[S]) : R[S]
        }
        return g
    }
    var D = bi._preload = function(g, d) {
        var b = a5.doc.createElement("img");
        b.style.cssText = "position:absolute;left:-9999em;top:-9999em";
        b.onload = function() {
            d.call(this);
            this.onload = null;
            a5.doc.body.removeChild(this)
        };
        b.onerror = function() {
            a5.doc.body.removeChild(this)
        };
        a5.doc.body.appendChild(b);
        b.src = g
    };

    function h() {
        return this.hex
    }
    bi.getRGB = H(function(b) {
        if (!b || !!((b = k(b)).indexOf("-") + 1)) {
            return {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                error: 1,
                toString: h
            }
        }
        if (b == "none") {
            return {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                toString: h
            }
        }!(ax[bw](b.toLowerCase().substring(0, 2)) || b.charAt() == "#") && (b = J(b));
        var E, d, g, S, i, bP, bO, R = b.match(Z);
        if (R) {
            if (R[2]) {
                S = bK(R[2].substring(5), 16);
                g = bK(R[2].substring(3, 5), 16);
                d = bK(R[2].substring(1, 3), 16)
            }
            if (R[3]) {
                S = bK((bP = R[3].charAt(3)) + bP, 16);
                g = bK((bP = R[3].charAt(2)) + bP, 16);
                d = bK((bP = R[3].charAt(1)) + bP, 16)
            }
            if (R[4]) {
                bO = R[4][l](bf);
                d = bM(bO[0]);
                bO[0].slice(-1) == "%" && (d *= 2.55);
                g = bM(bO[1]);
                bO[1].slice(-1) == "%" && (g *= 2.55);
                S = bM(bO[2]);
                bO[2].slice(-1) == "%" && (S *= 2.55);
                R[1].toLowerCase().slice(0, 4) == "rgba" && (i = bM(bO[3]));
                bO[3] && bO[3].slice(-1) == "%" && (i /= 100)
            }
            if (R[5]) {
                bO = R[5][l](bf);
                d = bM(bO[0]);
                bO[0].slice(-1) == "%" && (d *= 2.55);
                g = bM(bO[1]);
                bO[1].slice(-1) == "%" && (g *= 2.55);
                S = bM(bO[2]);
                bO[2].slice(-1) == "%" && (S *= 2.55);
                (bO[0].slice(-3) == "deg" || bO[0].slice(-1) == "\xb0") && (d /= 360);
                R[1].toLowerCase().slice(0, 4) == "hsba" && (i = bM(bO[3]));
                bO[3] && bO[3].slice(-1) == "%" && (i /= 100);
                return bi.hsb2rgb(d, g, S, i)
            }
            if (R[6]) {
                bO = R[6][l](bf);
                d = bM(bO[0]);
                bO[0].slice(-1) == "%" && (d *= 2.55);
                g = bM(bO[1]);
                bO[1].slice(-1) == "%" && (g *= 2.55);
                S = bM(bO[2]);
                bO[2].slice(-1) == "%" && (S *= 2.55);
                (bO[0].slice(-3) == "deg" || bO[0].slice(-1) == "\xb0") && (d /= 360);
                R[1].toLowerCase().slice(0, 4) == "hsla" && (i = bM(bO[3]));
                bO[3] && bO[3].slice(-1) == "%" && (i /= 100);
                return bi.hsl2rgb(d, g, S, i)
            }
            R = {
                r: d,
                g: g,
                b: S,
                toString: h
            };
            R.hex = "#" + (16777216 | S | (g << 8) | (d << 16)).toString(16).slice(1);
            bi.is(i, "finite") && (R.opacity = i);
            return R
        }
        return {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            error: 1,
            toString: h
        }
    }, bi);
    bi.hsb = H(function(i, g, d) {
        return bi.hsb2rgb(i, g, d).hex
    });
    bi.hsl = H(function(g, d, b) {
        return bi.hsl2rgb(g, d, b).hex
    });
    bi.rgb = H(function(E, i, d) {
        return "#" + (16777216 | d | (i << 8) | (E << 16)).toString(16).slice(1)
    });
    bi.getColor = function(d) {
        var g = this.getColor.start = this.getColor.start || {
                h: 0,
                s: 1,
                b: d || 0.75
            },
            b = this.hsb2rgb(g.h, g.s, g.b);
        g.h += 0.075;
        if (g.h > 1) {
            g.h = 0;
            g.s -= 0.2;
            g.s <= 0 && (this.getColor.start = {
                h: 0,
                s: 1,
                b: g.b
            })
        }
        return b.hex
    };
    bi.getColor.reset = function() {
        delete this.start
    };

    function am(E, bO) {
        var S = [];
        for (var g = 0, b = E.length; b - 2 * !bO > g; g += 2) {
            var R = [{
                x: +E[g - 2],
                y: +E[g - 1]
            }, {
                x: +E[g],
                y: +E[g + 1]
            }, {
                x: +E[g + 2],
                y: +E[g + 3]
            }, {
                x: +E[g + 4],
                y: +E[g + 5]
            }];
            if (bO) {
                if (!g) {
                    R[0] = {
                        x: +E[b - 2],
                        y: +E[b - 1]
                    }
                } else {
                    if (b - 4 == g) {
                        R[3] = {
                            x: +E[0],
                            y: +E[1]
                        }
                    } else {
                        if (b - 2 == g) {
                            R[2] = {
                                x: +E[0],
                                y: +E[1]
                            };
                            R[3] = {
                                x: +E[2],
                                y: +E[3]
                            }
                        }
                    }
                }
            } else {
                if (b - 4 == g) {
                    R[3] = R[2]
                } else {
                    if (!g) {
                        R[0] = {
                            x: +E[g],
                            y: +E[g + 1]
                        }
                    }
                }
            }
            S.push(["C", (-R[0].x + 6 * R[1].x + R[2].x) / 6, (-R[0].y + 6 * R[1].y + R[2].y) / 6, (R[1].x + 6 * R[2].x - R[3].x) / 6, (R[1].y + 6 * R[2].y - R[3].y) / 6, R[2].x, R[2].y])
        }
        return S
    }
    bi.parsePathString = function(b) {
        if (!b) {
            return null
        }
        var g = aR(b);
        if (g.arr) {
            return aY(g.arr)
        }
        var i = {
                a: 7,
                c: 6,
                h: 1,
                l: 2,
                m: 2,
                r: 4,
                q: 4,
                s: 4,
                t: 2,
                v: 1,
                z: 0
            },
            d = [];
        if (bi.is(b, u) && bi.is(b[0], u)) {
            d = aY(b)
        }
        if (!d.length) {
            k(b).replace(bg, function(R, E, bP) {
                var bO = [],
                    S = E.toLowerCase();
                bP.replace(ap, function(bR, bQ) {
                    bQ && bO.push(+bQ)
                });
                if (S == "m" && bO.length > 2) {
                    d.push([E][av](bO.splice(0, 2)));
                    S = "l";
                    E = E == "m" ? "l" : "L"
                }
                if (S == "r") {
                    d.push([E][av](bO))
                } else {
                    while (bO.length >= i[S]) {
                        d.push([E][av](bO.splice(0, i[S])));
                        if (!i[S]) {
                            break
                        }
                    }
                }
            })
        }
        d.toString = bi._path2string;
        g.arr = aY(d);
        return d
    };
    bi.parseTransformString = H(function(d) {
        if (!d) {
            return null
        }
        var g = {
                r: 3,
                s: 4,
                t: 2,
                m: 6
            },
            b = [];
        if (bi.is(d, u) && bi.is(d[0], u)) {
            b = aY(d)
        }
        if (!b.length) {
            k(d).replace(ac, function(E, i, bO) {
                var S = [],
                    R = aj.call(i);
                bO.replace(ap, function(bQ, bP) {
                    bP && S.push(+bP)
                });
                b.push([i][av](S))
            })
        }
        b.toString = bi._path2string;
        return b
    });
    var aR = function(d) {
        var b = aR.ps = aR.ps || {};
        if (b[d]) {
            b[d].sleep = 1
        } else {
            b[d] = {
                sleep: 1
            }
        }
        setTimeout(function() {
            for (var g in b) {
                if (b[bw](g) && g != d) {
                    b[g].sleep--;
                    !b[g].sleep && delete b[g]
                }
            }
        });
        return b[d]
    };
    bi.findDotsAtSegment = function(d, b, b5, b3, S, E, bQ, bO, bY) {
        var bV = 1 - bY,
            b0 = aS(bV, 3),
            b1 = aS(bV, 2),
            bS = bY * bY,
            bP = bS * bY,
            bU = b0 * d + b1 * 3 * bY * b5 + bV * 3 * bY * bY * S + bP * bQ,
            bR = b0 * b + b1 * 3 * bY * b3 + bV * 3 * bY * bY * E + bP * bO,
            bZ = d + 2 * bY * (b5 - d) + bS * (S - 2 * b5 + d),
            bX = b + 2 * bY * (b3 - b) + bS * (E - 2 * b3 + b),
            b4 = b5 + 2 * bY * (S - b5) + bS * (bQ - 2 * S + b5),
            b2 = b3 + 2 * bY * (E - b3) + bS * (bO - 2 * E + b3),
            bW = bV * d + bY * b5,
            bT = bV * b + bY * b3,
            i = bV * S + bY * bQ,
            g = bV * E + bY * bO,
            R = (90 - aI.atan2(bZ - b4, bX - b2) * 180 / ag);
        (bZ > b4 || bX < b2) && (R += 180);
        return {
            x: bU,
            y: bR,
            m: {
                x: bZ,
                y: bX
            },
            n: {
                x: b4,
                y: b2
            },
            start: {
                x: bW,
                y: bT
            },
            end: {
                x: i,
                y: g
            },
            alpha: R
        }
    };
    bi.bezierBBox = function(d, b, i, g, bP, S, R, E) {
        if (!bi.is(d, "array")) {
            d = [d, b, i, g, bP, S, R, E]
        }
        var bO = aX.apply(null, d);
        return {
            x: bO.min.x,
            y: bO.min.y,
            x2: bO.max.x,
            y2: bO.max.y,
            width: bO.max.x - bO.min.x,
            height: bO.max.y - bO.min.y
        }
    };
    bi.isPointInsideBBox = function(d, b, g) {
        return b >= d.x && b <= d.x2 && g >= d.y && g <= d.y2
    };
    bi.isBBoxIntersect = function(g, d) {
        var b = bi.isPointInsideBBox;
        return b(d, g.x, g.y) || b(d, g.x2, g.y) || b(d, g.x, g.y2) || b(d, g.x2, g.y2) || b(g, d.x, d.y) || b(g, d.x2, d.y) || b(g, d.x, d.y2) || b(g, d.x2, d.y2) || (g.x < d.x2 && g.x > d.x || d.x < g.x2 && d.x > g.x) && (g.y < d.y2 && g.y > d.y || d.y < g.y2 && d.y > g.y)
    };

    function aC(b, S, R, E, i) {
        var g = -3 * S + 9 * R - 9 * E + 3 * i,
            d = b * g + 6 * S - 12 * R + 6 * E;
        return b * d - 3 * S + 3 * R
    }

    function bb(bZ, R, bY, g, bX, d, bU, b, bR) {
        if (bR == null) {
            bR = 1
        }
        bR = bR > 1 ? 1 : bR < 0 ? 0 : bR;
        var bS = bR / 2,
            bT = 12,
            bO = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816],
            bW = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472],
            E = 0;
        for (var bV = 0; bV < bT; bV++) {
            var bP = bS * bO[bV] + bS,
                bQ = aC(bP, bZ, bY, bX, bU),
                b0 = aC(bP, R, g, d, b),
                S = bQ * bQ + b0 * b0;
            E += bW[bV] * aI.sqrt(S)
        }
        return bS * E
    }

    function aK(g, bS, d, bR, b, bP, bU, bO, bQ) {
        if (bQ < 0 || bb(g, bS, d, bR, b, bP, bU, bO) < bQ) {
            return
        }
        var bT = 1,
            i = bT / 2,
            R = bT - i,
            E, S = 0.01;
        E = bb(g, bS, d, bR, b, bP, bU, bO, R);
        while (ak(E - bQ) > S) {
            i /= 2;
            R += (E < bQ ? 1 : -1) * i;
            E = bb(g, bS, d, bR, b, bP, bU, bO, R)
        }
        return R
    }

    function a4(i, bT, g, bR, b, bQ, bV, bP) {
        if (bI(i, g) < ai(b, bV) || ai(i, g) > bI(b, bV) || bI(bT, bR) < ai(bQ, bP) || ai(bT, bR) > bI(bQ, bP)) {
            return
        }
        var bO = (i * bR - bT * g) * (b - bV) - (i - g) * (b * bP - bQ * bV),
            S = (i * bR - bT * g) * (bQ - bP) - (bT - bR) * (b * bP - bQ * bV),
            E = (i - g) * (bQ - bP) - (bT - bR) * (b - bV);
        if (!E) {
            return
        }
        var bU = bO / E,
            bS = S / E,
            R = +bU.toFixed(2),
            d = +bS.toFixed(2);
        if (R < +ai(i, g).toFixed(2) || R > +bI(i, g).toFixed(2) || R < +ai(b, bV).toFixed(2) || R > +bI(b, bV).toFixed(2) || d < +ai(bT, bR).toFixed(2) || d > +bI(bT, bR).toFixed(2) || d < +ai(bQ, bP).toFixed(2) || d > +bI(bQ, bP).toFixed(2)) {
            return
        }
        return {
            x: bU,
            y: bS
        }
    }

    function aV(d, b) {
        return aP(d, b)
    }

    function aL(d, b) {
        return aP(d, b, 1)
    }

    function aP(b5, b4, b3) {
        var E = bi.bezierBBox(b5),
            d = bi.bezierBBox(b4);
        if (!bi.isBBoxIntersect(E, d)) {
            return b3 ? 0 : []
        }
        var bY = bb.apply(0, b5),
            bX = bb.apply(0, b4),
            bP = bI(~~(bY / 5), 1),
            bO = bI(~~(bX / 5), 1),
            bV = [],
            bU = [],
            g = {},
            b6 = b3 ? 0 : [];
        for (var b0 = 0; b0 < bP + 1; b0++) {
            var bW = bi.findDotsAtSegment.apply(bi, b5.concat(b0 / bP));
            bV.push({
                x: bW.x,
                y: bW.y,
                t: b0 / bP
            })
        }
        for (b0 = 0; b0 < bO + 1; b0++) {
            bW = bi.findDotsAtSegment.apply(bi, b4.concat(b0 / bO));
            bU.push({
                x: bW.x,
                y: bW.y,
                t: b0 / bO
            })
        }
        for (b0 = 0; b0 < bP; b0++) {
            for (var bZ = 0; bZ < bO; bZ++) {
                var b2 = bV[b0],
                    b = bV[b0 + 1],
                    b1 = bU[bZ],
                    S = bU[bZ + 1],
                    bT = ak(b.x - b2.x) < 0.001 ? "y" : "x",
                    bS = ak(S.x - b1.x) < 0.001 ? "y" : "x",
                    R = a4(b2.x, b2.y, b.x, b.y, b1.x, b1.y, S.x, S.y);
                if (R) {
                    if (g[R.x.toFixed(4)] == R.y.toFixed(4)) {
                        continue
                    }
                    g[R.x.toFixed(4)] = R.y.toFixed(4);
                    var bR = b2.t + ak((R[bT] - b2[bT]) / (b[bT] - b2[bT])) * (b.t - b2.t),
                        bQ = b1.t + ak((R[bS] - b1[bS]) / (S[bS] - b1[bS])) * (S.t - b1.t);
                    if (bR >= 0 && bR <= 1.001 && bQ >= 0 && bQ <= 1.001) {
                        if (b3) {
                            b6++
                        } else {
                            b6.push({
                                x: R.x,
                                y: R.y,
                                t1: ai(bR, 1),
                                t2: ai(bQ, 1)
                            })
                        }
                    }
                }
            }
        }
        return b6
    }
    bi.pathIntersection = function(d, b) {
        return bE(d, b)
    };
    bi.pathIntersectionNumber = function(d, b) {
        return bE(d, b, 1)
    };

    function bE(g, b, bZ) {
        g = bi._path2curve(g);
        b = bi._path2curve(b);
        var bX, S, bW, E, bU, bO, d, bR, b3, b2, b4 = bZ ? 0 : [];
        for (var bV = 0, bP = g.length; bV < bP; bV++) {
            var b1 = g[bV];
            if (b1[0] == "M") {
                bX = bU = b1[1];
                S = bO = b1[2]
            } else {
                if (b1[0] == "C") {
                    b3 = [bX, S].concat(b1.slice(1));
                    bX = b3[6];
                    S = b3[7]
                } else {
                    b3 = [bX, S, bX, S, bU, bO, bU, bO];
                    bX = bU;
                    S = bO
                }
                for (var bT = 0, bY = b.length; bT < bY; bT++) {
                    var b0 = b[bT];
                    if (b0[0] == "M") {
                        bW = d = b0[1];
                        E = bR = b0[2]
                    } else {
                        if (b0[0] == "C") {
                            b2 = [bW, E].concat(b0.slice(1));
                            bW = b2[6];
                            E = b2[7]
                        } else {
                            b2 = [bW, E, bW, E, d, bR, d, bR];
                            bW = d;
                            E = bR
                        }
                        var bQ = aP(b3, b2, bZ);
                        if (bZ) {
                            b4 += bQ
                        } else {
                            for (var bS = 0, R = bQ.length; bS < R; bS++) {
                                bQ[bS].segment1 = bV;
                                bQ[bS].segment2 = bT;
                                bQ[bS].bez1 = b3;
                                bQ[bS].bez2 = b2
                            }
                            b4 = b4.concat(bQ)
                        }
                    }
                }
            }
        }
        return b4
    }
    bi.isPointInsidePath = function(d, b, i) {
        var g = bi.pathBBox(d);
        return bi.isPointInsideBBox(g, b, i) && bE(d, [
            ["M", b, i],
            ["H", g.x2 + 10]
        ], 1) % 2 == 1
    };
    bi._removedFactory = function(b) {
        return function() {
            bc("raphael.log", null, "Rapha\xebl: you are calling to method \u201c" + b + "\u201d of removed object", b)
        }
    };
    var I = bi.pathBBox = function(bY) {
            var bR = aR(bY);
            if (bR.bbox) {
                return bl(bR.bbox)
            }
            if (!bY) {
                return {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    x2: 0,
                    y2: 0
                }
            }
            bY = bk(bY);
            var bU = 0,
                bT = 0,
                S = [],
                g = [],
                E;
            for (var bP = 0, bX = bY.length; bP < bX; bP++) {
                E = bY[bP];
                if (E[0] == "M") {
                    bU = E[1];
                    bT = E[2];
                    S.push(bU);
                    g.push(bT)
                } else {
                    var bQ = aX(bU, bT, E[1], E[2], E[3], E[4], E[5], E[6]);
                    S = S[av](bQ.min.x, bQ.max.x);
                    g = g[av](bQ.min.y, bQ.max.y);
                    bU = E[5];
                    bT = E[6]
                }
            }
            var b = ai[bs](0, S),
                bV = ai[bs](0, g),
                bO = bI[bs](0, S),
                R = bI[bs](0, g),
                d = bO - b,
                bW = R - bV,
                bS = {
                    x: b,
                    y: bV,
                    x2: bO,
                    y2: R,
                    width: d,
                    height: bW,
                    cx: b + d / 2,
                    cy: bV + bW / 2
                };
            bR.bbox = bl(bS);
            return bS
        },
        aY = function(d) {
            var b = bl(d);
            b.toString = bi._path2string;
            return b
        },
        j = bi._pathToRelative = function(E) {
            var bP = aR(E);
            if (bP.rel) {
                return aY(bP.rel)
            }
            if (!bi.is(E, u) || !bi.is(E && E[0], u)) {
                E = bi.parsePathString(E)
            }
            var bS = [],
                bU = 0,
                bT = 0,
                bX = 0,
                bW = 0,
                g = 0;
            if (E[0][0] == "M") {
                bU = E[0][1];
                bT = E[0][2];
                bX = bU;
                bW = bT;
                g++;
                bS.push(["M", bU, bT])
            }
            for (var bO = g, bY = E.length; bO < bY; bO++) {
                var b = bS[bO] = [],
                    bV = E[bO];
                if (bV[0] != aj.call(bV[0])) {
                    b[0] = aj.call(bV[0]);
                    switch (b[0]) {
                        case "a":
                            b[1] = bV[1];
                            b[2] = bV[2];
                            b[3] = bV[3];
                            b[4] = bV[4];
                            b[5] = bV[5];
                            b[6] = +(bV[6] - bU).toFixed(3);
                            b[7] = +(bV[7] - bT).toFixed(3);
                            break;
                        case "v":
                            b[1] = +(bV[1] - bT).toFixed(3);
                            break;
                        case "m":
                            bX = bV[1];
                            bW = bV[2];
                        default:
                            for (var S = 1, bQ = bV.length; S < bQ; S++) {
                                b[S] = +(bV[S] - ((S % 2) ? bU : bT)).toFixed(3)
                            }
                    }
                } else {
                    b = bS[bO] = [];
                    if (bV[0] == "m") {
                        bX = bV[1] + bU;
                        bW = bV[2] + bT
                    }
                    for (var R = 0, d = bV.length; R < d; R++) {
                        bS[bO][R] = bV[R]
                    }
                }
                var bR = bS[bO].length;
                switch (bS[bO][0]) {
                    case "z":
                        bU = bX;
                        bT = bW;
                        break;
                    case "h":
                        bU += +bS[bO][bR - 1];
                        break;
                    case "v":
                        bT += +bS[bO][bR - 1];
                        break;
                    default:
                        bU += +bS[bO][bR - 2];
                        bT += +bS[bO][bR - 1]
                }
            }
            bS.toString = bi._path2string;
            bP.rel = aY(bS);
            return bS
        },
        p = bi._pathToAbsolute = function(bT) {
            var g = aR(bT);
            if (g.abs) {
                return aY(g.abs)
            }
            if (!bi.is(bT, u) || !bi.is(bT && bT[0], u)) {
                bT = bi.parsePathString(bT)
            }
            if (!bT || !bT.length) {
                return [
                    ["M", 0, 0]
                ]
            }
            var bZ = [],
                bO = 0,
                S = 0,
                bR = 0,
                bQ = 0,
                E = 0;
            if (bT[0][0] == "M") {
                bO = +bT[0][1];
                S = +bT[0][2];
                bR = bO;
                bQ = S;
                E++;
                bZ[0] = ["M", bO, S]
            }
            var bY = bT.length == 3 && bT[0][0] == "M" && bT[1][0].toUpperCase() == "R" && bT[2][0].toUpperCase() == "Z";
            for (var bS, b, bW = E, bP = bT.length; bW < bP; bW++) {
                bZ.push(bS = []);
                b = bT[bW];
                if (b[0] != aU.call(b[0])) {
                    bS[0] = aU.call(b[0]);
                    switch (bS[0]) {
                        case "A":
                            bS[1] = b[1];
                            bS[2] = b[2];
                            bS[3] = b[3];
                            bS[4] = b[4];
                            bS[5] = b[5];
                            bS[6] = +(b[6] + bO);
                            bS[7] = +(b[7] + S);
                            break;
                        case "V":
                            bS[1] = +b[1] + S;
                            break;
                        case "H":
                            bS[1] = +b[1] + bO;
                            break;
                        case "R":
                            var R = [bO, S][av](b.slice(1));
                            for (var bV = 2, bX = R.length; bV < bX; bV++) {
                                R[bV] = +R[bV] + bO;
                                R[++bV] = +R[bV] + S
                            }
                            bZ.pop();
                            bZ = bZ[av](am(R, bY));
                            break;
                        case "M":
                            bR = +b[1] + bO;
                            bQ = +b[2] + S;
                        default:
                            for (bV = 1, bX = b.length; bV < bX; bV++) {
                                bS[bV] = +b[bV] + ((bV % 2) ? bO : S)
                            }
                    }
                } else {
                    if (b[0] == "R") {
                        R = [bO, S][av](b.slice(1));
                        bZ.pop();
                        bZ = bZ[av](am(R, bY));
                        bS = ["R"][av](b.slice(-2))
                    } else {
                        for (var bU = 0, d = b.length; bU < d; bU++) {
                            bS[bU] = b[bU]
                        }
                    }
                }
                switch (bS[0]) {
                    case "Z":
                        bO = bR;
                        S = bQ;
                        break;
                    case "H":
                        bO = bS[1];
                        break;
                    case "V":
                        S = bS[1];
                        break;
                    case "M":
                        bR = bS[bS.length - 2];
                        bQ = bS[bS.length - 1];
                    default:
                        bO = bS[bS.length - 2];
                        S = bS[bS.length - 1]
                }
            }
            bZ.toString = bi._path2string;
            g.abs = aY(bZ);
            return bZ
        },
        aW = function(d, i, b, g) {
            return [d, i, b, g, b, g]
        },
        z = function(d, i, S, E, b, g) {
            var R = 1 / 3,
                bO = 2 / 3;
            return [R * d + bO * S, R * i + bO * E, R * b + bO * S, R * g + bO * E, b, g]
        },
        ab = function(bV, cq, b4, b2, bW, bQ, E, bU, cp, bX) {
            var b1 = ag * 120 / 180,
                b = ag / 180 * (+bW || 0),
                b8 = [],
                b5, cm = H(function(cr, cu, i) {
                    var ct = cr * aI.cos(i) - cu * aI.sin(i),
                        cs = cr * aI.sin(i) + cu * aI.cos(i);
                    return {
                        x: ct,
                        y: cs
                    }
                });
            if (!bX) {
                b5 = cm(bV, cq, -b);
                bV = b5.x;
                cq = b5.y;
                b5 = cm(bU, cp, -b);
                bU = b5.x;
                cp = b5.y;
                var d = aI.cos(ag / 180 * bW),
                    bS = aI.sin(ag / 180 * bW),
                    ca = (bV - bU) / 2,
                    b9 = (cq - cp) / 2;
                var ck = (ca * ca) / (b4 * b4) + (b9 * b9) / (b2 * b2);
                if (ck > 1) {
                    ck = aI.sqrt(ck);
                    b4 = ck * b4;
                    b2 = ck * b2
                }
                var g = b4 * b4,
                    cd = b2 * b2,
                    cf = (bQ == E ? -1 : 1) * aI.sqrt(ak((g * cd - g * b9 * b9 - cd * ca * ca) / (g * b9 * b9 + cd * ca * ca))),
                    bZ = cf * b4 * b9 / b2 + (bV + bU) / 2,
                    bY = cf * -b2 * ca / b4 + (cq + cp) / 2,
                    bP = aI.asin(((cq - bY) / b2).toFixed(9)),
                    bO = aI.asin(((cp - bY) / b2).toFixed(9));
                bP = bV < bZ ? ag - bP : bP;
                bO = bU < bZ ? ag - bO : bO;
                bP < 0 && (bP = ag * 2 + bP);
                bO < 0 && (bO = ag * 2 + bO);
                if (E && bP > bO) {
                    bP = bP - ag * 2
                }
                if (!E && bO > bP) {
                    bO = bO - ag * 2
                }
            } else {
                bP = bX[0];
                bO = bX[1];
                bZ = bX[2];
                bY = bX[3]
            }
            var bT = bO - bP;
            if (ak(bT) > b1) {
                var b0 = bO,
                    b3 = bU,
                    bR = cp;
                bO = bP + b1 * (E && bO > bP ? 1 : -1);
                bU = bZ + b4 * aI.cos(bO);
                cp = bY + b2 * aI.sin(bO);
                b8 = ab(bU, cp, b4, b2, bW, 0, E, b3, bR, [bO, b0, bZ, bY])
            }
            bT = bO - bP;
            var S = aI.cos(bP),
                co = aI.sin(bP),
                R = aI.cos(bO),
                cn = aI.sin(bO),
                cb = aI.tan(bT / 4),
                ce = 4 / 3 * b4 * cb,
                cc = 4 / 3 * b2 * cb,
                cl = [bV, cq],
                cj = [bV + ce * co, cq - cc * S],
                ci = [bU + ce * cn, cp - cc * R],
                cg = [bU, cp];
            cj[0] = 2 * cl[0] - cj[0];
            cj[1] = 2 * cl[1] - cj[1];
            if (bX) {
                return [cj, ci, cg][av](b8)
            } else {
                b8 = [cj, ci, cg][av](b8).join()[l](",");
                var b6 = [];
                for (var ch = 0, b7 = b8.length; ch < b7; ch++) {
                    b6[ch] = ch % 2 ? cm(b8[ch - 1], b8[ch], b).y : cm(b8[ch], b8[ch + 1], b).x
                }
                return b6
            }
        },
        bL = function(d, b, i, g, bP, bO, S, R, bQ) {
            var E = 1 - bQ;
            return {
                x: aS(E, 3) * d + aS(E, 2) * 3 * bQ * i + E * 3 * bQ * bQ * bP + aS(bQ, 3) * S,
                y: aS(E, 3) * b + aS(E, 2) * 3 * bQ * g + E * 3 * bQ * bQ * bO + aS(bQ, 3) * R
            }
        },
        aX = H(function(i, d, R, E, bX, bW, bT, bQ) {
            var bV = (bX - 2 * R + i) - (bT - 2 * bX + R),
                bS = 2 * (R - i) - 2 * (bX - R),
                bP = i - R,
                bO = (-bS + aI.sqrt(bS * bS - 4 * bV * bP)) / 2 / bV,
                S = (-bS - aI.sqrt(bS * bS - 4 * bV * bP)) / 2 / bV,
                bR = [d, bQ],
                bU = [i, bT],
                g;
            ak(bO) > "1e12" && (bO = 0.5);
            ak(S) > "1e12" && (S = 0.5);
            if (bO > 0 && bO < 1) {
                g = bL(i, d, R, E, bX, bW, bT, bQ, bO);
                bU.push(g.x);
                bR.push(g.y)
            }
            if (S > 0 && S < 1) {
                g = bL(i, d, R, E, bX, bW, bT, bQ, S);
                bU.push(g.x);
                bR.push(g.y)
            }
            bV = (bW - 2 * E + d) - (bQ - 2 * bW + E);
            bS = 2 * (E - d) - 2 * (bW - E);
            bP = d - E;
            bO = (-bS + aI.sqrt(bS * bS - 4 * bV * bP)) / 2 / bV;
            S = (-bS - aI.sqrt(bS * bS - 4 * bV * bP)) / 2 / bV;
            ak(bO) > "1e12" && (bO = 0.5);
            ak(S) > "1e12" && (S = 0.5);
            if (bO > 0 && bO < 1) {
                g = bL(i, d, R, E, bX, bW, bT, bQ, bO);
                bU.push(g.x);
                bR.push(g.y)
            }
            if (S > 0 && S < 1) {
                g = bL(i, d, R, E, bX, bW, bT, bQ, S);
                bU.push(g.x);
                bR.push(g.y)
            }
            return {
                min: {
                    x: ai[bs](0, bU),
                    y: ai[bs](0, bR)
                },
                max: {
                    x: bI[bs](0, bU),
                    y: bI[bs](0, bR)
                }
            }
        }),
        bk = bi._path2curve = H(function(bX, bS) {
            var bQ = !bS && aR(bX);
            if (!bS && bQ.curve) {
                return aY(bQ.curve)
            }
            var E = p(bX),
                bT = bS && p(bS),
                bU = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                },
                d = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                },
                S = function(bZ, b0, bY) {
                    var i, b1;
                    if (!bZ) {
                        return ["C", b0.x, b0.y, b0.x, b0.y, b0.x, b0.y]
                    }!(bZ[0] in {
                        T: 1,
                        Q: 1
                    }) && (b0.qx = b0.qy = null);
                    switch (bZ[0]) {
                        case "M":
                            b0.X = bZ[1];
                            b0.Y = bZ[2];
                            break;
                        case "A":
                            bZ = ["C"][av](ab[bs](0, [b0.x, b0.y][av](bZ.slice(1))));
                            break;
                        case "S":
                            if (bY == "C" || bY == "S") {
                                i = b0.x * 2 - b0.bx;
                                b1 = b0.y * 2 - b0.by
                            } else {
                                i = b0.x;
                                b1 = b0.y
                            }
                            bZ = ["C", i, b1][av](bZ.slice(1));
                            break;
                        case "T":
                            if (bY == "Q" || bY == "T") {
                                b0.qx = b0.x * 2 - b0.qx;
                                b0.qy = b0.y * 2 - b0.qy
                            } else {
                                b0.qx = b0.x;
                                b0.qy = b0.y
                            }
                            bZ = ["C"][av](z(b0.x, b0.y, b0.qx, b0.qy, bZ[1], bZ[2]));
                            break;
                        case "Q":
                            b0.qx = bZ[1];
                            b0.qy = bZ[2];
                            bZ = ["C"][av](z(b0.x, b0.y, bZ[1], bZ[2], bZ[3], bZ[4]));
                            break;
                        case "L":
                            bZ = ["C"][av](aW(b0.x, b0.y, bZ[1], bZ[2]));
                            break;
                        case "H":
                            bZ = ["C"][av](aW(b0.x, b0.y, bZ[1], b0.y));
                            break;
                        case "V":
                            bZ = ["C"][av](aW(b0.x, b0.y, b0.x, bZ[1]));
                            break;
                        case "Z":
                            bZ = ["C"][av](aW(b0.x, b0.y, b0.X, b0.Y));
                            break
                    }
                    return bZ
                },
                b = function(bY, bZ) {
                    if (bY[bZ].length > 7) {
                        bY[bZ].shift();
                        var b0 = bY[bZ];
                        while (b0.length) {
                            bY.splice(bZ++, 0, ["C"][av](b0.splice(0, 6)))
                        }
                        bY.splice(bZ, 1);
                        bV = bI(E.length, bT && bT.length || 0)
                    }
                },
                g = function(b2, b1, bZ, bY, b0) {
                    if (b2 && b1 && b2[b0][0] == "M" && b1[b0][0] != "M") {
                        b1.splice(b0, 0, ["M", bY.x, bY.y]);
                        bZ.bx = 0;
                        bZ.by = 0;
                        bZ.x = b2[b0][1];
                        bZ.y = b2[b0][2];
                        bV = bI(E.length, bT && bT.length || 0)
                    }
                };
            for (var bP = 0, bV = bI(E.length, bT && bT.length || 0); bP < bV; bP++) {
                E[bP] = S(E[bP], bU);
                b(E, bP);
                bT && (bT[bP] = S(bT[bP], d));
                bT && b(bT, bP);
                g(E, bT, bU, d, bP);
                g(bT, E, d, bU, bP);
                var bO = E[bP],
                    bW = bT && bT[bP],
                    R = bO.length,
                    bR = bT && bW.length;
                bU.x = bO[R - 2];
                bU.y = bO[R - 1];
                bU.bx = bM(bO[R - 4]) || bU.x;
                bU.by = bM(bO[R - 3]) || bU.y;
                d.bx = bT && (bM(bW[bR - 4]) || d.x);
                d.by = bT && (bM(bW[bR - 3]) || d.y);
                d.x = bT && bW[bR - 2];
                d.y = bT && bW[bR - 1]
            }
            if (!bT) {
                bQ.curve = aY(E)
            }
            return bT ? [E, bT] : E
        }, null, aY),
        ba = bi._parseDots = H(function(bR) {
            var bQ = [];
            for (var S = 0, bS = bR.length; S < bS; S++) {
                var b = {},
                    bP = bR[S].match(/^([^:]*):?([\d\.]*)/);
                b.color = bi.getRGB(bP[1]);
                if (b.color.error) {
                    return null
                }
                b.color = b.color.hex;
                bP[2] && (b.offset = bP[2] + "%");
                bQ.push(b)
            }
            for (S = 1, bS = bQ.length - 1; S < bS; S++) {
                if (!bQ[S].offset) {
                    var g = bM(bQ[S - 1].offset || 0),
                        E = 0;
                    for (var R = S + 1; R < bS; R++) {
                        if (bQ[R].offset) {
                            E = bQ[R].offset;
                            break
                        }
                    }
                    if (!E) {
                        E = 100;
                        R = bS
                    }
                    E = bM(E);
                    var bO = (E - g) / (R - S + 1);
                    for (; S < R; S++) {
                        g += bO;
                        bQ[S].offset = g + "%"
                    }
                }
            }
            return bQ
        }),
        aH = bi._tear = function(b, d) {
            b == d.top && (d.top = b.prev);
            b == d.bottom && (d.bottom = b.next);
            b.next && (b.next.prev = b.prev);
            b.prev && (b.prev.next = b.next)
        },
        L = bi._tofront = function(b, d) {
            if (d.top === b) {
                return
            }
            aH(b, d);
            b.next = null;
            b.prev = d.top;
            d.top.next = b;
            d.top = b
        },
        y = bi._toback = function(b, d) {
            if (d.bottom === b) {
                return
            }
            aH(b, d);
            b.next = d.bottom;
            b.prev = null;
            d.bottom.prev = b;
            d.bottom = b
        },
        ar = bi._insertafter = function(d, b, g) {
            aH(d, g);
            b == g.top && (g.top = d);
            b.next && (b.next.prev = d);
            d.next = b.next;
            d.prev = b;
            b.next = d
        },
        m = bi._insertbefore = function(d, b, g) {
            aH(d, g);
            b == g.bottom && (g.bottom = d);
            b.prev && (b.prev.next = d);
            d.prev = b.prev;
            b.prev = d;
            d.next = b
        },
        t = bi.toMatrix = function(g, b) {
            var i = I(g),
                d = {
                    _: {
                        transform: bn
                    },
                    getBBox: function() {
                        return i
                    }
                };
            Y(d, b);
            return d.matrix
        },
        ay = bi.transformPath = function(d, b) {
            return Q(d, t(d, b))
        },
        Y = bi._extractTransform = function(d, b2) {
            if (b2 == null) {
                return d._.transform
            }
            b2 = k(b2).replace(/\.{3}|\u2026/g, d._.transform || bn);
            var bU = bi.parseTransformString(b2),
                bS = 0,
                bQ = 0,
                bP = 0,
                bW = 1,
                bV = 1,
                b3 = d._,
                bX = new a9;
            b3.transform = bU || [];
            if (bU) {
                for (var bY = 0, bR = bU.length; bY < bR; bY++) {
                    var bT = bU[bY],
                        b = bT.length,
                        R = k(bT[0]).toLowerCase(),
                        b1 = bT[0] != R,
                        bO = b1 ? bX.invert() : 0,
                        b0, E, bZ, g, S;
                    if (R == "t" && b == 3) {
                        if (b1) {
                            b0 = bO.x(0, 0);
                            E = bO.y(0, 0);
                            bZ = bO.x(bT[1], bT[2]);
                            g = bO.y(bT[1], bT[2]);
                            bX.translate(bZ - b0, g - E)
                        } else {
                            bX.translate(bT[1], bT[2])
                        }
                    } else {
                        if (R == "r") {
                            if (b == 2) {
                                S = S || d.getBBox(1);
                                bX.rotate(bT[1], S.x + S.width / 2, S.y + S.height / 2);
                                bS += bT[1]
                            } else {
                                if (b == 4) {
                                    if (b1) {
                                        bZ = bO.x(bT[2], bT[3]);
                                        g = bO.y(bT[2], bT[3]);
                                        bX.rotate(bT[1], bZ, g)
                                    } else {
                                        bX.rotate(bT[1], bT[2], bT[3])
                                    }
                                    bS += bT[1]
                                }
                            }
                        } else {
                            if (R == "s") {
                                if (b == 2 || b == 3) {
                                    S = S || d.getBBox(1);
                                    bX.scale(bT[1], bT[b - 1], S.x + S.width / 2, S.y + S.height / 2);
                                    bW *= bT[1];
                                    bV *= bT[b - 1]
                                } else {
                                    if (b == 5) {
                                        if (b1) {
                                            bZ = bO.x(bT[3], bT[4]);
                                            g = bO.y(bT[3], bT[4]);
                                            bX.scale(bT[1], bT[2], bZ, g)
                                        } else {
                                            bX.scale(bT[1], bT[2], bT[3], bT[4])
                                        }
                                        bW *= bT[1];
                                        bV *= bT[2]
                                    }
                                }
                            } else {
                                if (R == "m" && b == 7) {
                                    bX.add(bT[1], bT[2], bT[3], bT[4], bT[5], bT[6])
                                }
                            }
                        }
                    }
                    b3.dirtyT = 1;
                    d.matrix = bX
                }
            }
            d.matrix = bX;
            b3.sx = bW;
            b3.sy = bV;
            b3.deg = bS;
            b3.dx = bQ = bX.e;
            b3.dy = bP = bX.f;
            if (bW == 1 && bV == 1 && !bS && b3.bbox) {
                b3.bbox.x += +bQ;
                b3.bbox.y += +bP
            } else {
                b3.dirtyT = 1
            }
        },
        o = function(d) {
            var b = d[0];
            switch (b.toLowerCase()) {
                case "t":
                    return [b, 0, 0];
                case "m":
                    return [b, 1, 0, 0, 1, 0, 0];
                case "r":
                    if (d.length == 4) {
                        return [b, 0, d[2], d[3]]
                    } else {
                        return [b, 0]
                    }
                case "s":
                    if (d.length == 5) {
                        return [b, 1, 1, d[3], d[4]]
                    } else {
                        if (d.length == 3) {
                            return [b, 1, 1]
                        } else {
                            return [b, 1]
                        }
                    }
            }
        },
        bd = bi._equaliseTransform = function(R, E) {
            E = k(E).replace(/\.{3}|\u2026/g, R);
            R = bi.parseTransformString(R) || [];
            E = bi.parseTransformString(E) || [];
            var b = bI(R.length, E.length),
                bQ = [],
                bR = [],
                g = 0,
                d, S, bP, bO;
            for (; g < b; g++) {
                bP = R[g] || o(E[g]);
                bO = E[g] || o(bP);
                if ((bP[0] != bO[0]) || (bP[0].toLowerCase() == "r" && (bP[2] != bO[2] || bP[3] != bO[3])) || (bP[0].toLowerCase() == "s" && (bP[3] != bO[3] || bP[4] != bO[4]))) {
                    return
                }
                bQ[g] = [];
                bR[g] = [];
                for (d = 0, S = bI(bP.length, bO.length); d < S; d++) {
                    d in bP && (bQ[g][d] = bP[d]);
                    d in bO && (bR[g][d] = bO[d])
                }
            }
            return {
                from: bQ,
                to: bR
            }
        };
    bi._getContainer = function(b, E, g, i) {
        var d;
        d = i == null && !bi.is(b, "object") ? a5.doc.getElementById(b) : b;
        if (d == null) {
            return
        }
        if (d.tagName) {
            if (E == null) {
                return {
                    container: d,
                    width: d.style.pixelWidth || d.offsetWidth,
                    height: d.style.pixelHeight || d.offsetHeight
                }
            } else {
                return {
                    container: d,
                    width: E,
                    height: g
                }
            }
        }
        return {
            container: 1,
            x: b,
            y: E,
            width: g,
            height: i
        }
    };
    bi.pathToRelative = j;
    bi._engine = {};
    bi.path2curve = bk;
    bi.matrix = function(i, g, bO, S, R, E) {
        return new a9(i, g, bO, S, R, E)
    };

    function a9(i, g, bO, S, R, E) {
        if (i != null) {
            this.a = +i;
            this.b = +g;
            this.c = +bO;
            this.d = +S;
            this.e = +R;
            this.f = +E
        } else {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.e = 0;
            this.f = 0
        }
    }(function(g) {
        g.add = function(bW, bT, bR, bP, S, R) {
            var E = [
                    [],
                    [],
                    []
                ],
                i = [
                    [this.a, this.c, this.e],
                    [this.b, this.d, this.f],
                    [0, 0, 1]
                ],
                bV = [
                    [bW, bR, S],
                    [bT, bP, R],
                    [0, 0, 1]
                ],
                bU, bS, bQ, bO;
            if (bW && bW instanceof a9) {
                bV = [
                    [bW.a, bW.c, bW.e],
                    [bW.b, bW.d, bW.f],
                    [0, 0, 1]
                ]
            }
            for (bU = 0; bU < 3; bU++) {
                for (bS = 0; bS < 3; bS++) {
                    bO = 0;
                    for (bQ = 0; bQ < 3; bQ++) {
                        bO += i[bU][bQ] * bV[bQ][bS]
                    }
                    E[bU][bS] = bO
                }
            }
            this.a = E[0][0];
            this.b = E[1][0];
            this.c = E[0][1];
            this.d = E[1][1];
            this.e = E[0][2];
            this.f = E[1][2]
        };
        g.invert = function() {
            var E = this,
                i = E.a * E.d - E.b * E.c;
            return new a9(E.d / i, -E.b / i, -E.c / i, E.a / i, (E.c * E.f - E.d * E.e) / i, (E.b * E.e - E.a * E.f) / i)
        };
        g.clone = function() {
            return new a9(this.a, this.b, this.c, this.d, this.e, this.f)
        };
        g.translate = function(i, E) {
            this.add(1, 0, 0, 1, i, E)
        };
        g.scale = function(E, S, i, R) {
            S == null && (S = E);
            (i || R) && this.add(1, 0, 0, 1, i, R);
            this.add(E, 0, 0, S, 0, 0);
            (i || R) && this.add(1, 0, 0, 1, -i, -R)
        };
        g.rotate = function(E, i, bO) {
            E = bi.rad(E);
            i = i || 0;
            bO = bO || 0;
            var S = +aI.cos(E).toFixed(9),
                R = +aI.sin(E).toFixed(9);
            this.add(S, R, -R, S, i, bO);
            this.add(1, 0, 0, 1, -i, -bO)
        };
        g.x = function(i, E) {
            return i * this.a + E * this.c + this.e
        };
        g.y = function(i, E) {
            return i * this.b + E * this.d + this.f
        };
        g.get = function(E) {
            return +this[k.fromCharCode(97 + E)].toFixed(4)
        };
        g.toString = function() {
            return bi.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
        };
        g.toFilter = function() {
            return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
        };
        g.offset = function() {
            return [this.e.toFixed(4), this.f.toFixed(4)]
        };

        function d(i) {
            return i[0] * i[0] + i[1] * i[1]
        }

        function b(i) {
            var E = aI.sqrt(d(i));
            i[0] && (i[0] /= E);
            i[1] && (i[1] /= E)
        }
        g.split = function() {
            var E = {};
            E.dx = this.e;
            E.dy = this.f;
            var S = [
                [this.a, this.c],
                [this.b, this.d]
            ];
            E.scalex = aI.sqrt(d(S[0]));
            b(S[0]);
            E.shear = S[0][0] * S[1][0] + S[0][1] * S[1][1];
            S[1] = [S[1][0] - S[0][0] * E.shear, S[1][1] - S[0][1] * E.shear];
            E.scaley = aI.sqrt(d(S[1]));
            b(S[1]);
            E.shear /= E.scaley;
            var i = -S[0][1],
                R = S[1][1];
            if (R < 0) {
                E.rotate = bi.deg(aI.acos(R));
                if (i < 0) {
                    E.rotate = 360 - E.rotate
                }
            } else {
                E.rotate = bi.deg(aI.asin(i))
            }
            E.isSimple = !+E.shear.toFixed(9) && (E.scalex.toFixed(9) == E.scaley.toFixed(9) || !E.rotate);
            E.isSuperSimple = !+E.shear.toFixed(9) && E.scalex.toFixed(9) == E.scaley.toFixed(9) && !E.rotate;
            E.noRotation = !+E.shear.toFixed(9) && !E.rotate;
            return E
        };
        g.toTransformString = function(i) {
            var E = i || this[l]();
            if (E.isSimple) {
                E.scalex = +E.scalex.toFixed(4);
                E.scaley = +E.scaley.toFixed(4);
                E.rotate = +E.rotate.toFixed(4);
                return (E.dx || E.dy ? "t" + [E.dx, E.dy] : bn) + (E.scalex != 1 || E.scaley != 1 ? "s" + [E.scalex, E.scaley, 0, 0] : bn) + (E.rotate ? "r" + [E.rotate, 0, 0] : bn)
            } else {
                return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
            }
        }
    })(a9.prototype);
    var al = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    if ((navigator.vendor == "Apple Computer, Inc.") && (al && al[1] < 4 || navigator.platform.slice(0, 2) == "iP") || (navigator.vendor == "Google Inc." && al && al[1] < 8)) {
        ao.safari = function() {
            var b = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
                stroke: "none"
            });
            setTimeout(function() {
                b.remove()
            })
        }
    } else {
        ao.safari = ad
    }
    var bD = function() {
            this.returnValue = false
        },
        n = function() {
            return this.originalEvent.preventDefault()
        },
        aJ = function() {
            this.cancelBubble = true
        },
        V = function() {
            return this.originalEvent.stopPropagation()
        },
        ae = function(d) {
            var b = a5.doc.documentElement.scrollTop || a5.doc.body.scrollTop,
                g = a5.doc.documentElement.scrollLeft || a5.doc.body.scrollLeft;
            return {
                x: d.clientX + g,
                y: d.clientY + b
            }
        },
        F = (function() {
            if (a5.doc.addEventListener) {
                return function(E, g, d, b) {
                    var i = function(S) {
                        var bO = ae(S);
                        return d.call(b, S, bO.x, bO.y)
                    };
                    E.addEventListener(g, i, false);
                    if (O && bp[g]) {
                        var R = function(bQ) {
                            var bR = ae(bQ),
                                bO = bQ;
                            for (var S = 0, bP = bQ.targetTouches && bQ.targetTouches.length; S < bP; S++) {
                                if (bQ.targetTouches[S].target == E) {
                                    bQ = bQ.targetTouches[S];
                                    bQ.originalEvent = bO;
                                    bQ.preventDefault = n;
                                    bQ.stopPropagation = V;
                                    break
                                }
                            }
                            return d.call(b, bQ, bR.x, bR.y)
                        };
                        E.addEventListener(bp[g], R, false)
                    }
                    return function() {
                        E.removeEventListener(g, i, false);
                        if (O && bp[g]) {
                            E.removeEventListener(bp[g], i, false)
                        }
                        return true
                    }
                }
            } else {
                if (a5.doc.attachEvent) {
                    return function(R, i, g, d) {
                        var E = function(bP) {
                            bP = bP || a5.win.event;
                            var bO = a5.doc.documentElement.scrollTop || a5.doc.body.scrollTop,
                                bQ = a5.doc.documentElement.scrollLeft || a5.doc.body.scrollLeft,
                                S = bP.clientX + bQ,
                                bR = bP.clientY + bO;
                            bP.preventDefault = bP.preventDefault || bD;
                            bP.stopPropagation = bP.stopPropagation || aJ;
                            return g.call(d, bP, S, bR)
                        };
                        R.attachEvent("on" + i, E);
                        var b = function() {
                            R.detachEvent("on" + i, E);
                            return true
                        };
                        return b
                    }
                }
            }
        })(),
        aA = [],
        br = function(bP) {
            var bS = bP.clientX,
                bR = bP.clientY,
                bU = a5.doc.documentElement.scrollTop || a5.doc.body.scrollTop,
                bV = a5.doc.documentElement.scrollLeft || a5.doc.body.scrollLeft,
                g, E = aA.length;
            while (E--) {
                g = aA[E];
                if (O && bP.touches) {
                    var S = bP.touches.length,
                        R;
                    while (S--) {
                        R = bP.touches[S];
                        if (R.identifier == g.el._drag.id) {
                            bS = R.clientX;
                            bR = R.clientY;
                            (bP.originalEvent ? bP.originalEvent : bP).preventDefault();
                            break
                        }
                    }
                } else {
                    bP.preventDefault()
                }
                var d = g.el.node,
                    b, bO = d.nextSibling,
                    bT = d.parentNode,
                    bQ = d.style.display;
                a5.win.opera && bT.removeChild(d);
                d.style.display = "none";
                b = g.el.paper.getElementByPoint(bS, bR);
                d.style.display = bQ;
                a5.win.opera && (bO ? bT.insertBefore(d, bO) : bT.appendChild(d));
                b && bc("raphael.drag.over." + g.el.id, g.el, b);
                bS += bV;
                bR += bU;
                bc("raphael.drag.move." + g.el.id, g.move_scope || g.el, bS - g.el._drag.x, bR - g.el._drag.y, bS, bR, bP)
            }
        },
        e = function(g) {
            bi.unmousemove(br).unmouseup(e);
            var d = aA.length,
                b;
            while (d--) {
                b = aA[d];
                b.el._drag = {};
                bc("raphael.drag.end." + b.el.id, b.end_scope || b.start_scope || b.move_scope || b.el, g)
            }
            aA = []
        },
        aq = bi.el = {};
    for (var a3 = bB.length; a3--;) {
        (function(b) {
            bi[b] = aq[b] = function(g, d) {
                if (bi.is(g, "function")) {
                    this.events = this.events || [];
                    this.events.push({
                        name: b,
                        f: g,
                        unbind: F(this.shape || this.node || a5.doc, b, g, d || this)
                    })
                }
                return this
            };
            bi["un" + b] = aq["un" + b] = function(i) {
                var g = this.events || [],
                    d = g.length;
                while (d--) {
                    if (g[d].name == b && (bi.is(i, "undefined") || g[d].f == i)) {
                        g[d].unbind();
                        g.splice(d, 1);
                        !g.length && delete this.events
                    }
                }
                return this
            }
        })(bB[a3])
    }
    aq.data = function(d, E) {
        var g = M[this.id] = M[this.id] || {};
        if (arguments.length == 0) {
            return g
        }
        if (arguments.length == 1) {
            if (bi.is(d, "object")) {
                for (var b in d) {
                    if (d[bw](b)) {
                        this.data(b, d[b])
                    }
                }
                return this
            }
            bc("raphael.data.get." + this.id, this, g[d], d);
            return g[d]
        }
        g[d] = E;
        bc("raphael.data.set." + this.id, this, E, d);
        return this
    };
    aq.removeData = function(b) {
        if (b == null) {
            M[this.id] = {}
        } else {
            M[this.id] && delete M[this.id][b]
        }
        return this
    };
    aq.getData = function() {
        return bl(M[this.id] || {})
    };
    aq.hover = function(i, b, g, d) {
        return this.mouseover(i, g).mouseout(b, d || g)
    };
    aq.unhover = function(d, b) {
        return this.unmouseover(d).unmouseout(b)
    };
    var ah = [];
    aq.drag = function(d, R, E, b, g, i) {
        function S(bR) {
            (bR.originalEvent || bR).preventDefault();
            var bO = bR.clientX,
                bU = bR.clientY,
                bQ = a5.doc.documentElement.scrollTop || a5.doc.body.scrollTop,
                bS = a5.doc.documentElement.scrollLeft || a5.doc.body.scrollLeft;
            this._drag.id = bR.identifier;
            if (O && bR.touches) {
                var bP = bR.touches.length,
                    bT;
                while (bP--) {
                    bT = bR.touches[bP];
                    this._drag.id = bT.identifier;
                    if (bT.identifier == this._drag.id) {
                        bO = bT.clientX;
                        bU = bT.clientY;
                        break
                    }
                }
            }
            this._drag.x = bO + bS;
            this._drag.y = bU + bQ;
            !aA.length && bi.mousemove(br).mouseup(e);
            aA.push({
                el: this,
                move_scope: b,
                start_scope: g,
                end_scope: i
            });
            R && bc.on("raphael.drag.start." + this.id, R);
            d && bc.on("raphael.drag.move." + this.id, d);
            E && bc.on("raphael.drag.end." + this.id, E);
            bc("raphael.drag.start." + this.id, g || b || this, bR.clientX + bS, bR.clientY + bQ, bR)
        }
        this._drag = {};
        ah.push({
            el: this,
            start: S
        });
        this.mousedown(S);
        return this
    };
    aq.onDragOver = function(b) {
        b ? bc.on("raphael.drag.over." + this.id, b) : bc.unbind("raphael.drag.over." + this.id)
    };
    aq.undrag = function() {
        var b = ah.length;
        while (b--) {
            if (ah[b].el == this) {
                this.unmousedown(ah[b].start);
                ah.splice(b, 1);
                bc.unbind("raphael.drag.*." + this.id)
            }
        }!ah.length && bi.unmousemove(br).unmouseup(e);
        aA = []
    };
    ao.circle = function(b, i, g) {
        var d = bi._engine.circle(this, b || 0, i || 0, g || 0);
        this.__set__ && this.__set__.push(d);
        return d
    };
    ao.rect = function(b, R, d, i, E) {
        var g = bi._engine.rect(this, b || 0, R || 0, d || 0, i || 0, E || 0);
        this.__set__ && this.__set__.push(g);
        return g
    };
    ao.ellipse = function(b, E, i, g) {
        var d = bi._engine.ellipse(this, b || 0, E || 0, i || 0, g || 0);
        this.__set__ && this.__set__.push(d);
        return d
    };
    ao.path = function(b) {
        b && !bi.is(b, a) && !bi.is(b[0], u) && (b += bn);
        var d = bi._engine.path(bi.format[bs](bi, arguments), this);
        this.__set__ && this.__set__.push(d);
        return d
    };
    ao.image = function(E, b, R, d, i) {
        var g = bi._engine.image(this, E || "about:blank", b || 0, R || 0, d || 0, i || 0);
        this.__set__ && this.__set__.push(g);
        return g
    };
    ao.text = function(b, i, g) {
        var d = bi._engine.text(this, b || 0, i || 0, k(g));
        this.__set__ && this.__set__.push(d);
        return d
    };
    ao.set = function(d) {
        !bi.is(d, "array") && (d = Array.prototype.splice.call(arguments, 0, arguments.length));
        var b = new X(d);
        this.__set__ && this.__set__.push(b);
        b.paper = this;
        b.type = "set";
        return b
    };
    ao.setStart = function(b) {
        this.__set__ = b || this.set()
    };
    ao.setFinish = function(d) {
        var b = this.__set__;
        delete this.__set__;
        return b
    };
    ao.setSize = function(d, b) {
        return bi._engine.setSize.call(this, d, b)
    };
    ao.setViewBox = function(b, E, d, i, g) {
        return bi._engine.setViewBox.call(this, b, E, d, i, g)
    };
    ao.top = ao.bottom = null;
    ao.raphael = bi;
    var bN = function(g) {
        var E = g.getBoundingClientRect(),
            bP = g.ownerDocument,
            R = bP.body,
            b = bP.documentElement,
            i = b.clientTop || R.clientTop || 0,
            S = b.clientLeft || R.clientLeft || 0,
            bO = E.top + (a5.win.pageYOffset || b.scrollTop || R.scrollTop) - i,
            d = E.left + (a5.win.pageXOffset || b.scrollLeft || R.scrollLeft) - S;
        return {
            y: bO,
            x: d
        }
    };
    ao.getElementByPoint = function(d, bO) {
        var S = this,
            g = S.canvas,
            R = a5.doc.elementFromPoint(d, bO);
        if (a5.win.opera && R.tagName == "svg") {
            var E = bN(g),
                i = g.createSVGRect();
            i.x = d - E.x;
            i.y = bO - E.y;
            i.width = i.height = 1;
            var b = g.getIntersectionList(i, null);
            if (b.length) {
                R = b[b.length - 1]
            }
        }
        if (!R) {
            return null
        }
        while (R.parentNode && R != g.parentNode && !R.raphael) {
            R = R.parentNode
        }
        R == S.canvas.parentNode && (R = g);
        R = R && R.raphael ? S.getById(R.raphaelid) : null;
        return R
    };
    ao.getElementsByBBox = function(b) {
        var d = this.set();
        this.forEach(function(g) {
            if (bi.isBBoxIntersect(g.getBBox(), b)) {
                d.push(g)
            }
        });
        return d
    };
    ao.getById = function(d) {
        var b = this.bottom;
        while (b) {
            if (b.id == d) {
                return b
            }
            b = b.next
        }
        return null
    };
    ao.forEach = function(g, b) {
        var d = this.bottom;
        while (d) {
            if (g.call(b, d) === false) {
                return this
            }
            d = d.next
        }
        return this
    };
    ao.getElementsByPoint = function(b, g) {
        var d = this.set();
        this.forEach(function(i) {
            if (i.isPointInside(b, g)) {
                d.push(i)
            }
        });
        return d
    };

    function bx() {
        return this.x + bh + this.y
    }

    function a6() {
        return this.x + bh + this.y + bh + this.width + " \xd7 " + this.height
    }
    aq.isPointInside = function(b, g) {
        var d = this.realPath = af[this.type](this);
        if (this.attr("transform") && this.attr("transform").length) {
            d = bi.transformPath(d, this.attr("transform"))
        }
        return bi.isPointInsidePath(d, b, g)
    };
    aq.getBBox = function(d) {
        if (this.removed) {
            return {}
        }
        var b = this._;
        if (d) {
            if (b.dirty || !b.bboxwt) {
                this.realPath = af[this.type](this);
                b.bboxwt = I(this.realPath);
                b.bboxwt.toString = a6;
                b.dirty = 0
            }
            return b.bboxwt
        }
        if (b.dirty || b.dirtyT || !b.bbox) {
            if (b.dirty || !this.realPath) {
                b.bboxwt = 0;
                this.realPath = af[this.type](this)
            }
            b.bbox = I(Q(this.realPath, this.matrix));
            b.bbox.toString = a6;
            b.dirty = b.dirtyT = 0
        }
        return b.bbox
    };
    aq.clone = function() {
        if (this.removed) {
            return null
        }
        var b = this.paper[this.type]().attr(this.attr());
        this.__set__ && this.__set__.push(b);
        return b
    };
    aq.glow = function(bO) {
        if (this.type == "text") {
            return null
        }
        bO = bO || {};
        var g = {
                width: (bO.width || 10) + (+this.attr("stroke-width") || 1),
                fill: bO.fill || false,
                opacity: bO.opacity || 0.5,
                offsetx: bO.offsetx || 0,
                offsety: bO.offsety || 0,
                color: bO.color || "#000"
            },
            S = g.width / 2,
            E = this.paper,
            b = E.set(),
            R = this.realPath || af[this.type](this);
        R = this.matrix ? Q(R, this.matrix) : R;
        for (var d = 1; d < S + 1; d++) {
            b.push(E.path(R).attr({
                stroke: g.color,
                fill: g.fill ? g.color : "none",
                "stroke-linejoin": "round",
                "stroke-linecap": "round",
                "stroke-width": +(g.width / S * d).toFixed(3),
                opacity: +(g.opacity / S).toFixed(3)
            }))
        }
        return b.insertBefore(this).translate(g.offsetx, g.offsety)
    };
    var aZ = {},
        aO = function(d, b, E, i, bP, bO, S, R, g) {
            if (g == null) {
                return bb(d, b, E, i, bP, bO, S, R)
            } else {
                return bi.findDotsAtSegment(d, b, E, i, bP, bO, S, R, aK(d, b, E, i, bP, bO, S, R, g))
            }
        },
        aD = function(b, d) {
            return function(bW, R, S) {
                bW = bk(bW);
                var bS, bR, g, bO, E = "",
                    bV = {},
                    bT, bQ = 0;
                for (var bP = 0, bU = bW.length; bP < bU; bP++) {
                    g = bW[bP];
                    if (g[0] == "M") {
                        bS = +g[1];
                        bR = +g[2]
                    } else {
                        bO = aO(bS, bR, g[1], g[2], g[3], g[4], g[5], g[6]);
                        if (bQ + bO > R) {
                            if (d && !bV.start) {
                                bT = aO(bS, bR, g[1], g[2], g[3], g[4], g[5], g[6], R - bQ);
                                E += ["C" + bT.start.x, bT.start.y, bT.m.x, bT.m.y, bT.x, bT.y];
                                if (S) {
                                    return E
                                }
                                bV.start = E;
                                E = ["M" + bT.x, bT.y + "C" + bT.n.x, bT.n.y, bT.end.x, bT.end.y, g[5], g[6]].join();
                                bQ += bO;
                                bS = +g[5];
                                bR = +g[6];
                                continue
                            }
                            if (!b && !d) {
                                bT = aO(bS, bR, g[1], g[2], g[3], g[4], g[5], g[6], R - bQ);
                                return {
                                    x: bT.x,
                                    y: bT.y,
                                    alpha: bT.alpha
                                }
                            }
                        }
                        bQ += bO;
                        bS = +g[5];
                        bR = +g[6]
                    }
                    E += g.shift() + g
                }
                bV.end = E;
                bT = b ? bQ : d ? bV : bi.findDotsAtSegment(bS, bR, g[0], g[1], g[2], g[3], g[4], g[5], 1);
                bT.alpha && (bT = {
                    x: bT.x,
                    y: bT.y,
                    alpha: bT.alpha
                });
                return bT
            }
        };
    var bG = aD(1),
        by = aD(),
        aB = aD(0, 1);
    bi.getTotalLength = bG;
    bi.getPointAtLength = by;
    bi.getSubpath = function(d, i, g) {
        if (this.getTotalLength(d) - g < 0.000001) {
            return aB(d, i).end
        }
        var b = aB(d, g, 1);
        return i ? aB(b, i).end : b
    };
    aq.getTotalLength = function() {
        var b = this.getPath();
        if (!b) {
            return
        }
        if (this.node.getTotalLength) {
            return this.node.getTotalLength()
        }
        return bG(b)
    };
    aq.getPointAtLength = function(b) {
        var d = this.getPath();
        if (!d) {
            return
        }
        return by(d, b)
    };
    aq.getPath = function() {
        var d, b = bi._getPath[this.type];
        if (this.type == "text" || this.type == "set") {
            return
        }
        if (b) {
            d = b(this)
        }
        return d
    };
    aq.getSubpath = function(g, d) {
        var b = this.getPath();
        if (!b) {
            return
        }
        return bi.getSubpath(b, g, d)
    };
    var aG = bi.easing_formulas = {
        linear: function(b) {
            return b
        },
        "<": function(b) {
            return aS(b, 1.7)
        },
        ">": function(b) {
            return aS(b, 0.48)
        },
        "<>": function(bO) {
            var i = 0.48 - bO / 1.04,
                g = aI.sqrt(0.1734 + i * i),
                b = g - i,
                S = aS(ak(b), 1 / 3) * (b < 0 ? -1 : 1),
                R = -g - i,
                E = aS(ak(R), 1 / 3) * (R < 0 ? -1 : 1),
                d = S + E + 0.5;
            return (1 - d) * 3 * d * d + d * d * d
        },
        backIn: function(d) {
            var b = 1.70158;
            return d * d * ((b + 1) * d - b)
        },
        backOut: function(d) {
            d = d - 1;
            var b = 1.70158;
            return d * d * ((b + 1) * d + b) + 1
        },
        elastic: function(b) {
            if (b == !!b) {
                return b
            }
            return aS(2, -10 * b) * aI.sin((b - 0.075) * (2 * ag) / 0.3) + 1
        },
        bounce: function(i) {
            var d = 7.5625,
                g = 2.75,
                b;
            if (i < (1 / g)) {
                b = d * i * i
            } else {
                if (i < (2 / g)) {
                    i -= (1.5 / g);
                    b = d * i * i + 0.75
                } else {
                    if (i < (2.5 / g)) {
                        i -= (2.25 / g);
                        b = d * i * i + 0.9375
                    } else {
                        i -= (2.625 / g);
                        b = d * i * i + 0.984375
                    }
                }
            }
            return b
        }
    };
    aG.easeIn = aG["ease-in"] = aG["<"];
    aG.easeOut = aG["ease-out"] = aG[">"];
    aG.easeInOut = aG["ease-in-out"] = aG["<>"];
    aG["back-in"] = aG.backIn;
    aG["back-out"] = aG.backOut;
    var bF = [],
        bH = aT.requestAnimationFrame || aT.webkitRequestAnimationFrame || aT.mozRequestAnimationFrame || aT.oRequestAnimationFrame || aT.msRequestAnimationFrame || function(b) {
            setTimeout(b, 16)
        },
        at = function() {
            var bO = +new Date,
                bW = 0;
            for (; bW < bF.length; bW++) {
                var b2 = bF[bW];
                if (b2.el.removed || b2.paused) {
                    continue
                }
                var E = bO - b2.start,
                    bU = b2.ms,
                    bT = b2.easing,
                    bX = b2.from,
                    bR = b2.diff,
                    d = b2.to,
                    bQ = b2.t,
                    S = b2.el,
                    bS = {},
                    b, b0 = {},
                    b4;
                if (b2.initstatus) {
                    E = (b2.initstatus * b2.anim.top - b2.prev) / (b2.percent - b2.prev) * bU;
                    b2.status = b2.initstatus;
                    delete b2.initstatus;
                    b2.stop && bF.splice(bW--, 1)
                } else {
                    b2.status = (b2.prev + (b2.percent - b2.prev) * (E / bU)) / b2.anim.top
                }
                if (E < 0) {
                    continue
                }
                if (E < bU) {
                    var g = bT(E / bU);
                    for (var bV in bX) {
                        if (bX[bw](bV)) {
                            switch (bo[bV]) {
                                case bj:
                                    b = +bX[bV] + g * bU * bR[bV];
                                    break;
                                case "colour":
                                    b = "rgb(" + [a1(C(bX[bV].r + g * bU * bR[bV].r)), a1(C(bX[bV].g + g * bU * bR[bV].g)), a1(C(bX[bV].b + g * bU * bR[bV].b))].join(",") + ")";
                                    break;
                                case "path":
                                    b = [];
                                    for (var bZ = 0, bP = bX[bV].length; bZ < bP; bZ++) {
                                        b[bZ] = [bX[bV][bZ][0]];
                                        for (var bY = 1, b1 = bX[bV][bZ].length; bY < b1; bY++) {
                                            b[bZ][bY] = +bX[bV][bZ][bY] + g * bU * bR[bV][bZ][bY]
                                        }
                                        b[bZ] = b[bZ].join(bh)
                                    }
                                    b = b.join(bh);
                                    break;
                                case "transform":
                                    if (bR[bV].real) {
                                        b = [];
                                        for (bZ = 0, bP = bX[bV].length; bZ < bP; bZ++) {
                                            b[bZ] = [bX[bV][bZ][0]];
                                            for (bY = 1, b1 = bX[bV][bZ].length; bY < b1; bY++) {
                                                b[bZ][bY] = bX[bV][bZ][bY] + g * bU * bR[bV][bZ][bY]
                                            }
                                        }
                                    } else {
                                        var b3 = function(b5) {
                                            return +bX[bV][b5] + g * bU * bR[bV][b5]
                                        };
                                        b = [
                                            ["m", b3(0), b3(1), b3(2), b3(3), b3(4), b3(5)]
                                        ]
                                    }
                                    break;
                                case "csv":
                                    if (bV == "clip-rect") {
                                        b = [];
                                        bZ = 4;
                                        while (bZ--) {
                                            b[bZ] = +bX[bV][bZ] + g * bU * bR[bV][bZ]
                                        }
                                    }
                                    break;
                                default:
                                    var R = [][av](bX[bV]);
                                    b = [];
                                    bZ = S.paper.customAttributes[bV].length;
                                    while (bZ--) {
                                        b[bZ] = +R[bZ] + g * bU * bR[bV][bZ]
                                    }
                                    break
                            }
                            bS[bV] = b
                        }
                    }
                    S.attr(bS);
                    (function(b6, i, b5) {
                        setTimeout(function() {
                            bc("raphael.anim.frame." + b6, i, b5)
                        })
                    })(S.id, S, b2.anim)
                } else {
                    (function(b6, b5, i) {
                        setTimeout(function() {
                            bc("raphael.anim.frame." + b5.id, b5, i);
                            bc("raphael.anim.finish." + b5.id, b5, i);
                            bi.is(b6, "function") && b6.call(b5)
                        })
                    })(b2.callback, S, b2.anim);
                    S.attr(d);
                    bF.splice(bW--, 1);
                    if (b2.repeat > 1 && !b2.next) {
                        for (b4 in d) {
                            if (d[bw](b4)) {
                                b0[b4] = b2.totalOrigin[b4]
                            }
                        }
                        b2.el.attr(b0);
                        T(b2.anim, b2.el, b2.anim.percents[0], null, b2.totalOrigin, b2.repeat - 1)
                    }
                    if (b2.next && !b2.stop) {
                        T(b2.anim, b2.el, b2.next, null, b2.totalOrigin, b2.repeat)
                    }
                }
            }
            bi.svg && S && S.paper && S.paper.safari();
            bF.length && bH(at)
        },
        a1 = function(b) {
            return b > 255 ? 255 : b < 0 ? 0 : b
        };
    aq.animateWith = function(d, E, g, b, bO, bT) {
        var S = this;
        if (S.removed) {
            bT && bT.call(S);
            return S
        }
        var bR = g instanceof f ? g : bi.animation(g, b, bO, bT),
            bQ, bP;
        T(bR, S, bR.percents[0], null, S.attr());
        for (var R = 0, bS = bF.length; R < bS; R++) {
            if (bF[R].anim == E && bF[R].el == d) {
                bF[bS - 1].start = bF[R].start;
                break
            }
        }
        return S
    };

    function a0(bU, i, d, bT, bS, bO) {
        var bP = 3 * i,
            bR = 3 * (bT - i) - bP,
            b = 1 - bP - bR,
            S = 3 * d,
            bQ = 3 * (bS - d) - S,
            bV = 1 - S - bQ;

        function R(bW) {
            return ((b * bW + bR) * bW + bP) * bW
        }

        function g(bW, bY) {
            var bX = E(bW, bY);
            return ((bV * bX + bQ) * bX + S) * bX
        }

        function E(bW, b3) {
            var b2, b1, bZ, bX, b0, bY;
            for (bZ = bW, bY = 0; bY < 8; bY++) {
                bX = R(bZ) - bW;
                if (ak(bX) < b3) {
                    return bZ
                }
                b0 = (3 * b * bZ + 2 * bR) * bZ + bP;
                if (ak(b0) < 0.000001) {
                    break
                }
                bZ = bZ - bX / b0
            }
            b2 = 0;
            b1 = 1;
            bZ = bW;
            if (bZ < b2) {
                return b2
            }
            if (bZ > b1) {
                return b1
            }
            while (b2 < b1) {
                bX = R(bZ);
                if (ak(bX - bW) < b3) {
                    return bZ
                }
                if (bW > bX) {
                    b2 = bZ
                } else {
                    b1 = bZ
                }
                bZ = (b1 - b2) / 2 + b2
            }
            return bZ
        }
        return g(bU, 1 / (200 * bO))
    }
    aq.onAnimation = function(b) {
        b ? bc.on("raphael.anim.frame." + this.id, b) : bc.unbind("raphael.anim.frame." + this.id);
        return this
    };

    function f(E, g) {
        var d = [],
            i = {};
        this.ms = g;
        this.times = 1;
        if (E) {
            for (var b in E) {
                if (E[bw](b)) {
                    i[bM(b)] = E[b];
                    d.push(bM(b))
                }
            }
            d.sort(bu)
        }
        this.anim = i;
        this.top = d[d.length - 1];
        this.percents = d
    }
    f.prototype.delay = function(d) {
        var b = new f(this.anim, this.ms);
        b.times = this.times;
        b.del = +d || 0;
        return b
    };
    f.prototype.repeat = function(d) {
        var b = new f(this.anim, this.ms);
        b.del = this.del;
        b.times = aI.floor(bI(d, 0)) || 1;
        return b
    };

    function T(b6, g, b, b4, bO, bS) {
        b = bM(b);
        var cd, S, bR, ce = [],
            bY, bX, R, b0 = b6.ms,
            b5 = {},
            E = {},
            bU = {};
        if (b4) {
            for (b9 = 0, bT = bF.length; b9 < bT; b9++) {
                var cb = bF[b9];
                if (cb.el.id == g.id && cb.anim == b6) {
                    if (cb.percent != b) {
                        bF.splice(b9, 1);
                        bR = 1
                    } else {
                        S = cb
                    }
                    g.attr(cb.totalOrigin);
                    break
                }
            }
        } else {
            b4 = +E
        }
        for (var b9 = 0, bT = b6.percents.length; b9 < bT; b9++) {
            if (b6.percents[b9] == b || b6.percents[b9] > b4 * b6.top) {
                b = b6.percents[b9];
                bX = b6.percents[b9 - 1] || 0;
                b0 = b0 / b6.top * (b - bX);
                bY = b6.percents[b9 + 1];
                cd = b6.anim[b];
                break
            } else {
                if (b4) {
                    g.attr(b6.anim[b6.percents[b9]])
                }
            }
        }
        if (!cd) {
            return
        }
        if (!S) {
            for (var b2 in cd) {
                if (cd[bw](b2)) {
                    if (bo[bw](b2) || g.paper.customAttributes[bw](b2)) {
                        b5[b2] = g.attr(b2);
                        (b5[b2] == null) && (b5[b2] = bq[b2]);
                        E[b2] = cd[b2];
                        switch (bo[b2]) {
                            case bj:
                                bU[b2] = (E[b2] - b5[b2]) / b0;
                                break;
                            case "colour":
                                b5[b2] = bi.getRGB(b5[b2]);
                                var b3 = bi.getRGB(E[b2]);
                                bU[b2] = {
                                    r: (b3.r - b5[b2].r) / b0,
                                    g: (b3.g - b5[b2].g) / b0,
                                    b: (b3.b - b5[b2].b) / b0
                                };
                                break;
                            case "path":
                                var bP = bk(b5[b2], E[b2]),
                                    bW = bP[1];
                                b5[b2] = bP[0];
                                bU[b2] = [];
                                for (b9 = 0, bT = b5[b2].length; b9 < bT; b9++) {
                                    bU[b2][b9] = [0];
                                    for (var b8 = 1, ca = b5[b2][b9].length; b8 < ca; b8++) {
                                        bU[b2][b9][b8] = (bW[b9][b8] - b5[b2][b9][b8]) / b0
                                    }
                                }
                                break;
                            case "transform":
                                var cg = g._,
                                    cf = bd(cg[b2], E[b2]);
                                if (cf) {
                                    b5[b2] = cf.from;
                                    E[b2] = cf.to;
                                    bU[b2] = [];
                                    bU[b2].real = true;
                                    for (b9 = 0, bT = b5[b2].length; b9 < bT; b9++) {
                                        bU[b2][b9] = [b5[b2][b9][0]];
                                        for (b8 = 1, ca = b5[b2][b9].length; b8 < ca; b8++) {
                                            bU[b2][b9][b8] = (E[b2][b9][b8] - b5[b2][b9][b8]) / b0
                                        }
                                    }
                                } else {
                                    var b1 = (g.matrix || new a9),
                                        cc = {
                                            _: {
                                                transform: cg.transform
                                            },
                                            getBBox: function() {
                                                return g.getBBox(1)
                                            }
                                        };
                                    b5[b2] = [b1.a, b1.b, b1.c, b1.d, b1.e, b1.f];
                                    Y(cc, E[b2]);
                                    E[b2] = cc._.transform;
                                    bU[b2] = [(cc.matrix.a - b1.a) / b0, (cc.matrix.b - b1.b) / b0, (cc.matrix.c - b1.c) / b0, (cc.matrix.d - b1.d) / b0, (cc.matrix.e - b1.e) / b0, (cc.matrix.f - b1.f) / b0]
                                }
                                break;
                            case "csv":
                                var d = k(cd[b2])[l](bv),
                                    bQ = k(b5[b2])[l](bv);
                                if (b2 == "clip-rect") {
                                    b5[b2] = bQ;
                                    bU[b2] = [];
                                    b9 = bQ.length;
                                    while (b9--) {
                                        bU[b2][b9] = (d[b9] - b5[b2][b9]) / b0
                                    }
                                }
                                E[b2] = d;
                                break;
                            default:
                                d = [][av](cd[b2]);
                                bQ = [][av](b5[b2]);
                                bU[b2] = [];
                                b9 = g.paper.customAttributes[b2].length;
                                while (b9--) {
                                    bU[b2][b9] = ((d[b9] || 0) - (bQ[b9] || 0)) / b0
                                }
                                break
                        }
                    }
                }
            }
            var bZ = cd.easing,
                b7 = bi.easing_formulas[bZ];
            if (!b7) {
                b7 = k(bZ).match(an);
                if (b7 && b7.length == 5) {
                    var bV = b7;
                    b7 = function(i) {
                        return a0(i, +bV[1], +bV[2], +bV[3], +bV[4], b0)
                    }
                } else {
                    b7 = aw
                }
            }
            R = cd.start || b6.start || +new Date;
            cb = {
                anim: b6,
                percent: b,
                timestamp: R,
                start: R + (b6.del || 0),
                status: 0,
                initstatus: b4 || 0,
                stop: false,
                ms: b0,
                easing: b7,
                from: b5,
                diff: bU,
                to: E,
                el: g,
                callback: cd.callback,
                prev: bX,
                next: bY,
                repeat: bS || b6.times,
                origin: g.attr(),
                totalOrigin: bO
            };
            bF.push(cb);
            if (b4 && !S && !bR) {
                cb.stop = true;
                cb.start = new Date - b0 * b4;
                if (bF.length == 1) {
                    return at()
                }
            }
            if (bR) {
                cb.start = new Date - cb.ms * b4
            }
            bF.length == 1 && bH(at)
        } else {
            S.initstatus = b4;
            S.start = new Date - S.ms * b4
        }
        bc("raphael.anim.start." + g.id, g, b6)
    }
    bi.animation = function(E, d, S, R) {
        if (E instanceof f) {
            return E
        }
        if (bi.is(S, "function") || !S) {
            R = R || S || null;
            S = null
        }
        E = Object(E);
        d = +d || 0;
        var i = {},
            g, b;
        for (b in E) {
            if (E[bw](b) && bM(b) != b && bM(b) + "%" != b) {
                g = true;
                i[b] = E[b]
            }
        }
        if (!g) {
            return new f(E, d)
        } else {
            S && (i.easing = S);
            R && (i.callback = R);
            return new f({
                100: i
            }, d)
        }
    };
    aq.animate = function(i, b, R, E) {
        var d = this;
        if (d.removed) {
            E && E.call(d);
            return d
        }
        var g = i instanceof f ? i : bi.animation(i, b, R, E);
        T(g, d, g.percents[0], null, d.attr());
        return d
    };
    aq.setTime = function(d, b) {
        if (d && b != null) {
            this.status(d, ai(b, d.ms) / d.ms)
        }
        return this
    };
    aq.status = function(R, E) {
        var d = [],
            g = 0,
            b, S;
        if (E != null) {
            T(R, this, -1, ai(E, 1));
            return this
        } else {
            b = bF.length;
            for (; g < b; g++) {
                S = bF[g];
                if (S.el.id == this.id && (!R || S.anim == R)) {
                    if (R) {
                        return S.status
                    }
                    d.push({
                        anim: S.anim,
                        status: S.status
                    })
                }
            }
            if (R) {
                return 0
            }
            return d
        }
    };
    aq.pause = function(d) {
        for (var b = 0; b < bF.length; b++) {
            if (bF[b].el.id == this.id && (!d || bF[b].anim == d)) {
                if (bc("raphael.anim.pause." + this.id, this, bF[b].anim) !== false) {
                    bF[b].paused = true
                }
            }
        }
        return this
    };
    aq.resume = function(d) {
        for (var b = 0; b < bF.length; b++) {
            if (bF[b].el.id == this.id && (!d || bF[b].anim == d)) {
                var g = bF[b];
                if (bc("raphael.anim.resume." + this.id, this, g.anim) !== false) {
                    delete g.paused;
                    this.status(g.anim, g.status)
                }
            }
        }
        return this
    };
    aq.stop = function(d) {
        for (var b = 0; b < bF.length; b++) {
            if (bF[b].el.id == this.id && (!d || bF[b].anim == d)) {
                if (bc("raphael.anim.stop." + this.id, this, bF[b].anim) !== false) {
                    bF.splice(b--, 1)
                }
            }
        }
        return this
    };

    function be(d) {
        for (var b = 0; b < bF.length; b++) {
            if (bF[b].el.paper == d) {
                bF.splice(b--, 1)
            }
        }
    }
    bc.on("raphael.remove", be);
    bc.on("raphael.clear", be);
    aq.toString = function() {
        return "Rapha\xebl\u2019s object"
    };
    var X = function(b) {
            this.items = [];
            this.length = 0;
            this.type = "set";
            if (b) {
                for (var d = 0, g = b.length; d < g; d++) {
                    if (b[d] && (b[d].constructor == aq.constructor || b[d].constructor == X)) {
                        this[this.items.length] = this.items[this.items.length] = b[d];
                        this.length++
                    }
                }
            }
        },
        v = X.prototype;
    v.push = function() {
        var E, b;
        for (var d = 0, g = arguments.length; d < g; d++) {
            E = arguments[d];
            if (E && (E.constructor == aq.constructor || E.constructor == X)) {
                b = this.items.length;
                this[b] = this.items[b] = E;
                this.length++
            }
        }
        return this
    };
    v.pop = function() {
        this.length && delete this[this.length--];
        return this.items.pop()
    };
    v.forEach = function(E, b) {
        for (var d = 0, g = this.items.length; d < g; d++) {
            if (E.call(b, this.items[d], d) === false) {
                return this
            }
        }
        return this
    };
    for (var aF in aq) {
        if (aq[bw](aF)) {
            v[aF] = (function(b) {
                return function() {
                    var d = arguments;
                    return this.forEach(function(g) {
                        g[b][bs](g, d)
                    })
                }
            })(aF)
        }
    }
    v.attr = function(d, S) {
        if (d && bi.is(d, u) && bi.is(d[0], "object")) {
            for (var b = 0, R = d.length; b < R; b++) {
                this.items[b].attr(d[b])
            }
        } else {
            for (var g = 0, E = this.items.length; g < E; g++) {
                this.items[g].attr(d, S)
            }
        }
        return this
    };
    v.clear = function() {
        while (this.length) {
            this.pop()
        }
    };
    v.splice = function(E, bO, bP) {
        E = E < 0 ? bI(this.length + E, 0) : E;
        bO = bI(0, ai(this.length - E, bO));
        var g = [],
            b = [],
            d = [],
            R;
        for (R = 2; R < arguments.length; R++) {
            d.push(arguments[R])
        }
        for (R = 0; R < bO; R++) {
            b.push(this[E + R])
        }
        for (; R < this.length - E; R++) {
            g.push(this[E + R])
        }
        var S = d.length;
        for (R = 0; R < S + g.length; R++) {
            this.items[E + R] = this[E + R] = R < S ? d[R] : g[R - S]
        }
        R = this.items.length = this.length -= bO - S;
        while (this[R]) {
            delete this[R++]
        }
        return new X(b)
    };
    v.exclude = function(g) {
        for (var b = 0, d = this.length; b < d; b++) {
            if (this[b] == g) {
                this.splice(b, 1);
                return true
            }
        }
    };
    v.animate = function(g, b, bO, bQ) {
        (bi.is(bO, "function") || !bO) && (bQ = bO || null);
        var S = this.items.length,
            E = S,
            bR, bP = this,
            R;
        if (!S) {
            return this
        }
        bQ && (R = function() {
            !--S && bQ.call(bP)
        });
        bO = bi.is(bO, a) ? bO : R;
        var d = bi.animation(g, b, bO, R);
        bR = this.items[--E].animate(d);
        while (E--) {
            this.items[E] && !this.items[E].removed && this.items[E].animateWith(bR, d, d);
            (this.items[E] && !this.items[E].removed) || S--
        }
        return this
    };
    v.insertAfter = function(d) {
        var b = this.items.length;
        while (b--) {
            this.items[b].insertAfter(d)
        }
        return this
    };
    v.getBBox = function() {
        var b = [],
            S = [],
            d = [],
            E = [];
        for (var g = this.items.length; g--;) {
            if (!this.items[g].removed) {
                var R = this.items[g].getBBox();
                b.push(R.x);
                S.push(R.y);
                d.push(R.x + R.width);
                E.push(R.y + R.height)
            }
        }
        b = ai[bs](0, b);
        S = ai[bs](0, S);
        d = bI[bs](0, d);
        E = bI[bs](0, E);
        return {
            x: b,
            y: S,
            x2: d,
            y2: E,
            width: d - b,
            height: E - S
        }
    };
    v.clone = function(g) {
        g = this.paper.set();
        for (var b = 0, d = this.items.length; b < d; b++) {
            g.push(this.items[b].clone())
        }
        return g
    };
    v.toString = function() {
        return "Rapha\xebl\u2018s set"
    };
    v.glow = function(d) {
        var b = this.paper.set();
        this.forEach(function(i, E) {
            var R = i.glow(d);
            if (R != null) {
                R.forEach(function(g, S) {
                    b.push(g)
                })
            }
        });
        return b
    };
    v.isPointInside = function(b, g) {
        var d = false;
        this.forEach(function(i) {
            if (i.isPointInside(b, g)) {
                console.log("runned");
                d = true;
                return false
            }
        });
        return d
    };
    bi.registerFont = function(d) {
        if (!d.face) {
            return d
        }
        this.fonts = this.fonts || {};
        var i = {
                w: d.w,
                face: {},
                glyphs: {}
            },
            g = d.face["font-family"];
        for (var S in d.face) {
            if (d.face[bw](S)) {
                i.face[S] = d.face[S]
            }
        }
        if (this.fonts[g]) {
            this.fonts[g].push(i)
        } else {
            this.fonts[g] = [i]
        }
        if (!d.svg) {
            i.face["units-per-em"] = bK(d.face["units-per-em"], 10);
            for (var E in d.glyphs) {
                if (d.glyphs[bw](E)) {
                    var R = d.glyphs[E];
                    i.glyphs[E] = {
                        w: R.w,
                        k: {},
                        d: R.d && "M" + R.d.replace(/[mlcxtrv]/g, function(bO) {
                            return {
                                l: "L",
                                c: "C",
                                x: "z",
                                t: "m",
                                r: "l",
                                v: "c"
                            }[bO] || "M"
                        }) + "z"
                    };
                    if (R.k) {
                        for (var b in R.k) {
                            if (R[bw](b)) {
                                i.glyphs[E].k[b] = R.k[b]
                            }
                        }
                    }
                }
            }
        }
        return d
    };
    ao.getFont = function(bP, bQ, d, E) {
        E = E || "normal";
        d = d || "normal";
        bQ = +bQ || {
            normal: 400,
            bold: 700,
            lighter: 300,
            bolder: 800
        }[bQ] || 400;
        if (!bi.fonts) {
            return
        }
        var R = bi.fonts[bP];
        if (!R) {
            var g = new RegExp("(^|\\s)" + bP.replace(/[^\w\d\s+!~.:_-]/g, bn) + "(\\s|$)", "i");
            for (var b in bi.fonts) {
                if (bi.fonts[bw](b)) {
                    if (g.test(b)) {
                        R = bi.fonts[b];
                        break
                    }
                }
            }
        }
        var S;
        if (R) {
            for (var bO = 0, bR = R.length; bO < bR; bO++) {
                S = R[bO];
                if (S.face["font-weight"] == bQ && (S.face["font-style"] == d || !S.face["font-style"]) && S.face["font-stretch"] == E) {
                    break
                }
            }
        }
        return S
    };
    ao.print = function(bP, bO, b, bS, bU, b2, g, d) {
        b2 = b2 || "middle";
        g = bI(ai(g || 0, 1), -1);
        d = bI(ai(d || 1, 3), 1);
        var b1 = k(b)[l](bn),
            bY = 0,
            b0 = 0,
            bW = bn,
            b3;
        bi.is(bS, "string") && (bS = this.getFont(bS));
        if (bS) {
            b3 = (bU || 16) / bS.face["units-per-em"];
            var R = bS.face.bbox[l](bv),
                bR = +R[0],
                E = R[3] - R[1],
                S = 0,
                bT = +R[1] + (b2 == "baseline" ? E + (+bS.face.descent) : E / 2);
            for (var bX = 0, bQ = b1.length; bX < bQ; bX++) {
                if (b1[bX] == "\n") {
                    bY = 0;
                    bZ = 0;
                    b0 = 0;
                    S += E * d
                } else {
                    var bV = b0 && bS.glyphs[b1[bX - 1]] || {},
                        bZ = bS.glyphs[b1[bX]];
                    bY += b0 ? (bV.w || bS.w) + (bV.k && bV.k[b1[bX]] || 0) + (bS.w * g) : 0;
                    b0 = 1
                }
                if (bZ && bZ.d) {
                    bW += bi.transformPath(bZ.d, ["t", bY * b3, S * b3, "s", b3, b3, bR, bT, "t", (bP - bR) / b3, (bO - bT) / b3])
                }
            }
        }
        return this.path(bW).attr({
            fill: "#000",
            stroke: "none"
        })
    };
    ao.add = function(E) {
        if (bi.is(E, "array")) {
            var g = this.set(),
                d = 0,
                R = E.length,
                b;
            for (; d < R; d++) {
                b = E[d] || {};
                au[bw](b.type) && g.push(this[b.type]().attr(b))
            }
        }
        return g
    };
    bi.format = function(d, g) {
        var b = bi.is(g, u) ? [0][av](g) : arguments;
        d && bi.is(d, a) && b.length - 1 && (d = d.replace(W, function(R, E) {
            return b[++E] == null ? bn : b[E]
        }));
        return d || bn
    };
    bi.fullfill = (function() {
        var g = /\{([^\}]+)\}/g,
            b = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
            d = function(R, E, S) {
                var i = S;
                E.replace(b, function(bQ, bP, bO, bS, bR) {
                    bP = bP || bS;
                    if (i) {
                        if (bP in i) {
                            i = i[bP]
                        }
                        typeof i == "function" && bR && (i = i())
                    }
                });
                i = (i == null || i == S ? R : i) + "";
                return i
            };
        return function(E, i) {
            return String(E).replace(g, function(S, R) {
                return d(S, R, i)
            })
        }
    })();
    bi.ninja = function() {
        aE.was ? (a5.win.Raphael = aE.is) : delete Raphael;
        return bi
    };
    bi.st = v;
    (function(i, d, g) {
        if (i.readyState == null && i.addEventListener) {
            i.addEventListener(d, g = function() {
                i.removeEventListener(d, g, false);
                i.readyState = "complete"
            }, false);
            i.readyState = "loading"
        }

        function b() {
            (/in/).test(i.readyState) ? setTimeout(b, 9) : bi.eve("raphael.DOMload")
        }
        b()
    })(document, "DOMContentLoaded");
    bc.on("raphael.DOMload", function() {
        K = true
    });
    (function() {
        if (!bi.svg) {
            return
        }
        var i = "hasOwnProperty",
            b9 = String,
            bV = parseFloat,
            bY = parseInt,
            bO = Math,
            ca = bO.max,
            b0 = bO.abs,
            bQ = bO.pow,
            bP = /[, ]+/,
            b7 = bi.eve,
            bZ = "",
            bS = " ";
        var bW = "http://www.w3.org/1999/xlink",
            b6 = {
                block: "M5,0 0,2.5 5,5z",
                classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
                diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
                open: "M6,1 1,3.5 6,6",
                oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
            },
            b2 = {};
        bi.toString = function() {
            return "Your browser supports SVG.\nYou are running Rapha\xebl " + this.version
        };
        var bR = function(cb, E) {
                if (E) {
                    if (typeof cb == "string") {
                        cb = bR(cb)
                    }
                    for (var S in E) {
                        if (E[i](S)) {
                            if (S.substring(0, 6) == "xlink:") {
                                cb.setAttributeNS(bW, S.substring(6), b9(E[S]))
                            } else {
                                cb.setAttribute(S, b9(E[S]))
                            }
                        }
                    }
                } else {
                    cb = bi._g.doc.createElementNS("http://www.w3.org/2000/svg", cb);
                    cb.style && (cb.style.webkitTapHighlightColor = "rgba(0,0,0,0)")
                }
                return cb
            },
            b = function(ci, cm) {
                var ck = "linear",
                    S = ci.id + cm,
                    cg = 0.5,
                    ce = 0.5,
                    cc = ci.node,
                    E = ci.paper,
                    co = cc.style,
                    cb = bi._g.doc.getElementById(S);
                if (!cb) {
                    cm = b9(cm).replace(bi._radial_gradient, function(cr, cp, cs) {
                        ck = "radial";
                        if (cp && cs) {
                            cg = bV(cp);
                            ce = bV(cs);
                            var cq = ((ce > 0.5) * 2 - 1);
                            bQ(cg - 0.5, 2) + bQ(ce - 0.5, 2) > 0.25 && (ce = bO.sqrt(0.25 - bQ(cg - 0.5, 2)) * cq + 0.5) && ce != 0.5 && (ce = ce.toFixed(5) - 0.00001 * cq)
                        }
                        return bZ
                    });
                    cm = cm.split(/\s*\-\s*/);
                    if (ck == "linear") {
                        var cf = cm.shift();
                        cf = -bV(cf);
                        if (isNaN(cf)) {
                            return null
                        }
                        var cd = [0, 0, bO.cos(bi.rad(cf)), bO.sin(bi.rad(cf))],
                            cl = 1 / (ca(b0(cd[2]), b0(cd[3])) || 1);
                        cd[2] *= cl;
                        cd[3] *= cl;
                        if (cd[2] < 0) {
                            cd[0] = -cd[2];
                            cd[2] = 0
                        }
                        if (cd[3] < 0) {
                            cd[1] = -cd[3];
                            cd[3] = 0
                        }
                    }
                    var cj = bi._parseDots(cm);
                    if (!cj) {
                        return null
                    }
                    S = S.replace(/[\(\)\s,\xb0#]/g, "_");
                    if (ci.gradient && S != ci.gradient.id) {
                        E.defs.removeChild(ci.gradient);
                        delete ci.gradient
                    }
                    if (!ci.gradient) {
                        cb = bR(ck + "Gradient", {
                            id: S
                        });
                        ci.gradient = cb;
                        bR(cb, ck == "radial" ? {
                            fx: cg,
                            fy: ce
                        } : {
                            x1: cd[0],
                            y1: cd[1],
                            x2: cd[2],
                            y2: cd[3],
                            gradientTransform: ci.matrix.invert()
                        });
                        E.defs.appendChild(cb);
                        for (var ch = 0, cn = cj.length; ch < cn; ch++) {
                            cb.appendChild(bR("stop", {
                                offset: cj[ch].offset ? cj[ch].offset : ch ? "100%" : "0%",
                                "stop-color": cj[ch].color || "#fff"
                            }))
                        }
                    }
                }
                bR(cc, {
                    fill: "url(#" + S + ")",
                    opacity: 1,
                    "fill-opacity": 1
                });
                co.fill = bZ;
                co.opacity = 1;
                co.fillOpacity = 1;
                return 1
            },
            d = function(S) {
                var E = S.getBBox(1);
                bR(S.pattern, {
                    patternTransform: S.matrix.invert() + " translate(" + E.x + "," + E.y + ")"
                })
            },
            g = function(ck, cm, cf) {
                if (ck.type == "path") {
                    var E = b9(cm).toLowerCase().split("-"),
                        cj = ck.paper,
                        cx = cf ? "end" : "start",
                        co = ck.node,
                        cl = ck.attrs,
                        ce = cl["stroke-width"],
                        cs = E.length,
                        cc = "classic",
                        cr, cb, ch, cp, cn, cg = 3,
                        ct = 3,
                        ci = 5;
                    while (cs--) {
                        switch (E[cs]) {
                            case "block":
                            case "classic":
                            case "oval":
                            case "diamond":
                            case "open":
                            case "none":
                                cc = E[cs];
                                break;
                            case "wide":
                                ct = 5;
                                break;
                            case "narrow":
                                ct = 2;
                                break;
                            case "long":
                                cg = 5;
                                break;
                            case "short":
                                cg = 2;
                                break
                        }
                    }
                    if (cc == "open") {
                        cg += 2;
                        ct += 2;
                        ci += 2;
                        ch = 1;
                        cp = cf ? 4 : 1;
                        cn = {
                            fill: "none",
                            stroke: cl.stroke
                        }
                    } else {
                        cp = ch = cg / 2;
                        cn = {
                            fill: cl.stroke,
                            stroke: "none"
                        }
                    }
                    if (ck._.arrows) {
                        if (cf) {
                            ck._.arrows.endPath && b2[ck._.arrows.endPath] --;
                            ck._.arrows.endMarker && b2[ck._.arrows.endMarker] --
                        } else {
                            ck._.arrows.startPath && b2[ck._.arrows.startPath] --;
                            ck._.arrows.startMarker && b2[ck._.arrows.startMarker] --
                        }
                    } else {
                        ck._.arrows = {}
                    }
                    if (cc != "none") {
                        var S = "raphael-marker-" + cc,
                            cw = "raphael-marker-" + cx + cc + cg + ct;
                        if (!bi._g.doc.getElementById(S)) {
                            cj.defs.appendChild(bR(bR("path"), {
                                "stroke-linecap": "round",
                                d: b6[cc],
                                id: S
                            }));
                            b2[S] = 1
                        } else {
                            b2[S] ++
                        }
                        var cd = bi._g.doc.getElementById(cw),
                            cq;
                        if (!cd) {
                            cd = bR(bR("marker"), {
                                id: cw,
                                markerHeight: ct,
                                markerWidth: cg,
                                orient: "auto",
                                refX: cp,
                                refY: ct / 2
                            });
                            cq = bR(bR("use"), {
                                "xlink:href": "#" + S,
                                transform: (cf ? "rotate(180 " + cg / 2 + " " + ct / 2 + ") " : bZ) + "scale(" + cg / ci + "," + ct / ci + ")",
                                "stroke-width": (1 / ((cg / ci + ct / ci) / 2)).toFixed(4)
                            });
                            cd.appendChild(cq);
                            cj.defs.appendChild(cd);
                            b2[cw] = 1
                        } else {
                            b2[cw] ++;
                            cq = cd.getElementsByTagName("use")[0]
                        }
                        bR(cq, cn);
                        var cv = ch * (cc != "diamond" && cc != "oval");
                        if (cf) {
                            cr = ck._.arrows.startdx * ce || 0;
                            cb = bi.getTotalLength(cl.path) - cv * ce
                        } else {
                            cr = cv * ce;
                            cb = bi.getTotalLength(cl.path) - (ck._.arrows.enddx * ce || 0)
                        }
                        cn = {};
                        cn["marker-" + cx] = "url(#" + cw + ")";
                        if (cb || cr) {
                            cn.d = bi.getSubpath(cl.path, cr, cb)
                        }
                        bR(co, cn);
                        ck._.arrows[cx + "Path"] = S;
                        ck._.arrows[cx + "Marker"] = cw;
                        ck._.arrows[cx + "dx"] = cv;
                        ck._.arrows[cx + "Type"] = cc;
                        ck._.arrows[cx + "String"] = cm
                    } else {
                        if (cf) {
                            cr = ck._.arrows.startdx * ce || 0;
                            cb = bi.getTotalLength(cl.path) - cr
                        } else {
                            cr = 0;
                            cb = bi.getTotalLength(cl.path) - (ck._.arrows.enddx * ce || 0)
                        }
                        ck._.arrows[cx + "Path"] && bR(co, {
                            d: bi.getSubpath(cl.path, cr, cb)
                        });
                        delete ck._.arrows[cx + "Path"];
                        delete ck._.arrows[cx + "Marker"];
                        delete ck._.arrows[cx + "dx"];
                        delete ck._.arrows[cx + "Type"];
                        delete ck._.arrows[cx + "String"]
                    }
                    for (cn in b2) {
                        if (b2[i](cn) && !b2[cn]) {
                            var cu = bi._g.doc.getElementById(cn);
                            cu && cu.parentNode.removeChild(cu)
                        }
                    }
                }
            },
            b3 = {
                "": [0],
                none: [0],
                "-": [3, 1],
                ".": [1, 1],
                "-.": [3, 1, 1, 1],
                "-..": [3, 1, 1, 1, 1, 1],
                ". ": [1, 3],
                "- ": [4, 3],
                "--": [8, 3],
                "- .": [4, 3, 1, 3],
                "--.": [8, 3, 1, 3],
                "--..": [8, 3, 1, 3, 1, 3]
            },
            bT = function(cf, cd, ce) {
                cd = b3[b9(cd).toLowerCase()];
                if (cd) {
                    var cb = cf.attrs["stroke-width"] || "1",
                        E = {
                            round: cb,
                            square: cb,
                            butt: 0
                        }[cf.attrs["stroke-linecap"] || ce["stroke-linecap"]] || 0,
                        cc = [],
                        S = cd.length;
                    while (S--) {
                        cc[S] = cd[S] * cb + ((S % 2) ? 1 : -1) * E
                    }
                    bR(cf.node, {
                        "stroke-dasharray": cc.join(",")
                    })
                }
            },
            b4 = function(ck, cs) {
                var co = ck.node,
                    cl = ck.attrs,
                    ci = co.style.visibility;
                co.style.visibility = "hidden";
                for (var cn in cs) {
                    if (cs[i](cn)) {
                        if (!bi._availableAttrs[i](cn)) {
                            continue
                        }
                        var cm = cs[cn];
                        cl[cn] = cm;
                        switch (cn) {
                            case "blur":
                                ck.blur(cm);
                                break;
                            case "href":
                            case "title":
                                var cd = bR("title");
                                var ct = bi._g.doc.createTextNode(cm);
                                cd.appendChild(ct);
                                co.appendChild(cd);
                                break;
                            case "target":
                                var cq = co.parentNode;
                                if (cq.tagName.toLowerCase() != "a") {
                                    var cd = bR("a");
                                    cq.insertBefore(cd, co);
                                    cd.appendChild(co);
                                    cq = cd
                                }
                                if (cn == "target") {
                                    cq.setAttributeNS(bW, "show", cm == "blank" ? "new" : cm)
                                } else {
                                    cq.setAttributeNS(bW, cn, cm)
                                }
                                break;
                            case "cursor":
                                co.style.cursor = cm;
                                break;
                            case "transform":
                                ck.transform(cm);
                                break;
                            case "arrow-start":
                                g(ck, cm);
                                break;
                            case "arrow-end":
                                g(ck, cm, 1);
                                break;
                            case "clip-rect":
                                var S = b9(cm).split(bP);
                                if (S.length == 4) {
                                    ck.clip && ck.clip.parentNode.parentNode.removeChild(ck.clip.parentNode);
                                    var cb = bR("clipPath"),
                                        cp = bR("rect");
                                    cb.id = bi.createUUID();
                                    bR(cp, {
                                        x: S[0],
                                        y: S[1],
                                        width: S[2],
                                        height: S[3]
                                    });
                                    cb.appendChild(cp);
                                    ck.paper.defs.appendChild(cb);
                                    bR(co, {
                                        "clip-path": "url(#" + cb.id + ")"
                                    });
                                    ck.clip = cp
                                }
                                if (!cm) {
                                    var cj = co.getAttribute("clip-path");
                                    if (cj) {
                                        var cr = bi._g.doc.getElementById(cj.replace(/(^url\(#|\)$)/g, bZ));
                                        cr && cr.parentNode.removeChild(cr);
                                        bR(co, {
                                            "clip-path": bZ
                                        });
                                        delete ck.clip
                                    }
                                }
                                break;
                            case "path":
                                if (ck.type == "path") {
                                    bR(co, {
                                        d: cm ? cl.path = bi._pathToAbsolute(cm) : "M0,0"
                                    });
                                    ck._.dirty = 1;
                                    if (ck._.arrows) {
                                        "startString" in ck._.arrows && g(ck, ck._.arrows.startString);
                                        "endString" in ck._.arrows && g(ck, ck._.arrows.endString, 1)
                                    }
                                }
                                break;
                            case "width":
                                co.setAttribute(cn, cm);
                                ck._.dirty = 1;
                                if (cl.fx) {
                                    cn = "x";
                                    cm = cl.x
                                } else {
                                    break
                                }
                            case "x":
                                if (cl.fx) {
                                    cm = -cl.x - (cl.width || 0)
                                }
                            case "rx":
                                if (cn == "rx" && ck.type == "rect") {
                                    break
                                }
                            case "cx":
                                co.setAttribute(cn, cm);
                                ck.pattern && d(ck);
                                ck._.dirty = 1;
                                break;
                            case "height":
                                co.setAttribute(cn, cm);
                                ck._.dirty = 1;
                                if (cl.fy) {
                                    cn = "y";
                                    cm = cl.y
                                } else {
                                    break
                                }
                            case "y":
                                if (cl.fy) {
                                    cm = -cl.y - (cl.height || 0)
                                }
                            case "ry":
                                if (cn == "ry" && ck.type == "rect") {
                                    break
                                }
                            case "cy":
                                co.setAttribute(cn, cm);
                                ck.pattern && d(ck);
                                ck._.dirty = 1;
                                break;
                            case "r":
                                if (ck.type == "rect") {
                                    bR(co, {
                                        rx: cm,
                                        ry: cm
                                    })
                                } else {
                                    co.setAttribute(cn, cm)
                                }
                                ck._.dirty = 1;
                                break;
                            case "src":
                                if (ck.type == "image") {
                                    co.setAttributeNS(bW, "href", cm)
                                }
                                break;
                            case "stroke-width":
                                if (ck._.sx != 1 || ck._.sy != 1) {
                                    cm /= ca(b0(ck._.sx), b0(ck._.sy)) || 1
                                }
                                if (ck.paper._vbSize) {
                                    cm *= ck.paper._vbSize
                                }
                                co.setAttribute(cn, cm);
                                if (cl["stroke-dasharray"]) {
                                    bT(ck, cl["stroke-dasharray"], cs)
                                }
                                if (ck._.arrows) {
                                    "startString" in ck._.arrows && g(ck, ck._.arrows.startString);
                                    "endString" in ck._.arrows && g(ck, ck._.arrows.endString, 1)
                                }
                                break;
                            case "stroke-dasharray":
                                bT(ck, cm, cs);
                                break;
                            case "fill":
                                var ce = b9(cm).match(bi._ISURL);
                                if (ce) {
                                    cb = bR("pattern");
                                    var ch = bR("image");
                                    cb.id = bi.createUUID();
                                    bR(cb, {
                                        x: 0,
                                        y: 0,
                                        patternUnits: "userSpaceOnUse",
                                        height: 1,
                                        width: 1
                                    });
                                    bR(ch, {
                                        x: 0,
                                        y: 0,
                                        "xlink:href": ce[1]
                                    });
                                    cb.appendChild(ch);
                                    (function(cu) {
                                        bi._preload(ce[1], function() {
                                            var cv = this.offsetWidth,
                                                cw = this.offsetHeight;
                                            bR(cu, {
                                                width: cv,
                                                height: cw
                                            });
                                            bR(ch, {
                                                width: cv,
                                                height: cw
                                            });
                                            ck.paper.safari()
                                        })
                                    })(cb);
                                    ck.paper.defs.appendChild(cb);
                                    bR(co, {
                                        fill: "url(#" + cb.id + ")"
                                    });
                                    ck.pattern = cb;
                                    ck.pattern && d(ck);
                                    break
                                }
                                var cc = bi.getRGB(cm);
                                if (!cc.error) {
                                    delete cs.gradient;
                                    delete cl.gradient;
                                    !bi.is(cl.opacity, "undefined") && bi.is(cs.opacity, "undefined") && bR(co, {
                                        opacity: cl.opacity
                                    });
                                    !bi.is(cl["fill-opacity"], "undefined") && bi.is(cs["fill-opacity"], "undefined") && bR(co, {
                                        "fill-opacity": cl["fill-opacity"]
                                    })
                                } else {
                                    if ((ck.type == "circle" || ck.type == "ellipse" || b9(cm).charAt() != "r") && b(ck, cm)) {
                                        if ("opacity" in cl || "fill-opacity" in cl) {
                                            var E = bi._g.doc.getElementById(co.getAttribute("fill").replace(/^url\(#|\)$/g, bZ));
                                            if (E) {
                                                var cf = E.getElementsByTagName("stop");
                                                bR(cf[cf.length - 1], {
                                                    "stop-opacity": ("opacity" in cl ? cl.opacity : 1) * ("fill-opacity" in cl ? cl["fill-opacity"] : 1)
                                                })
                                            }
                                        }
                                        cl.gradient = cm;
                                        cl.fill = "none";
                                        break
                                    }
                                }
                                cc[i]("opacity") && bR(co, {
                                    "fill-opacity": cc.opacity > 1 ? cc.opacity / 100 : cc.opacity
                                });
                            case "stroke":
                                cc = bi.getRGB(cm);
                                co.setAttribute(cn, cc.hex);
                                cn == "stroke" && cc[i]("opacity") && bR(co, {
                                    "stroke-opacity": cc.opacity > 1 ? cc.opacity / 100 : cc.opacity
                                });
                                if (cn == "stroke" && ck._.arrows) {
                                    "startString" in ck._.arrows && g(ck, ck._.arrows.startString);
                                    "endString" in ck._.arrows && g(ck, ck._.arrows.endString, 1)
                                }
                                break;
                            case "gradient":
                                (ck.type == "circle" || ck.type == "ellipse" || b9(cm).charAt() != "r") && b(ck, cm);
                                break;
                            case "opacity":
                                if (cl.gradient && !cl[i]("stroke-opacity")) {
                                    bR(co, {
                                        "stroke-opacity": cm > 1 ? cm / 100 : cm
                                    })
                                }
                            case "fill-opacity":
                                if (cl.gradient) {
                                    E = bi._g.doc.getElementById(co.getAttribute("fill").replace(/^url\(#|\)$/g, bZ));
                                    if (E) {
                                        cf = E.getElementsByTagName("stop");
                                        bR(cf[cf.length - 1], {
                                            "stop-opacity": cm
                                        })
                                    }
                                    break
                                }
                            default:
                                cn == "font-size" && (cm = bY(cm, 10) + "px");
                                var cg = cn.replace(/(\-.)/g, function(cu) {
                                    return cu.substring(1).toUpperCase()
                                });
                                co.style[cg] = cm;
                                ck._.dirty = 1;
                                co.setAttribute(cn, cm);
                                break
                        }
                    }
                }
                bX(ck, cs);
                co.style.visibility = ci
            },
            b8 = 1.2,
            bX = function(E, cd) {
                if (E.type != "text" || !(cd[i]("text") || cd[i]("font") || cd[i]("font-size") || cd[i]("x") || cd[i]("y"))) {
                    return
                }
                var ci = E.attrs,
                    cb = E.node,
                    ck = cb.firstChild ? bY(bi._g.doc.defaultView.getComputedStyle(cb.firstChild, bZ).getPropertyValue("font-size"), 10) : 10;
                if (cd[i]("text")) {
                    ci.text = cd.text;
                    while (cb.firstChild) {
                        cb.removeChild(cb.firstChild)
                    }
                    var cc = b9(cd.text).split("\n"),
                        S = [],
                        cg;
                    for (var ce = 0, cj = cc.length; ce < cj; ce++) {
                        cg = bR("tspan");
                        ce && bR(cg, {
                            dy: ck * b8,
                            x: ci.x
                        });
                        cg.appendChild(bi._g.doc.createTextNode(cc[ce]));
                        cb.appendChild(cg);
                        S[ce] = cg
                    }
                } else {
                    S = cb.getElementsByTagName("tspan");
                    for (ce = 0, cj = S.length; ce < cj; ce++) {
                        if (ce) {
                            bR(S[ce], {
                                dy: ck * b8,
                                x: ci.x
                            })
                        } else {
                            bR(S[0], {
                                dy: 0
                            })
                        }
                    }
                }
                bR(cb, {
                    x: ci.x,
                    y: ci.y
                });
                E._.dirty = 1;
                var cf = E._getBBox(),
                    ch = ci.y - (cf.y + cf.height / 2);
                ch && bi.is(ch, "finite") && bR(S[0], {
                    dy: ch
                })
            },
            b1 = function(S, E) {
                var cc = 0,
                    cb = 0;
                this[0] = this.node = S;
                S.raphael = true;
                this.id = bi._oid++;
                S.raphaelid = this.id;
                this.matrix = bi.matrix();
                this.realPath = null;
                this.paper = E;
                this.attrs = this.attrs || {};
                this._ = {
                    transform: [],
                    sx: 1,
                    sy: 1,
                    deg: 0,
                    dx: 0,
                    dy: 0,
                    dirty: 1
                };
                !E.bottom && (E.bottom = this);
                this.prev = E.top;
                E.top && (E.top.next = this);
                E.top = this;
                this.next = null
            },
            bU = bi.el;
        b1.prototype = bU;
        bU.constructor = b1;
        bi._engine.path = function(E, cc) {
            var S = bR("path");
            cc.canvas && cc.canvas.appendChild(S);
            var cb = new b1(S, cc);
            cb.type = "path";
            b4(cb, {
                fill: "none",
                stroke: "#000",
                path: E
            });
            return cb
        };
        bU.rotate = function(S, E, cc) {
            if (this.removed) {
                return this
            }
            S = b9(S).split(bP);
            if (S.length - 1) {
                E = bV(S[1]);
                cc = bV(S[2])
            }
            S = bV(S[0]);
            (cc == null) && (E = cc);
            if (E == null || cc == null) {
                var cb = this.getBBox(1);
                E = cb.x + cb.width / 2;
                cc = cb.y + cb.height / 2
            }
            this.transform(this._.transform.concat([
                ["r", S, E, cc]
            ]));
            return this
        };
        bU.scale = function(cd, cb, E, cc) {
            if (this.removed) {
                return this
            }
            cd = b9(cd).split(bP);
            if (cd.length - 1) {
                cb = bV(cd[1]);
                E = bV(cd[2]);
                cc = bV(cd[3])
            }
            cd = bV(cd[0]);
            (cb == null) && (cb = cd);
            (cc == null) && (E = cc);
            if (E == null || cc == null) {
                var S = this.getBBox(1)
            }
            E = E == null ? S.x + S.width / 2 : E;
            cc = cc == null ? S.y + S.height / 2 : cc;
            this.transform(this._.transform.concat([
                ["s", cd, cb, E, cc]
            ]));
            return this
        };
        bU.translate = function(S, E) {
            if (this.removed) {
                return this
            }
            S = b9(S).split(bP);
            if (S.length - 1) {
                E = bV(S[1])
            }
            S = bV(S[0]) || 0;
            E = +E || 0;
            this.transform(this._.transform.concat([
                ["t", S, E]
            ]));
            return this
        };
        bU.transform = function(S) {
            var cb = this._;
            if (S == null) {
                return cb.transform
            }
            bi._extractTransform(this, S);
            this.clip && bR(this.clip, {
                transform: this.matrix.invert()
            });
            this.pattern && d(this);
            this.node && bR(this.node, {
                transform: this.matrix
            });
            if (cb.sx != 1 || cb.sy != 1) {
                var E = this.attrs[i]("stroke-width") ? this.attrs["stroke-width"] : 1;
                this.attr({
                    "stroke-width": E
                })
            }
            return this
        };
        bU.hide = function() {
            !this.removed && this.paper.safari(this.node.style.display = "none");
            return this
        };
        bU.show = function() {
            !this.removed && this.paper.safari(this.node.style.display = "");
            return this
        };
        bU.remove = function() {
            if (this.removed || !this.node.parentNode) {
                return
            }
            var S = this.paper;
            S.__set__ && S.__set__.exclude(this);
            b7.unbind("raphael.*.*." + this.id);
            if (this.gradient) {
                S.defs.removeChild(this.gradient)
            }
            bi._tear(this, S);
            if (this.node.parentNode.tagName.toLowerCase() == "a") {
                this.node.parentNode.parentNode.removeChild(this.node.parentNode)
            } else {
                this.node.parentNode.removeChild(this.node)
            }
            for (var E in this) {
                this[E] = typeof this[E] == "function" ? bi._removedFactory(E) : null
            }
            this.removed = true
        };
        bU._getBBox = function() {
            if (this.node.style.display == "none") {
                this.show();
                var E = true
            }
            var cb = {};
            try {
                cb = this.node.getBBox()
            } catch (S) {} finally {
                cb = cb || {}
            }
            E && this.hide();
            return cb
        };
        bU.attr = function(E, ci) {
            if (this.removed) {
                return this
            }
            if (E == null) {
                var cf = {};
                for (var ch in this.attrs) {
                    if (this.attrs[i](ch)) {
                        cf[ch] = this.attrs[ch]
                    }
                }
                cf.gradient && cf.fill == "none" && (cf.fill = cf.gradient) && delete cf.gradient;
                cf.transform = this._.transform;
                return cf
            }
            if (ci == null && bi.is(E, "string")) {
                if (E == "fill" && this.attrs.fill == "none" && this.attrs.gradient) {
                    return this.attrs.gradient
                }
                if (E == "transform") {
                    return this._.transform
                }
                var cg = E.split(bP),
                    cc = {};
                for (var cd = 0, ck = cg.length; cd < ck; cd++) {
                    E = cg[cd];
                    if (E in this.attrs) {
                        cc[E] = this.attrs[E]
                    } else {
                        if (bi.is(this.paper.customAttributes[E], "function")) {
                            cc[E] = this.paper.customAttributes[E].def
                        } else {
                            cc[E] = bi._availableAttrs[E]
                        }
                    }
                }
                return ck - 1 ? cc : cc[cg[0]]
            }
            if (ci == null && bi.is(E, "array")) {
                cc = {};
                for (cd = 0, ck = E.length; cd < ck; cd++) {
                    cc[E[cd]] = this.attr(E[cd])
                }
                return cc
            }
            if (ci != null) {
                var S = {};
                S[E] = ci
            } else {
                if (E != null && bi.is(E, "object")) {
                    S = E
                }
            }
            for (var cj in S) {
                b7("raphael.attr." + cj + "." + this.id, this, S[cj])
            }
            for (cj in this.paper.customAttributes) {
                if (this.paper.customAttributes[i](cj) && S[i](cj) && bi.is(this.paper.customAttributes[cj], "function")) {
                    var ce = this.paper.customAttributes[cj].apply(this, [].concat(S[cj]));
                    this.attrs[cj] = S[cj];
                    for (var cb in ce) {
                        if (ce[i](cb)) {
                            S[cb] = ce[cb]
                        }
                    }
                }
            }
            b4(this, S);
            return this
        };
        bU.toFront = function() {
            if (this.removed) {
                return this
            }
            if (this.node.parentNode.tagName.toLowerCase() == "a") {
                this.node.parentNode.parentNode.appendChild(this.node.parentNode)
            } else {
                this.node.parentNode.appendChild(this.node)
            }
            var E = this.paper;
            E.top != this && bi._tofront(this, E);
            return this
        };
        bU.toBack = function() {
            if (this.removed) {
                return this
            }
            var S = this.node.parentNode;
            if (S.tagName.toLowerCase() == "a") {
                S.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild)
            } else {
                if (S.firstChild != this.node) {
                    S.insertBefore(this.node, this.node.parentNode.firstChild)
                }
            }
            bi._toback(this, this.paper);
            var E = this.paper;
            return this
        };
        bU.insertAfter = function(E) {
            if (this.removed) {
                return this
            }
            var S = E.node || E[E.length - 1].node;
            if (S.nextSibling) {
                S.parentNode.insertBefore(this.node, S.nextSibling)
            } else {
                S.parentNode.appendChild(this.node)
            }
            bi._insertafter(this, E, this.paper);
            return this
        };
        bU.insertBefore = function(E) {
            if (this.removed) {
                return this
            }
            var S = E.node || E[0].node;
            S.parentNode.insertBefore(this.node, S);
            bi._insertbefore(this, E, this.paper);
            return this
        };
        bU.blur = function(S) {
            var E = this;
            if (+S !== 0) {
                var cb = bR("filter"),
                    cc = bR("feGaussianBlur");
                E.attrs.blur = S;
                cb.id = bi.createUUID();
                bR(cc, {
                    stdDeviation: +S || 1.5
                });
                cb.appendChild(cc);
                E.paper.defs.appendChild(cb);
                E._blur = cb;
                bR(E.node, {
                    filter: "url(#" + cb.id + ")"
                })
            } else {
                if (E._blur) {
                    E._blur.parentNode.removeChild(E._blur);
                    delete E._blur;
                    delete E.attrs.blur
                }
                E.node.removeAttribute("filter")
            }
            return E
        };
        bi._engine.circle = function(S, E, ce, cd) {
            var cc = bR("circle");
            S.canvas && S.canvas.appendChild(cc);
            var cb = new b1(cc, S);
            cb.attrs = {
                cx: E,
                cy: ce,
                r: cd,
                fill: "none",
                stroke: "#000"
            };
            cb.type = "circle";
            bR(cc, cb.attrs);
            return cb
        };
        bi._engine.rect = function(cb, E, cg, S, ce, cf) {
            var cd = bR("rect");
            cb.canvas && cb.canvas.appendChild(cd);
            var cc = new b1(cd, cb);
            cc.attrs = {
                x: E,
                y: cg,
                width: S,
                height: ce,
                r: cf || 0,
                rx: cf || 0,
                ry: cf || 0,
                fill: "none",
                stroke: "#000"
            };
            cc.type = "rect";
            bR(cd, cc.attrs);
            return cc
        };
        bi._engine.ellipse = function(S, E, cf, ce, cd) {
            var cc = bR("ellipse");
            S.canvas && S.canvas.appendChild(cc);
            var cb = new b1(cc, S);
            cb.attrs = {
                cx: E,
                cy: cf,
                rx: ce,
                ry: cd,
                fill: "none",
                stroke: "#000"
            };
            cb.type = "ellipse";
            bR(cc, cb.attrs);
            return cb
        };
        bi._engine.image = function(cb, cf, E, cg, S, ce) {
            var cd = bR("image");
            bR(cd, {
                x: E,
                y: cg,
                width: S,
                height: ce,
                preserveAspectRatio: "none"
            });
            cd.setAttributeNS(bW, "href", cf);
            cb.canvas && cb.canvas.appendChild(cd);
            var cc = new b1(cd, cb);
            cc.attrs = {
                x: E,
                y: cg,
                width: S,
                height: ce,
                src: cf
            };
            cc.type = "image";
            return cc
        };
        bi._engine.text = function(S, E, ce, cd) {
            var cc = bR("text");
            S.canvas && S.canvas.appendChild(cc);
            var cb = new b1(cc, S);
            cb.attrs = {
                x: E,
                y: ce,
                "text-anchor": "middle",
                text: cd,
                font: bi._availableAttrs.font,
                stroke: "none",
                fill: "#000"
            };
            cb.type = "text";
            b4(cb, cb.attrs);
            return cb
        };
        bi._engine.setSize = function(S, E) {
            this.width = S || this.width;
            this.height = E || this.height;
            this.canvas.setAttribute("width", this.width);
            this.canvas.setAttribute("height", this.height);
            if (this._viewBox) {
                this.setViewBox.apply(this, this._viewBox)
            }
            return this
        };
        bi._engine.create = function() {
            var cc = bi._getContainer.apply(0, arguments),
                S = cc && cc.container,
                cg = cc.x,
                cf = cc.y,
                cb = cc.width,
                ch = cc.height;
            if (!S) {
                throw new Error("SVG container not found.")
            }
            var E = bR("svg"),
                ce = "overflow:hidden;",
                cd;
            cg = cg || 0;
            cf = cf || 0;
            cb = cb || 512;
            ch = ch || 342;
            bR(E, {
                height: ch,
                version: 1.1,
                width: cb,
                xmlns: "http://www.w3.org/2000/svg"
            });
            if (S == 1) {
                E.style.cssText = ce + "position:absolute;left:" + cg + "px;top:" + cf + "px";
                bi._g.doc.body.appendChild(E);
                cd = 1
            } else {
                E.style.cssText = ce + "position:relative";
                if (S.firstChild) {
                    S.insertBefore(E, S.firstChild)
                } else {
                    S.appendChild(E)
                }
            }
            S = new bi._Paper;
            S.width = cb;
            S.height = ch;
            S.canvas = E;
            S.clear();
            S._left = S._top = 0;
            cd && (S.renderfix = function() {});
            S.renderfix();
            return S
        };
        bi._engine.setViewBox = function(ce, cc, cg, E, S) {
            b7("raphael.setViewBox", this, this._viewBox, [ce, cc, cg, E, S]);
            var ci = ca(cg / this.width, E / this.height),
                cd = this.top,
                ch = S ? "meet" : "xMinYMin",
                cb, cf;
            if (ce == null) {
                if (this._vbSize) {
                    ci = 1
                }
                delete this._vbSize;
                cb = "0 0 " + this.width + bS + this.height
            } else {
                this._vbSize = ci;
                cb = ce + bS + cc + bS + cg + bS + E
            }
            bR(this.canvas, {
                viewBox: cb,
                preserveAspectRatio: ch
            });
            while (ci && cd) {
                cf = "stroke-width" in cd.attrs ? cd.attrs["stroke-width"] : 1;
                cd.attr({
                    "stroke-width": cf
                });
                cd._.dirty = 1;
                cd._.dirtyT = 1;
                cd = cd.prev
            }
            this._viewBox = [ce, cc, cg, E, !!S];
            return this
        };
        bi.prototype.renderfix = function() {
            var ce = this.canvas,
                E = ce.style,
                cd;
            try {
                cd = ce.getScreenCTM() || ce.createSVGMatrix()
            } catch (cc) {
                cd = ce.createSVGMatrix()
            }
            var cb = -cd.e % 1,
                S = -cd.f % 1;
            if (cb || S) {
                if (cb) {
                    this._left = (this._left + cb) % 1;
                    E.left = this._left + "px"
                }
                if (S) {
                    this._top = (this._top + S) % 1;
                    E.top = this._top + "px"
                }
            }
        };
        bi.prototype.clear = function() {
            bi.eve("raphael.clear", this);
            var E = this.canvas;
            while (E.firstChild) {
                E.removeChild(E.firstChild)
            }
            this.bottom = this.top = null;
            (this.desc = bR("desc")).appendChild(bi._g.doc.createTextNode("Created with Rapha\xebl " + bi.version));
            E.appendChild(this.desc);
            E.appendChild(this.defs = bR("defs"))
        };
        bi.prototype.remove = function() {
            b7("raphael.remove", this);
            this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
            for (var E in this) {
                this[E] = typeof this[E] == "function" ? bi._removedFactory(E) : null
            }
        };
        var b5 = bi.st;
        for (var R in bU) {
            if (bU[i](R) && !b5[i](R)) {
                b5[R] = (function(E) {
                    return function() {
                        var S = arguments;
                        return this.forEach(function(cb) {
                            cb[E].apply(cb, S)
                        })
                    }
                })(R)
            }
        }
    })();
    (function() {
        if (!bi.vml) {
            return
        }
        var R = "hasOwnProperty",
            cc = String,
            bV = parseFloat,
            bQ = Math,
            b9 = bQ.round,
            cf = bQ.max,
            ca = bQ.min,
            b0 = bQ.abs,
            b3 = "fill",
            bR = /[, ]+/,
            b8 = bi.eve,
            b4 = " progid:DXImageTransform.Microsoft",
            bT = " ",
            bY = "",
            cb = {
                M: "m",
                L: "l",
                C: "c",
                Z: "x",
                m: "t",
                l: "r",
                c: "v",
                z: "x"
            },
            bS = /([clmz]),?([^clmz]*)/gi,
            b1 = / progid:\S+Blur\([^\)]+\)/g,
            ce = /-?[^,\s-]+/g,
            i = "position:absolute;left:0;top:0;width:1px;height:1px",
            d = 21600,
            b7 = {
                path: 1,
                rect: 1,
                image: 1
            },
            bZ = {
                circle: 1,
                ellipse: 1
            },
            bO = function(co) {
                var cl = /[ahqstv]/ig,
                    cg = bi._pathToAbsolute;
                cc(co).match(cl) && (cg = bi._path2curve);
                cl = /[clmz]/g;
                if (cg == bi._pathToAbsolute && !cc(co).match(cl)) {
                    var ck = cc(co).replace(bS, function(cs, cu, cq) {
                        var ct = [],
                            cp = cu.toLowerCase() == "m",
                            cr = cb[cu];
                        cq.replace(ce, function(cv) {
                            if (cp && ct.length == 2) {
                                cr += ct + cb[cu == "m" ? "l" : "L"];
                                ct = []
                            }
                            ct.push(b9(cv * d))
                        });
                        return cr + ct
                    });
                    return ck
                }
                var cm = cg(co),
                    S, E;
                ck = [];
                for (var ci = 0, cn = cm.length; ci < cn; ci++) {
                    S = cm[ci];
                    E = cm[ci][0].toLowerCase();
                    E == "z" && (E = "x");
                    for (var ch = 1, cj = S.length; ch < cj; ch++) {
                        E += b9(S[ch] * d) + (ch != cj - 1 ? "," : bY)
                    }
                    ck.push(E)
                }
                return ck.join(bT)
            },
            bW = function(ch, cg, S) {
                var E = bi.matrix();
                E.rotate(-ch, 0.5, 0.5);
                return {
                    dx: E.x(cg, S),
                    dy: E.y(cg, S)
                }
            },
            bX = function(cn, cm, cl, ci, ch, cj) {
                var cv = cn._,
                    cp = cn.matrix,
                    E = cv.fillpos,
                    co = cn.node,
                    ck = co.style,
                    cg = 1,
                    S = "",
                    cr, ct = d / cm,
                    cs = d / cl;
                ck.visibility = "hidden";
                if (!cm || !cl) {
                    return
                }
                co.coordsize = b0(ct) + bT + b0(cs);
                ck.rotation = cj * (cm * cl < 0 ? -1 : 1);
                if (cj) {
                    var cu = bW(cj, ci, ch);
                    ci = cu.dx;
                    ch = cu.dy
                }
                cm < 0 && (S += "x");
                cl < 0 && (S += " y") && (cg = -1);
                ck.flip = S;
                co.coordorigin = (ci * -ct) + bT + (ch * -cs);
                if (E || cv.fillsize) {
                    var cq = co.getElementsByTagName(b3);
                    cq = cq && cq[0];
                    co.removeChild(cq);
                    if (E) {
                        cu = bW(cj, cp.x(E[0], E[1]), cp.y(E[0], E[1]));
                        cq.position = cu.dx * cg + bT + cu.dy * cg
                    }
                    if (cv.fillsize) {
                        cq.size = cv.fillsize[0] * b0(cm) + bT + cv.fillsize[1] * b0(cl)
                    }
                    co.appendChild(cq)
                }
                ck.visibility = "visible"
            };
        bi.toString = function() {
            return "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl " + this.version
        };
        var g = function(E, ck, S) {
                var cm = cc(ck).toLowerCase().split("-"),
                    ci = S ? "end" : "start",
                    cg = cm.length,
                    cj = "classic",
                    cl = "medium",
                    ch = "medium";
                while (cg--) {
                    switch (cm[cg]) {
                        case "block":
                        case "classic":
                        case "oval":
                        case "diamond":
                        case "open":
                        case "none":
                            cj = cm[cg];
                            break;
                        case "wide":
                        case "narrow":
                            ch = cm[cg];
                            break;
                        case "long":
                        case "short":
                            cl = cm[cg];
                            break
                    }
                }
                var cn = E.node.getElementsByTagName("stroke")[0];
                cn[ci + "arrow"] = cj;
                cn[ci + "arrowlength"] = cl;
                cn[ci + "arrowwidth"] = ch
            },
            b5 = function(cv, cH) {
                cv.attrs = cv.attrs || {};
                var cC = cv.node,
                    cL = cv.attrs,
                    cr = cC.style,
                    cn, cF = b7[cv.type] && (cH.x != cL.x || cH.y != cL.y || cH.width != cL.width || cH.height != cL.height || cH.cx != cL.cx || cH.cy != cL.cy || cH.rx != cL.rx || cH.ry != cL.ry || cH.r != cL.r),
                    cu = bZ[cv.type] && (cL.cx != cH.cx || cL.cy != cH.cy || cL.r != cH.r || cL.rx != cH.rx || cL.ry != cH.ry),
                    cO = cv;
                for (var cs in cH) {
                    if (cH[R](cs)) {
                        cL[cs] = cH[cs]
                    }
                }
                if (cF) {
                    cL.path = bi._getPath[cv.type](cv);
                    cv._.dirty = 1
                }
                cH.href && (cC.href = cH.href);
                cH.title && (cC.title = cH.title);
                cH.target && (cC.target = cH.target);
                cH.cursor && (cr.cursor = cH.cursor);
                "blur" in cH && cv.blur(cH.blur);
                if (cH.path && cv.type == "path" || cF) {
                    cC.path = bO(~cc(cL.path).toLowerCase().indexOf("r") ? bi._pathToAbsolute(cL.path) : cL.path);
                    if (cv.type == "image") {
                        cv._.fillpos = [cL.x, cL.y];
                        cv._.fillsize = [cL.width, cL.height];
                        bX(cv, 1, 1, 0, 0, 0)
                    }
                }
                "transform" in cH && cv.transform(cH.transform);
                if (cu) {
                    var ci = +cL.cx,
                        cg = +cL.cy,
                        cm = +cL.rx || +cL.r || 0,
                        cl = +cL.ry || +cL.r || 0;
                    cC.path = bi.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", b9((ci - cm) * d), b9((cg - cl) * d), b9((ci + cm) * d), b9((cg + cl) * d), b9(ci * d));
                    cv._.dirty = 1
                }
                if ("clip-rect" in cH) {
                    var S = cc(cH["clip-rect"]).split(bR);
                    if (S.length == 4) {
                        S[2] = +S[2] + (+S[0]);
                        S[3] = +S[3] + (+S[1]);
                        var ct = cC.clipRect || bi._g.doc.createElement("div"),
                            cN = ct.style;
                        cN.clip = bi.format("rect({1}px {2}px {3}px {0}px)", S);
                        if (!cC.clipRect) {
                            cN.position = "absolute";
                            cN.top = 0;
                            cN.left = 0;
                            cN.width = cv.paper.width + "px";
                            cN.height = cv.paper.height + "px";
                            cC.parentNode.insertBefore(ct, cC);
                            ct.appendChild(cC);
                            cC.clipRect = ct
                        }
                    }
                    if (!cH["clip-rect"]) {
                        cC.clipRect && (cC.clipRect.style.clip = "auto")
                    }
                }
                if (cv.textpath) {
                    var cJ = cv.textpath.style;
                    cH.font && (cJ.font = cH.font);
                    cH["font-family"] && (cJ.fontFamily = '"' + cH["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, bY) + '"');
                    cH["font-size"] && (cJ.fontSize = cH["font-size"]);
                    cH["font-weight"] && (cJ.fontWeight = cH["font-weight"]);
                    cH["font-style"] && (cJ.fontStyle = cH["font-style"])
                }
                if ("arrow-start" in cH) {
                    g(cO, cH["arrow-start"])
                }
                if ("arrow-end" in cH) {
                    g(cO, cH["arrow-end"], 1)
                }
                if (cH.opacity != null || cH["stroke-width"] != null || cH.fill != null || cH.src != null || cH.stroke != null || cH["stroke-width"] != null || cH["stroke-opacity"] != null || cH["fill-opacity"] != null || cH["stroke-dasharray"] != null || cH["stroke-miterlimit"] != null || cH["stroke-linejoin"] != null || cH["stroke-linecap"] != null) {
                    var cD = cC.getElementsByTagName(b3),
                        cK = false;
                    cD = cD && cD[0];
                    !cD && (cK = cD = cd(b3));
                    if (cv.type == "image" && cH.src) {
                        cD.src = cH.src
                    }
                    cH.fill && (cD.on = true);
                    if (cD.on == null || cH.fill == "none" || cH.fill === null) {
                        cD.on = false
                    }
                    if (cD.on && cH.fill) {
                        var ck = cc(cH.fill).match(bi._ISURL);
                        if (ck) {
                            cD.parentNode == cC && cC.removeChild(cD);
                            cD.rotate = true;
                            cD.src = ck[1];
                            cD.type = "tile";
                            var E = cv.getBBox(1);
                            cD.position = E.x + bT + E.y;
                            cv._.fillpos = [E.x, E.y];
                            bi._preload(ck[1], function() {
                                cv._.fillsize = [this.offsetWidth, this.offsetHeight]
                            })
                        } else {
                            cD.color = bi.getRGB(cH.fill).hex;
                            cD.src = bY;
                            cD.type = "solid";
                            if (bi.getRGB(cH.fill).error && (cO.type in {
                                    circle: 1,
                                    ellipse: 1
                                } || cc(cH.fill).charAt() != "r") && b(cO, cH.fill, cD)) {
                                cL.fill = "none";
                                cL.gradient = cH.fill;
                                cD.rotate = false
                            }
                        }
                    }
                    if ("fill-opacity" in cH || "opacity" in cH) {
                        var cj = ((+cL["fill-opacity"] + 1 || 2) - 1) * ((+cL.opacity + 1 || 2) - 1) * ((+bi.getRGB(cH.fill).o + 1 || 2) - 1);
                        cj = ca(cf(cj, 0), 1);
                        cD.opacity = cj;
                        if (cD.src) {
                            cD.color = "none"
                        }
                    }
                    cC.appendChild(cD);
                    var co = (cC.getElementsByTagName("stroke") && cC.getElementsByTagName("stroke")[0]),
                        cM = false;
                    !co && (cM = co = cd("stroke"));
                    if ((cH.stroke && cH.stroke != "none") || cH["stroke-width"] || cH["stroke-opacity"] != null || cH["stroke-dasharray"] || cH["stroke-miterlimit"] || cH["stroke-linejoin"] || cH["stroke-linecap"]) {
                        co.on = true
                    }(cH.stroke == "none" || cH.stroke === null || co.on == null || cH.stroke == 0 || cH["stroke-width"] == 0) && (co.on = false);
                    var cB = bi.getRGB(cH.stroke);
                    co.on && cH.stroke && (co.color = cB.hex);
                    cj = ((+cL["stroke-opacity"] + 1 || 2) - 1) * ((+cL.opacity + 1 || 2) - 1) * ((+cB.o + 1 || 2) - 1);
                    var cw = (bV(cH["stroke-width"]) || 1) * 0.75;
                    cj = ca(cf(cj, 0), 1);
                    cH["stroke-width"] == null && (cw = cL["stroke-width"]);
                    cH["stroke-width"] && (co.weight = cw);
                    cw && cw < 1 && (cj *= cw) && (co.weight = 1);
                    co.opacity = cj;
                    cH["stroke-linejoin"] && (co.joinstyle = cH["stroke-linejoin"] || "miter");
                    co.miterlimit = cH["stroke-miterlimit"] || 8;
                    cH["stroke-linecap"] && (co.endcap = cH["stroke-linecap"] == "butt" ? "flat" : cH["stroke-linecap"] == "square" ? "square" : "round");
                    if (cH["stroke-dasharray"]) {
                        var cA = {
                            "-": "shortdash",
                            ".": "shortdot",
                            "-.": "shortdashdot",
                            "-..": "shortdashdotdot",
                            ". ": "dot",
                            "- ": "dash",
                            "--": "longdash",
                            "- .": "dashdot",
                            "--.": "longdashdot",
                            "--..": "longdashdotdot"
                        };
                        co.dashstyle = cA[R](cH["stroke-dasharray"]) ? cA[cH["stroke-dasharray"]] : bY
                    }
                    cM && cC.appendChild(co)
                }
                if (cO.type == "text") {
                    cO.paper.canvas.style.display = bY;
                    var cE = cO.paper.span,
                        cz = 100,
                        ch = cL.font && cL.font.match(/\d+(?:\.\d*)?(?=px)/);
                    cr = cE.style;
                    cL.font && (cr.font = cL.font);
                    cL["font-family"] && (cr.fontFamily = cL["font-family"]);
                    cL["font-weight"] && (cr.fontWeight = cL["font-weight"]);
                    cL["font-style"] && (cr.fontStyle = cL["font-style"]);
                    ch = bV(cL["font-size"] || ch && ch[0]) || 10;
                    cr.fontSize = ch * cz + "px";
                    cO.textpath.string && (cE.innerHTML = cc(cO.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                    var cq = cE.getBoundingClientRect();
                    cO.W = cL.w = (cq.right - cq.left) / cz;
                    cO.H = cL.h = (cq.bottom - cq.top) / cz;
                    cO.X = cL.x;
                    cO.Y = cL.y + cO.H / 2;
                    ("x" in cH || "y" in cH) && (cO.path.v = bi.format("m{0},{1}l{2},{1}", b9(cL.x * d), b9(cL.y * d), b9(cL.x * d) + 1));
                    var cp = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"];
                    for (var cG = 0, cI = cp.length; cG < cI; cG++) {
                        if (cp[cG] in cH) {
                            cO._.dirty = 1;
                            break
                        }
                    }
                    switch (cL["text-anchor"]) {
                        case "start":
                            cO.textpath.style["v-text-align"] = "left";
                            cO.bbx = cO.W / 2;
                            break;
                        case "end":
                            cO.textpath.style["v-text-align"] = "right";
                            cO.bbx = -cO.W / 2;
                            break;
                        default:
                            cO.textpath.style["v-text-align"] = "center";
                            cO.bbx = 0;
                            break
                    }
                    cO.textpath.style["v-text-kern"] = true
                }
            },
            b = function(E, cn, cq) {
                E.attrs = E.attrs || {};
                var co = E.attrs,
                    ch = Math.pow,
                    ci, cj, cl = "linear",
                    cm = ".5 .5";
                E.attrs.gradient = cn;
                cn = cc(cn).replace(bi._radial_gradient, function(ct, cu, cs) {
                    cl = "radial";
                    if (cu && cs) {
                        cu = bV(cu);
                        cs = bV(cs);
                        ch(cu - 0.5, 2) + ch(cs - 0.5, 2) > 0.25 && (cs = bQ.sqrt(0.25 - ch(cu - 0.5, 2)) * ((cs > 0.5) * 2 - 1) + 0.5);
                        cm = cu + bT + cs
                    }
                    return bY
                });
                cn = cn.split(/\s*\-\s*/);
                if (cl == "linear") {
                    var S = cn.shift();
                    S = -bV(S);
                    if (isNaN(S)) {
                        return null
                    }
                }
                var ck = bi._parseDots(cn);
                if (!ck) {
                    return null
                }
                E = E.shape || E.node;
                if (ck.length) {
                    E.removeChild(cq);
                    cq.on = true;
                    cq.method = "none";
                    cq.color = ck[0].color;
                    cq.color2 = ck[ck.length - 1].color;
                    var cr = [];
                    for (var cg = 0, cp = ck.length; cg < cp; cg++) {
                        ck[cg].offset && cr.push(ck[cg].offset + bT + ck[cg].color)
                    }
                    cq.colors = cr.length ? cr.join() : "0% " + cq.color;
                    if (cl == "radial") {
                        cq.type = "gradientTitle";
                        cq.focus = "100%";
                        cq.focussize = "0 0";
                        cq.focusposition = cm;
                        cq.angle = 0
                    } else {
                        cq.type = "gradient";
                        cq.angle = (270 - S) % 360
                    }
                    E.appendChild(cq)
                }
                return 1
            },
            b2 = function(S, E) {
                this[0] = this.node = S;
                S.raphael = true;
                this.id = bi._oid++;
                S.raphaelid = this.id;
                this.X = 0;
                this.Y = 0;
                this.attrs = {};
                this.paper = E;
                this.matrix = bi.matrix();
                this._ = {
                    transform: [],
                    sx: 1,
                    sy: 1,
                    dx: 0,
                    dy: 0,
                    deg: 0,
                    dirty: 1,
                    dirtyT: 1
                };
                !E.bottom && (E.bottom = this);
                this.prev = E.top;
                E.top && (E.top.next = this);
                E.top = this;
                this.next = null
            };
        var bU = bi.el;
        b2.prototype = bU;
        bU.constructor = b2;
        bU.transform = function(ci) {
            if (ci == null) {
                return this._.transform
            }
            var ck = this.paper._viewBoxShift,
                cj = ck ? "s" + [ck.scale, ck.scale] + "-1-1t" + [ck.dx, ck.dy] : bY,
                cn;
            if (ck) {
                cn = ci = cc(ci).replace(/\.{3}|\u2026/g, this._.transform || bY)
            }
            bi._extractTransform(this, cj + ci);
            var co = this.matrix.clone(),
                cq = this.skew,
                cg = this.node,
                cm, ch = ~cc(this.attrs.fill).indexOf("-"),
                E = !cc(this.attrs.fill).indexOf("url(");
            co.translate(1, 1);
            if (E || ch || this.type == "image") {
                cq.matrix = "1 0 0 1";
                cq.offset = "0 0";
                cm = co.split();
                if ((ch && cm.noRotation) || !cm.isSimple) {
                    cg.style.filter = co.toFilter();
                    var cl = this.getBBox(),
                        S = this.getBBox(1),
                        cr = cl.x - S.x,
                        cp = cl.y - S.y;
                    cg.coordorigin = (cr * -d) + bT + (cp * -d);
                    bX(this, 1, 1, cr, cp, 0)
                } else {
                    cg.style.filter = bY;
                    bX(this, cm.scalex, cm.scaley, cm.dx, cm.dy, cm.rotate)
                }
            } else {
                cg.style.filter = bY;
                cq.matrix = cc(co);
                cq.offset = co.offset()
            }
            cn && (this._.transform = cn);
            return this
        };
        bU.rotate = function(S, E, ch) {
            if (this.removed) {
                return this
            }
            if (S == null) {
                return
            }
            S = cc(S).split(bR);
            if (S.length - 1) {
                E = bV(S[1]);
                ch = bV(S[2])
            }
            S = bV(S[0]);
            (ch == null) && (E = ch);
            if (E == null || ch == null) {
                var cg = this.getBBox(1);
                E = cg.x + cg.width / 2;
                ch = cg.y + cg.height / 2
            }
            this._.dirtyT = 1;
            this.transform(this._.transform.concat([
                ["r", S, E, ch]
            ]));
            return this
        };
        bU.translate = function(S, E) {
            if (this.removed) {
                return this
            }
            S = cc(S).split(bR);
            if (S.length - 1) {
                E = bV(S[1])
            }
            S = bV(S[0]) || 0;
            E = +E || 0;
            if (this._.bbox) {
                this._.bbox.x += S;
                this._.bbox.y += E
            }
            this.transform(this._.transform.concat([
                ["t", S, E]
            ]));
            return this
        };
        bU.scale = function(ci, cg, E, ch) {
            if (this.removed) {
                return this
            }
            ci = cc(ci).split(bR);
            if (ci.length - 1) {
                cg = bV(ci[1]);
                E = bV(ci[2]);
                ch = bV(ci[3]);
                isNaN(E) && (E = null);
                isNaN(ch) && (ch = null)
            }
            ci = bV(ci[0]);
            (cg == null) && (cg = ci);
            (ch == null) && (E = ch);
            if (E == null || ch == null) {
                var S = this.getBBox(1)
            }
            E = E == null ? S.x + S.width / 2 : E;
            ch = ch == null ? S.y + S.height / 2 : ch;
            this.transform(this._.transform.concat([
                ["s", ci, cg, E, ch]
            ]));
            this._.dirtyT = 1;
            return this
        };
        bU.hide = function() {
            !this.removed && (this.node.style.display = "none");
            return this
        };
        bU.show = function() {
            !this.removed && (this.node.style.display = bY);
            return this
        };
        bU._getBBox = function() {
            if (this.removed) {
                return {}
            }
            return {
                x: this.X + (this.bbx || 0) - this.W / 2,
                y: this.Y - this.H,
                width: this.W,
                height: this.H
            }
        };
        bU.remove = function() {
            if (this.removed || !this.node.parentNode) {
                return
            }
            this.paper.__set__ && this.paper.__set__.exclude(this);
            bi.eve.unbind("raphael.*.*." + this.id);
            bi._tear(this, this.paper);
            this.node.parentNode.removeChild(this.node);
            this.shape && this.shape.parentNode.removeChild(this.shape);
            for (var E in this) {
                this[E] = typeof this[E] == "function" ? bi._removedFactory(E) : null
            }
            this.removed = true
        };
        bU.attr = function(E, cn) {
            if (this.removed) {
                return this
            }
            if (E == null) {
                var ck = {};
                for (var cm in this.attrs) {
                    if (this.attrs[R](cm)) {
                        ck[cm] = this.attrs[cm]
                    }
                }
                ck.gradient && ck.fill == "none" && (ck.fill = ck.gradient) && delete ck.gradient;
                ck.transform = this._.transform;
                return ck
            }
            if (cn == null && bi.is(E, "string")) {
                if (E == b3 && this.attrs.fill == "none" && this.attrs.gradient) {
                    return this.attrs.gradient
                }
                var cl = E.split(bR),
                    ch = {};
                for (var ci = 0, cp = cl.length; ci < cp; ci++) {
                    E = cl[ci];
                    if (E in this.attrs) {
                        ch[E] = this.attrs[E]
                    } else {
                        if (bi.is(this.paper.customAttributes[E], "function")) {
                            ch[E] = this.paper.customAttributes[E].def
                        } else {
                            ch[E] = bi._availableAttrs[E]
                        }
                    }
                }
                return cp - 1 ? ch : ch[cl[0]]
            }
            if (this.attrs && cn == null && bi.is(E, "array")) {
                ch = {};
                for (ci = 0, cp = E.length; ci < cp; ci++) {
                    ch[E[ci]] = this.attr(E[ci])
                }
                return ch
            }
            var S;
            if (cn != null) {
                S = {};
                S[E] = cn
            }
            cn == null && bi.is(E, "object") && (S = E);
            for (var co in S) {
                b8("raphael.attr." + co + "." + this.id, this, S[co])
            }
            if (S) {
                for (co in this.paper.customAttributes) {
                    if (this.paper.customAttributes[R](co) && S[R](co) && bi.is(this.paper.customAttributes[co], "function")) {
                        var cj = this.paper.customAttributes[co].apply(this, [].concat(S[co]));
                        this.attrs[co] = S[co];
                        for (var cg in cj) {
                            if (cj[R](cg)) {
                                S[cg] = cj[cg]
                            }
                        }
                    }
                }
                if (S.text && this.type == "text") {
                    this.textpath.string = S.text
                }
                b5(this, S)
            }
            return this
        };
        bU.toFront = function() {
            !this.removed && this.node.parentNode.appendChild(this.node);
            this.paper && this.paper.top != this && bi._tofront(this, this.paper);
            return this
        };
        bU.toBack = function() {
            if (this.removed) {
                return this
            }
            if (this.node.parentNode.firstChild != this.node) {
                this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
                bi._toback(this, this.paper)
            }
            return this
        };
        bU.insertAfter = function(E) {
            if (this.removed) {
                return this
            }
            if (E.constructor == bi.st.constructor) {
                E = E[E.length - 1]
            }
            if (E.node.nextSibling) {
                E.node.parentNode.insertBefore(this.node, E.node.nextSibling)
            } else {
                E.node.parentNode.appendChild(this.node)
            }
            bi._insertafter(this, E, this.paper);
            return this
        };
        bU.insertBefore = function(E) {
            if (this.removed) {
                return this
            }
            if (E.constructor == bi.st.constructor) {
                E = E[0]
            }
            E.node.parentNode.insertBefore(this.node, E.node);
            bi._insertbefore(this, E, this.paper);
            return this
        };
        bU.blur = function(E) {
            var S = this.node.runtimeStyle,
                cg = S.filter;
            cg = cg.replace(b1, bY);
            if (+E !== 0) {
                this.attrs.blur = E;
                S.filter = cg + bT + b4 + ".Blur(pixelradius=" + (+E || 1.5) + ")";
                S.margin = bi.format("-{0}px 0 0 -{0}px", b9(+E || 1.5))
            } else {
                S.filter = cg;
                S.margin = 0;
                delete this.attrs.blur
            }
            return this
        };
        bi._engine.path = function(ch, S) {
            var ci = cd("shape");
            ci.style.cssText = i;
            ci.coordsize = d + bT + d;
            ci.coordorigin = S.coordorigin;
            var cj = new b2(ci, S),
                E = {
                    fill: "none",
                    stroke: "#000"
                };
            ch && (E.path = ch);
            cj.type = "path";
            cj.path = [];
            cj.Path = bY;
            b5(cj, E);
            S.canvas.appendChild(ci);
            var cg = cd("skew");
            cg.on = true;
            ci.appendChild(cg);
            cj.skew = cg;
            cj.transform(bY);
            return cj
        };
        bi._engine.rect = function(S, ck, ci, cl, cg, E) {
            var cm = bi._rectPath(ck, ci, cl, cg, E),
                ch = S.path(cm),
                cj = ch.attrs;
            ch.X = cj.x = ck;
            ch.Y = cj.y = ci;
            ch.W = cj.width = cl;
            ch.H = cj.height = cg;
            cj.r = E;
            cj.path = cm;
            ch.type = "rect";
            return ch
        };
        bi._engine.ellipse = function(S, E, ck, cj, ci) {
            var ch = S.path(),
                cg = ch.attrs;
            ch.X = E - cj;
            ch.Y = ck - ci;
            ch.W = cj * 2;
            ch.H = ci * 2;
            ch.type = "ellipse";
            b5(ch, {
                cx: E,
                cy: ck,
                rx: cj,
                ry: ci
            });
            return ch
        };
        bi._engine.circle = function(S, E, cj, ci) {
            var ch = S.path(),
                cg = ch.attrs;
            ch.X = E - ci;
            ch.Y = cj - ci;
            ch.W = ch.H = ci * 2;
            ch.type = "circle";
            b5(ch, {
                cx: E,
                cy: cj,
                r: ci
            });
            return ch
        };
        bi._engine.image = function(S, E, cl, cj, cm, ch) {
            var co = bi._rectPath(cl, cj, cm, ch),
                ci = S.path(co).attr({
                    stroke: "none"
                }),
                ck = ci.attrs,
                cg = ci.node,
                cn = cg.getElementsByTagName(b3)[0];
            ck.src = E;
            ci.X = ck.x = cl;
            ci.Y = ck.y = cj;
            ci.W = ck.width = cm;
            ci.H = ck.height = ch;
            ck.path = co;
            ci.type = "image";
            cn.parentNode == cg && cg.removeChild(cn);
            cn.rotate = true;
            cn.src = E;
            cn.type = "tile";
            ci._.fillpos = [cl, cj];
            ci._.fillsize = [cm, ch];
            cg.appendChild(cn);
            bX(ci, 1, 1, 0, 0, 0);
            return ci
        };
        bi._engine.text = function(E, ck, cj, cl) {
            var ch = cd("shape"),
                cn = cd("path"),
                cg = cd("textpath");
            ck = ck || 0;
            cj = cj || 0;
            cl = cl || "";
            cn.v = bi.format("m{0},{1}l{2},{1}", b9(ck * d), b9(cj * d), b9(ck * d) + 1);
            cn.textpathok = true;
            cg.string = cc(cl);
            cg.on = true;
            ch.style.cssText = i;
            ch.coordsize = d + bT + d;
            ch.coordorigin = "0 0";
            var S = new b2(ch, E),
                ci = {
                    fill: "#000",
                    stroke: "none",
                    font: bi._availableAttrs.font,
                    text: cl
                };
            S.shape = ch;
            S.path = cn;
            S.textpath = cg;
            S.type = "text";
            S.attrs.text = cc(cl);
            S.attrs.x = ck;
            S.attrs.y = cj;
            S.attrs.w = 1;
            S.attrs.h = 1;
            b5(S, ci);
            ch.appendChild(cg);
            ch.appendChild(cn);
            E.canvas.appendChild(ch);
            var cm = cd("skew");
            cm.on = true;
            ch.appendChild(cm);
            S.skew = cm;
            S.transform(bY);
            return S
        };
        bi._engine.setSize = function(cg, E) {
            var S = this.canvas.style;
            this.width = cg;
            this.height = E;
            cg == +cg && (cg += "px");
            E == +E && (E += "px");
            S.width = cg;
            S.height = E;
            S.clip = "rect(0 " + cg + " " + E + " 0)";
            if (this._viewBox) {
                bi._engine.setViewBox.apply(this, this._viewBox)
            }
            return this
        };
        bi._engine.setViewBox = function(cj, ci, ck, cg, ch) {
            bi.eve("raphael.setViewBox", this, this._viewBox, [cj, ci, ck, cg, ch]);
            var E = this.width,
                cm = this.height,
                cn = 1 / cf(ck / E, cg / cm),
                cl, S;
            if (ch) {
                cl = cm / cg;
                S = E / ck;
                if (ck * cl < E) {
                    cj -= (E - ck * cl) / 2 / cl
                }
                if (cg * S < cm) {
                    ci -= (cm - cg * S) / 2 / S
                }
            }
            this._viewBox = [cj, ci, ck, cg, !!ch];
            this._viewBoxShift = {
                dx: -cj,
                dy: -ci,
                scale: cn
            };
            this.forEach(function(co) {
                co.transform("...")
            });
            return this
        };
        var cd;
        bi._engine.initWin = function(cg) {
            var S = cg.document;
            S.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
            try {
                !S.namespaces.rvml && S.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
                cd = function(ch) {
                    return S.createElement("<rvml:" + ch + ' class="rvml">')
                }
            } catch (E) {
                cd = function(ch) {
                    return S.createElement("<" + ch + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                }
            }
        };
        bi._engine.initWin(bi._g.win);
        bi._engine.create = function() {
            var cg = bi._getContainer.apply(0, arguments),
                E = cg.container,
                cm = cg.height,
                cn, S = cg.width,
                cl = cg.x,
                ck = cg.y;
            if (!E) {
                throw new Error("VML container not found.")
            }
            var ci = new bi._Paper,
                cj = ci.canvas = bi._g.doc.createElement("div"),
                ch = cj.style;
            cl = cl || 0;
            ck = ck || 0;
            S = S || 512;
            cm = cm || 342;
            ci.width = S;
            ci.height = cm;
            S == +S && (S += "px");
            cm == +cm && (cm += "px");
            ci.coordsize = d * 1000 + bT + d * 1000;
            ci.coordorigin = "0 0";
            ci.span = bi._g.doc.createElement("span");
            ci.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
            cj.appendChild(ci.span);
            ch.cssText = bi.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", S, cm);
            if (E == 1) {
                bi._g.doc.body.appendChild(cj);
                ch.left = cl + "px";
                ch.top = ck + "px";
                ch.position = "absolute"
            } else {
                if (E.firstChild) {
                    E.insertBefore(cj, E.firstChild)
                } else {
                    E.appendChild(cj)
                }
            }
            ci.renderfix = function() {};
            return ci
        };
        bi.prototype.clear = function() {
            bi.eve("raphael.clear", this);
            this.canvas.innerHTML = bY;
            this.span = bi._g.doc.createElement("span");
            this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
            this.canvas.appendChild(this.span);
            this.bottom = this.top = null
        };
        bi.prototype.remove = function() {
            bi.eve("raphael.remove", this);
            this.canvas.parentNode.removeChild(this.canvas);
            for (var E in this) {
                this[E] = typeof this[E] == "function" ? bi._removedFactory(E) : null
            }
            return true
        };
        var b6 = bi.st;
        for (var bP in bU) {
            if (bU[R](bP) && !b6[R](bP)) {
                b6[bP] = (function(E) {
                    return function() {
                        var S = arguments;
                        return this.forEach(function(cg) {
                            cg[E].apply(cg, S)
                        })
                    }
                })(bP)
            }
        }
    })();
    aE.was ? (a5.win.Raphael = bi) : (Raphael = bi);
    return bi
}));
if (!window.ABCJS) {
    window.ABCJS = {}
}(function() {
    function a(g, f) {
        var j = g.getAttribute("class");
        var i = /[\t\r\n\f]/g;
        var h = " " + f + " ";
        return (g.nodeType === 1 && (" " + j + " ").replace(i, " ").indexOf(h) >= 0)
    }

    function e(l, g, f) {
        var k = l.getElementsByClassName(g);
        var h = [];
        for (var j = 0; j < k.length; j++) {
            if (a(k[j], f)) {
                h.push(k[j])
            }
        }
        return h
    }

    function b(g, f) {
        var h;
        if (f.bpm) {
            h = f.bpm
        } else {
            if (g && g.metaText && g.metaText.tempo && g.metaText.tempo.bpm) {
                h = g.metaText.tempo.bpm
            } else {
                h = 120
            }
        }
        return h
    }
    var d = false;
    var c;
    ABCJS.startAnimation = function(h, j, q) {
        if (h.getElementsByClassName === undefined) {
            console.error("ABCJS.startAnimation: The first parameter must be a regular DOM element. (Did you pass a jQuery object or an ID?)");
            return
        }
        if (j.getBeatLength === undefined) {
            console.error("ABCJS.startAnimation: The second parameter must be a single tune. (Did you pass the entire array of tunes?)");
            return
        }
        if (q.showCursor) {
            c = $('<div class="cursor" style="position: absolute;"></div>');
            $(h).append(c);
            $(h).css({
                position: "relative"
            })
        }
        d = false;
        var r = b(j, q);
        var p = r / 60000;
        var m = j.getBeatLength();
        var g;

        function f(w, s) {
            var u = e(h, "l" + w, "m" + s);
            if (u.length > 0) {
                for (var t = 0; t < u.length; t++) {
                    var v = u[t];
                    if (!a(v, "bar")) {
                        v.style.display = "none"
                    }
                }
            }
        }

        function o(u) {
            var s = [];
            for (var t in u) {
                if (u.hasOwnProperty(t)) {
                    s.push(u[t])
                }
            }
            s = s.sort(function(w, v) {
                var x = w.time - v.time;
                if (x !== 0) {
                    return x
                } else {
                    return w.type === "bar" ? -1 : 1
                }
            });
            return s
        }
        var k = [];

        function i(S) {
            var z = {};
            var y = 0;
            var x = false;
            for (var F = 0; F < S.staffgroups.length; F++) {
                var D = S.staffgroups[F];
                var A = D.voices;
                var w = D.staffs[0];
                var L = w.absoluteY;
                var J = L - w.top * ABCJS.write.spacing.STEP;
                var Q = D.staffs[D.staffs.length - 1];
                L = Q.absoluteY;
                var C = L - Q.bottom * ABCJS.write.spacing.STEP;
                var K = C - J;
                var H = 0;
                for (var G = 0; G < A.length; G++) {
                    var O = y;
                    var I = A[G].children;
                    for (var N = 0; N < I.length; N++) {
                        var t = I[N];
                        if (t.duration > 0) {
                            var R = t.startTie;
                            if (x) {
                                if (!R) {
                                    x = false
                                }
                            } else {
                                if (!z["event" + O]) {
                                    z["event" + O] = {
                                        type: "event",
                                        time: O,
                                        top: J,
                                        height: K,
                                        left: t.x,
                                        width: t.w
                                    }
                                } else {
                                    z["event" + O].left = Math.min(z["event" + O].left, t.x)
                                }
                                if (R) {
                                    x = true
                                }
                            }
                            O += t.duration
                        }
                        if (t.type === "bar") {
                            if (k.length === 0 || k[k.length - 1] !== "bar") {
                                if (t.elemset && t.elemset.length > 0 && t.elemset[0].attrs) {
                                    var E = t.elemset[0].attrs["class"];
                                    var s = E.split(" ");
                                    var P;
                                    var u;
                                    for (var M = 0; M < s.length; M++) {
                                        var B = /m(\d+)/.exec(s[M]);
                                        if (B) {
                                            u = B[1]
                                        }
                                        B = /l(\d+)/.exec(s[M]);
                                        if (B) {
                                            P = B[1]
                                        }
                                    }
                                    z["bar" + O] = {
                                        type: "bar",
                                        time: O,
                                        lineNum: P,
                                        measureNum: u
                                    }
                                }
                            }
                        }
                    }
                    H = Math.max(H, O)
                }
                y = H
            }
            k = o(z)
        }
        i(j.engraver);

        function l() {
            var s = k.shift();
            if (!s) {
                d = true;
                return 0
            }
            if (s.type === "bar") {
                if (q.hideFinishedMeasures) {
                    f(s.lineNum, s.measureNum)
                }
                if (k.length > 0) {
                    return k[0].time / m
                }
                return 0
            }
            if (q.showCursor) {
                c.css({
                    left: s.left + "px",
                    top: s.top + "px",
                    width: s.width + "px",
                    height: s.height + "px"
                })
            }
            if (k.length > 0) {
                return k[0].time / m
            }
            d = true;
            return 0
        }

        function n() {
            if (d) {
                ABCJS.stopAnimation();
                return
            }
            var t = l();
            var v = t / p;
            var u = new Date();
            u = u.getTime();
            var s = g + v - u;
            if (s <= 0) {
                n()
            } else {
                setTimeout(n, s)
            }
        }
        g = new Date();
        g = g.getTime();
        n()
    };
    ABCJS.stopAnimation = function() {
        d = true;
        if (c) {
            c.remove();
            c = null
        }
    }
})();
if (!window.ABCJS) {
    window.ABCJS = {}
}(function() {
    ABCJS.numberOfTunes = function(d) {
        var b = d.split("\nX:");
        var c = b.length;
        if (c === 0) {
            c = 1
        }
        return c
    };
    ABCJS.TuneBook = function(d) {
        var h = this;
        var g = "";
        d = window.ABCJS.parse.strip(d);
        var b = d.split("\nX:");
        for (var f = 1; f < b.length; f++) {
            b[f] = "X:" + b[f]
        }
        var j = 0;
        h.tunes = [];
        window.ABCJS.parse.each(b, function(i) {
            h.tunes.push({
                abc: i,
                startPos: j
            });
            j += i.length
        });
        if (h.tunes.length > 1 && !window.ABCJS.parse.startsWith(h.tunes[0].abc, "X:")) {
            var c = h.tunes.shift();
            var e = c.abc.split("\n");
            window.ABCJS.parse.each(e, function(i) {
                if (window.ABCJS.parse.startsWith(i, "%%")) {
                    g += i + "\n"
                }
            })
        }
        h.header = g;
        window.ABCJS.parse.each(h.tunes, function(k) {
            var i = k.abc.indexOf("\n\n");
            if (i > 0) {
                k.abc = k.abc.substring(0, i)
            }
            k.pure = k.abc;
            k.abc = g + k.abc;
            var l = k.pure.split("T:");
            if (l.length > 1) {
                l = l[1].split("\n");
                k.title = l[0].replace(/^\s+|\s+$/g, "")
            } else {
                k.title = ""
            }
            var m = k.pure.substring(2, k.pure.indexOf("\n"));
            k.id = m.replace(/^\s+|\s+$/g, "")
        })
    };
    ABCJS.TuneBook.prototype.getTuneById = function(c) {
        for (var b = 0; b < this.tunes.length; b++) {
            if (this.tunes[b].id === c) {
                return this.tunes[b]
            }
        }
        return null
    };
    ABCJS.TuneBook.prototype.getTuneByTitle = function(c) {
        for (var b = 0; b < this.tunes.length; b++) {
            if (this.tunes[b].title === c) {
                return this.tunes[b]
            }
        }
        return null
    };

    function a(o, e, n, l, d) {
        var m = [];
        var k = function(i) {
            return i && !(i.propertyIsEnumerable("length")) && typeof i === "object" && typeof i.length === "number"
        };
        if (e === undefined || n === undefined) {
            return
        }
        if (!k(e)) {
            e = [e]
        }
        if (l === undefined) {
            l = {}
        }
        if (d === undefined) {
            d = {}
        }
        var g = d.startingTune ? d.startingTune : 0;
        var f = new ABCJS.TuneBook(n);
        var c = new window.ABCJS.parse.Parse();
        for (var h = 0; h < e.length; h++) {
            var b = e[h];
            if (typeof(b) === "string") {
                b = document.getElementById(b)
            }
            if (b) {
                b.innerHTML = "";
                if (g < f.tunes.length) {
                    c.parse(f.tunes[g].abc, l);
                    var j = c.getTune();
                    m.push(j);
                    o(b, j)
                }
            }
            g++
        }
        return m
    }
    ABCJS.renderAbc = function(c, e, b, d, f) {
        function g(l, i) {
            var h = f ? f.width ? f.width : 800 : 800;
            var k = Raphael(l, h, 400);
            if (d === undefined) {
                d = {}
            }
            var j = new ABCJS.write.EngraverController(k, d);
            j.engraveABC(i);
            i.engraver = j
        }
        return a(g, c, e, b, f)
    };
    ABCJS.renderMidi = function(c, d, b, f, e) {
        function g(j, h) {
            if (f === undefined) {
                f = {}
            }
            var i = new ABCJS.midi.MidiWriter(j, f);
            i.writeABC(h)
        }
        return a(g, c, d, b, e)
    }
})();
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.data) {
    window.ABCJS.data = {}
}
window.ABCJS.data.Tune = function() {
    this.getBeatLength = function() {
        for (var c = 0; c < this.lines.length; c++) {
            if (this.lines[c].staff) {
                for (var b = 0; b < this.lines[c].staff.length; b++) {
                    if (this.lines[c].staff[b].meter) {
                        var d = this.lines[c].staff[b].meter;
                        if (d.type === "specified") {
                            if (d.value.length > 0) {
                                var a = parseInt(d.value[0].num, 10);
                                var e = parseInt(d.value[0].den, 10);
                                if (a === 6 && e === 8) {
                                    return 3 / 8
                                }
                                if (a === 9 && e === 8) {
                                    return 3 / 8
                                }
                                if (a === 12 && e === 8) {
                                    return 3 / 8
                                }
                                return 1 / e
                            } else {
                                return null
                            }
                        } else {
                            if (d.type === "cut_time") {
                                return 1 / 2
                            } else {
                                return 1 / 4
                            }
                        }
                    }
                }
            }
        }
        return null
    };
    this.reset = function() {
        this.version = "1.0.1";
        this.media = "screen";
        this.metaText = {};
        this.formatting = {};
        this.lines = [];
        this.staffNum = 0;
        this.voiceNum = 0;
        this.lineNum = 0
    };
    this.cleanUp = function(f, p, z, q, w) {
        this.closeLine();
        var b = false;
        var y, o, k;
        for (y = 0; y < this.lines.length; y++) {
            if (this.lines[y].staff !== undefined) {
                var m = false;
                for (o = 0; o < this.lines[y].staff.length; o++) {
                    if (this.lines[y].staff[o] === undefined) {
                        b = true;
                        this.lines[y].staff[o] = null
                    } else {
                        for (k = 0; k < this.lines[y].staff[o].voices.length; k++) {
                            if (this.lines[y].staff[o].voices[k] === undefined) {
                                this.lines[y].staff[o].voices[k] = []
                            } else {
                                if (this.containsNotes(this.lines[y].staff[o].voices[k])) {
                                    m = true
                                }
                            }
                        }
                    }
                }
                if (!m) {
                    this.lines[y] = null;
                    b = true
                }
            }
        }
        if (b) {
            this.lines = window.ABCJS.parse.compact(this.lines);
            window.ABCJS.parse.each(this.lines, function(i) {
                if (i.staff) {
                    i.staff = window.ABCJS.parse.compact(i.staff)
                }
            })
        }
        if (z) {
            for (y = 0; y < this.lines.length; y++) {
                if (this.lines[y].staff !== undefined) {
                    for (o = 0; o < this.lines[y].staff.length; o++) {
                        for (k = 0; k < this.lines[y].staff[o].voices.length; k++) {
                            var d = 0;
                            for (var t = 0; t < this.lines[y].staff[o].voices[k].length; t++) {
                                if (this.lines[y].staff[o].voices[k][t].el_type === "bar") {
                                    d++;
                                    if (d >= z) {
                                        if (t < this.lines[y].staff[o].voices[k].length - 1) {
                                            if (y === this.lines.length - 1) {
                                                var g = JSON.parse(JSON.stringify(this.lines[y]));
                                                this.lines.push(window.ABCJS.parse.clone(g));
                                                for (var u = 0; u < this.lines[y + 1].staff.length; u++) {
                                                    for (var r = 0; r < this.lines[y + 1].staff[u].voices.length; r++) {
                                                        this.lines[y + 1].staff[u].voices[r] = []
                                                    }
                                                }
                                            }
                                            var a = t + 1;
                                            var h = this.lines[y].staff[o].voices[k].slice(a);
                                            this.lines[y].staff[o].voices[k] = this.lines[y].staff[o].voices[k].slice(0, a);
                                            this.lines[y + 1].staff[o].voices[k] = h.concat(this.lines[y + 1].staff[o].voices[k])
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (z) {
            b = false;
            for (y = 0; y < this.lines.length; y++) {
                if (this.lines[y].staff !== undefined) {
                    for (o = 0; o < this.lines[y].staff.length; o++) {
                        var c = false;
                        for (k = 0; k < this.lines[y].staff[o].voices.length; k++) {
                            if (this.containsNotesStrict(this.lines[y].staff[o].voices[k])) {
                                c = true
                            }
                        }
                        if (!c) {
                            b = true;
                            this.lines[y].staff[o] = null
                        }
                    }
                }
            }
            if (b) {
                window.ABCJS.parse.each(this.lines, function(i) {
                    if (i.staff) {
                        i.staff = window.ABCJS.parse.compact(i.staff)
                    }
                })
            }
        }
        for (y = 0; y < this.lines.length; y++) {
            if (this.lines[y].staff) {
                for (o = 0; o < this.lines[y].staff.length; o++) {
                    delete this.lines[y].staff[o].workingClef
                }
            }
        }

        function l(K) {
            var I;
            var J = function(N, j, P) {
                if (w[P] === undefined) {
                    for (I = 0; I < w.length; I++) {
                        if (w[I] !== undefined) {
                            P = I;
                            break
                        }
                    }
                    if (w[P] === undefined) {
                        var O = P * 100 + 1;
                        window.ABCJS.parse.each(N.endSlur, function(i) {
                            if (O === i) {
                                --O
                            }
                        });
                        w[P] = [O]
                    }
                }
                var M;
                for (var L = 0; L < j; L++) {
                    M = w[P].pop();
                    N.endSlur.push(M)
                }
                if (w[P].length === 0) {
                    delete w[P]
                }
                return M
            };
            var D = function(N, j, O, M) {
                N.startSlur = [];
                if (w[O] === undefined) {
                    w[O] = []
                }
                var P = O * 100 + 1;
                for (var L = 0; L < j; L++) {
                    if (M) {
                        window.ABCJS.parse.each(M, function(i) {
                            if (P === i) {
                                ++P
                            }
                        });
                        window.ABCJS.parse.each(M, function(i) {
                            if (P === i) {
                                ++P
                            }
                        });
                        window.ABCJS.parse.each(M, function(i) {
                            if (P === i) {
                                ++P
                            }
                        })
                    }
                    window.ABCJS.parse.each(w[O], function(i) {
                        if (P === i) {
                            ++P
                        }
                    });
                    window.ABCJS.parse.each(w[O], function(i) {
                        if (P === i) {
                            ++P
                        }
                    });
                    w[O].push(P);
                    N.startSlur.push({
                        label: P
                    });
                    P++
                }
            };
            for (var E = 0; E < K.length; E++) {
                var v = K[E];
                if (v.el_type === "note") {
                    if (v.gracenotes) {
                        for (var F = 0; F < v.gracenotes.length; F++) {
                            if (v.gracenotes[F].endSlur) {
                                var G = v.gracenotes[F].endSlur;
                                v.gracenotes[F].endSlur = [];
                                for (var n = 0; n < G; n++) {
                                    J(v.gracenotes[F], 1, 20)
                                }
                            }
                            if (v.gracenotes[F].startSlur) {
                                I = v.gracenotes[F].startSlur;
                                D(v.gracenotes[F], I, 20)
                            }
                        }
                    }
                    if (v.endSlur) {
                        I = v.endSlur;
                        v.endSlur = [];
                        J(v, I, 0)
                    }
                    if (v.startSlur) {
                        I = v.startSlur;
                        D(v, I, 0)
                    }
                    if (v.pitches) {
                        var H = [];
                        for (var s = 0; s < v.pitches.length; s++) {
                            if (v.pitches[s].endSlur) {
                                var B = v.pitches[s].endSlur;
                                v.pitches[s].endSlur = [];
                                for (var C = 0; C < B; C++) {
                                    var A = J(v.pitches[s], 1, s + 1);
                                    H.push(A)
                                }
                            }
                        }
                        for (s = 0; s < v.pitches.length; s++) {
                            if (v.pitches[s].startSlur) {
                                I = v.pitches[s].startSlur;
                                D(v.pitches[s], I, s + 1, H)
                            }
                        }
                        if (v.gracenotes && v.pitches[0].endSlur && v.pitches[0].endSlur[0] === 100 && v.pitches[0].startSlur) {
                            if (v.gracenotes[0].endSlur) {
                                v.gracenotes[0].endSlur.push(v.pitches[0].startSlur[0].label)
                            } else {
                                v.gracenotes[0].endSlur = [v.pitches[0].startSlur[0].label]
                            }
                            if (v.pitches[0].endSlur.length === 1) {
                                delete v.pitches[0].endSlur
                            } else {
                                if (v.pitches[0].endSlur[0] === 100) {
                                    v.pitches[0].endSlur.shift()
                                } else {
                                    if (v.pitches[0].endSlur[v.pitches[0].endSlur.length - 1] === 100) {
                                        v.pitches[0].endSlur.pop()
                                    }
                                }
                            }
                            if (w[1].length === 1) {
                                delete w[1]
                            } else {
                                w[1].pop()
                            }
                        }
                    }
                }
            }
        }

        function e(i) {
            window.ABCJS.parse.parseKeyVoice.fixClef(i)
        }
        for (this.lineNum = 0; this.lineNum < this.lines.length; this.lineNum++) {
            if (this.lines[this.lineNum].staff) {
                for (this.staffNum = 0; this.staffNum < this.lines[this.lineNum].staff.length; this.staffNum++) {
                    if (this.lines[this.lineNum].staff[this.staffNum].clef) {
                        e(this.lines[this.lineNum].staff[this.staffNum].clef)
                    }
                    for (this.voiceNum = 0; this.voiceNum < this.lines[this.lineNum].staff[this.staffNum].voices.length; this.voiceNum++) {
                        l(this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum]);
                        for (var x = 0; x < this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum].length; x++) {
                            if (this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum][x].el_type === "clef") {
                                e(this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum][x])
                            }
                        }
                    }
                }
            }
        }
        if (!this.formatting.pagewidth) {
            this.formatting.pagewidth = f
        }
        if (!this.formatting.pageheight) {
            this.formatting.pageheight = p
        }
        delete this.staffNum;
        delete this.voiceNum;
        delete this.lineNum;
        delete this.potentialStartBeam;
        delete this.potentialEndBeam;
        delete this.vskipPending;
        return w
    };
    this.reset();
    this.getLastNote = function() {
        if (this.lines[this.lineNum] && this.lines[this.lineNum].staff && this.lines[this.lineNum].staff[this.staffNum] && this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum]) {
            for (var a = this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum].length - 1; a >= 0; a--) {
                var b = this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum][a];
                if (b.el_type === "note") {
                    return b
                }
            }
        }
        return null
    };
    this.addTieToLastNote = function() {
        var a = this.getLastNote();
        if (a && a.pitches && a.pitches.length > 0) {
            a.pitches[0].startTie = {};
            return true
        }
        return false
    };
    this.getDuration = function(a) {
        if (a.duration) {
            return a.duration
        }
        return 0
    };
    this.closeLine = function() {
        if (this.potentialStartBeam && this.potentialEndBeam) {
            this.potentialStartBeam.startBeam = true;
            this.potentialEndBeam.endBeam = true
        }
        delete this.potentialStartBeam;
        delete this.potentialEndBeam
    };
    this.appendElement = function(h, i, e, a) {
        var c = this;
        var g = function(l) {
            if (l.pitches !== undefined) {
                var j = c.lines[c.lineNum].staff[c.staffNum].workingClef.verticalPos;
                window.ABCJS.parse.each(l.pitches, function(m) {
                    m.verticalPos = m.pitch - j
                })
            }
            if (l.gracenotes !== undefined) {
                var k = c.lines[c.lineNum].staff[c.staffNum].workingClef.verticalPos;
                window.ABCJS.parse.each(l.gracenotes, function(m) {
                    m.verticalPos = m.pitch - k
                })
            }
            c.lines[c.lineNum].staff[c.staffNum].voices[c.voiceNum].push(l)
        };
        a.el_type = h;
        if (i !== null) {
            a.startChar = i
        }
        if (e !== null) {
            a.endChar = e
        }
        var d = function() {
            c.potentialStartBeam.startBeam = true;
            a.endBeam = true;
            delete c.potentialStartBeam;
            delete c.potentialEndBeam
        };
        var f = function() {
            if (c.potentialStartBeam !== undefined && c.potentialEndBeam !== undefined) {
                c.potentialStartBeam.startBeam = true;
                c.potentialEndBeam.endBeam = true
            }
            delete c.potentialStartBeam;
            delete c.potentialEndBeam
        };
        if (h === "note") {
            var b = c.getDuration(a);
            if (b >= 0.25) {
                f()
            } else {
                if (a.force_end_beam_last && c.potentialStartBeam !== undefined) {
                    f()
                } else {
                    if (a.end_beam && c.potentialStartBeam !== undefined) {
                        if (a.rest === undefined) {
                            d()
                        } else {
                            f()
                        }
                    } else {
                        if (a.rest === undefined) {
                            if (c.potentialStartBeam === undefined) {
                                if (!a.end_beam) {
                                    c.potentialStartBeam = a;
                                    delete c.potentialEndBeam
                                }
                            } else {
                                c.potentialEndBeam = a
                            }
                        }
                    }
                }
            }
        } else {
            f()
        }
        delete a.end_beam;
        delete a.force_end_beam_last;
        g(a)
    };
    this.appendStartingElement = function(f, a, h, c) {
        this.closeLine();
        var e;
        if (f === "key") {
            e = c.impliedNaturals;
            delete c.impliedNaturals
        }
        var b = window.ABCJS.parse.clone(c);
        if (f === "clef") {
            this.lines[this.lineNum].staff[this.staffNum].workingClef = b
        }
        if (this.lines[this.lineNum].staff.length <= this.staffNum) {
            this.lines[this.lineNum].staff[this.staffNum] = {};
            this.lines[this.lineNum].staff[this.staffNum].clef = window.ABCJS.parse.clone(this.lines[this.lineNum].staff[0].clef);
            this.lines[this.lineNum].staff[this.staffNum].key = window.ABCJS.parse.clone(this.lines[this.lineNum].staff[0].key);
            this.lines[this.lineNum].staff[this.staffNum].meter = window.ABCJS.parse.clone(this.lines[this.lineNum].staff[0].meter);
            this.lines[this.lineNum].staff[this.staffNum].workingClef = window.ABCJS.parse.clone(this.lines[this.lineNum].staff[0].workingClef);
            this.lines[this.lineNum].staff[this.staffNum].voices = [
                []
            ]
        }
        var g = this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum];
        for (var d = 0; d < g.length; d++) {
            if (g[d].el_type === "note" || g[d].el_type === "bar") {
                b.el_type = f;
                b.startChar = a;
                b.endChar = h;
                if (e) {
                    b.accidentals = e.concat(b.accidentals)
                }
                g.push(b);
                return
            }
            if (g[d].el_type === f) {
                b.el_type = f;
                b.startChar = a;
                b.endChar = h;
                if (e) {
                    b.accidentals = e.concat(b.accidentals)
                }
                g[d] = b;
                return
            }
        }
        this.lines[this.lineNum].staff[this.staffNum][f] = c
    };
    this.getNumLines = function() {
        return this.lines.length
    };
    this.pushLine = function(a) {
        if (this.vskipPending) {
            a.vskip = this.vskipPending;
            delete this.vskipPending
        }
        this.lines.push(a)
    };
    this.addSubtitle = function(a) {
        this.pushLine({
            subtitle: a
        })
    };
    this.addSpacing = function(a) {
        this.vskipPending = a
    };
    this.addNewPage = function(a) {
        this.pushLine({
            newpage: a
        })
    };
    this.addSeparator = function(c, b, a) {
        this.pushLine({
            separator: {
                spaceAbove: c,
                spaceBelow: b,
                lineLength: a
            }
        })
    };
    this.addText = function(a) {
        this.pushLine({
            text: a
        })
    };
    this.addCentered = function(a) {
        this.pushLine({
            text: [{
                text: a,
                center: true
            }]
        })
    };
    this.containsNotes = function(b) {
        for (var a = 0; a < b.length; a++) {
            if (b[a].el_type === "note" || b[a].el_type === "bar") {
                return true
            }
        }
        return false
    };
    this.containsNotesStrict = function(b) {
        for (var a = 0; a < b.length; a++) {
            if (b[a].el_type === "note" && b[a].rest === undefined) {
                return true
            }
        }
        return false
    };
    this.startNewLine = function(e) {
        var d = this;
        this.closeLine();
        var c = function(j) {
            d.lines[d.lineNum].staff[d.staffNum].voices[d.voiceNum] = [];
            if (d.isFirstLine(d.lineNum)) {
                if (j.name) {
                    if (!d.lines[d.lineNum].staff[d.staffNum].title) {
                        d.lines[d.lineNum].staff[d.staffNum].title = []
                    }
                    d.lines[d.lineNum].staff[d.staffNum].title[d.voiceNum] = j.name
                }
            } else {
                if (j.subname) {
                    if (!d.lines[d.lineNum].staff[d.staffNum].title) {
                        d.lines[d.lineNum].staff[d.staffNum].title = []
                    }
                    d.lines[d.lineNum].staff[d.staffNum].title[d.voiceNum] = j.subname
                }
            }
            if (j.style) {
                d.appendElement("style", null, null, {
                    head: j.style
                })
            }
            if (j.stem) {
                d.appendElement("stem", null, null, {
                    direction: j.stem
                })
            } else {
                if (d.voiceNum > 0) {
                    if (d.lines[d.lineNum].staff[d.staffNum].voices[0] !== undefined) {
                        var g = false;
                        for (var f = 0; f < d.lines[d.lineNum].staff[d.staffNum].voices[0].length; f++) {
                            if (d.lines[d.lineNum].staff[d.staffNum].voices[0].el_type === "stem") {
                                g = true
                            }
                        }
                        if (!g) {
                            var h = {
                                el_type: "stem",
                                direction: "up"
                            };
                            d.lines[d.lineNum].staff[d.staffNum].voices[0].splice(0, 0, h)
                        }
                    }
                    d.appendElement("stem", null, null, {
                        direction: "down"
                    })
                }
            }
            if (j.scale) {
                d.appendElement("scale", null, null, {
                    size: j.scale
                })
            }
        };
        var a = function(f) {
            d.lines[d.lineNum].staff[d.staffNum] = {
                voices: [],
                clef: f.clef,
                key: f.key,
                workingClef: f.clef
            };
            if (f.vocalfont) {
                d.lines[d.lineNum].staff[d.staffNum].vocalfont = f.vocalfont
            }
            if (f.bracket) {
                d.lines[d.lineNum].staff[d.staffNum].bracket = f.bracket
            }
            if (f.brace) {
                d.lines[d.lineNum].staff[d.staffNum].brace = f.brace
            }
            if (f.connectBarLines) {
                d.lines[d.lineNum].staff[d.staffNum].connectBarLines = f.connectBarLines
            }
            c(f);
            if (f.part) {
                d.appendElement("part", f.startChar, f.endChar, {
                    title: f.part
                })
            }
            if (f.meter !== undefined) {
                d.lines[d.lineNum].staff[d.staffNum].meter = f.meter
            }
        };
        var b = function(f) {
            d.lines[d.lineNum] = {
                staff: []
            };
            a(f)
        };
        if (this.lines[this.lineNum] === undefined) {
            b(e)
        } else {
            if (this.lines[this.lineNum].staff === undefined) {
                this.lineNum++;
                this.startNewLine(e)
            } else {
                if (this.lines[this.lineNum].staff[this.staffNum] === undefined) {
                    a(e)
                } else {
                    if (this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum] === undefined) {
                        c(e)
                    } else {
                        if (!this.containsNotes(this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum])) {
                            return
                        } else {
                            this.lineNum++;
                            this.startNewLine(e)
                        }
                    }
                }
            }
        }
    };
    this.hasBeginMusic = function() {
        return this.lines.length > 0
    };
    this.isFirstLine = function(a) {
        for (var b = a - 1; b >= 0; b--) {
            if (this.lines[b].staff !== undefined) {
                return false
            }
        }
        return true
    };
    this.getCurrentVoice = function() {
        if (this.lines[this.lineNum] !== undefined && this.lines[this.lineNum].staff[this.staffNum] !== undefined && this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum] !== undefined) {
            return this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum]
        } else {
            return null
        }
    };
    this.setCurrentVoice = function(c, b) {
        this.staffNum = c;
        this.voiceNum = b;
        for (var a = 0; a < this.lines.length; a++) {
            if (this.lines[a].staff) {
                if (this.lines[a].staff[c] === undefined || this.lines[a].staff[c].voices[b] === undefined || !this.containsNotes(this.lines[a].staff[c].voices[b])) {
                    this.lineNum = a;
                    return
                }
            }
        }
        this.lineNum = a
    };
    this.addMetaText = function(a, b) {
        if (this.metaText[a] === undefined) {
            this.metaText[a] = b
        } else {
            this.metaText[a] += "\n" + b
        }
    };
    this.addMetaTextArray = function(a, b) {
        if (this.metaText[a] === undefined) {
            this.metaText[a] = [b]
        } else {
            this.metaText[a].push(b)
        }
    };
    this.addMetaTextObj = function(a, b) {
        this.metaText[a] = b
    }
};
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.midi) {
    window.ABCJS.midi = {}
}(function() {
    function a(j, i) {
        for (var h in i) {
            if (i.hasOwnProperty(h)) {
                j.setAttribute(h, i[h])
            }
        }
        return j
    }

    function g(h, i) {
        this.javamidi = h;
        this.qtmidi = i
    }
    g.prototype.setTempo = function(h) {
        this.javamidi.setTempo(h);
        this.qtmidi.setTempo(h)
    };
    g.prototype.startTrack = function() {
        this.javamidi.startTrack();
        this.qtmidi.startTrack()
    };
    g.prototype.endTrack = function() {
        this.javamidi.endTrack();
        this.qtmidi.endTrack()
    };
    g.prototype.setInstrument = function(h) {
        this.javamidi.setInstrument(h);
        this.qtmidi.setInstrument(h)
    };
    g.prototype.startNote = function(j, h, i) {
        this.javamidi.startNote(j, h, i);
        this.qtmidi.startNote(j, h, i)
    };
    g.prototype.endNote = function(i, h) {
        this.javamidi.endNote(i, h);
        this.qtmidi.endNote(i, h)
    };
    g.prototype.addRest = function(h) {
        this.javamidi.addRest(h);
        this.qtmidi.addRest(h)
    };
    g.prototype.embed = function(h) {
        this.javamidi.embed(h);
        this.qtmidi.embed(h, true)
    };

    function b(h) {
        this.playlist = [];
        this.trackcount = 0;
        this.timecount = 0;
        this.tempo = 60;
        this.midiapi = MIDIPlugin;
        this.midiwriter = h;
        this.noteOnAndChannel = "%90"
    }
    b.prototype.setTempo = function(h) {
        this.tempo = h
    };
    b.prototype.startTrack = function() {
        this.silencelength = 0;
        this.trackcount++;
        this.timecount = 0;
        this.playlistpos = 0;
        this.first = true;
        if (this.instrument) {
            this.setInstrument(this.instrument)
        }
        if (this.channel) {
            this.setChannel(this.channel)
        }
    };
    b.prototype.endTrack = function() {};
    b.prototype.setInstrument = function(h) {
        this.instrument = h;
        this.midiapi.setInstrument(h)
    };
    b.prototype.setChannel = function(h) {
        this.channel = h;
        this.midiapi.setChannel(h)
    };
    b.prototype.updatePos = function() {
        while (this.playlist[this.playlistpos] && this.playlist[this.playlistpos].time < this.timecount) {
            this.playlistpos++
        }
    };
    b.prototype.startNote = function(k, i, j) {
        this.timecount += this.silencelength;
        this.silencelength = 0;
        if (this.first) {}
        this.updatePos();
        var h = this;
        this.playlist.splice(this.playlistpos, 0, {
            time: this.timecount,
            funct: function() {
                h.midiapi.playNote(k);
                h.midiwriter.notifySelect(j)
            }
        })
    };
    b.prototype.endNote = function(j, i) {
        this.timecount += i;
        this.updatePos();
        var h = this;
        this.playlist.splice(this.playlistpos, 0, {
            time: this.timecount,
            funct: function() {
                h.midiapi.stopNote(j)
            }
        })
    };
    b.prototype.addRest = function(h) {
        this.silencelength += h
    };
    b.prototype.embed = function(i) {
        this.playlink = a(document.createElement("a"), {
            style: "border:1px solid black; margin:3px;"
        });
        this.playlink.innerHTML = "play";
        var h = this;
        this.playlink.onmousedown = function() {
            if (h.playing) {
                this.innerHTML = "play";
                h.pausePlay()
            } else {
                this.innerHTML = "pause";
                h.startPlay()
            }
        };
        i.appendChild(this.playlink);
        var j = a(document.createElement("a"), {
            style: "border:1px solid black; margin:3px;"
        });
        j.innerHTML = "stop";
        j.onmousedown = function() {
            h.stopPlay()
        };
        i.appendChild(j);
        this.i = 0;
        this.currenttime = 0;
        this.playing = false
    };
    b.prototype.stopPlay = function() {
        this.i = 0;
        this.currenttime = 0;
        this.pausePlay();
        this.playlink.innerHTML = "play"
    };
    b.prototype.startPlay = function() {
        this.playing = true;
        var h = this;
        this.ticksperinterval = 480 / 4;
        this.doPlay();
        this.playinterval = window.setInterval(function() {
            h.doPlay()
        }, (60000 / (this.tempo * 4)))
    };
    b.prototype.pausePlay = function() {
        this.playing = false;
        window.clearInterval(this.playinterval);
        this.midiapi.stopAllNotes()
    };
    b.prototype.doPlay = function() {
        while (this.playlist[this.i] && this.playlist[this.i].time <= this.currenttime) {
            this.playlist[this.i].funct();
            this.i++
        }
        if (this.playlist[this.i]) {
            this.currenttime += this.ticksperinterval
        } else {
            this.stopPlay()
        }
    };

    function d() {
        this.trackstrings = "";
        this.trackcount = 0;
        this.noteOnAndChannel = "%90"
    }
    d.prototype.setTempo = function(h) {
        if (this.trackcount === 0) {
            this.startTrack();
            this.track += "%00%FF%51%03" + c(Math.round(60000000 / h), 6);
            this.endTrack()
        }
    };
    d.prototype.startTrack = function() {
        this.track = "";
        this.silencelength = 0;
        this.trackcount++;
        this.first = true;
        if (this.instrument) {
            this.setInstrument(this.instrument)
        }
    };
    d.prototype.endTrack = function() {
        var h = c(this.track.length / 3 + 4, 8);
        this.track = "MTrk" + h + this.track + "%00%FF%2F%00";
        this.trackstrings += this.track
    };
    d.prototype.setInstrument = function(h) {
        if (this.track) {
            this.track = "%00%C0" + c(h, 2) + this.track
        } else {
            this.track = "%00%C0" + c(h, 2)
        }
        this.instrument = h
    };
    d.prototype.setChannel = function(h) {
        this.channel = h - 1;
        this.noteOnAndChannel = "%9" + this.channel.toString(16)
    };
    d.prototype.startNote = function(i, h) {
        this.track += e(this.silencelength);
        this.silencelength = 0;
        if (this.first) {
            this.first = false;
            this.track += this.noteOnAndChannel
        }
        this.track += "%" + i.toString(16) + "%" + h
    };
    d.prototype.endNote = function(i, h) {
        this.track += e(h);
        this.track += "%" + i.toString(16) + "%00"
    };
    d.prototype.addRest = function(h) {
        this.silencelength += h
    };
    d.prototype.embed = function(i, h) {
        var k = "data:audio/midi,MThd%00%00%00%06%00%01" + c(this.trackcount, 4) + "%01%e0" + this.trackstrings;
        var j = a(document.createElement("a"), {
            href: k
        });
        j.innerHTML = "download midi";
        i.insertBefore(j, i.firstChild);
        if (h) {
            return
        }
        var l = a(document.createElement("embed"), {
            src: k,
            type: "video/quicktime",
            controller: "true",
            autoplay: "false",
            loop: "false",
            enablejavascript: "true",
            style: "display:block; height: 20px;"
        });
        i.insertBefore(l, i.firstChild)
    };

    function f(k) {
        var h = "";
        for (var j = 0; j < k.length; j += 2) {
            h += "%";
            h += k.substr(j, 2)
        }
        return h
    }

    function c(j, i) {
        var h = j.toString(16);
        while (h.length < i) {
            h = "0" + h
        }
        return f(h)
    }

    function e(o) {
        var k = 0;
        var h = [];
        while (o !== 0) {
            h.push(o & 127);
            o = o >> 7
        }
        for (var j = h.length - 1; j >= 0; j--) {
            k = k << 8;
            var l = h[j];
            if (j !== 0) {
                l = l | 128
            }
            k = k | l
        }
        var m = k.toString(16).length;
        m += m % 2;
        return c(k, m)
    }
    ABCJS.midi.MidiWriter = function(i, h) {
        h = h || {};
        this.parent = i;
        this.scale = [0, 2, 4, 5, 7, 9, 11];
        this.restart = {
            line: 0,
            staff: 0,
            voice: 0,
            pos: 0
        };
        this.visited = {};
        this.multiplier = 1;
        this.next = null;
        this.qpm = h.qpm || 180;
        this.program = h.program || 2;
        this.noteOnAndChannel = "%90";
        this.javamidi = h.type === "java" || false;
        this.listeners = [];
        this.transpose = 0;
        if (this.javamidi) {
            MIDIPlugin = document.MIDIPlugin;
            setTimeout(function() {
                try {
                    MIDIPlugin.openPlugin()
                } catch (k) {
                    var j = document.createElement("a");
                    j.href = "http://java.sun.com/products/java-media/sound/soundbanks.html";
                    j.target = "_blank";
                    j.appendChild(document.createTextNode("Download Soundbank"));
                    i.appendChild(j)
                }
            }, 0)
        }
    };
    ABCJS.midi.MidiWriter.prototype.addListener = function(h) {
        this.listeners.push(h)
    };
    ABCJS.midi.MidiWriter.prototype.notifySelect = function(j) {
        for (var h = 0; h < this.listeners.length; h++) {
            this.listeners[h].notifySelect(j.abselem)
        }
    };
    ABCJS.midi.MidiWriter.prototype.getMark = function() {
        return {
            line: this.line,
            staff: this.staff,
            voice: this.voice,
            pos: this.pos
        }
    };
    ABCJS.midi.MidiWriter.prototype.getMarkString = function(h) {
        h = h || this;
        return "line" + h.line + "staff" + h.staff + "voice" + h.voice + "pos" + h.pos
    };
    ABCJS.midi.MidiWriter.prototype.goToMark = function(h) {
        this.line = h.line;
        this.staff = h.staff;
        this.voice = h.voice;
        this.pos = h.pos
    };
    ABCJS.midi.MidiWriter.prototype.markVisited = function() {
        this.lastmark = this.getMarkString();
        this.visited[this.lastmark] = true
    };
    ABCJS.midi.MidiWriter.prototype.isVisited = function() {
        if (this.visited[this.getMarkString()]) {
            return true
        }
        return false
    };
    ABCJS.midi.MidiWriter.prototype.setJumpMark = function(h) {
        this.visited[this.lastmark] = h
    };
    ABCJS.midi.MidiWriter.prototype.getJumpMark = function() {
        return this.visited[this.getMarkString()]
    };
    ABCJS.midi.MidiWriter.prototype.getLine = function() {
        return this.abctune.lines[this.line]
    };
    ABCJS.midi.MidiWriter.prototype.getStaff = function() {
        try {
            return this.getLine().staff[this.staff]
        } catch (h) {}
    };
    ABCJS.midi.MidiWriter.prototype.getVoice = function() {
        return this.getStaff().voices[this.voice]
    };
    ABCJS.midi.MidiWriter.prototype.getElem = function() {
        return this.getVoice()[this.pos]
    };
    ABCJS.midi.MidiWriter.prototype.writeABC = function(l) {
        try {
            this.midi = (this.javamidi) ? new g(new b(this), new d()) : new d();
            this.baraccidentals = [];
            this.abctune = l;
            this.baseduration = 480 * 4;
            if (l.formatting.midi && l.formatting.midi.transpose) {
                this.transpose = l.formatting.midi.transpose
            }
            if (l.formatting.midi && l.formatting.midi.program && l.formatting.midi.program.program) {
                this.midi.setInstrument(l.formatting.midi.program.program)
            } else {
                this.midi.setInstrument(this.program)
            }
            if (l.formatting.midi && l.formatting.midi.channel) {
                this.midi.setChannel(l.formatting.midi.channel)
            }
            if (l.metaText.tempo) {
                var k = 1 / 4;
                if (l.metaText.tempo.duration) {
                    k = l.metaText.tempo.duration[0]
                }
                var j = 60;
                if (l.metaText.tempo.bpm) {
                    j = l.metaText.tempo.bpm
                }
                this.qpm = j * k * 4
            }
            this.midi.setTempo(this.qpm);
            this.staffcount = 1;
            for (this.staff = 0; this.staff < this.staffcount; this.staff++) {
                this.voicecount = 1;
                for (this.voice = 0; this.voice < this.voicecount; this.voice++) {
                    this.midi.startTrack();
                    this.restart = {
                        line: 0,
                        staff: this.staff,
                        voice: this.voice,
                        pos: 0
                    };
                    this.next = null;
                    for (this.line = 0; this.line < l.lines.length; this.line++) {
                        var h = l.lines[this.line];
                        if (this.getLine().staff) {
                            this.writeABCLine()
                        }
                    }
                    this.midi.endTrack()
                }
            }
            this.midi.embed(this.parent)
        } catch (i) {
            this.parent.innerHTML = "Couldn't write midi: " + i
        }
    };
    ABCJS.midi.MidiWriter.prototype.writeABCLine = function() {
        this.staffcount = this.getLine().staff.length;
        this.voicecount = this.getStaff().voices.length;
        this.setKeySignature(this.getStaff().key);
        this.writeABCVoiceLine()
    };
    ABCJS.midi.MidiWriter.prototype.writeABCVoiceLine = function() {
        this.pos = 0;
        while (this.pos < this.getVoice().length) {
            this.writeABCElement(this.getElem());
            if (this.next) {
                this.goToMark(this.next);
                this.next = null;
                if (!this.getLine().staff) {
                    return
                }
            } else {
                this.pos++
            }
        }
    };
    ABCJS.midi.MidiWriter.prototype.writeABCElement = function(h) {
        var i;
        switch (h.el_type) {
            case "note":
                this.writeNote(h);
                break;
            case "key":
                this.setKeySignature(h);
                break;
            case "bar":
                this.handleBar(h);
                break;
            case "meter":
            case "clef":
                break;
            default:
        }
    };
    ABCJS.midi.MidiWriter.prototype.writeNote = function(m) {
        if (m.startTriplet) {
            if (m.startTriplet === 2) {
                this.multiplier = 3 / 2
            } else {
                this.multiplier = (m.startTriplet - 1) / m.startTriplet
            }
        }
        var h = m.duration * this.baseduration * this.multiplier;
        if (m.pitches) {
            var l = [];
            for (var j = 0; j < m.pitches.length; j++) {
                var k = m.pitches[j];
                var n = k.pitch;
                if (k.accidental) {
                    switch (k.accidental) {
                        case "sharp":
                            this.baraccidentals[n] = 1;
                            break;
                        case "flat":
                            this.baraccidentals[n] = -1;
                            break;
                        case "natural":
                            this.baraccidentals[n] = 0;
                            break;
                        case "dblsharp":
                            this.baraccidentals[n] = 2;
                            break;
                        case "dblflat":
                            this.baraccidentals[n] = -2;
                            break
                    }
                }
                l[j] = 60 + 12 * this.extractOctave(n) + this.scale[this.extractNote(n)];
                if (this.baraccidentals[n] !== undefined) {
                    l[j] += this.baraccidentals[n]
                } else {
                    l[j] += this.accidentals[this.extractNote(n)]
                }
                l[j] += this.transpose;
                this.midi.startNote(l[j], 64, m);
                if (k.startTie) {
                    this.tieduration = h
                }
            }
            for (j = 0; j < m.pitches.length; j++) {
                var k = m.pitches[j];
                var n = k.pitch + this.transpose;
                if (k.startTie) {
                    continue
                }
                if (k.endTie) {
                    this.midi.endNote(l[j], h + this.tieduration)
                } else {
                    this.midi.endNote(l[j], h)
                }
                h = 0;
                this.tieduration = 0
            }
        } else {
            if (m.rest && m.rest.type !== "spacer") {
                this.midi.addRest(h)
            }
        }
        if (m.endTriplet) {
            this.multiplier = 1
        }
    };
    ABCJS.midi.MidiWriter.prototype.handleBar = function(l) {
        this.baraccidentals = [];
        var m = (l.type === "bar_right_repeat" || l.type === "bar_dbl_repeat");
        var k = (l.startEnding) ? true : false;
        var h = (m || k);
        var j = (l.type === "bar_left_repeat" || l.type === "bar_dbl_repeat" || l.type === "bar_thick_thin" || l.type === "bar_thin_thick" || l.type === "bar_thin_thin" || l.type === "bar_right_repeat");
        var i = null;
        if (this.isVisited()) {
            i = this.getJumpMark()
        } else {
            if (k || m) {
                if (this.visited[this.lastmark] === true) {
                    this.setJumpMark(this.getMark())
                }
            }
            if (h) {
                this.markVisited()
            }
            if (m) {
                i = this.restart;
                this.setJumpMark(this.getMark())
            }
        }
        if (j) {
            this.restart = this.getMark()
        }
        if (i && this.getMarkString(i) !== this.getMarkString()) {
            this.next = i
        }
    };
    ABCJS.midi.MidiWriter.prototype.setKeySignature = function(h) {
        this.accidentals = [0, 0, 0, 0, 0, 0, 0];
        if (this.abctune.formatting.bagpipes) {
            h.accidentals = [{
                acc: "natural",
                note: "g"
            }, {
                acc: "sharp",
                note: "f"
            }, {
                acc: "sharp",
                note: "c"
            }]
        }
        if (!h.accidentals) {
            return
        }
        window.ABCJS.parse.each(h.accidentals, function(k) {
            var l = (k.acc === "sharp") ? 1 : (k.acc === "natural") ? 0 : -1;
            var j = k.note.toLowerCase();
            var i = this.extractNote(j.charCodeAt(0) - "c".charCodeAt(0));
            this.accidentals[i] += l
        }, this)
    };
    ABCJS.midi.MidiWriter.prototype.extractNote = function(h) {
        h = h % 7;
        if (h < 0) {
            h += 7
        }
        return h
    };
    ABCJS.midi.MidiWriter.prototype.extractOctave = function(h) {
        return Math.floor(h / 7)
    }
})();
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.parse) {
    window.ABCJS.parse = {}
}
window.ABCJS.parse.clone = function(c) {
    var a = {};
    for (var b in c) {
        if (c.hasOwnProperty(b)) {
            a[b] = c[b]
        }
    }
    return a
};
window.ABCJS.parse.gsub = function(c, b, a) {
    return c.split(b).join(a)
};
window.ABCJS.parse.strip = function(a) {
    return a.replace(/^\s+/, "").replace(/\s+$/, "")
};
window.ABCJS.parse.startsWith = function(b, a) {
    return b.indexOf(a) === 0
};
window.ABCJS.parse.endsWith = function(c, a) {
    var b = c.length - a.length;
    return b >= 0 && c.lastIndexOf(a) === b
};
window.ABCJS.parse.each = function(a, d, c) {
    for (var b = 0, e = a.length; b < e; b++) {
        d.apply(c, [a[b], b])
    }
};
window.ABCJS.parse.last = function(a) {
    if (a.length === 0) {
        return null
    }
    return a[a.length - 1]
};
window.ABCJS.parse.compact = function(a) {
    var b = [];
    for (var c = 0; c < a.length; c++) {
        if (a[c]) {
            b.push(a[c])
        }
    }
    return b
};
window.ABCJS.parse.detect = function(a, c) {
    for (var b = 0; b < a.length; b++) {
        if (c(a[b])) {
            return true
        }
    }
    return false
};
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.parse) {
    window.ABCJS.parse = {}
}
window.ABCJS.parse.Parse = function() {
    var g = new window.ABCJS.data.Tune();
    var r = new window.ABCJS.parse.tokenizer();
    this.getTune = function() {
        return g
    };

    function D(H, G, I) {
        if (!H.positioning) {
            H.positioning = {}
        }
        H.positioning[G] = I
    }

    function n(H, G, I) {
        if (!H.fonts) {
            H.fonts = {}
        }
        H.fonts[G] = I
    }
    var C = {
        reset: function() {
            for (var G in this) {
                if (this.hasOwnProperty(G) && typeof this[G] !== "function") {
                    delete this[G]
                }
            }
            this.iChar = 0;
            this.key = {
                accidentals: [],
                root: "none",
                acc: "",
                mode: ""
            };
            this.meter = {
                type: "specified",
                value: [{
                    num: "4",
                    den: "4"
                }]
            };
            this.origMeter = {
                type: "specified",
                value: [{
                    num: "4",
                    den: "4"
                }]
            };
            this.hasMainTitle = false;
            this.default_length = 0.125;
            this.clef = {
                type: "treble",
                verticalPos: 0
            };
            this.next_note_duration = 0;
            this.start_new_line = true;
            this.is_in_header = true;
            this.is_in_history = false;
            this.partForNextLine = "";
            this.havent_set_length = true;
            this.voices = {};
            this.staves = [];
            this.macros = {};
            this.currBarNumber = 1;
            this.inTextBlock = false;
            this.inPsBlock = false;
            this.ignoredDecorations = [];
            this.textBlock = "";
            this.score_is_present = false;
            this.inEnding = false;
            this.inTie = false;
            this.inTieChord = {};
            this.vocalPosition = "auto";
            this.dynamicPosition = "auto";
            this.chordPosition = "auto";
            this.ornamentPosition = "auto";
            this.volumePosition = "auto";
            this.openSlurs = []
        },
        differentFont: function(H, G) {
            if (this[H].decoration !== G[H].decoration) {
                return true
            }
            if (this[H].face !== G[H].face) {
                return true
            }
            if (this[H].size !== G[H].size) {
                return true
            }
            if (this[H].style !== G[H].style) {
                return true
            }
            if (this[H].weight !== G[H].weight) {
                return true
            }
            return false
        },
        addFormattingOptions: function(I, H, G) {
            if (G === "note") {
                if (this.vocalPosition !== "auto") {
                    D(I, "vocalPosition", this.vocalPosition)
                }
                if (this.dynamicPosition !== "auto") {
                    D(I, "dynamicPosition", this.dynamicPosition)
                }
                if (this.chordPosition !== "auto") {
                    D(I, "chordPosition", this.chordPosition)
                }
                if (this.ornamentPosition !== "auto") {
                    D(I, "ornamentPosition", this.ornamentPosition)
                }
                if (this.volumePosition !== "auto") {
                    D(I, "volumePosition", this.volumePosition)
                }
                if (this.differentFont("annotationfont", H)) {
                    n(I, "annotationfont", this.annotationfont)
                }
                if (this.differentFont("gchordfont", H)) {
                    n(I, "gchordfont", this.gchordfont)
                }
                if (this.differentFont("vocalfont", H)) {
                    n(I, "vocalfont", this.vocalfont)
                }
            } else {
                if (G === "bar") {
                    if (this.dynamicPosition !== "auto") {
                        D(I, "dynamicPosition", this.dynamicPosition)
                    }
                    if (this.chordPosition !== "auto") {
                        D(I, "chordPosition", this.chordPosition)
                    }
                    if (this.ornamentPosition !== "auto") {
                        D(I, "ornamentPosition", this.ornamentPosition)
                    }
                    if (this.volumePosition !== "auto") {
                        D(I, "volumePosition", this.volumePosition)
                    }
                    if (this.differentFont("measurefont", H)) {
                        n(I, "measurefont", this.measurefont)
                    }
                    if (this.differentFont("repeatfont", H)) {
                        n(I, "repeatfont", this.repeatfont)
                    }
                }
            }
        }
    };
    var F = function(G) {
        if (!C.warnings) {
            C.warnings = []
        }
        C.warnings.push(G)
    };
    var d = function(H) {
        var G = window.ABCJS.parse.gsub(H, "\x12", " ");
        G = window.ABCJS.parse.gsub(G, "&", "&amp;");
        G = window.ABCJS.parse.gsub(G, "<", "&lt;");
        return window.ABCJS.parse.gsub(G, ">", "&gt;")
    };
    var B = function(K, G, J) {
        if (!G) {
            G = " "
        }
        var I = G.charAt(J);
        if (I === " ") {
            I = "SPACE"
        }
        var H = d(G.substring(0, J)) + '<span style="text-decoration:underline;font-size:1.3em;font-weight:bold;">' + I + "</span>" + d(G.substring(J + 1));
        F("Music Line:" + g.getNumLines() + ":" + (J + 1) + ": " + K + ":  " + H)
    };
    var y = new window.ABCJS.parse.ParseHeader(r, B, C, g);
    this.getWarnings = function() {
        return C.warnings
    };
    var x = function(I, J) {
        if (I.charAt(J) === '"') {
            var K = r.getBrackettedSubstring(I, J, 5);
            if (!K[2]) {
                B("Missing the closing quote while parsing the chord symbol", I, J)
            }
            if (K[0] > 0 && K[1].length > 0 && K[1].charAt(0) === "^") {
                K[1] = K[1].substring(1);
                K[2] = "above"
            } else {
                if (K[0] > 0 && K[1].length > 0 && K[1].charAt(0) === "_") {
                    K[1] = K[1].substring(1);
                    K[2] = "below"
                } else {
                    if (K[0] > 0 && K[1].length > 0 && K[1].charAt(0) === "<") {
                        K[1] = K[1].substring(1);
                        K[2] = "left"
                    } else {
                        if (K[0] > 0 && K[1].length > 0 && K[1].charAt(0) === ">") {
                            K[1] = K[1].substring(1);
                            K[2] = "right"
                        } else {
                            if (K[0] > 0 && K[1].length > 0 && K[1].charAt(0) === "@") {
                                K[1] = K[1].substring(1);
                                var G = r.getFloat(K[1]);
                                if (G.digits === 0) {
                                    B("Missing first position in absolutely positioned annotation.", I, J)
                                }
                                K[1] = K[1].substring(G.digits);
                                if (K[1][0] !== ",") {
                                    B("Missing comma absolutely positioned annotation.", I, J)
                                }
                                K[1] = K[1].substring(1);
                                var L = r.getFloat(K[1]);
                                if (L.digits === 0) {
                                    B("Missing second position in absolutely positioned annotation.", I, J)
                                }
                                K[1] = K[1].substring(L.digits);
                                var H = r.skipWhiteSpace(K[1]);
                                K[1] = K[1].substring(H);
                                K[2] = null;
                                K[3] = {
                                    x: G.value,
                                    y: L.value
                                }
                            } else {
                                K[1] = K[1].replace(/([ABCDEFG])b/g, "$1♭");
                                K[1] = K[1].replace(/([ABCDEFG])#/g, "$1♯");
                                K[2] = "default"
                            }
                        }
                    }
                }
            }
            return K
        }
        return [0, ""]
    };
    var t = ["trill", "lowermordent", "uppermordent", "mordent", "pralltriller", "accent", "fermata", "invertedfermata", "tenuto", "0", "1", "2", "3", "4", "5", "+", "wedge", "open", "thumb", "snap", "turn", "roll", "breath", "shortphrase", "mediumphrase", "longphrase", "segno", "coda", "D.S.", "D.C.", "fine", "slide", "^", "marcato", "upbow", "downbow", "/", "//", "///", "////", "trem1", "trem2", "trem3", "trem4", "turnx", "invertedturn", "invertedturnx", "trill(", "trill)", "arpeggio", "xstem", "mark", "umarcato", "style=normal", "style=harmonic", "style=rhythm", "style=x"];
    var E = ["p", "pp", "f", "ff", "mf", "mp", "ppp", "pppp", "fff", "ffff", "sfz"];
    var b = ["crescendo(", "crescendo)", "diminuendo(", "diminuendo)"];
    var v = [
        ["<", "accent"],
        [">", "accent"],
        ["tr", "trill"],
        ["plus", "+"],
        ["emphasis", "accent"],
        ["^", "umarcato"],
        ["marcato", "umarcato"]
    ];
    var i = [
        ["<(", "crescendo("],
        ["<)", "crescendo)"],
        [">(", "diminuendo("],
        [">)", "diminuendo)"]
    ];
    var k = function(G, I) {
        var J = C.macros[G.charAt(I)];
        if (J !== undefined) {
            if (J.charAt(0) === "!" || J.charAt(0) === "+") {
                J = J.substring(1)
            }
            if (J.charAt(J.length - 1) === "!" || J.charAt(J.length - 1) === "+") {
                J = J.substring(0, J.length - 1)
            }
            if (window.ABCJS.parse.detect(t, function(K) {
                    return (J === K)
                })) {
                return [1, J]
            } else {
                if (window.ABCJS.parse.detect(E, function(K) {
                        return (J === K)
                    })) {
                    if (C.volumePosition === "hidden") {
                        J = ""
                    }
                    return [1, J]
                } else {
                    if (window.ABCJS.parse.detect(b, function(K) {
                            if (C.dynamicPosition === "hidden") {
                                J = ""
                            }
                            return (J === K)
                        })) {
                        return [1, J]
                    } else {
                        if (!window.ABCJS.parse.detect(C.ignoredDecorations, function(K) {
                                return (J === K)
                            })) {
                            B("Unknown macro: " + J, G, I)
                        }
                        return [1, ""]
                    }
                }
            }
        }
        switch (G.charAt(I)) {
            case ".":
                return [1, "staccato"];
            case "u":
                return [1, "upbow"];
            case "v":
                return [1, "downbow"];
            case "~":
                return [1, "irishroll"];
            case "!":
            case "+":
                var H = r.getBrackettedSubstring(G, I, 5);
                if (H[1].length > 0 && (H[1].charAt(0) === "^" || H[1].charAt(0) === "_")) {
                    H[1] = H[1].substring(1)
                }
                if (window.ABCJS.parse.detect(t, function(K) {
                        return (H[1] === K)
                    })) {
                    return H
                }
                if (window.ABCJS.parse.detect(E, function(K) {
                        return (H[1] === K)
                    })) {
                    if (C.volumePosition === "hidden") {
                        H[1] = ""
                    }
                    return H
                }
                if (window.ABCJS.parse.detect(b, function(K) {
                        return (H[1] === K)
                    })) {
                    if (C.dynamicPosition === "hidden") {
                        H[1] = ""
                    }
                    return H
                }
                if (window.ABCJS.parse.detect(v, function(K) {
                        if (H[1] === K[0]) {
                            H[1] = K[1];
                            return true
                        } else {
                            return false
                        }
                    })) {
                    return H
                }
                if (window.ABCJS.parse.detect(i, function(K) {
                        if (H[1] === K[0]) {
                            H[1] = K[1];
                            return true
                        } else {
                            return false
                        }
                    })) {
                    if (C.dynamicPosition === "hidden") {
                        H[1] = ""
                    }
                    return H
                }
                if (G.charAt(I) === "!" && (H[0] === 1 || G.charAt(I + H[0] - 1) !== "!")) {
                    return [1, null]
                }
                B("Unknown decoration: " + H[1], G, I);
                H[1] = "";
                return H;
            case "H":
                return [1, "fermata"];
            case "J":
                return [1, "slide"];
            case "L":
                return [1, "accent"];
            case "M":
                return [1, "mordent"];
            case "O":
                return [1, "coda"];
            case "P":
                return [1, "pralltriller"];
            case "R":
                return [1, "roll"];
            case "S":
                return [1, "segno"];
            case "T":
                return [1, "trill"]
        }
        return [0, 0]
    };
    var f = function(G, H) {
        var I = H;
        while (r.isWhiteSpace(G.charAt(H))) {
            H++
        }
        return [H - I]
    };
    var w = function(I, L) {
        var J = r.getBarLine(I, L);
        if (J.len === 0) {
            return [0, ""]
        }
        if (J.warn) {
            B(J.warn, I, L);
            return [J.len, ""]
        }
        for (var H = 0; H < I.length; H++) {
            if (I.charAt(L + J.len + H) !== " ") {
                break
            }
        }
        var M = J.len;
        if (I.charAt(L + J.len + H) === "[") {
            J.len += H + 1
        }
        if (I.charAt(L + J.len) === '"' && I.charAt(L + J.len - 1) === "[") {
            var G = r.getBrackettedSubstring(I, L + J.len, 5);
            return [J.len + G[0], J.token, G[1]]
        }
        var K = r.getTokenOf(I.substring(L + J.len), "1234567890-,");
        if (K.len === 0 || K.token[0] === "-") {
            return [M, J.token]
        }
        return [J.len + K.len, J.token, K.token]
    };
    var s = function(G, I) {
        var H = {};
        var J = I;
        while (G.charAt(I) === "(" || r.isWhiteSpace(G.charAt(I))) {
            if (G.charAt(I) === "(") {
                if (I + 1 < G.length && (G.charAt(I + 1) >= "2" && G.charAt(I + 1) <= "9")) {
                    if (H.triplet !== undefined) {
                        B("Can't nest triplets", G, I)
                    } else {
                        H.triplet = G.charAt(I + 1) - "0";
                        if (I + 2 < G.length && G.charAt(I + 2) === ":") {
                            if (I + 3 < G.length && G.charAt(I + 3) === ":") {
                                if (I + 4 < G.length && (G.charAt(I + 4) >= "1" && G.charAt(I + 4) <= "9")) {
                                    H.num_notes = G.charAt(I + 4) - "0";
                                    I += 3
                                } else {
                                    B("expected number after the two colons after the triplet to mark the duration", G, I)
                                }
                            } else {
                                if (I + 3 < G.length && (G.charAt(I + 3) >= "1" && G.charAt(I + 3) <= "9")) {
                                    if (I + 4 < G.length && G.charAt(I + 4) === ":") {
                                        if (I + 5 < G.length && (G.charAt(I + 5) >= "1" && G.charAt(I + 5) <= "9")) {
                                            H.num_notes = G.charAt(I + 5) - "0";
                                            I += 4
                                        }
                                    } else {
                                        H.num_notes = H.triplet;
                                        I += 3
                                    }
                                } else {
                                    B("expected number after the triplet to mark the duration", G, I)
                                }
                            }
                        }
                    }
                    I++
                } else {
                    if (H.startSlur === undefined) {
                        H.startSlur = 1
                    } else {
                        H.startSlur++
                    }
                }
            }
            I++
        }
        H.consumed = I - J;
        return H
    };
    var q = function(H, N) {
        if (!H) {
            B("Can't add words before the first line of music", H, 0);
            return
        }
        N = window.ABCJS.parse.strip(N);
        if (N.charAt(N.length - 1) !== "-") {
            N = N + " "
        }
        var M = [];
        var L = 0;
        var J = false;
        var G = function(O) {
            var P = window.ABCJS.parse.strip(N.substring(L, O));
            L = O + 1;
            if (P.length > 0) {
                if (J) {
                    P = window.ABCJS.parse.gsub(P, "~", " ")
                }
                var Q = N.charAt(O);
                if (Q !== "_" && Q !== "-") {
                    Q = " "
                }
                M.push({
                    syllable: r.translateString(P),
                    divider: Q
                });
                J = false;
                return true
            }
            return false
        };
        for (var I = 0; I < N.length; I++) {
            switch (N.charAt(I)) {
                case " ":
                case "\x12":
                    G(I);
                    break;
                case "-":
                    if (!G(I) && M.length > 0) {
                        window.ABCJS.parse.last(M).divider = "-";
                        M.push({
                            skip: true,
                            to: "next"
                        })
                    }
                    break;
                case "_":
                    G(I);
                    M.push({
                        skip: true,
                        to: "slur"
                    });
                    break;
                case "*":
                    G(I);
                    M.push({
                        skip: true,
                        to: "next"
                    });
                    break;
                case "|":
                    G(I);
                    M.push({
                        skip: true,
                        to: "bar"
                    });
                    break;
                case "~":
                    J = true;
                    break
            }
        }
        var K = false;
        window.ABCJS.parse.each(H, function(P) {
            if (M.length !== 0) {
                if (M[0].skip) {
                    switch (M[0].to) {
                        case "next":
                            if (P.el_type === "note" && P.pitches !== null && !K) {
                                M.shift()
                            }
                            break;
                        case "slur":
                            if (P.el_type === "note" && P.pitches !== null) {
                                M.shift()
                            }
                            break;
                        case "bar":
                            if (P.el_type === "bar") {
                                M.shift()
                            }
                            break
                    }
                } else {
                    if (P.el_type === "note" && P.rest === undefined && !K) {
                        var O = M.shift();
                        if (P.lyric === undefined) {
                            P.lyric = [O]
                        } else {
                            P.lyric.push(O)
                        }
                    }
                }
            }
        })
    };
    var e = function(H, N) {
        if (!H) {
            B("Can't add symbols before the first line of music", H, 0);
            return
        }
        N = window.ABCJS.parse.strip(N);
        if (N.charAt(N.length - 1) !== "-") {
            N = N + " "
        }
        var M = [];
        var L = 0;
        var J = false;
        var G = function(O) {
            var P = window.ABCJS.parse.strip(N.substring(L, O));
            L = O + 1;
            if (P.length > 0) {
                if (J) {
                    P = window.ABCJS.parse.gsub(P, "~", " ")
                }
                var Q = N.charAt(O);
                if (Q !== "_" && Q !== "-") {
                    Q = " "
                }
                M.push({
                    syllable: r.translateString(P),
                    divider: Q
                });
                J = false;
                return true
            }
            return false
        };
        for (var I = 0; I < N.length; I++) {
            switch (N.charAt(I)) {
                case " ":
                case "\x12":
                    G(I);
                    break;
                case "-":
                    if (!G(I) && M.length > 0) {
                        window.ABCJS.parse.last(M).divider = "-";
                        M.push({
                            skip: true,
                            to: "next"
                        })
                    }
                    break;
                case "_":
                    G(I);
                    M.push({
                        skip: true,
                        to: "slur"
                    });
                    break;
                case "*":
                    G(I);
                    M.push({
                        skip: true,
                        to: "next"
                    });
                    break;
                case "|":
                    G(I);
                    M.push({
                        skip: true,
                        to: "bar"
                    });
                    break;
                case "~":
                    J = true;
                    break
            }
        }
        var K = false;
        window.ABCJS.parse.each(H, function(P) {
            if (M.length !== 0) {
                if (M[0].skip) {
                    switch (M[0].to) {
                        case "next":
                            if (P.el_type === "note" && P.pitches !== null && !K) {
                                M.shift()
                            }
                            break;
                        case "slur":
                            if (P.el_type === "note" && P.pitches !== null) {
                                M.shift()
                            }
                            break;
                        case "bar":
                            if (P.el_type === "bar") {
                                M.shift()
                            }
                            break
                    }
                } else {
                    if (P.el_type === "note" && P.rest === undefined && !K) {
                        var O = M.shift();
                        if (P.lyric === undefined) {
                            P.lyric = [O]
                        } else {
                            P.lyric.push(O)
                        }
                    }
                }
            }
        })
    };
    var c = function(G, H) {
        switch (G.charAt(H)) {
            case ">":
                if (H < G.length - 1 && G.charAt(H + 1) === ">") {
                    return [2, 1.75, 0.25]
                } else {
                    return [1, 1.5, 0.5]
                }
                break;
            case "<":
                if (H < G.length - 1 && G.charAt(H + 1) === "<") {
                    return [2, 0.25, 1.75]
                } else {
                    return [1, 0.5, 1.5]
                }
                break
        }
        return null
    };
    var h = function(G) {
        if (G.duration !== undefined && G.duration < 0.25) {
            G.end_beam = true
        }
        return G
    };
    var m = {
        A: 5,
        B: 6,
        C: 0,
        D: 1,
        E: 2,
        F: 3,
        G: 4,
        a: 12,
        b: 13,
        c: 7,
        d: 8,
        e: 9,
        f: 10,
        g: 11
    };
    var a = {
        x: "invisible",
        y: "spacer",
        z: "rest",
        Z: "multimeasure"
    };
    var l = function(P, M, I, G) {
        var N = function(Q) {
            return (Q === "octave" || Q === "duration" || Q === "Zduration" || Q === "broken_rhythm" || Q === "end_slur")
        };
        var H = "startSlur";
        var J = false;
        while (1) {
            switch (P.charAt(M)) {
                case "(":
                    if (H === "startSlur") {
                        if (I.startSlur === undefined) {
                            I.startSlur = 1
                        } else {
                            I.startSlur++
                        }
                    } else {
                        if (N(H)) {
                            I.endChar = M;
                            return I
                        } else {
                            return null
                        }
                    }
                    break;
                case ")":
                    if (N(H)) {
                        if (I.endSlur === undefined) {
                            I.endSlur = 1
                        } else {
                            I.endSlur++
                        }
                    } else {
                        return null
                    }
                    break;
                case "^":
                    if (H === "startSlur") {
                        I.accidental = "sharp";
                        H = "sharp2"
                    } else {
                        if (H === "sharp2") {
                            I.accidental = "dblsharp";
                            H = "pitch"
                        } else {
                            if (N(H)) {
                                I.endChar = M;
                                return I
                            } else {
                                return null
                            }
                        }
                    }
                    break;
                case "_":
                    if (H === "startSlur") {
                        I.accidental = "flat";
                        H = "flat2"
                    } else {
                        if (H === "flat2") {
                            I.accidental = "dblflat";
                            H = "pitch"
                        } else {
                            if (N(H)) {
                                I.endChar = M;
                                return I
                            } else {
                                return null
                            }
                        }
                    }
                    break;
                case "=":
                    if (H === "startSlur") {
                        I.accidental = "natural";
                        H = "pitch"
                    } else {
                        if (N(H)) {
                            I.endChar = M;
                            return I
                        } else {
                            return null
                        }
                    }
                    break;
                case "A":
                case "B":
                case "C":
                case "D":
                case "E":
                case "F":
                case "G":
                case "a":
                case "b":
                case "c":
                case "d":
                case "e":
                case "f":
                case "g":
                    if (H === "startSlur" || H === "sharp2" || H === "flat2" || H === "pitch") {
                        I.pitch = m[P.charAt(M)];
                        H = "octave";
                        if (G && C.next_note_duration !== 0) {
                            I.duration = C.next_note_duration;
                            C.next_note_duration = 0;
                            J = true
                        } else {
                            I.duration = C.default_length
                        }
                    } else {
                        if (N(H)) {
                            I.endChar = M;
                            return I
                        } else {
                            return null
                        }
                    }
                    break;
                case ",":
                    if (H === "octave") {
                        I.pitch -= 7
                    } else {
                        if (N(H)) {
                            I.endChar = M;
                            return I
                        } else {
                            return null
                        }
                    }
                    break;
                case "'":
                    if (H === "octave") {
                        I.pitch += 7
                    } else {
                        if (N(H)) {
                            I.endChar = M;
                            return I
                        } else {
                            return null
                        }
                    }
                    break;
                case "x":
                case "y":
                case "z":
                case "Z":
                    if (H === "startSlur") {
                        I.rest = {
                            type: a[P.charAt(M)]
                        };
                        delete I.accidental;
                        delete I.startSlur;
                        delete I.startTie;
                        delete I.endSlur;
                        delete I.endTie;
                        delete I.end_beam;
                        delete I.grace_notes;
                        if (I.rest.type === "multimeasure") {
                            I.duration = 1;
                            H = "Zduration"
                        } else {
                            if (G && C.next_note_duration !== 0) {
                                I.duration = C.next_note_duration;
                                C.next_note_duration = 0;
                                J = true
                            } else {
                                I.duration = C.default_length
                            }
                            H = "duration"
                        }
                    } else {
                        if (N(H)) {
                            I.endChar = M;
                            return I
                        } else {
                            return null
                        }
                    }
                    break;
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                case "0":
                case "/":
                    if (H === "octave" || H === "duration") {
                        var O = r.getFraction(P, M);
                        if (!J) {
                            I.duration = I.duration * O.value
                        }
                        I.endChar = O.index;
                        while (O.index < P.length && (r.isWhiteSpace(P.charAt(O.index)) || P.charAt(O.index) === "-")) {
                            if (P.charAt(O.index) === "-") {
                                I.startTie = {}
                            } else {
                                I = h(I)
                            }
                            O.index++
                        }
                        M = O.index - 1;
                        H = "broken_rhythm"
                    } else {
                        if (H === "sharp2") {
                            I.accidental = "quartersharp";
                            H = "pitch"
                        } else {
                            if (H === "flat2") {
                                I.accidental = "quarterflat";
                                H = "pitch"
                            } else {
                                if (H === "Zduration") {
                                    var L = r.getNumber(P, M);
                                    I.duration = L.num;
                                    I.endChar = L.index;
                                    return I
                                } else {
                                    return null
                                }
                            }
                        }
                    }
                    break;
                case "-":
                    if (H === "startSlur") {
                        g.addTieToLastNote();
                        I.endTie = true
                    } else {
                        if (H === "octave" || H === "duration" || H === "end_slur") {
                            I.startTie = {};
                            if (!J && G) {
                                H = "broken_rhythm"
                            } else {
                                if (r.isWhiteSpace(P.charAt(M + 1))) {
                                    h(I)
                                }
                                I.endChar = M + 1;
                                return I
                            }
                        } else {
                            if (H === "broken_rhythm") {
                                I.endChar = M;
                                return I
                            } else {
                                return null
                            }
                        }
                    }
                    break;
                case " ":
                case "\t":
                    if (N(H)) {
                        I.end_beam = true;
                        do {
                            if (P.charAt(M) === "-") {
                                I.startTie = {}
                            }
                            M++
                        } while (M < P.length && (r.isWhiteSpace(P.charAt(M)) || P.charAt(M) === "-"));
                        I.endChar = M;
                        if (!J && G && (P.charAt(M) === "<" || P.charAt(M) === ">")) {
                            M--;
                            H = "broken_rhythm"
                        } else {
                            return I
                        }
                    } else {
                        return null
                    }
                    break;
                case ">":
                case "<":
                    if (N(H)) {
                        if (G) {
                            var K = c(P, M);
                            M += K[0] - 1;
                            C.next_note_duration = K[2] * I.duration;
                            I.duration = K[1] * I.duration;
                            H = "end_slur"
                        } else {
                            I.endChar = M;
                            return I
                        }
                    } else {
                        return null
                    }
                    break;
                default:
                    if (N(H)) {
                        I.endChar = M;
                        return I
                    }
                    return null
            }
            M++;
            if (M === P.length) {
                if (N(H)) {
                    I.endChar = M;
                    return I
                } else {
                    return null
                }
            }
        }
        return null
    };

    function z() {
        var H = {
            startChar: -1,
            endChar: -1
        };
        if (C.partForNextLine.length) {
            H.part = C.partForNextLine
        }
        H.clef = C.currentVoice && C.staves[C.currentVoice.staffNum].clef !== undefined ? window.ABCJS.parse.clone(C.staves[C.currentVoice.staffNum].clef) : window.ABCJS.parse.clone(C.clef);
        H.key = window.ABCJS.parse.parseKeyVoice.deepCopyKey(C.key);
        window.ABCJS.parse.parseKeyVoice.addPosToKey(H.clef, H.key);
        if (C.meter !== null) {
            if (C.currentVoice) {
                window.ABCJS.parse.each(C.staves, function(I) {
                    I.meter = C.meter
                });
                H.meter = C.staves[C.currentVoice.staffNum].meter;
                C.staves[C.currentVoice.staffNum].meter = null
            } else {
                H.meter = C.meter
            }
            C.meter = null
        } else {
            if (C.currentVoice && C.staves[C.currentVoice.staffNum].meter) {
                H.meter = C.staves[C.currentVoice.staffNum].meter;
                C.staves[C.currentVoice.staffNum].meter = null
            }
        }
        if (C.currentVoice && C.currentVoice.name) {
            H.name = C.currentVoice.name
        }
        if (C.vocalfont) {
            H.vocalfont = C.vocalfont
        }
        if (C.style) {
            H.style = C.style
        }
        if (C.currentVoice) {
            var G = C.staves[C.currentVoice.staffNum];
            if (G.brace) {
                H.brace = G.brace
            }
            if (G.bracket) {
                H.bracket = G.bracket
            }
            if (G.connectBarLines) {
                H.connectBarLines = G.connectBarLines
            }
            if (G.name) {
                H.name = G.name[C.currentVoice.index]
            }
            if (G.subname) {
                H.subname = G.subname[C.currentVoice.index]
            }
            if (C.currentVoice.stem) {
                H.stem = C.currentVoice.stem
            }
            if (C.currentVoice.scale) {
                H.scale = C.currentVoice.scale
            }
            if (C.currentVoice.style) {
                H.style = C.currentVoice.style
            }
        }
        g.startNewLine(H);
        C.partForNextLine = "";
        if (C.currentVoice === undefined || (C.currentVoice.staffNum === C.staves.length - 1 && C.staves[C.currentVoice.staffNum].numVoices - 1 === C.currentVoice.index)) {
            if (C.barNumbers === 0) {
                C.barNumOnNextNote = C.currBarNumber
            }
        }
    }
    var A = function(H, J) {
        if (H.charAt(J) === "{") {
            var I = r.getBrackettedSubstring(H, J, 1, "}");
            if (!I[2]) {
                B("Missing the closing '}' while parsing grace note", H, J)
            }
            if (H[J + I[0]] === ")") {
                I[0] ++;
                I[1] += ")"
            }
            var G = [];
            var L = 0;
            var M = false;
            while (L < I[1].length) {
                var N = false;
                if (I[1].charAt(L) === "/") {
                    N = true;
                    L++
                }
                var K = l(I[1], L, {}, false);
                if (K !== null) {
                    K.duration = K.duration / (C.default_length * 8);
                    if (N) {
                        K.acciaccatura = true
                    }
                    G.push(K);
                    if (M) {
                        K.endTie = true;
                        M = false
                    }
                    if (K.startTie) {
                        M = true
                    }
                    L = K.endChar;
                    delete K.endChar
                } else {
                    if (I[1].charAt(L) === " ") {
                        if (G.length > 0) {
                            G[G.length - 1].end_beam = true
                        }
                    } else {
                        B("Unknown character '" + I[1].charAt(L) + "' while parsing grace note", H, J)
                    }
                    L++
                }
            }
            if (G.length) {
                return [I[0], G]
            }
        }
        return [0]
    };

    function j(G) {
        var H = G.origMeter;
        if (!H || H.type !== "specified") {
            return 1
        }
        if (!H.value || H.value.length === 0) {
            return 1
        }
        return parseInt(H.value[0].num, 10) / parseInt(H.value[0].den, 10)
    }
    var u = "ABCDEFGabcdefgxyzZ[]|^_{";
    var p = function(Q) {
        y.resolveTempo();
        C.is_in_header = false;
        var X = 0;
        var W = C.iChar;
        while (r.isWhiteSpace(Q.charAt(X)) && X < Q.length) {
            X++
        }
        if (X === Q.length || Q.charAt(X) === "%") {
            return
        }
        var aa = C.start_new_line;
        if (C.continueall === undefined) {
            C.start_new_line = true
        } else {
            C.start_new_line = false
        }
        var N = 0;
        var T = y.letter_to_body_header(Q, X);
        if (T[0] > 0) {
            X += T[0]
        }
        var I = {};
        while (X < Q.length) {
            var J = X;
            if (Q.charAt(X) === "%") {
                break
            }
            var H = y.letter_to_inline_header(Q, X);
            if (H[0] > 0) {
                X += H[0]
            } else {
                if (aa) {
                    z();
                    aa = false
                }
                var ac;
                while (1) {
                    ac = r.eatWhiteSpace(Q, X);
                    if (ac > 0) {
                        X += ac
                    }
                    if (X > 0 && Q.charAt(X - 1) === "\x12") {
                        ac = y.letter_to_body_header(Q, X);
                        if (ac[0] > 0) {
                            X = ac[0];
                            C.start_new_line = false
                        }
                    }
                    ac = f(Q, X);
                    if (ac[0] > 0) {
                        X += ac[0]
                    }
                    ac = x(Q, X);
                    if (ac[0] > 0) {
                        if (!I.chord) {
                            I.chord = []
                        }
                        var M = r.translateString(ac[1]);
                        M = M.replace(/;/g, "\n");
                        var L = false;
                        for (var R = 0; R < I.chord.length; R++) {
                            if (I.chord[R].position === ac[2]) {
                                L = true;
                                I.chord[R].name += "\n" + M
                            }
                        }
                        if (L === false) {
                            if (ac[2] === null && ac[3]) {
                                I.chord.push({
                                    name: M,
                                    rel_position: ac[3]
                                })
                            } else {
                                I.chord.push({
                                    name: M,
                                    position: ac[2]
                                })
                            }
                        }
                        X += ac[0];
                        var S = r.skipWhiteSpace(Q.substring(X));
                        if (S > 0) {
                            I.force_end_beam_last = true
                        }
                        X += S
                    } else {
                        if (u.indexOf(Q.charAt(X)) === -1) {
                            ac = k(Q, X)
                        } else {
                            ac = [0]
                        }
                        if (ac[0] > 0) {
                            if (ac[1] === null) {
                                if (X + 1 < Q.length) {
                                    z()
                                }
                            } else {
                                if (ac[1].length > 0) {
                                    if (ac[1].indexOf("style=") === 0) {
                                        I.style = ac[1].substr(6)
                                    } else {
                                        if (I.decoration === undefined) {
                                            I.decoration = []
                                        }
                                        I.decoration.push(ac[1])
                                    }
                                }
                            }
                            X += ac[0]
                        } else {
                            ac = A(Q, X);
                            if (ac[0] > 0) {
                                I.gracenotes = ac[1];
                                X += ac[0]
                            } else {
                                break
                            }
                        }
                    }
                }
                ac = w(Q, X);
                if (ac[0] > 0) {
                    if (I.gracenotes !== undefined) {
                        I.rest = {
                            type: "spacer"
                        };
                        I.duration = 0.125;
                        C.addFormattingOptions(I, g.formatting, "note");
                        g.appendElement("note", W + X, W + X + ac[0], I);
                        C.measureNotEmpty = true;
                        I = {}
                    }
                    var Z = {
                        type: ac[1]
                    };
                    if (Z.type.length === 0) {
                        B("Unknown bar type", Q, X)
                    } else {
                        if (C.inEnding && Z.type !== "bar_thin") {
                            Z.endEnding = true;
                            C.inEnding = false
                        }
                        if (ac[2]) {
                            Z.startEnding = ac[2];
                            if (C.inEnding) {
                                Z.endEnding = true
                            }
                            C.inEnding = true
                        }
                        if (I.decoration !== undefined) {
                            Z.decoration = I.decoration
                        }
                        if (I.chord !== undefined) {
                            Z.chord = I.chord
                        }
                        if (Z.startEnding && C.barFirstEndingNum === undefined) {
                            C.barFirstEndingNum = C.currBarNumber
                        } else {
                            if (Z.startEnding && Z.endEnding && C.barFirstEndingNum) {
                                C.currBarNumber = C.barFirstEndingNum
                            } else {
                                if (Z.endEnding) {
                                    C.barFirstEndingNum = undefined
                                }
                            }
                        }
                        if (Z.type !== "bar_invisible" && C.measureNotEmpty) {
                            C.currBarNumber++;
                            if (C.barNumbers && C.currBarNumber % C.barNumbers === 0) {
                                C.barNumOnNextNote = C.currBarNumber
                            }
                        }
                        C.addFormattingOptions(I, g.formatting, "bar");
                        g.appendElement("bar", W + X, W + X + ac[0], Z);
                        C.measureNotEmpty = false;
                        I = {}
                    }
                    X += ac[0]
                } else {
                    if (Q[X] === "&") {
                        B("Overlay not yet supported", Q, X);
                        X++
                    } else {
                        ac = s(Q, X);
                        if (ac.consumed > 0) {
                            if (ac.startSlur !== undefined) {
                                I.startSlur = ac.startSlur
                            }
                            if (ac.triplet !== undefined) {
                                if (N > 0) {
                                    B("Can't nest triplets", Q, X)
                                } else {
                                    I.startTriplet = ac.triplet;
                                    N = ac.num_notes === undefined ? ac.triplet : ac.num_notes
                                }
                            }
                            X += ac.consumed
                        }
                        if (Q.charAt(X) === "[") {
                            X++;
                            var G = null;
                            var V = false;
                            while (!V) {
                                var P = l(Q, X, {}, false);
                                if (P !== null) {
                                    if (P.end_beam) {
                                        I.end_beam = true;
                                        delete P.end_beam
                                    }
                                    if (I.pitches === undefined) {
                                        I.duration = P.duration;
                                        I.pitches = [P]
                                    } else {
                                        I.pitches.push(P)
                                    }
                                    delete P.duration;
                                    if (C.inTieChord[I.pitches.length]) {
                                        P.endTie = true;
                                        C.inTieChord[I.pitches.length] = undefined
                                    }
                                    if (P.startTie) {
                                        C.inTieChord[I.pitches.length] = true
                                    }
                                    X = P.endChar;
                                    delete P.endChar
                                } else {
                                    if (Q.charAt(X) === " ") {
                                        B("Spaces are not allowed in chords", Q, X);
                                        X++
                                    } else {
                                        if (X < Q.length && Q.charAt(X) === "]") {
                                            X++;
                                            if (C.next_note_duration !== 0) {
                                                I.duration = I.duration * C.next_note_duration;
                                                C.next_note_duration = 0
                                            }
                                            if (C.inTie) {
                                                window.ABCJS.parse.each(I.pitches, function(ad) {
                                                    ad.endTie = true
                                                });
                                                C.inTie = false
                                            }
                                            if (N > 0) {
                                                N--;
                                                if (N === 0) {
                                                    I.endTriplet = true
                                                }
                                            }
                                            var O = false;
                                            while (X < Q.length && !O) {
                                                switch (Q.charAt(X)) {
                                                    case " ":
                                                    case "\t":
                                                        h(I);
                                                        break;
                                                    case ")":
                                                        if (I.endSlur === undefined) {
                                                            I.endSlur = 1
                                                        } else {
                                                            I.endSlur++
                                                        }
                                                        break;
                                                    case "-":
                                                        window.ABCJS.parse.each(I.pitches, function(ad) {
                                                            ad.startTie = {}
                                                        });
                                                        C.inTie = true;
                                                        break;
                                                    case ">":
                                                    case "<":
                                                        var ab = c(Q, X);
                                                        X += ab[0] - 1;
                                                        C.next_note_duration = ab[2];
                                                        G = ab[1];
                                                        break;
                                                    case "1":
                                                    case "2":
                                                    case "3":
                                                    case "4":
                                                    case "5":
                                                    case "6":
                                                    case "7":
                                                    case "8":
                                                    case "9":
                                                    case "/":
                                                        var K = r.getFraction(Q, X);
                                                        G = K.value;
                                                        X = K.index;
                                                        if (Q.charAt(X) === "-" || Q.charAt(X) === ")") {
                                                            X--
                                                        } else {
                                                            O = true
                                                        }
                                                        break;
                                                    default:
                                                        O = true;
                                                        break
                                                }
                                                if (!O) {
                                                    X++
                                                }
                                            }
                                        } else {
                                            B("Expected ']' to end the chords", Q, X)
                                        }
                                        if (I.pitches !== undefined) {
                                            if (G !== null) {
                                                I.duration = I.duration * G
                                            }
                                            if (C.barNumOnNextNote) {
                                                I.barNumber = C.barNumOnNextNote;
                                                C.barNumOnNextNote = null
                                            }
                                            C.addFormattingOptions(I, g.formatting, "note");
                                            g.appendElement("note", W + X, W + X, I);
                                            C.measureNotEmpty = true;
                                            I = {}
                                        }
                                        V = true
                                    }
                                }
                            }
                        } else {
                            var U = {};
                            var Y = l(Q, X, U, true);
                            if (U.endTie !== undefined) {
                                C.inTie = true
                            }
                            if (Y !== null) {
                                if (Y.pitch !== undefined) {
                                    I.pitches = [{}];
                                    if (Y.accidental !== undefined) {
                                        I.pitches[0].accidental = Y.accidental
                                    }
                                    I.pitches[0].pitch = Y.pitch;
                                    if (Y.endSlur !== undefined) {
                                        I.pitches[0].endSlur = Y.endSlur
                                    }
                                    if (Y.endTie !== undefined) {
                                        I.pitches[0].endTie = Y.endTie
                                    }
                                    if (Y.startSlur !== undefined) {
                                        I.pitches[0].startSlur = Y.startSlur
                                    }
                                    if (I.startSlur !== undefined) {
                                        I.pitches[0].startSlur = I.startSlur
                                    }
                                    if (Y.startTie !== undefined) {
                                        I.pitches[0].startTie = Y.startTie
                                    }
                                    if (I.startTie !== undefined) {
                                        I.pitches[0].startTie = I.startTie
                                    }
                                } else {
                                    I.rest = Y.rest;
                                    if (Y.endSlur !== undefined) {
                                        I.endSlur = Y.endSlur
                                    }
                                    if (Y.endTie !== undefined) {
                                        I.rest.endTie = Y.endTie
                                    }
                                    if (Y.startSlur !== undefined) {
                                        I.startSlur = Y.startSlur
                                    }
                                    if (Y.startTie !== undefined) {
                                        I.rest.startTie = Y.startTie
                                    }
                                    if (I.startTie !== undefined) {
                                        I.rest.startTie = I.startTie
                                    }
                                }
                                if (Y.chord !== undefined) {
                                    I.chord = Y.chord
                                }
                                if (Y.duration !== undefined) {
                                    I.duration = Y.duration
                                }
                                if (Y.decoration !== undefined) {
                                    I.decoration = Y.decoration
                                }
                                if (Y.graceNotes !== undefined) {
                                    I.graceNotes = Y.graceNotes
                                }
                                delete I.startSlur;
                                if (C.inTie) {
                                    if (I.pitches !== undefined) {
                                        I.pitches[0].endTie = true
                                    } else {
                                        I.rest.endTie = true
                                    }
                                    C.inTie = false
                                }
                                if (Y.startTie || I.startTie) {
                                    C.inTie = true
                                }
                                X = Y.endChar;
                                if (N > 0) {
                                    N--;
                                    if (N === 0) {
                                        I.endTriplet = true
                                    }
                                }
                                if (Y.end_beam) {
                                    h(I)
                                }
                                if (I.rest && I.rest.type === "rest" && I.duration === 1) {
                                    I.rest.type = "whole";
                                    I.duration = j(C)
                                }
                                if (C.barNumOnNextNote) {
                                    I.barNumber = C.barNumOnNextNote;
                                    C.barNumOnNextNote = null
                                }
                                C.addFormattingOptions(I, g.formatting, "note");
                                g.appendElement("note", W + J, W + X, I);
                                C.measureNotEmpty = true;
                                I = {}
                            }
                        }
                        if (X === J) {
                            if (Q.charAt(X) !== " " && Q.charAt(X) !== "`") {
                                B("Unknown character ignored", Q, X)
                            }
                            X++
                        }
                    }
                }
            }
        }
    };
    var o = function(G) {
        var H = y.parseHeader(G);
        if (H.regular) {
            p(H.str)
        }
        if (H.newline && C.continueall === undefined) {
            z()
        }
        if (H.words) {
            q(g.getCurrentVoice(), G.substring(2))
        }
        if (H.symbols) {
            e(g.getCurrentVoice(), G.substring(2))
        }
        if (H.recurse) {
            o(H.str)
        }
    };
    this.parse = function(M, K) {
        if (!K) {
            K = {}
        }
        g.reset();
        if (K.print) {
            g.media = "print"
        }
        C.reset();
        y.reset(r, B, C, g);
        M = window.ABCJS.parse.gsub(M, "\r\n", "\n");
        M = window.ABCJS.parse.gsub(M, "\r", "\n");
        M += "\n";
        M = M.replace(/\n\\.*\n/g, "\n");
        var I = function(P, R, S) {
            var O = "                                                                                                                                                                                                     ";
            var Q = S ? O.substring(0, S.length) : "";
            return R + " \x12" + Q
        };
        M = M.replace(/\\([ \t]*)(%.*)*\n/g, I);
        var H = M.split("\n");
        if (window.ABCJS.parse.last(H).length === 0) {
            H.pop()
        }
        try {
            if (K.format) {
                window.ABCJS.parse.parseDirective.globalFormatting(K.format)
            }
            window.ABCJS.parse.each(H, function(O) {
                if (K.header_only && C.is_in_header === false) {
                    throw "normal_abort"
                }
                if (K.stop_on_warning && C.warnings) {
                    throw "normal_abort"
                }
                if (C.is_in_history) {
                    if (O.charAt(1) === ":") {
                        C.is_in_history = false;
                        o(O)
                    } else {
                        g.addMetaText("history", r.translateString(r.stripComment(O)))
                    }
                } else {
                    if (C.inTextBlock) {
                        if (window.ABCJS.parse.startsWith(O, "%%endtext")) {
                            g.addText(C.textBlock);
                            C.inTextBlock = false
                        } else {
                            if (window.ABCJS.parse.startsWith(O, "%%")) {
                                C.textBlock += " " + O.substring(2)
                            } else {
                                C.textBlock += " " + O
                            }
                        }
                    } else {
                        if (C.inPsBlock) {
                            if (window.ABCJS.parse.startsWith(O, "%%endps")) {
                                C.inPsBlock = false
                            } else {
                                C.textBlock += " " + O
                            }
                        } else {
                            o(O)
                        }
                    }
                }
                C.iChar += O.length + 1
            });
            var N = 11 * 72;
            var J = 8.5 * 72;
            switch (C.papersize) {
                case "legal":
                    N = 14 * 72;
                    J = 8.5 * 72;
                    break;
                case "A4":
                    N = 11.7 * 72;
                    J = 8.3 * 72;
                    break
            }
            if (C.landscape) {
                var G = N;
                N = J;
                J = G
            }
            C.openSlurs = g.cleanUp(J, N, C.barsperstaff, C.staffnonote, C.openSlurs)
        } catch (L) {
            if (L !== "normal_abort") {
                throw L
            }
        }
    }
};
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.parse) {
    window.ABCJS.parse = {}
}
window.ABCJS.parse.parseDirective = {};
(function() {
    var p;
    var j;
    var e;
    var g;
    window.ABCJS.parse.parseDirective.initialize = function(u, s, t, r) {
        p = u;
        j = s;
        e = t;
        g = r;
        o()
    };

    function o() {
        e.annotationfont = {
            face: "Helvetica",
            size: 12,
            weight: "normal",
            style: "normal",
            decoration: "none"
        };
        e.gchordfont = {
            face: "Helvetica",
            size: 12,
            weight: "normal",
            style: "normal",
            decoration: "none"
        };
        e.historyfont = {
            face: '"Times New Roman"',
            size: 16,
            weight: "normal",
            style: "normal",
            decoration: "none"
        };
        e.infofont = {
            face: '"Times New Roman"',
            size: 14,
            weight: "normal",
            style: "italic",
            decoration: "none"
        };
        e.measurefont = {
            face: '"Times New Roman"',
            size: 14,
            weight: "normal",
            style: "italic",
            decoration: "none"
        };
        e.partsfont = {
            face: '"Times New Roman"',
            size: 15,
            weight: "normal",
            style: "normal",
            decoration: "none"
        };
        e.repeatfont = {
            face: '"Times New Roman"',
            size: 13,
            weight: "normal",
            style: "normal",
            decoration: "none"
        };
        e.textfont = {
            face: '"Times New Roman"',
            size: 16,
            weight: "normal",
            style: "normal",
            decoration: "none"
        };
        e.vocalfont = {
            face: '"Times New Roman"',
            size: 13,
            weight: "bold",
            style: "normal",
            decoration: "none"
        };
        e.wordsfont = {
            face: '"Times New Roman"',
            size: 16,
            weight: "normal",
            style: "normal",
            decoration: "none"
        };
        g.formatting.composerfont = {
            face: '"Times New Roman"',
            size: 14,
            weight: "normal",
            style: "italic",
            decoration: "none"
        };
        g.formatting.subtitlefont = {
            face: '"Times New Roman"',
            size: 16,
            weight: "normal",
            style: "normal",
            decoration: "none"
        };
        g.formatting.tempofont = {
            face: '"Times New Roman"',
            size: 15,
            weight: "bold",
            style: "normal",
            decoration: "none"
        };
        g.formatting.titlefont = {
            face: '"Times New Roman"',
            size: 20,
            weight: "normal",
            style: "normal",
            decoration: "none"
        };
        g.formatting.footerfont = {
            face: '"Times New Roman"',
            size: 12,
            weight: "normal",
            style: "normal",
            decoration: "none"
        };
        g.formatting.headerfont = {
            face: '"Times New Roman"',
            size: 12,
            weight: "normal",
            style: "normal",
            decoration: "none"
        };
        g.formatting.voicefont = {
            face: '"Times New Roman"',
            size: 13,
            weight: "bold",
            style: "normal",
            decoration: "none"
        };
        g.formatting.annotationfont = e.annotationfont;
        g.formatting.gchordfont = e.gchordfont;
        g.formatting.historyfont = e.historyfont;
        g.formatting.infofont = e.infofont;
        g.formatting.measurefont = e.measurefont;
        g.formatting.partsfont = e.partsfont;
        g.formatting.repeatfont = e.repeatfont;
        g.formatting.textfont = e.textfont;
        g.formatting.vocalfont = e.vocalfont;
        g.formatting.wordsfont = e.wordsfont
    }
    var a = {
        gchordfont: true,
        measurefont: true,
        partsfont: true
    };
    var d = function(r) {
        switch (r) {
            case "Arial-Italic":
                return {
                    face: "Arial",
                    weight: "normal",
                    style: "italic",
                    decoration: "none"
                };
            case "Arial-Bold":
                return {
                    face: "Arial",
                    weight: "bold",
                    style: "normal",
                    decoration: "none"
                };
            case "Bookman-Demi":
                return {
                    face: "Bookman,serif",
                    weight: "bold",
                    style: "normal",
                    decoration: "none"
                };
            case "Bookman-DemiItalic":
                return {
                    face: "Bookman,serif",
                    weight: "bold",
                    style: "italic",
                    decoration: "none"
                };
            case "Bookman-Light":
                return {
                    face: "Bookman,serif",
                    weight: "normal",
                    style: "normal",
                    decoration: "none"
                };
            case "Bookman-LightItalic":
                return {
                    face: "Bookman,serif",
                    weight: "normal",
                    style: "italic",
                    decoration: "none"
                };
            case "Courier":
                return {
                    face: '"Courier New"',
                    weight: "normal",
                    style: "normal",
                    decoration: "none"
                };
            case "Courier-Oblique":
                return {
                    face: '"Courier New"',
                    weight: "normal",
                    style: "italic",
                    decoration: "none"
                };
            case "Courier-Bold":
                return {
                    face: '"Courier New"',
                    weight: "bold",
                    style: "normal",
                    decoration: "none"
                };
            case "Courier-BoldOblique":
                return {
                    face: '"Courier New"',
                    weight: "bold",
                    style: "italic",
                    decoration: "none"
                };
            case "AvantGarde-Book":
                return {
                    face: "AvantGarde,Arial",
                    weight: "normal",
                    style: "normal",
                    decoration: "none"
                };
            case "AvantGarde-BookOblique":
                return {
                    face: "AvantGarde,Arial",
                    weight: "normal",
                    style: "italic",
                    decoration: "none"
                };
            case "AvantGarde-Demi":
            case "Avant-Garde-Demi":
                return {
                    face: "AvantGarde,Arial",
                    weight: "bold",
                    style: "normal",
                    decoration: "none"
                };
            case "AvantGarde-DemiOblique":
                return {
                    face: "AvantGarde,Arial",
                    weight: "bold",
                    style: "italic",
                    decoration: "none"
                };
            case "Helvetica-Oblique":
                return {
                    face: "Helvetica",
                    weight: "normal",
                    style: "italic",
                    decoration: "none"
                };
            case "Helvetica-Bold":
                return {
                    face: "Helvetica",
                    weight: "bold",
                    style: "normal",
                    decoration: "none"
                };
            case "Helvetica-BoldOblique":
                return {
                    face: "Helvetica",
                    weight: "bold",
                    style: "italic",
                    decoration: "none"
                };
            case "Helvetica-Narrow":
                return {
                    face: '"Helvetica Narrow",Helvetica',
                    weight: "normal",
                    style: "normal",
                    decoration: "none"
                };
            case "Helvetica-Narrow-Oblique":
                return {
                    face: '"Helvetica Narrow",Helvetica',
                    weight: "normal",
                    style: "italic",
                    decoration: "none"
                };
            case "Helvetica-Narrow-Bold":
                return {
                    face: '"Helvetica Narrow",Helvetica',
                    weight: "bold",
                    style: "normal",
                    decoration: "none"
                };
            case "Helvetica-Narrow-BoldOblique":
                return {
                    face: '"Helvetica Narrow",Helvetica',
                    weight: "bold",
                    style: "italic",
                    decoration: "none"
                };
            case "Palatino-Roman":
                return {
                    face: "Palatino",
                    weight: "normal",
                    style: "normal",
                    decoration: "none"
                };
            case "Palatino-Italic":
                return {
                    face: "Palatino",
                    weight: "normal",
                    style: "italic",
                    decoration: "none"
                };
            case "Palatino-Bold":
                return {
                    face: "Palatino",
                    weight: "bold",
                    style: "normal",
                    decoration: "none"
                };
            case "Palatino-BoldItalic":
                return {
                    face: "Palatino",
                    weight: "bold",
                    style: "italic",
                    decoration: "none"
                };
            case "NewCenturySchlbk-Roman":
                return {
                    face: '"New Century",serif',
                    weight: "normal",
                    style: "normal",
                    decoration: "none"
                };
            case "NewCenturySchlbk-Italic":
                return {
                    face: '"New Century",serif',
                    weight: "normal",
                    style: "italic",
                    decoration: "none"
                };
            case "NewCenturySchlbk-Bold":
                return {
                    face: '"New Century",serif',
                    weight: "bold",
                    style: "normal",
                    decoration: "none"
                };
            case "NewCenturySchlbk-BoldItalic":
                return {
                    face: '"New Century",serif',
                    weight: "bold",
                    style: "italic",
                    decoration: "none"
                };
            case "Times":
            case "Times-Roman":
            case "Times-Narrow":
            case "Times-Courier":
            case "Times-New-Roman":
                return {
                    face: '"Times New Roman"',
                    weight: "normal",
                    style: "normal",
                    decoration: "none"
                };
            case "Times-Italic":
            case "Times-Italics":
                return {
                    face: '"Times New Roman"',
                    weight: "normal",
                    style: "italic",
                    decoration: "none"
                };
            case "Times-Bold":
                return {
                    face: '"Times New Roman"',
                    weight: "bold",
                    style: "normal",
                    decoration: "none"
                };
            case "Times-BoldItalic":
                return {
                    face: '"Times New Roman"',
                    weight: "bold",
                    style: "italic",
                    decoration: "none"
                };
            case "ZapfChancery-MediumItalic":
                return {
                    face: '"Zapf Chancery",cursive,serif',
                    weight: "normal",
                    style: "normal",
                    decoration: "none"
                };
            default:
                return null
        }
    };
    var q = function(z, r, D, I, E) {
        function C() {
            var J = parseInt(z[0].token);
            z.shift();
            if (!r) {
                j("Can't set just the size of the font since there is no default value.", D, I);
                return {
                    face: '"Times New Roman"',
                    weight: "normal",
                    style: "normal",
                    decoration: "none",
                    size: J
                }
            }
            if (z.length === 0) {
                return {
                    face: r.face,
                    weight: r.weight,
                    style: r.style,
                    decoration: r.decoration,
                    size: J
                }
            }
            if (z.length === 1 && z[0].token === "box" && a[E]) {
                return {
                    face: r.face,
                    weight: r.weight,
                    style: r.style,
                    decoration: r.decoration,
                    size: J,
                    box: true
                }
            }
            j("Extra parameters in font definition.", D, I);
            return {
                face: r.face,
                weight: r.weight,
                style: r.style,
                decoration: r.decoration,
                size: J
            }
        }
        if (z[0].token === "*") {
            z.shift();
            if (z[0].type === "number") {
                return C()
            } else {
                j("Expected font size number after *.", D, I)
            }
        }
        if (z[0].type === "number") {
            return C()
        }
        var u = [];
        var B;
        var y = "normal";
        var G = "normal";
        var v = "none";
        var w = false;
        var s = "face";
        var t = false;
        while (z.length) {
            var F = z.shift();
            var H = F.token.toLowerCase();
            switch (s) {
                case "face":
                    if (t || (H !== "utf" && F.type !== "number" && H !== "bold" && H !== "italic" && H !== "underline" && H !== "box")) {
                        if (u.length > 0 && F.token === "-") {
                            t = true;
                            u[u.length - 1] = u[u.length - 1] + F.token
                        } else {
                            if (t) {
                                t = false;
                                u[u.length - 1] = u[u.length - 1] + F.token
                            } else {
                                u.push(F.token)
                            }
                        }
                    } else {
                        if (F.type === "number") {
                            if (B) {
                                j("Font size specified twice in font definition.", D, I)
                            } else {
                                B = F.token
                            }
                            s = "modifier"
                        } else {
                            if (H === "bold") {
                                y = "bold"
                            } else {
                                if (H === "italic") {
                                    G = "italic"
                                } else {
                                    if (H === "underline") {
                                        v = "underline"
                                    } else {
                                        if (H === "box") {
                                            if (a[E]) {
                                                w = true
                                            } else {
                                                j('This font style doesn\'t support "box"', D, I)
                                            }
                                            s = "finished"
                                        } else {
                                            if (H === "utf") {
                                                F = z.shift();
                                                s = "size"
                                            } else {
                                                j("Unknown parameter " + F.token + " in font definition.", D, I)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    break;
                case "size":
                    if (F.type === "number") {
                        if (B) {
                            j("Font size specified twice in font definition.", D, I)
                        } else {
                            B = F.token
                        }
                    } else {
                        j("Expected font size in font definition.", D, I)
                    }
                    s = "modifier";
                    break;
                case "modifier":
                    if (H === "bold") {
                        y = "bold"
                    } else {
                        if (H === "italic") {
                            G = "italic"
                        } else {
                            if (H === "underline") {
                                v = "underline"
                            } else {
                                if (H === "box") {
                                    if (a[E]) {
                                        w = true
                                    } else {
                                        j('This font style doesn\'t support "box"', D, I)
                                    }
                                    s = "finished"
                                } else {
                                    j("Unknown parameter " + F.token + " in font definition.", D, I)
                                }
                            }
                        }
                    }
                    break;
                case "finished":
                    j('Extra characters found after "box" in font definition.', D, I);
                    break
            }
        }
        if (B === undefined) {
            if (!r) {
                j("Must specify the size of the font since there is no default value.", D, I);
                B = 12
            } else {
                B = r.size
            }
        } else {
            B = parseFloat(B)
        }
        u = u.join(" ");
        var x = d(u);
        var A = {};
        if (x) {
            A.face = x.face;
            A.weight = x.weight;
            A.style = x.style;
            A.decoration = x.decoration;
            A.size = B;
            if (w) {
                A.box = true
            }
            return A
        }
        A.face = u;
        A.weight = y;
        A.style = G;
        A.decoration = v;
        A.size = B;
        if (w) {
            A.box = true
        }
        return A
    };
    var f = function(r, s, t) {
        if (s.length === 0) {
            return 'Directive "' + r + '" requires a font as a parameter.'
        }
        e[r] = q(s, e[r], t, 0, r);
        return null
    };
    var l = function(r, s, t) {
        if (s.length === 0) {
            return 'Directive "' + r + '" requires a font as a parameter.'
        }
        g.formatting[r] = q(s, g.formatting[r], t, 0, r);
        return null
    };
    var n = function(t, u) {
        var s = "";
        window.ABCJS.parse.each(u, function(v) {
            s += v.token
        });
        var r = parseFloat(s);
        if (isNaN(r) || r === 0) {
            return 'Directive "' + t + '" requires a number as a parameter.'
        }
        g.formatting.scale = r
    };
    var m = function(s, t) {
        var r = p.getMeasurement(t);
        if (r.used === 0 || t.length !== 0) {
            return {
                error: 'Directive "' + s + '" requires a measurement as a parameter.'
            }
        }
        return r.value
    };
    var k = function(s, t) {
        var r = p.getMeasurement(t);
        if (r.used === 0 || t.length !== 0) {
            return 'Directive "' + s + '" requires a measurement as a parameter.'
        }
        g.formatting[s] = r.value;
        return null
    };
    var c = function(u, v, w, t, r) {
        if (w.length !== 1 || w[0].type !== "number") {
            return 'Directive "' + v + '" requires a number as a parameter.'
        }
        var s = w[0].intt;
        if (t !== undefined && s < t) {
            return 'Directive "' + v + '" requires a number greater than or equal to ' + t + " as a parameter."
        }
        if (r !== undefined && s > r) {
            return 'Directive "' + v + '" requires a number less than or equal to ' + r + " as a parameter."
        }
        e[u] = s;
        return null
    };
    var b = function(r, s, t) {
        var u = c(r, s, t, 0, 1);
        if (u !== null) {
            return u
        }
        e[r] = (e[r] === 1);
        return null
    };
    var i = function(t, v, w, x) {
        if (w.length !== 1) {
            return 'Directive "' + v + '" requires one of [ ' + x.join(", ") + " ] as a parameter."
        }
        var r = w[0].token;
        var u = false;
        for (var s = 0; !u && s < x.length; s++) {
            if (x[s] === r) {
                u = true
            }
        }
        if (!u) {
            return 'Directive "' + v + '" requires one of [ ' + x.join(", ") + " ] as a parameter."
        }
        e[t] = r;
        return null
    };
    window.ABCJS.parse.parseDirective.parseFontChangeLine = function(t) {
        var r = t.split("$");
        if (r.length > 1 && e.setfont) {
            var u = [{
                text: r[0]
            }];
            for (var s = 1; s < r.length; s++) {
                if (r[s].charAt(0) === "0") {
                    u.push({
                        text: r[s].substring(1)
                    })
                } else {
                    if (r[s].charAt(0) === "1" && e.setfont[1]) {
                        u.push({
                            font: e.setfont[1],
                            text: r[s].substring(1)
                        })
                    } else {
                        if (r[s].charAt(0) === "2" && e.setfont[2]) {
                            u.push({
                                font: e.setfont[2],
                                text: r[s].substring(1)
                            })
                        } else {
                            if (r[s].charAt(0) === "3" && e.setfont[3]) {
                                u.push({
                                    font: e.setfont[3],
                                    text: r[s].substring(1)
                                })
                            } else {
                                if (r[s].charAt(0) === "4" && e.setfont[4]) {
                                    u.push({
                                        font: e.setfont[4],
                                        text: r[s].substring(1)
                                    })
                                } else {
                                    u[u.length - 1].text += "$" + r[s]
                                }
                            }
                        }
                    }
                }
            }
            if (u.length > 1) {
                return u
            }
        }
        return t
    };
    var h = ["auto", "above", "below", "hidden"];
    window.ABCJS.parse.parseDirective.addDirective = function(R) {
        var P = p.tokenize(R, 0, R.length);
        if (P.length === 0 || P[0].type !== "alpha") {
            return null
        }
        var s = R.substring(R.indexOf(P[0].token) + P[0].token.length);
        s = p.stripComment(s);
        var ac = P.shift().token.toLowerCase();
        var w = "";
        switch (ac) {
            case "bagpipes":
                g.formatting.bagpipes = true;
                break;
            case "landscape":
                e.landscape = true;
                break;
            case "papersize":
                e.papersize = s;
                break;
            case "slurgraces":
                g.formatting.slurgraces = true;
                break;
            case "stretchlast":
                g.formatting.stretchlast = true;
                break;
            case "titlecaps":
                e.titlecaps = true;
                break;
            case "titleleft":
                g.formatting.titleleft = true;
                break;
            case "measurebox":
                g.formatting.measurebox = true;
                break;
            case "vocal":
                return i("vocalPosition", ac, P, h);
            case "dynamic":
                return i("dynamicPosition", ac, P, h);
            case "gchord":
                return i("chordPosition", ac, P, h);
            case "ornament":
                return i("ornamentPosition", ac, P, h);
            case "volume":
                return i("volumePosition", ac, P, h);
            case "botmargin":
            case "botspace":
            case "composerspace":
            case "indent":
            case "leftmargin":
            case "linesep":
            case "musicspace":
            case "partsspace":
            case "pageheight":
            case "pagewidth":
            case "rightmargin":
            case "staffsep":
            case "staffwidth":
            case "subtitlespace":
            case "sysstaffsep":
            case "systemsep":
            case "textspace":
            case "titlespace":
            case "topmargin":
            case "topspace":
            case "vocalspace":
            case "wordsspace":
                return k(ac, P);
            case "vskip":
                var v = m(ac, P);
                if (v.error) {
                    return v.error
                }
                g.addSpacing(v);
                return null;
            case "scale":
                n(ac, P);
                break;
            case "sep":
                if (P.length === 0) {
                    g.addSeparator()
                } else {
                    var V = p.getMeasurement(P);
                    if (V.used === 0) {
                        return 'Directive "' + ac + '" requires 3 numbers: space above, space below, length of line'
                    }
                    var N = V.value;
                    V = p.getMeasurement(P);
                    if (V.used === 0) {
                        return 'Directive "' + ac + '" requires 3 numbers: space above, space below, length of line'
                    }
                    var ah = V.value;
                    V = p.getMeasurement(P);
                    if (V.used === 0 || P.length !== 0) {
                        return 'Directive "' + ac + '" requires 3 numbers: space above, space below, length of line'
                    }
                    var J = V.value;
                    g.addSeparator(N, ah, J)
                }
                break;
            case "barsperstaff":
                w = c("barsperstaff", ac, P);
                if (w !== null) {
                    return w
                }
                break;
            case "staffnonote":
                w = b("staffnonote", ac, P);
                if (w !== null) {
                    return w
                }
                break;
            case "printtempo":
                w = b("printTempo", ac, P);
                if (w !== null) {
                    return w
                }
                break;
            case "partsbox":
                w = b("partsBox", ac, P);
                if (w !== null) {
                    return w
                }
                break;
            case "measurenb":
            case "barnumbers":
                w = c("barNumbers", ac, P);
                if (w !== null) {
                    return w
                }
                break;
            case "begintext":
                e.inTextBlock = true;
                break;
            case "continueall":
                e.continueall = true;
                break;
            case "beginps":
                e.inPsBlock = true;
                j("Postscript ignored", R, 0);
                break;
            case "deco":
                if (s.length > 0) {
                    e.ignoredDecorations.push(s.substring(0, s.indexOf(" ")))
                }
                j("Decoration redefinition ignored", R, 0);
                break;
            case "text":
                var Z = p.translateString(s);
                g.addText(window.ABCJS.parse.parseDirective.parseFontChangeLine(Z));
                break;
            case "center":
                var r = p.translateString(s);
                g.addCentered(window.ABCJS.parse.parseDirective.parseFontChangeLine(r));
                break;
            case "font":
                break;
            case "setfont":
                var G = p.tokenize(s, 0, s.length);
                if (G.length >= 4) {
                    if (G[0].token === "-" && G[1].type === "number") {
                        var u = parseInt(G[1].token);
                        if (u >= 1 && u <= 4) {
                            if (!e.setfont) {
                                e.setfont = []
                            }
                            G.shift();
                            G.shift();
                            e.setfont[u] = q(G, e.setfont[u], R, 0, "setfont")
                        }
                    }
                }
                break;
            case "gchordfont":
            case "partsfont":
            case "vocalfont":
            case "textfont":
            case "annotationfont":
            case "historyfont":
            case "infofont":
            case "measurefont":
            case "repeatfont":
            case "wordsfont":
                return f(ac, P, R);
            case "composerfont":
            case "subtitlefont":
            case "tempofont":
            case "titlefont":
            case "voicefont":
            case "footerfont":
            case "headerfont":
                return l(ac, P, R);
            case "barlabelfont":
            case "barnumberfont":
            case "barnumfont":
                return f("measurefont", P, R);
            case "staves":
            case "score":
                e.score_is_present = true;
                var ag = function(am, aj, al, ak, ai) {
                    if (aj || e.staves.length === 0) {
                        e.staves.push({
                            index: e.staves.length,
                            numVoices: 0
                        })
                    }
                    var t = window.ABCJS.parse.last(e.staves);
                    if (al !== undefined) {
                        t.bracket = al
                    }
                    if (ak !== undefined) {
                        t.brace = ak
                    }
                    if (ai) {
                        t.connectBarLines = "end"
                    }
                    if (e.voices[am] === undefined) {
                        e.voices[am] = {
                            staffNum: t.index,
                            index: t.numVoices
                        };
                        t.numVoices++
                    }
                };
                var T = false;
                var ab = false;
                var A = false;
                var U = false;
                var y = false;
                var B = false;
                var z = false;
                var D;
                var af = function() {
                    z = true;
                    if (D) {
                        var t = "start";
                        if (D.staffNum > 0) {
                            if (e.staves[D.staffNum - 1].connectBarLines === "start" || e.staves[D.staffNum - 1].connectBarLines === "continue") {
                                t = "continue"
                            }
                        }
                        e.staves[D.staffNum].connectBarLines = t
                    }
                };
                while (P.length) {
                    var W = P.shift();
                    switch (W.token) {
                        case "(":
                            if (T) {
                                j("Can't nest parenthesis in %%score", R, W.start)
                            } else {
                                T = true;
                                U = true
                            }
                            break;
                        case ")":
                            if (!T || U) {
                                j("Unexpected close parenthesis in %%score", R, W.start)
                            } else {
                                T = false
                            }
                            break;
                        case "[":
                            if (ab) {
                                j("Can't nest brackets in %%score", R, W.start)
                            } else {
                                ab = true;
                                y = true
                            }
                            break;
                        case "]":
                            if (!ab || y) {
                                j("Unexpected close bracket in %%score", R, W.start)
                            } else {
                                ab = false;
                                e.staves[D.staffNum].bracket = "end"
                            }
                            break;
                        case "{":
                            if (A) {
                                j("Can't nest braces in %%score", R, W.start)
                            } else {
                                A = true;
                                B = true
                            }
                            break;
                        case "}":
                            if (!A || B) {
                                j("Unexpected close brace in %%score", R, W.start)
                            } else {
                                A = false;
                                e.staves[D.staffNum].brace = "end"
                            }
                            break;
                        case "|":
                            af();
                            break;
                        default:
                            var K = "";
                            while (W.type === "alpha" || W.type === "number") {
                                K += W.token;
                                if (W.continueId) {
                                    W = P.shift()
                                } else {
                                    break
                                }
                            }
                            var O = !T || U;
                            var Q = y ? "start" : ab ? "continue" : undefined;
                            var I = B ? "start" : A ? "continue" : undefined;
                            ag(K, O, Q, I, z);
                            U = false;
                            y = false;
                            B = false;
                            z = false;
                            D = e.voices[K];
                            if (ac === "staves") {
                                af()
                            }
                            break
                    }
                }
                break;
            case "newpage":
                var E = p.getInt(s);
                g.addNewPage(E.digits === 0 ? -1 : E.value);
                break;
            case "abc":
                var H = s.split(" ");
                switch (H[0]) {
                    case "-copyright":
                    case "-creator":
                    case "-edited-by":
                    case "-version":
                    case "-charset":
                        var x = H.shift();
                        g.addMetaText(ac + x, H.join(" "));
                        break;
                    default:
                        return "Unknown directive: " + ac + H[0]
                }
                break;
            case "header":
            case "footer":
                var X = p.getMeat(s, 0, s.length);
                X = s.substring(X.start, X.end);
                if (X.charAt(0) === '"' && X.charAt(X.length - 1) === '"') {
                    X = X.substring(1, X.length - 1)
                }
                var L = X.split("\t");
                var C = {};
                if (L.length === 1) {
                    C = {
                        left: "",
                        center: L[0],
                        right: ""
                    }
                } else {
                    if (L.length === 2) {
                        C = {
                            left: L[0],
                            center: L[1],
                            right: ""
                        }
                    } else {
                        C = {
                            left: L[0],
                            center: L[1],
                            right: L[2]
                        }
                    }
                }
                if (L.length > 3) {
                    j("Too many tabs in " + ac + ": " + L.length + " found.", s, 0)
                }
                g.addMetaTextObj(ac, C);
                break;
            case "midi":
                var aa = p.tokenize(s, 0, s.length);
                if (aa.length > 0 && aa[0].token === "=") {
                    aa.shift()
                }
                if (aa.length === 0) {
                    j("Expected midi command", s, 0)
                } else {
                    var F = function(ai) {
                        if (ai.length > 0) {
                            var aj = ai.shift();
                            var ak = aj.token;
                            if (aj.type === "number") {
                                ak = aj.intt
                            }
                            return ak
                        } else {
                            return null
                        }
                    };
                    if (g.formatting[ac] === undefined) {
                        g.formatting[ac] = {}
                    }
                    var M = aa.shift().token;
                    var S = true;
                    if (M === "program") {
                        var ae = F(aa);
                        if (ae) {
                            var ad = F(aa);
                            if (ad) {
                                S = {
                                    channel: ae,
                                    program: ad
                                }
                            } else {
                                S = {
                                    program: ae
                                }
                            }
                        }
                    } else {
                        var Y = F(aa);
                        if (Y !== null) {
                            S = Y
                        }
                    }
                    g.formatting[ac][M] = S
                }
                break;
            case "playtempo":
            case "auquality":
            case "continuous":
            case "nobarcheck":
                g.formatting[ac] = s;
                break;
            default:
                return "Unknown directive: " + ac
        }
        return null
    };
    window.ABCJS.parse.parseDirective.globalFormatting = function(v) {
        for (var t in v) {
            if (v.hasOwnProperty(t)) {
                var s = "" + v[t];
                var u = p.tokenize(s, 0, s.length);
                var r;
                switch (t) {
                    case "titlefont":
                    case "gchordfont":
                        f(t, u, s);
                        break;
                    case "scale":
                        n(t, u);
                        break;
                    case "partsbox":
                        r = b("partsBox", t, u);
                        if (r !== null) {
                            j(r)
                        }
                        break;
                    default:
                        j("Formatting directive unrecognized: ", t, 0)
                }
            }
        }
    }
})();
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.parse) {
    window.ABCJS.parse = {}
}
window.ABCJS.parse.ParseHeader = function(c, e, a, d) {
    this.reset = function(g, i, f, h) {
        window.ABCJS.parse.parseKeyVoice.initialize(g, i, f, h);
        window.ABCJS.parse.parseDirective.initialize(g, i, f, h)
    };
    this.reset(c, e, a, d);
    this.setTitle = function(f) {
        if (a.hasMainTitle) {
            d.addSubtitle(c.translateString(c.stripComment(f)))
        } else {
            d.addMetaText("title", c.translateString(c.theReverser(c.stripComment(f))));
            a.hasMainTitle = true
        }
    };
    this.setMeter = function(n) {
        n = c.stripComment(n);
        if (n === "C") {
            if (a.havent_set_length === true) {
                a.default_length = 0.125
            }
            return {
                type: "common_time"
            }
        } else {
            if (n === "C|") {
                if (a.havent_set_length === true) {
                    a.default_length = 0.125
                }
                return {
                    type: "cut_time"
                }
            } else {
                if (n === "o") {
                    if (a.havent_set_length === true) {
                        a.default_length = 0.125
                    }
                    return {
                        type: "tempus_perfectum"
                    }
                } else {
                    if (n === "c") {
                        if (a.havent_set_length === true) {
                            a.default_length = 0.125
                        }
                        return {
                            type: "tempus_imperfectum"
                        }
                    } else {
                        if (n === "o.") {
                            if (a.havent_set_length === true) {
                                a.default_length = 0.125
                            }
                            return {
                                type: "tempus_perfectum_prolatio"
                            }
                        } else {
                            if (n === "c.") {
                                if (a.havent_set_length === true) {
                                    a.default_length = 0.125
                                }
                                return {
                                    type: "tempus_imperfectum_prolatio"
                                }
                            } else {
                                if (n.length === 0 || n.toLowerCase() === "none") {
                                    if (a.havent_set_length === true) {
                                        a.default_length = 0.125
                                    }
                                    return null
                                } else {
                                    var k = c.tokenize(n, 0, n.length);
                                    try {
                                        var j = function() {
                                            var p = {
                                                value: 0,
                                                num: ""
                                            };
                                            var o = k.shift();
                                            if (o.token === "(") {
                                                o = k.shift()
                                            }
                                            while (1) {
                                                if (o.type !== "number") {
                                                    throw "Expected top number of meter"
                                                }
                                                p.value += parseInt(o.token);
                                                p.num += o.token;
                                                if (k.length === 0 || k[0].token === "/") {
                                                    return p
                                                }
                                                o = k.shift();
                                                if (o.token === ")") {
                                                    if (k.length === 0 || k[0].token === "/") {
                                                        return p
                                                    }
                                                    throw "Unexpected paren in meter"
                                                }
                                                if (o.token !== "." && o.token !== "+") {
                                                    throw "Expected top number of meter"
                                                }
                                                p.num += o.token;
                                                if (k.length === 0) {
                                                    throw "Expected top number of meter"
                                                }
                                                o = k.shift()
                                            }
                                            return p
                                        };
                                        var f = function() {
                                            var p = j();
                                            if (k.length === 0) {
                                                return p
                                            }
                                            var o = k.shift();
                                            if (o.token !== "/") {
                                                throw "Expected slash in meter"
                                            }
                                            o = k.shift();
                                            if (o.type !== "number") {
                                                throw "Expected bottom number of meter"
                                            }
                                            p.den = o.token;
                                            p.value = p.value / parseInt(p.den);
                                            return p
                                        };
                                        if (k.length === 0) {
                                            throw "Expected meter definition in M: line"
                                        }
                                        var g = {
                                            type: "specified",
                                            value: []
                                        };
                                        var l = 0;
                                        while (1) {
                                            var i = f();
                                            l += i.value;
                                            var m = {
                                                num: i.num
                                            };
                                            if (i.den !== undefined) {
                                                m.den = i.den
                                            }
                                            g.value.push(m);
                                            if (k.length === 0) {
                                                break
                                            }
                                        }
                                        if (a.havent_set_length === true) {
                                            a.default_length = l < 0.75 ? 0.0625 : 0.125
                                        }
                                        return g
                                    } catch (h) {
                                        e(h, n, 0)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return null
    };
    this.calcTempo = function(f) {
        var h = 1 / 4;
        if (a.meter && a.meter.type === "specified") {
            h = 1 / parseInt(a.meter.value[0].den)
        } else {
            if (a.origMeter && a.origMeter.type === "specified") {
                h = 1 / parseInt(a.origMeter.value[0].den)
            }
        }
        for (var g = 0; g < f.duration; g++) {
            f.duration[g] = h * f.duration[g]
        }
        return f
    };
    this.resolveTempo = function() {
        if (a.tempo) {
            this.calcTempo(a.tempo);
            d.metaText.tempo = a.tempo;
            delete a.tempo
        }
    };
    this.addUserDefinition = function(g, l, f) {
        var h = g.indexOf("=", l);
        if (h === -1) {
            e("Need an = in a macro definition", g, l);
            return
        }
        var j = window.ABCJS.parse.strip(g.substring(l, h));
        var k = window.ABCJS.parse.strip(g.substring(h + 1));
        if (j.length !== 1) {
            e("Macro definitions can only be one character", g, l);
            return
        }
        var i = "HIJKLMNOPQRSTUVWXYhijklmnopqrstuvw~";
        if (i.indexOf(j) === -1) {
            e("Macro definitions must be H-Y, h-w, or tilde", g, l);
            return
        }
        if (k.length === 0) {
            e("Missing macro definition", g, l);
            return
        }
        if (a.macros === undefined) {
            a.macros = {}
        }
        a.macros[j] = k
    };
    this.setDefaultLength = function(h, l, g) {
        var f = window.ABCJS.parse.gsub(h.substring(l, g), " ", "");
        var k = f.split("/");
        if (k.length === 2) {
            var j = parseInt(k[0]);
            var i = parseInt(k[1]);
            if (i > 0) {
                a.default_length = j / i;
                a.havent_set_length = false
            }
        }
    };
    this.setTempo = function(o, f, i) {
        try {
            var l = c.tokenize(o, f, i);
            if (l.length === 0) {
                throw "Missing parameter in Q: field"
            }
            var j = {};
            var n = true;
            var h = l.shift();
            if (h.type === "quote") {
                j.preString = h.token;
                h = l.shift();
                if (l.length === 0) {
                    return {
                        type: "immediate",
                        tempo: j
                    }
                }
            }
            if (h.type === "alpha" && h.token === "C") {
                if (l.length === 0) {
                    throw "Missing tempo after C in Q: field"
                }
                h = l.shift();
                if (h.type === "punct" && h.token === "=") {
                    if (l.length === 0) {
                        throw "Missing tempo after = in Q: field"
                    }
                    h = l.shift();
                    if (h.type !== "number") {
                        throw "Expected number after = in Q: field"
                    }
                    j.duration = [1];
                    j.bpm = parseInt(h.token)
                } else {
                    if (h.type === "number") {
                        j.duration = [parseInt(h.token)];
                        if (l.length === 0) {
                            throw "Missing = after duration in Q: field"
                        }
                        h = l.shift();
                        if (h.type !== "punct" || h.token !== "=") {
                            throw "Expected = after duration in Q: field"
                        }
                        if (l.length === 0) {
                            throw "Missing tempo after = in Q: field"
                        }
                        h = l.shift();
                        if (h.type !== "number") {
                            throw "Expected number after = in Q: field"
                        }
                        j.bpm = parseInt(h.token)
                    } else {
                        throw "Expected number or equal after C in Q: field"
                    }
                }
            } else {
                if (h.type === "number") {
                    var k = parseInt(h.token);
                    if (l.length === 0 || l[0].type === "quote") {
                        j.duration = [1];
                        j.bpm = k
                    } else {
                        n = false;
                        h = l.shift();
                        if (h.type !== "punct" && h.token !== "/") {
                            throw "Expected fraction in Q: field"
                        }
                        h = l.shift();
                        if (h.type !== "number") {
                            throw "Expected fraction in Q: field"
                        }
                        var m = parseInt(h.token);
                        j.duration = [k / m];
                        while (l.length > 0 && l[0].token !== "=" && l[0].type !== "quote") {
                            h = l.shift();
                            if (h.type !== "number") {
                                throw "Expected fraction in Q: field"
                            }
                            k = parseInt(h.token);
                            h = l.shift();
                            if (h.type !== "punct" && h.token !== "/") {
                                throw "Expected fraction in Q: field"
                            }
                            h = l.shift();
                            if (h.type !== "number") {
                                throw "Expected fraction in Q: field"
                            }
                            m = parseInt(h.token);
                            j.duration.push(k / m)
                        }
                        h = l.shift();
                        if (h.type !== "punct" && h.token !== "=") {
                            throw "Expected = in Q: field"
                        }
                        h = l.shift();
                        if (h.type !== "number") {
                            throw "Expected tempo in Q: field"
                        }
                        j.bpm = parseInt(h.token)
                    }
                } else {
                    throw "Unknown value in Q: field"
                }
            }
            if (l.length !== 0) {
                h = l.shift();
                if (h.type === "quote") {
                    j.postString = h.token;
                    h = l.shift()
                }
                if (l.length !== 0) {
                    throw "Unexpected string at end of Q: field"
                }
            }
            if (a.printTempo === false) {
                j.suppress = true
            }
            return {
                type: n ? "delaySet" : "immediate",
                tempo: j
            }
        } catch (g) {
            e(g, o, f);
            return {
                type: "none"
            }
        }
    };
    this.letter_to_inline_header = function(h, k) {
        var g = c.eatWhiteSpace(h, k);
        k += g;
        if (h.length >= k + 5 && h.charAt(k) === "[" && h.charAt(k + 2) === ":") {
            var n = h.indexOf("]", k);
            switch (h.substring(k, k + 3)) {
                case "[I:":
                    var l = window.ABCJS.parse.parseDirective.addDirective(h.substring(k + 3, n));
                    if (l) {
                        e(l, h, k)
                    }
                    return [n - k + 1 + g];
                case "[M:":
                    var m = this.setMeter(h.substring(k + 3, n));
                    if (d.hasBeginMusic() && m) {
                        d.appendStartingElement("meter", -1, -1, m)
                    } else {
                        a.meter = m
                    }
                    return [n - k + 1 + g];
                case "[K:":
                    var f = window.ABCJS.parse.parseKeyVoice.parseKey(h.substring(k + 3, n));
                    if (f.foundClef && d.hasBeginMusic()) {
                        d.appendStartingElement("clef", -1, -1, a.clef)
                    }
                    if (f.foundKey && d.hasBeginMusic()) {
                        d.appendStartingElement("key", -1, -1, window.ABCJS.parse.parseKeyVoice.fixKey(a.clef, a.key))
                    }
                    return [n - k + 1 + g];
                case "[P:":
                    d.appendElement("part", -1, -1, {
                        title: h.substring(k + 3, n)
                    });
                    return [n - k + 1 + g];
                case "[L:":
                    this.setDefaultLength(h, k + 3, n);
                    return [n - k + 1 + g];
                case "[Q:":
                    if (n > 0) {
                        var j = this.setTempo(h, k + 3, n);
                        if (j.type === "delaySet") {
                            d.appendElement("tempo", -1, -1, this.calcTempo(j.tempo))
                        } else {
                            if (j.type === "immediate") {
                                d.appendElement("tempo", -1, -1, j.tempo)
                            }
                        }
                        return [n - k + 1 + g, h.charAt(k + 1), h.substring(k + 3, n)]
                    }
                    break;
                case "[V:":
                    if (n > 0) {
                        window.ABCJS.parse.parseKeyVoice.parseVoice(h, k + 3, n);
                        return [n - k + 1 + g, h.charAt(k + 1), h.substring(k + 3, n)]
                    }
                    break;
                default:
            }
        }
        return [0]
    };
    this.letter_to_body_header = function(g, j) {
        if (g.length >= j + 3) {
            switch (g.substring(j, j + 2)) {
                case "I:":
                    var k = window.ABCJS.parse.parseDirective.addDirective(g.substring(j + 2));
                    if (k) {
                        e(k, g, j)
                    }
                    return [g.length];
                case "M:":
                    var l = this.setMeter(g.substring(j + 2));
                    if (d.hasBeginMusic() && l) {
                        d.appendStartingElement("meter", -1, -1, l)
                    }
                    return [g.length];
                case "K:":
                    var f = window.ABCJS.parse.parseKeyVoice.parseKey(g.substring(j + 2));
                    if (f.foundClef && d.hasBeginMusic()) {
                        d.appendStartingElement("clef", -1, -1, a.clef)
                    }
                    if (f.foundKey && d.hasBeginMusic()) {
                        d.appendStartingElement("key", -1, -1, window.ABCJS.parse.parseKeyVoice.fixKey(a.clef, a.key))
                    }
                    return [g.length];
                case "P:":
                    if (d.hasBeginMusic()) {
                        d.appendElement("part", -1, -1, {
                            title: g.substring(j + 2)
                        })
                    }
                    return [g.length];
                case "L:":
                    this.setDefaultLength(g, j + 2, g.length);
                    return [g.length];
                case "Q:":
                    var m = g.indexOf("\x12", j + 2);
                    if (m === -1) {
                        m = g.length
                    }
                    var h = this.setTempo(g, j + 2, m);
                    if (h.type === "delaySet") {
                        d.appendElement("tempo", -1, -1, this.calcTempo(h.tempo))
                    } else {
                        if (h.type === "immediate") {
                            d.appendElement("tempo", -1, -1, h.tempo)
                        }
                    }
                    return [m, g.charAt(j), window.ABCJS.parse.strip(g.substring(j + 2))];
                case "V:":
                    window.ABCJS.parse.parseKeyVoice.parseVoice(g, 2, g.length);
                    return [g.length, g.charAt(j), window.ABCJS.parse(g.substring(j + 2))];
                default:
            }
        }
        return [0]
    };
    var b = {
        A: "author",
        B: "book",
        C: "composer",
        D: "discography",
        F: "url",
        G: "group",
        I: "instruction",
        N: "notes",
        O: "origin",
        R: "rhythm",
        S: "source",
        W: "unalignedWords",
        Z: "transcription"
    };
    this.parseHeader = function(g) {
        if (window.ABCJS.parse.startsWith(g, "%%")) {
            var l = window.ABCJS.parse.parseDirective.addDirective(g.substring(2));
            if (l) {
                e(l, g, 2)
            }
            return {}
        }
        var j = g.indexOf("%");
        if (j >= 0) {
            g = g.substring(0, j)
        }
        g = g.replace(/\s+$/, "");
        if (g.length === 0) {
            return {}
        }
        if (g.length >= 2) {
            if (g.charAt(1) === ":") {
                var k = "";
                if (g.indexOf("\x12") >= 0 && g.charAt(0) !== "w") {
                    k = g.substring(g.indexOf("\x12") + 1);
                    g = g.substring(0, g.indexOf("\x12"))
                }
                var m = b[g.charAt(0)];
                if (m !== undefined) {
                    if (m === "unalignedWords") {
                        d.addMetaTextArray(m, window.ABCJS.parse.parseDirective.parseFontChangeLine(c.translateString(c.stripComment(g.substring(2)))))
                    } else {
                        d.addMetaText(m, c.translateString(c.stripComment(g.substring(2))))
                    }
                    return {}
                } else {
                    switch (g.charAt(0)) {
                        case "H":
                            d.addMetaText("history", c.translateString(c.stripComment(g.substring(2))));
                            a.is_in_history = true;
                            break;
                        case "K":
                            this.resolveTempo();
                            var f = window.ABCJS.parse.parseKeyVoice.parseKey(g.substring(2));
                            if (!a.is_in_header && d.hasBeginMusic()) {
                                if (f.foundClef) {
                                    d.appendStartingElement("clef", -1, -1, a.clef)
                                }
                                if (f.foundKey) {
                                    d.appendStartingElement("key", -1, -1, window.ABCJS.parse.parseKeyVoice.fixKey(a.clef, a.key))
                                }
                            }
                            a.is_in_header = false;
                            break;
                        case "L":
                            this.setDefaultLength(g, 2, g.length);
                            break;
                        case "M":
                            a.origMeter = a.meter = this.setMeter(g.substring(2));
                            break;
                        case "P":
                            if (a.is_in_header) {
                                d.addMetaText("partOrder", c.translateString(c.stripComment(g.substring(2))))
                            } else {
                                a.partForNextLine = c.translateString(c.stripComment(g.substring(2)))
                            }
                            break;
                        case "Q":
                            var h = this.setTempo(g, 2, g.length);
                            if (h.type === "delaySet") {
                                a.tempo = h.tempo
                            } else {
                                if (h.type === "immediate") {
                                    d.metaText.tempo = h.tempo
                                }
                            }
                            break;
                        case "T":
                            this.setTitle(g.substring(2));
                            break;
                        case "U":
                            this.addUserDefinition(g, 2, g.length);
                            break;
                        case "V":
                            window.ABCJS.parse.parseKeyVoice.parseVoice(g, 2, g.length);
                            if (!a.is_in_header) {
                                return {
                                    newline: true
                                }
                            }
                            break;
                        case "s":
                            return {
                                symbols: true
                            };
                        case "w":
                            return {
                                words: true
                            };
                        case "X":
                            break;
                        case "E":
                        case "m":
                            e("Ignored header", g, 0);
                            break;
                        default:
                            if (k.length) {
                                k = "\x12" + k
                            }
                            return {
                                regular: true,
                                str: g + k
                            }
                    }
                }
                if (k.length > 0) {
                    return {
                        recurse: true,
                        str: k
                    }
                }
                return {}
            }
        }
        return {
            regular: true,
            str: g
        }
    }
};
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.parse) {
    window.ABCJS.parse = {}
}
window.ABCJS.parse.parseKeyVoice = {};
(function() {
    var i;
    var f;
    var b;
    var e;
    window.ABCJS.parse.parseKeyVoice.initialize = function(n, l, m, k) {
        i = n;
        f = l;
        b = m;
        e = k
    };
    window.ABCJS.parse.parseKeyVoice.standardKey = function(x) {
        var n = {
            acc: "sharp",
            note: "f"
        };
        var s = {
            acc: "sharp",
            note: "c"
        };
        var w = {
            acc: "sharp",
            note: "g"
        };
        var l = {
            acc: "sharp",
            note: "d"
        };
        var q = {
            acc: "sharp",
            note: "A"
        };
        var v = {
            acc: "sharp",
            note: "e"
        };
        var z = {
            acc: "sharp",
            note: "B"
        };
        var u = {
            acc: "flat",
            note: "B"
        };
        var t = {
            acc: "flat",
            note: "e"
        };
        var r = {
            acc: "flat",
            note: "A"
        };
        var p = {
            acc: "flat",
            note: "d"
        };
        var o = {
            acc: "flat",
            note: "G"
        };
        var m = {
            acc: "flat",
            note: "c"
        };
        var k = {
            acc: "flat",
            note: "F"
        };
        var y = {
            "C#": [n, s, w, l, q, v, z],
            "A#m": [n, s, w, l, q, v, z],
            "G#Mix": [n, s, w, l, q, v, z],
            "D#Dor": [n, s, w, l, q, v, z],
            "E#Phr": [n, s, w, l, q, v, z],
            "F#Lyd": [n, s, w, l, q, v, z],
            "B#Loc": [n, s, w, l, q, v, z],
            "F#": [n, s, w, l, q, v],
            "D#m": [n, s, w, l, q, v],
            "C#Mix": [n, s, w, l, q, v],
            "G#Dor": [n, s, w, l, q, v],
            "A#Phr": [n, s, w, l, q, v],
            BLyd: [n, s, w, l, q, v],
            "E#Loc": [n, s, w, l, q, v],
            B: [n, s, w, l, q],
            "G#m": [n, s, w, l, q],
            "F#Mix": [n, s, w, l, q],
            "C#Dor": [n, s, w, l, q],
            "D#Phr": [n, s, w, l, q],
            ELyd: [n, s, w, l, q],
            "A#Loc": [n, s, w, l, q],
            E: [n, s, w, l],
            "C#m": [n, s, w, l],
            BMix: [n, s, w, l],
            "F#Dor": [n, s, w, l],
            "G#Phr": [n, s, w, l],
            ALyd: [n, s, w, l],
            "D#Loc": [n, s, w, l],
            A: [n, s, w],
            "F#m": [n, s, w],
            EMix: [n, s, w],
            BDor: [n, s, w],
            "C#Phr": [n, s, w],
            DLyd: [n, s, w],
            "G#Loc": [n, s, w],
            D: [n, s],
            Bm: [n, s],
            AMix: [n, s],
            EDor: [n, s],
            "F#Phr": [n, s],
            GLyd: [n, s],
            "C#Loc": [n, s],
            G: [n],
            Em: [n],
            DMix: [n],
            ADor: [n],
            BPhr: [n],
            CLyd: [n],
            "F#Loc": [n],
            C: [],
            Am: [],
            GMix: [],
            DDor: [],
            EPhr: [],
            FLyd: [],
            BLoc: [],
            F: [u],
            Dm: [u],
            CMix: [u],
            GDor: [u],
            APhr: [u],
            BbLyd: [u],
            ELoc: [u],
            Bb: [u, t],
            Gm: [u, t],
            FMix: [u, t],
            CDor: [u, t],
            DPhr: [u, t],
            EbLyd: [u, t],
            ALoc: [u, t],
            Eb: [u, t, r],
            Cm: [u, t, r],
            BbMix: [u, t, r],
            FDor: [u, t, r],
            GPhr: [u, t, r],
            AbLyd: [u, t, r],
            DLoc: [u, t, r],
            Ab: [u, t, r, p],
            Fm: [u, t, r, p],
            EbMix: [u, t, r, p],
            BbDor: [u, t, r, p],
            CPhr: [u, t, r, p],
            DbLyd: [u, t, r, p],
            GLoc: [u, t, r, p],
            Db: [u, t, r, p, o],
            Bbm: [u, t, r, p, o],
            AbMix: [u, t, r, p, o],
            EbDor: [u, t, r, p, o],
            FPhr: [u, t, r, p, o],
            GbLyd: [u, t, r, p, o],
            CLoc: [u, t, r, p, o],
            Gb: [u, t, r, p, o, m],
            Ebm: [u, t, r, p, o, m],
            DbMix: [u, t, r, p, o, m],
            AbDor: [u, t, r, p, o, m],
            BbPhr: [u, t, r, p, o, m],
            CbLyd: [u, t, r, p, o, m],
            FLoc: [u, t, r, p, o, m],
            Cb: [u, t, r, p, o, m, k],
            Abm: [u, t, r, p, o, m, k],
            GbMix: [u, t, r, p, o, m, k],
            DbDor: [u, t, r, p, o, m, k],
            EbPhr: [u, t, r, p, o, m, k],
            FbLyd: [u, t, r, p, o, m, k],
            BbLoc: [u, t, r, p, o, m, k],
            "A#": [u, t],
            "B#": [],
            "D#": [u, t, r],
            "E#": [u],
            "G#": [u, t, r, p],
            Gbm: [n, s, w, l, q, v, z]
        };
        return y[x]
    };
    var c = {
        treble: {
            clef: "treble",
            pitch: 4,
            mid: 0
        },
        "treble+8": {
            clef: "treble+8",
            pitch: 4,
            mid: 0
        },
        "treble-8": {
            clef: "treble-8",
            pitch: 4,
            mid: 0
        },
        treble1: {
            clef: "treble",
            pitch: 2,
            mid: 2
        },
        treble2: {
            clef: "treble",
            pitch: 4,
            mid: 0
        },
        treble3: {
            clef: "treble",
            pitch: 6,
            mid: -2
        },
        treble4: {
            clef: "treble",
            pitch: 8,
            mid: -4
        },
        treble5: {
            clef: "treble",
            pitch: 10,
            mid: -6
        },
        perc: {
            clef: "perc",
            pitch: 6,
            mid: 0
        },
        none: {
            clef: "none",
            mid: 0
        },
        bass: {
            clef: "bass",
            pitch: 8,
            mid: -12
        },
        "bass+8": {
            clef: "bass+8",
            pitch: 8,
            mid: -12
        },
        "bass-8": {
            clef: "bass-8",
            pitch: 8,
            mid: -12
        },
        "bass+16": {
            clef: "bass",
            pitch: 8,
            mid: -12
        },
        "bass-16": {
            clef: "bass",
            pitch: 8,
            mid: -12
        },
        bass1: {
            clef: "bass",
            pitch: 2,
            mid: -6
        },
        bass2: {
            clef: "bass",
            pitch: 4,
            mid: -8
        },
        bass3: {
            clef: "bass",
            pitch: 6,
            mid: -10
        },
        bass4: {
            clef: "bass",
            pitch: 8,
            mid: -12
        },
        bass5: {
            clef: "bass",
            pitch: 10,
            mid: -14
        },
        tenor: {
            clef: "alto",
            pitch: 8,
            mid: -8
        },
        tenor1: {
            clef: "alto",
            pitch: 2,
            mid: -2
        },
        tenor2: {
            clef: "alto",
            pitch: 4,
            mid: -4
        },
        tenor3: {
            clef: "alto",
            pitch: 6,
            mid: -6
        },
        tenor4: {
            clef: "alto",
            pitch: 8,
            mid: -8
        },
        tenor5: {
            clef: "alto",
            pitch: 10,
            mid: -10
        },
        alto: {
            clef: "alto",
            pitch: 6,
            mid: -6
        },
        alto1: {
            clef: "alto",
            pitch: 2,
            mid: -2
        },
        alto2: {
            clef: "alto",
            pitch: 4,
            mid: -4
        },
        alto3: {
            clef: "alto",
            pitch: 6,
            mid: -6
        },
        alto4: {
            clef: "alto",
            pitch: 8,
            mid: -8
        },
        alto5: {
            clef: "alto",
            pitch: 10,
            mid: -10
        },
        "alto+8": {
            clef: "alto+8",
            pitch: 6,
            mid: -6
        },
        "alto-8": {
            clef: "alto-8",
            pitch: 6,
            mid: -6
        }
    };
    var j = function(n, k) {
        var m = c[n];
        var l = m ? m.mid : 0;
        return l + k
    };
    window.ABCJS.parse.parseKeyVoice.fixClef = function(l) {
        var k = c[l.type];
        if (k) {
            l.clefPos = k.pitch;
            l.type = k.clef
        }
    };
    window.ABCJS.parse.parseKeyVoice.deepCopyKey = function(l) {
        var k = {
            accidentals: [],
            root: l.root,
            acc: l.acc,
            mode: l.mode
        };
        window.ABCJS.parse.each(l.accidentals, function(m) {
            k.accidentals.push(window.ABCJS.parse.clone(m))
        });
        return k
    };
    var d = {
        A: 5,
        B: 6,
        C: 0,
        D: 1,
        E: 2,
        F: 3,
        G: 4,
        a: 12,
        b: 13,
        c: 7,
        d: 8,
        e: 9,
        f: 10,
        g: 11
    };
    window.ABCJS.parse.parseKeyVoice.addPosToKey = function(m, l) {
        var k = m.verticalPos;
        window.ABCJS.parse.each(l.accidentals, function(n) {
            var o = d[n.note];
            o = o - k;
            n.verticalPos = o
        });
        if (l.impliedNaturals) {
            window.ABCJS.parse.each(l.impliedNaturals, function(n) {
                var o = d[n.note];
                o = o - k;
                n.verticalPos = o
            })
        }
        if (k < -10) {
            window.ABCJS.parse.each(l.accidentals, function(n) {
                n.verticalPos -= 7;
                if (n.verticalPos >= 11 || (n.verticalPos === 10 && n.acc === "flat")) {
                    n.verticalPos -= 7
                }
                if (n.note === "A" && n.acc === "sharp") {
                    n.verticalPos -= 7
                }
                if ((n.note === "G" || n.note === "F") && n.acc === "flat") {
                    n.verticalPos -= 7
                }
            });
            if (l.impliedNaturals) {
                window.ABCJS.parse.each(l.impliedNaturals, function(n) {
                    n.verticalPos -= 7;
                    if (n.verticalPos >= 11 || (n.verticalPos === 10 && n.acc === "flat")) {
                        n.verticalPos -= 7
                    }
                    if (n.note === "A" && n.acc === "sharp") {
                        n.verticalPos -= 7
                    }
                    if ((n.note === "G" || n.note === "F") && n.acc === "flat") {
                        n.verticalPos -= 7
                    }
                })
            }
        } else {
            if (k < -4) {
                window.ABCJS.parse.each(l.accidentals, function(n) {
                    n.verticalPos -= 7;
                    if (k === -8 && (n.note === "f" || n.note === "g") && n.acc === "sharp") {
                        n.verticalPos -= 7
                    }
                });
                if (l.impliedNaturals) {
                    window.ABCJS.parse.each(l.impliedNaturals, function(n) {
                        n.verticalPos -= 7;
                        if (k === -8 && (n.note === "f" || n.note === "g") && n.acc === "sharp") {
                            n.verticalPos -= 7
                        }
                    })
                }
            } else {
                if (k >= 7) {
                    window.ABCJS.parse.each(l.accidentals, function(n) {
                        n.verticalPos += 7
                    });
                    if (l.impliedNaturals) {
                        window.ABCJS.parse.each(l.impliedNaturals, function(n) {
                            n.verticalPos += 7
                        })
                    }
                }
            }
        }
    };
    window.ABCJS.parse.parseKeyVoice.fixKey = function(m, k) {
        var l = window.ABCJS.parse.clone(k);
        window.ABCJS.parse.parseKeyVoice.addPosToKey(m, l);
        return l
    };
    var a = function(m) {
        var k = d[m.charAt(0)];
        for (var l = 1; l < m.length; l++) {
            if (m.charAt(l) === ",") {
                k -= 7
            } else {
                if (m.charAt(l) === ",") {
                    k += 7
                } else {
                    break
                }
            }
        }
        return {
            mid: k - 6,
            str: m.substring(l)
        }
    };
    var h = function(k) {
        for (var l = 0; l < k.length; l++) {
            if (k[l].note === "b") {
                k[l].note = "B"
            } else {
                if (k[l].note === "a") {
                    k[l].note = "A"
                } else {
                    if (k[l].note === "F") {
                        k[l].note = "f"
                    } else {
                        if (k[l].note === "E") {
                            k[l].note = "e"
                        } else {
                            if (k[l].note === "D") {
                                k[l].note = "d"
                            } else {
                                if (k[l].note === "C") {
                                    k[l].note = "c"
                                } else {
                                    if (k[l].note === "G" && k[l].acc === "sharp") {
                                        k[l].note = "g"
                                    } else {
                                        if (k[l].note === "g" && k[l].acc === "flat") {
                                            k[l].note = "G"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    window.ABCJS.parse.parseKeyVoice.parseKey = function(x) {
        if (x.length === 0) {
            x = "none"
        }
        var w = i.tokenize(x, 0, x.length);
        var D = {};
        switch (w[0].token) {
            case "HP":
                window.ABCJS.parse.parseDirective.addDirective("bagpipes");
                b.key = {
                    root: "HP",
                    accidentals: [],
                    acc: "",
                    mode: ""
                };
                D.foundKey = true;
                w.shift();
                break;
            case "Hp":
                window.ABCJS.parse.parseDirective.addDirective("bagpipes");
                b.key = {
                    root: "Hp",
                    accidentals: [{
                        acc: "natural",
                        note: "g"
                    }, {
                        acc: "sharp",
                        note: "f"
                    }, {
                        acc: "sharp",
                        note: "c"
                    }],
                    acc: "",
                    mode: ""
                };
                D.foundKey = true;
                w.shift();
                break;
            case "none":
                b.key = {
                    root: "none",
                    accidentals: [],
                    acc: "",
                    mode: ""
                };
                D.foundKey = true;
                w.shift();
                break;
            default:
                var p = i.getKeyPitch(w[0].token);
                if (p.len > 0) {
                    D.foundKey = true;
                    var n = "";
                    var v = "";
                    if (w[0].token.length > 1) {
                        w[0].token = w[0].token.substring(1)
                    } else {
                        w.shift()
                    }
                    var E = p.token;
                    if (w.length > 0) {
                        var l = i.getSharpFlat(w[0].token);
                        if (l.len > 0) {
                            if (w[0].token.length > 1) {
                                w[0].token = w[0].token.substring(1)
                            } else {
                                w.shift()
                            }
                            E += l.token;
                            n = l.token
                        }
                        if (w.length > 0) {
                            var C = i.getMode(w[0].token);
                            if (C.len > 0) {
                                w.shift();
                                E += C.token;
                                v = C.token
                            }
                        }
                    }
                    var s = window.ABCJS.parse.parseKeyVoice.deepCopyKey(b.key);
                    b.key = window.ABCJS.parse.parseKeyVoice.deepCopyKey({
                        accidentals: window.ABCJS.parse.parseKeyVoice.standardKey(E)
                    });
                    b.key.root = p.token;
                    b.key.acc = n;
                    b.key.mode = v;
                    if (s) {
                        var m;
                        for (var z = 0; z < b.key.accidentals.length; z++) {
                            for (m = 0; m < s.accidentals.length; m++) {
                                if (s.accidentals[m].note && b.key.accidentals[z].note.toLowerCase() === s.accidentals[m].note.toLowerCase()) {
                                    s.accidentals[m].note = null
                                }
                            }
                        }
                        for (m = 0; m < s.accidentals.length; m++) {
                            if (s.accidentals[m].note) {
                                if (!b.key.impliedNaturals) {
                                    b.key.impliedNaturals = []
                                }
                                b.key.impliedNaturals.push({
                                    acc: "natural",
                                    note: s.accidentals[m].note
                                })
                            }
                        }
                    }
                }
                break
        }
        if (w.length === 0) {
            return D
        }
        if (w[0].token === "exp") {
            w.shift()
        }
        if (w.length === 0) {
            return D
        }
        if (w[0].token === "oct") {
            w.shift()
        }
        if (w.length === 0) {
            return D
        }
        var t = i.getKeyAccidentals2(w);
        if (t.warn) {
            f(t.warn, x, 0)
        }
        if (t.accs) {
            if (!D.foundKey) {
                D.foundKey = true;
                b.key = {
                    root: "none",
                    acc: "",
                    mode: "",
                    accidentals: []
                }
            }
            h(t.accs);
            for (var B = 0; B < t.accs.length; B++) {
                var u = false;
                for (var A = 0; A < b.key.accidentals.length && !u; A++) {
                    if (b.key.accidentals[A].note === t.accs[B].note) {
                        u = true;
                        b.key.accidentals[A].acc = t.accs[B].acc
                    }
                }
                if (!u) {
                    b.key.accidentals.push(t.accs[B]);
                    if (b.key.impliedNaturals) {
                        for (var q = 0; q < b.key.impliedNaturals.length; q++) {
                            if (b.key.impliedNaturals[q].note === t.accs[B].note) {
                                b.key.impliedNaturals.splice(q, 1)
                            }
                        }
                    }
                }
            }
        }
        var o;
        while (w.length > 0) {
            switch (w[0].token) {
                case "m":
                case "middle":
                    w.shift();
                    if (w.length === 0) {
                        f("Expected = after middle", x, 0);
                        return D
                    }
                    o = w.shift();
                    if (o.token !== "=") {
                        f("Expected = after middle", x, o.start);
                        break
                    }
                    if (w.length === 0) {
                        f("Expected parameter after middle=", x, 0);
                        return D
                    }
                    var r = i.getPitchFromTokens(w);
                    if (r.warn) {
                        f(r.warn, x, 0)
                    }
                    if (r.position) {
                        b.clef.verticalPos = r.position - 6
                    }
                    break;
                case "transpose":
                    w.shift();
                    if (w.length === 0) {
                        f("Expected = after transpose", x, 0);
                        return D
                    }
                    o = w.shift();
                    if (o.token !== "=") {
                        f("Expected = after transpose", x, o.start);
                        break
                    }
                    if (w.length === 0) {
                        f("Expected parameter after transpose=", x, 0);
                        return D
                    }
                    if (w[0].type !== "number") {
                        f("Expected number after transpose", x, w[0].start);
                        break
                    }
                    b.clef.transpose = w[0].intt;
                    w.shift();
                    break;
                case "stafflines":
                    w.shift();
                    if (w.length === 0) {
                        f("Expected = after stafflines", x, 0);
                        return D
                    }
                    o = w.shift();
                    if (o.token !== "=") {
                        f("Expected = after stafflines", x, o.start);
                        break
                    }
                    if (w.length === 0) {
                        f("Expected parameter after stafflines=", x, 0);
                        return D
                    }
                    if (w[0].type !== "number") {
                        f("Expected number after stafflines", x, w[0].start);
                        break
                    }
                    b.clef.stafflines = w[0].intt;
                    w.shift();
                    break;
                case "staffscale":
                    w.shift();
                    if (w.length === 0) {
                        f("Expected = after staffscale", x, 0);
                        return D
                    }
                    o = w.shift();
                    if (o.token !== "=") {
                        f("Expected = after staffscale", x, o.start);
                        break
                    }
                    if (w.length === 0) {
                        f("Expected parameter after staffscale=", x, 0);
                        return D
                    }
                    if (w[0].type !== "number") {
                        f("Expected number after staffscale", x, w[0].start);
                        break
                    }
                    b.clef.staffscale = w[0].floatt;
                    w.shift();
                    break;
                case "style":
                    w.shift();
                    if (w.length === 0) {
                        f("Expected = after style", x, 0);
                        return D
                    }
                    o = w.shift();
                    if (o.token !== "=") {
                        f("Expected = after style", x, o.start);
                        break
                    }
                    if (w.length === 0) {
                        f("Expected parameter after style=", x, 0);
                        return D
                    }
                    switch (w[0].token) {
                        case "normal":
                        case "harmonic":
                        case "rhythm":
                        case "x":
                            b.style = w[0].token;
                            w.shift();
                            break;
                        default:
                            f("error parsing style element: " + w[0].token, x, w[0].start);
                            break
                    }
                    break;
                case "clef":
                    w.shift();
                    if (w.length === 0) {
                        f("Expected = after clef", x, 0);
                        return D
                    }
                    o = w.shift();
                    if (o.token !== "=") {
                        f("Expected = after clef", x, o.start);
                        break
                    }
                    if (w.length === 0) {
                        f("Expected parameter after clef=", x, 0);
                        return D
                    }
                case "treble":
                case "bass":
                case "alto":
                case "tenor":
                case "perc":
                    var y = w.shift();
                    switch (y.token) {
                        case "treble":
                        case "tenor":
                        case "alto":
                        case "bass":
                        case "perc":
                        case "none":
                            break;
                        case "C":
                            y.token = "alto";
                            break;
                        case "F":
                            y.token = "bass";
                            break;
                        case "G":
                            y.token = "treble";
                            break;
                        case "c":
                            y.token = "alto";
                            break;
                        case "f":
                            y.token = "bass";
                            break;
                        case "g":
                            y.token = "treble";
                            break;
                        default:
                            f("Expected clef name. Found " + y.token, x, y.start);
                            break
                    }
                    if (w.length > 0 && w[0].type === "number") {
                        y.token += w[0].token;
                        w.shift()
                    }
                    if (w.length > 1 && (w[0].token === "-" || w[0].token === "+") && w[1].token === "8") {
                        y.token += w[0].token + w[1].token;
                        w.shift();
                        w.shift()
                    }
                    b.clef = {
                        type: y.token,
                        verticalPos: j(y.token, 0)
                    };
                    D.foundClef = true;
                    break;
                default:
                    f("Unknown parameter: " + w[0].token, x, w[0].start);
                    w.shift()
            }
        }
        return D
    };
    var g = function(k) {
        b.currentVoice = b.voices[k];
        e.setCurrentVoice(b.currentVoice.staffNum, b.currentVoice.index)
    };
    window.ABCJS.parse.parseKeyVoice.parseVoice = function(n, x, y) {
        var C = i.getMeat(n, x, y);
        var l = C.start;
        var k = C.end;
        var r = i.getToken(n, l, k);
        if (r.length === 0) {
            f("Expected a voice id", n, l);
            return
        }
        var A = false;
        if (b.voices[r] === undefined) {
            b.voices[r] = {};
            A = true;
            if (b.score_is_present) {
                f("Can't have an unknown V: id when the %score directive is present", n, l)
            }
        }
        l += r.length;
        l += i.eatWhiteSpace(n, l);
        var p = {
            startStaff: A
        };
        var D = function(v) {
            var s = i.getVoiceToken(n, l, k);
            if (s.warn !== undefined) {
                f("Expected value for " + v + " in voice: " + s.warn, n, l)
            } else {
                if (s.token.length === 0 && n.charAt(l) !== '"') {
                    f("Expected value for " + v + " in voice", n, l)
                } else {
                    p[v] = s.token
                }
            }
            l += s.len
        };
        var z = function(F, v, E) {
            var s = i.getVoiceToken(n, l, k);
            if (s.warn !== undefined) {
                f("Expected value for " + v + " in voice: " + s.warn, n, l)
            } else {
                if (s.token.length === 0 && n.charAt(l) !== '"') {
                    f("Expected value for " + v + " in voice", n, l)
                } else {
                    if (E === "number") {
                        s.token = parseFloat(s.token)
                    }
                    b.voices[F][v] = s.token
                }
            }
            l += s.len
        };
        while (l < k) {
            var m = i.getVoiceToken(n, l, k);
            l += m.len;
            if (m.warn) {
                f("Error parsing voice: " + m.warn, n, l)
            } else {
                var u = null;
                switch (m.token) {
                    case "clef":
                    case "cl":
                        D("clef");
                        var t = 0;
                        if (p.clef !== undefined) {
                            p.clef = p.clef.replace(/[',]/g, "");
                            if (p.clef.indexOf("+16") !== -1) {
                                t += 14;
                                p.clef = p.clef.replace("+16", "")
                            }
                            p.verticalPos = j(p.clef, t)
                        }
                        break;
                    case "treble":
                    case "bass":
                    case "tenor":
                    case "alto":
                    case "none":
                    case "treble'":
                    case "bass'":
                    case "tenor'":
                    case "alto'":
                    case "none'":
                    case "treble''":
                    case "bass''":
                    case "tenor''":
                    case "alto''":
                    case "none''":
                    case "treble,":
                    case "bass,":
                    case "tenor,":
                    case "alto,":
                    case "none,":
                    case "treble,,":
                    case "bass,,":
                    case "tenor,,":
                    case "alto,,":
                    case "none,,":
                        var w = 0;
                        p.clef = m.token.replace(/[',]/g, "");
                        p.verticalPos = j(p.clef, w);
                        break;
                    case "staves":
                    case "stave":
                    case "stv":
                        D("staves");
                        break;
                    case "brace":
                    case "brc":
                        D("brace");
                        break;
                    case "bracket":
                    case "brk":
                        D("bracket");
                        break;
                    case "name":
                    case "nm":
                        D("name");
                        break;
                    case "subname":
                    case "sname":
                    case "snm":
                        D("subname");
                        break;
                    case "merge":
                        p.startStaff = false;
                        break;
                    case "stems":
                        u = i.getVoiceToken(n, l, k);
                        if (u.warn !== undefined) {
                            f("Expected value for stems in voice: " + u.warn, n, l)
                        } else {
                            if (u.token === "up" || u.token === "down") {
                                b.voices[r].stem = u.token
                            } else {
                                f("Expected up or down for voice stem", n, l)
                            }
                        }
                        l += u.len;
                        break;
                    case "up":
                    case "down":
                        b.voices[r].stem = m.token;
                        break;
                    case "middle":
                    case "m":
                        D("verticalPos");
                        p.verticalPos = a(p.verticalPos).mid;
                        break;
                    case "gchords":
                    case "gch":
                        b.voices[r].suppressChords = true;
                        break;
                    case "space":
                    case "spc":
                        D("spacing");
                        break;
                    case "scale":
                        z(r, "scale", "number");
                        break;
                    case "transpose":
                        z(r, "transpose", "number");
                        break
                }
            }
            l += i.eatWhiteSpace(n, l)
        }
        if (p.startStaff || b.staves.length === 0) {
            b.staves.push({
                index: b.staves.length,
                meter: b.origMeter
            });
            if (!b.score_is_present) {
                b.staves[b.staves.length - 1].numVoices = 0
            }
        }
        if (b.voices[r].staffNum === undefined) {
            b.voices[r].staffNum = b.staves.length - 1;
            var B = 0;
            for (var o in b.voices) {
                if (b.voices.hasOwnProperty(o)) {
                    if (b.voices[o].staffNum === b.voices[r].staffNum) {
                        B++
                    }
                }
            }
            b.voices[r].index = B - 1
        }
        var q = b.staves[b.voices[r].staffNum];
        if (!b.score_is_present) {
            q.numVoices++
        }
        if (p.clef) {
            q.clef = {
                type: p.clef,
                verticalPos: p.verticalPos
            }
        }
        if (p.spacing) {
            q.spacing_below_offset = p.spacing
        }
        if (p.verticalPos) {
            q.verticalPos = p.verticalPos
        }
        if (p.name) {
            if (q.name) {
                q.name.push(p.name)
            } else {
                q.name = [p.name]
            }
        }
        if (p.subname) {
            if (q.subname) {
                q.subname.push(p.subname)
            } else {
                q.subname = [p.subname]
            }
        }
        g(r)
    }
})();
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.parse) {
    window.ABCJS.parse = {}
}
window.ABCJS.parse.tokenizer = function() {
    this.skipWhiteSpace = function(j) {
        for (var h = 0; h < j.length; h++) {
            if (!this.isWhiteSpace(j.charAt(h))) {
                return h
            }
        }
        return j.length
    };
    var g = function(j, h) {
        return h >= j.length
    };
    this.eatWhiteSpace = function(h, j) {
        for (var k = j; k < h.length; k++) {
            if (!this.isWhiteSpace(h.charAt(k))) {
                return k - j
            }
        }
        return k - j
    };
    this.getKeyPitch = function(j) {
        var h = this.skipWhiteSpace(j);
        if (g(j, h)) {
            return {
                len: 0
            }
        }
        switch (j.charAt(h)) {
            case "A":
                return {
                    len: h + 1,
                    token: "A"
                };
            case "B":
                return {
                    len: h + 1,
                    token: "B"
                };
            case "C":
                return {
                    len: h + 1,
                    token: "C"
                };
            case "D":
                return {
                    len: h + 1,
                    token: "D"
                };
            case "E":
                return {
                    len: h + 1,
                    token: "E"
                };
            case "F":
                return {
                    len: h + 1,
                    token: "F"
                };
            case "G":
                return {
                    len: h + 1,
                    token: "G"
                }
        }
        return {
            len: 0
        }
    };
    this.getSharpFlat = function(h) {
        if (h === "bass") {
            return {
                len: 0
            }
        }
        switch (h.charAt(0)) {
            case "#":
                return {
                    len: 1,
                    token: "#"
                };
            case "b":
                return {
                    len: 1,
                    token: "b"
                }
        }
        return {
            len: 0
        }
    };
    this.getMode = function(l) {
        var k = function(i, m) {
            while (m < i.length && ((i.charAt(m) >= "a" && i.charAt(m) <= "z") || (i.charAt(m) >= "A" && i.charAt(m) <= "Z"))) {
                m++
            }
            return m
        };
        var j = this.skipWhiteSpace(l);
        if (g(l, j)) {
            return {
                len: 0
            }
        }
        var h = l.substring(j, j + 3).toLowerCase();
        if (h.length > 1 && h.charAt(1) === " " || h.charAt(1) === "^" || h.charAt(1) === "_" || h.charAt(1) === "=") {
            h = h.charAt(0)
        }
        switch (h) {
            case "mix":
                return {
                    len: k(l, j),
                    token: "Mix"
                };
            case "dor":
                return {
                    len: k(l, j),
                    token: "Dor"
                };
            case "phr":
                return {
                    len: k(l, j),
                    token: "Phr"
                };
            case "lyd":
                return {
                    len: k(l, j),
                    token: "Lyd"
                };
            case "loc":
                return {
                    len: k(l, j),
                    token: "Loc"
                };
            case "aeo":
                return {
                    len: k(l, j),
                    token: "m"
                };
            case "maj":
                return {
                    len: k(l, j),
                    token: ""
                };
            case "ion":
                return {
                    len: k(l, j),
                    token: ""
                };
            case "min":
                return {
                    len: k(l, j),
                    token: "m"
                };
            case "m":
                return {
                    len: k(l, j),
                    token: "m"
                }
        }
        return {
            len: 0
        }
    };
    this.getClef = function(o, n) {
        var h = o;
        var m = this.skipWhiteSpace(o);
        if (g(o, m)) {
            return {
                len: 0
            }
        }
        var q = false;
        var p = o.substring(m);
        if (window.ABCJS.parse.startsWith(p, "clef=")) {
            q = true;
            p = p.substring(5);
            m += 5
        }
        if (p.length === 0 && q) {
            return {
                len: m + 5,
                warn: "No clef specified: " + h
            }
        }
        var l = this.skipWhiteSpace(p);
        if (g(p, l)) {
            return {
                len: 0
            }
        }
        if (l > 0) {
            m += l;
            p = p.substring(l)
        }
        var k = null;
        if (window.ABCJS.parse.startsWith(p, "treble")) {
            k = "treble"
        } else {
            if (window.ABCJS.parse.startsWith(p, "bass3")) {
                k = "bass3"
            } else {
                if (window.ABCJS.parse.startsWith(p, "bass")) {
                    k = "bass"
                } else {
                    if (window.ABCJS.parse.startsWith(p, "tenor")) {
                        k = "tenor"
                    } else {
                        if (window.ABCJS.parse.startsWith(p, "alto2")) {
                            k = "alto2"
                        } else {
                            if (window.ABCJS.parse.startsWith(p, "alto1")) {
                                k = "alto1"
                            } else {
                                if (window.ABCJS.parse.startsWith(p, "alto")) {
                                    k = "alto"
                                } else {
                                    if (!n && (q && window.ABCJS.parse.startsWith(p, "none"))) {
                                        k = "none"
                                    } else {
                                        if (window.ABCJS.parse.startsWith(p, "perc")) {
                                            k = "perc"
                                        } else {
                                            if (!n && (q && window.ABCJS.parse.startsWith(p, "C"))) {
                                                k = "tenor"
                                            } else {
                                                if (!n && (q && window.ABCJS.parse.startsWith(p, "F"))) {
                                                    k = "bass"
                                                } else {
                                                    if (!n && (q && window.ABCJS.parse.startsWith(p, "G"))) {
                                                        k = "treble"
                                                    } else {
                                                        return {
                                                            len: m + 5,
                                                            warn: "Unknown clef specified: " + h
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        p = p.substring(k.length);
        l = this.isMatch(p, "+8");
        if (l > 0) {
            k += "+8"
        } else {
            l = this.isMatch(p, "-8");
            if (l > 0) {
                k += "-8"
            }
        }
        return {
            len: m + k.length,
            token: k,
            explicit: q
        }
    };
    this.getBarLine = function(h, k) {
        switch (h.charAt(k)) {
            case "]":
                ++k;
                switch (h.charAt(k)) {
                    case "|":
                        return {
                            len: 2,
                            token: "bar_thick_thin"
                        };
                    case "[":
                        ++k;
                        if ((h.charAt(k) >= "1" && h.charAt(k) <= "9") || h.charAt(k) === '"') {
                            return {
                                len: 2,
                                token: "bar_invisible"
                            }
                        }
                        return {
                            len: 1,
                            warn: "Unknown bar symbol"
                        };
                    default:
                        return {
                            len: 1,
                            token: "bar_invisible"
                        }
                }
                break;
            case ":":
                ++k;
                switch (h.charAt(k)) {
                    case ":":
                        return {
                            len: 2,
                            token: "bar_dbl_repeat"
                        };
                    case "|":
                        ++k;
                        switch (h.charAt(k)) {
                            case "]":
                                ++k;
                                switch (h.charAt(k)) {
                                    case "|":
                                        ++k;
                                        if (h.charAt(k) === ":") {
                                            return {
                                                len: 5,
                                                token: "bar_dbl_repeat"
                                            }
                                        }
                                        return {
                                            len: 3,
                                            token: "bar_right_repeat"
                                        };
                                    default:
                                        return {
                                            len: 3,
                                            token: "bar_right_repeat"
                                        }
                                }
                                break;
                            case "|":
                                ++k;
                                if (h.charAt(k) === ":") {
                                    return {
                                        len: 4,
                                        token: "bar_dbl_repeat"
                                    }
                                }
                                return {
                                    len: 3,
                                    token: "bar_right_repeat"
                                };
                            default:
                                return {
                                    len: 2,
                                    token: "bar_right_repeat"
                                }
                        }
                        break;
                    default:
                        return {
                            len: 1,
                            warn: "Unknown bar symbol"
                        }
                }
                break;
            case "[":
                ++k;
                if (h.charAt(k) === "|") {
                    ++k;
                    switch (h.charAt(k)) {
                        case ":":
                            return {
                                len: 3,
                                token: "bar_left_repeat"
                            };
                        case "]":
                            return {
                                len: 3,
                                token: "bar_invisible"
                            };
                        default:
                            return {
                                len: 2,
                                token: "bar_thick_thin"
                            }
                    }
                } else {
                    if ((h.charAt(k) >= "1" && h.charAt(k) <= "9") || h.charAt(k) === '"') {
                        return {
                            len: 1,
                            token: "bar_invisible"
                        }
                    }
                    return {
                        len: 0
                    }
                }
                break;
            case "|":
                ++k;
                switch (h.charAt(k)) {
                    case "]":
                        return {
                            len: 2,
                            token: "bar_thin_thick"
                        };
                    case "|":
                        ++k;
                        if (h.charAt(k) === ":") {
                            return {
                                len: 3,
                                token: "bar_left_repeat"
                            }
                        }
                        return {
                            len: 2,
                            token: "bar_thin_thin"
                        };
                    case ":":
                        var j = 0;
                        while (h.charAt(k + j) === ":") {
                            j++
                        }
                        return {
                            len: 1 + j,
                            token: "bar_left_repeat"
                        };
                    default:
                        return {
                            len: 1,
                            token: "bar_thin"
                        }
                }
                break
        }
        return {
            len: 0
        }
    };
    this.getTokenOf = function(k, j) {
        for (var h = 0; h < k.length; h++) {
            if (j.indexOf(k.charAt(h)) < 0) {
                return {
                    len: h,
                    token: k.substring(0, h)
                }
            }
        }
        return {
            len: h,
            token: k
        }
    };
    this.getToken = function(k, l, h) {
        var j = l;
        while (j < h && !this.isWhiteSpace(k.charAt(j))) {
            j++
        }
        return k.substring(l, j)
    };
    this.isMatch = function(k, h) {
        var j = this.skipWhiteSpace(k);
        if (g(k, j)) {
            return 0
        }
        if (window.ABCJS.parse.startsWith(k.substring(j), h)) {
            return j + h.length
        }
        return 0
    };
    this.getPitchFromTokens = function(j) {
        var h = {};
        var i = {
            A: 5,
            B: 6,
            C: 0,
            D: 1,
            E: 2,
            F: 3,
            G: 4,
            a: 12,
            b: 13,
            c: 7,
            d: 8,
            e: 9,
            f: 10,
            g: 11
        };
        h.position = i[j[0].token];
        if (h.position === undefined) {
            return {
                warn: "Pitch expected. Found: " + j[0].token
            }
        }
        j.shift();
        while (j.length) {
            switch (j[0].token) {
                case ",":
                    h.position -= 7;
                    j.shift();
                    break;
                case "'":
                    h.position += 7;
                    j.shift();
                    break;
                default:
                    return h
            }
        }
        return h
    };
    this.getKeyAccidentals2 = function(j) {
        var h;
        while (j.length > 0) {
            var i;
            if (j[0].token === "^") {
                i = "sharp";
                j.shift();
                if (j.length === 0) {
                    return {
                        accs: h,
                        warn: "Expected note name after " + i
                    }
                }
                switch (j[0].token) {
                    case "^":
                        i = "dblsharp";
                        j.shift();
                        break;
                    case "/":
                        i = "quartersharp";
                        j.shift();
                        break
                }
            } else {
                if (j[0].token === "=") {
                    i = "natural";
                    j.shift()
                } else {
                    if (j[0].token === "_") {
                        i = "flat";
                        j.shift();
                        if (j.length === 0) {
                            return {
                                accs: h,
                                warn: "Expected note name after " + i
                            }
                        }
                        switch (j[0].token) {
                            case "_":
                                i = "dblflat";
                                j.shift();
                                break;
                            case "/":
                                i = "quarterflat";
                                j.shift();
                                break
                        }
                    } else {
                        return {
                            accs: h
                        }
                    }
                }
            }
            if (j.length === 0) {
                return {
                    accs: h,
                    warn: "Expected note name after " + i
                }
            }
            switch (j[0].token.charAt(0)) {
                case "a":
                case "b":
                case "c":
                case "d":
                case "e":
                case "f":
                case "g":
                case "A":
                case "B":
                case "C":
                case "D":
                case "E":
                case "F":
                case "G":
                    if (h === undefined) {
                        h = []
                    }
                    h.push({
                        acc: i,
                        note: j[0].token.charAt(0)
                    });
                    if (j[0].token.length === 1) {
                        j.shift()
                    } else {
                        j[0].token = j[0].token.substring(1)
                    }
                    break;
                default:
                    return {
                        accs: h,
                        warn: "Expected note name after " + i + " Found: " + j[0].token
                    }
            }
        }
        return {
            accs: h
        }
    };
    this.getKeyAccidental = function(l) {
        var k = {
            "^": "sharp",
            "^^": "dblsharp",
            "=": "natural",
            _: "flat",
            __: "dblflat",
            "_/": "quarterflat",
            "^/": "quartersharp"
        };
        var h = this.skipWhiteSpace(l);
        if (g(l, h)) {
            return {
                len: 0
            }
        }
        var j = null;
        switch (l.charAt(h)) {
            case "^":
            case "_":
            case "=":
                j = l.charAt(h);
                break;
            default:
                return {
                    len: 0
                }
        }
        h++;
        if (g(l, h)) {
            return {
                len: 1,
                warn: "Expected note name after accidental"
            }
        }
        switch (l.charAt(h)) {
            case "a":
            case "b":
            case "c":
            case "d":
            case "e":
            case "f":
            case "g":
            case "A":
            case "B":
            case "C":
            case "D":
            case "E":
            case "F":
            case "G":
                return {
                    len: h + 1,
                    token: {
                        acc: k[j],
                        note: l.charAt(h)
                    }
                };
            case "^":
            case "_":
            case "/":
                j += l.charAt(h);
                h++;
                if (g(l, h)) {
                    return {
                        len: 2,
                        warn: "Expected note name after accidental"
                    }
                }
                switch (l.charAt(h)) {
                    case "a":
                    case "b":
                    case "c":
                    case "d":
                    case "e":
                    case "f":
                    case "g":
                    case "A":
                    case "B":
                    case "C":
                    case "D":
                    case "E":
                    case "F":
                    case "G":
                        return {
                            len: h + 1,
                            token: {
                                acc: k[j],
                                note: l.charAt(h)
                            }
                        };
                    default:
                        return {
                            len: 2,
                            warn: "Expected note name after accidental"
                        }
                }
                break;
            default:
                return {
                    len: 1,
                    warn: "Expected note name after accidental"
                }
        }
    };
    this.isWhiteSpace = function(h) {
        return h === " " || h === "\t" || h === "\x12"
    };
    this.getMeat = function(i, k, h) {
        var j = i.indexOf("%", k);
        if (j >= 0 && j < h) {
            h = j
        }
        while (k < h && (i.charAt(k) === " " || i.charAt(k) === "\t" || i.charAt(k) === "\x12")) {
            k++
        }
        while (k < h && (i.charAt(h - 1) === " " || i.charAt(h - 1) === "\t" || i.charAt(h - 1) === "\x12")) {
            h--
        }
        return {
            start: k,
            end: h
        }
    };
    var d = function(h) {
        return (h >= "A" && h <= "Z") || (h >= "a" && h <= "z")
    };
    var c = function(h) {
        return (h >= "0" && h <= "9")
    };
    this.tokenize = function(r, j, k) {
        var n = this.getMeat(r, j, k);
        j = n.start;
        k = n.end;
        var p = [];
        var l;
        while (j < k) {
            if (r.charAt(j) === '"') {
                l = j + 1;
                while (l < k && r.charAt(l) !== '"') {
                    l++
                }
                p.push({
                    type: "quote",
                    token: r.substring(j + 1, l),
                    start: j + 1,
                    end: l
                });
                l++
            } else {
                if (d(r.charAt(j))) {
                    l = j + 1;
                    while (l < k && d(r.charAt(l))) {
                        l++
                    }
                    p.push({
                        type: "alpha",
                        token: r.substring(j, l),
                        continueId: c(r.charAt(l)),
                        start: j,
                        end: l
                    });
                    j = l + 1
                } else {
                    if (r.charAt(j) === "." && c(r.charAt(l + 1))) {
                        l = j + 1;
                        var q = null;
                        var m = null;
                        while (l < k && c(r.charAt(l))) {
                            l++
                        }
                        m = parseFloat(r.substring(j, l));
                        p.push({
                            type: "number",
                            token: r.substring(j, l),
                            intt: q,
                            floatt: m,
                            continueId: d(r.charAt(l)),
                            start: j,
                            end: l
                        });
                        j = l + 1
                    } else {
                        if (c(r.charAt(j)) || (r.charAt(j) === "-" && c(r.charAt(l + 1)))) {
                            l = j + 1;
                            var h = null;
                            var o = null;
                            while (l < k && c(r.charAt(l))) {
                                l++
                            }
                            if (r.charAt(l) === "." && c(r.charAt(l + 1))) {
                                l++;
                                while (l < k && c(r.charAt(l))) {
                                    l++
                                }
                            } else {
                                h = parseInt(r.substring(j, l))
                            }
                            o = parseFloat(r.substring(j, l));
                            p.push({
                                type: "number",
                                token: r.substring(j, l),
                                intt: h,
                                floatt: o,
                                continueId: d(r.charAt(l)),
                                start: j,
                                end: l
                            });
                            j = l + 1
                        } else {
                            if (r.charAt(j) === " " || r.charAt(j) === "\t") {
                                l = j + 1
                            } else {
                                p.push({
                                    type: "punct",
                                    token: r.charAt(j),
                                    start: j,
                                    end: j + 1
                                });
                                l = j + 1
                            }
                        }
                    }
                }
            }
            j = l
        }
        return p
    };
    this.getVoiceToken = function(j, n, h) {
        var k = n;
        while (k < h && this.isWhiteSpace(j.charAt(k)) || j.charAt(k) === "=") {
            k++
        }
        if (j.charAt(k) === '"') {
            var m = j.indexOf('"', k + 1);
            if (m === -1 || m >= h) {
                return {
                    len: 1,
                    err: "Missing close quote"
                }
            }
            return {
                len: m - n + 1,
                token: this.translateString(j.substring(k + 1, m))
            }
        } else {
            var l = k;
            while (l < h && !this.isWhiteSpace(j.charAt(l)) && j.charAt(l) !== "=") {
                l++
            }
            return {
                len: l - n + 1,
                token: j.substring(k, l)
            }
        }
    };
    var f = {
        "`a": "à",
        "'a": "á",
        "^a": "â",
        "~a": "ã",
        '"a': "ä",
        oa: "å",
        "=a": "ā",
        ua: "ă",
        ";a": "ą",
        "`e": "è",
        "'e": "é",
        "^e": "ê",
        '"e': "ë",
        "=e": "ē",
        ue: "ĕ",
        ";e": "ę",
        ".e": "ė",
        "`i": "ì",
        "'i": "í",
        "^i": "î",
        '"i': "ï",
        "=i": "ī",
        ui: "ĭ",
        ";i": "į",
        "`o": "ò",
        "'o": "ó",
        "^o": "ô",
        "~o": "õ",
        '"o': "ö",
        "=o": "ō",
        uo: "ŏ",
        "/o": "ø",
        "`u": "ù",
        "'u": "ú",
        "^u": "û",
        "~u": "ũ",
        '"u': "ü",
        ou: "ů",
        "=u": "ū",
        uu: "ŭ",
        ";u": "ų",
        "`A": "À",
        "'A": "Á",
        "^A": "Â",
        "~A": "Ã",
        '"A': "Ä",
        oA: "Å",
        "=A": "Ā",
        uA: "Ă",
        ";A": "Ą",
        "`E": "È",
        "'E": "É",
        "^E": "Ê",
        '"E': "Ë",
        "=E": "Ē",
        uE: "Ĕ",
        ";E": "Ę",
        ".E": "Ė",
        "`I": "Ì",
        "'I": "Í",
        "^I": "Î",
        "~I": "Ĩ",
        '"I': "Ï",
        "=I": "Ī",
        uI: "Ĭ",
        ";I": "Į",
        ".I": "İ",
        "`O": "Ò",
        "'O": "Ó",
        "^O": "Ô",
        "~O": "Õ",
        '"O': "Ö",
        "=O": "Ō",
        uO: "Ŏ",
        "/O": "Ø",
        "`U": "Ù",
        "'U": "Ú",
        "^U": "Û",
        "~U": "Ũ",
        '"U': "Ü",
        oU: "Ů",
        "=U": "Ū",
        uU: "Ŭ",
        ";U": "Ų",
        ae: "æ",
        AE: "Æ",
        oe: "œ",
        OE: "Œ",
        ss: "ß",
        "'c": "ć",
        "^c": "ĉ",
        uc: "č",
        cc: "ç",
        ".c": "ċ",
        cC: "Ç",
        "'C": "Ć",
        "^C": "Ĉ",
        uC: "Č",
        ".C": "Ċ",
        "~n": "ñ",
        "=s": "š",
        vs: "š",
        vz: "ž"
    };
    var e = {
        "#": "♯",
        b: "♭",
        "=": "♮"
    };
    var b = {
        "201": "♯",
        "202": "♭",
        "203": "♮",
        "241": "¡",
        "242": "¢",
        "252": "a",
        "262": "2",
        "272": "o",
        "302": "Â",
        "312": "Ê",
        "322": "Ò",
        "332": "Ú",
        "342": "â",
        "352": "ê",
        "362": "ò",
        "372": "ú",
        "243": "£",
        "253": "«",
        "263": "3",
        "273": "»",
        "303": "Ã",
        "313": "Ë",
        "323": "Ó",
        "333": "Û",
        "343": "ã",
        "353": "ë",
        "363": "ó",
        "373": "û",
        "244": "¤",
        "254": "¬",
        "264": "  ́",
        "274": "1⁄4",
        "304": "Ä",
        "314": "Ì",
        "324": "Ô",
        "334": "Ü",
        "344": "ä",
        "354": "ì",
        "364": "ô",
        "374": "ü",
        "245": "¥",
        "255": "-",
        "265": "μ",
        "275": "1⁄2",
        "305": "Å",
        "315": "Í",
        "325": "Õ",
        "335": "Ý",
        "345": "å",
        "355": "í",
        "365": "õ",
        "375": "ý",
        "246": "¦",
        "256": "®",
        "266": "¶",
        "276": "3⁄4",
        "306": "Æ",
        "316": "Î",
        "326": "Ö",
        "336": "Þ",
        "346": "æ",
        "356": "î",
        "366": "ö",
        "376": "þ",
        "247": "§",
        "257": " ̄",
        "267": "·",
        "277": "¿",
        "307": "Ç",
        "317": "Ï",
        "327": "×",
        "337": "ß",
        "347": "ç",
        "357": "ï",
        "367": "÷",
        "377": "ÿ",
        "250": " ̈",
        "260": "°",
        "270": " ̧",
        "300": "À",
        "310": "È",
        "320": "Ð",
        "330": "Ø",
        "340": "à",
        "350": "è",
        "360": "ð",
        "370": "ø",
        "251": "©",
        "261": "±",
        "271": "1",
        "301": "Á",
        "311": "É",
        "321": "Ñ",
        "331": "Ù",
        "341": "á",
        "351": "é",
        "361": "ñ",
        "371": "ù"
    };
    this.translateString = function(j) {
        var h = j.split("\\");
        if (h.length === 1) {
            return j
        }
        var i = null;
        window.ABCJS.parse.each(h, function(k) {
            if (i === null) {
                i = k
            } else {
                var l = f[k.substring(0, 2)];
                if (l !== undefined) {
                    i += l + k.substring(2)
                } else {
                    l = b[k.substring(0, 3)];
                    if (l !== undefined) {
                        i += l + k.substring(3)
                    } else {
                        l = e[k.substring(0, 1)];
                        if (l !== undefined) {
                            i += l + k.substring(1)
                        } else {
                            i += "\\" + k
                        }
                    }
                }
            }
        });
        return i
    };
    this.getNumber = function(h, j) {
        var i = 0;
        while (j < h.length) {
            switch (h.charAt(j)) {
                case "0":
                    i = i * 10;
                    j++;
                    break;
                case "1":
                    i = i * 10 + 1;
                    j++;
                    break;
                case "2":
                    i = i * 10 + 2;
                    j++;
                    break;
                case "3":
                    i = i * 10 + 3;
                    j++;
                    break;
                case "4":
                    i = i * 10 + 4;
                    j++;
                    break;
                case "5":
                    i = i * 10 + 5;
                    j++;
                    break;
                case "6":
                    i = i * 10 + 6;
                    j++;
                    break;
                case "7":
                    i = i * 10 + 7;
                    j++;
                    break;
                case "8":
                    i = i * 10 + 8;
                    j++;
                    break;
                case "9":
                    i = i * 10 + 9;
                    j++;
                    break;
                default:
                    return {
                        num: i,
                        index: j
                    }
            }
        }
        return {
            num: i,
            index: j
        }
    };
    this.getFraction = function(h, k) {
        var j = 1;
        var o = 1;
        if (h.charAt(k) !== "/") {
            var i = this.getNumber(h, k);
            j = i.num;
            k = i.index
        }
        if (h.charAt(k) === "/") {
            k++;
            if (h.charAt(k) === "/") {
                var n = 0.5;
                while (h.charAt(k++) === "/") {
                    n = n / 2
                }
                return {
                    value: j * n,
                    index: k - 1
                }
            } else {
                var l = k;
                var m = this.getNumber(h, k);
                if (m.num === 0 && l === k) {
                    m.num = 2
                }
                if (m.num !== 0) {
                    o = m.num
                }
                k = m.index
            }
        }
        return {
            value: j / o,
            index: k
        }
    };
    this.theReverser = function(h) {
        if (window.ABCJS.parse.endsWith(h, ", The")) {
            return "The " + h.substring(0, h.length - 5)
        }
        if (window.ABCJS.parse.endsWith(h, ", A")) {
            return "A " + h.substring(0, h.length - 3)
        }
        return h
    };
    this.stripComment = function(j) {
        var h = j.indexOf("%");
        if (h >= 0) {
            return window.ABCJS.parse.strip(j.substring(0, h))
        }
        return window.ABCJS.parse.strip(j)
    };
    this.getInt = function(l) {
        var h = parseInt(l);
        if (isNaN(h)) {
            return {
                digits: 0
            }
        }
        var k = "" + h;
        var j = l.indexOf(k);
        return {
            value: h,
            digits: j + k.length
        }
    };
    this.getFloat = function(l) {
        var h = parseFloat(l);
        if (isNaN(h)) {
            return {
                digits: 0
            }
        }
        var k = "" + h;
        var j = l.indexOf(k);
        return {
            value: h,
            digits: j + k.length
        }
    };
    this.getMeasurement = function(k) {
        if (k.length === 0) {
            return {
                used: 0
            }
        }
        var j = 1;
        var i = "";
        if (k[0].token === "-") {
            k.shift();
            i = "-";
            j++
        } else {
            if (k[0].type !== "number") {
                return {
                    used: 0
                }
            }
        }
        i += k.shift().token;
        if (k.length === 0) {
            return {
                used: 1,
                value: parseInt(i)
            }
        }
        var h = k.shift();
        if (h.token === ".") {
            j++;
            if (k.length === 0) {
                return {
                    used: j,
                    value: parseInt(i)
                }
            }
            if (k[0].type === "number") {
                h = k.shift();
                i = i + "." + h.token;
                j++;
                if (k.length === 0) {
                    return {
                        used: j,
                        value: parseFloat(i)
                    }
                }
            }
            h = k.shift()
        }
        switch (h.token) {
            case "pt":
                return {
                    used: j + 1,
                    value: parseFloat(i)
                };
            case "cm":
                return {
                    used: j + 1,
                    value: parseFloat(i) / 2.54 * 72
                };
            case "in":
                return {
                    used: j + 1,
                    value: parseFloat(i) * 72
                };
            default:
                k.unshift(h);
                return {
                    used: j,
                    value: parseFloat(i)
                }
        }
        return {
            used: 0
        }
    };
    var a = function(h) {
        while (h.indexOf("\\n") !== -1) {
            h = h.replace("\\n", "\n")
        }
        return h
    };
    this.getBrackettedSubstring = function(h, j, n, l) {
        var k = l || h.charAt(j);
        var m = j + 1;
        while ((m < h.length) && (h.charAt(m) !== k)) {
            ++m
        }
        if (h.charAt(m) === k) {
            return [m - j + 1, a(h.substring(j + 1, m)), true]
        } else {
            m = j + n;
            if (m > h.length - 1) {
                m = h.length - 1
            }
            return [m - j + 1, a(h.substring(j + 1, m)), false]
        }
    }
};
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.write) {
    window.ABCJS.write = {}
}
ABCJS.write.AbsoluteElement = function(d, c, b, a) {
    this.abcelem = d;
    this.duration = c;
    this.minspacing = b || 0;
    this.x = 0;
    this.children = [];
    this.heads = [];
    this.extra = [];
    this.extraw = 0;
    this.w = 0;
    this.right = [];
    this.invisible = false;
    this.bottom = undefined;
    this.top = undefined;
    this.type = a;
    this.specialY = {
        tempoHeightAbove: 0,
        partHeightAbove: 0,
        volumeHeightAbove: 0,
        dynamicHeightAbove: 0,
        endingHeightAbove: 0,
        chordHeightAbove: 0,
        lyricHeightAbove: 0,
        lyricHeightBelow: 0,
        chordHeightBelow: 0,
        volumeHeightBelow: 0,
        dynamicHeightBelow: 0
    }
};
ABCJS.write.AbsoluteElement.prototype.setUpperAndLowerElements = function(c) {
    for (var b = 0; b < this.children.length; b++) {
        var d = this.children[b];
        for (var a in this.specialY) {
            if (this.specialY.hasOwnProperty(a)) {
                if (d[a]) {
                    d.pitch = c[a]
                }
            }
        }
    }
};
ABCJS.write.AbsoluteElement.prototype.getMinWidth = function() {
    return this.w
};
ABCJS.write.AbsoluteElement.prototype.getExtraWidth = function() {
    return -this.extraw
};
ABCJS.write.AbsoluteElement.prototype.addExtra = function(a) {
    if (a.dx < this.extraw) {
        this.extraw = a.dx
    }
    this.extra[this.extra.length] = a;
    this.addChild(a)
};
ABCJS.write.AbsoluteElement.prototype.addHead = function(a) {
    if (a.dx < this.extraw) {
        this.extraw = a.dx
    }
    this.heads[this.heads.length] = a;
    this.addRight(a)
};
ABCJS.write.AbsoluteElement.prototype.addRight = function(a) {
    if (a.dx + a.w > this.w) {
        this.w = a.dx + a.w
    }
    this.right[this.right.length] = a;
    this.addChild(a)
};
ABCJS.write.AbsoluteElement.prototype.setLimit = function(b, a) {
    if (!a[b]) {
        return
    }
    if (!this.specialY[b]) {
        this.specialY[b] = a[b]
    } else {
        this.specialY[b] = Math.max(this.specialY[b], a[b])
    }
};
ABCJS.write.AbsoluteElement.prototype.addChild = function(a) {
    a.parent = this;
    this.children[this.children.length] = a;
    this.pushTop(a.top);
    this.pushBottom(a.bottom);
    this.setLimit("tempoHeightAbove", a);
    this.setLimit("partHeightAbove", a);
    this.setLimit("volumeHeightAbove", a);
    this.setLimit("dynamicHeightAbove", a);
    this.setLimit("endingHeightAbove", a);
    this.setLimit("chordHeightAbove", a);
    this.setLimit("lyricHeightAbove", a);
    this.setLimit("lyricHeightBelow", a);
    this.setLimit("chordHeightBelow", a);
    this.setLimit("volumeHeightBelow", a);
    this.setLimit("dynamicHeightBelow", a)
};
ABCJS.write.AbsoluteElement.prototype.pushTop = function(a) {
    if (a !== undefined) {
        if (this.top === undefined) {
            this.top = a
        } else {
            this.top = Math.max(a, this.top)
        }
    }
};
ABCJS.write.AbsoluteElement.prototype.pushBottom = function(a) {
    if (a !== undefined) {
        if (this.bottom === undefined) {
            this.bottom = a
        } else {
            this.bottom = Math.min(a, this.bottom)
        }
    }
};
ABCJS.write.AbsoluteElement.prototype.setX = function(a) {
    this.x = a;
    for (var b = 0; b < this.children.length; b++) {
        this.children[b].setX(a)
    }
};
ABCJS.write.AbsoluteElement.prototype.draw = function(j, h) {
    this.elemset = j.paper.set();
    if (this.invisible) {
        return
    }
    j.beginGroup();
    for (var e = 0; e < this.children.length; e++) {
        if (ABCJS.write.debugPlacement) {
            if (this.children[e].klass === "ornament") {
                j.printShadedBox(this.x, j.calcY(this.children[e].top), this.w, j.calcY(this.children[e].bottom) - j.calcY(this.children[e].top), "rgba(0,0,200,0.3)")
            }
        }
        this.elemset.push(this.children[e].draw(j, h))
    }
    this.elemset.push(j.endGroup(this.type));
    if (this.klass) {
        this.setClass("mark", "", "#00ff00")
    }
    var c = ABCJS.write.debugPlacement ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0)";
    var g = j.printShadedBox(this.x, j.calcY(this.top), this.w, j.calcY(this.bottom) - j.calcY(this.top), c);
    var l = this;
    var f = j.controller;
    g.mouseup(function() {
        f.notifySelect(l)
    });
    this.abcelem.abselem = this;
    var k = ABCJS.write.spacing.STEP;
    var a = function() {
            this.dy = 0
        },
        b = function(m, i) {
            i = Math.round(i / k) * k;
            this.translate(0, -this.dy);
            this.dy = i;
            this.translate(0, this.dy)
        },
        d = function() {
            if (l.abcelem.pitches) {
                var i = -Math.round(this.dy / k);
                l.abcelem.pitches[0].pitch += i;
                l.abcelem.pitches[0].verticalPos += i;
                f.notifyChange()
            }
        };
    if (this.abcelem.el_type === "note" && f.editable) {
        this.elemset.drag(b, a, d)
    }
};
ABCJS.write.AbsoluteElement.prototype.isIE =
    /*@cc_on!@*/
    false;
ABCJS.write.AbsoluteElement.prototype.setClass = function(d, e, b) {
    if (b !== null) {
        this.elemset.attr({
            fill: b
        })
    }
    if (!this.isIE) {
        for (var c = 0; c < this.elemset.length; c++) {
            if (this.elemset[c][0].setAttribute) {
                var a = this.elemset[c][0].getAttribute("class");
                if (!a) {
                    a = ""
                }
                a = a.replace(e, "");
                a = a.replace(d, "");
                if (d.length > 0) {
                    if (a.length > 0 && a.charAt(a.length - 1) !== " ") {
                        a += " "
                    }
                    a += d
                }
                this.elemset[c][0].setAttribute("class", a)
            }
        }
    }
};
ABCJS.write.AbsoluteElement.prototype.highlight = function(a, b) {
    if (a === undefined) {
        a = "note_selected"
    }
    if (b === undefined) {
        b = "#ff0000"
    }
    this.setClass(a, "", b)
};
ABCJS.write.AbsoluteElement.prototype.unhighlight = function(a, b) {
    if (a === undefined) {
        a = "note_selected"
    }
    if (b === undefined) {
        b = "#000000"
    }
    this.setClass("", a, b)
};
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.write) {
    window.ABCJS.write = {}
}(function() {
    ABCJS.write.getDuration = function(a) {
        var b = 0;
        if (a.duration) {
            b = a.duration
        }
        return b
    };
    ABCJS.write.getDurlog = function(a) {
        if (a === undefined) {
            return 0
        }
        return Math.floor(Math.log(a) / Math.log(2))
    };
    ABCJS.write.AbstractEngraver = function(a, b) {
        this.decoration = new ABCJS.write.Decoration();
        this.renderer = b;
        this.isBagpipes = a;
        this.chartable = {
            rest: {
                0: "rests.whole",
                1: "rests.half",
                2: "rests.quarter",
                3: "rests.8th",
                4: "rests.16th",
                5: "rests.32nd",
                6: "rests.64th",
                7: "rests.128th"
            },
            note: {
                "-1": "noteheads.dbl",
                0: "noteheads.whole",
                1: "noteheads.half",
                2: "noteheads.quarter",
                3: "noteheads.quarter",
                4: "noteheads.quarter",
                5: "noteheads.quarter",
                6: "noteheads.quarter",
                7: "noteheads.quarter",
                nostem: "noteheads.quarter"
            },
            rhythm: {
                "-1": "noteheads.slash.whole",
                0: "noteheads.slash.whole",
                1: "noteheads.slash.whole",
                2: "noteheads.slash.quarter",
                3: "noteheads.slash.quarter",
                4: "noteheads.slash.quarter",
                5: "noteheads.slash.quarter",
                6: "noteheads.slash.quarter",
                7: "noteheads.slash.quarter",
                nostem: "noteheads.slash.nostem"
            },
            x: {
                "-1": "noteheads.indeterminate",
                0: "noteheads.indeterminate",
                1: "noteheads.indeterminate",
                2: "noteheads.indeterminate",
                3: "noteheads.indeterminate",
                4: "noteheads.indeterminate",
                5: "noteheads.indeterminate",
                6: "noteheads.indeterminate",
                7: "noteheads.indeterminate",
                nostem: "noteheads.indeterminate"
            },
            harmonic: {
                "-1": "noteheads.harmonic.quarter",
                0: "noteheads.harmonic.quarter",
                1: "noteheads.harmonic.quarter",
                2: "noteheads.harmonic.quarter",
                3: "noteheads.harmonic.quarter",
                4: "noteheads.harmonic.quarter",
                5: "noteheads.harmonic.quarter",
                6: "noteheads.harmonic.quarter",
                7: "noteheads.harmonic.quarter",
                nostem: "noteheads.harmonic.quarter"
            },
            uflags: {
                3: "flags.u8th",
                4: "flags.u16th",
                5: "flags.u32nd",
                6: "flags.u64th"
            },
            dflags: {
                3: "flags.d8th",
                4: "flags.d16th",
                5: "flags.d32nd",
                6: "flags.d64th"
            }
        };
        this.reset()
    };
    ABCJS.write.AbstractEngraver.prototype.reset = function() {
        this.slurs = {};
        this.ties = [];
        this.slursbyvoice = {};
        this.tiesbyvoice = {};
        this.endingsbyvoice = {};
        this.s = 0;
        this.v = 0;
        this.tripletmultiplier = 1;
        this.abcline = undefined;
        this.accidentalSlot = undefined;
        this.accidentalshiftx = undefined;
        this.dotshiftx = undefined;
        this.hasVocals = false;
        this.minY = undefined;
        this.partstartelem = undefined;
        this.pos = undefined;
        this.roomtaken = undefined;
        this.roomtakenright = undefined;
        this.staffgroup = undefined;
        this.startlimitelem = undefined;
        this.stemdir = undefined;
        this.voice = undefined
    };
    ABCJS.write.AbstractEngraver.prototype.setStemHeight = function(a) {
        this.stemHeight = a / ABCJS.write.spacing.STEP
    };
    ABCJS.write.AbstractEngraver.prototype.getCurrentVoiceId = function() {
        return "s" + this.s + "v" + this.v
    };
    ABCJS.write.AbstractEngraver.prototype.pushCrossLineElems = function() {
        this.slursbyvoice[this.getCurrentVoiceId()] = this.slurs;
        this.tiesbyvoice[this.getCurrentVoiceId()] = this.ties;
        this.endingsbyvoice[this.getCurrentVoiceId()] = this.partstartelem
    };
    ABCJS.write.AbstractEngraver.prototype.popCrossLineElems = function() {
        this.slurs = this.slursbyvoice[this.getCurrentVoiceId()] || {};
        this.ties = this.tiesbyvoice[this.getCurrentVoiceId()] || [];
        this.partstartelem = this.endingsbyvoice[this.getCurrentVoiceId()]
    };
    ABCJS.write.AbstractEngraver.prototype.getElem = function() {
        if (this.abcline.length <= this.pos) {
            return null
        }
        return this.abcline[this.pos]
    };
    ABCJS.write.AbstractEngraver.prototype.getNextElem = function() {
        if (this.abcline.length <= this.pos + 1) {
            return null
        }
        return this.abcline[this.pos + 1]
    };
    ABCJS.write.AbstractEngraver.prototype.containsLyrics = function(e) {
        for (var c = 0; c < e.length; c++) {
            for (var b = 0; b < e[c].voices.length; b++) {
                for (var a = 0; a < e[c].voices[b].length; a++) {
                    var d = e[c].voices[b][a];
                    if (d.lyric) {
                        if (!d.positioning || d.positioning.vocalPosition === "below") {
                            this.hasVocals = true
                        }
                        return
                    }
                }
            }
        }
    };
    ABCJS.write.AbstractEngraver.prototype.createABCLine = function(b, a) {
        this.minY = 2;
        this.containsLyrics(b);
        this.staffgroup = new ABCJS.write.StaffGroupElement();
        this.tempoSet = false;
        for (this.s = 0; this.s < b.length; this.s++) {
            this.createABCStaff(b[this.s], a)
        }
        return this.staffgroup
    };
    ABCJS.write.AbstractEngraver.prototype.createABCStaff = function(b, c) {
        for (this.v = 0; this.v < b.voices.length; this.v++) {
            this.voice = new ABCJS.write.VoiceElement(this.v, b.voices.length);
            if (this.v === 0) {
                this.voice.barfrom = (b.connectBarLines === "start" || b.connectBarLines === "continue");
                this.voice.barto = (b.connectBarLines === "continue" || b.connectBarLines === "end")
            } else {
                this.voice.duplicate = true
            }
            if (b.title && b.title[this.v]) {
                this.voice.header = b.title[this.v]
            }
            var e = ABCJS.write.createClef(b.clef);
            if (e) {
                this.voice.addChild(e)
            }
            var a = ABCJS.write.createKeySignature(b.key);
            if (a) {
                this.voice.addChild(a);
                this.startlimitelem = a
            }
            if (b.meter) {
                var d = ABCJS.write.createTimeSignature(b.meter);
                this.voice.addChild(d);
                this.startlimitelem = d
            }
            if (this.voice.duplicate) {
                this.voice.children = []
            }
            var f = b.clef.stafflines || b.clef.stafflines === 0 ? b.clef.stafflines : 5;
            this.staffgroup.addVoice(this.voice, this.s, f);
            this.createABCVoice(b.voices[this.v], c);
            this.staffgroup.setStaffLimits(this.voice)
        }
    };
    ABCJS.write.AbstractEngraver.prototype.createABCVoice = function(c, b) {
        this.popCrossLineElems();
        this.stemdir = (this.isBagpipes) ? "down" : null;
        this.abcline = c;
        if (this.partstartelem) {
            this.partstartelem = new ABCJS.write.EndingElem("", null, null);
            this.voice.addOther(this.partstartelem)
        }
        for (var a in this.slurs) {
            if (this.slurs.hasOwnProperty(a)) {
                this.slurs[a] = new ABCJS.write.TieElem(null, null, this.slurs[a].above, this.slurs[a].force, false);
                this.voice.addOther(this.slurs[a])
            }
        }
        for (var d = 0; d < this.ties.length; d++) {
            this.ties[d] = new ABCJS.write.TieElem(null, null, this.ties[d].above, this.ties[d].force, true);
            this.voice.addOther(this.ties[d])
        }
        for (this.pos = 0; this.pos < this.abcline.length; this.pos++) {
            var e = this.createABCElement();
            if (e) {
                for (d = 0; d < e.length; d++) {
                    if (!this.tempoSet && b && !b.suppress) {
                        this.tempoSet = true;
                        e[d].addChild(new ABCJS.write.TempoElement(b))
                    }
                    this.voice.addChild(e[d])
                }
            }
        }
        this.pushCrossLineElems()
    };
    ABCJS.write.AbstractEngraver.prototype.createABCElement = function() {
        var f = [];
        var d = this.getElem();
        switch (d.el_type) {
            case "note":
                f = this.createBeam();
                break;
            case "bar":
                f[0] = this.createBarLine(d);
                if (this.voice.duplicate) {
                    f[0].invisible = true
                }
                break;
            case "meter":
                f[0] = ABCJS.write.createTimeSignature(d);
                this.startlimitelem = f[0];
                if (this.voice.duplicate) {
                    f[0].invisible = true
                }
                break;
            case "clef":
                f[0] = ABCJS.write.createClef(d);
                if (!f[0]) {
                    return null
                }
                if (this.voice.duplicate) {
                    f[0].invisible = true
                }
                break;
            case "key":
                var b = ABCJS.write.createKeySignature(d);
                if (b) {
                    f[0] = b;
                    this.startlimitelem = f[0]
                }
                if (this.voice.duplicate) {
                    f[0].invisible = true
                }
                break;
            case "stem":
                this.stemdir = d.direction;
                break;
            case "part":
                var a = new ABCJS.write.AbsoluteElement(d, 0, 0, "part");
                a.addChild(new ABCJS.write.RelativeElement(d.title, 0, 0, undefined, {
                    type: "part"
                }));
                f[0] = a;
                break;
            case "tempo":
                var c = new ABCJS.write.AbsoluteElement(d, 0, 0, "tempo");
                c.addChild(new ABCJS.write.TempoElement(d));
                f[0] = c;
                break;
            case "style":
                if (d.head === "normal") {
                    delete this.style
                } else {
                    this.style = d.head
                }
                break;
            default:
                var e = new ABCJS.write.AbsoluteElement(d, 0, 0, "unsupported");
                e.addChild(new ABCJS.write.RelativeElement("element type " + d.el_type, 0, 0, undefined, {
                    type: "debug"
                }));
                f[0] = e
        }
        return f
    };
    ABCJS.write.AbstractEngraver.prototype.calcBeamDir = function() {
        if (this.stemdir) {
            return this.stemdir
        }
        var d = new ABCJS.write.BeamElem(this.stemHeight, this.stemdir);
        var b = this.pos;
        var c;
        while (this.getElem()) {
            c = this.createNote(this.getElem(), true, true);
            d.add(c);
            if (this.getElem().endBeam) {
                break
            }
            this.pos++
        }
        var a = d.calcDir();
        this.pos = b;
        return a ? "up" : "down"
    };
    ABCJS.write.AbstractEngraver.prototype.createBeam = function() {
        var d = [];
        if (this.getElem().startBeam && !this.getElem().endBeam) {
            var a = this.calcBeamDir();
            var e = new ABCJS.write.BeamElem(this.stemHeight, a);
            var c = this.stemdir;
            this.stemdir = a;
            while (this.getElem()) {
                var b = this.createNote(this.getElem(), true);
                d.push(b);
                e.add(b);
                if (this.getElem().endBeam) {
                    break
                }
                this.pos++
            }
            this.stemdir = c;
            this.voice.addOther(e)
        } else {
            d[0] = this.createNote(this.getElem())
        }
        return d
    };
    ABCJS.write.sortPitch = function(c) {
        var a;
        do {
            a = true;
            for (var d = 0; d < c.pitches.length - 1; d++) {
                if (c.pitches[d].pitch > c.pitches[d + 1].pitch) {
                    a = false;
                    var b = c.pitches[d];
                    c.pitches[d] = c.pitches[d + 1];
                    c.pitches[d + 1] = b
                }
            }
        } while (!a)
    };
    ABCJS.write.AbstractEngraver.prototype.createNote = function(T, d, ab) {
        var s = null;
        var a = null;
        this.roomtaken = 0;
        this.roomtakenright = 0;
        var I = 0;
        var ad = "";
        var G = null;
        var t = [];
        var P, X, n;
        var b, aa, Z, f;
        var v = ABCJS.write.getDuration(T);
        var O = false;
        if (v === 0) {
            O = true;
            v = 0.25;
            d = true
        }
        var C = Math.floor(Math.log(v) / Math.log(2));
        var af = 0;
        for (var g = Math.pow(2, C), Y = g / 2; g < v; af++, g += Y, Y /= 2) {}
        if (T.startTriplet) {
            if (T.startTriplet === 2) {
                this.tripletmultiplier = 3 / 2
            } else {
                this.tripletmultiplier = (T.startTriplet - 1) / T.startTriplet
            }
        }
        var h = new ABCJS.write.AbsoluteElement(T, v * this.tripletmultiplier, 1, "note");
        if (T.rest) {
            var m = 7;
            if (this.stemdir === "down") {
                m = 3
            }
            if (this.stemdir === "up") {
                m = 11
            }
            var B = this.staffgroup.staffs[this.staffgroup.staffs.length - 1].lines;
            if (B === 1) {
                if (v < 0.5) {
                    m = 7
                } else {
                    if (v < 1) {
                        m = 6.8
                    } else {
                        m = 4.8
                    }
                }
            }
            switch (T.rest.type) {
                case "whole":
                    ad = this.chartable.rest[0];
                    T.averagepitch = m;
                    T.minpitch = m;
                    T.maxpitch = m;
                    af = 0;
                    break;
                case "rest":
                    ad = this.chartable.rest[-C];
                    T.averagepitch = m;
                    T.minpitch = m;
                    T.maxpitch = m;
                    break;
                case "invisible":
                case "spacer":
                    ad = "";
                    T.averagepitch = m;
                    T.minpitch = m;
                    T.maxpitch = m
            }
            if (!ab) {
                s = this.createNoteHead(h, ad, {
                    verticalPos: m
                }, null, 0, -this.roomtaken, null, af, 0, 1)
            }
            if (s) {
                h.addHead(s)
            }
            this.roomtaken += this.accidentalshiftx;
            this.roomtakenright = Math.max(this.roomtakenright, this.dotshiftx)
        } else {
            ABCJS.write.sortPitch(T);
            var q = 0;
            for (P = 0, n = T.pitches.length; P < n; P++) {
                q += T.pitches[P].verticalPos
            }
            T.averagepitch = q / T.pitches.length;
            T.minpitch = T.pitches[0].verticalPos;
            this.minY = Math.min(T.minpitch, this.minY);
            T.maxpitch = T.pitches[T.pitches.length - 1].verticalPos;
            var ae = (T.averagepitch >= 6) ? "down" : "up";
            if (this.stemdir) {
                ae = this.stemdir
            }
            var Q = T.style ? T.style : this.style;
            if (!Q || Q === "normal") {
                Q = "note"
            }
            var j;
            if (O) {
                j = this.chartable[Q].nostem
            } else {
                j = this.chartable[Q][-C]
            }
            if (!j) {
                console.log("noteSymbol:", Q, C, O)
            }
            for (P = (ae === "down") ? T.pitches.length - 2 : 1;
                (ae === "down") ? P >= 0 : P < T.pitches.length; P = (ae === "down") ? P - 1 : P + 1) {
                var D = T.pitches[(ae === "down") ? P + 1 : P - 1];
                var J = T.pitches[P];
                var K = (ae === "down") ? D.pitch - J.pitch : J.pitch - D.pitch;
                if (K <= 1 && !D.printer_shift) {
                    J.printer_shift = (K) ? "different" : "same";
                    if (J.verticalPos > 11 || J.verticalPos < 1) {
                        t.push(J.verticalPos - (J.verticalPos % 2))
                    }
                    if (ae === "down") {
                        this.roomtaken = ABCJS.write.glyphs.getSymbolWidth(j) + 2
                    } else {
                        I = ABCJS.write.glyphs.getSymbolWidth(j) + 2
                    }
                }
            }
            this.accidentalSlot = [];
            for (P = 0; P < T.pitches.length; P++) {
                if (!d) {
                    if ((ae === "down" && P !== 0) || (ae === "up" && P !== n - 1)) {
                        G = null
                    } else {
                        G = this.chartable[(ae === "down") ? "dflags" : "uflags"][-C]
                    }
                }
                ad = j;
                T.pitches[P].highestVert = T.pitches[P].verticalPos;
                var l = (this.stemdir === "up" || ae === "up") && P === 0;
                var R = (this.stemdir === "down" || ae === "down") && P === n - 1;
                if (!ab && (l || R)) {
                    if (T.startSlur || n === 1) {
                        T.pitches[P].highestVert = T.pitches[n - 1].verticalPos;
                        if (this.stemdir === "up" || ae === "up") {
                            T.pitches[P].highestVert += 6
                        }
                    }
                    if (T.startSlur) {
                        if (!T.pitches[P].startSlur) {
                            T.pitches[P].startSlur = []
                        }
                        for (X = 0; X < T.startSlur.length; X++) {
                            T.pitches[P].startSlur.push(T.startSlur[X])
                        }
                    }
                    if (!ab && T.endSlur) {
                        T.pitches[P].highestVert = T.pitches[n - 1].verticalPos;
                        if (this.stemdir === "up" || ae === "up") {
                            T.pitches[P].highestVert += 6
                        }
                        if (!T.pitches[P].endSlur) {
                            T.pitches[P].endSlur = []
                        }
                        for (X = 0; X < T.endSlur.length; X++) {
                            T.pitches[P].endSlur.push(T.endSlur[X])
                        }
                    }
                }
                var r = !d && C <= -1;
                if (!ab) {
                    s = this.createNoteHead(h, ad, T.pitches[P], r ? ae : null, 0, -this.roomtaken, G, af, I, 1)
                }
                if (s) {
                    h.addHead(s)
                }
                this.roomtaken += this.accidentalshiftx;
                this.roomtakenright = Math.max(this.roomtakenright, this.dotshiftx)
            }
            if (r) {
                aa = (ae === "down") ? T.minpitch - 7 : T.minpitch + 1 / 3;
                if (aa > 6 && !this.stemdir) {
                    aa = 6
                }
                Z = (ae === "down") ? T.maxpitch - 1 / 3 : T.maxpitch + 7;
                if (Z < 6 && !this.stemdir) {
                    Z = 6
                }
                f = (ae === "down" || h.heads.length === 0) ? 0 : h.heads[0].w;
                b = (ae === "down") ? 1 : -1;
                if (s.c === "noteheads.slash.quarter") {
                    if (ae === "down") {
                        Z -= 1
                    } else {
                        aa += 1
                    }
                }
                h.addExtra(new ABCJS.write.RelativeElement(null, f, 0, aa, {
                    type: "stem",
                    pitch2: Z,
                    linewidth: b
                }));
                this.minY = Math.min(aa, this.minY);
                this.minY = Math.min(Z, this.minY)
            }
        }
        if (T.lyric !== undefined) {
            var S = "";
            window.ABCJS.parse.each(T.lyric, function(c) {
                S += c.syllable + c.divider + "\n"
            });
            var N = T.positioning ? T.positioning.vocalPosition : "below";
            h.addRight(new ABCJS.write.RelativeElement(S, 0, S.length * 5, undefined, {
                type: "lyric",
                position: N
            }))
        }
        if (!ab && T.gracenotes !== undefined) {
            var A = 3 / 5;
            var u = 3.5 / 5;
            var k = null;
            if (T.gracenotes.length > 1) {
                k = new ABCJS.write.BeamElem(this.stemHeight * u, "grace", this.isBagpipes);
                k.mainNote = h
            }
            var ac = [];
            for (X = T.gracenotes.length - 1; X >= 0; X--) {
                this.roomtaken += 10;
                ac[X] = this.roomtaken;
                if (T.gracenotes[X].accidental) {
                    this.roomtaken += 7
                }
            }
            for (X = 0; X < T.gracenotes.length; X++) {
                var w = T.gracenotes[X].verticalPos;
                G = (k) ? null : this.chartable.uflags[(this.isBagpipes) ? 5 : 3];
                a = this.createNoteHead(h, "noteheads.quarter", T.gracenotes[X], "up", -ac[X], -ac[X], G, 0, 0, A);
                h.addExtra(a);
                if (T.gracenotes[X].acciaccatura) {
                    var E = T.gracenotes[X].verticalPos + 7 * A;
                    var V = k ? 5 : 6;
                    h.addRight(new ABCJS.write.RelativeElement("flags.ugrace", -ac[X] + V, 0, E, {
                        scalex: A,
                        scaley: A
                    }))
                }
                if (k) {
                    var z = T.gracenotes[X].duration / 2;
                    if (this.isBagpipes) {
                        z /= 2
                    }
                    var o = {
                        heads: [a],
                        abcelem: {
                            averagepitch: w,
                            minpitch: w,
                            maxpitch: w,
                            duration: z
                        }
                    };
                    k.add(o)
                } else {
                    aa = w + 1 / 3 * A;
                    Z = w + 7 * A;
                    f = a.dx + a.w;
                    b = -0.6;
                    h.addExtra(new ABCJS.write.RelativeElement(null, f, 0, aa, {
                        type: "stem",
                        pitch2: Z,
                        linewidth: b
                    }))
                }
                if (X === 0 && !this.isBagpipes && !(T.rest && (T.rest.type === "spacer" || T.rest.type === "invisible"))) {
                    this.voice.addOther(new ABCJS.write.TieElem(a, s, false, true, false))
                }
            }
            if (k) {
                this.voice.addOther(k)
            }
        }
        if (!ab && T.decoration) {
            this.decoration.createDecoration(this.voice, T.decoration, h.top, (s) ? s.w : 0, h, this.roomtaken, ae, h.bottom, T.positioning, this.hasVocals)
        }
        if (T.barNumber) {
            h.addChild(new ABCJS.write.RelativeElement(T.barNumber, -10, 0, 0, {
                type: "barNumber"
            }))
        }
        for (X = T.maxpitch; X > 11; X--) {
            if (X % 2 === 0 && !T.rest) {
                h.addChild(new ABCJS.write.RelativeElement(null, -2, ABCJS.write.glyphs.getSymbolWidth(ad) + 4, X, {
                    type: "ledger"
                }))
            }
        }
        for (X = T.minpitch; X < 1; X++) {
            if (X % 2 === 0 && !T.rest) {
                h.addChild(new ABCJS.write.RelativeElement(null, -2, ABCJS.write.glyphs.getSymbolWidth(ad) + 4, X, {
                    type: "ledger"
                }))
            }
        }
        for (X = 0; X < t.length; X++) {
            var H = ABCJS.write.glyphs.getSymbolWidth(ad);
            if (ae === "down") {
                H = -H
            }
            h.addChild(new ABCJS.write.RelativeElement(null, H - 2, ABCJS.write.glyphs.getSymbolWidth(ad) + 4, t[X], {
                type: "ledger"
            }))
        }
        if (T.chord !== undefined) {
            for (X = 0; X < T.chord.length; X++) {
                var M = 0;
                var L;
                switch (T.chord[X].position) {
                    case "left":
                        this.roomtaken += 7;
                        M = -this.roomtaken;
                        L = T.averagepitch;
                        h.addExtra(new ABCJS.write.RelativeElement(T.chord[X].name, M, ABCJS.write.glyphs.getSymbolWidth(T.chord[X].name[0]) + 4, L, {
                            type: "text"
                        }));
                        break;
                    case "right":
                        this.roomtakenright += 4;
                        M = this.roomtakenright;
                        L = T.averagepitch;
                        h.addRight(new ABCJS.write.RelativeElement(T.chord[X].name, M, ABCJS.write.glyphs.getSymbolWidth(T.chord[X].name[0]) + 4, L, {
                            type: "text"
                        }));
                        break;
                    case "below":
                        var U = T.chord[X].name.split("\n");
                        for (var F = 0; F < U.length; F++) {
                            h.addChild(new ABCJS.write.RelativeElement(U[F], M, 0, undefined, {
                                type: "text",
                                position: "below"
                            }))
                        }
                        break;
                    case "above":
                        h.addChild(new ABCJS.write.RelativeElement(T.chord[X].name, M, 0, undefined, {
                            type: "text"
                        }));
                        break;
                    default:
                        if (T.chord[X].rel_position) {
                            var W = T.chord[X].rel_position.y + 3 * ABCJS.write.spacing.STEP;
                            h.addChild(new ABCJS.write.RelativeElement(T.chord[X].name, M + T.chord[X].rel_position.x, 0, T.minpitch + W / ABCJS.write.spacing.STEP, {
                                type: "text"
                            }))
                        } else {
                            var e = "above";
                            if (T.positioning && T.positioning.chordPosition) {
                                e = T.positioning.chordPosition
                            }
                            h.addChild(new ABCJS.write.RelativeElement(T.chord[X].name, M, 0, undefined, {
                                type: "chord",
                                position: e
                            }))
                        }
                }
            }
        }
        if (T.startTriplet) {
            this.triplet = new ABCJS.write.TripletElem(T.startTriplet, s, null, true);
            if (!ab) {
                this.voice.addOther(this.triplet)
            }
        }
        if (T.endTriplet && this.triplet) {
            this.triplet.setCloseAnchor(s);
            this.triplet = null;
            this.tripletmultiplier = 1
        }
        return h
    };
    ABCJS.write.AbstractEngraver.prototype.createNoteHead = function(m, A, B, p, h, e, v, q, y, C) {
        var k = B.verticalPos;
        var d;
        var w;
        this.accidentalshiftx = 0;
        this.dotshiftx = 0;
        if (A === undefined) {
            m.addChild(new ABCJS.write.RelativeElement("pitch is undefined", 0, 0, 0, {
                type: "debug"
            }))
        } else {
            if (A === "") {
                d = new ABCJS.write.RelativeElement(null, 0, 0, k)
            } else {
                var o = h;
                if (B.printer_shift) {
                    var s = (B.printer_shift === "same") ? 1 : 0;
                    o = (p === "down") ? -ABCJS.write.glyphs.getSymbolWidth(A) * C + s : ABCJS.write.glyphs.getSymbolWidth(A) * C - s
                }
                var n = {
                    scalex: C,
                    scaley: C,
                    thickness: ABCJS.write.glyphs.symbolHeightInPitches(A) * C
                };
                d = new ABCJS.write.RelativeElement(A, o, ABCJS.write.glyphs.getSymbolWidth(A) * C, k, n);
                if (v) {
                    var g = k + ((p === "down") ? -7 : 7) * C;
                    if (C === 1 && (p === "down") ? (g > 6) : (g < 6)) {
                        g = 6
                    }
                    var r = (p === "down") ? h : h + d.w - 0.6;
                    m.addRight(new ABCJS.write.RelativeElement(v, r, ABCJS.write.glyphs.getSymbolWidth(v) * C, g, {
                        scalex: C,
                        scaley: C
                    }))
                }
                this.dotshiftx = d.w + y - 2 + 5 * q;
                for (; q > 0; q--) {
                    var a = (1 - Math.abs(k) % 2);
                    m.addRight(new ABCJS.write.RelativeElement("dots.dot", d.w + y - 2 + 5 * q, ABCJS.write.glyphs.getSymbolWidth("dots.dot"), k + a))
                }
            }
        }
        if (d) {
            d.highestVert = B.highestVert
        }
        if (B.accidental) {
            var b;
            switch (B.accidental) {
                case "quartersharp":
                    b = "accidentals.halfsharp";
                    break;
                case "dblsharp":
                    b = "accidentals.dblsharp";
                    break;
                case "sharp":
                    b = "accidentals.sharp";
                    break;
                case "quarterflat":
                    b = "accidentals.halfflat";
                    break;
                case "flat":
                    b = "accidentals.flat";
                    break;
                case "dblflat":
                    b = "accidentals.dblflat";
                    break;
                case "natural":
                    b = "accidentals.nat"
            }
            var l = false;
            var x = e;
            for (var t = 0; t < this.accidentalSlot.length; t++) {
                if (k - this.accidentalSlot[t][0] >= 6) {
                    this.accidentalSlot[t][0] = k;
                    x = this.accidentalSlot[t][1];
                    l = true;
                    break
                }
            }
            if (l === false) {
                x -= (ABCJS.write.glyphs.getSymbolWidth(b) * C + 2);
                this.accidentalSlot.push([k, x]);
                this.accidentalshiftx = (ABCJS.write.glyphs.getSymbolWidth(b) * C + 2)
            }
            m.addExtra(new ABCJS.write.RelativeElement(b, x, ABCJS.write.glyphs.getSymbolWidth(b), k, {
                scalex: C,
                scaley: C
            }))
        }
        if (B.endTie) {
            if (this.ties[0]) {
                this.ties[0].setEndAnchor(d);
                this.ties = this.ties.slice(1, this.ties.length)
            }
        }
        if (B.startTie) {
            var u = new ABCJS.write.TieElem(d, null, (this.stemdir === "down" || p === "down") && this.stemdir !== "up", (this.stemdir === "down" || this.stemdir === "up"), true);
            this.ties[this.ties.length] = u;
            this.voice.addOther(u);
            m.startTie = true
        }
        if (B.endSlur) {
            for (w = 0; w < B.endSlur.length; w++) {
                var z = B.endSlur[w];
                var f;
                if (this.slurs[z]) {
                    f = this.slurs[z];
                    f.setEndAnchor(d);
                    delete this.slurs[z]
                } else {
                    f = new ABCJS.write.TieElem(null, d, p === "down", (this.stemdir === "up" || p === "down") && this.stemdir !== "down", false);
                    this.voice.addOther(f)
                }
                if (this.startlimitelem) {
                    f.setStartX(this.startlimitelem)
                }
            }
        }
        if (B.startSlur) {
            for (w = 0; w < B.startSlur.length; w++) {
                var z = B.startSlur[w].label;
                var f = new ABCJS.write.TieElem(d, null, (this.stemdir === "down" || p === "down") && this.stemdir !== "up", false, false);
                this.slurs[z] = f;
                this.voice.addOther(f)
            }
        }
        return d
    };
    ABCJS.write.AbstractEngraver.prototype.createBarLine = function(c) {
        var j = new ABCJS.write.AbsoluteElement(c, 0, 10, "bar");
        var d = null;
        var k = 0;
        var a = (c.type === "bar_right_repeat" || c.type === "bar_dbl_repeat");
        var e = (c.type !== "bar_left_repeat" && c.type !== "bar_thick_thin" && c.type !== "bar_invisible");
        var f = (c.type === "bar_right_repeat" || c.type === "bar_dbl_repeat" || c.type === "bar_left_repeat" || c.type === "bar_thin_thick" || c.type === "bar_thick_thin");
        var g = (c.type === "bar_left_repeat" || c.type === "bar_thick_thin" || c.type === "bar_thin_thin" || c.type === "bar_dbl_repeat");
        var b = (c.type === "bar_left_repeat" || c.type === "bar_dbl_repeat");
        if (a || b) {
            for (var i in this.slurs) {
                if (this.slurs.hasOwnProperty(i)) {
                    this.slurs[i].setEndX(j)
                }
            }
            this.startlimitelem = j
        }
        if (a) {
            j.addRight(new ABCJS.write.RelativeElement("dots.dot", k, 1, 7));
            j.addRight(new ABCJS.write.RelativeElement("dots.dot", k, 1, 5));
            k += 6
        }
        if (e) {
            d = new ABCJS.write.RelativeElement(null, k, 1, 2, {
                type: "bar",
                pitch2: 10,
                linewidth: 0.6
            });
            j.addRight(d)
        }
        if (c.type === "bar_invisible") {
            d = new ABCJS.write.RelativeElement(null, k, 1, 2, {
                type: "none",
                pitch2: 10,
                linewidth: 0.6
            });
            j.addRight(d)
        }
        if (c.decoration) {
            this.decoration.createDecoration(this.voice, c.decoration, 12, (f) ? 3 : 1, j, 0, "down", 2, c.positioning, this.hasVocals)
        }
        if (f) {
            k += 4;
            d = new ABCJS.write.RelativeElement(null, k, 4, 2, {
                type: "bar",
                pitch2: 10,
                linewidth: 4
            });
            j.addRight(d);
            k += 5
        }
        if (this.partstartelem && c.endEnding) {
            this.partstartelem.anchor2 = d;
            this.partstartelem = null
        }
        if (g) {
            k += 3;
            d = new ABCJS.write.RelativeElement(null, k, 1, 2, {
                type: "bar",
                pitch2: 10,
                linewidth: 0.6
            });
            j.addRight(d)
        }
        if (b) {
            k += 3;
            j.addRight(new ABCJS.write.RelativeElement("dots.dot", k, 1, 7));
            j.addRight(new ABCJS.write.RelativeElement("dots.dot", k, 1, 5))
        }
        if (c.startEnding) {
            var h = this.renderer.getTextSize(c.startEnding, "repeatfont", "").width;
            j.minspacing += h + 10;
            this.partstartelem = new ABCJS.write.EndingElem(c.startEnding, d, null);
            this.voice.addOther(this.partstartelem)
        }
        return j
    }
})();
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.write) {
    window.ABCJS.write = {}
}(function() {
    ABCJS.write.BeamElem = function(l, k, m) {
        this.isflat = m;
        this.isgrace = (k && k === "grace");
        this.forceup = this.isgrace || (k && k === "up");
        this.forcedown = (k && k === "down");
        this.elems = [];
        this.total = 0;
        this.allrests = true;
        this.stemHeight = l;
        this.beams = []
    };
    ABCJS.write.BeamElem.prototype.add = function(k) {
        var l = k.abcelem.averagepitch;
        if (l === undefined) {
            return
        }
        this.allrests = this.allrests && k.abcelem.rest;
        k.beam = this;
        this.elems.push(k);
        this.total += l;
        if (!this.min || k.abcelem.minpitch < this.min) {
            this.min = k.abcelem.minpitch
        }
        if (!this.max || k.abcelem.maxpitch > this.max) {
            this.max = k.abcelem.maxpitch
        }
    };
    var c = 6;
    ABCJS.write.BeamElem.prototype.calcDir = function() {
        if (this.forceup) {
            return true
        }
        if (this.forcedown) {
            return false
        }
        var k = g(this.total, this.elems.length);
        return k < c
    };
    ABCJS.write.BeamElem.prototype.layout = function() {
        if (this.elems.length === 0 || this.allrests) {
            return
        }
        this.stemsUp = this.calcDir();
        var k = d(this.stemsUp, this.isgrace);
        var m = this.elems[0];
        var q = this.elems[this.elems.length - 1];
        var n = i(this.total, this.elems.length, this.stemHeight, this.stemsUp, m.abcelem.averagepitch, q.abcelem.averagepitch, this.isflat, this.min, this.max, this.isgrace);
        var o = a(this.stemsUp, m, q);
        this.beams.push({
            startX: o[0],
            endX: o[1],
            startY: n[0],
            endY: n[1],
            dy: k
        });
        var p = j(this.elems, this.stemsUp, this.beams[0], this.isgrace, k);
        for (var l = 0; l < p.length; l++) {
            this.beams.push(p[l])
        }
        f(this.elems, this.stemsUp, this.beams[0], k, this.mainNote)
    };
    ABCJS.write.BeamElem.prototype.isAbove = function() {
        return this.stemsUp
    };
    ABCJS.write.BeamElem.prototype.heightAtMidpoint = function(k, m) {
        if (this.beams.length === 0) {
            return 0
        }
        var l = this.beams[0];
        var n = k + (m - k) / 2;
        return b(l.startX, l.startY, l.endX, l.endY, n)
    };
    ABCJS.write.BeamElem.prototype.xAtMidpoint = function(k, l) {
        return k + (l - k) / 2
    };
    ABCJS.write.BeamElem.prototype.draw = function(m) {
        if (this.beams.length === 0) {
            return
        }
        m.beginGroup();
        for (var l = 0; l < this.beams.length; l++) {
            var k = this.beams[l];
            e(m, k.startX, k.startY, k.endX, k.endY, k.dy)
        }
        m.endGroup("beam-elem")
    };

    function h(l, o, p, k) {
        if (k) {
            return 0
        }
        var m = l - o;
        var n = p / 2;
        if (m > n) {
            m = n
        }
        if (m < -n) {
            m = -n
        }
        return m
    }

    function g(l, k) {
        if (!k) {
            return 0
        }
        return l / k
    }

    function b(m, l, o, n, k) {
        return l + (n - l) / (o - m) * (k - m)
    }

    function d(l, m) {
        var k = (l) ? ABCJS.write.spacing.STEP : -ABCJS.write.spacing.STEP;
        if (m) {
            k = k * 0.4
        }
        return k
    }

    function e(q, m, k, p, o, l) {
        k = q.calcY(k);
        o = q.calcY(o);
        var n = "M" + m + " " + k + " L" + p + " " + o + "L" + p + " " + (o + l) + " L" + m + " " + (k + l) + "z";
        q.printPath({
            path: n,
            stroke: "none",
            fill: "#000000",
            "class": q.addClasses("beam-elem")
        })
    }

    function a(p, n, q) {
        var m = n.heads[p ? 0 : n.heads.length - 1];
        var l = q.heads[p ? 0 : q.heads.length - 1];
        var k = m.x;
        if (p) {
            k += m.w - 0.6
        }
        var o = l.x;
        if (p) {
            o += l.w
        }
        return [k, o]
    }

    function i(x, o, p, y, r, n, v, l, z, s) {
        var m = g(x, o);
        var u = p - 2;
        var k = p - 2;
        var w = Math.round(y ? Math.max(m + u, z + k) : Math.min(m - u, l - k));
        var t = h(r, n, o, v);
        var q = w + Math.floor(t / 2);
        var A = w + Math.floor(-t / 2);
        if (!s) {
            if (y && w < 6) {
                q = 6;
                A = 6
            } else {
                if (!y && w > 6) {
                    q = 6;
                    A = 6
                }
            }
        }
        return [q, A]
    }

    function f(k, v, y, z, t) {
        for (var p = 0; p < k.length; p++) {
            var n = k[p];
            if (n.abcelem.rest) {
                continue
            }
            var q = n.addExtra ? false : true;
            var w = q ? t : n;
            var B = n.heads[(v) ? 0 : n.heads.length - 1];
            var m = 1 / 5;
            var l = B.pitch + ((v) ? m : -m);
            var A = v ? B.w : 0;
            var u = B.x + A;
            var s = b(y.startX, y.startY, y.endX, y.endY, u);
            var r = (v) ? -0.6 : 0.6;
            if (!v) {
                s -= (z / 2) / ABCJS.write.spacing.STEP
            }
            if (q) {
                A += n.heads[0].dx
            }
            if (B.c === "noteheads.slash.quarter") {
                if (v) {
                    l += 1
                } else {
                    l -= 1
                }
            }
            var o = new ABCJS.write.RelativeElement(null, A, 0, l, {
                type: "stem",
                pitch2: s,
                linewidth: r
            });
            o.setX(w.x);
            w.addExtra(o)
        }
    }

    function j(l, v, y, r, z) {
        var o = [];
        var w = [];
        for (var q = 0; q < l.length; q++) {
            var n = l[q];
            if (n.abcelem.rest) {
                continue
            }
            var B = n.heads[(v) ? 0 : n.heads.length - 1];
            var u = B.x + ((v) ? B.w : 0);
            var s = b(y.startX, y.startY, y.endX, y.endY, u);
            var t = (v) ? -1.5 : 1.5;
            if (r) {
                t = t * 2 / 3
            }
            for (var m = ABCJS.write.getDurlog(n.abcelem.duration); m < -3; m++) {
                if (w[-4 - m]) {
                    w[-4 - m].single = false
                } else {
                    w[-4 - m] = {
                        x: u + ((v) ? -0.6 : 0),
                        y: s + t * (-4 - m + 1),
                        durlog: m,
                        single: true
                    }
                }
            }
            for (var p = w.length - 1; p >= 0; p--) {
                if (q === l.length - 1 || ABCJS.write.getDurlog(l[q + 1].abcelem.duration) > (-p - 4)) {
                    var k = u;
                    var A = s + t * (p + 1);
                    if (w[p].single) {
                        k = (q === 0) ? u + 5 : u - 5;
                        A = b(y.startX, y.startY, y.endX, y.endY, k) + t * (p + 1)
                    }
                    o.push({
                        startX: w[p].x,
                        endX: k,
                        startY: w[p].y,
                        endY: A,
                        dy: z
                    });
                    w = w.slice(0, p)
                }
            }
        }
        return o
    }
})();
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.write) {
    window.ABCJS.write = {}
}(function() {
    ABCJS.write.createClef = function(e) {
        var f;
        var c = 0;
        var d = new ABCJS.write.AbsoluteElement(e, 0, 10, "staff-extra");
        switch (e.type) {
            case "treble":
                f = "clefs.G";
                break;
            case "tenor":
                f = "clefs.C";
                break;
            case "alto":
                f = "clefs.C";
                break;
            case "bass":
                f = "clefs.F";
                break;
            case "treble+8":
                f = "clefs.G";
                c = 1;
                break;
            case "tenor+8":
                f = "clefs.C";
                c = 1;
                break;
            case "bass+8":
                f = "clefs.F";
                c = 1;
                break;
            case "alto+8":
                f = "clefs.C";
                c = 1;
                break;
            case "treble-8":
                f = "clefs.G";
                c = -1;
                break;
            case "tenor-8":
                f = "clefs.C";
                c = -1;
                break;
            case "bass-8":
                f = "clefs.F";
                c = -1;
                break;
            case "alto-8":
                f = "clefs.C";
                c = -1;
                break;
            case "none":
                return null;
            case "perc":
                f = "clefs.perc";
                break;
            default:
                d.addChild(new ABCJS.write.RelativeElement("clef=" + e.type, 0, 0, undefined, {
                    type: "debug"
                }))
        }
        var b = 5;
        if (f) {
            d.addRight(new ABCJS.write.RelativeElement(f, b, ABCJS.write.glyphs.getSymbolWidth(f), e.clefPos));
            if (f === "clefs.G") {
                d.top = 13;
                d.bottom = -1
            } else {
                d.top = 10;
                d.bottom = 2
            }
            if (c !== 0) {
                var g = 2 / 3;
                var a = (ABCJS.write.glyphs.getSymbolWidth(f) - ABCJS.write.glyphs.getSymbolWidth("8") * g) / 2;
                d.addRight(new ABCJS.write.RelativeElement("8", b + a, ABCJS.write.glyphs.getSymbolWidth("8") * g, (c > 0) ? d.top + 3 : d.bottom - 1, {
                    scalex: g,
                    scaley: g
                }));
                d.top += 2
            }
        }
        return d
    }
})();
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.write) {
    window.ABCJS.write = {}
}(function() {
    ABCJS.write.createKeySignature = function(c) {
        if (!c.accidentals || c.accidentals.length === 0) {
            return null
        }
        var b = new ABCJS.write.AbsoluteElement(c, 0, 10, "staff-extra");
        var a = 0;
        window.ABCJS.parse.each(c.accidentals, function(e) {
            var d = (e.acc === "sharp") ? "accidentals.sharp" : (e.acc === "natural") ? "accidentals.nat" : "accidentals.flat";
            b.addRight(new ABCJS.write.RelativeElement(d, a, ABCJS.write.glyphs.getSymbolWidth(d), e.verticalPos, {
                thickness: ABCJS.write.glyphs.symbolHeightInPitches(d)
            }));
            a += ABCJS.write.glyphs.getSymbolWidth(d) + 2
        }, this);
        return b
    }
})();
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.write) {
    window.ABCJS.write = {}
}(function() {
    ABCJS.write.createTimeSignature = function(c) {
        var b = new ABCJS.write.AbsoluteElement(c, 0, 10, "staff-extra");
        if (c.type === "specified") {
            for (var a = 0; a < c.value.length; a++) {
                if (a !== 0) {
                    b.addRight(new ABCJS.write.RelativeElement("+", a * 20 - 9, ABCJS.write.glyphs.getSymbolWidth("+"), 6, {
                        thickness: ABCJS.write.glyphs.symbolHeightInPitches("+")
                    }))
                }
                if (c.value[a].den) {
                    b.addRight(new ABCJS.write.RelativeElement(c.value[a].num, a * 20, ABCJS.write.glyphs.getSymbolWidth(c.value[a].num.charAt(0)) * c.value[a].num.length, 8, {
                        thickness: ABCJS.write.glyphs.symbolHeightInPitches(c.value[a].num.charAt(0))
                    }));
                    b.addRight(new ABCJS.write.RelativeElement(c.value[a].den, a * 20, ABCJS.write.glyphs.getSymbolWidth(c.value[a].den.charAt(0)) * c.value[a].den.length, 4, {
                        thickness: ABCJS.write.glyphs.symbolHeightInPitches(c.value[a].den.charAt(0))
                    }))
                } else {
                    b.addRight(new ABCJS.write.RelativeElement(c.value[a].num, a * 20, ABCJS.write.glyphs.getSymbolWidth(c.value[a].num.charAt(0)) * c.value[a].num.length, 6, {
                        thickness: ABCJS.write.glyphs.symbolHeightInPitches(c.value[a].num.charAt(0))
                    }))
                }
            }
        } else {
            if (c.type === "common_time") {
                b.addRight(new ABCJS.write.RelativeElement("timesig.common", 0, ABCJS.write.glyphs.getSymbolWidth("timesig.common"), 6, {
                    thickness: ABCJS.write.glyphs.symbolHeightInPitches("timesig.common")
                }))
            } else {
                if (c.type === "cut_time") {
                    b.addRight(new ABCJS.write.RelativeElement("timesig.cut", 0, ABCJS.write.glyphs.getSymbolWidth("timesig.cut"), 6, {
                        thickness: ABCJS.write.glyphs.symbolHeightInPitches("timesig.cut")
                    }))
                }
            }
        }
        return b
    }
})();
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.write) {
    window.ABCJS.write = {}
}
ABCJS.write.CrescendoElem = function(c, b, a, d) {
    this.anchor1 = c;
    this.anchor2 = b;
    this.dir = a;
    if (d === "above") {
        this.dynamicHeightAbove = 4
    } else {
        this.dynamicHeightBelow = 4
    }
    this.pitch = undefined
};
ABCJS.write.CrescendoElem.prototype.setUpperAndLowerElements = function(a) {
    if (this.dynamicHeightAbove) {
        this.pitch = a.dynamicHeightAbove
    } else {
        this.pitch = a.dynamicHeightBelow
    }
};
ABCJS.write.CrescendoElem.prototype.draw = function(b) {
    if (this.pitch === undefined) {
        window.console.error("Crescendo Element y-coordinate not set.")
    }
    var c = b.calcY(this.pitch) + 4;
    var a = 8;
    if (this.dir === "<") {
        this.drawLine(b, c + a / 2, c);
        this.drawLine(b, c + a / 2, c + a)
    } else {
        this.drawLine(b, c, c + a / 2);
        this.drawLine(b, c + a, c + a / 2)
    }
};
ABCJS.write.CrescendoElem.prototype.drawLine = function(d, c, b) {
    var a = ABCJS.write.sprintf("M %f %f L %f %f", this.anchor1.x, c, this.anchor2.x, b);
    d.printPath({
        path: a,
        stroke: "#000000",
        "class": d.addClasses("decoration")
    })
};
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.write) {
    window.ABCJS.write = {}
}(function() {
    ABCJS.write.Decoration = function() {
        this.startDiminuendoX = undefined;
        this.startCrescendoX = undefined;
        this.minTop = 12;
        this.minBottom = 0
    };
    var c = function(o, q, f, g, s, t, j, e) {
        var h;
        for (var m = 0; m < q.length; m++) {
            if (q[m] === "staccato" || q[m] === "tenuto" || q[m] === "accent") {
                var k = "scripts." + q[m];
                if (q[m] === "accent") {
                    k = "scripts.sforzato"
                }
                if (h === undefined) {
                    h = (j === "down") ? f + 2 : e - 2
                } else {
                    h = (j === "down") ? h + 2 : h - 2
                }
                if (q[m] === "accent") {
                    if (j === "up") {
                        h--
                    } else {
                        h++
                    }
                } else {
                    switch (h) {
                        case 2:
                        case 4:
                        case 6:
                        case 8:
                        case 10:
                            if (j === "up") {
                                h--
                            } else {
                                h++
                            }
                            break
                    }
                }
                if (f > 9) {
                    h++
                }
                var l = g / 2;
                if (ABCJS.write.glyphs.getSymbolAlign(k) !== "center") {
                    l -= (ABCJS.write.glyphs.getSymbolWidth(k) / 2)
                }
                s.addChild(new ABCJS.write.RelativeElement(k, l, ABCJS.write.glyphs.getSymbolWidth(k), h))
            }
            if (q[m] === "slide" && s.heads[0]) {
                var n = s.heads[0].pitch;
                n -= 2;
                var r = new ABCJS.write.RelativeElement("", -t - 15, 0, n - 1);
                var p = new ABCJS.write.RelativeElement("", -t - 5, 0, n + 1);
                s.addChild(r);
                s.addChild(p);
                o.addOther(new ABCJS.write.TieElem(r, p, false, false, false))
            }
        }
        if (h === undefined) {
            h = f
        }
        return {
            above: h,
            below: s.bottom
        }
    };
    var b = function(k, e, g, j) {
        for (var f = 0; f < e.length; f++) {
            switch (e[f]) {
                case "p":
                case "mp":
                case "pp":
                case "ppp":
                case "pppp":
                case "f":
                case "ff":
                case "fff":
                case "ffff":
                case "sfz":
                case "mf":
                    var h = new ABCJS.write.DynamicDecoration(g, e[f], j);
                    k.addOther(h)
            }
        }
    };
    var a = function(l, e, f, n, g) {
        function k() {
            if (n.heads.length === 0) {
                return 10
            }
            var p = n.heads[0].pitch;
            for (var o = 1; o < n.heads.length; o++) {
                p = Math.max(p, n.heads[o].pitch)
            }
            return p
        }

        function j() {
            if (n.heads.length === 0) {
                return 2
            }
            var p = n.heads[0].pitch;
            for (var o = 1; o < n.heads.length; o++) {
                p = Math.min(p, n.heads[o].pitch)
            }
            return p
        }

        function m(s, r) {
            var q = (g === "down") ? j() + 1 : k() + 9;
            var o = f / 2;
            o += (g === "down") ? -5 : 3;
            for (var p = 0; p < r; p++) {
                q -= 1;
                n.addChild(new ABCJS.write.RelativeElement(s, o, ABCJS.write.glyphs.getSymbolWidth(s), q))
            }
        }
        for (var h = 0; h < l.length; h++) {
            switch (l[h]) {
                case "/":
                    m("flags.ugrace", 1);
                    break;
                case "//":
                    m("flags.ugrace", 2);
                    break;
                case "///":
                    m("flags.ugrace", 3);
                    break;
                case "////":
                    m("flags.ugrace", 4);
                    break
            }
        }
    };
    var d = function(n, f, q, g, p, j, e) {
        function h(t, i) {
            if (t === "above") {
                g.above += i
            } else {
                g.below -= i
            }
        }

        function o(i) {
            var t;
            if (i === "above") {
                t = g.above;
                if (t < j) {
                    t = j
                }
            } else {
                t = g.below;
                if (t > e) {
                    t = e
                }
            }
            return t
        }

        function s(v, t) {
            var w = o(t);
            var i = 2;
            var u = 5;
            q.addChild(new ABCJS.write.RelativeElement(v, 0, 0, w + i, {
                type: "decoration",
                klass: "ornament",
                thickness: 3
            }));
            h(t, u)
        }

        function l(v, u) {
            var t = f / 2;
            if (ABCJS.write.glyphs.getSymbolAlign(v) !== "center") {
                t -= (ABCJS.write.glyphs.getSymbolWidth(v) / 2)
            }
            var i = ABCJS.write.glyphs.symbolHeightInPitches(v) + 1;
            var w = o(u);
            w = (u === "above") ? w + i / 2 : w - i / 2;
            q.addChild(new ABCJS.write.RelativeElement(v, t, ABCJS.write.glyphs.getSymbolWidth(v), w, {
                klass: "ornament",
                thickness: ABCJS.write.glyphs.symbolHeightInPitches(v)
            }));
            h(u, i)
        }
        var m = {
            "+": "scripts.stopped",
            open: "scripts.open",
            snap: "scripts.snap",
            wedge: "scripts.wedge",
            thumb: "scripts.thumb",
            shortphrase: "scripts.shortphrase",
            mediumphrase: "scripts.mediumphrase",
            longphrase: "scripts.longphrase",
            trill: "scripts.trill",
            roll: "scripts.roll",
            irishroll: "scripts.roll",
            marcato: "scripts.umarcato",
            dmarcato: "scripts.dmarcato",
            umarcato: "scripts.umarcato",
            turn: "scripts.turn",
            uppermordent: "scripts.prall",
            pralltriller: "scripts.prall",
            mordent: "scripts.mordent",
            lowermordent: "scripts.mordent",
            downbow: "scripts.downbow",
            upbow: "scripts.upbow",
            fermata: "scripts.ufermata",
            invertedfermata: "scripts.dfermata",
            breath: ",",
            coda: "scripts.coda",
            segno: "scripts.segno"
        };
        var r = false;
        for (var k = 0; k < n.length; k++) {
            switch (n[k]) {
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "D.C.":
                case "D.S.":
                    s(n[k], p);
                    r = true;
                    break;
                case "fine":
                    s("FINE", p);
                    r = true;
                    break;
                case "+":
                case "open":
                case "snap":
                case "wedge":
                case "thumb":
                case "shortphrase":
                case "mediumphrase":
                case "longphrase":
                case "trill":
                case "roll":
                case "irishroll":
                case "marcato":
                case "dmarcato":
                case "turn":
                case "uppermordent":
                case "pralltriller":
                case "mordent":
                case "lowermordent":
                case "downbow":
                case "upbow":
                case "fermata":
                case "breath":
                case "umarcato":
                case "coda":
                case "segno":
                    l(m[n[k]], p);
                    r = true;
                    break;
                case "invertedfermata":
                    l(m[n[k]], "below");
                    r = true;
                    break;
                case "mark":
                    q.klass = "mark";
                    break
            }
        }
        return r
    };
    ABCJS.write.Decoration.prototype.dynamicDecoration = function(l, f, h, k) {
        var j;
        var e;
        for (var g = 0; g < f.length; g++) {
            switch (f[g]) {
                case "diminuendo(":
                    this.startDiminuendoX = h;
                    j = undefined;
                    break;
                case "diminuendo)":
                    j = {
                        start: this.startDiminuendoX,
                        stop: h
                    };
                    this.startDiminuendoX = undefined;
                    break;
                case "crescendo(":
                    this.startCrescendoX = h;
                    e = undefined;
                    break;
                case "crescendo)":
                    e = {
                        start: this.startCrescendoX,
                        stop: h
                    };
                    this.startCrescendoX = undefined;
                    break
            }
        }
        if (j) {
            l.addOther(new ABCJS.write.CrescendoElem(j.start, j.stop, ">", k))
        }
        if (e) {
            l.addOther(new ABCJS.write.CrescendoElem(e.start, e.stop, "<", k))
        }
    };
    ABCJS.write.Decoration.prototype.createDecoration = function(k, l, f, g, n, p, j, e, m, i) {
        if (!m) {
            m = {
                ornamentPosition: "above",
                volumePosition: i ? "above" : "below",
                dynamicPosition: i ? "above" : "below"
            }
        }
        b(k, l, n, m.volumePosition);
        this.dynamicDecoration(k, l, n, m.dynamicPosition);
        a(l, f, g, n, j);
        var h = c(k, l, f, g, n, p, j, e);
        var o = d(l, g, n, h, m.ornamentPosition, this.minTop, this.minBottom);
        if (o) {
            n.top = Math.max(h.above + 3, n.top)
        }
    }
})();
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.write) {
    window.ABCJS.write = {}
}
ABCJS.write.DynamicDecoration = function(b, c, a) {
    this.anchor = b;
    this.dec = c;
    if (a === "below") {
        this.volumeHeightBelow = 5
    } else {
        this.volumeHeightAbove = 5
    }
    this.pitch = undefined
};
ABCJS.write.DynamicDecoration.prototype.setUpperAndLowerElements = function(a) {
    if (this.volumeHeightAbove) {
        this.pitch = a.volumeHeightAbove
    } else {
        this.pitch = a.volumeHeightBelow
    }
};
ABCJS.write.DynamicDecoration.prototype.draw = function(d, e, a) {
    if (this.pitch === undefined) {
        window.console.error("Dynamic Element y-coordinate not set.")
    }
    var c = 1;
    var b = 1;
    d.printSymbol(this.anchor.x, this.pitch, this.dec, c, b, d.addClasses("decoration"))
};
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.write) {
    window.ABCJS.write = {}
}
ABCJS.write.EndingElem = function(c, b, a) {
    this.text = c;
    this.anchor1 = b;
    this.anchor2 = a;
    this.endingHeightAbove = 5;
    this.pitch = undefined
};
ABCJS.write.EndingElem.prototype.setUpperAndLowerElements = function(a) {
    this.pitch = a.endingHeightAbove
};
ABCJS.write.EndingElem.prototype.draw = function(d, f, c) {
    if (this.pitch === undefined) {
        window.console.error("Ending Element y-coordinate not set.")
    }
    var e = d.calcY(this.pitch);
    var a = 20;
    var b;
    if (this.anchor1) {
        f = this.anchor1.x + this.anchor1.w;
        b = ABCJS.write.sprintf("M %f %f L %f %f", f, e, f, e + a);
        d.printPath({
            path: b,
            stroke: "#000000",
            fill: "#000000",
            "class": d.addClasses("ending")
        });
        d.renderText(f + 5, d.calcY(this.pitch - 0.5), this.text, "repeatfont", "ending", "start")
    }
    if (this.anchor2) {
        c = this.anchor2.x;
        b = ABCJS.write.sprintf("M %f %f L %f %f", c, e, c, e + a);
        d.printPath({
            path: b,
            stroke: "#000000",
            fill: "#000000",
            "class": d.addClasses("ending")
        })
    }
    b = ABCJS.write.sprintf("M %f %f L %f %f", f, e, c, e);
    d.printPath({
        path: b,
        stroke: "#000000",
        fill: "#000000",
        "class": d.addClasses("ending")
    })
};
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.write) {
    window.ABCJS.write = {}
}
ABCJS.write.spacing = function() {};
ABCJS.write.spacing.FONTEM = 360;
ABCJS.write.spacing.FONTSIZE = 30;
ABCJS.write.spacing.STEP = ABCJS.write.spacing.FONTSIZE * 93 / 720;
ABCJS.write.spacing.SPACE = 10;
ABCJS.write.spacing.TOPNOTE = 15;
ABCJS.write.spacing.STAVEHEIGHT = 100;
ABCJS.write.spacing.INDENT = 50;
ABCJS.write.debugPlacement = false;
ABCJS.write.EngraverController = function(b, a) {
    a = a || {};
    this.space = 3 * ABCJS.write.spacing.SPACE;
    this.scale = a.scale || undefined;
    if (a.staffwidth) {
        this.staffwidthScreen = a.staffwidth;
        this.staffwidthPrint = a.staffwidth
    } else {
        this.staffwidthScreen = 740;
        this.staffwidthPrint = 680
    }
    this.editable = a.editable || false;
    this.listeners = [];
    if (a.listener) {
        this.addSelectListener(a.listener)
    }
    this.usingSvg = (window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? true : false);
    if (this.usingSvg && a.add_classes) {
        Raphael._availableAttrs["class"] = ""
    }
    Raphael._availableAttrs["text-decoration"] = "";
    this.renderer = new ABCJS.write.Renderer(b, a.regression);
    this.renderer.setPaddingOverride(a);
    this.renderer.controller = this;
    this.reset()
};
ABCJS.write.EngraverController.prototype.reset = function() {
    this.selected = [];
    this.ingroup = false;
    this.staffgroups = [];
    this.lastStaffGroupIndex = -1;
    if (this.engraver) {
        this.engraver.reset()
    }
    this.engraver = null;
    this.renderer.reset()
};
ABCJS.write.EngraverController.prototype.engraveABC = function(a) {
    if (a[0] === undefined) {
        a = [a]
    }
    this.reset();
    for (var b = 0; b < a.length; b++) {
        this.engraveTune(a[b])
    }
    if (this.renderer.doRegression) {
        return this.renderer.regressionLines.join("\n")
    }
};
ABCJS.write.EngraverController.prototype.adjustNonScaledItems = function(a) {
    this.width /= a;
    this.renderer.adjustNonScaledItems(a)
};
ABCJS.write.EngraverController.prototype.engraveTune = function(g) {
    this.renderer.lineNumber = null;
    g.formatting.tripletfont = {
        face: "Times",
        size: 11,
        weight: "normal",
        style: "italic",
        decoration: "none"
    };
    this.renderer.abctune = g;
    this.renderer.setVerticalSpace(g.formatting);
    this.renderer.measureNumber = null;
    var h = g.formatting.scale ? g.formatting.scale : this.scale;
    if (h === undefined) {
        h = g.media === "print" ? 0.75 : 1
    }
    this.renderer.setPrintMode(g.media === "print");
    this.renderer.setPadding(g);
    this.engraver = new ABCJS.write.AbstractEngraver(g.formatting.bagpipes, this.renderer);
    this.engraver.setStemHeight(this.renderer.spacing.stemHeight);
    this.renderer.engraver = this.engraver;
    if (g.formatting.staffwidth) {
        this.width = g.formatting.staffwidth * 1.33
    } else {
        this.width = g.media === "print" ? this.staffwidthPrint : this.staffwidthScreen
    }
    this.adjustNonScaledItems(h);
    var e;
    var a;
    var d = false;
    for (e = 0; e < g.lines.length; e++) {
        a = g.lines[e];
        if (a.staff) {
            a.staffGroup = this.engraver.createABCLine(a.staff, !d ? g.metaText.tempo : null);
            d = true
        }
    }
    var f = this.width;
    for (e = 0; e < g.lines.length; e++) {
        a = g.lines[e];
        if (a.staff) {
            this.setXSpacing(a.staffGroup, g.formatting, e === g.lines.length - 1);
            if (a.staffGroup.w > f) {
                f = a.staffGroup.w
            }
        }
    }
    for (e = 0; e < g.lines.length; e++) {
        a = g.lines[e];
        if (a.staffGroup && a.staffGroup.voices) {
            for (var c = 0; c < a.staffGroup.voices.length; c++) {
                a.staffGroup.voices[c].layoutBeams()
            }
            a.staffGroup.setUpperAndLowerElements(this.renderer)
        }
    }
    for (e = 0; e < g.lines.length; e++) {
        a = g.lines[e];
        if (a.staffGroup) {
            a.staffGroup.height = a.staffGroup.calcHeight()
        }
    }
    this.renderer.topMargin(g);
    this.renderer.engraveTopText(this.width, g);
    this.renderer.addMusicPadding();
    this.staffgroups = [];
    this.lastStaffGroupIndex = -1;
    for (var b = 0; b < g.lines.length; b++) {
        this.renderer.lineNumber = b;
        a = g.lines[b];
        if (a.staff) {
            this.engraveStaffLine(a.staffGroup)
        } else {
            if (a.subtitle && b !== 0) {
                this.renderer.outputSubtitle(this.width, a.subtitle)
            } else {
                if (a.text) {
                    this.renderer.outputFreeText(a.text)
                }
            }
        }
    }
    this.renderer.moveY(24);
    this.renderer.engraveExtraText(this.width, g);
    this.renderer.setPaperSize(f, h)
};

function calcHorizontalSpacing(d, b, h, e, g, a, i) {
    if (d && e / h < 0.66 && !b) {
        return null
    }
    if (Math.abs(h - e) < 2) {
        return null
    }
    var c = a * g;
    var f = e - c;
    if (a > 0) {
        g = (h - f) / a;
        if (g * i > 50) {
            g = 50 / i
        }
        return g
    }
    return null
}
ABCJS.write.EngraverController.prototype.setXSpacing = function(d, b, e) {
    var a = this.space;
    for (var c = 0; c < 3; c++) {
        d.layout(a, this.renderer, false);
        var f = b.stretchlast ? b.stretchlast : false;
        a = calcHorizontalSpacing(e, f, this.width + this.renderer.padding.left, d.w, a, d.spacingunits, d.minspace);
        if (a === null) {
            break
        }
    }
    centerWholeRests(d.voices)
};
ABCJS.write.EngraverController.prototype.engraveStaffLine = function(b) {
    if (this.lastStaffGroupIndex > -1) {
        this.renderer.addStaffPadding(this.staffgroups[this.lastStaffGroupIndex], b)
    }
    b.draw(this.renderer);
    var a = b.height * ABCJS.write.spacing.STEP;
    this.staffgroups[this.staffgroups.length] = b;
    this.lastStaffGroupIndex = this.staffgroups.length - 1;
    this.renderer.y += a
};
ABCJS.write.EngraverController.prototype.notifySelect = function(b) {
    this.clearSelection();
    if (b.highlight) {
        this.selected = [b];
        b.highlight()
    }
    var c = b.abcelem || {};
    for (var a = 0; a < this.listeners.length; a++) {
        if (this.listeners[a].highlight) {
            this.listeners[a].highlight(c)
        }
    }
};
ABCJS.write.EngraverController.prototype.notifyChange = function() {
    for (var a = 0; a < this.listeners.length; a++) {
        if (this.listeners[a].modelChanged) {
            this.listeners[a].modelChanged()
        }
    }
};
ABCJS.write.EngraverController.prototype.clearSelection = function() {
    for (var a = 0; a < this.selected.length; a++) {
        this.selected[a].unhighlight()
    }
    this.selected = []
};
ABCJS.write.EngraverController.prototype.addSelectListener = function(a) {
    this.listeners[this.listeners.length] = a
};
ABCJS.write.EngraverController.prototype.rangeHighlight = function(b, d) {
    this.clearSelection();
    for (var i = 0; i < this.staffgroups.length; i++) {
        var f = this.staffgroups[i].voices;
        for (var g = 0; g < f.length; g++) {
            var a = f[g].children;
            for (var c = 0; c < a.length; c++) {
                var h = a[c].abcelem.startChar;
                var e = a[c].abcelem.endChar;
                if ((d > h && b < e) || ((d === b) && d === e)) {
                    this.selected[this.selected.length] = a[c];
                    a[c].highlight()
                }
            }
        }
    }
};

function centerWholeRests(f) {
    for (var e = 0; e < f.length; e++) {
        var g = f[e];
        for (var d = 1; d < g.children.length - 1; d++) {
            var b = g.children[d];
            if (b.abcelem.rest && b.abcelem.rest.type === "whole") {
                var h = g.children[d - 1];
                var a = g.children[d + 1];
                var l = (a.x - h.x) / 2 + h.x;
                b.x = l - b.w / 2;
                for (var c = 0; c < b.children.length; c++) {
                    b.children[c].x = b.x
                }
            }
        }
    }
}
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.write) {
    window.ABCJS.write = {}
}
ABCJS.write.Glyphs = function() {
    var a = {
        "0": {
            d: [
                ["M", 4.83, -14.97],
                ["c", 0.33, -0.03, 1.11, 0, 1.47, 0.06],
                ["c", 1.68, 0.36, 2.97, 1.59, 3.78, 3.6],
                ["c", 1.2, 2.97, 0.81, 6.96, -0.9, 9.27],
                ["c", -0.78, 1.08, -1.71, 1.71, -2.91, 1.95],
                ["c", -0.45, 0.09, -1.32, 0.09, -1.77, 0],
                ["c", -0.81, -0.18, -1.47, -0.51, -2.07, -1.02],
                ["c", -2.34, -2.07, -3.15, -6.72, -1.74, -10.2],
                ["c", 0.87, -2.16, 2.28, -3.42, 4.14, -3.66],
                ["z"],
                ["m", 1.11, 0.87],
                ["c", -0.21, -0.06, -0.69, -0.09, -0.87, -0.06],
                ["c", -0.54, 0.12, -0.87, 0.42, -1.17, 0.99],
                ["c", -0.36, 0.66, -0.51, 1.56, -0.6, 3],
                ["c", -0.03, 0.75, -0.03, 4.59, 0, 5.31],
                ["c", 0.09, 1.5, 0.27, 2.4, 0.6, 3.06],
                ["c", 0.24, 0.48, 0.57, 0.78, 0.96, 0.9],
                ["c", 0.27, 0.09, 0.78, 0.09, 1.05, 0],
                ["c", 0.39, -0.12, 0.72, -0.42, 0.96, -0.9],
                ["c", 0.33, -0.66, 0.51, -1.56, 0.6, -3.06],
                ["c", 0.03, -0.72, 0.03, -4.56, 0, -5.31],
                ["c", -0.09, -1.47, -0.27, -2.37, -0.6, -3.03],
                ["c", -0.24, -0.48, -0.54, -0.78, -0.93, -0.9],
                ["z"]
            ],
            w: 10.78,
            h: 14.959
        },
        "1": {
            d: [
                ["M", 3.3, -15.06],
                ["c", 0.06, -0.06, 0.21, -0.03, 0.66, 0.15],
                ["c", 0.81, 0.39, 1.08, 0.39, 1.83, 0.03],
                ["c", 0.21, -0.09, 0.39, -0.15, 0.42, -0.15],
                ["c", 0.12, 0, 0.21, 0.09, 0.27, 0.21],
                ["c", 0.06, 0.12, 0.06, 0.33, 0.06, 5.94],
                ["c", 0, 3.93, 0, 5.85, 0.03, 6.03],
                ["c", 0.06, 0.36, 0.15, 0.69, 0.27, 0.96],
                ["c", 0.36, 0.75, 0.93, 1.17, 1.68, 1.26],
                ["c", 0.3, 0.03, 0.39, 0.09, 0.39, 0.3],
                ["c", 0, 0.15, -0.03, 0.18, -0.09, 0.24],
                ["c", -0.06, 0.06, -0.09, 0.06, -0.48, 0.06],
                ["c", -0.42, 0, -0.69, -0.03, -2.1, -0.24],
                ["c", -0.9, -0.15, -1.77, -0.15, -2.67, 0],
                ["c", -1.41, 0.21, -1.68, 0.24, -2.1, 0.24],
                ["c", -0.39, 0, -0.42, 0, -0.48, -0.06],
                ["c", -0.06, -0.06, -0.06, -0.09, -0.06, -0.24],
                ["c", 0, -0.21, 0.06, -0.27, 0.36, -0.3],
                ["c", 0.75, -0.09, 1.32, -0.51, 1.68, -1.26],
                ["c", 0.12, -0.27, 0.21, -0.6, 0.27, -0.96],
                ["c", 0.03, -0.18, 0.03, -1.59, 0.03, -4.29],
                ["c", 0, -3.87, 0, -4.05, -0.06, -4.14],
                ["c", -0.09, -0.15, -0.18, -0.24, -0.39, -0.24],
                ["c", -0.12, 0, -0.15, 0.03, -0.21, 0.06],
                ["c", -0.03, 0.06, -0.45, 0.99, -0.96, 2.13],
                ["c", -0.48, 1.14, -0.9, 2.1, -0.93, 2.16],
                ["c", -0.06, 0.15, -0.21, 0.24, -0.33, 0.24],
                ["c", -0.24, 0, -0.42, -0.18, -0.42, -0.39],
                ["c", 0, -0.06, 3.27, -7.62, 3.33, -7.74],
                ["z"]
            ],
            w: 8.94,
            h: 15.058
        },
        "2": {
            d: [
                ["M", 4.23, -14.97],
                ["c", 0.57, -0.06, 1.68, 0, 2.34, 0.18],
                ["c", 0.69, 0.18, 1.5, 0.54, 2.01, 0.9],
                ["c", 1.35, 0.96, 1.95, 2.25, 1.77, 3.81],
                ["c", -0.15, 1.35, -0.66, 2.34, -1.68, 3.15],
                ["c", -0.6, 0.48, -1.44, 0.93, -3.12, 1.65],
                ["c", -1.32, 0.57, -1.8, 0.81, -2.37, 1.14],
                ["c", -0.57, 0.33, -0.57, 0.33, -0.24, 0.27],
                ["c", 0.39, -0.09, 1.26, -0.09, 1.68, 0],
                ["c", 0.72, 0.15, 1.41, 0.45, 2.1, 0.9],
                ["c", 0.99, 0.63, 1.86, 0.87, 2.55, 0.75],
                ["c", 0.24, -0.06, 0.42, -0.15, 0.57, -0.3],
                ["c", 0.12, -0.09, 0.3, -0.42, 0.3, -0.51],
                ["c", 0, -0.09, 0.12, -0.21, 0.24, -0.24],
                ["c", 0.18, -0.03, 0.39, 0.12, 0.39, 0.3],
                ["c", 0, 0.12, -0.15, 0.57, -0.3, 0.87],
                ["c", -0.54, 1.02, -1.56, 1.74, -2.79, 2.01],
                ["c", -0.42, 0.09, -1.23, 0.09, -1.62, 0.03],
                ["c", -0.81, -0.18, -1.32, -0.45, -2.01, -1.11],
                ["c", -0.45, -0.45, -0.63, -0.57, -0.96, -0.69],
                ["c", -0.84, -0.27, -1.89, 0.12, -2.25, 0.9],
                ["c", -0.12, 0.21, -0.21, 0.54, -0.21, 0.72],
                ["c", 0, 0.12, -0.12, 0.21, -0.27, 0.24],
                ["c", -0.15, 0, -0.27, -0.03, -0.33, -0.15],
                ["c", -0.09, -0.21, 0.09, -1.08, 0.33, -1.71],
                ["c", 0.24, -0.66, 0.66, -1.26, 1.29, -1.89],
                ["c", 0.45, -0.45, 0.9, -0.81, 1.92, -1.56],
                ["c", 1.29, -0.93, 1.89, -1.44, 2.34, -1.98],
                ["c", 0.87, -1.05, 1.26, -2.19, 1.2, -3.63],
                ["c", -0.06, -1.29, -0.39, -2.31, -0.96, -2.91],
                ["c", -0.36, -0.33, -0.72, -0.51, -1.17, -0.54],
                ["c", -0.84, -0.03, -1.53, 0.42, -1.59, 1.05],
                ["c", -0.03, 0.33, 0.12, 0.6, 0.57, 1.14],
                ["c", 0.45, 0.54, 0.54, 0.87, 0.42, 1.41],
                ["c", -0.15, 0.63, -0.54, 1.11, -1.08, 1.38],
                ["c", -0.63, 0.33, -1.2, 0.33, -1.83, 0],
                ["c", -0.24, -0.12, -0.33, -0.18, -0.54, -0.39],
                ["c", -0.18, -0.18, -0.27, -0.3, -0.36, -0.51],
                ["c", -0.24, -0.45, -0.27, -0.84, -0.21, -1.38],
                ["c", 0.12, -0.75, 0.45, -1.41, 1.02, -1.98],
                ["c", 0.72, -0.72, 1.74, -1.17, 2.85, -1.32],
                ["z"]
            ],
            w: 10.764,
            h: 14.97
        },
        "3": {
            d: [
                ["M", 3.78, -14.97],
                ["c", 0.3, -0.03, 1.41, 0, 1.83, 0.06],
                ["c", 2.22, 0.3, 3.51, 1.32, 3.72, 2.91],
                ["c", 0.03, 0.33, 0.03, 1.26, -0.03, 1.65],
                ["c", -0.12, 0.84, -0.48, 1.47, -1.05, 1.77],
                ["c", -0.27, 0.15, -0.36, 0.24, -0.45, 0.39],
                ["c", -0.09, 0.21, -0.09, 0.36, 0, 0.57],
                ["c", 0.09, 0.15, 0.18, 0.24, 0.51, 0.39],
                ["c", 0.75, 0.42, 1.23, 1.14, 1.41, 2.13],
                ["c", 0.06, 0.42, 0.06, 1.35, 0, 1.71],
                ["c", -0.18, 0.81, -0.48, 1.38, -1.02, 1.95],
                ["c", -0.75, 0.72, -1.8, 1.2, -3.18, 1.38],
                ["c", -0.42, 0.06, -1.56, 0.06, -1.95, 0],
                ["c", -1.89, -0.33, -3.18, -1.29, -3.51, -2.64],
                ["c", -0.03, -0.12, -0.03, -0.33, -0.03, -0.6],
                ["c", 0, -0.36, 0, -0.42, 0.06, -0.63],
                ["c", 0.12, -0.3, 0.27, -0.51, 0.51, -0.75],
                ["c", 0.24, -0.24, 0.45, -0.39, 0.75, -0.51],
                ["c", 0.21, -0.06, 0.27, -0.06, 0.6, -0.06],
                ["c", 0.33, 0, 0.39, 0, 0.6, 0.06],
                ["c", 0.3, 0.12, 0.51, 0.27, 0.75, 0.51],
                ["c", 0.36, 0.33, 0.57, 0.75, 0.6, 1.2],
                ["c", 0, 0.21, 0, 0.27, -0.06, 0.42],
                ["c", -0.09, 0.18, -0.12, 0.24, -0.54, 0.54],
                ["c", -0.51, 0.36, -0.63, 0.54, -0.6, 0.87],
                ["c", 0.06, 0.54, 0.54, 0.9, 1.38, 0.99],
                ["c", 0.36, 0.06, 0.72, 0.03, 0.96, -0.06],
                ["c", 0.81, -0.27, 1.29, -1.23, 1.44, -2.79],
                ["c", 0.03, -0.45, 0.03, -1.95, -0.03, -2.37],
                ["c", -0.09, -0.75, -0.33, -1.23, -0.75, -1.44],
                ["c", -0.33, -0.18, -0.45, -0.18, -1.98, -0.18],
                ["c", -1.35, 0, -1.41, 0, -1.5, -0.06],
                ["c", -0.18, -0.12, -0.24, -0.39, -0.12, -0.6],
                ["c", 0.12, -0.15, 0.15, -0.15, 1.68, -0.15],
                ["c", 1.5, 0, 1.62, 0, 1.89, -0.15],
                ["c", 0.18, -0.09, 0.42, -0.36, 0.54, -0.57],
                ["c", 0.18, -0.42, 0.27, -0.9, 0.3, -1.95],
                ["c", 0.03, -1.2, -0.06, -1.8, -0.36, -2.37],
                ["c", -0.24, -0.48, -0.63, -0.81, -1.14, -0.96],
                ["c", -0.3, -0.06, -1.08, -0.06, -1.38, 0.03],
                ["c", -0.6, 0.15, -0.9, 0.42, -0.96, 0.84],
                ["c", -0.03, 0.3, 0.06, 0.45, 0.63, 0.84],
                ["c", 0.33, 0.24, 0.42, 0.39, 0.45, 0.63],
                ["c", 0.03, 0.72, -0.57, 1.5, -1.32, 1.65],
                ["c", -1.05, 0.27, -2.1, -0.57, -2.1, -1.65],
                ["c", 0, -0.45, 0.15, -0.96, 0.39, -1.38],
                ["c", 0.12, -0.21, 0.54, -0.63, 0.81, -0.81],
                ["c", 0.57, -0.42, 1.38, -0.69, 2.25, -0.81],
                ["z"]
            ],
            w: 9.735,
            h: 14.967
        },
        "4": {
            d: [
                ["M", 8.64, -14.94],
                ["c", 0.27, -0.09, 0.42, -0.12, 0.54, -0.03],
                ["c", 0.09, 0.06, 0.15, 0.21, 0.15, 0.3],
                ["c", -0.03, 0.06, -1.92, 2.31, -4.23, 5.04],
                ["c", -2.31, 2.73, -4.23, 4.98, -4.26, 5.01],
                ["c", -0.03, 0.06, 0.12, 0.06, 2.55, 0.06],
                ["l", 2.61, 0],
                ["l", 0, -2.37],
                ["c", 0, -2.19, 0.03, -2.37, 0.06, -2.46],
                ["c", 0.03, -0.06, 0.21, -0.18, 0.57, -0.42],
                ["c", 1.08, -0.72, 1.38, -1.08, 1.86, -2.16],
                ["c", 0.12, -0.3, 0.24, -0.54, 0.27, -0.57],
                ["c", 0.12, -0.12, 0.39, -0.06, 0.45, 0.12],
                ["c", 0.06, 0.09, 0.06, 0.57, 0.06, 3.96],
                ["l", 0, 3.9],
                ["l", 1.08, 0],
                ["c", 1.05, 0, 1.11, 0, 1.2, 0.06],
                ["c", 0.24, 0.15, 0.24, 0.54, 0, 0.69],
                ["c", -0.09, 0.06, -0.15, 0.06, -1.2, 0.06],
                ["l", -1.08, 0],
                ["l", 0, 0.33],
                ["c", 0, 0.57, 0.09, 1.11, 0.3, 1.53],
                ["c", 0.36, 0.75, 0.93, 1.17, 1.68, 1.26],
                ["c", 0.3, 0.03, 0.39, 0.09, 0.39, 0.3],
                ["c", 0, 0.15, -0.03, 0.18, -0.09, 0.24],
                ["c", -0.06, 0.06, -0.09, 0.06, -0.48, 0.06],
                ["c", -0.42, 0, -0.69, -0.03, -2.1, -0.24],
                ["c", -0.9, -0.15, -1.77, -0.15, -2.67, 0],
                ["c", -1.41, 0.21, -1.68, 0.24, -2.1, 0.24],
                ["c", -0.39, 0, -0.42, 0, -0.48, -0.06],
                ["c", -0.06, -0.06, -0.06, -0.09, -0.06, -0.24],
                ["c", 0, -0.21, 0.06, -0.27, 0.36, -0.3],
                ["c", 0.75, -0.09, 1.32, -0.51, 1.68, -1.26],
                ["c", 0.21, -0.42, 0.3, -0.96, 0.3, -1.53],
                ["l", 0, -0.33],
                ["l", -2.7, 0],
                ["c", -2.91, 0, -2.85, 0, -3.09, -0.15],
                ["c", -0.18, -0.12, -0.3, -0.39, -0.27, -0.54],
                ["c", 0.03, -0.06, 0.18, -0.24, 0.33, -0.45],
                ["c", 0.75, -0.9, 1.59, -2.07, 2.13, -3.03],
                ["c", 0.33, -0.54, 0.84, -1.62, 1.05, -2.16],
                ["c", 0.57, -1.41, 0.84, -2.64, 0.9, -4.05],
                ["c", 0.03, -0.63, 0.06, -0.72, 0.24, -0.81],
                ["l", 0.12, -0.06],
                ["l", 0.45, 0.12],
                ["c", 0.66, 0.18, 1.02, 0.24, 1.47, 0.27],
                ["c", 0.6, 0.03, 1.23, -0.09, 2.01, -0.33],
                ["z"]
            ],
            w: 11.795,
            h: 14.994
        },
        "5": {
            d: [
                ["M", 1.02, -14.94],
                ["c", 0.12, -0.09, 0.03, -0.09, 1.08, 0.06],
                ["c", 2.49, 0.36, 4.35, 0.36, 6.96, -0.06],
                ["c", 0.57, -0.09, 0.66, -0.06, 0.81, 0.06],
                ["c", 0.15, 0.18, 0.12, 0.24, -0.15, 0.51],
                ["c", -1.29, 1.26, -3.24, 2.04, -5.58, 2.31],
                ["c", -0.6, 0.09, -1.2, 0.12, -1.71, 0.12],
                ["c", -0.39, 0, -0.45, 0, -0.57, 0.06],
                ["c", -0.09, 0.06, -0.15, 0.12, -0.21, 0.21],
                ["l", -0.06, 0.12],
                ["l", 0, 1.65],
                ["l", 0, 1.65],
                ["l", 0.21, -0.21],
                ["c", 0.66, -0.57, 1.41, -0.96, 2.19, -1.14],
                ["c", 0.33, -0.06, 1.41, -0.06, 1.95, 0],
                ["c", 2.61, 0.36, 4.02, 1.74, 4.26, 4.14],
                ["c", 0.03, 0.45, 0.03, 1.08, -0.03, 1.44],
                ["c", -0.18, 1.02, -0.78, 2.01, -1.59, 2.7],
                ["c", -0.72, 0.57, -1.62, 1.02, -2.49, 1.2],
                ["c", -1.38, 0.27, -3.03, 0.06, -4.2, -0.54],
                ["c", -1.08, -0.54, -1.71, -1.32, -1.86, -2.28],
                ["c", -0.09, -0.69, 0.09, -1.29, 0.57, -1.74],
                ["c", 0.24, -0.24, 0.45, -0.39, 0.75, -0.51],
                ["c", 0.21, -0.06, 0.27, -0.06, 0.6, -0.06],
                ["c", 0.33, 0, 0.39, 0, 0.6, 0.06],
                ["c", 0.3, 0.12, 0.51, 0.27, 0.75, 0.51],
                ["c", 0.36, 0.33, 0.57, 0.75, 0.6, 1.2],
                ["c", 0, 0.21, 0, 0.27, -0.06, 0.42],
                ["c", -0.09, 0.18, -0.12, 0.24, -0.54, 0.54],
                ["c", -0.18, 0.12, -0.36, 0.3, -0.42, 0.33],
                ["c", -0.36, 0.42, -0.18, 0.99, 0.36, 1.26],
                ["c", 0.51, 0.27, 1.47, 0.36, 2.01, 0.27],
                ["c", 0.93, -0.21, 1.47, -1.17, 1.65, -2.91],
                ["c", 0.06, -0.45, 0.06, -1.89, 0, -2.31],
                ["c", -0.15, -1.2, -0.51, -2.1, -1.05, -2.55],
                ["c", -0.21, -0.18, -0.54, -0.36, -0.81, -0.39],
                ["c", -0.3, -0.06, -0.84, -0.03, -1.26, 0.06],
                ["c", -0.93, 0.18, -1.65, 0.6, -2.16, 1.2],
                ["c", -0.15, 0.21, -0.27, 0.3, -0.39, 0.3],
                ["c", -0.15, 0, -0.3, -0.09, -0.36, -0.18],
                ["c", -0.06, -0.09, -0.06, -0.15, -0.06, -3.66],
                ["c", 0, -3.39, 0, -3.57, 0.06, -3.66],
                ["c", 0.03, -0.06, 0.09, -0.15, 0.15, -0.18],
                ["z"]
            ],
            w: 10.212,
            h: 14.997
        },
        "6": {
            d: [
                ["M", 4.98, -14.97],
                ["c", 0.36, -0.03, 1.2, 0, 1.59, 0.06],
                ["c", 0.9, 0.15, 1.68, 0.51, 2.25, 1.05],
                ["c", 0.57, 0.51, 0.87, 1.23, 0.84, 1.98],
                ["c", -0.03, 0.51, -0.21, 0.9, -0.6, 1.26],
                ["c", -0.24, 0.24, -0.45, 0.39, -0.75, 0.51],
                ["c", -0.21, 0.06, -0.27, 0.06, -0.6, 0.06],
                ["c", -0.33, 0, -0.39, 0, -0.6, -0.06],
                ["c", -0.3, -0.12, -0.51, -0.27, -0.75, -0.51],
                ["c", -0.39, -0.36, -0.57, -0.78, -0.57, -1.26],
                ["c", 0, -0.27, 0, -0.3, 0.09, -0.42],
                ["c", 0.03, -0.09, 0.18, -0.21, 0.3, -0.3],
                ["c", 0.12, -0.09, 0.3, -0.21, 0.39, -0.27],
                ["c", 0.09, -0.06, 0.21, -0.18, 0.27, -0.24],
                ["c", 0.06, -0.12, 0.09, -0.15, 0.09, -0.33],
                ["c", 0, -0.18, -0.03, -0.24, -0.09, -0.36],
                ["c", -0.24, -0.39, -0.75, -0.6, -1.38, -0.57],
                ["c", -0.54, 0.03, -0.9, 0.18, -1.23, 0.48],
                ["c", -0.81, 0.72, -1.08, 2.16, -0.96, 5.37],
                ["l", 0, 0.63],
                ["l", 0.3, -0.12],
                ["c", 0.78, -0.27, 1.29, -0.33, 2.1, -0.27],
                ["c", 1.47, 0.12, 2.49, 0.54, 3.27, 1.29],
                ["c", 0.48, 0.51, 0.81, 1.11, 0.96, 1.89],
                ["c", 0.06, 0.27, 0.06, 0.42, 0.06, 0.93],
                ["c", 0, 0.54, 0, 0.69, -0.06, 0.96],
                ["c", -0.15, 0.78, -0.48, 1.38, -0.96, 1.89],
                ["c", -0.54, 0.51, -1.17, 0.87, -1.98, 1.08],
                ["c", -1.14, 0.3, -2.4, 0.33, -3.24, 0.03],
                ["c", -1.5, -0.48, -2.64, -1.89, -3.27, -4.02],
                ["c", -0.36, -1.23, -0.51, -2.82, -0.42, -4.08],
                ["c", 0.3, -3.66, 2.28, -6.3, 4.95, -6.66],
                ["z"],
                ["m", 0.66, 7.41],
                ["c", -0.27, -0.09, -0.81, -0.12, -1.08, -0.06],
                ["c", -0.72, 0.18, -1.08, 0.69, -1.23, 1.71],
                ["c", -0.06, 0.54, -0.06, 3, 0, 3.54],
                ["c", 0.18, 1.26, 0.72, 1.77, 1.8, 1.74],
                ["c", 0.39, -0.03, 0.63, -0.09, 0.9, -0.27],
                ["c", 0.66, -0.42, 0.9, -1.32, 0.9, -3.24],
                ["c", 0, -2.22, -0.36, -3.12, -1.29, -3.42],
                ["z"]
            ],
            w: 9.956,
            h: 14.982
        },
        "7": {
            d: [
                ["M", 0.21, -14.97],
                ["c", 0.21, -0.06, 0.45, 0, 0.54, 0.15],
                ["c", 0.06, 0.09, 0.06, 0.15, 0.06, 0.39],
                ["c", 0, 0.24, 0, 0.33, 0.06, 0.42],
                ["c", 0.06, 0.12, 0.21, 0.24, 0.27, 0.24],
                ["c", 0.03, 0, 0.12, -0.12, 0.24, -0.21],
                ["c", 0.96, -1.2, 2.58, -1.35, 3.99, -0.42],
                ["c", 0.15, 0.12, 0.42, 0.3, 0.54, 0.45],
                ["c", 0.48, 0.39, 0.81, 0.57, 1.29, 0.6],
                ["c", 0.69, 0.03, 1.5, -0.3, 2.13, -0.87],
                ["c", 0.09, -0.09, 0.27, -0.3, 0.39, -0.45],
                ["c", 0.12, -0.15, 0.24, -0.27, 0.3, -0.3],
                ["c", 0.18, -0.06, 0.39, 0.03, 0.51, 0.21],
                ["c", 0.06, 0.18, 0.06, 0.24, -0.27, 0.72],
                ["c", -0.18, 0.24, -0.54, 0.78, -0.78, 1.17],
                ["c", -2.37, 3.54, -3.54, 6.27, -3.87, 9],
                ["c", -0.03, 0.33, -0.03, 0.66, -0.03, 1.26],
                ["c", 0, 0.9, 0, 1.08, 0.15, 1.89],
                ["c", 0.06, 0.45, 0.06, 0.48, 0.03, 0.6],
                ["c", -0.06, 0.09, -0.21, 0.21, -0.3, 0.21],
                ["c", -0.03, 0, -0.27, -0.06, -0.54, -0.15],
                ["c", -0.84, -0.27, -1.11, -0.3, -1.65, -0.3],
                ["c", -0.57, 0, -0.84, 0.03, -1.56, 0.27],
                ["c", -0.6, 0.18, -0.69, 0.21, -0.81, 0.15],
                ["c", -0.12, -0.06, -0.21, -0.18, -0.21, -0.3],
                ["c", 0, -0.15, 0.6, -1.44, 1.2, -2.61],
                ["c", 1.14, -2.22, 2.73, -4.68, 5.1, -8.01],
                ["c", 0.21, -0.27, 0.36, -0.48, 0.33, -0.48],
                ["c", 0, 0, -0.12, 0.06, -0.27, 0.12],
                ["c", -0.54, 0.3, -0.99, 0.39, -1.56, 0.39],
                ["c", -0.75, 0.03, -1.2, -0.18, -1.83, -0.75],
                ["c", -0.99, -0.9, -1.83, -1.17, -2.31, -0.72],
                ["c", -0.18, 0.15, -0.36, 0.51, -0.45, 0.84],
                ["c", -0.06, 0.24, -0.06, 0.33, -0.09, 1.98],
                ["c", 0, 1.62, -0.03, 1.74, -0.06, 1.8],
                ["c", -0.15, 0.24, -0.54, 0.24, -0.69, 0],
                ["c", -0.06, -0.09, -0.06, -0.15, -0.06, -3.57],
                ["c", 0, -3.42, 0, -3.48, 0.06, -3.57],
                ["c", 0.03, -0.06, 0.09, -0.12, 0.15, -0.15],
                ["z"]
            ],
            w: 10.561,
            h: 15.093
        },
        "8": {
            d: [
                ["M", 4.98, -14.97],
                ["c", 0.33, -0.03, 1.02, -0.03, 1.32, 0],
                ["c", 1.32, 0.12, 2.49, 0.6, 3.21, 1.32],
                ["c", 0.39, 0.39, 0.66, 0.81, 0.78, 1.29],
                ["c", 0.09, 0.36, 0.09, 1.08, 0, 1.44],
                ["c", -0.21, 0.84, -0.66, 1.59, -1.59, 2.55],
                ["l", -0.3, 0.3],
                ["l", 0.27, 0.18],
                ["c", 1.47, 0.93, 2.31, 2.31, 2.25, 3.75],
                ["c", -0.03, 0.75, -0.24, 1.35, -0.63, 1.95],
                ["c", -0.45, 0.66, -1.02, 1.14, -1.83, 1.53],
                ["c", -1.8, 0.87, -4.2, 0.87, -6, 0.03],
                ["c", -1.62, -0.78, -2.52, -2.16, -2.46, -3.66],
                ["c", 0.06, -0.99, 0.54, -1.77, 1.8, -2.97],
                ["c", 0.54, -0.51, 0.54, -0.54, 0.48, -0.57],
                ["c", -0.39, -0.27, -0.96, -0.78, -1.2, -1.14],
                ["c", -0.75, -1.11, -0.87, -2.4, -0.3, -3.6],
                ["c", 0.69, -1.35, 2.25, -2.25, 4.2, -2.4],
                ["z"],
                ["m", 1.53, 0.69],
                ["c", -0.42, -0.09, -1.11, -0.12, -1.38, -0.06],
                ["c", -0.3, 0.06, -0.6, 0.18, -0.81, 0.3],
                ["c", -0.21, 0.12, -0.6, 0.51, -0.72, 0.72],
                ["c", -0.51, 0.87, -0.42, 1.89, 0.21, 2.52],
                ["c", 0.21, 0.21, 0.36, 0.3, 1.95, 1.23],
                ["c", 0.96, 0.54, 1.74, 0.99, 1.77, 1.02],
                ["c", 0.09, 0, 0.63, -0.6, 0.99, -1.11],
                ["c", 0.21, -0.36, 0.48, -0.87, 0.57, -1.23],
                ["c", 0.06, -0.24, 0.06, -0.36, 0.06, -0.72],
                ["c", 0, -0.45, -0.03, -0.66, -0.15, -0.99],
                ["c", -0.39, -0.81, -1.29, -1.44, -2.49, -1.68],
                ["z"],
                ["m", -1.44, 8.07],
                ["l", -1.89, -1.08],
                ["c", -0.03, 0, -0.18, 0.15, -0.39, 0.33],
                ["c", -1.2, 1.08, -1.65, 1.95, -1.59, 3],
                ["c", 0.09, 1.59, 1.35, 2.85, 3.21, 3.24],
                ["c", 0.33, 0.06, 0.45, 0.06, 0.93, 0.06],
                ["c", 0.63, 0, 0.81, -0.03, 1.29, -0.27],
                ["c", 0.9, -0.42, 1.47, -1.41, 1.41, -2.4],
                ["c", -0.06, -0.66, -0.39, -1.29, -0.9, -1.65],
                ["c", -0.12, -0.09, -1.05, -0.63, -2.07, -1.23],
                ["z"]
            ],
            w: 10.926,
            h: 14.989
        },
        "9": {
            d: [
                ["M", 4.23, -14.97],
                ["c", 0.42, -0.03, 1.29, 0, 1.62, 0.06],
                ["c", 0.51, 0.12, 0.93, 0.3, 1.38, 0.57],
                ["c", 1.53, 1.02, 2.52, 3.24, 2.73, 5.94],
                ["c", 0.18, 2.55, -0.48, 4.98, -1.83, 6.57],
                ["c", -1.05, 1.26, -2.4, 1.89, -3.93, 1.83],
                ["c", -1.23, -0.06, -2.31, -0.45, -3.03, -1.14],
                ["c", -0.57, -0.51, -0.87, -1.23, -0.84, -1.98],
                ["c", 0.03, -0.51, 0.21, -0.9, 0.6, -1.26],
                ["c", 0.24, -0.24, 0.45, -0.39, 0.75, -0.51],
                ["c", 0.21, -0.06, 0.27, -0.06, 0.6, -0.06],
                ["c", 0.33, 0, 0.39, 0, 0.6, 0.06],
                ["c", 0.3, 0.12, 0.51, 0.27, 0.75, 0.51],
                ["c", 0.39, 0.36, 0.57, 0.78, 0.57, 1.26],
                ["c", 0, 0.27, 0, 0.3, -0.09, 0.42],
                ["c", -0.03, 0.09, -0.18, 0.21, -0.3, 0.3],
                ["c", -0.12, 0.09, -0.3, 0.21, -0.39, 0.27],
                ["c", -0.09, 0.06, -0.21, 0.18, -0.27, 0.24],
                ["c", -0.06, 0.12, -0.06, 0.15, -0.06, 0.33],
                ["c", 0, 0.18, 0, 0.24, 0.06, 0.36],
                ["c", 0.24, 0.39, 0.75, 0.6, 1.38, 0.57],
                ["c", 0.54, -0.03, 0.9, -0.18, 1.23, -0.48],
                ["c", 0.81, -0.72, 1.08, -2.16, 0.96, -5.37],
                ["l", 0, -0.63],
                ["l", -0.3, 0.12],
                ["c", -0.78, 0.27, -1.29, 0.33, -2.1, 0.27],
                ["c", -1.47, -0.12, -2.49, -0.54, -3.27, -1.29],
                ["c", -0.48, -0.51, -0.81, -1.11, -0.96, -1.89],
                ["c", -0.06, -0.27, -0.06, -0.42, -0.06, -0.96],
                ["c", 0, -0.51, 0, -0.66, 0.06, -0.93],
                ["c", 0.15, -0.78, 0.48, -1.38, 0.96, -1.89],
                ["c", 0.15, -0.12, 0.33, -0.27, 0.42, -0.36],
                ["c", 0.69, -0.51, 1.62, -0.81, 2.76, -0.93],
                ["z"],
                ["m", 1.17, 0.66],
                ["c", -0.21, -0.06, -0.57, -0.06, -0.81, -0.03],
                ["c", -0.78, 0.12, -1.26, 0.69, -1.41, 1.74],
                ["c", -0.12, 0.63, -0.15, 1.95, -0.09, 2.79],
                ["c", 0.12, 1.71, 0.63, 2.4, 1.77, 2.46],
                ["c", 1.08, 0.03, 1.62, -0.48, 1.8, -1.74],
                ["c", 0.06, -0.54, 0.06, -3, 0, -3.54],
                ["c", -0.15, -1.05, -0.51, -1.53, -1.26, -1.68],
                ["z"]
            ],
            w: 9.959,
            h: 14.986
        },
        "rests.whole": {
            d: [
                ["M", 0.06, 0.03],
                ["l", 0.09, -0.06],
                ["l", 5.46, 0],
                ["l", 5.49, 0],
                ["l", 0.09, 0.06],
                ["l", 0.06, 0.09],
                ["l", 0, 2.19],
                ["l", 0, 2.19],
                ["l", -0.06, 0.09],
                ["l", -0.09, 0.06],
                ["l", -5.49, 0],
                ["l", -5.46, 0],
                ["l", -0.09, -0.06],
                ["l", -0.06, -0.09],
                ["l", 0, -2.19],
                ["l", 0, -2.19],
                ["z"]
            ],
            w: 11.25,
            h: 4.68
        },
        "rests.half": {
            d: [
                ["M", 0.06, -4.62],
                ["l", 0.09, -0.06],
                ["l", 5.46, 0],
                ["l", 5.49, 0],
                ["l", 0.09, 0.06],
                ["l", 0.06, 0.09],
                ["l", 0, 2.19],
                ["l", 0, 2.19],
                ["l", -0.06, 0.09],
                ["l", -0.09, 0.06],
                ["l", -5.49, 0],
                ["l", -5.46, 0],
                ["l", -0.09, -0.06],
                ["l", -0.06, -0.09],
                ["l", 0, -2.19],
                ["l", 0, -2.19],
                ["z"]
            ],
            w: 11.25,
            h: 4.68
        },
        "rests.quarter": {
            d: [
                ["M", 1.89, -11.82],
                ["c", 0.12, -0.06, 0.24, -0.06, 0.36, -0.03],
                ["c", 0.09, 0.06, 4.74, 5.58, 4.86, 5.82],
                ["c", 0.21, 0.39, 0.15, 0.78, -0.15, 1.26],
                ["c", -0.24, 0.33, -0.72, 0.81, -1.62, 1.56],
                ["c", -0.45, 0.36, -0.87, 0.75, -0.96, 0.84],
                ["c", -0.93, 0.99, -1.14, 2.49, -0.6, 3.63],
                ["c", 0.18, 0.39, 0.27, 0.48, 1.32, 1.68],
                ["c", 1.92, 2.25, 1.83, 2.16, 1.83, 2.34],
                ["c", 0, 0.18, -0.18, 0.36, -0.36, 0.39],
                ["c", -0.15, 0, -0.27, -0.06, -0.48, -0.27],
                ["c", -0.75, -0.75, -2.46, -1.29, -3.39, -1.08],
                ["c", -0.45, 0.09, -0.69, 0.27, -0.9, 0.69],
                ["c", -0.12, 0.3, -0.21, 0.66, -0.24, 1.14],
                ["c", -0.03, 0.66, 0.09, 1.35, 0.3, 2.01],
                ["c", 0.15, 0.42, 0.24, 0.66, 0.45, 0.96],
                ["c", 0.18, 0.24, 0.18, 0.33, 0.03, 0.42],
                ["c", -0.12, 0.06, -0.18, 0.03, -0.45, -0.3],
                ["c", -1.08, -1.38, -2.07, -3.36, -2.4, -4.83],
                ["c", -0.27, -1.05, -0.15, -1.77, 0.27, -2.07],
                ["c", 0.21, -0.12, 0.42, -0.15, 0.87, -0.15],
                ["c", 0.87, 0.06, 2.1, 0.39, 3.3, 0.9],
                ["l", 0.39, 0.18],
                ["l", -1.65, -1.95],
                ["c", -2.52, -2.97, -2.61, -3.09, -2.7, -3.27],
                ["c", -0.09, -0.24, -0.12, -0.48, -0.03, -0.75],
                ["c", 0.15, -0.48, 0.57, -0.96, 1.83, -2.01],
                ["c", 0.45, -0.36, 0.84, -0.72, 0.93, -0.78],
                ["c", 0.69, -0.75, 1.02, -1.8, 0.9, -2.79],
                ["c", -0.06, -0.33, -0.21, -0.84, -0.39, -1.11],
                ["c", -0.09, -0.15, -0.45, -0.6, -0.81, -1.05],
                ["c", -0.36, -0.42, -0.69, -0.81, -0.72, -0.87],
                ["c", -0.09, -0.18, 0, -0.42, 0.21, -0.51],
                ["z"]
            ],
            w: 7.888,
            h: 21.435
        },
        "rests.8th": {
            d: [
                ["M", 1.68, -6.12],
                ["c", 0.66, -0.09, 1.23, 0.09, 1.68, 0.51],
                ["c", 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
                ["c", 0.09, 0.33, 0.18, 0.66, 0.21, 0.72],
                ["c", 0.12, 0.27, 0.33, 0.45, 0.6, 0.48],
                ["c", 0.12, 0, 0.18, 0, 0.33, -0.09],
                ["c", 0.39, -0.18, 1.32, -1.29, 1.68, -1.98],
                ["c", 0.09, -0.21, 0.24, -0.3, 0.39, -0.3],
                ["c", 0.12, 0, 0.27, 0.09, 0.33, 0.18],
                ["c", 0.03, 0.06, -0.27, 1.11, -1.86, 6.42],
                ["c", -1.02, 3.48, -1.89, 6.39, -1.92, 6.42],
                ["c", 0, 0.03, -0.12, 0.12, -0.24, 0.15],
                ["c", -0.18, 0.09, -0.21, 0.09, -0.45, 0.09],
                ["c", -0.24, 0, -0.3, 0, -0.48, -0.06],
                ["c", -0.09, -0.06, -0.21, -0.12, -0.21, -0.15],
                ["c", -0.06, -0.03, 0.15, -0.57, 1.68, -4.92],
                ["c", 0.96, -2.67, 1.74, -4.89, 1.71, -4.89],
                ["l", -0.51, 0.15],
                ["c", -1.08, 0.36, -1.74, 0.48, -2.55, 0.48],
                ["c", -0.66, 0, -0.84, -0.03, -1.32, -0.27],
                ["c", -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
                ["c", 0.33, -0.45, 0.84, -0.81, 1.38, -0.9],
                ["z"]
            ],
            w: 7.534,
            h: 13.883
        },
        "rests.16th": {
            d: [
                ["M", 3.33, -6.12],
                ["c", 0.66, -0.09, 1.23, 0.09, 1.68, 0.51],
                ["c", 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
                ["c", 0.09, 0.33, 0.18, 0.66, 0.21, 0.72],
                ["c", 0.15, 0.39, 0.57, 0.57, 0.87, 0.42],
                ["c", 0.39, -0.18, 1.2, -1.23, 1.62, -2.07],
                ["c", 0.06, -0.15, 0.24, -0.24, 0.36, -0.24],
                ["c", 0.12, 0, 0.27, 0.09, 0.33, 0.18],
                ["c", 0.03, 0.06, -0.45, 1.86, -2.67, 10.17],
                ["c", -1.5, 5.55, -2.73, 10.14, -2.76, 10.17],
                ["c", -0.03, 0.03, -0.12, 0.12, -0.24, 0.15],
                ["c", -0.18, 0.09, -0.21, 0.09, -0.45, 0.09],
                ["c", -0.24, 0, -0.3, 0, -0.48, -0.06],
                ["c", -0.09, -0.06, -0.21, -0.12, -0.21, -0.15],
                ["c", -0.06, -0.03, 0.12, -0.57, 1.44, -4.92],
                ["c", 0.81, -2.67, 1.47, -4.86, 1.47, -4.89],
                ["c", -0.03, 0, -0.27, 0.06, -0.54, 0.15],
                ["c", -1.08, 0.36, -1.77, 0.48, -2.58, 0.48],
                ["c", -0.66, 0, -0.84, -0.03, -1.32, -0.27],
                ["c", -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
                ["c", 0.72, -1.05, 2.22, -1.23, 3.06, -0.42],
                ["c", 0.3, 0.33, 0.42, 0.6, 0.6, 1.38],
                ["c", 0.09, 0.45, 0.21, 0.78, 0.33, 0.9],
                ["c", 0.09, 0.09, 0.27, 0.18, 0.45, 0.21],
                ["c", 0.12, 0, 0.18, 0, 0.33, -0.09],
                ["c", 0.33, -0.15, 1.02, -0.93, 1.41, -1.59],
                ["c", 0.12, -0.21, 0.18, -0.39, 0.39, -1.08],
                ["c", 0.66, -2.1, 1.17, -3.84, 1.17, -3.87],
                ["c", 0, 0, -0.21, 0.06, -0.42, 0.15],
                ["c", -0.51, 0.15, -1.2, 0.33, -1.68, 0.42],
                ["c", -0.33, 0.06, -0.51, 0.06, -0.96, 0.06],
                ["c", -0.66, 0, -0.84, -0.03, -1.32, -0.27],
                ["c", -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
                ["c", 0.33, -0.45, 0.84, -0.81, 1.38, -0.9],
                ["z"]
            ],
            w: 9.724,
            h: 21.383
        },
        "rests.32nd": {
            d: [
                ["M", 4.23, -13.62],
                ["c", 0.66, -0.09, 1.23, 0.09, 1.68, 0.51],
                ["c", 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
                ["c", 0.09, 0.33, 0.18, 0.66, 0.21, 0.72],
                ["c", 0.12, 0.27, 0.33, 0.45, 0.6, 0.48],
                ["c", 0.12, 0, 0.18, 0, 0.27, -0.06],
                ["c", 0.33, -0.21, 0.99, -1.11, 1.44, -1.98],
                ["c", 0.09, -0.24, 0.21, -0.33, 0.39, -0.33],
                ["c", 0.12, 0, 0.27, 0.09, 0.33, 0.18],
                ["c", 0.03, 0.06, -0.57, 2.67, -3.21, 13.89],
                ["c", -1.8, 7.62, -3.3, 13.89, -3.3, 13.92],
                ["c", -0.03, 0.06, -0.12, 0.12, -0.24, 0.18],
                ["c", -0.21, 0.09, -0.24, 0.09, -0.48, 0.09],
                ["c", -0.24, 0, -0.3, 0, -0.48, -0.06],
                ["c", -0.09, -0.06, -0.21, -0.12, -0.21, -0.15],
                ["c", -0.06, -0.03, 0.09, -0.57, 1.23, -4.92],
                ["c", 0.69, -2.67, 1.26, -4.86, 1.29, -4.89],
                ["c", 0, -0.03, -0.12, -0.03, -0.48, 0.12],
                ["c", -1.17, 0.39, -2.22, 0.57, -3, 0.54],
                ["c", -0.42, -0.03, -0.75, -0.12, -1.11, -0.3],
                ["c", -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
                ["c", 0.72, -1.05, 2.22, -1.23, 3.06, -0.42],
                ["c", 0.3, 0.33, 0.42, 0.6, 0.6, 1.38],
                ["c", 0.09, 0.45, 0.21, 0.78, 0.33, 0.9],
                ["c", 0.12, 0.09, 0.3, 0.18, 0.48, 0.21],
                ["c", 0.12, 0, 0.18, 0, 0.3, -0.09],
                ["c", 0.42, -0.21, 1.29, -1.29, 1.56, -1.89],
                ["c", 0.03, -0.12, 1.23, -4.59, 1.23, -4.65],
                ["c", 0, -0.03, -0.18, 0.03, -0.39, 0.12],
                ["c", -0.63, 0.18, -1.2, 0.36, -1.74, 0.45],
                ["c", -0.39, 0.06, -0.54, 0.06, -1.02, 0.06],
                ["c", -0.66, 0, -0.84, -0.03, -1.32, -0.27],
                ["c", -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
                ["c", 0.72, -1.05, 2.22, -1.23, 3.06, -0.42],
                ["c", 0.3, 0.33, 0.42, 0.6, 0.6, 1.38],
                ["c", 0.09, 0.45, 0.21, 0.78, 0.33, 0.9],
                ["c", 0.18, 0.18, 0.51, 0.27, 0.72, 0.15],
                ["c", 0.3, -0.12, 0.69, -0.57, 1.08, -1.17],
                ["c", 0.42, -0.6, 0.39, -0.51, 1.05, -3.03],
                ["c", 0.33, -1.26, 0.6, -2.31, 0.6, -2.34],
                ["c", 0, 0, -0.21, 0.03, -0.45, 0.12],
                ["c", -0.57, 0.18, -1.14, 0.33, -1.62, 0.42],
                ["c", -0.33, 0.06, -0.51, 0.06, -0.96, 0.06],
                ["c", -0.66, 0, -0.84, -0.03, -1.32, -0.27],
                ["c", -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
                ["c", 0.33, -0.45, 0.84, -0.81, 1.38, -0.9],
                ["z"]
            ],
            w: 11.373,
            h: 28.883
        },
        "rests.64th": {
            d: [
                ["M", 5.13, -13.62],
                ["c", 0.66, -0.09, 1.23, 0.09, 1.68, 0.51],
                ["c", 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
                ["c", 0.15, 0.63, 0.21, 0.81, 0.33, 0.96],
                ["c", 0.18, 0.21, 0.54, 0.3, 0.75, 0.18],
                ["c", 0.24, -0.12, 0.63, -0.66, 1.08, -1.56],
                ["c", 0.33, -0.66, 0.39, -0.72, 0.6, -0.72],
                ["c", 0.12, 0, 0.27, 0.09, 0.33, 0.18],
                ["c", 0.03, 0.06, -0.69, 3.66, -3.54, 17.64],
                ["c", -1.95, 9.66, -3.57, 17.61, -3.57, 17.64],
                ["c", -0.03, 0.06, -0.12, 0.12, -0.24, 0.18],
                ["c", -0.21, 0.09, -0.24, 0.09, -0.48, 0.09],
                ["c", -0.24, 0, -0.3, 0, -0.48, -0.06],
                ["c", -0.09, -0.06, -0.21, -0.12, -0.21, -0.15],
                ["c", -0.06, -0.03, 0.06, -0.57, 1.05, -4.95],
                ["c", 0.6, -2.7, 1.08, -4.89, 1.08, -4.92],
                ["c", 0, 0, -0.24, 0.06, -0.51, 0.15],
                ["c", -0.66, 0.24, -1.2, 0.36, -1.77, 0.48],
                ["c", -0.42, 0.06, -0.57, 0.06, -1.05, 0.06],
                ["c", -0.69, 0, -0.87, -0.03, -1.35, -0.27],
                ["c", -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
                ["c", 0.72, -1.05, 2.22, -1.23, 3.06, -0.42],
                ["c", 0.3, 0.33, 0.42, 0.6, 0.6, 1.38],
                ["c", 0.09, 0.45, 0.21, 0.78, 0.33, 0.9],
                ["c", 0.09, 0.09, 0.27, 0.18, 0.45, 0.21],
                ["c", 0.21, 0.03, 0.39, -0.09, 0.72, -0.42],
                ["c", 0.45, -0.45, 1.02, -1.26, 1.17, -1.65],
                ["c", 0.03, -0.09, 0.27, -1.14, 0.54, -2.34],
                ["c", 0.27, -1.2, 0.48, -2.19, 0.51, -2.22],
                ["c", 0, -0.03, -0.09, -0.03, -0.48, 0.12],
                ["c", -1.17, 0.39, -2.22, 0.57, -3, 0.54],
                ["c", -0.42, -0.03, -0.75, -0.12, -1.11, -0.3],
                ["c", -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
                ["c", 0.36, -0.54, 0.96, -0.87, 1.65, -0.93],
                ["c", 0.54, -0.03, 1.02, 0.15, 1.41, 0.54],
                ["c", 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
                ["c", 0.09, 0.33, 0.18, 0.66, 0.21, 0.72],
                ["c", 0.15, 0.39, 0.57, 0.57, 0.9, 0.42],
                ["c", 0.36, -0.18, 1.2, -1.26, 1.47, -1.89],
                ["c", 0.03, -0.09, 0.3, -1.2, 0.57, -2.43],
                ["l", 0.51, -2.28],
                ["l", -0.54, 0.18],
                ["c", -1.11, 0.36, -1.8, 0.48, -2.61, 0.48],
                ["c", -0.66, 0, -0.84, -0.03, -1.32, -0.27],
                ["c", -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
                ["c", 0.36, -0.54, 0.96, -0.87, 1.65, -0.93],
                ["c", 0.54, -0.03, 1.02, 0.15, 1.41, 0.54],
                ["c", 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
                ["c", 0.15, 0.63, 0.21, 0.81, 0.33, 0.96],
                ["c", 0.21, 0.21, 0.54, 0.3, 0.75, 0.18],
                ["c", 0.36, -0.18, 0.93, -0.93, 1.29, -1.68],
                ["c", 0.12, -0.24, 0.18, -0.48, 0.63, -2.55],
                ["l", 0.51, -2.31],
                ["c", 0, -0.03, -0.18, 0.03, -0.39, 0.12],
                ["c", -1.14, 0.36, -2.1, 0.54, -2.82, 0.51],
                ["c", -0.42, -0.03, -0.75, -0.12, -1.11, -0.3],
                ["c", -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
                ["c", 0.33, -0.45, 0.84, -0.81, 1.38, -0.9],
                ["z"]
            ],
            w: 12.453,
            h: 36.383
        },
        "rests.128th": {
            d: [
                ["M", 6.03, -21.12],
                ["c", 0.66, -0.09, 1.23, 0.09, 1.68, 0.51],
                ["c", 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
                ["c", 0.09, 0.33, 0.18, 0.66, 0.21, 0.72],
                ["c", 0.12, 0.27, 0.33, 0.45, 0.6, 0.48],
                ["c", 0.21, 0, 0.33, -0.06, 0.54, -0.36],
                ["c", 0.15, -0.21, 0.54, -0.93, 0.78, -1.47],
                ["c", 0.15, -0.33, 0.18, -0.39, 0.3, -0.48],
                ["c", 0.18, -0.09, 0.45, 0, 0.51, 0.15],
                ["c", 0.03, 0.09, -7.11, 42.75, -7.17, 42.84],
                ["c", -0.03, 0.03, -0.15, 0.09, -0.24, 0.15],
                ["c", -0.18, 0.06, -0.24, 0.06, -0.45, 0.06],
                ["c", -0.24, 0, -0.3, 0, -0.48, -0.06],
                ["c", -0.09, -0.06, -0.21, -0.12, -0.21, -0.15],
                ["c", -0.06, -0.03, 0.03, -0.57, 0.84, -4.98],
                ["c", 0.51, -2.7, 0.93, -4.92, 0.9, -4.92],
                ["c", 0, 0, -0.15, 0.06, -0.36, 0.12],
                ["c", -0.78, 0.27, -1.62, 0.48, -2.31, 0.57],
                ["c", -0.15, 0.03, -0.54, 0.03, -0.81, 0.03],
                ["c", -0.66, 0, -0.84, -0.03, -1.32, -0.27],
                ["c", -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
                ["c", 0.36, -0.54, 0.96, -0.87, 1.65, -0.93],
                ["c", 0.54, -0.03, 1.02, 0.15, 1.41, 0.54],
                ["c", 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
                ["c", 0.09, 0.33, 0.18, 0.66, 0.21, 0.72],
                ["c", 0.12, 0.27, 0.33, 0.45, 0.63, 0.48],
                ["c", 0.12, 0, 0.18, 0, 0.3, -0.09],
                ["c", 0.42, -0.21, 1.14, -1.11, 1.5, -1.83],
                ["c", 0.12, -0.27, 0.12, -0.27, 0.54, -2.52],
                ["c", 0.24, -1.23, 0.42, -2.25, 0.39, -2.25],
                ["c", 0, 0, -0.24, 0.06, -0.51, 0.18],
                ["c", -1.26, 0.39, -2.25, 0.57, -3.06, 0.54],
                ["c", -0.42, -0.03, -0.75, -0.12, -1.11, -0.3],
                ["c", -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
                ["c", 0.36, -0.54, 0.96, -0.87, 1.65, -0.93],
                ["c", 0.54, -0.03, 1.02, 0.15, 1.41, 0.54],
                ["c", 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
                ["c", 0.15, 0.63, 0.21, 0.81, 0.33, 0.96],
                ["c", 0.18, 0.21, 0.51, 0.3, 0.75, 0.18],
                ["c", 0.36, -0.15, 1.05, -0.99, 1.41, -1.77],
                ["l", 0.15, -0.3],
                ["l", 0.42, -2.25],
                ["c", 0.21, -1.26, 0.42, -2.28, 0.39, -2.28],
                ["l", -0.51, 0.15],
                ["c", -1.11, 0.39, -1.89, 0.51, -2.7, 0.51],
                ["c", -0.66, 0, -0.84, -0.03, -1.32, -0.27],
                ["c", -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
                ["c", 0.36, -0.54, 0.96, -0.87, 1.65, -0.93],
                ["c", 0.54, -0.03, 1.02, 0.15, 1.41, 0.54],
                ["c", 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
                ["c", 0.15, 0.63, 0.21, 0.81, 0.33, 0.96],
                ["c", 0.18, 0.18, 0.48, 0.27, 0.72, 0.21],
                ["c", 0.33, -0.12, 1.14, -1.26, 1.41, -1.95],
                ["c", 0, -0.09, 0.21, -1.11, 0.45, -2.34],
                ["c", 0.21, -1.2, 0.39, -2.22, 0.39, -2.28],
                ["c", 0.03, -0.03, 0, -0.03, -0.45, 0.12],
                ["c", -0.57, 0.18, -1.2, 0.33, -1.71, 0.42],
                ["c", -0.3, 0.06, -0.51, 0.06, -0.93, 0.06],
                ["c", -0.66, 0, -0.84, -0.03, -1.32, -0.27],
                ["c", -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
                ["c", 0.36, -0.54, 0.96, -0.87, 1.65, -0.93],
                ["c", 0.54, -0.03, 1.02, 0.15, 1.41, 0.54],
                ["c", 0.27, 0.3, 0.39, 0.54, 0.57, 1.26],
                ["c", 0.09, 0.33, 0.18, 0.66, 0.21, 0.72],
                ["c", 0.12, 0.27, 0.33, 0.45, 0.6, 0.48],
                ["c", 0.18, 0, 0.36, -0.09, 0.57, -0.33],
                ["c", 0.33, -0.36, 0.78, -1.14, 0.93, -1.56],
                ["c", 0.03, -0.12, 0.24, -1.2, 0.45, -2.4],
                ["c", 0.24, -1.2, 0.42, -2.22, 0.42, -2.28],
                ["c", 0.03, -0.03, 0, -0.03, -0.39, 0.09],
                ["c", -1.05, 0.36, -1.8, 0.48, -2.58, 0.48],
                ["c", -0.63, 0, -0.84, -0.03, -1.29, -0.27],
                ["c", -1.32, -0.63, -1.77, -2.16, -1.02, -3.3],
                ["c", 0.33, -0.45, 0.84, -0.81, 1.38, -0.9],
                ["z"]
            ],
            w: 12.992,
            h: 43.883
        },
        "accidentals.sharp": {
            d: [
                ["M", 5.73, -11.19],
                ["c", 0.21, -0.12, 0.54, -0.03, 0.66, 0.24],
                ["c", 0.06, 0.12, 0.06, 0.21, 0.06, 2.31],
                ["c", 0, 1.23, 0, 2.22, 0.03, 2.22],
                ["c", 0, 0, 0.27, -0.12, 0.6, -0.24],
                ["c", 0.69, -0.27, 0.78, -0.3, 0.96, -0.15],
                ["c", 0.21, 0.15, 0.21, 0.18, 0.21, 1.38],
                ["c", 0, 1.02, 0, 1.11, -0.06, 1.2],
                ["c", -0.03, 0.06, -0.09, 0.12, -0.12, 0.15],
                ["c", -0.06, 0.03, -0.42, 0.21, -0.84, 0.36],
                ["l", -0.75, 0.33],
                ["l", -0.03, 2.43],
                ["c", 0, 1.32, 0, 2.43, 0.03, 2.43],
                ["c", 0, 0, 0.27, -0.12, 0.6, -0.24],
                ["c", 0.69, -0.27, 0.78, -0.3, 0.96, -0.15],
                ["c", 0.21, 0.15, 0.21, 0.18, 0.21, 1.38],
                ["c", 0, 1.02, 0, 1.11, -0.06, 1.2],
                ["c", -0.03, 0.06, -0.09, 0.12, -0.12, 0.15],
                ["c", -0.06, 0.03, -0.42, 0.21, -0.84, 0.36],
                ["l", -0.75, 0.33],
                ["l", -0.03, 2.52],
                ["c", 0, 2.28, -0.03, 2.55, -0.06, 2.64],
                ["c", -0.21, 0.36, -0.72, 0.36, -0.93, 0],
                ["c", -0.03, -0.09, -0.06, -0.33, -0.06, -2.43],
                ["l", 0, -2.31],
                ["l", -1.29, 0.51],
                ["l", -1.26, 0.51],
                ["l", 0, 2.43],
                ["c", 0, 2.58, 0, 2.52, -0.15, 2.67],
                ["c", -0.06, 0.09, -0.27, 0.18, -0.36, 0.18],
                ["c", -0.12, 0, -0.33, -0.09, -0.39, -0.18],
                ["c", -0.15, -0.15, -0.15, -0.09, -0.15, -2.43],
                ["c", 0, -1.23, 0, -2.22, -0.03, -2.22],
                ["c", 0, 0, -0.27, 0.12, -0.6, 0.24],
                ["c", -0.69, 0.27, -0.78, 0.3, -0.96, 0.15],
                ["c", -0.21, -0.15, -0.21, -0.18, -0.21, -1.38],
                ["c", 0, -1.02, 0, -1.11, 0.06, -1.2],
                ["c", 0.03, -0.06, 0.09, -0.12, 0.12, -0.15],
                ["c", 0.06, -0.03, 0.42, -0.21, 0.84, -0.36],
                ["l", 0.78, -0.33],
                ["l", 0, -2.43],
                ["c", 0, -1.32, 0, -2.43, -0.03, -2.43],
                ["c", 0, 0, -0.27, 0.12, -0.6, 0.24],
                ["c", -0.69, 0.27, -0.78, 0.3, -0.96, 0.15],
                ["c", -0.21, -0.15, -0.21, -0.18, -0.21, -1.38],
                ["c", 0, -1.02, 0, -1.11, 0.06, -1.2],
                ["c", 0.03, -0.06, 0.09, -0.12, 0.12, -0.15],
                ["c", 0.06, -0.03, 0.42, -0.21, 0.84, -0.36],
                ["l", 0.78, -0.33],
                ["l", 0, -2.52],
                ["c", 0, -2.28, 0.03, -2.55, 0.06, -2.64],
                ["c", 0.21, -0.36, 0.72, -0.36, 0.93, 0],
                ["c", 0.03, 0.09, 0.06, 0.33, 0.06, 2.43],
                ["l", 0.03, 2.31],
                ["l", 1.26, -0.51],
                ["l", 1.26, -0.51],
                ["l", 0, -2.43],
                ["c", 0, -2.28, 0, -2.43, 0.06, -2.55],
                ["c", 0.06, -0.12, 0.12, -0.18, 0.27, -0.24],
                ["z"],
                ["m", -0.33, 10.65],
                ["l", 0, -2.43],
                ["l", -1.29, 0.51],
                ["l", -1.26, 0.51],
                ["l", 0, 2.46],
                ["l", 0, 2.43],
                ["l", 0.09, -0.03],
                ["c", 0.06, -0.03, 0.63, -0.27, 1.29, -0.51],
                ["l", 1.17, -0.48],
                ["l", 0, -2.46],
                ["z"]
            ],
            w: 8.25,
            h: 22.462
        },
        "accidentals.halfsharp": {
            d: [
                ["M", 2.43, -10.05],
                ["c", 0.21, -0.12, 0.54, -0.03, 0.66, 0.24],
                ["c", 0.06, 0.12, 0.06, 0.21, 0.06, 2.01],
                ["c", 0, 1.05, 0, 1.89, 0.03, 1.89],
                ["l", 0.72, -0.48],
                ["c", 0.69, -0.48, 0.69, -0.51, 0.87, -0.51],
                ["c", 0.15, 0, 0.18, 0.03, 0.27, 0.09],
                ["c", 0.21, 0.15, 0.21, 0.18, 0.21, 1.41],
                ["c", 0, 1.11, -0.03, 1.14, -0.09, 1.23],
                ["c", -0.03, 0.03, -0.48, 0.39, -1.02, 0.75],
                ["l", -0.99, 0.66],
                ["l", 0, 2.37],
                ["c", 0, 1.32, 0, 2.37, 0.03, 2.37],
                ["l", 0.72, -0.48],
                ["c", 0.69, -0.48, 0.69, -0.51, 0.87, -0.51],
                ["c", 0.15, 0, 0.18, 0.03, 0.27, 0.09],
                ["c", 0.21, 0.15, 0.21, 0.18, 0.21, 1.41],
                ["c", 0, 1.11, -0.03, 1.14, -0.09, 1.23],
                ["c", -0.03, 0.03, -0.48, 0.39, -1.02, 0.75],
                ["l", -0.99, 0.66],
                ["l", 0, 2.25],
                ["c", 0, 1.95, 0, 2.28, -0.06, 2.37],
                ["c", -0.06, 0.12, -0.12, 0.21, -0.24, 0.27],
                ["c", -0.27, 0.12, -0.54, 0.03, -0.69, -0.24],
                ["c", -0.06, -0.12, -0.06, -0.21, -0.06, -2.01],
                ["c", 0, -1.05, 0, -1.89, -0.03, -1.89],
                ["l", -0.72, 0.48],
                ["c", -0.69, 0.48, -0.69, 0.48, -0.87, 0.48],
                ["c", -0.15, 0, -0.18, 0, -0.27, -0.06],
                ["c", -0.21, -0.15, -0.21, -0.18, -0.21, -1.41],
                ["c", 0, -1.11, 0.03, -1.14, 0.09, -1.23],
                ["c", 0.03, -0.03, 0.48, -0.39, 1.02, -0.75],
                ["l", 0.99, -0.66],
                ["l", 0, -2.37],
                ["c", 0, -1.32, 0, -2.37, -0.03, -2.37],
                ["l", -0.72, 0.48],
                ["c", -0.69, 0.48, -0.69, 0.48, -0.87, 0.48],
                ["c", -0.15, 0, -0.18, 0, -0.27, -0.06],
                ["c", -0.21, -0.15, -0.21, -0.18, -0.21, -1.41],
                ["c", 0, -1.11, 0.03, -1.14, 0.09, -1.23],
                ["c", 0.03, -0.03, 0.48, -0.39, 1.02, -0.75],
                ["l", 0.99, -0.66],
                ["l", 0, -2.25],
                ["c", 0, -2.13, 0, -2.28, 0.06, -2.4],
                ["c", 0.06, -0.12, 0.12, -0.18, 0.27, -0.24],
                ["z"]
            ],
            w: 5.25,
            h: 20.174
        },
        "accidentals.nat": {
            d: [
                ["M", 0.21, -11.4],
                ["c", 0.24, -0.06, 0.78, 0, 0.99, 0.15],
                ["c", 0.03, 0.03, 0.03, 0.48, 0, 2.61],
                ["c", -0.03, 1.44, -0.03, 2.61, -0.03, 2.61],
                ["c", 0, 0.03, 0.75, -0.09, 1.68, -0.24],
                ["c", 0.96, -0.18, 1.71, -0.27, 1.74, -0.27],
                ["c", 0.15, 0.03, 0.27, 0.15, 0.36, 0.3],
                ["l", 0.06, 0.12],
                ["l", 0.09, 8.67],
                ["c", 0.09, 6.96, 0.12, 8.67, 0.09, 8.67],
                ["c", -0.03, 0.03, -0.12, 0.06, -0.21, 0.09],
                ["c", -0.24, 0.09, -0.72, 0.09, -0.96, 0],
                ["c", -0.09, -0.03, -0.18, -0.06, -0.21, -0.09],
                ["c", -0.03, -0.03, -0.03, -0.48, 0, -2.61],
                ["c", 0.03, -1.44, 0.03, -2.61, 0.03, -2.61],
                ["c", 0, -0.03, -0.75, 0.09, -1.68, 0.24],
                ["c", -0.96, 0.18, -1.71, 0.27, -1.74, 0.27],
                ["c", -0.15, -0.03, -0.27, -0.15, -0.36, -0.3],
                ["l", -0.06, -0.15],
                ["l", -0.09, -7.53],
                ["c", -0.06, -4.14, -0.09, -8.04, -0.12, -8.67],
                ["l", 0, -1.11],
                ["l", 0.15, -0.06],
                ["c", 0.09, -0.03, 0.21, -0.06, 0.27, -0.09],
                ["z"],
                ["m", 3.75, 8.4],
                ["c", 0, -0.33, 0, -0.42, -0.03, -0.42],
                ["c", -0.12, 0, -2.79, 0.45, -2.79, 0.48],
                ["c", -0.03, 0, -0.09, 6.3, -0.09, 6.33],
                ["c", 0.03, 0, 2.79, -0.45, 2.82, -0.48],
                ["c", 0, 0, 0.09, -4.53, 0.09, -5.91],
                ["z"]
            ],
            w: 5.4,
            h: 22.8
        },
        "accidentals.flat": {
            d: [
                ["M", -0.36, -14.07],
                ["c", 0.33, -0.06, 0.87, 0, 1.08, 0.15],
                ["c", 0.06, 0.03, 0.06, 0.36, -0.03, 5.25],
                ["c", -0.06, 2.85, -0.09, 5.19, -0.09, 5.19],
                ["c", 0, 0.03, 0.12, -0.03, 0.24, -0.12],
                ["c", 0.63, -0.42, 1.41, -0.66, 2.19, -0.72],
                ["c", 0.81, -0.03, 1.47, 0.21, 2.04, 0.78],
                ["c", 0.57, 0.54, 0.87, 1.26, 0.93, 2.04],
                ["c", 0.03, 0.57, -0.09, 1.08, -0.36, 1.62],
                ["c", -0.42, 0.81, -1.02, 1.38, -2.82, 2.61],
                ["c", -1.14, 0.78, -1.44, 1.02, -1.8, 1.44],
                ["c", -0.18, 0.18, -0.39, 0.39, -0.45, 0.42],
                ["c", -0.27, 0.18, -0.57, 0.15, -0.81, -0.06],
                ["c", -0.06, -0.09, -0.12, -0.18, -0.15, -0.27],
                ["c", -0.03, -0.06, -0.09, -3.27, -0.18, -8.34],
                ["c", -0.09, -4.53, -0.15, -8.58, -0.18, -9.03],
                ["l", 0, -0.78],
                ["l", 0.12, -0.06],
                ["c", 0.06, -0.03, 0.18, -0.09, 0.27, -0.12],
                ["z"],
                ["m", 3.18, 11.01],
                ["c", -0.21, -0.12, -0.54, -0.15, -0.81, -0.06],
                ["c", -0.54, 0.15, -0.99, 0.63, -1.17, 1.26],
                ["c", -0.06, 0.3, -0.12, 2.88, -0.06, 3.87],
                ["c", 0.03, 0.42, 0.03, 0.81, 0.06, 0.9],
                ["l", 0.03, 0.12],
                ["l", 0.45, -0.39],
                ["c", 0.63, -0.54, 1.26, -1.17, 1.56, -1.59],
                ["c", 0.3, -0.42, 0.6, -0.99, 0.72, -1.41],
                ["c", 0.18, -0.69, 0.09, -1.47, -0.18, -2.07],
                ["c", -0.15, -0.3, -0.33, -0.51, -0.6, -0.63],
                ["z"]
            ],
            w: 6.75,
            h: 18.801
        },
        "accidentals.halfflat": {
            d: [
                ["M", 4.83, -14.07],
                ["c", 0.33, -0.06, 0.87, 0, 1.08, 0.15],
                ["c", 0.06, 0.03, 0.06, 0.6, -0.12, 9.06],
                ["c", -0.09, 5.55, -0.15, 9.06, -0.18, 9.12],
                ["c", -0.03, 0.09, -0.09, 0.18, -0.15, 0.27],
                ["c", -0.24, 0.21, -0.54, 0.24, -0.81, 0.06],
                ["c", -0.06, -0.03, -0.27, -0.24, -0.45, -0.42],
                ["c", -0.36, -0.42, -0.66, -0.66, -1.8, -1.44],
                ["c", -1.23, -0.84, -1.83, -1.32, -2.25, -1.77],
                ["c", -0.66, -0.78, -0.96, -1.56, -0.93, -2.46],
                ["c", 0.09, -1.41, 1.11, -2.58, 2.4, -2.79],
                ["c", 0.3, -0.06, 0.84, -0.03, 1.23, 0.06],
                ["c", 0.54, 0.12, 1.08, 0.33, 1.53, 0.63],
                ["c", 0.12, 0.09, 0.24, 0.15, 0.24, 0.12],
                ["c", 0, 0, -0.12, -8.37, -0.18, -9.75],
                ["l", 0, -0.66],
                ["l", 0.12, -0.06],
                ["c", 0.06, -0.03, 0.18, -0.09, 0.27, -0.12],
                ["z"],
                ["m", -1.65, 10.95],
                ["c", -0.6, -0.18, -1.08, 0.09, -1.38, 0.69],
                ["c", -0.27, 0.6, -0.36, 1.38, -0.18, 2.07],
                ["c", 0.12, 0.42, 0.42, 0.99, 0.72, 1.41],
                ["c", 0.3, 0.42, 0.93, 1.05, 1.56, 1.59],
                ["l", 0.48, 0.39],
                ["l", 0, -0.12],
                ["c", 0.03, -0.09, 0.03, -0.48, 0.06, -0.9],
                ["c", 0.03, -0.57, 0.03, -1.08, 0, -2.22],
                ["c", -0.03, -1.62, -0.03, -1.62, -0.24, -2.07],
                ["c", -0.21, -0.42, -0.6, -0.75, -1.02, -0.84],
                ["z"]
            ],
            w: 6.728,
            h: 18.801
        },
        "accidentals.dblflat": {
            d: [
                ["M", -0.36, -14.07],
                ["c", 0.33, -0.06, 0.87, 0, 1.08, 0.15],
                ["c", 0.06, 0.03, 0.06, 0.33, -0.03, 4.89],
                ["c", -0.06, 2.67, -0.09, 5.01, -0.09, 5.22],
                ["l", 0, 0.36],
                ["l", 0.15, -0.15],
                ["c", 0.36, -0.3, 0.75, -0.51, 1.2, -0.63],
                ["c", 0.33, -0.09, 0.96, -0.09, 1.26, -0.03],
                ["c", 0.27, 0.09, 0.63, 0.27, 0.87, 0.45],
                ["l", 0.21, 0.15],
                ["l", 0, -0.27],
                ["c", 0, -0.15, -0.03, -2.43, -0.09, -5.1],
                ["c", -0.09, -4.56, -0.09, -4.86, -0.03, -4.89],
                ["c", 0.15, -0.12, 0.39, -0.15, 0.72, -0.15],
                ["c", 0.3, 0, 0.54, 0.03, 0.69, 0.15],
                ["c", 0.06, 0.03, 0.06, 0.33, -0.03, 4.95],
                ["c", -0.06, 2.7, -0.09, 5.04, -0.09, 5.22],
                ["l", 0.03, 0.3],
                ["l", 0.21, -0.15],
                ["c", 0.69, -0.48, 1.44, -0.69, 2.28, -0.69],
                ["c", 0.51, 0, 0.78, 0.03, 1.2, 0.21],
                ["c", 1.32, 0.63, 2.01, 2.28, 1.53, 3.69],
                ["c", -0.21, 0.57, -0.51, 1.02, -1.05, 1.56],
                ["c", -0.42, 0.42, -0.81, 0.72, -1.92, 1.5],
                ["c", -1.26, 0.87, -1.5, 1.08, -1.86, 1.5],
                ["c", -0.39, 0.45, -0.54, 0.54, -0.81, 0.51],
                ["c", -0.18, 0, -0.21, 0, -0.33, -0.06],
                ["l", -0.21, -0.21],
                ["l", -0.06, -0.12],
                ["l", -0.03, -0.99],
                ["c", -0.03, -0.54, -0.03, -1.29, -0.06, -1.68],
                ["l", 0, -0.69],
                ["l", -0.21, 0.24],
                ["c", -0.36, 0.42, -0.75, 0.75, -1.8, 1.62],
                ["c", -1.02, 0.84, -1.2, 0.99, -1.44, 1.38],
                ["c", -0.36, 0.51, -0.54, 0.6, -0.9, 0.51],
                ["c", -0.15, -0.03, -0.39, -0.27, -0.42, -0.42],
                ["c", -0.03, -0.06, -0.09, -3.27, -0.18, -8.34],
                ["c", -0.09, -4.53, -0.15, -8.58, -0.18, -9.03],
                ["l", 0, -0.78],
                ["l", 0.12, -0.06],
                ["c", 0.06, -0.03, 0.18, -0.09, 0.27, -0.12],
                ["z"],
                ["m", 2.52, 10.98],
                ["c", -0.18, -0.09, -0.48, -0.12, -0.66, -0.06],
                ["c", -0.39, 0.15, -0.69, 0.54, -0.84, 1.14],
                ["c", -0.06, 0.24, -0.06, 0.39, -0.09, 1.74],
                ["c", -0.03, 1.44, 0, 2.73, 0.06, 3.18],
                ["l", 0.03, 0.15],
                ["l", 0.27, -0.27],
                ["c", 0.93, -0.96, 1.5, -1.95, 1.74, -3.06],
                ["c", 0.06, -0.27, 0.06, -0.39, 0.06, -0.96],
                ["c", 0, -0.54, 0, -0.69, -0.06, -0.93],
                ["c", -0.09, -0.51, -0.27, -0.81, -0.51, -0.93],
                ["z"],
                ["m", 5.43, 0],
                ["c", -0.18, -0.09, -0.51, -0.12, -0.72, -0.06],
                ["c", -0.54, 0.12, -0.96, 0.63, -1.17, 1.26],
                ["c", -0.06, 0.3, -0.12, 2.88, -0.06, 3.9],
                ["c", 0.03, 0.42, 0.03, 0.81, 0.06, 0.9],
                ["l", 0.03, 0.12],
                ["l", 0.36, -0.3],
                ["c", 0.42, -0.36, 1.02, -0.96, 1.29, -1.29],
                ["c", 0.36, -0.45, 0.66, -0.99, 0.81, -1.41],
                ["c", 0.42, -1.23, 0.15, -2.76, -0.6, -3.12],
                ["z"]
            ],
            w: 11.613,
            h: 18.804
        },
        "accidentals.dblsharp": {
            d: [
                ["M", -0.18, -3.96],
                ["c", 0.06, -0.03, 0.12, -0.06, 0.15, -0.06],
                ["c", 0.09, 0, 2.76, 0.27, 2.79, 0.3],
                ["c", 0.12, 0.03, 0.15, 0.12, 0.15, 0.51],
                ["c", 0.06, 0.96, 0.24, 1.59, 0.57, 2.1],
                ["c", 0.06, 0.09, 0.15, 0.21, 0.18, 0.24],
                ["l", 0.09, 0.06],
                ["l", 0.09, -0.06],
                ["c", 0.03, -0.03, 0.12, -0.15, 0.18, -0.24],
                ["c", 0.33, -0.51, 0.51, -1.14, 0.57, -2.1],
                ["c", 0, -0.39, 0.03, -0.45, 0.12, -0.51],
                ["c", 0.03, 0, 0.66, -0.09, 1.44, -0.15],
                ["c", 1.47, -0.15, 1.5, -0.15, 1.56, -0.03],
                ["c", 0.03, 0.06, 0, 0.42, -0.09, 1.44],
                ["c", -0.09, 0.72, -0.15, 1.35, -0.15, 1.38],
                ["c", 0, 0.03, -0.03, 0.09, -0.06, 0.12],
                ["c", -0.06, 0.06, -0.12, 0.09, -0.51, 0.09],
                ["c", -1.08, 0.06, -1.8, 0.3, -2.28, 0.75],
                ["l", -0.12, 0.09],
                ["l", 0.09, 0.09],
                ["c", 0.12, 0.15, 0.39, 0.33, 0.63, 0.45],
                ["c", 0.42, 0.18, 0.96, 0.27, 1.68, 0.33],
                ["c", 0.39, 0, 0.45, 0.03, 0.51, 0.09],
                ["c", 0.03, 0.03, 0.06, 0.09, 0.06, 0.12],
                ["c", 0, 0.03, 0.06, 0.66, 0.15, 1.38],
                ["c", 0.09, 1.02, 0.12, 1.38, 0.09, 1.44],
                ["c", -0.06, 0.12, -0.09, 0.12, -1.56, -0.03],
                ["c", -0.78, -0.06, -1.41, -0.15, -1.44, -0.15],
                ["c", -0.09, -0.06, -0.12, -0.12, -0.12, -0.54],
                ["c", -0.06, -0.93, -0.24, -1.56, -0.57, -2.07],
                ["c", -0.06, -0.09, -0.15, -0.21, -0.18, -0.24],
                ["l", -0.09, -0.06],
                ["l", -0.09, 0.06],
                ["c", -0.03, 0.03, -0.12, 0.15, -0.18, 0.24],
                ["c", -0.33, 0.51, -0.51, 1.14, -0.57, 2.07],
                ["c", 0, 0.42, -0.03, 0.48, -0.12, 0.54],
                ["c", -0.03, 0, -0.66, 0.09, -1.44, 0.15],
                ["c", -1.47, 0.15, -1.5, 0.15, -1.56, 0.03],
                ["c", -0.03, -0.06, 0, -0.42, 0.09, -1.44],
                ["c", 0.09, -0.72, 0.15, -1.35, 0.15, -1.38],
                ["c", 0, -0.03, 0.03, -0.09, 0.06, -0.12],
                ["c", 0.06, -0.06, 0.12, -0.09, 0.51, -0.09],
                ["c", 0.72, -0.06, 1.26, -0.15, 1.68, -0.33],
                ["c", 0.24, -0.12, 0.51, -0.3, 0.63, -0.45],
                ["l", 0.09, -0.09],
                ["l", -0.12, -0.09],
                ["c", -0.48, -0.45, -1.2, -0.69, -2.28, -0.75],
                ["c", -0.39, 0, -0.45, -0.03, -0.51, -0.09],
                ["c", -0.03, -0.03, -0.06, -0.09, -0.06, -0.12],
                ["c", 0, -0.03, -0.06, -0.63, -0.12, -1.38],
                ["c", -0.09, -0.72, -0.15, -1.35, -0.15, -1.38],
                ["z"]
            ],
            w: 7.95,
            h: 7.977
        },
        "dots.dot": {
            d: [
                ["M", 1.32, -1.68],
                ["c", 0.09, -0.03, 0.27, -0.06, 0.39, -0.06],
                ["c", 0.96, 0, 1.74, 0.78, 1.74, 1.71],
                ["c", 0, 0.96, -0.78, 1.74, -1.71, 1.74],
                ["c", -0.96, 0, -1.74, -0.78, -1.74, -1.71],
                ["c", 0, -0.78, 0.54, -1.5, 1.32, -1.68],
                ["z"]
            ],
            w: 3.45,
            h: 3.45
        },
        "noteheads.dbl": {
            d: [
                ["M", -0.69, -4.02],
                ["c", 0.18, -0.09, 0.36, -0.09, 0.54, 0],
                ["c", 0.18, 0.09, 0.24, 0.15, 0.33, 0.3],
                ["c", 0.06, 0.15, 0.06, 0.18, 0.06, 1.41],
                ["l", 0, 1.23],
                ["l", 0.12, -0.18],
                ["c", 0.72, -1.26, 2.64, -2.31, 4.86, -2.64],
                ["c", 0.81, -0.15, 1.11, -0.15, 2.13, -0.15],
                ["c", 0.99, 0, 1.29, 0, 2.1, 0.15],
                ["c", 0.75, 0.12, 1.38, 0.27, 2.04, 0.54],
                ["c", 1.35, 0.51, 2.34, 1.26, 2.82, 2.1],
                ["l", 0.12, 0.18],
                ["l", 0, -1.23],
                ["c", 0, -1.2, 0, -1.26, 0.06, -1.38],
                ["c", 0.09, -0.18, 0.15, -0.24, 0.33, -0.33],
                ["c", 0.18, -0.09, 0.36, -0.09, 0.54, 0],
                ["c", 0.18, 0.09, 0.24, 0.15, 0.33, 0.3],
                ["l", 0.06, 0.15],
                ["l", 0, 3.54],
                ["l", 0, 3.54],
                ["l", -0.06, 0.15],
                ["c", -0.09, 0.18, -0.15, 0.24, -0.33, 0.33],
                ["c", -0.18, 0.09, -0.36, 0.09, -0.54, 0],
                ["c", -0.18, -0.09, -0.24, -0.15, -0.33, -0.33],
                ["c", -0.06, -0.12, -0.06, -0.18, -0.06, -1.38],
                ["l", 0, -1.23],
                ["l", -0.12, 0.18],
                ["c", -0.48, 0.84, -1.47, 1.59, -2.82, 2.1],
                ["c", -0.84, 0.33, -1.71, 0.54, -2.85, 0.66],
                ["c", -0.45, 0.06, -2.16, 0.06, -2.61, 0],
                ["c", -1.14, -0.12, -2.01, -0.33, -2.85, -0.66],
                ["c", -1.35, -0.51, -2.34, -1.26, -2.82, -2.1],
                ["l", -0.12, -0.18],
                ["l", 0, 1.23],
                ["c", 0, 1.23, 0, 1.26, -0.06, 1.38],
                ["c", -0.09, 0.18, -0.15, 0.24, -0.33, 0.33],
                ["c", -0.18, 0.09, -0.36, 0.09, -0.54, 0],
                ["c", -0.18, -0.09, -0.24, -0.15, -0.33, -0.33],
                ["l", -0.06, -0.15],
                ["l", 0, -3.54],
                ["c", 0, -3.48, 0, -3.54, 0.06, -3.66],
                ["c", 0.09, -0.18, 0.15, -0.24, 0.33, -0.33],
                ["z"],
                ["m", 7.71, 0.63],
                ["c", -0.36, -0.06, -0.9, -0.06, -1.14, 0],
                ["c", -0.3, 0.03, -0.66, 0.24, -0.87, 0.42],
                ["c", -0.6, 0.54, -0.9, 1.62, -0.75, 2.82],
                ["c", 0.12, 0.93, 0.51, 1.68, 1.11, 2.31],
                ["c", 0.75, 0.72, 1.83, 1.2, 2.85, 1.26],
                ["c", 1.05, 0.06, 1.83, -0.54, 2.1, -1.65],
                ["c", 0.21, -0.9, 0.12, -1.95, -0.24, -2.82],
                ["c", -0.36, -0.81, -1.08, -1.53, -1.95, -1.95],
                ["c", -0.3, -0.15, -0.78, -0.3, -1.11, -0.39],
                ["z"]
            ],
            w: 16.83,
            h: 8.145
        },
        "noteheads.whole": {
            d: [
                ["M", 6.51, -4.05],
                ["c", 0.51, -0.03, 2.01, 0, 2.52, 0.03],
                ["c", 1.41, 0.18, 2.64, 0.51, 3.72, 1.08],
                ["c", 1.2, 0.63, 1.95, 1.41, 2.19, 2.31],
                ["c", 0.09, 0.33, 0.09, 0.9, 0, 1.23],
                ["c", -0.24, 0.9, -0.99, 1.68, -2.19, 2.31],
                ["c", -1.08, 0.57, -2.28, 0.9, -3.75, 1.08],
                ["c", -0.66, 0.06, -2.31, 0.06, -2.97, 0],
                ["c", -1.47, -0.18, -2.67, -0.51, -3.75, -1.08],
                ["c", -1.2, -0.63, -1.95, -1.41, -2.19, -2.31],
                ["c", -0.09, -0.33, -0.09, -0.9, 0, -1.23],
                ["c", 0.24, -0.9, 0.99, -1.68, 2.19, -2.31],
                ["c", 1.2, -0.63, 2.61, -0.99, 4.23, -1.11],
                ["z"],
                ["m", 0.57, 0.66],
                ["c", -0.87, -0.15, -1.53, 0, -2.04, 0.51],
                ["c", -0.15, 0.15, -0.24, 0.27, -0.33, 0.48],
                ["c", -0.24, 0.51, -0.36, 1.08, -0.33, 1.77],
                ["c", 0.03, 0.69, 0.18, 1.26, 0.42, 1.77],
                ["c", 0.6, 1.17, 1.74, 1.98, 3.18, 2.22],
                ["c", 1.11, 0.21, 1.95, -0.15, 2.34, -0.99],
                ["c", 0.24, -0.51, 0.36, -1.08, 0.33, -1.8],
                ["c", -0.06, -1.11, -0.45, -2.04, -1.17, -2.76],
                ["c", -0.63, -0.63, -1.47, -1.05, -2.4, -1.2],
                ["z"]
            ],
            w: 14.985,
            h: 8.097
        },
        "noteheads.half": {
            d: [
                ["M", 7.44, -4.05],
                ["c", 0.06, -0.03, 0.27, -0.03, 0.48, -0.03],
                ["c", 1.05, 0, 1.71, 0.24, 2.1, 0.81],
                ["c", 0.42, 0.6, 0.45, 1.35, 0.18, 2.4],
                ["c", -0.42, 1.59, -1.14, 2.73, -2.16, 3.39],
                ["c", -1.41, 0.93, -3.18, 1.44, -5.4, 1.53],
                ["c", -1.17, 0.03, -1.89, -0.21, -2.28, -0.81],
                ["c", -0.42, -0.6, -0.45, -1.35, -0.18, -2.4],
                ["c", 0.42, -1.59, 1.14, -2.73, 2.16, -3.39],
                ["c", 0.63, -0.42, 1.23, -0.72, 1.98, -0.96],
                ["c", 0.9, -0.3, 1.65, -0.42, 3.12, -0.54],
                ["z"],
                ["m", 1.29, 0.87],
                ["c", -0.27, -0.09, -0.63, -0.12, -0.9, -0.03],
                ["c", -0.72, 0.24, -1.53, 0.69, -3.27, 1.8],
                ["c", -2.34, 1.5, -3.3, 2.25, -3.57, 2.79],
                ["c", -0.36, 0.72, -0.06, 1.5, 0.66, 1.77],
                ["c", 0.24, 0.12, 0.69, 0.09, 0.99, 0],
                ["c", 0.84, -0.3, 1.92, -0.93, 4.14, -2.37],
                ["c", 1.62, -1.08, 2.37, -1.71, 2.61, -2.19],
                ["c", 0.36, -0.72, 0.06, -1.5, -0.66, -1.77],
                ["z"]
            ],
            w: 10.37,
            h: 8.132
        },
        "noteheads.quarter": {
            d: [
                ["M", 6.09, -4.05],
                ["c", 0.36, -0.03, 1.2, 0, 1.53, 0.06],
                ["c", 1.17, 0.24, 1.89, 0.84, 2.16, 1.83],
                ["c", 0.06, 0.18, 0.06, 0.3, 0.06, 0.66],
                ["c", 0, 0.45, 0, 0.63, -0.15, 1.08],
                ["c", -0.66, 2.04, -3.06, 3.93, -5.52, 4.38],
                ["c", -0.54, 0.09, -1.44, 0.09, -1.83, 0.03],
                ["c", -1.23, -0.27, -1.98, -0.87, -2.25, -1.86],
                ["c", -0.06, -0.18, -0.06, -0.3, -0.06, -0.66],
                ["c", 0, -0.45, 0, -0.63, 0.15, -1.08],
                ["c", 0.24, -0.78, 0.75, -1.53, 1.44, -2.22],
                ["c", 1.2, -1.2, 2.85, -2.01, 4.47, -2.22],
                ["z"]
            ],
            w: 9.81,
            h: 8.094
        },
        "noteheads.slash.nostem": {
            d: [
                ["M", 9.3, -7.77],
                ["c", 0.06, -0.06, 0.18, -0.06, 1.71, -0.06],
                ["l", 1.65, 0],
                ["l", 0.09, 0.09],
                ["c", 0.06, 0.06, 0.06, 0.09, 0.06, 0.15],
                ["c", -0.03, 0.12, -9.21, 15.24, -9.3, 15.33],
                ["c", -0.06, 0.06, -0.18, 0.06, -1.71, 0.06],
                ["l", -1.65, 0],
                ["l", -0.09, -0.09],
                ["c", -0.06, -0.06, -0.06, -0.09, -0.06, -0.15],
                ["c", 0.03, -0.12, 9.21, -15.24, 9.3, -15.33],
                ["z"]
            ],
            w: 12.81,
            h: 15.63
        },
        "noteheads.indeterminate": {
            d: [
                ["M", 0.78, -4.05],
                ["c", 0.12, -0.03, 0.24, -0.03, 0.36, 0.03],
                ["c", 0.03, 0.03, 0.93, 0.72, 1.95, 1.56],
                ["l", 1.86, 1.5],
                ["l", 1.86, -1.5],
                ["c", 1.02, -0.84, 1.92, -1.53, 1.95, -1.56],
                ["c", 0.21, -0.12, 0.33, -0.09, 0.75, 0.24],
                ["c", 0.3, 0.27, 0.36, 0.36, 0.36, 0.54],
                ["c", 0, 0.03, -0.03, 0.12, -0.06, 0.18],
                ["c", -0.03, 0.06, -0.9, 0.75, -1.89, 1.56],
                ["l", -1.8, 1.47],
                ["c", 0, 0.03, 0.81, 0.69, 1.8, 1.5],
                ["c", 0.99, 0.81, 1.86, 1.5, 1.89, 1.56],
                ["c", 0.03, 0.06, 0.06, 0.15, 0.06, 0.18],
                ["c", 0, 0.18, -0.06, 0.27, -0.36, 0.54],
                ["c", -0.42, 0.33, -0.54, 0.36, -0.75, 0.24],
                ["c", -0.03, -0.03, -0.93, -0.72, -1.95, -1.56],
                ["l", -1.86, -1.5],
                ["l", -1.86, 1.5],
                ["c", -1.02, 0.84, -1.92, 1.53, -1.95, 1.56],
                ["c", -0.21, 0.12, -0.33, 0.09, -0.75, -0.24],
                ["c", -0.3, -0.27, -0.36, -0.36, -0.36, -0.54],
                ["c", 0, -0.03, 0.03, -0.12, 0.06, -0.18],
                ["c", 0.03, -0.06, 0.9, -0.75, 1.89, -1.56],
                ["l", 1.8, -1.47],
                ["c", 0, -0.03, -0.81, -0.69, -1.8, -1.5],
                ["c", -0.99, -0.81, -1.86, -1.5, -1.89, -1.56],
                ["c", -0.06, -0.12, -0.09, -0.21, -0.03, -0.36],
                ["c", 0.03, -0.09, 0.57, -0.57, 0.72, -0.63],
                ["z"]
            ],
            w: 9.843,
            h: 8.139
        },
        "scripts.ufermata": {
            d: [
                ["M", -0.75, -10.77],
                ["c", 0.12, 0, 0.45, -0.03, 0.69, -0.03],
                ["c", 2.91, -0.03, 5.55, 1.53, 7.41, 4.35],
                ["c", 1.17, 1.71, 1.95, 3.72, 2.43, 6.03],
                ["c", 0.12, 0.51, 0.12, 0.57, 0.03, 0.69],
                ["c", -0.12, 0.21, -0.48, 0.27, -0.69, 0.12],
                ["c", -0.12, -0.09, -0.18, -0.24, -0.27, -0.69],
                ["c", -0.78, -3.63, -3.42, -6.54, -6.78, -7.38],
                ["c", -0.78, -0.21, -1.2, -0.24, -2.07, -0.24],
                ["c", -0.63, 0, -0.84, 0, -1.2, 0.06],
                ["c", -1.83, 0.27, -3.42, 1.08, -4.8, 2.37],
                ["c", -1.41, 1.35, -2.4, 3.21, -2.85, 5.19],
                ["c", -0.09, 0.45, -0.15, 0.6, -0.27, 0.69],
                ["c", -0.21, 0.15, -0.57, 0.09, -0.69, -0.12],
                ["c", -0.09, -0.12, -0.09, -0.18, 0.03, -0.69],
                ["c", 0.33, -1.62, 0.78, -3, 1.47, -4.38],
                ["c", 1.77, -3.54, 4.44, -5.67, 7.56, -5.97],
                ["z"],
                ["m", 0.33, 7.47],
                ["c", 1.38, -0.3, 2.58, 0.9, 2.31, 2.25],
                ["c", -0.15, 0.72, -0.78, 1.35, -1.47, 1.5],
                ["c", -1.38, 0.27, -2.58, -0.93, -2.31, -2.31],
                ["c", 0.15, -0.69, 0.78, -1.29, 1.47, -1.44],
                ["z"]
            ],
            w: 19.748,
            h: 11.289
        },
        "scripts.dfermata": {
            d: [
                ["M", -9.63, -0.42],
                ["c", 0.15, -0.09, 0.36, -0.06, 0.51, 0.03],
                ["c", 0.12, 0.09, 0.18, 0.24, 0.27, 0.66],
                ["c", 0.78, 3.66, 3.42, 6.57, 6.78, 7.41],
                ["c", 0.78, 0.21, 1.2, 0.24, 2.07, 0.24],
                ["c", 0.63, 0, 0.84, 0, 1.2, -0.06],
                ["c", 1.83, -0.27, 3.42, -1.08, 4.8, -2.37],
                ["c", 1.41, -1.35, 2.4, -3.21, 2.85, -5.22],
                ["c", 0.09, -0.42, 0.15, -0.57, 0.27, -0.66],
                ["c", 0.21, -0.15, 0.57, -0.09, 0.69, 0.12],
                ["c", 0.09, 0.12, 0.09, 0.18, -0.03, 0.69],
                ["c", -0.33, 1.62, -0.78, 3, -1.47, 4.38],
                ["c", -1.92, 3.84, -4.89, 6, -8.31, 6],
                ["c", -3.42, 0, -6.39, -2.16, -8.31, -6],
                ["c", -0.48, -0.96, -0.84, -1.92, -1.14, -2.97],
                ["c", -0.18, -0.69, -0.42, -1.74, -0.42, -1.92],
                ["c", 0, -0.12, 0.09, -0.27, 0.24, -0.33],
                ["z"],
                ["m", 9.21, 0],
                ["c", 1.2, -0.27, 2.34, 0.63, 2.34, 1.86],
                ["c", 0, 0.9, -0.66, 1.68, -1.5, 1.89],
                ["c", -1.38, 0.27, -2.58, -0.93, -2.31, -2.31],
                ["c", 0.15, -0.69, 0.78, -1.29, 1.47, -1.44],
                ["z"]
            ],
            w: 19.744,
            h: 11.274
        },
        "scripts.sforzato": {
            d: [
                ["M", -6.45, -3.69],
                ["c", 0.06, -0.03, 0.15, -0.06, 0.18, -0.06],
                ["c", 0.06, 0, 2.85, 0.72, 6.24, 1.59],
                ["l", 6.33, 1.65],
                ["c", 0.33, 0.06, 0.45, 0.21, 0.45, 0.51],
                ["c", 0, 0.3, -0.12, 0.45, -0.45, 0.51],
                ["l", -6.33, 1.65],
                ["c", -3.39, 0.87, -6.18, 1.59, -6.21, 1.59],
                ["c", -0.21, 0, -0.48, -0.24, -0.51, -0.45],
                ["c", 0, -0.15, 0.06, -0.36, 0.18, -0.45],
                ["c", 0.09, -0.06, 0.87, -0.27, 3.84, -1.05],
                ["c", 2.04, -0.54, 3.84, -0.99, 4.02, -1.02],
                ["c", 0.15, -0.06, 1.14, -0.24, 2.22, -0.42],
                ["c", 1.05, -0.18, 1.92, -0.36, 1.92, -0.36],
                ["c", 0, 0, -0.87, -0.18, -1.92, -0.36],
                ["c", -1.08, -0.18, -2.07, -0.36, -2.22, -0.42],
                ["c", -0.18, -0.03, -1.98, -0.48, -4.02, -1.02],
                ["c", -2.97, -0.78, -3.75, -0.99, -3.84, -1.05],
                ["c", -0.12, -0.09, -0.18, -0.3, -0.18, -0.45],
                ["c", 0.03, -0.15, 0.15, -0.3, 0.3, -0.39],
                ["z"]
            ],
            w: 13.5,
            h: 7.5
        },
        "scripts.staccato": {
            d: [
                ["M", -0.36, -1.47],
                ["c", 0.93, -0.21, 1.86, 0.51, 1.86, 1.47],
                ["c", 0, 0.93, -0.87, 1.65, -1.8, 1.47],
                ["c", -0.54, -0.12, -1.02, -0.57, -1.14, -1.08],
                ["c", -0.21, -0.81, 0.27, -1.65, 1.08, -1.86],
                ["z"]
            ],
            w: 2.989,
            h: 3.004
        },
        "scripts.tenuto": {
            d: [
                ["M", -4.2, -0.48],
                ["l", 0.12, -0.06],
                ["l", 4.08, 0],
                ["l", 4.08, 0],
                ["l", 0.12, 0.06],
                ["c", 0.39, 0.21, 0.39, 0.75, 0, 0.96],
                ["l", -0.12, 0.06],
                ["l", -4.08, 0],
                ["l", -4.08, 0],
                ["l", -0.12, -0.06],
                ["c", -0.39, -0.21, -0.39, -0.75, 0, -0.96],
                ["z"]
            ],
            w: 8.985,
            h: 1.08
        },
        "scripts.umarcato": {
            d: [
                ["M", -0.15, -8.19],
                ["c", 0.15, -0.12, 0.36, -0.03, 0.45, 0.15],
                ["c", 0.21, 0.42, 3.45, 7.65, 3.45, 7.71],
                ["c", 0, 0.12, -0.12, 0.27, -0.21, 0.3],
                ["c", -0.03, 0.03, -0.51, 0.03, -1.14, 0.03],
                ["c", -1.05, 0, -1.08, 0, -1.17, -0.06],
                ["c", -0.09, -0.06, -0.24, -0.36, -1.17, -2.4],
                ["c", -0.57, -1.29, -1.05, -2.34, -1.08, -2.34],
                ["c", 0, -0.03, -0.51, 1.02, -1.08, 2.34],
                ["c", -0.93, 2.07, -1.08, 2.34, -1.14, 2.4],
                ["c", -0.06, 0.03, -0.15, 0.06, -0.18, 0.06],
                ["c", -0.15, 0, -0.33, -0.18, -0.33, -0.33],
                ["c", 0, -0.06, 3.24, -7.32, 3.45, -7.71],
                ["c", 0.03, -0.06, 0.09, -0.15, 0.15, -0.15],
                ["z"]
            ],
            w: 7.5,
            h: 8.245
        },
        "scripts.dmarcato": {
            d: [
                ["M", -3.57, 0.03],
                ["c", 0.03, 0, 0.57, -0.03, 1.17, -0.03],
                ["c", 1.05, 0, 1.08, 0, 1.17, 0.06],
                ["c", 0.09, 0.06, 0.24, 0.36, 1.17, 2.4],
                ["c", 0.57, 1.29, 1.05, 2.34, 1.08, 2.34],
                ["c", 0, 0.03, 0.51, -1.02, 1.08, -2.34],
                ["c", 0.93, -2.07, 1.08, -2.34, 1.14, -2.4],
                ["c", 0.06, -0.03, 0.15, -0.06, 0.18, -0.06],
                ["c", 0.15, 0, 0.33, 0.18, 0.33, 0.33],
                ["c", 0, 0.09, -3.45, 7.74, -3.54, 7.83],
                ["c", -0.12, 0.12, -0.3, 0.12, -0.42, 0],
                ["c", -0.09, -0.09, -3.54, -7.74, -3.54, -7.83],
                ["c", 0, -0.09, 0.12, -0.27, 0.18, -0.3],
                ["z"]
            ],
            w: 7.5,
            h: 8.25
        },
        "scripts.stopped": {
            d: [
                ["M", -0.27, -4.08],
                ["c", 0.18, -0.09, 0.36, -0.09, 0.54, 0],
                ["c", 0.18, 0.09, 0.24, 0.15, 0.33, 0.3],
                ["l", 0.06, 0.15],
                ["l", 0, 1.5],
                ["l", 0, 1.47],
                ["l", 1.47, 0],
                ["l", 1.5, 0],
                ["l", 0.15, 0.06],
                ["c", 0.15, 0.09, 0.21, 0.15, 0.3, 0.33],
                ["c", 0.09, 0.18, 0.09, 0.36, 0, 0.54],
                ["c", -0.09, 0.18, -0.15, 0.24, -0.33, 0.33],
                ["c", -0.12, 0.06, -0.18, 0.06, -1.62, 0.06],
                ["l", -1.47, 0],
                ["l", 0, 1.47],
                ["l", 0, 1.47],
                ["l", -0.06, 0.15],
                ["c", -0.09, 0.18, -0.15, 0.24, -0.33, 0.33],
                ["c", -0.18, 0.09, -0.36, 0.09, -0.54, 0],
                ["c", -0.18, -0.09, -0.24, -0.15, -0.33, -0.33],
                ["l", -0.06, -0.15],
                ["l", 0, -1.47],
                ["l", 0, -1.47],
                ["l", -1.47, 0],
                ["c", -1.44, 0, -1.5, 0, -1.62, -0.06],
                ["c", -0.18, -0.09, -0.24, -0.15, -0.33, -0.33],
                ["c", -0.09, -0.18, -0.09, -0.36, 0, -0.54],
                ["c", 0.09, -0.18, 0.15, -0.24, 0.33, -0.33],
                ["l", 0.15, -0.06],
                ["l", 1.47, 0],
                ["l", 1.47, 0],
                ["l", 0, -1.47],
                ["c", 0, -1.44, 0, -1.5, 0.06, -1.62],
                ["c", 0.09, -0.18, 0.15, -0.24, 0.33, -0.33],
                ["z"]
            ],
            w: 8.295,
            h: 8.295
        },
        "scripts.upbow": {
            d: [
                ["M", -4.65, -15.54],
                ["c", 0.12, -0.09, 0.36, -0.06, 0.48, 0.03],
                ["c", 0.03, 0.03, 0.09, 0.09, 0.12, 0.15],
                ["c", 0.03, 0.06, 0.66, 2.13, 1.41, 4.62],
                ["c", 1.35, 4.41, 1.38, 4.56, 2.01, 6.96],
                ["l", 0.63, 2.46],
                ["l", 0.63, -2.46],
                ["c", 0.63, -2.4, 0.66, -2.55, 2.01, -6.96],
                ["c", 0.75, -2.49, 1.38, -4.56, 1.41, -4.62],
                ["c", 0.06, -0.15, 0.18, -0.21, 0.36, -0.24],
                ["c", 0.15, 0, 0.3, 0.06, 0.39, 0.18],
                ["c", 0.15, 0.21, 0.24, -0.18, -2.1, 7.56],
                ["c", -1.2, 3.96, -2.22, 7.32, -2.25, 7.41],
                ["c", 0, 0.12, -0.06, 0.27, -0.09, 0.3],
                ["c", -0.12, 0.21, -0.6, 0.21, -0.72, 0],
                ["c", -0.03, -0.03, -0.09, -0.18, -0.09, -0.3],
                ["c", -0.03, -0.09, -1.05, -3.45, -2.25, -7.41],
                ["c", -2.34, -7.74, -2.25, -7.35, -2.1, -7.56],
                ["c", 0.03, -0.03, 0.09, -0.09, 0.15, -0.12],
                ["z"]
            ],
            w: 9.73,
            h: 15.608
        },
        "scripts.downbow": {
            d: [
                ["M", -5.55, -9.93],
                ["l", 0.09, -0.06],
                ["l", 5.46, 0],
                ["l", 5.46, 0],
                ["l", 0.09, 0.06],
                ["l", 0.06, 0.09],
                ["l", 0, 4.77],
                ["c", 0, 5.28, 0, 4.89, -0.18, 5.01],
                ["c", -0.18, 0.12, -0.42, 0.06, -0.54, -0.12],
                ["c", -0.06, -0.09, -0.06, -0.18, -0.06, -2.97],
                ["l", 0, -2.85],
                ["l", -4.83, 0],
                ["l", -4.83, 0],
                ["l", 0, 2.85],
                ["c", 0, 2.79, 0, 2.88, -0.06, 2.97],
                ["c", -0.15, 0.24, -0.51, 0.24, -0.66, 0],
                ["c", -0.06, -0.09, -0.06, -0.21, -0.06, -4.89],
                ["l", 0, -4.77],
                ["z"]
            ],
            w: 11.22,
            h: 9.992
        },
        "scripts.turn": {
            d: [
                ["M", -4.77, -3.9],
                ["c", 0.36, -0.06, 1.05, -0.06, 1.44, 0.03],
                ["c", 0.78, 0.15, 1.5, 0.51, 2.34, 1.14],
                ["c", 0.6, 0.45, 1.05, 0.87, 2.22, 2.01],
                ["c", 1.11, 1.08, 1.62, 1.5, 2.22, 1.86],
                ["c", 0.6, 0.36, 1.32, 0.57, 1.92, 0.57],
                ["c", 0.9, 0, 1.71, -0.57, 1.89, -1.35],
                ["c", 0.24, -0.93, -0.39, -1.89, -1.35, -2.1],
                ["l", -0.15, -0.06],
                ["l", -0.09, 0.15],
                ["c", -0.03, 0.09, -0.15, 0.24, -0.24, 0.33],
                ["c", -0.72, 0.72, -2.04, 0.54, -2.49, -0.36],
                ["c", -0.48, -0.93, 0.03, -1.86, 1.17, -2.19],
                ["c", 0.3, -0.09, 1.02, -0.09, 1.35, 0],
                ["c", 0.99, 0.27, 1.74, 0.87, 2.25, 1.83],
                ["c", 0.69, 1.41, 0.63, 3, -0.21, 4.26],
                ["c", -0.21, 0.3, -0.69, 0.81, -0.99, 1.02],
                ["c", -0.3, 0.21, -0.84, 0.45, -1.17, 0.54],
                ["c", -1.23, 0.36, -2.49, 0.15, -3.72, -0.6],
                ["c", -0.75, -0.48, -1.41, -1.02, -2.85, -2.46],
                ["c", -1.11, -1.08, -1.62, -1.5, -2.22, -1.86],
                ["c", -0.6, -0.36, -1.32, -0.57, -1.92, -0.57],
                ["c", -0.9, 0, -1.71, 0.57, -1.89, 1.35],
                ["c", -0.24, 0.93, 0.39, 1.89, 1.35, 2.1],
                ["l", 0.15, 0.06],
                ["l", 0.09, -0.15],
                ["c", 0.03, -0.09, 0.15, -0.24, 0.24, -0.33],
                ["c", 0.72, -0.72, 2.04, -0.54, 2.49, 0.36],
                ["c", 0.48, 0.93, -0.03, 1.86, -1.17, 2.19],
                ["c", -0.3, 0.09, -1.02, 0.09, -1.35, 0],
                ["c", -0.99, -0.27, -1.74, -0.87, -2.25, -1.83],
                ["c", -0.69, -1.41, -0.63, -3, 0.21, -4.26],
                ["c", 0.21, -0.3, 0.69, -0.81, 0.99, -1.02],
                ["c", 0.48, -0.33, 1.11, -0.57, 1.74, -0.66],
                ["z"]
            ],
            w: 16.366,
            h: 7.893
        },
        "scripts.trill": {
            d: [
                ["M", -0.51, -16.02],
                ["c", 0.12, -0.09, 0.21, -0.18, 0.21, -0.18],
                ["l", -0.81, 4.02],
                ["l", -0.81, 4.02],
                ["c", 0.03, 0, 0.51, -0.27, 1.08, -0.6],
                ["c", 0.6, -0.3, 1.14, -0.63, 1.26, -0.66],
                ["c", 1.14, -0.54, 2.31, -0.6, 3.09, -0.18],
                ["c", 0.27, 0.15, 0.54, 0.36, 0.6, 0.51],
                ["l", 0.06, 0.12],
                ["l", 0.21, -0.21],
                ["c", 0.9, -0.81, 2.22, -0.99, 3.12, -0.42],
                ["c", 0.6, 0.42, 0.9, 1.14, 0.78, 2.07],
                ["c", -0.15, 1.29, -1.05, 2.31, -1.95, 2.25],
                ["c", -0.48, -0.03, -0.78, -0.3, -0.96, -0.81],
                ["c", -0.09, -0.27, -0.09, -0.9, -0.03, -1.2],
                ["c", 0.21, -0.75, 0.81, -1.23, 1.59, -1.32],
                ["l", 0.24, -0.03],
                ["l", -0.09, -0.12],
                ["c", -0.51, -0.66, -1.62, -0.63, -2.31, 0.03],
                ["c", -0.39, 0.42, -0.3, 0.09, -1.23, 4.77],
                ["l", -0.81, 4.14],
                ["c", -0.03, 0, -0.12, -0.03, -0.21, -0.09],
                ["c", -0.33, -0.15, -0.54, -0.18, -0.99, -0.18],
                ["c", -0.42, 0, -0.66, 0.03, -1.05, 0.18],
                ["c", -0.12, 0.06, -0.21, 0.09, -0.21, 0.09],
                ["c", 0, -0.03, 0.36, -1.86, 0.81, -4.11],
                ["c", 0.9, -4.47, 0.87, -4.26, 0.69, -4.53],
                ["c", -0.21, -0.36, -0.66, -0.51, -1.17, -0.36],
                ["c", -0.15, 0.06, -2.22, 1.14, -2.58, 1.38],
                ["c", -0.12, 0.09, -0.12, 0.09, -0.21, 0.6],
                ["l", -0.09, 0.51],
                ["l", 0.21, 0.24],
                ["c", 0.63, 0.75, 1.02, 1.47, 1.2, 2.19],
                ["c", 0.06, 0.27, 0.06, 0.36, 0.06, 0.81],
                ["c", 0, 0.42, 0, 0.54, -0.06, 0.78],
                ["c", -0.15, 0.54, -0.33, 0.93, -0.63, 1.35],
                ["c", -0.18, 0.24, -0.57, 0.63, -0.81, 0.78],
                ["c", -0.24, 0.15, -0.63, 0.36, -0.84, 0.42],
                ["c", -0.27, 0.06, -0.66, 0.06, -0.87, 0.03],
                ["c", -0.81, -0.18, -1.32, -1.05, -1.38, -2.46],
                ["c", -0.03, -0.6, 0.03, -0.99, 0.33, -2.46],
                ["c", 0.21, -1.08, 0.24, -1.32, 0.21, -1.29],
                ["c", -1.2, 0.48, -2.4, 0.75, -3.21, 0.72],
                ["c", -0.69, -0.06, -1.17, -0.3, -1.41, -0.72],
                ["c", -0.39, -0.75, -0.12, -1.8, 0.66, -2.46],
                ["c", 0.24, -0.18, 0.69, -0.42, 1.02, -0.51],
                ["c", 0.69, -0.18, 1.53, -0.15, 2.31, 0.09],
                ["c", 0.3, 0.09, 0.75, 0.3, 0.99, 0.45],
                ["c", 0.12, 0.09, 0.15, 0.09, 0.15, 0.03],
                ["c", 0.03, -0.03, 0.33, -1.59, 0.72, -3.45],
                ["c", 0.36, -1.86, 0.66, -3.42, 0.69, -3.45],
                ["c", 0, -0.03, 0.03, -0.03, 0.21, 0.03],
                ["c", 0.21, 0.06, 0.27, 0.06, 0.48, 0.06],
                ["c", 0.42, -0.03, 0.78, -0.18, 1.26, -0.48],
                ["c", 0.15, -0.12, 0.36, -0.27, 0.48, -0.39],
                ["z"],
                ["m", -5.73, 7.68],
                ["c", -0.27, -0.03, -0.96, -0.06, -1.2, -0.03],
                ["c", -0.81, 0.12, -1.35, 0.57, -1.5, 1.2],
                ["c", -0.18, 0.66, 0.12, 1.14, 0.75, 1.29],
                ["c", 0.66, 0.12, 1.92, -0.12, 3.18, -0.66],
                ["l", 0.33, -0.15],
                ["l", 0.09, -0.39],
                ["c", 0.06, -0.21, 0.09, -0.42, 0.09, -0.45],
                ["c", 0, -0.03, -0.45, -0.3, -0.75, -0.45],
                ["c", -0.27, -0.15, -0.66, -0.27, -0.99, -0.36],
                ["z"],
                ["m", 4.29, 3.63],
                ["c", -0.24, -0.39, -0.51, -0.75, -0.51, -0.69],
                ["c", -0.06, 0.12, -0.39, 1.92, -0.45, 2.28],
                ["c", -0.09, 0.54, -0.12, 1.14, -0.06, 1.38],
                ["c", 0.06, 0.42, 0.21, 0.6, 0.51, 0.57],
                ["c", 0.39, -0.06, 0.75, -0.48, 0.93, -1.14],
                ["c", 0.09, -0.33, 0.09, -1.05, 0, -1.38],
                ["c", -0.09, -0.39, -0.24, -0.69, -0.42, -1.02],
                ["z"]
            ],
            w: 17.963,
            h: 16.49
        },
        "scripts.segno": {
            d: [
                ["M", -3.72, -11.22],
                ["c", 0.78, -0.09, 1.59, 0.03, 2.31, 0.42],
                ["c", 1.2, 0.6, 2.01, 1.71, 2.31, 3.09],
                ["c", 0.09, 0.42, 0.09, 1.2, 0.03, 1.5],
                ["c", -0.15, 0.45, -0.39, 0.81, -0.66, 0.93],
                ["c", -0.33, 0.18, -0.84, 0.21, -1.23, 0.15],
                ["c", -0.81, -0.18, -1.32, -0.93, -1.26, -1.89],
                ["c", 0.03, -0.36, 0.09, -0.57, 0.24, -0.9],
                ["c", 0.15, -0.33, 0.45, -0.6, 0.72, -0.75],
                ["c", 0.12, -0.06, 0.18, -0.09, 0.18, -0.12],
                ["c", 0, -0.03, -0.03, -0.15, -0.09, -0.24],
                ["c", -0.18, -0.45, -0.54, -0.87, -0.96, -1.08],
                ["c", -1.11, -0.57, -2.34, -0.18, -2.88, 0.9],
                ["c", -0.24, 0.51, -0.33, 1.11, -0.24, 1.83],
                ["c", 0.27, 1.92, 1.5, 3.54, 3.93, 5.13],
                ["c", 0.48, 0.33, 1.26, 0.78, 1.29, 0.78],
                ["c", 0.03, 0, 1.35, -2.19, 2.94, -4.89],
                ["l", 2.88, -4.89],
                ["l", 0.84, 0],
                ["l", 0.87, 0],
                ["l", -0.03, 0.06],
                ["c", -0.15, 0.21, -6.15, 10.41, -6.15, 10.44],
                ["c", 0, 0, 0.21, 0.15, 0.48, 0.27],
                ["c", 2.61, 1.47, 4.35, 3.03, 5.13, 4.65],
                ["c", 1.14, 2.34, 0.51, 5.07, -1.44, 6.39],
                ["c", -0.66, 0.42, -1.32, 0.63, -2.13, 0.69],
                ["c", -2.01, 0.09, -3.81, -1.41, -4.26, -3.54],
                ["c", -0.09, -0.42, -0.09, -1.2, -0.03, -1.5],
                ["c", 0.15, -0.45, 0.39, -0.81, 0.66, -0.93],
                ["c", 0.33, -0.18, 0.84, -0.21, 1.23, -0.15],
                ["c", 0.81, 0.18, 1.32, 0.93, 1.26, 1.89],
                ["c", -0.03, 0.36, -0.09, 0.57, -0.24, 0.9],
                ["c", -0.15, 0.33, -0.45, 0.6, -0.72, 0.75],
                ["c", -0.12, 0.06, -0.18, 0.09, -0.18, 0.12],
                ["c", 0, 0.03, 0.03, 0.15, 0.09, 0.24],
                ["c", 0.18, 0.45, 0.54, 0.87, 0.96, 1.08],
                ["c", 1.11, 0.57, 2.34, 0.18, 2.88, -0.9],
                ["c", 0.24, -0.51, 0.33, -1.11, 0.24, -1.83],
                ["c", -0.27, -1.92, -1.5, -3.54, -3.93, -5.13],
                ["c", -0.48, -0.33, -1.26, -0.78, -1.29, -0.78],
                ["c", -0.03, 0, -1.35, 2.19, -2.91, 4.89],
                ["l", -2.88, 4.89],
                ["l", -0.87, 0],
                ["l", -0.87, 0],
                ["l", 0.03, -0.06],
                ["c", 0.15, -0.21, 6.15, -10.41, 6.15, -10.44],
                ["c", 0, 0, -0.21, -0.15, -0.48, -0.3],
                ["c", -2.61, -1.44, -4.35, -3, -5.13, -4.62],
                ["c", -0.9, -1.89, -0.72, -4.02, 0.48, -5.52],
                ["c", 0.69, -0.84, 1.68, -1.41, 2.73, -1.53],
                ["z"],
                ["m", 8.76, 9.09],
                ["c", 0.03, -0.03, 0.15, -0.03, 0.27, -0.03],
                ["c", 0.33, 0.03, 0.57, 0.18, 0.72, 0.48],
                ["c", 0.09, 0.18, 0.09, 0.57, 0, 0.75],
                ["c", -0.09, 0.18, -0.21, 0.3, -0.36, 0.39],
                ["c", -0.15, 0.06, -0.21, 0.06, -0.39, 0.06],
                ["c", -0.21, 0, -0.27, 0, -0.39, -0.06],
                ["c", -0.3, -0.15, -0.48, -0.45, -0.48, -0.75],
                ["c", 0, -0.39, 0.24, -0.72, 0.63, -0.84],
                ["z"],
                ["m", -10.53, 2.61],
                ["c", 0.03, -0.03, 0.15, -0.03, 0.27, -0.03],
                ["c", 0.33, 0.03, 0.57, 0.18, 0.72, 0.48],
                ["c", 0.09, 0.18, 0.09, 0.57, 0, 0.75],
                ["c", -0.09, 0.18, -0.21, 0.3, -0.36, 0.39],
                ["c", -0.15, 0.06, -0.21, 0.06, -0.39, 0.06],
                ["c", -0.21, 0, -0.27, 0, -0.39, -0.06],
                ["c", -0.3, -0.15, -0.48, -0.45, -0.48, -0.75],
                ["c", 0, -0.39, 0.24, -0.72, 0.63, -0.84],
                ["z"]
            ],
            w: 15,
            h: 22.504
        },
        "scripts.coda": {
            d: [
                ["M", -0.21, -10.47],
                ["c", 0.18, -0.12, 0.42, -0.06, 0.54, 0.12],
                ["c", 0.06, 0.09, 0.06, 0.18, 0.06, 1.5],
                ["l", 0, 1.38],
                ["l", 0.18, 0],
                ["c", 0.39, 0.06, 0.96, 0.24, 1.38, 0.48],
                ["c", 1.68, 0.93, 2.82, 3.24, 3.03, 6.12],
                ["c", 0.03, 0.24, 0.03, 0.45, 0.03, 0.45],
                ["c", 0, 0.03, 0.6, 0.03, 1.35, 0.03],
                ["c", 1.5, 0, 1.47, 0, 1.59, 0.18],
                ["c", 0.09, 0.12, 0.09, 0.3, 0, 0.42],
                ["c", -0.12, 0.18, -0.09, 0.18, -1.59, 0.18],
                ["c", -0.75, 0, -1.35, 0, -1.35, 0.03],
                ["c", 0, 0, 0, 0.21, -0.03, 0.42],
                ["c", -0.24, 3.15, -1.53, 5.58, -3.45, 6.36],
                ["c", -0.27, 0.12, -0.72, 0.24, -0.96, 0.27],
                ["l", -0.18, 0],
                ["l", 0, 1.38],
                ["c", 0, 1.32, 0, 1.41, -0.06, 1.5],
                ["c", -0.15, 0.24, -0.51, 0.24, -0.66, 0],
                ["c", -0.06, -0.09, -0.06, -0.18, -0.06, -1.5],
                ["l", 0, -1.38],
                ["l", -0.18, 0],
                ["c", -0.39, -0.06, -0.96, -0.24, -1.38, -0.48],
                ["c", -1.68, -0.93, -2.82, -3.24, -3.03, -6.15],
                ["c", -0.03, -0.21, -0.03, -0.42, -0.03, -0.42],
                ["c", 0, -0.03, -0.6, -0.03, -1.35, -0.03],
                ["c", -1.5, 0, -1.47, 0, -1.59, -0.18],
                ["c", -0.09, -0.12, -0.09, -0.3, 0, -0.42],
                ["c", 0.12, -0.18, 0.09, -0.18, 1.59, -0.18],
                ["c", 0.75, 0, 1.35, 0, 1.35, -0.03],
                ["c", 0, 0, 0, -0.21, 0.03, -0.45],
                ["c", 0.24, -3.12, 1.53, -5.55, 3.45, -6.33],
                ["c", 0.27, -0.12, 0.72, -0.24, 0.96, -0.27],
                ["l", 0.18, 0],
                ["l", 0, -1.38],
                ["c", 0, -1.53, 0, -1.5, 0.18, -1.62],
                ["z"],
                ["m", -0.18, 6.93],
                ["c", 0, -2.97, 0, -3.15, -0.06, -3.15],
                ["c", -0.09, 0, -0.51, 0.15, -0.66, 0.21],
                ["c", -0.87, 0.51, -1.38, 1.62, -1.56, 3.51],
                ["c", -0.06, 0.54, -0.12, 1.59, -0.12, 2.16],
                ["l", 0, 0.42],
                ["l", 1.2, 0],
                ["l", 1.2, 0],
                ["l", 0, -3.15],
                ["z"],
                ["m", 1.17, -3.06],
                ["c", -0.09, -0.03, -0.21, -0.06, -0.27, -0.09],
                ["l", -0.12, 0],
                ["l", 0, 3.15],
                ["l", 0, 3.15],
                ["l", 1.2, 0],
                ["l", 1.2, 0],
                ["l", 0, -0.81],
                ["c", -0.06, -2.4, -0.33, -3.69, -0.93, -4.59],
                ["c", -0.27, -0.39, -0.66, -0.69, -1.08, -0.81],
                ["z"],
                ["m", -1.17, 10.14],
                ["l", 0, -3.15],
                ["l", -1.2, 0],
                ["l", -1.2, 0],
                ["l", 0, 0.81],
                ["c", 0.03, 0.96, 0.06, 1.47, 0.15, 2.13],
                ["c", 0.24, 2.04, 0.96, 3.12, 2.13, 3.36],
                ["l", 0.12, 0],
                ["l", 0, -3.15],
                ["z"],
                ["m", 3.18, -2.34],
                ["l", 0, -0.81],
                ["l", -1.2, 0],
                ["l", -1.2, 0],
                ["l", 0, 3.15],
                ["l", 0, 3.15],
                ["l", 0.12, 0],
                ["c", 1.17, -0.24, 1.89, -1.32, 2.13, -3.36],
                ["c", 0.09, -0.66, 0.12, -1.17, 0.15, -2.13],
                ["z"]
            ],
            w: 16.035,
            h: 21.062
        },
        "scripts.comma": {
            d: [
                ["M", 1.14, -4.62],
                ["c", 0.3, -0.12, 0.69, -0.03, 0.93, 0.15],
                ["c", 0.12, 0.12, 0.36, 0.45, 0.51, 0.78],
                ["c", 0.9, 1.77, 0.54, 4.05, -1.08, 6.75],
                ["c", -0.36, 0.63, -0.87, 1.38, -0.96, 1.44],
                ["c", -0.18, 0.12, -0.42, 0.06, -0.54, -0.12],
                ["c", -0.09, -0.18, -0.09, -0.3, 0.12, -0.6],
                ["c", 0.96, -1.44, 1.44, -2.97, 1.38, -4.35],
                ["c", -0.06, -0.93, -0.3, -1.68, -0.78, -2.46],
                ["c", -0.27, -0.39, -0.33, -0.63, -0.24, -0.96],
                ["c", 0.09, -0.27, 0.36, -0.54, 0.66, -0.63],
                ["z"]
            ],
            w: 3.042,
            h: 9.237
        },
        "scripts.roll": {
            d: [
                ["M", 1.95, -6],
                ["c", 0.21, -0.09, 0.36, -0.09, 0.57, 0],
                ["c", 0.39, 0.15, 0.63, 0.39, 1.47, 1.35],
                ["c", 0.66, 0.75, 0.78, 0.87, 1.08, 1.05],
                ["c", 0.75, 0.45, 1.65, 0.42, 2.4, -0.06],
                ["c", 0.12, -0.09, 0.27, -0.27, 0.54, -0.6],
                ["c", 0.42, -0.54, 0.51, -0.63, 0.69, -0.63],
                ["c", 0.09, 0, 0.3, 0.12, 0.36, 0.21],
                ["c", 0.09, 0.12, 0.12, 0.3, 0.03, 0.42],
                ["c", -0.06, 0.12, -3.15, 3.9, -3.3, 4.08],
                ["c", -0.06, 0.06, -0.18, 0.12, -0.27, 0.18],
                ["c", -0.27, 0.12, -0.6, 0.06, -0.99, -0.27],
                ["c", -0.27, -0.21, -0.42, -0.39, -1.08, -1.14],
                ["c", -0.63, -0.72, -0.81, -0.9, -1.17, -1.08],
                ["c", -0.36, -0.18, -0.57, -0.21, -0.99, -0.21],
                ["c", -0.39, 0, -0.63, 0.03, -0.93, 0.18],
                ["c", -0.36, 0.15, -0.51, 0.27, -0.9, 0.81],
                ["c", -0.24, 0.27, -0.45, 0.51, -0.48, 0.54],
                ["c", -0.12, 0.09, -0.27, 0.06, -0.39, 0],
                ["c", -0.24, -0.15, -0.33, -0.39, -0.21, -0.6],
                ["c", 0.09, -0.12, 3.18, -3.87, 3.33, -4.02],
                ["c", 0.06, -0.06, 0.18, -0.15, 0.24, -0.21],
                ["z"]
            ],
            w: 10.817,
            h: 6.125
        },
        "scripts.prall": {
            d: [
                ["M", -4.38, -3.69],
                ["c", 0.06, -0.03, 0.18, -0.06, 0.24, -0.06],
                ["c", 0.3, 0, 0.27, -0.03, 1.89, 1.95],
                ["l", 1.53, 1.83],
                ["c", 0.03, 0, 0.57, -0.84, 1.23, -1.83],
                ["c", 1.14, -1.68, 1.23, -1.83, 1.35, -1.89],
                ["c", 0.06, -0.03, 0.18, -0.06, 0.24, -0.06],
                ["c", 0.3, 0, 0.27, -0.03, 1.89, 1.95],
                ["l", 1.53, 1.83],
                ["l", 0.48, -0.69],
                ["c", 0.51, -0.78, 0.54, -0.84, 0.69, -0.9],
                ["c", 0.42, -0.18, 0.87, 0.15, 0.81, 0.6],
                ["c", -0.03, 0.12, -0.3, 0.51, -1.5, 2.37],
                ["c", -1.38, 2.07, -1.5, 2.22, -1.62, 2.28],
                ["c", -0.06, 0.03, -0.18, 0.06, -0.24, 0.06],
                ["c", -0.3, 0, -0.27, 0.03, -1.89, -1.95],
                ["l", -1.53, -1.83],
                ["c", -0.03, 0, -0.57, 0.84, -1.23, 1.83],
                ["c", -1.14, 1.68, -1.23, 1.83, -1.35, 1.89],
                ["c", -0.06, 0.03, -0.18, 0.06, -0.24, 0.06],
                ["c", -0.3, 0, -0.27, 0.03, -1.89, -1.95],
                ["l", -1.53, -1.83],
                ["l", -0.48, 0.69],
                ["c", -0.51, 0.78, -0.54, 0.84, -0.69, 0.9],
                ["c", -0.42, 0.18, -0.87, -0.15, -0.81, -0.6],
                ["c", 0.03, -0.12, 0.3, -0.51, 1.5, -2.37],
                ["c", 1.38, -2.07, 1.5, -2.22, 1.62, -2.28],
                ["z"]
            ],
            w: 15.011,
            h: 7.5
        },
        "scripts.mordent": {
            d: [
                ["M", -0.21, -4.95],
                ["c", 0.27, -0.15, 0.63, 0, 0.75, 0.27],
                ["c", 0.06, 0.12, 0.06, 0.24, 0.06, 1.44],
                ["l", 0, 1.29],
                ["l", 0.57, -0.84],
                ["c", 0.51, -0.75, 0.57, -0.84, 0.69, -0.9],
                ["c", 0.06, -0.03, 0.18, -0.06, 0.24, -0.06],
                ["c", 0.3, 0, 0.27, -0.03, 1.89, 1.95],
                ["l", 1.53, 1.83],
                ["l", 0.48, -0.69],
                ["c", 0.51, -0.78, 0.54, -0.84, 0.69, -0.9],
                ["c", 0.42, -0.18, 0.87, 0.15, 0.81, 0.6],
                ["c", -0.03, 0.12, -0.3, 0.51, -1.5, 2.37],
                ["c", -1.38, 2.07, -1.5, 2.22, -1.62, 2.28],
                ["c", -0.06, 0.03, -0.18, 0.06, -0.24, 0.06],
                ["c", -0.3, 0, -0.27, 0.03, -1.83, -1.89],
                ["c", -0.81, -0.99, -1.5, -1.8, -1.53, -1.86],
                ["c", -0.06, -0.03, -0.06, -0.03, -0.12, 0.03],
                ["c", -0.06, 0.06, -0.06, 0.15, -0.06, 2.28],
                ["c", 0, 1.95, 0, 2.25, -0.06, 2.34],
                ["c", -0.18, 0.45, -0.81, 0.48, -1.05, 0.03],
                ["c", -0.03, -0.06, -0.06, -0.24, -0.06, -1.41],
                ["l", 0, -1.35],
                ["l", -0.57, 0.84],
                ["c", -0.54, 0.78, -0.6, 0.87, -0.72, 0.93],
                ["c", -0.06, 0.03, -0.18, 0.06, -0.24, 0.06],
                ["c", -0.3, 0, -0.27, 0.03, -1.89, -1.95],
                ["l", -1.53, -1.83],
                ["l", -0.48, 0.69],
                ["c", -0.51, 0.78, -0.54, 0.84, -0.69, 0.9],
                ["c", -0.42, 0.18, -0.87, -0.15, -0.81, -0.6],
                ["c", 0.03, -0.12, 0.3, -0.51, 1.5, -2.37],
                ["c", 1.38, -2.07, 1.5, -2.22, 1.62, -2.28],
                ["c", 0.06, -0.03, 0.18, -0.06, 0.24, -0.06],
                ["c", 0.3, 0, 0.27, -0.03, 1.89, 1.95],
                ["l", 1.53, 1.83],
                ["c", 0.03, 0, 0.06, -0.06, 0.09, -0.09],
                ["c", 0.06, -0.12, 0.06, -0.15, 0.06, -2.28],
                ["c", 0, -1.92, 0, -2.22, 0.06, -2.31],
                ["c", 0.06, -0.15, 0.15, -0.24, 0.3, -0.3],
                ["z"]
            ],
            w: 15.011,
            h: 10.012
        },
        "flags.u8th": {
            d: [
                ["M", -0.42, 3.75],
                ["l", 0, -3.75],
                ["l", 0.21, 0],
                ["l", 0.21, 0],
                ["l", 0, 0.18],
                ["c", 0, 0.3, 0.06, 0.84, 0.12, 1.23],
                ["c", 0.24, 1.53, 0.9, 3.12, 2.13, 5.16],
                ["l", 0.99, 1.59],
                ["c", 0.87, 1.44, 1.38, 2.34, 1.77, 3.09],
                ["c", 0.81, 1.68, 1.2, 3.06, 1.26, 4.53],
                ["c", 0.03, 1.53, -0.21, 3.27, -0.75, 5.01],
                ["c", -0.21, 0.69, -0.51, 1.5, -0.6, 1.59],
                ["c", -0.09, 0.12, -0.27, 0.21, -0.42, 0.21],
                ["c", -0.15, 0, -0.42, -0.12, -0.51, -0.21],
                ["c", -0.15, -0.18, -0.18, -0.42, -0.09, -0.66],
                ["c", 0.15, -0.33, 0.45, -1.2, 0.57, -1.62],
                ["c", 0.42, -1.38, 0.6, -2.58, 0.6, -3.9],
                ["c", 0, -0.66, 0, -0.81, -0.06, -1.11],
                ["c", -0.39, -2.07, -1.8, -4.26, -4.59, -7.14],
                ["l", -0.42, -0.45],
                ["l", -0.21, 0],
                ["l", -0.21, 0],
                ["l", 0, -3.75],
                ["z"]
            ],
            w: 6.692,
            h: 22.59
        },
        "flags.u16th": {
            d: [
                ["M", -0.42, 7.5],
                ["l", 0, -7.5],
                ["l", 0.21, 0],
                ["l", 0.21, 0],
                ["l", 0, 0.39],
                ["c", 0.06, 1.08, 0.39, 2.19, 0.99, 3.39],
                ["c", 0.45, 0.9, 0.87, 1.59, 1.95, 3.12],
                ["c", 1.29, 1.86, 1.77, 2.64, 2.22, 3.57],
                ["c", 0.45, 0.93, 0.72, 1.8, 0.87, 2.64],
                ["c", 0.06, 0.51, 0.06, 1.5, 0, 1.92],
                ["c", -0.12, 0.6, -0.3, 1.2, -0.54, 1.71],
                ["l", -0.09, 0.24],
                ["l", 0.18, 0.45],
                ["c", 0.51, 1.2, 0.72, 2.22, 0.69, 3.42],
                ["c", -0.06, 1.53, -0.39, 3.03, -0.99, 4.53],
                ["c", -0.3, 0.75, -0.36, 0.81, -0.57, 0.9],
                ["c", -0.15, 0.09, -0.33, 0.06, -0.48, 0],
                ["c", -0.18, -0.09, -0.27, -0.18, -0.33, -0.33],
                ["c", -0.09, -0.18, -0.06, -0.3, 0.12, -0.75],
                ["c", 0.66, -1.41, 1.02, -2.88, 1.08, -4.32],
                ["c", 0, -0.6, -0.03, -1.05, -0.18, -1.59],
                ["c", -0.3, -1.2, -0.99, -2.4, -2.25, -3.87],
                ["c", -0.42, -0.48, -1.53, -1.62, -2.19, -2.22],
                ["l", -0.45, -0.42],
                ["l", -0.03, 1.11],
                ["l", 0, 1.11],
                ["l", -0.21, 0],
                ["l", -0.21, 0],
                ["l", 0, -7.5],
                ["z"],
                ["m", 1.65, 0.09],
                ["c", -0.3, -0.3, -0.69, -0.72, -0.9, -0.87],
                ["l", -0.33, -0.33],
                ["l", 0, 0.15],
                ["c", 0, 0.3, 0.06, 0.81, 0.15, 1.26],
                ["c", 0.27, 1.29, 0.87, 2.61, 2.04, 4.29],
                ["c", 0.15, 0.24, 0.6, 0.87, 0.96, 1.38],
                ["l", 1.08, 1.53],
                ["l", 0.42, 0.63],
                ["c", 0.03, 0, 0.12, -0.36, 0.21, -0.72],
                ["c", 0.06, -0.33, 0.06, -1.2, 0, -1.62],
                ["c", -0.33, -1.71, -1.44, -3.48, -3.63, -5.7],
                ["z"]
            ],
            w: 6.693,
            h: 26.337
        },
        "flags.u32nd": {
            d: [
                ["M", -0.42, 11.25],
                ["l", 0, -11.25],
                ["l", 0.21, 0],
                ["l", 0.21, 0],
                ["l", 0, 0.36],
                ["c", 0.09, 1.68, 0.69, 3.27, 2.07, 5.46],
                ["l", 0.87, 1.35],
                ["c", 1.02, 1.62, 1.47, 2.37, 1.86, 3.18],
                ["c", 0.48, 1.02, 0.78, 1.92, 0.93, 2.88],
                ["c", 0.06, 0.48, 0.06, 1.5, 0, 1.89],
                ["c", -0.09, 0.42, -0.21, 0.87, -0.36, 1.26],
                ["l", -0.12, 0.3],
                ["l", 0.15, 0.39],
                ["c", 0.69, 1.56, 0.84, 2.88, 0.54, 4.38],
                ["c", -0.09, 0.45, -0.27, 1.08, -0.45, 1.47],
                ["l", -0.12, 0.24],
                ["l", 0.18, 0.36],
                ["c", 0.33, 0.72, 0.57, 1.56, 0.69, 2.34],
                ["c", 0.12, 1.02, -0.06, 2.52, -0.42, 3.84],
                ["c", -0.27, 0.93, -0.75, 2.13, -0.93, 2.31],
                ["c", -0.18, 0.15, -0.45, 0.18, -0.66, 0.09],
                ["c", -0.18, -0.09, -0.27, -0.18, -0.33, -0.33],
                ["c", -0.09, -0.18, -0.06, -0.3, 0.06, -0.6],
                ["c", 0.21, -0.36, 0.42, -0.9, 0.57, -1.38],
                ["c", 0.51, -1.41, 0.69, -3.06, 0.48, -4.08],
                ["c", -0.15, -0.81, -0.57, -1.68, -1.2, -2.55],
                ["c", -0.72, -0.99, -1.83, -2.13, -3.3, -3.33],
                ["l", -0.48, -0.42],
                ["l", -0.03, 1.53],
                ["l", 0, 1.56],
                ["l", -0.21, 0],
                ["l", -0.21, 0],
                ["l", 0, -11.25],
                ["z"],
                ["m", 1.26, -3.96],
                ["c", -0.27, -0.3, -0.54, -0.6, -0.66, -0.72],
                ["l", -0.18, -0.21],
                ["l", 0, 0.42],
                ["c", 0.06, 0.87, 0.24, 1.74, 0.66, 2.67],
                ["c", 0.36, 0.87, 0.96, 1.86, 1.92, 3.18],
                ["c", 0.21, 0.33, 0.63, 0.87, 0.87, 1.23],
                ["c", 0.27, 0.39, 0.6, 0.84, 0.75, 1.08],
                ["l", 0.27, 0.39],
                ["l", 0.03, -0.12],
                ["c", 0.12, -0.45, 0.15, -1.05, 0.09, -1.59],
                ["c", -0.27, -1.86, -1.38, -3.78, -3.75, -6.33],
                ["z"],
                ["m", -0.27, 6.09],
                ["c", -0.27, -0.21, -0.48, -0.42, -0.51, -0.45],
                ["c", -0.06, -0.03, -0.06, -0.03, -0.06, 0.21],
                ["c", 0, 0.9, 0.3, 2.04, 0.81, 3.09],
                ["c", 0.48, 1.02, 0.96, 1.77, 2.37, 3.63],
                ["c", 0.6, 0.78, 1.05, 1.44, 1.29, 1.77],
                ["c", 0.06, 0.12, 0.15, 0.21, 0.15, 0.18],
                ["c", 0.03, -0.03, 0.18, -0.57, 0.24, -0.87],
                ["c", 0.06, -0.45, 0.06, -1.32, -0.03, -1.74],
                ["c", -0.09, -0.48, -0.24, -0.9, -0.51, -1.44],
                ["c", -0.66, -1.35, -1.83, -2.7, -3.75, -4.38],
                ["z"]
            ],
            w: 6.697,
            h: 32.145
        },
        "flags.u64th": {
            d: [
                ["M", -0.42, 15],
                ["l", 0, -15],
                ["l", 0.21, 0],
                ["l", 0.21, 0],
                ["l", 0, 0.36],
                ["c", 0.06, 1.2, 0.39, 2.37, 1.02, 3.66],
                ["c", 0.39, 0.81, 0.84, 1.56, 1.8, 3.09],
                ["c", 0.81, 1.26, 1.05, 1.68, 1.35, 2.22],
                ["c", 0.87, 1.5, 1.35, 2.79, 1.56, 4.08],
                ["c", 0.06, 0.54, 0.06, 1.56, -0.03, 2.04],
                ["c", -0.09, 0.48, -0.21, 0.99, -0.36, 1.35],
                ["l", -0.12, 0.27],
                ["l", 0.12, 0.27],
                ["c", 0.09, 0.15, 0.21, 0.45, 0.27, 0.66],
                ["c", 0.69, 1.89, 0.63, 3.66, -0.18, 5.46],
                ["l", -0.18, 0.39],
                ["l", 0.15, 0.33],
                ["c", 0.3, 0.66, 0.51, 1.44, 0.63, 2.1],
                ["c", 0.06, 0.48, 0.06, 1.35, 0, 1.71],
                ["c", -0.15, 0.57, -0.42, 1.2, -0.78, 1.68],
                ["l", -0.21, 0.27],
                ["l", 0.18, 0.33],
                ["c", 0.57, 1.05, 0.93, 2.13, 1.02, 3.18],
                ["c", 0.06, 0.72, 0, 1.83, -0.21, 2.79],
                ["c", -0.18, 1.02, -0.63, 2.34, -1.02, 3.09],
                ["c", -0.15, 0.33, -0.48, 0.45, -0.78, 0.3],
                ["c", -0.18, -0.09, -0.27, -0.18, -0.33, -0.33],
                ["c", -0.09, -0.18, -0.06, -0.3, 0.03, -0.54],
                ["c", 0.75, -1.5, 1.23, -3.45, 1.17, -4.89],
                ["c", -0.06, -1.02, -0.42, -2.01, -1.17, -3.15],
                ["c", -0.48, -0.72, -1.02, -1.35, -1.89, -2.22],
                ["c", -0.57, -0.57, -1.56, -1.5, -1.92, -1.77],
                ["l", -0.12, -0.09],
                ["l", 0, 1.68],
                ["l", 0, 1.68],
                ["l", -0.21, 0],
                ["l", -0.21, 0],
                ["l", 0, -15],
                ["z"],
                ["m", 0.93, -8.07],
                ["c", -0.27, -0.3, -0.48, -0.54, -0.51, -0.54],
                ["c", 0, 0, 0, 0.69, 0.03, 1.02],
                ["c", 0.15, 1.47, 0.75, 2.94, 2.04, 4.83],
                ["l", 1.08, 1.53],
                ["c", 0.39, 0.57, 0.84, 1.2, 0.99, 1.44],
                ["c", 0.15, 0.24, 0.3, 0.45, 0.3, 0.45],
                ["c", 0, 0, 0.03, -0.09, 0.06, -0.21],
                ["c", 0.36, -1.59, -0.15, -3.33, -1.47, -5.4],
                ["c", -0.63, -0.93, -1.35, -1.83, -2.52, -3.12],
                ["z"],
                ["m", 0.06, 6.72],
                ["c", -0.24, -0.21, -0.48, -0.42, -0.51, -0.45],
                ["l", -0.06, -0.06],
                ["l", 0, 0.33],
                ["c", 0, 1.2, 0.3, 2.34, 0.93, 3.6],
                ["c", 0.45, 0.9, 0.96, 1.68, 2.25, 3.51],
                ["c", 0.39, 0.54, 0.84, 1.17, 1.02, 1.44],
                ["c", 0.21, 0.33, 0.33, 0.51, 0.33, 0.48],
                ["c", 0.06, -0.09, 0.21, -0.63, 0.3, -0.99],
                ["c", 0.06, -0.33, 0.06, -0.45, 0.06, -0.96],
                ["c", 0, -0.6, -0.03, -0.84, -0.18, -1.35],
                ["c", -0.3, -1.08, -1.02, -2.28, -2.13, -3.57],
                ["c", -0.39, -0.45, -1.44, -1.47, -2.01, -1.98],
                ["z"],
                ["m", 0, 6.72],
                ["c", -0.24, -0.21, -0.48, -0.39, -0.51, -0.42],
                ["l", -0.06, -0.06],
                ["l", 0, 0.33],
                ["c", 0, 1.41, 0.45, 2.82, 1.38, 4.35],
                ["c", 0.42, 0.72, 0.72, 1.14, 1.86, 2.73],
                ["c", 0.36, 0.45, 0.75, 0.99, 0.87, 1.2],
                ["c", 0.15, 0.21, 0.3, 0.36, 0.3, 0.36],
                ["c", 0.06, 0, 0.3, -0.48, 0.39, -0.75],
                ["c", 0.09, -0.36, 0.12, -0.63, 0.12, -1.05],
                ["c", -0.06, -1.05, -0.45, -2.04, -1.2, -3.18],
                ["c", -0.57, -0.87, -1.11, -1.53, -2.07, -2.49],
                ["c", -0.36, -0.33, -0.84, -0.78, -1.08, -1.02],
                ["z"]
            ],
            w: 6.682,
            h: 39.694
        },
        "flags.d8th": {
            d: [
                ["M", 5.67, -21.63],
                ["c", 0.24, -0.12, 0.54, -0.06, 0.69, 0.15],
                ["c", 0.06, 0.06, 0.21, 0.36, 0.39, 0.66],
                ["c", 0.84, 1.77, 1.26, 3.36, 1.32, 5.1],
                ["c", 0.03, 1.29, -0.21, 2.37, -0.81, 3.63],
                ["c", -0.6, 1.23, -1.26, 2.13, -3.21, 4.38],
                ["c", -1.35, 1.53, -1.86, 2.19, -2.4, 2.97],
                ["c", -0.63, 0.93, -1.11, 1.92, -1.38, 2.79],
                ["c", -0.15, 0.54, -0.27, 1.35, -0.27, 1.8],
                ["l", 0, 0.15],
                ["l", -0.21, 0],
                ["l", -0.21, 0],
                ["l", 0, -3.75],
                ["l", 0, -3.75],
                ["l", 0.21, 0],
                ["l", 0.21, 0],
                ["l", 0.48, -0.3],
                ["c", 1.83, -1.11, 3.12, -2.1, 4.17, -3.12],
                ["c", 0.78, -0.81, 1.32, -1.53, 1.71, -2.31],
                ["c", 0.45, -0.93, 0.6, -1.74, 0.51, -2.88],
                ["c", -0.12, -1.56, -0.63, -3.18, -1.47, -4.68],
                ["c", -0.12, -0.21, -0.15, -0.33, -0.06, -0.51],
                ["c", 0.06, -0.15, 0.15, -0.24, 0.33, -0.33],
                ["z"]
            ],
            w: 8.492,
            h: 21.691
        },
        "flags.ugrace": {
            d: [
                ["M", 6.03, 6.93],
                ["c", 0.15, -0.09, 0.33, -0.06, 0.51, 0],
                ["c", 0.15, 0.09, 0.21, 0.15, 0.3, 0.33],
                ["c", 0.09, 0.18, 0.06, 0.39, -0.03, 0.54],
                ["c", -0.06, 0.15, -10.89, 8.88, -11.07, 8.97],
                ["c", -0.15, 0.09, -0.33, 0.06, -0.48, 0],
                ["c", -0.18, -0.09, -0.24, -0.15, -0.33, -0.33],
                ["c", -0.09, -0.18, -0.06, -0.39, 0.03, -0.54],
                ["c", 0.06, -0.15, 10.89, -8.88, 11.07, -8.97],
                ["z"]
            ],
            w: 12.019,
            h: 9.954
        },
        "flags.dgrace": {
            d: [
                ["M", -6.06, -15.93],
                ["c", 0.18, -0.09, 0.33, -0.12, 0.48, -0.06],
                ["c", 0.18, 0.09, 14.01, 8.04, 14.1, 8.1],
                ["c", 0.12, 0.12, 0.18, 0.33, 0.18, 0.51],
                ["c", -0.03, 0.21, -0.15, 0.39, -0.36, 0.48],
                ["c", -0.18, 0.09, -0.33, 0.12, -0.48, 0.06],
                ["c", -0.18, -0.09, -14.01, -8.04, -14.1, -8.1],
                ["c", -0.12, -0.12, -0.18, -0.33, -0.18, -0.51],
                ["c", 0.03, -0.21, 0.15, -0.39, 0.36, -0.48],
                ["z"]
            ],
            w: 15.12,
            h: 9.212
        },
        "flags.d16th": {
            d: [
                ["M", 6.84, -22.53],
                ["c", 0.27, -0.12, 0.57, -0.06, 0.72, 0.15],
                ["c", 0.15, 0.15, 0.33, 0.87, 0.45, 1.56],
                ["c", 0.06, 0.33, 0.06, 1.35, 0, 1.65],
                ["c", -0.06, 0.33, -0.15, 0.78, -0.27, 1.11],
                ["c", -0.12, 0.33, -0.45, 0.96, -0.66, 1.32],
                ["l", -0.18, 0.27],
                ["l", 0.09, 0.18],
                ["c", 0.48, 1.02, 0.72, 2.25, 0.69, 3.3],
                ["c", -0.06, 1.23, -0.42, 2.28, -1.26, 3.45],
                ["c", -0.57, 0.87, -0.99, 1.32, -3, 3.39],
                ["c", -1.56, 1.56, -2.22, 2.4, -2.76, 3.45],
                ["c", -0.42, 0.84, -0.66, 1.8, -0.66, 2.55],
                ["l", 0, 0.15],
                ["l", -0.21, 0],
                ["l", -0.21, 0],
                ["l", 0, -7.5],
                ["l", 0, -7.5],
                ["l", 0.21, 0],
                ["l", 0.21, 0],
                ["l", 0, 1.14],
                ["l", 0, 1.11],
                ["l", 0.27, -0.15],
                ["c", 1.11, -0.57, 1.77, -0.99, 2.52, -1.47],
                ["c", 2.37, -1.56, 3.69, -3.15, 4.05, -4.83],
                ["c", 0.03, -0.18, 0.03, -0.39, 0.03, -0.78],
                ["c", 0, -0.6, -0.03, -0.93, -0.24, -1.5],
                ["c", -0.06, -0.18, -0.12, -0.39, -0.15, -0.45],
                ["c", -0.03, -0.24, 0.12, -0.48, 0.36, -0.6],
                ["z"],
                ["m", -0.63, 7.5],
                ["c", -0.06, -0.18, -0.15, -0.36, -0.15, -0.36],
                ["c", -0.03, 0, -0.03, 0.03, -0.06, 0.06],
                ["c", -0.06, 0.12, -0.96, 1.02, -1.95, 1.98],
                ["c", -0.63, 0.57, -1.26, 1.17, -1.44, 1.35],
                ["c", -1.53, 1.62, -2.28, 2.85, -2.55, 4.32],
                ["c", -0.03, 0.18, -0.03, 0.54, -0.06, 0.99],
                ["l", 0, 0.69],
                ["l", 0.18, -0.09],
                ["c", 0.93, -0.54, 2.1, -1.29, 2.82, -1.83],
                ["c", 0.69, -0.51, 1.02, -0.81, 1.53, -1.29],
                ["c", 1.86, -1.89, 2.37, -3.66, 1.68, -5.82],
                ["z"]
            ],
            w: 8.475,
            h: 22.591
        },
        "flags.d32nd": {
            d: [
                ["M", 6.84, -29.13],
                ["c", 0.27, -0.12, 0.57, -0.06, 0.72, 0.15],
                ["c", 0.12, 0.12, 0.27, 0.63, 0.36, 1.11],
                ["c", 0.33, 1.59, 0.06, 3.06, -0.81, 4.47],
                ["l", -0.18, 0.27],
                ["l", 0.09, 0.15],
                ["c", 0.12, 0.24, 0.33, 0.69, 0.45, 1.05],
                ["c", 0.63, 1.83, 0.45, 3.57, -0.57, 5.22],
                ["l", -0.18, 0.3],
                ["l", 0.15, 0.27],
                ["c", 0.42, 0.87, 0.6, 1.71, 0.57, 2.61],
                ["c", -0.06, 1.29, -0.48, 2.46, -1.35, 3.78],
                ["c", -0.54, 0.81, -0.93, 1.29, -2.46, 3],
                ["c", -0.51, 0.54, -1.05, 1.17, -1.26, 1.41],
                ["c", -1.56, 1.86, -2.25, 3.36, -2.37, 5.01],
                ["l", 0, 0.33],
                ["l", -0.21, 0],
                ["l", -0.21, 0],
                ["l", 0, -11.25],
                ["l", 0, -11.25],
                ["l", 0.21, 0],
                ["l", 0.21, 0],
                ["l", 0, 1.35],
                ["l", 0.03, 1.35],
                ["l", 0.78, -0.39],
                ["c", 1.38, -0.69, 2.34, -1.26, 3.24, -1.92],
                ["c", 1.38, -1.02, 2.28, -2.13, 2.64, -3.21],
                ["c", 0.15, -0.48, 0.18, -0.72, 0.18, -1.29],
                ["c", 0, -0.57, -0.06, -0.9, -0.24, -1.47],
                ["c", -0.06, -0.18, -0.12, -0.39, -0.15, -0.45],
                ["c", -0.03, -0.24, 0.12, -0.48, 0.36, -0.6],
                ["z"],
                ["m", -0.63, 7.2],
                ["c", -0.09, -0.18, -0.12, -0.21, -0.12, -0.15],
                ["c", -0.03, 0.09, -1.02, 1.08, -2.04, 2.04],
                ["c", -1.17, 1.08, -1.65, 1.56, -2.07, 2.04],
                ["c", -0.84, 0.96, -1.38, 1.86, -1.68, 2.76],
                ["c", -0.21, 0.57, -0.27, 0.99, -0.3, 1.65],
                ["l", 0, 0.54],
                ["l", 0.66, -0.33],
                ["c", 3.57, -1.86, 5.49, -3.69, 5.94, -5.7],
                ["c", 0.06, -0.39, 0.06, -1.2, -0.03, -1.65],
                ["c", -0.06, -0.39, -0.24, -0.9, -0.36, -1.2],
                ["z"],
                ["m", -0.06, 7.2],
                ["c", -0.06, -0.15, -0.12, -0.33, -0.15, -0.45],
                ["l", -0.06, -0.18],
                ["l", -0.18, 0.21],
                ["l", -1.83, 1.83],
                ["c", -0.87, 0.9, -1.77, 1.8, -1.95, 2.01],
                ["c", -1.08, 1.29, -1.62, 2.31, -1.89, 3.51],
                ["c", -0.06, 0.3, -0.06, 0.51, -0.09, 0.93],
                ["l", 0, 0.57],
                ["l", 0.09, -0.06],
                ["c", 0.75, -0.45, 1.89, -1.26, 2.52, -1.74],
                ["c", 0.81, -0.66, 1.74, -1.53, 2.22, -2.16],
                ["c", 1.26, -1.53, 1.68, -3.06, 1.32, -4.47],
                ["z"]
            ],
            w: 8.385,
            h: 29.191
        },
        "flags.d64th": {
            d: [
                ["M", 7.08, -32.88],
                ["c", 0.3, -0.12, 0.66, -0.03, 0.78, 0.24],
                ["c", 0.18, 0.33, 0.27, 2.1, 0.15, 2.64],
                ["c", -0.09, 0.39, -0.21, 0.78, -0.39, 1.08],
                ["l", -0.15, 0.3],
                ["l", 0.09, 0.27],
                ["c", 0.03, 0.12, 0.09, 0.45, 0.12, 0.69],
                ["c", 0.27, 1.44, 0.18, 2.55, -0.3, 3.6],
                ["l", -0.12, 0.33],
                ["l", 0.06, 0.42],
                ["c", 0.27, 1.35, 0.33, 2.82, 0.21, 3.63],
                ["c", -0.12, 0.6, -0.3, 1.23, -0.57, 1.8],
                ["l", -0.15, 0.27],
                ["l", 0.03, 0.42],
                ["c", 0.06, 1.02, 0.06, 2.7, 0.03, 3.06],
                ["c", -0.15, 1.47, -0.66, 2.76, -1.74, 4.41],
                ["c", -0.45, 0.69, -0.75, 1.11, -1.74, 2.37],
                ["c", -1.05, 1.38, -1.5, 1.98, -1.95, 2.73],
                ["c", -0.93, 1.5, -1.38, 2.82, -1.44, 4.2],
                ["l", 0, 0.42],
                ["l", -0.21, 0],
                ["l", -0.21, 0],
                ["l", 0, -15],
                ["l", 0, -15],
                ["l", 0.21, 0],
                ["l", 0.21, 0],
                ["l", 0, 1.86],
                ["l", 0, 1.89],
                ["c", 0, 0, 0.21, -0.03, 0.45, -0.09],
                ["c", 2.22, -0.39, 4.08, -1.11, 5.19, -2.01],
                ["c", 0.63, -0.54, 1.02, -1.14, 1.2, -1.8],
                ["c", 0.06, -0.3, 0.06, -1.14, -0.03, -1.65],
                ["c", -0.03, -0.18, -0.06, -0.39, -0.09, -0.48],
                ["c", -0.03, -0.24, 0.12, -0.48, 0.36, -0.6],
                ["z"],
                ["m", -0.45, 6.15],
                ["c", -0.03, -0.18, -0.06, -0.42, -0.06, -0.54],
                ["l", -0.03, -0.18],
                ["l", -0.33, 0.3],
                ["c", -0.42, 0.36, -0.87, 0.72, -1.68, 1.29],
                ["c", -1.98, 1.38, -2.25, 1.59, -2.85, 2.16],
                ["c", -0.75, 0.69, -1.23, 1.44, -1.47, 2.19],
                ["c", -0.15, 0.45, -0.18, 0.63, -0.21, 1.35],
                ["l", 0, 0.66],
                ["l", 0.39, -0.18],
                ["c", 1.83, -0.9, 3.45, -1.95, 4.47, -2.91],
                ["c", 0.93, -0.9, 1.53, -1.83, 1.74, -2.82],
                ["c", 0.06, -0.33, 0.06, -0.87, 0.03, -1.32],
                ["z"],
                ["m", -0.27, 4.86],
                ["c", -0.03, -0.21, -0.06, -0.36, -0.06, -0.36],
                ["c", 0, -0.03, -0.12, 0.09, -0.24, 0.24],
                ["c", -0.39, 0.48, -0.99, 1.08, -2.16, 2.19],
                ["c", -1.47, 1.38, -1.92, 1.83, -2.46, 2.49],
                ["c", -0.66, 0.87, -1.08, 1.74, -1.29, 2.58],
                ["c", -0.09, 0.42, -0.15, 0.87, -0.15, 1.44],
                ["l", 0, 0.54],
                ["l", 0.48, -0.33],
                ["c", 1.5, -1.02, 2.58, -1.89, 3.51, -2.82],
                ["c", 1.47, -1.47, 2.25, -2.85, 2.4, -4.26],
                ["c", 0.03, -0.39, 0.03, -1.17, -0.03, -1.71],
                ["z"],
                ["m", -0.66, 7.68],
                ["c", 0.03, -0.15, 0.03, -0.6, 0.03, -0.99],
                ["l", 0, -0.72],
                ["l", -0.27, 0.33],
                ["l", -1.74, 1.98],
                ["c", -1.77, 1.92, -2.43, 2.76, -2.97, 3.9],
                ["c", -0.51, 1.02, -0.72, 1.77, -0.75, 2.91],
                ["c", 0, 0.63, 0, 0.63, 0.06, 0.6],
                ["c", 0.03, -0.03, 0.3, -0.27, 0.63, -0.54],
                ["c", 0.66, -0.6, 1.86, -1.8, 2.31, -2.31],
                ["c", 1.65, -1.89, 2.52, -3.54, 2.7, -5.16],
                ["z"]
            ],
            w: 8.485,
            h: 32.932
        },
        "clefs.C": {
            d: [
                ["M", 0.06, -14.94],
                ["l", 0.09, -0.06],
                ["l", 1.92, 0],
                ["l", 1.92, 0],
                ["l", 0.09, 0.06],
                ["l", 0.06, 0.09],
                ["l", 0, 14.85],
                ["l", 0, 14.82],
                ["l", -0.06, 0.09],
                ["l", -0.09, 0.06],
                ["l", -1.92, 0],
                ["l", -1.92, 0],
                ["l", -0.09, -0.06],
                ["l", -0.06, -0.09],
                ["l", 0, -14.82],
                ["l", 0, -14.85],
                ["z"],
                ["m", 5.37, 0],
                ["c", 0.09, -0.06, 0.09, -0.06, 0.57, -0.06],
                ["c", 0.45, 0, 0.45, 0, 0.54, 0.06],
                ["l", 0.06, 0.09],
                ["l", 0, 7.14],
                ["l", 0, 7.11],
                ["l", 0.09, -0.06],
                ["c", 0.18, -0.18, 0.72, -0.84, 0.96, -1.2],
                ["c", 0.3, -0.45, 0.66, -1.17, 0.84, -1.65],
                ["c", 0.36, -0.9, 0.57, -1.83, 0.6, -2.79],
                ["c", 0.03, -0.48, 0.03, -0.54, 0.09, -0.63],
                ["c", 0.12, -0.18, 0.36, -0.21, 0.54, -0.12],
                ["c", 0.18, 0.09, 0.21, 0.15, 0.24, 0.66],
                ["c", 0.06, 0.87, 0.21, 1.56, 0.57, 2.22],
                ["c", 0.51, 1.02, 1.26, 1.68, 2.22, 1.92],
                ["c", 0.21, 0.06, 0.33, 0.06, 0.78, 0.06],
                ["c", 0.45, 0, 0.57, 0, 0.84, -0.06],
                ["c", 0.45, -0.12, 0.81, -0.33, 1.08, -0.6],
                ["c", 0.57, -0.57, 0.87, -1.41, 0.99, -2.88],
                ["c", 0.06, -0.54, 0.06, -3, 0, -3.57],
                ["c", -0.21, -2.58, -0.84, -3.87, -2.16, -4.5],
                ["c", -0.48, -0.21, -1.17, -0.36, -1.77, -0.36],
                ["c", -0.69, 0, -1.29, 0.27, -1.5, 0.72],
                ["c", -0.06, 0.15, -0.06, 0.21, -0.06, 0.42],
                ["c", 0, 0.24, 0, 0.3, 0.06, 0.45],
                ["c", 0.12, 0.24, 0.24, 0.39, 0.63, 0.66],
                ["c", 0.42, 0.3, 0.57, 0.48, 0.69, 0.72],
                ["c", 0.06, 0.15, 0.06, 0.21, 0.06, 0.48],
                ["c", 0, 0.39, -0.03, 0.63, -0.21, 0.96],
                ["c", -0.3, 0.6, -0.87, 1.08, -1.5, 1.26],
                ["c", -0.27, 0.06, -0.87, 0.06, -1.14, 0],
                ["c", -0.78, -0.24, -1.44, -0.87, -1.65, -1.68],
                ["c", -0.12, -0.42, -0.09, -1.17, 0.09, -1.71],
                ["c", 0.51, -1.65, 1.98, -2.82, 3.81, -3.09],
                ["c", 0.84, -0.09, 2.46, 0.03, 3.51, 0.27],
                ["c", 2.22, 0.57, 3.69, 1.8, 4.44, 3.75],
                ["c", 0.36, 0.93, 0.57, 2.13, 0.57, 3.36],
                ["c", 0, 1.44, -0.48, 2.73, -1.38, 3.81],
                ["c", -1.26, 1.5, -3.27, 2.43, -5.28, 2.43],
                ["c", -0.48, 0, -0.51, 0, -0.75, -0.09],
                ["c", -0.15, -0.03, -0.48, -0.21, -0.78, -0.36],
                ["c", -0.69, -0.36, -0.87, -0.42, -1.26, -0.42],
                ["c", -0.27, 0, -0.3, 0, -0.51, 0.09],
                ["c", -0.57, 0.3, -0.81, 0.9, -0.81, 2.1],
                ["c", 0, 1.23, 0.24, 1.83, 0.81, 2.13],
                ["c", 0.21, 0.09, 0.24, 0.09, 0.51, 0.09],
                ["c", 0.39, 0, 0.57, -0.06, 1.26, -0.42],
                ["c", 0.3, -0.15, 0.63, -0.33, 0.78, -0.36],
                ["c", 0.24, -0.09, 0.27, -0.09, 0.75, -0.09],
                ["c", 2.01, 0, 4.02, 0.93, 5.28, 2.4],
                ["c", 0.9, 1.11, 1.38, 2.4, 1.38, 3.84],
                ["c", 0, 1.5, -0.3, 2.88, -0.84, 3.96],
                ["c", -0.78, 1.59, -2.19, 2.64, -4.17, 3.15],
                ["c", -1.05, 0.24, -2.67, 0.36, -3.51, 0.27],
                ["c", -1.83, -0.27, -3.3, -1.44, -3.81, -3.09],
                ["c", -0.18, -0.54, -0.21, -1.29, -0.09, -1.74],
                ["c", 0.15, -0.6, 0.63, -1.2, 1.23, -1.47],
                ["c", 0.36, -0.18, 0.57, -0.21, 0.99, -0.21],
                ["c", 0.42, 0, 0.63, 0.03, 1.02, 0.21],
                ["c", 0.42, 0.21, 0.84, 0.63, 1.05, 1.05],
                ["c", 0.18, 0.36, 0.21, 0.6, 0.21, 0.96],
                ["c", 0, 0.3, 0, 0.36, -0.06, 0.51],
                ["c", -0.12, 0.24, -0.27, 0.42, -0.69, 0.72],
                ["c", -0.57, 0.42, -0.69, 0.63, -0.69, 1.08],
                ["c", 0, 0.24, 0, 0.3, 0.06, 0.45],
                ["c", 0.12, 0.21, 0.3, 0.39, 0.57, 0.54],
                ["c", 0.42, 0.18, 0.87, 0.21, 1.53, 0.15],
                ["c", 1.08, -0.15, 1.8, -0.57, 2.34, -1.32],
                ["c", 0.54, -0.75, 0.84, -1.83, 0.99, -3.51],
                ["c", 0.06, -0.57, 0.06, -3.03, 0, -3.57],
                ["c", -0.12, -1.47, -0.42, -2.31, -0.99, -2.88],
                ["c", -0.27, -0.27, -0.63, -0.48, -1.08, -0.6],
                ["c", -0.27, -0.06, -0.39, -0.06, -0.84, -0.06],
                ["c", -0.45, 0, -0.57, 0, -0.78, 0.06],
                ["c", -1.14, 0.27, -2.01, 1.17, -2.46, 2.49],
                ["c", -0.21, 0.57, -0.3, 0.99, -0.33, 1.65],
                ["c", -0.03, 0.51, -0.06, 0.57, -0.24, 0.66],
                ["c", -0.12, 0.06, -0.27, 0.06, -0.39, 0],
                ["c", -0.21, -0.09, -0.21, -0.15, -0.24, -0.75],
                ["c", -0.09, -1.92, -0.78, -3.72, -2.01, -5.19],
                ["c", -0.18, -0.21, -0.36, -0.42, -0.39, -0.45],
                ["l", -0.09, -0.06],
                ["l", 0, 7.11],
                ["l", 0, 7.14],
                ["l", -0.06, 0.09],
                ["c", -0.09, 0.06, -0.09, 0.06, -0.54, 0.06],
                ["c", -0.48, 0, -0.48, 0, -0.57, -0.06],
                ["l", -0.06, -0.09],
                ["l", 0, -14.82],
                ["l", 0, -14.85],
                ["z"]
            ],
            w: 20.31,
            h: 29.97
        },
        "clefs.F": {
            d: [
                ["M", 6.3, -7.8],
                ["c", 0.36, -0.03, 1.65, 0, 2.13, 0.03],
                ["c", 3.6, 0.42, 6.03, 2.1, 6.93, 4.86],
                ["c", 0.27, 0.84, 0.36, 1.5, 0.36, 2.58],
                ["c", 0, 0.9, -0.03, 1.35, -0.18, 2.16],
                ["c", -0.78, 3.78, -3.54, 7.08, -8.37, 9.96],
                ["c", -1.74, 1.05, -3.87, 2.13, -6.18, 3.12],
                ["c", -0.39, 0.18, -0.75, 0.33, -0.81, 0.36],
                ["c", -0.06, 0.03, -0.15, 0.06, -0.18, 0.06],
                ["c", -0.15, 0, -0.33, -0.18, -0.33, -0.33],
                ["c", 0, -0.15, 0.06, -0.21, 0.51, -0.48],
                ["c", 3, -1.77, 5.13, -3.21, 6.84, -4.74],
                ["c", 0.51, -0.45, 1.59, -1.5, 1.95, -1.95],
                ["c", 1.89, -2.19, 2.88, -4.32, 3.15, -6.78],
                ["c", 0.06, -0.42, 0.06, -1.77, 0, -2.19],
                ["c", -0.24, -2.01, -0.93, -3.63, -2.04, -4.71],
                ["c", -0.63, -0.63, -1.29, -1.02, -2.07, -1.2],
                ["c", -1.62, -0.39, -3.36, 0.15, -4.56, 1.44],
                ["c", -0.54, 0.6, -1.05, 1.47, -1.32, 2.22],
                ["l", -0.09, 0.21],
                ["l", 0.24, -0.12],
                ["c", 0.39, -0.21, 0.63, -0.24, 1.11, -0.24],
                ["c", 0.3, 0, 0.45, 0, 0.66, 0.06],
                ["c", 1.92, 0.48, 2.85, 2.55, 1.95, 4.38],
                ["c", -0.45, 0.99, -1.41, 1.62, -2.46, 1.71],
                ["c", -1.47, 0.09, -2.91, -0.87, -3.39, -2.25],
                ["c", -0.18, -0.57, -0.21, -1.32, -0.03, -2.28],
                ["c", 0.39, -2.25, 1.83, -4.2, 3.81, -5.19],
                ["c", 0.69, -0.36, 1.59, -0.6, 2.37, -0.69],
                ["z"],
                ["m", 11.58, 2.52],
                ["c", 0.84, -0.21, 1.71, 0.3, 1.89, 1.14],
                ["c", 0.3, 1.17, -0.72, 2.19, -1.89, 1.89],
                ["c", -0.99, -0.21, -1.5, -1.32, -1.02, -2.25],
                ["c", 0.18, -0.39, 0.6, -0.69, 1.02, -0.78],
                ["z"],
                ["m", 0, 7.5],
                ["c", 0.84, -0.21, 1.71, 0.3, 1.89, 1.14],
                ["c", 0.21, 0.87, -0.3, 1.71, -1.14, 1.89],
                ["c", -0.87, 0.21, -1.71, -0.3, -1.89, -1.14],
                ["c", -0.21, -0.84, 0.3, -1.71, 1.14, -1.89],
                ["z"]
            ],
            w: 20.153,
            h: 23.142
        },
        "clefs.G": {
            d: [
                ["M", 9.69, -37.41],
                ["c", 0.09, -0.09, 0.24, -0.06, 0.36, 0],
                ["c", 0.12, 0.09, 0.57, 0.6, 0.96, 1.11],
                ["c", 1.77, 2.34, 3.21, 5.85, 3.57, 8.73],
                ["c", 0.21, 1.56, 0.03, 3.27, -0.45, 4.86],
                ["c", -0.69, 2.31, -1.92, 4.47, -4.23, 7.44],
                ["c", -0.3, 0.39, -0.57, 0.72, -0.6, 0.75],
                ["c", -0.03, 0.06, 0, 0.15, 0.18, 0.78],
                ["c", 0.54, 1.68, 1.38, 4.44, 1.68, 5.49],
                ["l", 0.09, 0.42],
                ["l", 0.39, 0],
                ["c", 1.47, 0.09, 2.76, 0.51, 3.96, 1.29],
                ["c", 1.83, 1.23, 3.06, 3.21, 3.39, 5.52],
                ["c", 0.09, 0.45, 0.12, 1.29, 0.06, 1.74],
                ["c", -0.09, 1.02, -0.33, 1.83, -0.75, 2.73],
                ["c", -0.84, 1.71, -2.28, 3.06, -4.02, 3.72],
                ["l", -0.33, 0.12],
                ["l", 0.03, 1.26],
                ["c", 0, 1.74, -0.06, 3.63, -0.21, 4.62],
                ["c", -0.45, 3.06, -2.19, 5.49, -4.47, 6.21],
                ["c", -0.57, 0.18, -0.9, 0.21, -1.59, 0.21],
                ["c", -0.69, 0, -1.02, -0.03, -1.65, -0.21],
                ["c", -1.14, -0.27, -2.13, -0.84, -2.94, -1.65],
                ["c", -0.99, -0.99, -1.56, -2.16, -1.71, -3.54],
                ["c", -0.09, -0.81, 0.06, -1.53, 0.45, -2.13],
                ["c", 0.63, -0.99, 1.83, -1.56, 3, -1.53],
                ["c", 1.5, 0.09, 2.64, 1.32, 2.73, 2.94],
                ["c", 0.06, 1.47, -0.93, 2.7, -2.37, 2.97],
                ["c", -0.45, 0.06, -0.84, 0.03, -1.29, -0.09],
                ["l", -0.21, -0.09],
                ["l", 0.09, 0.12],
                ["c", 0.39, 0.54, 0.78, 0.93, 1.32, 1.26],
                ["c", 1.35, 0.87, 3.06, 1.02, 4.35, 0.36],
                ["c", 1.44, -0.72, 2.52, -2.28, 2.97, -4.35],
                ["c", 0.15, -0.66, 0.24, -1.5, 0.3, -3.03],
                ["c", 0.03, -0.84, 0.03, -2.94, 0, -3],
                ["c", -0.03, 0, -0.18, 0, -0.36, 0.03],
                ["c", -0.66, 0.12, -0.99, 0.12, -1.83, 0.12],
                ["c", -1.05, 0, -1.71, -0.06, -2.61, -0.3],
                ["c", -4.02, -0.99, -7.11, -4.35, -7.8, -8.46],
                ["c", -0.12, -0.66, -0.12, -0.99, -0.12, -1.83],
                ["c", 0, -0.84, 0, -1.14, 0.15, -1.92],
                ["c", 0.36, -2.28, 1.41, -4.62, 3.3, -7.29],
                ["l", 2.79, -3.6],
                ["c", 0.54, -0.66, 0.96, -1.2, 0.96, -1.23],
                ["c", 0, -0.03, -0.09, -0.33, -0.18, -0.69],
                ["c", -0.96, -3.21, -1.41, -5.28, -1.59, -7.68],
                ["c", -0.12, -1.38, -0.15, -3.09, -0.06, -3.96],
                ["c", 0.33, -2.67, 1.38, -5.07, 3.12, -7.08],
                ["c", 0.36, -0.42, 0.99, -1.05, 1.17, -1.14],
                ["z"],
                ["m", 2.01, 4.71],
                ["c", -0.15, -0.3, -0.3, -0.54, -0.3, -0.54],
                ["c", -0.03, 0, -0.18, 0.09, -0.3, 0.21],
                ["c", -2.4, 1.74, -3.87, 4.2, -4.26, 7.11],
                ["c", -0.06, 0.54, -0.06, 1.41, -0.03, 1.89],
                ["c", 0.09, 1.29, 0.48, 3.12, 1.08, 5.22],
                ["c", 0.15, 0.42, 0.24, 0.78, 0.24, 0.81],
                ["c", 0, 0.03, 0.84, -1.11, 1.23, -1.68],
                ["c", 1.89, -2.73, 2.88, -5.07, 3.15, -7.53],
                ["c", 0.09, -0.57, 0.12, -1.74, 0.06, -2.37],
                ["c", -0.09, -1.23, -0.27, -1.92, -0.87, -3.12],
                ["z"],
                ["m", -2.94, 20.7],
                ["c", -0.21, -0.72, -0.39, -1.32, -0.42, -1.32],
                ["c", 0, 0, -1.2, 1.47, -1.86, 2.37],
                ["c", -2.79, 3.63, -4.02, 6.3, -4.35, 9.3],
                ["c", -0.03, 0.21, -0.03, 0.69, -0.03, 1.08],
                ["c", 0, 0.69, 0, 0.75, 0.06, 1.11],
                ["c", 0.12, 0.54, 0.27, 0.99, 0.51, 1.47],
                ["c", 0.69, 1.38, 1.83, 2.55, 3.42, 3.42],
                ["c", 0.96, 0.54, 2.07, 0.9, 3.21, 1.08],
                ["c", 0.78, 0.12, 2.04, 0.12, 2.94, -0.03],
                ["c", 0.51, -0.06, 0.45, -0.03, 0.42, -0.3],
                ["c", -0.24, -3.33, -0.72, -6.33, -1.62, -10.08],
                ["c", -0.09, -0.39, -0.18, -0.75, -0.18, -0.78],
                ["c", -0.03, -0.03, -0.42, 0, -0.81, 0.09],
                ["c", -0.9, 0.18, -1.65, 0.57, -2.22, 1.14],
                ["c", -0.72, 0.72, -1.08, 1.65, -1.05, 2.64],
                ["c", 0.06, 0.96, 0.48, 1.83, 1.23, 2.58],
                ["c", 0.36, 0.36, 0.72, 0.63, 1.17, 0.9],
                ["c", 0.33, 0.18, 0.36, 0.21, 0.42, 0.33],
                ["c", 0.18, 0.42, -0.18, 0.9, -0.6, 0.87],
                ["c", -0.18, -0.03, -0.84, -0.36, -1.26, -0.63],
                ["c", -0.78, -0.51, -1.38, -1.11, -1.86, -1.83],
                ["c", -1.77, -2.7, -0.99, -6.42, 1.71, -8.19],
                ["c", 0.3, -0.21, 0.81, -0.48, 1.17, -0.63],
                ["c", 0.3, -0.09, 1.02, -0.3, 1.14, -0.3],
                ["c", 0.06, 0, 0.09, 0, 0.09, -0.03],
                ["c", 0.03, -0.03, -0.51, -1.92, -1.23, -4.26],
                ["z"],
                ["m", 3.78, 7.41],
                ["c", -0.18, -0.03, -0.36, -0.06, -0.39, -0.06],
                ["c", -0.03, 0, 0, 0.21, 0.18, 1.02],
                ["c", 0.75, 3.18, 1.26, 6.3, 1.5, 9.09],
                ["c", 0.06, 0.72, 0, 0.69, 0.51, 0.42],
                ["c", 0.78, -0.36, 1.44, -0.96, 1.98, -1.77],
                ["c", 1.08, -1.62, 1.2, -3.69, 0.3, -5.55],
                ["c", -0.81, -1.62, -2.31, -2.79, -4.08, -3.15],
                ["z"]
            ],
            w: 19.051,
            h: 57.057
        },
        "clefs.perc": {
            d: [
                ["M", 5.07, -7.44],
                ["l", 0.09, -0.06],
                ["l", 1.53, 0],
                ["l", 1.53, 0],
                ["l", 0.09, 0.06],
                ["l", 0.06, 0.09],
                ["l", 0, 7.35],
                ["l", 0, 7.32],
                ["l", -0.06, 0.09],
                ["l", -0.09, 0.06],
                ["l", -1.53, 0],
                ["l", -1.53, 0],
                ["l", -0.09, -0.06],
                ["l", -0.06, -0.09],
                ["l", 0, -7.32],
                ["l", 0, -7.35],
                ["z"],
                ["m", 6.63, 0],
                ["l", 0.09, -0.06],
                ["l", 1.53, 0],
                ["l", 1.53, 0],
                ["l", 0.09, 0.06],
                ["l", 0.06, 0.09],
                ["l", 0, 7.35],
                ["l", 0, 7.32],
                ["l", -0.06, 0.09],
                ["l", -0.09, 0.06],
                ["l", -1.53, 0],
                ["l", -1.53, 0],
                ["l", -0.09, -0.06],
                ["l", -0.06, -0.09],
                ["l", 0, -7.32],
                ["l", 0, -7.35],
                ["z"]
            ],
            w: 9.99,
            h: 14.97
        },
        "timesig.common": {
            d: [
                ["M", 6.66, -7.83],
                ["c", 0.72, -0.06, 1.41, -0.03, 1.98, 0.09],
                ["c", 1.2, 0.27, 2.34, 0.96, 3.09, 1.92],
                ["c", 0.63, 0.81, 1.08, 1.86, 1.14, 2.73],
                ["c", 0.06, 1.02, -0.51, 1.92, -1.44, 2.22],
                ["c", -0.24, 0.09, -0.3, 0.09, -0.63, 0.09],
                ["c", -0.33, 0, -0.42, 0, -0.63, -0.06],
                ["c", -0.66, -0.24, -1.14, -0.63, -1.41, -1.2],
                ["c", -0.15, -0.3, -0.21, -0.51, -0.24, -0.9],
                ["c", -0.06, -1.08, 0.57, -2.04, 1.56, -2.37],
                ["c", 0.18, -0.06, 0.27, -0.06, 0.63, -0.06],
                ["l", 0.45, 0],
                ["c", 0.06, 0.03, 0.09, 0.03, 0.09, 0],
                ["c", 0, 0, -0.09, -0.12, -0.24, -0.27],
                ["c", -1.02, -1.11, -2.55, -1.68, -4.08, -1.5],
                ["c", -1.29, 0.15, -2.04, 0.69, -2.4, 1.74],
                ["c", -0.36, 0.93, -0.42, 1.89, -0.42, 5.37],
                ["c", 0, 2.97, 0.06, 3.96, 0.24, 4.77],
                ["c", 0.24, 1.08, 0.63, 1.68, 1.41, 2.07],
                ["c", 0.81, 0.39, 2.16, 0.45, 3.18, 0.09],
                ["c", 1.29, -0.45, 2.37, -1.53, 3.03, -2.97],
                ["c", 0.15, -0.33, 0.33, -0.87, 0.39, -1.17],
                ["c", 0.09, -0.24, 0.15, -0.36, 0.3, -0.39],
                ["c", 0.21, -0.03, 0.42, 0.15, 0.39, 0.36],
                ["c", -0.06, 0.39, -0.42, 1.38, -0.69, 1.89],
                ["c", -0.96, 1.8, -2.49, 2.94, -4.23, 3.18],
                ["c", -0.99, 0.12, -2.58, -0.06, -3.63, -0.45],
                ["c", -0.96, -0.36, -1.71, -0.84, -2.4, -1.5],
                ["c", -1.11, -1.11, -1.8, -2.61, -2.04, -4.56],
                ["c", -0.06, -0.6, -0.06, -2.01, 0, -2.61],
                ["c", 0.24, -1.95, 0.9, -3.45, 2.01, -4.56],
                ["c", 0.69, -0.66, 1.44, -1.11, 2.37, -1.47],
                ["c", 0.63, -0.24, 1.47, -0.42, 2.22, -0.48],
                ["z"]
            ],
            w: 13.038,
            h: 15.689
        },
        "timesig.cut": {
            d: [
                ["M", 6.24, -10.44],
                ["c", 0.09, -0.06, 0.09, -0.06, 0.48, -0.06],
                ["c", 0.36, 0, 0.36, 0, 0.45, 0.06],
                ["l", 0.06, 0.09],
                ["l", 0, 1.23],
                ["l", 0, 1.26],
                ["l", 0.27, 0],
                ["c", 1.26, 0, 2.49, 0.45, 3.48, 1.29],
                ["c", 1.05, 0.87, 1.8, 2.28, 1.89, 3.48],
                ["c", 0.06, 1.02, -0.51, 1.92, -1.44, 2.22],
                ["c", -0.24, 0.09, -0.3, 0.09, -0.63, 0.09],
                ["c", -0.33, 0, -0.42, 0, -0.63, -0.06],
                ["c", -0.66, -0.24, -1.14, -0.63, -1.41, -1.2],
                ["c", -0.15, -0.3, -0.21, -0.51, -0.24, -0.9],
                ["c", -0.06, -1.08, 0.57, -2.04, 1.56, -2.37],
                ["c", 0.18, -0.06, 0.27, -0.06, 0.63, -0.06],
                ["l", 0.45, 0],
                ["c", 0.06, 0.03, 0.09, 0.03, 0.09, 0],
                ["c", 0, -0.03, -0.45, -0.51, -0.66, -0.69],
                ["c", -0.87, -0.69, -1.83, -1.05, -2.94, -1.11],
                ["l", -0.42, 0],
                ["l", 0, 7.17],
                ["l", 0, 7.14],
                ["l", 0.42, 0],
                ["c", 0.69, -0.03, 1.23, -0.18, 1.86, -0.51],
                ["c", 1.05, -0.51, 1.89, -1.47, 2.46, -2.7],
                ["c", 0.15, -0.33, 0.33, -0.87, 0.39, -1.17],
                ["c", 0.09, -0.24, 0.15, -0.36, 0.3, -0.39],
                ["c", 0.21, -0.03, 0.42, 0.15, 0.39, 0.36],
                ["c", -0.03, 0.24, -0.21, 0.78, -0.39, 1.2],
                ["c", -0.96, 2.37, -2.94, 3.9, -5.13, 3.9],
                ["l", -0.3, 0],
                ["l", 0, 1.26],
                ["l", 0, 1.23],
                ["l", -0.06, 0.09],
                ["c", -0.09, 0.06, -0.09, 0.06, -0.45, 0.06],
                ["c", -0.39, 0, -0.39, 0, -0.48, -0.06],
                ["l", -0.06, -0.09],
                ["l", 0, -1.29],
                ["l", 0, -1.29],
                ["l", -0.21, -0.03],
                ["c", -1.23, -0.21, -2.31, -0.63, -3.21, -1.29],
                ["c", -0.15, -0.09, -0.45, -0.36, -0.66, -0.57],
                ["c", -1.11, -1.11, -1.8, -2.61, -2.04, -4.56],
                ["c", -0.06, -0.6, -0.06, -2.01, 0, -2.61],
                ["c", 0.24, -1.95, 0.93, -3.45, 2.04, -4.59],
                ["c", 0.42, -0.39, 0.78, -0.66, 1.26, -0.93],
                ["c", 0.75, -0.45, 1.65, -0.75, 2.61, -0.9],
                ["l", 0.21, -0.03],
                ["l", 0, -1.29],
                ["l", 0, -1.29],
                ["z"],
                ["m", -0.06, 10.44],
                ["c", 0, -5.58, 0, -6.99, -0.03, -6.99],
                ["c", -0.15, 0, -0.63, 0.27, -0.87, 0.45],
                ["c", -0.45, 0.36, -0.75, 0.93, -0.93, 1.77],
                ["c", -0.18, 0.81, -0.24, 1.8, -0.24, 4.74],
                ["c", 0, 2.97, 0.06, 3.96, 0.24, 4.77],
                ["c", 0.24, 1.08, 0.66, 1.68, 1.41, 2.07],
                ["c", 0.12, 0.06, 0.3, 0.12, 0.33, 0.15],
                ["l", 0.09, 0],
                ["l", 0, -6.96],
                ["z"]
            ],
            w: 13.038,
            h: 20.97
        },
        f: {
            d: [
                ["M", 9.93, -14.28],
                ["c", 1.53, -0.18, 2.88, 0.45, 3.12, 1.5],
                ["c", 0.12, 0.51, 0, 1.32, -0.27, 1.86],
                ["c", -0.15, 0.3, -0.42, 0.57, -0.63, 0.69],
                ["c", -0.69, 0.36, -1.56, 0.03, -1.83, -0.69],
                ["c", -0.09, -0.24, -0.09, -0.69, 0, -0.87],
                ["c", 0.06, -0.12, 0.21, -0.24, 0.45, -0.42],
                ["c", 0.42, -0.24, 0.57, -0.45, 0.6, -0.72],
                ["c", 0.03, -0.33, -0.09, -0.39, -0.63, -0.42],
                ["c", -0.3, 0, -0.45, 0, -0.6, 0.03],
                ["c", -0.81, 0.21, -1.35, 0.93, -1.74, 2.46],
                ["c", -0.06, 0.27, -0.48, 2.25, -0.48, 2.31],
                ["c", 0, 0.03, 0.39, 0.03, 0.9, 0.03],
                ["c", 0.72, 0, 0.9, 0, 0.99, 0.06],
                ["c", 0.42, 0.15, 0.45, 0.72, 0.03, 0.9],
                ["c", -0.12, 0.06, -0.24, 0.06, -1.17, 0.06],
                ["l", -1.05, 0],
                ["l", -0.78, 2.55],
                ["c", -0.45, 1.41, -0.87, 2.79, -0.96, 3.06],
                ["c", -0.87, 2.37, -2.37, 4.74, -3.78, 5.91],
                ["c", -1.05, 0.9, -2.04, 1.23, -3.09, 1.08],
                ["c", -1.11, -0.18, -1.89, -0.78, -2.04, -1.59],
                ["c", -0.12, -0.66, 0.15, -1.71, 0.54, -2.19],
                ["c", 0.69, -0.75, 1.86, -0.54, 2.22, 0.39],
                ["c", 0.06, 0.15, 0.09, 0.27, 0.09, 0.48],
                ["c", 0, 0.24, -0.03, 0.27, -0.12, 0.42],
                ["c", -0.03, 0.09, -0.15, 0.18, -0.27, 0.27],
                ["c", -0.09, 0.06, -0.27, 0.21, -0.36, 0.27],
                ["c", -0.24, 0.18, -0.36, 0.36, -0.39, 0.6],
                ["c", -0.03, 0.33, 0.09, 0.39, 0.63, 0.42],
                ["c", 0.42, 0, 0.63, -0.03, 0.9, -0.15],
                ["c", 0.6, -0.3, 0.96, -0.96, 1.38, -2.64],
                ["c", 0.09, -0.42, 0.63, -2.55, 1.17, -4.77],
                ["l", 1.02, -4.08],
                ["c", 0, -0.03, -0.36, -0.03, -0.81, -0.03],
                ["c", -0.72, 0, -0.81, 0, -0.93, -0.06],
                ["c", -0.42, -0.18, -0.39, -0.75, 0.03, -0.9],
                ["c", 0.09, -0.06, 0.27, -0.06, 1.05, -0.06],
                ["l", 0.96, 0],
                ["l", 0, -0.09],
                ["c", 0.06, -0.18, 0.3, -0.72, 0.51, -1.17],
                ["c", 1.2, -2.46, 3.3, -4.23, 5.34, -4.5],
                ["z"]
            ],
            w: 16.155,
            h: 19.445
        },
        m: {
            d: [
                ["M", 2.79, -8.91],
                ["c", 0.09, 0, 0.3, -0.03, 0.45, -0.03],
                ["c", 0.24, 0.03, 0.3, 0.03, 0.45, 0.12],
                ["c", 0.36, 0.15, 0.63, 0.54, 0.75, 1.02],
                ["l", 0.03, 0.21],
                ["l", 0.33, -0.3],
                ["c", 0.69, -0.69, 1.38, -1.02, 2.07, -1.02],
                ["c", 0.27, 0, 0.33, 0, 0.48, 0.06],
                ["c", 0.21, 0.09, 0.48, 0.36, 0.63, 0.6],
                ["c", 0.03, 0.09, 0.12, 0.27, 0.18, 0.42],
                ["c", 0.03, 0.15, 0.09, 0.27, 0.12, 0.27],
                ["c", 0, 0, 0.09, -0.09, 0.18, -0.21],
                ["c", 0.33, -0.39, 0.87, -0.81, 1.29, -0.99],
                ["c", 0.78, -0.33, 1.47, -0.21, 2.01, 0.33],
                ["c", 0.3, 0.33, 0.48, 0.69, 0.6, 1.14],
                ["c", 0.09, 0.42, 0.06, 0.54, -0.54, 3.06],
                ["c", -0.33, 1.29, -0.57, 2.4, -0.57, 2.43],
                ["c", 0, 0.12, 0.09, 0.21, 0.21, 0.21],
                ["c", 0.24, 0, 0.75, -0.3, 1.2, -0.72],
                ["c", 0.45, -0.39, 0.6, -0.45, 0.78, -0.27],
                ["c", 0.18, 0.18, 0.09, 0.36, -0.45, 0.87],
                ["c", -1.05, 0.96, -1.83, 1.47, -2.58, 1.71],
                ["c", -0.93, 0.33, -1.53, 0.21, -1.8, -0.33],
                ["c", -0.06, -0.15, -0.06, -0.21, -0.06, -0.45],
                ["c", 0, -0.24, 0.03, -0.48, 0.6, -2.82],
                ["c", 0.42, -1.71, 0.6, -2.64, 0.63, -2.79],
                ["c", 0.03, -0.57, -0.3, -0.75, -0.84, -0.48],
                ["c", -0.24, 0.12, -0.54, 0.39, -0.66, 0.63],
                ["c", -0.03, 0.09, -0.42, 1.38, -0.9, 3],
                ["c", -0.9, 3.15, -0.84, 3, -1.14, 3.15],
                ["l", -0.15, 0.09],
                ["l", -0.78, 0],
                ["c", -0.6, 0, -0.78, 0, -0.84, -0.06],
                ["c", -0.09, -0.03, -0.18, -0.18, -0.18, -0.27],
                ["c", 0, -0.03, 0.36, -1.38, 0.84, -2.97],
                ["c", 0.57, -2.04, 0.81, -2.97, 0.84, -3.12],
                ["c", 0.03, -0.54, -0.3, -0.72, -0.84, -0.45],
                ["c", -0.24, 0.12, -0.57, 0.42, -0.66, 0.63],
                ["c", -0.06, 0.09, -0.51, 1.44, -1.05, 2.97],
                ["c", -0.51, 1.56, -0.99, 2.85, -0.99, 2.91],
                ["c", -0.06, 0.12, -0.21, 0.24, -0.36, 0.3],
                ["c", -0.12, 0.06, -0.21, 0.06, -0.9, 0.06],
                ["c", -0.6, 0, -0.78, 0, -0.84, -0.06],
                ["c", -0.09, -0.03, -0.18, -0.18, -0.18, -0.27],
                ["c", 0, -0.03, 0.45, -1.38, 0.99, -2.97],
                ["c", 1.05, -3.18, 1.05, -3.18, 0.93, -3.45],
                ["c", -0.12, -0.27, -0.39, -0.3, -0.72, -0.15],
                ["c", -0.54, 0.27, -1.14, 1.17, -1.56, 2.4],
                ["c", -0.06, 0.15, -0.15, 0.3, -0.18, 0.36],
                ["c", -0.21, 0.21, -0.57, 0.27, -0.72, 0.09],
                ["c", -0.09, -0.09, -0.06, -0.21, 0.06, -0.63],
                ["c", 0.48, -1.26, 1.26, -2.46, 2.01, -3.21],
                ["c", 0.57, -0.54, 1.2, -0.87, 1.83, -1.02],
                ["z"]
            ],
            w: 14.687,
            h: 9.126
        },
        p: {
            d: [
                ["M", 1.92, -8.7],
                ["c", 0.27, -0.09, 0.81, -0.06, 1.11, 0.03],
                ["c", 0.54, 0.18, 0.93, 0.51, 1.17, 0.99],
                ["c", 0.09, 0.15, 0.15, 0.33, 0.18, 0.36],
                ["l", 0, 0.12],
                ["l", 0.3, -0.27],
                ["c", 0.66, -0.6, 1.35, -1.02, 2.13, -1.2],
                ["c", 0.21, -0.06, 0.33, -0.06, 0.78, -0.06],
                ["c", 0.45, 0, 0.51, 0, 0.84, 0.09],
                ["c", 1.29, 0.33, 2.07, 1.32, 2.25, 2.79],
                ["c", 0.09, 0.81, -0.09, 2.01, -0.45, 2.79],
                ["c", -0.54, 1.26, -1.86, 2.55, -3.18, 3.03],
                ["c", -0.45, 0.18, -0.81, 0.24, -1.29, 0.24],
                ["c", -0.69, -0.03, -1.35, -0.18, -1.86, -0.45],
                ["c", -0.3, -0.15, -0.51, -0.18, -0.69, -0.09],
                ["c", -0.09, 0.03, -0.18, 0.09, -0.18, 0.12],
                ["c", -0.09, 0.12, -1.05, 2.94, -1.05, 3.06],
                ["c", 0, 0.24, 0.18, 0.48, 0.51, 0.63],
                ["c", 0.18, 0.06, 0.54, 0.15, 0.75, 0.15],
                ["c", 0.21, 0, 0.36, 0.06, 0.42, 0.18],
                ["c", 0.12, 0.18, 0.06, 0.42, -0.12, 0.54],
                ["c", -0.09, 0.03, -0.15, 0.03, -0.78, 0],
                ["c", -1.98, -0.15, -3.81, -0.15, -5.79, 0],
                ["c", -0.63, 0.03, -0.69, 0.03, -0.78, 0],
                ["c", -0.24, -0.15, -0.24, -0.57, 0.03, -0.66],
                ["c", 0.06, -0.03, 0.48, -0.09, 0.99, -0.12],
                ["c", 0.87, -0.06, 1.11, -0.09, 1.35, -0.21],
                ["c", 0.18, -0.06, 0.33, -0.18, 0.39, -0.3],
                ["c", 0.06, -0.12, 3.24, -9.42, 3.27, -9.6],
                ["c", 0.06, -0.33, 0.03, -0.57, -0.15, -0.69],
                ["c", -0.09, -0.06, -0.12, -0.06, -0.3, -0.06],
                ["c", -0.69, 0.06, -1.53, 1.02, -2.28, 2.61],
                ["c", -0.09, 0.21, -0.21, 0.45, -0.27, 0.51],
                ["c", -0.09, 0.12, -0.33, 0.24, -0.48, 0.24],
                ["c", -0.18, 0, -0.36, -0.15, -0.36, -0.3],
                ["c", 0, -0.24, 0.78, -1.83, 1.26, -2.55],
                ["c", 0.72, -1.11, 1.47, -1.74, 2.28, -1.92],
                ["z"],
                ["m", 5.37, 1.47],
                ["c", -0.27, -0.12, -0.75, -0.03, -1.14, 0.21],
                ["c", -0.75, 0.48, -1.47, 1.68, -1.89, 3.15],
                ["c", -0.45, 1.47, -0.42, 2.34, 0, 2.7],
                ["c", 0.45, 0.39, 1.26, 0.21, 1.83, -0.36],
                ["c", 0.51, -0.51, 0.99, -1.68, 1.38, -3.27],
                ["c", 0.3, -1.17, 0.33, -1.74, 0.15, -2.13],
                ["c", -0.09, -0.15, -0.15, -0.21, -0.33, -0.3],
                ["z"]
            ],
            w: 14.689,
            h: 13.127
        },
        r: {
            d: [
                ["M", 6.33, -9.12],
                ["c", 0.27, -0.03, 0.93, 0, 1.2, 0.06],
                ["c", 0.84, 0.21, 1.23, 0.81, 1.02, 1.53],
                ["c", -0.24, 0.75, -0.9, 1.17, -1.56, 0.96],
                ["c", -0.33, -0.09, -0.51, -0.3, -0.66, -0.75],
                ["c", -0.03, -0.12, -0.09, -0.24, -0.12, -0.3],
                ["c", -0.09, -0.15, -0.3, -0.24, -0.48, -0.24],
                ["c", -0.57, 0, -1.38, 0.54, -1.65, 1.08],
                ["c", -0.06, 0.15, -0.33, 1.17, -0.9, 3.27],
                ["c", -0.57, 2.31, -0.81, 3.12, -0.87, 3.21],
                ["c", -0.03, 0.06, -0.12, 0.15, -0.18, 0.21],
                ["l", -0.12, 0.06],
                ["l", -0.81, 0.03],
                ["c", -0.69, 0, -0.81, 0, -0.9, -0.03],
                ["c", -0.09, -0.06, -0.18, -0.21, -0.18, -0.3],
                ["c", 0, -0.06, 0.39, -1.62, 0.9, -3.51],
                ["c", 0.84, -3.24, 0.87, -3.45, 0.87, -3.72],
                ["c", 0, -0.21, 0, -0.27, -0.03, -0.36],
                ["c", -0.12, -0.15, -0.21, -0.24, -0.42, -0.24],
                ["c", -0.24, 0, -0.45, 0.15, -0.78, 0.42],
                ["c", -0.33, 0.36, -0.45, 0.54, -0.72, 1.14],
                ["c", -0.03, 0.12, -0.21, 0.24, -0.36, 0.27],
                ["c", -0.12, 0, -0.15, 0, -0.24, -0.06],
                ["c", -0.18, -0.12, -0.18, -0.21, -0.06, -0.54],
                ["c", 0.21, -0.57, 0.42, -0.93, 0.78, -1.32],
                ["c", 0.54, -0.51, 1.2, -0.81, 1.95, -0.87],
                ["c", 0.81, -0.03, 1.53, 0.3, 1.92, 0.87],
                ["l", 0.12, 0.18],
                ["l", 0.09, -0.09],
                ["c", 0.57, -0.45, 1.41, -0.84, 2.19, -0.96],
                ["z"]
            ],
            w: 9.41,
            h: 9.132
        },
        s: {
            d: [
                ["M", 4.47, -8.73],
                ["c", 0.09, 0, 0.36, -0.03, 0.57, -0.03],
                ["c", 0.75, 0.03, 1.29, 0.24, 1.71, 0.63],
                ["c", 0.51, 0.54, 0.66, 1.26, 0.36, 1.83],
                ["c", -0.24, 0.42, -0.63, 0.57, -1.11, 0.42],
                ["c", -0.33, -0.09, -0.6, -0.36, -0.6, -0.57],
                ["c", 0, -0.03, 0.06, -0.21, 0.15, -0.39],
                ["c", 0.12, -0.21, 0.15, -0.33, 0.18, -0.48],
                ["c", 0, -0.24, -0.06, -0.48, -0.15, -0.6],
                ["c", -0.15, -0.21, -0.42, -0.24, -0.75, -0.15],
                ["c", -0.27, 0.06, -0.48, 0.18, -0.69, 0.36],
                ["c", -0.39, 0.39, -0.51, 0.96, -0.33, 1.38],
                ["c", 0.09, 0.21, 0.42, 0.51, 0.78, 0.72],
                ["c", 1.11, 0.69, 1.59, 1.11, 1.89, 1.68],
                ["c", 0.21, 0.39, 0.24, 0.78, 0.15, 1.29],
                ["c", -0.18, 1.2, -1.17, 2.16, -2.52, 2.52],
                ["c", -1.02, 0.24, -1.95, 0.12, -2.7, -0.42],
                ["c", -0.72, -0.51, -0.99, -1.47, -0.6, -2.19],
                ["c", 0.24, -0.48, 0.72, -0.63, 1.17, -0.42],
                ["c", 0.33, 0.18, 0.54, 0.45, 0.57, 0.81],
                ["c", 0, 0.21, -0.03, 0.3, -0.33, 0.51],
                ["c", -0.33, 0.24, -0.39, 0.42, -0.27, 0.69],
                ["c", 0.06, 0.15, 0.21, 0.27, 0.45, 0.33],
                ["c", 0.3, 0.09, 0.87, 0.09, 1.2, 0],
                ["c", 0.75, -0.21, 1.23, -0.72, 1.29, -1.35],
                ["c", 0.03, -0.42, -0.15, -0.81, -0.54, -1.2],
                ["c", -0.24, -0.24, -0.48, -0.42, -1.41, -1.02],
                ["c", -0.69, -0.42, -1.05, -0.93, -1.05, -1.47],
                ["c", 0, -0.39, 0.12, -0.87, 0.3, -1.23],
                ["c", 0.27, -0.57, 0.78, -1.05, 1.38, -1.35],
                ["c", 0.24, -0.12, 0.63, -0.27, 0.9, -0.3],
                ["z"]
            ],
            w: 6.632,
            h: 8.758
        },
        z: {
            d: [
                ["M", 2.64, -7.95],
                ["c", 0.36, -0.09, 0.81, -0.03, 1.71, 0.27],
                ["c", 0.78, 0.21, 0.96, 0.27, 1.74, 0.3],
                ["c", 0.87, 0.06, 1.02, 0.03, 1.38, -0.21],
                ["c", 0.21, -0.15, 0.33, -0.15, 0.48, -0.06],
                ["c", 0.15, 0.09, 0.21, 0.3, 0.15, 0.45],
                ["c", -0.03, 0.06, -1.26, 1.26, -2.76, 2.67],
                ["l", -2.73, 2.55],
                ["l", 0.54, 0.03],
                ["c", 0.54, 0.03, 0.72, 0.03, 2.01, 0.15],
                ["c", 0.36, 0.03, 0.9, 0.06, 1.2, 0.09],
                ["c", 0.66, 0, 0.81, -0.03, 1.02, -0.24],
                ["c", 0.3, -0.3, 0.39, -0.72, 0.27, -1.23],
                ["c", -0.06, -0.27, -0.06, -0.27, -0.03, -0.39],
                ["c", 0.15, -0.3, 0.54, -0.27, 0.69, 0.03],
                ["c", 0.15, 0.33, 0.27, 1.02, 0.27, 1.5],
                ["c", 0, 1.47, -1.11, 2.7, -2.52, 2.79],
                ["c", -0.57, 0.03, -1.02, -0.09, -2.01, -0.51],
                ["c", -1.02, -0.42, -1.23, -0.48, -2.13, -0.54],
                ["c", -0.81, -0.06, -0.96, -0.03, -1.26, 0.18],
                ["c", -0.12, 0.06, -0.24, 0.12, -0.27, 0.12],
                ["c", -0.27, 0, -0.45, -0.3, -0.36, -0.51],
                ["c", 0.03, -0.06, 1.32, -1.32, 2.91, -2.79],
                ["l", 2.88, -2.73],
                ["c", -0.03, 0, -0.21, 0.03, -0.42, 0.06],
                ["c", -0.21, 0.03, -0.78, 0.09, -1.23, 0.12],
                ["c", -1.11, 0.12, -1.23, 0.15, -1.95, 0.27],
                ["c", -0.72, 0.15, -1.17, 0.18, -1.29, 0.09],
                ["c", -0.27, -0.18, -0.21, -0.75, 0.12, -1.26],
                ["c", 0.39, -0.6, 0.93, -1.02, 1.59, -1.2],
                ["z"]
            ],
            w: 8.573,
            h: 8.743
        },
        "+": {
            d: [
                ["M", 3.48, -11.19],
                ["c", 0.18, -0.09, 0.36, -0.09, 0.54, 0],
                ["c", 0.18, 0.09, 0.24, 0.15, 0.33, 0.3],
                ["l", 0.06, 0.15],
                ["l", 0, 1.29],
                ["l", 0, 1.29],
                ["l", 1.29, 0],
                ["c", 1.23, 0, 1.29, 0, 1.41, 0.06],
                ["c", 0.06, 0.03, 0.15, 0.09, 0.18, 0.12],
                ["c", 0.12, 0.09, 0.21, 0.33, 0.21, 0.48],
                ["c", 0, 0.15, -0.09, 0.39, -0.21, 0.48],
                ["c", -0.03, 0.03, -0.12, 0.09, -0.18, 0.12],
                ["c", -0.12, 0.06, -0.18, 0.06, -1.41, 0.06],
                ["l", -1.29, 0],
                ["l", 0, 1.29],
                ["c", 0, 1.23, 0, 1.29, -0.06, 1.41],
                ["c", -0.09, 0.18, -0.15, 0.24, -0.3, 0.33],
                ["c", -0.21, 0.09, -0.39, 0.09, -0.57, 0],
                ["c", -0.18, -0.09, -0.24, -0.15, -0.33, -0.33],
                ["c", -0.06, -0.12, -0.06, -0.18, -0.06, -1.41],
                ["l", 0, -1.29],
                ["l", -1.29, 0],
                ["c", -1.23, 0, -1.29, 0, -1.41, -0.06],
                ["c", -0.18, -0.09, -0.24, -0.15, -0.33, -0.33],
                ["c", -0.09, -0.18, -0.09, -0.36, 0, -0.54],
                ["c", 0.09, -0.18, 0.15, -0.24, 0.33, -0.33],
                ["l", 0.15, -0.06],
                ["l", 1.26, 0],
                ["l", 1.29, 0],
                ["l", 0, -1.29],
                ["c", 0, -1.23, 0, -1.29, 0.06, -1.41],
                ["c", 0.09, -0.18, 0.15, -0.24, 0.33, -0.33],
                ["z"]
            ],
            w: 7.507,
            h: 7.515
        },
        ",": {
            d: [
                ["M", 1.32, -3.36],
                ["c", 0.57, -0.15, 1.17, 0.03, 1.59, 0.45],
                ["c", 0.45, 0.45, 0.6, 0.96, 0.51, 1.89],
                ["c", -0.09, 1.23, -0.42, 2.46, -0.99, 3.93],
                ["c", -0.3, 0.72, -0.72, 1.62, -0.78, 1.68],
                ["c", -0.18, 0.21, -0.51, 0.18, -0.66, -0.06],
                ["c", -0.03, -0.06, -0.06, -0.15, -0.06, -0.18],
                ["c", 0, -0.06, 0.12, -0.33, 0.24, -0.63],
                ["c", 0.84, -1.8, 1.02, -2.61, 0.69, -3.24],
                ["c", -0.12, -0.24, -0.27, -0.36, -0.75, -0.6],
                ["c", -0.36, -0.15, -0.42, -0.21, -0.6, -0.39],
                ["c", -0.69, -0.69, -0.69, -1.71, 0, -2.4],
                ["c", 0.21, -0.21, 0.51, -0.39, 0.81, -0.45],
                ["z"]
            ],
            w: 3.452,
            h: 8.143
        },
        "-": {
            d: [
                ["M", 0.18, -5.34],
                ["c", 0.09, -0.06, 0.15, -0.06, 2.31, -0.06],
                ["c", 2.46, 0, 2.37, 0, 2.46, 0.21],
                ["c", 0.12, 0.21, 0.03, 0.42, -0.15, 0.54],
                ["c", -0.09, 0.06, -0.15, 0.06, -2.28, 0.06],
                ["c", -2.16, 0, -2.22, 0, -2.31, -0.06],
                ["c", -0.27, -0.15, -0.27, -0.54, -0.03, -0.69],
                ["z"]
            ],
            w: 5.001,
            h: 0.81
        },
        ".": {
            d: [
                ["M", 1.32, -3.36],
                ["c", 1.05, -0.27, 2.1, 0.57, 2.1, 1.65],
                ["c", 0, 1.08, -1.05, 1.92, -2.1, 1.65],
                ["c", -0.9, -0.21, -1.5, -1.14, -1.26, -2.04],
                ["c", 0.12, -0.63, 0.63, -1.11, 1.26, -1.26],
                ["z"]
            ],
            w: 3.413,
            h: 3.402
        },
        "scripts.wedge": {
            d: [
                ["M", -3.66, -7.44],
                ["c", 0.06, -0.09, 0, -0.09, 0.81, 0.03],
                ["c", 1.86, 0.3, 3.84, 0.3, 5.73, 0],
                ["c", 0.78, -0.12, 0.72, -0.12, 0.78, -0.03],
                ["c", 0.15, 0.15, 0.12, 0.24, -0.24, 0.6],
                ["c", -0.93, 0.93, -1.98, 2.76, -2.67, 4.62],
                ["c", -0.3, 0.78, -0.51, 1.71, -0.51, 2.13],
                ["c", 0, 0.15, 0, 0.18, -0.06, 0.27],
                ["c", -0.12, 0.09, -0.24, 0.09, -0.36, 0],
                ["c", -0.06, -0.09, -0.06, -0.12, -0.06, -0.27],
                ["c", 0, -0.42, -0.21, -1.35, -0.51, -2.13],
                ["c", -0.69, -1.86, -1.74, -3.69, -2.67, -4.62],
                ["c", -0.36, -0.36, -0.39, -0.45, -0.24, -0.6],
                ["z"]
            ],
            w: 7.49,
            h: 7.752
        },
        "scripts.thumb": {
            d: [
                ["M", -0.54, -3.69],
                ["c", 0.15, -0.03, 0.36, -0.06, 0.51, -0.06],
                ["c", 1.44, 0, 2.58, 1.11, 2.94, 2.85],
                ["c", 0.09, 0.48, 0.09, 1.32, 0, 1.8],
                ["c", -0.27, 1.41, -1.08, 2.43, -2.16, 2.73],
                ["l", -0.18, 0.06],
                ["l", 0, 0.12],
                ["c", 0.03, 0.06, 0.06, 0.45, 0.09, 0.87],
                ["c", 0.03, 0.57, 0.03, 0.78, 0, 0.84],
                ["c", -0.09, 0.27, -0.39, 0.48, -0.66, 0.48],
                ["c", -0.27, 0, -0.57, -0.21, -0.66, -0.48],
                ["c", -0.03, -0.06, -0.03, -0.27, 0, -0.84],
                ["c", 0.03, -0.42, 0.06, -0.81, 0.09, -0.87],
                ["l", 0, -0.12],
                ["l", -0.18, -0.06],
                ["c", -1.08, -0.3, -1.89, -1.32, -2.16, -2.73],
                ["c", -0.09, -0.48, -0.09, -1.32, 0, -1.8],
                ["c", 0.15, -0.84, 0.51, -1.53, 1.02, -2.04],
                ["c", 0.39, -0.39, 0.84, -0.63, 1.35, -0.75],
                ["z"],
                ["m", 1.05, 0.9],
                ["c", -0.15, -0.09, -0.21, -0.09, -0.45, -0.12],
                ["c", -0.15, 0, -0.3, 0.03, -0.39, 0.03],
                ["c", -0.57, 0.18, -0.9, 0.72, -1.08, 1.74],
                ["c", -0.06, 0.48, -0.06, 1.8, 0, 2.28],
                ["c", 0.15, 0.9, 0.42, 1.44, 0.9, 1.65],
                ["c", 0.18, 0.09, 0.21, 0.09, 0.51, 0.09],
                ["c", 0.3, 0, 0.33, 0, 0.51, -0.09],
                ["c", 0.48, -0.21, 0.75, -0.75, 0.9, -1.65],
                ["c", 0.03, -0.27, 0.03, -0.54, 0.03, -1.14],
                ["c", 0, -0.6, 0, -0.87, -0.03, -1.14],
                ["c", -0.15, -0.9, -0.45, -1.44, -0.9, -1.65],
                ["z"]
            ],
            w: 5.955,
            h: 9.75
        },
        "scripts.open": {
            d: [
                ["M", -0.54, -3.69],
                ["c", 0.15, -0.03, 0.36, -0.06, 0.51, -0.06],
                ["c", 1.44, 0, 2.58, 1.11, 2.94, 2.85],
                ["c", 0.09, 0.48, 0.09, 1.32, 0, 1.8],
                ["c", -0.33, 1.74, -1.47, 2.85, -2.91, 2.85],
                ["c", -1.44, 0, -2.58, -1.11, -2.91, -2.85],
                ["c", -0.09, -0.48, -0.09, -1.32, 0, -1.8],
                ["c", 0.15, -0.84, 0.51, -1.53, 1.02, -2.04],
                ["c", 0.39, -0.39, 0.84, -0.63, 1.35, -0.75],
                ["z"],
                ["m", 1.11, 0.9],
                ["c", -0.21, -0.09, -0.27, -0.09, -0.51, -0.12],
                ["c", -0.3, 0, -0.42, 0.03, -0.66, 0.15],
                ["c", -0.24, 0.12, -0.51, 0.39, -0.66, 0.63],
                ["c", -0.54, 0.93, -0.63, 2.64, -0.21, 3.81],
                ["c", 0.21, 0.54, 0.51, 0.9, 0.93, 1.11],
                ["c", 0.21, 0.09, 0.24, 0.09, 0.54, 0.09],
                ["c", 0.3, 0, 0.33, 0, 0.54, -0.09],
                ["c", 0.42, -0.21, 0.72, -0.57, 0.93, -1.11],
                ["c", 0.36, -0.99, 0.36, -2.37, 0, -3.36],
                ["c", -0.21, -0.54, -0.51, -0.9, -0.9, -1.11],
                ["z"]
            ],
            w: 5.955,
            h: 7.5
        },
        "scripts.longphrase": {
            d: [
                ["M", 1.47, -15.09],
                ["c", 0.36, -0.09, 0.66, -0.18, 0.69, -0.18],
                ["c", 0.06, 0, 0.06, 0.54, 0.06, 11.25],
                ["l", 0, 11.25],
                ["l", -0.63, 0.15],
                ["c", -0.66, 0.18, -1.44, 0.39, -1.5, 0.39],
                ["c", -0.03, 0, -0.03, -3.39, -0.03, -11.25],
                ["l", 0, -11.25],
                ["l", 0.36, -0.09],
                ["c", 0.21, -0.06, 0.66, -0.18, 1.05, -0.27],
                ["z"]
            ],
            w: 2.16,
            h: 23.04
        },
        "scripts.mediumphrase": {
            d: [
                ["M", 1.47, -7.59],
                ["c", 0.36, -0.09, 0.66, -0.18, 0.69, -0.18],
                ["c", 0.06, 0, 0.06, 0.39, 0.06, 7.5],
                ["l", 0, 7.5],
                ["l", -0.63, 0.15],
                ["c", -0.66, 0.18, -1.44, 0.39, -1.5, 0.39],
                ["c", -0.03, 0, -0.03, -2.28, -0.03, -7.5],
                ["l", 0, -7.5],
                ["l", 0.36, -0.09],
                ["c", 0.21, -0.06, 0.66, -0.18, 1.05, -0.27],
                ["z"]
            ],
            w: 2.16,
            h: 15.54
        },
        "scripts.shortphrase": {
            d: [
                ["M", 1.47, -7.59],
                ["c", 0.36, -0.09, 0.66, -0.18, 0.69, -0.18],
                ["c", 0.06, 0, 0.06, 0.21, 0.06, 3.75],
                ["l", 0, 3.75],
                ["l", -0.42, 0.09],
                ["c", -0.57, 0.18, -1.65, 0.45, -1.71, 0.45],
                ["c", -0.03, 0, -0.03, -0.72, -0.03, -3.75],
                ["l", 0, -3.75],
                ["l", 0.36, -0.09],
                ["c", 0.21, -0.06, 0.66, -0.18, 1.05, -0.27],
                ["z"]
            ],
            w: 2.16,
            h: 8.04
        },
        "scripts.snap": {
            d: [
                ["M", 4.5, -3.39],
                ["c", 0.36, -0.03, 0.96, -0.03, 1.35, 0],
                ["c", 1.56, 0.15, 3.15, 0.9, 4.2, 2.01],
                ["c", 0.24, 0.27, 0.33, 0.42, 0.33, 0.6],
                ["c", 0, 0.27, 0.03, 0.24, -2.46, 2.22],
                ["c", -1.29, 1.02, -2.4, 1.86, -2.49, 1.92],
                ["c", -0.18, 0.09, -0.3, 0.09, -0.48, 0],
                ["c", -0.09, -0.06, -1.2, -0.9, -2.49, -1.92],
                ["c", -2.49, -1.98, -2.46, -1.95, -2.46, -2.22],
                ["c", 0, -0.18, 0.09, -0.33, 0.33, -0.6],
                ["c", 1.05, -1.08, 2.64, -1.86, 4.17, -2.01],
                ["z"],
                ["m", 1.29, 1.17],
                ["c", -1.47, -0.15, -2.97, 0.3, -4.14, 1.2],
                ["l", -0.18, 0.15],
                ["l", 0.06, 0.09],
                ["c", 0.15, 0.12, 3.63, 2.85, 3.66, 2.85],
                ["c", 0.03, 0, 3.51, -2.73, 3.66, -2.85],
                ["l", 0.06, -0.09],
                ["l", -0.18, -0.15],
                ["c", -0.84, -0.66, -1.89, -1.08, -2.94, -1.2],
                ["z"]
            ],
            w: 10.38,
            h: 6.84
        }
    };
    a["noteheads.slash.whole"] = {
        d: [
            ["M", 5, -5],
            ["l", 1, 1],
            ["l", -5, 5],
            ["l", -1, -1],
            ["z"],
            ["m", 4, 6],
            ["l", -5, -5],
            ["l", 2, -2],
            ["l", 5, 5],
            ["z"],
            ["m", 0, -2],
            ["l", 1, 1],
            ["l", -5, 5],
            ["l", -1, -1],
            ["z"],
            ["m", -4, 6],
            ["l", -5, -5],
            ["l", 2, -2],
            ["l", 5, 5],
            ["z"]
        ],
        w: 10.81,
        h: 15.63
    };
    a["noteheads.slash.quarter"] = {
        d: [
            ["M", 9, -6],
            ["l", 0, 4],
            ["l", -9, 9],
            ["l", 0, -4],
            ["z"]
        ],
        w: 9,
        h: 9
    };
    a["noteheads.harmonic.quarter"] = {
        d: [
            ["M", 3.63, -4.02],
            ["c", 0.09, -0.06, 0.18, -0.09, 0.24, -0.03],
            ["c", 0.03, 0.03, 0.87, 0.93, 1.83, 2.01],
            ["c", 1.5, 1.65, 1.8, 1.98, 1.8, 2.04],
            ["c", 0, 0.06, -0.3, 0.39, -1.8, 2.04],
            ["c", -0.96, 1.08, -1.8, 1.98, -1.83, 2.01],
            ["c", -0.06, 0.06, -0.15, 0.03, -0.24, -0.03],
            ["c", -0.12, -0.09, -3.54, -3.84, -3.6, -3.93],
            ["c", -0.03, -0.03, -0.03, -0.09, -0.03, -0.15],
            ["c", 0.03, -0.06, 3.45, -3.84, 3.63, -3.96],
            ["z"]
        ],
        w: 7.5,
        h: 8.165
    };
    this.printSymbol = function(c, g, d, f, b) {
        if (!a[d]) {
            return null
        }
        var e = this.pathClone(a[d].d);
        e[0][1] += c;
        e[0][2] += g;
        return f.path().attr({
            path: e,
            stroke: "none",
            fill: "#000000", /*拍子記号 カラー*/
            "class": b
        })
    };
    this.getPathForSymbol = function(b, g, e, d, c) {
        d = d || 1;
        c = c || 1;
        if (!a[e]) {
            return null
        }
        var f = this.pathClone(a[e].d);
        if (d !== 1 || c !== 1) {
            this.pathScale(f, d, c)
        }
        f[0][1] += b;
        f[0][2] += g;
        return f
    };
    this.getSymbolWidth = function(b) {
        if (a[b]) {
            return a[b].w
        }
        return 0
    };
    this.getSymbolHeight = function(b) {
        if (a[b]) {
            return a[b].h
        }
        return 0
    };
    this.symbolHeightInPitches = function(b) {
        return this.getSymbolHeight(b) / ABCJS.write.spacing.STEP
    };
    this.getSymbolAlign = function(b) {
        if (b.substring(0, 7) === "scripts" && b !== "scripts.roll") {
            return "center"
        }
        return "left"
    };
    this.pathClone = function(g) {
        var d = [];
        for (var c = 0, e = g.length; c < e; c++) {
            d[c] = [];
            for (var b = 0, f = g[c].length; b < f; b++) {
                d[c][b] = g[c][b]
            }
        }
        return d
    };
    this.pathScale = function(h, f, d) {
        for (var c = 0, e = h.length; c < e; c++) {
            var k = h[c];
            var b, g;
            for (b = 1, g = k.length; b < g; b++) {
                k[b] *= (b % 2) ? f : d
            }
        }
    };
    this.getYCorr = function(b) {
        switch (b) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "+":
                return -2;
            case "timesig.common":
            case "timesig.cut":
                return 0;
            case "flags.d32nd":
                return -1;
            case "flags.d64th":
                return -2;
            case "flags.u32nd":
                return 1;
            case "flags.u64th":
                return 3;
            case "rests.whole":
                return 1;
            case "rests.half":
                return -1;
            case "rests.8th":
                return -1;
            case "rests.quarter":
                return -1;
            case "rests.16th":
                return -1;
            case "rests.32nd":
                return -1;
            case "rests.64th":
                return -1;
            case "f":
            case "m":
            case "p":
            case "s":
            case "z":
                return -4;
            case "scripts.trill":
            case "scripts.upbow":
            case "scripts.downbow":
                return -2;
            case "scripts.ufermata":
            case "scripts.wedge":
            case "scripts.roll":
            case "scripts.shortphrase":
            case "scripts.longphrase":
                return -1;
            case "scripts.dfermata":
                return 1;
            default:
                return 0
        }
    }
};
ABCJS.write.glyphs = new ABCJS.write.Glyphs();
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.write) {
    window.ABCJS.write = {}
}
ABCJS.write.RelativeElement = function(g, b, a, e, d) {
    d = d || {};
    this.x = 0;
    this.c = g;
    this.dx = b;
    this.w = a;
    this.pitch = e;
    this.scalex = d.scalex || 1;
    this.scaley = d.scaley || 1;
    this.type = d.type || "symbol";
    this.pitch2 = d.pitch2;
    this.linewidth = d.linewidth;
    this.klass = d.klass;
    this.top = e;
    if (this.pitch2 !== undefined && this.pitch2 > this.top) {
        this.top = this.pitch2
    }
    this.bottom = e;
    if (this.pitch2 !== undefined && this.pitch2 < this.bottom) {
        this.bottom = this.pitch2
    }
    if (d.thickness) {
        this.top += d.thickness / 2;
        this.bottom -= d.thickness / 2
    }
    if (d.stemHeight) {
        if (d.stemHeight > 0) {
            this.top += d.stemHeight
        } else {
            this.bottom += d.stemHeight
        }
    }
    this.centerVertically = false;
    var f;
    switch (this.type) {
        case "debug":
            this.chordHeightAbove = 3;
            break;
        case "lyric":
            f = this.c.split("\n").length;
            if (d.position && d.position === "below") {
                this.lyricHeightBelow = 3 * f
            } else {
                this.lyricHeightAbove = 3 * f
            }
            break;
        case "chord":
            f = this.c.split("\n").length;
            if (d.position && d.position === "below") {
                this.chordHeightBelow = 4 * f
            } else {
                this.chordHeightAbove = 4 * f
            }
            break;
        case "text":
            f = this.c.split("\n").length;
            if (this.pitch === undefined) {
                if (d.position && d.position === "below") {
                    this.chordHeightBelow = 4 * f
                } else {
                    this.chordHeightAbove = 4 * f
                }
            } else {
                this.centerVertically = true
            }
            break;
        case "part":
            this.partHeightAbove = 6;
            break
    }
};
ABCJS.write.RelativeElement.prototype.setX = function(a) {
    this.x = a + this.dx
};
ABCJS.write.RelativeElement.prototype.draw = function(b, c) {
    if (this.pitch === undefined) {
        window.console.error(this.type + " Relative Element y-coordinate not set.")
    }
    var d = b.calcY(this.pitch);
    switch (this.type) {
        case "symbol":
            if (this.c === null) {
                return null
            }
            var a = "symbol";
            if (this.klass) {
                a += " " + this.klass
            }
            this.graphelem = b.printSymbol(this.x, this.pitch, this.c, this.scalex, this.scaley, b.addClasses(a));
            break;
        case "debug":
            this.graphelem = b.renderText(this.x, b.calcY(15), "" + this.c, "debugfont", "debug-msg", "start");
            break;
        case "barNumber":
            this.graphelem = b.renderText(this.x, d, "" + this.c, "measurefont", "bar-number", "start");
            break;
        case "lyric":
            this.graphelem = b.renderText(this.x, d, this.c, "vocalfont", "abc-lyric", "middle");
            break;
        case "chord":
            this.graphelem = b.renderText(this.x, d, this.c, "gchordfont", "chord", "middle");
            break;
        case "decoration":
            this.graphelem = b.renderText(this.x, d, this.c, "annotationfont", "annotation", "middle", true);
            break;
        case "text":
            this.graphelem = b.renderText(this.x, d, this.c, "annotationfont", "annotation", "start", this.centerVertically);
            break;
        case "part":
            this.graphelem = b.renderText(this.x, d, this.c, "partsfont", "part", "start");
            break;
        case "bar":
            this.graphelem = b.printStem(this.x, this.linewidth, d, (c) ? c : b.calcY(this.pitch2));
            break;
        case "stem":
            this.graphelem = b.printStem(this.x, this.linewidth, d, b.calcY(this.pitch2));
            break;
        case "ledger":
            this.graphelem = b.printStaveLine(this.x, this.x + this.w, this.pitch);
            break
    }
    if (this.scalex !== 1 && this.graphelem) {
        this.graphelem.scale(this.scalex, this.scaley, this.x, d)
    }
    return this.graphelem
};
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.write) {
    window.ABCJS.write = {}
}
ABCJS.write.Renderer = function(b, a) {
    this.paper = b;
    this.controller = null;
    this.space = 3 * ABCJS.write.spacing.SPACE;
    this.padding = {};
    this.doRegression = a;
    if (this.doRegression) {
        this.regressionLines = []
    }
    this.reset()
};
ABCJS.write.Renderer.prototype.reset = function() {
    this.paper.clear();
    this.y = 0;
    this.abctune = null;
    this.lastM = null;
    this.ingroup = false;
    this.path = null;
    this.isPrint = false;
    this.initVerticalSpace();
    if (this.doRegression) {
        this.regressionLines = []
    }
};
ABCJS.write.Renderer.prototype.setPrintMode = function(a) {
    this.isPrint = a
};
ABCJS.write.Renderer.prototype.setPaperSize = function(maxwidth, scale) {
    var w = (maxwidth + this.padding.right) * scale;
    var h = (this.y + this.padding.bottom) * scale;
    if (this.isPrint) {
        h = Math.max(h, 1056)
    }
    if (this.doRegression) {
        this.regressionLines.push("PAPER SIZE: (" + w + "," + h + ")")
    }
    this.paper.setSize(w / scale, h / scale);
    var isIE =
        /*@cc_on!@*/
        false;
    if (isIE) {
        this.paper.canvas.parentNode.style.width = w + "px";
        this.paper.canvas.parentNode.style.height = "" + h + "px"
    } else {
        this.paper.canvas.parentNode.setAttribute("style", "width:" + w + "px")
    }
    if (scale !== 1) {
        this.paper.canvas.style.transform = "scale(" + scale + "," + scale + ")";
        this.paper.canvas.style["-ms-tranform"] = "scale(" + scale + "," + scale + ")";
        this.paper.canvas.style["-webkit-tranform"] = "scale(" + scale + "," + scale + ")";
        this.paper.canvas.style["transform-origin"] = "0 0";
        this.paper.canvas.style["-ms-transform-origin-x"] = "0";
        this.paper.canvas.style["-ms-transform-origin-y"] = "0";
        this.paper.canvas.style["-webkit-transform-origin-x"] = "0";
        this.paper.canvas.style["-webkit-transform-origin-y"] = "0"
    } else {
        this.paper.canvas.style.transform = "";
        this.paper.canvas.style["-ms-tranform"] = "";
        this.paper.canvas.style["-webkit-tranform"] = ""
    }
    this.paper.canvas.parentNode.style.overflow = "hidden";
    this.paper.canvas.parentNode.style.height = "" + h + "px"
};
ABCJS.write.Renderer.prototype.setPaddingOverride = function(a) {
    this.paddingOverride = {
        top: a.paddingtop,
        bottom: a.paddingbottom,
        right: a.paddingright,
        left: a.paddingleft
    }
};
ABCJS.write.Renderer.prototype.setPadding = function(a) {
    function b(d, c, g, f, e) {
        if (a.formatting[g] !== undefined) {
            d.padding[c] = a.formatting[g]
        } else {
            if (d.paddingOverride[c] !== undefined) {
                d.padding[c] = d.paddingOverride[c]
            } else {
                if (a.media === "print") {
                    d.padding[c] = f
                } else {
                    d.padding[c] = e
                }
            }
        }
    }
    b(this, "top", "topmargin", 38, 15);
    b(this, "bottom", "bottommargin", 38, 15);
    b(this, "left", "leftmargin", 68, 15);
    b(this, "right", "rightmargin", 68, 15)
};
ABCJS.write.Renderer.prototype.adjustNonScaledItems = function(a) {
    this.padding.top /= a;
    this.padding.bottom /= a;
    this.padding.left /= a;
    this.padding.right /= a;
    this.abctune.formatting.headerfont.size /= a;
    this.abctune.formatting.footerfont.size /= a
};
ABCJS.write.Renderer.prototype.initVerticalSpace = function() {
    this.spacing = {
        composer: 7.56,
        graceBefore: 8.67,
        graceInside: 10.67,
        graceAfter: 16,
        info: 0,
        lineSkipFactor: 1.1,
        music: 7.56,
        paragraphSkipFactor: 0.4,
        parts: 11.33,
        slurHeight: 1,
        staffSeparation: 61.33,
        stemHeight: 26.67 + 10,
        subtitle: 3.78,
        systemStaffSeparation: 48,
        text: 18.9,
        title: 7.56,
        top: 30.24,
        vocal: 30.67,
        words: 0
    }
};
ABCJS.write.Renderer.prototype.setVerticalSpace = function(a) {
    if (a.staffsep !== undefined) {
        this.spacing.staffSeparation = a.staffsep * 4 / 3
    }
    if (a.composerspace !== undefined) {
        this.spacing.composer = a.composerspace * 4 / 3
    }
    if (a.partsspace !== undefined) {
        this.spacing.parts = a.partsspace * 4 / 3
    }
    if (a.textspace !== undefined) {
        this.spacing.text = a.textspace * 4 / 3
    }
    if (a.musicspace !== undefined) {
        this.spacing.music = a.musicspace * 4 / 3
    }
    if (a.titlespace !== undefined) {
        this.spacing.title = a.titlespace * 4 / 3
    }
    if (a.sysstaffsep !== undefined) {
        this.spacing.systemStaffSeparation = a.sysstaffsep * 4 / 3
    }
    if (a.subtitlespace !== undefined) {
        this.spacing.subtitle = a.subtitlespace * 4 / 3
    }
    if (a.topspace !== undefined) {
        this.spacing.top = a.topspace * 4 / 3
    }
    if (a.vocalspace !== undefined) {
        this.spacing.vocal = a.vocalspace * 4 / 3
    }
    if (a.wordsspace !== undefined) {
        this.spacing.words = a.wordsspace * 4 / 3
    }
};
ABCJS.write.Renderer.prototype.topMargin = function(a) {
    this.moveY(this.padding.top)
};
ABCJS.write.Renderer.prototype.addMusicPadding = function() {
    this.moveY(this.spacing.music)
};
ABCJS.write.Renderer.prototype.addStaffPadding = function(g, f) {
    var e = g.staffs[g.staffs.length - 1];
    var c = -(e.bottom - 2);
    var b = f.staffs[0].top - 10;
    var d = b + c;
    var a = d * ABCJS.write.spacing.STEP;
    if (a < this.spacing.staffSeparation) {
        this.moveY(this.spacing.staffSeparation - a)
    }
};
ABCJS.write.Renderer.prototype.engraveTopText = function(c, f) {
    if (f.metaText.header && this.isPrint) {
        var e = this.getTextSize("XXXX", "headerfont", "header meta-top").height;
        this.y -= e;
        this.outputTextIf(this.padding.left, f.metaText.header.left, "headerfont", "header meta-top", 0, null, "start");
        this.outputTextIf(this.padding.left + c / 2, f.metaText.header.center, "headerfont", "header meta-top", 0, null, "middle");
        this.outputTextIf(this.padding.left + c, f.metaText.header.right, "headerfont", "header meta-top", 0, null, "end");
        this.y += e
    }
    if (this.isPrint) {
        this.moveY(this.spacing.top)
    }
    this.outputTextIf(this.padding.left + c / 2, f.metaText.title, "titlefont", "title meta-top", this.spacing.title, 0, "middle");
    if (f.lines[0]) {
        this.outputTextIf(this.padding.left + c / 2, f.lines[0].subtitle, "subtitlefont", "text meta-top", this.spacing.subtitle, 0, "middle")
    }
    if (f.metaText.rhythm || f.metaText.origin || f.metaText.composer) {
        this.moveY(this.spacing.composer);
        var a = this.outputTextIf(this.padding.left, f.metaText.rhythm, "infofont", "meta-top", 0, null, "start");
        var b = "";
        if (f.metaText.composer) {
            b += f.metaText.composer
        }
        if (f.metaText.origin) {
            b += " (" + f.metaText.origin + ")"
        }
        if (b.length > 0) {
            var d = this.outputTextIf(this.padding.left + c, b, "composerfont", "meta-top", 0, null, "end");
            this.moveY(d[1])
        } else {
            this.moveY(a[1])
        }
        this.moveY(-6)
    }
    this.outputTextIf(this.padding.left + c, f.metaText.author, "composerfont", "meta-top", 0, 0, "end");
    this.outputTextIf(this.padding.left, f.metaText.partOrder, "partsfont", "meta-bottom", 0, 0, "start")
};
ABCJS.write.Renderer.prototype.engraveExtraText = function(c, e) {
    this.lineNumber = null;
    this.measureNumber = null;
    var d;
    if (e.metaText.unalignedWords) {
        d = "";
        for (var b = 0; b < e.metaText.unalignedWords.length; b++) {
            if (typeof e.metaText.unalignedWords[b] === "string") {
                d += e.metaText.unalignedWords[b] + "\n"
            } else {
                for (var a = 0; a < e.metaText.unalignedWords[b].length; a++) {
                    d += " FONT " + e.metaText.unalignedWords[b][a].text
                }
                d += "\n"
            }
        }
        this.outputTextIf(this.padding.left + ABCJS.write.spacing.INDENT, d, "wordsfont", "meta-bottom", this.spacing.words, 2, "start")
    }
    d = "";
    if (e.metaText.book) {
        d += "Book: " + e.metaText.book + "\n"
    }
    if (e.metaText.source) {
        d += "Source: " + e.metaText.source + "\n"
    }
    if (e.metaText.discography) {
        d += "Discography: " + e.metaText.discography + "\n"
    }
    if (e.metaText.notes) {
        d += "Notes: " + e.metaText.notes + "\n"
    }
    if (e.metaText.transcription) {
        d += "Transcription: " + e.metaText.transcription + "\n"
    }
    if (e.metaText.history) {
        d += "History: " + e.metaText.history + "\n"
    }
    if (e.metaText["abc-copyright"]) {
        d += "Copyright: " + e.metaText["abc-copyright"] + "\n"
    }
    if (e.metaText["abc-creator"]) {
        d += "Creator: " + e.metaText["abc-creator"] + "\n"
    }
    if (e.metaText["abc-edited-by"]) {
        d += "Edited By: " + e.metaText["abc-edited-by"] + "\n"
    }
    this.outputTextIf(this.padding.left, d, "historyfont", "meta-bottom", this.spacing.info, 0, "start");
    if (e.metaText.footer && this.isPrint) {
        this.outputTextIf(this.padding.left, e.metaText.footer.left, "footerfont", "header meta-bottom", 0, null, "start");
        this.outputTextIf(this.padding.left + c / 2, e.metaText.footer.center, "footerfont", "header meta-bottom", 0, null, "middle");
        this.outputTextIf(this.padding.left + c, e.metaText.footer.right, "footerfont", "header meta-bottom", 0, null, "end")
    }
};
ABCJS.write.Renderer.prototype.outputFreeText = function(c) {
    if (typeof c === "string") {
        this.outputTextIf(this.padding.left, c, "textfont", "defined-text", 0, 1, "start")
    } else {
        var b = "";
        for (var a = 0; a < c.length; a++) {
            b += " FONT " + c[a].text
        }
        this.outputTextIf(this.padding.left, b, "textfont", "defined-text", 0, 1, "start")
    }
};
ABCJS.write.Renderer.prototype.outputSubtitle = function(b, a) {
    this.outputTextIf(this.padding.left + b / 2, a, "subtitlefont", "text meta-top", this.spacing.subtitle, 0, "middle")
};
ABCJS.write.Renderer.prototype.beginGroup = function() {
    this.path = [];
    this.lastM = [0, 0];
    this.ingroup = true
};
ABCJS.write.Renderer.prototype.addPath = function(c) {
    c = c || [];
    if (c.length === 0) {
        return
    }
    c[0][0] = "m";
    c[0][1] -= this.lastM[0];
    c[0][2] -= this.lastM[1];
    this.lastM[0] += c[0][1];
    this.lastM[1] += c[0][2];
    this.path.push(c[0]);
    for (var a = 1, b = c.length; a < b; a++) {
        if (c[a][0] === "m") {
            this.lastM[0] += c[a][1];
            this.lastM[1] += c[a][2]
        }
        this.path.push(c[a])
    }
};
ABCJS.write.Renderer.prototype.endGroup = function(a) {
    this.ingroup = false;
    if (this.path.length === 0) {
        return null
    }
    var b = this.paper.path().attr({
        path: this.path,
        stroke: "none",
        fill: "#000000", 
        "class": this.addClasses(a)
    });
    this.path = [];
    if (this.doRegression) {
        this.addToRegression(b)
    }
    return b
};
ABCJS.write.Renderer.prototype.printStaveLine = function(x1, x2, pitch, klass) {
    var extraClass = "staff";
    if (klass !== undefined) {
        extraClass += " " + klass
    }
    var isIE =
        /*@cc_on!@*/
        false;
    var dy = 0.35;
    var fill = "#000000";
    if (isIE) {
        dy = 1;
        fill = "#666666"
    }
    var y = this.calcY(pitch);
    var pathString = ABCJS.write.sprintf("M %f %f L %f %f L %f %f L %f %f z", x1, y - dy, x2, y - dy, x2, y + dy, x1, y + dy);
    var ret = this.paper.path().attr({
        path: pathString,
        stroke: "none",
        fill: fill,
        "class": this.addClasses(extraClass)
    }).toBack();
    if (this.doRegression) {
        this.addToRegression(ret)
    }
    return ret
};
ABCJS.write.Renderer.prototype.printStem = function(x, dx, y1, y2) {
    if (dx < 0) {
        var tmp = y2;
        y2 = y1;
        y1 = tmp
    }
    var isIE =
        /*@cc_on!@*/
        false;
    var fill = "#000000";
    if (isIE && dx < 1) {
        dx = 1;
        fill = "#666666"
    }
    if (~~x === x) {
        x += 0.05
    }
    var pathArray = [
        ["M", x, y1],
        ["L", x, y2],
        ["L", x + dx, y2],
        ["L", x + dx, y1],
        ["z"]
    ];
    if (!isIE && this.ingroup) {
        this.addPath(pathArray)
    } else {
        var ret = this.paper.path().attr({
            path: pathArray,
            stroke: "none",
            fill: fill,
            "class": this.addClasses("stem")
        }).toBack();
        if (this.doRegression) {
            this.addToRegression(ret)
        }
        return ret
    }
};

function kernSymbols(b, d, a) {
    var c = a;
    if (b === "f" && d === "f") {
        c = c * 2 / 3
    }
    if (b === "p" && d === "p") {
        c = c * 5 / 6
    }
    if (b === "f" && d === "z") {
        c = c * 5 / 8
    }
    return c
}
ABCJS.write.Renderer.prototype.printSymbol = function(k, d, c, g, f, j) {
    var b;
    var a;
    if (!c) {
        return null
    }
    if (c.length > 0 && c.indexOf(".") < 0) {
        var h = this.paper.set();
        var m = 0;
        for (var e = 0; e < c.length; e++) {
            var l = c.charAt(e);
            a = ABCJS.write.glyphs.getYCorr(l);
            b = ABCJS.write.glyphs.printSymbol(k + m, this.calcY(d + a), l, this.paper, j);
            if (b) {
                if (this.doRegression) {
                    this.addToRegression(b)
                }
                h.push(b);
                if (e < c.length - 1) {
                    m += kernSymbols(l, c.charAt(e + 1), ABCJS.write.glyphs.getSymbolWidth(l))
                }
            } else {
                this.renderText(k, this.y, "no symbol:" + c, "debugfont", "debug-msg", "start")
            }
        }
        return h
    } else {
        a = ABCJS.write.glyphs.getYCorr(c);
        if (this.ingroup) {
            this.addPath(ABCJS.write.glyphs.getPathForSymbol(k, this.calcY(d + a), c, g, f))
        } else {
            b = ABCJS.write.glyphs.printSymbol(k, this.calcY(d + a), c, this.paper, j);
            if (b) {
                if (this.doRegression) {
                    this.addToRegression(b)
                }
                return b
            } else {
                this.renderText(k, this.y, "no symbol:" + c, "debugfont", "debug-msg", "start")
            }
        }
        return null
    }
};
ABCJS.write.Renderer.prototype.printPath = function(b) {
    var a = this.paper.path().attr(b);
    if (this.doRegression) {
        this.addToRegression(a)
    }
    return a
};
ABCJS.write.Renderer.prototype.drawArc = function(n, m, q, p, o) {
    n = n + 6;
    m = m + 4;
    q = q + ((o) ? 1.5 : -1.5);
    p = p + ((o) ? 1.5 : -1.5);
    var c = this.calcY(q);
    var b = this.calcY(p);
    var h = m - n;
    var g = b - c;
    var f = Math.sqrt(h * h + g * g);
    var e = h / f;
    var d = g / f;
    var u = f / 3.5;
    var i = ((o) ? -1 : 1) * Math.min(25, Math.max(4, u));
    var l = n + u * e - i * d;
    var t = c + u * d + i * e;
    var j = m - u * e - i * d;
    var r = b - u * d + i * e;
    var a = 2;
    var k = ABCJS.write.sprintf("M %f %f C %f %f %f %f %f %f C %f %f %f %f %f %f z", n, c, l, t, j, r, m, b, j - a * d, r + a * e, l - a * d, t + a * e, n, c);
    var s = this.paper.path().attr({
        path: k,
        stroke: "none",
        fill: "#000000",
        "class": this.addClasses("slur")
    });
    if (this.doRegression) {
        this.addToRegression(s)
    }
    return s
};
ABCJS.write.Renderer.prototype.calcY = function(a) {
    return this.y - a * ABCJS.write.spacing.STEP
};
ABCJS.write.Renderer.prototype.printStave = function(b, e, c) {
    var a = "top-line";
    if (c === 1) {
        this.printStaveLine(b, e, 6, a);
        return
    }
    for (var d = c - 1; d >= 0; d--) {
        this.printStaveLine(b, e, (d + 1) * 2, a);
        a = undefined
    }
};
ABCJS.write.Renderer.prototype.addClasses = function(b) {
    var a = [];
    if (b.length > 0) {
        a.push(b)
    }
    if (this.lineNumber !== null) {
        a.push("l" + this.lineNumber)
    }
    if (this.measureNumber !== null) {
        a.push("m" + this.measureNumber)
    }
    return a.join(" ")
};
ABCJS.write.Renderer.prototype.getFontAndAttr = function(d, b) {
    var c = this.abctune.formatting[d];
    if (c) {
        c = {
            face: c.face,
            size: c.size * 4 / 3,
            decoration: c.decoration,
            style: c.style,
            weight: c.weight
        }
    } else {
        c = {
            face: "Arial",
            size: 12 * 4 / 3,
            decoration: "underline",
            style: "normal",
            weight: "normal"
        }
    }
    var a = {
        "font-size": c.size,
        "font-style": c.style,
        "font-family": c.face,
        "font-weight": c.weight,
        "text-decoration": c.decoration,
        "class": this.addClasses(b)
    };
    a.font = "";
    return {
        font: c,
        attr: a
    }
};
ABCJS.write.Renderer.prototype.getTextSize = function(f, d, a) {
    var e = this.getFontAndAttr(d, a);
    var c = this.paper.text(0, 0, f).attr(e.attr);
    var b = c.getBBox();
    c.remove();
    return b
};
ABCJS.write.Renderer.prototype.renderText = function(h, g, i, f, e, c, d) {
    var b = this.getFontAndAttr(f, e);
    if (c) {
        b.attr["text-anchor"] = c
    }
    i = i.replace(/\n\n/g, "\n \n");
    var a = this.paper.text(h, g, i).attr(b.attr);
    if (!d) {
        var j = a.getBBox();
        a.attr({
            y: g + j.height / 2
        });
        if (b.font.box) {
            this.paper.rect(j.x - 1, j.y - 1, j.width + 2, j.height + 2).attr({
                stroke: "#cccccc"
            })
        }
    }
    if (f === "debugfont") {
        console.log("Debug msg: " + i);
        a.attr({
            stroke: "#ff0000"
        })
    }
    if (this.doRegression) {
        this.addToRegression(a)
    }
    return a
};
ABCJS.write.Renderer.prototype.moveY = function(b, a) {
    if (a === undefined) {
        a = 1
    }
    this.y += b * a
};
ABCJS.write.Renderer.prototype.skipSpaceY = function() {
    this.y += this.space
};
ABCJS.write.Renderer.prototype.outputTextIf = function(i, h, d, f, b, e, g) {
    if (h) {
        if (b) {
            this.moveY(b)
        }
        var c = this.renderText(i, this.y, h, d, f, g);
        if (e !== null) {
            var a = h.split("\n").length;
            this.moveY(c.getBBox().height / a, (a + e))
        }
        return [c.getBBox().width, c.getBBox().height]
    }
    return [0, 0]
};
ABCJS.write.Renderer.prototype.printHorizontalLine = function(b, e, g) {
    var k = 0.35;
    var j = "rgba(0,0,255,.4)";
    var h = this.y;
    if (e) {
        h = e
    }
    h = Math.round(h);
    this.paper.text(10, h, "" + Math.round(h)).attr({
        "text-anchor": "start",
        "font-size": "18px",
        fill: j,
        stroke: j
    });
    var c = 50;
    var a = b;
    var d = ABCJS.write.sprintf("M %f %f L %f %f L %f %f L %f %f z", c, h - k, c + a, h - k, a, h + k, c, h + k);
    this.paper.path().attr({
        path: d,
        stroke: "none",
        fill: j,
        "class": this.addClasses("staff")
    }).toBack();
    for (var f = 1; f < b / 100; f++) {
        d = ABCJS.write.sprintf("M %f %f L %f %f L %f %f L %f %f z", f * 100 - k, h - 5, f * 100 - k, h + 5, f * 100 + k, h - 5, f * 100 + k, h + 5);
        this.paper.path().attr({
            path: d,
            stroke: "none",
            fill: j,
            "class": this.addClasses("staff")
        }).toBack()
    }
    if (g) {
        this.paper.text(b + 70, h, g).attr({
            "text-anchor": "start",
            "font-size": "18px",
            fill: j,
            stroke: j
        })
    }
};
ABCJS.write.Renderer.prototype.printShadedBox = function(b, g, d, a, c, f) {
    var e = this.paper.rect(b, g, d, a).attr({
        fill: c,
        stroke: c
    });
    if (f) {
        this.paper.text(0, g + 7, f).attr({
            "text-anchor": "start",
            "font-size": "14px",
            fill: "rgba(0,0,255,.4)",
            stroke: "rgba(0,0,255,.4)"
        })
    }
    return e
};
ABCJS.write.Renderer.prototype.printVerticalLine = function(a, e, d) {
    var b = 0.35;
    var f = "#00aaaa";
    var c = ABCJS.write.sprintf("M %f %f L %f %f L %f %f L %f %f z", a - b, e, a - b, d, a + b, e, a + b, d);
    this.paper.path().attr({
        path: c,
        stroke: "none",
        fill: f,
        "class": this.addClasses("staff")
    }).toBack();
    c = ABCJS.write.sprintf("M %f %f L %f %f L %f %f L %f %f z", a - 20, e, a - 20, e + 3, a, e, a, e + 3);
    this.paper.path().attr({
        path: c,
        stroke: "none",
        fill: f,
        "class": this.addClasses("staff")
    }).toBack();
    c = ABCJS.write.sprintf("M %f %f L %f %f L %f %f L %f %f z", a + 20, d, a + 20, d + 3, a, d, a, d + 3);
    this.paper.path().attr({
        path: c,
        stroke: "none",
        fill: f,
        "class": this.addClasses("staff")
    }).toBack()
};
ABCJS.write.Renderer.prototype.addToRegression = function(c) {
    var d = c.getBBox();
    var e = c.type + " " + d.toString() + " ";
    var a = [];
    for (var b in c.attrs) {
        if (c.attrs.hasOwnProperty(b)) {
            if (b === "class") {
                e = c.attrs[b] + " " + e
            } else {
                a.push(b + ": " + c.attrs[b])
            }
        }
    }
    a.sort();
    e += "{ " + a.join(" ") + " }";
    this.regressionLines.push(e)
};
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.write) {
    window.ABCJS.write = {}
}
ABCJS.write.StaffGroupElement = function() {
    this.voices = [];
    this.staffs = []
};
ABCJS.write.StaffGroupElement.prototype.setLimit = function(b, a) {
    if (!a.specialY[b]) {
        return
    }
    if (!a.staff.specialY[b]) {
        a.staff.specialY[b] = a.specialY[b]
    } else {
        a.staff.specialY[b] = Math.max(a.staff.specialY[b], a.specialY[b])
    }
};
ABCJS.write.StaffGroupElement.prototype.addVoice = function(d, c, a) {
    var b = this.voices.length;
    this.voices[b] = d;
    if (this.staffs[c]) {
        this.staffs[c].voices.push(b)
    } else {
        this.staffs[this.staffs.length] = {
            top: 10,
            bottom: 2,
            lines: a,
            voices: [b],
            specialY: {
                tempoHeightAbove: 0,
                partHeightAbove: 0,
                volumeHeightAbove: 0,
                dynamicHeightAbove: 0,
                endingHeightAbove: 0,
                chordHeightAbove: 0,
                lyricHeightAbove: 0,
                lyricHeightBelow: 0,
                chordHeightBelow: 0,
                volumeHeightBelow: 0,
                dynamicHeightBelow: 0
            }
        }
    }
    d.staff = this.staffs[c]
};
ABCJS.write.StaffGroupElement.prototype.setStaffLimits = function(a) {
    a.staff.top = Math.max(a.staff.top, a.top);
    a.staff.bottom = Math.min(a.staff.bottom, a.bottom);
    this.setLimit("tempoHeightAbove", a);
    this.setLimit("partHeightAbove", a);
    this.setLimit("volumeHeightAbove", a);
    this.setLimit("dynamicHeightAbove", a);
    this.setLimit("endingHeightAbove", a);
    this.setLimit("chordHeightAbove", a);
    this.setLimit("lyricHeightAbove", a);
    this.setLimit("lyricHeightBelow", a);
    this.setLimit("chordHeightBelow", a);
    this.setLimit("volumeHeightBelow", a);
    this.setLimit("dynamicHeightBelow", a)
};
ABCJS.write.StaffGroupElement.prototype.setUpperAndLowerElements = function(h) {
    var a;
    for (var c = 0; c < this.staffs.length; c++) {
        var m = this.staffs[c];
        var g = {
            tempoHeightAbove: 0,
            partHeightAbove: 0,
            volumeHeightAbove: 0,
            dynamicHeightAbove: 0,
            endingHeightAbove: 0,
            chordHeightAbove: 0,
            lyricHeightAbove: 0,
            lyricHeightBelow: 0,
            chordHeightBelow: 0,
            volumeHeightBelow: 0,
            dynamicHeightBelow: 0
        };
        if (ABCJS.write.debugPlacement) {
            m.originalTop = m.top;
            m.originalBottom = m.bottom
        }
        if (m.specialY.lyricHeightAbove) {
            m.top += m.specialY.lyricHeightAbove;
            g.lyricHeightAbove = m.top
        }
        if (m.specialY.chordHeightAbove) {
            m.top += m.specialY.chordHeightAbove;
            g.chordHeightAbove = m.top
        }
        if (m.specialY.endingHeightAbove) {
            if (m.specialY.chordHeightAbove) {
                m.top += 2
            } else {
                m.top += m.specialY.endingHeightAbove
            }
            g.endingHeightAbove = m.top
        }
        if (m.specialY.dynamicHeightAbove && m.specialY.volumeHeightAbove) {
            m.top += Math.max(m.specialY.dynamicHeightAbove, m.specialY.volumeHeightAbove);
            g.dynamicHeightAbove = m.top;
            g.volumeHeightAbove = m.top
        } else {
            if (m.specialY.dynamicHeightAbove) {
                m.top += m.specialY.dynamicHeightAbove;
                g.dynamicHeightAbove = m.top
            } else {
                if (m.specialY.volumeHeightAbove) {
                    m.top += m.specialY.volumeHeightAbove;
                    g.volumeHeightAbove = m.top
                }
            }
        }
        if (m.specialY.partHeightAbove) {
            m.top += m.specialY.partHeightAbove;
            g.partHeightAbove = m.top
        }
        if (m.specialY.tempoHeightAbove) {
            m.top += m.specialY.tempoHeightAbove;
            g.tempoHeightAbove = m.top
        }
        if (m.specialY.lyricHeightBelow) {
            g.lyricHeightBelow = m.bottom;
            m.bottom -= m.specialY.lyricHeightBelow
        }
        if (m.specialY.chordHeightBelow) {
            g.chordHeightBelow = m.bottom;
            m.bottom -= m.specialY.chordHeightBelow
        }
        if (m.specialY.volumeHeightBelow && m.specialY.dynamicHeightBelow) {
            g.volumeHeightBelow = m.bottom;
            g.dynamicHeightBelow = m.bottom;
            m.bottom -= Math.max(m.specialY.volumeHeightBelow, m.specialY.dynamicHeightBelow)
        } else {
            if (m.specialY.volumeHeightBelow) {
                g.volumeHeightBelow = m.bottom;
                m.bottom -= m.specialY.volumeHeightBelow
            } else {
                if (m.specialY.dynamicHeightBelow) {
                    g.dynamicHeightBelow = m.bottom;
                    m.bottom -= m.specialY.dynamicHeightBelow
                }
            }
        }
        if (ABCJS.write.debugPlacement) {
            m.positionY = g
        }
        for (var b = 0; b < m.voices.length; b++) {
            var k = this.voices[m.voices[b]];
            k.setUpperAndLowerElements(g)
        }
        if (a !== undefined) {
            var f = m.top - 10;
            var e = a + f;
            var l = h.spacing.systemStaffSeparation / ABCJS.write.spacing.STEP;
            var d = l - e;
            if (d > 0) {
                m.top += d
            }
        }
        a = 2 - m.bottom
    }
};
ABCJS.write.StaffGroupElement.prototype.finished = function() {
    for (var a = 0; a < this.voices.length; a++) {
        if (!this.voices[a].layoutEnded()) {
            return false
        }
    }
    return true
};
ABCJS.write.StaffGroupElement.prototype.layout = function(h, g, a) {
    this.spacingunits = 0;
    this.minspace = 1000;
    var m = g.padding.left;
    var b = 0;
    for (var e = 0; e < this.voices.length; e++) {
        if (this.voices[e].header) {
            var r = g.getTextSize(this.voices[e].header, "voicefont", "");
            b = Math.max(b, r.width)
        }
    }
    m = m + b * 1.1;
    this.startx = m;
    var d = 0;
    if (a) {
        console.log("init layout")
    }
    for (e = 0; e < this.voices.length; e++) {
        this.voices[e].beginLayout(m)
    }
    var l = 0;
    while (!this.finished()) {
        d = null;
        for (e = 0; e < this.voices.length; e++) {
            if (!this.voices[e].layoutEnded() && (!d || this.voices[e].getDurationIndex() < d)) {
                d = this.voices[e].getDurationIndex()
            }
        }
        if (a) {
            console.log("currentduration: ", d)
        }
        var o = [];
        var n = [];
        for (e = 0; e < this.voices.length; e++) {
            if (this.voices[e].getDurationIndex() !== d) {
                n.push(this.voices[e])
            } else {
                o.push(this.voices[e]);
                if (a) {
                    console.log("in: voice ", e)
                }
            }
        }
        l = 0;
        var p = 0;
        for (e = 0; e < o.length; e++) {
            if (o[e].getNextX() > m) {
                m = o[e].getNextX();
                l = o[e].getSpacingUnits();
                p = o[e].spacingduration
            }
        }
        this.spacingunits += l;
        this.minspace = Math.min(this.minspace, l);
        for (e = 0; e < o.length; e++) {
            var f = o[e].layoutOneItem(m, h);
            var q = f - m;
            if (q > 0) {
                m = f;
                for (var c = 0; c < e; c++) {
                    o[c].shiftRight(q)
                }
            }
        }
        for (e = 0; e < n.length; e++) {
            n[e].spacingduration -= p;
            n[e].updateNextX(m, h)
        }
        for (e = 0; e < o.length; e++) {
            var k = o[e];
            k.updateIndices()
        }
    }
    for (e = 0; e < this.voices.length; e++) {
        if (this.voices[e].getNextX() > m) {
            m = this.voices[e].getNextX();
            l = this.voices[e].getSpacingUnits()
        }
    }
    this.spacingunits += l;
    this.w = m;
    for (e = 0; e < this.voices.length; e++) {
        this.voices[e].w = this.w
    }
};
ABCJS.write.StaffGroupElement.prototype.calcHeight = function() {
    var b = 0;
    for (var c = 0; c < this.voices.length; c++) {
        var a = this.voices[c].staff;
        if (!this.voices[c].duplicate) {
            b += a.top;
            if (a.bottom < 0) {
                b += -a.bottom
            }
        }
    }
    return b
};
ABCJS.write.StaffGroupElement.prototype.draw = function(l) {
    var b;
    var m;
    if (ABCJS.write.debugPlacement) {
        var a = ["rgba(207,27,36,0.4)", "rgba(168,214,80,0.4)", "rgba(110,161,224,0.4)", "rgba(191,119,218,0.4)", "rgba(195,30,151,0.4)", "rgba(31,170,177,0.4)", "rgba(220,166,142,0.4)"];
        b = function(j, o) {
            if (j.positionY[o]) {
                var i = j.specialY[o] * ABCJS.write.spacing.STEP;
                l.printShadedBox(l.padding.left, l.calcY(j.positionY[o]), l.controller.width, i, a[m], o.substr(0, 4));
                m += 1;
                if (m > 6) {
                    m = 0
                }
            }
        }
    }
    var g = l.y;
    for (var d = 0; d < this.staffs.length; d++) {
        var f = this.staffs[d];
        l.moveY(ABCJS.write.spacing.STEP, f.top);
        f.absoluteY = l.y;
        if (ABCJS.write.debugPlacement) {
            m = 0;
            l.printShadedBox(l.padding.left, l.calcY(f.originalTop), l.controller.width, l.calcY(f.originalBottom) - l.calcY(f.originalTop), "rgba(0,0,0,0.1)");
            b(f, "chordHeightAbove");
            b(f, "chordHeightBelow");
            b(f, "dynamicHeightAbove");
            b(f, "dynamicHeightBelow");
            b(f, "endingHeightAbove");
            b(f, "lyricHeightAbove");
            b(f, "lyricHeightBelow");
            b(f, "partHeightAbove");
            b(f, "tempoHeightAbove");
            b(f, "volumeHeightAbove");
            b(f, "volumeHeightBelow")
        }
        if (f.bottom < 0) {
            l.moveY(ABCJS.write.spacing.STEP, -f.bottom)
        }
    }
    var h;
    var c;
    var k = 0;
    l.measureNumber = null;
    for (var e = 0; e < this.voices.length; e++) {
        var n = this.voices[e].staff;
        l.y = n.absoluteY;
        if (!this.voices[e].duplicate) {
            if (!h) {
                h = l.calcY(10)
            }
            c = l.calcY(2);
            if (n.lines !== 0) {
                l.printStave(this.startx, this.w, n.lines)
            }
        }
        this.voices[e].draw(l, k);
        if (!this.voices[e].duplicate) {
            k = l.calcY(2)
        }
    }
    l.measureNumber = null;
    if (this.staffs.length > 1) {
        l.printStem(this.startx, 0.6, h, c)
    }
    l.y = g
};
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.write) {
    window.ABCJS.write = {}
}(function() {
    var a = 5;
    ABCJS.write.TempoElement = function(b) {
        this.tempo = b;
        this.tempoHeightAbove = a;
        this.pitch = undefined
    };
    ABCJS.write.TempoElement.prototype.setUpperAndLowerElements = function(b) {
        this.pitch = b.tempoHeightAbove
    };
    ABCJS.write.TempoElement.prototype.setX = function(b) {
        this.x = b
    };
    ABCJS.write.TempoElement.prototype.draw = function(v) {
        var m = this.x;
        if (this.pitch === undefined) {
            window.console.error("Tempo Element y-coordinate not set.")
        }
        var k = v.calcY(this.pitch);
        var q;
        if (this.tempo.preString) {
            q = v.renderText(m, k, this.tempo.preString, "tempofont", "tempo", "start");
            var B = q.getBBox().width;
            var g = B / this.tempo.preString.length;
            m += B + g
        }
        if (this.tempo.duration) {
            var h = 0.75;
            var z = this.pitch - a + 1;
            var b = this.tempo.duration[0];
            var p = new ABCJS.write.AbsoluteElement(this.tempo, b, 1, "tempo");
            var w = Math.floor(Math.log(b) / Math.log(2));
            var s = 0;
            for (var o = Math.pow(2, w), l = o / 2; o < b; s++, o += l, l /= 2) {}
            var C = v.engraver.chartable.note[-w];
            var A = v.engraver.chartable.uflags[-w];
            var r = v.engraver.createNoteHead(p, C, {
                verticalPos: z
            }, "up", 0, 0, A, s, 0, h);
            p.addHead(r);
            var j;
            if (b < 1) {
                var f = z + 1 / 3 * h;
                var e = z + 7 * h;
                var n = r.dx + r.w;
                var t = -0.6;
                j = new ABCJS.write.RelativeElement(null, n, 0, f, {
                    type: "stem",
                    pitch2: e,
                    linewidth: t
                });
                j.setX(m);
                p.addExtra(j)
            }
            p.x = m;
            r.setX(m);
            r.draw(v, m);
            if (j) {
                j.draw(v, m)
            }
            m += (p.w + 5);
            var u = "= " + this.tempo.bpm;
            q = v.renderText(m, k, u, "tempofont", "tempo", "start");
            var d = q.getBBox().width;
            var i = d / u.length;
            m += d + i
        }
        if (this.tempo.postString) {
            v.renderText(m, k, this.tempo.postString, "tempofont", "tempo", "start")
        }
    }
})();
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.write) {
    window.ABCJS.write = {}
}
ABCJS.write.TieElem = function(e, c, a, d, b) {
    this.anchor1 = e;
    this.anchor2 = c;
    this.above = a;
    this.force = d;
    this.isTie = b
};
ABCJS.write.TieElem.prototype.setEndAnchor = function(a) {
    this.anchor2 = a
};
ABCJS.write.TieElem.prototype.setStartX = function(a) {
    this.startLimitX = a
};
ABCJS.write.TieElem.prototype.setEndX = function(a) {
    this.endLimitX = a
};
ABCJS.write.TieElem.prototype.setUpperAndLowerElements = function(a) {};
ABCJS.write.TieElem.prototype.layout = function(b, c) {
    function a(f, e, d) {
        if (d) {
            return f.pitch
        }
        if (e && f.highestVert !== undefined) {
            return f.highestVert
        }
        return f.pitch
    }
    if (!this.force && this.anchor2 && this.anchor2.pitch === this.anchor2.highestVert) {
        this.above = true
    }
    if (this.anchor1) {
        this.startX = this.anchor1.x
    } else {
        if (this.startLimitX) {
            this.startX = this.startLimitX.x + this.startLimitX.w
        } else {
            this.startX = b
        }
    }
    if (this.anchor2) {
        this.endX = this.anchor2.x
    } else {
        if (this.endLimitX) {
            this.endX = this.endLimitX.x
        } else {
            this.endX = c
        }
    }
    if (this.anchor1 && this.anchor2) {
        this.startY = a(this.anchor1, this.above, this.isTie);
        this.endY = a(this.anchor2, this.above, this.isTie)
    } else {
        if (this.anchor1) {
            this.startY = a(this.anchor1, this.above, this.isTie);
            this.endY = a(this.anchor1, this.above, this.isTie)
        } else {
            if (this.anchor2) {
                this.startY = a(this.anchor2, this.above, this.isTie);
                this.endY = a(this.anchor2, this.above, this.isTie)
            } else {
                this.startY = this.above ? 14 : 0;
                this.endY = this.above ? 14 : 0
            }
        }
    }
};
ABCJS.write.TieElem.prototype.draw = function(b, c, a) {
    this.layout(c, a);
    b.drawArc(this.startX, this.endX, this.startY, this.endY, this.above)
};
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.write) {
    window.ABCJS.write = {}
}(function() {
    ABCJS.write.TripletElem = function(d, c) {
        this.anchor1 = c;
        this.number = d
    };
    ABCJS.write.TripletElem.prototype.setCloseAnchor = function(c) {
        this.anchor2 = c
    };
    ABCJS.write.TripletElem.prototype.setUpperAndLowerElements = function() {};
    ABCJS.write.TripletElem.prototype.draw = function(e) {
        if (this.anchor1 && this.anchor2) {
            var i;
            var h;
            var g = this.anchor1.parent.beam && this.anchor1.parent.beam === this.anchor2.parent.beam;
            if (g) {
                var d = this.anchor1.parent.beam;
                var f = d.isAbove() ? this.anchor1.x + this.anchor1.w : this.anchor1.x;
                i = d.xAtMidpoint(f, this.anchor2.x);
                h = d.heightAtMidpoint(f, this.anchor2.x);
                h += d.isAbove() ? 4 : -4
            } else {
                var c = Math.max(this.anchor1.parent.top, 9) + 4;
                var j = Math.max(this.anchor2.parent.top, 9) + 4;
                i = this.anchor1.x + (this.anchor2.x + this.anchor2.w - this.anchor1.x) / 2;
                h = c + (j - c) / 2;
                a(e, this.anchor1.x, c, this.anchor2.x + this.anchor2.w, j)
            }
            e.renderText(i, e.calcY(h), "" + this.number, "tripletfont", "triplet", "middle", true)
        }
    };

    function b(h, d, f, g, c) {
        var e = ABCJS.write.sprintf("M %f %f L %f %f", d, f, g, c);
        h.printPath({
            path: e,
            stroke: "#000000",
            "class": h.addClasses("triplet")
        })
    }

    function a(h, d, m, c, j) {
        m = h.calcY(m);
        j = h.calcY(j);
        var p = 5;
        b(h, d, m, d, m + p);
        b(h, c, j, c, j + p);
        var n = d + (c - d) / 2;
        var k = m + (j - m) / 2;
        var e = 8;
        var f = (j - m) / (c - d);
        var o = n - e;
        var l = m + (o - d) * f;
        b(h, d, m, o, l);
        var i = n + e;
        var g = m + (i - d) * f;
        b(h, i, g, c, j)
    }
})();
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.write) {
    window.ABCJS.write = {}
}
ABCJS.write.VoiceElement = function(b, a) {
    this.children = [];
    this.beams = [];
    this.otherchildren = [];
    this.w = 0;
    this.duplicate = false;
    this.voicenumber = b;
    this.voicetotal = a;
    this.bottom = 7;
    this.top = 7;
    this.specialY = {
        tempoHeightAbove: 0,
        partHeightAbove: 0,
        volumeHeightAbove: 0,
        dynamicHeightAbove: 0,
        endingHeightAbove: 0,
        chordHeightAbove: 0,
        lyricHeightAbove: 0,
        lyricHeightBelow: 0,
        chordHeightBelow: 0,
        volumeHeightBelow: 0,
        dynamicHeightBelow: 0
    }
};
ABCJS.write.VoiceElement.prototype.addChild = function(c) {
    if (c.type === "bar") {
        var b = true;
        for (var a = 0; b && a < this.children.length; a++) {
            if (this.children[a].type !== "staff-extra") {
                b = false
            }
        }
        if (!b) {
            this.beams.push("bar");
            this.otherchildren.push("bar")
        }
    }
    this.children[this.children.length] = c;
    this.setRange(c)
};
ABCJS.write.VoiceElement.prototype.setLimit = function(c, b) {
    var a = b.specialY;
    if (!a) {
        a = b
    }
    if (!a[c]) {
        return
    }
    if (!this.specialY[c]) {
        this.specialY[c] = a[c]
    } else {
        this.specialY[c] = Math.max(this.specialY[c], a[c])
    }
};
ABCJS.write.VoiceElement.prototype.adjustRange = function(a) {
    if (a.bottom !== undefined) {
        this.bottom = Math.min(this.bottom, a.bottom)
    }
    if (a.top !== undefined) {
        this.top = Math.max(this.top, a.top)
    }
};
ABCJS.write.VoiceElement.prototype.setRange = function(a) {
    this.adjustRange(a);
    this.setLimit("tempoHeightAbove", a);
    this.setLimit("partHeightAbove", a);
    this.setLimit("volumeHeightAbove", a);
    this.setLimit("dynamicHeightAbove", a);
    this.setLimit("endingHeightAbove", a);
    this.setLimit("chordHeightAbove", a);
    this.setLimit("lyricHeightAbove", a);
    this.setLimit("lyricHeightBelow", a);
    this.setLimit("chordHeightBelow", a);
    this.setLimit("volumeHeightBelow", a);
    this.setLimit("dynamicHeightBelow", a)
};
ABCJS.write.VoiceElement.prototype.setUpperAndLowerElements = function(c) {
    var a;
    for (a = 0; a < this.children.length; a++) {
        var b = this.children[a];
        b.setUpperAndLowerElements(c)
    }
    for (a = 0; a < this.otherchildren.length; a++) {
        var b = this.otherchildren[a];
        if (typeof b !== "string") {
            b.setUpperAndLowerElements(c)
        }
    }
};
ABCJS.write.VoiceElement.prototype.addOther = function(a) {
    if (a instanceof ABCJS.write.BeamElem) {
        this.beams.push(a)
    } else {
        this.otherchildren.push(a);
        this.setRange(a)
    }
};
ABCJS.write.VoiceElement.prototype.updateIndices = function() {
    if (!this.layoutEnded()) {
        this.durationindex += this.children[this.i].duration;
        if (this.children[this.i].duration === 0) {
            this.durationindex = Math.round(this.durationindex * 64) / 64
        }
        this.i++
    }
};
ABCJS.write.VoiceElement.prototype.layoutEnded = function() {
    return (this.i >= this.children.length)
};
ABCJS.write.VoiceElement.prototype.getDurationIndex = function() {
    return this.durationindex - (this.children[this.i] && (this.children[this.i].duration > 0) ? 0 : 5e-7)
};
ABCJS.write.VoiceElement.prototype.getSpacingUnits = function() {
    return Math.sqrt(this.spacingduration * 8)
};
ABCJS.write.VoiceElement.prototype.getNextX = function() {
    return Math.max(this.minx, this.nextx)
};
ABCJS.write.VoiceElement.prototype.beginLayout = function(a) {
    this.i = 0;
    this.durationindex = 0;
    this.startx = a;
    this.minx = a;
    this.nextx = a;
    this.spacingduration = 0
};
ABCJS.write.VoiceElement.prototype.layoutOneItem = function(a, d) {
    var c = this.children[this.i];
    if (!c) {
        return 0
    }
    var b = a - this.minx;
    if (b < c.getExtraWidth()) {
        a += c.getExtraWidth() - b
    }
    c.setX(a);
    this.spacingduration = c.duration;
    this.minx = a + c.getMinWidth();
    if (this.i !== this.children.length - 1) {
        this.minx += c.minspacing
    }
    this.updateNextX(a, d);
    return a
};
ABCJS.write.VoiceElement.prototype.updateNextX = function(a, b) {
    this.nextx = a + (b * Math.sqrt(this.spacingduration * 8))
};
ABCJS.write.VoiceElement.prototype.shiftRight = function(a) {
    var b = this.children[this.i];
    if (!b) {
        return
    }
    b.setX(b.x + a);
    this.minx += a;
    this.nextx += a
};
ABCJS.write.VoiceElement.prototype.draw = function(e, d) {
    var a = this.w - 1;
    e.staffbottom = this.staff.bottom;
    e.measureNumber = null;
    if (this.header) {
        var f = 14 - (this.voicenumber + 1) * (12 / (this.voicetotal + 1));
        e.renderText(e.padding.left, e.calcY(f), this.header, "voicefont", "staff-extra voice-name", "start")
    }
    for (var c = 0, g = this.children.length; c < g; c++) {
        var b = this.children[c];
        var j = false;
        if (b.type !== "staff-extra" && e.measureNumber === null) {
            e.measureNumber = 0;
            j = true
        }
        b.draw(e, (this.barto || c === g - 1) ? d : 0);
        if (b.type === "bar" && !j) {
            e.measureNumber++
        }
    }
    e.measureNumber = 0;
    window.ABCJS.parse.each(this.beams, function(i) {
        if (i === "bar") {
            e.measureNumber++
        } else {
            i.draw(e)
        }
    });
    e.measureNumber = 0;
    var h = this;
    window.ABCJS.parse.each(this.otherchildren, function(i) {
        if (i === "bar") {
            e.measureNumber++
        } else {
            i.draw(e, h.startx + 10, a)
        }
    })
};
ABCJS.write.VoiceElement.prototype.layoutBeams = function() {
    for (var b = 0; b < this.beams.length; b++) {
        if (this.beams[b].layout) {
            this.beams[b].layout();
            for (var a = 0; a < this.beams[b].elems.length; a++) {
                this.adjustRange(this.beams[b].elems[a])
            }
        }
    }
    this.staff.top = Math.max(this.staff.top, this.top);
    this.staff.bottom = Math.min(this.staff.bottom, this.bottom)
};
if (!window.ABCJS) {
    window.ABCJS = {}
}
if (!window.ABCJS.write) {
    window.ABCJS.write = {}
}
ABCJS.write.sprintf = function() {
    var g = 0,
        e, h = arguments[g++],
        k = [],
        d, j, l, b;
    while (h) {
        if (d = /^[^\x25]+/.exec(h)) {
            k.push(d[0])
        } else {
            if (d = /^\x25{2}/.exec(h)) {
                k.push("%")
            } else {
                if (d = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(h)) {
                    if (((e = arguments[d[1] || g++]) == null) || (e == undefined)) {
                        throw ("Too few arguments.")
                    }
                    if (/[^s]/.test(d[7]) && (typeof(e) != "number")) {
                        throw ("Expecting number but found " + typeof(e))
                    }
                    switch (d[7]) {
                        case "b":
                            e = e.toString(2);
                            break;
                        case "c":
                            e = String.fromCharCode(e);
                            break;
                        case "d":
                            e = parseInt(e);
                            break;
                        case "e":
                            e = d[6] ? e.toExponential(d[6]) : e.toExponential();
                            break;
                        case "f":
                            e = d[6] ? parseFloat(e).toFixed(d[6]) : parseFloat(e);
                            break;
                        case "o":
                            e = e.toString(8);
                            break;
                        case "s":
                            e = ((e = String(e)) && d[6] ? e.substring(0, d[6]) : e);
                            break;
                        case "u":
                            e = Math.abs(e);
                            break;
                        case "x":
                            e = e.toString(16);
                            break;
                        case "X":
                            e = e.toString(16).toUpperCase();
                            break
                    }
                    e = (/[def]/.test(d[7]) && d[2] && e > 0 ? "+" + e : e);
                    l = d[3] ? d[3] == "0" ? "0" : d[3].charAt(1) : " ";
                    b = d[5] - String(e).length;
                    j = d[5] ? str_repeat(l, b) : "";
                    k.push(d[4] ? e + j : j + e)
                } else {
                    throw ("Huh ?!")
                }
            }
        }
        h = h.substring(d[0].length)
    }
    return k.join("")
};