import { Button, Radio, Result, Table } from 'antd';
import { useState } from 'react';

const MyInterview = () => {
  const [data] = useState([]);
  const columns = [
    {
      title: '面试时间',
      dataIndex: 'name',
    },
    {
      title: '职位',
      dataIndex: 'age',
    },
    {
      title: '面试者',
      dataIndex: 'address',
    },
  ];
  return (
    <div>
      <Radio.Group defaultValue="a">
        <Radio.Button value="a">今天</Radio.Button>
        <Radio.Button value="b">明天</Radio.Button>
        <Radio.Button value="c">一周内</Radio.Button>
      </Radio.Group>
      <div style={{ marginTop: '20px' }}>
        {data.length > 0 ? (
          <Table size={'small'} columns={columns} dataSource={data} />
        ) : (
          <Result
            icon={<img src={'/images/empty_1.png'} alt="no interview" style={{ width: '180px' }} />}
            title="今天还没有安排面试哦～"
            subTitle=""
            extra={<Button disabled type="link">快去挑选心仪的人才</Button>}
          />
        )}
      </div>
    </div>
  );
};

export default MyInterview;
