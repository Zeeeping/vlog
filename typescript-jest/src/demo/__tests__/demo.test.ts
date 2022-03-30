// demo.test.ts
import { sum } from '../index'

// jest 命令使用正则匹配文件名或文件目录
// 需要 __tests__ 目录下或者带 spec|test 的文件名
// 使用 yarn test demo(__tests__下测试用例的文件名，本例中就是 demo)
describe('这是测试用例输出的描述', () => {
  it('这是测试用例输出的内容', () => {
    expect(sum(1, 1)).toBe(2)
  })
})