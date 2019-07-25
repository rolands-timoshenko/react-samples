/**
 * Help manage component classes. For ex. When component has it's own classes prop and modificators which are added dynamicaly, and also passed classes prop form parent.
 * So this function takes care to add modificators exactly to local classes keys.
 * @param {object} classes For ex. {root: "Local-classname Parent-classname", input: '...'}
 * @param {array} modificators For ex. ['small', 'default']
 */
export const adjustClasses = (classes, modificators, classKeys = []) => {
  Object.keys(classes).forEach(key => {
    if (classKeys.length > 0) {
      if (classKeys.includes(key)) classes[key] = adjustClass(classes[key]);
    } else classes[key] = adjustClass(classes[key]);
  });

  function adjustClass(classNames) {
    classNames = classNames.split(" ");
    modificators.forEach(modificator => {
      modificator && classNames.push(`${classNames[0]}--${modificator}`);
    });
    return classNames.join(" ");
  }

  return classes;
};
