import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { AppAuth } from "./firebaseWrapper";
import { stopf5, Query2Dict } from "./util_tsx";
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
require.context('../application/', true, /\.ts(x?)$/)

export const WidgetHead = () => {
    const [switchAppButton, setSwitchAppButton] = useState(0)
    // functions
    const _switchApp = (application: string) => {
        if (stopf5.check("_switchapp", 50, true) == false) return; // To prevent high freq access
        import("../application/" + application).then((module) => {
            ReactDOM.unmountComponentAtNode(document.getElementById("appMain"));
            ReactDOM.render(<module.AppMain />, document.getElementById("appMain"));
            ReactDOM.unmountComponentAtNode(document.getElementById("titlelogo_tsx"));
            ReactDOM.render(<module.titleLogo />, document.getElementById("titlelogo_tsx"));
        })
    }
    const _switchButton = () => {
        if (switchAppButton == 0)
            return (
                <button className="btn btn-outline-primary btn-push btn-lg mx-2 mr-3"
                    onClick={() => { _switchApp("mypage"); setSwitchAppButton(1); }}>
                    <i className="far fa-address-card mr-1"></i>マイページへ
                </button>
            )
        if (switchAppButton == 1)
            return (
                <button className="btn btn-outline-primary btn-push btn-lg mx-2 mr-3"
                    onClick={() => { _switchApp(Query2Dict()["application"]); setSwitchAppButton(0); }}>
                    <i className="far fa-arrow-alt-circle-left mr-1">マイページを離れる</i>
                </button>
            )
    }
    const _signin = (uid: string = "test_uid", pass: string = "test_pass") => {
        Cookies.set("wsgi_login", { uid: uid, passhash: CryptoJS.SHA256(pass).toString(CryptoJS.enc.Hex) })
    }
    const _signout = (uid: string = "test_uid", pass: string = "test_pass") => {
        Cookies.set("wsgi_login", {})
    }
    const _signup = () => {
        const xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("POST", "/Flask/login/main.py", true);
        xhr.ontimeout = () => console.error("The request timed out.");
        xhr.timeout = 5000;
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) console.log(xhr.responseText);
        };
        xhr.send(JSON.stringify({}));
    }
    return (
        <div style={{ borderBottom: "3px double gray", background: "linear-gradient(rgba(60,60,60,0),rgba(60,60,60,0.1)" }}>
            <div className="row p-1 px-3">
                <div className="col-sm-12 col-lg-6 p-1">
                    <h2 className="d-flex justify-content-center justify-content-lg-start">
                        <div className="form-inline">
                            <i className="fab fa-react fa-spin" style={{ color: "mediumturquoise" }}></i>
                            <div className="rotxin-2" id="titlelogo_tsx">タイトル未設定</div>
                        </div>
                    </h2>
                </div>
                <div className="col-sm-12 col-lg-6 p-1">
                    <div className="form-inline d-flex justify-content-between justify-content-lg-end">
                        {/*ポートフォリオの場合、アプリ一覧を操作不能にします */}
                        {Query2Dict()["portfolio"] ?
                            <div>{_switchButton()}</div>
                            :
                            <button className="btn btn-link dropdown-toggle mx-2 mr-3" type="button" data-toggle="dropdown">
                                <b>アプリ一覧</b>
                            </button>
                        }
                        <div className="dropdown-menu dropdown-menu-lg">
                            <a className="dropdown-item btn-push px-4 text-center border-top" style={{ fontSize: "1.5em" }} href="#"
                                onClick={() => { _switchApp("homepage") }}>
                                <i className="fas fa-home mr-1"></i>ホームページ
                        </a>
                            <a className="dropdown-item btn-push px-4 text-center border-top" style={{ fontSize: "1.5em" }} href="#"
                                onClick={() => { _switchApp("mypage") }}>
                                <i className="far fa-address-card mr-1"></i>マイページ
                        </a>
                            <a className="dropdown-item btn-push px-4 text-center border-top" style={{ fontSize: "1.5em" }} href="#"
                                onClick={() => { _switchApp("tptef") }}>
                                <i className="far fa-comments mr-1"></i>チャット
                        </a>
                            <a className="dropdown-item btn-push px-4 text-center border-top" style={{ fontSize: "1.5em" }} href="#"
                                onClick={() => { _switchApp("oszv") }}>
                                <i className="fas fa-table mr-1"></i>受付注文システム
                        </a>
                        </div>
                        <div >

                            <div className="d-flex justify-content-between">
                                <div className="form-inline">
                                    <h6 className="d-flex flex-column">
                                        <div>ようこそ</div>
                                        kari
                                    </h6>
                                    <button className="btn btn-secondary btn-push mx-1" type="button" onClick={() => { _signin() }}>
                                        <i className="fas fa-sign-out-alt mr-1" style={{ pointerEvents: "none" }}></i>
                                        <b>サインイン</b>
                                    </button>
                                    <button className="btn btn-secondary btn-push mx-1" type="button" onClick={() => { _signup() }}>
                                        <i className="fas fa-sign-out-alt mr-1" style={{ pointerEvents: "none" }}></i>
                                        <b>サインアップ</b>
                                    </button>
                                    <button className="btn btn-secondary btn-push mx-1" type="button" onClick={() => { _signout() }}>
                                        <i className="fas fa-sign-out-alt mr-1" style={{ pointerEvents: "none" }}></i>
                                        <b>サインアウト</b>
                                    </button>
                                    config
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></div>
    );
}


