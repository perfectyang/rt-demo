import { InputTag, Tag, Tooltip } from "@arco-design/web-react";
import React, { useCallback, useEffect } from "react";
import { useMemo } from "react";
import "./tags.css";

interface ILabel {
  label: string;
  value: string;
}
interface IProps {
  value?: (tag: ILabel[]) => any;
  onChange?: (tag: ILabel[]) => any;
}

const RenderTag: React.FC<IProps> = ({ value, onChange }) => {
  const [tagList, setTagList] = React.useState<ILabel[]>(value ?? []);
  const [visible, setVisible] = React.useState(false);
  const tagRef = React.useRef<HTMLDivElement>(null);

  const tagRender = useCallback(
    (props: any) => {
      const { label, value } = props;
      return (
        <Tag
          closable
          onClose={() => {
            setTagList((pre) => {
              const list = pre.filter((p) => p.value !== value);
              return list;
            });
          }}
          style={{ margin: "2px 6px 2px 0", backgroundColor: "#ffffff" }}
        >
          {label}
        </Tag>
      );
    },
    [tagList]
  );

  useEffect(() => {
    onChange?.([...tagList]);
  }, [tagList]);

  const addTags = useMemo(() => {
    return (
      <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          setTagList((pre) => [
            ...pre,
            {
              label: `${Math.random().toFixed(3)}`,
              value: `${Math.random()}`,
            },
          ]);
          computedW();
        }}
      >
        +
      </span>
    );
  }, []);

  const computedW = useCallback(() => {
    // 用最后一个标签的位置信息与可视窗口的宽度比较
    const tagsEl = tagRef.current?.querySelector(".arco-input-tag-inner");
    const tags = tagsEl?.querySelectorAll(".arco-tag");
    const viewElWidth = tagsEl?.getBoundingClientRect().width ?? 0;
    const lastTags = tags?.[tags?.length - 1];
    const tagsInfo = lastTags?.getBoundingClientRect();
    const w = tagsInfo && tagsInfo?.left + tagsInfo?.width;
    return viewElWidth < (w ?? 0);
  }, [tagList]);

  const texts = useMemo(() => {
    return tagList
      .reduce((pre, next) => [...pre, next.label], [] as string[])
      .join(",");
  }, [tagList]);

  return (
    <div
      className="tag-wrap"
      ref={tagRef}
      onMouseOver={() => {
        setVisible(computedW());
      }}
      onMouseLeave={() => {
        setVisible(false);
      }}
    >
      <div className="tag-tip">
        <Tooltip position="top" content={texts} popupVisible={visible}>
          <span className="tag-mark">&nbsp;</span>
        </Tooltip>
        <InputTag
          className="self-render-tags"
          placeholder="请添加标签"
          value={tagList}
          renderTag={tagRender}
          suffix={addTags}
          readOnly
        />
      </div>
    </div>
  );
};

export default RenderTag;
