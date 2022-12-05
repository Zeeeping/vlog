# React-TypeScript

本文侧重点在于「React 和 TypeScript 的结合」, 分号可以省略

### 组件 Props

#### 定义 Props 常用类型

##### 基础类型

```ts
type BaseProps = {
  name: string;
  age: number;
  onLine: boolean;
  // 数组类型
  girlfriends: string[];
  // 联合类型 [字符串字面量], 只能是两者之一
  hobby: "gent" | "female";
  // 可以参数类型
  optional?: OptionalType;
};
```

##### 对象类型

```ts
type ObjectOrArrayProps = {
  // ❌ 不推荐: 对不需要用到具体属性, 可以抽象成对象
  obj1: object;
  // ❌ 不推荐: 同理
  obj2: {};
  // ✅ 推荐: 定义具体属性
  obj: {
    height: number;
    weight: string;
  };
  // ✅ 推荐: 定义具体属性对象数组
  objArr: {
    height: number;
    weight: string;
  }[];
  // ✨ 特殊: key 可以为任意 string 类型的键值, 值限制为 ZepType 类型
  objCustom: {
    [key: string]: ZepType;
  };
  // ✨ 特殊: 同上 使用了 TS 内置的 Record 类型(键值对)
  objDict: Record<string, ZepType>;
};
```

##### 函数类型

```ts
type FunctionProps = {
  // ❌ 不推荐: 不能规定参数以及返回值类型
  onSomethingFn: Function;
  // ✅ 推荐: 没有参数的函数, 不需要返回值(可以省略)
  onclick: () => void;
  // ✅ 常用: 带参数的函数, 不需要返回值(可以省略)
  onChangeById: (id: number) => void;
  // 💻 简写
  scrollToTop?(top: number): void;
  // ✅ 常用: 参数是 React 的按钮事件
  onClick: (event: React.MouseEvent<HTMLButtonElement>): void;
};
```

#### 来实现一个类型过滤

```ts
// 首先熟悉一下, keyof 和 extends 以及动态赋值的用法
type Mask<Source, Types> = {
  // in 用来遍历可枚举类型
  [K in keyof Source]: Source[K] extends Types ? K : never
}

type Example = {
  name: string
  age: number
}
interface IExample {
  name: string
  age: number
}

type newType = Mask<Example, string>
type newI = Mask<IExample, string>

// 两者相同都可以生成 { name: "name"; age: never; }
// 生成这个 type 就可以利用索引访问 type 属性
```

##### 索引访问 type 属性

```ts
// type 才能写表达式, interface 只能写接口形状
type User = {
  name: 'Zep'
  height: 178
  money: never
  // ✨ 但是如果 value 是 never, 就不会返回
}['name' | 'height' | 'money']
// 等价于(字符串字面量类型)
type User = 'Zep' | 178

const func = (user: User) => {}
func('Zep')

// ✨ interface 采用上述语法会报错
interface IUser {
  name: 'Zep'
  height: 178
  money: never
  // ✨ 这种方式会报错, 使用逗号分割(['name', 'height', 'money'])会通过, 但是不起任何作用, 接口还是需要传递相应类型
  // 但是 nerve 类型会不通过, ✨ 这个待研究需要传什么类型
}['name' | 'height' | 'money']

// 所以我们可以写一个泛型 type
type Mask<Source, Types> = {
  [K in keyof Source]: Source[K] extends Types ? K : never
}[keyof Source]

// 例子接口
interface IExample {
  name: string
  height: number
  girlfriends: string[]
  job: string
}

// 得到联合类型 "name" | "job", 都是字面量类型
type NewType = Mask<IExample, string>

// 得到字面量我们可以在一个类型对象中, 选择指定的类型, 组成新类型
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
type FilterType<Source, Types> = Pick<Source, Mask<Source, Types>>
type NewTypes = Filter<IExample, string[]> // { girlfriends: string[]; }
```

##### React 接口类型(declare 可以全局声明)

```ts
export interface IAppProps {
  // ❌ 不推荐: 没考虑数组
  children1: JSX.Element;
  // ❌ 不推荐: 没考虑字符串
  children2: JSX.Element | JSX.Element[];
  // 💻 不推荐: 没考虑 null
  children3: React.ReactChild[];
  // ✅ 推荐: 包含所有 children 情况
  children: React.ReactNode;
  // ✅ 推荐: 返回 ReactNode 的函数
  fnChildren: (name: string) => React.ReactNode;
  // ✅ 推荐: 在内联 style 可以使用
  style?: React.CSSProperties;
  // ✅ 推荐: 用泛型传入组件或标签, 提取自带的所有 props 类型
  props: React.ComponentProps<"button">;
  // ✅ 推荐: 在 props 的基础上进一步提取原生的 onClick 函数类型
  onClickButton: React.ComponentProps<"button">["onClick"];
}
```

##### 函数式组件

```ts
// 最简单的纯函数组件
interface IAppProps = {
  message: string;
}

const SayMsg = ({ message }: IAppProps) => <div>{message}</div>

// ❌ React 18 已删除
// 包含 children, 可以使用 React.FC 内置类型, 会自动加上 children 类型, 以及其他组件上会出现的类型
// (propTypes/contextTypes/defaultProps/displayName)
const App: React.FC<IAppProps> = ({ message, children }) => {
  return (
    <>
      {children}
      <div>{message}</div>
    </>
  )
}

// 还可以自定义(默认传参, 更灵活)
type FunctionWithChildren<P = {}> = P & { children?: React.ReactNode }
```

##### Hooks

###### useState

```ts
// 如果默认值是简单类型, TS 可以自动推断, value: boolean
const [value, setValue] = useState(false);

// 如果默认值是 null 或者 undefined, 那就需要通过泛型传入类型
const [user, setUser] = useState<IUser | null>(null);
// 然后在使用上, TS 会提示它可能是个 null
// ✅ TS 3.7 以上支持可选链式调用
const name = user?.name;
```

###### useRef

```ts
// 这个 Hook 坑还是挺多的, 可以声明需要返回的 current 类型
function FocusWithButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={onButtonClick}>Focus</button>
    </input>
  )
}
```

点击事件触发 Dom 肯定是已经渲染完毕了, 所以 `inputRef` 肯定是有值的, 但是还是需要加上非空判断, 可以使用 TS 非空断言

```ts
const elRef = useRef<HTMLElement>(null!);
```

这种情况在我们预知一个值肯定有值的时候使用, 一旦不清楚这个值是否一定非空, 就不应该使用该方法, 这种情况就需要用可选链式调用

###### useImperativeHandle

```ts
// 可以使用这个 Hook 只获取指定的方法, 不需要使用 forwardRef 将所有属性都暴露出去

// global.d.ts
type ScrollProps = {
  scrollToTop: () => void;
};

// component/UseList
import { Ref, useEffect, useImperativeHandle, useRef } from 'react';

type ListProps = {
  innerRef?: Ref<ScrollProps>;
};

function List(props: ListProps) {
  useImperativeHandle(props.innerRef, () => ({
    scrollToTop() {
      console.log('这是ref暴露的方法');
    },
  }));
  return <div>这是列表</div>;
}

export default () => {
  const listRef = useRef<ScrollProps>(null!);
  useEffect(() => {
    listRef.current.scrollToTop();
  }, []);
  return <List innerRef={listRef} />;
};
```

##### React API

###### forwardRef

```ts
// TODO
```
