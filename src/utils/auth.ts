// mock登录账号密码
export const authInfo ={
  account: ['hsc505','hsc506','hsc507','hsc508','hsc509'],
  password:['Hszy123!@#']
}


// 获取token localstorage
export function getUseLocalToken(name: string): string {
  try {
    if (!localStorage.getItem(name) || localStorage.getItem(name) === 'undefined') {
      return '';
    }
    return JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem(name))));
  } catch (error) {
    return '';
  }
}
// 获取token
export function getToken(): string {
  return getUseLocalToken('hs-token') || '';
}
// 设置token
export function setToken(val:any):void {
  localStorage.setItem('hs-token', JSON.stringify(val));
}

// 获取 account
export function getAccount(): string {
  return getUseLocalToken('hs-account') || '';
}

// 获取 pawwword
export function getPassword(): string {
  return getUseLocalToken('hs-password') || '';
}

export function LoginValid():boolean {
  const account: string = getAccount();
  const password: string = getPassword();
  const accountMatch = authInfo.account?.includes(account);
  const passwordMatch = authInfo.password?.includes(password);
  console.log({account,password,accountMatch,passwordMatch});
  return account && password && accountMatch && passwordMatch
}
