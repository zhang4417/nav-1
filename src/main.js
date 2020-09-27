const $lastLi = $('.siteList').find('li.last')
const $addSite = $('.addSite')
const x = localStorage.getItem('x')//提取数据
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: "W", url: "https://www.w3cways.com/" },
    { logo: "D", url: "https://devdocs.io/" },
    { logo: "J", url: "https://juejin.im/" },
    { logo: "Z", url: "https://www.zhangxinxu.com/wordpress/" },
    { logo: "V", url: "https://vuejs.org/" },
    { logo: "A", url: "https://ant.design/index-cn" },
    { logo: "H", url: "https://www.html.cn/" }
]
const simplifyUrl = url => {//简化URL
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')//使用正则表达找到"/"及"/"之后的内容
}
const render = () => {
    $('.siteList').find('li:not(.last)').remove()
    hashMap.forEach((item, index) => {
        const $li = $(`<li>
                <div class="site">
                    <div class="logo">${item.logo}</div>
                    <div class="link">${simplifyUrl(item.url)}</div>
                    <div class="close">
                        <svg class="icon" >
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div>
        </li >`).insertBefore($lastLi)//遍历哈希表，添加网址到lastLi之前
        $li.on('click', () => { window.open(item.url) })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()//阻止冒泡
            hashMap.splice(index, 1)
            render()//重新渲染哈希表
        })
    })
}
render()

$addSite.on('click', () => {
    let url = window.prompt('请输入要添加的网址！默认是https://')//添加提示窗口
    if (url === null) { return }
    if (url.indexOf('http') !== 0) {
        url = "https://" + url
    }
    hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), url: url })
    render()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    window.localStorage.setItem('x', string)//存储数据
}
