// require này sẽ chạy tới thư mục `node_modules` 
    // => để tìm frameworks exoress.
    const path = require('path');
const express = require('express');
const {engine: handlebars} = require('express-handlebars');
const morgan = require('morgan');
const route = require('./routes')
const app = express();
// port này là cổng httls địa chỉ để hiện trình duyệt.
const port = 3000;

app.use(express.urlencoded({deprecated:true}));
app.use(express.json());
// Method get dùng để get path `/` 
app.use(morgan('combined'));
// config static ( cấu hinh file tĩnh)
app.use(express.static(path.join(__dirname,"public")));
// templates engine ( mẫu động cơ)
app.engine('.hbs', handlebars({
  extname:".hbs"
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources','views'));

const db = require('./config/db');

db.connect();



route(app)

// listen => gửi lắng nghe và gửi yêu cầu và hiện 
// giao diện web
app.listen(port, () => {
  console.log(`app listening on port localhost:${port}`)
});