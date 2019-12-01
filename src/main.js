console.log($)
const $lastLi = $('.siteList').find('li.last')
const $addSite = $('.addSite')
const x = localStorage.getItem('x')//提取数据
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: "I", url: "https://www.iconfont.cn" },
    { logo: "F", url: "https://figma.com" },
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
    let url = window.prompt('请输入要添加的网址！')//添加提示窗口
    if (url.indexOf('http') !== 0) {
        url = "https://" + url
    }
    hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), url: url })
    render()
})

console.log(hashMap)

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    window.localStorage.setItem('x', string)//存储数据
}
