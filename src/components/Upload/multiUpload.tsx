import React, {useState} from 'react';
import {Button, message, Upload} from 'antd';
import {PlusOutlined, UploadOutlined} from '@ant-design/icons';
import type {UploadRequestOption} from "rc-upload/lib/interface";

const UploadButton = (
  <div>
    <PlusOutlined/>
    <div style={{marginTop: 8}}>上传图片</div>
  </div>
);
const MultipleUpload: React.FC<{
  value?: string[];
  max?: number;
  accept?: string
  onChange?: (value: string[]) => void;
}> = ({value, onChange,max=1,accept='image/*,video/*'}) => {
  const [files, setFiles] = useState<any[]>(()=>{
    if(!value || value.length<=0) return []
    return value.map((v)=>{
      return {
        uid: new Date().getTime()+Math.random(),
        name: v,
        status: 'done',
        url: v,
      }
    })
  });


  const upLoad = async (options: UploadRequestOption) => {
    setFiles([
      ...files,
      {
        uid: '-1',
        name: accept==='video/*'?'video.mp4':'image.png',
        status: 'uploading',
        percent: 5,
        url: '',
      },
    ]);
    const {onSuccess, onError, file,} = options;
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    HTAPI.CommonSingleUpload(file).then(res => {
      const url = res.data?.CommonSingleUpload || ''
      setFiles((f: any[])=>{
        return [
          ...f.filter(i=>i.status==='done'),
          {
          uid:new Date().getTime(),
          name: url,
          status: 'done',
          percent: 100,
          url: url,
        }]
      });
      // @ts-ignore
      onSuccess?.()
      if (onChange) {
        const urls = [
          ...files.map(f=>f.url||''),
          url
        ]
        onChange(urls)
      }
    })
  };

  const handleChange = async ({file}: any) => {
    if (file.status == 'removed') {
      const newFiles = files.filter(f=>f.uid!==file.uid)
      setFiles(newFiles)
      if(onChange){
        onChange(newFiles.map(f=>f.url))
      }
    }
    if (file.status === 'done') {
      message.success(`${file.name} 上传成功`);
    } else if (file.status === 'error') {
      message.error(`${file.name} 上传失败`);
    }
  };

  return (
    <div>
      <Upload
        fileList={files}
        accept={accept?accept:'image/*,video/*'}
        customRequest={upLoad}
        listType={accept==='video/*'?'text':'picture-card'}
        progress={{
          strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
          },
          strokeWidth: 3,
        }}
        onChange={handleChange}
      >
        {files.length >= max ? null : <>
          {accept==='video/*'?<Button icon={<UploadOutlined />}>上传视频</Button>: UploadButton}
        </>}
      </Upload>
    </div>
  );
};

export default MultipleUpload;
