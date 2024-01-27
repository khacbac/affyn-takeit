import React, {
  Fragment,
  ReactNode,
  RefObject,
  createRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {AppColors} from '../assets';

type IProps = {};
interface LoadingModalRef {
  showLoading: () => void;
  hideLoading: () => void;
}
export type ModalManagerRef = LoadingModalRef & {};

class ModalManager implements LoadingModalRef {
  loadingRef: RefObject<LoadingModalRef>;

  constructor() {
    this.loadingRef = createRef<LoadingModalRef>();
  }

  showLoading = () => {
    this.loadingRef.current?.showLoading();
  };

  hideLoading = () => {
    this.loadingRef.current?.hideLoading();
  };
}

export const modalManager = new ModalManager();

const LoadingModal = forwardRef<LoadingModalRef, {}>(({}, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    showLoading() {
      setVisible(true);
    },
    hideLoading() {
      setVisible(false);
    },
  }));

  if (!visible) {
    return null;
  }

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: AppColors.black30,
        },
      ]}>
      <ActivityIndicator size={'large'} color={AppColors.primary} />
    </View>
  );
});

export const ModalProvider = forwardRef<ModalManagerRef, IProps>(({}, ref) => {
  return (
    <Fragment>
      <LoadingModal ref={modalManager.loadingRef} />
    </Fragment>
  );
});
