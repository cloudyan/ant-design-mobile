interface ModalProps {
  title?: string;
  visible: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  footer?: Array<{}>;
  onClose?: () => void;
  onShow?: () => void;
  animated?: boolean;
  transparent?: boolean;
  style?: {};
  /** react native only **/
  onRequestClose?: () => void;
  /** web only */
  prefixCls?: string;
  transitionName?: string;
  maskTransitionName?: string;
  className?: string;
  wrapClassName?: string;
  bodyStyle?: {};
  touchFeedback?: boolean;
};

export default ModalProps;
