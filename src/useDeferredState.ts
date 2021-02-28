import React from 'react';

export const useDeferredState = <BaseState>(baseState: BaseState, instantValues: BaseState[] = [], defferFor = 500) => {
  const [deffered, setDeffered] = React.useState(baseState);
  const instantValuesRef = React.useRef(instantValues);

  if (
    instantValues.length !== instantValuesRef.current.length ||
    instantValues.some((value, index) => instantValuesRef.current[index] !== value)
  ) {
    instantValuesRef.current = instantValues;
  }

  const memorizedInstantValues = instantValuesRef.current;

  React.useLayoutEffect(() => {
    const value = baseState;

    if (deffered !== value) {
      if (memorizedInstantValues.includes(value)) {
        setDeffered(value);
      } else {
        const timeout = window.setTimeout(() => {
          setDeffered(value);
        }, defferFor);

        return () => window.clearTimeout(timeout);
      }
    }
  }, [baseState, defferFor, deffered, memorizedInstantValues]);

  if (instantValues.includes(baseState)) {
    return baseState;
  }

  return deffered;
};

export default useDeferredState;
