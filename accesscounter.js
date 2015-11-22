(function () {
    'use strict';
    window.accesscounter = {

        start: function (site, page) {
            if (!(site && page)) {
                console.log("ERROR!! : please set sitename and pagename");
                return;
            }
            var milkcocoa = new window.MilkCocoa("onicovyhpw.mlkcca.com"), //←ここはあなたのMilkcocoaアプリのに変えてください
                dsPage = milkcocoa.dataStore('access_count').child(site).child(page),

                now = new Date(),
                strToday = now.getFullYear() + "/" + ("0" + (now.getMonth() + 1)).slice(-2) + "/" + ("0" + now.getDate()).slice(-2),

                todayCountId = strToday,
                totalCountId = "TotalCount_Page",
                siteTotalCountId = "TotalCount_Site",
                siteDayTotalCountId = strToday,

                dsSite = milkcocoa.dataStore('access_count').child(site); // サイト全体のアクセスカウント用DS


            /*** ページごとのアクセス数 ***/

            // 日ごとのページへのアクセス数をカウント
            dsPage.get(todayCountId, function (err, datum) {
                if (err) {
                    // 初回はデータがなくてエラーになるので初期データをセットする
                    if (err === "not found") {
                        dsPage.set(todayCountId, {
                            "count": "1"
                        });
                    } else {
                        console.log(err);
                    }
                    return;
                }
                var todayAccess = Number(datum.value.count);
                todayAccess = todayAccess + 1;
                dsPage.set(todayCountId, {
                    "count": todayAccess.toString(10)
                });
            });

            // トータルアクセス数をカウント
            dsPage.get(totalCountId, function (err, datum) {
                if (err) {
                    if (err === "not found") {
                        dsPage.set(totalCountId, {
                            "count": "1"
                        });
                    } else {
                        console.log(err);
                    }
                    return;
                }
                var totalPageAccess = Number(datum.value.count);
                totalPageAccess = totalPageAccess + 1;
                dsPage.set(totalCountId, {
                    "count": totalPageAccess.toString(10)
                });
            });


            /***サイト全体のカウント***/

            // 日ごとのサイト全体へのアクセス数をカウント
            dsSite.get(siteDayTotalCountId, function (err, datum) {
                if (err) {
                    if (err === "not found") {
                        dsSite.set(siteDayTotalCountId, {
                            "count": "1"
                        });
                    } else {
                        console.log("ERROR: " + err);
                    }
                    return;
                }
                var totalDaySiteAccess = Number(datum.value.count);
                totalDaySiteAccess = totalDaySiteAccess + 1;
                dsSite.set(siteDayTotalCountId, {
                    "count": totalDaySiteAccess.toString(10)
                });
            });

            // サイト全体のトータルアクセス数をカウント
            dsSite.get(siteTotalCountId, function (err, datum) {
                if (err) {
                    if (err === "not found") {
                        dsSite.set(siteTotalCountId, {
                            "count": "1"
                        });
                    } else {
                        console.log(err);
                    }
                    return;
                }
                var totalSiteAccess = Number(datum.value.count);
                totalSiteAccess = totalSiteAccess + 1;
                dsSite.set(siteTotalCountId, {
                    "count": totalSiteAccess.toString(10)
                });
            });
        }
    };
}());
