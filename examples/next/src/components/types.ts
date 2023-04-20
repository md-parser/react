import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  PropsWithRef,
  ReactElement,
} from "react";

export type PolymorphicComponentProps<
  Component extends ElementType,
  Props = object
> = ComponentPropsWithoutRef<Component> & {
  as?: Component;
} & Props;

export type PolymorphicComponentRef<Component extends ElementType> =
  PropsWithRef<ComponentProps<Component>>["ref"];

export type PolymorphicComponent<Props = object> = <
  Component extends ElementType
>(
  props: PolymorphicComponentProps<Component, Props> & {
    ref?: ComponentPropsWithRef<Component>["ref"];
  }
) => ReactElement | null;

// ---
// NOTE: When using props from an polymorphic component in another polymorphic component
// you need to exclude 'as' prop.
// type ButtonProps = { my: 'props' } & SantizePolymorphicProps<BoxProps>;
// ---

export type SantizePolymorphicProps<T> = Omit<T, "as" | "ref">;
