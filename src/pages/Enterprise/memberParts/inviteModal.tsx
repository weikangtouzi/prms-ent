import type { FC } from 'react';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';

type OperationModalProps = {
  visible: boolean;
  onSubmit: (values: Enterprise.invite_data) => void;
  onCancel: () => void;
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const InviteModal: FC<OperationModalProps> = (props) => {
  const { visible, onSubmit, children,onCancel } = props;
  if (!visible) {
    return null;
  }
  return (
    <ModalForm<Enterprise.invite_data>
      visible={visible}
      {...formItemLayout}
      title='邀请成员'
      layout={'horizontal'}
      width={640}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      initialValues={{}}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onCancel(),
        destroyOnClose: true,
      }}
    >
      {
        <>
          <ProFormText
            name="phoneNumber"
            label="手机号"
            rules={[
              { required: true, message: '请输入被邀请人手机号' },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误',
              },
            ]}
            placeholder="请输入被邀请人手机号"
          />

          <ProFormSelect
            name="role"
            label="角色"
            valueEnum={{
              HR: 'HR',
              Teacher: '老师',
              Admin: '管理员',
              None: '无角色',
            }}
          />
          {/*<ProFormSelect*/}
          {/*  name="pos"*/}
          {/*  label="职位"*/}
          {/*  valueEnum={{*/}
          {/*    1: '行业资讯',*/}
          {/*    2: '新闻资讯',*/}
          {/*  }}*/}
          {/*/>*/}
        </>
      }
    </ModalForm>
  );
};

export default InviteModal;
