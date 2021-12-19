declare namespace User {
  // 用户信息
  interface UserData {
    createdAt: string;
    token: string;
    username: string;
  }

  interface user {
    createdAt: string;
    token: string;
    username: string;
  }

  // 用户登录参数
  interface UserNameLoginVar {
    info: {
      account: string;
      password?: string;
      deviceId?: string;
    };
  }

  // 获取验证码参数
  interface FakeCodeParams {
    phoneNumber: string;
  }

  // 验证码验证
  interface VerifyCode {
    info: {
      operation: string;
      phoneNumber: string;
      verifyCode: string;
    };
  }

  // 个人信息页获取的个人信息
  interface UserInfo{
    birth_date: string
    current_city: string

    first_time_working: string
    gender: boolean
    image_url: string
    username: string
  }
  // 更新个人信息的时候的参数
  interface UserInfo_Update{
    birthday: number
    currentCity: string
    education:  'LessThanPrime'|'Primary'|'Junior'|'High'|'JuniorCollege'|'RegularCollege'|'Postgraduate'|'Doctor'
    firstTimeWorking: string
    gender: boolean
    logo: string
    username: string
  }
}
