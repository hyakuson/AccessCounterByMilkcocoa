(function () {
    'use strict';

    var mk,
        dsSite, // サイト全体のアクセス数用
        dsPage, // ページ単位のアクセス数用
        now = new Date(),
        strToday = now.getFullYear() + "/" + ("0" + (now.getMonth() + 1)).slice(-2) + "/" + ("0" + now.getDate()).slice(-2),

        site = location.hostname || "localhost",
        page = location.pathname,

        todayCountId = strToday,
        totalCountId = "TotalCount_Page",
        siteTotalCountId = "TotalCount_Site",
        siteDayTotalCountId = strToday;

    function accessCount(id, pageOrSite) {
        var mk = new window.MilkCocoa("onicovyhpw.mlkcca.com"),
            ds;

        if (pageOrSite === "page") {
            ds = mk.dataStore(site).child(page);
        } else if (pageOrSite === "site") {
            ds = mk.dataStore(site);
        }

        ds.get(id, function (err, datum) {
            if (err) {
                // 初回はデータがなくてエラーになるので初期データをセットする
                if (err === "not found") {
                    ds.set(id, {
                        "count": "1"
                    }, function (err, datum) {
                        mk.disconnect();
                    });
                } else {
                    window.console.log(err);
                }
                return;
            }
            ds.set(id, {
                "count": (Number(datum.value.count) + 1).toString()
            }, function (err, datum) {
                mk.disconnect();
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

}());
