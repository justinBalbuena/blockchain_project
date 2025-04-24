(() => {
  // node_modules/kaplay/dist/kaplay.mjs
  var tu = Object.defineProperty;
  var s = (t18, e) => tu(t18, "name", { value: e, configurable: true });
  var Eo = (() => {
    for (var t18 = new Uint8Array(128), e = 0; e < 64; e++) t18[e < 26 ? e + 65 : e < 52 ? e + 71 : e < 62 ? e - 4 : e * 4 - 205] = e;
    return (n) => {
      for (var r = n.length, o = new Uint8Array((r - (n[r - 1] == "=") - (n[r - 2] == "=")) * 3 / 4 | 0), i = 0, a = 0; i < r; ) {
        var l = t18[n.charCodeAt(i++)], u = t18[n.charCodeAt(i++)], m = t18[n.charCodeAt(i++)], d = t18[n.charCodeAt(i++)];
        o[a++] = l << 2 | u >> 4, o[a++] = u << 4 | m >> 2, o[a++] = m << 6 | d;
      }
      return o;
    };
  })();
  var K = class t {
    static {
      s(this, "Color");
    }
    r = 255;
    g = 255;
    b = 255;
    constructor(e, n, r) {
      this.r = Se(e, 0, 255), this.g = Se(n, 0, 255), this.b = Se(r, 0, 255);
    }
    static fromArray(e) {
      return new t(e[0], e[1], e[2]);
    }
    static fromHex(e) {
      if (typeof e == "number") return new t(e >> 16 & 255, e >> 8 & 255, e >> 0 & 255);
      if (typeof e == "string") {
        let n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        if (!n) throw new Error("Invalid hex color format");
        return new t(parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16));
      } else throw new Error("Invalid hex color format");
    }
    static fromHSL(e, n, r) {
      if (n == 0) return new t(255 * r, 255 * r, 255 * r);
      let o = s((d, C, p) => (p < 0 && (p += 1), p > 1 && (p -= 1), p < 1 / 6 ? d + (C - d) * 6 * p : p < 1 / 2 ? C : p < 2 / 3 ? d + (C - d) * (2 / 3 - p) * 6 : d), "hue2rgb"), i = r < 0.5 ? r * (1 + n) : r + n - r * n, a = 2 * r - i, l = o(a, i, e + 1 / 3), u = o(a, i, e), m = o(a, i, e - 1 / 3);
      return new t(Math.round(l * 255), Math.round(u * 255), Math.round(m * 255));
    }
    static RED = new t(255, 0, 0);
    static GREEN = new t(0, 255, 0);
    static BLUE = new t(0, 0, 255);
    static YELLOW = new t(255, 255, 0);
    static MAGENTA = new t(255, 0, 255);
    static CYAN = new t(0, 255, 255);
    static WHITE = new t(255, 255, 255);
    static BLACK = new t(0, 0, 0);
    clone() {
      return new t(this.r, this.g, this.b);
    }
    lighten(e) {
      return new t(this.r + e, this.g + e, this.b + e);
    }
    darken(e) {
      return this.lighten(-e);
    }
    invert() {
      return new t(255 - this.r, 255 - this.g, 255 - this.b);
    }
    mult(e) {
      return new t(this.r * e.r / 255, this.g * e.g / 255, this.b * e.b / 255);
    }
    lerp(e, n) {
      return new t(fe(this.r, e.r, n), fe(this.g, e.g, n), fe(this.b, e.b, n));
    }
    toHSL() {
      let e = this.r / 255, n = this.g / 255, r = this.b / 255, o = Math.max(e, n, r), i = Math.min(e, n, r), a = (o + i) / 2, l = a, u = a;
      if (o == i) a = l = 0;
      else {
        let m = o - i;
        switch (l = u > 0.5 ? m / (2 - o - i) : m / (o + i), o) {
          case e:
            a = (n - r) / m + (n < r ? 6 : 0);
            break;
          case n:
            a = (r - e) / m + 2;
            break;
          case r:
            a = (e - n) / m + 4;
            break;
        }
        a /= 6;
      }
      return [a, l, u];
    }
    eq(e) {
      return this.r === e.r && this.g === e.g && this.b === e.b;
    }
    toString() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    toHex() {
      return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
    }
    toArray() {
      return [this.r, this.g, this.b];
    }
  };
  function I(...t18) {
    if (t18.length === 0) return new K(255, 255, 255);
    if (t18.length === 1) {
      if (t18[0] instanceof K) return t18[0].clone();
      if (typeof t18[0] == "string") return K.fromHex(t18[0]);
      if (Array.isArray(t18[0]) && t18[0].length === 3) return K.fromArray(t18[0]);
    } else if (t18.length === 2) {
      if (t18[0] instanceof K) return t18[0].clone();
    } else if (t18.length === 3 || t18.length === 4) return new K(t18[0], t18[1], t18[2]);
    throw new Error("Invalid color arguments");
  }
  s(I, "rgb");
  var To = s((t18, e, n) => K.fromHSL(t18, e, n), "hsl2rgb");
  function ue(t18) {
    return t18 * Math.PI / 180;
  }
  s(ue, "deg2rad");
  function lt(t18) {
    return t18 * 180 / Math.PI;
  }
  s(lt, "rad2deg");
  function Se(t18, e, n) {
    return e > n ? Se(t18, n, e) : Math.min(Math.max(t18, e), n);
  }
  s(Se, "clamp");
  function fe(t18, e, n) {
    if (typeof t18 == "number" && typeof e == "number") return t18 + (e - t18) * n;
    if (t18 instanceof E && e instanceof E) return t18.lerp(e, n);
    if (t18 instanceof K && e instanceof K) return t18.lerp(e, n);
    throw new Error(`Bad value for lerp(): ${t18}, ${e}. Only number, Vec2 and Color is supported.`);
  }
  s(fe, "lerp");
  function Ve(t18, e, n, r, o) {
    return r + (t18 - e) / (n - e) * (o - r);
  }
  s(Ve, "map");
  function So(t18, e, n, r, o) {
    return Se(Ve(t18, e, n, r, o), r, o);
  }
  s(So, "mapc");
  var E = class t2 {
    static {
      s(this, "Vec2");
    }
    x = 0;
    y = 0;
    constructor(e = 0, n = e) {
      this.x = e, this.y = n;
    }
    static fromAngle(e) {
      let n = ue(e);
      return new t2(Math.cos(n), Math.sin(n));
    }
    static fromArray(e) {
      return new t2(e[0], e[1]);
    }
    static ZERO = new t2(0, 0);
    static ONE = new t2(1, 1);
    static LEFT = new t2(-1, 0);
    static RIGHT = new t2(1, 0);
    static UP = new t2(0, -1);
    static DOWN = new t2(0, 1);
    clone() {
      return new t2(this.x, this.y);
    }
    add(...e) {
      let n = v(...e);
      return new t2(this.x + n.x, this.y + n.y);
    }
    sub(...e) {
      let n = v(...e);
      return new t2(this.x - n.x, this.y - n.y);
    }
    scale(...e) {
      let n = v(...e);
      return new t2(this.x * n.x, this.y * n.y);
    }
    dist(...e) {
      let n = v(...e);
      return this.sub(n).len();
    }
    sdist(...e) {
      let n = v(...e);
      return this.sub(n).slen();
    }
    static sdist(e, n) {
      let r = e.x - n.x, o = e.y - n.y;
      return r * r + o * o;
    }
    len() {
      return Math.sqrt(this.dot(this));
    }
    slen() {
      return this.dot(this);
    }
    unit() {
      let e = this.len();
      return e === 0 ? new t2(0) : this.scale(1 / e);
    }
    normal() {
      return new t2(this.y, -this.x);
    }
    reflect(e) {
      return this.sub(e.scale(2 * this.dot(e)));
    }
    project(e) {
      return e.scale(e.dot(this) / e.len());
    }
    reject(e) {
      return this.sub(this.project(e));
    }
    dot(e) {
      return this.x * e.x + this.y * e.y;
    }
    static dot(e, n) {
      return e.x * e.x + e.y * e.y;
    }
    cross(e) {
      return this.x * e.y - this.y * e.x;
    }
    static cross(e, n) {
      return e.x * n.y - e.y * n.x;
    }
    angle(...e) {
      let n = v(...e);
      return lt(Math.atan2(this.y - n.y, this.x - n.x));
    }
    angleBetween(...e) {
      let n = v(...e);
      return lt(Math.atan2(this.cross(n), this.dot(n)));
    }
    lerp(e, n) {
      return new t2(fe(this.x, e.x, n), fe(this.y, e.y, n));
    }
    slerp(e, n) {
      let r = this.dot(e), o = this.cross(e), i = Math.atan2(o, r);
      return this.scale(Math.sin((1 - n) * i)).add(e.scale(Math.sin(n * i))).scale(1 / o);
    }
    isZero() {
      return this.x === 0 && this.y === 0;
    }
    toFixed(e) {
      return new t2(Number(this.x.toFixed(e)), Number(this.y.toFixed(e)));
    }
    transform(e) {
      return e.multVec2(this);
    }
    eq(e) {
      return this.x === e.x && this.y === e.y;
    }
    bbox() {
      return new $(this, 0, 0);
    }
    toString() {
      return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
    toArray() {
      return [this.x, this.y];
    }
  };
  function v(...t18) {
    if (t18.length === 1) {
      if (t18[0] instanceof E) return new E(t18[0].x, t18[0].y);
      if (Array.isArray(t18[0]) && t18[0].length === 2) return new E(...t18[0]);
    }
    return new E(...t18);
  }
  s(v, "vec2");
  var z2 = class t3 {
    static {
      s(this, "Quad");
    }
    x = 0;
    y = 0;
    w = 1;
    h = 1;
    constructor(e, n, r, o) {
      this.x = e, this.y = n, this.w = r, this.h = o;
    }
    scale(e) {
      return new t3(this.x + this.w * e.x, this.y + this.h * e.y, this.w * e.w, this.h * e.h);
    }
    pos() {
      return new E(this.x, this.y);
    }
    clone() {
      return new t3(this.x, this.y, this.w, this.h);
    }
    eq(e) {
      return this.x === e.x && this.y === e.y && this.w === e.w && this.h === e.h;
    }
    toString() {
      return `quad(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
    }
  };
  function me(t18, e, n, r) {
    return new z2(t18, e, n, r);
  }
  s(me, "quad");
  var Dt = class t4 {
    static {
      s(this, "Mat2");
    }
    a;
    b;
    c;
    d;
    constructor(e, n, r, o) {
      this.a = e, this.b = n, this.c = r, this.d = o;
    }
    mul(e) {
      return new t4(this.a * e.a + this.b * e.c, this.a * e.b + this.b * e.d, this.c * e.a + this.d * e.c, this.c * e.b + this.d * e.d);
    }
    transform(e) {
      return v(this.a * e.x + this.b * e.y, this.c * e.x + this.d * e.y);
    }
    get inverse() {
      let e = this.det;
      return new t4(this.d / e, -this.b / e, -this.c / e, this.a / e);
    }
    get transpose() {
      return new t4(this.a, this.c, this.b, this.d);
    }
    get eigenvalues() {
      let e = this.trace / 2, n = this.det, r = e + Math.sqrt(e * e - n), o = e - Math.sqrt(e * e - n);
      return [r, o];
    }
    eigenvectors(e, n) {
      return this.c != 0 ? [[e - this.d, this.c], [n - this.d, this.c]] : this.b != 0 ? [[this.b, e - this.a], [this.b, n - this.a]] : Math.abs(this.transform(v(1, 0)).x - e) < Number.EPSILON ? [[1, 0], [0, 1]] : [[0, 1], [1, 0]];
    }
    get det() {
      return this.a * this.d - this.b * this.c;
    }
    get trace() {
      return this.a + this.d;
    }
    static rotation(e) {
      let n = Math.cos(e), r = Math.sin(e);
      return new t4(n, r, -r, n);
    }
    static scale(e, n) {
      return new t4(e, 0, 0, n);
    }
  };
  var bt = class t5 {
    static {
      s(this, "Mat3");
    }
    m11;
    m12;
    m13;
    m21;
    m22;
    m23;
    m31;
    m32;
    m33;
    constructor(e, n, r, o, i, a, l, u, m) {
      this.m11 = e, this.m12 = n, this.m13 = r, this.m21 = o, this.m22 = i, this.m23 = a, this.m31 = l, this.m32 = u, this.m33 = m;
    }
    static fromMat2(e) {
      return new t5(e.a, e.b, 0, e.c, e.d, 0, 0, 0, 1);
    }
    toMat2() {
      return new Dt(this.m11, this.m12, this.m21, this.m22);
    }
    mul(e) {
      return new t5(this.m11 * e.m11 + this.m12 * e.m21 + this.m13 * e.m31, this.m11 * e.m12 + this.m12 * e.m22 + this.m13 * e.m32, this.m11 * e.m13 + this.m12 * e.m23 + this.m13 * e.m33, this.m21 * e.m11 + this.m22 * e.m21 + this.m23 * e.m31, this.m21 * e.m12 + this.m22 * e.m22 + this.m23 * e.m32, this.m21 * e.m13 + this.m22 * e.m23 + this.m23 * e.m33, this.m31 * e.m11 + this.m32 * e.m21 + this.m33 * e.m31, this.m31 * e.m12 + this.m32 * e.m22 + this.m33 * e.m32, this.m31 * e.m13 + this.m32 * e.m23 + this.m33 * e.m33);
    }
    get det() {
      return this.m11 * this.m22 * this.m33 + this.m12 * this.m23 * this.m31 + this.m13 * this.m21 * this.m32 - this.m13 * this.m22 * this.m31 - this.m12 * this.m21 * this.m33 - this.m11 * this.m23 * this.m32;
    }
    rotate(e) {
      let n = Math.cos(e), r = Math.sin(e), o = this.m11, i = this.m12;
      return this.m11 = n * this.m11 + r * this.m21, this.m12 = n * this.m12 + r * this.m22, this.m21 = n * this.m21 - r * o, this.m22 = n * this.m22 - r * i, this;
    }
    scale(e, n) {
      return this.m11 *= e, this.m12 *= e, this.m21 *= n, this.m22 *= n, this;
    }
    get inverse() {
      let e = this.det;
      return new t5((this.m22 * this.m33 - this.m23 * this.m32) / e, (this.m13 * this.m32 - this.m12 * this.m33) / e, (this.m12 * this.m23 - this.m13 * this.m22) / e, (this.m23 * this.m31 - this.m21 * this.m33) / e, (this.m11 * this.m33 - this.m13 * this.m31) / e, (this.m13 * this.m21 - this.m11 * this.m23) / e, (this.m21 * this.m32 - this.m22 * this.m31) / e, (this.m12 * this.m31 - this.m11 * this.m32) / e, (this.m11 * this.m22 - this.m12 * this.m21) / e);
    }
    get transpose() {
      return new t5(this.m11, this.m21, this.m31, this.m12, this.m22, this.m32, this.m13, this.m23, this.m33);
    }
  };
  var he = class t6 {
    static {
      s(this, "Mat4");
    }
    m = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    constructor(e) {
      e && (this.m = e);
    }
    static translate(e) {
      return new t6([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e.x, e.y, 0, 1]);
    }
    static scale(e) {
      return new t6([e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    static rotateX(e) {
      e = ue(-e);
      let n = Math.cos(e), r = Math.sin(e);
      return new t6([1, 0, 0, 0, 0, n, -r, 0, 0, r, n, 0, 0, 0, 0, 1]);
    }
    static rotateY(e) {
      e = ue(-e);
      let n = Math.cos(e), r = Math.sin(e);
      return new t6([n, 0, r, 0, 0, 1, 0, 0, -r, 0, n, 0, 0, 0, 0, 1]);
    }
    static rotateZ(e) {
      e = ue(-e);
      let n = Math.cos(e), r = Math.sin(e);
      return new t6([n, -r, 0, 0, r, n, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    translate(e) {
      return this.m[12] += this.m[0] * e.x + this.m[4] * e.y, this.m[13] += this.m[1] * e.x + this.m[5] * e.y, this.m[14] += this.m[2] * e.x + this.m[6] * e.y, this.m[15] += this.m[3] * e.x + this.m[7] * e.y, this;
    }
    scale(e) {
      return this.m[0] *= e.x, this.m[4] *= e.y, this.m[1] *= e.x, this.m[5] *= e.y, this.m[2] *= e.x, this.m[6] *= e.y, this.m[3] *= e.x, this.m[7] *= e.y, this;
    }
    rotate(e) {
      e = ue(-e);
      let n = Math.cos(e), r = Math.sin(e), o = this.m[0], i = this.m[1], a = this.m[4], l = this.m[5];
      return this.m[0] = o * n + i * r, this.m[1] = -o * r + i * n, this.m[4] = a * n + l * r, this.m[5] = -a * r + l * n, this;
    }
    mult(e) {
      let n = [];
      for (let r = 0; r < 4; r++) for (let o = 0; o < 4; o++) n[r * 4 + o] = this.m[0 * 4 + o] * e.m[r * 4 + 0] + this.m[1 * 4 + o] * e.m[r * 4 + 1] + this.m[2 * 4 + o] * e.m[r * 4 + 2] + this.m[3 * 4 + o] * e.m[r * 4 + 3];
      return new t6(n);
    }
    multVec2(e) {
      return new E(e.x * this.m[0] + e.y * this.m[4] + this.m[12], e.x * this.m[1] + e.y * this.m[5] + this.m[13]);
    }
    getTranslation() {
      return new E(this.m[12], this.m[13]);
    }
    getScale() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = this.m[0] * this.m[5] - this.m[1] * this.m[4], n = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new E(n, e / n);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = this.m[0] * this.m[5] - this.m[1] * this.m[4], n = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new E(e / n, n);
      } else return new E(0, 0);
    }
    getRotation() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return lt(this.m[1] > 0 ? Math.acos(this.m[0] / e) : -Math.acos(this.m[0] / e));
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return lt(Math.PI / 2 - (this.m[5] > 0 ? Math.acos(-this.m[4] / e) : -Math.acos(this.m[4] / e)));
      } else return 0;
    }
    getSkew() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new E(Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e), 0);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new E(0, Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e));
      } else return new E(0, 0);
    }
    invert() {
      let e = [], n = this.m[10] * this.m[15] - this.m[14] * this.m[11], r = this.m[9] * this.m[15] - this.m[13] * this.m[11], o = this.m[9] * this.m[14] - this.m[13] * this.m[10], i = this.m[8] * this.m[15] - this.m[12] * this.m[11], a = this.m[8] * this.m[14] - this.m[12] * this.m[10], l = this.m[8] * this.m[13] - this.m[12] * this.m[9], u = this.m[6] * this.m[15] - this.m[14] * this.m[7], m = this.m[5] * this.m[15] - this.m[13] * this.m[7], d = this.m[5] * this.m[14] - this.m[13] * this.m[6], C = this.m[4] * this.m[15] - this.m[12] * this.m[7], p = this.m[4] * this.m[14] - this.m[12] * this.m[6], b = this.m[5] * this.m[15] - this.m[13] * this.m[7], f = this.m[4] * this.m[13] - this.m[12] * this.m[5], O = this.m[6] * this.m[11] - this.m[10] * this.m[7], g = this.m[5] * this.m[11] - this.m[9] * this.m[7], y = this.m[5] * this.m[10] - this.m[9] * this.m[6], V = this.m[4] * this.m[11] - this.m[8] * this.m[7], A = this.m[4] * this.m[10] - this.m[8] * this.m[6], D = this.m[4] * this.m[9] - this.m[8] * this.m[5];
      e[0] = this.m[5] * n - this.m[6] * r + this.m[7] * o, e[4] = -(this.m[4] * n - this.m[6] * i + this.m[7] * a), e[8] = this.m[4] * r - this.m[5] * i + this.m[7] * l, e[12] = -(this.m[4] * o - this.m[5] * a + this.m[6] * l), e[1] = -(this.m[1] * n - this.m[2] * r + this.m[3] * o), e[5] = this.m[0] * n - this.m[2] * i + this.m[3] * a, e[9] = -(this.m[0] * r - this.m[1] * i + this.m[3] * l), e[13] = this.m[0] * o - this.m[1] * a + this.m[2] * l, e[2] = this.m[1] * u - this.m[2] * m + this.m[3] * d, e[6] = -(this.m[0] * u - this.m[2] * C + this.m[3] * p), e[10] = this.m[0] * b - this.m[1] * C + this.m[3] * f, e[14] = -(this.m[0] * d - this.m[1] * p + this.m[2] * f), e[3] = -(this.m[1] * O - this.m[2] * g + this.m[3] * y), e[7] = this.m[0] * O - this.m[2] * V + this.m[3] * A, e[11] = -(this.m[0] * g - this.m[1] * V + this.m[3] * D), e[15] = this.m[0] * y - this.m[1] * A + this.m[2] * D;
      let G = this.m[0] * e[0] + this.m[1] * e[4] + this.m[2] * e[8] + this.m[3] * e[12];
      for (let x = 0; x < 4; x++) for (let w = 0; w < 4; w++) e[x * 4 + w] *= 1 / G;
      return new t6(e);
    }
    clone() {
      return new t6([...this.m]);
    }
    toString() {
      return this.m.toString();
    }
  };
  function Sn(t18, e, n, r = (o) => -Math.cos(o)) {
    return t18 + (r(n) + 1) / 2 * (e - t18);
  }
  s(Sn, "wave");
  var nu = 1103515245;
  var ru = 12345;
  var Ao = 2147483648;
  var Xt = class {
    static {
      s(this, "RNG");
    }
    seed;
    constructor(e) {
      this.seed = e;
    }
    gen() {
      return this.seed = (nu * this.seed + ru) % Ao, this.seed / Ao;
    }
    genNumber(e, n) {
      return e + this.gen() * (n - e);
    }
    genVec2(e, n) {
      return new E(this.genNumber(e.x, n.x), this.genNumber(e.y, n.y));
    }
    genColor(e, n) {
      return new K(this.genNumber(e.r, n.r), this.genNumber(e.g, n.g), this.genNumber(e.b, n.b));
    }
    genAny(...e) {
      if (e.length === 0) return this.gen();
      if (e.length === 1) {
        if (typeof e[0] == "number") return this.genNumber(0, e[0]);
        if (e[0] instanceof E) return this.genVec2(v(0, 0), e[0]);
        if (e[0] instanceof K) return this.genColor(I(0, 0, 0), e[0]);
      } else if (e.length === 2) {
        if (typeof e[0] == "number" && typeof e[1] == "number") return this.genNumber(e[0], e[1]);
        if (e[0] instanceof E && e[1] instanceof E) return this.genVec2(e[0], e[1]);
        if (e[0] instanceof K && e[1] instanceof K) return this.genColor(e[0], e[1]);
      }
      throw new Error("More than 2 arguments not supported");
    }
  };
  var Cr = new Xt(Date.now());
  function Vo(t18) {
    return t18 != null && (Cr.seed = t18), Cr.seed;
  }
  s(Vo, "randSeed");
  function ge(...t18) {
    return Cr.genAny(...t18);
  }
  s(ge, "rand");
  function wr(...t18) {
    return Math.floor(ge(...t18.length > 0 ? t18 : [2]));
  }
  s(wr, "randi");
  function Po(t18) {
    return ge() <= t18;
  }
  s(Po, "chance");
  function Or(t18) {
    for (let e = t18.length - 1; e > 0; e--) {
      let n = Math.floor(Math.random() * (e + 1));
      [t18[e], t18[n]] = [t18[n], t18[e]];
    }
    return t18;
  }
  s(Or, "shuffle");
  function Go(t18, e) {
    return t18.length <= e ? t18.slice() : Or(t18.slice()).slice(0, e);
  }
  s(Go, "chooseMultiple");
  function Mo(t18) {
    return t18[wr(t18.length)];
  }
  s(Mo, "choose");
  function Er(t18, e) {
    return t18.pos.x + t18.width > e.pos.x && t18.pos.x < e.pos.x + e.width && t18.pos.y + t18.height > e.pos.y && t18.pos.y < e.pos.y + e.height;
  }
  s(Er, "testRectRect");
  function ou(t18, e) {
    if (t18.p1.x === t18.p2.x && t18.p1.y === t18.p2.y || e.p1.x === e.p2.x && e.p1.y === e.p2.y) return null;
    let n = (e.p2.y - e.p1.y) * (t18.p2.x - t18.p1.x) - (e.p2.x - e.p1.x) * (t18.p2.y - t18.p1.y);
    if (n === 0) return null;
    let r = ((e.p2.x - e.p1.x) * (t18.p1.y - e.p1.y) - (e.p2.y - e.p1.y) * (t18.p1.x - e.p1.x)) / n, o = ((t18.p2.x - t18.p1.x) * (t18.p1.y - e.p1.y) - (t18.p2.y - t18.p1.y) * (t18.p1.x - e.p1.x)) / n;
    return r < 0 || r > 1 || o < 0 || o > 1 ? null : r;
  }
  s(ou, "testLineLineT");
  function Vn(t18, e) {
    let n = ou(t18, e);
    return n ? v(t18.p1.x + n * (t18.p2.x - t18.p1.x), t18.p1.y + n * (t18.p2.y - t18.p1.y)) : null;
  }
  s(Vn, "testLineLine");
  function Pn(t18, e) {
    let n = e.p2.sub(e.p1), r = Number.NEGATIVE_INFINITY, o = Number.POSITIVE_INFINITY;
    if (n.x != 0) {
      let i = (t18.pos.x - e.p1.x) / n.x, a = (t18.pos.x + t18.width - e.p1.x) / n.x;
      r = Math.max(r, Math.min(i, a)), o = Math.min(o, Math.max(i, a));
    }
    if (n.y != 0) {
      let i = (t18.pos.y - e.p1.y) / n.y, a = (t18.pos.y + t18.height - e.p1.y) / n.y;
      r = Math.max(r, Math.min(i, a)), o = Math.min(o, Math.max(i, a));
    }
    return o >= r && o >= 0 && r <= 1;
  }
  s(Pn, "testRectLine");
  function Bt(t18, e) {
    return e.x > t18.pos.x && e.x < t18.pos.x + t18.width && e.y > t18.pos.y && e.y < t18.pos.y + t18.height;
  }
  s(Bt, "testRectPoint");
  function Ro(t18, e) {
    let n = Math.max(t18.pos.x, Math.min(e.center.x, t18.pos.x + t18.width)), r = Math.max(t18.pos.y, Math.min(e.center.y, t18.pos.y + t18.height));
    return v(n, r).sdist(e.center) <= e.radius * e.radius;
  }
  s(Ro, "testRectCircle");
  function Do(t18, e) {
    return Bo(e, new ye(t18.points()));
  }
  s(Do, "testRectPolygon");
  function Gn(t18, e) {
    let n = e.sub(t18.p1), r = t18.p2.sub(t18.p1);
    if (Math.abs(n.cross(r)) > Number.EPSILON) return false;
    let o = n.dot(r) / r.dot(r);
    return o >= 0 && o <= 1;
  }
  s(Gn, "testLinePoint");
  function Ft(t18, e) {
    let n = t18.p2.sub(t18.p1), r = n.dot(n), o = t18.p1.sub(e.center), i = 2 * n.dot(o), a = o.dot(o) - e.radius * e.radius, l = i * i - 4 * r * a;
    if (r <= Number.EPSILON || l < 0) return false;
    if (l == 0) {
      let u = -i / (2 * r);
      if (u >= 0 && u <= 1) return true;
    } else {
      let u = (-i + Math.sqrt(l)) / (2 * r), m = (-i - Math.sqrt(l)) / (2 * r);
      if (u >= 0 && u <= 1 || m >= 0 && m <= 1) return true;
    }
    return Mn(e, t18.p1);
  }
  s(Ft, "testLineCircle");
  function Tr(t18, e) {
    if (et(e, t18.p1) || et(e, t18.p2)) return true;
    for (let n = 0; n < e.pts.length; n++) {
      let r = e.pts[n], o = e.pts[(n + 1) % e.pts.length];
      if (Vn(t18, new Te(r, o))) return true;
    }
    return false;
  }
  s(Tr, "testLinePolygon");
  function Mn(t18, e) {
    return t18.center.sdist(e) < t18.radius * t18.radius;
  }
  s(Mn, "testCirclePoint");
  function su(t18, e) {
    return t18.center.sdist(e.center) < (t18.radius + e.radius) * (t18.radius + e.radius);
  }
  s(su, "testCircleCircle");
  function Qt(t18, e) {
    let n = e.pts[e.pts.length - 1];
    for (let r of e.pts) {
      if (Ft(new Te(n, r), t18)) return true;
      n = r;
    }
    return Mn(t18, e.pts[0]) ? true : et(e, t18.center);
  }
  s(Qt, "testCirclePolygon");
  function Bo(t18, e) {
    for (let n = 0; n < t18.pts.length; n++) if (Tr(new Te(t18.pts[n], t18.pts[(n + 1) % t18.pts.length]), e)) return true;
    return !!(t18.pts.some((n) => et(e, n)) || e.pts.some((n) => et(t18, n)));
  }
  s(Bo, "testPolygonPolygon");
  function et(t18, e) {
    let n = false, r = t18.pts;
    for (let o = 0, i = r.length - 1; o < r.length; i = o++) r[o].y > e.y != r[i].y > e.y && e.x < (r[i].x - r[o].x) * (e.y - r[o].y) / (r[i].y - r[o].y) + r[o].x && (n = !n);
    return n;
  }
  s(et, "testPolygonPoint");
  function Ar(t18, e) {
    e = e.sub(t18.center);
    let n = ue(t18.angle), r = Math.cos(n), o = Math.sin(n), i = e.x * r + e.y * o, a = -e.x * o + e.y * r;
    return i * i / (t18.radiusX * t18.radiusX) + a * a / (t18.radiusY * t18.radiusY) < 1;
  }
  s(Ar, "testEllipsePoint");
  function Tn(t18, e) {
    let n = e.center.sub(t18.center), r = ue(t18.angle), o = Math.cos(r), i = Math.sin(r), a = n.x * o + n.y * i, l = -n.x * i + n.y * o;
    return Ar(new ke(v(), t18.radiusX + e.radius, t18.radiusY + e.radius, 0), v(a, l));
  }
  s(Tn, "testEllipseCircle");
  function Fo(t18, e) {
    let n = t18.toMat2().inverse;
    return e = new Te(n.transform(e.p1.sub(t18.center)), n.transform(e.p2.sub(t18.center))), Ft(e, new we(v(), 1));
  }
  s(Fo, "testEllipseLine");
  function iu(t18, e) {
    if (t18.radiusX === t18.radiusY) return Tn(e, new we(t18.center, t18.radiusX));
    if (e.radiusX === e.radiusY) return Tn(t18, new we(e.center, e.radiusX));
    let n = new bt(1 / t18.radiusX ** 2, 0, 0, 0, 1 / t18.radiusY ** 2, 0, 0, 0, -1), r = new bt(1 / e.radiusX ** 2, 0, 0, 0, 1 / e.radiusY ** 2, 0, 0, 0, -1), o = t18.center.x, i = t18.center.y, a = e.center.x, l = e.center.y, u = ue(t18.angle), m = ue(e.angle), d = new bt(Math.cos(u), -Math.sin(u), o, Math.sin(u), Math.cos(u), i, 0, 0, 1), C = new bt(Math.cos(m), -Math.sin(m), a, Math.sin(m), Math.cos(m), l, 0, 0, 1), p = d.inverse, b = C.inverse, f = p.transpose.mul(n).mul(p), O = b.transpose.mul(r).mul(b), g = f.m11, y = f.m12, V = f.m13, A = f.m21, D = f.m22, G = f.m23, x = f.m31, w = f.m32, S = f.m33, M = O.m11, R = O.m12, F = O.m13, j = O.m21, H = O.m22, q = O.m23, W = O.m31, N = O.m32, k = O.m33, Z = g * D * S - g * G * w - y * A * S + y * G * x + V * A * w - V * D * x, X = (g * D * k - g * G * N - g * w * q + g * S * H - y * A * k + y * G * W + y * x * q - y * S * j + V * A * N - V * D * W - V * x * H + V * w * j + A * w * F - A * S * R - D * x * F + D * S * M + G * x * R - G * w * M) / Z, ee = (g * H * k - g * q * N - y * j * k + y * q * W + V * j * N - V * H * W - A * R * k + A * F * N + D * M * k - D * F * W - G * M * N + G * R * W + x * R * q - x * F * H - w * M * q + w * F * j + S * M * H - S * R * j) / Z, Ee = (M * H * k - M * q * N - R * j * k + R * q * W + F * j * N - F * H * W) / Z;
    if (X >= 0) {
      let _ = -3 * ee + X ** 2, gt = 3 * X * Ee + ee * X ** 2 - 4 * ee ** 2, Gt = -27 * Ee ** 2 + 18 * Ee * X * ee + X ** 2 * ee ** 2 - 4 * X ** 3 * Ee - 4 * ee ** 3;
      return !(_ > 0 && gt < 0 && Gt > 0);
    } else {
      let _ = -3 * ee + X ** 2, gt = -27 * Ee ** 2 + 18 * Ee * X * ee + X ** 2 * ee ** 2 - 4 * X ** 3 * Ee - 4 * ee ** 3;
      return !(_ > 0 && gt > 0);
    }
  }
  s(iu, "testEllipseEllipse");
  function Lo(t18, e) {
    return Sr(t18, new ye(e.points()));
  }
  s(Lo, "testEllipseRect");
  function Sr(t18, e) {
    let n = t18.toMat2().inverse;
    return e = new ye(e.pts.map((r) => n.transform(r.sub(t18.center)))), Qt(new we(v(), 1), e);
  }
  s(Sr, "testEllipsePolygon");
  function au(t18, e) {
    return t18.x === e.x && t18.y === e.y;
  }
  s(au, "testPointPoint");
  function uu(t18, e) {
    return e instanceof E ? au(e, t18.pt) : e instanceof we ? Mn(e, t18.pt) : e instanceof Te ? Gn(e, t18.pt) : e instanceof $ ? Bt(e, t18.pt) : e instanceof ye ? et(e, t18.pt) : e instanceof ke ? Ar(e, t18.pt) : false;
  }
  s(uu, "testPointShape");
  function cu(t18, e) {
    return e instanceof E ? Gn(t18, e) : e instanceof we ? Ft(t18, e) : e instanceof Te ? Vn(t18, e) != null : e instanceof $ ? Pn(e, t18) : e instanceof ye ? Tr(t18, e) : e instanceof ke ? Fo(e, t18) : false;
  }
  s(cu, "testLineShape");
  function lu(t18, e) {
    return e instanceof E ? Mn(t18, e) : e instanceof we ? su(t18, e) : e instanceof Te ? Ft(e, t18) : e instanceof $ ? Ro(e, t18) : e instanceof ye ? Qt(t18, e) : e instanceof ke ? Tn(e, t18) : false;
  }
  s(lu, "testCircleShape");
  function mu(t18, e) {
    return e instanceof E ? Bt(t18, e) : e instanceof we ? Ro(t18, e) : e instanceof Te ? Pn(t18, e) : e instanceof $ ? Er(t18, e) : e instanceof ye ? Do(t18, e) : e instanceof ke ? Lo(e, t18) : false;
  }
  s(mu, "testRectShape");
  function pu(t18, e) {
    return e instanceof E ? et(t18, e) : e instanceof we ? Qt(e, t18) : e instanceof Te ? Tr(e, t18) : e instanceof $ ? Do(e, t18) : e instanceof ye ? Bo(e, t18) : e instanceof ke ? Sr(e, t18) : false;
  }
  s(pu, "testPolygonShape");
  function du(t18, e) {
    return e instanceof E ? Ar(t18, e) : e instanceof we ? Tn(t18, e) : e instanceof Te ? Fo(t18, e) : e instanceof $ ? Lo(t18, e) : e instanceof ye ? Sr(t18, e) : e instanceof ke ? iu(e, t18) : false;
  }
  s(du, "testEllipseShape");
  function jo(t18, e, n) {
    let r = t18, o = n.p1, i = n.p2, a = e, l = i.sub(o), u = a.cross(l);
    if (Math.abs(u) < Number.EPSILON) return null;
    let m = o.sub(r), d = m.cross(l) / u;
    if (d <= 0 || d >= 1) return null;
    let C = m.cross(a) / u;
    if (C <= 0 || C >= 1) return null;
    let p = l.normal().unit();
    return e.dot(p) > 0 && (p.x *= -1, p.y *= -1), { point: r.add(a.scale(d)), normal: p, fraction: d };
  }
  s(jo, "raycastLine");
  function fu(t18, e, n) {
    let r = Number.NEGATIVE_INFINITY, o = Number.POSITIVE_INFINITY, i;
    if (t18.x != 0) {
      let a = (n.pos.x - t18.x) / e.x, l = (n.pos.x + n.width - t18.x) / e.x;
      i = v(-Math.sign(e.x), 0), r = Math.max(r, Math.min(a, l)), o = Math.min(o, Math.max(a, l));
    }
    if (t18.y != 0) {
      let a = (n.pos.y - t18.y) / e.y, l = (n.pos.y + n.height - t18.y) / e.y;
      Math.min(a, l) > r && (i = v(0, -Math.sign(e.y))), r = Math.max(r, Math.min(a, l)), o = Math.min(o, Math.max(a, l));
    }
    return o >= r && r >= 0 && r <= 1 ? { point: t18.add(e.scale(r)), normal: i, fraction: r } : null;
  }
  s(fu, "raycastRect");
  function Ko(t18, e, n) {
    let r = t18, o = n.center, i = e, a = i.dot(i), l = r.sub(o), u = 2 * i.dot(l), m = l.dot(l) - n.radius * n.radius, d = u * u - 4 * a * m;
    if (a <= Number.EPSILON || d < 0) return null;
    if (d == 0) {
      let C = -u / (2 * a);
      if (C >= 0 && C <= 1) {
        let p = r.add(i.scale(C));
        return { point: p, normal: p.sub(o), fraction: C };
      }
    } else {
      let C = (-u + Math.sqrt(d)) / (2 * a), p = (-u - Math.sqrt(d)) / (2 * a), b = null;
      if (C >= 0 && C <= 1 && (b = C), p >= 0 && p <= 1 && (b = Math.min(p, b ?? p)), b != null) {
        let f = r.add(i.scale(b));
        return { point: f, normal: f.sub(o).unit(), fraction: b };
      }
    }
    return null;
  }
  s(Ko, "raycastCircle");
  function hu(t18, e, n) {
    let r = n.pts, o = null, i = r[r.length - 1];
    for (let a = 0; a < r.length; a++) {
      let l = r[a], u = jo(t18, e, new Te(i, l));
      u && (!o || o.fraction > u.fraction) && (o = u), i = l;
    }
    return o;
  }
  s(hu, "raycastPolygon");
  function gu(t18, e, n) {
    let r = n.toMat2(), o = r.inverse, i = o.transform(t18.sub(n.center)), a = o.transform(e), l = Ko(i, a, new we(v(), 1));
    if (l) {
      let u = Dt.rotation(ue(-n.angle)), d = Dt.scale(n.radiusX, n.radiusY).transform(l.point), C = r.transform(l.point).add(n.center), p = C.dist(t18) / e.len();
      return { point: C, normal: u.transform(v(n.radiusY ** 2 * d.x, n.radiusX ** 2 * d.y)).unit(), fraction: p };
    }
    return l;
  }
  s(gu, "raycastEllipse");
  function Io(t18, e, n, r = 64) {
    let o = t18, i = e.len(), a = e.scale(1 / i), l = 0, u = v(Math.floor(t18.x), Math.floor(t18.y)), m = v(a.x > 0 ? 1 : -1, a.y > 0 ? 1 : -1), d = v(Math.abs(1 / a.x), Math.abs(1 / a.y)), C = v(m.x > 0 ? u.x + 1 - t18.x : t18.x - u.x, m.y > 0 ? u.y + 1 - t18.y : t18.y - u.y), p = v(d.x < 1 / 0 ? d.x * C.x : 1 / 0, d.y < 1 / 0 ? d.y * C.y : 1 / 0), b = -1;
    for (; l <= r; ) {
      let f = n(u);
      if (f === true) return { point: o.add(a.scale(l)), normal: v(b === 0 ? -m.x : 0, b === 1 ? -m.y : 0), fraction: l / i, gridPos: u };
      if (f) return f;
      p.x < p.y ? (u.x += m.x, l = p.x, p.x += d.x, b = 0) : (u.y += m.y, l = p.y, p.y += d.y, b = 1);
    }
    return null;
  }
  s(Io, "raycastGrid");
  var An = class t7 {
    static {
      s(this, "Point");
    }
    pt;
    constructor(e) {
      this.pt = e.clone();
    }
    transform(e) {
      return new t7(e.multVec2(this.pt));
    }
    bbox() {
      return new $(this.pt, 0, 0);
    }
    area() {
      return 0;
    }
    clone() {
      return new t7(this.pt);
    }
    collides(e) {
      return uu(this, e);
    }
    contains(e) {
      return this.pt.eq(e);
    }
    raycast(e, n) {
      return null;
    }
    random() {
      return this.pt.clone();
    }
  };
  var Te = class t8 {
    static {
      s(this, "Line");
    }
    p1;
    p2;
    constructor(e, n) {
      this.p1 = e.clone(), this.p2 = n.clone();
    }
    transform(e) {
      return new t8(e.multVec2(this.p1), e.multVec2(this.p2));
    }
    bbox() {
      return $.fromPoints(this.p1, this.p2);
    }
    area() {
      return this.p1.dist(this.p2);
    }
    clone() {
      return new t8(this.p1, this.p2);
    }
    collides(e) {
      return cu(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, n) {
      return jo(e, n, this);
    }
    random() {
      return this.p1.add(this.p2.sub(this.p1).scale(ge(1)));
    }
  };
  var $ = class t9 {
    static {
      s(this, "Rect");
    }
    pos;
    width;
    height;
    constructor(e, n, r) {
      this.pos = e.clone(), this.width = n, this.height = r;
    }
    static fromPoints(e, n) {
      return new t9(e.clone(), n.x - e.x, n.y - e.y);
    }
    center() {
      return new E(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
    }
    points() {
      return [this.pos, this.pos.add(this.width, 0), this.pos.add(this.width, this.height), this.pos.add(0, this.height)];
    }
    transform(e) {
      return new ye(this.points().map((n) => e.multVec2(n)));
    }
    bbox() {
      return this.clone();
    }
    area() {
      return this.width * this.height;
    }
    clone() {
      return new t9(this.pos.clone(), this.width, this.height);
    }
    distToPoint(e) {
      return Math.sqrt(this.sdistToPoint(e));
    }
    sdistToPoint(e) {
      let n = this.pos, r = this.pos.add(this.width, this.height), o = Math.max(n.x - e.x, 0, e.x - r.x), i = Math.max(n.y - e.y, 0, e.y - r.y);
      return o * o + i * i;
    }
    collides(e) {
      return mu(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, n) {
      return fu(e, n, this);
    }
    random() {
      return this.pos.add(ge(this.width), ge(this.height));
    }
  };
  var we = class t10 {
    static {
      s(this, "Circle");
    }
    center;
    radius;
    constructor(e, n) {
      this.center = e.clone(), this.radius = n;
    }
    transform(e) {
      return new ke(this.center, this.radius, this.radius).transform(e);
    }
    bbox() {
      return $.fromPoints(this.center.sub(v(this.radius)), this.center.add(v(this.radius)));
    }
    area() {
      return this.radius * this.radius * Math.PI;
    }
    clone() {
      return new t10(this.center, this.radius);
    }
    collides(e) {
      return lu(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, n) {
      return Ko(e, n, this);
    }
    random() {
      return this.center.add(E.fromAngle(ge(360)).scale(ge(this.radius)));
    }
  };
  var ke = class t11 {
    static {
      s(this, "Ellipse");
    }
    center;
    radiusX;
    radiusY;
    angle;
    constructor(e, n, r, o = 0) {
      this.center = e.clone(), this.radiusX = n, this.radiusY = r, this.angle = o;
    }
    static fromMat2(e) {
      let n = e.inverse, r = n.transpose.mul(n), [o, i] = r.eigenvalues, [a, l] = r.eigenvectors(o, i), [u, m] = [1 / Math.sqrt(o), 1 / Math.sqrt(i)];
      return u > m ? new t11(v(), u, m, lt(Math.atan2(-a[1], a[0]))) : new t11(v(), m, u, lt(Math.atan2(-l[1], l[0])));
    }
    toMat2() {
      let e = ue(this.angle), n = Math.cos(e), r = Math.sin(e);
      return new Dt(n * this.radiusX, -r * this.radiusY, r * this.radiusX, n * this.radiusY);
    }
    transform(e) {
      if (this.angle == 0 && e.getRotation() == 0) return new t11(e.multVec2(this.center), e.m[0] * this.radiusX, e.m[5] * this.radiusY);
      {
        let n = this.toMat2(), r = e.getRotation(), o = e.getScale();
        n = bt.fromMat2(n).scale(o.x, o.y).rotate(r).toMat2();
        let a = t11.fromMat2(n);
        return a.center = e.multVec2(this.center), a;
      }
    }
    bbox() {
      if (this.angle == 0) return $.fromPoints(this.center.sub(v(this.radiusX, this.radiusY)), this.center.add(v(this.radiusX, this.radiusY)));
      {
        let e = ue(this.angle), n = Math.cos(e), r = Math.sin(e), o = this.radiusX * n, i = this.radiusX * r, a = this.radiusY * r, l = this.radiusY * n, u = Math.sqrt(o * o + a * a), m = Math.sqrt(i * i + l * l);
        return $.fromPoints(this.center.sub(v(u, m)), this.center.add(v(u, m)));
      }
    }
    area() {
      return this.radiusX * this.radiusY * Math.PI;
    }
    clone() {
      return new t11(this.center, this.radiusX, this.radiusY, this.angle);
    }
    collides(e) {
      return du(this, e);
    }
    contains(e) {
      e = e.sub(this.center);
      let n = ue(this.angle), r = Math.cos(n), o = Math.sin(n), i = e.x * r + e.y * o, a = -e.x * o + e.y * r;
      return i * i / (this.radiusX * this.radiusX) + a * a / (this.radiusY * this.radiusY) < 1;
    }
    raycast(e, n) {
      return gu(e, n, this);
    }
    random() {
      return this.center;
    }
  };
  function bu(t18, e, n, r) {
    let o = e.sub(t18), i = r.sub(n), a = o.cross(i);
    return a < 1e-5 && a > -1e-5 || (a = n.sub(t18).cross(i) / a, a < 0 || a > 1) ? null : t18.add(o.scale(a));
  }
  s(bu, "segmentLineIntersection");
  var ye = class t12 {
    static {
      s(this, "Polygon");
    }
    pts;
    constructor(e) {
      if (e.length < 3) throw new Error("Polygons should have at least 3 vertices");
      this.pts = e;
    }
    transform(e) {
      return new t12(this.pts.map((n) => e.multVec2(n)));
    }
    bbox() {
      let e = v(Number.MAX_VALUE), n = v(-Number.MAX_VALUE);
      for (let r of this.pts) e.x = Math.min(e.x, r.x), n.x = Math.max(n.x, r.x), e.y = Math.min(e.y, r.y), n.y = Math.max(n.y, r.y);
      return $.fromPoints(e, n);
    }
    area() {
      let e = 0, n = this.pts.length;
      for (let r = 0; r < n; r++) {
        let o = this.pts[r], i = this.pts[(r + 1) % n];
        e += o.x * i.y * 0.5, e -= i.x * o.y * 0.5;
      }
      return Math.abs(e);
    }
    clone() {
      return new t12(this.pts.map((e) => e.clone()));
    }
    collides(e) {
      return pu(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, n) {
      return hu(e, n, this);
    }
    random() {
      return v();
    }
    cut(e, n) {
      let r = new Te(e, n), o = [], i = [], a = n.sub(e), l = this.pts[this.pts.length - 1], u = l.sub(e), m = a.cross(u) > 0;
      return this.pts.forEach((d) => {
        u = d.sub(e);
        let C = a.cross(u) > 0;
        if (m != C) {
          let p = bu(l, d, e, n);
          o.push(p), i.push(p), m = C;
        }
        (C ? o : i).push(d), l = d;
      }), [o.length ? new t12(o) : null, i.length ? new t12(i) : null];
    }
  };
  function ko(t18, e, n, r) {
    let o = r * r, i = 1 - r, a = i * i;
    return t18.scale(a).add(e.scale(2 * i * r)).add(n.scale(o));
  }
  s(ko, "evaluateQuadratic");
  function _o(t18, e, n, r) {
    let o = 1 - r;
    return e.sub(t18).scale(2 * o).add(n.sub(e).scale(2 * r));
  }
  s(_o, "evaluateQuadraticFirstDerivative");
  function No(t18, e, n, r) {
    return n.sub(e.scale(2)).add(t18).scale(2);
  }
  s(No, "evaluateQuadraticSecondDerivative");
  function Jt(t18, e, n, r, o) {
    let i = o * o, a = i * o, l = 1 - o, u = l * l, m = u * l;
    return t18.scale(m).add(e.scale(3 * u * o)).add(n.scale(3 * l * i)).add(r.scale(a));
  }
  s(Jt, "evaluateBezier");
  function Uo(t18, e, n, r, o) {
    let i = o * o, a = 1 - o, l = a * a;
    return e.sub(t18).scale(3 * l).add(n.sub(e).scale(6 * a * o)).add(r.sub(n).scale(3 * i));
  }
  s(Uo, "evaluateBezierFirstDerivative");
  function Ho(t18, e, n, r, o) {
    let i = 1 - o;
    return n.sub(e.scale(2)).add(t18).scale(6 * i).add(r.sub(n.scale(2)).add(e).scale(6 * o));
  }
  s(Ho, "evaluateBezierSecondDerivative");
  function qo(t18, e, n, r, o) {
    let i = 0.5 * (((-o + 2) * o - 1) * o), a = 0.5 * ((3 * o - 5) * o * o + 2), l = 0.5 * (((-3 * o + 4) * o + 1) * o), u = 0.5 * ((o - 1) * o * o);
    return t18.scale(i).add(e.scale(a)).add(n.scale(l)).add(r.scale(u));
  }
  s(qo, "evaluateCatmullRom");
  function zo(t18, e, n, r, o) {
    let i = 0.5 * ((-3 * o + 4) * o - 1), a = 0.5 * ((9 * o - 10) * o), l = 0.5 * ((-9 * o + 8) * o + 1), u = 0.5 * ((3 * o - 2) * o);
    return t18.scale(i).add(e.scale(a)).add(n.scale(l)).add(r.scale(u));
  }
  s(zo, "evaluateCatmullRomFirstDerivative");
  function Yo(t18) {
    let e = Vr(t18), n = e(1);
    return (r) => {
      let o = r * n, i = e(o, true);
      return t18(i);
    };
  }
  s(Yo, "normalizedCurve");
  function Vr(t18, e = 10, n = 10) {
    let r = [0], o = [0], a = 1 / (e - 1) / n, l = 0, u = t18(0), m = 0;
    for (let d = 1; d < e; d++) {
      for (let C = 0; C < n; C++) {
        m += a;
        let p = t18(m), b = p.dist(u);
        l += b, u = p;
      }
      r[d] = l, o[d] = m;
    }
    return o[e - 1] = 1, (d, C = false) => {
      if (C) {
        let p = d;
        if (p <= 0) return 0;
        if (p >= l) return 1;
        let b = 0;
        for (; r[b + 1] < p; ) b++;
        let f = o[b], O = o[b + 1], g = r[b], y = r[b + 1], V = (p - g) / (y - g);
        return f + (O - f) * V;
      } else {
        if (d <= 0) return 0;
        if (d >= 1) return r[e - 1];
        let p = 0;
        for (; o[p + 1] < d; ) p++;
        let b = o[p], f = o[p + 1], O = r[p], g = r[p + 1], y = (d - b) / (f - b);
        return O + (g - O) * y;
      }
    };
  }
  s(Vr, "curveLengthApproximation");
  function Lt(t18, e, n, r) {
    let o = 2 * t18 + e - 2 * r + n, i = -3 * t18 + 3 * r - 2 * e - n, a = e, l = t18;
    return (u) => {
      let m = u * u, d = m * u;
      return o * d + i * m + a * u + l;
    };
  }
  s(Lt, "hermite");
  function Pr(t18, e, n, r, o, i = Lt) {
    let a = i(e.x, (1 - o) * (n.x - t18.x), (1 - o) * (r.x - e.x), n.x), l = i(e.y, (1 - o) * (n.y - t18.y), (1 - o) * (r.y - e.y), n.y);
    return (u) => new E(a(u), l(u));
  }
  s(Pr, "cardinal");
  function jt(t18, e, n, r, o = Lt) {
    return Pr(t18, e, n, r, 0.5, o);
  }
  s(jt, "catmullRom");
  function Wo(t18, e, n, r, o = Lt) {
    return jt(r.add(t18.sub(e).scale(6)), t18, r, t18.add(r.sub(n).scale(6)), o);
  }
  s(Wo, "bezier");
  function $o(t18, e, n, r, o, i, a, l = Lt) {
    let u = l(e.x, 0.5 * (1 - o) * (1 + a) * (1 + i) * (e.x - t18.x) + 0.5 * (1 - o) * (1 - a) * (1 - i) * (n.x - e.x), 0.5 * (1 - o) * (1 + a) * (1 - i) * (n.x - e.x) + 0.5 * (1 - o) * (1 - a) * (1 + i) * (r.x - n.x), n.x), m = l(e.y, 0.5 * (1 - o) * (1 + a) * (1 + i) * (e.y - t18.y) + 0.5 * (1 - o) * (1 - a) * (1 - i) * (n.y - e.y), 0.5 * (1 - o) * (1 + a) * (1 - i) * (n.y - e.y) + 0.5 * (1 - o) * (1 - a) * (1 + i) * (r.y - n.y), n.y);
    return (d) => new E(u(d), m(d));
  }
  s($o, "kochanekBartels");
  function Xo(t18, e, n, r) {
    let o = 2 * t18 + e - 2 * r + n, i = -3 * t18 + 3 * r - 2 * e + n, a = e;
    return (l) => {
      let u = l * l;
      return 3 * o * u + 2 * i * l + a;
    };
  }
  s(Xo, "hermiteFirstDerivative");
  function Wt(t18) {
    return 0 <= t18 && t18 <= 1;
  }
  s(Wt, "inZeroOneDomain");
  function xr(t18, e) {
    return Math.abs(t18 - e) <= Number.EPSILON;
  }
  s(xr, "approximately");
  function $t(t18) {
    return t18 < 0 ? -Math.pow(-t18, 1 / 3) : Math.pow(t18, 1 / 3);
  }
  s($t, "cubeRoot");
  function yu(t18, e, n, r) {
    let o = 3 * t18 - 6 * e + 3 * n, i = -3 * t18 + 3 * e, a = t18, l = -t18 + 3 * e - 3 * n + r;
    if (xr(l, 0)) {
      if (xr(o, 0)) return xr(i, 0) ? [] : [-a / i].filter(Wt);
      let y = Math.sqrt(i * i - 4 * o * a), V = 2 * o;
      return [(y - i) / V, (-i - y) / V].filter(Wt);
    }
    o /= l, i /= l, a /= l;
    let u = (3 * i - o * o) / 3, m = u / 3, d = (2 * o * o * o - 9 * o * i + 27 * a) / 27, C = d / 2, p = C * C + m * m * m;
    if (p < 0) {
      let y = -u / 3, V = y * y * y, A = Math.sqrt(V), D = -d / (2 * A), G = D < -1 ? -1 : D > 1 ? 1 : D, x = Math.acos(G), S = 2 * $t(A), M = S * Math.cos(x / 3) - o / 3, R = S * Math.cos((x + 2 * Math.PI) / 3) - o / 3, F = S * Math.cos((x + 4 * Math.PI) / 3) - o / 3;
      return [M, R, F].filter(Wt);
    }
    if (p === 0) {
      let y = C < 0 ? $t(-C) : -$t(C), V = 2 * y - o / 3, A = -y - o / 3;
      return [V, A].filter(Wt);
    }
    let b = Math.sqrt(p), f = $t(b - C), O = $t(b + C);
    return [f - O - o / 3].filter(Wt);
  }
  s(yu, "getCubicRoots");
  function xu(t18, e, n, r, o) {
    let i = yu(t18.x - o, e.x - o, n.x - o, r.x - o);
    return i.length > 0 ? Jt(t18, e, n, r, i[0]).y : NaN;
  }
  s(xu, "cubicBezierYforX");
  function Qo(t18) {
    if (!t18 || t18.length == 0) throw new Error("Need at least one point for easingLinear.");
    let e = t18.length;
    return (n) => {
      if (n <= 0 || t18.length == 1 || n <= t18[0].x) return t18[0].y;
      for (let r = 0; r < e; r++) if (t18[r].x >= n) return Ve(n, t18[r - 1].x, t18[r].x, t18[r - 1].y, t18[r].y);
      return t18[t18.length - 1].y;
    };
  }
  s(Qo, "easingLinear");
  function Jo(t18, e) {
    return (n) => xu(v(0, 0), t18, e, v(1, 1), n);
  }
  s(Jo, "easingCubicBezier");
  function Zo(t18, e = "jump-end") {
    let n = 1 / t18, r = e == "jump-start" || e == "jump-both", o = e == "jump-end" || e == "jump-both", i = 1 / (t18 + (o ? 1 : 0)), a = r ? i : 0;
    return (l) => {
      let u = Math.floor(l / n);
      return a + u * i;
    };
  }
  s(Zo, "easingSteps");
  function es(t18, e) {
    let n = Number.MAX_VALUE, r = { normal: v(0), distance: 0 };
    for (let o of [t18, e]) for (let i = 0; i < o.pts.length; i++) {
      let a = o.pts[i], u = o.pts[(i + 1) % o.pts.length].sub(a).normal().unit(), m = Number.MAX_VALUE, d = -Number.MAX_VALUE;
      for (let f = 0; f < t18.pts.length; f++) {
        let O = t18.pts[f].dot(u);
        m = Math.min(m, O), d = Math.max(d, O);
      }
      let C = Number.MAX_VALUE, p = -Number.MAX_VALUE;
      for (let f = 0; f < e.pts.length; f++) {
        let O = e.pts[f].dot(u);
        C = Math.min(C, O), p = Math.max(p, O);
      }
      let b = Math.min(d, p) - Math.max(m, C);
      if (b < 0) return null;
      if (b < Math.abs(n)) {
        let f = p - m, O = C - d;
        n = Math.abs(f) < Math.abs(O) ? f : O, r.normal = u, r.distance = n;
      }
    }
    return r;
  }
  s(es, "sat");
  function ts(t18, e, n) {
    return (e.x - t18.x) * (n.y - t18.y) - (e.y - t18.y) * (n.x - t18.x) >= 0;
  }
  s(ts, "isOrientedCcw");
  function vu(t18) {
    let e = 0, n = t18[t18.length - 1];
    for (let r = 0; r < t18.length; r++) e += (t18[r].x - n.x) * (t18[r].y + n.y), n = t18[r];
    return e < 0;
  }
  s(vu, "isOrientedCcwPolygon");
  function vr(t18, e, n, r) {
    let o = r.x - n.x, i = r.y - n.y, a = o * (t18.y - n.y) - i * (t18.x - n.x), l = o * (e.y - n.y) - i * (e.x - n.x);
    return a * l >= 0;
  }
  s(vr, "onSameSide");
  function Cu(t18, e, n, r) {
    return vr(t18, e, n, r) && vr(t18, n, e, r) && vr(t18, r, e, n);
  }
  s(Cu, "pointInTriangle");
  function wu(t18, e, n, r) {
    for (let o of t18) if (o !== e && o !== n && o !== r && Cu(o, e, n, r)) return true;
    return false;
  }
  s(wu, "someInTriangle");
  function Ou(t18, e, n, r) {
    return ts(t18, e, n) && !wu(r, t18, e, n);
  }
  s(Ou, "isEar");
  function Rn(t18) {
    if (t18.length < 3) return [];
    if (t18.length == 3) return [t18];
    let e = [], n = [], r = 0;
    for (let C = 0; C < t18.length; C++) {
      let p = t18[r], b = t18[C];
      (b.x < p.x || b.x == p.x && b.y < p.y) && (r = r), e[C] = C + 1, n[C] = C - 1;
    }
    e[e.length - 1] = 0, n[0] = n.length - 1, vu(t18) || ([e, n] = [n, e]);
    let o = [];
    for (let C = 0; C < t18.length; ++C) ts(t18[n[C]], t18[C], t18[e[C]]) || o.push(t18[C]);
    let i = [], a = t18.length, l = 1, u = 0, m, d;
    for (; a > 3; ) {
      m = e[l], d = n[l];
      let C = t18[d], p = t18[l], b = t18[m];
      if (Ou(C, p, b, o)) i.push([C, p, b]), e[d] = m, n[m] = d, o.splice(o.indexOf(p), 1), --a, u = 0;
      else if (++u > a) return [];
      l = m;
    }
    return m = e[l], d = n[l], i.push([t18[d], t18[l], t18[m]]), i;
  }
  s(Rn, "triangulate");
  function ns(t18) {
    if (t18.length < 3) return false;
    let e = t18.length - 2, n = t18.length - 1, r = 0, o = t18[n].sub(t18[e]), i = t18[r].sub(t18[n]), a = o.cross(i);
    for (; r + 1 < t18.length; ) if (e = n, n = r, r++, o = t18[n].sub(t18[e]), i = t18[r].sub(t18[n]), o.cross(i) * a < 0) return false;
    return true;
  }
  s(ns, "isConvex");
  var Dn = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
  var mt = "topleft";
  var rs = "monospace";
  var yt = "monospace";
  var Zt = "linear";
  var en = [{ name: "a_pos", size: 2 }, { name: "a_uv", size: 2 }, { name: "a_color", size: 4 }];
  var Eu = en.reduce((t18, e) => t18 + e.size, 0);
  var os = 2048;
  var ss = os * 4 * Eu;
  var is = os * 6;
  var as = `
attribute vec2 a_pos;
attribute vec2 a_uv;
attribute vec4 a_color;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

vec4 def_vert() {
	return vec4(a_pos, 0.0, 1.0);
}

{{user}}

void main() {
	vec4 pos = vert(a_pos, a_uv, a_color);
	v_pos = a_pos;
	v_uv = a_uv;
	v_color = a_color;
	gl_Position = pos;
}
`;
  var us = `
precision mediump float;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

uniform sampler2D u_tex;

vec4 def_frag() {
	vec4 texColor = texture2D(u_tex, v_uv);
	return vec4((v_color.rgb * texColor.rgb), texColor.a) * v_color.a;
}

{{user}}

void main() {
	gl_FragColor = frag(v_pos, v_uv, v_color, u_tex);
	if (gl_FragColor.a == 0.0) {
		discard;
	}
}
`;
  var tn = `
vec4 vert(vec2 pos, vec2 uv, vec4 color) {
	return def_vert();
}
`;
  var nn = `
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	return def_frag();
}
`;
  var cs = /* @__PURE__ */ new Set(["id", "require"]);
  var ls = /* @__PURE__ */ new Set(["add", "fixedUpdate", "update", "draw", "destroy", "inspect", "drawInspect"]);
  var ms = 200;
  var ps = 640;
  var ds = 65536;
  var Bn = Symbol.for("kaplay.cancel");
  var rn = class extends Map {
    static {
      s(this, "Registry");
    }
    lastID = 0;
    push(e) {
      let n = this.lastID;
      return this.set(n, e), this.lastID++, n;
    }
    pushd(e) {
      let n = this.push(e);
      return () => this.delete(n);
    }
  };
  var _e = class t13 {
    static {
      s(this, "KEventController");
    }
    paused = false;
    cancel;
    constructor(e) {
      this.cancel = e;
    }
    static join(e) {
      let n = new t13(() => e.forEach((r) => r.cancel()));
      return Object.defineProperty(n, "paused", { get: s(() => e[0].paused, "get"), set: s((r) => e.forEach((o) => o.paused = r), "set") }), n.paused = false, n;
    }
    static replace(e, n) {
      return e.cancel = () => n.cancel(), n.paused = e.paused, Object.defineProperty(e, "paused", { get: s(() => n.paused, "get"), set: s((r) => n.paused = r, "set") }), e;
    }
  };
  var oe = class {
    static {
      s(this, "KEvent");
    }
    cancellers = /* @__PURE__ */ new WeakMap();
    handlers = new rn();
    add(e) {
      function n(...i) {
        if (!o.paused) return e(...i);
      }
      s(n, "handler");
      let r = this.handlers.pushd(n), o = new _e(r);
      return this.cancellers.set(n, r), o;
    }
    addOnce(e) {
      let n = this.add((...r) => {
        n.cancel(), e(...r);
      });
      return n;
    }
    next() {
      return new Promise((e) => this.addOnce(e));
    }
    trigger(...e) {
      this.handlers.forEach((n) => {
        let r = n(...e), o;
        r === Bn && (o = this.cancellers.get(n)) && o();
      });
    }
    numListeners() {
      return this.handlers.size;
    }
    clear() {
      this.handlers.clear();
    }
  };
  var Ye = class {
    static {
      s(this, "KEventHandler");
    }
    handlers = {};
    registers = {};
    on(e, n) {
      return this.handlers[e] || (this.handlers[e] = new oe()), this.handlers[e].add(n);
    }
    onOnce(e, n) {
      let r = this.on(e, (...o) => {
        r.cancel(), n(...o);
      });
      return r;
    }
    next(e) {
      return new Promise((n) => {
        this.onOnce(e, (...r) => n(r[0]));
      });
    }
    trigger(e, ...n) {
      this.handlers[e] && this.handlers[e].trigger(...n);
    }
    remove(e) {
      delete this.handlers[e];
    }
    clear() {
      this.handlers = {};
    }
    numListeners(e) {
      return this.handlers[e]?.numListeners() ?? 0;
    }
  };
  var fs = s((t18) => t18[0] instanceof K, "arrayIsColor");
  var hs = s((t18) => t18[0] instanceof E, "arrayIsVec2");
  var gs = s((t18) => typeof t18[0] == "number", "arrayIsNumber");
  var Kt = class {
    static {
      s(this, "BinaryHeap");
    }
    _items;
    _compareFn;
    constructor(e = (n, r) => n < r) {
      this._compareFn = e, this._items = [];
    }
    insert(e) {
      this._items.push(e), this.moveUp(this._items.length - 1);
    }
    remove() {
      if (this._items.length === 0) return null;
      let e = this._items[0], n = this._items.pop();
      return this._items.length !== 0 && (this._items[0] = n, this.moveDown(0)), e;
    }
    clear() {
      this._items.splice(0, this._items.length);
    }
    moveUp(e) {
      for (; e > 0; ) {
        let n = Math.floor((e - 1) / 2);
        if (!this._compareFn(this._items[e], this._items[n]) && this._items[e] >= this._items[n]) break;
        this.swap(e, n), e = n;
      }
    }
    moveDown(e) {
      for (; e < Math.floor(this._items.length / 2); ) {
        let n = 2 * e + 1;
        if (n < this._items.length - 1 && !this._compareFn(this._items[n], this._items[n + 1]) && ++n, this._compareFn(this._items[e], this._items[n])) break;
        this.swap(e, n), e = n;
      }
    }
    swap(e, n) {
      [this._items[e], this._items[n]] = [this._items[n], this._items[e]];
    }
    get length() {
      return this._items.length;
    }
  };
  function Tu(t18) {
    let e = window.atob(t18), n = e.length, r = new Uint8Array(n);
    for (let o = 0; o < n; o++) r[o] = e.charCodeAt(o);
    return r.buffer;
  }
  s(Tu, "base64ToArrayBuffer");
  function bs(t18) {
    return Tu(t18.split(",")[1]);
  }
  s(bs, "dataURLToArrayBuffer");
  function Fn(t18, e) {
    let n = document.createElement("a");
    n.href = e, n.download = t18, n.click();
  }
  s(Fn, "download");
  function Gr(t18, e) {
    Fn(t18, "data:text/plain;charset=utf-8," + e);
  }
  s(Gr, "downloadText");
  function ys(t18, e) {
    Gr(t18, JSON.stringify(e));
  }
  s(ys, "downloadJSON");
  function Mr(t18, e) {
    let n = URL.createObjectURL(e);
    Fn(t18, n), URL.revokeObjectURL(n);
  }
  s(Mr, "downloadBlob");
  var Ln = s((t18) => t18.match(/^data:\w+\/\w+;base64,.+/), "isDataURL");
  var xs = s((t18) => t18.split(".").slice(0, -1).join("."), "getFileName");
  function jn(t18, e) {
    if (t18 === e) return true;
    let n = typeof t18, r = typeof e;
    if (n !== r) return false;
    if (n === "object" && r === "object" && t18 !== null && e !== null) {
      if (Array.isArray(t18) !== Array.isArray(e)) return false;
      let o = Object.keys(t18), i = Object.keys(e);
      if (o.length !== i.length) return false;
      for (let a of o) {
        let l = t18[a], u = e[a];
        if (!jn(l, u)) return false;
      }
      return true;
    }
    return false;
  }
  s(jn, "deepEq");
  var vs = /* @__PURE__ */ new Set();
  var Cs = s((t18) => t18 instanceof Error ? t18.message : String(t18), "getErrorMessage");
  function Au(t18) {
    vs.has(t18) || (vs.add(t18), console.warn(t18));
  }
  s(Au, "warn");
  function tt(t18, e) {
    Au(`${t18} is deprecated. Use ${e} instead.`);
  }
  s(tt, "deprecateMsg");
  function on(t18, e) {
    return Number(t18.toFixed(e));
  }
  s(on, "toFixed");
  function re(t18, e) {
    return (...n) => {
      let r = n.length;
      if (r === t18.length) return t18(...n);
      if (r === e.length) return e(...n);
    };
  }
  s(re, "overload2");
  var Su = Object.freeze([776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520]);
  function Os(t18) {
    if (typeof t18 != "string") throw new TypeError("string cannot be undefined or null");
    let e = [], n = 0, r = 0;
    for (; n < t18.length; ) {
      if (r += Vu(n + r, t18), Fu(t18[n + r]) && r++, Ru(t18[n + r]) && r++, Du(t18[n + r]) && r++, Lu(t18[n + r])) {
        r++;
        continue;
      }
      e.push(t18.substring(n, n + r)), n += r, r = 0;
    }
    return e;
  }
  s(Os, "runes");
  function Vu(t18, e) {
    let n = e[t18];
    if (!Pu(n) || t18 === e.length - 1) return 1;
    let r = n + e[t18 + 1], o = e.substring(t18 + 2, t18 + 5);
    return ws(r) && ws(o) ? 4 : Gu(r) && Bu(o) ? e.slice(t18).indexOf(String.fromCodePoint(917631)) + 2 : Mu(o) ? 4 : 2;
  }
  s(Vu, "nextUnits");
  function Pu(t18) {
    return t18 && xt(t18[0].charCodeAt(0), 55296, 56319);
  }
  s(Pu, "isFirstOfSurrogatePair");
  function ws(t18) {
    return xt(Rr(t18), 127462, 127487);
  }
  s(ws, "isRegionalIndicator");
  function Gu(t18) {
    return xt(Rr(t18), 127988, 127988);
  }
  s(Gu, "isSubdivisionFlag");
  function Mu(t18) {
    return xt(Rr(t18), 127995, 127999);
  }
  s(Mu, "isFitzpatrickModifier");
  function Ru(t18) {
    return typeof t18 == "string" && xt(t18.charCodeAt(0), 65024, 65039);
  }
  s(Ru, "isVariationSelector");
  function Du(t18) {
    return typeof t18 == "string" && xt(t18.charCodeAt(0), 8400, 8447);
  }
  s(Du, "isDiacriticalMark");
  function Bu(t18) {
    let e = t18.codePointAt(0);
    return typeof t18 == "string" && typeof e == "number" && xt(e, 917504, 917631);
  }
  s(Bu, "isSupplementarySpecialpurposePlane");
  function Fu(t18) {
    return typeof t18 == "string" && Su.includes(t18.charCodeAt(0));
  }
  s(Fu, "isGrapheme");
  function Lu(t18) {
    return typeof t18 == "string" && t18.charCodeAt(0) === 8205;
  }
  s(Lu, "isZeroWidthJoiner");
  function Rr(t18) {
    let e = t18.charCodeAt(0) - 55296, n = t18.charCodeAt(1) - 56320;
    return (e << 10) + n + 65536;
  }
  s(Rr, "codePointFromSurrogatePair");
  function xt(t18, e, n) {
    return t18 >= e && t18 <= n;
  }
  s(xt, "betweenInclusive");
  var Be = s((t18, e) => Array.isArray(t18) ? t18?.includes(e) : t18 === e, "isEqOrIncludes");
  var We = s((t18, e) => Array.isArray(e) ? e.some((n) => t18.has(n)) : t18.has(e), "setHasOrIncludes");
  var sn = s((t18, e, n) => {
    t18.has(e) ? t18.get(e)?.push(n) : t18.set(e, [n]);
  }, "mapAddOrPush");
  var Es = /* @__PURE__ */ (() => {
    let t18 = 0;
    return () => t18++;
  })();
  var Ts = { "Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home", "17": "capture" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } }, "Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "9": "select", "10": "lstick", "16": "start" }, sticks: { left: { x: 0, y: 1 } } }, "Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "9": "start", "10": "lstick", "16": "select" }, sticks: { left: { x: 0, y: 1 } } }, "Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home", "17": "capture" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } }, default: { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } } };
  var As = s(() => pt.lastInputDevice, "getLastInputDeviceType");
  var Ss = s(() => {
    let t18 = pt.buttons;
    for (let e in t18) {
      let n = t18[e].keyboard && [t18[e].keyboard].flat(), r = t18[e].keyboardCode && [t18[e].keyboardCode].flat(), o = t18[e].gamepad && [t18[e].gamepad].flat(), i = t18[e].mouse && [t18[e].mouse].flat();
      n && n.forEach((a) => {
        sn(pt.buttonsByKey, a, e);
      }), r && r.forEach((a) => {
        sn(pt.buttonsByKeyCode, a, e);
      }), o && o.forEach((a) => {
        sn(pt.buttonsByGamepad, a, e);
      }), i && i.forEach((a) => {
        sn(pt.buttonsByMouse, a, e);
      });
    }
  }, "parseButtonBindings");
  var vt = class {
    static {
      s(this, "ButtonState");
    }
    pressed = /* @__PURE__ */ new Set([]);
    pressedRepeat = /* @__PURE__ */ new Set([]);
    released = /* @__PURE__ */ new Set([]);
    down = /* @__PURE__ */ new Set([]);
    update() {
      this.pressed.clear(), this.released.clear(), this.pressedRepeat.clear();
    }
    press(e) {
      this.pressed.add(e), this.pressedRepeat.add(e), this.down.add(e);
    }
    pressRepeat(e) {
      this.pressedRepeat.add(e);
    }
    release(e) {
      this.down.delete(e), this.pressed.delete(e), this.released.add(e);
    }
  };
  var Dr = class {
    static {
      s(this, "GamepadState");
    }
    buttonState = new vt();
    stickState = /* @__PURE__ */ new Map();
  };
  var Br = class {
    static {
      s(this, "FPSCounter");
    }
    dts = [];
    timer = 0;
    fps = 0;
    tick(e) {
      this.dts.push(e), this.timer += e, this.timer >= 1 && (this.timer = 0, this.fps = Math.round(1 / (this.dts.reduce((n, r) => n + r) / this.dts.length)), this.dts = []);
    }
  };
  var pt;
  var Vs = Ts;
  var Ku = s((t18) => {
    let e = t18.buttons ?? {};
    return { canvas: t18.canvas, buttons: e, buttonsByKey: /* @__PURE__ */ new Map(), buttonsByMouse: /* @__PURE__ */ new Map(), buttonsByGamepad: /* @__PURE__ */ new Map(), buttonsByKeyCode: /* @__PURE__ */ new Map(), loopID: null, stopped: false, dt: 0, fixedDt: 1 / 50, restDt: 0, time: 0, realTime: 0, fpsCounter: new Br(), timeScale: 1, skipTime: false, isHidden: false, numFrames: 0, mousePos: new E(0), mouseDeltaPos: new E(0), keyState: new vt(), mouseState: new vt(), mergedGamepadState: new Dr(), gamepadStates: /* @__PURE__ */ new Map(), lastInputDevice: null, buttonState: new vt(), gamepads: [], charInputted: [], isMouseMoved: false, lastWidth: t18.canvas.offsetWidth, lastHeight: t18.canvas.offsetHeight, events: new Ye() };
  }, "initAppState");
  var Ps = s((t18) => {
    if (!t18.canvas) throw new Error("Please provide a canvas");
    let e = Ku(t18);
    pt = e, Ss();
    function n() {
      return e.dt * e.timeScale;
    }
    s(n, "dt");
    function r() {
      return e.fixedDt * e.timeScale;
    }
    s(r, "fixedDt");
    function o() {
      return e.restDt * e.timeScale;
    }
    s(o, "restDt");
    function i() {
      return e.isHidden;
    }
    s(i, "isHidden");
    function a() {
      return e.time;
    }
    s(a, "time");
    function l() {
      return e.fpsCounter.fps;
    }
    s(l, "fps");
    function u() {
      return e.numFrames;
    }
    s(u, "numFrames");
    function m() {
      return e.canvas.toDataURL();
    }
    s(m, "screenshot");
    function d(h) {
      e.canvas.style.cursor = h;
    }
    s(d, "setCursor");
    function C() {
      return e.canvas.style.cursor;
    }
    s(C, "getCursor");
    function p(h) {
      if (h) try {
        let T = e.canvas.requestPointerLock();
        T.catch && T.catch((P) => console.error(P));
      } catch (T) {
        console.error(T);
      }
      else document.exitPointerLock();
    }
    s(p, "setCursorLocked");
    function b() {
      return !!document.pointerLockElement;
    }
    s(b, "isCursorLocked");
    function f(h) {
      h.requestFullscreen ? h.requestFullscreen() : h.webkitRequestFullscreen && h.webkitRequestFullscreen();
    }
    s(f, "enterFullscreen");
    function O() {
      document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullScreen && document.webkitExitFullScreen();
    }
    s(O, "exitFullscreen");
    function g(h = true) {
      h ? f(e.canvas) : O();
    }
    s(g, "setFullscreen");
    function y() {
      return document.fullscreenElement === e.canvas || document.webkitFullscreenElement === e.canvas;
    }
    s(y, "isFullscreen");
    function V() {
      e.stopped = true;
      let h = Object.entries(Re), T = Object.entries(br), P = Object.entries(En);
      for (let [B, ne] of h) e.canvas.removeEventListener(B, ne);
      for (let [B, ne] of T) document.removeEventListener(B, ne);
      for (let [B, ne] of P) window.removeEventListener(B, ne);
      Oo.disconnect();
    }
    s(V, "quit");
    function A(h, T) {
      e.loopID !== null && cancelAnimationFrame(e.loopID);
      let P = 0, B = 0, ne = s((Ae) => {
        if (e.stopped) return;
        if (document.visibilityState !== "visible") {
          e.loopID = requestAnimationFrame(ne);
          return;
        }
        let ie = Ae / 1e3, Ze = Math.min(ie - e.realTime, 0.25), Rt = t18.maxFPS ? 1 / t18.maxFPS : 0;
        if (e.realTime = ie, B += Ze, B > Rt) {
          if (!e.skipTime) {
            for (P += B, e.dt = e.fixedDt, e.restDt = 0; P > e.fixedDt; ) P -= e.fixedDt, P < e.fixedDt && (e.restDt = P), h();
            e.restDt = P, e.dt = B, e.time += n(), e.fpsCounter.tick(e.dt);
          }
          B = 0, e.skipTime = false, e.numFrames++, T(On, Qa);
        }
        e.loopID = requestAnimationFrame(ne);
      }, "frame");
      ne(0);
    }
    s(A, "run");
    function D() {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
    s(D, "isTouchscreen");
    function G() {
      return e.mousePos.clone();
    }
    s(G, "mousePos");
    function x() {
      return e.mouseDeltaPos.clone();
    }
    s(x, "mouseDeltaPos");
    function w(h = "left") {
      return e.mouseState.pressed.has(h);
    }
    s(w, "isMousePressed");
    function S(h = "left") {
      return e.mouseState.down.has(h);
    }
    s(S, "isMouseDown");
    function M(h = "left") {
      return e.mouseState.released.has(h);
    }
    s(M, "isMouseReleased");
    function R() {
      return e.isMouseMoved;
    }
    s(R, "isMouseMoved");
    function F(h) {
      return h === void 0 ? e.keyState.pressed.size > 0 : We(e.keyState.pressed, h);
    }
    s(F, "isKeyPressed");
    function j(h) {
      return h === void 0 ? e.keyState.pressedRepeat.size > 0 : We(e.keyState.pressedRepeat, h);
    }
    s(j, "isKeyPressedRepeat");
    function H(h) {
      return h === void 0 ? e.keyState.down.size > 0 : We(e.keyState.down, h);
    }
    s(H, "isKeyDown");
    function q(h) {
      return h === void 0 ? e.keyState.released.size > 0 : We(e.keyState.released, h);
    }
    s(q, "isKeyReleased");
    function W(h) {
      return h === void 0 ? e.mergedGamepadState.buttonState.pressed.size > 0 : We(e.mergedGamepadState.buttonState.pressed, h);
    }
    s(W, "isGamepadButtonPressed");
    function N(h) {
      return h === void 0 ? e.mergedGamepadState.buttonState.down.size > 0 : We(e.mergedGamepadState.buttonState.down, h);
    }
    s(N, "isGamepadButtonDown");
    function k(h) {
      return h === void 0 ? e.mergedGamepadState.buttonState.released.size > 0 : We(e.mergedGamepadState.buttonState.released, h);
    }
    s(k, "isGamepadButtonReleased");
    function Z(h) {
      return h === void 0 ? e.buttonState.pressed.size > 0 : We(e.buttonState.pressed, h);
    }
    s(Z, "isButtonPressed");
    function X(h) {
      return h === void 0 ? e.buttonState.down.size > 0 : We(e.buttonState.down, h);
    }
    s(X, "isButtonDown");
    function ee(h) {
      return h === void 0 ? e.buttonState.released.size > 0 : We(e.buttonState.released, h);
    }
    s(ee, "isButtonReleased");
    function Ee(h) {
      return e.buttons?.[h];
    }
    s(Ee, "getButton");
    function _(h, T) {
      e.buttons[h] = { ...e.buttons[h], ...T };
    }
    s(_, "setButton");
    function gt(h) {
      e.buttonState.press(h), e.events.trigger("buttonPress", h);
    }
    s(gt, "pressButton");
    function Gt(h) {
      e.buttonState.release(h), e.events.trigger("buttonRelease", h);
    }
    s(Gt, "releaseButton");
    function Ht(h) {
      return e.events.on("resize", h);
    }
    s(Ht, "onResize");
    let xn = re((h) => e.events.on("keyDown", h), (h, T) => e.events.on("keyDown", (P) => Be(h, P) && T(P))), vn = re((h) => e.events.on("keyPress", (T) => h(T)), (h, T) => e.events.on("keyPress", (P) => Be(h, P) && T(P))), mr = re((h) => e.events.on("keyPressRepeat", h), (h, T) => e.events.on("keyPressRepeat", (P) => Be(h, P) && T(P))), pr = re((h) => e.events.on("keyRelease", h), (h, T) => e.events.on("keyRelease", (P) => Be(h, P) && T(P))), Mt = re((h) => e.events.on("mouseDown", (T) => h(T)), (h, T) => e.events.on("mouseDown", (P) => Be(h, P) && T(P))), Xe = re((h) => e.events.on("mousePress", (T) => h(T)), (h, T) => e.events.on("mousePress", (P) => Be(h, P) && T(P))), Cn = re((h) => e.events.on("mouseRelease", (T) => h(T)), (h, T) => e.events.on("mouseRelease", (P) => P === h && T(P)));
    function L(h) {
      return e.events.on("mouseMove", () => h(G(), x()));
    }
    s(L, "onMouseMove");
    function U(h) {
      return e.events.on("charInput", h);
    }
    s(U, "onCharInput");
    function Y(h) {
      return e.events.on("touchStart", h);
    }
    s(Y, "onTouchStart");
    function se(h) {
      return e.events.on("touchMove", h);
    }
    s(se, "onTouchMove");
    function xe(h) {
      return e.events.on("touchEnd", h);
    }
    s(xe, "onTouchEnd");
    function J(h) {
      return e.events.on("scroll", h);
    }
    s(J, "onScroll");
    function Ce(h) {
      return e.events.on("hide", h);
    }
    s(Ce, "onHide");
    function qt(h) {
      return e.events.on("show", h);
    }
    s(qt, "onShow");
    let ut = re((h) => e.events.on("gamepadButtonPress", (T, P) => h(T, P)), (h, T) => e.events.on("gamepadButtonPress", (P, B) => Be(h, P) && T(P, B))), dr = re((h) => e.events.on("gamepadButtonDown", (T, P) => h(T, P)), (h, T) => e.events.on("gamepadButtonDown", (P, B) => Be(h, P) && T(P, B))), fr = re((h) => e.events.on("gamepadButtonRelease", (T, P) => h(T, P)), (h, T) => e.events.on("gamepadButtonRelease", (P, B) => Be(h, P) && T(P, B)));
    function hr(h, T) {
      return e.events.on("gamepadStick", (P, B, ne) => P === h && T(B, ne));
    }
    s(hr, "onGamepadStick");
    function gr(h) {
      e.events.on("gamepadConnect", h);
    }
    s(gr, "onGamepadConnect");
    function wn(h) {
      e.events.on("gamepadDisconnect", h);
    }
    s(wn, "onGamepadDisconnect");
    function Qe(h) {
      return e.mergedGamepadState.stickState.get(h) || new E(0);
    }
    s(Qe, "getGamepadStick");
    function ct() {
      return [...e.charInputted];
    }
    s(ct, "charInputted");
    function zt() {
      return [...e.gamepads];
    }
    s(zt, "getGamepads");
    let Ie = re((h) => e.events.on("buttonPress", (T) => h(T)), (h, T) => e.events.on("buttonPress", (P) => Be(h, P) && T(P))), Yt = re((h) => e.events.on("buttonDown", (T) => h(T)), (h, T) => e.events.on("buttonDown", (P) => Be(h, P) && T(P))), Je = re((h) => e.events.on("buttonRelease", (T) => h(T)), (h, T) => e.events.on("buttonRelease", (P) => Be(h, P) && T(P)));
    function On() {
      e.events.trigger("input"), e.keyState.down.forEach((h) => e.events.trigger("keyDown", h)), e.mouseState.down.forEach((h) => e.events.trigger("mouseDown", h)), e.buttonState.down.forEach((h) => {
        e.events.trigger("buttonDown", h);
      }), Za();
    }
    s(On, "processInput");
    function Qa() {
      e.keyState.update(), e.mouseState.update(), e.buttonState.update(), e.mergedGamepadState.buttonState.update(), e.mergedGamepadState.stickState.forEach((h, T) => {
        e.mergedGamepadState.stickState.set(T, new E(0));
      }), e.charInputted = [], e.isMouseMoved = false, e.mouseDeltaPos = new E(0), e.gamepadStates.forEach((h) => {
        h.buttonState.update(), h.stickState.forEach((T, P) => {
          h.stickState.set(P, new E(0));
        });
      });
    }
    s(Qa, "resetInput");
    function xo(h) {
      let T = { index: h.index, isPressed: s((P) => e.gamepadStates.get(h.index)?.buttonState.pressed.has(P) || false, "isPressed"), isDown: s((P) => e.gamepadStates.get(h.index)?.buttonState.down.has(P) || false, "isDown"), isReleased: s((P) => e.gamepadStates.get(h.index)?.buttonState.released.has(P) || false, "isReleased"), getStick: s((P) => e.gamepadStates.get(h.index)?.stickState.get(P) || v(), "getStick") };
      return e.gamepads.push(T), e.gamepadStates.set(h.index, { buttonState: new vt(), stickState: /* @__PURE__ */ new Map([["left", new E(0)], ["right", new E(0)]]) }), T;
    }
    s(xo, "registerGamepad");
    function Ja(h) {
      e.gamepads = e.gamepads.filter((T) => T.index !== h.index), e.gamepadStates.delete(h.index);
    }
    s(Ja, "removeGamepad");
    function Za() {
      for (let h of navigator.getGamepads()) h && !e.gamepadStates.has(h.index) && xo(h);
      for (let h of e.gamepads) {
        let T = navigator.getGamepads()[h.index];
        if (!T) continue;
        let B = (t18.gamepads ?? {})[T.id] || Vs[T.id] || Vs.default, ne = e.gamepadStates.get(h.index);
        if (ne) {
          for (let Ae = 0; Ae < T.buttons.length; Ae++) {
            let ie = B.buttons[Ae], Ze = T.buttons[Ae], Rt = e.buttonsByGamepad.has(ie);
            if (Ze.pressed) {
              if (ne.buttonState.down.has(ie)) {
                e.events.trigger("gamepadButtonDown", ie, h);
                continue;
              }
              e.lastInputDevice = "gamepad", Rt && e.buttonsByGamepad.get(ie)?.forEach((De) => {
                e.buttonState.press(De), e.events.trigger("buttonPress", De);
              }), e.mergedGamepadState.buttonState.press(ie), ne.buttonState.press(ie), e.events.trigger("gamepadButtonPress", ie, h);
            } else ne.buttonState.down.has(ie) && (Rt && e.buttonsByGamepad.get(ie)?.forEach((De) => {
              e.buttonState.release(De), e.events.trigger("buttonRelease", De);
            }), e.mergedGamepadState.buttonState.release(ie), ne.buttonState.release(ie), e.events.trigger("gamepadButtonRelease", ie, h));
          }
          for (let Ae in B.sticks) {
            let ie = B.sticks[Ae];
            if (!ie) continue;
            let Ze = new E(T.axes[ie.x], T.axes[ie.y]);
            ne.stickState.set(Ae, Ze), e.mergedGamepadState.stickState.set(Ae, Ze), e.events.trigger("gamepadStick", Ae, Ze, h);
          }
        }
      }
    }
    s(Za, "processGamepad");
    let Re = {}, br = {}, En = {}, vo = t18.pixelDensity || 1;
    Re.mousemove = (h) => {
      let T = new E(h.offsetX, h.offsetY), P = new E(h.movementX, h.movementY);
      if (y()) {
        let B = e.canvas.width / vo, ne = e.canvas.height / vo, Ae = window.innerWidth, ie = window.innerHeight, Ze = Ae / ie, Rt = B / ne;
        if (Ze > Rt) {
          let De = ie / ne, yr = (Ae - B * De) / 2;
          T.x = Ve(h.offsetX - yr, 0, B * De, 0, B), T.y = Ve(h.offsetY, 0, ne * De, 0, ne);
        } else {
          let De = Ae / B, yr = (ie - ne * De) / 2;
          T.x = Ve(h.offsetX, 0, B * De, 0, B), T.y = Ve(h.offsetY - yr, 0, ne * De, 0, ne);
        }
      }
      e.events.onOnce("input", () => {
        e.isMouseMoved = true, e.mousePos = T, e.mouseDeltaPos = P, e.events.trigger("mouseMove");
      });
    };
    let Co = ["left", "middle", "right", "back", "forward"];
    Re.mousedown = (h) => {
      e.events.onOnce("input", () => {
        let T = Co[h.button];
        T && (e.lastInputDevice = "mouse", e.buttonsByMouse.has(T) && e.buttonsByMouse.get(T)?.forEach((P) => {
          e.buttonState.press(P), e.events.trigger("buttonPress", P);
        }), e.mouseState.press(T), e.events.trigger("mousePress", T));
      });
    }, Re.mouseup = (h) => {
      e.events.onOnce("input", () => {
        let T = Co[h.button];
        T && (e.buttonsByMouse.has(T) && e.buttonsByMouse.get(T)?.forEach((P) => {
          e.buttonState.release(P), e.events.trigger("buttonRelease", P);
        }), e.mouseState.release(T), e.events.trigger("mouseRelease", T));
      });
    };
    let eu = /* @__PURE__ */ new Set([" ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"]), wo = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down", " ": "space" };
    Re.keydown = (h) => {
      eu.has(h.key) && h.preventDefault(), e.events.onOnce("input", () => {
        let T = wo[h.key] || h.key.toLowerCase(), P = h.code;
        if (T === void 0) throw new Error(`Unknown key: ${h.key}`);
        T.length === 1 ? (e.events.trigger("charInput", T), e.charInputted.push(T)) : T === "space" && (e.events.trigger("charInput", " "), e.charInputted.push(" ")), h.repeat ? (e.keyState.pressRepeat(T), e.events.trigger("keyPressRepeat", T)) : (e.lastInputDevice = "keyboard", e.buttonsByKey.has(T) && e.buttonsByKey.get(T)?.forEach((B) => {
          e.buttonState.press(B), e.events.trigger("buttonPress", B);
        }), e.buttonsByKeyCode.has(P) && e.buttonsByKeyCode.get(P)?.forEach((B) => {
          e.buttonState.press(B), e.events.trigger("buttonPress", B);
        }), e.keyState.press(T), e.events.trigger("keyPressRepeat", T), e.events.trigger("keyPress", T));
      });
    }, Re.keyup = (h) => {
      e.events.onOnce("input", () => {
        let T = wo[h.key] || h.key.toLowerCase(), P = h.code;
        e.buttonsByKey.has(T) && e.buttonsByKey.get(T)?.forEach((B) => {
          e.buttonState.release(B), e.events.trigger("buttonRelease", B);
        }), e.buttonsByKeyCode.has(P) && e.buttonsByKeyCode.get(P)?.forEach((B) => {
          e.buttonState.release(B), e.events.trigger("buttonRelease", B);
        }), e.keyState.release(T), e.events.trigger("keyRelease", T);
      });
    }, Re.touchstart = (h) => {
      h.preventDefault(), e.events.onOnce("input", () => {
        let T = [...h.changedTouches], P = e.canvas.getBoundingClientRect();
        t18.touchToMouse !== false && (e.mousePos = new E(T[0].clientX - P.x, T[0].clientY - P.y), e.lastInputDevice = "mouse", e.buttonsByMouse.has("left") && e.buttonsByMouse.get("left")?.forEach((B) => {
          e.buttonState.press(B), e.events.trigger("buttonPress", B);
        }), e.mouseState.press("left"), e.events.trigger("mousePress", "left")), T.forEach((B) => {
          e.events.trigger("touchStart", new E(B.clientX - P.x, B.clientY - P.y), B);
        });
      });
    }, Re.touchmove = (h) => {
      h.preventDefault(), e.events.onOnce("input", () => {
        let T = [...h.changedTouches], P = e.canvas.getBoundingClientRect();
        if (t18.touchToMouse !== false) {
          let B = e.mousePos;
          e.mousePos = new E(T[0].clientX - P.x, T[0].clientY - P.y), e.mouseDeltaPos = e.mousePos.sub(B), e.events.trigger("mouseMove");
        }
        T.forEach((B) => {
          e.events.trigger("touchMove", new E(B.clientX - P.x, B.clientY - P.y), B);
        });
      });
    }, Re.touchend = (h) => {
      e.events.onOnce("input", () => {
        let T = [...h.changedTouches], P = e.canvas.getBoundingClientRect();
        t18.touchToMouse !== false && (e.mousePos = new E(T[0].clientX - P.x, T[0].clientY - P.y), e.mouseDeltaPos = new E(0, 0), e.buttonsByMouse.has("left") && e.buttonsByMouse.get("left")?.forEach((B) => {
          e.buttonState.release(B), e.events.trigger("buttonRelease", B);
        }), e.mouseState.release("left"), e.events.trigger("mouseRelease", "left")), T.forEach((B) => {
          e.events.trigger("touchEnd", new E(B.clientX - P.x, B.clientY - P.y), B);
        });
      });
    }, Re.touchcancel = (h) => {
      e.events.onOnce("input", () => {
        let T = [...h.changedTouches], P = e.canvas.getBoundingClientRect();
        t18.touchToMouse !== false && (e.mousePos = new E(T[0].clientX - P.x, T[0].clientY - P.y), e.mouseState.release("left"), e.events.trigger("mouseRelease", "left")), T.forEach((B) => {
          e.events.trigger("touchEnd", new E(B.clientX - P.x, B.clientY - P.y), B);
        });
      });
    }, Re.wheel = (h) => {
      h.preventDefault(), e.events.onOnce("input", () => {
        e.events.trigger("scroll", new E(h.deltaX, h.deltaY));
      });
    }, Re.contextmenu = (h) => h.preventDefault(), br.visibilitychange = () => {
      document.visibilityState === "visible" ? (e.skipTime = true, e.isHidden = false, e.events.trigger("show")) : (e.isHidden = true, e.events.trigger("hide"));
    }, En.gamepadconnected = (h) => {
      let T = xo(h.gamepad);
      e.events.onOnce("input", () => {
        e.events.trigger("gamepadConnect", T);
      });
    }, En.gamepaddisconnected = (h) => {
      let T = zt().filter((P) => P.index === h.gamepad.index)[0];
      Ja(h.gamepad), e.events.onOnce("input", () => {
        e.events.trigger("gamepadDisconnect", T);
      });
    };
    for (let [h, T] of Object.entries(Re)) e.canvas.addEventListener(h, T);
    for (let [h, T] of Object.entries(br)) document.addEventListener(h, T);
    for (let [h, T] of Object.entries(En)) window.addEventListener(h, T);
    let Oo = new ResizeObserver((h) => {
      for (let T of h) if (T.target === e.canvas) {
        if (e.lastWidth === e.canvas.offsetWidth && e.lastHeight === e.canvas.offsetHeight) return;
        e.lastWidth = e.canvas.offsetWidth, e.lastHeight = e.canvas.offsetHeight, e.events.onOnce("input", () => {
          e.events.trigger("resize");
        });
      }
    });
    return Oo.observe(e.canvas), { state: e, dt: n, fixedDt: r, restDt: o, time: a, run: A, canvas: e.canvas, fps: l, numFrames: u, quit: V, isHidden: i, setFullscreen: g, isFullscreen: y, setCursor: d, screenshot: m, getGamepads: zt, getCursor: C, setCursorLocked: p, isCursorLocked: b, isTouchscreen: D, mousePos: G, mouseDeltaPos: x, isKeyDown: H, isKeyPressed: F, isKeyPressedRepeat: j, isKeyReleased: q, isMouseDown: S, isMousePressed: w, isMouseReleased: M, isMouseMoved: R, isGamepadButtonPressed: W, isGamepadButtonDown: N, isGamepadButtonReleased: k, getGamepadStick: Qe, isButtonPressed: Z, isButtonDown: X, isButtonReleased: ee, setButton: _, getButton: Ee, pressButton: gt, releaseButton: Gt, charInputted: ct, onResize: Ht, onKeyDown: xn, onKeyPress: vn, onKeyPressRepeat: mr, onKeyRelease: pr, onMouseDown: Mt, onMousePress: Xe, onMouseRelease: Cn, onMouseMove: L, onCharInput: U, onTouchStart: Y, onTouchMove: se, onTouchEnd: xe, onScroll: J, onHide: Ce, onShow: qt, onGamepadButtonDown: dr, onGamepadButtonPress: ut, onGamepadButtonRelease: fr, onGamepadStick: hr, onGamepadConnect: gr, onGamepadDisconnect: wn, onButtonPress: Ie, onButtonDown: Yt, onButtonRelease: Je, getLastInputDeviceType: As, events: e.events };
  }, "initApp");
  function te() {
    return c.app.dt();
  }
  s(te, "dt");
  function an() {
    return c.app.fixedDt();
  }
  s(an, "fixedDt");
  function un() {
    return c.app.restDt();
  }
  s(un, "restDt");
  var Iu = new E(-1, -1);
  var ku = new E(0, -1);
  var _u = new E(1, -1);
  var Nu = new E(-1, 0);
  var Uu = new E(0, 0);
  var Hu = new E(1, 0);
  var qu = new E(-1, 1);
  var zu = new E(0, 1);
  var Yu = new E(1, 1);
  function Ne(t18) {
    switch (t18) {
      case "topleft":
        return Iu;
      case "top":
        return ku;
      case "topright":
        return _u;
      case "left":
        return Nu;
      case "center":
        return Uu;
      case "right":
        return Hu;
      case "botleft":
        return qu;
      case "bot":
        return zu;
      case "botright":
        return Yu;
      default:
        return t18;
    }
  }
  s(Ne, "anchorPt");
  function Gs(t18) {
    switch (t18) {
      case "left":
        return 0;
      case "center":
        return 0.5;
      case "right":
        return 1;
      default:
        return 0;
    }
  }
  s(Gs, "alignPt");
  function Ms(t18) {
    return t18.createBuffer(1, 1, 44100);
  }
  s(Ms, "createEmptyAudioBuffer");
  var Kn = 2.5949095;
  var Rs = 1.70158 + 1;
  var Ds = 2 * Math.PI / 3;
  var Bs = 2 * Math.PI / 4.5;
  var In = { linear: s((t18) => t18, "linear"), easeInSine: s((t18) => 1 - Math.cos(t18 * Math.PI / 2), "easeInSine"), easeOutSine: s((t18) => Math.sin(t18 * Math.PI / 2), "easeOutSine"), easeInOutSine: s((t18) => -(Math.cos(Math.PI * t18) - 1) / 2, "easeInOutSine"), easeInQuad: s((t18) => t18 * t18, "easeInQuad"), easeOutQuad: s((t18) => 1 - (1 - t18) * (1 - t18), "easeOutQuad"), easeInOutQuad: s((t18) => t18 < 0.5 ? 2 * t18 * t18 : 1 - Math.pow(-2 * t18 + 2, 2) / 2, "easeInOutQuad"), easeInCubic: s((t18) => t18 * t18 * t18, "easeInCubic"), easeOutCubic: s((t18) => 1 - Math.pow(1 - t18, 3), "easeOutCubic"), easeInOutCubic: s((t18) => t18 < 0.5 ? 4 * t18 * t18 * t18 : 1 - Math.pow(-2 * t18 + 2, 3) / 2, "easeInOutCubic"), easeInQuart: s((t18) => t18 * t18 * t18 * t18, "easeInQuart"), easeOutQuart: s((t18) => 1 - Math.pow(1 - t18, 4), "easeOutQuart"), easeInOutQuart: s((t18) => t18 < 0.5 ? 8 * t18 * t18 * t18 * t18 : 1 - Math.pow(-2 * t18 + 2, 4) / 2, "easeInOutQuart"), easeInQuint: s((t18) => t18 * t18 * t18 * t18 * t18, "easeInQuint"), easeOutQuint: s((t18) => 1 - Math.pow(1 - t18, 5), "easeOutQuint"), easeInOutQuint: s((t18) => t18 < 0.5 ? 16 * t18 * t18 * t18 * t18 * t18 : 1 - Math.pow(-2 * t18 + 2, 5) / 2, "easeInOutQuint"), easeInExpo: s((t18) => t18 === 0 ? 0 : Math.pow(2, 10 * t18 - 10), "easeInExpo"), easeOutExpo: s((t18) => t18 === 1 ? 1 : 1 - Math.pow(2, -10 * t18), "easeOutExpo"), easeInOutExpo: s((t18) => t18 === 0 ? 0 : t18 === 1 ? 1 : t18 < 0.5 ? Math.pow(2, 20 * t18 - 10) / 2 : (2 - Math.pow(2, -20 * t18 + 10)) / 2, "easeInOutExpo"), easeInCirc: s((t18) => 1 - Math.sqrt(1 - Math.pow(t18, 2)), "easeInCirc"), easeOutCirc: s((t18) => Math.sqrt(1 - Math.pow(t18 - 1, 2)), "easeOutCirc"), easeInOutCirc: s((t18) => t18 < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t18, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t18 + 2, 2)) + 1) / 2, "easeInOutCirc"), easeInBack: s((t18) => Rs * t18 * t18 * t18 - 1.70158 * t18 * t18, "easeInBack"), easeOutBack: s((t18) => 1 + Rs * Math.pow(t18 - 1, 3) + 1.70158 * Math.pow(t18 - 1, 2), "easeOutBack"), easeInOutBack: s((t18) => t18 < 0.5 ? Math.pow(2 * t18, 2) * ((Kn + 1) * 2 * t18 - Kn) / 2 : (Math.pow(2 * t18 - 2, 2) * ((Kn + 1) * (t18 * 2 - 2) + Kn) + 2) / 2, "easeInOutBack"), easeInElastic: s((t18) => t18 === 0 ? 0 : t18 === 1 ? 1 : -Math.pow(2, 10 * t18 - 10) * Math.sin((t18 * 10 - 10.75) * Ds), "easeInElastic"), easeOutElastic: s((t18) => t18 === 0 ? 0 : t18 === 1 ? 1 : Math.pow(2, -10 * t18) * Math.sin((t18 * 10 - 0.75) * Ds) + 1, "easeOutElastic"), easeInOutElastic: s((t18) => t18 === 0 ? 0 : t18 === 1 ? 1 : t18 < 0.5 ? -(Math.pow(2, 20 * t18 - 10) * Math.sin((20 * t18 - 11.125) * Bs)) / 2 : Math.pow(2, -20 * t18 + 10) * Math.sin((20 * t18 - 11.125) * Bs) / 2 + 1, "easeInOutElastic"), easeInBounce: s((t18) => 1 - In.easeOutBounce(1 - t18), "easeInBounce"), easeOutBounce: s((t18) => t18 < 1 / 2.75 ? 7.5625 * t18 * t18 : t18 < 2 / 2.75 ? 7.5625 * (t18 -= 1.5 / 2.75) * t18 + 0.75 : t18 < 2.5 / 2.75 ? 7.5625 * (t18 -= 2.25 / 2.75) * t18 + 0.9375 : 7.5625 * (t18 -= 2.625 / 2.75) * t18 + 0.984375, "easeOutBounce"), easeInOutBounce: s((t18) => t18 < 0.5 ? (1 - In.easeOutBounce(1 - 2 * t18)) / 2 : (1 + In.easeOutBounce(2 * t18 - 1)) / 2, "easeInOutBounce") };
  var nt = In;
  function Wu(t18, e, n) {
    let r = [], o = e;
    for (r.push(o); o !== t18; ) {
      if (o = n.get(o), o == null) return null;
      r.push(o);
    }
    return r.reverse();
  }
  s(Wu, "buildPath");
  function Fr(t18, e, n) {
    let r = new Kt((a, l) => a.cost < l.cost);
    r.insert({ cost: 0, node: e });
    let o = /* @__PURE__ */ new Map();
    o.set(e, e);
    let i = /* @__PURE__ */ new Map();
    for (i.set(e, 0); r.length !== 0; ) {
      let a = r.remove()?.node;
      if (a === n) break;
      let l = t18.getNeighbours(a);
      for (let u of l) {
        let m = (i.get(a) || 0) + t18.getCost(a, u) + t18.getHeuristic(u, n);
        (!i.has(u) || m < i.get(u)) && (i.set(u, m), r.insert({ cost: m, node: u }), o.set(u, a));
      }
    }
    return Wu(e, n, o);
  }
  s(Fr, "aStarSearch");
  var Lr = class {
    static {
      s(this, "NavEdge");
    }
    a;
    b;
    polygon;
    constructor(e, n, r) {
      this.a = e, this.b = n, this.polygon = new WeakRef(r);
    }
    isLeft(e, n) {
      return (this.b.x - this.a.x) * (n - this.a.y) - (e - this.a.x) * (this.b.y - this.a.y);
    }
    get middle() {
      return this.a.add(this.b).scale(0.5);
    }
  };
  var jr = class {
    static {
      s(this, "NavPolygon");
    }
    _edges;
    _centroid;
    _id;
    constructor(e) {
      this._id = e;
    }
    get id() {
      return this._id;
    }
    set edges(e) {
      this._edges = e;
      let n = 0, r = 0, o = 0;
      for (let i of this._edges) {
        i.polygon = new WeakRef(this);
        let a = i.a.x * i.b.y - i.a.y * i.b.x;
        n += (i.a.x + i.b.x) * a, r += (i.a.y + i.b.y) * a, o += a;
      }
      o /= 2, this._centroid = v(n / (6 * o), r / (6 * o));
    }
    get edges() {
      return this._edges;
    }
    get centroid() {
      return this._centroid;
    }
    contains(e) {
      let n = false;
      for (let r of this.edges) r.b.y > e.y != r.a.y > e.y && e.x < (r.a.x - r.b.x) * (e.y - r.b.y) / (r.a.y - r.b.y) + r.b.x && (n = !n);
      return n;
    }
  };
  var kn = class {
    static {
      s(this, "NavMesh");
    }
    _polygons;
    _pointCache;
    _edgeCache;
    constructor() {
      this._polygons = [], this._pointCache = {}, this._edgeCache = {};
    }
    _addPoint(e) {
      let n = this._pointCache[`${e.x}_${e.y}`];
      return n || (n = e.clone(), this._pointCache[`${e.x}_${e.y}`] = n, n);
    }
    _addEdge(e) {
      let n = `${e.a.x}_${e.a.y}-${e.b.x}_${e.b.y}`;
      return this._edgeCache[n] = e, e;
    }
    _findEdge(e, n) {
      let r = `${e.x}_${e.y}-${n.x}_${n.y}`;
      return this._edgeCache[r];
    }
    _findCommonEdge(e, n) {
      for (let r of e.edges) {
        let o = this._findEdge(r.b, r.a);
        if (o && o.polygon.deref().id === n.id) return o;
      }
      return null;
    }
    addPolygon(e) {
      let n = new jr(this._polygons.length), r = e.map((o, i) => new Lr(o, e[(i + 1) % e.length], n));
      n.edges = r, this._polygons.push(n);
      for (let o of n.edges) this._addEdge(o);
      return n;
    }
    addRect(e, n) {
      let r = this._addPoint(e), o = this._addPoint(e.add(n.x, 0)), i = this._addPoint(e.add(n)), a = this._addPoint(e.add(0, n.y));
      return this.addPolygon([r, o, i, a]);
    }
    _getLocation(e) {
      for (let n of this._polygons) if (n.contains(e)) return n;
      return null;
    }
    getNeighbours(e) {
      let n = [];
      for (let r of this._polygons[e].edges) {
        let o = this._findEdge(r.b, r.a);
        if (o) {
          let i = o.polygon.deref();
          i && n.push(i.id);
        }
      }
      return n;
    }
    getCost(e, n) {
      return 1;
    }
    getHeuristic(e, n) {
      let r = this._polygons[e], o = this._polygons[n], i = r.centroid.x - o.centroid.x, a = r.centroid.y - o.centroid.y;
      return Math.sqrt(i * i + a * a);
    }
    getPath(e, n) {
      return e === void 0 || n === void 0 ? [] : e === n ? [e, n] : Fr(this, e, n);
    }
    getWaypointPath(e, n, r) {
      let o = r?.type || "centroids", i = this._getLocation(e), a = this._getLocation(n);
      if (i === void 0 || a === void 0) return [];
      let l = this.getPath(i.id, a.id);
      if (!l) return [];
      if (o === "edges") {
        let u = [];
        for (let m = 1; m < l.length; m++) {
          let d = this._polygons[l[m - 1]], C = this._polygons[l[m]], p = this._findCommonEdge(d, C);
          u.push(p.middle.add(C.centroid.sub(p.middle).unit().scale(4)));
        }
        return [e, ...u, n];
      } else return [e, ...l.slice(1, -1).map((u) => this._polygons[u].centroid), n];
    }
  };
  function dt(t18) {
    let e = new he();
    return t18.pos && e.translate(t18.pos), t18.scale && e.scale(t18.scale), t18.angle && e.rotate(t18.angle), t18.parent ? e.mult(t18.parent.transform) : e;
  }
  s(dt, "calcTransform");
  function Fs(t18) {
    return new E(t18.x / ae() * 2 - 1, -t18.y / ce() * 2 + 1);
  }
  s(Fs, "screen2ndc");
  function Ct(t18, e, n, r, o, i = 1) {
    r = ue(r % 360), o = ue(o % 360), o <= r && (o += Math.PI * 2);
    let a = [], l = Math.ceil((o - r) / ue(8) * i), u = (o - r) / l, m = v(Math.cos(r), Math.sin(r)), d = v(Math.cos(u), Math.sin(u));
    for (let C = 0; C <= l; C++) a.push(t18.add(e * m.x, n * m.y)), m = v(m.x * d.x - m.y * d.y, m.x * d.y + m.y * d.x);
    return a;
  }
  s(Ct, "getArcPts");
  function Ls(...t18) {
    let e = I(...t18), n = t18[3] ?? 1;
    c.gfx.bgColor = e, c.gfx.bgAlpha = n, c.gfx.ggl.gl.clearColor(e.r / 255, e.g / 255, e.b / 255, n);
  }
  s(Ls, "setBackground");
  function js() {
    return c.gfx.bgColor?.clone?.() ?? null;
  }
  s(js, "getBackground");
  function Q(...t18) {
    if (t18[0] === void 0) return;
    let e = v(...t18);
    e.x === 0 && e.y === 0 || c.gfx.transform.translate(e);
  }
  s(Q, "pushTranslate");
  function be() {
    c.gfx.transformStack.push(c.gfx.transform.clone());
  }
  s(be, "pushTransform");
  function Ks(t18) {
    c.gfx.transform = t18.clone();
  }
  s(Ks, "pushMatrix");
  function rt(...t18) {
    if (t18[0] === void 0) return;
    let e = v(...t18);
    e.x === 1 && e.y === 1 || c.gfx.transform.scale(e);
  }
  s(rt, "pushScale");
  function $e(t18) {
    t18 && c.gfx.transform.rotate(t18);
  }
  s($e, "pushRotate");
  function pe() {
    c.gfx.transformStack.length > 0 && (c.gfx.transform = c.gfx.transformStack.pop());
  }
  s(pe, "popTransform");
  function Oe() {
    c.gfx.renderer.flush();
  }
  s(Oe, "flush");
  function ae() {
    return c.gfx.width;
  }
  s(ae, "width");
  function ce() {
    return c.gfx.height;
  }
  s(ce, "height");
  function _n() {
    return (c.gfx.viewport.width + c.gfx.viewport.height) / (c.gfx.width + c.gfx.height);
  }
  s(_n, "getViewportScale");
  function Is(t18) {
    return new E(t18.x * c.gfx.viewport.width / c.gfx.width, t18.y * c.gfx.viewport.height / c.gfx.height);
  }
  s(Is, "contentToView");
  function $u(t18) {
    return new E((t18.x - c.gfx.viewport.x) * ae() / c.gfx.viewport.width, (t18.y - c.gfx.viewport.y) * ce() / c.gfx.viewport.height);
  }
  s($u, "windowToContent");
  function Nn() {
    return $u(c.app.mousePos());
  }
  s(Nn, "mousePos");
  function wt() {
    return v(ae() / 2, ce() / 2);
  }
  s(wt, "center");
  var cn = class {
    static {
      s(this, "TexPacker");
    }
    lastTextureId = 0;
    textures = [];
    bigTextures = [];
    texturesPosition = /* @__PURE__ */ new Map();
    canvas;
    c2d;
    x = 0;
    y = 0;
    curHeight = 0;
    gfx;
    padding;
    constructor(e, n, r, o) {
      this.gfx = e, this.canvas = document.createElement("canvas"), this.canvas.width = n, this.canvas.height = r, this.textures = [Pe.fromImage(e, this.canvas)], this.bigTextures = [], this.padding = o;
      let i = this.canvas.getContext("2d");
      if (!i) throw new Error("Failed to get 2d context");
      this.c2d = i;
    }
    add(e) {
      let n = e.width + this.padding * 2, r = e.height + this.padding * 2;
      if (n > this.canvas.width || r > this.canvas.height) {
        let a = Pe.fromImage(this.gfx, e);
        return this.bigTextures.push(a), [a, new z2(0, 0, 1, 1), 0];
      }
      this.x + n > this.canvas.width && (this.x = 0, this.y += this.curHeight, this.curHeight = 0), this.y + r > this.canvas.height && (this.c2d.clearRect(0, 0, this.canvas.width, this.canvas.height), this.textures.push(Pe.fromImage(this.gfx, this.canvas)), this.x = 0, this.y = 0, this.curHeight = 0);
      let o = this.textures[this.textures.length - 1], i = new E(this.x + this.padding, this.y + this.padding);
      return this.x += n, r > this.curHeight && (this.curHeight = r), e instanceof ImageData ? this.c2d.putImageData(e, i.x, i.y) : this.c2d.drawImage(e, i.x, i.y), o.update(this.canvas), this.texturesPosition.set(this.lastTextureId, { position: i, size: new E(e.width, e.height), texture: o }), this.lastTextureId++, [o, new z2(i.x / this.canvas.width, i.y / this.canvas.height, e.width / this.canvas.width, e.height / this.canvas.height), this.lastTextureId - 1];
    }
    free() {
      for (let e of this.textures) e.free();
      for (let e of this.bigTextures) e.free();
    }
  };
  function de(t18) {
    return typeof t18 != "string" || Ln(t18) ? t18 : c.assets.urlPrefix + t18;
  }
  s(de, "fixURL");
  var le = class t14 {
    static {
      s(this, "Asset");
    }
    loaded = false;
    data = null;
    error = null;
    onLoadEvents = new oe();
    onErrorEvents = new oe();
    onFinishEvents = new oe();
    constructor(e) {
      e.then((n) => {
        this.loaded = true, this.data = n, this.onLoadEvents.trigger(n);
      }).catch((n) => {
        if (this.error = n, this.onErrorEvents.numListeners() > 0) this.onErrorEvents.trigger(n);
        else throw n;
      }).finally(() => {
        this.onFinishEvents.trigger(), this.loaded = true;
      });
    }
    static loaded(e) {
      let n = new t14(Promise.resolve(e));
      return n.data = e, n.loaded = true, n;
    }
    onLoad(e) {
      return this.loaded && this.data ? e(this.data) : this.onLoadEvents.add(e), this;
    }
    onError(e) {
      return this.loaded && this.error ? e(this.error) : this.onErrorEvents.add(e), this;
    }
    onFinish(e) {
      return this.loaded ? e() : this.onFinishEvents.add(e), this;
    }
    then(e) {
      return this.onLoad(e);
    }
    catch(e) {
      return this.onError(e);
    }
    finally(e) {
      return this.onFinish(e);
    }
  };
  var ft = class {
    static {
      s(this, "AssetBucket");
    }
    assets = /* @__PURE__ */ new Map();
    lastUID = 0;
    add(e, n) {
      let r = e ?? this.lastUID++ + "", o = new le(n);
      return this.assets.set(r, o), o;
    }
    addLoaded(e, n) {
      let r = e ?? this.lastUID++ + "", o = le.loaded(n);
      return this.assets.set(r, o), o;
    }
    get(e) {
      return this.assets.get(e);
    }
    progress() {
      if (this.assets.size === 0) return 1;
      let e = 0;
      return this.assets.forEach((n) => {
        n.loaded && e++;
      }), e / this.assets.size;
    }
    getFailedAssets() {
      return Array.from(this.assets.keys()).filter((e) => this.assets.get(e).error !== null).map((e) => [e, this.assets.get(e)]);
    }
  };
  function kr(t18) {
    return fetch(t18).then((e) => {
      if (!e.ok) throw new Error(`Failed to fetch "${t18}"`);
      return e;
    });
  }
  s(kr, "fetchURL");
  function Ot(t18) {
    return kr(t18).then((e) => e.json());
  }
  s(Ot, "fetchJSON");
  function ks(t18) {
    return kr(t18).then((e) => e.text());
  }
  s(ks, "fetchText");
  function _s(t18) {
    return kr(t18).then((e) => e.arrayBuffer());
  }
  s(_s, "fetchArrayBuffer");
  function Ns(t18) {
    return t18 !== void 0 && (c.assets.urlPrefix = t18), c.assets.urlPrefix;
  }
  s(Ns, "loadRoot");
  function Us(t18, e) {
    return c.assets.custom.add(t18, Ot(de(e)));
  }
  s(Us, "loadJSON");
  function Et(t18) {
    let e = new Image();
    return e.crossOrigin = "anonymous", e.src = t18, new Promise((n, r) => {
      e.onload = () => n(e), e.onerror = () => r(new Error(`Failed to load image from "${t18}"`));
    });
  }
  s(Et, "loadImg");
  function Fe() {
    let t18 = [c.assets.sprites, c.assets.sounds, c.assets.shaders, c.assets.fonts, c.assets.bitmapFonts, c.assets.custom];
    return t18.reduce((e, n) => e + n.progress(), 0) / t18.length;
  }
  s(Fe, "loadProgress");
  function Un() {
    return [c.assets.sprites, c.assets.sounds, c.assets.shaders, c.assets.fonts, c.assets.bitmapFonts, c.assets.custom].reduce((e, n) => e.concat(n.getFailedAssets()), []);
  }
  s(Un, "getFailedAssets");
  function Hs(t18) {
    return c.assets.custom.get(t18) ?? null;
  }
  s(Hs, "getAsset");
  function ln(t18) {
    return c.assets.custom.add(null, t18);
  }
  s(ln, "load");
  var qs = s((t18, e) => ({ urlPrefix: "", sprites: new ft(), fonts: new ft(), bitmapFonts: new ft(), sounds: new ft(), shaders: new ft(), custom: new ft(), music: {}, packer: new cn(t18, 2048, 2048, e), loaded: false }), "initAssets");
  var zs = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAoVJREFUaIHdm7txwkAQhheGAqACiCHzOKQDQrqgILpwSAeEDBnEUAF0gCMxZ7G72qce/mec2Lpf9+3unaS78wgSNZ8uX5729+d1FNWXUuGmXlBOUUEIMckEpeQJgBu6C+BSFngztBR2vd+ovY+7g+p6LbgaWgJrAeUkDYIUXgXdBBwNi6kpABJwMTQH3AZsXRR8GHTfgEth8E3gjdAUcNewpbTgY85sCMCUuOokozE0YM0YRzM9NGAAXd8+omAF5h4lnmBRvpSnZHyLoLEbaN+aKB9KWv/KWw0tAbbANnlG+UvB2dm77NxxdwgBpjrF/d7rW9cbmpvio2A5z8iAYpVU8pGZlo6/2+MSco2lHfd3rv9jAP038e1xef9o2mjvYb2OqpqKE81028/jeietlSEVO5FRWsxWsJit1G3aFpW8iWe5RwpiCZAk25QvV6nz6fIlynRGuTd5WqpJ4guAlDfVKBK87hXljflgv1ON6fV+4+5gVlA17SfeG0heKqQd4l4jI/wrmaA9N9R4ar+wpHJDZyrrfcH0nB66PqAzPi76pn+faSyJk/vzOorYhGurQrzj/P68jtBMawHaHBIR9xoD5O34dy0qQOSYHvqExq2TpT2nf76+w7y251OYF0CRaU+J920TwLUa6inx6OxE6g80lu2ux7Y2eJLF/rCXE6zEPdnenk9o+4ih9AEdnW2q81HXl5LuU6OTl2fXUhqganbXAGq3g6jJOWV/OnoesO6YqqEB/GdNsjf7uHtwj2DzmRNpp7iOZfm6D9oAxB6Yi1gC4oIYeo4MIPdopEQRB+cAko5J1tW386HpB2Kz1eop4Epdwls/kgZ1sh8gZsEjdcWkr//D8Qu3Z3l5Nl1NtAAAAABJRU5ErkJggg==";
  var Le = class t15 {
    static {
      s(this, "SpriteData");
    }
    tex;
    frames = [new z2(0, 0, 1, 1)];
    anims = {};
    slice9 = null;
    constructor(e, n, r = {}, o = null) {
      this.tex = e, n && (this.frames = n), this.anims = r, this.slice9 = o;
    }
    get width() {
      return this.tex.width * this.frames[0].w;
    }
    get height() {
      return this.tex.height * this.frames[0].h;
    }
    static from(e, n = {}) {
      return typeof e == "string" ? t15.fromURL(e, n) : Promise.resolve(t15.fromImage(e, n));
    }
    static fromImage(e, n = {}) {
      let [r, o] = c.assets.packer.add(e), i = n.frames ? n.frames.map((a) => new z2(o.x + a.x * o.w, o.y + a.y * o.h, a.w * o.w, a.h * o.h)) : Nr(n.sliceX || 1, n.sliceY || 1, o.x, o.y, o.w, o.h);
      return new t15(r, i, n.anims, n.slice9);
    }
    static fromURL(e, n = {}) {
      return Et(e).then((r) => t15.fromImage(r, n));
    }
  };
  function It(t18) {
    if (typeof t18 == "string") {
      let e = _r(t18);
      if (e) return e;
      if (Fe() < 1) return null;
      throw new Error(`Sprite not found: ${t18}`);
    } else {
      if (t18 instanceof Le) return le.loaded(t18);
      if (t18 instanceof le) return t18;
      throw new Error(`Invalid sprite: ${t18}`);
    }
  }
  s(It, "resolveSprite");
  function _r(t18) {
    return c.assets.sprites.get(t18) ?? null;
  }
  s(_r, "getSprite");
  function Tt(t18, e, n = { sliceX: 1, sliceY: 1, anims: {} }) {
    return e = de(e), Array.isArray(e) ? e.some((r) => typeof r == "string") ? c.assets.sprites.add(t18, Promise.all(e.map((r) => typeof r == "string" ? Et(r) : Promise.resolve(r))).then((r) => Ys(r, n))) : c.assets.sprites.addLoaded(t18, Ys(e, n)) : typeof e == "string" ? c.assets.sprites.add(t18, Le.from(e, n)) : c.assets.sprites.addLoaded(t18, Le.fromImage(e, n));
  }
  s(Tt, "loadSprite");
  function Nr(t18 = 1, e = 1, n = 0, r = 0, o = 1, i = 1) {
    let a = [], l = o / t18, u = i / e;
    for (let m = 0; m < e; m++) for (let d = 0; d < t18; d++) a.push(new z2(n + d * l, r + m * u, l, u));
    return a;
  }
  s(Nr, "slice");
  function Ys(t18, e = {}) {
    let n = document.createElement("canvas"), r = t18[0].width, o = t18[0].height;
    n.width = r * t18.length, n.height = o;
    let i = n.getContext("2d");
    if (!i) throw new Error("Failed to create canvas context");
    t18.forEach((l, u) => {
      l instanceof ImageData ? i.putImageData(l, u * r, 0) : i.drawImage(l, u * r, 0);
    });
    let a = i.getImageData(0, 0, t18.length * r, o);
    return Le.fromImage(a, { ...e, sliceX: t18.length, sliceY: 1 });
  }
  s(Ys, "createSpriteSheet");
  function Ws(t18 = "bean") {
    return Tt(t18, zs);
  }
  s(Ws, "loadBean");
  function $s(t18, e, n) {
    e = de(e), n = de(n), typeof e == "string" && !n && (n = xs(e) + ".json");
    let r = typeof n == "string" ? Ot(n) : Promise.resolve(n);
    return c.assets.sprites.add(t18, r.then((o) => {
      let i = o.meta.size, a = o.frames.map((u) => new z2(u.frame.x / i.w, u.frame.y / i.h, u.frame.w / i.w, u.frame.h / i.h)), l = {};
      for (let u of o.meta.frameTags) u.from === u.to ? l[u.name] = u.from : l[u.name] = { from: u.from, to: u.to, speed: 10, loop: true, pingpong: u.direction === "pingpong" };
      return Le.from(e, { frames: a, anims: l });
    }));
  }
  s($s, "loadAseprite");
  var At = class {
    static {
      s(this, "FontData");
    }
    fontface;
    filter = Zt;
    outline = null;
    size = 64;
    constructor(e, n = {}) {
      if (this.fontface = e, this.filter = n.filter ?? Zt, this.size = n.size ?? 64, this.size > 256) throw new Error(`Max font size: ${256}`);
      n.outline && (this.outline = { width: 1, color: I(0, 0, 0) }, typeof n.outline == "number" ? this.outline.width = n.outline : typeof n.outline == "object" && (n.outline.width && (this.outline.width = n.outline.width), n.outline.color && (this.outline.color = n.outline.color)));
    }
  };
  function Ur(t18) {
    if (!t18) return Ur(c.globalOpt.font ?? rs);
    if (typeof t18 == "string") {
      let e = Hn(t18), n = Hr(t18);
      if (e) return e.data ?? e;
      if (n) return n.data ?? n;
      if (document.fonts.check(`${64}px ${t18}`)) return t18;
      if (Fe() < 1) return null;
      throw new Error(`Font not found: ${t18}`);
    } else if (t18 instanceof le) return t18.data ? t18.data : t18;
    return t18;
  }
  s(Ur, "resolveFont");
  function Hr(t18) {
    return c.assets.fonts.get(t18) ?? null;
  }
  s(Hr, "getFont");
  function Xs(t18, e, n = {}) {
    let r = de(e), o = new FontFace(t18, typeof e == "string" ? `url(${r})` : r);
    return document.fonts.add(o), c.assets.fonts.add(t18, o.load().catch((i) => {
      throw new Error(`Failed to load font from "${r}": ${i}`);
    }).then((i) => new At(i, n)));
  }
  s(Xs, "loadFont");
  function Qs(t18, e, n, r) {
    let o = t18.width / e, i = {}, a = r.split("").entries();
    for (let [l, u] of a) i[u] = new z2(l % o * e, Math.floor(l / o) * n, e, n);
    return { tex: t18, map: i, size: n };
  }
  s(Qs, "makeFont");
  function Hn(t18) {
    return c.assets.bitmapFonts.get(t18) ?? null;
  }
  s(Hn, "getBitmapFont");
  function Js(t18, e, n, r, o = {}) {
    let i = de(e);
    return c.assets.bitmapFonts.add(t18, Et(i).then((a) => Qs(Pe.fromImage(c.gfx.ggl, a, o), n, r, o.chars ?? Dn)));
  }
  s(Js, "loadBitmapFont");
  function Zs(t18, e) {
    return e = de(e), c.assets.sprites.add(t18, new Promise(async (n) => {
      let r = typeof e == "string" ? await Ot(e) : e, o = await Promise.all(r.frames.map(Et)), i = document.createElement("canvas");
      i.width = r.width, i.height = r.height * r.frames.length;
      let a = i.getContext("2d");
      if (!a) throw new Error("Failed to create canvas context");
      o.forEach((u, m) => {
        a.drawImage(u, 0, m * r.height);
      });
      let l = await Tt(null, i, { sliceY: r.frames.length, anims: r.anims });
      n(l);
    }));
  }
  s(Zs, "loadPedit");
  var qr = class {
    static {
      s(this, "Shader");
    }
    ctx;
    glProgram;
    constructor(e, n, r, o) {
      this.ctx = e, e.onDestroy(() => this.free());
      let i = e.gl, a = i.createShader(i.VERTEX_SHADER), l = i.createShader(i.FRAGMENT_SHADER);
      if (!a || !l) throw new Error("Failed to create shader");
      i.shaderSource(a, n), i.shaderSource(l, r), i.compileShader(a), i.compileShader(l);
      let u = i.createProgram();
      if (this.glProgram = u, i.attachShader(u, a), i.attachShader(u, l), o.forEach((m, d) => i.bindAttribLocation(u, d, m)), i.linkProgram(u), !i.getProgramParameter(u, i.LINK_STATUS)) {
        let m = i.getShaderInfoLog(a);
        if (m) throw new Error("VERTEX SHADER " + m);
        let d = i.getShaderInfoLog(l);
        if (d) throw new Error("FRAGMENT SHADER " + d);
      }
      i.deleteShader(a), i.deleteShader(l);
    }
    bind() {
      this.ctx.pushProgram(this.glProgram);
    }
    unbind() {
      this.ctx.popProgram();
    }
    send(e) {
      let n = this.ctx.gl;
      for (let r in e) {
        let o = e[r], i = n.getUniformLocation(this.glProgram, r);
        if (typeof o == "number") n.uniform1f(i, o);
        else if (o instanceof he) n.uniformMatrix4fv(i, false, new Float32Array(o.m));
        else if (o instanceof K) n.uniform3f(i, o.r, o.g, o.b);
        else if (o instanceof E) n.uniform2f(i, o.x, o.y);
        else if (Array.isArray(o)) {
          let a = o[0];
          gs(o) ? n.uniform1fv(i, o) : hs(o) ? n.uniform2fv(i, o.map((l) => [l.x, l.y]).flat()) : fs(o) && n.uniform3fv(i, o.map((l) => [l.r, l.g, l.b]).flat());
        } else throw new Error("Unsupported uniform data type");
      }
    }
    free() {
      this.ctx.gl.deleteProgram(this.glProgram);
    }
  };
  function qn(t18, e = tn, n = nn) {
    let r = as.replace("{{user}}", e ?? tn), o = us.replace("{{user}}", n ?? nn);
    try {
      return new qr(t18, r, o, en.map((i) => i.name));
    } catch (i) {
      let l = /(?<type>^\w+) SHADER ERROR: 0:(?<line>\d+): (?<msg>.+)/, u = Cs(i).match(l);
      if (!u?.groups) throw i;
      let m = Number(u.groups.line) - 14, d = u.groups.msg.trim(), C = u.groups.type.toLowerCase();
      throw new Error(`${C} shader line ${m}: ${d}`);
    }
  }
  s(qn, "makeShader");
  function ei(t18) {
    if (!t18) return c.gfx.defShader;
    if (typeof t18 == "string") {
      let e = zr(t18);
      if (e) return e.data ?? e;
      if (Fe() < 1) return null;
      throw new Error(`Shader not found: ${t18}`);
    } else if (t18 instanceof le) return t18.data ? t18.data : t18;
    return t18;
  }
  s(ei, "resolveShader");
  function zr(t18) {
    return c.assets.shaders.get(t18) ?? null;
  }
  s(zr, "getShader");
  function ti(t18, e, n) {
    return c.assets.shaders.addLoaded(t18, qn(c.gfx.ggl, e, n));
  }
  s(ti, "loadShader");
  function ni(t18, e, n) {
    e = de(e), n = de(n);
    let r = s((i) => i ? ks(i) : Promise.resolve(null), "resolveUrl"), o = Promise.all([r(e), r(n)]).then(([i, a]) => qn(c.gfx.ggl, i, a));
    return c.assets.shaders.add(t18, o);
  }
  s(ni, "loadShaderURL");
  var ot = class t16 {
    static {
      s(this, "SoundData");
    }
    buf;
    constructor(e) {
      this.buf = e;
    }
    static fromArrayBuffer(e) {
      return new Promise((n, r) => c.audio.ctx.decodeAudioData(e, n, r)).then((n) => new t16(n));
    }
    static fromURL(e) {
      return Ln(e) ? t16.fromArrayBuffer(bs(e)) : _s(e).then((n) => t16.fromArrayBuffer(n));
    }
  };
  function ri(t18) {
    if (typeof t18 == "string") {
      let e = Yr(t18);
      if (e) return e;
      if (Fe() < 1) return null;
      throw new Error(`Sound not found: ${t18}`);
    } else {
      if (t18 instanceof ot) return le.loaded(t18);
      if (t18 instanceof le) return t18;
      throw new Error(`Invalid sound: ${t18}`);
    }
  }
  s(ri, "resolveSound");
  function Yr(t18) {
    return c.assets.sounds.get(t18) ?? null;
  }
  s(Yr, "getSound");
  function oi(t18, e) {
    return e = de(e), c.assets.sounds.add(t18, typeof e == "string" ? ot.fromURL(e) : ot.fromArrayBuffer(e));
  }
  s(oi, "loadSound");
  function si(t18, e) {
    let n = de(e), r = new Audio(n);
    return r.preload = "auto", c.assets.music[t18] = n;
  }
  s(si, "loadMusic");
  function Wr(t18, e) {
    return t18 = de(t18), typeof e == "string" ? ln(new Promise((n, r) => {
      Ot(e).then((o) => {
        Wr(t18, o).then(n).catch(r);
      });
    })) : ln(Le.from(t18).then((n) => {
      let r = {};
      for (let o in e) {
        let i = e[o], a = n.frames[0], l = 2048 * a.w, u = 2048 * a.h, m = i.frames ? i.frames.map((C) => new z2(a.x + (i.x + C.x) / l * a.w, a.y + (i.y + C.y) / u * a.h, C.w / l * a.w, C.h / u * a.h)) : Nr(i.sliceX || 1, i.sliceY || 1, a.x + i.x / l * a.w, a.y + i.y / u * a.h, i.width / l * a.w, i.height / u * a.h), d = new Le(n.tex, m, i.anims);
        c.assets.sprites.addLoaded(o, d), r[o] = d;
      }
      return r;
    }));
  }
  s(Wr, "loadSpriteAtlas");
  function je(t18, e, n = false, r, o, i = {}) {
    let a = r ?? c.gfx.defTex, l = o ?? c.gfx.defShader, u = ei(l);
    if (!u || u instanceof le) return;
    let m = c.gfx.fixed || n ? c.gfx.transform : c.game.cam.transform.mult(c.gfx.transform), d = [];
    for (let C of t18) {
      let p = Fs(m.multVec2(C.pos));
      d.push(p.x, p.y, C.uv.x, C.uv.y, C.color.r / 255, C.color.g / 255, C.color.b / 255, C.opacity);
    }
    c.gfx.renderer.push(c.gfx.ggl.gl.TRIANGLES, d, e, u, a, i);
  }
  s(je, "drawRaw");
  function Ge(t18) {
    if (!t18.pts) throw new Error('drawPolygon() requires property "pts".');
    let e = t18.pts.length;
    if (!(e < 3)) {
      if (be(), Q(t18.pos), rt(t18.scale), $e(t18.angle), Q(t18.offset), t18.fill !== false) {
        let n = t18.color ?? K.WHITE, r = t18.pts.map((i, a) => ({ pos: new E(i.x, i.y), uv: t18.uv ? t18.uv[a] : new E(0, 0), color: t18.colors && t18.colors[a] ? t18.colors[a].mult(n) : n, opacity: t18.opacity ?? 1 })), o;
        t18.triangulate ? o = Rn(t18.pts).map((a) => a.map((l) => t18.pts.indexOf(l))).flat() : o = [...Array(e - 2).keys()].map((i) => [0, i + 1, i + 2]).flat(), je(r, t18.indices ?? o, t18.fixed, t18.uv ? t18.tex : c.gfx.defTex, t18.shader, t18.uniform ?? void 0);
      }
      t18.outline && kt({ pts: [...t18.pts, t18.pts[0]], radius: t18.radius, width: t18.outline.width, color: t18.outline.color, join: t18.outline.join, uniform: t18.uniform, fixed: t18.fixed, opacity: t18.opacity ?? t18.outline.opacity }), pe();
    }
  }
  s(Ge, "drawPolygon");
  function zn(t18) {
    if (t18.radiusX === void 0 || t18.radiusY === void 0) throw new Error('drawEllipse() requires properties "radiusX" and "radiusY".');
    if (t18.radiusX === 0 || t18.radiusY === 0) return;
    let e = t18.start ?? 0, n = t18.end ?? 360, r = Ne(t18.anchor ?? "center").scale(new E(-t18.radiusX, -t18.radiusY)), o = Ct(r, t18.radiusX, t18.radiusY, e, n, t18.resolution);
    o.unshift(r);
    let i = Object.assign({}, t18, { pts: o, radius: 0, ...t18.gradient ? { colors: [t18.gradient[0], ...Array(o.length - 1).fill(t18.gradient[1])] } : {} });
    if (n - e >= 360 && t18.outline) {
      t18.fill !== false && Ge(Object.assign({}, i, { outline: null })), Ge(Object.assign({}, i, { pts: o.slice(1), fill: false }));
      return;
    }
    Ge(i);
  }
  s(zn, "drawEllipse");
  function Ue(t18) {
    if (typeof t18.radius != "number") throw new Error('drawCircle() requires property "radius".');
    t18.radius !== 0 && zn(Object.assign({}, t18, { radiusX: t18.radius, radiusY: t18.radius, angle: 0 }));
  }
  s(Ue, "drawCircle");
  function _t(t18) {
    let { p1: e, p2: n } = t18;
    if (!e || !n) throw new Error('drawLine() requires properties "p1" and "p2".');
    let r = t18.width || 1, o = n.sub(e).unit().normal().scale(r * 0.5), i = [e.sub(o), e.add(o), n.add(o), n.sub(o)].map((a) => ({ pos: new E(a.x, a.y), uv: new E(0), color: t18.color ?? K.WHITE, opacity: t18.opacity ?? 1 }));
    je(i, [0, 1, 3, 1, 2, 3], t18.fixed, c.gfx.defTex, t18.shader, t18.uniform ?? void 0);
  }
  s(_t, "drawLine");
  function Qu(t18) {
    let e = t18.pts, n = [], r = (t18.width || 1) * 0.5, o = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]), i = t18.pos || v(0, 0), a;
    o ? a = e[0].sub(e[e.length - 2]) : a = e[1].sub(e[0]);
    let l = a.len(), u = a.normal().scale(-r / l), m, d = e[0];
    if (!o) switch (t18.cap) {
      case "square": {
        let f = a.scale(-r / l);
        n.push(d.add(f).add(u)), n.push(d.add(f).sub(u));
        break;
      }
      case "round": {
        let f = Math.max(r, 10), O = Math.PI / f, g = u.scale(-1), y = Math.cos(O), V = Math.sin(O);
        for (let A = 0; A < f; A++) n.push(d), n.push(d.sub(g)), g = v(g.x * y - g.y * V, g.x * V + g.y * y);
      }
    }
    for (let f = 1; f < e.length; f++) {
      if (d === e[f] || d.eq(e[f])) continue;
      m = d, d = e[f];
      let O = d.sub(m), g = O.len(), y = O.normal().scale(-r / g), V = a.cross(O);
      if (Math.abs(V) / (l * g) < 0.05) {
        n.push(m.add(u)), n.push(m.sub(u)), a.dot(O) < 0 && (n.push(m.sub(u)), n.push(m.add(u))), a = O, l = g, u = y;
        continue;
      }
      let A = y.sub(u).cross(O) / V, D = u.add(a.scale(A));
      V > 0 ? (n.push(m.add(D)), n.push(m.sub(u)), n.push(m.add(D)), n.push(m.sub(y))) : (n.push(m.add(u)), n.push(m.sub(D)), n.push(m.add(y)), n.push(m.sub(D))), a = O, l = g, u = y;
    }
    if (!o) switch (n.push(d.add(u)), n.push(d.sub(u)), t18.cap) {
      case "square": {
        let f = a.scale(r / l);
        n.push(d.add(f).add(u)), n.push(d.add(f).sub(u));
        break;
      }
      case "round": {
        let f = Math.max(r, 10), O = Math.PI / f, g = u.scale(1), y = Math.cos(O), V = Math.sin(O);
        for (let A = 0; A < f; A++) g = v(g.x * y - g.y * V, g.x * V + g.y * y), n.push(d), n.push(d.sub(g));
      }
    }
    if (n.length < 4) return;
    let C = n.map((f) => ({ pos: i.add(f), uv: v(), color: t18.color || K.WHITE, opacity: t18.opacity ?? 1 })), p = [], b = 0;
    for (let f = 0; f < n.length - 2; f += 2) p[b++] = f + 1, p[b++] = f, p[b++] = f + 2, p[b++] = f + 2, p[b++] = f + 3, p[b++] = f + 1;
    o && (p[b++] = n.length - 1, p[b++] = n.length - 2, p[b++] = 0, p[b++] = 0, p[b++] = 1, p[b++] = n.length - 1), je(C, p, t18.fixed, c.gfx.defTex, t18.shader, t18.uniform ?? void 0);
  }
  s(Qu, "_drawLinesBevel");
  function Ju(t18) {
    let e = t18.pts, n = [], r = (t18.width || 1) * 0.5, o = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]), i = t18.pos || v(0, 0), a;
    o ? a = e[0].sub(e[e.length - 2]) : a = e[1].sub(e[0]);
    let l = a.len(), u = a.normal().scale(-r / l), m, d = e[0];
    if (!o) switch (t18.cap) {
      case "square": {
        let f = a.scale(-r / l);
        n.push(d.add(f).add(u)), n.push(d.add(f).sub(u));
        break;
      }
      case "round": {
        let f = Math.max(r, 10), O = Math.PI / f, g = u.scale(-1), y = Math.cos(O), V = Math.sin(O);
        for (let A = 0; A < f; A++) n.push(d), n.push(d.sub(g)), g = v(g.x * y - g.y * V, g.x * V + g.y * y);
      }
    }
    for (let f = 1; f < e.length; f++) {
      if (d === e[f] || d.eq(e[f])) continue;
      m = d, d = e[f];
      let O = d.sub(m), g = O.len(), y = O.normal().scale(-r / g), V = a.cross(O);
      if (Math.abs(V) / (l * g) < 0.05) {
        n.push(m.add(u)), n.push(m.sub(u)), a.dot(O) < 0 && (n.push(m.sub(u)), n.push(m.add(u))), a = O, l = g, u = y;
        continue;
      }
      let A = y.sub(u).cross(O) / V, D = u.add(a.scale(A));
      if (V > 0) {
        let G = m.add(D), x = Math.max(r, 10), w = ue(u.angleBetween(y) / x), S = u, M = Math.cos(w), R = Math.sin(w);
        for (let F = 0; F < x; F++) n.push(G), n.push(m.sub(S)), S = v(S.x * M - S.y * R, S.x * R + S.y * M);
      } else {
        let G = m.sub(D), x = Math.max(r, 10), w = ue(u.angleBetween(y) / x), S = u, M = Math.cos(w), R = Math.sin(w);
        for (let F = 0; F < x; F++) n.push(m.add(S)), n.push(G), S = v(S.x * M - S.y * R, S.x * R + S.y * M);
      }
      a = O, l = g, u = y;
    }
    if (!o) switch (n.push(d.add(u)), n.push(d.sub(u)), t18.cap) {
      case "square": {
        let f = a.scale(r / l);
        n.push(d.add(f).add(u)), n.push(d.add(f).sub(u));
        break;
      }
      case "round": {
        let f = Math.max(r, 10), O = Math.PI / f, g = u.scale(1), y = Math.cos(O), V = Math.sin(O);
        for (let A = 0; A < f; A++) g = v(g.x * y - g.y * V, g.x * V + g.y * y), n.push(d), n.push(d.sub(g));
      }
    }
    if (n.length < 4) return;
    let C = n.map((f) => ({ pos: i.add(f), uv: v(), color: t18.color || K.WHITE, opacity: t18.opacity ?? 1 })), p = [], b = 0;
    for (let f = 0; f < n.length - 2; f += 2) p[b++] = f + 1, p[b++] = f, p[b++] = f + 2, p[b++] = f + 2, p[b++] = f + 3, p[b++] = f + 1;
    o && (p[b++] = n.length - 1, p[b++] = n.length - 2, p[b++] = 0, p[b++] = 0, p[b++] = 1, p[b++] = n.length - 1), je(C, p, t18.fixed, c.gfx.defTex, t18.shader, t18.uniform ?? void 0);
  }
  s(Ju, "_drawLinesRound");
  function Zu(t18) {
    let e = t18.pts, n = [], r = (t18.width || 1) * 0.5, o = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]), i = t18.pos || v(0, 0), a;
    o ? a = e[0].sub(e[e.length - 2]) : a = e[1].sub(e[0]);
    let l = a.len(), u = a.normal().scale(-r / l), m, d = e[0];
    if (!o) switch (t18.cap) {
      case "square": {
        let f = a.scale(-r / l);
        n.push(d.add(f).add(u)), n.push(d.add(f).sub(u));
        break;
      }
      case "round": {
        let f = Math.max(r, 10), O = Math.PI / f, g = u.scale(-1), y = Math.cos(O), V = Math.sin(O);
        for (let A = 0; A < f; A++) n.push(d), n.push(d.sub(g)), g = v(g.x * y - g.y * V, g.x * V + g.y * y);
      }
    }
    for (let f = 1; f < e.length; f++) {
      if (d === e[f] || d.eq(e[f])) continue;
      m = d, d = e[f];
      let O = d.sub(m), g = O.len(), y = O.normal().scale(-r / g), V = a.cross(O);
      if (Math.abs(V) / (l * g) < 0.05) {
        n.push(m.add(u)), n.push(m.sub(u)), a.dot(O) < 0 && (n.push(m.sub(u)), n.push(m.add(u))), a = O, l = g, u = y;
        continue;
      }
      let A = y.sub(u).cross(O) / V, D = u.add(a.scale(A));
      n.push(m.add(D)), n.push(m.sub(D)), a = O, l = g, u = y;
    }
    if (!o) switch (n.push(d.add(u)), n.push(d.sub(u)), t18.cap) {
      case "square": {
        let f = a.scale(r / l);
        n.push(d.add(f).add(u)), n.push(d.add(f).sub(u));
        break;
      }
      case "round": {
        let f = Math.max(r, 10), O = Math.PI / f, g = u.scale(1), y = Math.cos(O), V = Math.sin(O);
        for (let A = 0; A < f; A++) g = v(g.x * y - g.y * V, g.x * V + g.y * y), n.push(d), n.push(d.sub(g));
      }
    }
    if (n.length < 4) return;
    let C = n.map((f) => ({ pos: i.add(f), uv: v(), color: t18.color || K.WHITE, opacity: t18.opacity ?? 1 })), p = [], b = 0;
    for (let f = 0; f < n.length - 2; f += 2) p[b++] = f + 1, p[b++] = f, p[b++] = f + 2, p[b++] = f + 2, p[b++] = f + 3, p[b++] = f + 1;
    o && (p[b++] = n.length - 1, p[b++] = n.length - 2, p[b++] = 0, p[b++] = 0, p[b++] = 1, p[b++] = n.length - 1), je(C, p, t18.fixed, c.gfx.defTex, t18.shader, t18.uniform ?? void 0);
  }
  s(Zu, "_drawLinesMiter");
  function kt(t18) {
    let e = t18.pts, n = t18.width ?? 1;
    if (!e) throw new Error('drawLines() requires property "pts".');
    if (!(e.length < 2)) {
      if (e.length > 2) switch (t18.join) {
        case "bevel":
          return Qu(t18);
        case "round":
          return Ju(t18);
        case "miter":
          return Zu(t18);
      }
      if (t18.radius && e.length >= 3) {
        _t(Object.assign({}, t18, { p1: e[0], p2: e[1] }));
        for (let r = 1; r < e.length - 2; r++) {
          let o = e[r], i = e[r + 1];
          _t(Object.assign({}, t18, { p1: o, p2: i }));
        }
        _t(Object.assign({}, t18, { p1: e[e.length - 2], p2: e[e.length - 1] }));
      } else for (let r = 0; r < e.length - 1; r++) _t(Object.assign({}, t18, { p1: e[r], p2: e[r + 1] })), t18.join !== "none" && Ue(Object.assign({}, t18, { pos: e[r], radius: n / 2 }));
    }
  }
  s(kt, "drawLines");
  function Yn(t18, e) {
    let n = e.segments ?? 16, r = [];
    for (let o = 0; o <= n; o++) r.push(t18(o / n));
    kt({ pts: r, width: e.width || 1, pos: e.pos, color: e.color, opacity: e.opacity });
  }
  s(Yn, "drawCurve");
  function ii(t18) {
    Yn((e) => Jt(t18.pt1, t18.pt2, t18.pt3, t18.pt4, e), t18);
  }
  s(ii, "drawBezier");
  var Pe = class t17 {
    static {
      s(this, "Texture");
    }
    ctx;
    src = null;
    glTex;
    width;
    height;
    constructor(e, n, r, o = {}) {
      this.ctx = e;
      let i = e.gl, a = e.gl.createTexture();
      if (!a) throw new Error("Failed to create texture");
      this.glTex = a, e.onDestroy(() => this.free()), this.width = n, this.height = r;
      let l = { linear: i.LINEAR, nearest: i.NEAREST }[o.filter ?? e.opts.texFilter ?? "nearest"], u = { repeat: i.REPEAT, clampToEdge: i.CLAMP_TO_EDGE }[o.wrap ?? "clampToEdge"];
      this.bind(), n && r && i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, n, r, 0, i.RGBA, i.UNSIGNED_BYTE, null), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, l), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, l), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, u), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, u), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true), this.unbind();
    }
    static fromImage(e, n, r = {}) {
      let o = new t17(e, n.width, n.height, r);
      return o.update(n), o.src = n, o;
    }
    update(e, n = 0, r = 0) {
      let o = this.ctx.gl;
      this.bind(), o.texSubImage2D(o.TEXTURE_2D, 0, n, r, o.RGBA, o.UNSIGNED_BYTE, e), this.unbind();
    }
    bind() {
      this.ctx.pushTexture2D(this.glTex);
    }
    unbind() {
      this.ctx.popTexture2D();
    }
    free() {
      this.ctx.gl.deleteTexture(this.glTex);
    }
  };
  var st = class {
    static {
      s(this, "FrameBuffer");
    }
    ctx;
    tex;
    glFramebuffer;
    glRenderbuffer;
    constructor(e, n, r, o = {}) {
      this.ctx = e;
      let i = e.gl;
      e.onDestroy(() => this.free()), this.tex = new Pe(e, n, r, o);
      let a = i.createFramebuffer(), l = i.createRenderbuffer();
      if (!a || !l) throw new Error("Failed to create framebuffer");
      this.glFramebuffer = a, this.glRenderbuffer = l, this.bind(), i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_STENCIL, n, r), i.framebufferTexture2D(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, this.tex.glTex, 0), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.RENDERBUFFER, this.glRenderbuffer), this.unbind();
    }
    get width() {
      return this.tex.width;
    }
    get height() {
      return this.tex.height;
    }
    toImageData() {
      let e = this.ctx.gl, n = new Uint8ClampedArray(this.width * this.height * 4);
      this.bind(), e.readPixels(0, 0, this.width, this.height, e.RGBA, e.UNSIGNED_BYTE, n), this.unbind();
      let r = this.width * 4, o = new Uint8Array(r);
      for (let i = 0; i < (this.height / 2 | 0); i++) {
        let a = i * r, l = (this.height - i - 1) * r;
        o.set(n.subarray(a, a + r)), n.copyWithin(a, l, l + r), n.set(o, l);
      }
      return new ImageData(n, this.width, this.height);
    }
    toDataURL() {
      let e = document.createElement("canvas"), n = e.getContext("2d");
      if (e.width = this.width, e.height = this.height, !n) throw new Error("Failed to get 2d context");
      return n.putImageData(this.toImageData(), 0, 0), e.toDataURL();
    }
    clear() {
      let e = this.ctx.gl;
      e.clear(e.COLOR_BUFFER_BIT);
    }
    draw(e) {
      this.bind(), e(), this.unbind();
    }
    bind() {
      this.ctx.pushFramebuffer(this.glFramebuffer), this.ctx.pushRenderbuffer(this.glRenderbuffer), this.ctx.pushViewport({ x: 0, y: 0, w: this.width, h: this.height });
    }
    unbind() {
      this.ctx.popFramebuffer(), this.ctx.popRenderbuffer(), this.ctx.popViewport();
    }
    free() {
      let e = this.ctx.gl;
      e.deleteFramebuffer(this.glFramebuffer), e.deleteRenderbuffer(this.glRenderbuffer), this.tex.free();
    }
  };
  var Wn = class {
    static {
      s(this, "BatchRenderer");
    }
    ctx;
    glVBuf;
    glIBuf;
    vqueue = [];
    iqueue = [];
    stride;
    maxVertices;
    maxIndices;
    vertexFormat;
    numDraws = 0;
    curPrimitive = null;
    curTex = null;
    curShader = null;
    curUniform = {};
    constructor(e, n, r, o) {
      let i = e.gl;
      this.vertexFormat = n, this.ctx = e, this.stride = n.reduce((l, u) => l + u.size, 0), this.maxVertices = r, this.maxIndices = o;
      let a = i.createBuffer();
      if (!a) throw new Error("Failed to create vertex buffer");
      this.glVBuf = a, e.pushArrayBuffer(this.glVBuf), i.bufferData(i.ARRAY_BUFFER, r * 4, i.DYNAMIC_DRAW), e.popArrayBuffer(), this.glIBuf = i.createBuffer(), e.pushElementArrayBuffer(this.glIBuf), i.bufferData(i.ELEMENT_ARRAY_BUFFER, o * 4, i.DYNAMIC_DRAW), e.popElementArrayBuffer();
    }
    push(e, n, r, o, i = null, a = {}) {
      (e !== this.curPrimitive || i !== this.curTex || o !== this.curShader || !jn(this.curUniform, a) || this.vqueue.length + n.length * this.stride > this.maxVertices || this.iqueue.length + r.length > this.maxIndices) && this.flush();
      let l = this.vqueue.length / this.stride;
      for (let u of n) this.vqueue.push(u);
      for (let u of r) this.iqueue.push(u + l);
      this.curPrimitive = e, this.curShader = o, this.curTex = i, this.curUniform = a;
    }
    flush() {
      if (!this.curPrimitive || !this.curShader || this.vqueue.length === 0 || this.iqueue.length === 0) return;
      let e = this.ctx.gl;
      this.ctx.pushArrayBuffer(this.glVBuf), e.bufferSubData(e.ARRAY_BUFFER, 0, new Float32Array(this.vqueue)), this.ctx.pushElementArrayBuffer(this.glIBuf), e.bufferSubData(e.ELEMENT_ARRAY_BUFFER, 0, new Uint16Array(this.iqueue)), this.ctx.setVertexFormat(this.vertexFormat), this.curShader.bind(), this.curShader.send(this.curUniform), this.curTex?.bind(), e.drawElements(this.curPrimitive, this.iqueue.length, e.UNSIGNED_SHORT, 0), this.curTex?.unbind(), this.curShader.unbind(), this.ctx.popArrayBuffer(), this.ctx.popElementArrayBuffer(), this.vqueue = [], this.iqueue = [], this.numDraws++;
    }
    free() {
      let e = this.ctx.gl;
      e.deleteBuffer(this.glVBuf), e.deleteBuffer(this.glIBuf);
    }
  };
  function St(t18) {
    let e = [], n = s((i) => {
      e.push(i), t18(i);
    }, "push"), r = s(() => {
      e.pop(), t18(o() ?? null);
    }, "pop"), o = s(() => e[e.length - 1], "cur");
    return [n, r, o];
  }
  s(St, "genStack");
  function ai(t18, e = {}) {
    let n = [];
    function r(G) {
      n.push(G);
    }
    s(r, "onDestroy");
    function o() {
      n.forEach((x) => x());
      let G = t18.getExtension("WEBGL_lose_context");
      G && G.loseContext();
    }
    s(o, "destroy");
    let i = null;
    function a(G) {
      if (jn(G, i)) return;
      i = G;
      let x = G.reduce((w, S) => w + S.size, 0);
      G.reduce((w, S, M) => (t18.vertexAttribPointer(M, S.size, t18.FLOAT, false, x * 4, w), t18.enableVertexAttribArray(M), w + S.size * 4), 0);
    }
    s(a, "setVertexFormat");
    let [l, u] = St((G) => t18.bindTexture(t18.TEXTURE_2D, G)), [m, d] = St((G) => t18.bindBuffer(t18.ARRAY_BUFFER, G)), [C, p] = St((G) => t18.bindBuffer(t18.ELEMENT_ARRAY_BUFFER, G)), [b, f] = St((G) => t18.bindFramebuffer(t18.FRAMEBUFFER, G)), [O, g] = St((G) => t18.bindRenderbuffer(t18.RENDERBUFFER, G)), [y, V] = St((G) => {
      if (!G) return;
      let { x, y: w, w: S, h: M } = G;
      t18.viewport(x, w, S, M);
    }), [A, D] = St((G) => t18.useProgram(G));
    return y({ x: 0, y: 0, w: t18.drawingBufferWidth, h: t18.drawingBufferHeight }), { gl: t18, opts: e, onDestroy: r, destroy: o, pushTexture2D: l, popTexture2D: u, pushArrayBuffer: m, popArrayBuffer: d, pushElementArrayBuffer: C, popElementArrayBuffer: p, pushFramebuffer: b, popFramebuffer: f, pushRenderbuffer: O, popRenderbuffer: g, pushViewport: y, popViewport: V, pushProgram: A, popProgram: D, setVertexFormat: a };
  }
  s(ai, "initGfx");
  var $r = {};
  function li(t18, e) {
    if (e.override) {
      Object.assign(t18, e);
      return;
    }
    e.pos && (t18.pos = t18.pos.add(e.pos)), e.scale && (t18.scale = t18.scale.scale(v(e.scale))), e.angle && (t18.angle += e.angle), e.color && t18.ch.length === 1 && (t18.color = t18.color.mult(e.color)), e.opacity != null && (t18.opacity *= e.opacity);
  }
  s(li, "applyCharTransform");
  function $n(t18) {
    let e = {}, n = "", r = [], o = String(t18), i = s((a) => {
      r.length > 0 && (e[n.length] = r.slice()), n += a;
    }, "emit");
    for (; o !== ""; ) {
      if (o[0] === "\\") {
        if (o.length === 1) throw new Error("Styled text error: \\ at end of string");
        i(o[1]), o = o.slice(2);
        continue;
      }
      if (o[0] === "[") {
        let a = /^\[(\/)?(\w+?)\]/.exec(o);
        if (!a) {
          i(o[0]), o = o.slice(1);
          continue;
        }
        let [l, u, m] = a;
        if (u !== void 0) {
          let d = r.pop();
          if (d !== m) throw d !== void 0 ? new Error(`Styled text error: mismatched tags. Expected [/${d}], got [/${m}]`) : new Error(`Styled text error: stray end tag [/${m}]`);
        } else r.push(m);
        o = o.slice(l.length);
        continue;
      }
      i(o[0]), o = o.slice(1);
    }
    if (r.length > 0) throw new Error(`Styled text error: unclosed tags ${r}`);
    return { charStyleMap: e, text: n };
  }
  s($n, "compileStyledText");
  function He(t18) {
    if (t18.text === void 0) throw new Error('formatText() requires property "text".');
    let e = Ur(t18.font);
    if (!t18.text || t18.text === "" || e instanceof le || !e) return { width: 0, height: 0, chars: [], opt: t18, renderedText: "" };
    let { charStyleMap: n, text: r } = $n(t18.text + ""), o = Os(r);
    if (e instanceof At || typeof e == "string") {
      let A = e instanceof At ? e.fontface.family : e, D = e instanceof At ? { outline: e.outline, filter: e.filter } : { outline: null, filter: Zt }, G = $r[A] ?? { font: { tex: new Pe(c.gfx.ggl, 2048, 2048, { filter: D.filter }), map: {}, size: 64 }, cursor: new E(0), maxHeight: 0, outline: D.outline };
      $r[A] || ($r[A] = G), e = G.font;
      for (let x of o) if (!G.font.map[x]) {
        let w = c.fontCacheC2d;
        if (!w) throw new Error("fontCacheC2d is not defined.");
        if (!c.fontCacheCanvas) throw new Error("fontCacheCanvas is not defined.");
        w.clearRect(0, 0, c.fontCacheCanvas.width, c.fontCacheCanvas.height), w.font = `${e.size}px ${A}`, w.textBaseline = "top", w.textAlign = "left", w.fillStyle = "#ffffff";
        let S = w.measureText(x), M = Math.ceil(S.width);
        if (!M) continue;
        let R = Math.ceil(Math.abs(S.actualBoundingBoxAscent)) + Math.ceil(Math.abs(S.actualBoundingBoxDescent));
        G.outline && G.outline.width && G.outline.color && (w.lineJoin = "round", w.lineWidth = G.outline.width * 2, w.strokeStyle = G.outline.color.toHex(), w.strokeText(x, G.outline.width, G.outline.width), M += G.outline.width * 2, R += G.outline.width * 3), w.fillText(x, G.outline?.width ?? 0, G.outline?.width ?? 0);
        let F = w.getImageData(0, 0, M, R);
        if (G.cursor.x + M > 2048 && (G.cursor.x = 0, G.cursor.y += G.maxHeight, G.maxHeight = 0, G.cursor.y > 2048)) throw new Error("Font atlas exceeds character limit");
        e.tex.update(F, G.cursor.x, G.cursor.y), e.map[x] = new z2(G.cursor.x, G.cursor.y, M, R), G.cursor.x += M + 1, G.maxHeight = Math.max(G.maxHeight, R);
      }
    }
    let i = t18.size || e.size, a = v(t18.scale ?? 1).scale(i / e.size), l = t18.lineSpacing ?? 0, u = t18.letterSpacing ?? 0, m = 0, d = 0, C = 0, p = [], b = [], f = 0, O = null, g = 0, y;
    for (; f < o.length; ) {
      let A = o[f];
      if (A === `
`) C += i + l, p.push({ width: m - u, chars: b }), O = null, g = 0, m = 0, b = [], y = void 0;
      else {
        let D = e.map[A];
        if (D) {
          let G = D.w * a.x;
          t18.width && m + G > t18.width && (C += i + l, O != null && (f -= b.length - O, A = o[f], D = e.map[A], G = D.w * a.x, b = b.slice(0, O - 1), m = g), O = null, g = 0, p.push({ width: m - u, chars: b }), m = y ?? 0, b = []), b.push({ tex: e.tex, width: D.w, height: D.h, quad: new z2(D.x / e.tex.width, D.y / e.tex.height, D.w / e.tex.width, D.h / e.tex.height), ch: A, pos: new E(m, C), opacity: t18.opacity ?? 1, color: t18.color ?? K.WHITE, scale: v(a), angle: 0 }), A === " " && (O = b.length, g = m), t18.indentAll && y === void 0 && /\S/.test(A) && (y = m), m += G, d = Math.max(d, m), m += u;
        }
      }
      f++;
    }
    p.push({ width: m - u, chars: b }), C += i, t18.width && (d = t18.width);
    let V = [];
    for (let A = 0; A < p.length; A++) {
      let D = (d - p[A].width) * Gs(t18.align ?? "left");
      for (let G of p[A].chars) {
        let x = e.map[G.ch], w = V.length + A;
        if (G.pos = G.pos.add(D, 0).add(x.w * a.x * 0.5, x.h * a.y * 0.5), t18.transform) {
          let S = typeof t18.transform == "function" ? t18.transform(w, G.ch) : t18.transform;
          S && li(G, S);
        }
        if (n[w]) {
          let S = n[w];
          for (let M of S) {
            let R = t18.styles?.[M], F = typeof R == "function" ? R(w, G.ch) : R;
            F && li(G, F);
          }
        }
        V.push(G);
      }
    }
    return { width: d, height: C, chars: V, opt: t18, renderedText: r };
  }
  s(He, "formatText");
  function it(t18) {
    if (t18.width === void 0 || t18.height === void 0) throw new Error('drawUVQuad() requires property "width" and "height".');
    if (t18.width <= 0 || t18.height <= 0) return;
    let e = t18.width, n = t18.height, o = Ne(t18.anchor || mt).scale(new E(e, n).scale(-0.5)), i = t18.quad || new z2(0, 0, 1, 1), a = t18.color || I(255, 255, 255), l = t18.opacity ?? 1, u = t18.tex ? 0.1 / t18.tex.width : 0, m = t18.tex ? 0.1 / t18.tex.height : 0, d = i.x + u, C = i.y + m, p = i.w - u * 2, b = i.h - m * 2;
    be(), Q(t18.pos), $e(t18.angle), rt(t18.scale), Q(o), je([{ pos: new E(-e / 2, n / 2), uv: new E(t18.flipX ? d + p : d, t18.flipY ? C : C + b), color: a, opacity: l }, { pos: new E(-e / 2, -n / 2), uv: new E(t18.flipX ? d + p : d, t18.flipY ? C + b : C), color: a, opacity: l }, { pos: new E(e / 2, -n / 2), uv: new E(t18.flipX ? d : d + p, t18.flipY ? C + b : C), color: a, opacity: l }, { pos: new E(e / 2, n / 2), uv: new E(t18.flipX ? d : d + p, t18.flipY ? C : C + b), color: a, opacity: l }], [0, 1, 3, 1, 2, 3], t18.fixed, t18.tex, t18.shader, t18.uniform ?? void 0), pe();
  }
  s(it, "drawUVQuad");
  function qe(t18) {
    be(), Q(t18.opt.pos), $e(t18.opt.angle), Q(Ne(t18.opt.anchor ?? "topleft").add(1, 1).scale(t18.width, t18.height).scale(-0.5)), t18.chars.forEach((e) => {
      it({ tex: e.tex, width: e.width, height: e.height, pos: e.pos, scale: e.scale, angle: e.angle, color: e.color, opacity: e.opacity, quad: e.quad, anchor: "center", uniform: t18.opt.uniform, shader: t18.opt.shader, fixed: t18.opt.fixed });
    }), pe();
  }
  s(qe, "drawFormattedText");
  function ve(t18) {
    if (t18.width === void 0 || t18.height === void 0) throw new Error('drawRect() requires property "width" and "height".');
    if (t18.width <= 0 || t18.height <= 0) return;
    let e = t18.width, n = t18.height, o = Ne(t18.anchor || mt).add(1, 1).scale(new E(e, n).scale(-0.5)), i = [new E(0, 0), new E(e, 0), new E(e, n), new E(0, n)];
    if (t18.radius) {
      let a = Math.min(e, n) / 2, l = Array.isArray(t18.radius) ? t18.radius.map((u) => Math.min(a, u)) : new Array(4).fill(Math.min(a, t18.radius));
      i = [new E(l[0], 0), ...l[1] ? Ct(new E(e - l[1], l[1]), l[1], l[1], 270, 360) : [v(e, 0)], ...l[2] ? Ct(new E(e - l[2], n - l[2]), l[2], l[2], 0, 90) : [v(e, n)], ...l[3] ? Ct(new E(l[3], n - l[3]), l[3], l[3], 90, 180) : [v(0, n)], ...l[0] ? Ct(new E(l[0], l[0]), l[0], l[0], 180, 270) : []];
    }
    Ge(Object.assign({}, t18, { offset: o, pts: i, ...t18.gradient ? { colors: t18.horizontal ? [t18.gradient[0], t18.gradient[1], t18.gradient[1], t18.gradient[0]] : [t18.gradient[0], t18.gradient[0], t18.gradient[1], t18.gradient[1]] } : {} }));
  }
  s(ve, "drawRect");
  function ze(t18) {
    Oe();
    let e = c.gfx.width, n = c.gfx.height;
    c.gfx.width = c.gfx.viewport.width, c.gfx.height = c.gfx.viewport.height, t18(), Oe(), c.gfx.width = e, c.gfx.height = n;
  }
  s(ze, "drawUnscaled");
  function Xr(t18, e) {
    ze(() => {
      let n = v(8);
      be(), Q(t18);
      let r = He({ text: e, font: yt, size: 16, pos: n, color: I(255, 255, 255), fixed: true }), o = r.width + n.x * 2, i = r.height + n.x * 2;
      t18.x + o >= ae() && Q(v(-o, 0)), t18.y + i >= ce() && Q(v(0, -i)), ve({ width: o, height: i, color: I(0, 0, 0), radius: 4, opacity: 0.8, fixed: true }), qe(r), pe();
    });
  }
  s(Xr, "drawInspectText");
  function Xn(t18) {
    if (!t18.p1 || !t18.p2 || !t18.p3) throw new Error('drawTriangle() requires properties "p1", "p2" and "p3".');
    return Ge(Object.assign({}, t18, { pts: [t18.p1, t18.p2, t18.p3] }));
  }
  s(Xn, "drawTriangle");
  function pi() {
    if (c.debug.inspect) {
      let t18 = null;
      for (let e of c.game.root.get("*", { recursive: true })) if (e.c("area") && e.isHovering()) {
        t18 = e;
        break;
      }
      if (c.game.root.drawInspect(), t18) {
        let e = [], n = t18.inspect();
        for (let r in n) n[r] ? e.push(`${n[r]}`) : e.push(`${r}`);
        Xr(Is(Nn()), e.join(`
`));
      }
      Xr(v(8), `FPS: ${c.debug.fps()}`);
    }
    c.debug.paused && ze(() => {
      be(), Q(ae(), 0), Q(-8, 8);
      let t18 = 32;
      ve({ width: t18, height: t18, anchor: "topright", color: I(0, 0, 0), opacity: 0.8, radius: 4, fixed: true });
      for (let e = 1; e <= 2; e++) ve({ width: 4, height: t18 * 0.6, anchor: "center", pos: v(-t18 / 3 * e, t18 * 0.5), color: I(255, 255, 255), radius: 2, fixed: true });
      pe();
    }), c.debug.timeScale !== 1 && ze(() => {
      be(), Q(ae(), ce()), Q(-8, -8);
      let t18 = 8, e = He({ text: c.debug.timeScale.toFixed(1), font: yt, size: 16, color: I(255, 255, 255), pos: v(-t18), anchor: "botright", fixed: true });
      ve({ width: e.width + t18 * 2 + t18 * 4, height: e.height + t18 * 2, anchor: "botright", color: I(0, 0, 0), opacity: 0.8, radius: 4, fixed: true });
      for (let n = 0; n < 2; n++) {
        let r = c.debug.timeScale < 1;
        Xn({ p1: v(-e.width - t18 * (r ? 2 : 3.5), -t18), p2: v(-e.width - t18 * (r ? 2 : 3.5), -t18 - e.height), p3: v(-e.width - t18 * (r ? 3.5 : 2), -t18 - e.height / 2), pos: v(-n * t18 * 1 + (r ? -t18 * 0.5 : 0), 0), color: I(255, 255, 255), fixed: true });
      }
      qe(e), pe();
    }), c.debug.curRecording && ze(() => {
      be(), Q(0, ce()), Q(24, -24), Ue({ radius: 12, color: I(255, 0, 0), opacity: Sn(0, 1, c.app.time() * 4), fixed: true }), pe();
    }), c.debug.showLog && c.game.logs.length > 0 && ze(() => {
      be(), Q(0, ce()), Q(8, -8);
      let t18 = 8, e = [];
      for (let r of c.game.logs) {
        let o = "", i = r.msg instanceof Error ? "error" : "info";
        o += `[time]${r.time.toFixed(2)}[/time]`, o += " ", o += `[${i}]${Qr(r.msg)}[/${i}]`, e.push(o);
      }
      c.game.logs = c.game.logs.filter((r) => c.app.time() - r.time < (c.globalOpt.logTime || 4));
      let n = He({ text: e.join(`
`), font: yt, pos: v(t18, -t18), anchor: "botleft", size: 16, width: ae() * 0.6, lineSpacing: t18 / 2, fixed: true, styles: { time: { color: I(127, 127, 127) }, info: { color: I(255, 255, 255) }, error: { color: I(255, 0, 127) } } });
      ve({ width: n.width + t18 * 2, height: n.height + t18 * 2, anchor: "botleft", color: I(0, 0, 0), radius: 4, opacity: 0.8, fixed: true }), qe(n), pe();
    });
  }
  s(pi, "drawDebug");
  function Qr(t18, e = false, n = /* @__PURE__ */ new Set()) {
    if (n.has(t18)) return "<recursive>";
    var r = "", o;
    return e && typeof t18 == "string" && (t18 = JSON.stringify(t18)), Array.isArray(t18) && (r = ["[", t18.map((i) => Qr(i, true, n.union(/* @__PURE__ */ new Set([t18])))).join(", "), "]"].join(""), t18 = r), t18 === null ? "null" : (typeof t18 == "object" && t18.toString === Object.prototype.toString && (t18.constructor !== Object && (r += t18.constructor.name + " "), r += ["{", (o = Object.getOwnPropertyNames(t18).map((i) => `${/^\w+$/.test(i) ? i : JSON.stringify(i)}: ${Qr(t18[i], true, n.union(/* @__PURE__ */ new Set([t18])))}`).join(", ")) ? ` ${o} ` : "", "}"].join(""), t18 = r), String(t18).replaceAll(/(?<!\\)\[/g, "\\["));
  }
  s(Qr, "prettyDebug");
  function di() {
    let t18 = c.game.cam, e = E.fromAngle(ge(0, 360)).scale(t18.shake);
    t18.shake = fe(t18.shake, 0, 5 * te()), t18.transform = new he().translate(wt()).scale(t18.scale).rotate(t18.angle).translate((t18.pos ?? wt()).scale(-1).add(e)), c.game.root.draw(), Oe();
  }
  s(di, "drawFrame");
  function fi() {
    let t18 = Fe();
    c.game.events.numListeners("loading") > 0 ? c.game.events.trigger("loading", t18) : ze(() => {
      let e = ae() / 2, n = 24, r = v(ae() / 2, ce() / 2).sub(v(e / 2, n / 2));
      ve({ pos: v(0), width: ae(), height: ce(), color: I(0, 0, 0) }), ve({ pos: r, width: e, height: n, fill: false, outline: { width: 4 } }), ve({ pos: r, width: e * t18, height: n });
    });
  }
  s(fi, "drawLoadScreen");
  function Qn(t18, e, n) {
    let r = c.gfx.ggl.gl;
    Oe(), r.clear(r.STENCIL_BUFFER_BIT), r.enable(r.STENCIL_TEST), r.stencilFunc(r.NEVER, 1, 255), r.stencilOp(r.REPLACE, r.REPLACE, r.REPLACE), e(), Oe(), r.stencilFunc(n, 1, 255), r.stencilOp(r.KEEP, r.KEEP, r.KEEP), t18(), Oe(), r.disable(r.STENCIL_TEST);
  }
  s(Qn, "drawStenciled");
  function hi(t18, e) {
    let n = c.gfx.ggl.gl;
    Qn(t18, e, n.EQUAL);
  }
  s(hi, "drawMasked");
  function Vt(t18) {
    if (!t18.tex) throw new Error('drawTexture() requires property "tex".');
    let e = t18.quad ?? new z2(0, 0, 1, 1), n = t18.tex.width * e.w, r = t18.tex.height * e.h, o = new E(1);
    if (t18.tiled) {
      let i = Ne(t18.anchor || mt), a = (t18.pos?.x || 0) - (i.x + 1) * 0.5 * (t18.width || n), l = (t18.pos?.y || 0) - (i.y + 1) * 0.5 * (t18.height || r), u = (t18.width || n) / n, m = (t18.height || r) / r, d = Math.floor(u), C = Math.floor(m), p = u - d, b = m - C, f = (d + p ? 1 : 0) * (C + b ? 1 : 0), O = new Array(f * 6), g = new Array(f * 4), y = 0, V = s((A, D, G, x, w) => {
        O[y * 6 + 0] = y * 4 + 0, O[y * 6 + 1] = y * 4 + 1, O[y * 6 + 2] = y * 4 + 3, O[y * 6 + 3] = y * 4 + 1, O[y * 6 + 4] = y * 4 + 2, O[y * 6 + 5] = y * 4 + 3, g[y * 4 + 0] = { pos: new E(A - i.x, D - i.y), uv: new E(w.x, w.y), color: t18.color || K.WHITE, opacity: t18.opacity || 1 }, g[y * 4 + 1] = { pos: new E(A + G - i.x, D - i.y), uv: new E(w.x + w.w, w.y), color: t18.color || K.WHITE, opacity: t18.opacity || 1 }, g[y * 4 + 2] = { pos: new E(A + G - i.x, D + x - i.y), uv: new E(w.x + w.w, w.y + w.h), color: t18.color || K.WHITE, opacity: t18.opacity || 1 }, g[y * 4 + 3] = { pos: new E(A - i.x, D + x - i.y), uv: new E(w.x, w.y + w.h), color: t18.color || K.WHITE, opacity: t18.opacity || 1 }, y++;
      }, "addQuad");
      for (let A = 0; A < C; A++) {
        for (let D = 0; D < d; D++) V(D * n, A * r, n, r, e);
        p && V(d * n, A * r, n * p, r, new z2(e.x, e.y, e.w * p, e.h));
      }
      if (b) {
        for (let A = 0; A < d; A++) V(A * n, C * r, n, r * b, new z2(e.x, e.y, e.w, e.h * b));
        p && V(d * n, C * r, n * p, r * b, new z2(e.x, e.y, e.w * p, e.h * b));
      }
      je(g, O, t18.fixed, t18.tex, t18.shader, t18.uniform ?? void 0);
    } else t18.width && t18.height ? (o.x = t18.width / n, o.y = t18.height / r) : t18.width ? (o.x = t18.width / n, o.y = o.x) : t18.height && (o.y = t18.height / r, o.x = o.y), it(Object.assign({}, t18, { scale: o.scale(t18.scale || new E(1)), tex: t18.tex, quad: e, width: n, height: r }));
  }
  s(Vt, "drawTexture");
  function gi(t18) {
    if (!t18.sprite) throw new Error('drawSprite() requires property "sprite"');
    let e = It(t18.sprite);
    if (!e || !e.data) return;
    let n = e.data.frames[t18.frame ?? 0];
    if (!n) throw new Error(`Frame not found: ${t18.frame ?? 0}`);
    Vt(Object.assign({}, t18, { tex: e.data.tex, quad: n.scale(t18.quad ?? new z2(0, 0, 1, 1)) }));
  }
  s(gi, "drawSprite");
  function bi(t18, e) {
    let n = c.gfx.ggl.gl;
    Qn(t18, e, n.NOTEQUAL);
  }
  s(bi, "drawSubtracted");
  function Jr(t18) {
    qe(He(t18));
  }
  s(Jr, "drawText");
  var yi = s((t18, e) => {
    let n = qn(e, tn, nn), r = t18.pixelDensity ?? 1, o = t18.scale ?? 1, { gl: i } = e, a = Pe.fromImage(e, new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)), l = t18.width && t18.height ? new st(e, t18.width * r * o, t18.height * r * o) : new st(e, i.drawingBufferWidth, i.drawingBufferHeight), u = null, m = 1;
    t18.background && (typeof t18.background == "string" ? u = I(t18.background) : (u = I(...t18.background), m = t18.background[3] ?? 1), i.clearColor(u.r / 255, u.g / 255, u.b / 255, m ?? 1)), i.enable(i.BLEND), i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
    let d = new Wn(e, en, ss, is), C = Pe.fromImage(e, new ImageData(new Uint8ClampedArray([128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255, 128, 128, 128, 255]), 2, 2), { wrap: "repeat", filter: "nearest" });
    return { lastDrawCalls: 0, ggl: e, defShader: n, defTex: a, frameBuffer: l, postShader: null, postShaderUniform: null, renderer: d, transform: new he(), transformStack: [], bgTex: C, bgColor: u, bgAlpha: m, width: t18.width ?? i.drawingBufferWidth / r / o, height: t18.height ?? i.drawingBufferHeight / r / o, viewport: { x: 0, y: 0, width: i.drawingBufferWidth, height: i.drawingBufferHeight }, fixed: false };
  }, "initAppGfx");
  function Jn() {
    let t18 = c.pixelDensity, e = c.gfx.ggl.gl.drawingBufferWidth / t18, n = c.gfx.ggl.gl.drawingBufferHeight / t18;
    if (c.globalOpt.letterbox) {
      if (!c.globalOpt.width || !c.globalOpt.height) throw new Error("Letterboxing requires width and height defined.");
      let r = e / n, o = c.globalOpt.width / c.globalOpt.height;
      if (r > o) {
        let i = n * o, a = (e - i) / 2;
        c.gfx.viewport = { x: a, y: 0, width: i, height: n };
      } else {
        let i = e / o, a = (n - i) / 2;
        c.gfx.viewport = { x: 0, y: a, width: e, height: i };
      }
      return;
    }
    if (c.globalOpt.stretch && (!c.globalOpt.width || !c.globalOpt.height)) throw new Error("Stretching requires width and height defined.");
    c.gfx.viewport = { x: 0, y: 0, width: e, height: n };
  }
  s(Jn, "updateViewport");
  function at(t18) {
    return t18.fixed ? true : t18.parent ? at(t18.parent) : false;
  }
  s(at, "isFixed");
  function Ke(t18) {
    return { color: t18.color, opacity: t18.opacity, anchor: t18.anchor, outline: t18.outline, shader: t18.shader, uniform: t18.uniform };
  }
  s(Ke, "getRenderProps");
  function xi(t18, e = {}) {
    return { id: "circle", radius: t18, draw() {
      Ue(Object.assign(Ke(this), { radius: this.radius, fill: e.fill }));
    }, renderArea() {
      return new $(new E(this.anchor ? 0 : -this.radius), this.radius * 2, this.radius * 2);
    }, inspect() {
      return `radius: ${Math.ceil(this.radius)}`;
    } };
  }
  s(xi, "circle");
  function Zn(...t18) {
    return { id: "color", color: I(...t18), inspect() {
      return `color: ${this.color.toString()}`;
    } };
  }
  s(Zn, "color");
  function vi(t18) {
    return { add() {
      this.canvas = t18;
    } };
  }
  s(vi, "drawon");
  function Ci(t18 = 1) {
    let e, n = 0, r = false;
    return { require: ["opacity"], add() {
      e = this.opacity, this.opacity = 0;
    }, update() {
      r || (n += te(), this.opacity = Ve(n, 0, t18, 0, e), n >= t18 && (this.opacity = e, r = true));
    } };
  }
  s(Ci, "fadeIn");
  function wi(t18 = "intersect") {
    return { id: "mask", mask: t18 };
  }
  s(wi, "mask");
  function er(t18) {
    return { id: "opacity", opacity: t18 ?? 1, fadeIn(e = 1, n = c.k.easings.linear) {
      return c.game.root.tween(0, this.opacity, e, (r) => this.opacity = r, n);
    }, fadeOut(e = 1, n = c.k.easings.linear) {
      return c.game.root.tween(this.opacity, 0, e, (r) => this.opacity = r, n);
    }, inspect() {
      return `opacity: ${on(this.opacity, 1)}`;
    } };
  }
  s(er, "opacity");
  function Oi(t18 = 1, e = I(0, 0, 0), n = 1, r = "miter", o = 10, i = "butt") {
    return { id: "outline", outline: { width: t18, color: e, opacity: n, join: r, miterLimit: o, cap: i }, inspect() {
      return `outline: ${this.outline.width}px, ${this.outline.color}`;
    } };
  }
  s(Oi, "outline");
  var Zr = class {
    static {
      s(this, "Particle");
    }
    pos = v(0);
    vel = v(0);
    acc = v(0);
    angle = 0;
    angularVelocity = 0;
    damping = 0;
    t;
    lt = null;
    gc;
    constructor() {
      this.t = 0, this.gc = true;
    }
    get progress() {
      return this.lt ? this.t / this.lt : this.t;
    }
  };
  function Ei(t18, e) {
    let n = e.lifetime, r = [], o = t18.colors || [K.WHITE], i = t18.opacities || [1], a = t18.quads || [new z2(0, 0, 1, 1)], l = t18.scales || [1], u = t18.lifeTime, m = e.direction, d = e.spread, C = t18.speed || [0, 0], p = t18.angle || [0, 0], b = t18.angularVelocity || [0, 0], f = t18.acceleration || [v(0), v(0)], O = t18.damping || [0, 0], g = [], y = new Array(t18.max), V = 0, A = 0;
    for (let x = 0; x < t18.max; x++) {
      g[x * 6 + 0] = x * 4 + 0, g[x * 6 + 1] = x * 4 + 1, g[x * 6 + 2] = x * 4 + 3, g[x * 6 + 3] = x * 4 + 1, g[x * 6 + 4] = x * 4 + 2, g[x * 6 + 5] = x * 4 + 3;
      for (let w = 0; w < 4; w++) y[x * 4 + w] = { pos: new E(0, 0), uv: new E(0, 0), color: I(255, 255, 255), opacity: 1 };
      r[x] = new Zr();
    }
    let D = new oe();
    function G(x = 0) {
      for (; x < t18.max; ) {
        if (r[x].gc) return x;
        x++;
      }
      return null;
    }
    return s(G, "nextFree"), { id: "particles", emit(x) {
      let w = 0;
      for (let S = 0; S < x; S++) {
        if (w = G(w), w == null) return;
        let M = ge(m - d, m + d), R = E.fromAngle(M).scale(ge(C[0], C[1])), F = ge(p[0], p[1]), j = ge(b[0], b[1]), H = v(ge(f[0].x, f[1].x), ge(f[0].y, f[1].y)), q = ge(O[0], O[1]), W = u ? ge(u[0], u[1]) : null, N = e.shape ? e.shape.random() : v(), k = r[w];
        k.lt = W, k.pos = N, k.vel = R, k.acc = H, k.angle = F, k.angularVelocity = j, k.damping = q, k.angularVelocity = j, k.gc = false;
      }
      V += x;
    }, update() {
      if (n !== void 0 && n <= 0) return;
      let x = te();
      for (let w of r) if (!w.gc) {
        if (w.t += x, w.lt && w.t >= w.lt) {
          w.gc = true, V--;
          continue;
        }
        w.vel = w.vel.add(w.acc.scale(x)).scale(1 - w.damping * x), w.pos = w.pos.add(w.vel.scale(x)), w.angle += w.angularVelocity * x;
      }
      for (n !== void 0 && (n -= x, n <= 0 && D.trigger()), A += x; V < t18.max && e.rate && A > e.rate; ) this.emit(1), V++, A -= e.rate;
    }, draw() {
      if (!(n !== void 0 && n <= 0)) {
        for (let x = 0; x < r.length; x++) {
          let w = r[x];
          if (w.gc) continue;
          let S = w.progress, M = Math.floor(w.progress * o.length), R = M < o.length - 1 ? fe(o[M], o[M + 1], Ve(S, M / o.length, (M + 1) / o.length, 0, 1)) : o[M], F = Math.floor(w.progress * i.length), j = F < i.length - 1 ? fe(i[F], i[F + 1], Ve(S, F / i.length, (F + 1) / i.length, 0, 1)) : i[F], H = Math.floor(w.progress * a.length), q = a[H], W = Math.floor(w.progress * l.length), N = l[W], k = Math.cos(w.angle * Math.PI / 180), Z = Math.sin(w.angle * Math.PI / 180), X = (t18.texture ? t18.texture.width : 10) * q.w / 2, ee = (t18.texture ? t18.texture.height : 10) * q.h / 2, Ee = x * 4, _ = y[Ee];
          _.pos.x = w.pos.x + -X * N * k - -ee * N * Z, _.pos.y = w.pos.y + -X * N * Z + -ee * N * k, _.uv.x = q.x, _.uv.y = q.y, _.color.r = R.r, _.color.g = R.g, _.color.b = R.b, _.opacity = j, _ = y[Ee + 1], _.pos.x = w.pos.x + X * N * k - -ee * N * Z, _.pos.y = w.pos.y + X * N * Z + -ee * N * k, _.uv.x = q.x + q.w, _.uv.y = q.y, _.color.r = R.r, _.color.g = R.g, _.color.b = R.b, _.opacity = j, _ = y[Ee + 2], _.pos.x = w.pos.x + X * N * k - ee * N * Z, _.pos.y = w.pos.y + X * N * Z + ee * N * k, _.uv.x = q.x + q.w, _.uv.y = q.y + q.h, _.color.r = R.r, _.color.g = R.g, _.color.b = R.b, _.opacity = j, _ = y[Ee + 3], _.pos.x = w.pos.x + -X * N * k - ee * N * Z, _.pos.y = w.pos.y + -X * N * Z + ee * N * k, _.uv.x = q.x, _.uv.y = q.y + q.h, _.color.r = R.r, _.color.g = R.g, _.color.b = R.b, _.opacity = j;
        }
        je(y, g, this.fixed, t18.texture, this.shader, this.uniform);
      }
    }, onEnd(x) {
      return D.add(x);
    }, inspect() {
      return `count: ${V}/${t18.max}`;
    } };
  }
  s(Ei, "particles");
  function Ti(t18, e = {}) {
    if (t18.length < 3) throw new Error(`Polygon's need more than two points, ${t18.length} points provided`);
    return { id: "polygon", pts: t18, colors: e.colors, uv: e.uv, tex: e.tex, radius: e.radius, draw() {
      Ge(Object.assign(Ke(this), { pts: this.pts, colors: this.colors, uv: this.uv, tex: this.tex, radius: this.radius, fill: e.fill, triangulate: e.triangulate }));
    }, renderArea() {
      return new ye(this.pts);
    }, inspect() {
      return `polygon: ${this.pts.map((n) => `[${n.x},${n.y}]`).join(",")}`;
    } };
  }
  s(Ti, "polygon");
  function tr(t18, e, n) {
    let r;
    return c.game.root.get("area").forEach((i) => {
      if (n && n.some((u) => i.is(u))) return;
      let l = i.worldArea().raycast(t18, e);
      l && (r ? l.fraction < r.fraction && (r = l, r.object = i) : (r = l, r.object = i));
    }), r;
  }
  s(tr, "raycast");
  function nr(t18, e, n = {}) {
    return { id: "rect", width: t18, height: e, radius: n.radius || 0, draw() {
      ve(Object.assign(Ke(this), { width: this.width, height: this.height, radius: this.radius, fill: n.fill }));
    }, renderArea() {
      return new $(v(0), this.width, this.height);
    }, inspect() {
      return `rect: (${Math.ceil(this.width)}w, ${Math.ceil(this.height)}h)`;
    } };
  }
  s(nr, "rect");
  function Ai(t18, e) {
    return { id: "shader", shader: t18, ...typeof e == "function" ? { uniform: e(), update() {
      this.uniform = e();
    } } : { uniform: e }, inspect() {
      return `shader: ${t18}`;
    } };
  }
  s(Ai, "shader");
  function Si(t18, e) {
    if (!e.tileWidth || !e.tileHeight) throw new Error("Must provide tileWidth and tileHeight.");
    let n = c.game.root.add([Pt(e.pos ?? v(0))]), r = t18.length, o = 0, i = null, a = null, l = null, u = null, m = s((x) => x.x + x.y * o, "tile2Hash"), d = s((x) => v(Math.floor(x % o), Math.floor(x / o)), "hash2Tile"), C = s(() => {
      i = [];
      for (let x of n.children) p(x);
    }, "createSpatialMap"), p = s((x) => {
      let w = m(x.tilePos);
      i[w] ? i[w].push(x) : i[w] = [x];
    }, "insertIntoSpatialMap"), b = s((x) => {
      let w = m(x.tilePos);
      if (i[w]) {
        let S = i[w].indexOf(x);
        S >= 0 && i[w].splice(S, 1);
      }
    }, "removeFromSpatialMap"), f = s(() => {
      let x = false;
      for (let w of n.children) {
        let S = n.pos2Tile(w.pos);
        (w.tilePos.x != S.x || w.tilePos.y != S.y) && (x = true, b(w), w.tilePos.x = S.x, w.tilePos.y = S.y, p(w));
      }
      x && n.trigger("spatialMapChanged");
    }, "updateSpatialMap"), O = s(() => {
      let x = n.getSpatialMap(), w = n.numRows() * n.numColumns();
      a ? a.length = w : a = new Array(w), a.fill(1, 0, w);
      for (let S = 0; S < x.length; S++) {
        let M = x[S];
        if (M) {
          let R = 0;
          for (let F of M) if (F.isObstacle) {
            R = 1 / 0;
            break;
          } else R += F.cost;
          a[S] = R || 1;
        }
      }
    }, "createCostMap"), g = s(() => {
      let x = n.getSpatialMap(), w = n.numRows() * n.numColumns();
      l ? l.length = w : l = new Array(w), l.fill(15, 0, w);
      for (let S = 0; S < x.length; S++) {
        let M = x[S];
        if (M) {
          let R = M.length, F = 15;
          for (let j = 0; j < R; j++) F |= M[j].edgeMask;
          l[S] = F;
        }
      }
    }, "createEdgeMap"), y = s(() => {
      let x = n.numRows() * n.numColumns(), w = s((M, R) => {
        let F = [];
        for (F.push(M); F.length > 0; ) {
          let j = F.pop();
          D(j).forEach((H) => {
            u[H] < 0 && (u[H] = R, F.push(H));
          });
        }
      }, "traverse");
      u ? u.length = x : u = new Array(x), u.fill(-1, 0, x);
      let S = 0;
      for (let M = 0; M < a.length; M++) {
        if (u[M] >= 0) {
          S++;
          continue;
        }
        w(M, S), S++;
      }
    }, "createConnectivityMap"), V = s((x, w) => a[w], "getCost"), A = s((x, w) => {
      let S = d(x), M = d(w);
      return S.dist(M);
    }, "getHeuristic"), D = s((x, w) => {
      let S = [], M = Math.floor(x % o), R = M > 0 && l[x] & 1 && a[x - 1] !== 1 / 0, F = x >= o && l[x] & 2 && a[x - o] !== 1 / 0, j = M < o - 1 && l[x] & 4 && a[x + 1] !== 1 / 0, H = x < o * r - o - 1 && l[x] & 8 && a[x + o] !== 1 / 0;
      return w ? (R && (F && S.push(x - o - 1), S.push(x - 1), H && S.push(x + o - 1)), F && S.push(x - o), j && (F && S.push(x - o + 1), S.push(x + 1), H && S.push(x + o + 1)), H && S.push(x + o)) : (R && S.push(x - 1), F && S.push(x - o), j && S.push(x + 1), H && S.push(x + o)), S;
    }, "getNeighbours"), G = { id: "level", tileWidth() {
      return e.tileWidth;
    }, tileHeight() {
      return e.tileHeight;
    }, spawn(x, ...w) {
      let S = v(...w), M = (() => {
        if (typeof x == "string") {
          if (e.tiles[x]) {
            if (typeof e.tiles[x] != "function") throw new Error("Level symbol def must be a function returning a component list");
            return e.tiles[x](S);
          } else if (e.wildcardTile) return e.wildcardTile(x, S);
        } else {
          if (Array.isArray(x)) return x;
          throw new Error("Expected a symbol or a component list");
        }
      })();
      if (!M) return null;
      let R = false, F = false;
      for (let H of M) H.id === "tile" && (F = true), H.id === "pos" && (R = true);
      R || M.push(Pt(this.tile2Pos(S))), F || M.push(rr());
      let j = n.add(M);
      return R && (j.tilePosOffset = j.pos.clone()), j.tilePos = S, j.transform = dt(j), i && (p(j), this.trigger("spatialMapChanged"), this.trigger("navigationMapInvalid")), j;
    }, numColumns() {
      return o;
    }, numRows() {
      return r;
    }, levelWidth() {
      return o * this.tileWidth();
    }, levelHeight() {
      return r * this.tileHeight();
    }, tile2Pos(...x) {
      return v(...x).scale(this.tileWidth(), this.tileHeight());
    }, pos2Tile(...x) {
      let w = v(...x);
      return v(Math.floor(w.x / this.tileWidth()), Math.floor(w.y / this.tileHeight()));
    }, getSpatialMap() {
      return i || C(), i;
    }, removeFromSpatialMap: b, insertIntoSpatialMap: p, onSpatialMapChanged(x) {
      return this.on("spatialMapChanged", x);
    }, onNavigationMapInvalid(x) {
      return this.on("navigationMapInvalid", x);
    }, getAt(x) {
      i || C();
      let w = m(x);
      return i[w] || [];
    }, raycast(x, w) {
      let S = this.toWorld(x), M = this.toWorld(x.add(w)).sub(S), R = 1 / this.tileWidth(), F = x.scale(R), j = Io(F, w, (H) => {
        let q = this.getAt(H);
        if (q.some((N) => N.isObstacle)) return true;
        let W = null;
        for (let N of q) if (N.has("area")) {
          let Z = N.worldArea().raycast(S, M);
          Z && (W ? Z.fraction < W.fraction && (W = Z, W.object = N) : (W = Z, W.object = N));
        }
        return W && (W.point = this.fromWorld(W.point).scale(R)), W || false;
      }, 64);
      return j && (j.point = j.point.scale(this.tileWidth())), j;
    }, update() {
      i && f();
    }, invalidateNavigationMap() {
      a = null, l = null, u = null;
    }, onNavigationMapChanged(x) {
      return this.on("navigationMapChanged", x);
    }, getTilePath(x, w, S = {}) {
      if (a || O(), l || g(), u || y(), x.x < 0 || x.x >= o || x.y < 0 || x.y >= r || w.x < 0 || w.x >= o || w.y < 0 || w.y >= r) return null;
      let M = m(x), R = m(w);
      if (a[R] === 1 / 0) return null;
      if (M === R) return [];
      if (u[M] != -1 && u[M] !== u[R]) return null;
      let F = new Kt((k, Z) => k.cost < Z.cost);
      F.insert({ cost: 0, node: M });
      let j = /* @__PURE__ */ new Map();
      j.set(M, M);
      let H = /* @__PURE__ */ new Map();
      for (H.set(M, 0); F.length !== 0; ) {
        let k = F.remove()?.node;
        if (k === R) break;
        let Z = D(k, S.allowDiagonals);
        for (let X of Z) {
          let ee = (H.get(k) || 0) + V(k, X) + A(X, R);
          (!H.has(X) || ee < H.get(X)) && (H.set(X, ee), F.insert({ cost: ee, node: X }), j.set(X, k));
        }
      }
      let q = [], W = R, N = d(W);
      for (q.push(N); W !== M; ) {
        let k = j.get(W);
        if (k === void 0) throw new Error("Bug in pathfinding algorithm");
        W = k;
        let Z = d(W);
        q.push(Z);
      }
      return q.reverse();
    }, getPath(x, w, S = {}) {
      let M = this.tileWidth(), R = this.tileHeight(), F = this.getTilePath(this.pos2Tile(x), this.pos2Tile(w), S);
      return F ? [x, ...F.slice(1, -1).map((j) => j.scale(M, R).add(M / 2, R / 2)), w] : null;
    } };
    return n.use(G), n.onNavigationMapInvalid(() => {
      n.invalidateNavigationMap(), n.trigger("navigationMapChanged");
    }), t18.forEach((x, w) => {
      let S = x.split("");
      o = Math.max(S.length, o), S.forEach((M, R) => {
        n.spawn(M, v(R, w));
      });
    }), n;
  }
  s(Si, "addLevel");
  function Me(t18, e, n) {
    return c.game.objEvents.registers[t18] || (c.game.objEvents.registers[t18] = new rn()), c.game.objEvents.on(t18, (r, ...o) => {
      r.is(e) && n(r, ...o);
    });
  }
  s(Me, "on");
  var Vi = s((t18, e, ...n) => {
    for (let r of c.game.root.children) r.is(e) && r.trigger(t18);
  }, "trigger");
  var Pi = re((t18) => {
    let e = c.game.root.add([{ fixedUpdate: t18 }]);
    return { get paused() {
      return e.paused;
    }, set paused(n) {
      e.paused = n;
    }, cancel: s(() => e.destroy(), "cancel") };
  }, (t18, e) => Me("fixedUpdate", t18, e));
  var Gi = re((t18) => {
    let e = c.game.root.add([{ update: t18 }]);
    return { get paused() {
      return e.paused;
    }, set paused(n) {
      e.paused = n;
    }, cancel: s(() => e.destroy(), "cancel") };
  }, (t18, e) => Me("update", t18, e));
  var Mi = re((t18) => {
    let e = c.game.root.add([{ draw: t18 }]);
    return { get paused() {
      return e.hidden;
    }, set paused(n) {
      e.hidden = n;
    }, cancel: s(() => e.destroy(), "cancel") };
  }, (t18, e) => Me("draw", t18, e));
  var eo = re((t18) => c.game.events.on("add", t18), (t18, e) => Me("add", t18, e));
  var Ri = re((t18) => c.game.events.on("destroy", t18), (t18, e) => Me("destroy", t18, e));
  var Di = re((t18) => c.game.events.on("use", t18), (t18, e) => Me("use", t18, e));
  var Bi = re((t18) => c.game.events.on("unuse", t18), (t18, e) => Me("unuse", t18, e));
  var to = re((t18) => c.game.events.on("tag", t18), (t18, e) => Me("tag", t18, e));
  var Fi = re((t18) => c.game.events.on("untag", t18), (t18, e) => Me("untag", t18, e));
  function Li(t18, e, n) {
    return Me("collide", t18, (r, o, i) => o.is(e) && n(r, o, i));
  }
  s(Li, "onCollide");
  function ji(t18, e, n) {
    return Me("collideUpdate", t18, (r, o, i) => o.is(e) && n(r, o, i));
  }
  s(ji, "onCollideUpdate");
  function Ki(t18, e, n) {
    return Me("collideEnd", t18, (r, o, i) => o.is(e) && n(r, o, i));
  }
  s(Ki, "onCollideEnd");
  function or(t18, e) {
    c.game.root.get(t18, { recursive: true }).forEach(e), eo(t18, e), to((n, r) => {
      r === t18 && e(n);
    });
  }
  s(or, "forAllCurrentAndFuture");
  var Ii = re((t18) => c.app.onMousePress(t18), (t18, e) => {
    let n = [];
    return or(t18, (r) => {
      if (!r.area) throw new Error("onClick() requires the object to have area() component");
      n.push(r.onClick(() => e(r)));
    }), _e.join(n);
  });
  function ki(t18, e) {
    let n = [];
    return or(t18, (r) => {
      if (!r.area) throw new Error("onHover() requires the object to have area() component");
      n.push(r.onHover(() => e(r)));
    }), _e.join(n);
  }
  s(ki, "onHover");
  function _i(t18, e) {
    let n = [];
    return or(t18, (r) => {
      if (!r.area) throw new Error("onHoverUpdate() requires the object to have area() component");
      n.push(r.onHoverUpdate(() => e(r)));
    }), _e.join(n);
  }
  s(_i, "onHoverUpdate");
  function Ni(t18, e) {
    let n = [];
    return or(t18, (r) => {
      if (!r.area) throw new Error("onHoverEnd() requires the object to have area() component");
      n.push(r.onHoverEnd(() => e(r)));
    }), _e.join(n);
  }
  s(Ni, "onHoverEnd");
  function Ui(t18) {
    c.game.events.on("loading", t18);
  }
  s(Ui, "onLoading");
  function Hi(t18) {
    c.app.onResize(t18);
  }
  s(Hi, "onResize");
  function qi(t18) {
    c.game.events.on("error", t18);
  }
  s(qi, "onError");
  function Nt(t18) {
    c.assets.loaded ? t18() : c.game.events.on("load", t18);
  }
  s(Nt, "onLoad");
  function zi(t18) {
    if (c.assets.loaded) Un().forEach((e) => t18(...e));
    else return c.game.events.on("loadError", t18);
  }
  s(zi, "onLoadError");
  function no(...t18) {
    c.game.cam.pos = v(...t18);
  }
  s(no, "setCamPos");
  function ro() {
    return c.game.cam.pos ? c.game.cam.pos.clone() : wt();
  }
  s(ro, "getCamPos");
  function oo(...t18) {
    c.game.cam.scale = v(...t18);
  }
  s(oo, "setCamScale");
  function so() {
    return c.game.cam.scale.clone();
  }
  s(so, "getCamScale");
  function io(t18) {
    c.game.cam.angle = t18;
  }
  s(io, "setCamRot");
  function ao() {
    return c.game.cam.angle;
  }
  s(ao, "getCamRot");
  function Yi() {
    return c.game.cam.transform.clone();
  }
  s(Yi, "getCamTransform");
  function uo(t18 = I(255, 255, 255), e = 1) {
    let n = c.game.root.add([nr(ae(), ce()), Zn(t18), er(1), ar()]), r = n.fadeOut(e);
    return r.onEnd(() => ir(n)), r;
  }
  s(uo, "flash");
  function Wi() {
    return c.game.cam.transform.clone();
  }
  s(Wi, "camTransform");
  function $i(t18 = 12) {
    c.game.cam.shake += t18;
  }
  s($i, "shake");
  function dn(t18) {
    return c.game.cam.transform.multVec2(t18);
  }
  s(dn, "toScreen");
  function sr(t18) {
    return c.game.cam.transform.invert().multVec2(t18);
  }
  s(sr, "toWorld");
  function Xi(...t18) {
    return tt("camPos", "setCamPos / getCamPos"), t18.length > 0 && no(...t18), ro();
  }
  s(Xi, "camPos");
  function Qi(...t18) {
    return tt("camScale", "setCamScale / getCamScale"), t18.length > 0 && oo(...t18), so();
  }
  s(Qi, "camScale");
  function Ji(t18) {
    return tt("camRot", "setCamRot / getCamRot"), t18 !== void 0 && io(t18), ao();
  }
  s(Ji, "camRot");
  function Zi(t18 = I(255, 255, 255), e = 1) {
    return tt("camFlash", "flash"), uo(t18, e);
  }
  s(Zi, "camFlash");
  function fn(t18 = []) {
    let e = /* @__PURE__ */ new Map(), n = [], r = {}, o = new Ye(), i = [], a = new Set("*"), l = c.globalOpt.tagsAsComponents, u = null, m = false, d = { id: Es(), hidden: false, transform: new he(), children: [], parent: null, set paused(p) {
      if (p !== m) {
        m = p;
        for (let b of i) b.paused = p;
      }
    }, get paused() {
      return m;
    }, get tags() {
      return Array.from(a);
    }, add(p) {
      let b = Array.isArray(p) ? fn(p) : p;
      if (b.parent) throw new Error("Cannot add a game obj that already has a parent.");
      return b.parent = this, b.transform = dt(b), this.children.push(b), b.trigger("add", b), c.game.events.trigger("add", b), b;
    }, readd(p) {
      let b = this.children.indexOf(p);
      return b !== -1 && (this.children.splice(b, 1), this.children.push(p)), p;
    }, remove(p) {
      let b = this.children.indexOf(p);
      if (b !== -1) {
        p.parent = null, this.children.splice(b, 1);
        let f = s((O) => {
          O.trigger("destroy"), c.game.events.trigger("destroy", O), O.children.forEach((g) => f(g));
        }, "trigger");
        f(p);
      }
    }, removeAll(p) {
      if (p) this.get(p).forEach((b) => this.remove(b));
      else for (let b of [...this.children]) this.remove(b);
    }, fixedUpdate() {
      this.paused || (this.children.forEach((p) => p.fixedUpdate()), this.trigger("fixedUpdate"));
    }, update() {
      this.paused || (this.children.forEach((p) => p.update()), this.trigger("update"));
    }, draw() {
      if (this.hidden) return;
      this.canvas && (Oe(), this.canvas.bind());
      let p = c.gfx.fixed;
      this.fixed && (c.gfx.fixed = true), be(), Q(this.pos), rt(this.scale), $e(this.angle);
      let b = this.children.sort((f, O) => {
        let g = f.layerIndex ?? c.game.defaultLayerIndex, y = O.layerIndex ?? c.game.defaultLayerIndex;
        return g - y || (f.z ?? 0) - (O.z ?? 0);
      });
      if (this.mask) {
        let f = { intersect: c.k.drawMasked, subtract: c.k.drawSubtracted }[this.mask];
        if (!f) throw new Error(`Invalid mask func: "${this.mask}"`);
        f(() => {
          b.forEach((O) => O.draw());
        }, () => {
          this.trigger("draw");
        });
      } else this.trigger("draw"), b.forEach((f) => f.draw());
      pe(), c.gfx.fixed = p, this.canvas && (Oe(), this.canvas.unbind());
    }, drawInspect() {
      this.hidden || (be(), Q(this.pos), rt(this.scale), $e(this.angle), this.children.forEach((p) => p.drawInspect()), this.trigger("drawInspect"), pe());
    }, use(p) {
      if (typeof p == "string") return a.add(p);
      if (!p || typeof p != "object") throw new Error(`You can only pass a component or a string to .use(), you passed a "${typeof p}"`);
      let b = [];
      p.id ? (this.unuse(p.id), r[p.id] = [], b = r[p.id], e.set(p.id, p), l && a.add(p.id)) : n.push(p);
      for (let O in p) {
        if (cs.has(O)) continue;
        let g = Object.getOwnPropertyDescriptor(p, O);
        if (g) if (typeof g.value == "function" && (p[O] = p[O].bind(this)), g.set && Object.defineProperty(p, O, { set: g.set.bind(this) }), g.get && Object.defineProperty(p, O, { get: g.get.bind(this) }), ls.has(O)) {
          let y = O === "add" ? () => {
            u = s((V) => b.push(V), "onCurCompCleanup"), p[O]?.(), u = null;
          } : p[O];
          b.push(this.on(O, y).cancel);
        } else if (this[O] === void 0) Object.defineProperty(this, O, { get: s(() => p[O], "get"), set: s((y) => p[O] = y, "set"), configurable: true, enumerable: true }), b.push(() => delete this[O]);
        else {
          let y = e.values().find((V) => V[O] !== void 0)?.id;
          throw new Error(`Duplicate component property: "${O}" while adding component "${p.id}"` + (y ? ` (originally added by "${y}")` : ""));
        }
      }
      let f = s(() => {
        if (p.require) {
          for (let O of p.require) if (!this.c(O)) throw new Error(`Component "${p.id}" requires component "${O}"`);
        }
      }, "checkDeps");
      p.destroy && b.push(p.destroy.bind(this)), this.exists() ? (f(), p.add && (u = s((O) => b.push(O), "onCurCompCleanup"), p.add.call(this), u = null), p.id && (this.trigger("use", p.id), c.game.events.trigger("use", this, p.id))) : p.require && b.push(this.on("add", f).cancel);
    }, unuse(p) {
      if (e.has(p)) {
        for (let b of e.values()) if (b.require && b.require.includes(p)) throw new Error(`Can't unuse. Component "${b.id}" requires component "${p}"`);
        e.delete(p), this.trigger("unuse", p), c.game.events.trigger("unuse", this, p);
      } else l && a.has(p) && a.delete(p);
      r[p] && (r[p].forEach((b) => b()), delete r[p]);
    }, c(p) {
      return e.get(p) ?? null;
    }, get(p, b = {}) {
      let f = s((g, y) => b.only === "comps" ? g.has(y) : b.only === "tags" ? g.is(y) : g.is(y) || g.has(y), "checkTagsOrComps"), O = b.recursive ? this.children.flatMap(s(function g(y) {
        return [y, ...y.children.flatMap(g)];
      }, "recurse")) : this.children;
      if (O = O.filter((g) => p ? f(g, p) : true), b.liveUpdate) {
        let g = s((V) => b.recursive ? this.isAncestorOf(V) : V.parent === this, "isChild"), y = [];
        y.push(c.k.onAdd((V) => {
          g(V) && f(V, p) && O.push(V);
        })), y.push(c.k.onDestroy((V) => {
          if (g(V) && f(V, p)) {
            let A = O.findIndex((D) => D.id === V.id);
            A !== -1 && O.splice(A, 1);
          }
        })), this.onDestroy(() => {
          for (let V of y) V.cancel();
        });
      }
      return O;
    }, query(p) {
      let b = p.hierarchy || "children", f = p.include, O = p.exclude, g = [];
      switch (b) {
        case "children":
          g = this.children;
          break;
        case "siblings":
          g = this.parent ? this.parent.children.filter((V) => V !== this) : [];
          break;
        case "ancestors":
          let y = this.parent;
          for (; y; ) g.push(y), y = y.parent;
          break;
        case "descendants":
          g = this.children.flatMap(s(function V(A) {
            return [A, ...A.children.flatMap(V)];
          }, "recurse"));
          break;
      }
      if (f && ((p.includeOp || "and") === "and" || !Array.isArray(p.include) ? g = g.filter((V) => V.is(f)) : g = g.filter((V) => p.include.some((A) => V.is(A)))), O && ((p.includeOp || "and") === "and" || !Array.isArray(p.include) ? g = g.filter((V) => !V.is(O)) : g = g.filter((V) => !p.exclude.some((A) => V.is(A)))), p.visible === true && (g = g.filter((y) => y.visible)), p.distance) {
        if (!this.pos) throw Error("Can't do a distance query from an object without pos");
        let y = p.distanceOp || "near", V = p.distance * p.distance;
        y === "near" ? g = g.filter((A) => A.pos && this.pos.sdist(A.pos) <= V) : g = g.filter((A) => A.pos && this.pos.sdist(A.pos) > V);
      }
      return p.name && (g = g.filter((y) => y.name === p.name)), g;
    }, isAncestorOf(p) {
      return p.parent ? p.parent === this || this.isAncestorOf(p.parent) : false;
    }, exists() {
      return c.game.root.isAncestorOf(this);
    }, is(p, b = "and") {
      return Array.isArray(p) ? b === "and" ? p.every((f) => a.has(f)) : p.some((f) => a.has(f)) : a.has(p);
    }, tag(p) {
      if (Array.isArray(p)) for (let b of p) a.add(b), this.trigger("tag", b), c.game.events.trigger("tag", this, b);
      else a.add(p), this.trigger("tag", p), c.game.events.trigger("tag", this, p);
    }, untag(p) {
      if (Array.isArray(p)) for (let b of p) a.delete(b), this.trigger("untag", b), c.game.events.trigger("untag", this, b);
      else a.delete(p), this.trigger("untag", p), c.game.events.trigger("untag", this, p);
    }, has(p, b = "and") {
      return Array.isArray(p) ? b === "and" ? p.every((f) => e.has(f)) : p.some((f) => e.has(f)) : e.has(p);
    }, on(p, b) {
      let f = o.on(p, b.bind(this));
      return u && u(() => f.cancel()), f;
    }, trigger(p, ...b) {
      o.trigger(p, ...b), c.game.objEvents.trigger(p, this, ...b);
    }, destroy() {
      this.parent && this.parent.remove(this);
    }, inspect() {
      let p = {};
      for (let [b, f] of e) p[b] = f.inspect?.() ?? null;
      for (let [b, f] of n.entries()) {
        if (f.inspect) {
          p[b] = f.inspect();
          continue;
        }
        for (let [O, g] of Object.entries(f)) typeof g != "function" && (p[O] = `${O}: ${g}`);
      }
      return p;
    }, onAdd(p) {
      return this.on("add", p);
    }, onFixedUpdate(p) {
      return this.on("fixedUpdate", p);
    }, onUpdate(p) {
      return this.on("update", p);
    }, onDraw(p) {
      return this.on("draw", p);
    }, onDestroy(p) {
      return this.on("destroy", p);
    }, onUse(p) {
      return this.on("use", p);
    }, onUnuse(p) {
      return this.on("unuse", p);
    }, clearEvents() {
      o.clear();
    } }, C = ["onKeyPress", "onKeyPressRepeat", "onKeyDown", "onKeyRelease", "onMousePress", "onMouseDown", "onMouseRelease", "onMouseMove", "onCharInput", "onMouseMove", "onTouchStart", "onTouchMove", "onTouchEnd", "onScroll", "onGamepadButtonPress", "onGamepadButtonDown", "onGamepadButtonRelease", "onGamepadStick", "onButtonPress", "onButtonDown", "onButtonRelease"];
    for (let p of C) d[p] = (...b) => {
      let f = c.app[p]?.(...b);
      return i.push(f), d.onDestroy(() => f.cancel()), d.on("sceneEnter", () => {
        i.splice(i.indexOf(f), 1);
        let O = c.app[p]?.(...b);
        _e.replace(f, O), i.push(f);
      }), f;
    };
    for (let p of t18) d.use(p);
    return d;
  }
  s(fn, "make");
  var ea = s(() => ({ events: new Ye(), objEvents: new Ye(), root: fn([]), gravity: null, scenes: {}, currentScene: null, layers: null, defaultLayerIndex: 0, logs: [], cam: { pos: null, scale: new E(1), angle: 0, shake: 0, transform: new he() } }), "initGame");
  function ta(t18) {
    c.game.gravity = t18 ? (c.game.gravity || v(0, 1)).unit().scale(t18) : null;
  }
  s(ta, "setGravity");
  function na() {
    return c.game.gravity ? c.game.gravity.len() : 0;
  }
  s(na, "getGravity");
  function ra(t18) {
    c.game.gravity = t18.unit().scale(c.game.gravity ? c.game.gravity.len() : 1);
  }
  s(ra, "setGravityDirection");
  function ht() {
    return c.game.gravity ? c.game.gravity.unit() : v(0, 1);
  }
  s(ht, "getGravityDirection");
  var oa = Eo("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");
  var sa = s(() => (() => {
    let e = new (window.AudioContext || window.webkitAudioContext)(), n = e.createGain();
    n.connect(e.destination);
    let r = new ot(Ms(e));
    return e.decodeAudioData(oa.buffer.slice(0)).then((o) => {
      r.buf = o;
    }).catch((o) => {
      console.error("Failed to load burp: ", o);
    }), { ctx: e, masterNode: n, burpSnd: r };
  })(), "initAudio");
  function ia(t18, e = {}) {
    let n = new oe(), r = new Audio(t18);
    r.crossOrigin = "anonymous", r.loop = !!e.loop, c.audio.ctx.createMediaElementSource(r).connect(c.audio.masterNode);
    function i() {
      c.debug.paused || c.app.isHidden() && !c.globalOpt.backgroundAudio || c.audio.ctx.resume();
    }
    s(i, "resumeAudioCtx");
    function a() {
      i(), r.play();
    }
    return s(a, "play"), e.paused || a(), r.onended = () => n.trigger(), { play() {
      a();
    }, seek(l) {
      r.currentTime = l;
    }, stop() {
      r.pause(), this.seek(0);
    }, set loop(l) {
      r.loop = l;
    }, get loop() {
      return r.loop;
    }, set paused(l) {
      l ? r.pause() : a();
    }, get paused() {
      return r.paused;
    }, time() {
      return r.currentTime;
    }, duration() {
      return r.duration;
    }, set volume(l) {
      r.volume = Se(l, 0, 1);
    }, get volume() {
      return r.volume;
    }, set speed(l) {
      r.playbackRate = Math.max(l, 0);
    }, get speed() {
      return r.playbackRate;
    }, set detune(l) {
    }, get detune() {
      return 0;
    }, onEnd(l) {
      return n.add(l);
    }, then(l) {
      return this.onEnd(l);
    } };
  }
  s(ia, "playMusic");
  function aa(t18, e = {}) {
    if (typeof t18 == "string" && c.assets.music[t18]) return ia(c.assets.music[t18], e);
    let n = c.audio.ctx, r = e.paused ?? false, o = n.createBufferSource(), i = new oe(), a = n.createGain(), l = n.createStereoPanner(), u = e.seek ?? 0, m = 0, d = 0, C = false;
    o.loop = !!e.loop, o.detune.value = e.detune ?? 0, o.playbackRate.value = e.speed ?? 1, o.connect(l), o.onended = () => {
      f() >= (o.buffer?.duration ?? Number.POSITIVE_INFINITY) && i.trigger();
    }, l.pan.value = e.pan ?? 0, l.connect(a), a.connect(c.audio.masterNode), a.gain.value = e.volume ?? 1;
    let p = s((g) => {
      o.buffer = g.buf, r || (m = n.currentTime, o.start(0, u), C = true);
    }, "start"), b = ri(t18);
    b instanceof le && b.onLoad(p);
    let f = s(() => {
      if (!o.buffer) return 0;
      let g = r ? d - m : n.currentTime - m, y = o.buffer.duration;
      return o.loop ? g % y : Math.min(g, y);
    }, "getTime"), O = s((g) => {
      let y = n.createBufferSource();
      return y.buffer = g.buffer, y.loop = g.loop, y.playbackRate.value = g.playbackRate.value, y.detune.value = g.detune.value, y.onended = g.onended, y.connect(l), y;
    }, "cloneNode");
    return { stop() {
      this.paused = true, this.seek(0);
    }, set paused(g) {
      if (r !== g) if (r = g, g) C && (o.stop(), C = false), d = n.currentTime;
      else {
        o = O(o);
        let y = d - m;
        o.start(0, y), C = true, m = n.currentTime - y, d = 0;
      }
    }, get paused() {
      return r;
    }, play(g = 0) {
      this.seek(g), this.paused = false;
    }, seek(g) {
      o.buffer?.duration && (g > o.buffer.duration || (r ? (o = O(o), m = d - g) : (o.stop(), o = O(o), m = n.currentTime - g, o.start(0, g), C = true, d = 0)));
    }, set speed(g) {
      o.playbackRate.value = g;
    }, get speed() {
      return o.playbackRate.value;
    }, set detune(g) {
      o.detune.value = g;
    }, get detune() {
      return o.detune.value;
    }, set volume(g) {
      a.gain.value = Math.max(g, 0);
    }, get volume() {
      return a.gain.value;
    }, set pan(g) {
      l.pan.value = g;
    }, get pan() {
      return l.pan.value;
    }, set loop(g) {
      o.loop = g;
    }, get loop() {
      return o.loop;
    }, duration() {
      return o.buffer?.duration ?? 0;
    }, time() {
      return f() % this.duration();
    }, onEnd(g) {
      return i.add(g);
    }, then(g) {
      return this.onEnd(g);
    } };
  }
  s(aa, "play");
  function ur(t18) {
    return c.k.play(c.audio.burpSnd, t18);
  }
  s(ur, "burp");
  function co(t18) {
    c.audio.masterNode.gain.value = t18;
  }
  s(co, "setVolume");
  function lo() {
    return c.audio.masterNode.gain.value;
  }
  s(lo, "getVolume");
  function ua(t18) {
    return tt("volume", "setVolume / getVolume"), t18 !== void 0 && co(t18), lo();
  }
  s(ua, "volume");
  function cr() {
    c.app.onHide(() => {
      c.globalOpt.backgroundAudio || c.audio.ctx.suspend();
    }), c.app.onShow(() => {
      !c.globalOpt.backgroundAudio && !c.debug.paused && c.audio.ctx.resume();
    }), c.app.onResize(() => {
      if (c.app.isFullscreen()) return;
      let t18 = c.globalOpt.width && c.globalOpt.height;
      t18 && !c.globalOpt.stretch && !c.globalOpt.letterbox || (c.canvas.width = c.canvas.offsetWidth * c.pixelDensity, c.canvas.height = c.canvas.offsetHeight * c.pixelDensity, Jn(), t18 || (c.gfx.frameBuffer.free(), c.gfx.frameBuffer = new st(c.gfx.ggl, c.gfx.ggl.gl.drawingBufferWidth, c.gfx.ggl.gl.drawingBufferHeight), c.gfx.width = c.gfx.ggl.gl.drawingBufferWidth / c.pixelDensity / c.gscale, c.gfx.height = c.gfx.ggl.gl.drawingBufferHeight / c.pixelDensity / c.gscale));
    }), c.globalOpt.debug !== false && (c.app.onKeyPress(c.globalOpt.debugKey ?? "f1", () => c.debug.inspect = !c.debug.inspect), c.app.onKeyPress("f2", () => c.debug.clearLog()), c.app.onKeyPress("f8", () => c.debug.paused = !c.debug.paused), c.app.onKeyPress("f7", () => {
      c.debug.timeScale = on(Se(c.debug.timeScale - 0.2, 0, 2), 1);
    }), c.app.onKeyPress("f9", () => {
      c.debug.timeScale = on(Se(c.debug.timeScale + 0.2, 0, 2), 1);
    }), c.app.onKeyPress("f10", () => c.debug.stepFrame())), c.globalOpt.burp && c.app.onKeyPress("b", () => ur());
  }
  s(cr, "initEvents");
  function ca(t18, e = {}) {
    let n = c.game.root.add([Pt(t18), lr()]), r = (e.speed || 1) * 5, o = e.scale || 1;
    n.add([hn(c.boomSprite), Ut(0), gn("center"), mo(r, o), ...e.comps ?? []]);
    let i = n.add([hn(c.kaSprite), Ut(0), gn("center"), bn(), ...e.comps ?? []]);
    return i.wait(0.4 / r, () => i.use(mo(r, o))), i.onDestroy(() => n.destroy()), n;
  }
  s(ca, "addKaboom");
  function po(t18, e) {
    if (c.game.layers) throw Error("Layers can only be assigned once.");
    let n = t18.indexOf(e);
    if (n == -1) throw Error("The default layer name should be present in the layers list.");
    c.game.layers = t18, c.game.defaultLayerIndex = n;
  }
  s(po, "setLayers");
  function la() {
    return c.game.layers;
  }
  s(la, "getLayers");
  function ma() {
    return c.game.layers?.[c.game.defaultLayerIndex] ?? null;
  }
  s(ma, "getDefaultLayer");
  function pa(t18, e) {
    tt("layers", "setLayers"), po(t18, e);
  }
  s(pa, "layers");
  function ir(t18) {
    t18.destroy();
  }
  s(ir, "destroy");
  function da() {
    return c.game.root;
  }
  s(da, "getTreeRoot");
  function fa(t18, e) {
    c.game.scenes[t18] = e;
  }
  s(fa, "scene");
  function ha(t18, ...e) {
    if (!c.game.scenes[t18]) throw new Error(`Scene not found: ${t18}`);
    c.game.events.onOnce("frameEnd", () => {
      c.game.events.trigger("sceneLeave", t18), c.app.events.clear(), c.game.events.clear(), c.game.objEvents.clear(), [...c.game.root.children].forEach((n) => {
        !n.stay || n.scenesToStay && !n.scenesToStay.includes(t18) ? c.game.root.remove(n) : n.trigger("sceneEnter", t18);
      }), c.game.root.clearEvents(), cr(), c.game.cam = { pos: null, scale: v(1), angle: 0, shake: 0, transform: new he() }, c.game.scenes[t18](...e);
    }), c.game.currentScene = t18;
  }
  s(ha, "go");
  function ga(t18) {
    return c.game.events.on("sceneLeave", t18);
  }
  s(ga, "onSceneLeave");
  function ba() {
    return c.game.currentScene;
  }
  s(ba, "getSceneName");
  function hn(t18, e = {}) {
    let n = null, r = null, o = null, i = new oe();
    if (!t18) throw new Error("Please pass the resource name or data to sprite()");
    let a = s((u, m, d, C) => {
      let p = v(1, 1);
      return d && C ? (p.x = d / (u.width * m.w), p.y = C / (u.height * m.h)) : d ? (p.x = d / (u.width * m.w), p.y = p.x) : C && (p.y = C / (u.height * m.h), p.x = p.y), p;
    }, "calcTexScale"), l = s((u, m) => {
      if (!m) return;
      let d = m.frames[0].clone();
      e.quad && (d = d.scale(e.quad));
      let C = a(m.tex, d, e.width, e.height);
      u.width = m.tex.width * d.w * C.x, u.height = m.tex.height * d.h * C.y, e.anim && u.play(e.anim), n = m, i.trigger(n);
    }, "setSpriteData");
    return { id: "sprite", width: 0, height: 0, frame: e.frame || 0, quad: e.quad || new z2(0, 0, 1, 1), animSpeed: e.animSpeed ?? 1, flipX: e.flipX ?? false, flipY: e.flipY ?? false, get sprite() {
      return t18.toString();
    }, set sprite(u) {
      let m = It(u);
      m && m.onLoad((d) => l(this, d));
    }, get animFrame() {
      if (!n || !r || o === null) return this.frame;
      let u = n.anims[r.name];
      return typeof u == "number" ? u : this.frame - Math.min(u.from, u.to);
    }, draw() {
      if (!n) return;
      let u = n.frames[this.frame ?? 0];
      if (!u) throw new Error(`Frame not found: ${this.frame ?? 0}`);
      if (n.slice9) {
        let { left: m, right: d, top: C, bottom: p } = n.slice9, b = n.tex.width * u.w, f = n.tex.height * u.h, O = this.width - m - d, g = this.height - C - p, y = m / b, V = d / b, A = 1 - y - V, D = C / f, G = p / f, x = 1 - D - G, w = [me(0, 0, y, D), me(y, 0, A, D), me(y + A, 0, V, D), me(0, D, y, x), me(y, D, A, x), me(y + A, D, V, x), me(0, D + x, y, G), me(y, D + x, A, G), me(y + A, D + x, V, G), me(0, 0, m, C), me(m, 0, O, C), me(m + O, 0, d, C), me(0, C, m, g), me(m, C, O, g), me(m + O, C, d, g), me(0, C + g, m, p), me(m, C + g, O, p), me(m + O, C + g, d, p)];
        for (let S = 0; S < 9; S++) {
          let M = w[S], R = w[S + 9];
          Vt(Object.assign(Ke(this), { pos: R.pos(), tex: n.tex, quad: u.scale(M), flipX: this.flipX, flipY: this.flipY, tiled: e.tiled, width: R.w, height: R.h }));
        }
      } else Vt(Object.assign(Ke(this), { tex: n.tex, quad: u.scale(this.quad ?? new z2(0, 0, 1, 1)), flipX: this.flipX, flipY: this.flipY, tiled: e.tiled, width: this.width, height: this.height }));
    }, add() {
      let u = It(t18);
      u ? u.onLoad((m) => l(this, m)) : Nt(() => l(this, It(t18).data));
    }, update() {
      if (!n || !r || o === null) return;
      let u = n.anims[r.name];
      if (typeof u == "number") {
        this.frame = u;
        return;
      }
      if (u.speed === 0) throw new Error("Sprite anim speed cannot be 0");
      r.timer += te() * this.animSpeed, r.timer >= 1 / r.speed && (r.timer = 0, this.frame += o, (this.frame < Math.min(u.from, u.to) || this.frame > Math.max(u.from, u.to)) && (r.loop ? r.pingpong ? (this.frame -= o, o *= -1, this.frame += o) : this.frame = u.from : r.pingpong ? o === Math.sign(u.to - u.from) ? (this.frame = u.to, o *= -1, this.frame += o) : (this.frame = u.from, r.onEnd(), this.stop()) : (this.frame = u.to, r.onEnd(), this.stop())));
    }, play(u, m = {}) {
      if (!n) {
        i.add(() => this.play(u, m));
        return;
      }
      let d = n.anims[u];
      if (d === void 0) throw new Error(`Anim not found: ${u}`);
      r && this.stop(), r = typeof d == "number" ? { name: u, timer: 0, loop: false, pingpong: false, speed: 0, onEnd: s(() => {
      }, "onEnd") } : { name: u, timer: 0, loop: m.loop ?? d.loop ?? false, pingpong: m.pingpong ?? d.pingpong ?? false, speed: m.speed ?? d.speed ?? 10, onEnd: m.onEnd ?? (() => {
      }) }, o = typeof d == "number" ? null : d.from < d.to ? 1 : -1, this.frame = typeof d == "number" ? d : d.from, this.trigger("animStart", u);
    }, stop() {
      if (!r) return;
      let u = r.name;
      r = null, this.trigger("animEnd", u);
    }, numFrames() {
      return n?.frames.length ?? 0;
    }, getCurAnim() {
      return r;
    }, curAnim() {
      return r?.name;
    }, getAnim(u) {
      return n?.anims[u] ?? null;
    }, hasAnim(u) {
      return !!this.getAnim(u);
    }, onAnimEnd(u) {
      return this.on("animEnd", u);
    }, onAnimStart(u) {
      return this.on("animStart", u);
    }, renderArea() {
      return new $(v(0), this.width, this.height);
    }, inspect() {
      return typeof t18 == "string" ? `sprite: "${t18}"` : null;
    } };
  }
  s(hn, "sprite");
  function ya(t18, e = {}) {
    function n(o) {
      let i = He(Object.assign(Ke(o), { text: o.text + "", size: o.textSize, font: o.font, width: e.width && o.width, align: o.align, letterSpacing: o.letterSpacing, lineSpacing: o.lineSpacing, transform: o.textTransform, styles: o.textStyles, indentAll: e.indentAll }));
      return e.width || (o.width = i.width / (o.scale?.x || 1)), o.height = i.height / (o.scale?.y || 1), i;
    }
    s(n, "update");
    let r = { id: "text", set text(o) {
      t18 = o, n(this), this.renderedText = $n(t18).text;
    }, get text() {
      return t18;
    }, textSize: e.size ?? 36, font: e.font, width: e.width ?? 0, height: 0, align: e.align, lineSpacing: e.lineSpacing, letterSpacing: e.letterSpacing, textTransform: e.transform, textStyles: e.styles, renderedText: t18 ? $n(t18).text : "", add() {
      Nt(() => n(this));
    }, draw() {
      qe(n(this));
    }, renderArea() {
      return new $(v(0), this.width, this.height);
    } };
    return n(r), r;
  }
  s(ya, "text");
  function xa(t18, e) {
    return { id: "rect", width: t18, height: e, draw() {
      it(Object.assign(Ke(this), { width: this.width, height: this.height }));
    }, renderArea() {
      return new $(v(0), this.width, this.height);
    }, inspect() {
      return `uvquad: (${Math.ceil(this.width)}w, ${Math.ceil(this.height)})h`;
    } };
  }
  s(xa, "uvquad");
  function va(t18 = {}) {
    let e = null, n = null, r = null, o = null;
    return { id: "agent", require: ["pos", "tile"], agentSpeed: t18.speed ?? 100, allowDiagonals: t18.allowDiagonals ?? true, getDistanceToTarget() {
      return e ? this.pos.dist(e) : 0;
    }, getNextLocation() {
      return n && r ? n[r] : null;
    }, getPath() {
      return n ? n.slice() : null;
    }, getTarget() {
      return e;
    }, isNavigationFinished() {
      return n ? r === null : true;
    }, isTargetReachable() {
      return n !== null;
    }, isTargetReached() {
      return e ? this.pos.eq(e) : true;
    }, setTarget(i) {
      e = i, n = this.getLevel().getPath(this.pos, e, { allowDiagonals: this.allowDiagonals }), r = n ? 0 : null, n && r !== null ? (o || (o = this.getLevel().onNavigationMapChanged(() => {
        e && n && r !== null && (n = this.getLevel().getPath(this.pos, e, { allowDiagonals: this.allowDiagonals }), n ? (r = 0, this.trigger("navigationNext", this, n[r])) : (r = null, this.trigger("navigationEnded", this)));
      }), this.onDestroy(() => o?.cancel())), this.trigger("navigationStarted", this), this.trigger("navigationNext", this, n[r])) : this.trigger("navigationEnded", this);
    }, update() {
      if (e && n && r !== null) {
        if (this.pos.sdist(n[r]) < 2) if (r === n.length - 1) {
          this.pos = e.clone(), r = null, this.trigger("navigationEnded", this), this.trigger("targetReached", this);
          return;
        } else r++, this.trigger("navigationNext", this, n[r]);
        this.moveTo(n[r], this.agentSpeed);
      }
    }, onNavigationStarted(i) {
      return this.on("navigationStarted", i);
    }, onNavigationNext(i) {
      return this.on("navigationNext", i);
    }, onNavigationEnded(i) {
      return this.on("navigationEnded", i);
    }, onTargetReached(i) {
      return this.on("targetReached", i);
    }, inspect() {
      return "agent: " + JSON.stringify({ target: JSON.stringify(e), path: JSON.stringify(n) });
    } };
  }
  s(va, "agent");
  function Ca(t18) {
    let e = t18.graph;
    return { id: "pathfinder", require: ["pos"], navigateTo(n) {
      return this.graph?.getWaypointPath(this.pos, n, t18.navigationOpt);
    }, get graph() {
      if (e) return e;
      let n = this.parent;
      for (; n; ) {
        if (n.has("pathfinderMap")) return n.graph;
        n = n.parent;
      }
    }, set graph(n) {
      e = n;
    } };
  }
  s(Ca, "pathfinder");
  function wa(t18 = {}) {
    let e = t18.waypoints, n = t18.speed || 100, r = t18.endBehavior || "stop", o = 0, i = e != null;
    return { id: "patrol", require: ["pos"], get patrolSpeed() {
      return n;
    }, set patrolSpeed(a) {
      n = a;
    }, get waypoints() {
      return e;
    }, set waypoints(a) {
      e = a, o = 0, i = false;
    }, get nextLocation() {
      return e ? e[o] : void 0;
    }, update() {
      let a = this.nextLocation;
      if (!(!e || !a || i) && (this.moveTo(a, n), this.pos.sdist(a) < 9)) switch (r) {
        case "loop":
          o = (o + 1) % e.length;
          break;
        case "ping-pong":
          o = o + 1, o == e.length && (e.reverse(), o = 0);
          break;
        case "stop":
          o = Math.min(o + 1, e.length - 1), o == e.length - 1 && (i = true, this.trigger("patrolFinished"));
          break;
      }
    }, onPatrolFinished(a) {
      return this.on("patrolFinished", a);
    } };
  }
  s(wa, "patrol");
  function Oa(t18, e = {}) {
    let n = typeof t18 == "function" ? t18 : () => c.game.root.query(t18), r = e.checkFrequency || 1, o = typeof e.direction == "number" ? E.fromAngle(e.direction) : e.direction, i = 0;
    return { id: "sentry", require: ["pos"], direction: typeof e.direction == "number" ? E.fromAngle(e.direction) : e.direction, spotted: [], set directionAngle(a) {
      this.direction = a !== void 0 ? E.fromAngle(a) : void 0;
    }, get directionAngle() {
      return this.direction ? this.direction.angle() : void 0;
    }, fieldOfView: e.fieldOfView || 200, isWithinFieldOfView(a, l, u) {
      let m = (typeof l == "number" ? E.fromAngle(l) : l) || o, d = u || e.fieldOfView;
      if (!m || !d || d >= 360) return true;
      let C = d / 2;
      return a.pos && m.angleBetween(a.pos.sub(this.pos)) <= C;
    }, hasLineOfSight(a) {
      let l = tr(this.pos, a.pos.sub(this.pos), e.raycastExclude);
      return l != null && l.object === a;
    }, update() {
      if (i += te(), i > r) {
        i -= r;
        let a = n();
        if (a.length && o && this.fieldOfView && this.fieldOfView < 360) {
          let l = this.fieldOfView / 2;
          a = a.filter((u) => u.pos && o.angleBetween(u.pos.sub(this.pos)) <= l);
        }
        a.length && e.lineOfSight && (a = a.filter((l) => l.pos && this.hasLineOfSight(l))), a.length > 0 && (this.spotted = a, this.trigger("objectSpotted", a));
      }
    }, onObjectsSpotted(a) {
      return this.on("objectSpotted", a);
    } };
  }
  s(Oa, "sentry");
  function rr(t18 = {}) {
    let e = v(0), n = t18.isObstacle ?? false, r = t18.cost ?? 0, o = t18.edges ?? [], i = s(() => {
      let l = { left: 1, top: 2, right: 4, bottom: 8 };
      return o.map((u) => l[u] || 0).reduce((u, m) => u | m, 0);
    }, "getEdgeMask"), a = i();
    return { id: "tile", tilePosOffset: t18.offset ?? v(0), set tilePos(l) {
      let u = this.getLevel();
      e = l.clone(), this.pos = v(this.tilePos.x * u.tileWidth(), this.tilePos.y * u.tileHeight()).add(this.tilePosOffset);
    }, get tilePos() {
      return e;
    }, set isObstacle(l) {
      n !== l && (n = l, this.getLevel().invalidateNavigationMap());
    }, get isObstacle() {
      return n;
    }, set cost(l) {
      r !== l && (r = l, this.getLevel().invalidateNavigationMap());
    }, get cost() {
      return r;
    }, set edges(l) {
      o = l, a = i(), this.getLevel().invalidateNavigationMap();
    }, get edges() {
      return o;
    }, get edgeMask() {
      return a;
    }, getLevel() {
      return this.parent;
    }, tileMove(l) {
      let u = this.getLevel();
      u.removeFromSpatialMap(this), this.tilePos = this.tilePos.add(l), u.insertIntoSpatialMap(this), u.trigger("spatialMapChanged");
    }, moveLeft() {
      this.tileMove(v(-1, 0));
    }, moveRight() {
      this.tileMove(v(1, 0));
    }, moveUp() {
      this.tileMove(v(0, -1));
    }, moveDown() {
      this.tileMove(v(0, 1));
    } };
  }
  s(rr, "tile");
  var yn = class {
    static {
      s(this, "AnimateChannel");
    }
    name;
    duration;
    loops;
    direction;
    easing;
    interpolation;
    isFinished;
    timing;
    easings;
    relative;
    constructor(e, n, r) {
      this.name = e, this.duration = n.duration, this.loops = n.loops || 0, this.direction = n.direction || "forward", this.easing = n.easing || nt.linear, this.interpolation = n.interpolation || "linear", this.isFinished = false, this.timing = n.timing, this.easings = n.easings, this.relative = r;
    }
    update(e, n) {
      return true;
    }
    getLowerKeyIndexAndRelativeTime(e, n, r) {
      let o = n - 1, i = e / this.duration;
      if (this.loops !== 0 && i >= this.loops) return [o, 0, true];
      let a = Math.trunc(i);
      if (i -= a, (this.direction == "reverse" || this.direction == "ping-pong" && a & 1) && (i = 1 - i), r) {
        let l = 0;
        for (; r[l + 1] !== void 0 && r[l + 1] < i; ) l++;
        return l >= o ? [o, 0, true] : [l, (i - r[l]) / (r[l + 1] - r[l]), false];
      } else {
        let l = Math.floor((n - 1) * i);
        return [l, (i - l / o) * o, false];
      }
    }
    setValue(e, n, r) {
      if (this.relative) switch (n) {
        case "pos":
          e.pos = e.base.pos.add(r);
          break;
        case "angle":
          e.angle = e.base.angle + r;
          break;
        case "scale":
          e.scale = e.base.scale.scale(r);
          break;
        case "opacity":
          e.opacity = e.base.opacity * r;
          break;
        default:
          e[n] = r;
      }
      else e[n] = r;
    }
    serialize() {
      let e = { duration: this.duration, keys: [] };
      return this.loops && (e.loops = this.loops), this.direction !== "forward" && (e.direction = this.direction), this.easing != nt.linear && (e.easing = this.easing.name), this.interpolation !== "linear" && (e.interpolation = this.interpolation), this.timing && (e.timing = this.timing), this.easings && (e.easings = this.easings.map((n) => this.easing.name)), e;
    }
  };
  function Ea(t18, e) {
    return e.add(e.sub(t18));
  }
  s(Ea, "reflect");
  var fo = class extends yn {
    static {
      s(this, "AnimateChannelNumber");
    }
    keys;
    constructor(e, n, r, o) {
      super(e, r, o), this.keys = n;
    }
    update(e, n) {
      let [r, o, i] = this.getLowerKeyIndexAndRelativeTime(n, this.keys.length, this.timing);
      if (o == 0 || this.interpolation === "none") this.setValue(e, this.name, this.keys[r]);
      else {
        let a = this.easings ? this.easings[r] : this.easing;
        this.setValue(e, this.name, fe(this.keys[r], this.keys[r + 1], a(o)));
      }
      return i;
    }
    serialize() {
      return Object.assign(super.serialize(), { keys: this.keys });
    }
  };
  var ho = class extends yn {
    static {
      s(this, "AnimateChannelVec2");
    }
    keys;
    curves;
    dcurves;
    constructor(e, n, r, o, i) {
      if (super(e, r, o), this.keys = n, this.interpolation === "spline") {
        this.curves = [], i && (this.dcurves = []);
        for (let a = 0; a < this.keys.length - 1; a++) {
          let l = this.keys[a], u = a + 1, m = this.keys[u], d = a > 0 ? this.keys[a - 1] : Ea(m, l), C = u < this.keys.length - 1 ? this.keys[u + 1] : Ea(l, m);
          this.curves.push(jt(d, l, m, C)), i && this.dcurves?.push(jt(d, l, m, C, Xo));
        }
      }
    }
    update(e, n) {
      let [r, o, i] = this.getLowerKeyIndexAndRelativeTime(n, this.keys.length, this.timing);
      if (o == 0 || this.interpolation === "none") this.setValue(e, this.name, this.keys[r]);
      else {
        let a = this.easings ? this.easings[r] : this.easing;
        switch (this.interpolation) {
          case "linear":
            this.setValue(e, this.name, this.keys[r].lerp(this.keys[r + 1], a(o)));
            break;
          case "slerp":
            this.setValue(e, this.name, this.keys[r].slerp(this.keys[r + 1], a(o)));
            break;
          case "spline":
            if (this.curves) {
              this.setValue(e, this.name, this.curves[r](a(o))), this.dcurves && this.setValue(e, "angle", this.dcurves[r](a(o)).angle());
              break;
            }
        }
      }
      return i;
    }
    serialize() {
      return Object.assign(super.serialize(), { keys: this.keys.map((e) => [e.x, e.y]) });
    }
  };
  var go2 = class extends yn {
    static {
      s(this, "AnimateChannelColor");
    }
    keys;
    constructor(e, n, r, o) {
      super(e, r, o), this.keys = n;
    }
    update(e, n) {
      let [r, o, i] = this.getLowerKeyIndexAndRelativeTime(n, this.keys.length, this.timing);
      if (o == 0 || this.interpolation == "none") this.setValue(e, this.name, this.keys[r]);
      else {
        let a = this.easings ? this.easings[r] : this.easing;
        this.setValue(e, this.name, this.keys[r].lerp(this.keys[r + 1], a(o)));
      }
      return i;
    }
    serialize() {
      return Object.assign(super.serialize(), { keys: this.keys });
    }
  };
  function Ta(t18 = {}) {
    let e = [], n = 0, r = false;
    return { id: "animate", require: t18.followMotion ? ["rotate"] : void 0, base: { pos: v(0, 0), angle: 0, scale: v(1, 1), opacity: 1 }, animation: { paused: false, seek(o) {
      n = Se(o, 0, this.duration), e.forEach((i) => {
        i.isFinished = false;
      }), r = false;
    }, get duration() {
      return e.reduce((o, i) => Math.max(i.duration, o), 0);
    } }, add() {
      t18.relative && (this.has("pos") && (this.base.pos = this.pos.clone()), this.has("rotate") && (this.base.angle = this.angle), this.has("scale") && (this.base.scale = this.scale), this.has("opacity") && (this.base.opacity = this.opacity));
    }, update() {
      if (this.animation.paused) return;
      let o = true, i;
      n += te();
      for (let a of e) i = a.update(this, n), i && !a.isFinished && (a.isFinished = true, this.trigger("animateChannelFinished", a.name)), o &&= i;
      o && !r && (r = true, this.trigger("animateFinished"));
    }, animate(o, i, a) {
      r = false, this.unanimate(o), typeof i[0] == "number" ? e.push(new fo(o, i, a, t18.relative || false)) : i[0] instanceof E ? e.push(new ho(o, i, a, t18.relative || false, o === "pos" && (t18.followMotion || false))) : i[0] instanceof K && e.push(new go2(o, i, a, t18.relative || false));
    }, unanimate(o) {
      let i = e.findIndex((a) => a.name === o);
      i >= 0 && e.splice(i, 1);
    }, unanimateAll() {
      e.splice(0, e.length);
    }, onAnimateFinished(o) {
      return this.on("animateFinished", o);
    }, onAnimateChannelFinished(o) {
      return this.on("animateChannelFinished", o);
    }, serializeAnimationChannels() {
      return e.reduce((o, i) => (o[i.name] = i.serialize(), o), {});
    }, serializeAnimationOptions() {
      let o = {};
      return t18.followMotion && (o.followMotion = true), t18.relative && (o.relative = true), o;
    } };
  }
  s(Ta, "animate");
  function bo(t18, e) {
    let n = { name: t18.name };
    return t18.has("animate") && (n.channels = t18.serializeAnimationChannels(), Object.assign(n, t18.serializeAnimationOptions())), t18.children.length > 0 && (n.children = t18.children.filter((r) => r.has("named")).map((r) => bo(r, r.name))), n;
  }
  s(bo, "serializeAnimation");
  function mo(t18 = 2, e = 1) {
    let n = 0;
    return { require: ["scale"], update() {
      let r = Math.sin(n * t18) * e;
      r < 0 && this.destroy(), this.scale = v(r), n += te();
    } };
  }
  s(mo, "boom");
  function Aa(t18, e) {
    if (t18 == null) throw new Error("health() requires the initial amount of hp");
    return { id: "health", hurt(n = 1) {
      this.setHP(t18 - n), this.trigger("hurt", n);
    }, heal(n = 1) {
      let r = t18;
      this.setHP(t18 + n), this.trigger("heal", t18 - r);
    }, hp() {
      return t18;
    }, maxHP() {
      return e ?? null;
    }, setMaxHP(n) {
      e = n;
    }, setHP(n) {
      t18 = e ? Math.min(e, n) : n, t18 <= 0 && this.trigger("death");
    }, onHurt(n) {
      return this.on("hurt", n);
    }, onHeal(n) {
      return this.on("heal", n);
    }, onDeath(n) {
      return this.on("death", n);
    }, inspect() {
      return `health: ${t18}`;
    } };
  }
  s(Aa, "health");
  function Sa(t18, e = {}) {
    if (t18 == null) throw new Error("lifespan() requires time");
    let n = e.fade ?? 0;
    return { id: "lifespan", require: ["opacity"], add() {
      c.game.root.wait(t18, () => {
        this.opacity = this.opacity ?? 1, n > 0 ? c.game.root.tween(this.opacity, 0, n, (r) => this.opacity = r, nt.linear).onEnd(() => {
          this.destroy();
        }) : this.destroy();
      });
    } };
  }
  s(Sa, "lifespan");
  function Va(t18) {
    return { id: "named", name: t18 };
  }
  s(Va, "named");
  function Pa(t18, e, n) {
    if (!t18) throw new Error("state() requires an initial state");
    let r = {};
    function o(u) {
      r[u] || (r[u] = { enter: new oe(), end: new oe(), update: new oe(), draw: new oe() });
    }
    s(o, "initStateEvents");
    function i(u, m, d) {
      return o(m), r[m][u].add(d);
    }
    s(i, "on");
    function a(u, m, ...d) {
      o(m), r[m][u].trigger(...d);
    }
    s(a, "trigger");
    let l = false;
    return { id: "state", state: t18, enterState(u, ...m) {
      if (l = true, e && !e.includes(u)) throw new Error(`State not found: ${u}`);
      let d = this.state;
      if (n) {
        if (!n?.[d]) return;
        let C = typeof n[d] == "string" ? [n[d]] : n[d];
        if (!C.includes(u)) throw new Error(`Cannot transition state from "${d}" to "${u}". Available transitions: ${C.map((p) => `"${p}"`).join(", ")}`);
      }
      a("end", d, ...m), this.state = u, a("enter", u, ...m), a("enter", `${d} -> ${u}`, ...m);
    }, onStateTransition(u, m, d) {
      return i("enter", `${u} -> ${m}`, d);
    }, onStateEnter(u, m) {
      return i("enter", u, m);
    }, onStateUpdate(u, m) {
      return i("update", u, m);
    }, onStateDraw(u, m) {
      return i("draw", u, m);
    }, onStateEnd(u, m) {
      return i("end", u, m);
    }, update() {
      l || (a("enter", t18), l = true), a("update", this.state);
    }, draw() {
      a("draw", this.state);
    }, inspect() {
      return `state: ${this.state}`;
    } };
  }
  s(Pa, "state");
  function lr(t18) {
    return { id: "stay", stay: true, scenesToStay: t18 };
  }
  s(lr, "stay");
  function Ga(t18 = true, e) {
    let n, r;
    return { id: "textInput", hasFocus: t18, require: ["text"], typedText: "", add() {
      let o = s(() => {
        this.text = this.typedText.replace(/([\[\\])/g, "\\$1");
      }, "flip");
      n = c.k.onCharInput((i) => {
        this.hasFocus && (!e || this.typedText.length < e) && (c.k.isKeyDown("shift") ? this.typedText += i.toUpperCase() : this.typedText += i, o());
      }), r = c.k.onKeyPressRepeat("backspace", () => {
        this.hasFocus && (this.typedText = this.typedText.slice(0, -1)), o();
      });
    }, destroy() {
      n.cancel(), r.cancel();
    } };
  }
  s(Ga, "textInput");
  function bn(t18 = 1e3) {
    return { id: "timer", maxLoopsPerFrame: t18, loop(e, n, r = -1, o = false) {
      let i = o ? 0 : e, a = new oe(), l = this.onUpdate(() => {
        i += c.app.state.dt;
        for (let u = 0; i >= e && u < this.maxLoopsPerFrame; u++) {
          if (r != -1 && (r--, r < 0)) {
            l.cancel(), a.trigger();
            return;
          }
          n(), i -= e;
        }
      });
      return { get paused() {
        return l.paused;
      }, set paused(u) {
        l.paused = u;
      }, cancel: l.cancel, onEnd: a.add, then(u) {
        return a.add(u), this;
      } };
    }, wait(e, n) {
      return this.loop(e, n ?? (() => {
      }), 1, true);
    }, tween(e, n, r, o, i = nt.linear) {
      let a = 0, l = [], u = this.onUpdate(() => {
        a += c.app.state.dt;
        let m = Math.min(a / r, 1);
        o(fe(e, n, i(m))), m === 1 && (u.cancel(), o(n), l.forEach((d) => d()));
      });
      return { get paused() {
        return u.paused;
      }, set paused(m) {
        u.paused = m;
      }, onEnd(m) {
        l.push(m);
      }, then(m) {
        return this.onEnd(m), this;
      }, cancel() {
        u.cancel();
      }, finish() {
        u.cancel(), o(n), l.forEach((m) => m());
      } };
    } };
  }
  s(bn, "timer");
  var yo = 0;
  function Ma() {
    return yo > 0;
  }
  s(Ma, "usesArea");
  function Ra(t18 = {}) {
    let e = {}, n = /* @__PURE__ */ new Set(), r = [];
    return { id: "area", collisionIgnore: t18.collisionIgnore ?? [], add() {
      yo++, this.area.cursor && r.push(this.onHover(() => c.app.setCursor(this.area.cursor))), r.push(this.onCollideUpdate((o, i) => {
        if (!o.id) throw new Error("area() requires the object to have an id");
        e[o.id] || this.trigger("collide", o, i), i && (e[o.id] = i, n.add(o.id));
      }));
    }, destroy() {
      yo--;
      for (let o of r) o.cancel();
    }, fixedUpdate() {
      for (let o in e) n.has(Number(o)) || (this.trigger("collideEnd", e[o].target), delete e[o]);
      n.clear();
    }, drawInspect() {
      let o = this.localArea();
      be(), Q(this.area.offset);
      let i = { outline: { width: 4 / _n(), color: I(0, 0, 255) }, anchor: this.anchor, fill: false, fixed: at(this) };
      o instanceof $ ? ve({ ...i, pos: o.pos, width: o.width * this.area.scale.x, height: o.height * this.area.scale.y }) : o instanceof ye ? Ge({ ...i, pts: o.pts, scale: this.area.scale }) : o instanceof we && Ue({ ...i, pos: o.center, radius: o.radius }), pe();
    }, area: { shape: t18.shape ?? null, scale: t18.scale ? v(t18.scale) : v(1), offset: t18.offset ?? v(0), cursor: t18.cursor ?? null }, isClicked() {
      return c.app.isMousePressed() && this.isHovering();
    }, isHovering() {
      let o = at(this) ? c.k.mousePos() : c.k.toWorld(c.k.mousePos());
      return this.hasPoint(o);
    }, checkCollision(o) {
      if (!o.id) throw new Error("checkCollision() requires the object to have an id");
      return e[o.id] ?? null;
    }, getCollisions() {
      return Object.values(e);
    }, isColliding(o) {
      if (!o.id) throw new Error("isColliding() requires the object to have an id");
      return !!e[o.id];
    }, isOverlapping(o) {
      if (!o.id) throw new Error("isOverlapping() requires the object to have an id");
      let i = e[o.id];
      return i && i.hasOverlap();
    }, onClick(o, i = "left") {
      let a = c.app.onMousePress(i, () => {
        this.isHovering() && o();
      });
      return r.push(a), a;
    }, onHover(o) {
      let i = false;
      return this.onUpdate(() => {
        i ? i = this.isHovering() : this.isHovering() && (i = true, o());
      });
    }, onHoverUpdate(o) {
      return this.onUpdate(() => {
        this.isHovering() && o();
      });
    }, onHoverEnd(o) {
      let i = false;
      return this.onUpdate(() => {
        i ? this.isHovering() || (i = false, o()) : i = this.isHovering();
      });
    }, onCollide(o, i) {
      if (typeof o == "function" && i === void 0) return this.on("collide", o);
      if (typeof o == "string") return this.onCollide((a, l) => {
        a.is(o) && i?.(a, l);
      });
      throw new Error("onCollide() requires either a function or a tag");
    }, onCollideUpdate(o, i) {
      if (typeof o == "function" && i === void 0) return this.on("collideUpdate", o);
      if (typeof o == "string") return this.on("collideUpdate", (a, l) => a.is(o) && i?.(a, l));
      throw new Error("onCollideUpdate() requires either a function or a tag");
    }, onCollideEnd(o, i) {
      if (typeof o == "function" && i === void 0) return this.on("collideEnd", o);
      if (typeof o == "string") return this.on("collideEnd", (a) => a.is(o) && i?.(a));
      throw new Error("onCollideEnd() requires either a function or a tag");
    }, hasPoint(o) {
      return et(this.worldArea(), o);
    }, resolveCollision(o) {
      let i = this.checkCollision(o);
      i && !i.resolved && (this.pos = this.pos.add(i.displacement), i.resolved = true);
    }, localArea() {
      return this.area.shape ? this.area.shape : this.renderArea();
    }, worldArea() {
      let o = this.localArea();
      if (!(o instanceof ye || o instanceof $)) throw new Error("Only support polygon and rect shapes for now");
      let i = this.transform.clone().translate(this.area.offset).scale(v(this.area.scale ?? 1));
      if (o instanceof $) {
        let a = Ne(this.anchor || mt).add(1, 1).scale(-0.5).scale(o.width, o.height);
        i.translate(a);
      }
      return o.transform(i);
    }, screenArea() {
      let o = this.worldArea();
      return at(this) ? o : o.transform(c.game.cam.transform);
    }, inspect() {
      return this.area.scale?.x == this.area.scale?.y ? `area: ${this.area.scale?.x?.toFixed(1)}x` : `area: (${this.area.scale?.x?.toFixed(1)}x, ${this.area.scale.y?.toFixed(1)}y)`;
    } };
  }
  s(Ra, "area");
  function Da(t18 = {}) {
    let e = null, n = null, r = false, o = v(0), i = null, a = null, l;
    return { id: "body", require: ["pos"], vel: v(0), drag: t18.drag ?? 0, jumpForce: t18.jumpForce ?? ps, gravityScale: t18.gravityScale ?? 1, isStatic: t18.isStatic ?? false, mass: t18.mass ?? 1, add() {
      if (i = this.pos.clone(), a = this.pos.clone(), l = this.pos.clone(), this.mass === 0) throw new Error("Can't set body mass to 0");
      this.has("area") && (this.onCollideUpdate((u, m) => {
        if (!m || !u.has("body") || m.resolved) return;
        this.trigger("beforePhysicsResolve", m);
        let d = m.reverse();
        if (u.trigger("beforePhysicsResolve", d), !(m.resolved || d.resolved) && !(this.isStatic && u.isStatic)) {
          if (!this.isStatic && !u.isStatic) {
            let C = this.mass + u.mass;
            this.pos = this.pos.add(m.displacement.scale(u.mass / C)), u.pos = u.pos.add(m.displacement.scale(-this.mass / C)), this.transform = dt(this), u.transform = dt(u);
          } else {
            let C = !this.isStatic && u.isStatic ? m : m.reverse();
            C.source.pos = C.source.pos.add(C.displacement), C.source.transform = dt(C.source);
          }
          m.resolved = true, this.trigger("physicsResolve", m), u.trigger("physicsResolve", m.reverse());
        }
      }), this.onPhysicsResolve((u) => {
        if (c.game.gravity) if (u.isBottom() && this.isFalling()) {
          this.vel = this.vel.reject(c.game.gravity.unit());
          let m = e;
          e = u.target, m != e && (n = u.target.pos), r ? r = false : m || (this.trigger("ground", e), u.target.trigger("land", this));
        } else u.isTop() && this.isJumping() && (this.vel = this.vel.reject(c.game.gravity.unit()), this.trigger("headbutt", u.target), u.target.trigger("headbutted", this));
      }));
    }, update() {
      e && this.isColliding(e) && e.exists() && e.has("body") && (n && !e.pos.eq(n) && t18.stickToPlatform !== false && this.moveBy(e.pos.sub(n)), n = e.pos);
      let u = un();
      u && (this.pos.x == l.x && (this.pos.x = fe(i.x, a.x, u / an()), l.x = this.pos.x), this.pos.y == l.y && (this.pos.y = fe(i.y, a.y, u / an()), l.y = this.pos.y));
    }, fixedUpdate() {
      if (i && (this.pos.x == l.x && (this.pos.x = i.x), this.pos.y == l.y && (this.pos.y = i.y), i = null), c.game.gravity && !this.isStatic) {
        r && (e = null, n = null, this.trigger("fallOff"), r = false), e && (!this.isColliding(e) || !e.exists() || !e.has("body")) && (r = true);
        let m = this.vel.clone();
        this.vel = this.vel.add(c.game.gravity.scale(this.gravityScale * te()));
        let d = t18.maxVelocity ?? ds;
        this.vel.slen() > d * d && (this.vel = this.vel.unit().scale(d)), m.dot(c.game.gravity) < 0 && this.vel.dot(c.game.gravity) >= 0 && this.trigger("fall");
      }
      if (this.vel.x += o.x * te(), this.vel.y += o.y * te(), this.vel.x *= 1 - this.drag * te(), this.vel.y *= 1 - this.drag * te(), this.move(this.vel), un()) {
        i = this.pos.clone();
        let m = this.vel.add(o.scale(te()));
        a = this.pos.add(m.scale(te())), l = this.pos.clone();
      }
      o.x = 0, o.y = 0;
    }, onPhysicsResolve(u) {
      return this.on("physicsResolve", u);
    }, onBeforePhysicsResolve(u) {
      return this.on("beforePhysicsResolve", u);
    }, curPlatform() {
      return e;
    }, isGrounded() {
      return e !== null;
    }, isFalling() {
      return this.vel.dot(ht()) > 0;
    }, isJumping() {
      return this.vel.dot(ht()) < 0;
    }, applyImpulse(u) {
      this.isStatic || (this.vel = this.vel.add(u));
    }, addForce(u) {
      this.isStatic || (o.x += u.x / this.mass, o.y += u.y / this.mass);
    }, jump(u) {
      this.isStatic || (e = null, n = null, this.vel = ht().scale(-u || -this.jumpForce));
    }, onGround(u) {
      return this.on("ground", u);
    }, onFall(u) {
      return this.on("fall", u);
    }, onFallOff(u) {
      return this.on("fallOff", u);
    }, onHeadbutt(u) {
      return this.on("headbutt", u);
    }, onLand(u) {
      return this.on("land", u);
    }, onHeadbutted(u) {
      return this.on("headbutted", u);
    }, inspect() {
      return `gravityScale: ${this.gravityScale}x`;
    } };
  }
  s(Da, "body");
  function Ba(t18 = 2) {
    let e = t18;
    return { id: "doubleJump", require: ["body"], numJumps: t18, add() {
      this.onGround(() => {
        e = this.numJumps;
      });
    }, doubleJump(n) {
      e <= 0 || (e < this.numJumps && this.trigger("doubleJump"), e--, this.jump(n));
    }, onDoubleJump(n) {
      return this.on("doubleJump", n);
    }, inspect() {
      return `jumpsLeft: ${e}`;
    } };
  }
  s(Ba, "doubleJump");
  function Fa(t18) {
    return { id: "surfaceEffector", require: ["area"], speed: t18.speed, speedVariation: t18.speedVariation ?? 0, forceScale: t18.speedVariation ?? 0.9, add() {
      this.onCollideUpdate("body", (e, n) => {
        let r = n?.normal.normal(), o = e.vel.project(r), a = r?.scale(this.speed)?.sub(o);
        e.addForce(a?.scale(e.mass * this.forceScale));
      });
    } };
  }
  s(Fa, "surfaceEffector");
  function La(t18) {
    return { id: "areaEffector", require: ["area"], useGlobalAngle: t18.useGlobalAngle || false, forceAngle: t18.forceAngle, forceMagnitude: t18.forceMagnitude, forceVariation: t18.forceVariation ?? 0, linearDrag: t18.linearDrag ?? 0, add() {
      this.onCollideUpdate("body", (e, n) => {
        if (!e.has("body")) return;
        let o = E.fromAngle(this.forceAngle).scale(this.forceMagnitude);
        e.addForce(o), this.linearDrag && e.addForce(e.vel.scale(-this.linearDrag));
      });
    } };
  }
  s(La, "areaEffector");
  function ja(t18) {
    return { id: "pointEffector", require: ["area", "pos"], forceMagnitude: t18.forceMagnitude, forceVariation: t18.forceVariation ?? 0, distanceScale: t18.distanceScale ?? 1, forceMode: t18.forceMode || "inverseLinear", linearDrag: t18.linearDrag ?? 0, add() {
      this.onCollideUpdate("body", (e, n) => {
        let r = this.pos.sub(e.pos), o = r.len(), i = o * this.distanceScale / 10, a = this.forceMode === "constant" ? 1 : this.forceMode === "inverseLinear" ? 1 / i : 1 / i ** 2, l = r.scale(this.forceMagnitude * a / o);
        e.addForce(l), this.linearDrag && e.addForce(e.vel.scale(-this.linearDrag));
      });
    } };
  }
  s(ja, "pointEffector");
  function Ka(t18) {
    return { id: "constantForce", require: ["body"], force: t18.force, update() {
      this.force && this.addForce(this.force);
    } };
  }
  s(Ka, "constantForce");
  function Ia(t18) {
    return { id: "platformEffector", require: ["area", "body"], surfaceArc: t18.surfaceArc ?? 180, useOneWay: t18.useOneWay ?? false, add() {
      this.onBeforePhysicsResolve((e) => {
        let n = e.target.vel, o = ht().scale(-1).angleBetween(n);
        Math.abs(o) > this.surfaceArc / 2 && e.preventResolution();
      });
    } };
  }
  s(Ia, "platformEffector");
  function ka(t18) {
    return { id: "buoyancyEffector", require: ["area"], surfaceLevel: t18.surfaceLevel, density: t18.density ?? 1, linearDrag: t18.linearDrag ?? 1, angularDrag: t18.angularDrag ?? 0.2, flowAngle: t18.flowAngle ?? 0, flowMagnitude: t18.flowMagnitude ?? 0, flowVariation: t18.flowVariation ?? 0, add() {
      this.onCollideUpdate("body", (e, n) => {
        let r = e, o = r.worldArea(), [i, a] = o.cut(v(-100, this.surfaceLevel), v(100, this.surfaceLevel));
        i && (this.applyBuoyancy(r, i), this.applyDrag(r, i)), this.flowMagnitude && r.addForce(E.fromAngle(this.flowAngle).scale(this.flowMagnitude));
      });
    }, applyBuoyancy(e, n) {
      let r = this.density * n.area(), o = v(0, 1).scale(-r);
      e.addForce(o);
    }, applyDrag(e, n) {
      let r = e.vel, o = this.density * this.linearDrag, i = r.scale(-o);
      e.addForce(i);
    } };
  }
  s(ka, "buoyancyEffector");
  function gn(t18) {
    if (!t18) throw new Error("Please define an anchor");
    return { id: "anchor", anchor: t18, inspect() {
      return typeof this.anchor == "string" ? "anchor: " + this.anchor : "anchor: " + this.anchor.toString();
    } };
  }
  s(gn, "anchor");
  function ar() {
    return { id: "fixed", fixed: true };
  }
  s(ar, "fixed");
  function _a(t18, e) {
    return { id: "follow", require: ["pos"], follow: { obj: t18, offset: e ?? v(0) }, add() {
      t18.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
    }, update() {
      t18.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
    } };
  }
  s(_a, "follow");
  function Na(t18) {
    let e = c.game.layers?.indexOf(t18);
    return { id: "layer", get layerIndex() {
      return e ?? null;
    }, get layer() {
      return e ? c.game.layers?.[e] ?? null : null;
    }, set layer(n) {
      if (e = c.game.layers?.indexOf(n), e == -1) throw Error("Invalid layer name");
    }, inspect() {
      return `layer: ${this.layer}`;
    } };
  }
  s(Na, "layer");
  function Ua(t18, e) {
    let n = typeof t18 == "number" ? E.fromAngle(t18) : t18.unit();
    return { id: "move", require: ["pos"], update() {
      this.move(n.scale(e));
    } };
  }
  s(Ua, "move");
  function Ha(t18 = {}) {
    let e = t18.distance ?? ms, n = false;
    return { id: "offscreen", require: ["pos"], isOffScreen() {
      let r = this.screenPos();
      if (!r) return false;
      let o = new $(v(0), ae(), ce());
      return !Bt(o, r) && o.sdistToPoint(r) > e * e;
    }, onExitScreen(r) {
      return this.on("exitView", r);
    }, onEnterScreen(r) {
      return this.on("enterView", r);
    }, update() {
      this.isOffScreen() ? (n || (this.trigger("exitView"), n = true), t18.hide && (this.hidden = true), t18.pause && (this.paused = true), t18.destroy && this.destroy()) : (n && (this.trigger("enterView"), n = false), t18.hide && (this.hidden = false), t18.pause && (this.paused = false));
    } };
  }
  s(Ha, "offscreen");
  function Pt(...t18) {
    return { id: "pos", pos: v(...t18), moveBy(...e) {
      this.pos = this.pos.add(v(...e));
    }, move(...e) {
      this.moveBy(v(...e).scale(te()));
    }, moveTo(...e) {
      if (typeof e[0] == "number" && typeof e[1] == "number") return this.moveTo(v(e[0], e[1]), e[2]);
      let n = e[0], r = e[1];
      if (r === void 0) {
        this.pos = v(n);
        return;
      }
      let o = n.sub(this.pos);
      if (o.len() <= r * te()) {
        this.pos = v(n);
        return;
      }
      this.move(o.unit().scale(r));
    }, worldPos(e = null) {
      return e ? (this.pos = this.pos.add(this.fromWorld(e)), null) : this.parent ? this.parent.transform.multVec2(this.pos) : this.pos;
    }, toWorld(e) {
      return this.parent ? this.parent.transform.multVec2(this.pos.add(e)) : this.pos.add(e);
    }, fromWorld(e) {
      return this.parent ? this.parent.transform.invert().multVec2(e).sub(this.pos) : e.sub(this.pos);
    }, screenPos(e = null) {
      if (e) return this.pos = this.pos.add(this.fromScreen(e)), null;
      {
        let n = this.worldPos();
        return n ? at(this) ? n : dn(n) : null;
      }
    }, toScreen(e) {
      let n = this.toWorld(e);
      return at(this) ? n : dn(n);
    }, fromScreen(e) {
      return at(this) ? this.fromWorld(e) : this.fromWorld(sr(e));
    }, toOther(e, n) {
      return e.fromWorld(this.toWorld(n));
    }, fromOther(e, n) {
      return e.toOther(this, n);
    }, inspect() {
      return `pos: (${Math.round(this.pos.x)}x, ${Math.round(this.pos.y)}y)`;
    }, drawInspect() {
      Ue({ color: I(255, 0, 0), radius: 4 / _n() });
    } };
  }
  s(Pt, "pos");
  function qa(t18) {
    return { id: "rotate", angle: t18 ?? 0, rotateBy(e) {
      this.angle += e;
    }, rotateTo(e) {
      this.angle = e;
    }, inspect() {
      return `angle: ${Math.round(this.angle)}`;
    } };
  }
  s(qa, "rotate");
  function Ut(...t18) {
    if (t18.length === 0) return Ut(1);
    let e = v(...t18);
    return { id: "scale", set scale(n) {
      if (!(n instanceof E)) throw Error("The scale property on scale is a vector. Use scaleTo or scaleBy to set the scale with a number.");
      e = v(n);
    }, get scale() {
      return e;
    }, scaleTo(...n) {
      e = v(...n);
    }, scaleBy(...n) {
      e = e.scale(v(...n));
    }, inspect() {
      return e.x == e.y ? `scale: ${e.x.toFixed(1)}x` : `scale: (${e.x.toFixed(1)}x, ${e.y.toFixed(1)}y)`;
    } };
  }
  s(Ut, "scale");
  function za(t18) {
    return { id: "z", z: t18, inspect() {
      return `z: ${this.z}`;
    } };
  }
  s(za, "z");
  var Ya = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOcAAACDCAYAAAB2kQxsAAAAAXNSR0IArs4c6QAABqxJREFUeJztnU1yFDkQRtMEB+AG7Fk6fBPO6ZsQLGc/N5gbMAtosJvqKv2kpPxS763A0W5XSXqVqZ+SngzgF58/fflx/7N///vnacW1gBkFD2Z2LOYNBF3Dx9UXAGs5kxLWwhNxU2qlJHrOhwLfkNZoiaBzIa3dCFJYLXgSboKXmETPeVDQyamR8vX55fe/v37/9vBzCDoH0tqktEpZ+t0IOh4KOBm16euZmETPtVDAiRgRLRF0HRRuEkrFrE1hzR4Lipxj+bD6AqCPz5++/Bgp5tXfdv1CeAdPPmFmSkn0nE+a0drdFm6XiOkdKWEuKRptTXqlLuqqFNaM6Dkb+T5nbb+npo8WjZVinqFantFJk9bWojaRThq7HzKN8wiPJ7aCoJHEZN5zHvJp7RE1DTV6SnZ1fa/PL1MjJtF5HmnT2tJF3GZ/BIj05I8ULUtR6ypER7ogjxpw61rRGxEal4KYjNyORzatbUlHSxr06tFcBTHPiN5NUEJWzlZKG/aKRqYk5tl1IKgPafucZ7w+vxSluLP6olHnL6MQQfYV6bpk/+BRZXm+cXHEiApSipZHlE6tRBDMkxmyysl5VsmtjXiFoJmiZU35ZWK0oNv1OY+omSv0GDDKJCaMI42cHg25dvFCi6QZxVS6ViVSpLUz38A4oiS9ySjlW2althGWKZrN6XNuOVpbwq0ReIzqZhfTrHwE/PZZuEYqcnqO0tZQGxVqRylprLGIEDXNkLOKEakbYsYiiphmiQaEZuD9BghixiKSmGYJIueqBt4TRZEyHtHENCNyNtMaRREzHhHFNBOKnKv7myVcVXKka4WfRBXTjMjpypl8iBmP6MsOmed0Bgk1UHjxXlpORIAWIqeybyGtha1QEdNMRM5s7wLCGpTENBORE6AXNTHNkBM2QFFMM4F5ToX5TYiLqphmRE7YmMhimiEnJEb9XBdJOUlp4Qp1Mc1E5QQ4I/qyvFJCy8n8JnijEjXNAi3fQ0TwIEM6e2OqnAgII8kkptkgOZEQZlN6BquZjqhVFxlBOkZq4Z6WASAFQQ8jZwQJ70FK8CTiaeb3fDSLJyMiwiwiS/q0SkwEBE+85jYjSTpcTiSE2WQRtVlOpAMVemVdtjXmlZxICFlQk/TJjHcmYS96JJ0p6KmcZggKeWmVdPopYwgKuxJVUuQE+EU0Sd99KYICxJH0ry9DUIA/rFy3WyWnGYLCnqyQ9PCXERTgmJmSPvwlBAU4p1bUWklPP1yytA9JYWdGRtLLDyEowDUjomiRwQgKUIZnJC3OgREUoByPSDpkDyEkBfhJj6RNQ7xEUYA6aiS9Cdo8SUoUBaijVtCuFQwICtBGiajdawARFKCNK0HdVtEjKUAd0+Q0q9v/FklhJ1rmP4e8JEoUBejfq2jYNgtEUdgJzwN7u6dSSkBQyMSME7O7FyHUQpoLCqw8rv5o+d6Uw3NvfzjagUkAZvOlLH1lLMyx8wCzWBEhW3ZDmLZ7NTsrwCpmyui5A1+IPidigjcjhZy14/vytBYxwRsPMVcf/2c2QU72wQUVIgj5lqFyIiZEJ5qQb1me1gLMJLKM93wY9cVETYiGkphmg+RETFhJljY2LHICQB/uchI1AXxwlRMxAfwgrYVtUHvxwk1OoiaAL8MjJ2ICtOEip1q6APnJEBS6VwiRzp4vtM5YBvf3m/EeI8DyvUZK33z4+v1bqsZ7dN+3n2W6zwgMO44hY0X1vIqkXh419x7lXh9ds8oyviFyRqmcXrxf2FUtF89ymFkG6nI2p7WZB4FGvUWfLcVt4ahsdy+TR7ifz6lc0F5v0GfalmXldpE3esrr6PrTR84sjNjS4kpQhQhaUi4lD6KR1xK9DHupfoKoR02vSFDy9FWNoKVivv1/lG7OfZkqR043OZUbWgmtFaomaGl51ZTHCnFv5bqNnFGjZvRtEFUEHSHmI1ZHWgVBXZ5+sxvX7ANlPChpjKsknSllKaPlRU4nZo0Yjq6wiIJGFPMML2mj3M8ZRRe4QkzF6FhCJEFbBn4i0iKswn11yenZiLLKeMRqQdWiZSmlkqrcV9d0gPfksAcqBW+2ZqAoq5gZGSrnTtGwlVmCIqUepxWxerj7iIyNZ7SgiKmJhJw7NJpRgiKmLuHl3KnReA4UIaU+y+WkcbzHQ1DEzMGQ9aJH0BDK6RE0y9wlTDp2HuppERQxc0FFBaZGUMTMB5UlQG/fHyk1odJEaBUUMXWh4oSoFRQxtaHyxMi2uBseQwUKciUoYuaAShTlkaCImQcqUph7QREzF/8DSS/2GZ2/N/sAAAAASUVORK5CYII=";
  var Wa = "data:image/png;base64,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";
  var ac = "3001.0.0";
  var c = { k: null, globalOpt: null, gfx: null, game: null, app: null, assets: null, fontCacheCanvas: null, fontCacheC2d: null, debug: null, audio: null, pixelDensity: null, canvas: null, gscale: null, kaSprite: null, boomSprite: null };
  var Xa = s((t18 = { tagsAsComponents: true }) => {
    c.k && (console.warn("KAPLAY already initialized, you are calling kaplay() multiple times, it may lead bugs!"), c.k.quit()), c.globalOpt = t18;
    let e = t18.root ?? document.body;
    e === document.body && (document.body.style.width = "100%", document.body.style.height = "100%", document.body.style.margin = "0px", document.documentElement.style.width = "100%", document.documentElement.style.height = "100%");
    let n = t18.canvas ?? e.appendChild(document.createElement("canvas"));
    c.canvas = n;
    let r = t18.scale ?? 1;
    c.gscale = r;
    let o = t18.width && t18.height && !t18.stretch && !t18.letterbox;
    o ? (n.width = t18.width * r, n.height = t18.height * r) : (n.width = n.parentElement.offsetWidth, n.height = n.parentElement.offsetHeight);
    let i = ["outline: none", "cursor: default"];
    if (o) {
      let L = n.width, U = n.height;
      i.push(`width: ${L}px`), i.push(`height: ${U}px`);
    } else i.push("width: 100%"), i.push("height: 100%");
    t18.crisp && (i.push("image-rendering: pixelated"), i.push("image-rendering: crisp-edges")), n.style.cssText = i.join(";");
    let a = t18.pixelDensity || 1;
    c.pixelDensity = a, n.width *= a, n.height *= a, n.tabIndex = 0;
    let l = document.createElement("canvas");
    l.width = 256, l.height = 256, c.fontCacheCanvas = l;
    let u = l.getContext("2d", { willReadFrequently: true });
    c.fontCacheC2d = u;
    let m = Ps({ canvas: n, touchToMouse: t18.touchToMouse, gamepads: t18.gamepads, pixelDensity: t18.pixelDensity, maxFPS: t18.maxFPS, buttons: t18.buttons });
    c.app = m;
    let d = [], C = m.canvas.getContext("webgl", { antialias: true, depth: true, stencil: true, alpha: true, preserveDrawingBuffer: true });
    if (!C) throw new Error("WebGL not supported");
    let p = C, b = ai(p, { texFilter: t18.texFilter }), f = yi(t18, b);
    c.gfx = f;
    let O = sa();
    c.audio = O;
    let g = qs(b, t18.spriteAtlasPadding ?? 0);
    c.assets = g;
    let y = ea();
    c.game = y, y.root.use(bn());
    function V(L, U) {
      let Y = new st(b, L, U);
      return { clear: s(() => Y.clear(), "clear"), free: s(() => Y.free(), "free"), toDataURL: s(() => Y.toDataURL(), "toDataURL"), toImageData: s(() => Y.toImageData(), "toImageData"), width: Y.width, height: Y.height, draw: s((se) => {
        Oe(), Y.bind(), se(), Oe(), Y.unbind();
      }, "draw"), get fb() {
        return Y;
      } };
    }
    s(V, "makeCanvas");
    function A() {
      p.clear(p.COLOR_BUFFER_BIT), f.frameBuffer.bind(), p.clear(p.COLOR_BUFFER_BIT), f.bgColor || ze(() => {
        it({ width: ae(), height: ce(), quad: new z2(0, 0, ae() / 64, ce() / 64), tex: f.bgTex, fixed: true });
      }), f.renderer.numDraws = 0, f.fixed = false, f.transformStack.length = 0, f.transform = new he();
    }
    s(A, "frameStart");
    function D(L, U) {
      f.postShader = L, f.postShaderUniform = U ?? null;
    }
    s(D, "usePostEffect");
    function G() {
      Oe(), f.lastDrawCalls = f.renderer.numDraws, f.frameBuffer.unbind(), p.viewport(0, 0, p.drawingBufferWidth, p.drawingBufferHeight);
      let L = f.width, U = f.height;
      f.width = p.drawingBufferWidth / a, f.height = p.drawingBufferHeight / a, Vt({ flipY: true, tex: f.frameBuffer.tex, pos: new E(f.viewport.x, f.viewport.y), width: f.viewport.width, height: f.viewport.height, shader: f.postShader, uniform: typeof f.postShaderUniform == "function" ? f.postShaderUniform() : f.postShaderUniform, fixed: true }), Oe(), f.width = L, f.height = U;
    }
    s(G, "frameEnd");
    let x = false, w = { inspect: false, timeScale: 1, showLog: true, fps: s(() => m.fps(), "fps"), numFrames: s(() => m.numFrames(), "numFrames"), stepFrame: Gt, drawCalls: s(() => f.lastDrawCalls, "drawCalls"), clearLog: s(() => y.logs = [], "clearLog"), log: s((...L) => {
      let U = t18.logMax ?? 8, Y = L.length > 1 ? L.concat(" ").join(" ") : L[0];
      y.logs.unshift({ msg: Y, time: m.time() }), y.logs.length > U && (y.logs = y.logs.slice(0, U));
    }, "log"), error: s((L) => w.log(new Error(L.toString ? L.toString() : L)), "error"), curRecording: null, numObjects: s(() => N("*", { recursive: true }).length, "numObjects"), get paused() {
      return x;
    }, set paused(L) {
      x = L, L ? O.ctx.suspend() : O.ctx.resume();
    } };
    c.debug = w;
    function S(L, U) {
      try {
        return JSON.parse(window.localStorage[L]);
      } catch {
        return U ? (M(L, U), U) : null;
      }
    }
    s(S, "getData");
    function M(L, U) {
      window.localStorage[L] = JSON.stringify(U);
    }
    s(M, "setData");
    function R(L, ...U) {
      let Y = L(Xe), se;
      typeof Y == "function" ? se = Y(...U)(Xe) : se = Y;
      for (let xe in se) Xe[xe] = se[xe], t18.global !== false && (window[xe] = se[xe]);
      return Xe;
    }
    s(R, "plug");
    function F(L) {
      let U = m.canvas.captureStream(L), Y = O.ctx.createMediaStreamDestination();
      O.masterNode.connect(Y);
      let se = new MediaRecorder(U), xe = [];
      return se.ondataavailable = (J) => {
        J.data.size > 0 && xe.push(J.data);
      }, se.onerror = () => {
        O.masterNode.disconnect(Y), U.getTracks().forEach((J) => J.stop());
      }, se.start(), { resume() {
        se.resume();
      }, pause() {
        se.pause();
      }, stop() {
        return se.stop(), O.masterNode.disconnect(Y), U.getTracks().forEach((J) => J.stop()), new Promise((J) => {
          se.onstop = () => {
            J(new Blob(xe, { type: "video/mp4" }));
          };
        });
      }, download(J = "kaboom.mp4") {
        this.stop().then((Ce) => Mr(J, Ce));
      } };
    }
    s(F, "record");
    function j() {
      return document.activeElement === m.canvas;
    }
    s(j, "isFocused");
    let H = y.root.add.bind(y.root), q = y.root.readd.bind(y.root), W = y.root.removeAll.bind(y.root), N = y.root.get.bind(y.root), k = y.root.wait.bind(y.root), Z = y.root.loop.bind(y.root), X = y.root.query.bind(y.root), ee = y.root.tween.bind(y.root), Ee = Tt(null, Wa), _ = Tt(null, Ya);
    c.kaSprite = Ee, c.boomSprite = _;
    function gt() {
      y.root.fixedUpdate();
    }
    s(gt, "fixedUpdateFrame");
    function Gt() {
      y.root.update();
    }
    s(Gt, "updateFrame");
    class Ht {
      static {
        s(this, "Collision");
      }
      source;
      target;
      normal;
      distance;
      resolved = false;
      constructor(U, Y, se, xe, J = false) {
        this.source = U, this.target = Y, this.normal = se, this.distance = xe, this.resolved = J;
      }
      get displacement() {
        return this.normal.scale(this.distance);
      }
      reverse() {
        return new Ht(this.target, this.source, this.normal.scale(-1), this.distance, this.resolved);
      }
      hasOverlap() {
        return !this.displacement.isZero();
      }
      isLeft() {
        return this.displacement.cross(y.gravity || v(0, 1)) > 0;
      }
      isRight() {
        return this.displacement.cross(y.gravity || v(0, 1)) < 0;
      }
      isTop() {
        return this.displacement.dot(y.gravity || v(0, 1)) > 0;
      }
      isBottom() {
        return this.displacement.dot(y.gravity || v(0, 1)) < 0;
      }
      preventResolution() {
        this.resolved = true;
      }
    }
    function xn() {
      if (!Ma()) return;
      let L = {}, U = t18.hashGridSize || 64, Y = new he(), se = [];
      function xe(J) {
        if (se.push(Y.clone()), J.pos && Y.translate(J.pos), J.scale && Y.scale(J.scale), J.angle && Y.rotate(J.angle), J.transform = Y.clone(), J.c("area") && !J.paused) {
          let Ce = J, ut = Ce.worldArea().bbox(), dr = Math.floor(ut.pos.x / U), fr = Math.floor(ut.pos.y / U), hr = Math.ceil((ut.pos.x + ut.width) / U), gr = Math.ceil((ut.pos.y + ut.height) / U), wn = /* @__PURE__ */ new Set();
          for (let Qe = dr; Qe <= hr; Qe++) for (let ct = fr; ct <= gr; ct++) if (!L[Qe]) L[Qe] = {}, L[Qe][ct] = [Ce];
          else if (!L[Qe][ct]) L[Qe][ct] = [Ce];
          else {
            let zt = L[Qe][ct];
            e: for (let Ie of zt) {
              if (Ie.paused || !Ie.exists() || wn.has(Ie.id)) continue;
              for (let Je of Ce.collisionIgnore) if (Ie.is(Je)) continue e;
              for (let Je of Ie.collisionIgnore) if (Ce.is(Je)) continue e;
              let Yt = es(Ce.worldArea(), Ie.worldArea());
              if (Yt) {
                let Je = new Ht(Ce, Ie, Yt.normal, Yt.distance);
                Ce.trigger("collideUpdate", Ie, Je);
                let On = Je.reverse();
                On.resolved = Je.resolved, Ie.trigger("collideUpdate", Ce, On);
              }
              wn.add(Ie.id);
            }
            zt.push(Ce);
          }
        }
        J.children.forEach(xe), Y = se.pop();
      }
      s(xe, "checkObj"), xe(y.root);
    }
    s(xn, "checkFrame");
    function vn(L) {
      console.error(L), O.ctx.suspend();
      let U = L.message ?? String(L) ?? "Unknown error, check console for more info";
      m.run(() => {
      }, () => {
        A(), ze(() => {
          let xe = ae(), J = ce(), Ce = { size: 36, width: xe - 32 * 2, letterSpacing: 4, lineSpacing: 4, font: yt, fixed: true };
          ve({ width: xe, height: J, color: I(0, 0, 255), fixed: true });
          let qt = He({ ...Ce, text: "Error", pos: v(32), color: I(255, 128, 0), fixed: true });
          qe(qt), Jr({ ...Ce, text: U, pos: v(32, 32 + qt.height + 16), fixed: true }), pe(), y.events.trigger("error", L);
        }), G();
      });
    }
    s(vn, "handleErr");
    function mr(L) {
      d.push(L);
    }
    s(mr, "onCleanup");
    function pr() {
      y.events.onOnce("frameEnd", () => {
        m.quit(), p.clear(p.COLOR_BUFFER_BIT | p.DEPTH_BUFFER_BIT | p.STENCIL_BUFFER_BIT);
        let L = p.getParameter(p.MAX_TEXTURE_IMAGE_UNITS);
        for (let U = 0; U < L; U++) p.activeTexture(p.TEXTURE0 + U), p.bindTexture(p.TEXTURE_2D, null), p.bindTexture(p.TEXTURE_CUBE_MAP, null);
        p.bindBuffer(p.ARRAY_BUFFER, null), p.bindBuffer(p.ELEMENT_ARRAY_BUFFER, null), p.bindRenderbuffer(p.RENDERBUFFER, null), p.bindFramebuffer(p.FRAMEBUFFER, null), b.destroy(), d.forEach((U) => U());
      });
    }
    s(pr, "quit");
    let Mt = true;
    m.run(() => {
      try {
        g.loaded && (w.paused || gt(), xn());
      } catch (L) {
        vn(L);
      }
    }, (L, U) => {
      try {
        L(), g.loaded || Fe() === 1 && !Mt && (g.loaded = true, Un().forEach((Y) => y.events.trigger("loadError", ...Y)), y.events.trigger("load")), !g.loaded && t18.loadingScreen !== false || Mt ? (A(), fi(), G()) : (w.paused || Gt(), xn(), A(), di(), t18.debug !== false && pi(), G()), Mt && (Mt = false), y.events.trigger("frameEnd"), U();
      } catch (Y) {
        vn(Y);
      }
    }), Jn(), cr();
    let Xe = { _k: c, VERSION: ac, loadRoot: Ns, loadProgress: Fe, loadSprite: Tt, loadSpriteAtlas: Wr, loadSound: oi, loadMusic: si, loadBitmapFont: Js, loadFont: Xs, loadShader: ti, loadShaderURL: ni, loadAseprite: $s, loadPedit: Zs, loadBean: Ws, loadJSON: Us, load: ln, getSound: Yr, getFont: Hr, getBitmapFont: Hn, getSprite: _r, getShader: zr, getAsset: Hs, Asset: le, SpriteData: Le, SoundData: ot, width: ae, height: ce, center: wt, dt: te, fixedDt: an, restDt: un, time: m.time, screenshot: m.screenshot, record: F, isFocused: j, setCursor: m.setCursor, getCursor: m.getCursor, setCursorLocked: m.setCursorLocked, isCursorLocked: m.isCursorLocked, setFullscreen: m.setFullscreen, isFullscreen: m.isFullscreen, isTouchscreen: m.isTouchscreen, onLoad: Nt, onLoadError: zi, onLoading: Ui, onResize: Hi, onGamepadConnect: m.onGamepadConnect, onGamepadDisconnect: m.onGamepadDisconnect, onError: qi, onCleanup: mr, flash: uo, setCamPos: no, getCamPos: ro, setCamRot: io, getCamRot: ao, setCamScale: oo, getCamScale: so, getCamTransform: Yi, camPos: Xi, camScale: Qi, camFlash: Zi, camRot: Ji, camTransform: Wi, shake: $i, toScreen: dn, toWorld: sr, setGravity: ta, getGravity: na, setGravityDirection: ra, getGravityDirection: ht, setBackground: Ls, getBackground: js, getGamepads: m.getGamepads, getTreeRoot: da, add: H, make: fn, destroy: ir, destroyAll: W, get: N, query: X, readd: q, pos: Pt, scale: Ut, rotate: qa, color: Zn, opacity: er, anchor: gn, area: Ra, sprite: hn, text: ya, polygon: Ti, rect: nr, circle: xi, uvquad: xa, outline: Oi, particles: Ei, body: Da, platformEffector: Ia, surfaceEffector: Fa, areaEffector: La, pointEffector: ja, buoyancyEffector: ka, constantForce: Ka, doubleJump: Ba, shader: Ai, textInput: Ga, timer: bn, fixed: ar, stay: lr, health: Aa, lifespan: Sa, named: Va, state: Pa, z: za, layer: Na, move: Ua, offscreen: Ha, follow: _a, fadeIn: Ci, mask: wi, drawon: vi, raycast: tr, tile: rr, animate: Ta, serializeAnimation: bo, agent: va, sentry: Oa, patrol: wa, pathfinder: Ca, trigger: Vi, on: Me, onFixedUpdate: Pi, onUpdate: Gi, onDraw: Mi, onAdd: eo, onDestroy: Ri, onTag: to, onUntag: Fi, onUse: Di, onUnuse: Bi, onClick: Ii, onCollide: Li, onCollideUpdate: ji, onCollideEnd: Ki, onHover: ki, onHoverUpdate: _i, onHoverEnd: Ni, onKeyDown: m.onKeyDown, onKeyPress: m.onKeyPress, onKeyPressRepeat: m.onKeyPressRepeat, onKeyRelease: m.onKeyRelease, onMouseDown: m.onMouseDown, onMousePress: m.onMousePress, onMouseRelease: m.onMouseRelease, onMouseMove: m.onMouseMove, onCharInput: m.onCharInput, onTouchStart: m.onTouchStart, onTouchMove: m.onTouchMove, onTouchEnd: m.onTouchEnd, onScroll: m.onScroll, onHide: m.onHide, onShow: m.onShow, onGamepadButtonDown: m.onGamepadButtonDown, onGamepadButtonPress: m.onGamepadButtonPress, onGamepadButtonRelease: m.onGamepadButtonRelease, onGamepadStick: m.onGamepadStick, onButtonPress: m.onButtonPress, onButtonDown: m.onButtonDown, onButtonRelease: m.onButtonRelease, mousePos: Nn, mouseDeltaPos: m.mouseDeltaPos, isKeyDown: m.isKeyDown, isKeyPressed: m.isKeyPressed, isKeyPressedRepeat: m.isKeyPressedRepeat, isKeyReleased: m.isKeyReleased, isMouseDown: m.isMouseDown, isMousePressed: m.isMousePressed, isMouseReleased: m.isMouseReleased, isMouseMoved: m.isMouseMoved, isGamepadButtonPressed: m.isGamepadButtonPressed, isGamepadButtonDown: m.isGamepadButtonDown, isGamepadButtonReleased: m.isGamepadButtonReleased, getGamepadStick: m.getGamepadStick, isButtonPressed: m.isButtonPressed, isButtonDown: m.isButtonDown, isButtonReleased: m.isButtonReleased, setButton: m.setButton, getButton: m.getButton, pressButton: m.pressButton, releaseButton: m.releaseButton, getLastInputDeviceType: m.getLastInputDeviceType, charInputted: m.charInputted, loop: Z, wait: k, play: aa, setVolume: co, getVolume: lo, volume: ua, burp: ur, audioCtx: O.ctx, Line: Te, Rect: $, Circle: we, Ellipse: ke, Point: An, Polygon: ye, Vec2: E, Color: K, Mat4: he, Quad: z2, RNG: Xt, rand: ge, randi: wr, randSeed: Vo, vec2: v, rgb: I, hsl2rgb: To, quad: me, choose: Mo, chooseMultiple: Go, shuffle: Or, chance: Po, lerp: fe, tween: ee, easings: nt, map: Ve, mapc: So, wave: Sn, deg2rad: ue, rad2deg: lt, clamp: Se, evaluateQuadratic: ko, evaluateQuadraticFirstDerivative: _o, evaluateQuadraticSecondDerivative: No, evaluateBezier: Jt, evaluateBezierFirstDerivative: Uo, evaluateBezierSecondDerivative: Ho, evaluateCatmullRom: qo, evaluateCatmullRomFirstDerivative: zo, curveLengthApproximation: Vr, normalizedCurve: Yo, hermite: Lt, cardinal: Pr, catmullRom: jt, bezier: Wo, kochanekBartels: $o, easingSteps: Zo, easingLinear: Qo, easingCubicBezier: Jo, testLineLine: Vn, testRectRect: Er, testRectLine: Pn, testRectPoint: Bt, testCirclePolygon: Qt, testLinePoint: Gn, testLineCircle: Ft, isConvex: ns, triangulate: Rn, NavMesh: kn, drawSprite: gi, drawText: Jr, formatText: He, drawRect: ve, drawLine: _t, drawLines: kt, drawTriangle: Xn, drawCircle: Ue, drawEllipse: zn, drawUVQuad: it, drawPolygon: Ge, drawCurve: Yn, drawBezier: ii, drawFormattedText: qe, drawMasked: hi, drawSubtracted: bi, pushTransform: be, popTransform: pe, pushTranslate: Q, pushScale: rt, pushRotate: $e, pushMatrix: Ks, usePostEffect: D, makeCanvas: V, debug: w, scene: fa, getSceneName: ba, go: ha, onSceneLeave: ga, layers: pa, getLayers: la, setLayers: po, getDefaultLayer: ma, addLevel: Si, getData: S, setData: M, download: Fn, downloadJSON: ys, downloadText: Gr, downloadBlob: Mr, plug: R, ASCII_CHARS: Dn, canvas: m.canvas, addKaboom: ca, LEFT: E.LEFT, RIGHT: E.RIGHT, UP: E.UP, DOWN: E.DOWN, RED: K.RED, GREEN: K.GREEN, BLUE: K.BLUE, YELLOW: K.YELLOW, MAGENTA: K.MAGENTA, CYAN: K.CYAN, WHITE: K.WHITE, BLACK: K.BLACK, quit: pr, KEvent: oe, KEventHandler: Ye, KEventController: _e, cancel: s(() => Bn, "cancel") };
    c.k = Xe;
    let Cn = t18.plugins;
    if (Cn && Cn.forEach(R), t18.global !== false) for (let L in Xe) window[L] = Xe[L];
    return t18.focus !== false && m.canvas.focus(), Xe;
  }, "kaplay");
  var E2 = Xa;

  // public/game/src/game.js
  var gun = window.gun;
  console.log("Gun is: ", gun);
  E2({
    global: true,
    // Make Kaboom functions globally available
    width: 1200,
    // Game width
    height: 600,
    // Game height
    canvas: document.querySelector("#game_container")
    // Attach to the container
  });
  loadSprite("singleBox", "/game/assets/sprites/singleBox.png");
  loadSprite("singleSpike", "/game/assets/sprites/singleSpike.png");
  loadSprite("tripleSpike", "/game/assets/sprites/tripleSpike.png");
  loadSprite("bg", "/game/assets/bg/bg.png");
  scene("start", () => {
    add([
      sprite("bg", { width: width(), height: height() }),
      pos(0, 0),
      z(-10)
    ]);
    add([
      text("Press SPACE to Start", 24),
      pos(center()),
      anchor("center")
    ]);
    onKeyPress("space", () => go("game"));
  });
  scene("game", () => {
    setGravity(1200);
    let score = 0;
    const scoreLabel = add([
      text(`Score: ${score}`, { size: 24 }),
      pos(width() - 200, 24),
      fixed(),
      // keeps it in the same place on screen
      z(100)
      // stays on top of other elements
    ]);
    loop(1, () => {
      score += 1;
      scoreLabel.text = `Score: ${score}`;
    });
    const bg1 = add([
      sprite("bg", { width: width(), height: height() }),
      pos(0, 0),
      z(-10)
    ]);
    const bg2 = add([
      sprite("bg", { width: width(), height: height() }),
      pos(width(), 0),
      z(-10)
    ]);
    onUpdate(() => {
      const speed = 100;
      bg1.move(-speed, 0);
      bg2.move(-speed, 0);
      if (bg1.pos.x <= -width()) {
        bg1.pos.x = bg2.pos.x + width();
      }
      if (bg2.pos.x <= -width()) {
        bg2.pos.x = bg1.pos.x + width();
      }
    });
    function jumpAndSpin(player2) {
      if (player2.isGrounded()) {
        player2.jump();
        player2.angle = 0;
        tween(
          0,
          360,
          1.2,
          // duration in seconds
          (angle) => player2.angle = angle,
          easings.easeInOutCubic
        );
      }
    }
    add([
      rect(width(), 48),
      outline(4),
      area(),
      pos(0, height() - 48),
      body({ isStatic: true })
    ]);
    const player = add([
      sprite("singleBox"),
      pos(200, 200),
      anchor("center"),
      scale(5),
      area(),
      body(),
      "player"
    ]);
    add([
      rect(width(), 48),
      outline(4),
      area(),
      pos(0, height() - 48),
      body({ isStatic: true })
    ]);
    function makePolygonSpike(spawnX, spawnY, speed) {
      const hitbox1 = add([
        pos(spawnX, spawnY),
        polygon([
          vec2(0, 22),
          // bottom-left
          vec2(11, 0),
          // top-center
          vec2(22, 22)
          // bottom-right
        ]),
        area(),
        scale(10),
        body(),
        anchor("center"),
        scale(3),
        "spike",
        { speed }
      ]);
      return hitbox1;
    }
    function makeFalseSpike(spawnX, spawnY, speed) {
      const hitbox2 = add([
        sprite("singleSpike"),
        pos(spawnX, spawnY),
        area(),
        body(),
        scale(0.035),
        anchor("center"),
        "spike",
        { speed }
      ]);
      return hitbox2;
    }
    function makeFalseTripleSpike(spawnX, spawnY, speed) {
      const hitbox3 = add([
        sprite("tripleSpike"),
        pos(spawnX, spawnY),
        area(),
        body(),
        scale(5),
        anchor("center"),
        "spike",
        { speed }
      ]);
      return hitbox3;
    }
    function makeFlyingSpike(spawnX, spawnY, speed) {
      const hitbox4 = add([
        pos(spawnX, spawnY),
        area(),
        body({ isStatic: true }),
        anchor("center"),
        polygon([
          vec2(-33, 11),
          vec2(22, 22),
          vec2(22, 0)
        ]),
        "spike",
        { speed }
      ]);
    }
    function makeJumpPlatform(spawnX, spawnY, speed) {
      const platform = add([
        rect(100, 10),
        body({ isStatic: true }),
        pos(spawnX - 200, spawnY),
        area(),
        anchor("center"),
        "platform",
        { speed }
      ]);
      return platform;
    }
    onKeyPress("space", () => {
      if (player.isGrounded()) {
        jumpAndSpin(player);
      }
    });
    loop(3, () => {
      const spawnX = width() + 20;
      const spawnY = height() - 120;
      const speed = 360;
      const determinator = rand(0, 3);
      console.log(Math.floor(determinator));
      switch (Math.floor(determinator)) {
        case 0:
          makeFalseTripleSpike(spawnX, spawnY, speed);
          break;
        case 1:
          makeFalseSpike(spawnX, spawnY, speed);
          break;
        case 2:
          makePolygonSpike(spawnX, spawnY, speed);
          break;
      }
      if (chance(0.4)) {
        makeJumpPlatform(spawnX, spawnY - 50, speed);
      }
    });
    player.onCollide("spike", () => {
      console.clear();
      const username = localStorage.getItem("username") || "anon";
      gun.get("tempScores").get(username).once((prevScore) => {
        if (!prevScore || score > prevScore) {
          gun.get("tempScores").get(username).put(score);
          console.log(`\u{1F3C6} New top score for ${username}: ${score}`);
        } else {
          console.log(`\u2139\uFE0F Score ${score} not higher than previous: ${prevScore}`);
        }
      });
      console.log("Score saved:", score);
      addKaboom(player.pos);
      player.destroy();
      go("start");
    });
    player.onCollide("platform", (platform) => {
      platform.speed -= 100;
      if (chance(0.5)) {
        makeFlyingSpike(width() + 20, height() - 220, 400);
        score += 2;
      }
    });
    onUpdate("player", (player2) => {
      if (player2.pos.x < 0) {
        player2.pos.x = 200;
      }
      if (player2.pos.x > width()) {
        console.clear();
        addKaboom(player2.pos);
        player2.destroy();
        go("start");
      }
    });
    onUpdate("spike", (spike) => {
      spike.move(-spike.speed, 0);
      if (spike.pos.x < -30) {
        destroy(spike);
      }
    });
    onUpdate("platform", (platform) => {
      platform.move(-platform.speed, 0);
      if (platform.pos.x < -30) {
        destroy(platform);
      }
    });
  });
  go("start");
})();
