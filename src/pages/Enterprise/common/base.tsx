import {Form, Input, Button, Card, message} from 'antd';
import {tailFormItemLayout, formItemLayout} from '@/common/js/config';
import {ProFormDatePicker, ProFormSelect, ProFormText, ProFormTextArea} from "@ant-design/pro-form";
import FormCascade from "@/components/formCascade";
import UpButton from "@/components/Upload";
import FormSingleTree from "@/components/FormSingleTree";
import {useMutation} from "@apollo/client";
import {editEnterpriseBaseInfo} from "@/services/gqls/enterprise";
import FormCoordinate from "@/components/FormCoordinate";

const Base = (props: Enterprise.InfoProps) => {
  const {
    enterprise_name,
    abbreviation,
    industry_involved,
    business_nature,
    enterprise_financing,
    enterprise_loc_detail,
    enterprise_size,
    enterprise_profile,
    established_time,
    homepage,
    enterprise_coordinates,
    tel,
    enterprise_logo,
  } = props
  const [form] = Form.useForm();

  const loc_format = enterprise_loc_detail && enterprise_loc_detail.length>=3?enterprise_loc_detail.slice(0,3):[]
  const detail_format =  enterprise_loc_detail && enterprise_loc_detail.length>=1?enterprise_loc_detail.slice(-1)[0]:''
  const [Edit_Enterprise_BaseInfo] = useMutation<void,{info: Enterprise.EditEnterpriseBasicInfo}>(editEnterpriseBaseInfo)

  const onFinish = (values: Enterprise.InfoProps) => {
    const detail = values?.detail_address? [values.detail_address] : []
    console.log(values)
    const loc = values.enterprise_loc_detail && values.enterprise_loc_detail.length>=3?
                values.enterprise_loc_detail.slice(0,3).map(n=>String(n)):[]
    Edit_Enterprise_BaseInfo({
      variables:{
        info:{
          enterpriseName:enterprise_name,
          abbreviation:values.abbreviation,
          enterpriseIndustry:values.industry_involved,
          enterpriseNature:values.business_nature,
          enterpriseFinancing:values.enterprise_financing,
          enterpriseSize:values.enterprise_size,
          enterpriseProfile:values.enterprise_profile,
          establishedDate:values.established_time,
          homepage:values.homepage,
          enterprisecCoordinate:values.enterprise_coordinates,
          tel:values.tel,
          logo:values.enterprise_logo,
          enterpriseLocation:[...loc,...detail]
        }
      }
    }).then(()=>{
      message.success('保存成功').then()
    }).catch(e=>{
      message.error(e.graphQLErrors?.[0].message).then()
    })
  };


  return (
    <Card>
      <div className="mx560">
        <Form
          {...formItemLayout}
          form={form}
          name="base"
          onFinish={onFinish}
          initialValues={{
            enterprise_name,
            abbreviation,
            industry_involved,
            business_nature,
            enterprise_financing,
            enterprise_size,
            enterprise_profile,
            established_time,
            homepage,
            enterprise_coordinates,
            tel,
            enterprise_logo,
            enterprise_loc_detail:loc_format,
            detail_address:detail_format
          }}
          scrollToFirstError
        >
          <ProFormText name="enterprise_name" label="全称" readonly={true}/>
          <Form.Item
            name="enterprise_logo"
            label="Logo"
            extra="只支持.jpg/.png格式(单张)"
          >
           <UpButton/>
          </Form.Item>
          <Form.Item
            name="abbreviation"
            label="简称"
            tooltip="简称只能选择全称里面的文字"
            rules={[
              ({getFieldValue}) => ({
                validator(_, value) {
                  const fullName = getFieldValue('enterprise_name');
                  if (value) {
                    const texts = value.split('');
                    for (let i = 0; i < texts.length; i++) {
                      if (fullName.indexOf(texts[i]) < 0) {
                        return Promise.reject(new Error('简称只能选择全称里面的文字!'));
                      }
                    }
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('简称只能选择全称里面的文字!'));
                },
              }),
            ]}
          >
            <Input placeholder={'请输入简称'}/>
          </Form.Item>

          <Form.Item
            name="industry_involved"
            label="所在行业"
          >
            {/*<FormSingleTree url='/industry.json'/>*/}
            <FormSingleTree url='https://be.chenzaozhao.com/preludeDatas/industry_category.json'/>
          </Form.Item>
          <ProFormSelect
            options={[
              {
                value: 'ForeignVentures',
                label: '外资企业',
              },
              {
                value: 'ForeignFundedEnterprises',
                label: '外商投资企业',
              },
              {
                value: 'PrivateEnterprise',
                label: '民营企业',
              },
              {
                value: 'StateOwnedEnterprises',
                label: '国有企业',
              },
              {
                value: 'Extra',
                label: '其他企业',
              },
            ]}
            name="business_nature"
            label='企业性质'
          />
          <ProFormSelect
            options={[
              {
                value: 'A',
                label: 'A轮',
              },
              {
                value: 'B',
                label: 'B轮',
              },
              {
                value: 'C',
                label: 'C轮',
              },
              {
                value: 'D',
                label: 'D轮',
              },
              {
                value: 'Listed',
                label: '已上市',
              },
              {
                value: 'NoNeed',
                label: '不需要融资',
              },
            ]}
            name="enterprise_financing"
            label='融资阶段'
          />
          <ProFormSelect
            options={[
              {
                value: 'LessThanFifteen',
                label: '15人以下',
              },
              {
                value: 'FifteenToFifty',
                label: '15-50人',
              },
              {
                value: 'FiftyToOneHundredFifty',
                label: '50-100人',
              },
              {
                value: 'OneHundredFiftyToFiveHundreds',
                label: '100-500人',
              },
              {
                value: 'FiveHundredsToTwoThousands',
                label: '500-2000人',
              },
              {
                value: 'MoreThanTwoThousands ',
                label: '2000人以上',
              },
            ]}
            name="enterprise_size"
            label='人员规模'
          />
          <ProFormTextArea label='基本介绍' name='enterprise_profile'/>
          <ProFormDatePicker label='公司成立时间' name='established_time' width='lg'/>
          <ProFormText label='公司官网' name='homepage'/>
          <ProFormText label='座机号码' name='tel'/>
          <Form.Item label="公司地址" style={{marginBottom: '0'}}>
            <Form.Item name="enterprise_loc_detail"  >
              <FormCascade/>
            </Form.Item>
            <Form.Item name="detail_address" >
              <Input placeholder="请输入详细地址"/>
            </Form.Item>
          </Form.Item>

          <Form.Item label="公司定位" name='enterprise_coordinates'>
            <FormCoordinate/>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className='sumbitBtn'>
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default Base;
