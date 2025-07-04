// 当整个网页文档加载完毕后，执行这个函数
document.addEventListener('DOMContentLoaded', function() {
    // 1. 获取URL栏里的所有查询参数 (问号?后面的部分)
    const urlParams = new URLSearchParams(window.location.search);
    
    // 2. 找到一个叫做 'af_link' 的参数
    const appsflyerLink = urlParams.get('af_link');

    // 3. 找到页面上ID为 'download-btn' 的那个按钮元素
    const downloadButton = document.getElementById('download-btn');

    if (appsflyerLink) {
        // 4. 如果找到了af_link参数，就把它设置成按钮的链接
        // decodeURIComponent是防止链接里的特殊字符出错
        downloadButton.href = decodeURIComponent(appsflyerLink);
        downloadButton.textContent = '立即下载'; // 更新按钮文字
    } else {
        // 5. 如果URL里没有af_link参数，给用户一个提示
        downloadButton.textContent = '链接无效';
        downloadButton.style.backgroundColor = 'grey'; // 按钮变灰
    }
});