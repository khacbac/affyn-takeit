import React, {ReactNode} from 'react';
import {View} from 'react-native';

type IProps = {
  children: ReactNode;
  spacing: number;
  direction?: 'column' | 'row';
};
export const AppSpacing: React.FC<IProps> = ({
  spacing,
  direction = 'column',
  children,
}) => {
  return (
    <>
      {React.Children.map(children, (child: any, index) => {
        return React.cloneElement(child, {
          style: [
            child.props.style,
            {
              ...(direction === 'column' && {
                marginTop: index === 0 ? 0 : spacing,
              }),
              ...(direction === 'row' && {
                marginLeft: index === 0 ? 0 : spacing,
              }),
            },
          ],
        });
      })}
    </>
  );
};
