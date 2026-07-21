/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const St = "srgb", Pn = "srgb-linear", xi = "linear", qe = "srgb";
const gr = "300 es";
class Dn {
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
  }
  hasEventListener(e, t) {
    if (this._listeners === void 0) return !1;
    const n = this._listeners;
    return n[e] !== void 0 && n[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    if (this._listeners === void 0) return;
    const r = this._listeners[e];
    if (r !== void 0) {
      const s = r.indexOf(t);
      s !== -1 && r.splice(s, 1);
    }
  }
  dispatchEvent(e) {
    if (this._listeners === void 0) return;
    const n = this._listeners[e.type];
    if (n !== void 0) {
      e.target = this;
      const r = n.slice(0);
      for (let s = 0, a = r.length; s < a; s++)
        r[s].call(this, e);
      e.target = null;
    }
  }
}
const ct = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], yi = Math.PI / 180, Qi = 180 / Math.PI;
function Wn() {
  const i = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (ct[i & 255] + ct[i >> 8 & 255] + ct[i >> 16 & 255] + ct[i >> 24 & 255] + "-" + ct[e & 255] + ct[e >> 8 & 255] + "-" + ct[e >> 16 & 15 | 64] + ct[e >> 24 & 255] + "-" + ct[t & 63 | 128] + ct[t >> 8 & 255] + "-" + ct[t >> 16 & 255] + ct[t >> 24 & 255] + ct[n & 255] + ct[n >> 8 & 255] + ct[n >> 16 & 255] + ct[n >> 24 & 255]).toLowerCase();
}
function gt(i, e, t) {
  return Math.max(e, Math.min(t, i));
}
function Gs(i, e) {
  return (i % e + e) % e;
}
function Ti(i, e, t) {
  return (1 - t) * i + t * e;
}
function Nn(i, e) {
  switch (e.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function _t(i, e) {
  switch (e.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
class Ie {
  constructor(e = 0, t = 0) {
    Ie.prototype.isVector2 = !0, this.x = e, this.y = t;
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, t) {
    return this.x = e, this.y = t, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    const t = this.x, n = this.y, r = e.elements;
    return this.x = r[0] * t + r[3] * n + r[6], this.y = r[1] * t + r[4] * n + r[7], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(gt(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y;
    return t * t + n * n;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this;
  }
  rotateAround(e, t) {
    const n = Math.cos(t), r = Math.sin(t), s = this.x - e.x, a = this.y - e.y;
    return this.x = s * n - a * r + e.x, this.y = s * r + a * n + e.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class Ce {
  constructor(e, t, n, r, s, a, o, l, c) {
    Ce.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, r, s, a, o, l, c);
  }
  set(e, t, n, r, s, a, o, l, c) {
    const h = this.elements;
    return h[0] = e, h[1] = r, h[2] = o, h[3] = t, h[4] = s, h[5] = l, h[6] = n, h[7] = a, h[8] = c, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this;
  }
  extractBasis(e, t, n) {
    return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[4],
      t[8],
      t[1],
      t[5],
      t[9],
      t[2],
      t[6],
      t[10]
    ), this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements, r = t.elements, s = this.elements, a = n[0], o = n[3], l = n[6], c = n[1], h = n[4], d = n[7], f = n[2], m = n[5], M = n[8], E = r[0], p = r[3], u = r[6], A = r[1], y = r[4], v = r[7], I = r[2], b = r[5], R = r[8];
    return s[0] = a * E + o * A + l * I, s[3] = a * p + o * y + l * b, s[6] = a * u + o * v + l * R, s[1] = c * E + h * A + d * I, s[4] = c * p + h * y + d * b, s[7] = c * u + h * v + d * R, s[2] = f * E + m * A + M * I, s[5] = f * p + m * y + M * b, s[8] = f * u + m * v + M * R, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], s = e[3], a = e[4], o = e[5], l = e[6], c = e[7], h = e[8];
    return t * a * h - t * o * c - n * s * h + n * o * l + r * s * c - r * a * l;
  }
  invert() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], s = e[3], a = e[4], o = e[5], l = e[6], c = e[7], h = e[8], d = h * a - o * c, f = o * l - h * s, m = c * s - a * l, M = t * d + n * f + r * m;
    if (M === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const E = 1 / M;
    return e[0] = d * E, e[1] = (r * c - h * n) * E, e[2] = (o * n - r * a) * E, e[3] = f * E, e[4] = (h * t - r * l) * E, e[5] = (r * s - o * t) * E, e[6] = m * E, e[7] = (n * l - c * t) * E, e[8] = (a * t - n * s) * E, this;
  }
  transpose() {
    let e;
    const t = this.elements;
    return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    const t = this.elements;
    return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
  }
  setUvTransform(e, t, n, r, s, a, o) {
    const l = Math.cos(s), c = Math.sin(s);
    return this.set(
      n * l,
      n * c,
      -n * (l * a + c * o) + a + e,
      -r * c,
      r * l,
      -r * (-c * a + l * o) + o + t,
      0,
      0,
      1
    ), this;
  }
  //
  scale(e, t) {
    return this.premultiply(Ai.makeScale(e, t)), this;
  }
  rotate(e) {
    return this.premultiply(Ai.makeRotation(-e)), this;
  }
  translate(e, t) {
    return this.premultiply(Ai.makeTranslation(e, t)), this;
  }
  // for 2D Transforms
  makeTranslation(e, t) {
    return e.isVector2 ? this.set(
      1,
      0,
      e.x,
      0,
      1,
      e.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      e,
      0,
      1,
      t,
      0,
      0,
      1
    ), this;
  }
  makeRotation(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      n,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, t) {
    return this.set(
      e,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  //
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let r = 0; r < 9; r++)
      if (t[r] !== n[r]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 9; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const Ai = /* @__PURE__ */ new Ce();
function gs(i) {
  for (let e = i.length - 1; e >= 0; --e)
    if (i[e] >= 65535) return !0;
  return !1;
}
function vi(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function zs() {
  const i = vi("canvas");
  return i.style.display = "block", i;
}
const vr = {};
function Hn(i) {
  i in vr || (vr[i] = !0, console.warn(i));
}
function Vs(i, e, t) {
  return new Promise(function(n, r) {
    function s() {
      switch (i.clientWaitSync(e, i.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case i.WAIT_FAILED:
          r();
          break;
        case i.TIMEOUT_EXPIRED:
          setTimeout(s, t);
          break;
        default:
          n();
      }
    }
    setTimeout(s, t);
  });
}
function Hs(i) {
  const e = i.elements;
  e[2] = 0.5 * e[2] + 0.5 * e[3], e[6] = 0.5 * e[6] + 0.5 * e[7], e[10] = 0.5 * e[10] + 0.5 * e[11], e[14] = 0.5 * e[14] + 0.5 * e[15];
}
function ks(i) {
  const e = i.elements;
  e[11] === -1 ? (e[10] = -e[10] - 1, e[14] = -e[14]) : (e[10] = -e[10], e[14] = -e[14] + 1);
}
const ze = {
  enabled: !0,
  workingColorSpace: Pn,
  /**
   * Implementations of supported color spaces.
   *
   * Required:
   *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]
   *	- whitePoint: reference white [ x y ]
   *	- transfer: transfer function (pre-defined)
   *	- toXYZ: Matrix3 RGB to XYZ transform
   *	- fromXYZ: Matrix3 XYZ to RGB transform
   *	- luminanceCoefficients: RGB luminance coefficients
   *
   * Optional:
   *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace }
   *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }
   *
   * Reference:
   * - https://www.russellcottrell.com/photo/matrixCalculator.htm
   */
  spaces: {},
  convert: function(i, e, t) {
    return this.enabled === !1 || e === t || !e || !t || (this.spaces[e].transfer === qe && (i.r = Xt(i.r), i.g = Xt(i.g), i.b = Xt(i.b)), this.spaces[e].primaries !== this.spaces[t].primaries && (i.applyMatrix3(this.spaces[e].toXYZ), i.applyMatrix3(this.spaces[t].fromXYZ)), this.spaces[t].transfer === qe && (i.r = wn(i.r), i.g = wn(i.g), i.b = wn(i.b))), i;
  },
  fromWorkingColorSpace: function(i, e) {
    return this.convert(i, this.workingColorSpace, e);
  },
  toWorkingColorSpace: function(i, e) {
    return this.convert(i, e, this.workingColorSpace);
  },
  getPrimaries: function(i) {
    return this.spaces[i].primaries;
  },
  getTransfer: function(i) {
    return i === "" ? xi : this.spaces[i].transfer;
  },
  getLuminanceCoefficients: function(i, e = this.workingColorSpace) {
    return i.fromArray(this.spaces[e].luminanceCoefficients);
  },
  define: function(i) {
    Object.assign(this.spaces, i);
  },
  // Internal APIs
  _getMatrix: function(i, e, t) {
    return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ);
  },
  _getDrawingBufferColorSpace: function(i) {
    return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace;
  },
  _getUnpackColorSpace: function(i = this.workingColorSpace) {
    return this.spaces[i].workingColorSpaceConfig.unpackColorSpace;
  }
};
function Xt(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function wn(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
const xr = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], Mr = [0.2126, 0.7152, 0.0722], Sr = [0.3127, 0.329], Er = /* @__PURE__ */ new Ce().set(
  0.4123908,
  0.3575843,
  0.1804808,
  0.212639,
  0.7151687,
  0.0721923,
  0.0193308,
  0.1191948,
  0.9505322
), yr = /* @__PURE__ */ new Ce().set(
  3.2409699,
  -1.5373832,
  -0.4986108,
  -0.9692436,
  1.8759675,
  0.0415551,
  0.0556301,
  -0.203977,
  1.0569715
);
ze.define({
  [Pn]: {
    primaries: xr,
    whitePoint: Sr,
    transfer: xi,
    toXYZ: Er,
    fromXYZ: yr,
    luminanceCoefficients: Mr,
    workingColorSpaceConfig: { unpackColorSpace: St },
    outputColorSpaceConfig: { drawingBufferColorSpace: St }
  },
  [St]: {
    primaries: xr,
    whitePoint: Sr,
    transfer: qe,
    toXYZ: Er,
    fromXYZ: yr,
    luminanceCoefficients: Mr,
    outputColorSpaceConfig: { drawingBufferColorSpace: St }
  }
});
let pn;
class Ws {
  static getDataURL(e) {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
      return e.src;
    let t;
    if (e instanceof HTMLCanvasElement)
      t = e;
    else {
      pn === void 0 && (pn = vi("canvas")), pn.width = e.width, pn.height = e.height;
      const n = pn.getContext("2d");
      e instanceof ImageData ? n.putImageData(e, 0, 0) : n.drawImage(e, 0, 0, e.width, e.height), t = pn;
    }
    return t.width > 2048 || t.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e), t.toDataURL("image/jpeg", 0.6)) : t.toDataURL("image/png");
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = vi("canvas");
      t.width = e.width, t.height = e.height;
      const n = t.getContext("2d");
      n.drawImage(e, 0, 0, e.width, e.height);
      const r = n.getImageData(0, 0, e.width, e.height), s = r.data;
      for (let a = 0; a < s.length; a++)
        s[a] = Xt(s[a] / 255) * 255;
      return n.putImageData(r, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let n = 0; n < t.length; n++)
        t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(Xt(t[n] / 255) * 255) : t[n] = Xt(t[n]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}
let Xs = 0;
class vs {
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Xs++ }), this.uuid = Wn(), this.data = e, this.dataReady = !0, this.version = 0;
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0)
      return e.images[this.uuid];
    const n = {
      uuid: this.uuid,
      url: ""
    }, r = this.data;
    if (r !== null) {
      let s;
      if (Array.isArray(r)) {
        s = [];
        for (let a = 0, o = r.length; a < o; a++)
          r[a].isDataTexture ? s.push(bi(r[a].image)) : s.push(bi(r[a]));
      } else
        s = bi(r);
      n.url = s;
    }
    return t || (e.images[this.uuid] = n), n;
  }
}
function bi(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? Ws.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let qs = 0;
class pt extends Dn {
  constructor(e = pt.DEFAULT_IMAGE, t = pt.DEFAULT_MAPPING, n = 1001, r = 1001, s = 1006, a = 1008, o = 1023, l = 1009, c = pt.DEFAULT_ANISOTROPY, h = "") {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: qs++ }), this.uuid = Wn(), this.name = "", this.source = new vs(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = n, this.wrapT = r, this.magFilter = s, this.minFilter = a, this.anisotropy = c, this.format = o, this.internalFormat = null, this.type = l, this.offset = new Ie(0, 0), this.repeat = new Ie(1, 1), this.center = new Ie(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Ce(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.pmremVersion = 0;
  }
  get image() {
    return this.source.data;
  }
  set image(e = null) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.textures[this.uuid] !== void 0)
      return e.textures[this.uuid];
    const n = {
      metadata: {
        version: 4.6,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(e) {
    if (this.mapping !== 300) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1)
      switch (this.wrapS) {
        case 1e3:
          e.x = e.x - Math.floor(e.x);
          break;
        case 1001:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case 1002:
          Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case 1e3:
          e.y = e.y - Math.floor(e.y);
          break;
        case 1001:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case 1002:
          Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
          break;
      }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  set needsUpdate(e) {
    e === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  set needsPMREMUpdate(e) {
    e === !0 && this.pmremVersion++;
  }
}
pt.DEFAULT_IMAGE = null;
pt.DEFAULT_MAPPING = 300;
pt.DEFAULT_ANISOTROPY = 1;
class tt {
  constructor(e = 0, t = 0, n = 0, r = 1) {
    tt.prototype.isVector4 = !0, this.x = e, this.y = t, this.z = n, this.w = r;
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, t, n, r) {
    return this.x = e, this.y = t, this.z = n, this.w = r, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setW(e) {
    return this.w = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  applyMatrix4(e) {
    const t = this.x, n = this.y, r = this.z, s = this.w, a = e.elements;
    return this.x = a[0] * t + a[4] * n + a[8] * r + a[12] * s, this.y = a[1] * t + a[5] * n + a[9] * r + a[13] * s, this.z = a[2] * t + a[6] * n + a[10] * r + a[14] * s, this.w = a[3] * t + a[7] * n + a[11] * r + a[15] * s, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const t = Math.sqrt(1 - e.w * e.w);
    return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
  }
  setAxisAngleFromRotationMatrix(e) {
    let t, n, r, s;
    const l = e.elements, c = l[0], h = l[4], d = l[8], f = l[1], m = l[5], M = l[9], E = l[2], p = l[6], u = l[10];
    if (Math.abs(h - f) < 0.01 && Math.abs(d - E) < 0.01 && Math.abs(M - p) < 0.01) {
      if (Math.abs(h + f) < 0.1 && Math.abs(d + E) < 0.1 && Math.abs(M + p) < 0.1 && Math.abs(c + m + u - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const y = (c + 1) / 2, v = (m + 1) / 2, I = (u + 1) / 2, b = (h + f) / 4, R = (d + E) / 4, C = (M + p) / 4;
      return y > v && y > I ? y < 0.01 ? (n = 0, r = 0.707106781, s = 0.707106781) : (n = Math.sqrt(y), r = b / n, s = R / n) : v > I ? v < 0.01 ? (n = 0.707106781, r = 0, s = 0.707106781) : (r = Math.sqrt(v), n = b / r, s = C / r) : I < 0.01 ? (n = 0.707106781, r = 0.707106781, s = 0) : (s = Math.sqrt(I), n = R / s, r = C / s), this.set(n, r, s, t), this;
    }
    let A = Math.sqrt((p - M) * (p - M) + (d - E) * (d - E) + (f - h) * (f - h));
    return Math.abs(A) < 1e-3 && (A = 1), this.x = (p - M) / A, this.y = (d - E) / A, this.z = (f - h) / A, this.w = Math.acos((c + m + u - 1) / 2), this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this.w = Math.max(e.w, Math.min(t.w, this.w)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this.w = Math.max(e, Math.min(t, this.w)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class Ys extends Dn {
  constructor(e = 1, t = 1, n = {}) {
    super(), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = 1, this.scissor = new tt(0, 0, e, t), this.scissorTest = !1, this.viewport = new tt(0, 0, e, t);
    const r = { width: e, height: t, depth: 1 };
    n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: 1006,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1
    }, n);
    const s = new pt(r, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace);
    s.flipY = !1, s.generateMipmaps = n.generateMipmaps, s.internalFormat = n.internalFormat, this.textures = [];
    const a = n.count;
    for (let o = 0; o < a; o++)
      this.textures[o] = s.clone(), this.textures[o].isRenderTargetTexture = !0;
    this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this.depthTexture = n.depthTexture, this.samples = n.samples;
  }
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  setSize(e, t, n = 1) {
    if (this.width !== e || this.height !== t || this.depth !== n) {
      this.width = e, this.height = t, this.depth = n;
      for (let r = 0, s = this.textures.length; r < s; r++)
        this.textures[r].image.width = e, this.textures[r].image.height = t, this.textures[r].image.depth = n;
      this.dispose();
    }
    this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
    for (let n = 0, r = e.textures.length; n < r; n++)
      this.textures[n] = e.textures[n].clone(), this.textures[n].isRenderTargetTexture = !0;
    const t = Object.assign({}, e.texture.image);
    return this.texture.source = new vs(t), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class dn extends Ys {
  constructor(e = 1, t = 1, n = {}) {
    super(e, t, n), this.isWebGLRenderTarget = !0;
  }
}
class xs extends pt {
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class Ks extends pt {
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class Xn {
  constructor(e = 0, t = 0, n = 0, r = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = r;
  }
  static slerpFlat(e, t, n, r, s, a, o) {
    let l = n[r + 0], c = n[r + 1], h = n[r + 2], d = n[r + 3];
    const f = s[a + 0], m = s[a + 1], M = s[a + 2], E = s[a + 3];
    if (o === 0) {
      e[t + 0] = l, e[t + 1] = c, e[t + 2] = h, e[t + 3] = d;
      return;
    }
    if (o === 1) {
      e[t + 0] = f, e[t + 1] = m, e[t + 2] = M, e[t + 3] = E;
      return;
    }
    if (d !== E || l !== f || c !== m || h !== M) {
      let p = 1 - o;
      const u = l * f + c * m + h * M + d * E, A = u >= 0 ? 1 : -1, y = 1 - u * u;
      if (y > Number.EPSILON) {
        const I = Math.sqrt(y), b = Math.atan2(I, u * A);
        p = Math.sin(p * b) / I, o = Math.sin(o * b) / I;
      }
      const v = o * A;
      if (l = l * p + f * v, c = c * p + m * v, h = h * p + M * v, d = d * p + E * v, p === 1 - o) {
        const I = 1 / Math.sqrt(l * l + c * c + h * h + d * d);
        l *= I, c *= I, h *= I, d *= I;
      }
    }
    e[t] = l, e[t + 1] = c, e[t + 2] = h, e[t + 3] = d;
  }
  static multiplyQuaternionsFlat(e, t, n, r, s, a) {
    const o = n[r], l = n[r + 1], c = n[r + 2], h = n[r + 3], d = s[a], f = s[a + 1], m = s[a + 2], M = s[a + 3];
    return e[t] = o * M + h * d + l * m - c * f, e[t + 1] = l * M + h * f + c * d - o * m, e[t + 2] = c * M + h * m + o * f - l * d, e[t + 3] = h * M - o * d - l * f - c * m, e;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  set(e, t, n, r) {
    return this._x = e, this._y = t, this._z = n, this._w = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  setFromEuler(e, t = !0) {
    const n = e._x, r = e._y, s = e._z, a = e._order, o = Math.cos, l = Math.sin, c = o(n / 2), h = o(r / 2), d = o(s / 2), f = l(n / 2), m = l(r / 2), M = l(s / 2);
    switch (a) {
      case "XYZ":
        this._x = f * h * d + c * m * M, this._y = c * m * d - f * h * M, this._z = c * h * M + f * m * d, this._w = c * h * d - f * m * M;
        break;
      case "YXZ":
        this._x = f * h * d + c * m * M, this._y = c * m * d - f * h * M, this._z = c * h * M - f * m * d, this._w = c * h * d + f * m * M;
        break;
      case "ZXY":
        this._x = f * h * d - c * m * M, this._y = c * m * d + f * h * M, this._z = c * h * M + f * m * d, this._w = c * h * d - f * m * M;
        break;
      case "ZYX":
        this._x = f * h * d - c * m * M, this._y = c * m * d + f * h * M, this._z = c * h * M - f * m * d, this._w = c * h * d + f * m * M;
        break;
      case "YZX":
        this._x = f * h * d + c * m * M, this._y = c * m * d + f * h * M, this._z = c * h * M - f * m * d, this._w = c * h * d - f * m * M;
        break;
      case "XZY":
        this._x = f * h * d - c * m * M, this._y = c * m * d - f * h * M, this._z = c * h * M + f * m * d, this._w = c * h * d + f * m * M;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + a);
    }
    return t === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    const n = t / 2, r = Math.sin(n);
    return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const t = e.elements, n = t[0], r = t[4], s = t[8], a = t[1], o = t[5], l = t[9], c = t[2], h = t[6], d = t[10], f = n + o + d;
    if (f > 0) {
      const m = 0.5 / Math.sqrt(f + 1);
      this._w = 0.25 / m, this._x = (h - l) * m, this._y = (s - c) * m, this._z = (a - r) * m;
    } else if (n > o && n > d) {
      const m = 2 * Math.sqrt(1 + n - o - d);
      this._w = (h - l) / m, this._x = 0.25 * m, this._y = (r + a) / m, this._z = (s + c) / m;
    } else if (o > d) {
      const m = 2 * Math.sqrt(1 + o - n - d);
      this._w = (s - c) / m, this._x = (r + a) / m, this._y = 0.25 * m, this._z = (l + h) / m;
    } else {
      const m = 2 * Math.sqrt(1 + d - n - o);
      this._w = (a - r) / m, this._x = (s + c) / m, this._y = (l + h) / m, this._z = 0.25 * m;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, t) {
    let n = e.dot(t) + 1;
    return n < Number.EPSILON ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(gt(this.dot(e), -1, 1)));
  }
  rotateTowards(e, t) {
    const n = this.angleTo(e);
    if (n === 0) return this;
    const r = Math.min(1, t / n);
    return this.slerp(e, r), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    const n = e._x, r = e._y, s = e._z, a = e._w, o = t._x, l = t._y, c = t._z, h = t._w;
    return this._x = n * h + a * o + r * c - s * l, this._y = r * h + a * l + s * o - n * c, this._z = s * h + a * c + n * l - r * o, this._w = a * h - n * o - r * l - s * c, this._onChangeCallback(), this;
  }
  slerp(e, t) {
    if (t === 0) return this;
    if (t === 1) return this.copy(e);
    const n = this._x, r = this._y, s = this._z, a = this._w;
    let o = a * e._w + n * e._x + r * e._y + s * e._z;
    if (o < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, o = -o) : this.copy(e), o >= 1)
      return this._w = a, this._x = n, this._y = r, this._z = s, this;
    const l = 1 - o * o;
    if (l <= Number.EPSILON) {
      const m = 1 - t;
      return this._w = m * a + t * this._w, this._x = m * n + t * this._x, this._y = m * r + t * this._y, this._z = m * s + t * this._z, this.normalize(), this;
    }
    const c = Math.sqrt(l), h = Math.atan2(c, o), d = Math.sin((1 - t) * h) / c, f = Math.sin(t * h) / c;
    return this._w = a * d + this._w * f, this._x = n * d + this._x * f, this._y = r * d + this._y * f, this._z = s * d + this._z * f, this._onChangeCallback(), this;
  }
  slerpQuaternions(e, t, n) {
    return this.copy(e).slerp(t, n);
  }
  random() {
    const e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), r = Math.sqrt(1 - n), s = Math.sqrt(n);
    return this.set(
      r * Math.sin(e),
      r * Math.cos(e),
      s * Math.sin(t),
      s * Math.cos(t)
    );
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class F {
  constructor(e = 0, t = 0, n = 0) {
    F.prototype.isVector3 = !0, this.x = e, this.y = t, this.z = n;
  }
  set(e, t, n) {
    return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  multiplyVectors(e, t) {
    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
  }
  applyEuler(e) {
    return this.applyQuaternion(Tr.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(Tr.setFromAxisAngle(e, t));
  }
  applyMatrix3(e) {
    const t = this.x, n = this.y, r = this.z, s = e.elements;
    return this.x = s[0] * t + s[3] * n + s[6] * r, this.y = s[1] * t + s[4] * n + s[7] * r, this.z = s[2] * t + s[5] * n + s[8] * r, this;
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    const t = this.x, n = this.y, r = this.z, s = e.elements, a = 1 / (s[3] * t + s[7] * n + s[11] * r + s[15]);
    return this.x = (s[0] * t + s[4] * n + s[8] * r + s[12]) * a, this.y = (s[1] * t + s[5] * n + s[9] * r + s[13]) * a, this.z = (s[2] * t + s[6] * n + s[10] * r + s[14]) * a, this;
  }
  applyQuaternion(e) {
    const t = this.x, n = this.y, r = this.z, s = e.x, a = e.y, o = e.z, l = e.w, c = 2 * (a * r - o * n), h = 2 * (o * t - s * r), d = 2 * (s * n - a * t);
    return this.x = t + l * c + a * d - o * h, this.y = n + l * h + o * c - s * d, this.z = r + l * d + s * h - a * c, this;
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  transformDirection(e) {
    const t = this.x, n = this.y, r = this.z, s = e.elements;
    return this.x = s[0] * t + s[4] * n + s[8] * r, this.y = s[1] * t + s[5] * n + s[9] * r, this.z = s[2] * t + s[6] * n + s[10] * r, this.normalize();
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  // TODO lengthSquared?
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, t) {
    const n = e.x, r = e.y, s = e.z, a = t.x, o = t.y, l = t.z;
    return this.x = r * l - s * o, this.y = s * a - n * l, this.z = n * o - r * a, this;
  }
  projectOnVector(e) {
    const t = e.lengthSq();
    if (t === 0) return this.set(0, 0, 0);
    const n = e.dot(this) / t;
    return this.copy(e).multiplyScalar(n);
  }
  projectOnPlane(e) {
    return Ri.copy(this).projectOnVector(e), this.sub(Ri);
  }
  reflect(e) {
    return this.sub(Ri.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(gt(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y, r = this.z - e.z;
    return t * t + n * n + r * r;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, t, n) {
    const r = Math.sin(t) * e;
    return this.x = r * Math.sin(n), this.y = Math.cos(t) * e, this.z = r * Math.cos(n), this;
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, t, n) {
    return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this;
  }
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), r = this.setFromMatrixColumn(e, 2).length();
    return this.x = t, this.y = n, this.z = r, this;
  }
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, t * 4);
  }
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, t * 3);
  }
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  setFromColor(e) {
    return this.x = e.r, this.y = e.g, this.z = e.b, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, n = Math.sqrt(1 - t * t);
    return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const Ri = /* @__PURE__ */ new F(), Tr = /* @__PURE__ */ new Xn();
class qn {
  constructor(e = new F(1 / 0, 1 / 0, 1 / 0), t = new F(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t += 3)
      this.expandByPoint(Ct.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, n = e.count; t < n; t++)
      this.expandByPoint(Ct.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++)
      this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const n = Ct.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
  }
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const n = e.geometry;
    if (n !== void 0) {
      const s = n.getAttribute("position");
      if (t === !0 && s !== void 0 && e.isInstancedMesh !== !0)
        for (let a = 0, o = s.count; a < o; a++)
          e.isMesh === !0 ? e.getVertexPosition(a, Ct) : Ct.fromBufferAttribute(s, a), Ct.applyMatrix4(e.matrixWorld), this.expandByPoint(Ct);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), $n.copy(e.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), $n.copy(n.boundingBox)), $n.applyMatrix4(e.matrixWorld), this.union($n);
    }
    const r = e.children;
    for (let s = 0, a = r.length; s < a; s++)
      this.expandByObject(r[s], t);
    return this;
  }
  containsPoint(e) {
    return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  getParameter(e, t) {
    return t.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(e) {
    return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, Ct), Ct.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, n;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty())
      return !1;
    this.getCenter(On), jn.subVectors(this.max, On), mn.subVectors(e.a, On), _n.subVectors(e.b, On), gn.subVectors(e.c, On), Kt.subVectors(_n, mn), Zt.subVectors(gn, _n), nn.subVectors(mn, gn);
    let t = [
      0,
      -Kt.z,
      Kt.y,
      0,
      -Zt.z,
      Zt.y,
      0,
      -nn.z,
      nn.y,
      Kt.z,
      0,
      -Kt.x,
      Zt.z,
      0,
      -Zt.x,
      nn.z,
      0,
      -nn.x,
      -Kt.y,
      Kt.x,
      0,
      -Zt.y,
      Zt.x,
      0,
      -nn.y,
      nn.x,
      0
    ];
    return !wi(t, mn, _n, gn, jn) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !wi(t, mn, _n, gn, jn)) ? !1 : (Jn.crossVectors(Kt, Zt), t = [Jn.x, Jn.y, Jn.z], wi(t, mn, _n, gn, jn));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, Ct).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(Ct).length() * 0.5), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (zt[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), zt[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), zt[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), zt[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), zt[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), zt[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), zt[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), zt[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(zt), this);
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
const zt = [
  /* @__PURE__ */ new F(),
  /* @__PURE__ */ new F(),
  /* @__PURE__ */ new F(),
  /* @__PURE__ */ new F(),
  /* @__PURE__ */ new F(),
  /* @__PURE__ */ new F(),
  /* @__PURE__ */ new F(),
  /* @__PURE__ */ new F()
], Ct = /* @__PURE__ */ new F(), $n = /* @__PURE__ */ new qn(), mn = /* @__PURE__ */ new F(), _n = /* @__PURE__ */ new F(), gn = /* @__PURE__ */ new F(), Kt = /* @__PURE__ */ new F(), Zt = /* @__PURE__ */ new F(), nn = /* @__PURE__ */ new F(), On = /* @__PURE__ */ new F(), jn = /* @__PURE__ */ new F(), Jn = /* @__PURE__ */ new F(), rn = /* @__PURE__ */ new F();
function wi(i, e, t, n, r) {
  for (let s = 0, a = i.length - 3; s <= a; s += 3) {
    rn.fromArray(i, s);
    const o = r.x * Math.abs(rn.x) + r.y * Math.abs(rn.y) + r.z * Math.abs(rn.z), l = e.dot(rn), c = t.dot(rn), h = n.dot(rn);
    if (Math.max(-Math.max(l, c, h), Math.min(l, c, h)) > o)
      return !1;
  }
  return !0;
}
const Zs = /* @__PURE__ */ new qn(), Bn = /* @__PURE__ */ new F(), Ci = /* @__PURE__ */ new F();
class tr {
  constructor(e = new F(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  setFromPoints(e, t) {
    const n = this.center;
    t !== void 0 ? n.copy(t) : Zs.setFromPoints(e).getCenter(n);
    let r = 0;
    for (let s = 0, a = e.length; s < a; s++)
      r = Math.max(r, n.distanceToSquared(e[s]));
    return this.radius = Math.sqrt(r), this;
  }
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, t) {
    const n = this.center.distanceToSquared(e);
    return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  translate(e) {
    return this.center.add(e), this;
  }
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    Bn.subVectors(e, this.center);
    const t = Bn.lengthSq();
    if (t > this.radius * this.radius) {
      const n = Math.sqrt(t), r = (n - this.radius) * 0.5;
      this.center.addScaledVector(Bn, r / n), this.radius += r;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Ci.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(Bn.copy(e.center).add(Ci)), this.expandByPoint(Bn.copy(e.center).sub(Ci))), this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Vt = /* @__PURE__ */ new F(), Pi = /* @__PURE__ */ new F(), Qn = /* @__PURE__ */ new F(), $t = /* @__PURE__ */ new F(), Di = /* @__PURE__ */ new F(), ei = /* @__PURE__ */ new F(), Li = /* @__PURE__ */ new F();
class $s {
  constructor(e = new F(), t = new F(0, 0, -1)) {
    this.origin = e, this.direction = t;
  }
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  recast(e) {
    return this.origin.copy(this.at(e, Vt)), this;
  }
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const n = t.dot(this.direction);
    return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const t = Vt.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (Vt.copy(this.origin).addScaledVector(this.direction, t), Vt.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, n, r) {
    Pi.copy(e).add(t).multiplyScalar(0.5), Qn.copy(t).sub(e).normalize(), $t.copy(this.origin).sub(Pi);
    const s = e.distanceTo(t) * 0.5, a = -this.direction.dot(Qn), o = $t.dot(this.direction), l = -$t.dot(Qn), c = $t.lengthSq(), h = Math.abs(1 - a * a);
    let d, f, m, M;
    if (h > 0)
      if (d = a * l - o, f = a * o - l, M = s * h, d >= 0)
        if (f >= -M)
          if (f <= M) {
            const E = 1 / h;
            d *= E, f *= E, m = d * (d + a * f + 2 * o) + f * (a * d + f + 2 * l) + c;
          } else
            f = s, d = Math.max(0, -(a * f + o)), m = -d * d + f * (f + 2 * l) + c;
        else
          f = -s, d = Math.max(0, -(a * f + o)), m = -d * d + f * (f + 2 * l) + c;
      else
        f <= -M ? (d = Math.max(0, -(-a * s + o)), f = d > 0 ? -s : Math.min(Math.max(-s, -l), s), m = -d * d + f * (f + 2 * l) + c) : f <= M ? (d = 0, f = Math.min(Math.max(-s, -l), s), m = f * (f + 2 * l) + c) : (d = Math.max(0, -(a * s + o)), f = d > 0 ? s : Math.min(Math.max(-s, -l), s), m = -d * d + f * (f + 2 * l) + c);
    else
      f = a > 0 ? -s : s, d = Math.max(0, -(a * f + o)), m = -d * d + f * (f + 2 * l) + c;
    return n && n.copy(this.origin).addScaledVector(this.direction, d), r && r.copy(Pi).addScaledVector(Qn, f), m;
  }
  intersectSphere(e, t) {
    Vt.subVectors(e.center, this.origin);
    const n = Vt.dot(this.direction), r = Vt.dot(Vt) - n * n, s = e.radius * e.radius;
    if (r > s) return null;
    const a = Math.sqrt(s - r), o = n - a, l = n + a;
    return l < 0 ? null : o < 0 ? this.at(l, t) : this.at(o, t);
  }
  intersectsSphere(e) {
    return this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(e.normal) + e.constant) / t;
    return n >= 0 ? n : null;
  }
  intersectPlane(e, t) {
    const n = this.distanceToPlane(e);
    return n === null ? null : this.at(n, t);
  }
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  intersectBox(e, t) {
    let n, r, s, a, o, l;
    const c = 1 / this.direction.x, h = 1 / this.direction.y, d = 1 / this.direction.z, f = this.origin;
    return c >= 0 ? (n = (e.min.x - f.x) * c, r = (e.max.x - f.x) * c) : (n = (e.max.x - f.x) * c, r = (e.min.x - f.x) * c), h >= 0 ? (s = (e.min.y - f.y) * h, a = (e.max.y - f.y) * h) : (s = (e.max.y - f.y) * h, a = (e.min.y - f.y) * h), n > a || s > r || ((s > n || isNaN(n)) && (n = s), (a < r || isNaN(r)) && (r = a), d >= 0 ? (o = (e.min.z - f.z) * d, l = (e.max.z - f.z) * d) : (o = (e.max.z - f.z) * d, l = (e.min.z - f.z) * d), n > l || o > r) || ((o > n || n !== n) && (n = o), (l < r || r !== r) && (r = l), r < 0) ? null : this.at(n >= 0 ? n : r, t);
  }
  intersectsBox(e) {
    return this.intersectBox(e, Vt) !== null;
  }
  intersectTriangle(e, t, n, r, s) {
    Di.subVectors(t, e), ei.subVectors(n, e), Li.crossVectors(Di, ei);
    let a = this.direction.dot(Li), o;
    if (a > 0) {
      if (r) return null;
      o = 1;
    } else if (a < 0)
      o = -1, a = -a;
    else
      return null;
    $t.subVectors(this.origin, e);
    const l = o * this.direction.dot(ei.crossVectors($t, ei));
    if (l < 0)
      return null;
    const c = o * this.direction.dot(Di.cross($t));
    if (c < 0 || l + c > a)
      return null;
    const h = -o * $t.dot(Li);
    return h < 0 ? null : this.at(h / a, s);
  }
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class nt {
  constructor(e, t, n, r, s, a, o, l, c, h, d, f, m, M, E, p) {
    nt.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, r, s, a, o, l, c, h, d, f, m, M, E, p);
  }
  set(e, t, n, r, s, a, o, l, c, h, d, f, m, M, E, p) {
    const u = this.elements;
    return u[0] = e, u[4] = t, u[8] = n, u[12] = r, u[1] = s, u[5] = a, u[9] = o, u[13] = l, u[2] = c, u[6] = h, u[10] = d, u[14] = f, u[3] = m, u[7] = M, u[11] = E, u[15] = p, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  clone() {
    return new nt().fromArray(this.elements);
  }
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this;
  }
  copyPosition(e) {
    const t = this.elements, n = e.elements;
    return t[12] = n[12], t[13] = n[13], t[14] = n[14], this;
  }
  setFromMatrix3(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[3],
      t[6],
      0,
      t[1],
      t[4],
      t[7],
      0,
      t[2],
      t[5],
      t[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractBasis(e, t, n) {
    return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(e, t, n) {
    return this.set(
      e.x,
      t.x,
      n.x,
      0,
      e.y,
      t.y,
      n.y,
      0,
      e.z,
      t.z,
      n.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractRotation(e) {
    const t = this.elements, n = e.elements, r = 1 / vn.setFromMatrixColumn(e, 0).length(), s = 1 / vn.setFromMatrixColumn(e, 1).length(), a = 1 / vn.setFromMatrixColumn(e, 2).length();
    return t[0] = n[0] * r, t[1] = n[1] * r, t[2] = n[2] * r, t[3] = 0, t[4] = n[4] * s, t[5] = n[5] * s, t[6] = n[6] * s, t[7] = 0, t[8] = n[8] * a, t[9] = n[9] * a, t[10] = n[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromEuler(e) {
    const t = this.elements, n = e.x, r = e.y, s = e.z, a = Math.cos(n), o = Math.sin(n), l = Math.cos(r), c = Math.sin(r), h = Math.cos(s), d = Math.sin(s);
    if (e.order === "XYZ") {
      const f = a * h, m = a * d, M = o * h, E = o * d;
      t[0] = l * h, t[4] = -l * d, t[8] = c, t[1] = m + M * c, t[5] = f - E * c, t[9] = -o * l, t[2] = E - f * c, t[6] = M + m * c, t[10] = a * l;
    } else if (e.order === "YXZ") {
      const f = l * h, m = l * d, M = c * h, E = c * d;
      t[0] = f + E * o, t[4] = M * o - m, t[8] = a * c, t[1] = a * d, t[5] = a * h, t[9] = -o, t[2] = m * o - M, t[6] = E + f * o, t[10] = a * l;
    } else if (e.order === "ZXY") {
      const f = l * h, m = l * d, M = c * h, E = c * d;
      t[0] = f - E * o, t[4] = -a * d, t[8] = M + m * o, t[1] = m + M * o, t[5] = a * h, t[9] = E - f * o, t[2] = -a * c, t[6] = o, t[10] = a * l;
    } else if (e.order === "ZYX") {
      const f = a * h, m = a * d, M = o * h, E = o * d;
      t[0] = l * h, t[4] = M * c - m, t[8] = f * c + E, t[1] = l * d, t[5] = E * c + f, t[9] = m * c - M, t[2] = -c, t[6] = o * l, t[10] = a * l;
    } else if (e.order === "YZX") {
      const f = a * l, m = a * c, M = o * l, E = o * c;
      t[0] = l * h, t[4] = E - f * d, t[8] = M * d + m, t[1] = d, t[5] = a * h, t[9] = -o * h, t[2] = -c * h, t[6] = m * d + M, t[10] = f - E * d;
    } else if (e.order === "XZY") {
      const f = a * l, m = a * c, M = o * l, E = o * c;
      t[0] = l * h, t[4] = -d, t[8] = c * h, t[1] = f * d + E, t[5] = a * h, t[9] = m * d - M, t[2] = M * d - m, t[6] = o * h, t[10] = E * d + f;
    }
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromQuaternion(e) {
    return this.compose(js, e, Js);
  }
  lookAt(e, t, n) {
    const r = this.elements;
    return xt.subVectors(e, t), xt.lengthSq() === 0 && (xt.z = 1), xt.normalize(), jt.crossVectors(n, xt), jt.lengthSq() === 0 && (Math.abs(n.z) === 1 ? xt.x += 1e-4 : xt.z += 1e-4, xt.normalize(), jt.crossVectors(n, xt)), jt.normalize(), ti.crossVectors(xt, jt), r[0] = jt.x, r[4] = ti.x, r[8] = xt.x, r[1] = jt.y, r[5] = ti.y, r[9] = xt.y, r[2] = jt.z, r[6] = ti.z, r[10] = xt.z, this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements, r = t.elements, s = this.elements, a = n[0], o = n[4], l = n[8], c = n[12], h = n[1], d = n[5], f = n[9], m = n[13], M = n[2], E = n[6], p = n[10], u = n[14], A = n[3], y = n[7], v = n[11], I = n[15], b = r[0], R = r[4], C = r[8], S = r[12], g = r[1], w = r[5], z = r[9], O = r[13], k = r[2], Z = r[6], W = r[10], Q = r[14], H = r[3], ie = r[7], ce = r[11], xe = r[15];
    return s[0] = a * b + o * g + l * k + c * H, s[4] = a * R + o * w + l * Z + c * ie, s[8] = a * C + o * z + l * W + c * ce, s[12] = a * S + o * O + l * Q + c * xe, s[1] = h * b + d * g + f * k + m * H, s[5] = h * R + d * w + f * Z + m * ie, s[9] = h * C + d * z + f * W + m * ce, s[13] = h * S + d * O + f * Q + m * xe, s[2] = M * b + E * g + p * k + u * H, s[6] = M * R + E * w + p * Z + u * ie, s[10] = M * C + E * z + p * W + u * ce, s[14] = M * S + E * O + p * Q + u * xe, s[3] = A * b + y * g + v * k + I * H, s[7] = A * R + y * w + v * Z + I * ie, s[11] = A * C + y * z + v * W + I * ce, s[15] = A * S + y * O + v * Q + I * xe, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], n = e[4], r = e[8], s = e[12], a = e[1], o = e[5], l = e[9], c = e[13], h = e[2], d = e[6], f = e[10], m = e[14], M = e[3], E = e[7], p = e[11], u = e[15];
    return M * (+s * l * d - r * c * d - s * o * f + n * c * f + r * o * m - n * l * m) + E * (+t * l * m - t * c * f + s * a * f - r * a * m + r * c * h - s * l * h) + p * (+t * c * d - t * o * m - s * a * d + n * a * m + s * o * h - n * c * h) + u * (-r * o * h - t * l * d + t * o * f + r * a * d - n * a * f + n * l * h);
  }
  transpose() {
    const e = this.elements;
    let t;
    return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
  }
  setPosition(e, t, n) {
    const r = this.elements;
    return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = t, r[14] = n), this;
  }
  invert() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], s = e[3], a = e[4], o = e[5], l = e[6], c = e[7], h = e[8], d = e[9], f = e[10], m = e[11], M = e[12], E = e[13], p = e[14], u = e[15], A = d * p * c - E * f * c + E * l * m - o * p * m - d * l * u + o * f * u, y = M * f * c - h * p * c - M * l * m + a * p * m + h * l * u - a * f * u, v = h * E * c - M * d * c + M * o * m - a * E * m - h * o * u + a * d * u, I = M * d * l - h * E * l - M * o * f + a * E * f + h * o * p - a * d * p, b = t * A + n * y + r * v + s * I;
    if (b === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const R = 1 / b;
    return e[0] = A * R, e[1] = (E * f * s - d * p * s - E * r * m + n * p * m + d * r * u - n * f * u) * R, e[2] = (o * p * s - E * l * s + E * r * c - n * p * c - o * r * u + n * l * u) * R, e[3] = (d * l * s - o * f * s - d * r * c + n * f * c + o * r * m - n * l * m) * R, e[4] = y * R, e[5] = (h * p * s - M * f * s + M * r * m - t * p * m - h * r * u + t * f * u) * R, e[6] = (M * l * s - a * p * s - M * r * c + t * p * c + a * r * u - t * l * u) * R, e[7] = (a * f * s - h * l * s + h * r * c - t * f * c - a * r * m + t * l * m) * R, e[8] = v * R, e[9] = (M * d * s - h * E * s - M * n * m + t * E * m + h * n * u - t * d * u) * R, e[10] = (a * E * s - M * o * s + M * n * c - t * E * c - a * n * u + t * o * u) * R, e[11] = (h * o * s - a * d * s - h * n * c + t * d * c + a * n * m - t * o * m) * R, e[12] = I * R, e[13] = (h * E * r - M * d * r + M * n * f - t * E * f - h * n * p + t * d * p) * R, e[14] = (M * o * r - a * E * r - M * n * l + t * E * l + a * n * p - t * o * p) * R, e[15] = (a * d * r - h * o * r + h * n * l - t * d * l - a * n * f + t * o * f) * R, this;
  }
  scale(e) {
    const t = this.elements, n = e.x, r = e.y, s = e.z;
    return t[0] *= n, t[4] *= r, t[8] *= s, t[1] *= n, t[5] *= r, t[9] *= s, t[2] *= n, t[6] *= r, t[10] *= s, t[3] *= n, t[7] *= r, t[11] *= s, this;
  }
  getMaxScaleOnAxis() {
    const e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, n, r));
  }
  makeTranslation(e, t, n) {
    return e.isVector3 ? this.set(
      1,
      0,
      0,
      e.x,
      0,
      1,
      0,
      e.y,
      0,
      0,
      1,
      e.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      e,
      0,
      1,
      0,
      t,
      0,
      0,
      1,
      n,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationX(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationY(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      0,
      n,
      0,
      0,
      1,
      0,
      0,
      -n,
      0,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationZ(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationAxis(e, t) {
    const n = Math.cos(t), r = Math.sin(t), s = 1 - n, a = e.x, o = e.y, l = e.z, c = s * a, h = s * o;
    return this.set(
      c * a + n,
      c * o - r * l,
      c * l + r * o,
      0,
      c * o + r * l,
      h * o + n,
      h * l - r * a,
      0,
      c * l - r * o,
      h * l + r * a,
      s * l * l + n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, t, n) {
    return this.set(
      e,
      0,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      0,
      n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeShear(e, t, n, r, s, a) {
    return this.set(
      1,
      n,
      s,
      0,
      e,
      1,
      a,
      0,
      t,
      r,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(e, t, n) {
    const r = this.elements, s = t._x, a = t._y, o = t._z, l = t._w, c = s + s, h = a + a, d = o + o, f = s * c, m = s * h, M = s * d, E = a * h, p = a * d, u = o * d, A = l * c, y = l * h, v = l * d, I = n.x, b = n.y, R = n.z;
    return r[0] = (1 - (E + u)) * I, r[1] = (m + v) * I, r[2] = (M - y) * I, r[3] = 0, r[4] = (m - v) * b, r[5] = (1 - (f + u)) * b, r[6] = (p + A) * b, r[7] = 0, r[8] = (M + y) * R, r[9] = (p - A) * R, r[10] = (1 - (f + E)) * R, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
  }
  decompose(e, t, n) {
    const r = this.elements;
    let s = vn.set(r[0], r[1], r[2]).length();
    const a = vn.set(r[4], r[5], r[6]).length(), o = vn.set(r[8], r[9], r[10]).length();
    this.determinant() < 0 && (s = -s), e.x = r[12], e.y = r[13], e.z = r[14], Pt.copy(this);
    const c = 1 / s, h = 1 / a, d = 1 / o;
    return Pt.elements[0] *= c, Pt.elements[1] *= c, Pt.elements[2] *= c, Pt.elements[4] *= h, Pt.elements[5] *= h, Pt.elements[6] *= h, Pt.elements[8] *= d, Pt.elements[9] *= d, Pt.elements[10] *= d, t.setFromRotationMatrix(Pt), n.x = s, n.y = a, n.z = o, this;
  }
  makePerspective(e, t, n, r, s, a, o = 2e3) {
    const l = this.elements, c = 2 * s / (t - e), h = 2 * s / (n - r), d = (t + e) / (t - e), f = (n + r) / (n - r);
    let m, M;
    if (o === 2e3)
      m = -(a + s) / (a - s), M = -2 * a * s / (a - s);
    else if (o === 2001)
      m = -a / (a - s), M = -a * s / (a - s);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
    return l[0] = c, l[4] = 0, l[8] = d, l[12] = 0, l[1] = 0, l[5] = h, l[9] = f, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = m, l[14] = M, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  makeOrthographic(e, t, n, r, s, a, o = 2e3) {
    const l = this.elements, c = 1 / (t - e), h = 1 / (n - r), d = 1 / (a - s), f = (t + e) * c, m = (n + r) * h;
    let M, E;
    if (o === 2e3)
      M = (a + s) * d, E = -2 * d;
    else if (o === 2001)
      M = s * d, E = -1 * d;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
    return l[0] = 2 * c, l[4] = 0, l[8] = 0, l[12] = -f, l[1] = 0, l[5] = 2 * h, l[9] = 0, l[13] = -m, l[2] = 0, l[6] = 0, l[10] = E, l[14] = -M, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
  }
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let r = 0; r < 16; r++)
      if (t[r] !== n[r]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 16; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e;
  }
}
const vn = /* @__PURE__ */ new F(), Pt = /* @__PURE__ */ new nt(), js = /* @__PURE__ */ new F(0, 0, 0), Js = /* @__PURE__ */ new F(1, 1, 1), jt = /* @__PURE__ */ new F(), ti = /* @__PURE__ */ new F(), xt = /* @__PURE__ */ new F(), Ar = /* @__PURE__ */ new nt(), br = /* @__PURE__ */ new Xn();
class Nt {
  constructor(e = 0, t = 0, n = 0, r = Nt.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = e, this._y = t, this._z = n, this._order = r;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e, this._onChangeCallback();
  }
  set(e, t, n, r = this._order) {
    return this._x = e, this._y = t, this._z = n, this._order = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e, t = this._order, n = !0) {
    const r = e.elements, s = r[0], a = r[4], o = r[8], l = r[1], c = r[5], h = r[9], d = r[2], f = r[6], m = r[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(gt(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-h, m), this._z = Math.atan2(-a, s)) : (this._x = Math.atan2(f, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-gt(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(o, m), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-d, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(gt(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._y = Math.atan2(-d, m), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(l, s));
        break;
      case "ZYX":
        this._y = Math.asin(-gt(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._x = Math.atan2(f, m), this._z = Math.atan2(l, s)) : (this._x = 0, this._z = Math.atan2(-a, c));
        break;
      case "YZX":
        this._z = Math.asin(gt(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-h, c), this._y = Math.atan2(-d, s)) : (this._x = 0, this._y = Math.atan2(o, m));
        break;
      case "XZY":
        this._z = Math.asin(-gt(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(f, c), this._y = Math.atan2(o, s)) : (this._x = Math.atan2(-h, m), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
    }
    return this._order = t, n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(e, t, n) {
    return Ar.makeRotationFromQuaternion(e), this.setFromRotationMatrix(Ar, t, n);
  }
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  reorder(e) {
    return br.setFromEuler(this), this.setFromQuaternion(br, e);
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
Nt.DEFAULT_ORDER = "XYZ";
class Ms {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}
let Qs = 0;
const Rr = /* @__PURE__ */ new F(), xn = /* @__PURE__ */ new Xn(), Ht = /* @__PURE__ */ new nt(), ni = /* @__PURE__ */ new F(), Gn = /* @__PURE__ */ new F(), ea = /* @__PURE__ */ new F(), ta = /* @__PURE__ */ new Xn(), wr = /* @__PURE__ */ new F(1, 0, 0), Cr = /* @__PURE__ */ new F(0, 1, 0), Pr = /* @__PURE__ */ new F(0, 0, 1), Dr = { type: "added" }, na = { type: "removed" }, Mn = { type: "childadded", child: null }, Ui = { type: "childremoved", child: null };
class ht extends Dn {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Qs++ }), this.uuid = Wn(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = ht.DEFAULT_UP.clone();
    const e = new F(), t = new Nt(), n = new Xn(), r = new F(1, 1, 1);
    function s() {
      n.setFromEuler(t, !1);
    }
    function a() {
      t.setFromQuaternion(n, void 0, !1);
    }
    t._onChange(s), n._onChange(a), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: r
      },
      modelViewMatrix: {
        value: new nt()
      },
      normalMatrix: {
        value: new Ce()
      }
    }), this.matrix = new nt(), this.matrixWorld = new nt(), this.matrixAutoUpdate = ht.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Ms(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, t) {
    return xn.setFromAxisAngle(e, t), this.quaternion.multiply(xn), this;
  }
  rotateOnWorldAxis(e, t) {
    return xn.setFromAxisAngle(e, t), this.quaternion.premultiply(xn), this;
  }
  rotateX(e) {
    return this.rotateOnAxis(wr, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(Cr, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(Pr, e);
  }
  translateOnAxis(e, t) {
    return Rr.copy(e).applyQuaternion(this.quaternion), this.position.add(Rr.multiplyScalar(t)), this;
  }
  translateX(e) {
    return this.translateOnAxis(wr, e);
  }
  translateY(e) {
    return this.translateOnAxis(Cr, e);
  }
  translateZ(e) {
    return this.translateOnAxis(Pr, e);
  }
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(Ht.copy(this.matrixWorld).invert());
  }
  lookAt(e, t, n) {
    e.isVector3 ? ni.copy(e) : ni.set(e, t, n);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), Gn.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Ht.lookAt(Gn, ni, this.up) : Ht.lookAt(ni, Gn, this.up), this.quaternion.setFromRotationMatrix(Ht), r && (Ht.extractRotation(r.matrixWorld), xn.setFromRotationMatrix(Ht), this.quaternion.premultiply(xn.invert()));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.add(arguments[t]);
      return this;
    }
    return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(Dr), Mn.child = e, this.dispatchEvent(Mn), Mn.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const t = this.children.indexOf(e);
    return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(na), Ui.child = e, this.dispatchEvent(Ui), Ui.child = null), this;
  }
  removeFromParent() {
    const e = this.parent;
    return e !== null && e.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(e) {
    return this.updateWorldMatrix(!0, !1), Ht.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), Ht.multiply(e.parent.matrixWorld)), e.applyMatrix4(Ht), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(Dr), Mn.child = e, this.dispatchEvent(Mn), Mn.child = null, this;
  }
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let n = 0, r = this.children.length; n < r; n++) {
      const a = this.children[n].getObjectByProperty(e, t);
      if (a !== void 0)
        return a;
    }
  }
  getObjectsByProperty(e, t, n = []) {
    this[e] === t && n.push(this);
    const r = this.children;
    for (let s = 0, a = r.length; s < a; s++)
      r[s].getObjectsByProperty(e, t, n);
    return n;
  }
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Gn, e, ea), e;
  }
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Gn, ta, e), e;
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  raycast() {
  }
  traverse(e) {
    e(this);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].traverse(e);
  }
  traverseVisible(e) {
    if (this.visible === !1) return;
    e(this);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].traverseVisible(e);
  }
  traverseAncestors(e) {
    const t = this.parent;
    t !== null && (e(t), t.traverseAncestors(e));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].updateMatrixWorld(e);
  }
  updateWorldMatrix(e, t) {
    const n = this.parent;
    if (e === !0 && n !== null && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), t === !0) {
      const r = this.children;
      for (let s = 0, a = r.length; s < a; s++)
        r[s].updateWorldMatrix(!1, !0);
    }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string", n = {};
    t && (e = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, n.metadata = {
      version: 4.6,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const r = {};
    r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), this.frustumCulled === !1 && (r.frustumCulled = !1), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.visibility = this._visibility, r.active = this._active, r.bounds = this._bounds.map((o) => ({
      boxInitialized: o.boxInitialized,
      boxMin: o.box.min.toArray(),
      boxMax: o.box.max.toArray(),
      sphereInitialized: o.sphereInitialized,
      sphereRadius: o.sphere.radius,
      sphereCenter: o.sphere.center.toArray()
    })), r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.geometryCount = this._geometryCount, r.matricesTexture = this._matricesTexture.toJSON(e), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (r.boundingSphere = {
      center: r.boundingSphere.center.toArray(),
      radius: r.boundingSphere.radius
    }), this.boundingBox !== null && (r.boundingBox = {
      min: r.boundingBox.min.toArray(),
      max: r.boundingBox.max.toArray()
    }));
    function s(o, l) {
      return o[l.uuid] === void 0 && (o[l.uuid] = l.toJSON(e)), l.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(e).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = s(e.geometries, this.geometry);
      const o = this.geometry.parameters;
      if (o !== void 0 && o.shapes !== void 0) {
        const l = o.shapes;
        if (Array.isArray(l))
          for (let c = 0, h = l.length; c < h; c++) {
            const d = l[c];
            s(e.shapes, d);
          }
        else
          s(e.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (s(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const o = [];
        for (let l = 0, c = this.material.length; l < c; l++)
          o.push(s(e.materials, this.material[l]));
        r.material = o;
      } else
        r.material = s(e.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let o = 0; o < this.children.length; o++)
        r.children.push(this.children[o].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let o = 0; o < this.animations.length; o++) {
        const l = this.animations[o];
        r.animations.push(s(e.animations, l));
      }
    }
    if (t) {
      const o = a(e.geometries), l = a(e.materials), c = a(e.textures), h = a(e.images), d = a(e.shapes), f = a(e.skeletons), m = a(e.animations), M = a(e.nodes);
      o.length > 0 && (n.geometries = o), l.length > 0 && (n.materials = l), c.length > 0 && (n.textures = c), h.length > 0 && (n.images = h), d.length > 0 && (n.shapes = d), f.length > 0 && (n.skeletons = f), m.length > 0 && (n.animations = m), M.length > 0 && (n.nodes = M);
    }
    return n.object = r, n;
    function a(o) {
      const l = [];
      for (const c in o) {
        const h = o[c];
        delete h.metadata, l.push(h);
      }
      return l;
    }
  }
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(e, t = !0) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0)
      for (let n = 0; n < e.children.length; n++) {
        const r = e.children[n];
        this.add(r.clone());
      }
    return this;
  }
}
ht.DEFAULT_UP = /* @__PURE__ */ new F(0, 1, 0);
ht.DEFAULT_MATRIX_AUTO_UPDATE = !0;
ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const Dt = /* @__PURE__ */ new F(), kt = /* @__PURE__ */ new F(), Ii = /* @__PURE__ */ new F(), Wt = /* @__PURE__ */ new F(), Sn = /* @__PURE__ */ new F(), En = /* @__PURE__ */ new F(), Lr = /* @__PURE__ */ new F(), Fi = /* @__PURE__ */ new F(), Ni = /* @__PURE__ */ new F(), Oi = /* @__PURE__ */ new F(), Bi = /* @__PURE__ */ new tt(), Gi = /* @__PURE__ */ new tt(), zi = /* @__PURE__ */ new tt();
class Lt {
  constructor(e = new F(), t = new F(), n = new F()) {
    this.a = e, this.b = t, this.c = n;
  }
  static getNormal(e, t, n, r) {
    r.subVectors(n, t), Dt.subVectors(e, t), r.cross(Dt);
    const s = r.lengthSq();
    return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(e, t, n, r, s) {
    Dt.subVectors(r, t), kt.subVectors(n, t), Ii.subVectors(e, t);
    const a = Dt.dot(Dt), o = Dt.dot(kt), l = Dt.dot(Ii), c = kt.dot(kt), h = kt.dot(Ii), d = a * c - o * o;
    if (d === 0)
      return s.set(0, 0, 0), null;
    const f = 1 / d, m = (c * l - o * h) * f, M = (a * h - o * l) * f;
    return s.set(1 - m - M, M, m);
  }
  static containsPoint(e, t, n, r) {
    return this.getBarycoord(e, t, n, r, Wt) === null ? !1 : Wt.x >= 0 && Wt.y >= 0 && Wt.x + Wt.y <= 1;
  }
  static getInterpolation(e, t, n, r, s, a, o, l) {
    return this.getBarycoord(e, t, n, r, Wt) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(s, Wt.x), l.addScaledVector(a, Wt.y), l.addScaledVector(o, Wt.z), l);
  }
  static getInterpolatedAttribute(e, t, n, r, s, a) {
    return Bi.setScalar(0), Gi.setScalar(0), zi.setScalar(0), Bi.fromBufferAttribute(e, t), Gi.fromBufferAttribute(e, n), zi.fromBufferAttribute(e, r), a.setScalar(0), a.addScaledVector(Bi, s.x), a.addScaledVector(Gi, s.y), a.addScaledVector(zi, s.z), a;
  }
  static isFrontFacing(e, t, n, r) {
    return Dt.subVectors(n, t), kt.subVectors(e, t), Dt.cross(kt).dot(r) < 0;
  }
  set(e, t, n) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
  }
  setFromPointsAndIndices(e, t, n, r) {
    return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[r]), this;
  }
  setFromAttributeAndIndices(e, t, n, r) {
    return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, r), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  getArea() {
    return Dt.subVectors(this.c, this.b), kt.subVectors(this.a, this.b), Dt.cross(kt).length() * 0.5;
  }
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return Lt.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, t) {
    return Lt.getBarycoord(e, this.a, this.b, this.c, t);
  }
  getInterpolation(e, t, n, r, s) {
    return Lt.getInterpolation(e, this.a, this.b, this.c, t, n, r, s);
  }
  containsPoint(e) {
    return Lt.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return Lt.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, t) {
    const n = this.a, r = this.b, s = this.c;
    let a, o;
    Sn.subVectors(r, n), En.subVectors(s, n), Fi.subVectors(e, n);
    const l = Sn.dot(Fi), c = En.dot(Fi);
    if (l <= 0 && c <= 0)
      return t.copy(n);
    Ni.subVectors(e, r);
    const h = Sn.dot(Ni), d = En.dot(Ni);
    if (h >= 0 && d <= h)
      return t.copy(r);
    const f = l * d - h * c;
    if (f <= 0 && l >= 0 && h <= 0)
      return a = l / (l - h), t.copy(n).addScaledVector(Sn, a);
    Oi.subVectors(e, s);
    const m = Sn.dot(Oi), M = En.dot(Oi);
    if (M >= 0 && m <= M)
      return t.copy(s);
    const E = m * c - l * M;
    if (E <= 0 && c >= 0 && M <= 0)
      return o = c / (c - M), t.copy(n).addScaledVector(En, o);
    const p = h * M - m * d;
    if (p <= 0 && d - h >= 0 && m - M >= 0)
      return Lr.subVectors(s, r), o = (d - h) / (d - h + (m - M)), t.copy(r).addScaledVector(Lr, o);
    const u = 1 / (p + E + f);
    return a = E * u, o = f * u, t.copy(n).addScaledVector(Sn, a).addScaledVector(En, o);
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
const Ss = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, Jt = { h: 0, s: 0, l: 0 }, ii = { h: 0, s: 0, l: 0 };
function Vi(i, e, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? i + (e - i) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? i + (e - i) * 6 * (2 / 3 - t) : i;
}
class Ve {
  constructor(e, t, n) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
  }
  set(e, t, n) {
    if (t === void 0 && n === void 0) {
      const r = e;
      r && r.isColor ? this.copy(r) : typeof r == "number" ? this.setHex(r) : typeof r == "string" && this.setStyle(r);
    } else
      this.setRGB(e, t, n);
    return this;
  }
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  setHex(e, t = St) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, ze.toWorkingColorSpace(this, t), this;
  }
  setRGB(e, t, n, r = ze.workingColorSpace) {
    return this.r = e, this.g = t, this.b = n, ze.toWorkingColorSpace(this, r), this;
  }
  setHSL(e, t, n, r = ze.workingColorSpace) {
    if (e = Gs(e, 1), t = gt(t, 0, 1), n = gt(n, 0, 1), t === 0)
      this.r = this.g = this.b = n;
    else {
      const s = n <= 0.5 ? n * (1 + t) : n + t - n * t, a = 2 * n - s;
      this.r = Vi(a, s, e + 1 / 3), this.g = Vi(a, s, e), this.b = Vi(a, s, e - 1 / 3);
    }
    return ze.toWorkingColorSpace(this, r), this;
  }
  setStyle(e, t = St) {
    function n(s) {
      s !== void 0 && parseFloat(s) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.");
    }
    let r;
    if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let s;
      const a = r[1], o = r[2];
      switch (a) {
        case "rgb":
        case "rgba":
          if (s = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setRGB(
              Math.min(255, parseInt(s[1], 10)) / 255,
              Math.min(255, parseInt(s[2], 10)) / 255,
              Math.min(255, parseInt(s[3], 10)) / 255,
              t
            );
          if (s = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setRGB(
              Math.min(100, parseInt(s[1], 10)) / 100,
              Math.min(100, parseInt(s[2], 10)) / 100,
              Math.min(100, parseInt(s[3], 10)) / 100,
              t
            );
          break;
        case "hsl":
        case "hsla":
          if (s = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setHSL(
              parseFloat(s[1]) / 360,
              parseFloat(s[2]) / 100,
              parseFloat(s[3]) / 100,
              t
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + e);
      }
    } else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const s = r[1], a = s.length;
      if (a === 3)
        return this.setRGB(
          parseInt(s.charAt(0), 16) / 15,
          parseInt(s.charAt(1), 16) / 15,
          parseInt(s.charAt(2), 16) / 15,
          t
        );
      if (a === 6)
        return this.setHex(parseInt(s, 16), t);
      console.warn("THREE.Color: Invalid hex color " + e);
    } else if (e && e.length > 0)
      return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = St) {
    const n = Ss[e.toLowerCase()];
    return n !== void 0 ? this.setHex(n, t) : console.warn("THREE.Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = Xt(e.r), this.g = Xt(e.g), this.b = Xt(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = wn(e.r), this.g = wn(e.g), this.b = wn(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = St) {
    return ze.fromWorkingColorSpace(ut.copy(this), e), Math.round(gt(ut.r * 255, 0, 255)) * 65536 + Math.round(gt(ut.g * 255, 0, 255)) * 256 + Math.round(gt(ut.b * 255, 0, 255));
  }
  getHexString(e = St) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = ze.workingColorSpace) {
    ze.fromWorkingColorSpace(ut.copy(this), t);
    const n = ut.r, r = ut.g, s = ut.b, a = Math.max(n, r, s), o = Math.min(n, r, s);
    let l, c;
    const h = (o + a) / 2;
    if (o === a)
      l = 0, c = 0;
    else {
      const d = a - o;
      switch (c = h <= 0.5 ? d / (a + o) : d / (2 - a - o), a) {
        case n:
          l = (r - s) / d + (r < s ? 6 : 0);
          break;
        case r:
          l = (s - n) / d + 2;
          break;
        case s:
          l = (n - r) / d + 4;
          break;
      }
      l /= 6;
    }
    return e.h = l, e.s = c, e.l = h, e;
  }
  getRGB(e, t = ze.workingColorSpace) {
    return ze.fromWorkingColorSpace(ut.copy(this), t), e.r = ut.r, e.g = ut.g, e.b = ut.b, e;
  }
  getStyle(e = St) {
    ze.fromWorkingColorSpace(ut.copy(this), e);
    const t = ut.r, n = ut.g, r = ut.b;
    return e !== St ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})`;
  }
  offsetHSL(e, t, n) {
    return this.getHSL(Jt), this.setHSL(Jt.h + e, Jt.s + t, Jt.l + n);
  }
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  lerpColors(e, t, n) {
    return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
  }
  lerpHSL(e, t) {
    this.getHSL(Jt), e.getHSL(ii);
    const n = Ti(Jt.h, ii.h, t), r = Ti(Jt.s, ii.s, t), s = Ti(Jt.l, ii.l, t);
    return this.setHSL(n, r, s), this;
  }
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  applyMatrix3(e) {
    const t = this.r, n = this.g, r = this.b, s = e.elements;
    return this.r = s[0] * t + s[3] * n + s[6] * r, this.g = s[1] * t + s[4] * n + s[7] * r, this.b = s[2] * t + s[5] * n + s[8] * r, this;
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const ut = /* @__PURE__ */ new Ve();
Ve.NAMES = Ss;
let ia = 0;
class Yn extends Dn {
  static get type() {
    return "Material";
  }
  get type() {
    return this.constructor.type;
  }
  set type(e) {
  }
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: ia++ }), this.uuid = Wn(), this.name = "", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Ve(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = 7680, this.stencilZFail = 7680, this.stencilZPass = 7680, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  // onBeforeRender and onBeforeCompile only supported in WebGLRenderer
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (e !== void 0)
      for (const t in e) {
        const n = e[t];
        if (n === void 0) {
          console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const r = this[t];
        if (r === void 0) {
          console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);
          continue;
        }
        r && r.isColor ? r.set(n) : r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[t] = n;
      }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    t && (e = {
      textures: {},
      images: {}
    });
    const n = {
      metadata: {
        version: 4.6,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== 1 && (n.blending = this.blending), this.side !== 0 && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== 204 && (n.blendSrc = this.blendSrc), this.blendDst !== 205 && (n.blendDst = this.blendDst), this.blendEquation !== 100 && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== 3 && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== 519 && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== 7680 && (n.stencilFail = this.stencilFail), this.stencilZFail !== 7680 && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== 7680 && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function r(s) {
      const a = [];
      for (const o in s) {
        const l = s[o];
        delete l.metadata, a.push(l);
      }
      return a;
    }
    if (t) {
      const s = r(e.textures), a = r(e.images);
      s.length > 0 && (n.textures = s), a.length > 0 && (n.images = a);
    }
    return n;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let n = null;
    if (t !== null) {
      const r = t.length;
      n = new Array(r);
      for (let s = 0; s !== r; ++s)
        n[s] = t[s].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  onBuild() {
    console.warn("Material: onBuild() has been removed.");
  }
}
class Es extends Yn {
  static get type() {
    return "MeshBasicMaterial";
  }
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.color = new Ve(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Nt(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const rt = /* @__PURE__ */ new F(), ri = /* @__PURE__ */ new Ie();
class Ft {
  constructor(e, t, n = !1) {
    if (Array.isArray(e))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n, this.usage = 35044, this.updateRanges = [], this.gpuType = 1015, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  copyAt(e, t, n) {
    e *= this.itemSize, n *= t.itemSize;
    for (let r = 0, s = this.itemSize; r < s; r++)
      this.array[e + r] = t.array[n + r];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(e) {
    if (this.itemSize === 2)
      for (let t = 0, n = this.count; t < n; t++)
        ri.fromBufferAttribute(this, t), ri.applyMatrix3(e), this.setXY(t, ri.x, ri.y);
    else if (this.itemSize === 3)
      for (let t = 0, n = this.count; t < n; t++)
        rt.fromBufferAttribute(this, t), rt.applyMatrix3(e), this.setXYZ(t, rt.x, rt.y, rt.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.count; t < n; t++)
      rt.fromBufferAttribute(this, t), rt.applyMatrix4(e), this.setXYZ(t, rt.x, rt.y, rt.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      rt.fromBufferAttribute(this, t), rt.applyNormalMatrix(e), this.setXYZ(t, rt.x, rt.y, rt.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      rt.fromBufferAttribute(this, t), rt.transformDirection(e), this.setXYZ(t, rt.x, rt.y, rt.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getComponent(e, t) {
    let n = this.array[e * this.itemSize + t];
    return this.normalized && (n = Nn(n, this.array)), n;
  }
  setComponent(e, t, n) {
    return this.normalized && (n = _t(n, this.array)), this.array[e * this.itemSize + t] = n, this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = Nn(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = _t(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = Nn(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = _t(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = Nn(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = _t(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = Nn(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = _t(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  setXY(e, t, n) {
    return e *= this.itemSize, this.normalized && (t = _t(t, this.array), n = _t(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, r) {
    return e *= this.itemSize, this.normalized && (t = _t(t, this.array), n = _t(n, this.array), r = _t(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this;
  }
  setXYZW(e, t, n, r, s) {
    return e *= this.itemSize, this.normalized && (t = _t(t, this.array), n = _t(n, this.array), r = _t(r, this.array), s = _t(s, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = s, this;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (e.name = this.name), this.usage !== 35044 && (e.usage = this.usage), e;
  }
}
class ys extends Ft {
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n);
  }
}
class Ts extends Ft {
  constructor(e, t, n) {
    super(new Uint32Array(e), t, n);
  }
}
class dt extends Ft {
  constructor(e, t, n) {
    super(new Float32Array(e), t, n);
  }
}
let ra = 0;
const At = /* @__PURE__ */ new nt(), Hi = /* @__PURE__ */ new ht(), yn = /* @__PURE__ */ new F(), Mt = /* @__PURE__ */ new qn(), zn = /* @__PURE__ */ new qn(), ot = /* @__PURE__ */ new F();
class Ot extends Dn {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: ra++ }), this.uuid = Wn(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (gs(e) ? Ts : ys)(e, 1) : this.index = e, this;
  }
  setIndirect(e) {
    return this.indirect = e, this;
  }
  getIndirect() {
    return this.indirect;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  setAttribute(e, t) {
    return this.attributes[e] = t, this;
  }
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  addGroup(e, t, n = 0) {
    this.groups.push({
      start: e,
      count: t,
      materialIndex: n
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(e, t) {
    this.drawRange.start = e, this.drawRange.count = t;
  }
  applyMatrix4(e) {
    const t = this.attributes.position;
    t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const s = new Ce().getNormalMatrix(e);
      n.applyNormalMatrix(s), n.needsUpdate = !0;
    }
    const r = this.attributes.tangent;
    return r !== void 0 && (r.transformDirection(e), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(e) {
    return At.makeRotationFromQuaternion(e), this.applyMatrix4(At), this;
  }
  rotateX(e) {
    return At.makeRotationX(e), this.applyMatrix4(At), this;
  }
  rotateY(e) {
    return At.makeRotationY(e), this.applyMatrix4(At), this;
  }
  rotateZ(e) {
    return At.makeRotationZ(e), this.applyMatrix4(At), this;
  }
  translate(e, t, n) {
    return At.makeTranslation(e, t, n), this.applyMatrix4(At), this;
  }
  scale(e, t, n) {
    return At.makeScale(e, t, n), this.applyMatrix4(At), this;
  }
  lookAt(e) {
    return Hi.lookAt(e), Hi.updateMatrix(), this.applyMatrix4(Hi.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(yn).negate(), this.translate(yn.x, yn.y, yn.z), this;
  }
  setFromPoints(e) {
    const t = this.getAttribute("position");
    if (t === void 0) {
      const n = [];
      for (let r = 0, s = e.length; r < s; r++) {
        const a = e[r];
        n.push(a.x, a.y, a.z || 0);
      }
      this.setAttribute("position", new dt(n, 3));
    } else {
      for (let n = 0, r = t.count; n < r; n++) {
        const s = e[n];
        t.setXYZ(n, s.x, s.y, s.z || 0);
      }
      e.length > t.count && console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = !0;
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new qn());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new F(-1 / 0, -1 / 0, -1 / 0),
        new F(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (e !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(e), t)
        for (let n = 0, r = t.length; n < r; n++) {
          const s = t[n];
          Mt.setFromBufferAttribute(s), this.morphTargetsRelative ? (ot.addVectors(this.boundingBox.min, Mt.min), this.boundingBox.expandByPoint(ot), ot.addVectors(this.boundingBox.max, Mt.max), this.boundingBox.expandByPoint(ot)) : (this.boundingBox.expandByPoint(Mt.min), this.boundingBox.expandByPoint(Mt.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new tr());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new F(), 1 / 0);
      return;
    }
    if (e) {
      const n = this.boundingSphere.center;
      if (Mt.setFromBufferAttribute(e), t)
        for (let s = 0, a = t.length; s < a; s++) {
          const o = t[s];
          zn.setFromBufferAttribute(o), this.morphTargetsRelative ? (ot.addVectors(Mt.min, zn.min), Mt.expandByPoint(ot), ot.addVectors(Mt.max, zn.max), Mt.expandByPoint(ot)) : (Mt.expandByPoint(zn.min), Mt.expandByPoint(zn.max));
        }
      Mt.getCenter(n);
      let r = 0;
      for (let s = 0, a = e.count; s < a; s++)
        ot.fromBufferAttribute(e, s), r = Math.max(r, n.distanceToSquared(ot));
      if (t)
        for (let s = 0, a = t.length; s < a; s++) {
          const o = t[s], l = this.morphTargetsRelative;
          for (let c = 0, h = o.count; c < h; c++)
            ot.fromBufferAttribute(o, c), l && (yn.fromBufferAttribute(e, c), ot.add(yn)), r = Math.max(r, n.distanceToSquared(ot));
        }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const e = this.index, t = this.attributes;
    if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = t.position, r = t.normal, s = t.uv;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Ft(new Float32Array(4 * n.count), 4));
    const a = this.getAttribute("tangent"), o = [], l = [];
    for (let C = 0; C < n.count; C++)
      o[C] = new F(), l[C] = new F();
    const c = new F(), h = new F(), d = new F(), f = new Ie(), m = new Ie(), M = new Ie(), E = new F(), p = new F();
    function u(C, S, g) {
      c.fromBufferAttribute(n, C), h.fromBufferAttribute(n, S), d.fromBufferAttribute(n, g), f.fromBufferAttribute(s, C), m.fromBufferAttribute(s, S), M.fromBufferAttribute(s, g), h.sub(c), d.sub(c), m.sub(f), M.sub(f);
      const w = 1 / (m.x * M.y - M.x * m.y);
      isFinite(w) && (E.copy(h).multiplyScalar(M.y).addScaledVector(d, -m.y).multiplyScalar(w), p.copy(d).multiplyScalar(m.x).addScaledVector(h, -M.x).multiplyScalar(w), o[C].add(E), o[S].add(E), o[g].add(E), l[C].add(p), l[S].add(p), l[g].add(p));
    }
    let A = this.groups;
    A.length === 0 && (A = [{
      start: 0,
      count: e.count
    }]);
    for (let C = 0, S = A.length; C < S; ++C) {
      const g = A[C], w = g.start, z = g.count;
      for (let O = w, k = w + z; O < k; O += 3)
        u(
          e.getX(O + 0),
          e.getX(O + 1),
          e.getX(O + 2)
        );
    }
    const y = new F(), v = new F(), I = new F(), b = new F();
    function R(C) {
      I.fromBufferAttribute(r, C), b.copy(I);
      const S = o[C];
      y.copy(S), y.sub(I.multiplyScalar(I.dot(S))).normalize(), v.crossVectors(b, S);
      const w = v.dot(l[C]) < 0 ? -1 : 1;
      a.setXYZW(C, y.x, y.y, y.z, w);
    }
    for (let C = 0, S = A.length; C < S; ++C) {
      const g = A[C], w = g.start, z = g.count;
      for (let O = w, k = w + z; O < k; O += 3)
        R(e.getX(O + 0)), R(e.getX(O + 1)), R(e.getX(O + 2));
    }
  }
  computeVertexNormals() {
    const e = this.index, t = this.getAttribute("position");
    if (t !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0)
        n = new Ft(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let f = 0, m = n.count; f < m; f++)
          n.setXYZ(f, 0, 0, 0);
      const r = new F(), s = new F(), a = new F(), o = new F(), l = new F(), c = new F(), h = new F(), d = new F();
      if (e)
        for (let f = 0, m = e.count; f < m; f += 3) {
          const M = e.getX(f + 0), E = e.getX(f + 1), p = e.getX(f + 2);
          r.fromBufferAttribute(t, M), s.fromBufferAttribute(t, E), a.fromBufferAttribute(t, p), h.subVectors(a, s), d.subVectors(r, s), h.cross(d), o.fromBufferAttribute(n, M), l.fromBufferAttribute(n, E), c.fromBufferAttribute(n, p), o.add(h), l.add(h), c.add(h), n.setXYZ(M, o.x, o.y, o.z), n.setXYZ(E, l.x, l.y, l.z), n.setXYZ(p, c.x, c.y, c.z);
        }
      else
        for (let f = 0, m = t.count; f < m; f += 3)
          r.fromBufferAttribute(t, f + 0), s.fromBufferAttribute(t, f + 1), a.fromBufferAttribute(t, f + 2), h.subVectors(a, s), d.subVectors(r, s), h.cross(d), n.setXYZ(f + 0, h.x, h.y, h.z), n.setXYZ(f + 1, h.x, h.y, h.z), n.setXYZ(f + 2, h.x, h.y, h.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, n = e.count; t < n; t++)
      ot.fromBufferAttribute(e, t), ot.normalize(), e.setXYZ(t, ot.x, ot.y, ot.z);
  }
  toNonIndexed() {
    function e(o, l) {
      const c = o.array, h = o.itemSize, d = o.normalized, f = new c.constructor(l.length * h);
      let m = 0, M = 0;
      for (let E = 0, p = l.length; E < p; E++) {
        o.isInterleavedBufferAttribute ? m = l[E] * o.data.stride + o.offset : m = l[E] * h;
        for (let u = 0; u < h; u++)
          f[M++] = c[m++];
      }
      return new Ft(f, h, d);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const t = new Ot(), n = this.index.array, r = this.attributes;
    for (const o in r) {
      const l = r[o], c = e(l, n);
      t.setAttribute(o, c);
    }
    const s = this.morphAttributes;
    for (const o in s) {
      const l = [], c = s[o];
      for (let h = 0, d = c.length; h < d; h++) {
        const f = c[h], m = e(f, n);
        l.push(m);
      }
      t.morphAttributes[o] = l;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let o = 0, l = a.length; o < l; o++) {
      const c = a[o];
      t.addGroup(c.start, c.count, c.materialIndex);
    }
    return t;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0) {
      const l = this.parameters;
      for (const c in l)
        l[c] !== void 0 && (e[c] = l[c]);
      return e;
    }
    e.data = { attributes: {} };
    const t = this.index;
    t !== null && (e.data.index = {
      type: t.array.constructor.name,
      array: Array.prototype.slice.call(t.array)
    });
    const n = this.attributes;
    for (const l in n) {
      const c = n[l];
      e.data.attributes[l] = c.toJSON(e.data);
    }
    const r = {};
    let s = !1;
    for (const l in this.morphAttributes) {
      const c = this.morphAttributes[l], h = [];
      for (let d = 0, f = c.length; d < f; d++) {
        const m = c[d];
        h.push(m.toJSON(e.data));
      }
      h.length > 0 && (r[l] = h, s = !0);
    }
    s && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
    const a = this.groups;
    a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
    const o = this.boundingSphere;
    return o !== null && (e.data.boundingSphere = {
      center: o.center.toArray(),
      radius: o.radius
    }), e;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const t = {};
    this.name = e.name;
    const n = e.index;
    n !== null && this.setIndex(n.clone(t));
    const r = e.attributes;
    for (const c in r) {
      const h = r[c];
      this.setAttribute(c, h.clone(t));
    }
    const s = e.morphAttributes;
    for (const c in s) {
      const h = [], d = s[c];
      for (let f = 0, m = d.length; f < m; f++)
        h.push(d[f].clone(t));
      this.morphAttributes[c] = h;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const a = e.groups;
    for (let c = 0, h = a.length; c < h; c++) {
      const d = a[c];
      this.addGroup(d.start, d.count, d.materialIndex);
    }
    const o = e.boundingBox;
    o !== null && (this.boundingBox = o.clone());
    const l = e.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const Ur = /* @__PURE__ */ new nt(), sn = /* @__PURE__ */ new $s(), si = /* @__PURE__ */ new tr(), Ir = /* @__PURE__ */ new F(), ai = /* @__PURE__ */ new F(), oi = /* @__PURE__ */ new F(), li = /* @__PURE__ */ new F(), ki = /* @__PURE__ */ new F(), ci = /* @__PURE__ */ new F(), Fr = /* @__PURE__ */ new F(), ui = /* @__PURE__ */ new F();
class Et extends ht {
  constructor(e = new Ot(), t = new Es()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const r = t[n[0]];
      if (r !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let s = 0, a = r.length; s < a; s++) {
          const o = r[s].name || String(s);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = s;
        }
      }
    }
  }
  getVertexPosition(e, t) {
    const n = this.geometry, r = n.attributes.position, s = n.morphAttributes.position, a = n.morphTargetsRelative;
    t.fromBufferAttribute(r, e);
    const o = this.morphTargetInfluences;
    if (s && o) {
      ci.set(0, 0, 0);
      for (let l = 0, c = s.length; l < c; l++) {
        const h = o[l], d = s[l];
        h !== 0 && (ki.fromBufferAttribute(d, e), a ? ci.addScaledVector(ki, h) : ci.addScaledVector(ki.sub(t), h));
      }
      t.add(ci);
    }
    return t;
  }
  raycast(e, t) {
    const n = this.geometry, r = this.material, s = this.matrixWorld;
    r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), si.copy(n.boundingSphere), si.applyMatrix4(s), sn.copy(e.ray).recast(e.near), !(si.containsPoint(sn.origin) === !1 && (sn.intersectSphere(si, Ir) === null || sn.origin.distanceToSquared(Ir) > (e.far - e.near) ** 2)) && (Ur.copy(s).invert(), sn.copy(e.ray).applyMatrix4(Ur), !(n.boundingBox !== null && sn.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, sn)));
  }
  _computeIntersections(e, t, n) {
    let r;
    const s = this.geometry, a = this.material, o = s.index, l = s.attributes.position, c = s.attributes.uv, h = s.attributes.uv1, d = s.attributes.normal, f = s.groups, m = s.drawRange;
    if (o !== null)
      if (Array.isArray(a))
        for (let M = 0, E = f.length; M < E; M++) {
          const p = f[M], u = a[p.materialIndex], A = Math.max(p.start, m.start), y = Math.min(o.count, Math.min(p.start + p.count, m.start + m.count));
          for (let v = A, I = y; v < I; v += 3) {
            const b = o.getX(v), R = o.getX(v + 1), C = o.getX(v + 2);
            r = hi(this, u, e, n, c, h, d, b, R, C), r && (r.faceIndex = Math.floor(v / 3), r.face.materialIndex = p.materialIndex, t.push(r));
          }
        }
      else {
        const M = Math.max(0, m.start), E = Math.min(o.count, m.start + m.count);
        for (let p = M, u = E; p < u; p += 3) {
          const A = o.getX(p), y = o.getX(p + 1), v = o.getX(p + 2);
          r = hi(this, a, e, n, c, h, d, A, y, v), r && (r.faceIndex = Math.floor(p / 3), t.push(r));
        }
      }
    else if (l !== void 0)
      if (Array.isArray(a))
        for (let M = 0, E = f.length; M < E; M++) {
          const p = f[M], u = a[p.materialIndex], A = Math.max(p.start, m.start), y = Math.min(l.count, Math.min(p.start + p.count, m.start + m.count));
          for (let v = A, I = y; v < I; v += 3) {
            const b = v, R = v + 1, C = v + 2;
            r = hi(this, u, e, n, c, h, d, b, R, C), r && (r.faceIndex = Math.floor(v / 3), r.face.materialIndex = p.materialIndex, t.push(r));
          }
        }
      else {
        const M = Math.max(0, m.start), E = Math.min(l.count, m.start + m.count);
        for (let p = M, u = E; p < u; p += 3) {
          const A = p, y = p + 1, v = p + 2;
          r = hi(this, a, e, n, c, h, d, A, y, v), r && (r.faceIndex = Math.floor(p / 3), t.push(r));
        }
      }
  }
}
function sa(i, e, t, n, r, s, a, o) {
  let l;
  if (e.side === 1 ? l = n.intersectTriangle(a, s, r, !0, o) : l = n.intersectTriangle(r, s, a, e.side === 0, o), l === null) return null;
  ui.copy(o), ui.applyMatrix4(i.matrixWorld);
  const c = t.ray.origin.distanceTo(ui);
  return c < t.near || c > t.far ? null : {
    distance: c,
    point: ui.clone(),
    object: i
  };
}
function hi(i, e, t, n, r, s, a, o, l, c) {
  i.getVertexPosition(o, ai), i.getVertexPosition(l, oi), i.getVertexPosition(c, li);
  const h = sa(i, e, t, n, ai, oi, li, Fr);
  if (h) {
    const d = new F();
    Lt.getBarycoord(Fr, ai, oi, li, d), r && (h.uv = Lt.getInterpolatedAttribute(r, o, l, c, d, new Ie())), s && (h.uv1 = Lt.getInterpolatedAttribute(s, o, l, c, d, new Ie())), a && (h.normal = Lt.getInterpolatedAttribute(a, o, l, c, d, new F()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const f = {
      a: o,
      b: l,
      c,
      normal: new F(),
      materialIndex: 0
    };
    Lt.getNormal(ai, oi, li, f.normal), h.face = f, h.barycoord = d;
  }
  return h;
}
class Ln extends Ot {
  constructor(e = 1, t = 1, n = 1, r = 1, s = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: e,
      height: t,
      depth: n,
      widthSegments: r,
      heightSegments: s,
      depthSegments: a
    };
    const o = this;
    r = Math.floor(r), s = Math.floor(s), a = Math.floor(a);
    const l = [], c = [], h = [], d = [];
    let f = 0, m = 0;
    M("z", "y", "x", -1, -1, n, t, e, a, s, 0), M("z", "y", "x", 1, -1, n, t, -e, a, s, 1), M("x", "z", "y", 1, 1, e, n, t, r, a, 2), M("x", "z", "y", 1, -1, e, n, -t, r, a, 3), M("x", "y", "z", 1, -1, e, t, n, r, s, 4), M("x", "y", "z", -1, -1, e, t, -n, r, s, 5), this.setIndex(l), this.setAttribute("position", new dt(c, 3)), this.setAttribute("normal", new dt(h, 3)), this.setAttribute("uv", new dt(d, 2));
    function M(E, p, u, A, y, v, I, b, R, C, S) {
      const g = v / R, w = I / C, z = v / 2, O = I / 2, k = b / 2, Z = R + 1, W = C + 1;
      let Q = 0, H = 0;
      const ie = new F();
      for (let ce = 0; ce < W; ce++) {
        const xe = ce * w - O;
        for (let Le = 0; Le < Z; Le++) {
          const Ye = Le * g - z;
          ie[E] = Ye * A, ie[p] = xe * y, ie[u] = k, c.push(ie.x, ie.y, ie.z), ie[E] = 0, ie[p] = 0, ie[u] = b > 0 ? 1 : -1, h.push(ie.x, ie.y, ie.z), d.push(Le / R), d.push(1 - ce / C), Q += 1;
        }
      }
      for (let ce = 0; ce < C; ce++)
        for (let xe = 0; xe < R; xe++) {
          const Le = f + xe + Z * ce, Ye = f + xe + Z * (ce + 1), q = f + (xe + 1) + Z * (ce + 1), ee = f + (xe + 1) + Z * ce;
          l.push(Le, Ye, ee), l.push(Ye, q, ee), H += 6;
        }
      o.addGroup(m, H, S), m += H, f += Q;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new Ln(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
function Cn(i) {
  const e = {};
  for (const t in i) {
    e[t] = {};
    for (const n in i[t]) {
      const r = i[t][n];
      r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion) ? r.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[t][n] = null) : e[t][n] = r.clone() : Array.isArray(r) ? e[t][n] = r.slice() : e[t][n] = r;
    }
  }
  return e;
}
function ft(i) {
  const e = {};
  for (let t = 0; t < i.length; t++) {
    const n = Cn(i[t]);
    for (const r in n)
      e[r] = n[r];
  }
  return e;
}
function aa(i) {
  const e = [];
  for (let t = 0; t < i.length; t++)
    e.push(i[t].clone());
  return e;
}
function As(i) {
  const e = i.getRenderTarget();
  return e === null ? i.outputColorSpace : e.isXRRenderTarget === !0 ? e.texture.colorSpace : ze.workingColorSpace;
}
const oa = { clone: Cn, merge: ft };
var la = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, ca = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class en extends Yn {
  static get type() {
    return "ShaderMaterial";
  }
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = la, this.fragmentShader = ca, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      // set to use vertex shader clipping
      multiDraw: !1
      // set to use vertex shader multi_draw / enable gl_DrawID
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = Cn(e.uniforms), this.uniformsGroups = aa(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const r in this.uniforms) {
      const a = this.uniforms[r].value;
      a && a.isTexture ? t.uniforms[r] = {
        type: "t",
        value: a.toJSON(e).uuid
      } : a && a.isColor ? t.uniforms[r] = {
        type: "c",
        value: a.getHex()
      } : a && a.isVector2 ? t.uniforms[r] = {
        type: "v2",
        value: a.toArray()
      } : a && a.isVector3 ? t.uniforms[r] = {
        type: "v3",
        value: a.toArray()
      } : a && a.isVector4 ? t.uniforms[r] = {
        type: "v4",
        value: a.toArray()
      } : a && a.isMatrix3 ? t.uniforms[r] = {
        type: "m3",
        value: a.toArray()
      } : a && a.isMatrix4 ? t.uniforms[r] = {
        type: "m4",
        value: a.toArray()
      } : t.uniforms[r] = {
        value: a
      };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const n = {};
    for (const r in this.extensions)
      this.extensions[r] === !0 && (n[r] = !0);
    return Object.keys(n).length > 0 && (t.extensions = n), t;
  }
}
class bs extends ht {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new nt(), this.projectionMatrix = new nt(), this.projectionMatrixInverse = new nt(), this.coordinateSystem = 2e3;
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(e, t) {
    super.updateWorldMatrix(e, t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Qt = /* @__PURE__ */ new F(), Nr = /* @__PURE__ */ new Ie(), Or = /* @__PURE__ */ new Ie();
class bt extends bs {
  constructor(e = 50, t = 1, n = 0.1, r = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current .filmGauge.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = Qi * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength() {
    const e = Math.tan(yi * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return Qi * 2 * Math.atan(
      Math.tan(yi * 0.5 * this.fov) / this.zoom
    );
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Computes the 2D bounds of the camera's viewable rectangle at a given distance along the viewing direction.
   * Sets minTarget and maxTarget to the coordinates of the lower-left and upper-right corners of the view rectangle.
   */
  getViewBounds(e, t, n) {
    Qt.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(Qt.x, Qt.y).multiplyScalar(-e / Qt.z), Qt.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(Qt.x, Qt.y).multiplyScalar(-e / Qt.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   * Copies the result into the target Vector2, where x is width and y is height.
   */
  getViewSize(e, t) {
    return this.getViewBounds(e, Nr, Or), t.subVectors(Or, Nr);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *
   * then for each monitor you would call it like this
   *
   *   const w = 1920;
   *   const h = 1080;
   *   const fullWidth = w * 3;
   *   const fullHeight = h * 2;
   *
   *   --A--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   *   --B--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   *   --C--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   *   --D--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   *   --E--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   *   --F--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   *
   *   Note there is no reason monitors have to be the same size or in a grid.
   */
  setViewOffset(e, t, n, r, s, a) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(yi * 0.5 * this.fov) / this.zoom, n = 2 * t, r = this.aspect * n, s = -0.5 * r;
    const a = this.view;
    if (this.view !== null && this.view.enabled) {
      const l = a.fullWidth, c = a.fullHeight;
      s += a.offsetX * r / l, t -= a.offsetY * n / c, r *= a.width / l, n *= a.height / c;
    }
    const o = this.filmOffset;
    o !== 0 && (s += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(s, s + r, t, t - n, e, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}
const Tn = -90, An = 1;
class ua extends ht {
  constructor(e, t, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const r = new bt(Tn, An, e, t);
    r.layers = this.layers, this.add(r);
    const s = new bt(Tn, An, e, t);
    s.layers = this.layers, this.add(s);
    const a = new bt(Tn, An, e, t);
    a.layers = this.layers, this.add(a);
    const o = new bt(Tn, An, e, t);
    o.layers = this.layers, this.add(o);
    const l = new bt(Tn, An, e, t);
    l.layers = this.layers, this.add(l);
    const c = new bt(Tn, An, e, t);
    c.layers = this.layers, this.add(c);
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [n, r, s, a, o, l] = t;
    for (const c of t) this.remove(c);
    if (e === 2e3)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), s.up.set(0, 0, -1), s.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);
    else if (e === 2001)
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), s.up.set(0, 0, 1), s.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const c of t)
      this.add(c), c.updateMatrixWorld();
  }
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: r } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [s, a, o, l, c, h] = this.children, d = e.getRenderTarget(), f = e.getActiveCubeFace(), m = e.getActiveMipmapLevel(), M = e.xr.enabled;
    e.xr.enabled = !1;
    const E = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1, e.setRenderTarget(n, 0, r), e.render(t, s), e.setRenderTarget(n, 1, r), e.render(t, a), e.setRenderTarget(n, 2, r), e.render(t, o), e.setRenderTarget(n, 3, r), e.render(t, l), e.setRenderTarget(n, 4, r), e.render(t, c), n.texture.generateMipmaps = E, e.setRenderTarget(n, 5, r), e.render(t, h), e.setRenderTarget(d, f, m), e.xr.enabled = M, n.texture.needsPMREMUpdate = !0;
  }
}
class Rs extends pt {
  constructor(e, t, n, r, s, a, o, l, c, h) {
    e = e !== void 0 ? e : [], t = t !== void 0 ? t : 301, super(e, t, n, r, s, a, o, l, c, h), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class ha extends dn {
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const n = { width: e, height: e, depth: 1 }, r = [n, n, n, n, n, n];
    this.texture = new Rs(r, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = t.generateMipmaps !== void 0 ? t.generateMipmaps : !1, this.texture.minFilter = t.minFilter !== void 0 ? t.minFilter : 1006;
  }
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
    const n = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      )
    }, r = new Ln(5, 5, 5), s = new en({
      name: "CubemapFromEquirect",
      uniforms: Cn(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: 1,
      blending: 0
    });
    s.uniforms.tEquirect.value = t;
    const a = new Et(r, s), o = t.minFilter;
    return t.minFilter === 1008 && (t.minFilter = 1006), new ua(1, 10, this).update(e, a), t.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
  }
  clear(e, t, n, r) {
    const s = e.getRenderTarget();
    for (let a = 0; a < 6; a++)
      e.setRenderTarget(this, a), e.clear(t, n, r);
    e.setRenderTarget(s);
  }
}
const Wi = /* @__PURE__ */ new F(), da = /* @__PURE__ */ new F(), fa = /* @__PURE__ */ new Ce();
class cn {
  constructor(e = new F(1, 0, 0), t = 0) {
    this.isPlane = !0, this.normal = e, this.constant = t;
  }
  set(e, t) {
    return this.normal.copy(e), this.constant = t, this;
  }
  setComponents(e, t, n, r) {
    return this.normal.set(e, t, n), this.constant = r, this;
  }
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  setFromCoplanarPoints(e, t, n) {
    const r = Wi.subVectors(n, t).cross(da.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(r, e), this;
  }
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, t) {
    const n = e.delta(Wi), r = this.normal.dot(n);
    if (r === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const s = -(e.start.dot(this.normal) + this.constant) / r;
    return s < 0 || s > 1 ? null : t.copy(e.start).addScaledVector(n, s);
  }
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
    return t < 0 && n > 0 || n < 0 && t > 0;
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, t) {
    const n = t || fa.getNormalMatrix(e), r = this.coplanarPoint(Wi).applyMatrix4(e), s = this.normal.applyMatrix3(n).normalize();
    return this.constant = -r.dot(s), this;
  }
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const an = /* @__PURE__ */ new tr(), di = /* @__PURE__ */ new F();
class nr {
  constructor(e = new cn(), t = new cn(), n = new cn(), r = new cn(), s = new cn(), a = new cn()) {
    this.planes = [e, t, n, r, s, a];
  }
  set(e, t, n, r, s, a) {
    const o = this.planes;
    return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(r), o[4].copy(s), o[5].copy(a), this;
  }
  copy(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      t[n].copy(e.planes[n]);
    return this;
  }
  setFromProjectionMatrix(e, t = 2e3) {
    const n = this.planes, r = e.elements, s = r[0], a = r[1], o = r[2], l = r[3], c = r[4], h = r[5], d = r[6], f = r[7], m = r[8], M = r[9], E = r[10], p = r[11], u = r[12], A = r[13], y = r[14], v = r[15];
    if (n[0].setComponents(l - s, f - c, p - m, v - u).normalize(), n[1].setComponents(l + s, f + c, p + m, v + u).normalize(), n[2].setComponents(l + a, f + h, p + M, v + A).normalize(), n[3].setComponents(l - a, f - h, p - M, v - A).normalize(), n[4].setComponents(l - o, f - d, p - E, v - y).normalize(), t === 2e3)
      n[5].setComponents(l + o, f + d, p + E, v + y).normalize();
    else if (t === 2001)
      n[5].setComponents(o, d, E, y).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), an.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), an.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(an);
  }
  intersectsSprite(e) {
    return an.center.set(0, 0, 0), an.radius = 0.7071067811865476, an.applyMatrix4(e.matrixWorld), this.intersectsSphere(an);
  }
  intersectsSphere(e) {
    const t = this.planes, n = e.center, r = -e.radius;
    for (let s = 0; s < 6; s++)
      if (t[s].distanceToPoint(n) < r)
        return !1;
    return !0;
  }
  intersectsBox(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) {
      const r = t[n];
      if (di.x = r.normal.x > 0 ? e.max.x : e.min.x, di.y = r.normal.y > 0 ? e.max.y : e.min.y, di.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(di) < 0)
        return !1;
    }
    return !0;
  }
  containsPoint(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      if (t[n].distanceToPoint(e) < 0)
        return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function ws() {
  let i = null, e = !1, t = null, n = null;
  function r(s, a) {
    t(s, a), n = i.requestAnimationFrame(r);
  }
  return {
    start: function() {
      e !== !0 && t !== null && (n = i.requestAnimationFrame(r), e = !0);
    },
    stop: function() {
      i.cancelAnimationFrame(n), e = !1;
    },
    setAnimationLoop: function(s) {
      t = s;
    },
    setContext: function(s) {
      i = s;
    }
  };
}
function pa(i) {
  const e = /* @__PURE__ */ new WeakMap();
  function t(o, l) {
    const c = o.array, h = o.usage, d = c.byteLength, f = i.createBuffer();
    i.bindBuffer(l, f), i.bufferData(l, c, h), o.onUploadCallback();
    let m;
    if (c instanceof Float32Array)
      m = i.FLOAT;
    else if (c instanceof Uint16Array)
      o.isFloat16BufferAttribute ? m = i.HALF_FLOAT : m = i.UNSIGNED_SHORT;
    else if (c instanceof Int16Array)
      m = i.SHORT;
    else if (c instanceof Uint32Array)
      m = i.UNSIGNED_INT;
    else if (c instanceof Int32Array)
      m = i.INT;
    else if (c instanceof Int8Array)
      m = i.BYTE;
    else if (c instanceof Uint8Array)
      m = i.UNSIGNED_BYTE;
    else if (c instanceof Uint8ClampedArray)
      m = i.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c);
    return {
      buffer: f,
      type: m,
      bytesPerElement: c.BYTES_PER_ELEMENT,
      version: o.version,
      size: d
    };
  }
  function n(o, l, c) {
    const h = l.array, d = l.updateRanges;
    if (i.bindBuffer(c, o), d.length === 0)
      i.bufferSubData(c, 0, h);
    else {
      d.sort((m, M) => m.start - M.start);
      let f = 0;
      for (let m = 1; m < d.length; m++) {
        const M = d[f], E = d[m];
        E.start <= M.start + M.count + 1 ? M.count = Math.max(
          M.count,
          E.start + E.count - M.start
        ) : (++f, d[f] = E);
      }
      d.length = f + 1;
      for (let m = 0, M = d.length; m < M; m++) {
        const E = d[m];
        i.bufferSubData(
          c,
          E.start * h.BYTES_PER_ELEMENT,
          h,
          E.start,
          E.count
        );
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function r(o) {
    return o.isInterleavedBufferAttribute && (o = o.data), e.get(o);
  }
  function s(o) {
    o.isInterleavedBufferAttribute && (o = o.data);
    const l = e.get(o);
    l && (i.deleteBuffer(l.buffer), e.delete(o));
  }
  function a(o, l) {
    if (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute) {
      const h = e.get(o);
      (!h || h.version < o.version) && e.set(o, {
        buffer: o.buffer,
        type: o.type,
        bytesPerElement: o.elementSize,
        version: o.version
      });
      return;
    }
    const c = e.get(o);
    if (c === void 0)
      e.set(o, t(o, l));
    else if (c.version < o.version) {
      if (c.size !== o.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      n(c.buffer, o, l), c.version = o.version;
    }
  }
  return {
    get: r,
    remove: s,
    update: a
  };
}
class Mi extends Ot {
  constructor(e = 1, t = 1, n = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: t,
      widthSegments: n,
      heightSegments: r
    };
    const s = e / 2, a = t / 2, o = Math.floor(n), l = Math.floor(r), c = o + 1, h = l + 1, d = e / o, f = t / l, m = [], M = [], E = [], p = [];
    for (let u = 0; u < h; u++) {
      const A = u * f - a;
      for (let y = 0; y < c; y++) {
        const v = y * d - s;
        M.push(v, -A, 0), E.push(0, 0, 1), p.push(y / o), p.push(1 - u / l);
      }
    }
    for (let u = 0; u < l; u++)
      for (let A = 0; A < o; A++) {
        const y = A + c * u, v = A + c * (u + 1), I = A + 1 + c * (u + 1), b = A + 1 + c * u;
        m.push(y, v, b), m.push(v, I, b);
      }
    this.setIndex(m), this.setAttribute("position", new dt(M, 3)), this.setAttribute("normal", new dt(E, 3)), this.setAttribute("uv", new dt(p, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new Mi(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
var ma = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, _a = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, ga = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, va = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, xa = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, Ma = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, Sa = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, Ea = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, ya = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`, Ta = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, Aa = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, ba = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, Ra = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, wa = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, Ca = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, Pa = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, Da = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, La = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, Ua = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, Ia = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, Fa = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, Na = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`, Oa = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`, Ba = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, Ga = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, za = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, Va = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, Ha = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, ka = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, Wa = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, Xa = "gl_FragColor = linearToOutputTexel( gl_FragColor );", qa = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, Ya = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`, Ka = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, Za = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, $a = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, ja = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, Ja = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Qa = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, eo = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, to = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, no = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, io = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, ro = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, so = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, ao = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, oo = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, lo = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, co = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, uo = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, ho = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, fo = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, po = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, mo = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, _o = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, go = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, vo = `#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, xo = `#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Mo = `#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, So = `#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, Eo = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, yo = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, To = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, Ao = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, bo = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, Ro = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, wo = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, Co = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, Po = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Do = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, Lo = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Uo = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, Io = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, Fo = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, No = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Oo = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, Bo = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, Go = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, zo = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, Vo = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, Ho = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, ko = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Wo = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`, Xo = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, qo = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, Yo = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Ko = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, Zo = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, $o = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, jo = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`, Jo = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, Qo = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, el = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, tl = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, nl = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, il = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, rl = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, sl = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, al = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, ol = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, ll = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, cl = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, ul = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, hl = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, dl = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, fl = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, pl = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const ml = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, _l = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, gl = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, vl = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, xl = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Ml = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Sl = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, El = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, yl = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, Tl = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`, Al = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, bl = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Rl = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, wl = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Cl = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, Pl = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Dl = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Ll = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Ul = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, Il = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Fl = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, Nl = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, Ol = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Bl = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Gl = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, zl = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Vl = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Hl = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, kl = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, Wl = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Xl = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, ql = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Yl = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, Kl = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, De = {
  alphahash_fragment: ma,
  alphahash_pars_fragment: _a,
  alphamap_fragment: ga,
  alphamap_pars_fragment: va,
  alphatest_fragment: xa,
  alphatest_pars_fragment: Ma,
  aomap_fragment: Sa,
  aomap_pars_fragment: Ea,
  batching_pars_vertex: ya,
  batching_vertex: Ta,
  begin_vertex: Aa,
  beginnormal_vertex: ba,
  bsdfs: Ra,
  iridescence_fragment: wa,
  bumpmap_pars_fragment: Ca,
  clipping_planes_fragment: Pa,
  clipping_planes_pars_fragment: Da,
  clipping_planes_pars_vertex: La,
  clipping_planes_vertex: Ua,
  color_fragment: Ia,
  color_pars_fragment: Fa,
  color_pars_vertex: Na,
  color_vertex: Oa,
  common: Ba,
  cube_uv_reflection_fragment: Ga,
  defaultnormal_vertex: za,
  displacementmap_pars_vertex: Va,
  displacementmap_vertex: Ha,
  emissivemap_fragment: ka,
  emissivemap_pars_fragment: Wa,
  colorspace_fragment: Xa,
  colorspace_pars_fragment: qa,
  envmap_fragment: Ya,
  envmap_common_pars_fragment: Ka,
  envmap_pars_fragment: Za,
  envmap_pars_vertex: $a,
  envmap_physical_pars_fragment: oo,
  envmap_vertex: ja,
  fog_vertex: Ja,
  fog_pars_vertex: Qa,
  fog_fragment: eo,
  fog_pars_fragment: to,
  gradientmap_pars_fragment: no,
  lightmap_pars_fragment: io,
  lights_lambert_fragment: ro,
  lights_lambert_pars_fragment: so,
  lights_pars_begin: ao,
  lights_toon_fragment: lo,
  lights_toon_pars_fragment: co,
  lights_phong_fragment: uo,
  lights_phong_pars_fragment: ho,
  lights_physical_fragment: fo,
  lights_physical_pars_fragment: po,
  lights_fragment_begin: mo,
  lights_fragment_maps: _o,
  lights_fragment_end: go,
  logdepthbuf_fragment: vo,
  logdepthbuf_pars_fragment: xo,
  logdepthbuf_pars_vertex: Mo,
  logdepthbuf_vertex: So,
  map_fragment: Eo,
  map_pars_fragment: yo,
  map_particle_fragment: To,
  map_particle_pars_fragment: Ao,
  metalnessmap_fragment: bo,
  metalnessmap_pars_fragment: Ro,
  morphinstance_vertex: wo,
  morphcolor_vertex: Co,
  morphnormal_vertex: Po,
  morphtarget_pars_vertex: Do,
  morphtarget_vertex: Lo,
  normal_fragment_begin: Uo,
  normal_fragment_maps: Io,
  normal_pars_fragment: Fo,
  normal_pars_vertex: No,
  normal_vertex: Oo,
  normalmap_pars_fragment: Bo,
  clearcoat_normal_fragment_begin: Go,
  clearcoat_normal_fragment_maps: zo,
  clearcoat_pars_fragment: Vo,
  iridescence_pars_fragment: Ho,
  opaque_fragment: ko,
  packing: Wo,
  premultiplied_alpha_fragment: Xo,
  project_vertex: qo,
  dithering_fragment: Yo,
  dithering_pars_fragment: Ko,
  roughnessmap_fragment: Zo,
  roughnessmap_pars_fragment: $o,
  shadowmap_pars_fragment: jo,
  shadowmap_pars_vertex: Jo,
  shadowmap_vertex: Qo,
  shadowmask_pars_fragment: el,
  skinbase_vertex: tl,
  skinning_pars_vertex: nl,
  skinning_vertex: il,
  skinnormal_vertex: rl,
  specularmap_fragment: sl,
  specularmap_pars_fragment: al,
  tonemapping_fragment: ol,
  tonemapping_pars_fragment: ll,
  transmission_fragment: cl,
  transmission_pars_fragment: ul,
  uv_pars_fragment: hl,
  uv_pars_vertex: dl,
  uv_vertex: fl,
  worldpos_vertex: pl,
  background_vert: ml,
  background_frag: _l,
  backgroundCube_vert: gl,
  backgroundCube_frag: vl,
  cube_vert: xl,
  cube_frag: Ml,
  depth_vert: Sl,
  depth_frag: El,
  distanceRGBA_vert: yl,
  distanceRGBA_frag: Tl,
  equirect_vert: Al,
  equirect_frag: bl,
  linedashed_vert: Rl,
  linedashed_frag: wl,
  meshbasic_vert: Cl,
  meshbasic_frag: Pl,
  meshlambert_vert: Dl,
  meshlambert_frag: Ll,
  meshmatcap_vert: Ul,
  meshmatcap_frag: Il,
  meshnormal_vert: Fl,
  meshnormal_frag: Nl,
  meshphong_vert: Ol,
  meshphong_frag: Bl,
  meshphysical_vert: Gl,
  meshphysical_frag: zl,
  meshtoon_vert: Vl,
  meshtoon_frag: Hl,
  points_vert: kl,
  points_frag: Wl,
  shadow_vert: Xl,
  shadow_frag: ql,
  sprite_vert: Yl,
  sprite_frag: Kl
}, te = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Ve(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Ce() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ce() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Ce() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new Ce() },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 }
    // basic, lambert, phong
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new Ce() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Ce() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Ce() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Ce() },
    normalScale: { value: /* @__PURE__ */ new Ie(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Ce() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Ce() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Ce() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Ce() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Ve(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMap: { value: [] },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotShadowMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMap: { value: [] },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new Ve(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ce() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Ce() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Ve(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new Ie(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Ce() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ce() },
    alphaTest: { value: 0 }
  }
}, It = {
  basic: {
    uniforms: /* @__PURE__ */ ft([
      te.common,
      te.specularmap,
      te.envmap,
      te.aomap,
      te.lightmap,
      te.fog
    ]),
    vertexShader: De.meshbasic_vert,
    fragmentShader: De.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ ft([
      te.common,
      te.specularmap,
      te.envmap,
      te.aomap,
      te.lightmap,
      te.emissivemap,
      te.bumpmap,
      te.normalmap,
      te.displacementmap,
      te.fog,
      te.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ve(0) }
      }
    ]),
    vertexShader: De.meshlambert_vert,
    fragmentShader: De.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ ft([
      te.common,
      te.specularmap,
      te.envmap,
      te.aomap,
      te.lightmap,
      te.emissivemap,
      te.bumpmap,
      te.normalmap,
      te.displacementmap,
      te.fog,
      te.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ve(0) },
        specular: { value: /* @__PURE__ */ new Ve(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: De.meshphong_vert,
    fragmentShader: De.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ ft([
      te.common,
      te.envmap,
      te.aomap,
      te.lightmap,
      te.emissivemap,
      te.bumpmap,
      te.normalmap,
      te.displacementmap,
      te.roughnessmap,
      te.metalnessmap,
      te.fog,
      te.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ve(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: De.meshphysical_vert,
    fragmentShader: De.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ ft([
      te.common,
      te.aomap,
      te.lightmap,
      te.emissivemap,
      te.bumpmap,
      te.normalmap,
      te.displacementmap,
      te.gradientmap,
      te.fog,
      te.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ve(0) }
      }
    ]),
    vertexShader: De.meshtoon_vert,
    fragmentShader: De.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ ft([
      te.common,
      te.bumpmap,
      te.normalmap,
      te.displacementmap,
      te.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: De.meshmatcap_vert,
    fragmentShader: De.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ ft([
      te.points,
      te.fog
    ]),
    vertexShader: De.points_vert,
    fragmentShader: De.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ ft([
      te.common,
      te.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: De.linedashed_vert,
    fragmentShader: De.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ ft([
      te.common,
      te.displacementmap
    ]),
    vertexShader: De.depth_vert,
    fragmentShader: De.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ ft([
      te.common,
      te.bumpmap,
      te.normalmap,
      te.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: De.meshnormal_vert,
    fragmentShader: De.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ ft([
      te.sprite,
      te.fog
    ]),
    vertexShader: De.sprite_vert,
    fragmentShader: De.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Ce() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: De.background_vert,
    fragmentShader: De.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new Ce() }
    },
    vertexShader: De.backgroundCube_vert,
    fragmentShader: De.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: De.cube_vert,
    fragmentShader: De.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: De.equirect_vert,
    fragmentShader: De.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ ft([
      te.common,
      te.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new F() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: De.distanceRGBA_vert,
    fragmentShader: De.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ ft([
      te.lights,
      te.fog,
      {
        color: { value: /* @__PURE__ */ new Ve(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: De.shadow_vert,
    fragmentShader: De.shadow_frag
  }
};
It.physical = {
  uniforms: /* @__PURE__ */ ft([
    It.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new Ce() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Ce() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new Ie(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Ce() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new Ce() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Ce() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new Ve(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new Ce() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Ce() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new Ce() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new Ie() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new Ce() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new Ve(0) },
      specularColor: { value: /* @__PURE__ */ new Ve(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new Ce() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new Ce() },
      anisotropyVector: { value: /* @__PURE__ */ new Ie() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new Ce() }
    }
  ]),
  vertexShader: De.meshphysical_vert,
  fragmentShader: De.meshphysical_frag
};
const fi = { r: 0, b: 0, g: 0 }, on = /* @__PURE__ */ new Nt(), Zl = /* @__PURE__ */ new nt();
function $l(i, e, t, n, r, s, a) {
  const o = new Ve(0);
  let l = s === !0 ? 0 : 1, c, h, d = null, f = 0, m = null;
  function M(A) {
    let y = A.isScene === !0 ? A.background : null;
    return y && y.isTexture && (y = (A.backgroundBlurriness > 0 ? t : e).get(y)), y;
  }
  function E(A) {
    let y = !1;
    const v = M(A);
    v === null ? u(o, l) : v && v.isColor && (u(v, 1), y = !0);
    const I = i.xr.getEnvironmentBlendMode();
    I === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, a) : I === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, a), (i.autoClear || y) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
  }
  function p(A, y) {
    const v = M(y);
    v && (v.isCubeTexture || v.mapping === 306) ? (h === void 0 && (h = new Et(
      new Ln(1, 1, 1),
      new en({
        name: "BackgroundCubeMaterial",
        uniforms: Cn(It.backgroundCube.uniforms),
        vertexShader: It.backgroundCube.vertexShader,
        fragmentShader: It.backgroundCube.fragmentShader,
        side: 1,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), h.geometry.deleteAttribute("normal"), h.geometry.deleteAttribute("uv"), h.onBeforeRender = function(I, b, R) {
      this.matrixWorld.copyPosition(R.matrixWorld);
    }, Object.defineProperty(h.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), r.update(h)), on.copy(y.backgroundRotation), on.x *= -1, on.y *= -1, on.z *= -1, v.isCubeTexture && v.isRenderTargetTexture === !1 && (on.y *= -1, on.z *= -1), h.material.uniforms.envMap.value = v, h.material.uniforms.flipEnvMap.value = v.isCubeTexture && v.isRenderTargetTexture === !1 ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = y.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = y.backgroundIntensity, h.material.uniforms.backgroundRotation.value.setFromMatrix4(Zl.makeRotationFromEuler(on)), h.material.toneMapped = ze.getTransfer(v.colorSpace) !== qe, (d !== v || f !== v.version || m !== i.toneMapping) && (h.material.needsUpdate = !0, d = v, f = v.version, m = i.toneMapping), h.layers.enableAll(), A.unshift(h, h.geometry, h.material, 0, 0, null)) : v && v.isTexture && (c === void 0 && (c = new Et(
      new Mi(2, 2),
      new en({
        name: "BackgroundMaterial",
        uniforms: Cn(It.background.uniforms),
        vertexShader: It.background.vertexShader,
        fragmentShader: It.background.fragmentShader,
        side: 0,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), r.update(c)), c.material.uniforms.t2D.value = v, c.material.uniforms.backgroundIntensity.value = y.backgroundIntensity, c.material.toneMapped = ze.getTransfer(v.colorSpace) !== qe, v.matrixAutoUpdate === !0 && v.updateMatrix(), c.material.uniforms.uvTransform.value.copy(v.matrix), (d !== v || f !== v.version || m !== i.toneMapping) && (c.material.needsUpdate = !0, d = v, f = v.version, m = i.toneMapping), c.layers.enableAll(), A.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function u(A, y) {
    A.getRGB(fi, As(i)), n.buffers.color.setClear(fi.r, fi.g, fi.b, y, a);
  }
  return {
    getClearColor: function() {
      return o;
    },
    setClearColor: function(A, y = 1) {
      o.set(A), l = y, u(o, l);
    },
    getClearAlpha: function() {
      return l;
    },
    setClearAlpha: function(A) {
      l = A, u(o, l);
    },
    render: E,
    addToRenderList: p
  };
}
function jl(i, e) {
  const t = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, r = f(null);
  let s = r, a = !1;
  function o(g, w, z, O, k) {
    let Z = !1;
    const W = d(O, z, w);
    s !== W && (s = W, c(s.object)), Z = m(g, O, z, k), Z && M(g, O, z, k), k !== null && e.update(k, i.ELEMENT_ARRAY_BUFFER), (Z || a) && (a = !1, v(g, w, z, O), k !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.get(k).buffer));
  }
  function l() {
    return i.createVertexArray();
  }
  function c(g) {
    return i.bindVertexArray(g);
  }
  function h(g) {
    return i.deleteVertexArray(g);
  }
  function d(g, w, z) {
    const O = z.wireframe === !0;
    let k = n[g.id];
    k === void 0 && (k = {}, n[g.id] = k);
    let Z = k[w.id];
    Z === void 0 && (Z = {}, k[w.id] = Z);
    let W = Z[O];
    return W === void 0 && (W = f(l()), Z[O] = W), W;
  }
  function f(g) {
    const w = [], z = [], O = [];
    for (let k = 0; k < t; k++)
      w[k] = 0, z[k] = 0, O[k] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: w,
      enabledAttributes: z,
      attributeDivisors: O,
      object: g,
      attributes: {},
      index: null
    };
  }
  function m(g, w, z, O) {
    const k = s.attributes, Z = w.attributes;
    let W = 0;
    const Q = z.getAttributes();
    for (const H in Q)
      if (Q[H].location >= 0) {
        const ce = k[H];
        let xe = Z[H];
        if (xe === void 0 && (H === "instanceMatrix" && g.instanceMatrix && (xe = g.instanceMatrix), H === "instanceColor" && g.instanceColor && (xe = g.instanceColor)), ce === void 0 || ce.attribute !== xe || xe && ce.data !== xe.data) return !0;
        W++;
      }
    return s.attributesNum !== W || s.index !== O;
  }
  function M(g, w, z, O) {
    const k = {}, Z = w.attributes;
    let W = 0;
    const Q = z.getAttributes();
    for (const H in Q)
      if (Q[H].location >= 0) {
        let ce = Z[H];
        ce === void 0 && (H === "instanceMatrix" && g.instanceMatrix && (ce = g.instanceMatrix), H === "instanceColor" && g.instanceColor && (ce = g.instanceColor));
        const xe = {};
        xe.attribute = ce, ce && ce.data && (xe.data = ce.data), k[H] = xe, W++;
      }
    s.attributes = k, s.attributesNum = W, s.index = O;
  }
  function E() {
    const g = s.newAttributes;
    for (let w = 0, z = g.length; w < z; w++)
      g[w] = 0;
  }
  function p(g) {
    u(g, 0);
  }
  function u(g, w) {
    const z = s.newAttributes, O = s.enabledAttributes, k = s.attributeDivisors;
    z[g] = 1, O[g] === 0 && (i.enableVertexAttribArray(g), O[g] = 1), k[g] !== w && (i.vertexAttribDivisor(g, w), k[g] = w);
  }
  function A() {
    const g = s.newAttributes, w = s.enabledAttributes;
    for (let z = 0, O = w.length; z < O; z++)
      w[z] !== g[z] && (i.disableVertexAttribArray(z), w[z] = 0);
  }
  function y(g, w, z, O, k, Z, W) {
    W === !0 ? i.vertexAttribIPointer(g, w, z, k, Z) : i.vertexAttribPointer(g, w, z, O, k, Z);
  }
  function v(g, w, z, O) {
    E();
    const k = O.attributes, Z = z.getAttributes(), W = w.defaultAttributeValues;
    for (const Q in Z) {
      const H = Z[Q];
      if (H.location >= 0) {
        let ie = k[Q];
        if (ie === void 0 && (Q === "instanceMatrix" && g.instanceMatrix && (ie = g.instanceMatrix), Q === "instanceColor" && g.instanceColor && (ie = g.instanceColor)), ie !== void 0) {
          const ce = ie.normalized, xe = ie.itemSize, Le = e.get(ie);
          if (Le === void 0) continue;
          const Ye = Le.buffer, q = Le.type, ee = Le.bytesPerElement, _e = q === i.INT || q === i.UNSIGNED_INT || ie.gpuType === 1013;
          if (ie.isInterleavedBufferAttribute) {
            const re = ie.data, ye = re.stride, be = ie.offset;
            if (re.isInstancedInterleavedBuffer) {
              for (let Ue = 0; Ue < H.locationSize; Ue++)
                u(H.location + Ue, re.meshPerAttribute);
              g.isInstancedMesh !== !0 && O._maxInstanceCount === void 0 && (O._maxInstanceCount = re.meshPerAttribute * re.count);
            } else
              for (let Ue = 0; Ue < H.locationSize; Ue++)
                p(H.location + Ue);
            i.bindBuffer(i.ARRAY_BUFFER, Ye);
            for (let Ue = 0; Ue < H.locationSize; Ue++)
              y(
                H.location + Ue,
                xe / H.locationSize,
                q,
                ce,
                ye * ee,
                (be + xe / H.locationSize * Ue) * ee,
                _e
              );
          } else {
            if (ie.isInstancedBufferAttribute) {
              for (let re = 0; re < H.locationSize; re++)
                u(H.location + re, ie.meshPerAttribute);
              g.isInstancedMesh !== !0 && O._maxInstanceCount === void 0 && (O._maxInstanceCount = ie.meshPerAttribute * ie.count);
            } else
              for (let re = 0; re < H.locationSize; re++)
                p(H.location + re);
            i.bindBuffer(i.ARRAY_BUFFER, Ye);
            for (let re = 0; re < H.locationSize; re++)
              y(
                H.location + re,
                xe / H.locationSize,
                q,
                ce,
                xe * ee,
                xe / H.locationSize * re * ee,
                _e
              );
          }
        } else if (W !== void 0) {
          const ce = W[Q];
          if (ce !== void 0)
            switch (ce.length) {
              case 2:
                i.vertexAttrib2fv(H.location, ce);
                break;
              case 3:
                i.vertexAttrib3fv(H.location, ce);
                break;
              case 4:
                i.vertexAttrib4fv(H.location, ce);
                break;
              default:
                i.vertexAttrib1fv(H.location, ce);
            }
        }
      }
    }
    A();
  }
  function I() {
    C();
    for (const g in n) {
      const w = n[g];
      for (const z in w) {
        const O = w[z];
        for (const k in O)
          h(O[k].object), delete O[k];
        delete w[z];
      }
      delete n[g];
    }
  }
  function b(g) {
    if (n[g.id] === void 0) return;
    const w = n[g.id];
    for (const z in w) {
      const O = w[z];
      for (const k in O)
        h(O[k].object), delete O[k];
      delete w[z];
    }
    delete n[g.id];
  }
  function R(g) {
    for (const w in n) {
      const z = n[w];
      if (z[g.id] === void 0) continue;
      const O = z[g.id];
      for (const k in O)
        h(O[k].object), delete O[k];
      delete z[g.id];
    }
  }
  function C() {
    S(), a = !0, s !== r && (s = r, c(s.object));
  }
  function S() {
    r.geometry = null, r.program = null, r.wireframe = !1;
  }
  return {
    setup: o,
    reset: C,
    resetDefaultState: S,
    dispose: I,
    releaseStatesOfGeometry: b,
    releaseStatesOfProgram: R,
    initAttributes: E,
    enableAttribute: p,
    disableUnusedAttributes: A
  };
}
function Jl(i, e, t) {
  let n;
  function r(c) {
    n = c;
  }
  function s(c, h) {
    i.drawArrays(n, c, h), t.update(h, n, 1);
  }
  function a(c, h, d) {
    d !== 0 && (i.drawArraysInstanced(n, c, h, d), t.update(h, n, d));
  }
  function o(c, h, d) {
    if (d === 0) return;
    e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, c, 0, h, 0, d);
    let m = 0;
    for (let M = 0; M < d; M++)
      m += h[M];
    t.update(m, n, 1);
  }
  function l(c, h, d, f) {
    if (d === 0) return;
    const m = e.get("WEBGL_multi_draw");
    if (m === null)
      for (let M = 0; M < c.length; M++)
        a(c[M], h[M], f[M]);
    else {
      m.multiDrawArraysInstancedWEBGL(n, c, 0, h, 0, f, 0, d);
      let M = 0;
      for (let E = 0; E < d; E++)
        M += h[E] * f[E];
      t.update(M, n, 1);
    }
  }
  this.setMode = r, this.render = s, this.renderInstances = a, this.renderMultiDraw = o, this.renderMultiDrawInstances = l;
}
function Ql(i, e, t, n) {
  let r;
  function s() {
    if (r !== void 0) return r;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const R = e.get("EXT_texture_filter_anisotropic");
      r = i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      r = 0;
    return r;
  }
  function a(R) {
    return !(R !== 1023 && n.convert(R) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function o(R) {
    const C = R === 1016 && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
    return !(R !== 1009 && n.convert(R) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    R !== 1015 && !C);
  }
  function l(R) {
    if (R === "highp") {
      if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0)
        return "highp";
      R = "mediump";
    }
    return R === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let c = t.precision !== void 0 ? t.precision : "highp";
  const h = l(c);
  h !== c && (console.warn("THREE.WebGLRenderer:", c, "not supported, using", h, "instead."), c = h);
  const d = t.logarithmicDepthBuffer === !0, f = t.reverseDepthBuffer === !0 && e.has("EXT_clip_control"), m = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), M = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), E = i.getParameter(i.MAX_TEXTURE_SIZE), p = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), u = i.getParameter(i.MAX_VERTEX_ATTRIBS), A = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), y = i.getParameter(i.MAX_VARYING_VECTORS), v = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), I = M > 0, b = i.getParameter(i.MAX_SAMPLES);
  return {
    isWebGL2: !0,
    // keeping this for backwards compatibility
    getMaxAnisotropy: s,
    getMaxPrecision: l,
    textureFormatReadable: a,
    textureTypeReadable: o,
    precision: c,
    logarithmicDepthBuffer: d,
    reverseDepthBuffer: f,
    maxTextures: m,
    maxVertexTextures: M,
    maxTextureSize: E,
    maxCubemapSize: p,
    maxAttributes: u,
    maxVertexUniforms: A,
    maxVaryings: y,
    maxFragmentUniforms: v,
    vertexTextures: I,
    maxSamples: b
  };
}
function ec(i) {
  const e = this;
  let t = null, n = 0, r = !1, s = !1;
  const a = new cn(), o = new Ce(), l = { value: null, needsUpdate: !1 };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(d, f) {
    const m = d.length !== 0 || f || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    n !== 0 || r;
    return r = f, n = d.length, m;
  }, this.beginShadows = function() {
    s = !0, h(null);
  }, this.endShadows = function() {
    s = !1;
  }, this.setGlobalState = function(d, f) {
    t = h(d, f, 0);
  }, this.setState = function(d, f, m) {
    const M = d.clippingPlanes, E = d.clipIntersection, p = d.clipShadows, u = i.get(d);
    if (!r || M === null || M.length === 0 || s && !p)
      s ? h(null) : c();
    else {
      const A = s ? 0 : n, y = A * 4;
      let v = u.clippingState || null;
      l.value = v, v = h(M, f, y, m);
      for (let I = 0; I !== y; ++I)
        v[I] = t[I];
      u.clippingState = v, this.numIntersection = E ? this.numPlanes : 0, this.numPlanes += A;
    }
  };
  function c() {
    l.value !== t && (l.value = t, l.needsUpdate = n > 0), e.numPlanes = n, e.numIntersection = 0;
  }
  function h(d, f, m, M) {
    const E = d !== null ? d.length : 0;
    let p = null;
    if (E !== 0) {
      if (p = l.value, M !== !0 || p === null) {
        const u = m + E * 4, A = f.matrixWorldInverse;
        o.getNormalMatrix(A), (p === null || p.length < u) && (p = new Float32Array(u));
        for (let y = 0, v = m; y !== E; ++y, v += 4)
          a.copy(d[y]).applyMatrix4(A, o), a.normal.toArray(p, v), p[v + 3] = a.constant;
      }
      l.value = p, l.needsUpdate = !0;
    }
    return e.numPlanes = E, e.numIntersection = 0, p;
  }
}
function tc(i) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(a, o) {
    return o === 303 ? a.mapping = 301 : o === 304 && (a.mapping = 302), a;
  }
  function n(a) {
    if (a && a.isTexture) {
      const o = a.mapping;
      if (o === 303 || o === 304)
        if (e.has(a)) {
          const l = e.get(a).texture;
          return t(l, a.mapping);
        } else {
          const l = a.image;
          if (l && l.height > 0) {
            const c = new ha(l.height);
            return c.fromEquirectangularTexture(i, a), e.set(a, c), a.addEventListener("dispose", r), t(c.texture, a.mapping);
          } else
            return null;
        }
    }
    return a;
  }
  function r(a) {
    const o = a.target;
    o.removeEventListener("dispose", r);
    const l = e.get(o);
    l !== void 0 && (e.delete(o), l.dispose());
  }
  function s() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: n,
    dispose: s
  };
}
class Cs extends bs {
  constructor(e = -1, t = 1, n = 1, r = -1, s = 0.1, a = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = r, this.near = s, this.far = a, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  setViewOffset(e, t, n, r, s, a) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2;
    let s = n - e, a = n + e, o = r + t, l = r - t;
    if (this.view !== null && this.view.enabled) {
      const c = (this.right - this.left) / this.view.fullWidth / this.zoom, h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      s += c * this.view.offsetX, a = s + c * this.view.width, o -= h * this.view.offsetY, l = o - h * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(s, a, o, l, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}
const Rn = 4, Br = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], hn = 20, Xi = /* @__PURE__ */ new Cs(), Gr = /* @__PURE__ */ new Ve();
let qi = null, Yi = 0, Ki = 0, Zi = !1;
const un = (1 + Math.sqrt(5)) / 2, bn = 1 / un, zr = [
  /* @__PURE__ */ new F(-un, bn, 0),
  /* @__PURE__ */ new F(un, bn, 0),
  /* @__PURE__ */ new F(-bn, 0, un),
  /* @__PURE__ */ new F(bn, 0, un),
  /* @__PURE__ */ new F(0, un, -bn),
  /* @__PURE__ */ new F(0, un, bn),
  /* @__PURE__ */ new F(-1, 1, -1),
  /* @__PURE__ */ new F(1, 1, -1),
  /* @__PURE__ */ new F(-1, 1, 1),
  /* @__PURE__ */ new F(1, 1, 1)
];
class Vr {
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety (the cubeCamera
   * is placed at the origin).
   */
  fromScene(e, t = 0, n = 0.1, r = 100) {
    qi = this._renderer.getRenderTarget(), Yi = this._renderer.getActiveCubeFace(), Ki = this._renderer.getActiveMipmapLevel(), Zi = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(256);
    const s = this._allocateTargets();
    return s.depthBuffer = !0, this._sceneToCubeUV(e, n, r, s), t > 0 && this._blur(s, 0, 0, t), this._applyPMREM(s), this._cleanup(s), s;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512),
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported equirectangular image size is 64 x 32.
   */
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256,
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported cube size is 16 x 16.
   */
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = Wr(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = kr(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
  }
  // private interface
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodPlanes.length; e++)
      this._lodPlanes[e].dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(qi, Yi, Ki), this._renderer.xr.enabled = Zi, e.scissorTest = !1, pi(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), qi = this._renderer.getRenderTarget(), Yi = this._renderer.getActiveCubeFace(), Ki = this._renderer.getActiveMipmapLevel(), Zi = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = t || this._allocateTargets();
    return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = {
      magFilter: 1006,
      minFilter: 1006,
      generateMipmaps: !1,
      type: 1016,
      format: 1023,
      colorSpace: Pn,
      depthBuffer: !1
    }, r = Hr(e, t, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Hr(e, t, n);
      const { _lodMax: s } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = nc(s)), this._blurMaterial = ic(s, e, t);
    }
    return r;
  }
  _compileMaterial(e) {
    const t = new Et(this._lodPlanes[0], e);
    this._renderer.compile(t, Xi);
  }
  _sceneToCubeUV(e, t, n, r) {
    const o = new bt(90, 1, t, n), l = [1, -1, 1, 1, 1, 1], c = [1, 1, 1, -1, -1, -1], h = this._renderer, d = h.autoClear, f = h.toneMapping;
    h.getClearColor(Gr), h.toneMapping = 0, h.autoClear = !1;
    const m = new Es({
      name: "PMREM.Background",
      side: 1,
      depthWrite: !1,
      depthTest: !1
    }), M = new Et(new Ln(), m);
    let E = !1;
    const p = e.background;
    p ? p.isColor && (m.color.copy(p), e.background = null, E = !0) : (m.color.copy(Gr), E = !0);
    for (let u = 0; u < 6; u++) {
      const A = u % 3;
      A === 0 ? (o.up.set(0, l[u], 0), o.lookAt(c[u], 0, 0)) : A === 1 ? (o.up.set(0, 0, l[u]), o.lookAt(0, c[u], 0)) : (o.up.set(0, l[u], 0), o.lookAt(0, 0, c[u]));
      const y = this._cubeSize;
      pi(r, A * y, u > 2 ? y : 0, y, y), h.setRenderTarget(r), E && h.render(M, o), h.render(e, o);
    }
    M.geometry.dispose(), M.material.dispose(), h.toneMapping = f, h.autoClear = d, e.background = p;
  }
  _textureToCubeUV(e, t) {
    const n = this._renderer, r = e.mapping === 301 || e.mapping === 302;
    r ? (this._cubemapMaterial === null && (this._cubemapMaterial = Wr()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = kr());
    const s = r ? this._cubemapMaterial : this._equirectMaterial, a = new Et(this._lodPlanes[0], s), o = s.uniforms;
    o.envMap.value = e;
    const l = this._cubeSize;
    pi(t, 0, 0, 3 * l, 2 * l), n.setRenderTarget(t), n.render(a, Xi);
  }
  _applyPMREM(e) {
    const t = this._renderer, n = t.autoClear;
    t.autoClear = !1;
    const r = this._lodPlanes.length;
    for (let s = 1; s < r; s++) {
      const a = Math.sqrt(this._sigmas[s] * this._sigmas[s] - this._sigmas[s - 1] * this._sigmas[s - 1]), o = zr[(r - s - 1) % zr.length];
      this._blur(e, s - 1, s, a, o);
    }
    t.autoClear = n;
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   */
  _blur(e, t, n, r, s) {
    const a = this._pingPongRenderTarget;
    this._halfBlur(
      e,
      a,
      t,
      n,
      r,
      "latitudinal",
      s
    ), this._halfBlur(
      a,
      e,
      n,
      n,
      r,
      "longitudinal",
      s
    );
  }
  _halfBlur(e, t, n, r, s, a, o) {
    const l = this._renderer, c = this._blurMaterial;
    a !== "latitudinal" && a !== "longitudinal" && console.error(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const h = 3, d = new Et(this._lodPlanes[r], c), f = c.uniforms, m = this._sizeLods[n] - 1, M = isFinite(s) ? Math.PI / (2 * m) : 2 * Math.PI / (2 * hn - 1), E = s / M, p = isFinite(s) ? 1 + Math.floor(h * E) : hn;
    p > hn && console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${hn}`);
    const u = [];
    let A = 0;
    for (let R = 0; R < hn; ++R) {
      const C = R / E, S = Math.exp(-C * C / 2);
      u.push(S), R === 0 ? A += S : R < p && (A += 2 * S);
    }
    for (let R = 0; R < u.length; R++)
      u[R] = u[R] / A;
    f.envMap.value = e.texture, f.samples.value = p, f.weights.value = u, f.latitudinal.value = a === "latitudinal", o && (f.poleAxis.value = o);
    const { _lodMax: y } = this;
    f.dTheta.value = M, f.mipInt.value = y - n;
    const v = this._sizeLods[r], I = 3 * v * (r > y - Rn ? r - y + Rn : 0), b = 4 * (this._cubeSize - v);
    pi(t, I, b, 3 * v, 2 * v), l.setRenderTarget(t), l.render(d, Xi);
  }
}
function nc(i) {
  const e = [], t = [], n = [];
  let r = i;
  const s = i - Rn + 1 + Br.length;
  for (let a = 0; a < s; a++) {
    const o = Math.pow(2, r);
    t.push(o);
    let l = 1 / o;
    a > i - Rn ? l = Br[a - i + Rn - 1] : a === 0 && (l = 0), n.push(l);
    const c = 1 / (o - 2), h = -c, d = 1 + c, f = [h, h, d, h, d, d, h, h, d, d, h, d], m = 6, M = 6, E = 3, p = 2, u = 1, A = new Float32Array(E * M * m), y = new Float32Array(p * M * m), v = new Float32Array(u * M * m);
    for (let b = 0; b < m; b++) {
      const R = b % 3 * 2 / 3 - 1, C = b > 2 ? 0 : -1, S = [
        R,
        C,
        0,
        R + 2 / 3,
        C,
        0,
        R + 2 / 3,
        C + 1,
        0,
        R,
        C,
        0,
        R + 2 / 3,
        C + 1,
        0,
        R,
        C + 1,
        0
      ];
      A.set(S, E * M * b), y.set(f, p * M * b);
      const g = [b, b, b, b, b, b];
      v.set(g, u * M * b);
    }
    const I = new Ot();
    I.setAttribute("position", new Ft(A, E)), I.setAttribute("uv", new Ft(y, p)), I.setAttribute("faceIndex", new Ft(v, u)), e.push(I), r > Rn && r--;
  }
  return { lodPlanes: e, sizeLods: t, sigmas: n };
}
function Hr(i, e, t) {
  const n = new dn(i, e, t);
  return n.texture.mapping = 306, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function pi(i, e, t, n, r) {
  i.viewport.set(e, t, n, r), i.scissor.set(e, t, n, r);
}
function ic(i, e, t) {
  const n = new Float32Array(hn), r = new F(0, 1, 0);
  return new en({
    name: "SphericalGaussianBlur",
    defines: {
      n: hn,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${i}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: n },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: r }
    },
    vertexShader: ir(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function kr() {
  return new en({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: ir(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function Wr() {
  return new en({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: ir(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function ir() {
  return (
    /* glsl */
    `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
  );
}
function rc(i) {
  let e = /* @__PURE__ */ new WeakMap(), t = null;
  function n(o) {
    if (o && o.isTexture) {
      const l = o.mapping, c = l === 303 || l === 304, h = l === 301 || l === 302;
      if (c || h) {
        let d = e.get(o);
        const f = d !== void 0 ? d.texture.pmremVersion : 0;
        if (o.isRenderTargetTexture && o.pmremVersion !== f)
          return t === null && (t = new Vr(i)), d = c ? t.fromEquirectangular(o, d) : t.fromCubemap(o, d), d.texture.pmremVersion = o.pmremVersion, e.set(o, d), d.texture;
        if (d !== void 0)
          return d.texture;
        {
          const m = o.image;
          return c && m && m.height > 0 || h && m && r(m) ? (t === null && (t = new Vr(i)), d = c ? t.fromEquirectangular(o) : t.fromCubemap(o), d.texture.pmremVersion = o.pmremVersion, e.set(o, d), o.addEventListener("dispose", s), d.texture) : null;
        }
      }
    }
    return o;
  }
  function r(o) {
    let l = 0;
    const c = 6;
    for (let h = 0; h < c; h++)
      o[h] !== void 0 && l++;
    return l === c;
  }
  function s(o) {
    const l = o.target;
    l.removeEventListener("dispose", s);
    const c = e.get(l);
    c !== void 0 && (e.delete(l), c.dispose());
  }
  function a() {
    e = /* @__PURE__ */ new WeakMap(), t !== null && (t.dispose(), t = null);
  }
  return {
    get: n,
    dispose: a
  };
}
function sc(i) {
  const e = {};
  function t(n) {
    if (e[n] !== void 0)
      return e[n];
    let r;
    switch (n) {
      case "WEBGL_depth_texture":
        r = i.getExtension("WEBGL_depth_texture") || i.getExtension("MOZ_WEBGL_depth_texture") || i.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        r = i.getExtension("EXT_texture_filter_anisotropic") || i.getExtension("MOZ_EXT_texture_filter_anisotropic") || i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        r = i.getExtension("WEBGL_compressed_texture_s3tc") || i.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        r = i.getExtension("WEBGL_compressed_texture_pvrtc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        r = i.getExtension(n);
    }
    return e[n] = r, r;
  }
  return {
    has: function(n) {
      return t(n) !== null;
    },
    init: function() {
      t("EXT_color_buffer_float"), t("WEBGL_clip_cull_distance"), t("OES_texture_float_linear"), t("EXT_color_buffer_half_float"), t("WEBGL_multisampled_render_to_texture"), t("WEBGL_render_shared_exponent");
    },
    get: function(n) {
      const r = t(n);
      return r === null && Hn("THREE.WebGLRenderer: " + n + " extension not supported."), r;
    }
  };
}
function ac(i, e, t, n) {
  const r = {}, s = /* @__PURE__ */ new WeakMap();
  function a(d) {
    const f = d.target;
    f.index !== null && e.remove(f.index);
    for (const M in f.attributes)
      e.remove(f.attributes[M]);
    for (const M in f.morphAttributes) {
      const E = f.morphAttributes[M];
      for (let p = 0, u = E.length; p < u; p++)
        e.remove(E[p]);
    }
    f.removeEventListener("dispose", a), delete r[f.id];
    const m = s.get(f);
    m && (e.remove(m), s.delete(f)), n.releaseStatesOfGeometry(f), f.isInstancedBufferGeometry === !0 && delete f._maxInstanceCount, t.memory.geometries--;
  }
  function o(d, f) {
    return r[f.id] === !0 || (f.addEventListener("dispose", a), r[f.id] = !0, t.memory.geometries++), f;
  }
  function l(d) {
    const f = d.attributes;
    for (const M in f)
      e.update(f[M], i.ARRAY_BUFFER);
    const m = d.morphAttributes;
    for (const M in m) {
      const E = m[M];
      for (let p = 0, u = E.length; p < u; p++)
        e.update(E[p], i.ARRAY_BUFFER);
    }
  }
  function c(d) {
    const f = [], m = d.index, M = d.attributes.position;
    let E = 0;
    if (m !== null) {
      const A = m.array;
      E = m.version;
      for (let y = 0, v = A.length; y < v; y += 3) {
        const I = A[y + 0], b = A[y + 1], R = A[y + 2];
        f.push(I, b, b, R, R, I);
      }
    } else if (M !== void 0) {
      const A = M.array;
      E = M.version;
      for (let y = 0, v = A.length / 3 - 1; y < v; y += 3) {
        const I = y + 0, b = y + 1, R = y + 2;
        f.push(I, b, b, R, R, I);
      }
    } else
      return;
    const p = new (gs(f) ? Ts : ys)(f, 1);
    p.version = E;
    const u = s.get(d);
    u && e.remove(u), s.set(d, p);
  }
  function h(d) {
    const f = s.get(d);
    if (f) {
      const m = d.index;
      m !== null && f.version < m.version && c(d);
    } else
      c(d);
    return s.get(d);
  }
  return {
    get: o,
    update: l,
    getWireframeAttribute: h
  };
}
function oc(i, e, t) {
  let n;
  function r(f) {
    n = f;
  }
  let s, a;
  function o(f) {
    s = f.type, a = f.bytesPerElement;
  }
  function l(f, m) {
    i.drawElements(n, m, s, f * a), t.update(m, n, 1);
  }
  function c(f, m, M) {
    M !== 0 && (i.drawElementsInstanced(n, m, s, f * a, M), t.update(m, n, M));
  }
  function h(f, m, M) {
    if (M === 0) return;
    e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, m, 0, s, f, 0, M);
    let p = 0;
    for (let u = 0; u < M; u++)
      p += m[u];
    t.update(p, n, 1);
  }
  function d(f, m, M, E) {
    if (M === 0) return;
    const p = e.get("WEBGL_multi_draw");
    if (p === null)
      for (let u = 0; u < f.length; u++)
        c(f[u] / a, m[u], E[u]);
    else {
      p.multiDrawElementsInstancedWEBGL(n, m, 0, s, f, 0, E, 0, M);
      let u = 0;
      for (let A = 0; A < M; A++)
        u += m[A] * E[A];
      t.update(u, n, 1);
    }
  }
  this.setMode = r, this.setIndex = o, this.render = l, this.renderInstances = c, this.renderMultiDraw = h, this.renderMultiDrawInstances = d;
}
function lc(i) {
  const e = {
    geometries: 0,
    textures: 0
  }, t = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function n(s, a, o) {
    switch (t.calls++, a) {
      case i.TRIANGLES:
        t.triangles += o * (s / 3);
        break;
      case i.LINES:
        t.lines += o * (s / 2);
        break;
      case i.LINE_STRIP:
        t.lines += o * (s - 1);
        break;
      case i.LINE_LOOP:
        t.lines += o * s;
        break;
      case i.POINTS:
        t.points += o * s;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", a);
        break;
    }
  }
  function r() {
    t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0;
  }
  return {
    memory: e,
    render: t,
    programs: null,
    autoReset: !0,
    reset: r,
    update: n
  };
}
function cc(i, e, t) {
  const n = /* @__PURE__ */ new WeakMap(), r = new tt();
  function s(a, o, l) {
    const c = a.morphTargetInfluences, h = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, d = h !== void 0 ? h.length : 0;
    let f = n.get(o);
    if (f === void 0 || f.count !== d) {
      let S = function() {
        R.dispose(), n.delete(o), o.removeEventListener("dispose", S);
      };
      f !== void 0 && f.texture.dispose();
      const m = o.morphAttributes.position !== void 0, M = o.morphAttributes.normal !== void 0, E = o.morphAttributes.color !== void 0, p = o.morphAttributes.position || [], u = o.morphAttributes.normal || [], A = o.morphAttributes.color || [];
      let y = 0;
      m === !0 && (y = 1), M === !0 && (y = 2), E === !0 && (y = 3);
      let v = o.attributes.position.count * y, I = 1;
      v > e.maxTextureSize && (I = Math.ceil(v / e.maxTextureSize), v = e.maxTextureSize);
      const b = new Float32Array(v * I * 4 * d), R = new xs(b, v, I, d);
      R.type = 1015, R.needsUpdate = !0;
      const C = y * 4;
      for (let g = 0; g < d; g++) {
        const w = p[g], z = u[g], O = A[g], k = v * I * 4 * g;
        for (let Z = 0; Z < w.count; Z++) {
          const W = Z * C;
          m === !0 && (r.fromBufferAttribute(w, Z), b[k + W + 0] = r.x, b[k + W + 1] = r.y, b[k + W + 2] = r.z, b[k + W + 3] = 0), M === !0 && (r.fromBufferAttribute(z, Z), b[k + W + 4] = r.x, b[k + W + 5] = r.y, b[k + W + 6] = r.z, b[k + W + 7] = 0), E === !0 && (r.fromBufferAttribute(O, Z), b[k + W + 8] = r.x, b[k + W + 9] = r.y, b[k + W + 10] = r.z, b[k + W + 11] = O.itemSize === 4 ? r.w : 1);
        }
      }
      f = {
        count: d,
        texture: R,
        size: new Ie(v, I)
      }, n.set(o, f), o.addEventListener("dispose", S);
    }
    if (a.isInstancedMesh === !0 && a.morphTexture !== null)
      l.getUniforms().setValue(i, "morphTexture", a.morphTexture, t);
    else {
      let m = 0;
      for (let E = 0; E < c.length; E++)
        m += c[E];
      const M = o.morphTargetsRelative ? 1 : 1 - m;
      l.getUniforms().setValue(i, "morphTargetBaseInfluence", M), l.getUniforms().setValue(i, "morphTargetInfluences", c);
    }
    l.getUniforms().setValue(i, "morphTargetsTexture", f.texture, t), l.getUniforms().setValue(i, "morphTargetsTextureSize", f.size);
  }
  return {
    update: s
  };
}
function uc(i, e, t, n) {
  let r = /* @__PURE__ */ new WeakMap();
  function s(l) {
    const c = n.render.frame, h = l.geometry, d = e.get(l, h);
    if (r.get(d) !== c && (e.update(d), r.set(d, c)), l.isInstancedMesh && (l.hasEventListener("dispose", o) === !1 && l.addEventListener("dispose", o), r.get(l) !== c && (t.update(l.instanceMatrix, i.ARRAY_BUFFER), l.instanceColor !== null && t.update(l.instanceColor, i.ARRAY_BUFFER), r.set(l, c))), l.isSkinnedMesh) {
      const f = l.skeleton;
      r.get(f) !== c && (f.update(), r.set(f, c));
    }
    return d;
  }
  function a() {
    r = /* @__PURE__ */ new WeakMap();
  }
  function o(l) {
    const c = l.target;
    c.removeEventListener("dispose", o), t.remove(c.instanceMatrix), c.instanceColor !== null && t.remove(c.instanceColor);
  }
  return {
    update: s,
    dispose: a
  };
}
class Ps extends pt {
  constructor(e, t, n, r, s, a, o, l, c, h = 1026) {
    if (h !== 1026 && h !== 1027)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    n === void 0 && h === 1026 && (n = 1014), n === void 0 && h === 1027 && (n = 1020), super(null, r, s, a, o, l, h, n, c), this.isDepthTexture = !0, this.image = { width: e, height: t }, this.magFilter = o !== void 0 ? o : 1003, this.minFilter = l !== void 0 ? l : 1003, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}
const Ds = /* @__PURE__ */ new pt(), Xr = /* @__PURE__ */ new Ps(1, 1), Ls = /* @__PURE__ */ new xs(), Us = /* @__PURE__ */ new Ks(), Is = /* @__PURE__ */ new Rs(), qr = [], Yr = [], Kr = new Float32Array(16), Zr = new Float32Array(9), $r = new Float32Array(4);
function Un(i, e, t) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const r = e * t;
  let s = qr[r];
  if (s === void 0 && (s = new Float32Array(r), qr[r] = s), e !== 0) {
    n.toArray(s, 0);
    for (let a = 1, o = 0; a !== e; ++a)
      o += t, i[a].toArray(s, o);
  }
  return s;
}
function st(i, e) {
  if (i.length !== e.length) return !1;
  for (let t = 0, n = i.length; t < n; t++)
    if (i[t] !== e[t]) return !1;
  return !0;
}
function at(i, e) {
  for (let t = 0, n = e.length; t < n; t++)
    i[t] = e[t];
}
function Si(i, e) {
  let t = Yr[e];
  t === void 0 && (t = new Int32Array(e), Yr[e] = t);
  for (let n = 0; n !== e; ++n)
    t[n] = i.allocateTextureUnit();
  return t;
}
function hc(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1f(this.addr, e), t[0] = e);
}
function dc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (st(t, e)) return;
    i.uniform2fv(this.addr, e), at(t, e);
  }
}
function fc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else if (e.r !== void 0)
    (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (i.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
  else {
    if (st(t, e)) return;
    i.uniform3fv(this.addr, e), at(t, e);
  }
}
function pc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (st(t, e)) return;
    i.uniform4fv(this.addr, e), at(t, e);
  }
}
function mc(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (st(t, e)) return;
    i.uniformMatrix2fv(this.addr, !1, e), at(t, e);
  } else {
    if (st(t, n)) return;
    $r.set(n), i.uniformMatrix2fv(this.addr, !1, $r), at(t, n);
  }
}
function _c(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (st(t, e)) return;
    i.uniformMatrix3fv(this.addr, !1, e), at(t, e);
  } else {
    if (st(t, n)) return;
    Zr.set(n), i.uniformMatrix3fv(this.addr, !1, Zr), at(t, n);
  }
}
function gc(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (st(t, e)) return;
    i.uniformMatrix4fv(this.addr, !1, e), at(t, e);
  } else {
    if (st(t, n)) return;
    Kr.set(n), i.uniformMatrix4fv(this.addr, !1, Kr), at(t, n);
  }
}
function vc(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1i(this.addr, e), t[0] = e);
}
function xc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (st(t, e)) return;
    i.uniform2iv(this.addr, e), at(t, e);
  }
}
function Mc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (st(t, e)) return;
    i.uniform3iv(this.addr, e), at(t, e);
  }
}
function Sc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (st(t, e)) return;
    i.uniform4iv(this.addr, e), at(t, e);
  }
}
function Ec(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1ui(this.addr, e), t[0] = e);
}
function yc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (st(t, e)) return;
    i.uniform2uiv(this.addr, e), at(t, e);
  }
}
function Tc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (st(t, e)) return;
    i.uniform3uiv(this.addr, e), at(t, e);
  }
}
function Ac(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (st(t, e)) return;
    i.uniform4uiv(this.addr, e), at(t, e);
  }
}
function bc(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r);
  let s;
  this.type === i.SAMPLER_2D_SHADOW ? (Xr.compareFunction = 515, s = Xr) : s = Ds, t.setTexture2D(e || s, r);
}
function Rc(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTexture3D(e || Us, r);
}
function wc(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTextureCube(e || Is, r);
}
function Cc(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTexture2DArray(e || Ls, r);
}
function Pc(i) {
  switch (i) {
    case 5126:
      return hc;
    // FLOAT
    case 35664:
      return dc;
    // _VEC2
    case 35665:
      return fc;
    // _VEC3
    case 35666:
      return pc;
    // _VEC4
    case 35674:
      return mc;
    // _MAT2
    case 35675:
      return _c;
    // _MAT3
    case 35676:
      return gc;
    // _MAT4
    case 5124:
    case 35670:
      return vc;
    // INT, BOOL
    case 35667:
    case 35671:
      return xc;
    // _VEC2
    case 35668:
    case 35672:
      return Mc;
    // _VEC3
    case 35669:
    case 35673:
      return Sc;
    // _VEC4
    case 5125:
      return Ec;
    // UINT
    case 36294:
      return yc;
    // _VEC2
    case 36295:
      return Tc;
    // _VEC3
    case 36296:
      return Ac;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return bc;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return Rc;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return wc;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return Cc;
  }
}
function Dc(i, e) {
  i.uniform1fv(this.addr, e);
}
function Lc(i, e) {
  const t = Un(e, this.size, 2);
  i.uniform2fv(this.addr, t);
}
function Uc(i, e) {
  const t = Un(e, this.size, 3);
  i.uniform3fv(this.addr, t);
}
function Ic(i, e) {
  const t = Un(e, this.size, 4);
  i.uniform4fv(this.addr, t);
}
function Fc(i, e) {
  const t = Un(e, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, t);
}
function Nc(i, e) {
  const t = Un(e, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, t);
}
function Oc(i, e) {
  const t = Un(e, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, t);
}
function Bc(i, e) {
  i.uniform1iv(this.addr, e);
}
function Gc(i, e) {
  i.uniform2iv(this.addr, e);
}
function zc(i, e) {
  i.uniform3iv(this.addr, e);
}
function Vc(i, e) {
  i.uniform4iv(this.addr, e);
}
function Hc(i, e) {
  i.uniform1uiv(this.addr, e);
}
function kc(i, e) {
  i.uniform2uiv(this.addr, e);
}
function Wc(i, e) {
  i.uniform3uiv(this.addr, e);
}
function Xc(i, e) {
  i.uniform4uiv(this.addr, e);
}
function qc(i, e, t) {
  const n = this.cache, r = e.length, s = Si(t, r);
  st(n, s) || (i.uniform1iv(this.addr, s), at(n, s));
  for (let a = 0; a !== r; ++a)
    t.setTexture2D(e[a] || Ds, s[a]);
}
function Yc(i, e, t) {
  const n = this.cache, r = e.length, s = Si(t, r);
  st(n, s) || (i.uniform1iv(this.addr, s), at(n, s));
  for (let a = 0; a !== r; ++a)
    t.setTexture3D(e[a] || Us, s[a]);
}
function Kc(i, e, t) {
  const n = this.cache, r = e.length, s = Si(t, r);
  st(n, s) || (i.uniform1iv(this.addr, s), at(n, s));
  for (let a = 0; a !== r; ++a)
    t.setTextureCube(e[a] || Is, s[a]);
}
function Zc(i, e, t) {
  const n = this.cache, r = e.length, s = Si(t, r);
  st(n, s) || (i.uniform1iv(this.addr, s), at(n, s));
  for (let a = 0; a !== r; ++a)
    t.setTexture2DArray(e[a] || Ls, s[a]);
}
function $c(i) {
  switch (i) {
    case 5126:
      return Dc;
    // FLOAT
    case 35664:
      return Lc;
    // _VEC2
    case 35665:
      return Uc;
    // _VEC3
    case 35666:
      return Ic;
    // _VEC4
    case 35674:
      return Fc;
    // _MAT2
    case 35675:
      return Nc;
    // _MAT3
    case 35676:
      return Oc;
    // _MAT4
    case 5124:
    case 35670:
      return Bc;
    // INT, BOOL
    case 35667:
    case 35671:
      return Gc;
    // _VEC2
    case 35668:
    case 35672:
      return zc;
    // _VEC3
    case 35669:
    case 35673:
      return Vc;
    // _VEC4
    case 5125:
      return Hc;
    // UINT
    case 36294:
      return kc;
    // _VEC2
    case 36295:
      return Wc;
    // _VEC3
    case 36296:
      return Xc;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return qc;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return Yc;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return Kc;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return Zc;
  }
}
class jc {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = Pc(t.type);
  }
}
class Jc {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = $c(t.type);
  }
}
class Qc {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, n) {
    const r = this.seq;
    for (let s = 0, a = r.length; s !== a; ++s) {
      const o = r[s];
      o.setValue(e, t[o.id], n);
    }
  }
}
const $i = /(\w+)(\])?(\[|\.)?/g;
function jr(i, e) {
  i.seq.push(e), i.map[e.id] = e;
}
function eu(i, e, t) {
  const n = i.name, r = n.length;
  for ($i.lastIndex = 0; ; ) {
    const s = $i.exec(n), a = $i.lastIndex;
    let o = s[1];
    const l = s[2] === "]", c = s[3];
    if (l && (o = o | 0), c === void 0 || c === "[" && a + 2 === r) {
      jr(t, c === void 0 ? new jc(o, i, e) : new Jc(o, i, e));
      break;
    } else {
      let d = t.map[o];
      d === void 0 && (d = new Qc(o), jr(t, d)), t = d;
    }
  }
}
class gi {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let r = 0; r < n; ++r) {
      const s = e.getActiveUniform(t, r), a = e.getUniformLocation(t, s.name);
      eu(s, a, this);
    }
  }
  setValue(e, t, n, r) {
    const s = this.map[t];
    s !== void 0 && s.setValue(e, n, r);
  }
  setOptional(e, t, n) {
    const r = t[n];
    r !== void 0 && this.setValue(e, n, r);
  }
  static upload(e, t, n, r) {
    for (let s = 0, a = t.length; s !== a; ++s) {
      const o = t[s], l = n[o.id];
      l.needsUpdate !== !1 && o.setValue(e, l.value, r);
    }
  }
  static seqWithValue(e, t) {
    const n = [];
    for (let r = 0, s = e.length; r !== s; ++r) {
      const a = e[r];
      a.id in t && n.push(a);
    }
    return n;
  }
}
function Jr(i, e, t) {
  const n = i.createShader(e);
  return i.shaderSource(n, t), i.compileShader(n), n;
}
const tu = 37297;
let nu = 0;
function iu(i, e) {
  const t = i.split(`
`), n = [], r = Math.max(e - 6, 0), s = Math.min(e + 6, t.length);
  for (let a = r; a < s; a++) {
    const o = a + 1;
    n.push(`${o === e ? ">" : " "} ${o}: ${t[a]}`);
  }
  return n.join(`
`);
}
const Qr = /* @__PURE__ */ new Ce();
function ru(i) {
  ze._getMatrix(Qr, ze.workingColorSpace, i);
  const e = `mat3( ${Qr.elements.map((t) => t.toFixed(4))} )`;
  switch (ze.getTransfer(i)) {
    case xi:
      return [e, "LinearTransferOETF"];
    case qe:
      return [e, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space: ", i), [e, "LinearTransferOETF"];
  }
}
function es(i, e, t) {
  const n = i.getShaderParameter(e, i.COMPILE_STATUS), r = i.getShaderInfoLog(e).trim();
  if (n && r === "") return "";
  const s = /ERROR: 0:(\d+)/.exec(r);
  if (s) {
    const a = parseInt(s[1]);
    return t.toUpperCase() + `

` + r + `

` + iu(i.getShaderSource(e), a);
  } else
    return r;
}
function su(i, e) {
  const t = ru(e);
  return [
    `vec4 ${i}( vec4 value ) {`,
    `	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
function au(i, e) {
  let t;
  switch (e) {
    case 1:
      t = "Linear";
      break;
    case 2:
      t = "Reinhard";
      break;
    case 3:
      t = "Cineon";
      break;
    case 4:
      t = "ACESFilmic";
      break;
    case 6:
      t = "AgX";
      break;
    case 7:
      t = "Neutral";
      break;
    case 5:
      t = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), t = "Linear";
  }
  return "vec3 " + i + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
const mi = /* @__PURE__ */ new F();
function ou() {
  ze.getLuminanceCoefficients(mi);
  const i = mi.x.toFixed(4), e = mi.y.toFixed(4), t = mi.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function lu(i) {
  return [
    i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(kn).join(`
`);
}
function cu(i) {
  const e = [];
  for (const t in i) {
    const n = i[t];
    n !== !1 && e.push("#define " + t + " " + n);
  }
  return e.join(`
`);
}
function uu(i, e) {
  const t = {}, n = i.getProgramParameter(e, i.ACTIVE_ATTRIBUTES);
  for (let r = 0; r < n; r++) {
    const s = i.getActiveAttrib(e, r), a = s.name;
    let o = 1;
    s.type === i.FLOAT_MAT2 && (o = 2), s.type === i.FLOAT_MAT3 && (o = 3), s.type === i.FLOAT_MAT4 && (o = 4), t[a] = {
      type: s.type,
      location: i.getAttribLocation(e, a),
      locationSize: o
    };
  }
  return t;
}
function kn(i) {
  return i !== "";
}
function ts(i, e) {
  const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function ns(i, e) {
  return i.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const hu = /^[ \t]*#include +<([\w\d./]+)>/gm;
function er(i) {
  return i.replace(hu, fu);
}
const du = /* @__PURE__ */ new Map();
function fu(i, e) {
  let t = De[e];
  if (t === void 0) {
    const n = du.get(e);
    if (n !== void 0)
      t = De[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, n);
    else
      throw new Error("Can not resolve #include <" + e + ">");
  }
  return er(t);
}
const pu = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function is(i) {
  return i.replace(pu, mu);
}
function mu(i, e, t, n) {
  let r = "";
  for (let s = parseInt(e); s < parseInt(t); s++)
    r += n.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return r;
}
function rs(i) {
  let e = `precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;
  return i.precision === "highp" ? e += `
#define HIGH_PRECISION` : i.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : i.precision === "lowp" && (e += `
#define LOW_PRECISION`), e;
}
function _u(i) {
  let e = "SHADOWMAP_TYPE_BASIC";
  return i.shadowMapType === 1 ? e = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === 2 ? e = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === 3 && (e = "SHADOWMAP_TYPE_VSM"), e;
}
function gu(i) {
  let e = "ENVMAP_TYPE_CUBE";
  if (i.envMap)
    switch (i.envMapMode) {
      case 301:
      case 302:
        e = "ENVMAP_TYPE_CUBE";
        break;
      case 306:
        e = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return e;
}
function vu(i) {
  let e = "ENVMAP_MODE_REFLECTION";
  if (i.envMap)
    switch (i.envMapMode) {
      case 302:
        e = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return e;
}
function xu(i) {
  let e = "ENVMAP_BLENDING_NONE";
  if (i.envMap)
    switch (i.combine) {
      case 0:
        e = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case 1:
        e = "ENVMAP_BLENDING_MIX";
        break;
      case 2:
        e = "ENVMAP_BLENDING_ADD";
        break;
    }
  return e;
}
function Mu(i) {
  const e = i.envMapCubeUVHeight;
  if (e === null) return null;
  const t = Math.log2(e) - 2, n = 1 / e;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 112)), texelHeight: n, maxMip: t };
}
function Su(i, e, t, n) {
  const r = i.getContext(), s = t.defines;
  let a = t.vertexShader, o = t.fragmentShader;
  const l = _u(t), c = gu(t), h = vu(t), d = xu(t), f = Mu(t), m = lu(t), M = cu(s), E = r.createProgram();
  let p, u, A = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
  t.isRawShaderMaterial ? (p = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    M
  ].filter(kn).join(`
`), p.length > 0 && (p += `
`), u = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    M
  ].filter(kn).join(`
`), u.length > 0 && (u += `
`)) : (p = [
    rs(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    M,
    t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    t.batching ? "#define USE_BATCHING" : "",
    t.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    t.instancing ? "#define USE_INSTANCING" : "",
    t.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    t.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.map ? "#define USE_MAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + h : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    t.mapUv ? "#define MAP_UV " + t.mapUv : "",
    t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "",
    t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "",
    t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "",
    t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "",
    t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "",
    t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "",
    t.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv : "",
    t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "",
    t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "",
    t.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv : "",
    t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "",
    t.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv : "",
    t.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv : "",
    t.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv : "",
    t.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv : "",
    t.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv : "",
    t.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv : "",
    t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "",
    t.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv : "",
    t.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv : "",
    t.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv : "",
    t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "",
    //
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.skinning ? "#define USE_SKINNING" : "",
    t.morphTargets ? "#define USE_MORPHTARGETS" : "",
    t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    t.morphColors ? "#define USE_MORPHCOLORS" : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + l : "",
    t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    t.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "#ifdef USE_INSTANCING_MORPH",
    "	uniform sampler2D morphTexture;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(kn).join(`
`), u = [
    rs(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    M,
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    t.map ? "#define USE_MAP" : "",
    t.matcap ? "#define USE_MATCAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + c : "",
    t.envMap ? "#define " + h : "",
    t.envMap ? "#define " + d : "",
    f ? "#define CUBEUV_TEXEL_WIDTH " + f.texelWidth : "",
    f ? "#define CUBEUV_TEXEL_HEIGHT " + f.texelHeight : "",
    f ? "#define CUBEUV_MAX_MIP " + f.maxMip + ".0" : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoat ? "#define USE_CLEARCOAT" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.dispersion ? "#define USE_DISPERSION" : "",
    t.iridescence ? "#define USE_IRIDESCENCE" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaTest ? "#define USE_ALPHATEST" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.sheen ? "#define USE_SHEEN" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors || t.instancingColor || t.batchingColor ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.gradientMap ? "#define USE_GRADIENTMAP" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + l : "",
    t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    t.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    t.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    t.toneMapping !== 0 ? "#define TONE_MAPPING" : "",
    t.toneMapping !== 0 ? De.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    t.toneMapping !== 0 ? au("toneMapping", t.toneMapping) : "",
    t.dithering ? "#define DITHERING" : "",
    t.opaque ? "#define OPAQUE" : "",
    De.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    su("linearToOutputTexel", t.outputColorSpace),
    ou(),
    t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
    `
`
  ].filter(kn).join(`
`)), a = er(a), a = ts(a, t), a = ns(a, t), o = er(o), o = ts(o, t), o = ns(o, t), a = is(a), o = is(o), t.isRawShaderMaterial !== !0 && (A = `#version 300 es
`, p = [
    m,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + p, u = [
    "#define varying in",
    t.glslVersion === gr ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    t.glslVersion === gr ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + u);
  const y = A + p + a, v = A + u + o, I = Jr(r, r.VERTEX_SHADER, y), b = Jr(r, r.FRAGMENT_SHADER, v);
  r.attachShader(E, I), r.attachShader(E, b), t.index0AttributeName !== void 0 ? r.bindAttribLocation(E, 0, t.index0AttributeName) : t.morphTargets === !0 && r.bindAttribLocation(E, 0, "position"), r.linkProgram(E);
  function R(w) {
    if (i.debug.checkShaderErrors) {
      const z = r.getProgramInfoLog(E).trim(), O = r.getShaderInfoLog(I).trim(), k = r.getShaderInfoLog(b).trim();
      let Z = !0, W = !0;
      if (r.getProgramParameter(E, r.LINK_STATUS) === !1)
        if (Z = !1, typeof i.debug.onShaderError == "function")
          i.debug.onShaderError(r, E, I, b);
        else {
          const Q = es(r, I, "vertex"), H = es(r, b, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(E, r.VALIDATE_STATUS) + `

Material Name: ` + w.name + `
Material Type: ` + w.type + `

Program Info Log: ` + z + `
` + Q + `
` + H
          );
        }
      else z !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", z) : (O === "" || k === "") && (W = !1);
      W && (w.diagnostics = {
        runnable: Z,
        programLog: z,
        vertexShader: {
          log: O,
          prefix: p
        },
        fragmentShader: {
          log: k,
          prefix: u
        }
      });
    }
    r.deleteShader(I), r.deleteShader(b), C = new gi(r, E), S = uu(r, E);
  }
  let C;
  this.getUniforms = function() {
    return C === void 0 && R(this), C;
  };
  let S;
  this.getAttributes = function() {
    return S === void 0 && R(this), S;
  };
  let g = t.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return g === !1 && (g = r.getProgramParameter(E, tu)), g;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), r.deleteProgram(E), this.program = void 0;
  }, this.type = t.shaderType, this.name = t.shaderName, this.id = nu++, this.cacheKey = e, this.usedTimes = 1, this.program = E, this.vertexShader = I, this.fragmentShader = b, this;
}
let Eu = 0;
class yu {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e) {
    const t = e.vertexShader, n = e.fragmentShader, r = this._getShaderStage(t), s = this._getShaderStage(n), a = this._getShaderCacheForMaterial(e);
    return a.has(r) === !1 && (a.add(r), r.usedTimes++), a.has(s) === !1 && (a.add(s), s.usedTimes++), this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const n of t)
      n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let n = t.get(e);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let n = t.get(e);
    return n === void 0 && (n = new Tu(e), t.set(e, n)), n;
  }
}
class Tu {
  constructor(e) {
    this.id = Eu++, this.code = e, this.usedTimes = 0;
  }
}
function Au(i, e, t, n, r, s, a) {
  const o = new Ms(), l = new yu(), c = /* @__PURE__ */ new Set(), h = [], d = r.logarithmicDepthBuffer, f = r.vertexTextures;
  let m = r.precision;
  const M = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function E(S) {
    return c.add(S), S === 0 ? "uv" : `uv${S}`;
  }
  function p(S, g, w, z, O) {
    const k = z.fog, Z = O.geometry, W = S.isMeshStandardMaterial ? z.environment : null, Q = (S.isMeshStandardMaterial ? t : e).get(S.envMap || W), H = Q && Q.mapping === 306 ? Q.image.height : null, ie = M[S.type];
    S.precision !== null && (m = r.getMaxPrecision(S.precision), m !== S.precision && console.warn("THREE.WebGLProgram.getParameters:", S.precision, "not supported, using", m, "instead."));
    const ce = Z.morphAttributes.position || Z.morphAttributes.normal || Z.morphAttributes.color, xe = ce !== void 0 ? ce.length : 0;
    let Le = 0;
    Z.morphAttributes.position !== void 0 && (Le = 1), Z.morphAttributes.normal !== void 0 && (Le = 2), Z.morphAttributes.color !== void 0 && (Le = 3);
    let Ye, q, ee, _e;
    if (ie) {
      const Xe = It[ie];
      Ye = Xe.vertexShader, q = Xe.fragmentShader;
    } else
      Ye = S.vertexShader, q = S.fragmentShader, l.update(S), ee = l.getVertexShaderID(S), _e = l.getFragmentShaderID(S);
    const re = i.getRenderTarget(), ye = i.state.buffers.depth.getReversed(), be = O.isInstancedMesh === !0, Ue = O.isBatchedMesh === !0, Qe = !!S.map, Be = !!S.matcap, it = !!Q, U = !!S.aoMap, yt = !!S.lightMap, Fe = !!S.bumpMap, Ne = !!S.normalMap, Se = !!S.displacementMap, $e = !!S.emissiveMap, Me = !!S.metalnessMap, T = !!S.roughnessMap, _ = S.anisotropy > 0, N = S.clearcoat > 0, Y = S.dispersion > 0, $ = S.iridescence > 0, X = S.sheen > 0, ge = S.transmission > 0, se = _ && !!S.anisotropyMap, ue = N && !!S.clearcoatMap, Ge = N && !!S.clearcoatNormalMap, j = N && !!S.clearcoatRoughnessMap, he = $ && !!S.iridescenceMap, Ee = $ && !!S.iridescenceThicknessMap, Te = X && !!S.sheenColorMap, de = X && !!S.sheenRoughnessMap, Oe = !!S.specularMap, Pe = !!S.specularColorMap, Ke = !!S.specularIntensityMap, P = ge && !!S.transmissionMap, ne = ge && !!S.thicknessMap, V = !!S.gradientMap, K = !!S.alphaMap, le = S.alphaTest > 0, ae = !!S.alphaHash, Re = !!S.extensions;
    let et = 0;
    S.toneMapped && (re === null || re.isXRRenderTarget === !0) && (et = i.toneMapping);
    const lt = {
      shaderID: ie,
      shaderType: S.type,
      shaderName: S.name,
      vertexShader: Ye,
      fragmentShader: q,
      defines: S.defines,
      customVertexShaderID: ee,
      customFragmentShaderID: _e,
      isRawShaderMaterial: S.isRawShaderMaterial === !0,
      glslVersion: S.glslVersion,
      precision: m,
      batching: Ue,
      batchingColor: Ue && O._colorsTexture !== null,
      instancing: be,
      instancingColor: be && O.instanceColor !== null,
      instancingMorph: be && O.morphTexture !== null,
      supportsVertexTextures: f,
      outputColorSpace: re === null ? i.outputColorSpace : re.isXRRenderTarget === !0 ? re.texture.colorSpace : Pn,
      alphaToCoverage: !!S.alphaToCoverage,
      map: Qe,
      matcap: Be,
      envMap: it,
      envMapMode: it && Q.mapping,
      envMapCubeUVHeight: H,
      aoMap: U,
      lightMap: yt,
      bumpMap: Fe,
      normalMap: Ne,
      displacementMap: f && Se,
      emissiveMap: $e,
      normalMapObjectSpace: Ne && S.normalMapType === 1,
      normalMapTangentSpace: Ne && S.normalMapType === 0,
      metalnessMap: Me,
      roughnessMap: T,
      anisotropy: _,
      anisotropyMap: se,
      clearcoat: N,
      clearcoatMap: ue,
      clearcoatNormalMap: Ge,
      clearcoatRoughnessMap: j,
      dispersion: Y,
      iridescence: $,
      iridescenceMap: he,
      iridescenceThicknessMap: Ee,
      sheen: X,
      sheenColorMap: Te,
      sheenRoughnessMap: de,
      specularMap: Oe,
      specularColorMap: Pe,
      specularIntensityMap: Ke,
      transmission: ge,
      transmissionMap: P,
      thicknessMap: ne,
      gradientMap: V,
      opaque: S.transparent === !1 && S.blending === 1 && S.alphaToCoverage === !1,
      alphaMap: K,
      alphaTest: le,
      alphaHash: ae,
      combine: S.combine,
      //
      mapUv: Qe && E(S.map.channel),
      aoMapUv: U && E(S.aoMap.channel),
      lightMapUv: yt && E(S.lightMap.channel),
      bumpMapUv: Fe && E(S.bumpMap.channel),
      normalMapUv: Ne && E(S.normalMap.channel),
      displacementMapUv: Se && E(S.displacementMap.channel),
      emissiveMapUv: $e && E(S.emissiveMap.channel),
      metalnessMapUv: Me && E(S.metalnessMap.channel),
      roughnessMapUv: T && E(S.roughnessMap.channel),
      anisotropyMapUv: se && E(S.anisotropyMap.channel),
      clearcoatMapUv: ue && E(S.clearcoatMap.channel),
      clearcoatNormalMapUv: Ge && E(S.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: j && E(S.clearcoatRoughnessMap.channel),
      iridescenceMapUv: he && E(S.iridescenceMap.channel),
      iridescenceThicknessMapUv: Ee && E(S.iridescenceThicknessMap.channel),
      sheenColorMapUv: Te && E(S.sheenColorMap.channel),
      sheenRoughnessMapUv: de && E(S.sheenRoughnessMap.channel),
      specularMapUv: Oe && E(S.specularMap.channel),
      specularColorMapUv: Pe && E(S.specularColorMap.channel),
      specularIntensityMapUv: Ke && E(S.specularIntensityMap.channel),
      transmissionMapUv: P && E(S.transmissionMap.channel),
      thicknessMapUv: ne && E(S.thicknessMap.channel),
      alphaMapUv: K && E(S.alphaMap.channel),
      //
      vertexTangents: !!Z.attributes.tangent && (Ne || _),
      vertexColors: S.vertexColors,
      vertexAlphas: S.vertexColors === !0 && !!Z.attributes.color && Z.attributes.color.itemSize === 4,
      pointsUvs: O.isPoints === !0 && !!Z.attributes.uv && (Qe || K),
      fog: !!k,
      useFog: S.fog === !0,
      fogExp2: !!k && k.isFogExp2,
      flatShading: S.flatShading === !0,
      sizeAttenuation: S.sizeAttenuation === !0,
      logarithmicDepthBuffer: d,
      reverseDepthBuffer: ye,
      skinning: O.isSkinnedMesh === !0,
      morphTargets: Z.morphAttributes.position !== void 0,
      morphNormals: Z.morphAttributes.normal !== void 0,
      morphColors: Z.morphAttributes.color !== void 0,
      morphTargetsCount: xe,
      morphTextureStride: Le,
      numDirLights: g.directional.length,
      numPointLights: g.point.length,
      numSpotLights: g.spot.length,
      numSpotLightMaps: g.spotLightMap.length,
      numRectAreaLights: g.rectArea.length,
      numHemiLights: g.hemi.length,
      numDirLightShadows: g.directionalShadowMap.length,
      numPointLightShadows: g.pointShadowMap.length,
      numSpotLightShadows: g.spotShadowMap.length,
      numSpotLightShadowsWithMaps: g.numSpotLightShadowsWithMaps,
      numLightProbes: g.numLightProbes,
      numClippingPlanes: a.numPlanes,
      numClipIntersection: a.numIntersection,
      dithering: S.dithering,
      shadowMapEnabled: i.shadowMap.enabled && w.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: et,
      decodeVideoTexture: Qe && S.map.isVideoTexture === !0 && ze.getTransfer(S.map.colorSpace) === qe,
      decodeVideoTextureEmissive: $e && S.emissiveMap.isVideoTexture === !0 && ze.getTransfer(S.emissiveMap.colorSpace) === qe,
      premultipliedAlpha: S.premultipliedAlpha,
      doubleSided: S.side === 2,
      flipSided: S.side === 1,
      useDepthPacking: S.depthPacking >= 0,
      depthPacking: S.depthPacking || 0,
      index0AttributeName: S.index0AttributeName,
      extensionClipCullDistance: Re && S.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (Re && S.extensions.multiDraw === !0 || Ue) && n.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: S.customProgramCacheKey()
    };
    return lt.vertexUv1s = c.has(1), lt.vertexUv2s = c.has(2), lt.vertexUv3s = c.has(3), c.clear(), lt;
  }
  function u(S) {
    const g = [];
    if (S.shaderID ? g.push(S.shaderID) : (g.push(S.customVertexShaderID), g.push(S.customFragmentShaderID)), S.defines !== void 0)
      for (const w in S.defines)
        g.push(w), g.push(S.defines[w]);
    return S.isRawShaderMaterial === !1 && (A(g, S), y(g, S), g.push(i.outputColorSpace)), g.push(S.customProgramCacheKey), g.join();
  }
  function A(S, g) {
    S.push(g.precision), S.push(g.outputColorSpace), S.push(g.envMapMode), S.push(g.envMapCubeUVHeight), S.push(g.mapUv), S.push(g.alphaMapUv), S.push(g.lightMapUv), S.push(g.aoMapUv), S.push(g.bumpMapUv), S.push(g.normalMapUv), S.push(g.displacementMapUv), S.push(g.emissiveMapUv), S.push(g.metalnessMapUv), S.push(g.roughnessMapUv), S.push(g.anisotropyMapUv), S.push(g.clearcoatMapUv), S.push(g.clearcoatNormalMapUv), S.push(g.clearcoatRoughnessMapUv), S.push(g.iridescenceMapUv), S.push(g.iridescenceThicknessMapUv), S.push(g.sheenColorMapUv), S.push(g.sheenRoughnessMapUv), S.push(g.specularMapUv), S.push(g.specularColorMapUv), S.push(g.specularIntensityMapUv), S.push(g.transmissionMapUv), S.push(g.thicknessMapUv), S.push(g.combine), S.push(g.fogExp2), S.push(g.sizeAttenuation), S.push(g.morphTargetsCount), S.push(g.morphAttributeCount), S.push(g.numDirLights), S.push(g.numPointLights), S.push(g.numSpotLights), S.push(g.numSpotLightMaps), S.push(g.numHemiLights), S.push(g.numRectAreaLights), S.push(g.numDirLightShadows), S.push(g.numPointLightShadows), S.push(g.numSpotLightShadows), S.push(g.numSpotLightShadowsWithMaps), S.push(g.numLightProbes), S.push(g.shadowMapType), S.push(g.toneMapping), S.push(g.numClippingPlanes), S.push(g.numClipIntersection), S.push(g.depthPacking);
  }
  function y(S, g) {
    o.disableAll(), g.supportsVertexTextures && o.enable(0), g.instancing && o.enable(1), g.instancingColor && o.enable(2), g.instancingMorph && o.enable(3), g.matcap && o.enable(4), g.envMap && o.enable(5), g.normalMapObjectSpace && o.enable(6), g.normalMapTangentSpace && o.enable(7), g.clearcoat && o.enable(8), g.iridescence && o.enable(9), g.alphaTest && o.enable(10), g.vertexColors && o.enable(11), g.vertexAlphas && o.enable(12), g.vertexUv1s && o.enable(13), g.vertexUv2s && o.enable(14), g.vertexUv3s && o.enable(15), g.vertexTangents && o.enable(16), g.anisotropy && o.enable(17), g.alphaHash && o.enable(18), g.batching && o.enable(19), g.dispersion && o.enable(20), g.batchingColor && o.enable(21), S.push(o.mask), o.disableAll(), g.fog && o.enable(0), g.useFog && o.enable(1), g.flatShading && o.enable(2), g.logarithmicDepthBuffer && o.enable(3), g.reverseDepthBuffer && o.enable(4), g.skinning && o.enable(5), g.morphTargets && o.enable(6), g.morphNormals && o.enable(7), g.morphColors && o.enable(8), g.premultipliedAlpha && o.enable(9), g.shadowMapEnabled && o.enable(10), g.doubleSided && o.enable(11), g.flipSided && o.enable(12), g.useDepthPacking && o.enable(13), g.dithering && o.enable(14), g.transmission && o.enable(15), g.sheen && o.enable(16), g.opaque && o.enable(17), g.pointsUvs && o.enable(18), g.decodeVideoTexture && o.enable(19), g.decodeVideoTextureEmissive && o.enable(20), g.alphaToCoverage && o.enable(21), S.push(o.mask);
  }
  function v(S) {
    const g = M[S.type];
    let w;
    if (g) {
      const z = It[g];
      w = oa.clone(z.uniforms);
    } else
      w = S.uniforms;
    return w;
  }
  function I(S, g) {
    let w;
    for (let z = 0, O = h.length; z < O; z++) {
      const k = h[z];
      if (k.cacheKey === g) {
        w = k, ++w.usedTimes;
        break;
      }
    }
    return w === void 0 && (w = new Su(i, g, S, s), h.push(w)), w;
  }
  function b(S) {
    if (--S.usedTimes === 0) {
      const g = h.indexOf(S);
      h[g] = h[h.length - 1], h.pop(), S.destroy();
    }
  }
  function R(S) {
    l.remove(S);
  }
  function C() {
    l.dispose();
  }
  return {
    getParameters: p,
    getProgramCacheKey: u,
    getUniforms: v,
    acquireProgram: I,
    releaseProgram: b,
    releaseShaderCache: R,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: h,
    dispose: C
  };
}
function bu() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(a) {
    return i.has(a);
  }
  function t(a) {
    let o = i.get(a);
    return o === void 0 && (o = {}, i.set(a, o)), o;
  }
  function n(a) {
    i.delete(a);
  }
  function r(a, o, l) {
    i.get(a)[o] = l;
  }
  function s() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: e,
    get: t,
    remove: n,
    update: r,
    dispose: s
  };
}
function Ru(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.material.id !== e.material.id ? i.material.id - e.material.id : i.z !== e.z ? i.z - e.z : i.id - e.id;
}
function ss(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.z !== e.z ? e.z - i.z : i.id - e.id;
}
function as() {
  const i = [];
  let e = 0;
  const t = [], n = [], r = [];
  function s() {
    e = 0, t.length = 0, n.length = 0, r.length = 0;
  }
  function a(d, f, m, M, E, p) {
    let u = i[e];
    return u === void 0 ? (u = {
      id: d.id,
      object: d,
      geometry: f,
      material: m,
      groupOrder: M,
      renderOrder: d.renderOrder,
      z: E,
      group: p
    }, i[e] = u) : (u.id = d.id, u.object = d, u.geometry = f, u.material = m, u.groupOrder = M, u.renderOrder = d.renderOrder, u.z = E, u.group = p), e++, u;
  }
  function o(d, f, m, M, E, p) {
    const u = a(d, f, m, M, E, p);
    m.transmission > 0 ? n.push(u) : m.transparent === !0 ? r.push(u) : t.push(u);
  }
  function l(d, f, m, M, E, p) {
    const u = a(d, f, m, M, E, p);
    m.transmission > 0 ? n.unshift(u) : m.transparent === !0 ? r.unshift(u) : t.unshift(u);
  }
  function c(d, f) {
    t.length > 1 && t.sort(d || Ru), n.length > 1 && n.sort(f || ss), r.length > 1 && r.sort(f || ss);
  }
  function h() {
    for (let d = e, f = i.length; d < f; d++) {
      const m = i[d];
      if (m.id === null) break;
      m.id = null, m.object = null, m.geometry = null, m.material = null, m.group = null;
    }
  }
  return {
    opaque: t,
    transmissive: n,
    transparent: r,
    init: s,
    push: o,
    unshift: l,
    finish: h,
    sort: c
  };
}
function wu() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(n, r) {
    const s = i.get(n);
    let a;
    return s === void 0 ? (a = new as(), i.set(n, [a])) : r >= s.length ? (a = new as(), s.push(a)) : a = s[r], a;
  }
  function t() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: t
  };
}
function Cu() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            direction: new F(),
            color: new Ve()
          };
          break;
        case "SpotLight":
          t = {
            position: new F(),
            direction: new F(),
            color: new Ve(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          t = {
            position: new F(),
            color: new Ve(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new F(),
            skyColor: new Ve(),
            groundColor: new Ve()
          };
          break;
        case "RectAreaLight":
          t = {
            color: new Ve(),
            position: new F(),
            halfWidth: new F(),
            halfHeight: new F()
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
function Pu() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ie()
          };
          break;
        case "SpotLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ie()
          };
          break;
        case "PointLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ie(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
let Du = 0;
function Lu(i, e) {
  return (e.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (i.map ? 1 : 0);
}
function Uu(i) {
  const e = new Cu(), t = Pu(), n = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let c = 0; c < 9; c++) n.probe.push(new F());
  const r = new F(), s = new nt(), a = new nt();
  function o(c) {
    let h = 0, d = 0, f = 0;
    for (let S = 0; S < 9; S++) n.probe[S].set(0, 0, 0);
    let m = 0, M = 0, E = 0, p = 0, u = 0, A = 0, y = 0, v = 0, I = 0, b = 0, R = 0;
    c.sort(Lu);
    for (let S = 0, g = c.length; S < g; S++) {
      const w = c[S], z = w.color, O = w.intensity, k = w.distance, Z = w.shadow && w.shadow.map ? w.shadow.map.texture : null;
      if (w.isAmbientLight)
        h += z.r * O, d += z.g * O, f += z.b * O;
      else if (w.isLightProbe) {
        for (let W = 0; W < 9; W++)
          n.probe[W].addScaledVector(w.sh.coefficients[W], O);
        R++;
      } else if (w.isDirectionalLight) {
        const W = e.get(w);
        if (W.color.copy(w.color).multiplyScalar(w.intensity), w.castShadow) {
          const Q = w.shadow, H = t.get(w);
          H.shadowIntensity = Q.intensity, H.shadowBias = Q.bias, H.shadowNormalBias = Q.normalBias, H.shadowRadius = Q.radius, H.shadowMapSize = Q.mapSize, n.directionalShadow[m] = H, n.directionalShadowMap[m] = Z, n.directionalShadowMatrix[m] = w.shadow.matrix, A++;
        }
        n.directional[m] = W, m++;
      } else if (w.isSpotLight) {
        const W = e.get(w);
        W.position.setFromMatrixPosition(w.matrixWorld), W.color.copy(z).multiplyScalar(O), W.distance = k, W.coneCos = Math.cos(w.angle), W.penumbraCos = Math.cos(w.angle * (1 - w.penumbra)), W.decay = w.decay, n.spot[E] = W;
        const Q = w.shadow;
        if (w.map && (n.spotLightMap[I] = w.map, I++, Q.updateMatrices(w), w.castShadow && b++), n.spotLightMatrix[E] = Q.matrix, w.castShadow) {
          const H = t.get(w);
          H.shadowIntensity = Q.intensity, H.shadowBias = Q.bias, H.shadowNormalBias = Q.normalBias, H.shadowRadius = Q.radius, H.shadowMapSize = Q.mapSize, n.spotShadow[E] = H, n.spotShadowMap[E] = Z, v++;
        }
        E++;
      } else if (w.isRectAreaLight) {
        const W = e.get(w);
        W.color.copy(z).multiplyScalar(O), W.halfWidth.set(w.width * 0.5, 0, 0), W.halfHeight.set(0, w.height * 0.5, 0), n.rectArea[p] = W, p++;
      } else if (w.isPointLight) {
        const W = e.get(w);
        if (W.color.copy(w.color).multiplyScalar(w.intensity), W.distance = w.distance, W.decay = w.decay, w.castShadow) {
          const Q = w.shadow, H = t.get(w);
          H.shadowIntensity = Q.intensity, H.shadowBias = Q.bias, H.shadowNormalBias = Q.normalBias, H.shadowRadius = Q.radius, H.shadowMapSize = Q.mapSize, H.shadowCameraNear = Q.camera.near, H.shadowCameraFar = Q.camera.far, n.pointShadow[M] = H, n.pointShadowMap[M] = Z, n.pointShadowMatrix[M] = w.shadow.matrix, y++;
        }
        n.point[M] = W, M++;
      } else if (w.isHemisphereLight) {
        const W = e.get(w);
        W.skyColor.copy(w.color).multiplyScalar(O), W.groundColor.copy(w.groundColor).multiplyScalar(O), n.hemi[u] = W, u++;
      }
    }
    p > 0 && (i.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = te.LTC_FLOAT_1, n.rectAreaLTC2 = te.LTC_FLOAT_2) : (n.rectAreaLTC1 = te.LTC_HALF_1, n.rectAreaLTC2 = te.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = d, n.ambient[2] = f;
    const C = n.hash;
    (C.directionalLength !== m || C.pointLength !== M || C.spotLength !== E || C.rectAreaLength !== p || C.hemiLength !== u || C.numDirectionalShadows !== A || C.numPointShadows !== y || C.numSpotShadows !== v || C.numSpotMaps !== I || C.numLightProbes !== R) && (n.directional.length = m, n.spot.length = E, n.rectArea.length = p, n.point.length = M, n.hemi.length = u, n.directionalShadow.length = A, n.directionalShadowMap.length = A, n.pointShadow.length = y, n.pointShadowMap.length = y, n.spotShadow.length = v, n.spotShadowMap.length = v, n.directionalShadowMatrix.length = A, n.pointShadowMatrix.length = y, n.spotLightMatrix.length = v + I - b, n.spotLightMap.length = I, n.numSpotLightShadowsWithMaps = b, n.numLightProbes = R, C.directionalLength = m, C.pointLength = M, C.spotLength = E, C.rectAreaLength = p, C.hemiLength = u, C.numDirectionalShadows = A, C.numPointShadows = y, C.numSpotShadows = v, C.numSpotMaps = I, C.numLightProbes = R, n.version = Du++);
  }
  function l(c, h) {
    let d = 0, f = 0, m = 0, M = 0, E = 0;
    const p = h.matrixWorldInverse;
    for (let u = 0, A = c.length; u < A; u++) {
      const y = c[u];
      if (y.isDirectionalLight) {
        const v = n.directional[d];
        v.direction.setFromMatrixPosition(y.matrixWorld), r.setFromMatrixPosition(y.target.matrixWorld), v.direction.sub(r), v.direction.transformDirection(p), d++;
      } else if (y.isSpotLight) {
        const v = n.spot[m];
        v.position.setFromMatrixPosition(y.matrixWorld), v.position.applyMatrix4(p), v.direction.setFromMatrixPosition(y.matrixWorld), r.setFromMatrixPosition(y.target.matrixWorld), v.direction.sub(r), v.direction.transformDirection(p), m++;
      } else if (y.isRectAreaLight) {
        const v = n.rectArea[M];
        v.position.setFromMatrixPosition(y.matrixWorld), v.position.applyMatrix4(p), a.identity(), s.copy(y.matrixWorld), s.premultiply(p), a.extractRotation(s), v.halfWidth.set(y.width * 0.5, 0, 0), v.halfHeight.set(0, y.height * 0.5, 0), v.halfWidth.applyMatrix4(a), v.halfHeight.applyMatrix4(a), M++;
      } else if (y.isPointLight) {
        const v = n.point[f];
        v.position.setFromMatrixPosition(y.matrixWorld), v.position.applyMatrix4(p), f++;
      } else if (y.isHemisphereLight) {
        const v = n.hemi[E];
        v.direction.setFromMatrixPosition(y.matrixWorld), v.direction.transformDirection(p), E++;
      }
    }
  }
  return {
    setup: o,
    setupView: l,
    state: n
  };
}
function os(i) {
  const e = new Uu(i), t = [], n = [];
  function r(h) {
    c.camera = h, t.length = 0, n.length = 0;
  }
  function s(h) {
    t.push(h);
  }
  function a(h) {
    n.push(h);
  }
  function o() {
    e.setup(t);
  }
  function l(h) {
    e.setupView(t, h);
  }
  const c = {
    lightsArray: t,
    shadowsArray: n,
    camera: null,
    lights: e,
    transmissionRenderTarget: {}
  };
  return {
    init: r,
    state: c,
    setupLights: o,
    setupLightsView: l,
    pushLight: s,
    pushShadow: a
  };
}
function Iu(i) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(r, s = 0) {
    const a = e.get(r);
    let o;
    return a === void 0 ? (o = new os(i), e.set(r, [o])) : s >= a.length ? (o = new os(i), a.push(o)) : o = a[s], o;
  }
  function n() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: n
  };
}
class Fu extends Yn {
  static get type() {
    return "MeshDepthMaterial";
  }
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.depthPacking = 3200, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class Nu extends Yn {
  static get type() {
    return "MeshDistanceMaterial";
  }
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}
const Ou = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, Bu = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function Gu(i, e, t) {
  let n = new nr();
  const r = new Ie(), s = new Ie(), a = new tt(), o = new Fu({ depthPacking: 3201 }), l = new Nu(), c = {}, h = t.maxTextureSize, d = { 0: 1, 1: 0, 2: 2 }, f = new en({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new Ie() },
      radius: { value: 4 }
    },
    vertexShader: Ou,
    fragmentShader: Bu
  }), m = f.clone();
  m.defines.HORIZONTAL_PASS = 1;
  const M = new Ot();
  M.setAttribute(
    "position",
    new Ft(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const E = new Et(M, f), p = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
  let u = this.type;
  this.render = function(b, R, C) {
    if (p.enabled === !1 || p.autoUpdate === !1 && p.needsUpdate === !1 || b.length === 0) return;
    const S = i.getRenderTarget(), g = i.getActiveCubeFace(), w = i.getActiveMipmapLevel(), z = i.state;
    z.setBlending(0), z.buffers.color.setClear(1, 1, 1, 1), z.buffers.depth.setTest(!0), z.setScissorTest(!1);
    const O = u !== 3 && this.type === 3, k = u === 3 && this.type !== 3;
    for (let Z = 0, W = b.length; Z < W; Z++) {
      const Q = b[Z], H = Q.shadow;
      if (H === void 0) {
        console.warn("THREE.WebGLShadowMap:", Q, "has no shadow.");
        continue;
      }
      if (H.autoUpdate === !1 && H.needsUpdate === !1) continue;
      r.copy(H.mapSize);
      const ie = H.getFrameExtents();
      if (r.multiply(ie), s.copy(H.mapSize), (r.x > h || r.y > h) && (r.x > h && (s.x = Math.floor(h / ie.x), r.x = s.x * ie.x, H.mapSize.x = s.x), r.y > h && (s.y = Math.floor(h / ie.y), r.y = s.y * ie.y, H.mapSize.y = s.y)), H.map === null || O === !0 || k === !0) {
        const xe = this.type !== 3 ? { minFilter: 1003, magFilter: 1003 } : {};
        H.map !== null && H.map.dispose(), H.map = new dn(r.x, r.y, xe), H.map.texture.name = Q.name + ".shadowMap", H.camera.updateProjectionMatrix();
      }
      i.setRenderTarget(H.map), i.clear();
      const ce = H.getViewportCount();
      for (let xe = 0; xe < ce; xe++) {
        const Le = H.getViewport(xe);
        a.set(
          s.x * Le.x,
          s.y * Le.y,
          s.x * Le.z,
          s.y * Le.w
        ), z.viewport(a), H.updateMatrices(Q, xe), n = H.getFrustum(), v(R, C, H.camera, Q, this.type);
      }
      H.isPointLightShadow !== !0 && this.type === 3 && A(H, C), H.needsUpdate = !1;
    }
    u = this.type, p.needsUpdate = !1, i.setRenderTarget(S, g, w);
  };
  function A(b, R) {
    const C = e.update(E);
    f.defines.VSM_SAMPLES !== b.blurSamples && (f.defines.VSM_SAMPLES = b.blurSamples, m.defines.VSM_SAMPLES = b.blurSamples, f.needsUpdate = !0, m.needsUpdate = !0), b.mapPass === null && (b.mapPass = new dn(r.x, r.y)), f.uniforms.shadow_pass.value = b.map.texture, f.uniforms.resolution.value = b.mapSize, f.uniforms.radius.value = b.radius, i.setRenderTarget(b.mapPass), i.clear(), i.renderBufferDirect(R, null, C, f, E, null), m.uniforms.shadow_pass.value = b.mapPass.texture, m.uniforms.resolution.value = b.mapSize, m.uniforms.radius.value = b.radius, i.setRenderTarget(b.map), i.clear(), i.renderBufferDirect(R, null, C, m, E, null);
  }
  function y(b, R, C, S) {
    let g = null;
    const w = C.isPointLight === !0 ? b.customDistanceMaterial : b.customDepthMaterial;
    if (w !== void 0)
      g = w;
    else if (g = C.isPointLight === !0 ? l : o, i.localClippingEnabled && R.clipShadows === !0 && Array.isArray(R.clippingPlanes) && R.clippingPlanes.length !== 0 || R.displacementMap && R.displacementScale !== 0 || R.alphaMap && R.alphaTest > 0 || R.map && R.alphaTest > 0) {
      const z = g.uuid, O = R.uuid;
      let k = c[z];
      k === void 0 && (k = {}, c[z] = k);
      let Z = k[O];
      Z === void 0 && (Z = g.clone(), k[O] = Z, R.addEventListener("dispose", I)), g = Z;
    }
    if (g.visible = R.visible, g.wireframe = R.wireframe, S === 3 ? g.side = R.shadowSide !== null ? R.shadowSide : R.side : g.side = R.shadowSide !== null ? R.shadowSide : d[R.side], g.alphaMap = R.alphaMap, g.alphaTest = R.alphaTest, g.map = R.map, g.clipShadows = R.clipShadows, g.clippingPlanes = R.clippingPlanes, g.clipIntersection = R.clipIntersection, g.displacementMap = R.displacementMap, g.displacementScale = R.displacementScale, g.displacementBias = R.displacementBias, g.wireframeLinewidth = R.wireframeLinewidth, g.linewidth = R.linewidth, C.isPointLight === !0 && g.isMeshDistanceMaterial === !0) {
      const z = i.properties.get(g);
      z.light = C;
    }
    return g;
  }
  function v(b, R, C, S, g) {
    if (b.visible === !1) return;
    if (b.layers.test(R.layers) && (b.isMesh || b.isLine || b.isPoints) && (b.castShadow || b.receiveShadow && g === 3) && (!b.frustumCulled || n.intersectsObject(b))) {
      b.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse, b.matrixWorld);
      const O = e.update(b), k = b.material;
      if (Array.isArray(k)) {
        const Z = O.groups;
        for (let W = 0, Q = Z.length; W < Q; W++) {
          const H = Z[W], ie = k[H.materialIndex];
          if (ie && ie.visible) {
            const ce = y(b, ie, S, g);
            b.onBeforeShadow(i, b, R, C, O, ce, H), i.renderBufferDirect(C, null, O, ce, b, H), b.onAfterShadow(i, b, R, C, O, ce, H);
          }
        }
      } else if (k.visible) {
        const Z = y(b, k, S, g);
        b.onBeforeShadow(i, b, R, C, O, Z, null), i.renderBufferDirect(C, null, O, Z, b, null), b.onAfterShadow(i, b, R, C, O, Z, null);
      }
    }
    const z = b.children;
    for (let O = 0, k = z.length; O < k; O++)
      v(z[O], R, C, S, g);
  }
  function I(b) {
    b.target.removeEventListener("dispose", I);
    for (const C in c) {
      const S = c[C], g = b.target.uuid;
      g in S && (S[g].dispose(), delete S[g]);
    }
  }
}
const zu = {
  0: 1,
  2: 6,
  4: 7,
  3: 5,
  1: 0,
  6: 2,
  7: 4,
  5: 3
};
function Vu(i, e) {
  function t() {
    let P = !1;
    const ne = new tt();
    let V = null;
    const K = new tt(0, 0, 0, 0);
    return {
      setMask: function(le) {
        V !== le && !P && (i.colorMask(le, le, le, le), V = le);
      },
      setLocked: function(le) {
        P = le;
      },
      setClear: function(le, ae, Re, et, lt) {
        lt === !0 && (le *= et, ae *= et, Re *= et), ne.set(le, ae, Re, et), K.equals(ne) === !1 && (i.clearColor(le, ae, Re, et), K.copy(ne));
      },
      reset: function() {
        P = !1, V = null, K.set(-1, 0, 0, 0);
      }
    };
  }
  function n() {
    let P = !1, ne = !1, V = null, K = null, le = null;
    return {
      setReversed: function(ae) {
        if (ne !== ae) {
          const Re = e.get("EXT_clip_control");
          ne ? Re.clipControlEXT(Re.LOWER_LEFT_EXT, Re.ZERO_TO_ONE_EXT) : Re.clipControlEXT(Re.LOWER_LEFT_EXT, Re.NEGATIVE_ONE_TO_ONE_EXT);
          const et = le;
          le = null, this.setClear(et);
        }
        ne = ae;
      },
      getReversed: function() {
        return ne;
      },
      setTest: function(ae) {
        ae ? re(i.DEPTH_TEST) : ye(i.DEPTH_TEST);
      },
      setMask: function(ae) {
        V !== ae && !P && (i.depthMask(ae), V = ae);
      },
      setFunc: function(ae) {
        if (ne && (ae = zu[ae]), K !== ae) {
          switch (ae) {
            case 0:
              i.depthFunc(i.NEVER);
              break;
            case 1:
              i.depthFunc(i.ALWAYS);
              break;
            case 2:
              i.depthFunc(i.LESS);
              break;
            case 3:
              i.depthFunc(i.LEQUAL);
              break;
            case 4:
              i.depthFunc(i.EQUAL);
              break;
            case 5:
              i.depthFunc(i.GEQUAL);
              break;
            case 6:
              i.depthFunc(i.GREATER);
              break;
            case 7:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          K = ae;
        }
      },
      setLocked: function(ae) {
        P = ae;
      },
      setClear: function(ae) {
        le !== ae && (ne && (ae = 1 - ae), i.clearDepth(ae), le = ae);
      },
      reset: function() {
        P = !1, V = null, K = null, le = null, ne = !1;
      }
    };
  }
  function r() {
    let P = !1, ne = null, V = null, K = null, le = null, ae = null, Re = null, et = null, lt = null;
    return {
      setTest: function(Xe) {
        P || (Xe ? re(i.STENCIL_TEST) : ye(i.STENCIL_TEST));
      },
      setMask: function(Xe) {
        ne !== Xe && !P && (i.stencilMask(Xe), ne = Xe);
      },
      setFunc: function(Xe, Rt, Bt) {
        (V !== Xe || K !== Rt || le !== Bt) && (i.stencilFunc(Xe, Rt, Bt), V = Xe, K = Rt, le = Bt);
      },
      setOp: function(Xe, Rt, Bt) {
        (ae !== Xe || Re !== Rt || et !== Bt) && (i.stencilOp(Xe, Rt, Bt), ae = Xe, Re = Rt, et = Bt);
      },
      setLocked: function(Xe) {
        P = Xe;
      },
      setClear: function(Xe) {
        lt !== Xe && (i.clearStencil(Xe), lt = Xe);
      },
      reset: function() {
        P = !1, ne = null, V = null, K = null, le = null, ae = null, Re = null, et = null, lt = null;
      }
    };
  }
  const s = new t(), a = new n(), o = new r(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
  let h = {}, d = {}, f = /* @__PURE__ */ new WeakMap(), m = [], M = null, E = !1, p = null, u = null, A = null, y = null, v = null, I = null, b = null, R = new Ve(0, 0, 0), C = 0, S = !1, g = null, w = null, z = null, O = null, k = null;
  const Z = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let W = !1, Q = 0;
  const H = i.getParameter(i.VERSION);
  H.indexOf("WebGL") !== -1 ? (Q = parseFloat(/^WebGL (\d)/.exec(H)[1]), W = Q >= 1) : H.indexOf("OpenGL ES") !== -1 && (Q = parseFloat(/^OpenGL ES (\d)/.exec(H)[1]), W = Q >= 2);
  let ie = null, ce = {};
  const xe = i.getParameter(i.SCISSOR_BOX), Le = i.getParameter(i.VIEWPORT), Ye = new tt().fromArray(xe), q = new tt().fromArray(Le);
  function ee(P, ne, V, K) {
    const le = new Uint8Array(4), ae = i.createTexture();
    i.bindTexture(P, ae), i.texParameteri(P, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(P, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let Re = 0; Re < V; Re++)
      P === i.TEXTURE_3D || P === i.TEXTURE_2D_ARRAY ? i.texImage3D(ne, 0, i.RGBA, 1, 1, K, 0, i.RGBA, i.UNSIGNED_BYTE, le) : i.texImage2D(ne + Re, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, le);
    return ae;
  }
  const _e = {};
  _e[i.TEXTURE_2D] = ee(i.TEXTURE_2D, i.TEXTURE_2D, 1), _e[i.TEXTURE_CUBE_MAP] = ee(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), _e[i.TEXTURE_2D_ARRAY] = ee(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), _e[i.TEXTURE_3D] = ee(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), re(i.DEPTH_TEST), a.setFunc(3), Fe(!1), Ne(1), re(i.CULL_FACE), U(0);
  function re(P) {
    h[P] !== !0 && (i.enable(P), h[P] = !0);
  }
  function ye(P) {
    h[P] !== !1 && (i.disable(P), h[P] = !1);
  }
  function be(P, ne) {
    return d[P] !== ne ? (i.bindFramebuffer(P, ne), d[P] = ne, P === i.DRAW_FRAMEBUFFER && (d[i.FRAMEBUFFER] = ne), P === i.FRAMEBUFFER && (d[i.DRAW_FRAMEBUFFER] = ne), !0) : !1;
  }
  function Ue(P, ne) {
    let V = m, K = !1;
    if (P) {
      V = f.get(ne), V === void 0 && (V = [], f.set(ne, V));
      const le = P.textures;
      if (V.length !== le.length || V[0] !== i.COLOR_ATTACHMENT0) {
        for (let ae = 0, Re = le.length; ae < Re; ae++)
          V[ae] = i.COLOR_ATTACHMENT0 + ae;
        V.length = le.length, K = !0;
      }
    } else
      V[0] !== i.BACK && (V[0] = i.BACK, K = !0);
    K && i.drawBuffers(V);
  }
  function Qe(P) {
    return M !== P ? (i.useProgram(P), M = P, !0) : !1;
  }
  const Be = {
    100: i.FUNC_ADD,
    101: i.FUNC_SUBTRACT,
    102: i.FUNC_REVERSE_SUBTRACT
  };
  Be[103] = i.MIN, Be[104] = i.MAX;
  const it = {
    200: i.ZERO,
    201: i.ONE,
    202: i.SRC_COLOR,
    204: i.SRC_ALPHA,
    210: i.SRC_ALPHA_SATURATE,
    208: i.DST_COLOR,
    206: i.DST_ALPHA,
    203: i.ONE_MINUS_SRC_COLOR,
    205: i.ONE_MINUS_SRC_ALPHA,
    209: i.ONE_MINUS_DST_COLOR,
    207: i.ONE_MINUS_DST_ALPHA,
    211: i.CONSTANT_COLOR,
    212: i.ONE_MINUS_CONSTANT_COLOR,
    213: i.CONSTANT_ALPHA,
    214: i.ONE_MINUS_CONSTANT_ALPHA
  };
  function U(P, ne, V, K, le, ae, Re, et, lt, Xe) {
    if (P === 0) {
      E === !0 && (ye(i.BLEND), E = !1);
      return;
    }
    if (E === !1 && (re(i.BLEND), E = !0), P !== 5) {
      if (P !== p || Xe !== S) {
        if ((u !== 100 || v !== 100) && (i.blendEquation(i.FUNC_ADD), u = 100, v = 100), Xe)
          switch (P) {
            case 1:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case 3:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case 4:
              i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", P);
              break;
          }
        else
          switch (P) {
            case 1:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              i.blendFunc(i.SRC_ALPHA, i.ONE);
              break;
            case 3:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case 4:
              i.blendFunc(i.ZERO, i.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", P);
              break;
          }
        A = null, y = null, I = null, b = null, R.set(0, 0, 0), C = 0, p = P, S = Xe;
      }
      return;
    }
    le = le || ne, ae = ae || V, Re = Re || K, (ne !== u || le !== v) && (i.blendEquationSeparate(Be[ne], Be[le]), u = ne, v = le), (V !== A || K !== y || ae !== I || Re !== b) && (i.blendFuncSeparate(it[V], it[K], it[ae], it[Re]), A = V, y = K, I = ae, b = Re), (et.equals(R) === !1 || lt !== C) && (i.blendColor(et.r, et.g, et.b, lt), R.copy(et), C = lt), p = P, S = !1;
  }
  function yt(P, ne) {
    P.side === 2 ? ye(i.CULL_FACE) : re(i.CULL_FACE);
    let V = P.side === 1;
    ne && (V = !V), Fe(V), P.blending === 1 && P.transparent === !1 ? U(0) : U(P.blending, P.blendEquation, P.blendSrc, P.blendDst, P.blendEquationAlpha, P.blendSrcAlpha, P.blendDstAlpha, P.blendColor, P.blendAlpha, P.premultipliedAlpha), a.setFunc(P.depthFunc), a.setTest(P.depthTest), a.setMask(P.depthWrite), s.setMask(P.colorWrite);
    const K = P.stencilWrite;
    o.setTest(K), K && (o.setMask(P.stencilWriteMask), o.setFunc(P.stencilFunc, P.stencilRef, P.stencilFuncMask), o.setOp(P.stencilFail, P.stencilZFail, P.stencilZPass)), $e(P.polygonOffset, P.polygonOffsetFactor, P.polygonOffsetUnits), P.alphaToCoverage === !0 ? re(i.SAMPLE_ALPHA_TO_COVERAGE) : ye(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function Fe(P) {
    g !== P && (P ? i.frontFace(i.CW) : i.frontFace(i.CCW), g = P);
  }
  function Ne(P) {
    P !== 0 ? (re(i.CULL_FACE), P !== w && (P === 1 ? i.cullFace(i.BACK) : P === 2 ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : ye(i.CULL_FACE), w = P;
  }
  function Se(P) {
    P !== z && (W && i.lineWidth(P), z = P);
  }
  function $e(P, ne, V) {
    P ? (re(i.POLYGON_OFFSET_FILL), (O !== ne || k !== V) && (i.polygonOffset(ne, V), O = ne, k = V)) : ye(i.POLYGON_OFFSET_FILL);
  }
  function Me(P) {
    P ? re(i.SCISSOR_TEST) : ye(i.SCISSOR_TEST);
  }
  function T(P) {
    P === void 0 && (P = i.TEXTURE0 + Z - 1), ie !== P && (i.activeTexture(P), ie = P);
  }
  function _(P, ne, V) {
    V === void 0 && (ie === null ? V = i.TEXTURE0 + Z - 1 : V = ie);
    let K = ce[V];
    K === void 0 && (K = { type: void 0, texture: void 0 }, ce[V] = K), (K.type !== P || K.texture !== ne) && (ie !== V && (i.activeTexture(V), ie = V), i.bindTexture(P, ne || _e[P]), K.type = P, K.texture = ne);
  }
  function N() {
    const P = ce[ie];
    P !== void 0 && P.type !== void 0 && (i.bindTexture(P.type, null), P.type = void 0, P.texture = void 0);
  }
  function Y() {
    try {
      i.compressedTexImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function $() {
    try {
      i.compressedTexImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function X() {
    try {
      i.texSubImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function ge() {
    try {
      i.texSubImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function se() {
    try {
      i.compressedTexSubImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function ue() {
    try {
      i.compressedTexSubImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Ge() {
    try {
      i.texStorage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function j() {
    try {
      i.texStorage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function he() {
    try {
      i.texImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Ee() {
    try {
      i.texImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Te(P) {
    Ye.equals(P) === !1 && (i.scissor(P.x, P.y, P.z, P.w), Ye.copy(P));
  }
  function de(P) {
    q.equals(P) === !1 && (i.viewport(P.x, P.y, P.z, P.w), q.copy(P));
  }
  function Oe(P, ne) {
    let V = c.get(ne);
    V === void 0 && (V = /* @__PURE__ */ new WeakMap(), c.set(ne, V));
    let K = V.get(P);
    K === void 0 && (K = i.getUniformBlockIndex(ne, P.name), V.set(P, K));
  }
  function Pe(P, ne) {
    const K = c.get(ne).get(P);
    l.get(ne) !== K && (i.uniformBlockBinding(ne, K, P.__bindingPointIndex), l.set(ne, K));
  }
  function Ke() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), a.setReversed(!1), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), h = {}, ie = null, ce = {}, d = {}, f = /* @__PURE__ */ new WeakMap(), m = [], M = null, E = !1, p = null, u = null, A = null, y = null, v = null, I = null, b = null, R = new Ve(0, 0, 0), C = 0, S = !1, g = null, w = null, z = null, O = null, k = null, Ye.set(0, 0, i.canvas.width, i.canvas.height), q.set(0, 0, i.canvas.width, i.canvas.height), s.reset(), a.reset(), o.reset();
  }
  return {
    buffers: {
      color: s,
      depth: a,
      stencil: o
    },
    enable: re,
    disable: ye,
    bindFramebuffer: be,
    drawBuffers: Ue,
    useProgram: Qe,
    setBlending: U,
    setMaterial: yt,
    setFlipSided: Fe,
    setCullFace: Ne,
    setLineWidth: Se,
    setPolygonOffset: $e,
    setScissorTest: Me,
    activeTexture: T,
    bindTexture: _,
    unbindTexture: N,
    compressedTexImage2D: Y,
    compressedTexImage3D: $,
    texImage2D: he,
    texImage3D: Ee,
    updateUBOMapping: Oe,
    uniformBlockBinding: Pe,
    texStorage2D: Ge,
    texStorage3D: j,
    texSubImage2D: X,
    texSubImage3D: ge,
    compressedTexSubImage2D: se,
    compressedTexSubImage3D: ue,
    scissor: Te,
    viewport: de,
    reset: Ke
  };
}
function ls(i, e, t, n) {
  const r = Hu(n);
  switch (t) {
    // https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
    case 1021:
      return i * e;
    case 1024:
      return i * e;
    case 1025:
      return i * e * 2;
    case 1028:
      return i * e / r.components * r.byteLength;
    case 1029:
      return i * e / r.components * r.byteLength;
    case 1030:
      return i * e * 2 / r.components * r.byteLength;
    case 1031:
      return i * e * 2 / r.components * r.byteLength;
    case 1022:
      return i * e * 3 / r.components * r.byteLength;
    case 1023:
      return i * e * 4 / r.components * r.byteLength;
    case 1033:
      return i * e * 4 / r.components * r.byteLength;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_s3tc_srgb/
    case 33776:
    case 33777:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case 33778:
    case 33779:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_pvrtc/
    case 35841:
    case 35843:
      return Math.max(i, 16) * Math.max(e, 8) / 4;
    case 35840:
    case 35842:
      return Math.max(i, 8) * Math.max(e, 8) / 2;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_etc/
    case 36196:
    case 37492:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case 37496:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_astc/
    case 37808:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case 37809:
      return Math.floor((i + 4) / 5) * Math.floor((e + 3) / 4) * 16;
    case 37810:
      return Math.floor((i + 4) / 5) * Math.floor((e + 4) / 5) * 16;
    case 37811:
      return Math.floor((i + 5) / 6) * Math.floor((e + 4) / 5) * 16;
    case 37812:
      return Math.floor((i + 5) / 6) * Math.floor((e + 5) / 6) * 16;
    case 37813:
      return Math.floor((i + 7) / 8) * Math.floor((e + 4) / 5) * 16;
    case 37814:
      return Math.floor((i + 7) / 8) * Math.floor((e + 5) / 6) * 16;
    case 37815:
      return Math.floor((i + 7) / 8) * Math.floor((e + 7) / 8) * 16;
    case 37816:
      return Math.floor((i + 9) / 10) * Math.floor((e + 4) / 5) * 16;
    case 37817:
      return Math.floor((i + 9) / 10) * Math.floor((e + 5) / 6) * 16;
    case 37818:
      return Math.floor((i + 9) / 10) * Math.floor((e + 7) / 8) * 16;
    case 37819:
      return Math.floor((i + 9) / 10) * Math.floor((e + 9) / 10) * 16;
    case 37820:
      return Math.floor((i + 11) / 12) * Math.floor((e + 9) / 10) * 16;
    case 37821:
      return Math.floor((i + 11) / 12) * Math.floor((e + 11) / 12) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_bptc/
    case 36492:
    case 36494:
    case 36495:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_rgtc/
    case 36283:
    case 36284:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 8;
    case 36285:
    case 36286:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${t} format.`
  );
}
function Hu(i) {
  switch (i) {
    case 1009:
    case 1010:
      return { byteLength: 1, components: 1 };
    case 1012:
    case 1011:
    case 1016:
      return { byteLength: 2, components: 1 };
    case 1017:
    case 1018:
      return { byteLength: 2, components: 4 };
    case 1014:
    case 1013:
    case 1015:
      return { byteLength: 4, components: 1 };
    case 35902:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${i}.`);
}
function ku(i, e, t, n, r, s, a) {
  const o = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), c = new Ie(), h = /* @__PURE__ */ new WeakMap();
  let d;
  const f = /* @__PURE__ */ new WeakMap();
  let m = !1;
  try {
    m = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function M(T, _) {
    return m ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(T, _)
    ) : vi("canvas");
  }
  function E(T, _, N) {
    let Y = 1;
    const $ = Me(T);
    if (($.width > N || $.height > N) && (Y = N / Math.max($.width, $.height)), Y < 1)
      if (typeof HTMLImageElement < "u" && T instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && T instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && T instanceof ImageBitmap || typeof VideoFrame < "u" && T instanceof VideoFrame) {
        const X = Math.floor(Y * $.width), ge = Math.floor(Y * $.height);
        d === void 0 && (d = M(X, ge));
        const se = _ ? M(X, ge) : d;
        return se.width = X, se.height = ge, se.getContext("2d").drawImage(T, 0, 0, X, ge), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + $.width + "x" + $.height + ") to (" + X + "x" + ge + ")."), se;
      } else
        return "data" in T && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + $.width + "x" + $.height + ")."), T;
    return T;
  }
  function p(T) {
    return T.generateMipmaps;
  }
  function u(T) {
    i.generateMipmap(T);
  }
  function A(T) {
    return T.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : T.isWebGL3DRenderTarget ? i.TEXTURE_3D : T.isWebGLArrayRenderTarget || T.isCompressedArrayTexture ? i.TEXTURE_2D_ARRAY : i.TEXTURE_2D;
  }
  function y(T, _, N, Y, $ = !1) {
    if (T !== null) {
      if (i[T] !== void 0) return i[T];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + T + "'");
    }
    let X = _;
    if (_ === i.RED && (N === i.FLOAT && (X = i.R32F), N === i.HALF_FLOAT && (X = i.R16F), N === i.UNSIGNED_BYTE && (X = i.R8)), _ === i.RED_INTEGER && (N === i.UNSIGNED_BYTE && (X = i.R8UI), N === i.UNSIGNED_SHORT && (X = i.R16UI), N === i.UNSIGNED_INT && (X = i.R32UI), N === i.BYTE && (X = i.R8I), N === i.SHORT && (X = i.R16I), N === i.INT && (X = i.R32I)), _ === i.RG && (N === i.FLOAT && (X = i.RG32F), N === i.HALF_FLOAT && (X = i.RG16F), N === i.UNSIGNED_BYTE && (X = i.RG8)), _ === i.RG_INTEGER && (N === i.UNSIGNED_BYTE && (X = i.RG8UI), N === i.UNSIGNED_SHORT && (X = i.RG16UI), N === i.UNSIGNED_INT && (X = i.RG32UI), N === i.BYTE && (X = i.RG8I), N === i.SHORT && (X = i.RG16I), N === i.INT && (X = i.RG32I)), _ === i.RGB_INTEGER && (N === i.UNSIGNED_BYTE && (X = i.RGB8UI), N === i.UNSIGNED_SHORT && (X = i.RGB16UI), N === i.UNSIGNED_INT && (X = i.RGB32UI), N === i.BYTE && (X = i.RGB8I), N === i.SHORT && (X = i.RGB16I), N === i.INT && (X = i.RGB32I)), _ === i.RGBA_INTEGER && (N === i.UNSIGNED_BYTE && (X = i.RGBA8UI), N === i.UNSIGNED_SHORT && (X = i.RGBA16UI), N === i.UNSIGNED_INT && (X = i.RGBA32UI), N === i.BYTE && (X = i.RGBA8I), N === i.SHORT && (X = i.RGBA16I), N === i.INT && (X = i.RGBA32I)), _ === i.RGB && N === i.UNSIGNED_INT_5_9_9_9_REV && (X = i.RGB9_E5), _ === i.RGBA) {
      const ge = $ ? xi : ze.getTransfer(Y);
      N === i.FLOAT && (X = i.RGBA32F), N === i.HALF_FLOAT && (X = i.RGBA16F), N === i.UNSIGNED_BYTE && (X = ge === qe ? i.SRGB8_ALPHA8 : i.RGBA8), N === i.UNSIGNED_SHORT_4_4_4_4 && (X = i.RGBA4), N === i.UNSIGNED_SHORT_5_5_5_1 && (X = i.RGB5_A1);
    }
    return (X === i.R16F || X === i.R32F || X === i.RG16F || X === i.RG32F || X === i.RGBA16F || X === i.RGBA32F) && e.get("EXT_color_buffer_float"), X;
  }
  function v(T, _) {
    let N;
    return T ? _ === null || _ === 1014 || _ === 1020 ? N = i.DEPTH24_STENCIL8 : _ === 1015 ? N = i.DEPTH32F_STENCIL8 : _ === 1012 && (N = i.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : _ === null || _ === 1014 || _ === 1020 ? N = i.DEPTH_COMPONENT24 : _ === 1015 ? N = i.DEPTH_COMPONENT32F : _ === 1012 && (N = i.DEPTH_COMPONENT16), N;
  }
  function I(T, _) {
    return p(T) === !0 || T.isFramebufferTexture && T.minFilter !== 1003 && T.minFilter !== 1006 ? Math.log2(Math.max(_.width, _.height)) + 1 : T.mipmaps !== void 0 && T.mipmaps.length > 0 ? T.mipmaps.length : T.isCompressedTexture && Array.isArray(T.image) ? _.mipmaps.length : 1;
  }
  function b(T) {
    const _ = T.target;
    _.removeEventListener("dispose", b), C(_), _.isVideoTexture && h.delete(_);
  }
  function R(T) {
    const _ = T.target;
    _.removeEventListener("dispose", R), g(_);
  }
  function C(T) {
    const _ = n.get(T);
    if (_.__webglInit === void 0) return;
    const N = T.source, Y = f.get(N);
    if (Y) {
      const $ = Y[_.__cacheKey];
      $.usedTimes--, $.usedTimes === 0 && S(T), Object.keys(Y).length === 0 && f.delete(N);
    }
    n.remove(T);
  }
  function S(T) {
    const _ = n.get(T);
    i.deleteTexture(_.__webglTexture);
    const N = T.source, Y = f.get(N);
    delete Y[_.__cacheKey], a.memory.textures--;
  }
  function g(T) {
    const _ = n.get(T);
    if (T.depthTexture && (T.depthTexture.dispose(), n.remove(T.depthTexture)), T.isWebGLCubeRenderTarget)
      for (let Y = 0; Y < 6; Y++) {
        if (Array.isArray(_.__webglFramebuffer[Y]))
          for (let $ = 0; $ < _.__webglFramebuffer[Y].length; $++) i.deleteFramebuffer(_.__webglFramebuffer[Y][$]);
        else
          i.deleteFramebuffer(_.__webglFramebuffer[Y]);
        _.__webglDepthbuffer && i.deleteRenderbuffer(_.__webglDepthbuffer[Y]);
      }
    else {
      if (Array.isArray(_.__webglFramebuffer))
        for (let Y = 0; Y < _.__webglFramebuffer.length; Y++) i.deleteFramebuffer(_.__webglFramebuffer[Y]);
      else
        i.deleteFramebuffer(_.__webglFramebuffer);
      if (_.__webglDepthbuffer && i.deleteRenderbuffer(_.__webglDepthbuffer), _.__webglMultisampledFramebuffer && i.deleteFramebuffer(_.__webglMultisampledFramebuffer), _.__webglColorRenderbuffer)
        for (let Y = 0; Y < _.__webglColorRenderbuffer.length; Y++)
          _.__webglColorRenderbuffer[Y] && i.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);
      _.__webglDepthRenderbuffer && i.deleteRenderbuffer(_.__webglDepthRenderbuffer);
    }
    const N = T.textures;
    for (let Y = 0, $ = N.length; Y < $; Y++) {
      const X = n.get(N[Y]);
      X.__webglTexture && (i.deleteTexture(X.__webglTexture), a.memory.textures--), n.remove(N[Y]);
    }
    n.remove(T);
  }
  let w = 0;
  function z() {
    w = 0;
  }
  function O() {
    const T = w;
    return T >= r.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + T + " texture units while this GPU supports only " + r.maxTextures), w += 1, T;
  }
  function k(T) {
    const _ = [];
    return _.push(T.wrapS), _.push(T.wrapT), _.push(T.wrapR || 0), _.push(T.magFilter), _.push(T.minFilter), _.push(T.anisotropy), _.push(T.internalFormat), _.push(T.format), _.push(T.type), _.push(T.generateMipmaps), _.push(T.premultiplyAlpha), _.push(T.flipY), _.push(T.unpackAlignment), _.push(T.colorSpace), _.join();
  }
  function Z(T, _) {
    const N = n.get(T);
    if (T.isVideoTexture && Se(T), T.isRenderTargetTexture === !1 && T.version > 0 && N.__version !== T.version) {
      const Y = T.image;
      if (Y === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (Y.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        q(N, T, _);
        return;
      }
    }
    t.bindTexture(i.TEXTURE_2D, N.__webglTexture, i.TEXTURE0 + _);
  }
  function W(T, _) {
    const N = n.get(T);
    if (T.version > 0 && N.__version !== T.version) {
      q(N, T, _);
      return;
    }
    t.bindTexture(i.TEXTURE_2D_ARRAY, N.__webglTexture, i.TEXTURE0 + _);
  }
  function Q(T, _) {
    const N = n.get(T);
    if (T.version > 0 && N.__version !== T.version) {
      q(N, T, _);
      return;
    }
    t.bindTexture(i.TEXTURE_3D, N.__webglTexture, i.TEXTURE0 + _);
  }
  function H(T, _) {
    const N = n.get(T);
    if (T.version > 0 && N.__version !== T.version) {
      ee(N, T, _);
      return;
    }
    t.bindTexture(i.TEXTURE_CUBE_MAP, N.__webglTexture, i.TEXTURE0 + _);
  }
  const ie = {
    1e3: i.REPEAT,
    1001: i.CLAMP_TO_EDGE,
    1002: i.MIRRORED_REPEAT
  }, ce = {
    1003: i.NEAREST,
    1004: i.NEAREST_MIPMAP_NEAREST,
    1005: i.NEAREST_MIPMAP_LINEAR,
    1006: i.LINEAR,
    1007: i.LINEAR_MIPMAP_NEAREST,
    1008: i.LINEAR_MIPMAP_LINEAR
  }, xe = {
    512: i.NEVER,
    519: i.ALWAYS,
    513: i.LESS,
    515: i.LEQUAL,
    514: i.EQUAL,
    518: i.GEQUAL,
    516: i.GREATER,
    517: i.NOTEQUAL
  };
  function Le(T, _) {
    if (_.type === 1015 && e.has("OES_texture_float_linear") === !1 && (_.magFilter === 1006 || _.magFilter === 1007 || _.magFilter === 1005 || _.magFilter === 1008 || _.minFilter === 1006 || _.minFilter === 1007 || _.minFilter === 1005 || _.minFilter === 1008) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(T, i.TEXTURE_WRAP_S, ie[_.wrapS]), i.texParameteri(T, i.TEXTURE_WRAP_T, ie[_.wrapT]), (T === i.TEXTURE_3D || T === i.TEXTURE_2D_ARRAY) && i.texParameteri(T, i.TEXTURE_WRAP_R, ie[_.wrapR]), i.texParameteri(T, i.TEXTURE_MAG_FILTER, ce[_.magFilter]), i.texParameteri(T, i.TEXTURE_MIN_FILTER, ce[_.minFilter]), _.compareFunction && (i.texParameteri(T, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(T, i.TEXTURE_COMPARE_FUNC, xe[_.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
      if (_.magFilter === 1003 || _.minFilter !== 1005 && _.minFilter !== 1008 || _.type === 1015 && e.has("OES_texture_float_linear") === !1) return;
      if (_.anisotropy > 1 || n.get(_).__currentAnisotropy) {
        const N = e.get("EXT_texture_filter_anisotropic");
        i.texParameterf(T, N.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(_.anisotropy, r.getMaxAnisotropy())), n.get(_).__currentAnisotropy = _.anisotropy;
      }
    }
  }
  function Ye(T, _) {
    let N = !1;
    T.__webglInit === void 0 && (T.__webglInit = !0, _.addEventListener("dispose", b));
    const Y = _.source;
    let $ = f.get(Y);
    $ === void 0 && ($ = {}, f.set(Y, $));
    const X = k(_);
    if (X !== T.__cacheKey) {
      $[X] === void 0 && ($[X] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, a.memory.textures++, N = !0), $[X].usedTimes++;
      const ge = $[T.__cacheKey];
      ge !== void 0 && ($[T.__cacheKey].usedTimes--, ge.usedTimes === 0 && S(_)), T.__cacheKey = X, T.__webglTexture = $[X].texture;
    }
    return N;
  }
  function q(T, _, N) {
    let Y = i.TEXTURE_2D;
    (_.isDataArrayTexture || _.isCompressedArrayTexture) && (Y = i.TEXTURE_2D_ARRAY), _.isData3DTexture && (Y = i.TEXTURE_3D);
    const $ = Ye(T, _), X = _.source;
    t.bindTexture(Y, T.__webglTexture, i.TEXTURE0 + N);
    const ge = n.get(X);
    if (X.version !== ge.__version || $ === !0) {
      t.activeTexture(i.TEXTURE0 + N);
      const se = ze.getPrimaries(ze.workingColorSpace), ue = _.colorSpace === "" ? null : ze.getPrimaries(_.colorSpace), Ge = _.colorSpace === "" || se === ue ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, _.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, _.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, Ge);
      let j = E(_.image, !1, r.maxTextureSize);
      j = $e(_, j);
      const he = s.convert(_.format, _.colorSpace), Ee = s.convert(_.type);
      let Te = y(_.internalFormat, he, Ee, _.colorSpace, _.isVideoTexture);
      Le(Y, _);
      let de;
      const Oe = _.mipmaps, Pe = _.isVideoTexture !== !0, Ke = ge.__version === void 0 || $ === !0, P = X.dataReady, ne = I(_, j);
      if (_.isDepthTexture)
        Te = v(_.format === 1027, _.type), Ke && (Pe ? t.texStorage2D(i.TEXTURE_2D, 1, Te, j.width, j.height) : t.texImage2D(i.TEXTURE_2D, 0, Te, j.width, j.height, 0, he, Ee, null));
      else if (_.isDataTexture)
        if (Oe.length > 0) {
          Pe && Ke && t.texStorage2D(i.TEXTURE_2D, ne, Te, Oe[0].width, Oe[0].height);
          for (let V = 0, K = Oe.length; V < K; V++)
            de = Oe[V], Pe ? P && t.texSubImage2D(i.TEXTURE_2D, V, 0, 0, de.width, de.height, he, Ee, de.data) : t.texImage2D(i.TEXTURE_2D, V, Te, de.width, de.height, 0, he, Ee, de.data);
          _.generateMipmaps = !1;
        } else
          Pe ? (Ke && t.texStorage2D(i.TEXTURE_2D, ne, Te, j.width, j.height), P && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, j.width, j.height, he, Ee, j.data)) : t.texImage2D(i.TEXTURE_2D, 0, Te, j.width, j.height, 0, he, Ee, j.data);
      else if (_.isCompressedTexture)
        if (_.isCompressedArrayTexture) {
          Pe && Ke && t.texStorage3D(i.TEXTURE_2D_ARRAY, ne, Te, Oe[0].width, Oe[0].height, j.depth);
          for (let V = 0, K = Oe.length; V < K; V++)
            if (de = Oe[V], _.format !== 1023)
              if (he !== null)
                if (Pe) {
                  if (P)
                    if (_.layerUpdates.size > 0) {
                      const le = ls(de.width, de.height, _.format, _.type);
                      for (const ae of _.layerUpdates) {
                        const Re = de.data.subarray(
                          ae * le / de.data.BYTES_PER_ELEMENT,
                          (ae + 1) * le / de.data.BYTES_PER_ELEMENT
                        );
                        t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, V, 0, 0, ae, de.width, de.height, 1, he, Re);
                      }
                      _.clearLayerUpdates();
                    } else
                      t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, V, 0, 0, 0, de.width, de.height, j.depth, he, de.data);
                } else
                  t.compressedTexImage3D(i.TEXTURE_2D_ARRAY, V, Te, de.width, de.height, j.depth, 0, de.data, 0, 0);
              else
                console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              Pe ? P && t.texSubImage3D(i.TEXTURE_2D_ARRAY, V, 0, 0, 0, de.width, de.height, j.depth, he, Ee, de.data) : t.texImage3D(i.TEXTURE_2D_ARRAY, V, Te, de.width, de.height, j.depth, 0, he, Ee, de.data);
        } else {
          Pe && Ke && t.texStorage2D(i.TEXTURE_2D, ne, Te, Oe[0].width, Oe[0].height);
          for (let V = 0, K = Oe.length; V < K; V++)
            de = Oe[V], _.format !== 1023 ? he !== null ? Pe ? P && t.compressedTexSubImage2D(i.TEXTURE_2D, V, 0, 0, de.width, de.height, he, de.data) : t.compressedTexImage2D(i.TEXTURE_2D, V, Te, de.width, de.height, 0, de.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Pe ? P && t.texSubImage2D(i.TEXTURE_2D, V, 0, 0, de.width, de.height, he, Ee, de.data) : t.texImage2D(i.TEXTURE_2D, V, Te, de.width, de.height, 0, he, Ee, de.data);
        }
      else if (_.isDataArrayTexture)
        if (Pe) {
          if (Ke && t.texStorage3D(i.TEXTURE_2D_ARRAY, ne, Te, j.width, j.height, j.depth), P)
            if (_.layerUpdates.size > 0) {
              const V = ls(j.width, j.height, _.format, _.type);
              for (const K of _.layerUpdates) {
                const le = j.data.subarray(
                  K * V / j.data.BYTES_PER_ELEMENT,
                  (K + 1) * V / j.data.BYTES_PER_ELEMENT
                );
                t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, K, j.width, j.height, 1, he, Ee, le);
              }
              _.clearLayerUpdates();
            } else
              t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, j.width, j.height, j.depth, he, Ee, j.data);
        } else
          t.texImage3D(i.TEXTURE_2D_ARRAY, 0, Te, j.width, j.height, j.depth, 0, he, Ee, j.data);
      else if (_.isData3DTexture)
        Pe ? (Ke && t.texStorage3D(i.TEXTURE_3D, ne, Te, j.width, j.height, j.depth), P && t.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, j.width, j.height, j.depth, he, Ee, j.data)) : t.texImage3D(i.TEXTURE_3D, 0, Te, j.width, j.height, j.depth, 0, he, Ee, j.data);
      else if (_.isFramebufferTexture) {
        if (Ke)
          if (Pe)
            t.texStorage2D(i.TEXTURE_2D, ne, Te, j.width, j.height);
          else {
            let V = j.width, K = j.height;
            for (let le = 0; le < ne; le++)
              t.texImage2D(i.TEXTURE_2D, le, Te, V, K, 0, he, Ee, null), V >>= 1, K >>= 1;
          }
      } else if (Oe.length > 0) {
        if (Pe && Ke) {
          const V = Me(Oe[0]);
          t.texStorage2D(i.TEXTURE_2D, ne, Te, V.width, V.height);
        }
        for (let V = 0, K = Oe.length; V < K; V++)
          de = Oe[V], Pe ? P && t.texSubImage2D(i.TEXTURE_2D, V, 0, 0, he, Ee, de) : t.texImage2D(i.TEXTURE_2D, V, Te, he, Ee, de);
        _.generateMipmaps = !1;
      } else if (Pe) {
        if (Ke) {
          const V = Me(j);
          t.texStorage2D(i.TEXTURE_2D, ne, Te, V.width, V.height);
        }
        P && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, he, Ee, j);
      } else
        t.texImage2D(i.TEXTURE_2D, 0, Te, he, Ee, j);
      p(_) && u(Y), ge.__version = X.version, _.onUpdate && _.onUpdate(_);
    }
    T.__version = _.version;
  }
  function ee(T, _, N) {
    if (_.image.length !== 6) return;
    const Y = Ye(T, _), $ = _.source;
    t.bindTexture(i.TEXTURE_CUBE_MAP, T.__webglTexture, i.TEXTURE0 + N);
    const X = n.get($);
    if ($.version !== X.__version || Y === !0) {
      t.activeTexture(i.TEXTURE0 + N);
      const ge = ze.getPrimaries(ze.workingColorSpace), se = _.colorSpace === "" ? null : ze.getPrimaries(_.colorSpace), ue = _.colorSpace === "" || ge === se ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, _.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, _.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, ue);
      const Ge = _.isCompressedTexture || _.image[0].isCompressedTexture, j = _.image[0] && _.image[0].isDataTexture, he = [];
      for (let K = 0; K < 6; K++)
        !Ge && !j ? he[K] = E(_.image[K], !0, r.maxCubemapSize) : he[K] = j ? _.image[K].image : _.image[K], he[K] = $e(_, he[K]);
      const Ee = he[0], Te = s.convert(_.format, _.colorSpace), de = s.convert(_.type), Oe = y(_.internalFormat, Te, de, _.colorSpace), Pe = _.isVideoTexture !== !0, Ke = X.__version === void 0 || Y === !0, P = $.dataReady;
      let ne = I(_, Ee);
      Le(i.TEXTURE_CUBE_MAP, _);
      let V;
      if (Ge) {
        Pe && Ke && t.texStorage2D(i.TEXTURE_CUBE_MAP, ne, Oe, Ee.width, Ee.height);
        for (let K = 0; K < 6; K++) {
          V = he[K].mipmaps;
          for (let le = 0; le < V.length; le++) {
            const ae = V[le];
            _.format !== 1023 ? Te !== null ? Pe ? P && t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, le, 0, 0, ae.width, ae.height, Te, ae.data) : t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, le, Oe, ae.width, ae.height, 0, ae.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : Pe ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, le, 0, 0, ae.width, ae.height, Te, de, ae.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, le, Oe, ae.width, ae.height, 0, Te, de, ae.data);
          }
        }
      } else {
        if (V = _.mipmaps, Pe && Ke) {
          V.length > 0 && ne++;
          const K = Me(he[0]);
          t.texStorage2D(i.TEXTURE_CUBE_MAP, ne, Oe, K.width, K.height);
        }
        for (let K = 0; K < 6; K++)
          if (j) {
            Pe ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, 0, 0, he[K].width, he[K].height, Te, de, he[K].data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, Oe, he[K].width, he[K].height, 0, Te, de, he[K].data);
            for (let le = 0; le < V.length; le++) {
              const Re = V[le].image[K].image;
              Pe ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, le + 1, 0, 0, Re.width, Re.height, Te, de, Re.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, le + 1, Oe, Re.width, Re.height, 0, Te, de, Re.data);
            }
          } else {
            Pe ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, 0, 0, Te, de, he[K]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, Oe, Te, de, he[K]);
            for (let le = 0; le < V.length; le++) {
              const ae = V[le];
              Pe ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, le + 1, 0, 0, Te, de, ae.image[K]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, le + 1, Oe, Te, de, ae.image[K]);
            }
          }
      }
      p(_) && u(i.TEXTURE_CUBE_MAP), X.__version = $.version, _.onUpdate && _.onUpdate(_);
    }
    T.__version = _.version;
  }
  function _e(T, _, N, Y, $, X) {
    const ge = s.convert(N.format, N.colorSpace), se = s.convert(N.type), ue = y(N.internalFormat, ge, se, N.colorSpace), Ge = n.get(_), j = n.get(N);
    if (j.__renderTarget = _, !Ge.__hasExternalTextures) {
      const he = Math.max(1, _.width >> X), Ee = Math.max(1, _.height >> X);
      $ === i.TEXTURE_3D || $ === i.TEXTURE_2D_ARRAY ? t.texImage3D($, X, ue, he, Ee, _.depth, 0, ge, se, null) : t.texImage2D($, X, ue, he, Ee, 0, ge, se, null);
    }
    t.bindFramebuffer(i.FRAMEBUFFER, T), Ne(_) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, Y, $, j.__webglTexture, 0, Fe(_)) : ($ === i.TEXTURE_2D || $ >= i.TEXTURE_CUBE_MAP_POSITIVE_X && $ <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, Y, $, j.__webglTexture, X), t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function re(T, _, N) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, T), _.depthBuffer) {
      const Y = _.depthTexture, $ = Y && Y.isDepthTexture ? Y.type : null, X = v(_.stencilBuffer, $), ge = _.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, se = Fe(_);
      Ne(_) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, se, X, _.width, _.height) : N ? i.renderbufferStorageMultisample(i.RENDERBUFFER, se, X, _.width, _.height) : i.renderbufferStorage(i.RENDERBUFFER, X, _.width, _.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, ge, i.RENDERBUFFER, T);
    } else {
      const Y = _.textures;
      for (let $ = 0; $ < Y.length; $++) {
        const X = Y[$], ge = s.convert(X.format, X.colorSpace), se = s.convert(X.type), ue = y(X.internalFormat, ge, se, X.colorSpace), Ge = Fe(_);
        N && Ne(_) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, Ge, ue, _.width, _.height) : Ne(_) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, Ge, ue, _.width, _.height) : i.renderbufferStorage(i.RENDERBUFFER, ue, _.width, _.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function ye(T, _) {
    if (_ && _.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (t.bindFramebuffer(i.FRAMEBUFFER, T), !(_.depthTexture && _.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    const Y = n.get(_.depthTexture);
    Y.__renderTarget = _, (!Y.__webglTexture || _.depthTexture.image.width !== _.width || _.depthTexture.image.height !== _.height) && (_.depthTexture.image.width = _.width, _.depthTexture.image.height = _.height, _.depthTexture.needsUpdate = !0), Z(_.depthTexture, 0);
    const $ = Y.__webglTexture, X = Fe(_);
    if (_.depthTexture.format === 1026)
      Ne(_) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, $, 0, X) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, $, 0);
    else if (_.depthTexture.format === 1027)
      Ne(_) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, $, 0, X) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, $, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function be(T) {
    const _ = n.get(T), N = T.isWebGLCubeRenderTarget === !0;
    if (_.__boundDepthTexture !== T.depthTexture) {
      const Y = T.depthTexture;
      if (_.__depthDisposeCallback && _.__depthDisposeCallback(), Y) {
        const $ = () => {
          delete _.__boundDepthTexture, delete _.__depthDisposeCallback, Y.removeEventListener("dispose", $);
        };
        Y.addEventListener("dispose", $), _.__depthDisposeCallback = $;
      }
      _.__boundDepthTexture = Y;
    }
    if (T.depthTexture && !_.__autoAllocateDepthBuffer) {
      if (N) throw new Error("target.depthTexture not supported in Cube render targets");
      ye(_.__webglFramebuffer, T);
    } else if (N) {
      _.__webglDepthbuffer = [];
      for (let Y = 0; Y < 6; Y++)
        if (t.bindFramebuffer(i.FRAMEBUFFER, _.__webglFramebuffer[Y]), _.__webglDepthbuffer[Y] === void 0)
          _.__webglDepthbuffer[Y] = i.createRenderbuffer(), re(_.__webglDepthbuffer[Y], T, !1);
        else {
          const $ = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, X = _.__webglDepthbuffer[Y];
          i.bindRenderbuffer(i.RENDERBUFFER, X), i.framebufferRenderbuffer(i.FRAMEBUFFER, $, i.RENDERBUFFER, X);
        }
    } else if (t.bindFramebuffer(i.FRAMEBUFFER, _.__webglFramebuffer), _.__webglDepthbuffer === void 0)
      _.__webglDepthbuffer = i.createRenderbuffer(), re(_.__webglDepthbuffer, T, !1);
    else {
      const Y = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, $ = _.__webglDepthbuffer;
      i.bindRenderbuffer(i.RENDERBUFFER, $), i.framebufferRenderbuffer(i.FRAMEBUFFER, Y, i.RENDERBUFFER, $);
    }
    t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function Ue(T, _, N) {
    const Y = n.get(T);
    _ !== void 0 && _e(Y.__webglFramebuffer, T, T.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), N !== void 0 && be(T);
  }
  function Qe(T) {
    const _ = T.texture, N = n.get(T), Y = n.get(_);
    T.addEventListener("dispose", R);
    const $ = T.textures, X = T.isWebGLCubeRenderTarget === !0, ge = $.length > 1;
    if (ge || (Y.__webglTexture === void 0 && (Y.__webglTexture = i.createTexture()), Y.__version = _.version, a.memory.textures++), X) {
      N.__webglFramebuffer = [];
      for (let se = 0; se < 6; se++)
        if (_.mipmaps && _.mipmaps.length > 0) {
          N.__webglFramebuffer[se] = [];
          for (let ue = 0; ue < _.mipmaps.length; ue++)
            N.__webglFramebuffer[se][ue] = i.createFramebuffer();
        } else
          N.__webglFramebuffer[se] = i.createFramebuffer();
    } else {
      if (_.mipmaps && _.mipmaps.length > 0) {
        N.__webglFramebuffer = [];
        for (let se = 0; se < _.mipmaps.length; se++)
          N.__webglFramebuffer[se] = i.createFramebuffer();
      } else
        N.__webglFramebuffer = i.createFramebuffer();
      if (ge)
        for (let se = 0, ue = $.length; se < ue; se++) {
          const Ge = n.get($[se]);
          Ge.__webglTexture === void 0 && (Ge.__webglTexture = i.createTexture(), a.memory.textures++);
        }
      if (T.samples > 0 && Ne(T) === !1) {
        N.__webglMultisampledFramebuffer = i.createFramebuffer(), N.__webglColorRenderbuffer = [], t.bindFramebuffer(i.FRAMEBUFFER, N.__webglMultisampledFramebuffer);
        for (let se = 0; se < $.length; se++) {
          const ue = $[se];
          N.__webglColorRenderbuffer[se] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, N.__webglColorRenderbuffer[se]);
          const Ge = s.convert(ue.format, ue.colorSpace), j = s.convert(ue.type), he = y(ue.internalFormat, Ge, j, ue.colorSpace, T.isXRRenderTarget === !0), Ee = Fe(T);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, Ee, he, T.width, T.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + se, i.RENDERBUFFER, N.__webglColorRenderbuffer[se]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), T.depthBuffer && (N.__webglDepthRenderbuffer = i.createRenderbuffer(), re(N.__webglDepthRenderbuffer, T, !0)), t.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if (X) {
      t.bindTexture(i.TEXTURE_CUBE_MAP, Y.__webglTexture), Le(i.TEXTURE_CUBE_MAP, _);
      for (let se = 0; se < 6; se++)
        if (_.mipmaps && _.mipmaps.length > 0)
          for (let ue = 0; ue < _.mipmaps.length; ue++)
            _e(N.__webglFramebuffer[se][ue], T, _, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + se, ue);
        else
          _e(N.__webglFramebuffer[se], T, _, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + se, 0);
      p(_) && u(i.TEXTURE_CUBE_MAP), t.unbindTexture();
    } else if (ge) {
      for (let se = 0, ue = $.length; se < ue; se++) {
        const Ge = $[se], j = n.get(Ge);
        t.bindTexture(i.TEXTURE_2D, j.__webglTexture), Le(i.TEXTURE_2D, Ge), _e(N.__webglFramebuffer, T, Ge, i.COLOR_ATTACHMENT0 + se, i.TEXTURE_2D, 0), p(Ge) && u(i.TEXTURE_2D);
      }
      t.unbindTexture();
    } else {
      let se = i.TEXTURE_2D;
      if ((T.isWebGL3DRenderTarget || T.isWebGLArrayRenderTarget) && (se = T.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), t.bindTexture(se, Y.__webglTexture), Le(se, _), _.mipmaps && _.mipmaps.length > 0)
        for (let ue = 0; ue < _.mipmaps.length; ue++)
          _e(N.__webglFramebuffer[ue], T, _, i.COLOR_ATTACHMENT0, se, ue);
      else
        _e(N.__webglFramebuffer, T, _, i.COLOR_ATTACHMENT0, se, 0);
      p(_) && u(se), t.unbindTexture();
    }
    T.depthBuffer && be(T);
  }
  function Be(T) {
    const _ = T.textures;
    for (let N = 0, Y = _.length; N < Y; N++) {
      const $ = _[N];
      if (p($)) {
        const X = A(T), ge = n.get($).__webglTexture;
        t.bindTexture(X, ge), u(X), t.unbindTexture();
      }
    }
  }
  const it = [], U = [];
  function yt(T) {
    if (T.samples > 0) {
      if (Ne(T) === !1) {
        const _ = T.textures, N = T.width, Y = T.height;
        let $ = i.COLOR_BUFFER_BIT;
        const X = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ge = n.get(T), se = _.length > 1;
        if (se)
          for (let ue = 0; ue < _.length; ue++)
            t.bindFramebuffer(i.FRAMEBUFFER, ge.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ue, i.RENDERBUFFER, null), t.bindFramebuffer(i.FRAMEBUFFER, ge.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ue, i.TEXTURE_2D, null, 0);
        t.bindFramebuffer(i.READ_FRAMEBUFFER, ge.__webglMultisampledFramebuffer), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, ge.__webglFramebuffer);
        for (let ue = 0; ue < _.length; ue++) {
          if (T.resolveDepthBuffer && (T.depthBuffer && ($ |= i.DEPTH_BUFFER_BIT), T.stencilBuffer && T.resolveStencilBuffer && ($ |= i.STENCIL_BUFFER_BIT)), se) {
            i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, ge.__webglColorRenderbuffer[ue]);
            const Ge = n.get(_[ue]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, Ge, 0);
          }
          i.blitFramebuffer(0, 0, N, Y, 0, 0, N, Y, $, i.NEAREST), l === !0 && (it.length = 0, U.length = 0, it.push(i.COLOR_ATTACHMENT0 + ue), T.depthBuffer && T.resolveDepthBuffer === !1 && (it.push(X), U.push(X), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, U)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, it));
        }
        if (t.bindFramebuffer(i.READ_FRAMEBUFFER, null), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), se)
          for (let ue = 0; ue < _.length; ue++) {
            t.bindFramebuffer(i.FRAMEBUFFER, ge.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ue, i.RENDERBUFFER, ge.__webglColorRenderbuffer[ue]);
            const Ge = n.get(_[ue]).__webglTexture;
            t.bindFramebuffer(i.FRAMEBUFFER, ge.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ue, i.TEXTURE_2D, Ge, 0);
          }
        t.bindFramebuffer(i.DRAW_FRAMEBUFFER, ge.__webglMultisampledFramebuffer);
      } else if (T.depthBuffer && T.resolveDepthBuffer === !1 && l) {
        const _ = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [_]);
      }
    }
  }
  function Fe(T) {
    return Math.min(r.maxSamples, T.samples);
  }
  function Ne(T) {
    const _ = n.get(T);
    return T.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && _.__useRenderToTexture !== !1;
  }
  function Se(T) {
    const _ = a.render.frame;
    h.get(T) !== _ && (h.set(T, _), T.update());
  }
  function $e(T, _) {
    const N = T.colorSpace, Y = T.format, $ = T.type;
    return T.isCompressedTexture === !0 || T.isVideoTexture === !0 || N !== Pn && N !== "" && (ze.getTransfer(N) === qe ? (Y !== 1023 || $ !== 1009) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", N)), _;
  }
  function Me(T) {
    return typeof HTMLImageElement < "u" && T instanceof HTMLImageElement ? (c.width = T.naturalWidth || T.width, c.height = T.naturalHeight || T.height) : typeof VideoFrame < "u" && T instanceof VideoFrame ? (c.width = T.displayWidth, c.height = T.displayHeight) : (c.width = T.width, c.height = T.height), c;
  }
  this.allocateTextureUnit = O, this.resetTextureUnits = z, this.setTexture2D = Z, this.setTexture2DArray = W, this.setTexture3D = Q, this.setTextureCube = H, this.rebindTextures = Ue, this.setupRenderTarget = Qe, this.updateRenderTargetMipmap = Be, this.updateMultisampleRenderTarget = yt, this.setupDepthRenderbuffer = be, this.setupFrameBufferTexture = _e, this.useMultisampledRTT = Ne;
}
function Wu(i, e) {
  function t(n, r = "") {
    let s;
    const a = ze.getTransfer(r);
    if (n === 1009) return i.UNSIGNED_BYTE;
    if (n === 1017) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === 1018) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === 35902) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === 1010) return i.BYTE;
    if (n === 1011) return i.SHORT;
    if (n === 1012) return i.UNSIGNED_SHORT;
    if (n === 1013) return i.INT;
    if (n === 1014) return i.UNSIGNED_INT;
    if (n === 1015) return i.FLOAT;
    if (n === 1016) return i.HALF_FLOAT;
    if (n === 1021) return i.ALPHA;
    if (n === 1022) return i.RGB;
    if (n === 1023) return i.RGBA;
    if (n === 1024) return i.LUMINANCE;
    if (n === 1025) return i.LUMINANCE_ALPHA;
    if (n === 1026) return i.DEPTH_COMPONENT;
    if (n === 1027) return i.DEPTH_STENCIL;
    if (n === 1028) return i.RED;
    if (n === 1029) return i.RED_INTEGER;
    if (n === 1030) return i.RG;
    if (n === 1031) return i.RG_INTEGER;
    if (n === 1033) return i.RGBA_INTEGER;
    if (n === 33776 || n === 33777 || n === 33778 || n === 33779)
      if (a === qe)
        if (s = e.get("WEBGL_compressed_texture_s3tc_srgb"), s !== null) {
          if (n === 33776) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (n === 33777) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (n === 33778) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (n === 33779) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (s = e.get("WEBGL_compressed_texture_s3tc"), s !== null) {
        if (n === 33776) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === 33777) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === 33778) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === 33779) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (n === 35840 || n === 35841 || n === 35842 || n === 35843)
      if (s = e.get("WEBGL_compressed_texture_pvrtc"), s !== null) {
        if (n === 35840) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === 35841) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === 35842) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === 35843) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (n === 36196 || n === 37492 || n === 37496)
      if (s = e.get("WEBGL_compressed_texture_etc"), s !== null) {
        if (n === 36196 || n === 37492) return a === qe ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
        if (n === 37496) return a === qe ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (n === 37808 || n === 37809 || n === 37810 || n === 37811 || n === 37812 || n === 37813 || n === 37814 || n === 37815 || n === 37816 || n === 37817 || n === 37818 || n === 37819 || n === 37820 || n === 37821)
      if (s = e.get("WEBGL_compressed_texture_astc"), s !== null) {
        if (n === 37808) return a === qe ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === 37809) return a === qe ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === 37810) return a === qe ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === 37811) return a === qe ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === 37812) return a === qe ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === 37813) return a === qe ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === 37814) return a === qe ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === 37815) return a === qe ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === 37816) return a === qe ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === 37817) return a === qe ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === 37818) return a === qe ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === 37819) return a === qe ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === 37820) return a === qe ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === 37821) return a === qe ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (n === 36492 || n === 36494 || n === 36495)
      if (s = e.get("EXT_texture_compression_bptc"), s !== null) {
        if (n === 36492) return a === qe ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === 36494) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === 36495) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (n === 36283 || n === 36284 || n === 36285 || n === 36286)
      if (s = e.get("EXT_texture_compression_rgtc"), s !== null) {
        if (n === 36492) return s.COMPRESSED_RED_RGTC1_EXT;
        if (n === 36284) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === 36285) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === 36286) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return n === 1020 ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: t };
}
class Xu extends bt {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.cameras = e;
  }
}
class _i extends ht {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const qu = { type: "move" };
class ji {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new _i(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new _i(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new F(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new F()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new _i(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new F(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new F()), this._grip;
  }
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t)
        for (const n of e.hand.values())
          this._getHandJoint(t, n);
    }
    return this.dispatchEvent({ type: "connected", data: e }), this;
  }
  disconnect(e) {
    return this.dispatchEvent({ type: "disconnected", data: e }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(e, t, n) {
    let r = null, s = null, a = null;
    const o = this._targetRay, l = this._grip, c = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (c && e.hand) {
        a = !0;
        for (const E of e.hand.values()) {
          const p = t.getJointPose(E, n), u = this._getHandJoint(c, E);
          p !== null && (u.matrix.fromArray(p.transform.matrix), u.matrix.decompose(u.position, u.rotation, u.scale), u.matrixWorldNeedsUpdate = !0, u.jointRadius = p.radius), u.visible = p !== null;
        }
        const h = c.joints["index-finger-tip"], d = c.joints["thumb-tip"], f = h.position.distanceTo(d.position), m = 0.02, M = 5e-3;
        c.inputState.pinching && f > m + M ? (c.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !c.inputState.pinching && f <= m - M && (c.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else
        l !== null && e.gripSpace && (s = t.getPose(e.gripSpace, n), s !== null && (l.matrix.fromArray(s.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(s.linearVelocity)) : l.hasLinearVelocity = !1, s.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(s.angularVelocity)) : l.hasAngularVelocity = !1));
      o !== null && (r = t.getPose(e.targetRaySpace, n), r === null && s !== null && (r = s), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(qu)));
    }
    return o !== null && (o.visible = r !== null), l !== null && (l.visible = s !== null), c !== null && (c.visible = a !== null), this;
  }
  // private method
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const n = new _i();
      n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
    }
    return e.joints[t.jointName];
  }
}
const Yu = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, Ku = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class Zu {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(e, t, n) {
    if (this.texture === null) {
      const r = new pt(), s = e.properties.get(r);
      s.__webglTexture = t.texture, (t.depthNear != n.depthNear || t.depthFar != n.depthFar) && (this.depthNear = t.depthNear, this.depthFar = t.depthFar), this.texture = r;
    }
  }
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const t = e.cameras[0].viewport, n = new en({
        vertexShader: Yu,
        fragmentShader: Ku,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: t.z },
          depthHeight: { value: t.w }
        }
      });
      this.mesh = new Et(new Mi(20, 20), n);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}
class $u extends Dn {
  constructor(e, t) {
    super();
    const n = this;
    let r = null, s = 1, a = null, o = "local-floor", l = 1, c = null, h = null, d = null, f = null, m = null, M = null;
    const E = new Zu(), p = t.getContextAttributes();
    let u = null, A = null;
    const y = [], v = [], I = new Ie();
    let b = null;
    const R = new bt();
    R.viewport = new tt();
    const C = new bt();
    C.viewport = new tt();
    const S = [R, C], g = new Xu();
    let w = null, z = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(q) {
      let ee = y[q];
      return ee === void 0 && (ee = new ji(), y[q] = ee), ee.getTargetRaySpace();
    }, this.getControllerGrip = function(q) {
      let ee = y[q];
      return ee === void 0 && (ee = new ji(), y[q] = ee), ee.getGripSpace();
    }, this.getHand = function(q) {
      let ee = y[q];
      return ee === void 0 && (ee = new ji(), y[q] = ee), ee.getHandSpace();
    };
    function O(q) {
      const ee = v.indexOf(q.inputSource);
      if (ee === -1)
        return;
      const _e = y[ee];
      _e !== void 0 && (_e.update(q.inputSource, q.frame, c || a), _e.dispatchEvent({ type: q.type, data: q.inputSource }));
    }
    function k() {
      r.removeEventListener("select", O), r.removeEventListener("selectstart", O), r.removeEventListener("selectend", O), r.removeEventListener("squeeze", O), r.removeEventListener("squeezestart", O), r.removeEventListener("squeezeend", O), r.removeEventListener("end", k), r.removeEventListener("inputsourceschange", Z);
      for (let q = 0; q < y.length; q++) {
        const ee = v[q];
        ee !== null && (v[q] = null, y[q].disconnect(ee));
      }
      w = null, z = null, E.reset(), e.setRenderTarget(u), m = null, f = null, d = null, r = null, A = null, Ye.stop(), n.isPresenting = !1, e.setPixelRatio(b), e.setSize(I.width, I.height, !1), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(q) {
      s = q, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(q) {
      o = q, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || a;
    }, this.setReferenceSpace = function(q) {
      c = q;
    }, this.getBaseLayer = function() {
      return f !== null ? f : m;
    }, this.getBinding = function() {
      return d;
    }, this.getFrame = function() {
      return M;
    }, this.getSession = function() {
      return r;
    }, this.setSession = async function(q) {
      if (r = q, r !== null) {
        if (u = e.getRenderTarget(), r.addEventListener("select", O), r.addEventListener("selectstart", O), r.addEventListener("selectend", O), r.addEventListener("squeeze", O), r.addEventListener("squeezestart", O), r.addEventListener("squeezeend", O), r.addEventListener("end", k), r.addEventListener("inputsourceschange", Z), p.xrCompatible !== !0 && await t.makeXRCompatible(), b = e.getPixelRatio(), e.getSize(I), r.renderState.layers === void 0) {
          const ee = {
            antialias: p.antialias,
            alpha: !0,
            depth: p.depth,
            stencil: p.stencil,
            framebufferScaleFactor: s
          };
          m = new XRWebGLLayer(r, t, ee), r.updateRenderState({ baseLayer: m }), e.setPixelRatio(1), e.setSize(m.framebufferWidth, m.framebufferHeight, !1), A = new dn(
            m.framebufferWidth,
            m.framebufferHeight,
            {
              format: 1023,
              type: 1009,
              colorSpace: e.outputColorSpace,
              stencilBuffer: p.stencil
            }
          );
        } else {
          let ee = null, _e = null, re = null;
          p.depth && (re = p.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, ee = p.stencil ? 1027 : 1026, _e = p.stencil ? 1020 : 1014);
          const ye = {
            colorFormat: t.RGBA8,
            depthFormat: re,
            scaleFactor: s
          };
          d = new XRWebGLBinding(r, t), f = d.createProjectionLayer(ye), r.updateRenderState({ layers: [f] }), e.setPixelRatio(1), e.setSize(f.textureWidth, f.textureHeight, !1), A = new dn(
            f.textureWidth,
            f.textureHeight,
            {
              format: 1023,
              type: 1009,
              depthTexture: new Ps(f.textureWidth, f.textureHeight, _e, void 0, void 0, void 0, void 0, void 0, void 0, ee),
              stencilBuffer: p.stencil,
              colorSpace: e.outputColorSpace,
              samples: p.antialias ? 4 : 0,
              resolveDepthBuffer: f.ignoreDepthValues === !1
            }
          );
        }
        A.isXRRenderTarget = !0, this.setFoveation(l), c = null, a = await r.requestReferenceSpace(o), Ye.setContext(r), Ye.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (r !== null)
        return r.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return E.getDepthTexture();
    };
    function Z(q) {
      for (let ee = 0; ee < q.removed.length; ee++) {
        const _e = q.removed[ee], re = v.indexOf(_e);
        re >= 0 && (v[re] = null, y[re].disconnect(_e));
      }
      for (let ee = 0; ee < q.added.length; ee++) {
        const _e = q.added[ee];
        let re = v.indexOf(_e);
        if (re === -1) {
          for (let be = 0; be < y.length; be++)
            if (be >= v.length) {
              v.push(_e), re = be;
              break;
            } else if (v[be] === null) {
              v[be] = _e, re = be;
              break;
            }
          if (re === -1) break;
        }
        const ye = y[re];
        ye && ye.connect(_e);
      }
    }
    const W = new F(), Q = new F();
    function H(q, ee, _e) {
      W.setFromMatrixPosition(ee.matrixWorld), Q.setFromMatrixPosition(_e.matrixWorld);
      const re = W.distanceTo(Q), ye = ee.projectionMatrix.elements, be = _e.projectionMatrix.elements, Ue = ye[14] / (ye[10] - 1), Qe = ye[14] / (ye[10] + 1), Be = (ye[9] + 1) / ye[5], it = (ye[9] - 1) / ye[5], U = (ye[8] - 1) / ye[0], yt = (be[8] + 1) / be[0], Fe = Ue * U, Ne = Ue * yt, Se = re / (-U + yt), $e = Se * -U;
      if (ee.matrixWorld.decompose(q.position, q.quaternion, q.scale), q.translateX($e), q.translateZ(Se), q.matrixWorld.compose(q.position, q.quaternion, q.scale), q.matrixWorldInverse.copy(q.matrixWorld).invert(), ye[10] === -1)
        q.projectionMatrix.copy(ee.projectionMatrix), q.projectionMatrixInverse.copy(ee.projectionMatrixInverse);
      else {
        const Me = Ue + Se, T = Qe + Se, _ = Fe - $e, N = Ne + (re - $e), Y = Be * Qe / T * Me, $ = it * Qe / T * Me;
        q.projectionMatrix.makePerspective(_, N, Y, $, Me, T), q.projectionMatrixInverse.copy(q.projectionMatrix).invert();
      }
    }
    function ie(q, ee) {
      ee === null ? q.matrixWorld.copy(q.matrix) : q.matrixWorld.multiplyMatrices(ee.matrixWorld, q.matrix), q.matrixWorldInverse.copy(q.matrixWorld).invert();
    }
    this.updateCamera = function(q) {
      if (r === null) return;
      let ee = q.near, _e = q.far;
      E.texture !== null && (E.depthNear > 0 && (ee = E.depthNear), E.depthFar > 0 && (_e = E.depthFar)), g.near = C.near = R.near = ee, g.far = C.far = R.far = _e, (w !== g.near || z !== g.far) && (r.updateRenderState({
        depthNear: g.near,
        depthFar: g.far
      }), w = g.near, z = g.far), R.layers.mask = q.layers.mask | 2, C.layers.mask = q.layers.mask | 4, g.layers.mask = R.layers.mask | C.layers.mask;
      const re = q.parent, ye = g.cameras;
      ie(g, re);
      for (let be = 0; be < ye.length; be++)
        ie(ye[be], re);
      ye.length === 2 ? H(g, R, C) : g.projectionMatrix.copy(R.projectionMatrix), ce(q, g, re);
    };
    function ce(q, ee, _e) {
      _e === null ? q.matrix.copy(ee.matrixWorld) : (q.matrix.copy(_e.matrixWorld), q.matrix.invert(), q.matrix.multiply(ee.matrixWorld)), q.matrix.decompose(q.position, q.quaternion, q.scale), q.updateMatrixWorld(!0), q.projectionMatrix.copy(ee.projectionMatrix), q.projectionMatrixInverse.copy(ee.projectionMatrixInverse), q.isPerspectiveCamera && (q.fov = Qi * 2 * Math.atan(1 / q.projectionMatrix.elements[5]), q.zoom = 1);
    }
    this.getCamera = function() {
      return g;
    }, this.getFoveation = function() {
      if (!(f === null && m === null))
        return l;
    }, this.setFoveation = function(q) {
      l = q, f !== null && (f.fixedFoveation = q), m !== null && m.fixedFoveation !== void 0 && (m.fixedFoveation = q);
    }, this.hasDepthSensing = function() {
      return E.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return E.getMesh(g);
    };
    let xe = null;
    function Le(q, ee) {
      if (h = ee.getViewerPose(c || a), M = ee, h !== null) {
        const _e = h.views;
        m !== null && (e.setRenderTargetFramebuffer(A, m.framebuffer), e.setRenderTarget(A));
        let re = !1;
        _e.length !== g.cameras.length && (g.cameras.length = 0, re = !0);
        for (let be = 0; be < _e.length; be++) {
          const Ue = _e[be];
          let Qe = null;
          if (m !== null)
            Qe = m.getViewport(Ue);
          else {
            const it = d.getViewSubImage(f, Ue);
            Qe = it.viewport, be === 0 && (e.setRenderTargetTextures(
              A,
              it.colorTexture,
              f.ignoreDepthValues ? void 0 : it.depthStencilTexture
            ), e.setRenderTarget(A));
          }
          let Be = S[be];
          Be === void 0 && (Be = new bt(), Be.layers.enable(be), Be.viewport = new tt(), S[be] = Be), Be.matrix.fromArray(Ue.transform.matrix), Be.matrix.decompose(Be.position, Be.quaternion, Be.scale), Be.projectionMatrix.fromArray(Ue.projectionMatrix), Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(), Be.viewport.set(Qe.x, Qe.y, Qe.width, Qe.height), be === 0 && (g.matrix.copy(Be.matrix), g.matrix.decompose(g.position, g.quaternion, g.scale)), re === !0 && g.cameras.push(Be);
        }
        const ye = r.enabledFeatures;
        if (ye && ye.includes("depth-sensing")) {
          const be = d.getDepthInformation(_e[0]);
          be && be.isValid && be.texture && E.init(e, be, r.renderState);
        }
      }
      for (let _e = 0; _e < y.length; _e++) {
        const re = v[_e], ye = y[_e];
        re !== null && ye !== void 0 && ye.update(re, ee, c || a);
      }
      xe && xe(q, ee), ee.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: ee }), M = null;
    }
    const Ye = new ws();
    Ye.setAnimationLoop(Le), this.setAnimationLoop = function(q) {
      xe = q;
    }, this.dispose = function() {
    };
  }
}
const ln = /* @__PURE__ */ new Nt(), ju = /* @__PURE__ */ new nt();
function Ju(i, e) {
  function t(p, u) {
    p.matrixAutoUpdate === !0 && p.updateMatrix(), u.value.copy(p.matrix);
  }
  function n(p, u) {
    u.color.getRGB(p.fogColor.value, As(i)), u.isFog ? (p.fogNear.value = u.near, p.fogFar.value = u.far) : u.isFogExp2 && (p.fogDensity.value = u.density);
  }
  function r(p, u, A, y, v) {
    u.isMeshBasicMaterial || u.isMeshLambertMaterial ? s(p, u) : u.isMeshToonMaterial ? (s(p, u), d(p, u)) : u.isMeshPhongMaterial ? (s(p, u), h(p, u)) : u.isMeshStandardMaterial ? (s(p, u), f(p, u), u.isMeshPhysicalMaterial && m(p, u, v)) : u.isMeshMatcapMaterial ? (s(p, u), M(p, u)) : u.isMeshDepthMaterial ? s(p, u) : u.isMeshDistanceMaterial ? (s(p, u), E(p, u)) : u.isMeshNormalMaterial ? s(p, u) : u.isLineBasicMaterial ? (a(p, u), u.isLineDashedMaterial && o(p, u)) : u.isPointsMaterial ? l(p, u, A, y) : u.isSpriteMaterial ? c(p, u) : u.isShadowMaterial ? (p.color.value.copy(u.color), p.opacity.value = u.opacity) : u.isShaderMaterial && (u.uniformsNeedUpdate = !1);
  }
  function s(p, u) {
    p.opacity.value = u.opacity, u.color && p.diffuse.value.copy(u.color), u.emissive && p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity), u.map && (p.map.value = u.map, t(u.map, p.mapTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, t(u.alphaMap, p.alphaMapTransform)), u.bumpMap && (p.bumpMap.value = u.bumpMap, t(u.bumpMap, p.bumpMapTransform), p.bumpScale.value = u.bumpScale, u.side === 1 && (p.bumpScale.value *= -1)), u.normalMap && (p.normalMap.value = u.normalMap, t(u.normalMap, p.normalMapTransform), p.normalScale.value.copy(u.normalScale), u.side === 1 && p.normalScale.value.negate()), u.displacementMap && (p.displacementMap.value = u.displacementMap, t(u.displacementMap, p.displacementMapTransform), p.displacementScale.value = u.displacementScale, p.displacementBias.value = u.displacementBias), u.emissiveMap && (p.emissiveMap.value = u.emissiveMap, t(u.emissiveMap, p.emissiveMapTransform)), u.specularMap && (p.specularMap.value = u.specularMap, t(u.specularMap, p.specularMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
    const A = e.get(u), y = A.envMap, v = A.envMapRotation;
    y && (p.envMap.value = y, ln.copy(v), ln.x *= -1, ln.y *= -1, ln.z *= -1, y.isCubeTexture && y.isRenderTargetTexture === !1 && (ln.y *= -1, ln.z *= -1), p.envMapRotation.value.setFromMatrix4(ju.makeRotationFromEuler(ln)), p.flipEnvMap.value = y.isCubeTexture && y.isRenderTargetTexture === !1 ? -1 : 1, p.reflectivity.value = u.reflectivity, p.ior.value = u.ior, p.refractionRatio.value = u.refractionRatio), u.lightMap && (p.lightMap.value = u.lightMap, p.lightMapIntensity.value = u.lightMapIntensity, t(u.lightMap, p.lightMapTransform)), u.aoMap && (p.aoMap.value = u.aoMap, p.aoMapIntensity.value = u.aoMapIntensity, t(u.aoMap, p.aoMapTransform));
  }
  function a(p, u) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, u.map && (p.map.value = u.map, t(u.map, p.mapTransform));
  }
  function o(p, u) {
    p.dashSize.value = u.dashSize, p.totalSize.value = u.dashSize + u.gapSize, p.scale.value = u.scale;
  }
  function l(p, u, A, y) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, p.size.value = u.size * A, p.scale.value = y * 0.5, u.map && (p.map.value = u.map, t(u.map, p.uvTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, t(u.alphaMap, p.alphaMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
  }
  function c(p, u) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, p.rotation.value = u.rotation, u.map && (p.map.value = u.map, t(u.map, p.mapTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, t(u.alphaMap, p.alphaMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
  }
  function h(p, u) {
    p.specular.value.copy(u.specular), p.shininess.value = Math.max(u.shininess, 1e-4);
  }
  function d(p, u) {
    u.gradientMap && (p.gradientMap.value = u.gradientMap);
  }
  function f(p, u) {
    p.metalness.value = u.metalness, u.metalnessMap && (p.metalnessMap.value = u.metalnessMap, t(u.metalnessMap, p.metalnessMapTransform)), p.roughness.value = u.roughness, u.roughnessMap && (p.roughnessMap.value = u.roughnessMap, t(u.roughnessMap, p.roughnessMapTransform)), u.envMap && (p.envMapIntensity.value = u.envMapIntensity);
  }
  function m(p, u, A) {
    p.ior.value = u.ior, u.sheen > 0 && (p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen), p.sheenRoughness.value = u.sheenRoughness, u.sheenColorMap && (p.sheenColorMap.value = u.sheenColorMap, t(u.sheenColorMap, p.sheenColorMapTransform)), u.sheenRoughnessMap && (p.sheenRoughnessMap.value = u.sheenRoughnessMap, t(u.sheenRoughnessMap, p.sheenRoughnessMapTransform))), u.clearcoat > 0 && (p.clearcoat.value = u.clearcoat, p.clearcoatRoughness.value = u.clearcoatRoughness, u.clearcoatMap && (p.clearcoatMap.value = u.clearcoatMap, t(u.clearcoatMap, p.clearcoatMapTransform)), u.clearcoatRoughnessMap && (p.clearcoatRoughnessMap.value = u.clearcoatRoughnessMap, t(u.clearcoatRoughnessMap, p.clearcoatRoughnessMapTransform)), u.clearcoatNormalMap && (p.clearcoatNormalMap.value = u.clearcoatNormalMap, t(u.clearcoatNormalMap, p.clearcoatNormalMapTransform), p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale), u.side === 1 && p.clearcoatNormalScale.value.negate())), u.dispersion > 0 && (p.dispersion.value = u.dispersion), u.iridescence > 0 && (p.iridescence.value = u.iridescence, p.iridescenceIOR.value = u.iridescenceIOR, p.iridescenceThicknessMinimum.value = u.iridescenceThicknessRange[0], p.iridescenceThicknessMaximum.value = u.iridescenceThicknessRange[1], u.iridescenceMap && (p.iridescenceMap.value = u.iridescenceMap, t(u.iridescenceMap, p.iridescenceMapTransform)), u.iridescenceThicknessMap && (p.iridescenceThicknessMap.value = u.iridescenceThicknessMap, t(u.iridescenceThicknessMap, p.iridescenceThicknessMapTransform))), u.transmission > 0 && (p.transmission.value = u.transmission, p.transmissionSamplerMap.value = A.texture, p.transmissionSamplerSize.value.set(A.width, A.height), u.transmissionMap && (p.transmissionMap.value = u.transmissionMap, t(u.transmissionMap, p.transmissionMapTransform)), p.thickness.value = u.thickness, u.thicknessMap && (p.thicknessMap.value = u.thicknessMap, t(u.thicknessMap, p.thicknessMapTransform)), p.attenuationDistance.value = u.attenuationDistance, p.attenuationColor.value.copy(u.attenuationColor)), u.anisotropy > 0 && (p.anisotropyVector.value.set(u.anisotropy * Math.cos(u.anisotropyRotation), u.anisotropy * Math.sin(u.anisotropyRotation)), u.anisotropyMap && (p.anisotropyMap.value = u.anisotropyMap, t(u.anisotropyMap, p.anisotropyMapTransform))), p.specularIntensity.value = u.specularIntensity, p.specularColor.value.copy(u.specularColor), u.specularColorMap && (p.specularColorMap.value = u.specularColorMap, t(u.specularColorMap, p.specularColorMapTransform)), u.specularIntensityMap && (p.specularIntensityMap.value = u.specularIntensityMap, t(u.specularIntensityMap, p.specularIntensityMapTransform));
  }
  function M(p, u) {
    u.matcap && (p.matcap.value = u.matcap);
  }
  function E(p, u) {
    const A = e.get(u).light;
    p.referencePosition.value.setFromMatrixPosition(A.matrixWorld), p.nearDistance.value = A.shadow.camera.near, p.farDistance.value = A.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: r
  };
}
function Qu(i, e, t, n) {
  let r = {}, s = {}, a = [];
  const o = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(A, y) {
    const v = y.program;
    n.uniformBlockBinding(A, v);
  }
  function c(A, y) {
    let v = r[A.id];
    v === void 0 && (M(A), v = h(A), r[A.id] = v, A.addEventListener("dispose", p));
    const I = y.program;
    n.updateUBOMapping(A, I);
    const b = e.render.frame;
    s[A.id] !== b && (f(A), s[A.id] = b);
  }
  function h(A) {
    const y = d();
    A.__bindingPointIndex = y;
    const v = i.createBuffer(), I = A.__size, b = A.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, v), i.bufferData(i.UNIFORM_BUFFER, I, b), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, y, v), v;
  }
  function d() {
    for (let A = 0; A < o; A++)
      if (a.indexOf(A) === -1)
        return a.push(A), A;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function f(A) {
    const y = r[A.id], v = A.uniforms, I = A.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, y);
    for (let b = 0, R = v.length; b < R; b++) {
      const C = Array.isArray(v[b]) ? v[b] : [v[b]];
      for (let S = 0, g = C.length; S < g; S++) {
        const w = C[S];
        if (m(w, b, S, I) === !0) {
          const z = w.__offset, O = Array.isArray(w.value) ? w.value : [w.value];
          let k = 0;
          for (let Z = 0; Z < O.length; Z++) {
            const W = O[Z], Q = E(W);
            typeof W == "number" || typeof W == "boolean" ? (w.__data[0] = W, i.bufferSubData(i.UNIFORM_BUFFER, z + k, w.__data)) : W.isMatrix3 ? (w.__data[0] = W.elements[0], w.__data[1] = W.elements[1], w.__data[2] = W.elements[2], w.__data[3] = 0, w.__data[4] = W.elements[3], w.__data[5] = W.elements[4], w.__data[6] = W.elements[5], w.__data[7] = 0, w.__data[8] = W.elements[6], w.__data[9] = W.elements[7], w.__data[10] = W.elements[8], w.__data[11] = 0) : (W.toArray(w.__data, k), k += Q.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          i.bufferSubData(i.UNIFORM_BUFFER, z, w.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function m(A, y, v, I) {
    const b = A.value, R = y + "_" + v;
    if (I[R] === void 0)
      return typeof b == "number" || typeof b == "boolean" ? I[R] = b : I[R] = b.clone(), !0;
    {
      const C = I[R];
      if (typeof b == "number" || typeof b == "boolean") {
        if (C !== b)
          return I[R] = b, !0;
      } else if (C.equals(b) === !1)
        return C.copy(b), !0;
    }
    return !1;
  }
  function M(A) {
    const y = A.uniforms;
    let v = 0;
    const I = 16;
    for (let R = 0, C = y.length; R < C; R++) {
      const S = Array.isArray(y[R]) ? y[R] : [y[R]];
      for (let g = 0, w = S.length; g < w; g++) {
        const z = S[g], O = Array.isArray(z.value) ? z.value : [z.value];
        for (let k = 0, Z = O.length; k < Z; k++) {
          const W = O[k], Q = E(W), H = v % I, ie = H % Q.boundary, ce = H + ie;
          v += ie, ce !== 0 && I - ce < Q.storage && (v += I - ce), z.__data = new Float32Array(Q.storage / Float32Array.BYTES_PER_ELEMENT), z.__offset = v, v += Q.storage;
        }
      }
    }
    const b = v % I;
    return b > 0 && (v += I - b), A.__size = v, A.__cache = {}, this;
  }
  function E(A) {
    const y = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof A == "number" || typeof A == "boolean" ? (y.boundary = 4, y.storage = 4) : A.isVector2 ? (y.boundary = 8, y.storage = 8) : A.isVector3 || A.isColor ? (y.boundary = 16, y.storage = 12) : A.isVector4 ? (y.boundary = 16, y.storage = 16) : A.isMatrix3 ? (y.boundary = 48, y.storage = 48) : A.isMatrix4 ? (y.boundary = 64, y.storage = 64) : A.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", A), y;
  }
  function p(A) {
    const y = A.target;
    y.removeEventListener("dispose", p);
    const v = a.indexOf(y.__bindingPointIndex);
    a.splice(v, 1), i.deleteBuffer(r[y.id]), delete r[y.id], delete s[y.id];
  }
  function u() {
    for (const A in r)
      i.deleteBuffer(r[A]);
    a = [], r = {}, s = {};
  }
  return {
    bind: l,
    update: c,
    dispose: u
  };
}
class eh {
  constructor(e = {}) {
    const {
      canvas: t = zs(),
      context: n = null,
      depth: r = !0,
      stencil: s = !1,
      alpha: a = !1,
      antialias: o = !1,
      premultipliedAlpha: l = !0,
      preserveDrawingBuffer: c = !1,
      powerPreference: h = "default",
      failIfMajorPerformanceCaveat: d = !1,
      reverseDepthBuffer: f = !1
    } = e;
    this.isWebGLRenderer = !0;
    let m;
    if (n !== null) {
      if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext)
        throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      m = n.getContextAttributes().alpha;
    } else
      m = a;
    const M = new Uint32Array(4), E = new Int32Array(4);
    let p = null, u = null;
    const A = [], y = [];
    this.domElement = t, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = St, this.toneMapping = 0, this.toneMappingExposure = 1;
    const v = this;
    let I = !1, b = 0, R = 0, C = null, S = -1, g = null;
    const w = new tt(), z = new tt();
    let O = null;
    const k = new Ve(0);
    let Z = 0, W = t.width, Q = t.height, H = 1, ie = null, ce = null;
    const xe = new tt(0, 0, W, Q), Le = new tt(0, 0, W, Q);
    let Ye = !1;
    const q = new nr();
    let ee = !1, _e = !1;
    const re = new nt(), ye = new nt(), be = new F(), Ue = new tt(), Qe = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let Be = !1;
    function it() {
      return C === null ? H : 1;
    }
    let U = n;
    function yt(x, D) {
      return t.getContext(x, D);
    }
    try {
      const x = {
        alpha: !0,
        depth: r,
        stencil: s,
        antialias: o,
        premultipliedAlpha: l,
        preserveDrawingBuffer: c,
        powerPreference: h,
        failIfMajorPerformanceCaveat: d
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", "three.js r170"), t.addEventListener("webglcontextlost", K, !1), t.addEventListener("webglcontextrestored", le, !1), t.addEventListener("webglcontextcreationerror", ae, !1), U === null) {
        const D = "webgl2";
        if (U = yt(D, x), U === null)
          throw yt(D) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (x) {
      throw console.error("THREE.WebGLRenderer: " + x.message), x;
    }
    let Fe, Ne, Se, $e, Me, T, _, N, Y, $, X, ge, se, ue, Ge, j, he, Ee, Te, de, Oe, Pe, Ke, P;
    function ne() {
      Fe = new sc(U), Fe.init(), Pe = new Wu(U, Fe), Ne = new Ql(U, Fe, e, Pe), Se = new Vu(U, Fe), Ne.reverseDepthBuffer && f && Se.buffers.depth.setReversed(!0), $e = new lc(U), Me = new bu(), T = new ku(U, Fe, Se, Me, Ne, Pe, $e), _ = new tc(v), N = new rc(v), Y = new pa(U), Ke = new jl(U, Y), $ = new ac(U, Y, $e, Ke), X = new uc(U, $, Y, $e), Te = new cc(U, Ne, T), j = new ec(Me), ge = new Au(v, _, N, Fe, Ne, Ke, j), se = new Ju(v, Me), ue = new wu(), Ge = new Iu(Fe), Ee = new $l(v, _, N, Se, X, m, l), he = new Gu(v, X, Ne), P = new Qu(U, $e, Ne, Se), de = new Jl(U, Fe, $e), Oe = new oc(U, Fe, $e), $e.programs = ge.programs, v.capabilities = Ne, v.extensions = Fe, v.properties = Me, v.renderLists = ue, v.shadowMap = he, v.state = Se, v.info = $e;
    }
    ne();
    const V = new $u(v, U);
    this.xr = V, this.getContext = function() {
      return U;
    }, this.getContextAttributes = function() {
      return U.getContextAttributes();
    }, this.forceContextLoss = function() {
      const x = Fe.get("WEBGL_lose_context");
      x && x.loseContext();
    }, this.forceContextRestore = function() {
      const x = Fe.get("WEBGL_lose_context");
      x && x.restoreContext();
    }, this.getPixelRatio = function() {
      return H;
    }, this.setPixelRatio = function(x) {
      x !== void 0 && (H = x, this.setSize(W, Q, !1));
    }, this.getSize = function(x) {
      return x.set(W, Q);
    }, this.setSize = function(x, D, B = !0) {
      if (V.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      W = x, Q = D, t.width = Math.floor(x * H), t.height = Math.floor(D * H), B === !0 && (t.style.width = x + "px", t.style.height = D + "px"), this.setViewport(0, 0, x, D);
    }, this.getDrawingBufferSize = function(x) {
      return x.set(W * H, Q * H).floor();
    }, this.setDrawingBufferSize = function(x, D, B) {
      W = x, Q = D, H = B, t.width = Math.floor(x * B), t.height = Math.floor(D * B), this.setViewport(0, 0, x, D);
    }, this.getCurrentViewport = function(x) {
      return x.copy(w);
    }, this.getViewport = function(x) {
      return x.copy(xe);
    }, this.setViewport = function(x, D, B, G) {
      x.isVector4 ? xe.set(x.x, x.y, x.z, x.w) : xe.set(x, D, B, G), Se.viewport(w.copy(xe).multiplyScalar(H).round());
    }, this.getScissor = function(x) {
      return x.copy(Le);
    }, this.setScissor = function(x, D, B, G) {
      x.isVector4 ? Le.set(x.x, x.y, x.z, x.w) : Le.set(x, D, B, G), Se.scissor(z.copy(Le).multiplyScalar(H).round());
    }, this.getScissorTest = function() {
      return Ye;
    }, this.setScissorTest = function(x) {
      Se.setScissorTest(Ye = x);
    }, this.setOpaqueSort = function(x) {
      ie = x;
    }, this.setTransparentSort = function(x) {
      ce = x;
    }, this.getClearColor = function(x) {
      return x.copy(Ee.getClearColor());
    }, this.setClearColor = function() {
      Ee.setClearColor.apply(Ee, arguments);
    }, this.getClearAlpha = function() {
      return Ee.getClearAlpha();
    }, this.setClearAlpha = function() {
      Ee.setClearAlpha.apply(Ee, arguments);
    }, this.clear = function(x = !0, D = !0, B = !0) {
      let G = 0;
      if (x) {
        let L = !1;
        if (C !== null) {
          const J = C.texture.format;
          L = J === 1033 || J === 1031 || J === 1029;
        }
        if (L) {
          const J = C.texture.type, oe = J === 1009 || J === 1014 || J === 1012 || J === 1020 || J === 1017 || J === 1018, fe = Ee.getClearColor(), pe = Ee.getClearAlpha(), Ae = fe.r, we = fe.g, me = fe.b;
          oe ? (M[0] = Ae, M[1] = we, M[2] = me, M[3] = pe, U.clearBufferuiv(U.COLOR, 0, M)) : (E[0] = Ae, E[1] = we, E[2] = me, E[3] = pe, U.clearBufferiv(U.COLOR, 0, E));
        } else
          G |= U.COLOR_BUFFER_BIT;
      }
      D && (G |= U.DEPTH_BUFFER_BIT), B && (G |= U.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), U.clear(G);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", K, !1), t.removeEventListener("webglcontextrestored", le, !1), t.removeEventListener("webglcontextcreationerror", ae, !1), ue.dispose(), Ge.dispose(), Me.dispose(), _.dispose(), N.dispose(), X.dispose(), Ke.dispose(), P.dispose(), ge.dispose(), V.dispose(), V.removeEventListener("sessionstart", cr), V.removeEventListener("sessionend", ur), tn.stop();
    };
    function K(x) {
      x.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), I = !0;
    }
    function le() {
      console.log("THREE.WebGLRenderer: Context Restored."), I = !1;
      const x = $e.autoReset, D = he.enabled, B = he.autoUpdate, G = he.needsUpdate, L = he.type;
      ne(), $e.autoReset = x, he.enabled = D, he.autoUpdate = B, he.needsUpdate = G, he.type = L;
    }
    function ae(x) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", x.statusMessage);
    }
    function Re(x) {
      const D = x.target;
      D.removeEventListener("dispose", Re), et(D);
    }
    function et(x) {
      lt(x), Me.remove(x);
    }
    function lt(x) {
      const D = Me.get(x).programs;
      D !== void 0 && (D.forEach(function(B) {
        ge.releaseProgram(B);
      }), x.isShaderMaterial && ge.releaseShaderCache(x));
    }
    this.renderBufferDirect = function(x, D, B, G, L, J) {
      D === null && (D = Qe);
      const oe = L.isMesh && L.matrixWorld.determinant() < 0, fe = Ns(x, D, B, G, L);
      Se.setMaterial(G, oe);
      let pe = B.index, Ae = 1;
      if (G.wireframe === !0) {
        if (pe = $.getWireframeAttribute(B), pe === void 0) return;
        Ae = 2;
      }
      const we = B.drawRange, me = B.attributes.position;
      let He = we.start * Ae, Ze = (we.start + we.count) * Ae;
      J !== null && (He = Math.max(He, J.start * Ae), Ze = Math.min(Ze, (J.start + J.count) * Ae)), pe !== null ? (He = Math.max(He, 0), Ze = Math.min(Ze, pe.count)) : me != null && (He = Math.max(He, 0), Ze = Math.min(Ze, me.count));
      const je = Ze - He;
      if (je < 0 || je === 1 / 0) return;
      Ke.setup(L, G, fe, B, pe);
      let mt, ke = de;
      if (pe !== null && (mt = Y.get(pe), ke = Oe, ke.setIndex(mt)), L.isMesh)
        G.wireframe === !0 ? (Se.setLineWidth(G.wireframeLinewidth * it()), ke.setMode(U.LINES)) : ke.setMode(U.TRIANGLES);
      else if (L.isLine) {
        let ve = G.linewidth;
        ve === void 0 && (ve = 1), Se.setLineWidth(ve * it()), L.isLineSegments ? ke.setMode(U.LINES) : L.isLineLoop ? ke.setMode(U.LINE_LOOP) : ke.setMode(U.LINE_STRIP);
      } else L.isPoints ? ke.setMode(U.POINTS) : L.isSprite && ke.setMode(U.TRIANGLES);
      if (L.isBatchedMesh)
        if (L._multiDrawInstances !== null)
          ke.renderMultiDrawInstances(L._multiDrawStarts, L._multiDrawCounts, L._multiDrawCount, L._multiDrawInstances);
        else if (Fe.get("WEBGL_multi_draw"))
          ke.renderMultiDraw(L._multiDrawStarts, L._multiDrawCounts, L._multiDrawCount);
        else {
          const ve = L._multiDrawStarts, Gt = L._multiDrawCounts, We = L._multiDrawCount, wt = pe ? Y.get(pe).bytesPerElement : 1, fn = Me.get(G).currentProgram.getUniforms();
          for (let vt = 0; vt < We; vt++)
            fn.setValue(U, "_gl_DrawID", vt), ke.render(ve[vt] / wt, Gt[vt]);
        }
      else if (L.isInstancedMesh)
        ke.renderInstances(He, je, L.count);
      else if (B.isInstancedBufferGeometry) {
        const ve = B._maxInstanceCount !== void 0 ? B._maxInstanceCount : 1 / 0, Gt = Math.min(B.instanceCount, ve);
        ke.renderInstances(He, je, Gt);
      } else
        ke.render(He, je);
    };
    function Xe(x, D, B) {
      x.transparent === !0 && x.side === 2 && x.forceSinglePass === !1 ? (x.side = 1, x.needsUpdate = !0, Zn(x, D, B), x.side = 0, x.needsUpdate = !0, Zn(x, D, B), x.side = 2) : Zn(x, D, B);
    }
    this.compile = function(x, D, B = null) {
      B === null && (B = x), u = Ge.get(B), u.init(D), y.push(u), B.traverseVisible(function(L) {
        L.isLight && L.layers.test(D.layers) && (u.pushLight(L), L.castShadow && u.pushShadow(L));
      }), x !== B && x.traverseVisible(function(L) {
        L.isLight && L.layers.test(D.layers) && (u.pushLight(L), L.castShadow && u.pushShadow(L));
      }), u.setupLights();
      const G = /* @__PURE__ */ new Set();
      return x.traverse(function(L) {
        if (!(L.isMesh || L.isPoints || L.isLine || L.isSprite))
          return;
        const J = L.material;
        if (J)
          if (Array.isArray(J))
            for (let oe = 0; oe < J.length; oe++) {
              const fe = J[oe];
              Xe(fe, B, L), G.add(fe);
            }
          else
            Xe(J, B, L), G.add(J);
      }), y.pop(), u = null, G;
    }, this.compileAsync = function(x, D, B = null) {
      const G = this.compile(x, D, B);
      return new Promise((L) => {
        function J() {
          if (G.forEach(function(oe) {
            Me.get(oe).currentProgram.isReady() && G.delete(oe);
          }), G.size === 0) {
            L(x);
            return;
          }
          setTimeout(J, 10);
        }
        Fe.get("KHR_parallel_shader_compile") !== null ? J() : setTimeout(J, 10);
      });
    };
    let Rt = null;
    function Bt(x) {
      Rt && Rt(x);
    }
    function cr() {
      tn.stop();
    }
    function ur() {
      tn.start();
    }
    const tn = new ws();
    tn.setAnimationLoop(Bt), typeof self < "u" && tn.setContext(self), this.setAnimationLoop = function(x) {
      Rt = x, V.setAnimationLoop(x), x === null ? tn.stop() : tn.start();
    }, V.addEventListener("sessionstart", cr), V.addEventListener("sessionend", ur), this.render = function(x, D) {
      if (D !== void 0 && D.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (I === !0) return;
      if (x.matrixWorldAutoUpdate === !0 && x.updateMatrixWorld(), D.parent === null && D.matrixWorldAutoUpdate === !0 && D.updateMatrixWorld(), V.enabled === !0 && V.isPresenting === !0 && (V.cameraAutoUpdate === !0 && V.updateCamera(D), D = V.getCamera()), x.isScene === !0 && x.onBeforeRender(v, x, D, C), u = Ge.get(x, y.length), u.init(D), y.push(u), ye.multiplyMatrices(D.projectionMatrix, D.matrixWorldInverse), q.setFromProjectionMatrix(ye), _e = this.localClippingEnabled, ee = j.init(this.clippingPlanes, _e), p = ue.get(x, A.length), p.init(), A.push(p), V.enabled === !0 && V.isPresenting === !0) {
        const J = v.xr.getDepthSensingMesh();
        J !== null && Ei(J, D, -1 / 0, v.sortObjects);
      }
      Ei(x, D, 0, v.sortObjects), p.finish(), v.sortObjects === !0 && p.sort(ie, ce), Be = V.enabled === !1 || V.isPresenting === !1 || V.hasDepthSensing() === !1, Be && Ee.addToRenderList(p, x), this.info.render.frame++, ee === !0 && j.beginShadows();
      const B = u.state.shadowsArray;
      he.render(B, x, D), ee === !0 && j.endShadows(), this.info.autoReset === !0 && this.info.reset();
      const G = p.opaque, L = p.transmissive;
      if (u.setupLights(), D.isArrayCamera) {
        const J = D.cameras;
        if (L.length > 0)
          for (let oe = 0, fe = J.length; oe < fe; oe++) {
            const pe = J[oe];
            dr(G, L, x, pe);
          }
        Be && Ee.render(x);
        for (let oe = 0, fe = J.length; oe < fe; oe++) {
          const pe = J[oe];
          hr(p, x, pe, pe.viewport);
        }
      } else
        L.length > 0 && dr(G, L, x, D), Be && Ee.render(x), hr(p, x, D);
      C !== null && (T.updateMultisampleRenderTarget(C), T.updateRenderTargetMipmap(C)), x.isScene === !0 && x.onAfterRender(v, x, D), Ke.resetDefaultState(), S = -1, g = null, y.pop(), y.length > 0 ? (u = y[y.length - 1], ee === !0 && j.setGlobalState(v.clippingPlanes, u.state.camera)) : u = null, A.pop(), A.length > 0 ? p = A[A.length - 1] : p = null;
    };
    function Ei(x, D, B, G) {
      if (x.visible === !1) return;
      if (x.layers.test(D.layers)) {
        if (x.isGroup)
          B = x.renderOrder;
        else if (x.isLOD)
          x.autoUpdate === !0 && x.update(D);
        else if (x.isLight)
          u.pushLight(x), x.castShadow && u.pushShadow(x);
        else if (x.isSprite) {
          if (!x.frustumCulled || q.intersectsSprite(x)) {
            G && Ue.setFromMatrixPosition(x.matrixWorld).applyMatrix4(ye);
            const oe = X.update(x), fe = x.material;
            fe.visible && p.push(x, oe, fe, B, Ue.z, null);
          }
        } else if ((x.isMesh || x.isLine || x.isPoints) && (!x.frustumCulled || q.intersectsObject(x))) {
          const oe = X.update(x), fe = x.material;
          if (G && (x.boundingSphere !== void 0 ? (x.boundingSphere === null && x.computeBoundingSphere(), Ue.copy(x.boundingSphere.center)) : (oe.boundingSphere === null && oe.computeBoundingSphere(), Ue.copy(oe.boundingSphere.center)), Ue.applyMatrix4(x.matrixWorld).applyMatrix4(ye)), Array.isArray(fe)) {
            const pe = oe.groups;
            for (let Ae = 0, we = pe.length; Ae < we; Ae++) {
              const me = pe[Ae], He = fe[me.materialIndex];
              He && He.visible && p.push(x, oe, He, B, Ue.z, me);
            }
          } else fe.visible && p.push(x, oe, fe, B, Ue.z, null);
        }
      }
      const J = x.children;
      for (let oe = 0, fe = J.length; oe < fe; oe++)
        Ei(J[oe], D, B, G);
    }
    function hr(x, D, B, G) {
      const L = x.opaque, J = x.transmissive, oe = x.transparent;
      u.setupLightsView(B), ee === !0 && j.setGlobalState(v.clippingPlanes, B), G && Se.viewport(w.copy(G)), L.length > 0 && Kn(L, D, B), J.length > 0 && Kn(J, D, B), oe.length > 0 && Kn(oe, D, B), Se.buffers.depth.setTest(!0), Se.buffers.depth.setMask(!0), Se.buffers.color.setMask(!0), Se.setPolygonOffset(!1);
    }
    function dr(x, D, B, G) {
      if ((B.isScene === !0 ? B.overrideMaterial : null) !== null)
        return;
      u.state.transmissionRenderTarget[G.id] === void 0 && (u.state.transmissionRenderTarget[G.id] = new dn(1, 1, {
        generateMipmaps: !0,
        type: Fe.has("EXT_color_buffer_half_float") || Fe.has("EXT_color_buffer_float") ? 1016 : 1009,
        minFilter: 1008,
        samples: 4,
        stencilBuffer: s,
        resolveDepthBuffer: !1,
        resolveStencilBuffer: !1,
        colorSpace: ze.workingColorSpace
      }));
      const J = u.state.transmissionRenderTarget[G.id], oe = G.viewport || w;
      J.setSize(oe.z, oe.w);
      const fe = v.getRenderTarget();
      v.setRenderTarget(J), v.getClearColor(k), Z = v.getClearAlpha(), Z < 1 && v.setClearColor(16777215, 0.5), v.clear(), Be && Ee.render(B);
      const pe = v.toneMapping;
      v.toneMapping = 0;
      const Ae = G.viewport;
      if (G.viewport !== void 0 && (G.viewport = void 0), u.setupLightsView(G), ee === !0 && j.setGlobalState(v.clippingPlanes, G), Kn(x, B, G), T.updateMultisampleRenderTarget(J), T.updateRenderTargetMipmap(J), Fe.has("WEBGL_multisampled_render_to_texture") === !1) {
        let we = !1;
        for (let me = 0, He = D.length; me < He; me++) {
          const Ze = D[me], je = Ze.object, mt = Ze.geometry, ke = Ze.material, ve = Ze.group;
          if (ke.side === 2 && je.layers.test(G.layers)) {
            const Gt = ke.side;
            ke.side = 1, ke.needsUpdate = !0, fr(je, B, G, mt, ke, ve), ke.side = Gt, ke.needsUpdate = !0, we = !0;
          }
        }
        we === !0 && (T.updateMultisampleRenderTarget(J), T.updateRenderTargetMipmap(J));
      }
      v.setRenderTarget(fe), v.setClearColor(k, Z), Ae !== void 0 && (G.viewport = Ae), v.toneMapping = pe;
    }
    function Kn(x, D, B) {
      const G = D.isScene === !0 ? D.overrideMaterial : null;
      for (let L = 0, J = x.length; L < J; L++) {
        const oe = x[L], fe = oe.object, pe = oe.geometry, Ae = G === null ? oe.material : G, we = oe.group;
        fe.layers.test(B.layers) && fr(fe, D, B, pe, Ae, we);
      }
    }
    function fr(x, D, B, G, L, J) {
      x.onBeforeRender(v, D, B, G, L, J), x.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse, x.matrixWorld), x.normalMatrix.getNormalMatrix(x.modelViewMatrix), L.onBeforeRender(v, D, B, G, x, J), L.transparent === !0 && L.side === 2 && L.forceSinglePass === !1 ? (L.side = 1, L.needsUpdate = !0, v.renderBufferDirect(B, D, G, L, x, J), L.side = 0, L.needsUpdate = !0, v.renderBufferDirect(B, D, G, L, x, J), L.side = 2) : v.renderBufferDirect(B, D, G, L, x, J), x.onAfterRender(v, D, B, G, L, J);
    }
    function Zn(x, D, B) {
      D.isScene !== !0 && (D = Qe);
      const G = Me.get(x), L = u.state.lights, J = u.state.shadowsArray, oe = L.state.version, fe = ge.getParameters(x, L.state, J, D, B), pe = ge.getProgramCacheKey(fe);
      let Ae = G.programs;
      G.environment = x.isMeshStandardMaterial ? D.environment : null, G.fog = D.fog, G.envMap = (x.isMeshStandardMaterial ? N : _).get(x.envMap || G.environment), G.envMapRotation = G.environment !== null && x.envMap === null ? D.environmentRotation : x.envMapRotation, Ae === void 0 && (x.addEventListener("dispose", Re), Ae = /* @__PURE__ */ new Map(), G.programs = Ae);
      let we = Ae.get(pe);
      if (we !== void 0) {
        if (G.currentProgram === we && G.lightsStateVersion === oe)
          return mr(x, fe), we;
      } else
        fe.uniforms = ge.getUniforms(x), x.onBeforeCompile(fe, v), we = ge.acquireProgram(fe, pe), Ae.set(pe, we), G.uniforms = fe.uniforms;
      const me = G.uniforms;
      return (!x.isShaderMaterial && !x.isRawShaderMaterial || x.clipping === !0) && (me.clippingPlanes = j.uniform), mr(x, fe), G.needsLights = Bs(x), G.lightsStateVersion = oe, G.needsLights && (me.ambientLightColor.value = L.state.ambient, me.lightProbe.value = L.state.probe, me.directionalLights.value = L.state.directional, me.directionalLightShadows.value = L.state.directionalShadow, me.spotLights.value = L.state.spot, me.spotLightShadows.value = L.state.spotShadow, me.rectAreaLights.value = L.state.rectArea, me.ltc_1.value = L.state.rectAreaLTC1, me.ltc_2.value = L.state.rectAreaLTC2, me.pointLights.value = L.state.point, me.pointLightShadows.value = L.state.pointShadow, me.hemisphereLights.value = L.state.hemi, me.directionalShadowMap.value = L.state.directionalShadowMap, me.directionalShadowMatrix.value = L.state.directionalShadowMatrix, me.spotShadowMap.value = L.state.spotShadowMap, me.spotLightMatrix.value = L.state.spotLightMatrix, me.spotLightMap.value = L.state.spotLightMap, me.pointShadowMap.value = L.state.pointShadowMap, me.pointShadowMatrix.value = L.state.pointShadowMatrix), G.currentProgram = we, G.uniformsList = null, we;
    }
    function pr(x) {
      if (x.uniformsList === null) {
        const D = x.currentProgram.getUniforms();
        x.uniformsList = gi.seqWithValue(D.seq, x.uniforms);
      }
      return x.uniformsList;
    }
    function mr(x, D) {
      const B = Me.get(x);
      B.outputColorSpace = D.outputColorSpace, B.batching = D.batching, B.batchingColor = D.batchingColor, B.instancing = D.instancing, B.instancingColor = D.instancingColor, B.instancingMorph = D.instancingMorph, B.skinning = D.skinning, B.morphTargets = D.morphTargets, B.morphNormals = D.morphNormals, B.morphColors = D.morphColors, B.morphTargetsCount = D.morphTargetsCount, B.numClippingPlanes = D.numClippingPlanes, B.numIntersection = D.numClipIntersection, B.vertexAlphas = D.vertexAlphas, B.vertexTangents = D.vertexTangents, B.toneMapping = D.toneMapping;
    }
    function Ns(x, D, B, G, L) {
      D.isScene !== !0 && (D = Qe), T.resetTextureUnits();
      const J = D.fog, oe = G.isMeshStandardMaterial ? D.environment : null, fe = C === null ? v.outputColorSpace : C.isXRRenderTarget === !0 ? C.texture.colorSpace : Pn, pe = (G.isMeshStandardMaterial ? N : _).get(G.envMap || oe), Ae = G.vertexColors === !0 && !!B.attributes.color && B.attributes.color.itemSize === 4, we = !!B.attributes.tangent && (!!G.normalMap || G.anisotropy > 0), me = !!B.morphAttributes.position, He = !!B.morphAttributes.normal, Ze = !!B.morphAttributes.color;
      let je = 0;
      G.toneMapped && (C === null || C.isXRRenderTarget === !0) && (je = v.toneMapping);
      const mt = B.morphAttributes.position || B.morphAttributes.normal || B.morphAttributes.color, ke = mt !== void 0 ? mt.length : 0, ve = Me.get(G), Gt = u.state.lights;
      if (ee === !0 && (_e === !0 || x !== g)) {
        const Tt = x === g && G.id === S;
        j.setState(G, x, Tt);
      }
      let We = !1;
      G.version === ve.__version ? (ve.needsLights && ve.lightsStateVersion !== Gt.state.version || ve.outputColorSpace !== fe || L.isBatchedMesh && ve.batching === !1 || !L.isBatchedMesh && ve.batching === !0 || L.isBatchedMesh && ve.batchingColor === !0 && L.colorTexture === null || L.isBatchedMesh && ve.batchingColor === !1 && L.colorTexture !== null || L.isInstancedMesh && ve.instancing === !1 || !L.isInstancedMesh && ve.instancing === !0 || L.isSkinnedMesh && ve.skinning === !1 || !L.isSkinnedMesh && ve.skinning === !0 || L.isInstancedMesh && ve.instancingColor === !0 && L.instanceColor === null || L.isInstancedMesh && ve.instancingColor === !1 && L.instanceColor !== null || L.isInstancedMesh && ve.instancingMorph === !0 && L.morphTexture === null || L.isInstancedMesh && ve.instancingMorph === !1 && L.morphTexture !== null || ve.envMap !== pe || G.fog === !0 && ve.fog !== J || ve.numClippingPlanes !== void 0 && (ve.numClippingPlanes !== j.numPlanes || ve.numIntersection !== j.numIntersection) || ve.vertexAlphas !== Ae || ve.vertexTangents !== we || ve.morphTargets !== me || ve.morphNormals !== He || ve.morphColors !== Ze || ve.toneMapping !== je || ve.morphTargetsCount !== ke) && (We = !0) : (We = !0, ve.__version = G.version);
      let wt = ve.currentProgram;
      We === !0 && (wt = Zn(G, D, L));
      let fn = !1, vt = !1, In = !1;
      const Je = wt.getUniforms(), Ut = ve.uniforms;
      if (Se.useProgram(wt.program) && (fn = !0, vt = !0, In = !0), G.id !== S && (S = G.id, vt = !0), fn || g !== x) {
        Se.buffers.depth.getReversed() ? (re.copy(x.projectionMatrix), Hs(re), ks(re), Je.setValue(U, "projectionMatrix", re)) : Je.setValue(U, "projectionMatrix", x.projectionMatrix), Je.setValue(U, "viewMatrix", x.matrixWorldInverse);
        const qt = Je.map.cameraPosition;
        qt !== void 0 && qt.setValue(U, be.setFromMatrixPosition(x.matrixWorld)), Ne.logarithmicDepthBuffer && Je.setValue(
          U,
          "logDepthBufFC",
          2 / (Math.log(x.far + 1) / Math.LN2)
        ), (G.isMeshPhongMaterial || G.isMeshToonMaterial || G.isMeshLambertMaterial || G.isMeshBasicMaterial || G.isMeshStandardMaterial || G.isShaderMaterial) && Je.setValue(U, "isOrthographic", x.isOrthographicCamera === !0), g !== x && (g = x, vt = !0, In = !0);
      }
      if (L.isSkinnedMesh) {
        Je.setOptional(U, L, "bindMatrix"), Je.setOptional(U, L, "bindMatrixInverse");
        const Tt = L.skeleton;
        Tt && (Tt.boneTexture === null && Tt.computeBoneTexture(), Je.setValue(U, "boneTexture", Tt.boneTexture, T));
      }
      L.isBatchedMesh && (Je.setOptional(U, L, "batchingTexture"), Je.setValue(U, "batchingTexture", L._matricesTexture, T), Je.setOptional(U, L, "batchingIdTexture"), Je.setValue(U, "batchingIdTexture", L._indirectTexture, T), Je.setOptional(U, L, "batchingColorTexture"), L._colorsTexture !== null && Je.setValue(U, "batchingColorTexture", L._colorsTexture, T));
      const Fn = B.morphAttributes;
      if ((Fn.position !== void 0 || Fn.normal !== void 0 || Fn.color !== void 0) && Te.update(L, B, wt), (vt || ve.receiveShadow !== L.receiveShadow) && (ve.receiveShadow = L.receiveShadow, Je.setValue(U, "receiveShadow", L.receiveShadow)), G.isMeshGouraudMaterial && G.envMap !== null && (Ut.envMap.value = pe, Ut.flipEnvMap.value = pe.isCubeTexture && pe.isRenderTargetTexture === !1 ? -1 : 1), G.isMeshStandardMaterial && G.envMap === null && D.environment !== null && (Ut.envMapIntensity.value = D.environmentIntensity), vt && (Je.setValue(U, "toneMappingExposure", v.toneMappingExposure), ve.needsLights && Os(Ut, In), J && G.fog === !0 && se.refreshFogUniforms(Ut, J), se.refreshMaterialUniforms(Ut, G, H, Q, u.state.transmissionRenderTarget[x.id]), gi.upload(U, pr(ve), Ut, T)), G.isShaderMaterial && G.uniformsNeedUpdate === !0 && (gi.upload(U, pr(ve), Ut, T), G.uniformsNeedUpdate = !1), G.isSpriteMaterial && Je.setValue(U, "center", L.center), Je.setValue(U, "modelViewMatrix", L.modelViewMatrix), Je.setValue(U, "normalMatrix", L.normalMatrix), Je.setValue(U, "modelMatrix", L.matrixWorld), G.isShaderMaterial || G.isRawShaderMaterial) {
        const Tt = G.uniformsGroups;
        for (let qt = 0, Yt = Tt.length; qt < Yt; qt++) {
          const _r = Tt[qt];
          P.update(_r, wt), P.bind(_r, wt);
        }
      }
      return wt;
    }
    function Os(x, D) {
      x.ambientLightColor.needsUpdate = D, x.lightProbe.needsUpdate = D, x.directionalLights.needsUpdate = D, x.directionalLightShadows.needsUpdate = D, x.pointLights.needsUpdate = D, x.pointLightShadows.needsUpdate = D, x.spotLights.needsUpdate = D, x.spotLightShadows.needsUpdate = D, x.rectAreaLights.needsUpdate = D, x.hemisphereLights.needsUpdate = D;
    }
    function Bs(x) {
      return x.isMeshLambertMaterial || x.isMeshToonMaterial || x.isMeshPhongMaterial || x.isMeshStandardMaterial || x.isShadowMaterial || x.isShaderMaterial && x.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return b;
    }, this.getActiveMipmapLevel = function() {
      return R;
    }, this.getRenderTarget = function() {
      return C;
    }, this.setRenderTargetTextures = function(x, D, B) {
      Me.get(x.texture).__webglTexture = D, Me.get(x.depthTexture).__webglTexture = B;
      const G = Me.get(x);
      G.__hasExternalTextures = !0, G.__autoAllocateDepthBuffer = B === void 0, G.__autoAllocateDepthBuffer || Fe.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), G.__useRenderToTexture = !1);
    }, this.setRenderTargetFramebuffer = function(x, D) {
      const B = Me.get(x);
      B.__webglFramebuffer = D, B.__useDefaultFramebuffer = D === void 0;
    }, this.setRenderTarget = function(x, D = 0, B = 0) {
      C = x, b = D, R = B;
      let G = !0, L = null, J = !1, oe = !1;
      if (x) {
        const pe = Me.get(x);
        if (pe.__useDefaultFramebuffer !== void 0)
          Se.bindFramebuffer(U.FRAMEBUFFER, null), G = !1;
        else if (pe.__webglFramebuffer === void 0)
          T.setupRenderTarget(x);
        else if (pe.__hasExternalTextures)
          T.rebindTextures(x, Me.get(x.texture).__webglTexture, Me.get(x.depthTexture).__webglTexture);
        else if (x.depthBuffer) {
          const me = x.depthTexture;
          if (pe.__boundDepthTexture !== me) {
            if (me !== null && Me.has(me) && (x.width !== me.image.width || x.height !== me.image.height))
              throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            T.setupDepthRenderbuffer(x);
          }
        }
        const Ae = x.texture;
        (Ae.isData3DTexture || Ae.isDataArrayTexture || Ae.isCompressedArrayTexture) && (oe = !0);
        const we = Me.get(x).__webglFramebuffer;
        x.isWebGLCubeRenderTarget ? (Array.isArray(we[D]) ? L = we[D][B] : L = we[D], J = !0) : x.samples > 0 && T.useMultisampledRTT(x) === !1 ? L = Me.get(x).__webglMultisampledFramebuffer : Array.isArray(we) ? L = we[B] : L = we, w.copy(x.viewport), z.copy(x.scissor), O = x.scissorTest;
      } else
        w.copy(xe).multiplyScalar(H).floor(), z.copy(Le).multiplyScalar(H).floor(), O = Ye;
      if (Se.bindFramebuffer(U.FRAMEBUFFER, L) && G && Se.drawBuffers(x, L), Se.viewport(w), Se.scissor(z), Se.setScissorTest(O), J) {
        const pe = Me.get(x.texture);
        U.framebufferTexture2D(U.FRAMEBUFFER, U.COLOR_ATTACHMENT0, U.TEXTURE_CUBE_MAP_POSITIVE_X + D, pe.__webglTexture, B);
      } else if (oe) {
        const pe = Me.get(x.texture), Ae = D || 0;
        U.framebufferTextureLayer(U.FRAMEBUFFER, U.COLOR_ATTACHMENT0, pe.__webglTexture, B || 0, Ae);
      }
      S = -1;
    }, this.readRenderTargetPixels = function(x, D, B, G, L, J, oe) {
      if (!(x && x.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let fe = Me.get(x).__webglFramebuffer;
      if (x.isWebGLCubeRenderTarget && oe !== void 0 && (fe = fe[oe]), fe) {
        Se.bindFramebuffer(U.FRAMEBUFFER, fe);
        try {
          const pe = x.texture, Ae = pe.format, we = pe.type;
          if (!Ne.textureFormatReadable(Ae)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!Ne.textureTypeReadable(we)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          D >= 0 && D <= x.width - G && B >= 0 && B <= x.height - L && U.readPixels(D, B, G, L, Pe.convert(Ae), Pe.convert(we), J);
        } finally {
          const pe = C !== null ? Me.get(C).__webglFramebuffer : null;
          Se.bindFramebuffer(U.FRAMEBUFFER, pe);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(x, D, B, G, L, J, oe) {
      if (!(x && x.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let fe = Me.get(x).__webglFramebuffer;
      if (x.isWebGLCubeRenderTarget && oe !== void 0 && (fe = fe[oe]), fe) {
        const pe = x.texture, Ae = pe.format, we = pe.type;
        if (!Ne.textureFormatReadable(Ae))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!Ne.textureTypeReadable(we))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        if (D >= 0 && D <= x.width - G && B >= 0 && B <= x.height - L) {
          Se.bindFramebuffer(U.FRAMEBUFFER, fe);
          const me = U.createBuffer();
          U.bindBuffer(U.PIXEL_PACK_BUFFER, me), U.bufferData(U.PIXEL_PACK_BUFFER, J.byteLength, U.STREAM_READ), U.readPixels(D, B, G, L, Pe.convert(Ae), Pe.convert(we), 0);
          const He = C !== null ? Me.get(C).__webglFramebuffer : null;
          Se.bindFramebuffer(U.FRAMEBUFFER, He);
          const Ze = U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return U.flush(), await Vs(U, Ze, 4), U.bindBuffer(U.PIXEL_PACK_BUFFER, me), U.getBufferSubData(U.PIXEL_PACK_BUFFER, 0, J), U.deleteBuffer(me), U.deleteSync(Ze), J;
        } else
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
      }
    }, this.copyFramebufferToTexture = function(x, D = null, B = 0) {
      x.isTexture !== !0 && (Hn("WebGLRenderer: copyFramebufferToTexture function signature has changed."), D = arguments[0] || null, x = arguments[1]);
      const G = Math.pow(2, -B), L = Math.floor(x.image.width * G), J = Math.floor(x.image.height * G), oe = D !== null ? D.x : 0, fe = D !== null ? D.y : 0;
      T.setTexture2D(x, 0), U.copyTexSubImage2D(U.TEXTURE_2D, B, 0, 0, oe, fe, L, J), Se.unbindTexture();
    }, this.copyTextureToTexture = function(x, D, B = null, G = null, L = 0) {
      x.isTexture !== !0 && (Hn("WebGLRenderer: copyTextureToTexture function signature has changed."), G = arguments[0] || null, x = arguments[1], D = arguments[2], L = arguments[3] || 0, B = null);
      let J, oe, fe, pe, Ae, we, me, He, Ze;
      const je = x.isCompressedTexture ? x.mipmaps[L] : x.image;
      B !== null ? (J = B.max.x - B.min.x, oe = B.max.y - B.min.y, fe = B.isBox3 ? B.max.z - B.min.z : 1, pe = B.min.x, Ae = B.min.y, we = B.isBox3 ? B.min.z : 0) : (J = je.width, oe = je.height, fe = je.depth || 1, pe = 0, Ae = 0, we = 0), G !== null ? (me = G.x, He = G.y, Ze = G.z) : (me = 0, He = 0, Ze = 0);
      const mt = Pe.convert(D.format), ke = Pe.convert(D.type);
      let ve;
      D.isData3DTexture ? (T.setTexture3D(D, 0), ve = U.TEXTURE_3D) : D.isDataArrayTexture || D.isCompressedArrayTexture ? (T.setTexture2DArray(D, 0), ve = U.TEXTURE_2D_ARRAY) : (T.setTexture2D(D, 0), ve = U.TEXTURE_2D), U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL, D.flipY), U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL, D.premultiplyAlpha), U.pixelStorei(U.UNPACK_ALIGNMENT, D.unpackAlignment);
      const Gt = U.getParameter(U.UNPACK_ROW_LENGTH), We = U.getParameter(U.UNPACK_IMAGE_HEIGHT), wt = U.getParameter(U.UNPACK_SKIP_PIXELS), fn = U.getParameter(U.UNPACK_SKIP_ROWS), vt = U.getParameter(U.UNPACK_SKIP_IMAGES);
      U.pixelStorei(U.UNPACK_ROW_LENGTH, je.width), U.pixelStorei(U.UNPACK_IMAGE_HEIGHT, je.height), U.pixelStorei(U.UNPACK_SKIP_PIXELS, pe), U.pixelStorei(U.UNPACK_SKIP_ROWS, Ae), U.pixelStorei(U.UNPACK_SKIP_IMAGES, we);
      const In = x.isDataArrayTexture || x.isData3DTexture, Je = D.isDataArrayTexture || D.isData3DTexture;
      if (x.isRenderTargetTexture || x.isDepthTexture) {
        const Ut = Me.get(x), Fn = Me.get(D), Tt = Me.get(Ut.__renderTarget), qt = Me.get(Fn.__renderTarget);
        Se.bindFramebuffer(U.READ_FRAMEBUFFER, Tt.__webglFramebuffer), Se.bindFramebuffer(U.DRAW_FRAMEBUFFER, qt.__webglFramebuffer);
        for (let Yt = 0; Yt < fe; Yt++)
          In && U.framebufferTextureLayer(U.READ_FRAMEBUFFER, U.COLOR_ATTACHMENT0, Me.get(x).__webglTexture, L, we + Yt), x.isDepthTexture ? (Je && U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER, U.COLOR_ATTACHMENT0, Me.get(D).__webglTexture, L, Ze + Yt), U.blitFramebuffer(pe, Ae, J, oe, me, He, J, oe, U.DEPTH_BUFFER_BIT, U.NEAREST)) : Je ? U.copyTexSubImage3D(ve, L, me, He, Ze + Yt, pe, Ae, J, oe) : U.copyTexSubImage2D(ve, L, me, He, Ze + Yt, pe, Ae, J, oe);
        Se.bindFramebuffer(U.READ_FRAMEBUFFER, null), Se.bindFramebuffer(U.DRAW_FRAMEBUFFER, null);
      } else
        Je ? x.isDataTexture || x.isData3DTexture ? U.texSubImage3D(ve, L, me, He, Ze, J, oe, fe, mt, ke, je.data) : D.isCompressedArrayTexture ? U.compressedTexSubImage3D(ve, L, me, He, Ze, J, oe, fe, mt, je.data) : U.texSubImage3D(ve, L, me, He, Ze, J, oe, fe, mt, ke, je) : x.isDataTexture ? U.texSubImage2D(U.TEXTURE_2D, L, me, He, J, oe, mt, ke, je.data) : x.isCompressedTexture ? U.compressedTexSubImage2D(U.TEXTURE_2D, L, me, He, je.width, je.height, mt, je.data) : U.texSubImage2D(U.TEXTURE_2D, L, me, He, J, oe, mt, ke, je);
      U.pixelStorei(U.UNPACK_ROW_LENGTH, Gt), U.pixelStorei(U.UNPACK_IMAGE_HEIGHT, We), U.pixelStorei(U.UNPACK_SKIP_PIXELS, wt), U.pixelStorei(U.UNPACK_SKIP_ROWS, fn), U.pixelStorei(U.UNPACK_SKIP_IMAGES, vt), L === 0 && D.generateMipmaps && U.generateMipmap(ve), Se.unbindTexture();
    }, this.copyTextureToTexture3D = function(x, D, B = null, G = null, L = 0) {
      return x.isTexture !== !0 && (Hn("WebGLRenderer: copyTextureToTexture3D function signature has changed."), B = arguments[0] || null, G = arguments[1] || null, x = arguments[2], D = arguments[3], L = arguments[4] || 0), Hn('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'), this.copyTextureToTexture(x, D, B, G, L);
    }, this.initRenderTarget = function(x) {
      Me.get(x).__webglFramebuffer === void 0 && T.setupRenderTarget(x);
    }, this.initTexture = function(x) {
      x.isCubeTexture ? T.setTextureCube(x, 0) : x.isData3DTexture ? T.setTexture3D(x, 0) : x.isDataArrayTexture || x.isCompressedArrayTexture ? T.setTexture2DArray(x, 0) : T.setTexture2D(x, 0), Se.unbindTexture();
    }, this.resetState = function() {
      b = 0, R = 0, C = null, Se.reset(), Ke.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return 2e3;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorspace = ze._getDrawingBufferColorSpace(e), t.unpackColorSpace = ze._getUnpackColorSpace();
  }
}
class rr {
  constructor(e, t = 25e-5) {
    this.isFogExp2 = !0, this.name = "", this.color = new Ve(e), this.density = t;
  }
  clone() {
    return new rr(this.color, this.density);
  }
  toJSON() {
    return {
      type: "FogExp2",
      name: this.name,
      color: this.color.getHex(),
      density: this.density
    };
  }
}
class th extends ht {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Nt(), this.environmentIntensity = 1, this.environmentRotation = new Nt(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}
class nh extends pt {
  constructor(e, t, n, r, s, a, o, l, c) {
    super(e, t, n, r, s, a, o, l, c), this.isCanvasTexture = !0, this.needsUpdate = !0;
  }
}
class sr extends Ot {
  constructor(e = 1, t = 32, n = 0, r = Math.PI * 2) {
    super(), this.type = "CircleGeometry", this.parameters = {
      radius: e,
      segments: t,
      thetaStart: n,
      thetaLength: r
    }, t = Math.max(3, t);
    const s = [], a = [], o = [], l = [], c = new F(), h = new Ie();
    a.push(0, 0, 0), o.push(0, 0, 1), l.push(0.5, 0.5);
    for (let d = 0, f = 3; d <= t; d++, f += 3) {
      const m = n + d / t * r;
      c.x = e * Math.cos(m), c.y = e * Math.sin(m), a.push(c.x, c.y, c.z), o.push(0, 0, 1), h.x = (a[f] / e + 1) / 2, h.y = (a[f + 1] / e + 1) / 2, l.push(h.x, h.y);
    }
    for (let d = 1; d <= t; d++)
      s.push(d, d + 1, 0);
    this.setIndex(s), this.setAttribute("position", new dt(a, 3)), this.setAttribute("normal", new dt(o, 3)), this.setAttribute("uv", new dt(l, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new sr(e.radius, e.segments, e.thetaStart, e.thetaLength);
  }
}
class ar extends Ot {
  constructor(e = 1, t = 1, n = 1, r = 32, s = 1, a = !1, o = 0, l = Math.PI * 2) {
    super(), this.type = "CylinderGeometry", this.parameters = {
      radiusTop: e,
      radiusBottom: t,
      height: n,
      radialSegments: r,
      heightSegments: s,
      openEnded: a,
      thetaStart: o,
      thetaLength: l
    };
    const c = this;
    r = Math.floor(r), s = Math.floor(s);
    const h = [], d = [], f = [], m = [];
    let M = 0;
    const E = [], p = n / 2;
    let u = 0;
    A(), a === !1 && (e > 0 && y(!0), t > 0 && y(!1)), this.setIndex(h), this.setAttribute("position", new dt(d, 3)), this.setAttribute("normal", new dt(f, 3)), this.setAttribute("uv", new dt(m, 2));
    function A() {
      const v = new F(), I = new F();
      let b = 0;
      const R = (t - e) / n;
      for (let C = 0; C <= s; C++) {
        const S = [], g = C / s, w = g * (t - e) + e;
        for (let z = 0; z <= r; z++) {
          const O = z / r, k = O * l + o, Z = Math.sin(k), W = Math.cos(k);
          I.x = w * Z, I.y = -g * n + p, I.z = w * W, d.push(I.x, I.y, I.z), v.set(Z, R, W).normalize(), f.push(v.x, v.y, v.z), m.push(O, 1 - g), S.push(M++);
        }
        E.push(S);
      }
      for (let C = 0; C < r; C++)
        for (let S = 0; S < s; S++) {
          const g = E[S][C], w = E[S + 1][C], z = E[S + 1][C + 1], O = E[S][C + 1];
          (e > 0 || S !== 0) && (h.push(g, w, O), b += 3), (t > 0 || S !== s - 1) && (h.push(w, z, O), b += 3);
        }
      c.addGroup(u, b, 0), u += b;
    }
    function y(v) {
      const I = M, b = new Ie(), R = new F();
      let C = 0;
      const S = v === !0 ? e : t, g = v === !0 ? 1 : -1;
      for (let z = 1; z <= r; z++)
        d.push(0, p * g, 0), f.push(0, g, 0), m.push(0.5, 0.5), M++;
      const w = M;
      for (let z = 0; z <= r; z++) {
        const k = z / r * l + o, Z = Math.cos(k), W = Math.sin(k);
        R.x = S * W, R.y = p * g, R.z = S * Z, d.push(R.x, R.y, R.z), f.push(0, g, 0), b.x = Z * 0.5 + 0.5, b.y = W * 0.5 * g + 0.5, m.push(b.x, b.y), M++;
      }
      for (let z = 0; z < r; z++) {
        const O = I + z, k = w + z;
        v === !0 ? h.push(k, k + 1, O) : h.push(k + 1, k, O), C += 3;
      }
      c.addGroup(u, C, v === !0 ? 1 : 2), u += C;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new ar(e.radiusTop, e.radiusBottom, e.height, e.radialSegments, e.heightSegments, e.openEnded, e.thetaStart, e.thetaLength);
  }
}
class or extends Ot {
  constructor(e = [], t = [], n = 1, r = 0) {
    super(), this.type = "PolyhedronGeometry", this.parameters = {
      vertices: e,
      indices: t,
      radius: n,
      detail: r
    };
    const s = [], a = [];
    o(r), c(n), h(), this.setAttribute("position", new dt(s, 3)), this.setAttribute("normal", new dt(s.slice(), 3)), this.setAttribute("uv", new dt(a, 2)), r === 0 ? this.computeVertexNormals() : this.normalizeNormals();
    function o(A) {
      const y = new F(), v = new F(), I = new F();
      for (let b = 0; b < t.length; b += 3)
        m(t[b + 0], y), m(t[b + 1], v), m(t[b + 2], I), l(y, v, I, A);
    }
    function l(A, y, v, I) {
      const b = I + 1, R = [];
      for (let C = 0; C <= b; C++) {
        R[C] = [];
        const S = A.clone().lerp(v, C / b), g = y.clone().lerp(v, C / b), w = b - C;
        for (let z = 0; z <= w; z++)
          z === 0 && C === b ? R[C][z] = S : R[C][z] = S.clone().lerp(g, z / w);
      }
      for (let C = 0; C < b; C++)
        for (let S = 0; S < 2 * (b - C) - 1; S++) {
          const g = Math.floor(S / 2);
          S % 2 === 0 ? (f(R[C][g + 1]), f(R[C + 1][g]), f(R[C][g])) : (f(R[C][g + 1]), f(R[C + 1][g + 1]), f(R[C + 1][g]));
        }
    }
    function c(A) {
      const y = new F();
      for (let v = 0; v < s.length; v += 3)
        y.x = s[v + 0], y.y = s[v + 1], y.z = s[v + 2], y.normalize().multiplyScalar(A), s[v + 0] = y.x, s[v + 1] = y.y, s[v + 2] = y.z;
    }
    function h() {
      const A = new F();
      for (let y = 0; y < s.length; y += 3) {
        A.x = s[y + 0], A.y = s[y + 1], A.z = s[y + 2];
        const v = p(A) / 2 / Math.PI + 0.5, I = u(A) / Math.PI + 0.5;
        a.push(v, 1 - I);
      }
      M(), d();
    }
    function d() {
      for (let A = 0; A < a.length; A += 6) {
        const y = a[A + 0], v = a[A + 2], I = a[A + 4], b = Math.max(y, v, I), R = Math.min(y, v, I);
        b > 0.9 && R < 0.1 && (y < 0.2 && (a[A + 0] += 1), v < 0.2 && (a[A + 2] += 1), I < 0.2 && (a[A + 4] += 1));
      }
    }
    function f(A) {
      s.push(A.x, A.y, A.z);
    }
    function m(A, y) {
      const v = A * 3;
      y.x = e[v + 0], y.y = e[v + 1], y.z = e[v + 2];
    }
    function M() {
      const A = new F(), y = new F(), v = new F(), I = new F(), b = new Ie(), R = new Ie(), C = new Ie();
      for (let S = 0, g = 0; S < s.length; S += 9, g += 6) {
        A.set(s[S + 0], s[S + 1], s[S + 2]), y.set(s[S + 3], s[S + 4], s[S + 5]), v.set(s[S + 6], s[S + 7], s[S + 8]), b.set(a[g + 0], a[g + 1]), R.set(a[g + 2], a[g + 3]), C.set(a[g + 4], a[g + 5]), I.copy(A).add(y).add(v).divideScalar(3);
        const w = p(I);
        E(b, g + 0, A, w), E(R, g + 2, y, w), E(C, g + 4, v, w);
      }
    }
    function E(A, y, v, I) {
      I < 0 && A.x === 1 && (a[y] = A.x - 1), v.x === 0 && v.z === 0 && (a[y] = I / 2 / Math.PI + 0.5);
    }
    function p(A) {
      return Math.atan2(A.z, -A.x);
    }
    function u(A) {
      return Math.atan2(-A.y, Math.sqrt(A.x * A.x + A.z * A.z));
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new or(e.vertices, e.indices, e.radius, e.details);
  }
}
class lr extends or {
  constructor(e = 1, t = 0) {
    const n = [
      1,
      0,
      0,
      -1,
      0,
      0,
      0,
      1,
      0,
      0,
      -1,
      0,
      0,
      0,
      1,
      0,
      0,
      -1
    ], r = [
      0,
      2,
      4,
      0,
      4,
      3,
      0,
      3,
      5,
      0,
      5,
      2,
      1,
      2,
      5,
      1,
      5,
      3,
      1,
      3,
      4,
      1,
      4,
      2
    ];
    super(n, r, e, t), this.type = "OctahedronGeometry", this.parameters = {
      radius: e,
      detail: t
    };
  }
  static fromJSON(e) {
    return new lr(e.radius, e.detail);
  }
}
class Vn extends Yn {
  static get type() {
    return "MeshStandardMaterial";
  }
  constructor(e) {
    super(), this.isMeshStandardMaterial = !0, this.defines = { STANDARD: "" }, this.color = new Ve(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Ve(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new Ie(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Nt(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.defines = { STANDARD: "" }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}
class Fs extends ht {
  constructor(e, t = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new Ve(e), this.intensity = t;
  }
  dispose() {
  }
  copy(e, t) {
    return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, this.groundColor !== void 0 && (t.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (t.object.distance = this.distance), this.angle !== void 0 && (t.object.angle = this.angle), this.decay !== void 0 && (t.object.decay = this.decay), this.penumbra !== void 0 && (t.object.penumbra = this.penumbra), this.shadow !== void 0 && (t.object.shadow = this.shadow.toJSON()), this.target !== void 0 && (t.object.target = this.target.uuid), t;
  }
}
const Ji = /* @__PURE__ */ new nt(), cs = /* @__PURE__ */ new F(), us = /* @__PURE__ */ new F();
class ih {
  constructor(e) {
    this.camera = e, this.intensity = 1, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new Ie(512, 512), this.map = null, this.mapPass = null, this.matrix = new nt(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new nr(), this._frameExtents = new Ie(1, 1), this._viewportCount = 1, this._viewports = [
      new tt(0, 0, 1, 1)
    ];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(e) {
    const t = this.camera, n = this.matrix;
    cs.setFromMatrixPosition(e.matrixWorld), t.position.copy(cs), us.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(us), t.updateMatrixWorld(), Ji.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Ji), n.set(
      0.5,
      0,
      0,
      0.5,
      0,
      0.5,
      0,
      0.5,
      0,
      0,
      0.5,
      0.5,
      0,
      0,
      0,
      1
    ), n.multiply(Ji);
  }
  getViewport(e) {
    return this._viewports[e];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(e) {
    return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.mapSize.copy(e.mapSize), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const e = {};
    return this.intensity !== 1 && (e.intensity = this.intensity), this.bias !== 0 && (e.bias = this.bias), this.normalBias !== 0 && (e.normalBias = this.normalBias), this.radius !== 1 && (e.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
  }
}
class rh extends ih {
  constructor() {
    super(new Cs(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}
class hs extends Fs {
  constructor(e, t) {
    super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(ht.DEFAULT_UP), this.updateMatrix(), this.target = new ht(), this.shadow = new rh();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e) {
    return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
}
class sh extends Fs {
  constructor(e, t) {
    super(e, t), this.isAmbientLight = !0, this.type = "AmbientLight";
  }
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: "170"
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "170");
const ds = 264197, ah = 725008;
function fs(i) {
  let e = i >>> 0;
  return function() {
    e |= 0, e = e + 1831565813 | 0;
    let t = Math.imul(e ^ e >>> 15, 1 | e);
    return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function ps(i, e) {
  const t = document.createElement("canvas");
  t.width = 128, t.height = 256;
  const n = t.getContext("2d");
  n.fillStyle = "#0b1010", n.fillRect(0, 0, 128, 256);
  for (let s = 4; s < 252; s += 8)
    for (let a = 4; a < 124; a += 8) {
      const o = i();
      o < 0.32 && (n.fillStyle = o < 0.02 ? "#22D3EE" : e ? "#A78BFA" : "#7C3AED", n.globalAlpha = 0.55 + i() * 0.45, n.fillRect(a, s, 4, 5), n.globalAlpha = 1);
    }
  const r = new nh(t);
  return r.colorSpace = St, r;
}
const ms = {
  "violet-electric": 8141549,
  "silver-moon": 13159896,
  "cyan-signal": 2282478,
  "purple-deep": 3801199
};
function oh(i, e = []) {
  const t = fs(40805), n = new th();
  n.background = new Ve(ds), n.fog = new rr(ds, 0.03), n.add(new sh(3801199, 1.4));
  const r = new hs(8141549, 0.7);
  r.position.set(30, 60, 10), n.add(r);
  const s = new hs(13159896, 0.25);
  s.position.set(-40, 20, -30), n.add(s);
  const a = new Et(
    new sr(140, 48),
    new Vn({ color: 395784, roughness: 0.9 })
  );
  a.rotation.x = -Math.PI / 2, n.add(a);
  const o = new Ln(1, 1, 1), l = ps(t, !1), c = ps(fs(7), !0), h = new Vn({
    color: ah,
    roughness: 0.6,
    metalness: 0.2,
    emissive: 16777215,
    emissiveMap: l,
    emissiveIntensity: 0.9
  }), d = h.clone();
  d.emissiveMap = c, d.emissiveIntensity = 1.2;
  const f = new Vn({ color: 461834, roughness: 1 });
  function m(v, I, b, R, C, S) {
    const g = new Et(o, S);
    return g.scale.set(b, R, C), g.position.set(v, R / 2, I), g.rotation.y = (t() - 0.5) * 0.04, n.add(g), g;
  }
  for (let v = -5; v <= 5; v++)
    for (let I = -5; I <= 5; I++) {
      const b = v * 9, R = I * 9, C = Math.hypot(b, R);
      if (C < 12) continue;
      const S = 2 + Math.floor(t() * 2);
      for (let g = 0; g < S; g++) {
        const w = 2.4 + t() * 2.6, z = 2.4 + t() * 2.6, O = 5 + t() * 14 + (C > 30 ? t() * 8 : 0);
        m(b + (t() - 0.5) * 4.5, R + (t() - 0.5) * 4.5, w, O, z, h);
      }
    }
  for (let v = 0; v < Math.PI * 2; v += 0.16) {
    const I = 62 + t() * 22;
    m(
      Math.cos(v) * I,
      Math.sin(v) * I,
      5 + t() * 6,
      18 + t() * 26,
      5 + t() * 6,
      f
    );
  }
  const M = /* @__PURE__ */ new Map(), E = i.filter((v) => v !== "arrival");
  E.forEach((v, I) => {
    const b = I / E.length * Math.PI * 2 - Math.PI / 2, R = Math.cos(b) * 24, C = Math.sin(b) * 24, S = 20 + t() * 6;
    m(R, C, 5, S, 5, d), M.set(v, new F(R, S * 0.55, C));
  }), M.set("arrival", new F(0, 2.5, 0));
  const p = new Et(
    new ar(0.25, 0.25, 9, 12),
    new Vn({
      color: 13159896,
      emissive: 8141549,
      emissiveIntensity: 0.7
    })
  );
  p.position.set(0, 4.5, 0), n.add(p);
  const u = M.get("projects") || new F(0, 3, -24), A = [], y = new lr(0.6);
  return e.slice(0, 8).forEach((v, I) => {
    const b = ms[v.accent] ?? ms["violet-electric"], R = new Et(
      y,
      new Vn({ color: b, emissive: b, emissiveIntensity: 0.9 })
    );
    R.name = "beacon";
    const C = (I - (e.length - 1) / 2) * 2.2, S = u.clone().setY(0).normalize(), g = new F(-S.z, 0, S.x), w = u.clone().setY(2.2).add(S.clone().multiplyScalar(-7)).add(g.multiplyScalar(C));
    R.position.copy(w), n.add(R), A.push({ id: v.id, object: v.object || "", position: w });
  }), { scene: n, anchors: M, beacons: A };
}
const lh = (i) => 1 - Math.pow(1 - i, 3), ch = 1100;
class uh {
  constructor(e, t) {
    this.camera = new bt(58, e, 0.1, 220), this.nodes = /* @__PURE__ */ new Map(), this.current = "arrival", this.tween = null, this.nodes.set("arrival", {
      pos: new F(0, 3, 10),
      look: new F(0, 8, -26)
    });
    for (const [n, r] of t) {
      if (n === "arrival") continue;
      const s = r.clone().setY(0).normalize().multiplyScalar(-20);
      this.nodes.set(n, {
        pos: new F(r.x + s.x, 3.4, r.z + s.z),
        look: new F(r.x, r.y * 0.35, r.z)
      });
    }
    this.applyNode("arrival");
  }
  applyNode(e) {
    const t = this.nodes.get(e);
    t && (this.camera.position.copy(t.pos), this.camera.lookAt(t.look), this.current = e);
  }
  reducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  /**
   * Tween to a node. Resolves when arrived. A new call retargets smoothly
   * (no queuing walls — docs/plan/07 §22 interruption rule).
   * @param {string} id
   * @param {() => void} requestRender called every tween frame
   * @returns {Promise<void>}
   */
  goTo(e, t) {
    const n = this.nodes.get(e);
    if (!n) return Promise.resolve();
    if (this.reducedMotion())
      return this.applyNode(e), t(), Promise.resolve();
    const r = this.camera.position.clone(), s = this.camera.quaternion.clone(), a = this.camera.clone();
    a.position.copy(n.pos), a.lookAt(n.look);
    const o = a.quaternion.clone(), l = performance.now();
    return this.current = e, new Promise((c) => {
      const h = (d) => {
        if (this.current !== e) return c();
        const f = Math.min(1, (d - l) / ch), m = lh(f);
        this.camera.position.lerpVectors(r, n.pos, m), this.camera.quaternion.slerpQuaternions(s, o, m), t(), f < 1 ? this.tween = requestAnimationFrame(h) : c();
      };
      this.tween = requestAnimationFrame(h);
    });
  }
}
function hh(i, e, t, n, r) {
  const s = [], a = new F();
  for (const l of e) {
    const c = t.get(l.id);
    if (!c) continue;
    const h = document.createElement("button");
    h.type = "button", h.className = "cian-hotspot", h.dataset.district = l.id, h.textContent = l.label, h.style.cssText = "position:absolute;transform:translate(-50%,-50%);min-width:44px;min-height:44px;padding:8px 14px;border-radius:999px;border:1px solid rgba(200,205,216,.35);background:rgba(11,16,16,.78);color:#F5F7FA;font:500 14px 'Space Grotesk',system-ui,sans-serif;cursor:pointer;backdrop-filter:blur(6px)", h.addEventListener("click", () => r(l)), i.appendChild(h), s.push({ btn: h, anchor: c });
  }
  function o() {
    const l = i.clientWidth, c = i.clientHeight;
    for (const { btn: h, anchor: d } of s) {
      a.copy(d).project(n);
      const f = a.z > 1;
      h.style.display = f ? "none" : "", f || (h.style.left = (a.x + 1) / 2 * l + "px", h.style.top = (1 - a.y) / 2 * c + "px");
    }
  }
  return { update: o };
}
function dh(i) {
  const e = window.devicePixelRatio || 1;
  return Math.min(e, 1.5);
}
class fh {
  /** @param {() => void} renderFn */
  constructor(e, t) {
    this.renderFn = e, this.needsRender = !1, this.visible = !0, this.inViewport = !0, this.raf = 0, document.addEventListener("visibilitychange", () => {
      this.visible = document.visibilityState === "visible", this.visible && this.invalidate();
    }), "IntersectionObserver" in window && new IntersectionObserver((n) => {
      this.inViewport = n.some((r) => r.isIntersecting), this.inViewport && this.invalidate();
    }).observe(t), this.tick = this.tick.bind(this), this.raf = requestAnimationFrame(this.tick);
  }
  /** Mark the scene dirty — it will render on the next frame. */
  invalidate() {
    this.needsRender = !0;
  }
  tick() {
    this.needsRender && this.visible && this.inViewport && (this.needsRender = !1, this.renderFn()), this.raf = requestAnimationFrame(this.tick);
  }
  dispose() {
    cancelAnimationFrame(this.raf);
  }
}
const ph = [
  { id: "arrival", label: "Arrival Platform", url: "/" },
  { id: "projects", label: "Project Sector", url: "/projects/" },
  { id: "knowledge", label: "Knowledge Archive", url: "/guides/" },
  { id: "studio", label: "Tutorial Studio", url: "/videos/" },
  { id: "lab", label: "Review Laboratory", url: "/reviews/" },
  { id: "identity", label: "Identity Chamber", url: "/about/" },
  { id: "relay", label: "Communications Relay", url: "/contact/" },
  { id: "experimental", label: "Experimental Sector", url: "/lab/" }
];
let _s = !1;
async function mh(i = {}) {
  if (_s) return;
  const e = document.getElementById("district-root");
  if (!e) return;
  _s = !0;
  let t = ph, n = [];
  if (i.endpoint)
    try {
      const f = await (await fetch(i.endpoint, { credentials: "omit" })).json();
      Array.isArray(f.districts) && f.districts.length && (t = f.districts), Array.isArray(f.beacons) && (n = f.beacons);
    } catch {
    }
  const { scene: r, anchors: s } = oh(t.map((d) => d.id), n), a = new eh({ antialias: !0 });
  a.setPixelRatio(dh()), a.setSize(e.clientWidth, e.clientHeight || 480), a.domElement.setAttribute("aria-hidden", "true"), a.domElement.style.cssText = "display:block;width:100%;height:100%;opacity:0;transition:opacity .6s ease", e.style.position = "relative", e.appendChild(a.domElement);
  const o = document.createElement("div");
  o.className = "cian-world-overlay", o.style.cssText = "position:absolute;inset:0;overflow:hidden;pointer-events:none", e.appendChild(o), o.addEventListener("click", () => {
  }, !0);
  const l = new uh(e.clientWidth / (e.clientHeight || 480), s), c = new fh(() => {
    a.render(r, l.camera), h.update();
  }, a.domElement), h = hh(o, t, s, l.camera, (d) => {
    if (l.current === d.id && d.id !== "arrival") {
      window.location.assign(d.url);
      return;
    }
    l.goTo(d.id, () => c.invalidate()).then(() => {
      window.cianAnnounce && window.cianAnnounce("Arrived at " + d.label);
    });
  });
  for (const d of o.querySelectorAll(".cian-hotspot"))
    d.style.pointerEvents = "auto";
  window.addEventListener("cian:world:hub", () => l.goTo("arrival", () => c.invalidate())), window.addEventListener("cian:world:reset", () => {
    l.applyNode(l.current), c.invalidate();
  }), window.addEventListener("resize", () => {
    const d = e.clientWidth, f = e.clientHeight || 480;
    l.camera.aspect = d / f, l.camera.updateProjectionMatrix(), a.setSize(d, f), c.invalidate();
  }), c.invalidate(), requestAnimationFrame(() => {
    a.domElement.style.opacity = "1";
  }), window.__cianWorldDebug = { rig: l, renderer: a, scene: r, districts: t };
}
export {
  mh as initDistrict
};
