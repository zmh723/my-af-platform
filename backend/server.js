const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000; // 我们让服务器在3000端口监听

app.use(cors());

// 中间件，让我们的服务器能解析JSON格式的请求体
app.use(express.json()); 

// 您的基础信息
const BASE_AF_LINK = 'https://app.appsflyer.com/id1447274646?pid=nianticinj4f_int&c=adaltar_220';
const H5_LANDING_PAGE_URL = 'http://192.168.196.112:5500/index.html'; // 这是VS Code Live Server的默认地址，后面会改

// 定义一个API接口，路径是 /api/generate-link，方法是 POST
app.post('/api/generate-link', (req, res) => {
    // 从发来的请求中获取 partnerName 和 siteId
    const { partnerName, siteId } = req.body;

    if (!partnerName || !siteId) {
        // 如果信息不全，返回一个错误
        return res.status(400).json({ error: 'Partner name and Site ID are required.' });
    }

    // 1. 构建原始AppsFlyer链接
    let afLink = new URL(BASE_AF_LINK);
    afLink.searchParams.set('af_siteid', siteId);
    // 您可以在这里添加更多参数，比如 af_sub1=partnerName
    afLink.searchParams.set('af_sub1', partnerName);

    // 2. 构建最终给合作伙伴的H5链接
    let finalH5Link = new URL(H5_LANDING_PAGE_URL);
    finalH5Link.searchParams.set('af_link', encodeURIComponent(afLink.toString()));

    // 3. 将结果返回给前端
    res.json({
        partnerName: partnerName,
        siteId: siteId,
        finalLink: finalH5Link.toString()
    });
});

const fs = require('fs'); // 引入文件系统模块

// 定义一个专门接收AppsFlyer回传的接口
app.post('/api/af-postback', (req, res) => {
    console.log('收到AppsFlyer回传数据:');
    console.log(JSON.stringify(req.body, null, 2)); // 在终端用漂亮的格式打印收到的数据

    // 将数据追加到文件中作为临时数据库
    const dataToLog = new Date().toISOString() + ' | ' + JSON.stringify(req.body) + '\n';
    fs.appendFileSync('postbacks.log', dataToLog);

    res.status(200).send('OK'); // 告诉AppsFlyer我们收到了
});
// 启动服务器
app.listen(port, () => {
    console.log(`服务器已启动，正在监听 http://localhost:${port}`);
});