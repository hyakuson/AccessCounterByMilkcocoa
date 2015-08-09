(function () {
    window.accesscounter = {
        start: function (site, page) {
            if (!(site && page)) {
                console.log("ERROR!! : please set sitename and pagename");
                return;
            }
            var milkcocoa = new MilkCocoa("onicovyhpw.mlkcca.com"); //←ここはあなたのMilkcocoaアプリのに変えてください
            var dsPage = milkcocoa.dataStore('access_count').child(site).child(page);

            var now = new Date();
            var strToday = now.getFullYear() + "/" + ("0" + (now.getMonth() + 1)).slice(-2) + "/" + ("0" + now.getDate()).slice(-2);

            var todayCountId = strToday;

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
                var todayAccess = datum.value.count * 1;
                todayAccess++;
                dsPage.set(todayCountId, {
                    "count": todayAccess.toString(10)
                });
            });

            var totalCountId = "TotalCount_Page";

            // ページのトータルアクセス数をカウント
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
                var totalPageAccess = datum.value.count * 1;
                totalPageAccess++;
                dsPage.set(totalCountId, {
                    "count": totalPageAccess.toString(10)
                });
            });


            /***サイト全体のカウント***/

            var dsSite = milkcocoa.dataStore('access_count').child(site);

            var siteDayTotalCountId = strToday;

            // 日ごとのサイト全体へのアクセス数をカウント
            dsSite.get(siteDayTotalCountId, function (err, datum) {
                if (err) {
                    if (err === "not found") {
                        dsSite.set(siteDayTotalCountId, {
                            "count": "1"
                        });
                    } else {
                        console.log(err);
                    }
                    return;
                }
                var totalDaySiteAccess = datum.value.count * 1;
                totalDaySiteAccess++;
                dsSite.set(siteDayTotalCountId, {
                    "count": totalDaySiteAccess.toString(10)
                });
            });

            var siteTotalCountId = "TotalCount_Site";

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
                var totalSiteAccess = datum.value.count * 1;
                totalSiteAccess++;
                dsSite.set(siteTotalCountId, {
                    "count": totalSiteAccess.toString(10)
                });
            });
        }
    }
})();