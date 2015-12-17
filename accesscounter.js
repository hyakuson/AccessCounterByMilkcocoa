(function () {
    'use strict';
    window.accesscounter = {

        start: function (site, page) {
            if (!site) {
                site = location.hostname || "localhost";
            }
            if (!page) {
                page = location.pathname;
            }

            var mk = new window.MilkCocoa("onicovyhpw.mlkcca.com"),

                dsSite = mk.dataStore(site), // サイト全体のアクセスカウント用DS
                dsPage = mk.dataStore(site).child(page),

                now = new Date(),
                strToday = now.getFullYear() + "/" + ("0" + (now.getMonth() + 1)).slice(-2) + "/" + ("0" + now.getDate()).slice(-2),

                todayCountId = strToday,
                totalCountId = "TotalCount_Page",
                siteTotalCountId = "TotalCount_Site",
                siteDayTotalCountId = strToday;

            function accessCount(id, pageOrSite) {
                var ds;
                if (pageOrSite === "page") {
                    ds = dsPage;
                } else if (pageOrSite === "site") {
                    ds = dsSite;
                }

                ds.get(id, function (err, datum) {
                    if (err) {
                        // 初回はデータがなくてエラーになるので初期データをセットする
                        if (err === "not found") {
                            ds.set(id, {
                                "count": "1"
                            });
                        } else {
                            window.console.log(err);
                        }
                        return;
                    }
                    ds.set(id, {
                        "count": (Number(datum.value.count) + 1).toString()
                    });
                });
            }

            /*** ページごとのアクセス数 ***/

            // 日ごとのページへのアクセス数をカウント
            accessCount(todayCountId, "page");

            // トータルアクセス数をカウント
            accessCount(totalCountId, "page");


            /***サイト全体のカウント***/

            // 日ごとのサイト全体へのアクセス数をカウント
            accessCount(siteDayTotalCountId, "site");

            // 全日のサイト全体へのアクセス数をカウント
            accessCount(siteTotalCountId, "site");
        }
    };
}());
