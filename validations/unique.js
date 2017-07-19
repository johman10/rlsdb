import { getClass } from 'helpers/class-helper';

export default function (classInstance, key) {
  const objectClass = getClass(classInstance);
  const value = classInstance[key];
  return !objectClass.findBy(key, value);
}
