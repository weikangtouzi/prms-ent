import {Form, Input, Row, Col, Button, Card, message} from 'antd';
import {useLayoutEffect} from 'react';
import {tailFormItemLayout, formItemLayout} from '@/common/js/config';
import {ProFormDatePicker, ProFormSelect, ProFormText, ProFormTextArea} from "@ant-design/pro-form";
import FormCascade from "@/components/formCascade";
import UpButton from "@/components/Upload";
import FormSelectTree from "@/components/formSelectTree";
import {useMutation} from "@apollo/client";
import {editEnterpriseBaseInfo} from "@/services/gqls/enterprise";

const Base = (props: Enterprise.InfoProps) => {
  const {
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
    tel,enterprise_logo
  } = props
  const [form] = Form.useForm();

  const [Edit_Enterprise_BaseInfo] = useMutation<void,{info: Enterprise.EditEnterpriseBasicInfo}>(editEnterpriseBaseInfo)

  const onFinish = (values: Enterprise.InfoProps) => {
    console.log(values)
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
          logo:values.enterprise_logo
        }
      }
    }).then(()=>{
      message.success('保存成功').then()
    }).catch(e=>{
      message.error(e.graphQLErrors?.[0].message).then()
    })
  };


  useLayoutEffect(() => {
    // 由于Chrome、iOS10等已不再支持非安全域的浏览器定位请求，为保证定位成功率和精度
    const map = new AMap.Map('container', {
      resizeEnable: true,
      zoom: 7,
    });
    const autoOptions = {
      input: 'keywordAdd',
    };
    // 如果有需要，可以添加关键字搜索
    const auto = new AMap.Autocomplete(autoOptions);
    const placeSearch = new AMap.PlaceSearch({
      map: map,
    });

    function select(e: any) {
      form.setFieldsValue({
        address: e.poi.name,
      });
      placeSearch.setCity(e.poi.adcode);
      placeSearch.search(e.poi.name); //关键字查询查询
    }

    function showInfoClick(e: any) {
      const lng = e.lnglat.getLng();
      const lat = e.lnglat.getLat();
      console.log(lng,lat)
      form.setFieldsValue({
        longitude: lng,
        latitude: lat,
      });
    }

    function searchClick(e: any) {
      const lng = e.data.location.lng;
      const lat = e.data.location.lat;
      form.setFieldsValue({
        longitude: lng,
        latitude: lat,
      });
    }

    AMap.event.addListener(auto, 'select', select);
    AMap.event.addListener(placeSearch, 'markerClick', searchClick);
    map.on('click', showInfoClick);
    return () => {
      map.off('click', showInfoClick);
      AMap.event.removeListener(auto, 'select', select);
      AMap.event.removeListener(placeSearch, 'markerClick', searchClick);
    };
  });

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
            enterprise_logo
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
            <FormSelectTree url='/industry.json'/>
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
            <Form.Item name="region"  >
              <FormCascade/>
            </Form.Item>
            <Form.Item name="address2" >
              <Input placeholder="请输入详细地址"/>
            </Form.Item>
          </Form.Item>

          <Form.Item label="公司定位">
            <Form.Item
              name="longitude"
              style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
            >
              <Input placeholder="经度"/>
            </Form.Item>
            <Form.Item
              name="latitude"
              style={{display: 'inline-block', width: '50%', margin: '0 0 0 8px'}}
            >
              <Input placeholder="纬度"/>
            </Form.Item>
            <Row style={{marginBottom: '10px'}}>
              <Col span={20}>
                <Form.Item
                  name="address"
                  noStyle
                >
                  <Input id="keywordAdd"/>
                </Form.Item>
              </Col>
              <Col span={4} style={{textAlign: 'right'}}>
                <Button type={'primary'}>搜索</Button>
              </Col>
            </Row>
            <div id="container" style={{width: '100%', height: '250px'}}></div>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default Base;
