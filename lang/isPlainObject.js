import isHostObject from '../internal/isHostObject';
import isObjectLike from './isObjectLike';

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to infer the `Object` constructor. */
var objCtorString = fnToString.call(Object);

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Native value references. */
var getPrototypeOf = Object.getPrototypeOf;

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || objToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = typeof value.constructor == 'function'
    ? getPrototypeOf(value)
    : objectProto;

  if (proto === null) {
    return true;
  }
  var Ctor = proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && fnToString.call(Ctor) == objCtorString);
}

export default isPlainObject;
