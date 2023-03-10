import {
  Form,
  Input,
  Radio,
  InputNumber,
  Select,
  FormItemProps,
  Grid,
  FormProps,
} from "@arco-design/web-react";
import React, { useEffect, useRef } from "react";
import { useUpdate, useMemoizedFn, useMap, useUpdateEffect } from "ahooks";
import { IForm, IFormCmpRef } from "./types";

const uid = (key = "") => `${key}-${Math.random()}`;
// 组件
const FormItem = Form.Item;
const { Row, Col } = Grid;
// 组件注册
export const Components = {
  InputNumber,
  Input,
  RadioGroup: Radio.Group,
  Select,
};

const computedLabelWidth = <T extends FormItemProps>(
  item: T,
  inline: boolean
) => {
  const { labelCol, wrapperCol } = item;
  const labelSpan = inline ? {} : { flex: "120px" };
  const wrapperSpan = inline ? {} : { flex: "auto" };
  return {
    labelCol: { ...labelSpan, ...labelCol },
    wrapperCol: {
      style: inline ? { width: "100%" } : { width: `calc(100% - 120px)` },
      ...wrapperSpan,
      ...wrapperCol,
    },
  };
};

const handleSelectConfig = (schema) => {
  const isSelect =
    schema.component && ["Select", "TreeSelect"].includes(schema.component);
  const selectConfig = {
    allowClear: true,
    showSearch: true,
    filterOption: (inputValue, option) => {
      return (
        option.props.children?.toLowerCase().indexOf(inputValue.toLowerCase()) >
          -1 ||
        option.props.value?.toLowerCase().indexOf(inputValue.toLowerCase()) >
          -1 ||
        option.props.title?.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      );
    },
  };
  const ob = isSelect ? selectConfig : {};
  return ob;
};

const handleComponentProps = (componentProps, retProps, params) => {
  if (componentProps && componentProps.onChange) {
    const _onChange = componentProps.onChange;
    componentProps.onChange = (val) => {
      retProps.onChange(val);
      _onChange(val, params);
    };
  }
};

// 渲染不同组件
const RenderComponent = ({ schema, form, setOptions, values, ...retProps }) => {
  const RenderComp = Components[schema.component];
  const componentProps = schema.componentProps ?? {};
  const params = { schema, form, setOptions, values, ...retProps };
  if (schema.render) {
    return schema.render(params);
  }

  handleComponentProps(componentProps, retProps, params);

  return (
    <RenderComp
      {...retProps}
      {...componentProps}
      {...handleSelectConfig(schema)}
      form={Object.assign({}, form, { setOptions })}
    />
  );
};

const FormCmp = React.forwardRef<IFormCmpRef, IForm>((props, ref) => {
  const { schemaList, formProps = {}, extraNode, prefixNode } = props;
  const [form] = Form.useForm();
  const foreUpdate = useUpdate();
  const random = uid();
  const [options, { set: optSet, get: optGet }] = useMap();

  const layoutType = React.useMemo(() => {
    return formProps.layout ?? "horizontal";
  }, []);

  const setSchema = useMemoizedFn((ob, callback?) => {
    schemaList.forEach((schema: any) => {
      if (ob[schema.field] && schema.componentProps?.options) {
        callback?.(schema);
        schema.componentProps.options = [...ob[schema.field]];
      }
    });
  });

  const setOptions = useMemoizedFn((ob) => {
    setSchema(ob, (schema) => {
      optSet(schema.field, [...ob[schema.field]]);
    });
    foreUpdate();
  });

  useUpdateEffect(() => {
    const keys: any[] = Array.from(options.keys());
    keys.forEach((key) => {
      const ob = {
        [key]: optGet(key),
      };
      setSchema(ob);
    });
    foreUpdate();
  }, [schemaList]);

  React.useImperativeHandle(ref, () => ({
    getForm: () => {
      return { ...form, setOptions };
    },
  }));

  const _formProps: FormProps = {
    form,
    layout: layoutType,
    size: formProps.size ?? "small",
    style:
      layoutType === "inline" ? { width: "100%", display: "inline-block" } : {},
    validateMessages: {
      required: (_: any, { label }) => `请输入(选择)${label}！`,
    },
    ...formProps,
  };

  return (
    <Form {..._formProps}>
      <Row>
        {prefixNode}
        {schemaList.map((schema, idx) => {
          const {
            shouldUpdate = false,
            colProps = {},
            renderCondition,
          } = schema;
          const { labelCol, wrapperCol } = computedLabelWidth(
            schema,
            layoutType === "inline"
          );
          const _colProps = {
            ...colProps,
            key: `col-${random}-${idx + 1}`,
          };

          return (
            <Col {..._colProps}>
              <Form.Item shouldUpdate={shouldUpdate} noStyle>
                {(values) => {
                  const renderConditionFn =
                    renderCondition?.(values, schema) ?? true;
                  return renderConditionFn ? (
                    <FormItem
                      label={schema.label}
                      field={schema.field}
                      rules={schema.rules ?? []}
                      labelCol={labelCol}
                      wrapperCol={wrapperCol}
                      {...(schema.formItemProps ?? {})}
                    >
                      <RenderComponent
                        schema={schema}
                        form={form}
                        setOptions={setOptions}
                        values={values}
                      />
                    </FormItem>
                  ) : null;
                }}
              </Form.Item>
            </Col>
          );
        })}
        {extraNode}
      </Row>
    </Form>
  );
});

export default FormCmp;
