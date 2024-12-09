# 项目结构与技术文档

## 目录结构 
├── app/
│ ├── fonts/
│ │ ├── GeistVF.woff
│ │ └── GeistMonoVF.woff
│ ├── layout.tsx # 根布局（包含字体配置）
│ ├── page.tsx # 主页面
│ └── globals.css # 全局样式和 Tailwind 引入
├── public/ # 静态资源目录
├── .next/ # 构建输出目录（已加入 gitignore）
└── node_modules/ # 依赖包目录（已加入 gitignore）


## 技术栈

- **框架**: Next.js 15.0.4
- **开发语言**: TypeScript 5.x
- **样式方案**: Tailwind CSS 3.4.1
- **React 版本**: v19.0.0
- **Node 环境要求**: 详见 package.json

## 核心配置文件

- **next.config.ts**: Next.js 配置
- **tailwind.config.ts**: Tailwind 主题和内容配置
- **tsconfig.json**: TypeScript 编译器配置
- **.eslintrc.json**: ESLint 规则（继承 Next.js core web vitals）
- **postcss.config.mjs**: PostCSS 配置（用于 Tailwind）

## 样式架构

- 采用 Tailwind CSS 实现原子化 CSS
- 支持亮色/暗色主题的自定义颜色变量
- 使用 CSS 自定义属性实现主题系统
- 自定义字体实现：
  - Geist Sans（可变字体）
  - Geist Mono（可变字体）

## 项目规范

### TypeScript 配置
- 启用严格模式
- 配置路径别名（@/*）
- 使用现代模块解析（bundler）

### 组件结构
- 采用 App Router 模式
- 统一的根布局（含字体提供器）
- 基于页面的路由系统

### 资源处理
- 字体文件存放于 app/fonts/
- 静态资源存放于 public 目录
- 通过 Next.js Image 组件处理 SVG

### 开发工作流
- `npm run dev`: 启动开发服务器
- `npm run build`: 生产环境构建
- `npm run start`: 启动生产服务器
- `npm run lint`: ESLint 代码检查

## 主题配置

支持通过 CSS 自定义属性实现亮色/暗色主题：
- 亮色主题：
  - 背景色：#ffffff
  - 前景色：#171717
- 暗色主题：
  - 背景色：#0a0a0a
  - 前景色：#ededed

## 注意事项

- 项目使用 Next.js 最新特性，包括 App Router
- TypeScript 严格模式确保类型安全
- Tailwind 提供原子化的样式解决方案
- ESLint 通过 Next.js 推荐规则确保代码质量
