import React from 'react';
import { Upload, Button, Space } from '@arco-design/web-react';
import "@arco-design/web-react/dist/css/arco.css";

function TestDemo() {
  const uploadRef = React.useRef<any>(null);
  const [disabled, setDisabled] = React.useState(false);
  const [fileList, setFileList] = React.useState<any[]>([]);

  const onSubmit = (e: any, isFirst: any) => {
    e.stopPropagation();
    const file = isFirst ? fileList.filter((x) => x.status === 'init')[0] : null;
    uploadRef.current && uploadRef.current.submit(file);
  };

  const onChange = (files: any) => {
    console.log('files', files)
    setFileList(files);
    setDisabled(!files.some((x: any) => x.status === 'init'));
  };

  const onProgress = (file: any) => {
    setFileList((files) => {
      return files.map((x) => (x.uid === file.uid ? file : x));
    });
  };

  return (
    <Upload
      ref={uploadRef}
      multiple
      autoUpload={false}
      action='/'
      onChange={onChange}
      onProgress={onProgress}
      fileList={fileList}
    >
      <Space size='large'>
        <Button>Select file</Button>
        <Button type='primary' onClick={onSubmit} disabled={disabled}>
          Start upload
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            onSubmit(e, true);
          }}
          disabled={disabled}
        >
          Only upload one
        </Button>
      </Space>
    </Upload>
  );
}

export default TestDemo;
