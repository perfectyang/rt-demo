import { Modal, ModalProps } from "@arco-design/web-react";
import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import { renderToBody } from "./renderToBody";

export type IModalConfig = {
  content?: React.ReactNode;
} & ModalProps;

export type HookModalRef = {
  update: (config: IModalConfig) => void;
  modalVisible: (bool: boolean) => void;
};

const HookModal = forwardRef<HookModalRef, IModalConfig>((props, ref) => {
  const [visible, setVisible] = useState(props.visible);
  const [config, setConfig] = useState<IModalConfig>(props);

  useImperativeHandle(ref, () => ({
    update: (config: IModalConfig) => {
      setConfig((prv) => ({
        ...prv,
        ...config,
      }));
    },
    modalVisible: (bool) => {
      setVisible(bool);
    },
    onCancel,
    onOk,
  }));

  function onOk() {
    const ret = config.onOk && config.onOk();
    if (ret && ret.then) {
      setConfig((config) => ({
        ...config,
        confirmLoading: true,
      }));
      ret.then(
        () => {
          setVisible(false);
          setConfig((config) => ({
            ...config,
            confirmLoading: false,
          }));
        },
        (e: Error) => {
          console.error(e);
          setConfig((config) => ({
            ...config,
            confirmLoading: false,
          }));
        }
      );
    }
    if (!ret) {
      setVisible(false);
    }
  }

  function onCancel() {
    config.onCancel && config.onCancel();
    setVisible(false);
  }

  const { content, ...retProps } = props;

  const modalConfig = {
    ...retProps,
    maskClosable: config.maskClosable ?? false,
  };

  console.log("modalConfig", modalConfig);
  return (
    <Modal {...modalConfig} visible={visible} onOk={onOk} onCancel={onCancel}>
      {visible && content}
    </Modal>
  );
});

export function configModal(props: IModalConfig) {
  let unMount: any = null;
  const ref = React.createRef<HookModalRef>();
  const Wrapper = () => {
    return (
      <HookModal
        ref={ref}
        {...props}
        afterClose={() => {
          unMount?.();
          props.afterClose?.();
        }}
      />
    );
  };
  return {
    renderModal: () => {
      unMount = renderToBody(<Wrapper />);
      return ref;
    },
  };
}

const useDialog = () => {
  const ModalRef = useRef<any>(null);
  const modalVisible = (bool: boolean) => {
    ModalRef.current?.current?.modalVisible(bool);
  };
  const updateDialog = (config: IModalConfig) => {
    ModalRef.current?.current?.update({ ...config });
  };

  const openDialog = (config: IModalConfig) => {
    ModalRef.current = configModal({
      ...config,
      visible: config.visible ?? true,
    }).renderModal();
  };

  return { modalVisible, openDialog, updateDialog } as const;
};

export default useDialog;