export const AppWidgetHead = () => {
    const [switchAppButton, setSwitchAppButton] = useState(0)
    useEffect(() => ReactDOM.render(<AppAuth />, document.getElementById("account_tsx")), [])
    // functions
    const _switchApp = (application: string) => {
        if (stopf5.check("_switchapp", 50, true) == false) return; // To prevent high freq access
        import("../application/" + application).then((module) => {
            ReactDOM.unmountComponentAtNode(document.getElementById("appMain"));
            ReactDOM.render(<module.AppMain />, document.getElementById("appMain"));
            ReactDOM.unmountComponentAtNode(document.getElementById("titlelogo_tsx"));
            ReactDOM.render(<module.titleLogo />, document.getElementById("titlelogo_tsx"));
        })
    }
    const _switchButton = () => {
        if (switchAppButton == 0)
            return (
                <button className="btn btn-outline-primary btn-push btn-lg mx-2 mr-3"
                    onClick={() => { _switchApp("mypage"); setSwitchAppButton(1); }}>
                    <i className="far fa-address-card mr-1"></i>マイページへ
                </button>
            )
        if (switchAppButton == 1)
            return (
                <button className="btn btn-outline-primary btn-push btn-lg mx-2 mr-3"
                    onClick={() => { _switchApp(Query2Dict()["application"]); setSwitchAppButton(0); }}>
                    <i className="far fa-arrow-alt-circle-left mr-1">マイページを離れる</i>
                </button>
            )
    }
    return (
        <div style={{ borderBottom: "3px double gray", background: "linear-gradient(rgba(60,60,60,0),rgba(60,60,60,0.1)" }}>
            <div className="row p-1 px-3">
                <div className="col-sm-12 col-lg-6 p-1">
                    <h2 className="d-flex justify-content-center justify-content-lg-start">
                        <div className="form-inline">
                            <i className="fab fa-react fa-spin" style={{ color: "mediumturquoise" }}></i>
                            <div className="rotxin-2" id="titlelogo_tsx">タイトル未設定</div>
                        </div>
                    </h2>
                </div>
                <div className="col-sm-12 col-lg-6 p-1">
                    <div className="form-inline d-flex justify-content-between justify-content-lg-end">
                        {/*ポートフォリオの場合、アプリ一覧を操作不能にします */}
                        {Query2Dict()["portfolio"] ?
                            <div>{_switchButton()}</div>
                            :
                            <button className="btn btn-link dropdown-toggle mx-2 mr-3" type="button" data-toggle="dropdown">
                                <b>アプリ一覧</b>
                            </button>
                        }
                        <div className="dropdown-menu dropdown-menu-lg">
                            <a className="dropdown-item btn-push px-4 text-center border-top" style={{ fontSize: "1.5em" }} href="#"
                                onClick={() => { _switchApp("homepage") }}>
                                <i className="fas fa-home mr-1"></i>ホームページ
                        </a>
                            <a className="dropdown-item btn-push px-4 text-center border-top" style={{ fontSize: "1.5em" }} href="#"
                                onClick={() => { _switchApp("mypage") }}>
                                <i className="far fa-address-card mr-1"></i>マイページ
                        </a>
                            <a className="dropdown-item btn-push px-4 text-center border-top" style={{ fontSize: "1.5em" }} href="#"
                                onClick={() => { _switchApp("tptef") }}>
                                <i className="far fa-comments mr-1"></i>チャット
                        </a>
                            <a className="dropdown-item btn-push px-4 text-center border-top" style={{ fontSize: "1.5em" }} href="#"
                                onClick={() => { _switchApp("oszv") }}>
                                <i className="fas fa-table mr-1"></i>受付注文システム
                        </a>
                        </div>
                        <div id="account_tsx">widgethead_tsx loading...</div>
                    </div>
                </div>
            </div></div>
    );
}

export const AppWidgetFoot = () => {
    $('[data-toggle="widget_widgetfood_tooltip"]').tooltip()
    return (
        <div className="d-flex justify-content-between p-2"
            style={{ color: "goldenrod", backgroundColor: "royalblue", border: "3px double silver" }}>
            <div>
                <b style={{ fontSize: "1.5em" }}>Links: </b>
                <i className="fab fa-wordpress fa-2x fa-btn-goldbadge mr-1"
                    onClick={() => window.location.href = "https://huxiin.ga/wordpress"}></i>
                <i className="fab fa-github fa-2x fa-btn-goldbadge mr-1"
                    onClick={() => window.location.href = "https://github.com/jSm449g4d/"}></i>
            </div>
            <h5>===VPSdeWP===</h5>
            <div className="btn-push" data-toggle="widget_widgetfood_tooltip" data-placement="top" title="敗戦国の末路"
                onClick={(evt) => {
                    window.location.href = 'https://www.youtube.com/watch?v=_fj9U6pVNkM&ab_channel=%E9%88%B4%E6%9C%A8%E3%82%86%E3%82%86%E3%81%86%E3%81%9F'
                }}>ご自由にお使いください</div>
        </div>
    );
}
