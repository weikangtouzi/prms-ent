declare namespace Region {
  // 省
  interface Province {
    name: string
    province_id?: string,
    id?: string,
    isLeaf: boolean
  }

  // 市
  interface City {
    name: string
    city_id?: string,
    id?: string,
  }

  // 区
  interface County {
    name: string
    county_id?: string,
    id?: string,
  }

  // 镇
  interface Town {
    name: string
    town_id?: string,
    id?: string,
  }
}
