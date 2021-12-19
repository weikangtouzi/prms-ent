import {gql} from "@apollo/client";

// 获取省的数据
export const GET_PROVINCE_DATA = gql`
  query get_province_data {
    StaticGetProvinces{
      id:province_id,
      province_id,
      name
    }
  }
`;
// 根据省id获取市的数据
export const GET_CITY_DATA = gql`
  query get_city_data($provinceId:String!) {
    StaticGetCities(provinceId: $provinceId){
      id:city_id,
      city_id,
      name
    }
  }
`;

// 根据市id获取县区的数据
export const GET_COUNTIES_DATA = gql`
  query get_counties_data($cityId:String!) {
    StaticGetCounties(cityId: $cityId){
      id:county_id,
      county_id,
      name
    }
  }
`;

// 根据市区id获取乡镇的数据
export const GET_TOWN_DATA = gql`
  query get_town_data($countyId:String!) {
    StaticGetTowns(countyId: $countyId){
      id:town_id,
      town_id,
      name
    }
  }
`;
