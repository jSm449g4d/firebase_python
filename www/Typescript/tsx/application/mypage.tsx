import React from 'react';
import { auth, fb, fb_errmsg } from "../component/account";
import { stopf5, Query2Dict } from "../component/util_tsx";

const storage = fb.storage();
const db = fb.firestore()

interface State {
    uid: string; unsnaps: any; icon_url: string; showuid: string;
    profile: { [keys: string]: string };
}

export class App_tsx extends React.Component<{}, State> {
    // constructors
    constructor(props: any) {
        super(props);
        this.state = {
            uid: "", unsnaps: [],
            showuid: "showuid" in Query2Dict() == false ? "" : Query2Dict()["showuid"],
            icon_url: "",
            profile: {},
        };
    }

    componentDidMount() { setInterval(this._tick.bind(this), 100) }
    componentDidUpdate(prevProps: object, prevState: State) {
        if (this.state.uid != prevState.uid || this.state.showuid != prevState.showuid) {
            for (let i = 0; i < this.state.unsnaps.length; i++) { this.state.unsnaps[i]() }
            this.setState({ unsnaps: [this.db_Rwd_getpf.bind(this)(),] })
        }
    }
    componentWillUnmount() { for (let i = 0; i < this.state.unsnaps.length; i++) { this.state.unsnaps[i]() } }

    // functions
    db_Rwd_getpf() {
        if (this.state.showuid == "") return () => { };
        return db.doc("mypage/" + this.state.showuid).onSnapshot((doc) => {
            if (doc.exists) {
                const tmp_recodes = doc.data()
                const tsuids = Object.keys(tmp_recodes).sort()
                this.setState({ profile: Object.assign(Object.assign(this.state.profile), tmp_recodes[tsuids[0]]) });
                this.storage_Rwd_icon.bind(this)();
            }
            else { this.setState({ profile: {} }); }
        });
    }
    db_rWd_setpf() {
        if (this.state.showuid == "") return;
        if (this.state.showuid != this.state.uid) return;
        if (stopf5.check("1", 500, true) == false) return; // To prevent high freq access
        db.doc("mypage/" + this.state.showuid).set({
            [Date.now().toString() + "_" + this.state.showuid]: this.state.profile
        }).catch((err) => { fb_errmsg(err) })
    }
    db_rWd_makepf() {
        if (this.state.showuid == "") return;
        if (this.state.showuid != this.state.uid) return;
        if (stopf5.check("1", 500, true) == false) return; // To prevent high freq access
        db.doc("mypage/" + this.state.showuid).set({
            [Date.now().toString() + "_" + this.state.showuid]:
                { nickname: "窓の民は名無し", pr: "私はJhon_Doe。窓の蛇遣いです。" }
        }).catch((err) => { fb_errmsg(err) })
    }
    storage_Rwd_icon() {
        if (this.state.showuid == "") return;
        storage.ref("mypage/" + this.state.showuid + "/icon.img").getDownloadURL().then((url) => {
            if (this.state.icon_url != url) this.setState({ icon_url: url });
        }).catch(() => { if (this.state.icon_url != "") this.setState({ icon_url: "" }); })
    }
    storage_rWd_icon(upload_file: any) {
        if (this.state.showuid == "") return;
        if (stopf5.check("2", 500, true) == false) return; // To prevent high freq access
        storage.ref("mypage/" + this.state.showuid + "/icon.img").put(upload_file);
        setTimeout(() => { this.storage_Rwd_icon() }, 1000)
    }
    _tick() {
        // Auth
        if (auth.currentUser) {
            if (this.state.uid != auth.currentUser.uid) this.setState({ uid: auth.currentUser.uid });
        } else {
            if (this.state.uid != "") this.setState({ uid: "" });
        }
        // alias none mypage
        if (this.state.showuid == "") this.setState({ showuid: this.state.uid })
    }
    _gotomypage() {
        this.setState({ showuid: this.state.uid })
    }

