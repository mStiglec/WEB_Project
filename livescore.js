import {
    livescore
} from "./library/livescore.js";
import {
    fixtures
} from "./library/fixtures.js";
import {
    fixture
} from "./library/fixture.js";
import {
    standings
} from "./library/standings.js";
window.addEventListener("DOMContentLoaded", () => {
    let t, e = !1,
        a = !1;
    if (document.getElementById("wg-api-football-livescore")) {
        const t = document.getElementById("wg-api-football-livescore");
        let l = t.getAttribute("data-key"),
            o = t.getAttribute("data-host"),
            i = t.getAttribute("data-theme"),
            s = parseInt(1e3 * t.getAttribute("data-refresh")),
            r = t.getAttribute("data-show-errors");
        if ("false" !== i && !e) {
            e = !0;
            let t = document.createElement("link");
            t.type = "text/css", t.rel = "stylesheet", t.href = "https://widgets.api-sports.io/football/1.1.8/themes/api-football.css", document.getElementsByTagName("head")[0].appendChild(t)
        }
        if (("grey" === i || "dark" === i) && !a) {
            a = !0;
            let t = document.createElement("link");
            t.type = "text/css", t.rel = "stylesheet", t.href = "https://widgets.api-sports.io/football/1.1.8/themes/api-football-" + i + ".css", document.getElementsByTagName("head")[0].appendChild(t)
        }
        livescore(l, o, r), s >= 15 && Number.isInteger(s) && setInterval(function() {
            livescore(l, o, r)
        }, s)
    }
    if (document.getElementById("wg-api-football-fixtures")) {
        const t = document.getElementById("wg-api-football-fixtures");
        let l = t.getAttribute("data-key"),
            o = t.getAttribute("data-host"),
            i = t.getAttribute("data-theme"),
            s = parseInt(1e3 * t.getAttribute("data-refresh")),
            r = t.getAttribute("data-league"),
            d = t.getAttribute("data-season"),
            n = t.getAttribute("data-team"),
            m = t.getAttribute("data-last"),
            u = t.getAttribute("data-next"),
            g = t.getAttribute("data-date"),
            c = t.getAttribute("data-show-errors");
        if ("false" !== i && !e) {
            e = !0;
            let t = document.createElement("link");
            t.type = "text/css", t.rel = "stylesheet", t.href = "https://widgets.api-sports.io/football/1.1.8/themes/api-football.css", document.getElementsByTagName("head")[0].appendChild(t)
        }
        if (("grey" === i || "dark" === i) && !a) {
            a = !0;
            let t = document.createElement("link");
            t.type = "text/css", t.rel = "stylesheet", t.href = "https://widgets.api-sports.io/football/1.1.8/themes/api-football-" + i + ".css", document.getElementsByTagName("head")[0].appendChild(t)
        }
        fixtures(g, r, d, n, m, u, l, o, c), s >= 15 && Number.isInteger(s) && setInterval(function() {
            fixtures(g, r, d, n, m, u, l, o, c)
        }, s)
    }
    if (document.getElementById("wg-api-football-fixture")) {
        const t = document.getElementById("wg-api-football-fixture");
        let l = t.getAttribute("data-key"),
            o = t.getAttribute("data-host"),
            i = t.getAttribute("data-theme"),
            s = parseInt(1e3 * t.getAttribute("data-refresh")),
            r = t.getAttribute("data-id"),
            d = t.getAttribute("data-show-errors");
        if ("false" !== i && !e) {
            e = !0;
            let t = document.createElement("link");
            t.type = "text/css", t.rel = "stylesheet", t.href = "https://widgets.api-sports.io/football/1.1.8/themes/api-football.css", document.getElementsByTagName("head")[0].appendChild(t)
        }
        if (("grey" === i || "dark" === i) && !a) {
            a = !0;
            let t = document.createElement("link");
            t.type = "text/css", t.rel = "stylesheet", t.href = "https://widgets.api-sports.io/football/1.1.8/themes/api-football-" + i + ".css", document.getElementsByTagName("head")[0].appendChild(t)
        }
        fixture(r, l, o, d), s >= 15 && Number.isInteger(s) && setInterval(function() {
            fixture(r, l, o, d)
        }, s)
    }
    if (document.getElementById("wg-api-football-standings")) {
        const t = document.getElementById("wg-api-football-standings");
        let l = t.getAttribute("data-key"),
            o = t.getAttribute("data-host"),
            i = t.getAttribute("data-theme"),
            s = t.getAttribute("data-league"),
            r = t.getAttribute("data-team"),
            d = t.getAttribute("data-season"),
            n = t.getAttribute("data-show-errors");
        if ("false" !== i && !e) {
            e = !0;
            let t = document.createElement("link");
            t.type = "text/css", t.rel = "stylesheet", t.href = "https://widgets.api-sports.io/football/1.1.8/themes/api-football.css", document.getElementsByTagName("head")[0].appendChild(t)
        }
        if (("grey" === i || "dark" === i) && !a) {
            a = !0;
            let t = document.createElement("link");
            t.type = "text/css", t.rel = "stylesheet", t.href = "https://widgets.api-sports.io/football/1.1.8/themes/api-football-" + i + ".css", document.getElementsByTagName("head")[0].appendChild(t)
        }
        standings(s, d, r, l, o, n)
    }
    document.addEventListener("click", function(t) {
        if (!t.target.matches(".api_football_arrow")) return;
        t.preventDefault();
        let e = t.target,
            a = t.target.getAttribute("data-id"),
            l = document.getElementsByClassName(a);
        for (var o = 0; o < l.length; o++) {
            let t = l[o];
            t.classList.contains("api_football_hide") ? (t.classList.remove("api_football_hide"), e.classList.remove("api_football_arrow_down"), e.classList.add("api_football_arrow_up")) : (t.classList.add("api_football_hide"), e.classList.remove("api_football_arrow_up"), e.classList.add("api_football_arrow_down"))
        }
    }, !1), document.addEventListener("click", function(t) {
        if (!t.target.matches(".api_football_button_toggle")) return;
        t.preventDefault();
        let e = t.target,
            a = t.target.getAttribute("data-id"),
            l = document.getElementsByClassName("api_football_toggle_content");
        for (var o = 0; o < l.length; o++) {
            let t = l[o];
            t.getAttribute("id") !== a && t.classList.add("api_football_hide")
        }
        document.getElementById(a).classList.remove("api_football_hide");
        let i = document.getElementsByClassName("api_football_button_toggle");
        for (o = 0; o < i.length; o++) {
            let t = i[o];
            t.getAttribute("data-id") !== a && t.classList.contains("api_football_active") && t.classList.remove("api_football_active")
        }
        e.classList.add("api_football_active")
    }, !1), document.addEventListener("click", function(e) {
        if (!e.target.matches(".api_football_load_fixture")) return;
        e.preventDefault();
        let a, l, o, i, s = e.target.getAttribute("data-id"),
            r = null,
            d = null,
            n = null,
            m = null,
            u = null;
        document.getElementById("wg-api-football-livescore") ? (r = document.getElementById("wg-api-football-livescore"), d = r.getAttribute("data-key"), n = r.getAttribute("data-host"), m = r.getAttribute("data-show-errors"), u = parseInt(1e3 * r.getAttribute("data-refresh"))) : document.getElementById("wg-api-football-fixtures") && (r = document.getElementById("wg-api-football-fixtures"), d = r.getAttribute("data-key"), n = r.getAttribute("data-host"), m = r.getAttribute("data-show-errors"), u = parseInt(1e3 * r.getAttribute("data-refresh"))), null !== r && (document.getElementById("wg-api-football-fixture-modal") && document.getElementById("wg-api-football-fixture-modal").remove(), (a = document.createElement("div")).id = "wb-api-football-modal", (l = document.createElement("div")).classList.add("api_football_modal_content"), a.appendChild(l), (i = document.createElement("span")).classList.add("api_football_modal_close"), i.innerHTML = "&times;", l.appendChild(i), (o = document.createElement("div")).id = "wg-api-football-fixture-modal", o.classList.add("api_football_loader"), l.appendChild(o), r.appendChild(a), a.style.display = "block", fixture(s, d, n, m, !0), u >= 15 && Number.isInteger(u) && (t = setInterval(function() {
            fixture(s, d, n, m, !0)
        }, u)))
    }, !1), document.addEventListener("click", function(e) {
        e.target.matches(".api_football_modal_close") && (e.preventDefault(), clearInterval(t), document.getElementById("wb-api-football-modal") && (document.getElementById("wb-api-football-modal").style.display = "none", document.getElementById("wb-api-football-modal").remove()))
    }, !1)
});