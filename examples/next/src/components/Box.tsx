import { ElementType, forwardRef, ReactNode } from 'react';
import { PolymorphicComponent, PolymorphicComponentProps, PolymorphicComponentRef } from './types';

const defaultElement = 'div';

export type OwnBoxProps = {
  children?: ReactNode;
};

export type BoxProps<C extends ElementType = 'div'> = PolymorphicComponentProps<C, OwnBoxProps>;

export const Box: PolymorphicComponent<OwnBoxProps> = forwardRef(function RenderBox<
  C extends ElementType = typeof defaultElement,
>({ children, as, ...props }: BoxProps<C>, ref: PolymorphicComponentRef<C>) {
  const Component = as || defaultElement;

  return (
    <Component ref={ref} {...props}>
      {children}
    </Component>
  );
});