    // renders
    render_createmypage() {
        if (this.state.uid == "")
            return (<h5><i className="fas fa-wind mr-1"></i>Plz login</h5>)
        if (this.state.uid == this.state.showuid)
            return (
                <button type="button" className="btn btn-outline-success btn-bg m-2"
                    onClick={() => { this.db_rWd_makepf() }}>
                    <i className="fas fa-file-signature mr-1" style={{ pointerEvents: "none" }}></i>Create Mypage
                </button>
            )
        return (
            <div>
                <h5>
                    <i className="fas fa-wind mr-1"></i>This account's page is not Exist
                </h5>
                <button type="button" className="btn btn-outline-success btn-bg m-2"
                    onClick={() => { this._gotomypage() }}>
                    <i className="fas fa-home mr-1" style={{ pointerEvents: "none" }}></i>Mypage
                </button>
            </div>
        )
    }
    render_dlicon() {
        if (this.state.icon_url == "") { return (<i className="fab fa-themeisle fa-2x m-2"><br />No Icon</i>) }
        return (
            <div className="m-2">
                <img src={this.state.icon_url} alt={this.state.icon_url} width="156" height="156" />
            </div>
        )
    }
    render_upicon() {
        if (this.state.showuid != this.state.uid) return;
        return (
            <button type="button" className="btn btn-outline-success btn-sm m-1"
                onClick={(evt) => { $(evt.currentTarget.children[0]).click() }}>
                <input type="file" className="d-none" accept="image/jpeg,image/png"
                    onChange={(evt) => { this.storage_rWd_icon(evt.target.files[0]) }} />
                <i className="fas fa-upload mr-1" style={{ pointerEvents: "none" }}></i>Icon
            </button>
        )
    }
    render_changebutton(title: string, state_element: string) {
        if (this.state.showuid != this.state.uid) return;
        let modal_id = "mygape_modal_" + title; let modal_id_s = "#" + modal_id;
        return (
            <div>
                <button type="button" className="btn btn-outline-success btn-sm m-1" data-toggle="modal" data-target={modal_id_s}>
                    <i className="far fa-keyboard mr-1" style={{ pointerEvents: "none" }}></i>{title}
                </button>
                <div className="modal fade" id={modal_id} role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{title}</h5>
                            </div>
                            <div className="modal-body">
                                <textarea className="form-control" value={this.state.profile[state_element]} rows={4} style={{ width: "100%" }}
                                    onChange={(evt) => {
                                        let tmp_profile = Object.assign(this.state.profile)
                                        tmp_profile[state_element] = evt.target.value
                                        this.setState({ profile: tmp_profile });
                                    }}></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm btn-success" data-dismiss="modal"
                                    onClick={() => { this.db_rWd_setpf() }}>
                                    <i className="fas fa-paper-plane mr-1" style={{ pointerEvents: "none" }}></i>Submit
                                </button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                    <i className="fas fa-caret-up mr-1" style={{ pointerEvents: "none" }}></i>Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="p-2 bg-light">
                {"nickname" in this.state.profile == false ?
                    <div>{this.render_createmypage()}</div>
                    :
                    <div className="m-2" style={{ background: "khaki" }}>
                        <div className="d-flex justify-content-start">
                            {this.render_dlicon()}
                            <div className="m-1 p-1 flex-grow-1" style={{ backgroundColor: "rgba(100,100,100,0.1)" }}>
                                <div className="d-flex justify-content-start">
                                    <h3 className="flex-grow-1">
                                        <i className="far fa-user mr-1"></i>{this.state.profile["nickname"]}
                                    </h3>
                                    <div className="form-inline">
                                        {this.render_changebutton("Nickname", "nickname")}{this.render_upicon()}
                                    </div>
                                </div>
                                <div className="m-1 p-1" style={{ backgroundColor: "rgba(255,255,255,0.5)" }}>
                                    <div className="d-flex justify-content-between">
                                        <h5>PR</h5>
                                        {this.render_changebutton("PR", "pr")}
                                    </div>
                                    {this.state.profile["pr"]}
                                </div>
                            </div>
                        </div>
                        {this.state.showuid == this.state.uid ?
                            <div />
                            :
                            <button type="button" className="btn btn-success btn-sm m-2"
                                onClick={() => { this._gotomypage() }}>
                                <i className="fas fa-home mr-1" style={{ pointerEvents: "none" }}></i>Mypage
                            </button>
                        }
                    </div>
                }
            </div>
        );
    };
};