import React, {useState} from 'react';
import {message, Upload} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import type {UploadFile} from 'antd/es/upload/interface';
import type {UploadRequestOption} from "rc-upload/lib/interface";

const UploadButton = (
  <div>
    <PlusOutlined/>
    <div style={{marginTop: 8}}>上传图片</div>
  </div>
);
const UpButton: React.FC<{
  value?: string;
  onChange?: (value: string) => void;
}> = ({value, onChange}) => {
  const [files, setFiles] = useState<UploadFile<any>[]>(value ? [
    {
      uid: '-1',
      name: '图片.png',
      status: 'done',
      url: value,
    },
  ] : []);


  const upLoad = async (options: UploadRequestOption) => {
    setFiles([
      {
        uid: '-1',
        name: 'image.png',
        status: 'uploading',
        percent: 5,
        url: value,
      },
    ]);
    const {onSuccess, onError, file,} = options;
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    HTAPI.CommonSingleUpload(file).then(res => {
      const url = res.data?.CommonSingleUpload || ''
      setFiles([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          percent:100,
          url: url,
        },
      ]);
      // @ts-ignore
      onSuccess?.()
      if (onChange) {
        onChange(url)
      }
    })
  };

  const handleChange = async ({file}: any) => {
    if (file.status == 'removed') {
      setFiles([]);
      onChange?.('')
    }
    if (file.status === 'done') {
      message.success(`${file.name} upload success`);
    } else if (file.status === 'error') {
      message.error(`${file.name} upload failed`);
    }
  };

  return (
    <div>
      <Upload
        fileList={files}
        accept="image/*,video/*"
        customRequest={upLoad}
        listType="picture-card"
        progress={{
          strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
          },
          strokeWidth: 3,
        }}
        onChange={handleChange}
      >
        {files.length >= 1 ? null : UploadButton}
      </Upload>
    </div>
  );
};

export default UpButton;
