import React, {useState } from 'react';
import {Button, message, Upload} from 'antd';
import {PlusOutlined, UploadOutlined} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import {UploadFileToServer} from '@/services/gqls/file'
import type {UploadRequestOption} from "rc-upload/lib/interface";
import {useMutation} from "@apollo/client";

const UploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>上传图片</div>
  </div>
);
const UpButton: React.FC<{
  value?: string;
  onChange?: (value: string) => void;
}> = ({ value, onChange }) => {
  const [up_file]  = useMutation<ResultDataType<'CommonSingleUpload', fileRes>,{file: File}>(UploadFileToServer)
   const [files, setFiles] = useState<UploadFile<any>[]>(value?[
    {
      uid: '-1',
      name: '图片.png',
      status: 'done',
      url: value,
    },
  ]:[]);

  const upLoad = async (options: UploadRequestOption) => {
    setFiles([
      {
        uid: '-1',
        name: 'image.png',
        status: 'uploading',
        url: value,
      },
    ]);
    const { onSuccess, onError, file,data } = options;
    console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    console.log(file)
    await up_file({
      variables: {
        file: file as File
      }
    })

  };

  const handleChange = async ({ file }: any) => {
    if (file.status == 'removed') {
      setFiles([]);
    }
    if (file.status === 'done') {
      message.success(`${file.name} upload success`);
    } else if (file.status === 'error') {
      message.error(`${file.name} upload failed`);
    }
  };

  const test = (file)=>{
    console.log(file)
     up_file({
      variables: {
        file: file as File
      }
    })
  }

  return (
    <div>
      <Upload
        fileList={files}
        accept="image/*,video/*"
        customRequest={upLoad}
        listType="picture-card"
        onChange={handleChange}
      >
        {files.length >= 1 ? null : UploadButton}
      </Upload>
    </div>
  );
};

export default UpButton;
