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
      password: string;
      deviceId?: string
    };
  }

  // 获取验证码参数
   interface  FakeCodeParams{
    phoneNumber: string
  }
}
