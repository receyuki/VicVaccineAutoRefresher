# 一个很不自动的维州疫苗预约自动刷新器
* 维州这个预约系统实在拉的不行.半天刷不到第二针就顺手写了个脚本..  
* 功能只是很简单的定时刷新预约页面.如果刷到可预约的位置给一个弹窗.
* ~~原本想加个自动预约的功能.结果写到一半的时候不小心订上了第六周当天的第二针.所以干脆不写了~~


刷新部分是用[oixm](https://greasyfork.org/en/scripts/39506-%E8%87%AA%E5%8A%A8%E5%88%B7%E6%96%B0%E9%A1%B5%E9%9D%A2/code)的刷新器改的  
测试环境mac+chrome+tampermonkey.别的都没试过(~~随手写的没怎么测试过.有问题给我发邮件吧<receyuki@gmail.com>~~)
## 使用流程
1. 在chrome上安装[Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)![tampermonkey](assets/tampermonkey-1.png)

2. 安装[本脚本](https://github.com/receyuki/VicVaccineAutoRefresher/raw/main/VicVaccineAutoRefresher.user.js)(←对就是点这里)![tampermonkey](assets/tampermonkey.png)
3. 手动登陆[预约官网](https://portal.cvms.vic.gov.au/)，选择需要刷的接种点并进入选择日期和时间的页面
4. 设置刷新间隔~~感觉一分钟够快了..再快就有点没素质~~![interval](assets/interval.png)并设置好日期范围![slots](assets/slots.png)
5. 如果tab上能显示刷新倒计时说明刷新器在正确运行![tab](assets/tab.png)
6. 当脚本刷到新slot会自动弹窗（最小化浏览器也没事..别关页面就行）![notification](assets/notification.png)
7. 点击弹窗会自动跳转到confirm页面![conform](assets/conform.png)
8. 确认没问题的话自己点confirm吧(~~所以根本一点都不自动~~)
9. 有几率即使刷到了位置还是被人抢走(~~那就不是我的问题了~~)
10. 用之前最好点顶上的按钮测试下弹窗能不能正常工作，如果不能工作基本是chrome的设置有问题