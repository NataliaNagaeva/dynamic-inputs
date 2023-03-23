const generateClasses = (defaultClass: string) => 
  (childClass = '', props: Record<string, boolean> = {}, additionalClassName = '') => {
    const baseClass = childClass ? `${defaultClass}__${childClass}` : defaultClass;
    const classes = [baseClass];

    Object.keys(props).forEach(propName => {
      if(props[propName]) {
        classes.push(`${baseClass}--${propName}`);
      }
    });

    if(additionalClassName) {
      classes.push(additionalClassName);
    }

    return classes.join(' ');
  }

export default generateClasses;
