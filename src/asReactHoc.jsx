import React, { forwardRef } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

const getDisplayName = ({ displayName, name }) => displayName || name || 'Component';

const asReactHoc = (WrappedComponent, Wrapper, options = {}) => {
  const { wrapperProps = {}, hocName } = options;
  const wrappedName = hocName || 'asReactHoc';
  const displayName = `${wrappedName}(${getDisplayName(WrappedComponent)})`;

  const EnhancedComponent = forwardRef((props, ref) => (
    <Wrapper {...wrapperProps}>
      {value => <WrappedComponent {...props} {...value} forwardedRef={ref} />}
    </Wrapper>
  ));

  EnhancedComponent.displayName = displayName;
  EnhancedComponent.WrappedComponent = WrappedComponent;

  return hoistNonReactStatic(EnhancedComponent, WrappedComponent);
};

export default asReactHoc;
