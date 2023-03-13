const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const static = require('koa-static');
const cors = require('koa2-cors');

const index = require('./routes/index');
const users = require('./routes/users');
const address = require('./routes/address');
const shop = require('./routes/shop');
const order = require('./routes/order');

// error handler
onerror(app);

const allowedOrigins = ['https://0754-61-230-160-59.ap.ngrok.io', 'http://localhost:8081'];

// cors 配置
app.use(
  cors({
    // origin: 'http://localhost:8080', // 前端 origin
    // origin: 'https://e79f-61-230-164-30.ap.ngrok.io', // 前端 origin
    origin: (ctx) => {
      const origin = ctx.request.headers.origin;
      // 如果請求的域名在允許的域名列表中, 則允許跨域請求
      if (allowedOrigins.includes(origin)) {
        return origin;
      }
      return false;
    },
    credentials: true // 允許跨域帶 cookie
  })
);

// session 配置
app.keys = ['G%$&SAFG^@#Rdqw12345']; // 密鑰, 用於加密
app.use(
  session({
    // 配置cookie
    cookie: {
      path: '/',
      httpOnly: true, // 只能通過後端修改 cookie, 不允許前端修改
      maxAge: 24 * 60 * 60 * 1000 // 24h
    }
  })
);

// middlewares
app.use(
  // 解析request body數據, 把它轉為一個對象
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);
app.use(json()); // 簡化JSON響應的操作, 它可以在每次請求時自動返回JSON響應
app.use(logger()); // 日誌中間件, 用於在控制台中記錄來自koa應用程序的請求和響應
app.use(static(__dirname + '/public')); // 靜態文件服務

// app.use(
//   // 渲染模板引擎, 例如pug頁面
//   views(__dirname + '/views', {
//     extension: 'pug'
//   })
// );

// logger 打印當前請求所花費的時間
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes 註冊路由
// allowedMethods 檢查當前請求的方法是否在該路由的定義中被允許, 如果不允許就會返回 405 Method Not Allowed
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(address.routes(), address.allowedMethods());
app.use(shop.routes(), shop.allowedMethods());
app.use(order.routes(), order.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
