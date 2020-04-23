const {
     override,  //基本配置
      addLessLoader, //less加载
    fixBabelImports,  //UI部分加载配置
    addDecoratorsLegacy //装饰模式
 } = require("customize-cra");

const modifyVars=require('./lessVars') //less文件


module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    'modifyVars':modifyVars //样式文件
  }),
  addDecoratorsLegacy(), //装饰
  fixBabelImports(   //路径配置
       'import' ,{
            libraryName: "antd",
            libraryDirectory: "es",
            style: true // `style: true` 会加载 less 文件
          }      
  )
);
